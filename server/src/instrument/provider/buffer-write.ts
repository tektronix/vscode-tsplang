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

import { CompletionItemKind, MarkupKind, ParameterInformation } from 'vscode-languageserver'

import { InstrumentSpec } from '..'

import { FormattableSignatureInformation, InstrumentCompletionItem } from '.'

/* TODO: buffer.write.reading parameter 'status' is not helpful */

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['buffer'] },
        kind: CompletionItemKind.Module,
        label: 'write'
    },
    {
        data: { domains: ['write', 'buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction format(bufferVar, units, displayDigits, extraUnits, extraDigits)\n```\n\
\n\
buffer.write.format(bufferVar, buffer.UNIT_\\*, buffer.DIGITS_\\*[, extraUnits][, extraDigits])\n\
\n\
Set the units and number of digits of readings written to the specified WRITABLE or WRITABLE_FULL buffer.\n\
\n\
Defines the units and the number of digits that are reported for the data. This function affects how the data is \
shown in the reading buffer and what is shown on the front‑panel Home, Histogram, Reading Table, and Graph screens.'
        },
        kind: CompletionItemKind.Function,
        label: 'format'
    },
    {
        data: { domains: ['write', 'buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reading(bufferVar, readingValue, seconds, fractionalSeconds, status)\n```\n\
\n\
buffer.write.reading(bufferVar, readingValue[, seconds][, fractionalSeconds][, status])\n\
\n\
Write readings into the specified WRITABLE or WRITABLE_FULL buffer.\n\
\n\
Data must be added in chronological order. If the time is not specified for a reading, it is set to one integer \
second after the last reading. As you write the data, the front‑panel Home screen updates and displays the reading \
you entered.'
        },
        kind: CompletionItemKind.Function,
        label: 'reading'
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'buffer.write.format(bufferVar, units, displayDigits[, extraUnits][, extraDigits])',
        parameters: [
            {
                documentation: 'The name of the buffer.',
                label: 'bufferVar',
            },
            {
                documentation: 'Some buffer.UNIT_*.',
                label: 'units',
            },
            {
                documentation: 'The number of digits to use for the first measurement. Some buffer.DIGITS_*.',
                label: 'displayDigits',
            },
            {
                documentation: 'The units for the second measurement in the buffer index; the selections are the same \
as units (only valid for buffer style WRITABLE_FULL); if not specified, will use the value for units.',
                label: 'extraUnits',
            },
            {
                documentation: 'The number of digits to use for the second measurement; the selections are the same \
as displayDigits (only valid for buffer style WRITABLE_FULL); if not specified, will use the value for displayDigits.',
                label: 'extraDigits',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'buffer.write.reading(bufferVar, readingValue[, seconds][, fractionalSeconds][, status])',
        parameters: [
            {
                documentation: 'The name of the buffer.',
                label: 'bufferVar',
            },
            {
                documentation: 'The first value that is recorded in the buffer index.',
                label: 'readingValue',
            },
            {
                documentation: 'An integer that repesents the seconds.',
                label: 'seconds',
            },
            {
                documentation: 'The portion of the time that represents the fractional seconds.',
                label: 'fractionalSeconds',
            },
            {
                documentation: 'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to \
256 to graph a family of curves (default is 0).',
                label: 'status',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'buffer.write.reading(bufferVar, readingValue[, extraValue][, seconds][, fractionalSeconds][, status])',
        parameters: [
            {
                documentation: 'The name of the buffer.',
                label: 'bufferVar',
            },
            {
                documentation: 'The first value that is recorded in the buffer index.',
                label: 'readingValue',
            },
            {
                documentation: 'A second value that is recorded in the buffer index (only valid for buffer style \
WRITABLE_FULL).',
                label: 'extraValue',
            },
            {
                documentation: 'An integer that repesents the seconds.',
                label: 'seconds',
            },
            {
                documentation: 'The portion of the time that represents the fractional seconds.',
                label: 'fractionalSeconds',
            },
            {
                documentation: 'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to \
256 to graph a family of curves (default is 0).',
                label: 'status',
            },
        ],
    },
]
