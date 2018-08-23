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

const triggerLaninCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available LAN events. Indexed from 1 to 8.'
        },
        kind: CompletionItemKind.Module,
        label: 'lanin'
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function clears the event detector for a LAN trigger.\n\nThe trigger event detector enters the detected state when an event is detected. This function clears a trigger event detector and discards the previous of the trigger packet.\n\nThis function clears all overruns associated with this LAN trigger.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the trigger operation and detection mode of the specified LAN event.\n\nThis command controls how the trigger event detector and the output trigger generator operate on the given trigger. These settings are intended to provide behavior similar to the digital I/O triggers.'
        },
        kind: CompletionItemKind.Property,
        label: 'edge',
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the overrun status of the LAN event detector.\n\nThis command indicates whether an event has been ignored because the event detector was already in the detected state when the event occurred.\n\nThis is an indication of the state of the event detector built into the synchronization line itself. It does not indicate if an overrun occurred in any other part of the trigger model, or in any other construct that is monitoring the event.\n\nIt also is not an indication of an output trigger overrun.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['lanin', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function waits for an input trigger.\n\nReturns `true` on trigger detection; `false` otherwise.\n\n\nIf one or more trigger events have been detected since the last time trigger.lanin[N].wait() or trigger.lanin[N].clear() was called, this function returns immediately.\n\nAfter waiting for a LAN trigger event with this function, the event detector is automatically reset and rearmed regardless of the number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerLaninSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.lanin[].wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'Timeout in seconds.'
        ),
    ),
]

export async function getTriggerLaninCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerLaninCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerLaninSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerLaninSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
