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

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available TSP-Link nodes. Indexed from 1 to 64.'
        },
        kind: CompletionItemKind.Module,
        label: 'node'
    },
    {
        data: ['node'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction execute(scriptCode)\n```\n\nnode[N].execute(scriptCode)\n\
\n\
Run the specified code on a subordinate node from the TSP-Link master. Does not wait for the subordinate node to \
finish execution.\n\
\n\
Can only be used on TSP-Link systems.\n\
\n\
Can only be called when the group number of the target node is different than the master node.'
        },
        kind: CompletionItemKind.Function,
        label: 'execute',
    },
    {
        data: ['node'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getglobal(name)\n```\n\nnode[N].getglobal(name) -> any\n\
\n\
Get the value of a global variable on a subordinate node from the TSP-Link master.'
        },
        kind: CompletionItemKind.Function,
        label: 'getglobal',
    },
    {
        data: ['node'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setglobal(name, value)\n```\n\nnode[N].setglobal(name, value)\n\
\n\
Set the value of a global variable on a subordinate node from the TSP-Link master.'
        },
        kind: CompletionItemKind.Function,
        label: 'setglobal',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'node[].execute(scriptCode)',
        parameters: [
            {
                documentation: 'A string containing the source code.',
                label: 'scriptCode',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'node[].getglobal(name)',
        parameters: [
            {
                documentation: 'The global variable name as a string.',
                label: 'name',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'node[].setglobal(name, value)',
        parameters: [
            {
                documentation: 'The global variable name as a string.',
                label: 'name',
            },
            {
                documentation: 'The value to assign to the global variable.',
                label: 'value',
            },
        ],
    },
]
