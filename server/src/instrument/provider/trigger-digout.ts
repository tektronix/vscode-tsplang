/*
 *  Copyright Tektronix Inc.
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
        data: { domains: ['trigger'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available digital I/O lines. Indexed from 1 to 6.'
        },
        kind: CompletionItemKind.Module,
        label: 'digout'
    },
    {
        data: { domains: ['digout', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction assert()\n```\n\
\n\
Assert a trigger pulse on the currently indexed digital I/O line, returning before it has completed.'
        },
        kind: CompletionItemKind.Function,
        label: 'assert',
    },
    {
        data: { domains: ['digout', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digout[N].logic\n```\n\
\n\
Get or set the logic used by the output trigger generator for the currently indexed digital I/O line to \
trigger.LOGIC_\\*. Defaults to trigger.LOGIC_NEGATIVE.\n\
\n\
The output state of the digital I/O line is controlled by the trigger logic. Any user-specified output state is \
ignored.'
        },
        kind: CompletionItemKind.Property,
        label: 'logic',
    },
    {
        data: { domains: ['digout', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digout[N].pulsewidth\n```\n\
\n\
Get or set the time in seconds the currently indexed digital I/O line is asserted as a number from 0 to 100 000. \
Defaults to +10e-6.\n\
\n\
When set to 0, the line is asserted until the release function is called.'
        },
        kind: CompletionItemKind.Property,
        label: 'pulsewidth',
    },
    {
        data: { domains: ['digout', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction release()\n```\n\
\n\
Release a trigger that was asserted with an indefinite pulsewidth time. It also releases a trigger that was latched \
in response to receiving a synchronous mode trigger. Only the currently indexed digital I/O line is affected.'
        },
        kind: CompletionItemKind.Function,
        label: 'release',
    },
    {
        data: { domains: ['digout', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.digout[N].stimulus\n```\n\
\n\
Get or set the trigger event for the currently indexed digital I/O line to trigger.EVENT_\\*. Defaults to \
trigger.EVENT_NONE.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]
