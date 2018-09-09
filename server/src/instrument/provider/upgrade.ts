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

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace } from '.'

const upgradeCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'upgrade',
    },
    {
        data: ['upgrade'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction previous()\n```\n\
\n\
Revert to an earlier version of firmware.\n\
\n\
Searches the USB flash drive that is inserted in the front‑panel USB port for a firmware file. \
An error is logged if no suitable firmware file is found.'
        },
        kind: CompletionItemKind.Function,
        label: 'previous',
    },
    {
        data: ['upgrade'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction unit()\n```\n\
\n\
Upgrade to a newer version of firmware.\n\
\n\
Searches the USB flash drive that is inserted in the front‑panel USB port for a firmware file. \
An error is logged if no suitable firmware file is found.'
        },
        kind: CompletionItemKind.Function,
        label: 'unit',
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSet {
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        upgradeCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
