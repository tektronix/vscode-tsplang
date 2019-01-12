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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'scpi'
    },
    {
        data: { domains: ['scpi'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction execute(cmdString)\n```\n\
\n\
scpi.execute(cmdString) -> any\n\
\n\
Send the given string to the SCPI execution engine and return its results.'
        },
        kind: CompletionItemKind.Function,
        label: 'execute',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'scpi.execute(cmdString)',
        parameters: [
            {
                documentation: 'The command to send to the SCPI execution engine.',
                label: 'cmdString',
            },
        ],
    },
]
