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

import { BaseItem, CompletionItem, MarkupContentCallback, ResolvedNamespace, SignatureInformation } from '../decorators'

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
    readonly completionDepthMap: Map<number, Array<CompletionItem>>
    readonly completionDocs: Map<string, MarkupContentCallback>
    readonly signatureDepthMap: Map<number, Array<SignatureInformation>>
    readonly specification: InstrumentSpec

    constructor(spec: InstrumentSpec) {
        this.completionDepthMap = new Map()
        this.completionDocs = new Map()
        this.signatureDepthMap = new Map()
        this.specification = spec
    }

    get completions(): Array<CompletionItem> {
        const result = new Array<CompletionItem>()
        this.completionDepthMap.forEach((value: Array<CompletionItem>) => {
            result.push(...value)
        })

        return result
    }

    get signatures(): Array<SignatureInformation> {
        const result = new Array<SignatureInformation>()
        this.signatureDepthMap.forEach((value: Array<SignatureInformation>) => {
            result.push(...value)
        })

        return result
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
            const depth = (value.data === undefined) ? 0 : value.data.domains.length
            const completions = this.completionDepthMap.get(depth) || new Array<CompletionItem>()
            completions.push(value)
            this.completionDepthMap.set(depth, completions)
        })

        // merge signatures
        if (set.signatures !== undefined) {
            set.signatures.forEach((value: SignatureInformation) => {
                const depth = SignatureInformation.depth(value)
                const signatures = this.signatureDepthMap.get(depth) || new Array<SignatureInformation>()
                signatures.push(value)
                this.signatureDepthMap.set(depth, signatures)
            })
        }
    }
}
