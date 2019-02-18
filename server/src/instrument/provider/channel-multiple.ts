/*
 *  Copyright Tektronix Inc.
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
        data: { domains: ['channel'] },
        kind: CompletionItemKind.Module,
        label: 'multiple'
    },
    {
        data: { domains: ['multiple', 'channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction close(channelList)\n```\n\
\n\
channel.multiple.close(channelList)\n\
\n\
Closes the listed channels without affecting any other channels, including backplane relays and paired channels.\n\
\n\
If the channel list is very large, you should use the opc() function with the multiple close.'
        },
        kind: CompletionItemKind.Function,
        label: 'close'
    },
    {
        data: { domains: ['multiple', 'channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction open(channelList)\n```\n\
\n\
channel.multiple.open(channelList)\n\
\n\
Opens the channels in the channel list without affecting any others, including backplane relays and paired channels.'
        },
        kind: CompletionItemKind.Function,
        label: 'open'
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'channel.multiple.close(channelList)',
        parameters: [
            {
                documentation: 'A string listing the channels to close.',
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.multiple.open(channelList)',
        parameters: [
            {
                documentation: 'A string listing the channels to open.',
                label: 'channelList',
            },
        ],
    },
]
