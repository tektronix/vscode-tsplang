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

import { DefaultFillValue, InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.contact.threshold',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`
\`\`\`lua\nsmu.contact.threshold\n\`\`\`\n\
\n\
Get or set the resistance value that must be exceeded before a failure is indicated as some smu.THRESHOLD_\\*. \
Defaults to ${(spec.defaults.contact) ? spec.defaults.contact.threshold : DefaultFillValue}.`
    ]
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.Module,
        label: 'contact'
    },
    {
        data: { domains: ['contact', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction check()\n```\n\nsmu.contact.check() -> boolean\n\
Returns true if one or more connections exceeded the resistance threshold and false otherwise.\n\
\n\
An error is logged if the contact check function is not enabled.'
        },
        kind: CompletionItemKind.Function,
        label: 'check'
    },
    {
        data: { domains: ['contact', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction checkall()\n```\n\nsmu.contact.checkall() -> boolean, boolean, boolean\n\
\n\
Returns the result of the contact check operation on the high, low, and guard connections, in that order. A value of \
true indicates that the particular connection exceeded the resistance threshold.\n\
\n\
An error is logged if the contact check function is not enabled.'
        },
        kind: CompletionItemKind.Function,
        label: 'checkall'
    },
    {
        data: { domains: ['contact', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.contact.enable\n```\n\
\n\
Get or set the status of the contact check function to smu.ON (enabled) or OFF (disabled). Defaults to smu.OFF.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable'
    },
    {
        data: { domains: ['contact', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'threshold'
    },
]
