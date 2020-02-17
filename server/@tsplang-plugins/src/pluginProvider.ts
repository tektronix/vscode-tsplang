/*
 *  Copyright Tektronix Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import * as path from "path"

import { ValidateFunction } from "ajv"
import { URI } from "vscode-uri"
import * as ajv from "ajv"
import * as fsExtra from "fs-extra"
import * as klawSync from "klaw-sync"

import { InternalPlugin, TsplangPlugin } from "./plugin"
import {
    PluginExtensionObject,
    TsplangPluginSettings,
} from "./tsplang.plugin.generated"
import { ProviderErrorEmitter } from "./providerErrorEmitter"

export class PluginProvider extends ProviderErrorEmitter {
    protected static builtinsDir = __dirname
    protected static configFilename = "tsplang.plugin"
    protected static schemaFilepath = path.resolve(
        __dirname,
        "..",
        "tsplang.plugin.schema.json"
    )
    protected static tspFileExtension = ".tsp"

    protected directories: URI[]
    protected plugins: Map<string, InternalPlugin>
    protected validateSettings: ValidateFunction

    /**
     * Manages plugin discovery, configuration validation, and dependency
     * resolution.
     *
     * Except during construction, all errors are reported via event
     * subscriptions. Errors occurring during construction are not caught and
     * should be handled by the caller.
     */
    constructor() {
        super()
        this.validateSettings = new ajv({
            allErrors: true,
        }).compile(
            JSON.parse(
                fsExtra.readFileSync(PluginProvider.schemaFilepath, {
                    encoding: "utf-8",
                })
            )
        )
        this.directories = klawSync(PluginProvider.builtinsDir, {
            depthLimit: 0,
            filter: PluginProvider.pluginDirFilter,
            nofile: true,
        }).map((dir: klawSync.Item) => URI.file(dir.path))
    }

    /**
     * Get a plugin.
     *
     * @param plugin The name or alias of an available plugin. This is usually
     * a shebang substring.
     * @returns If no such plugin exists or an error occurs, then undefined;
     * otherwise a `TsplangPlugin` object containing information about the
     * requested plugin and any plugin it extends.
     */
    get(plugin: string): TsplangPlugin | undefined {
        return this._get(plugin, new Set())
    }

    /**
     * Recursive backing method for `PluginProvider#get`.
     *
     * @param plugin The plugin to resolve.
     * @param dependencyChain Names of plugins that have already been resolved.
     * @returns See {@link PluginProvider.get}
     */
    protected _get(
        plugin: string,
        dependencyChain: Set<string>
    ): TsplangPlugin | undefined {
        if (this.plugins === undefined) {
            this.loadAllPluginConfigs()
        }

        const internalPlugin = this.plugins.get(plugin)

        if (internalPlugin === undefined) {
            return
        }

        if (internalPlugin.cache !== undefined) {
            return internalPlugin.cache
        }

        let dependencies: TsplangPlugin = {
            files: new Set(),
            keywords: new Set(),
            licenses: new Map(),
        }

        // Resolve extends dependencies.
        const extensions = internalPlugin.settings.extends ?? []
        for (let i = 0; i < extensions.length; i++) {
            // Convert strings to a PluginExtensionObject.
            const extensionObject: PluginExtensionObject =
                typeof extensions[i] === "string"
                    ? { plugin: extensions[i] as string }
                    : (extensions[i] as PluginExtensionObject)
            // Create definite filters to avoid checks later.
            extensionObject.include = extensionObject.include ?? []
            extensionObject.exclude = extensionObject.exclude ?? []

            // Check for circular dependencies.
            if (dependencyChain.has(extensionObject.plugin)) {
                this.sendCircularDependencyError(extensionObject.plugin, [
                    ...dependencyChain,
                    plugin,
                ])
                // Do not attempt to load a partial plugin.
                return
            }

            // Recurse to request this plugin's extension dependency.
            const extendedPlugin = this._get(
                extensionObject.plugin,
                new Set([...dependencyChain, plugin])
            )

            // Emit an error if we were unable to resolve a plugin name.
            if (extendedPlugin === undefined) {
                this.sendExtendsUnknownPluginError(
                    internalPlugin.configUri.toString(),
                    extensionObject.plugin
                )
                // Do not attempt to load a partial plugin.
                return
            }

            // Merge the filtered plugin into this plugin's dependencies.
            dependencies = TsplangPlugin.merge(
                dependencies,
                PluginProvider.filter(
                    extendedPlugin,
                    extensionObject.include,
                    extensionObject.exclude
                )
            )
        }

        // Recursively collect all TSP files in this plugin folder.
        internalPlugin.localFiles = klawSync(
            path.dirname(internalPlugin.configUri.fsPath),
            { depthLimit: 10 }
        )
            .filter(PluginProvider.tspFileFilter)
            .map((tspFile: klawSync.Item) => URI.file(tspFile.path))

        // Cache the resolved plugin.
        internalPlugin.cache = TsplangPlugin.merge(
            dependencies,
            TsplangPlugin.from(internalPlugin)
        )

        return internalPlugin.cache
    }

    protected loadAllPluginConfigs(): void {
        this.plugins = new Map()
        for (let i = 0; i < this.directories.length; i++) {
            const directoryUri = this.directories[i]
            const configUri = URI.file(
                path.join(directoryUri.fsPath, PluginProvider.configFilename)
            )

            let data: string
            try {
                data = fsExtra.readFileSync(configUri.fsPath, "utf-8")
            } catch (err) {
                this.sendConfigReadError(err)
                return
            }

            const parsedData: unknown = JSON.parse(data)
            if (!this.validateSettings(parsedData, configUri.fsPath)) {
                this.sendInvalidConfigError(this.validateSettings.errors ?? null)
            } else {
                this.populatePluginMap(
                    directoryUri,
                    parsedData as TsplangPluginSettings
                )
            }
        }
    }

    protected populatePluginMap(
        pluginDirUri: URI,
        settings: TsplangPluginSettings
    ): void {
        const result: InternalPlugin = {
            settings,
            configUri: URI.file(
                path.join(pluginDirUri.fsPath, PluginProvider.configFilename)
            ),
            localFiles: [],
        }

        // Try to add a key for the default name.
        let collision = this.plugins.get(settings.name)
        if (collision !== undefined) {
            this.sendConflictingNameError(
                collision.configUri.toString(),
                pluginDirUri.toString(),
                settings.name,
                false
            )
            return
        }
        this.plugins.set(result.settings.name, result)

        // Try to add a key for each alias.
        settings.aliases?.forEach(alias => {
            collision = this.plugins.get(alias)
            if (collision !== undefined) {
                this.sendConflictingNameError(
                    collision.configUri.toString(),
                    pluginDirUri.toString(),
                    alias,
                    true
                )
                return
            }
            this.plugins.set(alias, result)
        })
    }

    protected static filter(
        plugin: TsplangPlugin,
        include: string[],
        exclude: string[]
    ): TsplangPlugin {
        const files = new Set<string>([...plugin.files.values()])

        if (include.length > 0) {
            // Editing an iterable inside its forEach causes undefined behavior.
            Array.from(files.keys()).forEach((uri: string) => {
                for (let i = 0; i < include.length; i++) {
                    // String values are valid `file:///` URIs and we need to operate
                    // on a valid filesystem path.
                    const filepath = URI.parse(uri).fsPath

                    /**
                     * Get the index of the first path separator to the right
                     * of the last "@" character.
                     *
                     * ```text
                     *                           target index
                     *                                 v
                     *file:///path/to/plugins/@myPlugin/example/command.tsp
                     * ```
                     */
                    const start = filepath.indexOf(path.sep, filepath.lastIndexOf("@"))

                    // Convert the include symbol into a partial filesystem path
                    // and try to match it against the start of the path after the
                    // plugin directory.
                    if (
                        filepath

                            /**
                             * Get the path after the plugin folder.
                             *
                             * ```
                             * -> example/command.tsp
                             * ```
                             */
                            .slice(start + 1)

                            /**
                             * Convert the Lua symbol into a path.
                             * ```
                             * "command" => "command"
                             * "example.command" => "example/command"
                             * ```
                             *
                             * True if the sliced path starts with the converted path.
                             * ```
                             * "example/command.tsp" starts with
                             *      "command" => false
                             *      "example/command" => true
                             * ```
                             */
                            .startsWith(path.join(...include[i].split(".")))
                    ) {
                        // We found an include filter match,
                        // so keep the URI in the Set and continue to the next URI.
                        return
                    }
                }
                // There was no include filter match,
                // so remove the URI from the Set.
                files.delete(uri)
            })
        }

        if (exclude.length > 0) {
            // Editing an iterable inside its forEach causes undefined behavior.
            Array.from(files.keys()).forEach((uri: string) => {
                for (let i = 0; i < exclude.length; i++) {
                    // Previous for-loop's comments still apply, but the
                    // returned boolean is inverted.

                    const filepath = URI.parse(uri).fsPath
                    const start = filepath.indexOf(path.sep, filepath.lastIndexOf("@"))

                    if (
                        filepath
                            .slice(start + 1)
                            .startsWith(path.join(...exclude[i].split(".")))
                    ) {
                        // We found an exclude filter match,
                        // so remove the URI from the Set and continue to the next URI.
                        files.delete(uri)
                        return
                    }
                }
                // There was no exclude filter match,
                // so keep the URI in the Set and continue to the next URI.
            })
        }

        if (include.length > 0) {
            /**
             * Here we try to auto-magically add all implicitly required files
             * which the include filter may have missed.
             *
             * This is necessary to keep the filter lists from exploding in
             * size under certain use-cases.
             *
             * Consider what would happen to the filters in the following case
             * if implicitly required files were not added:
             *
             * ```jsonc
             * "extends": [
             *   {
             *     "plugin": "2450",
             *     "include": ["smu.measure.math"],
             *     "exclude": []
             *   }
             * ]
             * ```
             *
             * We would be forced to add "smu" and "smu.measure" to the include
             * list since those files declare the parent tables of
             * "smu.measure.math". The filter's inclusion behavior means that
             * all symbols contained in the "smu" and "smu.measure" tables will
             * be added to the file list. To prevent this, we would have to add
             * EVERY file under the "smu" and "smu/measure" directories to our
             * exclude list.
             */

            // Editing an iterable inside its forEach causes undefined behavior.
            Array.from(files.keys()).forEach((uri: string) => {
                const filepath = URI.parse(uri).fsPath
                let parentDir = path.dirname(filepath)
                while (!path.basename(parentDir).startsWith("@")) {
                    const parentFile = parentDir + PluginProvider.tspFileExtension
                    const parentFileUri = URI.file(parentFile).toString()
                    if (!files.has(parentFileUri)) {
                        try {
                            if (
                                fsExtra.pathExistsSync(parentDir) &&
                                fsExtra.pathExistsSync(parentFile) &&
                                fsExtra.statSync(parentDir).isDirectory() &&
                                fsExtra.statSync(parentFile).isFile()
                            ) {
                                files.add(parentFileUri)
                            }
                        } catch (err) {
                            /**
                             * Suppress any filesystem errors thrown
                             * when attempting to stat a path.
                             */
                        }
                    }
                    parentDir = path.dirname(parentDir)
                }
            })
        }

        return {
            files,
            keywords: new Set([...plugin.keywords]),
            licenses: new Map([...plugin.licenses]),
        }
    }

    protected static pluginDirFilter = function(item: klawSync.Item): boolean {
        return (
            item.stats.isDirectory() &&
            path.basename(item.path).startsWith("@") &&
            fsExtra.pathExistsSync(path.join(item.path, PluginProvider.configFilename))
        )
    }

    protected static tspFileFilter = function(item: klawSync.Item): boolean {
        return (
            item.stats.isFile() &&
            path.extname(item.path) === PluginProvider.tspFileExtension
        )
    }
}
