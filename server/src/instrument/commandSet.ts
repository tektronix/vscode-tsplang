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

import { CommandDocumentation, InstrumentCompletionItem, InstrumentSignatureInformation } from '../wrapper'

import { InstrumentSpec } from '.'

export interface CommandSetInterface {
    completionDocs?: Map<string, CommandDocumentation>
    completions: Array<InstrumentCompletionItem>
    signatures?: Array<InstrumentSignatureInformation>
}
export namespace CommandSetInterface {
    export function getCompletionMap(
        completions: Array<InstrumentCompletionItem>
    ): Map<string, Array<InstrumentCompletionItem>> {
        const result = new Map<string, Array<InstrumentCompletionItem>>()

        completions.forEach((value: InstrumentCompletionItem) => {
            const namespace = InstrumentCompletionItem.resolveNamespace(value)

            const item = result.get(namespace) || new Array<InstrumentCompletionItem>()
            item.push(value)

            result.set(namespace, item)
        })

        return result
    }

    export function getSignatureMap(
        signatures: Array<InstrumentSignatureInformation>
    ): Map<string, Array<InstrumentSignatureInformation>> {
        const result = new Map<string, Array<InstrumentSignatureInformation>>()

        signatures.forEach((value: InstrumentSignatureInformation) => {
            const namespace = InstrumentSignatureInformation.resolveNamespace(value)

            const item = result.get(namespace) || new Array<InstrumentSignatureInformation>()
            item.push(value)

            result.set(namespace, item)
        })

        return result
    }
}

export class CommandSet implements CommandSetInterface {
    readonly completionDocs: Map<string, CommandDocumentation>
    readonly completions: Array<InstrumentCompletionItem>
    readonly signatures: Array<InstrumentSignatureInformation>
    readonly specification: InstrumentSpec

    constructor(spec: InstrumentSpec) {
        this.completionDocs = new Map()
        this.completions = new Array()
        this.signatures = new Array()
        this.specification = spec
    }

    add(set: CommandSetInterface): void {
        // merge completion documentation
        if (set.completionDocs !== undefined) {
            set.completionDocs.forEach((value: CommandDocumentation, key: string) => {
                this.completionDocs.set(key, value)
            })
        }

        // merge completion items
        set.completions.forEach((value: InstrumentCompletionItem) => {
            this.completions.push(value)
        })

        // merge signatures
        if (set.signatures !== undefined) {
            set.signatures.forEach((value: InstrumentSignatureInformation) => {
                this.signatures.push(value)
            })
        }
    }
}
