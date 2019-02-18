/*
 *  Copyright Tektronix Inc.
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
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_APERTURE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_ATRIG_EDGE_LEVEL'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_ATRIG_EDGE_SLOPE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_ATRIG_MODE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_ATRIG_WINDOW_DIRECTION'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_ATRIG_WINDOW_LEVEL_HIGH'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_ATRIG_WINDOW_LEVEL_LOW'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_COUNT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_DIGITS'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_DB_REFERENCE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_DBM_REFERENCE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_FUNCTION'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_INPUT_IMPEDANCE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_AUDIBLE_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_AUDIBLE_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_AUTO_CLEAR_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_AUTO_CLEAR_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_CLEAR_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_CLEAR_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_ENABLE_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_ENABLE_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_FAIL_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_FAIL_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_HIGH_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_HIGH_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_LOW_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_LIMIT_LOW_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_MATH_ENABLE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_MATH_FORMAT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_MATH_MXB_BF'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_MATH_MXB_MF'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_MATH_PERCENT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_RANGE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_REL_ENABLE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_REL_LEVEL'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_SAMPLE_RATE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_UNIT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_USER_DELAY_N'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_DIGI_TERMINALS'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_APERTURE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_AUTO_DELAY'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_AUTO_ZERO'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_ATRIG_EDGE_SLOPE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_ATRIG_MODE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_ATRIG_WINDOW_DIRECTION'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_ATRIG_WINDOW_LEVEL_HIGH'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_ATRIG_WINDOW_LEVEL_LOW'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_BIAS_LEVEL'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_COUNT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_DB_REFERENCE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_DETECTBW'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_DIGITS'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_FUNCTION'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_INPUT_IMPEDANCE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_AUDIBLE_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_AUDIBLE_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_AUTO_CLEAR_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_AUTO_CLEAR_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_CLEAR_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_CLEAR_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_ENABLE_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_ENABLE_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_FAIL_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_FAIL_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_HIGH_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_HIGH_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_LOW_1'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LIMIT_LOW_2'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_LINE_SYNC'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_MATH_ENABLE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_MATH_FORMAT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_MATH_MXB_BF'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_MATH_MXB_MF'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_MATH_PERCENT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_NPLC'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_OFFCOMP_ENABLE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_OPEN_DETECTOR'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_RANGE_AUTO'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_RANGE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_SENSE_RANGE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_TERMINALS'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_THREE_RTD'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_TWO_RTD'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_THRESHOLD_RANGE_AUTO'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_THRESHOLD_RANGE'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_UNIT'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ATTR_MEAS_USER_DELAY_N'
    },
    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'ON'
    },

    {
        data: { domains: ['dmm'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'OFF'
    },
]
