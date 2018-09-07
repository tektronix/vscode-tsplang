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

const statusStandardEnumCompletions: Array<CompletionItem> = [
    {
        data: ['standard', 'status'],
        detail: 'status.standard.OPC: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'OPC'
    },
    {
        data: ['standard', 'status'],
        detail: 'status.standard.QYE: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'QYE'
    },
    {
        data: ['standard', 'status'],
        detail: 'status.standard.PON: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'PON'
    },
]

export async function getStatusStandardEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(statusStandardEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
