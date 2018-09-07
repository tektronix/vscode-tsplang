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

import { ApiSpec } from '..'

import { CommandSet, resolveCompletionNamespace } from '.'

const formatEnumCompletions: Array<CompletionItem> = [
    {
        data: ['format'],
        kind: CompletionItemKind.EnumMember,
        label: 'ASCII'
    },
    {
        data: ['format'],
        documentation: 'Most significant byte first.',
        kind: CompletionItemKind.EnumMember,
        label: 'BIGENDIAN'
    },
    {
        data: ['format'],
        documentation: 'Least significant byte first.',
        kind: CompletionItemKind.EnumMember,
        label: 'LITTLEENDIAN'
    },
    {
        data: ['format'],
        documentation: 'Single-precision IEEE 754 binary32 interchange format. Uses four bytes per value.',
        kind: CompletionItemKind.EnumMember,
        label: 'REAL32'
    },
    {
        data: ['format'],
        documentation: 'Double-precision IEEE 754 binary64 interchange format. Uses eight bytes per value.',
        kind: CompletionItemKind.EnumMember,
        label: 'REAL64'
    },
]

export async function getFormatEnumCommandSet(cmds: Array<ApiSpec>): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()

            cmds.forEach((cmd: ApiSpec) => {
                formatEnumCompletions.forEach((completion: CompletionItem) => {
                    if (cmd.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
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

// export async function getFormatEnumCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(formatEnumCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
