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

const localnodeEnumCompletions: Array<CompletionItem> = [
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_EXCLUSIVE'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_FULL'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_LOCKOUT'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_PROTECTED'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'DISABLE'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ENABLE'
    },
]

export async function getLocalnodeEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(localnodeEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
