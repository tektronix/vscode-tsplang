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

const digioEnumCompletions: Array<CompletionItem> = [
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Automatically detect externally generated logic levels. \
Input lines can be read from but not written to.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_DIGITAL_IN'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Line serves as input, output, or both. \
A 1 must be written to a line used as an input in open-drain mode.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_DIGITAL_OPEN_DRAIN'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Can be configured as logic low (default; 0 V) or as logic high (+5 V). \
Output lines are actively driven high or low.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_DIGITAL_OUT'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Automatically detect and respond to externally generated triggers. \
Input can be rising, falling, or either-edged as specified by the trigger.digin[N].edge attribute.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_TRIGGER_IN'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Line serves as input trigger detection and output trigger generator. \
Input edge state is specified by the trigger.digin[N].edge attribute.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_TRIGGER_OPEN_DRAIN'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Automatically set high or low depending on the output logic setting. \
Use the postive logic setting to generate a rising edge trigger and the negative logic setting to generate a falling \
edge trigger.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_TRIGGER_OUT'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Detect falling-edge trigger input and automatically latch and drive the trigger \
line low. Assert an output trigger to release the latched line.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_SYNCHRONOUS_ACCEPTOR'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Detect rising-edge trigger input and assert a transistor-transistor logic low pulse \
as output.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_SYNCHRONOUS_MASTER'
    },
    {
        data: ['digio'],
        detail: 'digio.STATE_HIGH: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_HIGH'
    },
    {
        data: ['digio'],
        detail: 'digio.STATE_LOW: 0',
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LOW'
    },
]

export async function getDigioEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(digioEnumCompletions)
            } catch (e) {
                reject(new Error(e.toString()))
            }
    })
}
