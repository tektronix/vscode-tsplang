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
import { EventEmitter } from "events"
import * as path from "path"

import { ValidateFunction } from "ajv"
import { URI } from "vscode-uri"
import * as ajv from "ajv"
import * as fsExtra from "fs-extra"
import * as klaw from "klaw"
import * as through2 from "through2"

import { InternalPlugin, TsplangPlugin } from "./plugin"
import { TsplangPluginSettings } from "./tsplang.plugin.generated"

const CONFIG_FILENAME = "tsplang.plugin"
const SCHEMA_FILEPATH = path.join("..", "tsplang.plugin.schema.json")

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

export class PluginProvider {
    protected static CONFIG_READ_ERROR = "ConfigReadError"
    protected static CONFLICTING_NAME_ERROR = "ConflictingNameError"
    protected static INVALID_SCHEMA_ERROR = "InvalidSchemaError"

    protected directories: URI[]
    protected eventDirector: EventEmitter
    protected plugins: Map<string, InternalPlugin>
    protected validateSettings: ValidateFunction

    constructor() {
        this.eventDirector = new EventEmitter()
        this.validateSettings = new ajv({
            allErrors: true,
        }).compile(
            JSON.parse(fsExtra.readFileSync(SCHEMA_FILEPATH, { encoding: "utf-8" }))
        )
        this.findDirectories()
    }

    // TODO
    // get(plugin: string): TsplangPlugin | undefined {

    // }

    dispose(): void {
        this.eventDirector.removeAllListeners()
    }

    findDirectories(): void {
        this.directories = []
        klaw(__dirname)
            .pipe(PLUGIN_DIR_FILTER)
            .on("data", (item: klaw.Item) => this.directories.push(URI.file(item.path)))
    }

    onConfigReadError(listener: (reason: Error) => void): void {
        this.eventDirector.on(PluginProvider.INVALID_SCHEMA_ERROR, listener)
    }

    onConflictingNameError(
        listener: (
            existingPlugin: string,
            newPlugin: string,
            conflictingName: string,
            alias: boolean
        ) => void
    ): void {
        this.eventDirector.on(PluginProvider.CONFLICTING_NAME_ERROR, listener)
    }

    onInvalidSchemaError(listener: (reasons: ajv.ErrorObject[] | null) => void): void {
        this.eventDirector.on(PluginProvider.INVALID_SCHEMA_ERROR, listener)
    }

    protected populatePluginMap(uri: string, settings: TsplangPluginSettings): void {
        const result: InternalPlugin = { settings, uri }

        // Try to add a key for the default name.
        let collision = this.plugins.get(settings.name)
        if (collision !== undefined) {
            this.eventDirector.emit(
                PluginProvider.CONFLICTING_NAME_ERROR,
                collision.uri,
                uri,
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
                this.eventDirector.emit(
                    PluginProvider.CONFLICTING_NAME_ERROR,
                    collision.uri,
                    uri,
                    alias,
                    true
                )
                return
            }
            this.plugins.set(alias, result)
        })
    }

    protected loadAllPluginConfigs(): void {
        this.plugins = new Map()
        for (let i = 0; i < this.directories.length; i++) {
            const uri = this.directories[i]
            fsExtra
                .readFile(uri.fsPath, "utf-8")
                .then(data => {
                    if (!this.validateSettings(data, uri.fsPath)) {
                        this.eventDirector.emit(
                            PluginProvider.INVALID_SCHEMA_ERROR,
                            this.validateSettings.errors
                        )
                        return
                    }

                    this.populatePluginMap(uri.toString(), JSON.parse(data))
                    return
                })
                .catch((reason: Error) => {
                    this.eventDirector.emit(PluginProvider.CONFIG_READ_ERROR, reason)
                })
        }
    }
}
