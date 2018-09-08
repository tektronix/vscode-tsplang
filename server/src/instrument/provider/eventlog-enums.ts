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

const eventlogEnumCompletions: Array<CompletionItem> = [
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

export async function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()

            const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
            if (cmd.children !== undefined) {
                cmds.concat(cmd.children)
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                eventlogEnumCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })
            })

            resolve({
                completions: resultCompletions
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

// export async function getEventlogEnumCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(eventlogEnumCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
