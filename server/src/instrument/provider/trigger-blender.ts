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

import { CompletionItem, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['trigger'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available event blenders. Indexed from 1 to 2.'
        },
        kind: CompletionItemKind.Module,
        label: 'blender'
    },
    {
        data: { domains: ['blender', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the event detector and reset the overrun indicator of the currently indexed blender.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: { domains: ['blender', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.blender[N].orenable\n```\n\
\n\
Get or set whether the currently indexed blender performs OR operations (true) or AND operations (false). Defaults to \
AND operations (false).\n\
\n\
When set to OR operations (true), the blender waits for a single stimulus before signaling an output event.\n\
\n\
When set to AND operations (false), the blender waits for all stimulus before signaling an output event.'
        },
        kind: CompletionItemKind.Property,
        label: 'orenable',
    },
    {
        data: { domains: ['blender', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.blender[N].overrun\n```\n\ntrigger.blender[N].overrun -> boolean\n\
\n\
Returns true if an event was ignored because the event detector was already in the detected state and false otherwise.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: { domains: ['blender', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n\
\n\
Reset the following attributes of the currently indexed blender N to their default values: \
"trigger.blender[N].orenable" \
and "trigger.blender[N].stimulus".\n\
\n\
It also clears "trigger.blender[N].overrun".'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: { domains: ['blender', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.blender[N].stimulus[M]\n```\n\
\n\
Get or set stimulus[M] to some blender-triggering event trigger.EVENT_\\* or 0, where M is an index from 1 to 4. \
If set to 0, input for the currently indexed blender is disabled. Each element of the stimulus array defaults to \
trigger.EVENT_NONE.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
    {
        data: { domains: ['blender', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.blender[N].wait(timeout) -> boolean\n\
\n\
Returns a boolean value indicating whether a blender trigger event occurred since the last time this or the clear \
function was called. If no event is detected after timeout seconds, then false is returned. If an event is detected \
or has occurred previously, then true is returned immediately.\n\
\n\
After detecting a trigger with this function, the event detector automatically resets and rearms regardless of the \
number of events detected.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'trigger.blender[].wait(timeout)',
        parameters: [
            {
                documentation: 'Timeout in seconds.',
                label: 'timeout',
            },
        ],
    },
]
