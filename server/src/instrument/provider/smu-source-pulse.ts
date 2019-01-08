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

import { CompletionItemKind } from 'vscode-languageserver'

import { DefaultFillValue, InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    // tslint:disable:max-line-length no-magic-numbers
    [
        'smu.source.pulse.level',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`
\`\`\`lua\nsmu.source.pulse.level\n\`\`\`\n\
\n\
Get or set a fixed amplitude of the active pulse source function as a number. Defaults to 0 for all pulse source \
functions.\n\
\n\
When the pulse source function is set to Current, the valid range of this attribute is \
${(spec.extendedRanges) ? spec.extendedRanges.current[spec.extendedRanges.current.length - 1] * -1.05 : DefaultFillValue} \
to \
${(spec.extendedRanges) ? spec.extendedRanges.current[spec.extendedRanges.current.length - 1] * 1.05 : DefaultFillValue}.\n\
\n\
When the pulse source function is set to Voltage, the valid range of this attribute is \
${(spec.extendedRanges) ? spec.extendedRanges.voltage[spec.extendedRanges.voltage.length - 1] * -1.05 : DefaultFillValue} \
to \
${(spec.extendedRanges) ? spec.extendedRanges.voltage[spec.extendedRanges.voltage.length - 1] * 1.05 : DefaultFillValue}.\n\
\n\
If manual source ranging is enabled, then this attribute cannot exceed the present source range setting.`
    ]
    // tslint:enable:max-line-length no-magic-numbers
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['source', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'pulse'
    },
    {
        data: { domains: ['pulse', 'source', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'level'
    },
]
