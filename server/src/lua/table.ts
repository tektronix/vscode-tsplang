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

const tableCompletions: Array<CompletionItem> = [
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

const tableSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'table.concat(t[, sep[, start[, end]]])',
        undefined,
        ParameterInformation.create(
            't',
            'The target table.'
        ),
        ParameterInformation.create(
            'sep',
            'The string to add between each element. Defaults to an empty string.'
        ),
        ParameterInformation.create(
            'start',
            'The starting index (inclusive). Defaults to 1.'
        ),
        ParameterInformation.create(
            'end',
            'The ending index (inclusive). Defaults to the size of the table.'
        ),
    ),
    SignatureInformation.create(
        'table.insert(t, v)',
        'Insert an element into the last position of the table.',
        ParameterInformation.create(
            't',
            'The target table.'
        ),
        ParameterInformation.create(
            'v',
            'The value to insert.'
        ),
    ),
    SignatureInformation.create(
        'table.insert(t, index, v)',
        'Insert an element into the specified table index.',
        ParameterInformation.create(
            't',
            'The target table.'
        ),
        ParameterInformation.create(
            'index',
            'The one-based index of the new value.'
        ),
        ParameterInformation.create(
            'v',
            'The value to insert.'
        ),
    ),
    SignatureInformation.create(
        'table.remove(t[, index])',
        undefined,
        ParameterInformation.create(
            't',
            'The target table.'
        ),
        ParameterInformation.create(
            'index',
            'The one-based index to remove.'
        ),
    ),
    SignatureInformation.create(
        'table.sort(t[, f])',
        undefined,
        ParameterInformation.create(
            't',
            'The target table.'
        ),
        ParameterInformation.create(
            'f',
            'An optional sorting function that accepts two arguments and returns true when the first is less than the \
second. Defaults to using the less than operator (<).'
        ),
    ),
]

export async function getTableCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tableCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTableSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tableSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
