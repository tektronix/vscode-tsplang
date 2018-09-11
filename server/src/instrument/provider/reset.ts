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

import { FormattableSignatureInformation } from '.'

export const completions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset(system)\n```\n\nreset([system])\n\
\n\
Revert settings and clear all buffers.\n\
\n\
If you want to reset a specific TSP-Link instrument, use the node[N].reset() command.\n\
\n\
If system is true (default) and the local node is not the master, then an error is logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'reset([system])',
        parameters: [
            {
                documentation: 'true to reset all nodes (default) or false to reset the local node.\n\
If true and local node is not the master, then an error is logged.',
                label: 'system',
            },
        ],
    },
]
