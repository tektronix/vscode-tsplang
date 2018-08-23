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

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const tsplinkEnumCompletions: Array<CompletionItem> = [
    {
        data: ['tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Line serves as input, output, or both.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_DIGITAL_OPEN_DRAIN'
    },
    {
        data: ['tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Line serves as input trigger detection and output trigger generator.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_TRIGGER_OPEN_DRAIN'
    },
    {
        data: ['tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Detect falling-edge trigger input and automatically latch and drive the trigger \
line low. Assert an output trigger to release the latched line.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_SYNCHRONOUS_ACCEPTOR'
    },
    {
        data: ['tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Detect rising-edge trigger input and assert a transistor-transistor logic low pulse \
as output.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_SYNCHRONOUS_MASTER'
    },
    {
        data: ['tsplink'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_HIGH'
    },
    {
        data: ['tsplink'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LOW'
    },
]

export async function getTsplinkEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tsplinkEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
