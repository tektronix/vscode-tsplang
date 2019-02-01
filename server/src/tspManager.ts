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

import { Diagnostic, TextDocument, TextDocumentContentChangeEvent, TextDocumentItem, VersionedTextDocumentIdentifier } from 'vscode-languageserver'

import { Model } from './model'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { TspItem } from './tspItem'
import { TspPool } from './tspPool'

export class TspManager {
    /**
     * A Map keyed to a document uri and whose associated key-value is a TspDocument.
     */
    private dict: Map<string, TspItem>
    private readonly firstlineRegExp: RegExp
    private pool: TspPool

    constructor() {
        this.dict = new Map()
        this.pool = new TspPool()

        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
    }

    all(): Array<string> {
        return [...this.dict.keys()]
    }

    get(uri: string): TspItem | undefined {
        return this.dict.get(uri)
    }

    has(uri: string): boolean {
        return this.dict.has(uri)
    }

    // register(item: TextDocumentItem, documentSettings: TsplangSettings): Array<Diagnostic> {
    //     // check if the doc has already been registered
    //     if (this.dict.has(item.uri)) {
    //         throw new Error(`${item.uri} is already registered`)
    //     }

    //     const firstLine = this.firstlineRegExp.exec(item.text)[0]

    //     // Try to parse the shebang.
    //     const [shebang, errors]: [Shebang, Array<Diagnostic>] = Shebang.tokenize(firstLine)

    //     // Register the shebang in the TspPool.
    //     const poolEntry = this.pool.register(shebang.master)

    //     // Try to make a new TspItem instance.
    //     const tspItem = TspItem.create(item, shebang, poolEntry.commandSet, documentSettings)

    //     // tspItem.context.update()
    //     // errors.push(...tspItem.context.walk())

    //     this.dict.set(item.uri, tspItem)

    //     return errors
    // }

    // unregister(uri: string): boolean {
    //     const tspCompletion = this.get(uri)

    //     if (tspCompletion === undefined) {
    //         return false
    //     }

    //     // Unregister the master model.
    //     this.pool.unregister(tspCompletion.shebang.master)

    //     // Unregister any node models.
    //     if (tspCompletion.shebang.nodes !== undefined) {
    //         tspCompletion.shebang.nodes.forEach((model: Model) => {
    //             this.pool.unregister(model)
    //         })
    //     }

    //     return this.dict.delete(uri)
    // }

    // update(
    //     document: VersionedTextDocumentIdentifier,
    //     changes: Array<TextDocumentContentChangeEvent>
    // ): Array<Diagnostic> | undefined {
    //     const tspItem = this.dict.get(document.uri)

    //     // If the doc has not been registered
    //     if (tspItem === undefined) {
    //         throw new Error(`${document.uri} is not registered`)
    //     }

    //     let shebangEdit = false
    //     let newContent = tspItem.context.document.getText()
    //     for (const change of changes) {
    //         shebangEdit = change.range.start.line === 0

    //         newContent = TextDocument.applyEdits(tspItem.context.document, [{
    //             newText: change.text,
    //             range: change.range
    //         }])
    //     }

    //     if (shebangEdit) {
    //         // Unregister everything.
    //         this.unregister(document.uri)

    //         // Re-register everything.
    //         // The context was updated by register, so we're done.
    //         return this.register(
    //             {
    //                 languageId: tspItem.context.document.languageId,
    //                 text: newContent,
    //                 uri: document.uri,
    //                 version: document.version
    //             },
    //             tspItem.context.settings
    //         )
    //     }

    //     // // Update this item's context.
    //     // tspItem.context.update()

    //     // return tspItem.context.walk()
    // }
}
