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

const smuMeasureLimitCompletions: Array<CompletionItem> = [
    {
        data: ['measure', 'smu'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available limits. Indexed from 1 to 2.'
        },
        kind: CompletionItemKind.Module,
        label: 'limit'
    },
    {
        data: ['limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.limit[Y].audible\n```\n\
\n\
Get or set the beeper behavior for the indexed limit to smu.AUDIBLE_\\*. When in continuity mode, the default is \
smu.AUDIBLE_PASS; otherwise the default is smu.AUDIBLE_NONE.\n\
\n\
The tone and length of the beeper cannot be adjusted.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'audible',
    },
    {
        data: ['limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.limit[Y].autoclear\n```\n\
\n\
Get or set the autoclear behavior for the indexed limit to smu.OFF or ON. Defaults to smu.ON.\n\
\n\
When set to smu.ON, limit high and limit low conditions are cleared automatically after reading the fail attribute. \
If taking a series of measurements, the fail attribute represents the result of the last measurement.\n\
\n\
When set to smu.OFF, the failed attribute is not cleared when read and will remain set until it cleared with the \
limit clear function. If taking a series of measurements, the fail attribute represents the result of all \
measurements.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'autoclear',
    },
    {
        data: ['limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the limit fail attribute for the present limit.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.limit[Y].enable\n```\n\
\n\
Get or set the limit test for the indexed limit to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
Limit testing occurs on each measurement made by the instrument.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.limit[Y].fail\n```\n\
\n\
smu.measure.limit[Y].fail -> smu.FAIL_\\*\n\
\n\
Returns the result of the limit test for the indexed limit. If limit autoclear is enabled, then this attribute is \
cleared after being accessed. This attribute is always cleared when changing measure functions.'
        },
        kind: CompletionItemKind.Constant,
        label: 'fail',
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
                smuMeasureLimitCompletions.forEach((completion: CompletionItem) => {
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

// export async function getSmuMeasureLimitCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(smuMeasureLimitCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
