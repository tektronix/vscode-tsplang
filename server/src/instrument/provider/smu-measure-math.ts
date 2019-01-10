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
        data: { domains: ['measure', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'math'
    },
    {
        data: { domains: ['math', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.enable\n```\n\
\n\
Get or set the present math measurement setting to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
When set to smu.ON, the math operation specified by the math format attribute is performed before completing a \
measurement.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: { domains: ['math', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.format\n```\n\
\n\
Get or set the math operation performed on each measurement to smu.MATH_\\*. Defaults to smu.MATH_PERCENT.\n\
\n\
Math calculations are applied to the input signal after relative offset but before limit tests.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'format',
    },
    {
        data: { domains: ['math', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.percent\n```\n\
\n\
Get or set the reference constant used by percent deviation to a number from -1e+12 to +1e+12. Defaults to 1.\n\
\n\
Only used when the math format attribute is set to smu.MATH_PERCENT.\n\
\n\
Percent deviation is calculated as `percent = ((in - ref) / ref) * 100` where \
*percent* is the supplied measurment result, \
*in* is the measurement with relative offset applied (if applicable), \
and *ref* is this attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'percent',
    },
]
