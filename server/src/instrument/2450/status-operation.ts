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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const statusOperationCompletions: Array<CompletionItem> = [
    {
        data: ['status'],
        kind: CompletionItemKind.Module,
        label: 'operation'
    },
    {
        data: ['operation', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.operation.condition\n```\n\nstatus.operation.condition -> number\n\
\n\
Returns a number that, in binary, represents the Operation Condition Register of the Operation Event Register. The \
value is the binary sum of all bits set in the register.\n\
\n\
When a mapped event occurs, its associated bit in the Operation Condition Register is set to 1.'
        },
        kind: CompletionItemKind.Constant,
        label: 'condition',
    },
    {
        data: ['operation', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.operation.enable\n```\n\
\n\
Get or set a 14 bit number that, in binary, represents the Operation Event Enable Register of the Operation Event \
Register. The value is the binary sum of all bits set in the register.\n\
\n\
When a bit in the Operation Event Register and its corresponding Operation Event Enable Register bit is set, the \
Operation Summary Bit (OSB) of the Status Byte (STB) register is also set.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['operation', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.operation.event\n```\n\nstatus.operation.event -> number\n\
\n\
Returns a number that, in binary, represents the Operation Event Register. The value is the binary sum of all bits \
set in the register.'
        },
        kind: CompletionItemKind.Constant,
        label: 'event',
    },
    {
        data: ['operation', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getmap(bitNumber)\n```\n\nstatus.operation.getmap(bitNumber) -> number, number\n\
\n\
Returns `setEvent, clearEvent` where \
*setEvent* is an Operation Event mapped to set this bit \
and *clearEvent* is an Operation Event mapped to clear this bit. \
If either is 0, then that event is not mapped.'
        },
        kind: CompletionItemKind.Function,
        label: 'getmap',
    },
    {
        data: ['operation', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setmap(bitNumber, setEvent, clearEvent)\n```\n\
\n\
status.operation.setmap(bitNumber, setEvent[, clearEvent])\n\
\n\
Map set and clear events to a Operation Event Register bit, where setEvent and clearEvent are valid event numbers. \
An event value of 0 is ignored.\n\
\n\
When an event is a setEvent, it sets the corresponding bits in the Operation Condition Register and Operation Event \
Register upon detection. When an event is a clearEvent, the corresponding bit in the Operation Condition Register is \
set to 0 upon detection.'
        },
        kind: CompletionItemKind.Function,
        label: 'setmap',
    },
]

const statusOperationSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'status.operation.getmap(bitNumber)',
        undefined,
        ParameterInformation.create(
            'bitNumber',
            'The bit number to check.'
        ),
    ),
    SignatureInformation.create(
        'status.operation.setmap(bitNumber, setEvent[, clearEvent])',
        undefined,
        ParameterInformation.create(
            'bitNumber',
            'The bit number that is mapped to an event (0 to 14).'
        ),
        ParameterInformation.create(
            'setEvent',
            'The number of the event that sets the bits in the condition and event registers; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'clearEvent',
            'The number of the event that clears the bit in the condition register; 0 if no mapping.'
        ),
    ),
]

export async function getStatusOperationCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(statusOperationCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getStatusOperationSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(statusOperationSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
