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

const waitcompleteCompletions: Array<CompletionItem> = [
    {
        detail: 'This function waits for all overlapped commands to complete.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function will wait for all previously started overlapped commands to complete.\n\nA group number may only be specified when this node is the master node.\n\nIf no group is specified, the local group is used.\n\nIf zero (0) is specified for the group, this function waits for all nodes in the system.'
        },
        kind: CompletionItemKind.Function,
        label: 'waitcomplete',
    },
]

const waitcompleteSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'waitcomplete(group)',
        undefined,
        ParameterInformation.create(
            'group',
            'Specifies which TSP-Link group on which to wait.'
        ),
    ),
]

export async function getWaitcompleteCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(waitcompleteCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getWaitcompleteSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(waitcompleteSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
