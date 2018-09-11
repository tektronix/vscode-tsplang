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

import { InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available LAN events. Indexed from 1 to 8.'
        },
        kind: CompletionItemKind.Module,
        label: 'lanin'
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the event detector and reset the overrun indicator of the currently indexed LAN trigger.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanin[N].edge\n```\n\
\n\
Get or set the trigger edge logic for the currently indexed LAN trigger to trigger.EDGE_\\*. Defaults to \
trigger.EDGE_EITHER.\n\
\n\
LAN trigger edge logic is meant to simulate that of digital I/O lines. Because communition over LAN cannot express an \
edge state in the traditional sense, LAN trigger packets with a falling edge have a negative state while those with a \
rising edge have a positive state.'
        },
        kind: CompletionItemKind.Property,
        label: 'edge',
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanin[N].overrun\n```\n\ntrigger.lanin[N].overrun -> boolean\n\
\n\
Returns true if an event was ignored because the event detector was already in the detected state and false otherwise.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.lanin[N].wait(timeout) -> boolean\n\
\n\
Returns a boolean value indicating whether a LAN trigger event occurred since the last time this or the clear \
function was called. If no event is detected after timeout seconds, then false is returned. If an event is detected \
or has occurred previously, then true is returned immediately.\n\
\n\
After detecting a trigger with this function, the event detector automatically resets and rearms regardless of the \
number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'trigger.lanin[].wait(timeout)',
        parameters: [
            {
                documentation: 'Timeout in seconds.',
                label: 'timeout',
            },
        ],
    },
]
