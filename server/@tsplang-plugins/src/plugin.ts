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
    localFiles: URI[]
    settings: TsplangPluginSettings
}

export interface TsplangPlugin {
    /**
     * A collection of unique file URI strings.
     *
     * Each item can be converted into a URI object by passing it to the
     * `URI.file` function provided by the `vscode-uri` package.
     */
    files: ReadonlySet<string>
    /**
     * A collection of keywords that must never be used as variable names.
     */
    keywords: ReadonlySet<string>
    /**
     * A lookup table that pairs plugin names (and aliases) with the URI string
     * of its LICENSE file, if such a file exists.
     */
    licenses: ReadonlyMap<string, string>
}
export namespace TsplangPlugin {
    export const from = function(internal: InternalPlugin): TsplangPlugin {
        const license = URI.file(
            path.join(path.dirname(internal.configUri.fsPath), "LICENSE")
        )
        const licenseMap = new Map()
        // If this plugin has a license file, then populate the URI lookup table.
        if (fsExtra.pathExistsSync(license.fsPath)) {
            const licenseString = license.toString()
            // Name
            licenseMap.set(internal.settings.name, licenseString)
            // Aliases
            internal.settings.aliases?.forEach(alias => {
                licenseMap.set(alias, licenseString)
            })
        }

        return {
            files: new Set(internal.localFiles.map(uri => uri.toString())),
            keywords: new Set(internal.settings.keywords),
            licenses: licenseMap,
        }
    }

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
