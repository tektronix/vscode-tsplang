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
    // No bufferVar namespace
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.capacity\n```\n\
\n\
Get or set how many readings a buffer can store. Changing the size of a buffer will cause existing buffer data to be \
lost.'
        },
        kind: CompletionItemKind.Property,
        label: 'capacity',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear all readings and statistics from the buffer.'
        },
        kind: CompletionItemKind.Method,
        label: 'clear',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.dates\n```\n\nbufferVar.dates -> {string, ...}\n\
\n\
Returns, as an array, a string containing the date for each reading in the buffer.\n\
\n\
Date strings follow the format "%m/%d/%Y"; e.g. 01/31/1970.\n\
\n\
This is not available if the reading buffer style is set to COMPACT.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dates',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.endindex\n```\n\nbufferVar.endindex -> number\n\
\n\
Returns the ending index of the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'endindex',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.fillmode\n```\n\
\n\
Get or set the buffer fill mode. Changing the fill mode of a buffer will cause existing buffer data to be lost.\n\
\n\
When a buffer is set to FILL_ONCE, no data is overwritten in the buffer. Once full, new readings are \
discarded. FILL_ONCE is the default fill mode for user-defined buffers.\n\
\n\
When a buffer is set to FILL_CONTINUOUS, the oldest data is overwritten by the newest once the buffer is full.'
        },
        kind: CompletionItemKind.Property,
        label: 'fillmode',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.formattedreadings\n```\n\nbufferVar.formattedreadings -> {string, ...}\n\
\n\
Returns, as an array, a string for each reading in the buffer as it would appear on the front-panel display.'
        },
        kind: CompletionItemKind.Constant,
        label: 'formattedreadings',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.fractionalseconds\n```\n\nbufferVar.fractionalseconds -> {number, ...}\n\
\n\
Returns, as an array, a number corresponding to the fractional seconds portion of a timestamp for each reading in the \
buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'fractionalseconds',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.logstate\n```\n\
\n\
If set to buffer.ON, an event is logged when the reading buffer is cleared (0% filled) or full (100% filled). \
If set to buffer.OFF, no events are reported.'
        },
        kind: CompletionItemKind.Property,
        label: 'logstate',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.n\n```\n\nbufferVar.n -> number\n\
\n\
Returns the number of readings in the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'n',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.readings\n```\n\nbufferVar.readings -> {any, ...}\n\
\n\
Returns an array of readings stored in the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'readings',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.relativetimestamps\n```\n\nbufferVar.relativetimestamps -> {number, ...}\n\
\n\
Returns, as an array, a number corresponding to the seconds portion of a timestamp for each reading in the buffer.\n\
\n\
Each seconds value is relative to the timestamp of the first entry in the reading buffer, which has a timestamp of 0.'
        },
        kind: CompletionItemKind.Constant,
        label: 'relativetimestamps',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.seconds\n```\n\nbufferVar.seconds -> {number, ...}\n\
\n\
Returns, as an array, a number corresponding to the seconds portion of a timestamp for each reading in the buffer.\n\
\n\
Each value is the number of seconds since January 1, 1970.'
        },
        kind: CompletionItemKind.Constant,
        label: 'seconds',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.sourceformattedvalues\n```\n\nbufferVar.sourceformattedvalues -> {string, ...}\n\
\n\
Returns, as an array, a string for each source level in the buffer, at which a reading was taken, as it would appear \
on the front-panel display.'
        },
        kind: CompletionItemKind.Constant,
        label: 'sourceformattedvalues',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.sourcestatuses\n```\n\nbufferVar.sourcestatuses -> {number, ...}\n\
\n\
Returns, as an array, one of \
"buffer.STAT_PROTECTION" (overvoltage protection was active), \
"buffer.STAT_READBACK" (measured source value was read), \
"buffer.STAT_OVER_TEMP" (overtemperature condition was active), \
"buffer.STAT_LIMIT" (source function level was limited), \
"buffer.STAT_SENSE" (four-wire sense was used), \
or "buffer.STAT_OUTPUT" (output was on) for each reading in the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'sourcestatuses',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.sourceunits\n```\n\nbufferVar.sourceunits -> {string, ...}\n\
\n\
Returns, as an array, a string indicating the source level unit for each reading in the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'sourceunits',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.sourcevalues\n```\n\nbufferVar.sourcevalues -> {number, ...}\n\
\n\
Returns, as an array, a number indicating the source level being output for each reading in the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'sourcevalues',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.startindex\n```\n\nbufferVar.startindex -> number\n\
\n\
Returns the starting index of the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'startindex',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.statuses\n```\n\nbufferVar.statuses -> {number, ...}\n\
\n\
Returns, as an array, one of \
"buffer.STAT_QUESTIONABLE" (measure status questionable), \
"buffer.STAT_ORIGIN" (A/D converter used), \
"buffer.STAT_TERMINAL" (measure terminal; front is 1, rear is 0), \
"buffer.STAT_LIMIT2_LOW" (measure status limit 2 low), \
"buffer.STAT_LIMIT2_HIGH" (measure status limit 2 high), \
"buffer.STAT_LIMIT1_LOW" (measure status limit 1 low), \
"buffer.STAT_LIMIT1_HIGH" (measure status limit 1 high), \
or "buffer.STAT_START_GROUP" (first reading in group) for each reading in the buffer.\n\
\n\
Not available for COMPACT buffers.'
        },
        kind: CompletionItemKind.Constant,
        label: 'statuses',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.times\n```\n\nbufferVar.times -> {string, ...}\n\
\n\
Returns, as an array, a string containing the time for each reading in the buffer.\n\
\n\
Time strings follow the format "%H:%M:%S"; e.g. 23:59:59.'
        },
        kind: CompletionItemKind.Constant,
        label: 'times',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.timestamps\n```\n\nbufferVar.timestamps -> {string, ...}\n\
\n\
Returns, as an array, a string containing the timestamp for each reading in the buffer.\n\
\n\
Timestamp strings follow the format "%m/%d/%Y %H:%M:%S.%N"; e.g. 01/31/1970 23:59:59.314159265.'
        },
        kind: CompletionItemKind.Constant,
        label: 'timestamps',
    },
    {
        data: { domains: ['bufferVar'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nbufferVar.units\n```\n\nbufferVar.units -> {string, ...}\n\
\n\
Returns, as an array, a string indicating the unit of measure for each reading in the buffer.'
        },
        kind: CompletionItemKind.Constant,
        label: 'units',
    },
]
