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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation } from 'vscode-languageserver'

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        data: ['status'],
        kind: CompletionItemKind.Module,
        label: 'questionable'
    },
    {
        data: ['questionable', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.questionable.condition\n```\n\nstatus.questionable.condition -> number\n\
\n\
Returns a number that, in binary, represents the Questionable Condition Register of the Questionable Event Register. \
The value is the binary sum of all bits set in the register.\n\
\n\
When a mapped event occurs, its associated bit in the Questionable Condition Register is set to 1.'
        },
        kind: CompletionItemKind.Constant,
        label: 'condition',
    },
    {
        data: ['questionable', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.questionable.enable\n```\n\
\n\
Get or set a 14 bit number that, in binary, represents the Questionable Event Enable Register of the Questionable \
Event Register. The value is the binary sum of all bits set in the register.\n\
\n\
When a bit in the Questionable Event Register and its corresponding Questionable Event Enable Register bit is set, \
the Measurement Status Bit (MSB) and Questionable Summary Bit (QSB) of the Status Byte (STB) register are also set.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['questionable', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.questionable.event\n```\n\nstatus.questionable.event -> number\n\
\n\
Returns a number that, in binary, represents the Questionable Event Register. The value is the binary sum of all bits \
set in the register.'
        },
        kind: CompletionItemKind.Constant,
        label: 'event',
    },
    {
        data: ['questionable', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getmap(bitNumber)\n```\n\
\n\
status.questionable.getmap(bitNumber) -> number, number\n\
\n\
Returns `setEvent, clearEvent` where \
*setEvent* is a Questionable Event mapped to set this bit \
and *clearEvent* is a Questionable Event mapped to clear this bit. \
If either is 0, then that event is not mapped.'
        },
        kind: CompletionItemKind.Function,
        label: 'getmap',
    },
    {
        data: ['questionable', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setmap(bitNumber, setEvent, clearEvent)\n```\n\
\n\
status.questionable.setmap(bitNumber, setEvent[, clearEvent])\n\
\n\
Map set and clear events to a Questionable Event Register bit, where setEvent and clearEvent are valid event numbers. \
An event value of 0 is ignored.\n\
\n\
When an event is a setEvent, it sets the corresponding bits in the Questionable Condition Register and Questionable \
Event Register upon detection. When an event is a clearEvent, the corresponding bit in the Questionable Condition \
Register is set to 0 upon detection.'
        },
        kind: CompletionItemKind.Function,
        label: 'setmap',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'status.questionable.getmap(bitNumber)',
        parameters: [
            {
                documentation: 'The bit number to check (0 to 14).',
                label: 'bitNumber',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'status.questionable.setmap(bitNumber, setEvent[, clearEvent])',
        parameters: [
            {
                documentation: 'The bit number that is mapped to an event (0 to 14).',
                label: 'bitNumber',
            },
            {
                documentation: 'The number of the event that sets the bits in the condition and event registers; 0 if \
no mapping is set.',
                label: 'setEvent',
            },
            {
                documentation: 'The number of the event that clears the bit in the condition register; 0 if no \
mapping is set.',
                label: 'clearEvent',
            },
        ],
    },
]
