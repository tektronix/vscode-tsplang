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

import { InstrumentCompletionItem } from '../../wrapper'

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['math', 'measure', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'mxb'
    },
    {
        data: { domains: ['mxb', 'math', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.mxb.bfactor\n```\n\
\n\
Get or set the offset *b* used by the *mx + b* operation to a number from -1e+12 to +1e+12. Defaults to 0.\n\
\n\
The *mx + b* operation is calculated as `y = m * x + b` where \
*y* is the supplied measurement result, \
*m* is a constant defined by the mxb mfactor attribute, \
*x* is the measurement with relative offset applied (if applicable), \
and *b* is this attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'bfactor',
    },
    {
        data: { domains: ['mxb', 'math', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.mxb.mfactor\n```\n\
\n\
Get or set the scale factor *m* used by the *mx + b* operation to a number from -1e+12 to +1e+12. Defaults to 1.\n\
\n\
The *mx + b* operation is calculated as `y = m * x + b` where \
*y* is the supplied measurement result, \
*m* is this attribute, \
*x* is the measurement with relative offset applied (if applicable), \
and *b* is a constant defined by the mxb bfactor attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'mfactor',
    },
]
