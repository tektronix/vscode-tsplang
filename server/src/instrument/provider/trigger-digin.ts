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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['trigger'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available digital I/O lines. Indexed from 1 to 6.'
        },
        kind: CompletionItemKind.Module,
        label: 'digin'
    },
    {
        data: { domains: ['digin', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the event detector and reset the overrun indicator of the currently indexed digital input line.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: { domains: ['digin', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digin[N].edge\n```\n\
\n\
Get or set the trigger edge logic for the currently indexed digital input line to trigger.EDGE_\\*. Defaults to \
trigger.EDGE_FALLING.\n\
\n\
To directly control the line state, set the mode of the line to digital and use the write command. When the digital \
line mode is set for open drain, the edge settings assert a transistor-transistor logic low‑pulse.'
        },
        kind: CompletionItemKind.Property,
        label: 'edge',
    },
    {
        data: { domains: ['digin', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digin[N].overrun\n```\n\ntrigger.digin[N].overrun -> boolean\n\
\n\
Returns true if an event was ignored because the event detector was already in the detected state and false otherwise.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: { domains: ['digin', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.digin[N].wait(timeout) -> boolean\n\
\n\
Returns a boolean value indicating whether a digital input trigger event occurred since the last time this or the \
clear function was called. If no event is detected after timeout seconds, then false is returned. If an event is \
detected or has occurred previously, then true is returned immediately.\n\
\n\
After detecting a trigger with this function, the event detector automatically resets and rearms regardless of the \
number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'trigger.digin[].wait(timeout)',
        parameters: [
            {
                documentation: 'Timeout in seconds.',
                label: 'timeout',
            },
        ],
    },
]
