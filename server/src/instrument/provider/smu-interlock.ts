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

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { InstrumentSpec } from '..'

import { CommandDocumentation } from '.'

export const completionDocs: Map<string, CommandDocumentation> = new Map([
    [
        'smu.interlock.tripped',
        {
            kind: MarkupKind.Markdown,
            toString: (spec: InstrumentSpec): string => {
                return '```lua\nsmu.interlock.tripped\n```\n\nsmu.interlock.tripped -> smu.OFF | smu.ON\n\
\n\
Get the status of the interlock.\n\
\n\
If smu.OFF is returned the %{0} range is disabled, nominal output is limited to ±%{1}V, and attempting to source more \
than ±%{2}V will generate an error message; otherwise all voltage ranges are available.'
                    .replace('%{1}', spec.voltage.measure.range.high.toString())
                    .replace('%{1}', spec.smuInterlock.maxNominalVoltageTripped.toString())
                    .replace('%{2}', spec.smuInterlock.maxSourceVoltageTripped.toString())
            },
        }
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: ['smu'],
        kind: CompletionItemKind.Module,
        label: 'interlock'
    },
    {
        data: ['interlock', 'smu'],
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]
