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

const smuMeasureLimitLowCompletions: Array<CompletionItem> = [
    {
        data: ['limit', 'measure', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'low'
    },
    {
        data: ['low', 'limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.limit[Y].low.value\n```\n\
\n\
Get or set the low limit value for the indexed limit as a number from -9.99999e+11 to +9.99999e+11. Defaults to -1.\n\
\n\
If the indexed limit is enabled, a failure indication will be generated when a measurement is less than this value.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'value',
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSet {
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        smuMeasureLimitLowCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
