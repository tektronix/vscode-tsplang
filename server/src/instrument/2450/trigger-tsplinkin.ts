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

const triggerTsplinkinCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available TSP-Link trigger lines. Indexed from 1 to 3.'
        },
        kind: CompletionItemKind.Module,
        label: 'tsplinkin'
    },
    {
        data: ['tsplinkin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function clears the event detector for a LAN trigger.\n\nThe trigger event detector enters the detected state when an event is detected. When this command is sent, the instrument does the following actions:'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['tsplinkin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute indicates which trigger edge controls the trigger event detector for a trigger line.\n\nWhen the edge is detected, the instrument asserts a TTL‑low pulse for the output.\n\nThe output state of the I/O line is controlled by the trigger logic. The user-specified output state of the line is ignored.'
        },
        kind: CompletionItemKind.Property,
        label: 'edge',
    },
    {
        data: ['tsplinkin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command indicates whether an event has been ignored because the event detector was already in the detected state when the event occurred.\n\nThis is an indication of the state of the event detector built into the synchronization line itself.\n\nIt does not indicate if an overrun occurred in any other part of the trigger model, or in any other construct that is monitoring the event. It also is not an indication of an output trigger overrun.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['tsplinkin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function waits up to the timeout value for an input trigger. If one or more trigger events are detected since the last time this command or trigger.tsplinkin[N].clear() was called, this function returns immediately.\n\nAfter waiting for a trigger with this function, the event detector is automatically reset and rearmed. This is true regardless of the number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerTsplinkinSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.tsplinkin[].wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'The timeout value in seconds.'
        ),
    ),
]

export async function getTriggerTsplinkinCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerTsplinkinCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerTsplinkinSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerTsplinkinSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
