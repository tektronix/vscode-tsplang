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
import { CompletionItem, SignatureInformation } from 'vscode-languageserver'

import { InstrumentSpec } from '.'
import { CommandDocumentation, FormattableSignatureInformation } from './provider'

export interface CommandSetInterface {
    completionDocs?: Map<string, CommandDocumentation>
    completions: Array<CompletionItem>
    signatures?: Array<SignatureInformation | FormattableSignatureInformation>
}

export class CommandSet implements CommandSetInterface {
    readonly completionDocs: Map<string, CommandDocumentation>
    readonly completions: Array<CompletionItem>
    readonly signatures: Array<SignatureInformation>
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
        set.completions.forEach((value: CompletionItem) => {
            this.completions.push(value)
        })

        // merge signatures
        if (set.signatures !== undefined) {
            set.signatures.forEach((value: SignatureInformation) => {
                this.signatures.push(value)
            })
        }
    }
}
