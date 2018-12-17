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
        data: { domains: ['source', 'smu'] },
        kind: CompletionItemKind.Module,
        label: 'protect'
    },
    {
        data: { domains: ['protect', 'source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.protect.level\n```\n\
\n\
Get or set the overvoltage protection setting of the source output to smu.PROTECT_\\*. Changing the source function \
will reset this attribute to its default value of smu.PROTECT_NONE.\n\
\n\
Overvoltage protection restricts the maximum voltage level that the instrument can source and applies to both \
positive and negative output voltages.'
        },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: { domains: ['protect', 'source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.protect.tripped\n```\n\nsmu.source.protect.tripped -> smu.OFF | smu.ON\n\
\n\
Returns the present state of overvoltage protection as smu.OFF or ON.\n\
\n\
When smu.ON is returned, the instrument has restricted the maximum voltage level it can source.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]
