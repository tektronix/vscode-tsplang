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

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace } from '.'

const digioLineCompletions: Array<CompletionItem> = [
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available I/O trigger lines. Indexed from 1 to 6.'
        },
        kind: CompletionItemKind.Field,
        label: 'line'
    },
    {
        data: ['line', 'digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndigio.line[N].mode\n```\n\
\n\
Get or set the digital I/O line to digio.MODE_\\*. Defaults to digio.MODE_IN.'
        },
        kind: CompletionItemKind.Property,
        label: 'mode',
    },
    {
        data: ['line', 'digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n```\n\
\n\
Reset the following attributes of the currently indexed digital I/O line N to their default values: \
"digio.line[N].mode", \
"trigger.digin[N].edge", \
"trigger.digout[N].logic", \
"trigger.digout[N].pulsewidth", \
and "trigger.digout[N].stimulus". \
\n\
The value of "digio.line[N].state" will float high if nothing is connected to the digital line.\n\
\n\
It also clears "trigger.digin[N].overrun".'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['line', 'digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndigio.line[N].state\n```\n\
\n\
Get or set the digital I/O line state to digio.STATE_HIGH or STATE_LOW.\n\
\n\
May be set to high on reset, as digial inputs float high if nothing is connected to the digital line.'
        },
        kind: CompletionItemKind.Property,
        label: 'state',
    },
]

export async function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()

            const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
            if (cmd.children !== undefined) {
                cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                digioLineCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
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

// export async function getDigioLineCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(digioLineCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
