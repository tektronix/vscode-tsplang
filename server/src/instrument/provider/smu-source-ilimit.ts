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

import { CommandDocumentation, InstrumentCompletionItem } from '.'

export const completionDocs: Map<string, CommandDocumentation> = new Map([
    [
        'smu.source.ilimit.level',
        {
            kind: MarkupKind.Markdown,
            toString: (spec: InstrumentSpec): string => {
                return '```lua\nsmu.source.ilimit.level\n```\n\
\n\
Get or set the source limit for current to a number from %{0} to %{1}. Changing the source function will reset this \
attribute to its default value of %{2}.\n\
\n\
Specified values must be more than 0.1% of the measurement range unless the instrument is in autorange mode. If set \
to an invalid level, the instrument will use the nearest valid level and log a warning.'
                    .replace('%{0}', spec.current.measure.range.low.toString())
                    .replace('%{1}', spec.current.measure.level.high.toString())
                    // tslint:disable-next-line:no-magic-numbers
                    .replace('%{2}', (spec.current.measure.level.high * 0.0001).toString())
            }
        }
    ],
])

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['source', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'ilimit'
    },
    {
        data: { domains: ['ilimit', 'source', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: { domains: ['ilimit', 'source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.ilimit.tripped\n```\n\nsmu.source.ilimit.tripped -> smu.OFF | smu.ON | nil\n\
\n\
Returns the present current-limit state as smu.OFF or ON. If the present output function is not set to current, then \
nil is returned.\n\
\n\
When smu.ON is returned, the instrument has clamped the source to keep it within the set limit.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]
