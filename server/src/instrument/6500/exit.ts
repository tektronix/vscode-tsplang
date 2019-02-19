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

import { CompletionItem, CompletionItemKind, MarkupKind, SignatureInformation } from 'vscode-languageserver'

const exitCompletions: Array<CompletionItem> = [
    {
        detail: 'This function stops a script that is presently running.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Terminates script execution when called from a script that is being executed.\n\nThis command does not wait for overlapped commands to complete before terminating script execution. If overlapped commands are required to finish, use the waitcomplete() function before calling exit().'
        },
        kind: CompletionItemKind.Function,
        label: 'exit',
    },
]

const exitSignatures: Array<SignatureInformation> = new Array()

export async function getExitCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(exitCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getExitSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(exitSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
