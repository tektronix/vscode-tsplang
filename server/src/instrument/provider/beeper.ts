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

import { CompletionItem, CompletionItemKind, MarkupKind, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

const beeperCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'beeper'
    },
    {
        data: ['beeper'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction beep(duration, frequency)\n```\n\nbeeper.beep(duration, frequency)\n\
\n\
You can use the beeper of the instrument to provide an audible signal at a specific frequency and time duration.\n\
\n\
Using this function from a remote interface does not affect audible errors or key click settings that were made from \
the front panel.'
        },
        kind: CompletionItemKind.Function,
        label: 'beep'
    },
]

const beeperSignatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'beeper.beep(duration, frequency)',
        parameters: [
            {
                documentation: 'The amount of time to play the tone (%{0} to %{1}s).',
                label: 'duration'
            },
            {
                documentation: 'The frequency of the beep (%{0} to %{1} Hz).',
                label: 'frequency'
            }
        ]
    }
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSet {
    const resultCompletions: Array<CompletionItem> = new Array()
    const resultSignatures: Array<SignatureInformation> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        beeperCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })

        beeperSignatures.forEach((signature: SignatureInformation) => {
            const signaNamespace = resolveSignatureNamespace(signature)

            if (signaNamespace === undefined) {
                throw new Error('Unable to resolve signature namespace for ' + signature.label)
            }

            if (cmdItem.label.localeCompare(signaNamespace) === 0) {
                const item: SignatureInformation = signature

                if (item.parameters !== undefined) {
                    for (let index = 0; index < item.parameters.length; index++) {
                        const element = item.parameters[index]

                        // if the signature has a parameter that needs to be formatted
                        if (element.documentation !== undefined
                            && typeof element.documentation === 'string'
                            && element.documentation.indexOf('%{') !== -1) {

                            switch (element.label) {
                                case 'duration':
                                    element.documentation = element.documentation
                                        .replace('%{0}', spec.beeper.minSeconds.toString())
                                        .replace('%{1}', spec.beeper.maxSeconds.toString())
                                    break

                                case 'frequency':
                                    element.documentation = element.documentation
                                        .replace('%{0}', spec.beeper.minHertz.toString())
                                        .replace('%{1}', spec.beeper.maxHertz.toString())
                            }

                            item.parameters[index] = element
                        }
                    }
                }

                resultSignatures.push(item)
            }
        })
    })

    return { completions: resultCompletions, signatures: resultSignatures }
}
