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

import { Model } from '../model'

import { ApiSpec } from './apiSpec'
import { CommandSet } from './commandSet'
import { InstrumentModule } from './instrumentModule'
import { InstrumentSpec } from './instrumentSpec'
import { generateCommandSet } from './provider'

export interface Instrument {
    set: CommandSet,
    spec: InstrumentSpec
}

export function load(model: Model): Instrument {
    let luaEntry: Instrument | undefined

    // All models need the Lua entry, except the Lua model.
    if (model !== Model.LUA) {
        luaEntry = load(Model.LUA)
    }

    switch (model) {
        case Model.KI2450:
        case Model.KI2460:
        case Model.KI2461:
        case Model.KI2461SYS:
        case Model.LUA:
            const instrModule: InstrumentModule = require(`./instrument/${model}`)

            const api: Array<ApiSpec> = instrModule.getApiSpec()
            const spec: InstrumentSpec = instrModule.getInstrumentSpec()

            const set: CommandSet = generateCommandSet(api, spec)

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

            return { set, spec }

        default:
            throw new Error(`model ${model} is not supported`)
    }
}
