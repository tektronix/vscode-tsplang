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

import { CompletionItem, SignatureInformation } from 'vscode-languageserver'

import { get2450Completions, get2450Signatures } from './instrument/2450'
// import { get2460Completions, get2460Signatures } from './instrument/2460'
// import { get2461Completions, get2461Signatures } from './instrument/2461'
// import { get6500Completions, get6500Signatures } from './instrument/6500'
import { getLuaCompletions, getLuaSignatures } from './lua'
import { Model } from './model'

export interface PoolEntry {
    completions: Array<CompletionItem>
    references: number
    signatures: Array<SignatureInformation>
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
            let complLua: Array<CompletionItem> = new Array()
            let signaLua: Array<SignatureInformation> = new Array()

            try {
                complLua = await getLuaCompletions()
            }
            catch (e) {
                reject(new Error('Unable to load Lua completions'))
            }

            try {
                signaLua = await getLuaSignatures()
            }
            catch (e) {
                reject(new Error('Unable to load Lua signatures'))
            }

            switch (model) {
                case Model.KI2450:
                    let compl2450: Array<CompletionItem> = new Array()
                    let signa2450: Array<SignatureInformation> = new Array()

                    try {
                        compl2450 = await get2450Completions()
                    }
                    catch (e) {
                        reject(new Error('Unable to load 2450 completions'))
                    }

                    try {
                        signa2450 = await get2450Signatures()
                    }
                    catch (e) {
                        reject(new Error('Unable to load 2450 signatures'))
                    }

                    resolve({
                        completions: complLua.concat(compl2450),
                        references: 1,
                        signatures: signaLua.concat(signa2450)
                    })
                    break
                // case Model.KI2460:
                //     let compl2460: Array<CompletionItem> = new Array()
                //     let signa2460: Array<SignatureInformation> = new Array()

                //     try {
                //         compl2460 = await get2460Completions()
                //     }
                //     catch (e) {
                //         reject(new Error('Unable to load 2460 completions'))
                //     }

                //     try {
                //         signa2460 = await get2460Signatures()
                //     }
                //     catch (e) {
                //         reject(new Error('Unable to load 2460 signatures'))
                //     }

                //     resolve({
                //         completions: compl2460,
                //         references: 1,
                //         signatures: signa2460
                //     })
                //     break
                // case Model.KI2461:
                //     /* fall through */
                // case Model.KI2461SYS:
                //     let compl2461: Array<CompletionItem> = new Array()
                //     let signa2461: Array<SignatureInformation> = new Array()

                //     try {
                //         compl2461 = await get2461Completions()
                //     }
                //     catch (e) {
                //         reject(new Error('Unable to load 2461 completions'))
                //     }

                //     try {
                //         signa2461 = await get2461Signatures()
                //     }
                //     catch (e) {
                //         reject(new Error('Unable to load 2461 signatures'))
                //     }

                //     resolve({
                //         completions: compl2461,
                //         references: 1,
                //         signatures: signa2461
                //     })
                //     break
                // case Model.KI6500:
                //     let compl6500: Array<CompletionItem> = new Array()
                //     let signa6500: Array<SignatureInformation> = new Array()

                //     try {
                //         compl6500 = await get6500Completions()
                //     }
                //     catch (e) {
                //         reject(new Error('Unable to load 6500 completions'))
                //     }

                //     try {
                //         signa6500 = await get6500Signatures()
                //     }
                //     catch (e) {
                //         reject(new Error('Unable to load 6500 signatures'))
                //     }

                //     resolve({
                //         completions: compl6500,
                //         references: 1,
                //         signatures: signa6500
                //     })
                //     break
                default:
                    reject(new Error(`Model ${model} not supported`))
            }
        })
    }
}
