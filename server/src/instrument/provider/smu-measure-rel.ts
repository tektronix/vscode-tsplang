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

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { CommandDocumentation, resolveCompletionNamespace } from '.'

const smuMeasureRelDocs: Map<string, CommandDocumentation> = new Map([
    [
        'smu.measure.rel.level',
        {
            kind: MarkupKind.Markdown,
            toString: (spec: InstrumentSpec): string => {
                return '```lua\nsmu.measure.rel.level\n```\n\
\n\
Get or set the value used by the relative offset calculation to some number. Defaults to 0 for all measurement \
functions.\n\
\n\
When the measurement function is set to Current, the valid range of this attribute is %{0} to %{1}.\n\
\n\
When the measurement function is set to Resistance, the valid range of this attribute is %{2} to %{3}.\n\
\n\
When the measurement function is set to Voltage, the valid range of this attribute is %{4} to %{5}.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
                    .replace('%{0}', spec.current.measure.level.low.toString())
                    .replace('%{1}', spec.current.measure.level.high.toString())
                    .replace('%{2}', spec.resistance.level.low.toString())
                    .replace('%{3}', spec.resistance.level.high.toString())
                    .replace('%{4}', spec.voltage.measure.level.low.toString())
                    .replace('%{5}', spec.voltage.measure.level.high.toString())
            }
        }
    ],
])

const smuMeasureRelCompletions: Array<CompletionItem> = [
    {
        data: ['measure', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'rel'
    },
    {
        data: ['rel', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction acquire()\n```\n\nsmu.measure.rel.acquire() -> number | nil\n\
\n\
Returns the internal measurement acquired for the relative offset value as a number. If an error occurs during the \
measurement, nil is returned and the offset remains at its previous value. No math, limit tests, or filter settings \
are applied.\n\
\n\
The acquired relative offset measurement is only applied to the present measurement function.'
        },
        kind: CompletionItemKind.Function,
        label: 'acquire',
    },
    {
        data: ['rel', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.rel.enable\n```\n\
\n\
Get or set the present relative measurement offset setting to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
Relative offset is calculated as `out = in - offset` where \
*out* is the supplied measurement after offset is applied, \
*in* is a measurement before the offset applied, \
and *offset* is a constant defined by the rel level attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['rel', 'measure', 'smu'],
        kind: CompletionItemKind.Property,
        label: 'level',
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
    const resultCompletionDocs: Map<string, CommandDocumentation> = new Map()
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        smuMeasureRelDocs.forEach((value: CommandDocumentation, key: string) => {
            if (cmdItem.label.localeCompare(key) === 0) {
                resultCompletionDocs.set(key, value)
            }
        })

        smuMeasureRelCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completionDocs: resultCompletionDocs, completions: resultCompletions }
}
