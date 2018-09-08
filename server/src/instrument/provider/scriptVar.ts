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

const scriptVarCompletions: Array<CompletionItem> = [
    // No scriptVar namespace
    {
        data: ['scriptVar'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction run()\n```\n\
\n\
Execute the script object.'
        },
        kind: CompletionItemKind.Method,
        label: 'run',
    },
    {
        data: ['scriptVar'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction save(fileName)\n```\n\nscriptVar.save([fileName])\n\
\n\
Save a script to nonvolatile memory or to USB flash drive if a fileName string is specified.\n\
\n\
If specified, the fileName should be absolute, begin with "/usb1/", and end with either ".tsp" or no file extension. \
An error will be logged if fileName ends with a file extension that is not ".tsp".'
        },
        kind: CompletionItemKind.Method,
        label: 'save',
    },
    {
        data: ['scriptVar'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nscriptVar.source\n```\n\nscriptVar.source -> string\n\
\n\
Returns the script body as a string with lines separated by newline characters.'
        },
        kind: CompletionItemKind.Constant,
        label: 'source',
    },
]

const scriptVarSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'scriptVar.save([fileName])',
        undefined,
        ParameterInformation.create(
            'fileName',
            'The file name to use when saving the script to a USB flash drive.'
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
                scriptVarCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                scriptVarSignatures.forEach((signature: SignatureInformation) => {
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

// export async function getScriptVarCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(scriptVarCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getScriptVarSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(scriptVarSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
