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

const createconfigscriptCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction createconfigscript(scriptName)\n```\n\ncreateconfigscript(scriptName)\n\
\n\
Create a setup file that captures most of the present settings of the instrument.\n\
\n\
If scriptName is set to the name of an existing script, an eventlog message is returned.\n\
\n\
Once created, the script that contains the settings can be run and edited like any other script.'
        },
        kind: CompletionItemKind.Function,
        label: 'createconfigscript',
    },
]

const createconfigscriptSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'createconfigscript(scriptName)',
        undefined,
        ParameterInformation.create(
            'scriptName',
            'A string that represents the name of the script that will be created.'
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
                cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                createconfigscriptCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                createconfigscriptSignatures.forEach((signature: SignatureInformation) => {
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

// export async function getCreateconfigscriptCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(createconfigscriptCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getCreateconfigscriptSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(createconfigscriptSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
