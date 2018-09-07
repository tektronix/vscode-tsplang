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

const digioCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'digio'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction readport()\n```\n\ndigio.readport() -> number\n\
\n\
Returns a bitmask representing the state of each digital I/O line, where the most significant bit represents line 1.\n\
\n\
An instrument reset does not affect the state of digital I/O lines.\n\
\n\
All six lines must be configured as digital control lines or an error will be logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'readport',
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction writeport(data)\n```\n\ndigio.writeport(data)\n\
\n\
Set each digital I/O line high or low based on the given bitmask, where the most significant bit represents line 1.\n\
\n\
An instrument reset does not affect the state of the digital I/O lines.\n\
\n\
All six lines must be configured as digital control lines or an error will be logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'writeport',
    },
]

const digioSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'digio.writeport(data)',
        undefined,
        ParameterInformation.create(
            'data',
            'The value to write to the port (0 to 63).'
        ),
    ),
]

export async function getDigioCommandSet(cmds: Array<ApiSpec>): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            cmds.forEach((cmd: ApiSpec) => {
                digioCompletions.forEach((completion: CompletionItem) => {
                    if (cmd.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                digioSignatures.forEach((signature: SignatureInformation) => {
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

// export async function getDigioCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(digioCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getDigioSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(digioSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
