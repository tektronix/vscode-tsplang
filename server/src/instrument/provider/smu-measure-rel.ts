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

import { InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.measure.rel.level',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.measure.rel.level\n\`\`\`\n\
\n\
Get or set the value used by the relative offset calculation to some number. Defaults to 0 for all measurement \
functions.\n\
\n\
When the measurement function is set to Current, the valid range of this attribute is \
${spec.current.measure.level.low} to ${spec.current.measure.level.high}.\n\
\n\
When the measurement function is set to Resistance, the valid range of this attribute is \
${spec.resistance.level.low} to ${spec.resistance.level.high}.\n\
\n\
When the measurement function is set to Voltage, the valid range of this attribute is \
${spec.voltage.measure.level.low} to ${spec.voltage.measure.level.high}.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.`
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['measure', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'rel'
    },
    {
        data: { domains: ['rel', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction acquire()\n```\n\nsmu.measure.rel.acquire() -> number | nil\n\
\n\
Returns the internal measurement acquired for the relative offset value as a number. If an error occurs during the \
measurement, nil is returned and the offset remains at its previous value. No math, limit tests, or filter settings \
are applied.\n\
\n\
The acquired relative offset measurement is only applied to the present measurement function.'
        },
        kind: CompletionItemKind.Function,
        label: 'acquire',
    },
    {
        data: { domains: ['rel', 'measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.rel.enable\n```\n\
\n\
Get or set the present relative measurement offset setting to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
Relative offset is calculated as `out = in - offset` where \
*out* is the supplied measurement after offset is applied, \
*in* is a measurement before the offset applied, \
and *offset* is a constant defined by the rel level attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: { domains: ['rel', 'measure', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
]
