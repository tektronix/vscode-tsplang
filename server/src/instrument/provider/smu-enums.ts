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

const smuEnumCompletions: Array<CompletionItem> = [
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'AUDIBLE_FAIL'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'AUDIBLE_NONE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'AUDIBLE_PASS'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'DELAY_AUTO'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_3_5'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_4_5'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_5_5'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_6_5'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_BOTH'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_HIGH'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_LOW'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_NONE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FILTER_MOVING_AVG'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FILTER_REPEAT_AVG'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FUNC_DC_CURRENT'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FUNC_DC_VOLTAGE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'FUNC_RESISTANCE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'INFINITE'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Adjust measurement *x* by some factors *m* and *b*.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MATH_MXB'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Percentage of deviation from the reference constant supplied by the math percent attribute.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MATH_PERCENT'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Take the reciprocal of measurement *x*.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MATH_RECIPROCAL'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'OFF'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Turning the source off sets the measurement sense type to 2-Wire and the voltage limit to 10% of \
the present voltage range. If the output is acting a current source, then it is selected and set to 0A; otherwise it \
is set to 0V.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_GUARD'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Turning the source off sets the measurement sense type to 2-Wire and opens the output relay. \
Opening this relay disconnects the instrument as a load. To prevent execessive wear, do not use this offmode during \
tests that toggle the output state frequently.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_HIGHZ'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Turning the source off sets the measurement sense type to 2-Wire, selects the voltage source and \
sets it to 0V, and sets the current limit to 10% of the present measurement autorange value.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_NORMAL'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Turning the source off sets the measurement sense type to 2-Wire, selects the voltage source and \
sets it to 0V and sets the range to the present range (turning off autorange if enabled). If the output is acting as \
a current source, then the current limit is set to the programmed source current value or to 10% of the present \
current range, whichever is greater; otherwise the current limit is not changed.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_ZERO'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'ON'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_2V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_5V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_10V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_20V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_40V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_60V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_80V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_100V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_120V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_140V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_160V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_180V'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_NONE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'RANGE_AUTO'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'RANGE_BEST'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'RANGE_FIXED'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'SENSE_2WIRE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'SENSE_4WIRE'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERMINALS_FRONT'
    },
    {
        data: ['smu'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERMINALS_REAR'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available for Current measurements.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Available for all measurement functions.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_OHM'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available for Voltage measurements.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available for Current or Voltage measurements.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_WATT'
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
                smuEnumCompletions.forEach((completion: CompletionItem) => {
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

// export async function getSmuEnumCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(smuEnumCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
