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

import { InstrumentCompletionItem } from '.'

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['eventlog'] },
        detail: 'eventlog.SEV_ERROR: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_ERROR'
    },
    {
        data: { domains: ['eventlog'] },
        detail: 'eventlog.SEV_WARN: 2',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_WARN'
    },
    {
        data: { domains: ['eventlog'] },
        detail: 'eventlog.SEV_INFO: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_INFO'
    },
    {
        data: { domains: ['eventlog'] },
        detail: 'eventlog.SEV_ALL: 7',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Alias for the bitwise operation SEV_ERROR|SEV_WARN|SEV_INFO.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_ALL'
    },
]
