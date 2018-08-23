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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const resetCompletions: Array<CompletionItem> = [
    {
        detail: 'This function resets commands to their default settings and clears the buffers.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The reset() command in its simplest form resets the entire TSP‑enabled system, including the controlling node and all subordinate nodes.\n\nIf you want to reset a specific instrument, use the node[N].reset() command. Also use the node[N].reset() command to reset an instrument on a subordinate node.\n\nWhen no value is specified for system, the default value is true.\n\nYou can only reset the entire system using reset(true) if the node is the master. If the node is not the master node, executing this command generates an error event.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
]

const resetSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'reset(system)',
        undefined,
        ParameterInformation.create(
            'system',
            'If the node is the master, the entire system is reset: true\nOnly the local group is reset: false.'
        ),
    ),
]

export async function getResetCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(resetCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getResetSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(resetSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
