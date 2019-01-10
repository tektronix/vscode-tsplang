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

const opcCompletions: Array<CompletionItem> = [
    {
        detail: 'This function sets the operation complete (OPC) bit after all pending commands, including overlapped commands, have been executed.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function causes the operation complete bit in the Status Event Status Register to be set when all previously started local overlapped commands are complete.\n\nNote that each node independently sets its operation complete bits in its own status model. Any nodes that are not actively performing overlapped commands set their bits immediately. All remaining nodes set their own bits as they complete their own overlapped commands.'
        },
        kind: CompletionItemKind.Function,
        label: 'opc',
    },
]

const opcSignatures: Array<SignatureInformation> = new Array()

export async function getOpcCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(opcCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getOpcSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(opcSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
