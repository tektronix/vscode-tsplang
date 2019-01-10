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

import { CompletionItemKind } from 'vscode-languageserver'

import { DefaultFillValue, InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    // tslint:disable:max-line-length no-magic-numbers
    [
        'smu.source.pulse.ilimit.level',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.source.pulse.ilimit.level\n\`\`\`\n\
\n\
Get or set the source limit for current to a number from \
${(spec.extendedRanges) ? spec.extendedRanges.current[0] : DefaultFillValue} \
to \
${(spec.extendedRanges) ? spec.extendedRanges.current[spec.extendedRanges.current.length - 1] * 1.05 : DefaultFillValue}. \
Changing the source function will reset \
this attribute to its default value of \
${(spec.defaults.source) ? (spec.defaults.source.pulse) ? spec.defaults.source.pulse.ilimit.level : DefaultFillValue : DefaultFillValue}.\n\
\n\
Specified values must be more than 1% of the measurement range unless the instrument is in autorange mode. If set \
to an invalid level, the instrument will use the nearest valid level and log a warning.`
    ],
    // tslint:enable:max-line-length no-magic-numbers
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['pulse', 'source', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'ilimit'
    },
    {
        data: { domains: ['ilimit', 'pulse', 'source', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
]
