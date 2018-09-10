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
        data: ['eventlog'],
        detail: 'eventlog.SEV_ERROR: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_ERROR'
    },
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_WARN: 2',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_WARN'
    },
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_INFO: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_INFO'
    },
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_ALL: 7',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Alias for the bitwise operation SEV_ERROR|SEV_WARN|SEV_INFO.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_ALL'
    },
]
/*
export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
    const resultCompletions: Array<CompletionItem> = new Array()

    const cmds: Array<ApiSpec> = new Array()
    if (cmd.enums !== undefined) {
        cmd.enums.forEach((enumItem: ApiSpec) => { cmds.push(enumItem) })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        eventlogEnumCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
*/
