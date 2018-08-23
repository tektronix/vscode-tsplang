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
            value: 'This command allows you to change or view how many readings a buffer can store. Changing the size of a buffer will cause any existing data in the buffer to be lost.\n\nThe overall capacity of all buffers stored in the instrument cannot exceed 6,875,000 readings for standard reading buffers and 27,500,000 for compact reading buffers. For more information about buffer capacity, see Setting reading buffer capacity.'
        },
        kind: CompletionItemKind.Property,
        label: 'bufferVar.capacity',
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
            value: 'The dates are formatted as month, day, year.\n\nThis is not available if the reading buffer style is set to compact.'
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
        detail: 'This attribute determines if a reading buffer is filled continuously or is filled once and stops.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When a reading buffer is set to fill once, no data is overwritten in the buffer. When the buffer is filled, no more data is stored in that buffer and new readings are discarded.\n\nWhen a reading buffer is set to fill continuously, the oldest data is overwritten by the newest data after the buffer fills.\n\nWhen you change the fill mode of a buffer, any data in the buffer is cleared.'
        },
        kind: CompletionItemKind.Property,
        label: 'bufferVar.fillmode',
    },
    {
        detail: 'This attribute contains the stored readings formatted as they appear on the front‑panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute outputs an array (a Lua table) of strings that contain the stored readings. The readings are shown as they would appear on the front‑panel display.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.formattedreadings',
    },
    {
        detail: 'This attribute contains the fractional second portion of the timestamp of each reading in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This read‑only attribute is an array (a Lua table) of the fractional portion of the timestamps, in seconds, when each reading occurred. Seconds are shown as fractions.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.fractionalseconds',
    },
    {
        detail: 'This attribute indicates if information events are logged when the specified reading buffer is at 0% or 100% filled',
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
            value: 'This read‑only attribute is an array (a Lua table) of timestamps, in seconds, of when each reading occurred relative to the timestamp of the first entry in the reading buffer. These timestamps are equal to the time that has lapsed for each reading since the first reading was stored in the buffer. Therefore, the relative timestamp for the first entry number in the reading buffer equals 0.'
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
        detail: 'This attribute contains the source levels formatted as they appear on the front-panel display when the readings in the reading buffer were acquired.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The attribute is an array (a Lua table) of the sourced value that was in effect at the time of the reading. The source levels are formatted the same way the readings are formatted when they appear on the front-panel display.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.sourceformattedvalues',
    },
    {
        detail: 'This attribute contains the source status conditions of the instrument for the reading point.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This buffer recall attribute holds an array (a Lua table) of the status values for all the readings in the buffer. The status values are floating-point numbers that encode the status value for each measurement taken; see the following tables for values.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.sourcestatuses',
    },
    {
        detail: 'This attribute contains the units of measure of the source.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The attribute is an array (a Lua table) of strings indicating the units of measure at the time of the reading.'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.sourceunits',
    },
    {
        detail: 'This attribute contains the source levels being output when readings in the reading buffer were acquired.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute is like an array (a Lua table) of the sourced value in effect at the time of the reading.\n\nThe values returned by this command depend on the source readback state:'
        },
        kind: CompletionItemKind.Constant,
        label: 'bufferVar.sourcevalues',
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
            value: 'This command is not available if the buffer style is set to compact.\n\nThis buffer recall attribute holds an array (a Lua table) of the status values for all the readings in the buffer. The status values are floating-point numbers that encode the status value. Refer to the following table for values.'
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
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user‑defined buffer.'
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
