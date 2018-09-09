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

const triggerDiginCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available digital I/O lines. Indexed from 1 to 6.'
        },
        kind: CompletionItemKind.Module,
        label: 'digin'
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the event detector and reset the overrun indicator of the currently indexed digital input line.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digin[N].edge\n```\n\
\n\
Get or set the trigger edge logic for the currently indexed digital input line to trigger.EDGE_\\*. Defaults to \
trigger.EDGE_FALLING.\n\
\n\
To directly control the line state, set the mode of the line to digital and use the write command. When the digital \
line mode is set for open drain, the edge settings assert a transistor-transistor logic low‑pulse.'
        },
        kind: CompletionItemKind.Property,
        label: 'edge',
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digin[N].overrun\n```\n\ntrigger.digin[N].overrun -> boolean\n\
\n\
Returns true if an event was ignored because the event detector was already in the detected state and false otherwise.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.digin[N].wait(timeout) -> boolean\n\
\n\
Returns a boolean value indicating whether a digital input trigger event occurred since the last time this or the \
clear function was called. If no event is detected after timeout seconds, then false is returned. If an event is \
detected or has occurred previously, then true is returned immediately.\n\
\n\
After detecting a trigger with this function, the event detector automatically resets and rearms regardless of the \
number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerDiginSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.digin[].wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'Timeout in seconds.'
        ),
    ),
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSet {
    const resultCompletions: Array<CompletionItem> = new Array()
    const resultSignatures: Array<SignatureInformation> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        triggerDiginCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })

        triggerDiginSignatures.forEach((signature: SignatureInformation) => {
            const signaNamespace = resolveSignatureNamespace(signature)

            if (signaNamespace === undefined) {
                throw new Error('Unable to resolve signature namespace for ' + signature.label)
            }

            if (cmdItem.label.localeCompare(signaNamespace) === 0) {
                resultSignatures.push(signature)
            }
        })
    })

    return { completions: resultCompletions, signatures: resultSignatures }
}
