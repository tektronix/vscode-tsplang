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

const triggerTimerCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available trigger timers. Indexed from 1 to 4.'
        },
        kind: CompletionItemKind.Module,
        label: 'timer'
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function clears the timer event detector and overrun indicator for the specified trigger timer number.\n\nThis command sets the timer event detector to the undetected state and resets the overrun indicator.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the number of events to generate each time the timer generates a trigger event or is enabled as a timer or alarm.\n\nIf count is set to a number greater than 1, the timer automatically starts the next trigger timer delay at the expiration of the previous delay.\n\nSet count to zero (0) to cause the timer to generate trigger events indefinitely.\n\nIf you use the trigger timer with a trigger model, make sure the count value is the same or more than any count values expected in the trigger model.'
        },
        kind: CompletionItemKind.Property,
        label: 'count',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets and reads the timer delay.\n\nOnce the timer is enabled, each time the timer is triggered, it uses this delay period.\n\nAssigning a value to this attribute is equivalent to:\n\nThis creates a delay list of one value.\n\nReading this attribute returns the delay interval that will be used the next time the timer is triggered.\n\nIf you use the trigger timer with a trigger model, make sure the trigger timer delay is set so that the readings are paced correctly.'
        },
        kind: CompletionItemKind.Property,
        label: 'delay',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets an array of timer intervals.\n\nEach time the timer is triggered after it is enabled, it uses the next delay period from the array. The default value is an array with one value of 10 ms.\n\nAfter all elements in the array have been used, the delays restart at the beginning of the list.\n\nIf the array contains more than one element, the average of the delay intervals in the list must be ³50µs.'
        },
        kind: CompletionItemKind.Property,
        label: 'delaylist',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute enables the trigger timer.\n\nWhen this command is set to on, the timer performs the delay operation.\n\nWhen this command is set to off, there is no timer on the delay operation.\n\nYou must enable a timer before it can use the delay settings or the alarm configuration. For expected results from the timer, it is best to disable the timer before changing a timer setting, such as delay or start seconds.\n\nTo use the timer as a simple delay or pulse generator with digital I/O lines, make sure the timer start time in seconds and fractional seconds is configured for a time in the past. To use the timer as an alarm, configure the timer start time in seconds and fractional seconds for the desired alarm time.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function resets trigger timer settings to their default values.\n\nThe trigger.timer[N].reset() function resets the following attributes to their default values:\n\nIt also clears trigger.timer[N].overrun.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function waits for a trigger.\n\nIf one or more trigger events were detected since the last time trigger.timer[N].wait() or trigger.timer[N].clear() was called, this function returns immediately.\n\nAfter waiting for a trigger with this function, the event detector is automatically reset and rearmed. This is true regardless of the number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerTimerSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.timer[].wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'Maximum amount of time in seconds to wait for the trigger.'
        ),
    ),
]

export async function getTriggerTimerCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerTimerCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerTimerSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerTimerSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
