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

const triggerCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'trigger'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear any pending command triggers and discard the trigger event history.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.wait(timeout) -> boolean\n\
\n\
Wait up to timeout seconds for a trigger on the active command interface. Returns true if a trigger was detected and \
false otherwise.\n\
\n\
If the active interface is GPIB, the trigger is set if a GET command is detected. On VXI-11, the trigger is set if \
the device_trigger method is invoked. If neither of those interfaces are active, then the trigger is set upon \
receiving a \\*TRG message.\n\
\n\
The event detector is automatically reset and rearmed when this function returns.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'The timeout value in seconds.'
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
                triggerCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                triggerSignatures.forEach((signature: SignatureInformation) => {
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

// export async function getTriggerCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(triggerCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getTriggerSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(triggerSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
