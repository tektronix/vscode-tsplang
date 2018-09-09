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

const tsplinkLineCompletions: Array<CompletionItem> = [
    {
        data: ['tsplink'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available trigger lines. Indexed from 1 to 3.'
        },
        kind: CompletionItemKind.Module,
        label: 'line'
    },
    {
        data: ['line', 'tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.line[N].mode\n```\n\
\n\
Get or set the TSP-Link trigger line to tsplink.MODE_\\*. Defaults to tsplink.MODE_DIGITAL_OPEN_DRAIN.'
        },
        kind: CompletionItemKind.Property,
        label: 'mode',
    },
    {
        data: ['line', 'tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n```\n\
\n\
Reset the following attributes of the currently indexed TSP-Link trigger line N to their default values: \
"trigger.tsplinkin[N].edge", \
"trigger.tsplinkout[N].logic", \
"trigger.tsplinkout[N].pulsewidth", \
"trigger.tsplinkout[N].stimulus", \
and "tsplink.line[N].mode". \
\n\
It also clears "trigger.tsplinkin[N].overrun".'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['line', 'tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.line[N].state\n```\n\
\n\
Get or set the state of a TSP-Link trigger line to tsplink.STATE_HIGH or STATE_LOW. Defaults to STATE_HIGH.'
        },
        kind: CompletionItemKind.Property,
        label: 'state',
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSet {
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        tsplinkLineCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
