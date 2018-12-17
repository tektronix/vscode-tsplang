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
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'AUDIBLE_FAIL'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'AUDIBLE_NONE'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'AUDIBLE_PASS'
    },
    {
        data: { domains: ['smu'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'DELAY_AUTO'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_3_5'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_4_5'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_5_5'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'DIGITS_6_5'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_BOTH'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_HIGH'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_LOW'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FAIL_NONE'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FILTER_MOVING_AVG'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FILTER_REPEAT_AVG'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FUNC_DC_CURRENT'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FUNC_DC_VOLTAGE'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'FUNC_RESISTANCE'
    },
    {
        data: { domains: ['smu'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'INFINITE'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Adjust measurement *x* by some factors *m* and *b*.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MATH_MXB'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Percentage of deviation from the reference constant supplied by the math percent attribute.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MATH_PERCENT'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Take the reciprocal of measurement *x*.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'MATH_RECIPROCAL'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'OFF'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Turning the source off sets the measurement sense type to 2-Wire and the voltage limit to 10% of \
the present voltage range. If the output is acting a current source, then it is selected and set to 0A; otherwise it \
is set to 0V.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_GUARD'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Turning the source off sets the measurement sense type to 2-Wire and opens the output relay. \
Opening this relay disconnects the instrument as a load. To prevent execessive wear, do not use this offmode during \
tests that toggle the output state frequently.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_HIGHZ'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Turning the source off sets the measurement sense type to 2-Wire, selects the voltage source and \
sets it to 0V, and sets the current limit to 10% of the present measurement autorange value.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_NORMAL'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Turning the source off sets the measurement sense type to 2-Wire, selects the voltage source and \
sets it to 0V and sets the range to the present range (turning off autorange if enabled). If the output is acting as \
a current source, then the current limit is set to the programmed source current value or to 10% of the present \
current range, whichever is greater; otherwise the current limit is not changed.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'OFFMODE_ZERO'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'ON'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_2V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_5V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_10V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_20V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_40V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_60V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_80V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_100V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_120V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_140V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_160V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_180V'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'PROTECT_NONE'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Automatically choose the most sensitive range for each source level in the sweep.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'RANGE_AUTO'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Automatically choose the most sensitive range for all source levels in the sweep.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'RANGE_BEST'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Use whatever range was configured at the start of the sweep.'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'RANGE_FIXED'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'SENSE_2WIRE'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'SENSE_4WIRE'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'TERMINALS_FRONT'
    },
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.EnumMember,
        label: 'TERMINALS_REAR'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Only available for Current measurements.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_AMP'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Available for all measurement functions.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_OHM'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Only available for Voltage measurements.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_VOLT'
    },
    {
        data: { domains: ['smu'] },
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Only available for Current or Voltage measurements.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'UNIT_WATT'
    },
]
