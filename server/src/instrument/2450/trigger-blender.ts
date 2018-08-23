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

const triggerBlenderCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available event blenders. Indexed from 1 to 2.'
        },
        kind: CompletionItemKind.Module,
        label: 'blender'
    },
    {
        data: ['blender', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function clears the blender event detector and resets the overrun indicator of blender N.\n\nThis command sets the blender event detector to the undetected state and resets the overrun indicator of the event detector.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['blender', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command selects whether the blender waits for any one event (OR) or waits for all selected events (AND) before signaling an output event.'
        },
        kind: CompletionItemKind.Property,
        label: 'orenable',
    },
    {
        data: ['blender', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Indicates if an event was ignored because the event detector was already in the detected state when the event occurred. This is an indication of the state of the event detector that is built into the event blender itself.\n\nThis command does not indicate if an overrun occurred in any other part of the trigger model or in any other trigger object that is monitoring the event. It also is not an indication of an action overrun.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['blender', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function resets some of the trigger blender settings to their factory defaults.\n\nThe trigger.blender[N].reset() function resets the following attributes to their factory defaults:\n\nIt also clears trigger.blender[N].overrun.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['blender', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute is an array indexed from 1 to 4 that specifies the events that trigger the blender.\n\nThere are four stimulus inputs that can each select a different event.\n\nUse zero to disable the blender input.\n\nThe event parameter may be any of the trigger events shown in the following table.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
    {
        data: ['blender', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function waits for a blender trigger event to occur.\n\nReturns `true` on trigger detection; `false` otherwise.\n\n\nThis function waits for an event blender trigger event. If one or more trigger events were detected since the last time trigger.blender[N].wait() or trigger.blender[N].clear() was called, this function returns immediately.\n\nAfter detecting a trigger with this function, the event detector automatically resets and rearms. This is true regardless of the number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerBlenderSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.blender[].wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'Timeout in seconds.'
        ),
    ),
]

export async function getTriggerBlenderCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerBlenderCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerBlenderSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerBlenderSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
