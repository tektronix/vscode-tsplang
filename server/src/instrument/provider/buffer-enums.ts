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

import { resolveCompletionNamespace } from '.'

const bufferEnumCompletions: Array<CompletionItem> = [
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_3_5'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_4_5'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_5_5'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_6_5'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_7_5'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_8_5'
    },
    {
        data: ['buffer'],
        detail: 'buffer.FILL_CONTINUOUS: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'FILL_CONTINUOUS'
    },
    {
        data: ['buffer'],
        detail: 'buffer.FILL_ONCE: 0',
        kind: CompletionItemKind.EnumMember,
        label: 'FILL_ONCE'
    },
    {
        data: ['buffer'],
        detail: 'buffer.OFF: 0',
        kind: CompletionItemKind.EnumMember,
        label: 'OFF'
    },
    {
        data: ['buffer'],
        detail: 'buffer.ON: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'ON'
    },
    {
        data: ['buffer'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save date, time, and fractional seconds.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_FORMAT_TIME'
    },
    {
        data: ['buffer'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save seconds and fractional seconds.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_RAW_TIME'
    },
    {
        data: ['buffer'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save relative timestamps.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_RELATIVE_TIME'
    },
    {
        data: ['buffer'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save timestamps.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_TIMESTAMP_TIME'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_LIMIT: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_LIMIT1_HIGH: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT1_HIGH'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_LIMIT1_LOW: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT1_LOW'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_LIMIT2_HIGH: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT2_HIGH'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_LIMIT2_LOW: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT2_LOW'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_ORIGIN: 6',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_ORIGIN'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_OUTPUT: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_OUTPUT'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_OVER_TEMP: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_OVER_TEMP'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_PROTECTION: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_PROTECTION'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_QUESTIONABLE: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_QUESTIONABLE'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_READBACK: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_READBACK'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_SENSE: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_SENSE'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_START_GROUP: 256',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_START_GROUP'
    },
    {
        data: ['buffer'],
        detail: 'buffer.STAT_TERMINAL: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_TERMINAL'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_COMPACT'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_FULL'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_STANDARD'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_WRITABLE'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_WRITABLE_FULL'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP_AC'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_CELSIUS'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_DECIBEL'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_FAHRENHEIT'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_FARAD'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_HERTZ'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_KELVIN'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_NONE'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_OHM'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_PERCENT'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_RATIO'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_RECIPROCAL'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_SECOND'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT_AC'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_WATT'
    },
    {
        data: ['buffer'],
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_X'
    }
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array()
    if (cmd.enums !== undefined) {
        cmd.enums.forEach((enumItem: ApiSpec) => { cmds.push(enumItem) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        bufferEnumCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
