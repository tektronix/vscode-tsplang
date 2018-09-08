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

const resetCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset(system)\n```\n\nreset([system])\n\
\n\
Revert settings and clear all buffers.\n\
\n\
If you want to reset a specific TSP-Link instrument, use the node[N].reset() command.\n\
\n\
If system is true (default) and the local node is not the master, then an error is logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
]

const resetSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'reset([system])',
        undefined,
        ParameterInformation.create(
            'system',
            'true to reset all nodes (default) or false to reset the local node.\n\
\n\
If true and local node is not the master, then an error is logged.'
        ),
    ),
]

export async function getResetCommandSet(cmds: Array<ApiSpec>): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            cmds.forEach((cmd: ApiSpec) => {
                resetCompletions.forEach((completion: CompletionItem) => {
                    if (cmd.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                resetSignatures.forEach((signature: SignatureInformation) => {
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

// export async function getResetCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(resetCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getResetSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(resetSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
