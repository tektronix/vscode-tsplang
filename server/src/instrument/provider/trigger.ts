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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'trigger'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear any pending command triggers and discard the trigger event history.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.wait(timeout) -> boolean\n\
\n\
Wait up to timeout seconds for a trigger on the active command interface. Returns true if a trigger was detected and \
false otherwise.\n\
\n\
If the active interface is GPIB, the trigger is set if a GET command is detected. On VXI-11, the trigger is set if \
the device_trigger method is invoked. If neither of those interfaces are active, then the trigger is set upon \
receiving a \\*TRG message.\n\
\n\
The event detector is automatically reset and rearmed when this function returns.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'trigger.wait(timeout)',
        parameters: [
            {
                documentation: 'The timeout value in seconds.',
                label: 'timeout',
            },
        ],
    },
]
