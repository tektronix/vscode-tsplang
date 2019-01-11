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

import { Diagnostic, TextDocuments } from 'vscode-languageserver'

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

    register(uri: string, documentSettings: TsplangSettings): Array<Diagnostic> | undefined {
        // check if the doc has already been registered
        if (this.dict.has(uri)) {
            throw new Error('Document already registered.')
        }

        const document = this.documents.get(uri)

        if (document === undefined) {
            throw new Error('Unable to fetch document from document manager.')
        }

        const firstLine = document.getText({
            end: { character: 0, line: 0 },
            start: { character: 0, line: 1 }
        }).trim()

        // Try to parse the shebang.
        const [shebang, errors]: [Shebang, Array<Diagnostic>] = Shebang.tokenize(firstLine)

        // Try to make a new TspItem instance.
        const tspItem = TspItem.create(document, shebang, documentSettings, this.pool)

        tspItem.context.update()
        tspItem.context.walk()

        this.dict.set(document.uri, tspItem)

        return errors
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

    update(uri: string): Array<Diagnostic> | undefined {
        // check if the doc has not been registered
        if (!this.dict.has(uri)) {
            throw new Error('Document is not registered.')
        }

        const document = this.documents.get(uri)

        if (document === undefined) {
            throw new Error('Unable to fetch document from document manager.')
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
            // The context was updated by register, so we're done.
            return this.register(uri, item.context.settings)
        }

        // Update this item's context.
        item.context.update()
        item.context.walk()
    }
}
