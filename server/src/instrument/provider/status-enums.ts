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

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace } from '.'

const statusEnumCompletions: Array<CompletionItem> = [
    {
        data: ['status'],
        detail: 'status.MSB: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'MSB'
    },
    {
        data: ['status'],
        detail: 'status.EAV: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'EAV'
    },
    {
        data: ['status'],
        detail: 'status.QSB: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'QSB'
    },
    {
        data: ['status'],
        detail: 'status.MAV: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'MAV'
    },
    {
        data: ['status'],
        detail: 'status.ESB: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'ESB'
    },
    {
        data: ['status'],
        detail: 'status.MSS: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'MSS'
    },
    {
        data: ['status'],
        detail: 'status.OSB: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'OSB'
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
                statusEnumCompletions.forEach((completion: CompletionItem) => {
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

// export async function getStatusEnumCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(statusEnumCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
