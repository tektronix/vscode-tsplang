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
        kind: CompletionItemKind.Module,
        label: 'userstring'
    },
    {
        data: ['userstring'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction add(name, value)\n```\n\nuserstring.add(name, value)\n\
\n\
Add a user-defined string to nonvolatile memory.'
        },
        kind: CompletionItemKind.Function,
        label: 'add',
    },
    {
        data: ['userstring'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction catalog()\n```\n\nuserstring.catalog() -> key iterator\n\
\n\
Returns an iterator containing all userstring keys in no particular order.'
        },
        kind: CompletionItemKind.Function,
        label: 'catalog',
    },
    {
        data: ['userstring'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(name)\n```\n\nuserstring.delete(name)\n\
\n\
Delete the string associated with the given name from nonvolatile memory.'
        },
        kind: CompletionItemKind.Function,
        label: 'delete',
    },
    {
        data: ['userstring'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction get(name)\n```\n\nuserstring.get(name) -> string | nil\n\
\n\
Returns a string if the given name exists; otherwise nil is returned and an error is logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'get',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'userstring.add(name, value)',
        parameters: [
            {
                documentation: 'The name of the string.',
                label: 'name',
            },
            {
                documentation: 'The value of the string.',
                label: 'value',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'userstring.delete(name)',
        parameters: [
            {
                documentation: 'Name of the user‑defined string to delete.',
                label: 'name',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'userstring.get(name)',
        parameters: [
            {
                documentation: 'Name of the user‑defined string.',
                label: 'name',
            },
        ],
    },
]
