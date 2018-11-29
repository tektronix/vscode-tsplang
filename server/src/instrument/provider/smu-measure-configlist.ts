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
        data: { domains: ['measure', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'configlist'
    },
    {
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction catalog()\n```\n\nsmu.measure.configlist.catalog() -> string | nil\n\
\n\
Returns the name of a measure configuration list stored on the instrument as a string or nil if the end of the \
catalog has been reached.\n\
\n\
If the first call to this function returns nil, then this configuration catalog contains no entries; otherwise the \
next call will resume at the beginning of the list.'
        },
        kind: CompletionItemKind.Function,
        label: 'catalog',
    },
    {
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction create(listName)\n```\n\nsmu.measure.configlist.create(listName)\n\
\n\
Creates an empty configuration list with the specified listName string.\n\
\n\
Configuration lists are not saved when the instrument is turned off. Use TSP scripts to restore instrument settings \
between power cycles.'
        },
        kind: CompletionItemKind.Function,
        label: 'create',
    },
    {
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(listName, index)\n```\n\
\n\
smu.measure.configlist.delete(listName[, index])\n\
\n\
Delete the configuration list from the given listName. If an index number is specified, then only that index of the \
listName is deleted. If the specified index does not exist, then an error is logged.\n\
\n\
When an index is deleted from a configuration list, the index numbers of subsequent items are increased by one.'
        },
        kind: CompletionItemKind.Function,
        label: 'delete',
    },
    {
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction query(listName, index, fieldSeparator)\n```\n\
\n\
smu.measure.configlist.query(listName, index[, fieldSeparator]) -> string\n\
\n\
Returns the settings stored at the given index of some configuration list. If specified, each setting is delimited by \
the given fieldSeparator string; otherwise fieldSeparator defaults to a comma.'
        },
        kind: CompletionItemKind.Function,
        label: 'query',
    },
    {
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction recall(listName, index)\n```\n\
\n\
smu.measure.configlist.recall(listName[, index])\n\
\n\
Load the configuration settings from given listName. If an index number is specified, then that index of the listName \
is loaded; otherwise index defaults to 1.\n\
\n\
When recalling a configuration list, only settings for the present function are loaded.\n\
\n\
Recall source configurations before measurement configurations.'
        },
        kind: CompletionItemKind.Function,
        label: 'recall',
    },
    {
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction size(listName)\n```\n\nsmu.measure.configlist.size(listName) -> number\n\
\n\
Returns the size of the specified configuration list as a number.'
        },
        kind: CompletionItemKind.Function,
        label: 'size',
    },
    {
        // Chose to exclude the index parameter due to the instrument (2461 @ 1.6.5b)
        // bugging out when it was not contiguous.
        data: { domains: ['configlist', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction store(listName)\n```\n\nsmu.measure.configlist.store(listName)\n\
\n\
Append the settings of the active function to the specified configuration list.\n\
\n\
Configuration lists are not saved when the instrument is turned off. Use TSP scripts to restore instrument settings \
between power cycles.'
        },
        kind: CompletionItemKind.Function,
        label: 'store',
    },
]

export const signatures: Array<InstrumentSignatureInformation> = [
    {
        documentation: undefined,
        label: 'smu.measure.configlist.create(listName)',
        parameters: [
            {
                documentation: 'A string that represents the name of a measure configuration list.',
                label: 'listName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.measure.configlist.delete(listName[, index])',
        parameters: [
            {
                documentation: 'A string that represents the name of a measure configuration list.',
                label: 'listName',
            },
            {
                documentation: 'A number that defines a specific configuration index in the configuration list. \
Deletes the entire configuration list by default.',
                label: 'index',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.measure.configlist.query(listName, index[, fieldSeparator])',
        parameters: [
            {
                documentation: 'A string that represents the name of a measure configuration list.',
                label: 'listName',
            },
            {
                documentation: 'A number that defines a specific configuration index in the configuration list. \
Defaults to the first configuration index.',
                label: 'index',
            },
            {
                documentation: 'The string that will separate each setting.',
                label: 'fieldSeparator',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.measure.configlist.recall(listName[, index])',
        parameters: [
            {
                documentation: 'A string that represents the name of a measure configuration list.',
                label: 'listName',
            },
            {
                documentation: 'A number that defines a specific configuration index in the configuration list. \
Defaults to the first configuration index.',
                label: 'index',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.measure.configlist.size(listName)',
        parameters: [
            {
                documentation: 'A string that represents the name of a measure configuration list.',
                label: 'listName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.measure.configlist.store(listName)',
        parameters: [
            {
                documentation: 'A string that represents the name of a measure configuration list.',
                label: 'listName',
            },
        ],
    },
]
