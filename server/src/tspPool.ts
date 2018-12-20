/*
 *  Copyright 2018 Tektronix Inc.
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

import { ApiSpec, CommandSet, InstrumentModule, InstrumentSpec } from './instrument'
import { generateCommandSet } from './instrument/provider'
import { Model } from './model'

export interface PoolEntry {
    apiSpec: Array<ApiSpec>
    commandSet: CommandSet
    instrumentSpec: InstrumentSpec
    references: number
}

export class TspPool {
    private pool: Map<Model, PoolEntry>

    constructor() {
        this.pool = new Map()
    }

    async register(model: Model): Promise<PoolEntry> {
        return new Promise<PoolEntry>(async (
            resolve: (value?: PoolEntry) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            // If the model has already been loaded.
            if (this.pool.has(model)) {
                resolve(this.get(model))

                return
            }

            try {
                const newEntry = await this.load(model)
                // add new model to the current pool
                this.pool.set(model, newEntry)

                resolve(newEntry)
            }
            catch (e) {
                reject(e)
            }
        })
    }

    unregister(model: Model): void {
        const entry = this.pool.get(model)

        // do nothing if the model has not been loaded
        if (entry === undefined) {
            return
        }

        entry.references--

        // Call unregister for the Lua model unless the current model is a Lua model.
        if (model !== Model.LUA) {
            this.unregister(Model.LUA)
        }

        // delete the pool if no document is referencing it
        if (entry.references === 0) {
            this.pool.delete(model)
        }
        // otherwise update the pool
        else {
            this.pool.set(model, entry)
        }
    }

    private get(model: Model): PoolEntry {
        const entry = this.pool.get(model)

        if (entry === undefined) {
            throw new Error(`Attempted to access the non-existant ${model} entry.`)
        }

        entry.references++
        this.pool.set(model, entry)

        // Update the Lua entry unless the given model is a Lua model.
        if (model !== Model.LUA) {
            this.pool.get(Model.LUA)
        }

        return entry
    }

    private load = async (model: Model): Promise<PoolEntry> => {
        return new Promise<PoolEntry>(async (
            resolve: (value?: PoolEntry) => void,
            reject: (reason?: Error) => void
        ) : Promise<void> => {
            let luaEntry: PoolEntry | undefined

            // All models need the Lua entry, except the Lua model.
            if (model !== Model.LUA) {
                try {
                    luaEntry = await this.register(Model.LUA)

                    // If the current model is undefined, then we can resolve as a Lua entry.
                    if (model === undefined) {
                        resolve(luaEntry)
                    }
                }
                catch (e) {
                    reject(e)
                }
            }

            switch (model) {
                case Model.KI2450:
                case Model.KI2460:
                case Model.LUA:
                    try {
                        const instrModule: InstrumentModule = require(`./instrument/${model}`)

                        const api: Array<ApiSpec> = await instrModule.getApiSpec()
                        const spec: InstrumentSpec = await instrModule.getInstrumentSpec()

                        const cmdSet: CommandSet = await generateCommandSet(api, spec)

                        // If this is not a Lua model, then merge the Lua entry.
                        if (luaEntry !== undefined) {
                            api.push(...luaEntry.apiSpec)
                            cmdSet.add(
                                {
                                completionDocs: luaEntry.commandSet.completionDocs,
                                completions: luaEntry.commandSet.completions,
                                signatures: luaEntry.commandSet.signatures
                            })
                        }

                        resolve({
                            apiSpec: api,
                            commandSet: cmdSet,
                            instrumentSpec: spec,
                            references: 1
                        })
                    }
                    catch (e) {
                        reject(e)
                    }

                    break

                default:
                    reject(new Error(`Model ${model} not supported`))
            }
        })
    }
}
