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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['timer', 'trigger'] },
        kind: CompletionItemKind.Module,
        label: 'start'
    },
    {
        data: { domains: ['start', 'timer', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].start.fractionalseconds\n```\n\
\n\
Get or set the fractional seconds in an alarm or some future time when the currently indexed timer will start to a \
number between 0 and 1 (exclusive). Defaults to 0.\n\
\n\
When enabled, the timer will start immediately if it is configured for a start time that has passed.'
        },
        kind: CompletionItemKind.Property,
        label: 'fractionalseconds',
    },
    {
        data: { domains: ['start', 'timer', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].start.generate\n```\n\
\n\
Get or set whether to use the configured start time for the currently indexed timer to trigger.ON or OFF. Defaults to \
trigger.OFF.\n\
\n\
When set to trigger.ON, a trigger event is generated after the configured delay has elapsed.\n\
\n\
When set to trigger.OFF, a trigger event is generated after delay seconds have past since the configured start time. \
This generates a trigger.EVENT_TIMER<N>, where <N> is the currently indexed timer.'
        },
        kind: CompletionItemKind.Property,
        label: 'generate',
    },
    {
        data: { domains: ['start', 'timer', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].start.overrun\n```\n\ntrigger.timer[N].start.overrun -> boolean\n\
\n\
Returns true if an event was ignored because the event detector was already in the detected state and false otherwise.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: { domains: ['start', 'timer', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].start.seconds\n```\n\
\n\
Get or set the seconds in an alarm or some future time when the currently indexed timer will start to a number from 0 \
to 2 147 483 647. Defaults to 0.\n\
\n\
When enabled, the timer will start immediately if it is configured for a start time that has passed.'
        },
        kind: CompletionItemKind.Property,
        label: 'seconds',
    },
    {
        data: { domains: ['start', 'timer', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.timer[N].start.stimulus\n```\n\
\n\
Get or set the trigger event that starts the currently indexed timer to trigger.EVENT_\\*. Defaults to \
trigger.EVENT_NONE.\n\
\n\
When set to 0, event processing is disabled and the timer triggers based on its configured start time.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]
