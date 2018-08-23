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

const formatCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'format'
    },
    {
        data: ['format'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nformat.asciiprecision\n```\n\
\n\
A number from 0 to 16 representing the number of significant digits returned by print(), printbuffer(), \
and printnumber().\n\
\n\
There is always one digit to the left of the decimal point; be sure to include this digit when setting the precision.'
        },
        kind: CompletionItemKind.Property,
        label: 'asciiprecision',
    },
    {
        data: ['format'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nformat.byteorder\n```\n\
\n\
The byte order of values printed with printnumber() and printbuffer().\n\
\n\
The byte order is only used with the format.REAL32 and format.REAL64 data formats.'
        },
        kind: CompletionItemKind.Property,
        label: 'byteorder',
    },
    {
        data: ['format'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nformat.data\n```\n\
\n\
The data format printed by printnumber() and printbuffer().\n\
\n\
When using either binary data format, the response message will start with #0 and end with a newline. \
When in ASCII format, multiple elements are separated with a comma and space.'
        },
        kind: CompletionItemKind.Property,
        label: 'data',
    },
]

export async function getFormatCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(formatCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
