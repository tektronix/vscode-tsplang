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

import { CompletionItem, MarkupContent, MarkupContentCallback } from '../../decorators'

import { InstrumentSpec } from '..'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.interlock.tripped',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.interlock.tripped\n\`\`\`\n\nsmu.interlock.tripped -> smu.OFF | smu.ON\n\
\n\
Get the status of the interlock.\n\
\n\
If smu.OFF is returned the ${spec.voltage.measure.range.high} range is disabled, nominal output is limited to \
±${spec.smuInterlock.maxNominalVoltageTripped}V, and attempting to source more than \
±${spec.smuInterlock.maxSourceVoltageTripped}V will generate an error message; otherwise all voltage ranges are \
available.`
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.Module,
        label: 'interlock'
    },
    {
        data: { domains: ['interlock', 'smu'] },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]
