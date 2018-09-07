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

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const tspnetEnumCompletions: Array<CompletionItem> = [
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_CR'
    },
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_CRLF'
    },
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_LF'
    },
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_LFCR'
    },
]

export async function getTspnetEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tspnetEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
