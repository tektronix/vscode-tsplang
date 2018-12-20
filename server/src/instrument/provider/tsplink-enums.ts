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

import { CompletionItem } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Line serves as input, output, or both.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_DIGITAL_OPEN_DRAIN'
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Line serves as input trigger detection and output trigger generator.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_TRIGGER_OPEN_DRAIN'
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Detect falling-edge trigger input and automatically latch and drive the trigger \
line low. Assert an output trigger to release the latched line.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_SYNCHRONOUS_ACCEPTOR'
    },
    {
        data: { domains: ['tsplink'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Detect rising-edge trigger input and assert a transistor-transistor logic low pulse \
as output.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_SYNCHRONOUS_MASTER'
    },
    {
        data: { domains: ['tsplink'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_HIGH'
    },
    {
        data: { domains: ['tsplink'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LOW'
    },
]
