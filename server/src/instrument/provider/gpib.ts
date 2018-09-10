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

const gpibCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'gpib'
    },
    {
        data: ['gpib'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ngpib.address\n```\n\
\n\
Get the GPIB address or set it to a number from 1 to 30.\n\
\n\
The specified address must be unique in the system and cannot conflict with an address that is assigned to another \
instrument or to the GPIB controller.\n\
\n\
A new GPIB address assignment takes effect once the attribute change is processed. If there are response messages in \
the output queue after an address change, they must be read at the new address.\n\
\n\
If command messages are queued before the attribute change has been processed, the new setting may take effect in \
the middle of a subsequent command message, so care should be exercised when setting this attribute remotely.\n\
\n\
The reset() function does not affect a GPIB address set remotely.'
        },
        kind: CompletionItemKind.Property,
        label: 'address',
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        gpibCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
