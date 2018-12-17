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

import { CompletionItem, MarkupContent, MarkupContentCallback, SignatureInformation } from '../decorators'

import { InstrumentSpec } from '.'

export interface CommandSetInterface {
    completionDocs?: Map<string, MarkupContentCallback>
    completions: Array<CompletionItem>
    signatures?: Array<SignatureInformation>
}
export namespace CommandSetInterface {
    export function getCompletionMap(
        completions: Array<CompletionItem>
    ): Map<string, Array<CompletionItem>> {
        const result = new Map<string, Array<CompletionItem>>()

        completions.forEach((value: CompletionItem) => {
            const namespace = CompletionItem.resolveNamespace(value)

            const item = result.get(namespace) || new Array<CompletionItem>()
            item.push(value)

            result.set(namespace, item)
        })

        return result
    }

    export function getSignatureMap(
        signatures: Array<SignatureInformation>
    ): Map<string, Array<SignatureInformation>> {
        const result = new Map<string, Array<SignatureInformation>>()

        signatures.forEach((value: SignatureInformation) => {
            const namespace = SignatureInformation.resolveNamespace(value)

            const item = result.get(namespace) || new Array<SignatureInformation>()
            item.push(value)

            result.set(namespace, item)
        })

        return result
    }
}

export class CommandSet implements CommandSetInterface {
    readonly completionDocs: Map<string, MarkupContentCallback>
    readonly completions: Array<CompletionItem>
    readonly signatures: Array<SignatureInformation>
    readonly specification: InstrumentSpec
    /**
     * An array of Array.slice instruction tuples which, when each is performed
     * on the main completion array, results in an array of root completions.
     */
    private rootCompletionSlices: Array<[number, number]>

    constructor(spec: InstrumentSpec) {
        this.completionDocs = new Map()
        this.completions = new Array()
        this.signatures = new Array()
        this.specification = spec

        this.rootCompletionSlices = new Array()
    }

    add(set: CommandSetInterface): void {
        // merge completion documentation
        if (set.completionDocs !== undefined) {
            set.completionDocs.forEach((value: MarkupContentCallback, key: string) => {
                this.completionDocs.set(key, value)
            })
        }

        // merge completion items
        set.completions.forEach((value: CompletionItem) => {
            this.completions.push(value)

            // If this value has no "data" property, then it is a root completion.
            if (value.data === undefined) {
                const exclusiveCompletionsIndex = this.completions.length
                const currentCompletionsIndex = exclusiveCompletionsIndex - 1

                // Get the last slice range
                if (this.rootCompletionSlices.length > 0) {
                    const range = this.rootCompletionSlices[this.rootCompletionSlices.length - 1]

                    // If the last range ends where this range begins.
                    if (range[1] === currentCompletionsIndex) {
                        // Modify the ending index of the last range and update the array.
                        range[1] = exclusiveCompletionsIndex

                        this.rootCompletionSlices[this.rootCompletionSlices.length - 1] = range

                        return
                    }
                }

                // Store the new index of the value for later.
                this.rootCompletionSlices.push([currentCompletionsIndex, exclusiveCompletionsIndex])
            }
        })

        // merge signatures
        if (set.signatures !== undefined) {
            set.signatures.forEach((value: SignatureInformation) => {
                this.signatures.push(value)
            })
        }
    }

    getRootCompletions(): Array<CompletionItem> | undefined {
        // We cannot provide root completions if no completions exist.
        if (this.rootCompletionSlices.length === 0) {
            return
        }

        const results = new Array<CompletionItem>()

        for (const range of this.rootCompletionSlices) {
            const found = this.completions.slice(...range)

            results.push(...found)
        }

        return results
    }
}
