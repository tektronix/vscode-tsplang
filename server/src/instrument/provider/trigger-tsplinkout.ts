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

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { ApiSpec } from '..'

import { CommandSet, resolveCompletionNamespace } from '.'

const triggerTsplinkoutCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available TSP-Link trigger lines. Indexed from 1 to 3.'
        },
        kind: CompletionItemKind.Module,
        label: 'tsplinkout'
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction assert()\n```\n\
\n\
Assert a trigger event on the currently indexed TSP-Link trigger, returning before it has completed.'
        },
        kind: CompletionItemKind.Function,
        label: 'assert',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.tsplinkout[N].logic\n```\n\
\n\
Get or set the logic used by the output trigger generator for the currently indexed TSP-Link trigger to \
trigger.LOGIC_\\*. Defaults to trigger.LOGIC_NEGATIVE.\n\
\n\
The output state of the TSP-Link trigger is controlled by the trigger logic. Any user-specified output state is \
ignored.'
        },
        kind: CompletionItemKind.Property,
        label: 'logic',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.tsplinkout[N].pulsewidth\n```\n\
\n\
Get or set the time in seconds the currently indexed TSP-Link trigger is asserted as a number from 0 to 100 000. \
Defaults to +10e-6.\n\
\n\
When set to 0, the line is asserted until the release function is called.'
        },
        kind: CompletionItemKind.Property,
        label: 'pulsewidth',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction release()\n```\n\
\n\
Release a trigger that was asserted with an indefinite pulsewidth time. It also releases a trigger that was latched \
in response to receiving a synchronous mode trigger. Only the currently indexed TSP-Link trigger is affected.'
        },
        kind: CompletionItemKind.Function,
        label: 'release',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.tsplinkout[N].stimulus\n```\n\
\n\
Get or set the trigger event for the currently indexed TSP-Link trigger to trigger.EVENT_\\*. Defaults to \
trigger.EVENT_NONE.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]

export async function getTriggerTsplinkoutCommandSet(cmds: Array<ApiSpec>): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()

            cmds.forEach((cmd: ApiSpec) => {
                triggerTsplinkoutCompletions.forEach((completion: CompletionItem) => {
                    if (cmd.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })
            })

            resolve({
                completions: resultCompletions
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

// export async function getTriggerTsplinkoutCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(triggerTsplinkoutCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
