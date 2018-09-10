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

const smuSourceVlimitDocs: Map<string, CommandDocumentation> = new Map([
    [
        'smu.source.ilimit.level',
        {
            kind: MarkupKind.Markdown,
            toString: (spec: InstrumentSpec): string => {
                return '```lua\nsmu.source.vlimit.level\n```\n\
\n\
Get or set the source limit for voltage to a number from 0.02V to 210V. Changing the source function will reset this \
attribute to its default value of +21.0.\n\
\n\
Specified values must be more than 0.1% of the measurement range unless the instrument is in autorange mode. If set \
to an invalid level, the instrument will use the nearest valid level and log a warning.\n\
\n\
Values that can be set for this attribute are limited by the overvoltage protection limit.'
                    .replace('%{0}', spec.voltage.measure.range.low.toString())
                    .replace('%{1}', spec.voltage.measure.level.high.toString())
                    /* TODO:
                        This default calculation is probably wrong for the 2460.
                        We may have to add this setting to the InstrumentSpec.
                    */
                    // tslint:disable-next-line:no-magic-numbers
                    .replace('%{2}', (spec.voltage.measure.level.high * 0.1).toString())
            }
        }
    ],
])

const smuSourceVlimitCompletions: Array<CompletionItem> = [
    {
        data: ['source', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'vlimit'
    },
    {
        data: ['vlimit', 'source', 'smu'],
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: ['vlimit', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.vlimit.tripped\n```\n\nsmu.source.vlimit.tripped -> smu.OFF | smu.ON | nil\n\
\n\
Returns the present voltage-limit state as smu.OFF or ON. If the present output function is not set to voltage, then \
nil is returned.\n\
\n\
When smu.ON is returned, the instrument has clamped the source to keep it within the set limit.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
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
        smuSourceVlimitDocs.forEach((value: CommandDocumentation, key: string) => {
            if (cmdItem.label.localeCompare(key) === 0) {
                resultCompletionDocs.set(key, value)
            }
        })

        smuSourceVlimitCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completionDocs: resultCompletionDocs, completions: resultCompletions }
}
