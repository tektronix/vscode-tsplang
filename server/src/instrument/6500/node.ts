/*
 *  Copyright Tektronix Inc.
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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const nodeCompletions: Array<CompletionItem> = [
    {
        detail: 'This function starts test scripts on a remote TSP-Link node.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is only applicable to TSP-Link systems. You can use this command to use the remote master node to run a script on the specified node. This function does not run test scripts on the master node; only on the subordinate node when initiated by the master node.\n\nThis function may only be called when the group number of the node is different than the node of the master.\n\nThis function does not wait for the script to finish execution.'
        },
        kind: CompletionItemKind.Function,
        label: 'node[N].execute',
    },
    {
        detail: 'This function returns the value of a global variable.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function retrieves the value of a global variable from the run-time environment of this node.\n\nDo not use this command to retrieve the value of a global variable from the local node. Instead, access the global variable directly. This command should only be used from a remote master when controlling this instrument over a TSP-Link® network.'
        },
        kind: CompletionItemKind.Function,
        label: 'node[N].getglobal',
    },
    {
        detail: 'This function sets the value of a global variable.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'From a remote node, use this function to assign the given value to a global variable.\n\nDo not use this command to create or set the value of a global variable from the local node (set the global variable directly instead). This command should only be used from a remote master when controlling this instrument over a TSP-Link®.'
        },
        kind: CompletionItemKind.Function,
        label: 'node[N].setglobal',
    },
]

const nodeSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'node[N].execute(N, scriptCode)',
        undefined,
        ParameterInformation.create(
            'N',
            'The node number of this instrument (1 to 64).'
        ),
        ParameterInformation.create(
            'scriptCode',
            'A string containing the source code.'
        ),
    ),
    SignatureInformation.create(
        'node[N].getglobal(value, N, name)',
        undefined,
        ParameterInformation.create(
            'value',
            'The value of the variable.'
        ),
        ParameterInformation.create(
            'N',
            'The node number of this instrument (1 to 64).'
        ),
        ParameterInformation.create(
            'name',
            'The global variable name.'
        ),
    ),
    SignatureInformation.create(
        'node[N].setglobal(N, name, value)',
        undefined,
        ParameterInformation.create(
            'N',
            'The node number of this instrument (1 to 64).'
        ),
        ParameterInformation.create(
            'name',
            'The global variable name to set.'
        ),
        ParameterInformation.create(
            'value',
            'The value to assign to the variable.'
        ),
    ),
]

export async function getNodeCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(nodeCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getNodeSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(nodeSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
