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

import { DefaultFillValue, InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback, SignatureInformation } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.digitize.aperture',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`TODO`
    ],
    [
        'smu.digitize.count',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`TODO`
    ],
    [
        'smu.digitize.range',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`TODO`
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.Module,
        label: 'digitize'
    },
    {
        data: { domains: ['digitize', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'aperture'
    },
    {
        data: { domains: ['digitize', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'count'
    },
    {
        data: { domains: ['digitize', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.digitize.displaydigits\n```\n\
\n\
Get or set the number of measurement digits to display on the front-panel to smu.DIGITS_\\*. Defaults to \
smu.DIGITS_4_5. New digit settings will be displayed after the next measurement.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.\n\
\n\
This attribute affects neither instrument speed, accuracy, nor the number of digits returned in a remote command \
reading.'
        },
        kind: CompletionItemKind.Property,
        label: 'displaydigits',
    },
    {
        data: { domains: ['digitize', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.digitize.func\n```\n\
\n\
Get or set the active measurment function to smu.FUNC_DIGITIZE_\\*. Defaults to smu.FUNC_NONE.\n\
\n\
Automatically set to smu.FUNC_NONE when a standard measurement function is set.\n\
\n\
When the active measurement function is changed, settings that are retained on a per-function basis are also changed.'
        },
        kind: CompletionItemKind.Property,
        label: 'func',
    },
    {
        data: { domains: ['digitize', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'range',
    },
    {
        data: { domains: ['digitize', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction read(bufferName)\n```\n\nsmu.digitize.read([bufferName]) -> number\n\
\n\
Take a reading using the active digitize function, store it in the specified reading buffer, and return it as a \
number. If no bufferName is specified, then defbuffer1 is used. If the instrument is configured to take multiple \
readings, then only the last reading is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'read',
    },
    {
        data: { domains: ['digitize', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction readwithtime(bufferName)\n```\n\
\n\
smu.digitize.readwithtime([bufferName]) -> number, number, number\n\
\n\
Returns `reading, seconds, fractional` where \
*reading* is the last reading of the measurement process, \
*seconds* is seconds since 1970-01-01 00:00:00 UTC, \
and *fractional* is fractional seconds.\n\
\n\
If bufferName is not specified, then defbuffer1 is used. If the instrument is configured to take multiple readings, \
then only the last reading is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'readwithtime',
    },
    {
        data: { domains: ['digitize', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.digitize.unit\n```\n\
\n\
Get or set the unit of measure for the active digitize function to smu.UNIT_\\*.\n\
\n\
When the measurement function is set to Current, the default is smu.UNIT_AMP.\n\
\n\
When the measurement function is set to Voltage, the default is smu.UNIT_VOLT.\n\
\n\
The change in measurement units is displayed when the next measurement occurs.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'unit',
    },
    {
        data: { domains: ['digitize', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.digitize.userdelay[N]\n```\n\
\n\
An array of available user delays for use by the Dynamic Delay block of the trigger model. Indexed from 1 to 5. Get \
or set the index to a number from +167e-9 to +10e+3 seconds or 0.\n\
\n\
If set to 0 seconds, then no delay is performed.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'userdelay',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'smu.digitize.read([bufferName])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.digitize.readwithtime([bufferName])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.',
                label: 'bufferName',
            },
        ],
    },
]
