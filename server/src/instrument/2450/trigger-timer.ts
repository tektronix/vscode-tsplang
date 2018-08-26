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
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the event detector and reset the overrun indicator of the currently indexed timer.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].count\n```\n\
\n\
Get or set the number of times the currently indexed timer restarts after generating a trigger event to a number from \
0 to 1 048 575. Defaults to 1.\n\
\n\
When set to a number greater than 1, the timer automatically starts the next trigger timer delay at the expiration of \
the previous delay.\n\
\n\
When set to 0, the timer generates trigger events indefinitely.\n\
\n\
If you use the trigger timer with a trigger model, make sure the count value is the same or more than any count \
values expected in the trigger model.'
        },
        kind: CompletionItemKind.Property,
        label: 'count',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].delay\n```\n\
\n\
Get or set the seconds between sequential timer events for the currently selected timer to a number from +8e-6 to \
100 000. Defaults to +10e-6.\n\
\n\
If you use the trigger timer with a trigger model, make sure the trigger timer delay is set so that the readings are \
paced correctly.'
        },
        kind: CompletionItemKind.Property,
        label: 'delay',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].delaylist\n```\n\
\n\
Get or set, as an array, the seconds to use between sequential timer events for the currently indexed timer. Each \
array element is a number from +8e-6 to 100 000. Defaults to { +10e+6 }.\n\
\n\
Each sequential timer event uses the next element in the array as its delay value. After all elements in the array \
have been used, the delays restart at the beginning.\n\
\n\
If the array contains more than one element, the average of the delay intervals in the list must be greater than or \
equal to +50e-6.'
        },
        kind: CompletionItemKind.Property,
        label: 'delaylist',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].enable\n```\n\
\n\
Get or set the state of the currently indexed timer to trigger.ON or OFF. Defaults to trigger.OFF.\n\
\n\
When set to trigger.ON, the timer performs the delay operation, otherwise there is no timer on the delay operation.\n\
\n\
You must enable a timer before it can use the delay settings or the alarm configuration. For expected results from \
the timer, it is best to disable the timer before changing its settings.\n\
\n\
To use the timer as a simple delay or pulse generator with digital I/O lines, make sure the timer start time in \
seconds and fractional seconds is configured for a time in the past. To use the timer as an alarm, configure the \
timer start time in seconds and fractional seconds for the desired alarm time.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n\
\n\
This function resets the following attributes of the currently indexed timer N to its default values: \
"trigger.timer[N].count", \
"trigger.timer[N].delay", \
"trigger.timer[N].delaylist", \
"trigger.timer[N].enable", \
"trigger.timer[N].start.fractionalseconds", \
"trigger.timer[N].start.generate", \
"trigger.timer[N].start.seconds", \
and "trigger.timer[N].stimulus".\n\
\n\
It also clears "trigger.timer[N].overrun".'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.timer[N].wait(timeout) -> boolean\n\
\n\
Returns a boolean value indicating whether a timer event occurred since the last time this or the clear function was \
called. If no event is detected after timeout seconds, then false is returned. If an event is detected or has \
occurred previously, then true is returned immediately.\n\
\n\
After detecting a trigger with this function, the event detector automatically resets and rearms regardless of the \
number of events detected.'
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
