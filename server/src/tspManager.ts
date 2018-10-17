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

import { TextDocumentItem } from 'vscode-languageserver'

import { DocumentContext } from './documentContext'
import { ApiSpec, CommandSet, InstrumentSpec } from './instrument'
import { getLuaApiSpec, getLuaInstrumentSpec } from './instrument/lua'
import { generateCommandSet } from './instrument/provider'
import { Model } from './model'
import { Shebang } from './shebang'
import { PoolEntry, TspPool } from './tspPool'

export interface TspItem {
    commandSet: CommandSet
    context?: DocumentContext
    node?: Map<number, CommandSet>
    rawShebang?: string
    shebang?: Array<Shebang.ShebangToken>
}

export class TspManager {
    private dict: Map<string, TspItem>
    private pool: TspPool

    constructor() {
        this.dict = new Map()
        this.pool = new TspPool()
    }

    get(uri: string): TspItem | undefined {
        return this.dict.get(uri)
    }

    has(uri: string): boolean {
        return this.dict.has(uri)
    }

    async register(document: TextDocumentItem): Promise<void> {
        return new Promise<void>(async (
            resolve: (value?: void) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            // check if the doc has already been registered
            if (this.dict.has(document.uri)) {
                reject(new Error('Document already registered'))

                return
            }

            const shebangLine = this.getShebangLine(document)

            try {
                // try to make a new entry item for this document
                let item = await this.generateBasicItem(shebangLine)

                // use valid shebang to populate model-specific items
                item = await this.getPoolItems(item)

                item.context = new DocumentContext(document.uri, document.text)

                this.dict.set(document.uri, item)

                resolve()
            } catch (e) {
                reject(new Error('Document Registration ' + e.toString()))
            }
        })
    }

    unregister(uri: string): boolean {
        const tspCompletion = this.get(uri)

        if (tspCompletion === undefined) {
            return false
        }

        if (tspCompletion.shebang === undefined) {
            if (this.dict.has(uri)) {
                return this.dict.delete(uri)
            }

            return true
        }

        this.getModels(tspCompletion.shebang)
            .forEach((element: Model) => {
                this.pool.unregister(element)
        })

        return this.dict.delete(uri)
    }

    async update(document: TextDocumentItem): Promise<void> {
        return new Promise<void>(async (
            resolve: (value?: void) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            // check if the doc has not been registered
            if (!this.dict.has(document.uri)) {
                reject(new Error('Document is not registered'))

                return
            }

            const shebangLine = this.getShebangLine(document)

            // if the shebang is no longer valid, then un-register
            if (shebangLine === undefined) {
                const tspCompletion = this.dict.get(document.uri)

                if (tspCompletion === undefined) {
                    reject(new Error('Unable to load TSP information'))

                    return
                }

                if (tspCompletion.shebang === undefined) {
                    resolve()

                    return
                }

                this.getModels(tspCompletion.shebang)
                    .forEach((element: Model) => {
                        this.pool.unregister(element)
                })
                this.dict.delete(document.uri)

                resolve()

                return
            }

            const oldItem = this.dict.get(document.uri)

            if (oldItem === undefined) {
                reject(new Error('Unable to load TSP information'))

                return
            }

            // if the shebang has not changed, then no update is needed
            if (oldItem.rawShebang !== undefined && oldItem.rawShebang.localeCompare(shebangLine) === 0) {
                resolve()

                return
            }

            // try to make a new entry item for this document
            let item = await this.generateBasicItem(shebangLine)

            // if document shebang is invalid
            if (item === undefined) {
                const tspCompletion = this.dict.get(document.uri)

                if (tspCompletion === undefined) {
                    reject(new Error('Unable to load TSP information'))

                    return
                }

                if (tspCompletion.shebang === undefined) {
                    resolve()

                    return
                }

                this.getModels(tspCompletion.shebang)
                    .forEach((element: Model) => {
                        this.pool.unregister(element)
                })
                this.dict.delete(document.uri)

                resolve()

                return
            }

            // use valid shebang to populate completion items
            item = await this.getPoolItems(item)

            if (item.context === undefined) {
                item.context = new DocumentContext(document.uri, document.text)
            }
            else {
                item.context.update(document.text)
            }

            this.dict.set(document.uri, item)

            resolve()
        })
    }

    private generateBasicItem = async (shebangLine: string | undefined): Promise<TspItem> => {
        return new Promise<TspItem>(async (
            resolve: (value?: TspItem) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            let shebangTokens: Array<Shebang.ShebangToken>
            try {
                // get native Lua completions
                const apiLua: Array<ApiSpec> = await getLuaApiSpec()
                const specLua: InstrumentSpec = await getLuaInstrumentSpec()

                // parse shebang tokens
                shebangTokens = await Shebang.tokenize((shebangLine === undefined) ? '' : shebangLine)
                    .catch((reason: Error) => {
                        console.warn('Shebang Tokenizer: ' + reason.message)

                        return new Array<Shebang.ShebangToken>()
                    })

                const basicTspItem: TspItem = {
                    commandSet: await generateCommandSet(apiLua, specLua)
                }

                if (shebangLine !== undefined) {
                    basicTspItem.rawShebang = shebangLine
                }

                if (shebangTokens.length > 0) {
                    basicTspItem.shebang = shebangTokens
                }

                resolve(basicTspItem)
            } catch (e) {
                // a VALID shebang is required for document registration
                reject(new Error('Lua Completions: ' + e.toString()))
            }
        })
    }

    private getModels = (tokens: Array<Shebang.ShebangToken>): Array<Model> => {
        const result: Array<Model> = new Array()
        tokens.forEach((element: Shebang.ShebangToken) => {
            result.push(element.model)
        })

        return result
    }

    /**
     * Add previously loaded Completions and Signatures to the given TspItem.
     * @param item - Item to fill.
     */
    private async getPoolItems(item: TspItem): Promise<TspItem> {
        return new Promise<TspItem>(async (
            resolve: (value?: TspItem) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            const result: TspItem = item

            // if no shebang is present, then return what we were given
            if (result.shebang === undefined) {
                resolve(result)

                return
            }

            // get models from shebang
            for (const token of result.shebang) {
                // try to get the entry for this model
                let entry: PoolEntry
                try {
                    entry = await this.pool.register(token.model)
                }
                catch (e) {
                    reject(new Error('Pool Item Lookup ' + e.toString()))

                    return
                }

                // if element has no node number, then assume master model
                if (token.node === undefined) {
                    result.commandSet = entry.commandSet
                }
                else {
                    if (result.node === undefined) {
                        result.node = new Map()
                    }

                    if (entry.commandSet !== undefined) {
                        result.node.set(
                            token.node,
                            entry.commandSet
                        )
                    }
                }
            }

            resolve(result)
        })
    }

    private getShebangLine = (document: TextDocumentItem): string | undefined => {
        // get the entire shebang line
        const matches = document.text.match(
            (Shebang.prefix).concat('.*')
        )

        if (matches === null) {
            return undefined
        }

        const firstElement = matches.shift()

        if (firstElement === undefined) {
            return undefined
        }

        return firstElement.trim()
    }
}
