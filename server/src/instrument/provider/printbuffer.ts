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

import { CompletionItemKind, MarkupKind, ParameterInformation } from 'vscode-languageserver'

import { InstrumentSpec } from '..'

import { InstrumentCompletionItem, InstrumentSignatureInformation } from '.'

export const completions: Array<InstrumentCompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction printbuffer(startIndex, endIndex, ...)\n```\n\
\n\
Generate a single response message containing data from the specified tables or reading buffer subtables. \
Passing a reading buffer will cause its default subtable to be printed.\n\
\n\
The format.data attribute controls the output format of the response message.\n\
\n\
If the given startIndex is less than 1 or endIndex greater than the size of the table, 9.910000e+37 is returned for \
each value outside the table indices and an event is generated.\n\
\n\
If overlapped commands use the specified reading buffers and the commands are not complete (at least to the \
specified index), data will be printed as it becomes available.'
        },
        kind: CompletionItemKind.Function,
        label: 'printbuffer',
    },
]

export const signatures: Array<InstrumentSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'printbuffer(startIndex, endIndex, ...)',
        parameters: [
            {
                documentation: 'Beginning index of the buffer to print; must be greater than or equal to one and less \
than endIndex.',
                label: 'startIndex',
            },
            {
                documentation: 'Ending index of the buffer to print; must be greater than startIndex and less than or \
equal to the last table index.',
                label: 'endIndex',
            },
            {
                documentation: 'One or more tables or reading buffer subtables separated with commas.',
                label: '...',
            },
        ],
    },
]
