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
import * as klaw from "klaw"
import * as through2 from "through2"

import { InternalPlugin, TsplangPlugin } from "./plugin"
import {
    PluginExtensionObject,
    TsplangPluginSettings,
} from "./tsplang.plugin.generated"
import { ProviderErrorEmitter } from "./providerErrorEmitter"

const CONFIG_FILENAME = "tsplang.plugin"
const SCHEMA_FILEPATH = path.join("..", "tsplang.plugin.schema.json")
const TSP_FILE_EXTENSION = ".tsp"

const PLUGIN_DIR_FILTER = through2.obj(function(
    item: klaw.Item,
    encoding: string,
    next: through2.TransformCallback
) {
    if (
        item.stats.isDirectory() &&
        path.basename(item.path).startsWith("@") &&
        fsExtra.pathExistsSync(path.join(item.path, CONFIG_FILENAME))
    ) {
        this.push(item)
    }
    next()
})

const TSP_FILE_FILTER = through2.obj(function(
    item: klaw.Item,
    encoding: string,
    next: through2.TransformCallback
) {
    if (item.stats.isFile() && path.extname(item.path) === TSP_FILE_EXTENSION) {
        this.push(item)
    }
    next()
})

export class PluginProvider extends ProviderErrorEmitter {
    protected directories: URI[]
    protected plugins: Map<string, InternalPlugin>
    protected validateSettings: ValidateFunction

    constructor() {
        super()
        this.validateSettings = new ajv({
            allErrors: true,
        }).compile(
            JSON.parse(fsExtra.readFileSync(SCHEMA_FILEPATH, { encoding: "utf-8" }))
        )
        this.directories = []
        klaw(__dirname)
            .pipe(PLUGIN_DIR_FILTER)
            .on("data", (item: klaw.Item) => this.directories.push(URI.file(item.path)))
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
                this.filter(
                    extendedPlugin,
                    extensionObject.include,
                    extensionObject.exclude
                )
            )
        }

        // Recursively collect all TSP files in this plugin folder.
        const files = new Set<string>()
        klaw(path.dirname(internalPlugin.configUri.fsPath), { depthLimit: 10 })
            .pipe(TSP_FILE_FILTER)
            .on("data", (item: klaw.Item) => files.add(URI.file(item.path).toString()))

        // Cache the resolved plugin.
        internalPlugin.cache = TsplangPlugin.merge(
            dependencies,
            InternalPlugin.toExternal(internalPlugin)
        )

        return internalPlugin.cache
    }

    protected filter(
        plugin: TsplangPlugin,
        include: string[],
        exclude: string[]
    ): TsplangPlugin {
        let files: string[] = [...plugin.files.values()]

        if (include.length > 0) {
            files = files.filter((uri: string) => {
                for (let i = 0; i < include.length; i++) {
                    // String values are valid `file:///` URIs and we need to operate
                    // on a valid filesystem path.
                    const filepath = URI.parse(uri).fsPath
                    // Get the index of the first path separator to the right
                    // of the last "@" character.
                    const start = filepath.indexOf(path.sep, filepath.lastIndexOf("@"))

                    // Convert the include symbol into a partial filesystem path
                    // and try to find it in the current filepath.
                    if (filepath.includes(path.join(...include[i].split(".")), start)) {
                        return true
                    }
                }
                return false
            })
        }

        if (exclude.length > 0) {
            files = files.filter((uri: string) => {
                for (let i = 0; i < exclude.length; i++) {
                    // See previous for-loop's line comments still apply,
                    // but for exludes.

                    const filepath = URI.parse(uri).fsPath
                    const start = filepath.indexOf(path.sep, filepath.lastIndexOf("@"))

                    if (filepath.includes(path.join(...exclude[i].split(".")), start)) {
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

    protected loadAllPluginConfigs(): void {
        this.plugins = new Map()
        for (let i = 0; i < this.directories.length; i++) {
            const directoryUri = this.directories[i]
            const configUri = URI.file(path.join(directoryUri.fsPath, CONFIG_FILENAME))

            let data: string
            try {
                data = fsExtra.readFileSync(configUri.fsPath, "utf-8")
            } catch (err) {
                this.sendConfigReadError(err)
                return
            }

            if (!this.validateSettings(data, configUri.fsPath)) {
                this.sendInvalidConfigError(this.validateSettings.errors ?? null)
            } else {
                this.populatePluginMap(directoryUri, JSON.parse(data))
            }
        }
    }

    protected populatePluginMap(uri: URI, settings: TsplangPluginSettings): void {
        const result: InternalPlugin = { settings, configUri: uri }

        // Try to add a key for the default name.
        let collision = this.plugins.get(settings.name)
        if (collision !== undefined) {
            this.sendConflictingNameError(
                collision.configUri.toString(),
                uri.toString(),
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
                    uri.toString(),
                    alias,
                    true
                )
                return
            }
            this.plugins.set(alias, result)
        })
    }
}