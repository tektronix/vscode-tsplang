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

import { CompletionItem, MarkupContent, MarkupContentCallback } from '../../decorators'

import { InstrumentSpec } from '..'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.source.ilimit.level',
        // tslint:disable:no-magic-numbers
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.source.vlimit.level\n\`\`\`\n\
\n\
Get or set the source limit for voltage to a number from ${spec.voltage.measure.range.low}V to \
${spec.voltage.measure.level.high}V. Changing the source function will reset this attribute to its default value of \
+${spec.voltage.measure.level.high * 0.1}.\n\
\n\
Specified values must be more than 0.1% of the measurement range unless the instrument is in autorange mode. If set \
to an invalid level, the instrument will use the nearest valid level and log a warning.\n\
\n\
Values that can be set for this attribute are limited by the overvoltage protection limit.`
        // tslint:enable:no-magic-numbers
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['source', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'vlimit'
    },
    {
        data: { domains: ['vlimit', 'source', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: { domains: ['vlimit', 'source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.vlimit.tripped\n```\n\nsmu.source.vlimit.tripped -> smu.OFF | smu.ON | nil\n\
\n\
Returns the present voltage-limit state as smu.OFF or ON. If the present output function is not set to voltage, then \
nil is returned.\n\
\n\
When smu.ON is returned, the instrument has clamped the source to keep it within the set limit.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]
