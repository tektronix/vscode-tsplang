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

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { resolveCompletionNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'timer'
    },
    {
        data: ['timer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction cleartime()\n```\n\
\n\
Reset timer to 0 seconds.'
        },
        kind: CompletionItemKind.Function,
        label: 'cleartime',
    },
    {
        data: ['timer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction gettime()\n```\n\ntimer.gettime() -> number\n\
\n\
Returns the elapsed time in seconds (1 μs resolution) since the timer was last cleared.'
        },
        kind: CompletionItemKind.Function,
        label: 'gettime',
    },
]
