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

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        data: ['tspnet'],
        kind: CompletionItemKind.Module,
        label: 'tsp'
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction abort(connectionID)\n```\n\ntspnet.tsp.abort(connectionID)\n\
\n\
Abort command execution on the given TSP-enabled instrument.\n\
\n\
Causes all other connected interfaces to close.'
        },
        kind: CompletionItemKind.Function,
        label: 'abort',
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntspnet.tsp.abortonconnect\n```\n\ntspnet.tsp.abortonconnect -> 0 | 1\n\
\n\
Get or set whether an abort is send when attempting to connect to a TSP-enabled instrument. Defaults to 1 (enable).\n\
\n\
If set to 0 (disabled) and another interface is active upon connecting, the instrument will not respond to \
subsequent reads or executes until an abort command is sent.'
        },
        kind: CompletionItemKind.Property,
        label: 'abortonconnect',
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rbtablecopy(connectionID, name, startIndex, endIndex)\n```\n\
\n\
tspnet.tsp.rbtablecopy(connectionID, name[, startIndex, endIndex]) -> table | string\n\
\n\
Returns a copy of the specified reading buffer from a remote TSP-enabled instrument. If the buffer is an array of \
numbers, a table is returned; otherwise a comma-delimited string is returned.\n\
\n\
A buffer slice is returned if one-based startIndex and endIndex are specified; otherwise the entire buffer is \
returned.\n\
\n\
Limited to transferring 50,000 readings at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'rbtablecopy',
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction runscript(connectionID, name, script)\n```\n\
\n\
tspnet.tsp.runscript(connectionID, name, script)\n\
\n\
Load and run the given script on a remote TSP-enabled instrument. Does not wait for the remote script to finish \
executing.\n\
\n\
This function adds the loadscript and endscript commands, captures any errors, and reads back any prompts.\n\
\n\
Output from previous commands is discarded.'
        },
        kind: CompletionItemKind.Function,
        label: 'runscript',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.tsp.abort(connectionID)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.tsp.rbtablecopy(connectionID, name[, startIndex, endIndex])',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
            {
                documentation: 'The full name of the reading buffer name and synchronous table to copy.',
                label: 'name',
            },
            {
                documentation: 'One-based integer start value.',
                label: 'startIndex',
            },
            {
                documentation: 'One-based integer end value.',
                label: 'endIndex',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.tsp.runscript(connectionID, name, script)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
            {
                documentation: 'The name that is assigned to the script.',
                label: 'name',
            },
            {
                documentation: 'The body of the script as a string.',
                label: 'script',
            },
        ],
    },
]
