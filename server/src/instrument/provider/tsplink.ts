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

import { InstrumentCompletionItem, InstrumentSignatureInformation } from '../../wrapper'

export const completions: Array<InstrumentCompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'tsplink'
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.group\n```\n\
\n\
Get or set the TSP-Link group as a number from 0-64. Defaults to 0 (no group).\n\
\n\
Nodes with a group value of 0 are automatically included in the group containing the master node.\n\
\n\
When a TSP-Link node is powered off, its group number changes to 0.'
        },
        kind: CompletionItemKind.Property,
        label: 'group',
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction initialize(expectedNodes)\n```\n\
\n\
tsplink.initialize([expectedNodes]) -> number\n\
\n\
Initialize all instruments in the TSP-Link system and return the number of nodes found, including the local node. If \
expectedNodes is specified and the return value is lower, then an error is logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'initialize',
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.master\n```\n\ntsplink.master -> number\n\
\n\
Returns the node of the TSP-Link master as a number from 1 to 64.'
        },
        kind: CompletionItemKind.Constant,
        label: 'master',
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.node\n```\n\
\n\
Get or set the node number of this TSP-Link node as a value from 1 to 64.\n\
\n\
Changes to the node number do not take effect until tsplink.reset() or tsplink.initialize() are executed on any node \
in the system.\n\
\n\
Each TSP-Link node in the same system must be assigned a unique node number.'
        },
        kind: CompletionItemKind.Property,
        label: 'node',
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction readport()\n```\n\ntsplink.readport() -> number\n\
\n\
Returns a number that, in binary, represents the state of each trigger line as 0 or 1.\n\
\n\
The least significant bit of the binary number corresponds to line 1 while the most significant bit corresponds to \
line 3.\n\
\n\
For example, a return value of 2 can be represented as 010. This indicates that lines 1 and 3 are set low (0) while \
line 2 is set high (1).'
        },
        kind: CompletionItemKind.Function,
        label: 'readport',
    },
    {
        data: { domains: ['tsplink'] },
        deprecated: true,
        documentation: {
            kind: MarkupKind.Markdown,
            value: '*deprecated* — use tsplink.initialize()'
        },
        kind: CompletionItemKind.Function,
        label: 'reset'
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.state\n```\n\ntsplink.state -> "online" | "offline"\n\
\n\
Returns current TSP-Link state as the string literal "online" or "offline".\n\
\n\
Until tsplink.initialize() is successful, the state is offline.'
        },
        kind: CompletionItemKind.Constant,
        label: 'state',
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction writeport(pattern)\n```\n\ntsplink.writeport(pattern)\n\
\n\
Write the given pattern to all trigger lines. The specified pattern is treated as a binary high-low map.\n\
\n\
For example, a pattern value of 2 can be represented as 010. This will result in lines 1 and 3 being set low (0) \
while line 2 is set high (1).'
        },
        kind: CompletionItemKind.Function,
        label: 'writeport',
    },
]

export const signatures: Array<InstrumentSignatureInformation> = [
    {
        documentation: undefined,
        label: 'tsplink.initialize([expectedNodes])',
        parameters: [
            {
                documentation: 'The number of nodes expected on the system as a number from 1 to 32.\n\
An error is logged if the return value is not equal to this number.',
                label: 'expectedNodes',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'tsplink.writeport(pattern)',
        parameters: [
            {
                documentation: 'Value to write to the port as a number from 0 to 7.\n\
The given value is a binary representation of the high-low pattern that will be written to the I/O port.',
                label: 'pattern',
            },
        ],
    },
]
