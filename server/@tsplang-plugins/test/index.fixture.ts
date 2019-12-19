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
import * as fs from "fs"
import * as path from "path"
import * as Ajv from "ajv"

export const getPluginConfigPath = (function(): (plugin: string) => string {
    const targetRoot = path.join(path.dirname(__filename), "../out")
    const targetFile = "tsplang.plugin"

    return function(plugin: string): string {
        // Add the "@" character if it was not provided.
        const name = plugin.charCodeAt(0) === 64 ? plugin : "@" + plugin
        return path.join(targetRoot, name, targetFile)
    }
})()

export const getSchemaFilepath = (function(): () => string {
    const result = path.join(path.dirname(__filename), "../tsplang.plugin.schema.json")

    return function(): string {
        return result
    }
})()

export function getValidationError(
    validator: Ajv.ValidateFunction
): string | undefined {
    if (!validator.errors || validator.errors.length === 0) {
        return
    }

    let message = ""
    validator.errors.forEach(value => {
        message += value.message
        message += "\n"
    })
    return message.trim()
}

export function makeSchemaValidator(): Ajv.ValidateFunction {
    return new Ajv().compile(JSON.parse(fs.readFileSync(getSchemaFilepath(), "utf-8")))
}
