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

import { CompletionItem } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'acal'
    },
    {
        data: { domains: ['acal'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nacal.count\n```\n\nacal.count -> number\n\
\n\
Returns the number of times automatic calibration has been run since the last factory calibration. Defaults to 1 \
after a factory calibration.'
        },
        kind: CompletionItemKind.Constant,
        label: 'count'
    },
    {
        data: { domains: ['acal'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction run()\n```\n\
\n\
Starts an automatic calibration, blocking futher execution until the command completes.'
        },
        kind: CompletionItemKind.Function,
        label: 'run'
    },
]
