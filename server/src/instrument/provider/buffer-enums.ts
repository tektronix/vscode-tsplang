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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_3_5'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_4_5'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_5_5'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_6_5'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_7_5'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_8_5'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.FILL_CONTINUOUS: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'FILL_CONTINUOUS'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.FILL_ONCE: 0',
        kind: CompletionItemKind.EnumMember,
        label: 'FILL_ONCE'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.OFF: 0',
        kind: CompletionItemKind.EnumMember,
        label: 'OFF'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.ON: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'ON'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save date, time, and fractional seconds.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_FORMAT_TIME'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save seconds and fractional seconds.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_RAW_TIME'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save relative timestamps.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_RELATIVE_TIME'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save timestamps.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_TIMESTAMP_TIME'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT: 32',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Source status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT1_HIGH: 128',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT1_HIGH'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT1_LOW: 64',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT1_LOW'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT2_HIGH: 32',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT2_HIGH'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT2_LOW: 16',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT2_LOW'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_ORIGIN: 6',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_ORIGIN'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_OUTPUT: 128',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Source status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_OUTPUT'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_OVER_TEMP: 16',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Source status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_OVER_TEMP'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_PROTECTION: 4',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Source status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_PROTECTION'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_QUESTIONABLE: 1',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_QUESTIONABLE'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_READBACK: 8',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Source status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_READBACK'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_SENSE: 64',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Source status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_SENSE'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_START_GROUP: 256',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_START_GROUP'
    },
    {
        allowBitwise: true,
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_TERMINAL: 8',
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Measure status.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_TERMINAL'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_COMPACT'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_FULL'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_STANDARD'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_WRITABLE'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_WRITABLE_FULL'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP_AC'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_CELSIUS'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_DECIBEL'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_FAHRENHEIT'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_FARAD'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_HERTZ'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_KELVIN'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_NONE'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_OHM'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_PERCENT'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_RATIO'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_RECIPROCAL'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_SECOND'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT_AC'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_WATT'
    },
    {
        data: { domains: ['buffer'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_X'
    }
]
