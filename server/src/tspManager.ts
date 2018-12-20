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

import { TextDocuments } from 'vscode-languageserver'

import { Model } from './model'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { TspItem } from './tspItem'
import { TspPool } from './tspPool'

export class TspManager {
    private dict: Map<string, TspItem>
    private readonly documents: TextDocuments
    private pool: TspPool

    constructor(documents: TextDocuments) {
        this.documents = documents
        this.dict = new Map()
        this.pool = new TspPool()
    }

    get(uri: string): TspItem | undefined {
        return this.dict.get(uri)
    }

    has(uri: string): boolean {
        return this.dict.has(uri)
    }

    async register(uri: string, documentSettings: TsplangSettings): Promise<void> {
        return new Promise<void>(async (
            resolve: (value?: void) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            // check if the doc has already been registered
            if (this.dict.has(uri)) {
                reject(new Error('Document already registered.'))

                return
            }

            const document = this.documents.get(uri)

            if (document === undefined) {
                reject(new Error('Unable to fetch document from document manager.'))

                return
            }

            const firstLine = document.getText({
                end: { character: 0, line: 0 },
                start: { character: 0, line: 1 }
            }).trim()

            try {
                // Try to parse the shebang.
                const shebang = Shebang.tokenize(firstLine)

                // Try to make a new TspItem instance.
                const tspItem = await TspItem.create(document, shebang, documentSettings, this.pool)

                tspItem.context.update()
                tspItem.context.walk()

                this.dict.set(document.uri, tspItem)

                resolve()
            } catch (e) {
                reject(e)
            }
        })
    }

    unregister(uri: string): boolean {
        const tspCompletion = this.get(uri)

        if (tspCompletion === undefined) {
            return false
        }

        // Unregister the master model.
        this.pool.unregister(tspCompletion.shebang.master)

        // Unregister any node models.
        if (tspCompletion.shebang.nodes !== undefined) {
            tspCompletion.shebang.nodes.forEach((model: Model) => {
                this.pool.unregister(model)
            })
        }

        return this.dict.delete(uri)
    }

    async update(uri: string): Promise<void> {
        return new Promise<void>(async (
            resolve: (value?: void) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            // check if the doc has not been registered
            if (!this.dict.has(uri)) {
                reject(new Error('Document is not registered.'))

                return
            }

            const document = this.documents.get(uri)

            if (document === undefined) {
                reject(new Error('Unable to fetch document from document manager.'))

                return
            }

            // We already checked that the key exists in the Map.
            const item = this.dict.get(uri) as TspItem

            const firstLine = document.getText({
                end: { character: 0, line: 0 },
                start: { character: 0, line: 1 }
            }).trim()

            // If the shebang has changed.
            if (firstLine.localeCompare(item.shebang.text) !== 0) {
                // Unregister everything.
                this.unregister(uri)

                // Re-register everything.
                await this.register(uri, item.context.settings)

                // The context was updated by register, so we can resolve.
                resolve()

                return
            }

            // Update this item's context.
            item.context.update()
            item.context.walk()

            resolve()
        })
    }
}
