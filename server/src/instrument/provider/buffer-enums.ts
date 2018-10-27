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

import { InstrumentCompletionItem } from '.'

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_3_5'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_4_5'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_5_5'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_6_5'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_7_5'
    },
    {
        data: { domains: ['buffer'] },
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
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_FORMAT_TIME'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save seconds and fractional seconds.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_RAW_TIME'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save relative timestamps.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_RELATIVE_TIME'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Save timestamps.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SAVE_TIMESTAMP_TIME'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT1_HIGH: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT1_HIGH'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT1_LOW: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT1_LOW'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT2_HIGH: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT2_HIGH'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_LIMIT2_LOW: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_LIMIT2_LOW'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_ORIGIN: 6',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_ORIGIN'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_OUTPUT: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_OUTPUT'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_OVER_TEMP: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_OVER_TEMP'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_PROTECTION: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_PROTECTION'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_QUESTIONABLE: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_QUESTIONABLE'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_READBACK: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_READBACK'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_SENSE: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_SENSE'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_START_GROUP: 256',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_START_GROUP'
    },
    {
        data: { domains: ['buffer'] },
        detail: 'buffer.STAT_TERMINAL: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'STAT_TERMINAL'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_COMPACT'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_FULL'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_STANDARD'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_WRITABLE'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STYLE_WRITABLE_FULL'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP_AC'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_CELSIUS'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_DECIBEL'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_FAHRENHEIT'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_FARAD'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_HERTZ'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_KELVIN'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_NONE'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_OHM'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_PERCENT'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_RATIO'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_RECIPROCAL'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_SECOND'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT_AC'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_WATT'
    },
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_X'
    }
]
