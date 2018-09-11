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

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { resolveCompletionNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available LAN events. Indexed from 1 to 8.'
        },
        kind: CompletionItemKind.Module,
        label: 'lanout'
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction assert()\n```\n\
\n\
Assert a trigger event on the currently indexed LAN trigger, returning before it has completed.'
        },
        kind: CompletionItemKind.Function,
        label: 'assert',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction connect()\n```\n\
\n\
Prepare the event generator to send event messages on the currently indexed LAN trigger. For TCP connections, this \
initiates a TCP session.\n\
\n\
The event generator automatically disconnects when either the LAN trigger protocol or ipaddress attributes are \
changed.'
        },
        kind: CompletionItemKind.Function,
        label: 'connect',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanout[N].connected\n```\n\ntrigger.lanout[N].connected -> boolean\n\
\n\
Returns true when the currently indexed LAN trigger is connected and ready to send trigger events and false \
otherwise.\n\
\n\
Automatically set to false when either the LAN trigger protocol or ipaddress attributes are changed or when that IP \
address closes the connection.'
        },
        kind: CompletionItemKind.Constant,
        label: 'connected',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction disconnect()\n```\n\
\n\
Disconnects the event generator for the currently indexed LAN trigger. For TCP connections, this closes the TCP \
session.\n\
\n\
The event generator automatically disconnects when either the LAN trigger protocol or ipaddress attributes are \
changed.'
        },
        kind: CompletionItemKind.Function,
        label: 'disconnect',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanout[N].ipaddress\n```\n\
\n\
Get or set a TCP or UDP listener for the currently indexed LAN trigger to an IPv4 address string. Defaults to \
0.0.0.0\n\
\n\
Any previously established connection on the currently indexed LAN trigger must be reestablished after updating this \
attribute.'
        },
        kind: CompletionItemKind.Property,
        label: 'ipaddress',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanout[N].logic\n```\n\
\n\
Get or set the logic used by the output trigger generator for the currently indexed LAN trigger to trigger.LOGIC_\\*. \
Defaults to trigger.LOGIC_NEGATIVE.'
        },
        kind: CompletionItemKind.Property,
        label: 'logic',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanout[N].protocol\n```\n\
\n\
Get or set the trigger protocol used by the currently indexed LAN trigger to trigger.PROTOCOL_\\*. Defaults to \
trigger.PROTOCOL_TCP.\n\
\n\
When set to trigger.PROTOCOL_MULTICAST, the LAN trigger ipaddress attribute is ignored and trigger messages are sent \
to multicast address 224.0.23.159.\n\
\n\
The LAN trigger listens for trigger messages on all supported protocols. The designated protocol is only used for \
sending outgoing trigger messages.\n\
\n\
Any previously established connection on the currently indexed LAN trigger must be reestablished after updating this \
attribute.'
        },
        kind: CompletionItemKind.Property,
        label: 'protocol',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanout[N].stimulus\n```\n\
\n\
Get or set the trigger event for the currently indexed LAN trigger to trigger.EVENT_\\*. Defaults to \
trigger.EVENT_NONE.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]
