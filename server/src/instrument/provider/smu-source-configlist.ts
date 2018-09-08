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

import { ApiSpec } from '..'

import { CommandSet, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

const smuSourceConfiglistCompletions: Array<CompletionItem> = [
    {
        data: ['source', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'configlist'
    },
    {
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction catalog()\n```\n\nsmu.source.configlist.catalog() -> string | nil\n\
\n\
Returns the name of a source configuration list stored on the instrument as a string or nil if the end of the \
catalog has been reached.\n\
\n\
If the first call to this function returns nil, then this configuration catalog contains no entries; otherwise the \
next call will resume at the beginning of the list.'
        },
        kind: CompletionItemKind.Function,
        label: 'catalog',
    },
    {
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction create(listName)\n```\n\nsmu.source.configlist.create(listName)\n\
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
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(listName, index)\n```\n\
\n\
smu.source.configlist.delete(listName[, index])\n\
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
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction query(listName, index, fieldSeparator)\n```\n\
\n\
smu.source.configlist.query(listName, index[, fieldSeparator]) -> string\n\
\n\
Returns the settings stored at the given index of some configuration list. If specified, each setting is delimited by \
the given fieldSeparator string; otherwise fieldSeparator defaults to a comma.'
        },
        kind: CompletionItemKind.Function,
        label: 'query',
    },
    {
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction recall(listName, index)\n```\n\
\n\
smu.source.configlist.recall(listName[, index])\n\
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
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction size(listName)\n```\n\nsmu.source.configlist.size(listName) -> number\n\
\n\
Returns the size of the specified configuration list as a number.'
        },
        kind: CompletionItemKind.Function,
        label: 'size',
    },
    {
        // Chose to exclude the index parameter due to the instrument (2461 @ 1.6.5b)
        // bugging out when it was not contiguous.
        data: ['configlist', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction store(listName)\n```\n\nsmu.source.configlist.store(listName)\n\
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

const smuSourceConfiglistSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'smu.source.configlist.create(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.delete(listName[, index])',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list. \
Deletes the entire configuration list by default.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.query(listName, index[, fieldSeparator])',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list. \
Defaults to the first configuration index.'
        ),
        ParameterInformation.create(
            'fieldSeparator',
            'The string that will separate each setting.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.recall(listName[, index])',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list. \
Defaults to the first configuration index.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.size(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.store(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
    ),
]

export async function getSmuSourceConfiglistCommandSet(cmds: Array<ApiSpec>): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            cmds.forEach((cmd: ApiSpec) => {
                smuSourceConfiglistCompletions.forEach((completion: CompletionItem) => {
                    if (cmd.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                smuSourceConfiglistSignatures.forEach((signature: SignatureInformation) => {
                    const signaNamespace = resolveSignatureNamespace(signature)

                    if (signaNamespace === undefined) {
                        throw new Error('Unable to resolve signature namespace for ' + signature.label)
                    }

                    if (cmd.label.localeCompare(signaNamespace) === 0) {
                        resultSignatures.push(signature)
                    }
                })
            })

            resolve({
                completions: resultCompletions,
                signatures: resultSignatures
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

// export async function getSmuSourceConfiglistCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(smuSourceConfiglistCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getSmuSourceConfiglistSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(smuSourceConfiglistSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
