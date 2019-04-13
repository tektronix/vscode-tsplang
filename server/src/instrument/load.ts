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

export interface Loaded {
    diagnostic?: Diagnostic
    instrument?: Instrument
}

export async function load(shebang: Shebang, hideInputEnums: boolean): Promise<Loaded> {
    let loadedLua: Loaded

    // Load Lua entries for all models except the Lua model.
    if (shebang.model !== Model.LUA) {
        loadedLua = await load({ model: Model.LUA, range: shebang.range }, hideInputEnums)

        if (loadedLua.diagnostic !== undefined) {
            return loadedLua
        }
    }

    switch (shebang.model) {
        case Model.KI2450:
        case Model.KI2460:
        case Model.KI2461:
        case Model.KI2461SYS:
        case Model.LUA:
            let instrModule: InstrumentModule
            let api: Array<ApiSpec>
            let spec: InstrumentSpec
            let set: CommandSet

            try {
                instrModule = require(`./${shebang.model}`)
            }
            catch (e) {
                return {
                    diagnostic: {
                        code: 'load-import-error',
                        message: `Cannot find instrument module '${shebang.model}'`,
                        range: shebang.range,
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                }
            }

            try {
                api = instrModule.getApiSpec()
            }
            catch (e) {
                return {
                    diagnostic: {
                        code: 'load-api-error',
                        message: `Cannot load API from instrument module '${shebang.model}'`,
                        range: shebang.range,
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                }
            }

            try {
                spec = instrModule.getInstrumentSpec()
            }
            catch (e) {
                return {
                    diagnostic: {
                        code: 'load-spec-error',
                        message: `Cannot load specification from instrument module '${shebang.model}'`,
                        range: shebang.range,
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                }
            }

            try {
                set = generateCommandSet(api, spec, hideInputEnums)
            }
            catch (e) {
                return {
                    diagnostic: {
                        code: 'load-generate-error',
                        message: `Cannot generate commands from instrument module '${shebang.model}'`,
                        range: shebang.range,
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                }
            }

            // If this is not a Lua model, then merge the Lua entry.
            if (loadedLua !== undefined) {
                set.add({
                    completionDocs: loadedLua.instrument.set.completionDocs,
                    completions: [
                        ...loadedLua.instrument.set.completions,
                        ...loadedLua.instrument.set.reserved
                    ],
                    signatures: loadedLua.instrument.set.signatures
                })
            }

            return {
                instrument: { set, spec }
            }

        default:
            return {
                diagnostic: {
                    code: 'unsupported-model',
                    message: `Model ${shebang.model} is not supported.`,
                    range: shebang.range,
                    severity: DiagnosticSeverity.Error,
                    source: 'tsplang'
                }
            }
    }
}
