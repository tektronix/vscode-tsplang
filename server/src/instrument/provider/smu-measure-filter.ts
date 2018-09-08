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

const smuMeasureFilterCompletions: Array<CompletionItem> = [
    {
        data: ['measure', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'filter'
    },
    {
        data: ['filter', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.filter.count\n```\n\
\n\
Get or set the number of readings to use for each measurement averaging calculation from 1 to 100. Defaults to 10.\n\
\n\
A larger filter count means less noise at the cost of more time per measurement.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'count',
    },
    {
        data: ['filter', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.filter.enable\n```\n\
\n\
Get or set the present measurement filter setting to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
When set to smu.ON, the reading returned by the instrument is an averaged value, taken from multiple measurements.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['filter', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.filter.type\n```\n\
\n\
Get or set the present averaging filter type to smu.FILTER_\\*. Defaults to smu.FILTER_REPEAT_AVG.\n\
\n\
When set to smu.FILTER_REPEAT_AVG, a set of measurements are made and stored in a stack of the size defined by the \
filter count setting. These stack measurements are averaged together to produce a final measurement, after which all \
stack items are removed and the process repeated. This type of filter is the slowest, as the stack must be filled \
before an averaged sample can be produced.\n\
\n\
When set to smu.FILTER_MOVING_AVG, a set of measurements are made and stored in a first-in, first-out queue the size \
of which is defined by the filter count setting. The moving average filter type does not wait for all measurements \
from the previous average to clear the queue before providing another, should it be requested. However, the queue \
must be filled before any averaging takes place.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'type',
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
                cmds.concat(cmd.children)
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                smuMeasureFilterCompletions.forEach((completion: CompletionItem) => {
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

// export async function getSmuMeasureFilterCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(smuMeasureFilterCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
