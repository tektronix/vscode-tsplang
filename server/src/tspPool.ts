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
            const entry = this.pool.get(model)

            // if the model has already been loaded
            if (entry !== undefined) {
                entry.references++
                // update the pool
                this.pool.set(model, entry)

                resolve(entry)
            }

            let newEntry: PoolEntry
            try {
                newEntry = await this.load(model)
                // add new model to the current pool
                this.pool.set(model, newEntry)

                resolve(newEntry)
            }
            catch (e) {
                reject(new Error('Registration failed: ' + e.toString()))
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

        // delete the pool if no document is referencing it
        if (entry.references === 0) {
            this.pool.delete(model)
        }
        // otherwise update the pool
        else {
            this.pool.set(model, entry)
        }
    }

    private load = async (model: Model): Promise<PoolEntry> => {
        return new Promise<PoolEntry>(async (
            resolve: (value?: PoolEntry) => void,
            reject: (reason?: Error) => void
        ) : Promise<void> => {
            switch (model) {
                case Model.KI2450:
                case Model.KI2460:
                    try {
                        const instrModule: InstrumentModule = require(`./instrument/${model}`)

                        const api: Array<ApiSpec> = await instrModule.getApiSpec()
                        const spec: InstrumentSpec = await instrModule.getInstrumentSpec()

                        const cmdSet: CommandSet = await generateCommandSet(api, spec)

                        resolve({
                            apiSpec: api,
                            commandSet: cmdSet,
                            instrumentSpec: spec,
                            references: 1
                        })
                    }
                    catch (e) {
                        reject(new Error('Load failure: ' + e.toString()))
                    }

                    break

                default:
                    reject(new Error(`Model ${model} not supported`))
            }
        })
    }
}
