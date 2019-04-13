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
'use strict'

import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver'

import { Model } from '../model'
import { Shebang } from '../shebang'

import { ApiSpec } from './apiSpec'
import { CommandSet } from './commandSet'
import { InstrumentModule } from './instrumentModule'
import { InstrumentSpec } from './instrumentSpec'
import { generateCommandSet } from './provider'

export interface Instrument {
    set: CommandSet,
    spec: InstrumentSpec
}

export function load(shebang: Shebang, hideInputEnums: boolean): [Instrument, Array<Diagnostic>] {
    let diagnostics: Array<Diagnostic>
    let luaEntry: Instrument | undefined

    // All models need the Lua entry, except the Lua model.
    if (shebang.model !== Model.LUA) {
        [luaEntry, diagnostics] = load({ model: Model.LUA, range: shebang.range }, hideInputEnums)
    }

    switch (shebang.model) {
        case Model.KI2450:
        case Model.KI2460:
        case Model.KI2461:
        case Model.KI2461SYS:
        case Model.LUA:
            const instrModule: InstrumentModule = require(`./${shebang.model}`)

            const api: Array<ApiSpec> = instrModule.getApiSpec()
            const spec: InstrumentSpec = instrModule.getInstrumentSpec()

            const set: CommandSet = generateCommandSet(api, spec, hideInputEnums)

            // If this is not a Lua model, then merge the Lua entry.
            if (luaEntry !== undefined) {
                set.add({
                    completionDocs: luaEntry.set.completionDocs,
                    completions: [
                        ...luaEntry.set.completions,
                        ...luaEntry.set.reserved
                    ],
                    signatures: luaEntry.set.signatures
                })
            }

            return [{ set, spec }, diagnostics || []]

        default:
            return [luaEntry, [{
                code: 'unsupported-model',
                message: `Model ${shebang.model} is not supported.`,
                range: shebang.range,
                severity: DiagnosticSeverity.Error,
                source: 'tsplang'
            }]]
    }
}
