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

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

const nodeCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available TSP-Link nodes. Indexed from 1 to 64.'
        },
        kind: CompletionItemKind.Module,
        label: 'node'
    },
    {
        data: ['node'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction execute(scriptCode)\n```\n\nnode[N].execute(scriptCode)\n\
\n\
Run the specified code on a subordinate node from the TSP-Link master. Does not wait for the subordinate node to \
finish execution.\n\
\n\
Can only be used on TSP-Link systems.\n\
\n\
Can only be called when the group number of the target node is different than the master node.'
        },
        kind: CompletionItemKind.Function,
        label: 'execute',
    },
    {
        data: ['node'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getglobal(name)\n```\n\nnode[N].getglobal(name) -> any\n\
\n\
Get the value of a global variable on a subordinate node from the TSP-Link master.'
        },
        kind: CompletionItemKind.Function,
        label: 'getglobal',
    },
    {
        data: ['node'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setglobal(name, value)\n```\n\nnode[N].setglobal(name, value)\n\
\n\
Set the value of a global variable on a subordinate node from the TSP-Link master.'
        },
        kind: CompletionItemKind.Function,
        label: 'setglobal',
    },
]

const nodeSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'node[].execute(scriptCode)',
        undefined,
        ParameterInformation.create(
            'scriptCode',
            'A string containing the source code.'
        ),
    ),
    SignatureInformation.create(
        'node[].getglobal(name)',
        undefined,
        ParameterInformation.create(
            'name',
            'The global variable name as a string.'
        ),
    ),
    SignatureInformation.create(
        'node[].setglobal(name, value)',
        undefined,
        ParameterInformation.create(
            'name',
            'The global variable name as a string.'
        ),
        ParameterInformation.create(
            'value',
            'The value to assign to the global variable.'
        ),
    ),
]

export async function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
            if (cmd.children !== undefined) {
                cmds.concat(cmd.children)
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                nodeCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                nodeSignatures.forEach((signature: SignatureInformation) => {
                    const signaNamespace = resolveSignatureNamespace(signature)

                    if (signaNamespace === undefined) {
                        throw new Error('Unable to resolve signature namespace for ' + signature.label)
                    }

                    if (cmdItem.label.localeCompare(signaNamespace) === 0) {
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

// export async function getNodeCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(nodeCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getNodeSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(nodeSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
