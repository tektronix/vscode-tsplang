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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const bufferVarCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute contains the number of readings a buffer can store.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command allows you to change or view how many readings a buffer can store. Changing the size of a buffer will cause any existing data in the buffer to be lost.\n\nThe overall capacity of all buffers stored in the instrument cannot exceed 7,000,020 readings for standard reading buffers.'
        },
        kind: CompletionItemKind.Property,
        label: 'bufferVar.capacity',
    },
    {
        detail: 'This attribute contains the channels that produced the readings that are stored in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.channels',
    },
    {
        detail: 'This function clears all readings and statistics from the specified buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'bufferVar.clear',
    },
    {
        detail: 'This attribute contains the dates of readings that are stored in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The dates are formatted as month, day, year.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.dates',
    },
    {
        detail: 'This attribute indicates the last index in a reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this attribute to find the ending index in a reading buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.endindex',
    },
    {
        detail: 'This attribute contains the measurement and the unit of measure of the additional values in a reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the measurement and the unit of measure of an additional value, such as the sense voltage from a DC voltage ratio measurement. The reading buffer style must be set to full to use this option.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.extraformattedvalues',
    },
    {
        detail: 'This attribute contains the additional values in a reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains an additional value, such as the sense voltage from a DC voltage ratio measurement. The reading buffer style must be set to full to use this option.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.extravalues',
    },
    {
        detail: 'This attribute contains the units of the additional values in a reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the unit of measure of an additional value, such as the sense voltage from a DC voltage ratio measurement. The reading buffer style must be set to full to use this option.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.extravalueunits',
    },
    {
        detail: 'This attribute determines if a reading buffer is filled continuously or is filled once and stops.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When a reading buffer is set to fill once, no data is overwritten in the buffer. When the buffer is filled, no more data is stored in that buffer and new readings are discarded.\n\nWhen a reading buffer is set to fill continuously, the oldest data is overwritten by the newest data after the buffer fills.\n\nWhen you change the fill mode of a buffer, any data in the buffer is cleared.'
        },
        kind: CompletionItemKind.Property,
        label: 'bufferVar.fillmode',
    },
    {
        detail: 'This attribute contains the stored readings shown as numbers with units and prefixes.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute outputs an array (a Lua table) of strings that contain the stored readings. The readings are shown as numbers with prefixes before the units symbol.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.formattedreadings',
    },
    {
        detail: 'This attribute contains the fractional second portion of the timestamp of each reading in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This read-only attribute is an array (a Lua table) of the fractional portion of the timestamps, in seconds, when each reading occurred. Seconds are shown as fractions.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.fractionalseconds',
    },
    {
        detail: 'This attribute indicates if information events are logged when the specified reading buffer is at 0% or 100% filled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'If this is set to on, when the reading buffer is cleared (0% filled) or full (100% filled), an event is logged in the event log. If this is set to off, reading buffer status is not reported in the event log.'
        },
        kind: CompletionItemKind.Property,
        label: 'bufferVar.logstate',
    },
    {
        detail: 'This attribute contains the number of readings in the specified reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can call this command to return the number of readings stored in the specified reading buffer.\n\nYou can use the bufferVar.n attribute in other commands. For example, to print all of the readings in a buffer, use the following command:\n\nWhere bufferVar is the name of the buffer to use.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.n',
    },
    {
        detail: 'This attribute contains the readings stored in a specified reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.readings',
    },
    {
        detail: 'This attribute contains the timestamps, in seconds, when each reading occurred, relative to the timestamp of the first entry in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This read-only attribute is an array (a Lua table) of timestamps, in seconds, of when each reading occurred relative to the timestamp of the first entry in the reading buffer. These timestamps are equal to the time that has lapsed for each reading since the first reading was stored in the buffer. Therefore, the relative timestamp for the first entry number in the reading buffer equals 0.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.relativetimestamps',
    },
    {
        detail: 'This attribute contains the timestamp of a reading in seconds, in UTC format.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the nonfractional seconds portion of the timestamp when the reading was stored in Coordinated Universal Time (UTC) format.\n\nThe nonfractional seconds portion of the timestamp gives the lowest resolution down to 1 second. To access additional resolution of a timestamp, see bufferVar.fractionalseconds.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.seconds',
    },
    {
        detail: 'This attribute indicates the starting index in a reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this attribute to find the starting index in a reading buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.startindex',
    },
    {
        detail: 'This attribute contains the status values of readings in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This buffer recall attribute holds an array (a Lua table) of the status values for all the readings in the buffer. The status values are floating-point numbers that encode the status value. Refer to the following table for values.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.statuses',
    },
    {
        detail: 'This attribute contains the time when the instrument made the reading.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.times',
    },
    {
        detail: 'This attribute contains the timestamp when each reading saved in the specified reading buffer occurred.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the timestamps (date, hours, minutes, seconds, and fractional seconds) of readings stored in the reading buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.timestamps',
    },
    {
        detail: 'This attribute contains the unit of measure that is stored with readings in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the unit of measure that is stored with readings in the reading buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.units',
    },
]

const bufferVarSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'bufferVar.clear(bufferVar)',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer.'
        ),
    ),
]

export async function getBufferVarCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(bufferVarCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getBufferVarSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(bufferVarSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
