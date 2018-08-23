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

/* TODO: CompletionItem.documentation.value */

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
            value: 'This function clears the trigger event on a digital input line.\n\nThe event detector of a trigger enters the detected state when an event is detected. For the specified trigger line, this command clears the event detector, discards the history, and clears the overrun status(sets the overrun status to false).'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the edge used by the trigger event detector on the given trigger line.\n\nThis command sets the logic on which the trigger event detector and the output trigger generator operate on the specified trigger line.\n\nTo directly control the line state, set the mode of the line to digital and use the write command. When the digital line mode is set for open drain, the edge settings assert a TTL low‑pulse.'
        },
        kind: CompletionItemKind.Property,
        label: 'edge',
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute returns the event detector overrun status.\n\nIf this is true, an event was ignored because the event detector was already in the detected state when the event occurred.\n\nThis is an indication of the state of the event detector built into the line itself. It does not indicate if an overrun occurred in any other part of the trigger model or in any other detector that is monitoring the event.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['digin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function waits for a trigger.\n\nReturns `true` on trigger detection; `false` otherwise.\n\n\nThis function pauses for up to timeout seconds for an input trigger. If one or more trigger events are detected since the last time trigger.digin[N].wait() or trigger.digin[N].clear() was called, this function returns a value immediately. After waiting for a trigger with this function, the event detector is automatically reset and is ready to detect the next trigger. This is true regardless of the number of events detected.'
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

export async function getTriggerDiginCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerDiginCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerDiginSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerDiginSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
