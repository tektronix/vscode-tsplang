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
    protected static namespaceRegexp = new RegExp(/^([a-zA-Z_][a-zA-Z_0-9.]*)$/)
    protected static schemaFilepath = path.resolve(
        __dirname,
        "..",
        "tsplang.plugin.schema.json"
    )
    protected static tspFileExtension = ".tsp"

    protected directories: URI[]
    protected plugins: Map<string, InternalPlugin>
    protected validateSettings: ValidateFunction

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

    get(plugin: string): TsplangPlugin | undefined {
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

            // Recurse to request this plugin's extension dependency.
            const extendedPlugin = this.get(extensionObject.plugin)

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
            // FIXME: convert into a user setting.
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
        /**
         * FIXME:
         *
         * 1. The current filtering method is only smart enough to filter
         * symbols that exist as TSP files in the filesystem. For example, for
         * SMU2450 commands, we can filter on "buffer" but not
         * "buffer.DIGIT_3_5".
         *
         * WORKAROUND:
         *
         * A. If we want to include only the "buffer.DIGIT_3_5" symbol, we
         * would include "buffer" since all command tables have an associated
         * file. In our extending plugin, we would create our own "buffer.tsp"
         * file and set all undesired fields of the buffer table to nil.
         *
         * B. If we want to exclude only the "buffer.DIGIT_3_5" symbol, we
         * would include "buffer" since all command tables have an associated
         * file. In our extending plugin, we would create our own "buffer.tsp"
         * file and set the "DIGIT_3_5" field of the buffer table to nil.
         */

        let files: string[] = [...plugin.files.values()]

        if (include.length > 0) {
            files = files.filter((uri: string) => {
                for (let i = 0; i < include.length; i++) {
                    // Filters MUST be a valid Lua namespace.
                    if (!PluginProvider.namespaceRegexp.test(include[i])) {
                        return false
                    }

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
                        return true
                    }
                }
                return false
            })
        }

        if (exclude.length > 0) {
            files = files.filter((uri: string) => {
                for (let i = 0; i < exclude.length; i++) {
                    // Previous for-loop's comments still apply, but the
                    // returned boolean is inverted.

                    if (!PluginProvider.namespaceRegexp.test(include[i])) {
                        return false
                    }

                    const filepath = URI.parse(uri).fsPath
                    const start = filepath.indexOf(path.sep, filepath.lastIndexOf("@"))

                    if (
                        filepath
                            .slice(start + 1)
                            .startsWith(path.join(...exclude[i].split(".")))
                    ) {
                        return false
                    }
                }
                return true
            })
        }

        return {
            files: new Set(files),
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