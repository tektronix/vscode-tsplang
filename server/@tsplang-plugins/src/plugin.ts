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

import * as fsExtra from "fs-extra"
import { URI } from "vscode-uri"

import { TsplangPluginSettings } from "./tsplang.plugin.generated"

export interface InternalPlugin {
    cache?: TsplangPlugin
    configUri: URI
    settings: TsplangPluginSettings
}
export namespace InternalPlugin {
    export const toExternal = function(plugin: InternalPlugin): TsplangPlugin {
        const license = URI.file(
            path.join(path.dirname(plugin.configUri.fsPath), "LICENSE")
        )
        const licenseMap = new Map()
        // If this plugin has a license file, then populate the URI lookup table.
        if (fsExtra.pathExistsSync(license.fsPath)) {
            const licenseString = license.toString()
            // Name
            licenseMap.set(plugin.settings.name, licenseString)
            // Aliases
            plugin.settings.aliases?.forEach(alias => {
                licenseMap.set(alias, licenseString)
            })
        }

        return {
            files: new Set(),
            keywords: new Set(plugin.settings.keywords),
            licenses: licenseMap,
        }
    }
}

export interface TsplangPlugin {
    files: ReadonlySet<string>
    keywords: ReadonlySet<string>
    /** Plugin name/alias to license URI lookup table. */
    licenses: ReadonlyMap<string, string>
}
export namespace TsplangPlugin {
    /**
     * Merge two TsplangPlugin objects.
     *
     * Entries from `b` will overwrite those from `a`.
     * */
    export const merge = function(a: TsplangPlugin, b: TsplangPlugin): TsplangPlugin {
        return {
            files: new Set([...a.files, ...b.files]),
            keywords: new Set([...a.keywords, ...b.keywords]),
            licenses: new Map([...a.licenses, ...b.licenses]),
        }
    }
}
