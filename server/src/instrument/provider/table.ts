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
        kind: CompletionItemKind.Module,
        label: 'table'
    },
    {
        data: ['table'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction concat(t, sep, start, end)\n```\n\
\n\
table.concat(t[, sep[, start[, end]]]) -> string\n\
\n\
Returns the concatenation of all sequential, non-nil values of the given table t starting at index 1. An emtpy string \
is returned if the start index is greater than the end index. The string separator sep defaults to an empty string, \
the start index defaults to 1, and the end index defaults to the size of the table.'
        },
        kind: CompletionItemKind.Function,
        label: 'concat'
    },
    {
        data: ['table'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction insert(t, index, v)\n```\n\ntable.insert(t[, index], v)\n\
\n\
Inserts the value v into table t at the index. If index is omitted, then the new value is inserted at the end of the \
table.'
        },
        kind: CompletionItemKind.Function,
        label: 'insert'
    },
    {
        data: ['table'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction remove(t, index)\n```\n\ntable.remove(t[, index]) -> any\n\
\n\
Remove and return the element of table t at the index. If index is omitted, then the last table element is removed.'
        },
        kind: CompletionItemKind.Function,
        label: 'remove'
    },
    {
        data: ['table'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sort(t, f)\n```\n\ntable.sort(t[, f])\n\
\n\
Performs an in-place sort of table t using the function f as a callback. If the function f is omitted, then the less \
than operator (<) is used.\n\
\n\
Function f must accept two arguments and return true when the first is less than the second.'
        },
        kind: CompletionItemKind.Function,
        label: 'sort'
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'table.concat(t[, sep[, start[, end]]])',
        parameters: [
            {
                documentation: 'The target table.',
                label: 't',
            },
            {
                documentation: 'The string to add between each element. Defaults to an empty string.',
                label: 'sep',
            },
            {
                documentation: 'The starting index (inclusive). Defaults to 1.',
                label: 'start',
            },
            {
                documentation: 'The ending index (inclusive). Defaults to the size of the table.',
                label: 'end',
            },
        ],
    },
    {
        documentation: 'Insert an element into the last position of the table.',
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'table.insert(t, v)',
        parameters: [
            {
                documentation: 'The target table.',
                label: 't',
            },
            {
                documentation: 'The value to insert.',
                label: 'v',
            },
        ],
    },
    {
        documentation: 'Insert an element into the specified table index.',
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'table.insert(t, index, v)',
        parameters: [
            {
                documentation: 'The target table.',
                label: 't',
            },
            {
                documentation: 'The one-based index of the new value.',
                label: 'index',
            },
            {
                documentation: 'The value to insert.',
                label: 'v',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'table.remove(t[, index])',
        parameters: [
            {
                documentation: 'The target table.',
                label: 't',
            },
            {
                documentation: 'The one-based index to remove.',
                label: 'index',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'table.sort(t[, f])',
        parameters: [
            {
                documentation: 'The target table.',
                label: 't',
            },
            {
                documentation: 'An optional sorting function that accepts two arguments and returns true when the \
first is less than the second. Defaults to using the less than operator (<).',
                label: 'f',
            },
        ],
    },
]
