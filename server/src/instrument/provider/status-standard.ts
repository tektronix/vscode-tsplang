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

import { ApiSpec } from '..'

import { CommandSet, resolveCompletionNamespace } from '.'

const statusStandardCompletions: Array<CompletionItem> = [
    {
        data: ['status'],
        kind: CompletionItemKind.Module,
        label: 'standard'
    },
    {
        data: ['standard', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.standard.enable\n```\n\
\n\
Get or set a number from 0 to 253 that, in binary, represents the Status Enable (ESE) register of the Standard Event \
Register (ESR). The value is the binary sum of all bits set in the register.\n\
\n\
When a bit in the ESE and its corresponding ESR bit is set, the Event Summary Bit (ESB) of the Status Byte (STB) \
register is also set. The ESE register is cleared when set to 0.\n\
\n\
From right to left, each bit represents the following: \
*B0* — Operation Complete (OPC), \
*B1* — not used, \
*B2* — Query Error (QYE), \
*B3* — Device-Dependent Error (DDE), \
*B4* — Execution Error (EXE), \
*B5* — Command Error (CME), \
*B6* — User Request (URQ), \
and *B7* — Power On (PON).\n\
\n\
QYE indicates an attempt to read data from an empty Output Queue. DDE indicates the instrument operation did not \
execute properly due to an internal condition. EXE indicates the instrument detected an error while trying to execute \
a command. CMD can represent a IEEE 488.2 syntax error (received message was malformed), semantic error (received \
message was misspelled or is not implemented), or a GET error (received a Group Execute Trigger [GET] inside a \
program message). URQ indicates the instrument transitioned from remote to local control. PON indicates the \
instrument has been power cycled since the last ESE query.\n\
\n\
For example, a return value of 129 can be represented as 1000 0001, where B0 and B7 are enabled. This indicates that \
the OPC (1) and PON (129) registers are set.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['standard', 'status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.standard.event\n```\n\nstatus.standard.event -> number\n\
\n\
Returns a number from 0 to 253 that, in binary, represents the Standard Event Status Register (ESR). The value is the \
binary sum of all bits set in the register.\n\
\n\
From right to left, each bit represents the following: \
*B0* — Operation Complete (OPC), \
*B1* — not used, \
*B2* — Query Error (QYE), \
*B3* — Device-Dependent Error (DDE), \
*B4* — Execution Error (EXE), \
*B5* — Command Error (CME), \
*B6* — User Request (URQ), \
and *B7* — Power On (PON).\n\
\n\
QYE indicates an attempt to read data from an empty Output Queue. DDE indicates the instrument operation did not \
execute properly due to an internal condition. EXE indicates the instrument detected an error while trying to execute \
a command. CMD can represent a IEEE 488.2 syntax error (received message was malformed), semantic error (received \
message was misspelled or is not implemented), or a GET error (received a Group Execute Trigger [GET] inside a \
program message). URQ indicates the instrument transitioned from remote to local control. PON indicates the \
instrument has been power cycled since the last ESE query.\n\
\n\
For example, a return value of 129 can be represented as 1000 0001, where B0 and B7 are enabled. This indicates that \
the OPC (1) and PON (129) registers are set.'
        },
        kind: CompletionItemKind.Constant,
        label: 'event',
    },
]

export async function getStatusStandardCommandSet(cmds: Array<ApiSpec>): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()

            cmds.forEach((cmd: ApiSpec) => {
                statusStandardCompletions.forEach((completion: CompletionItem) => {
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

// export async function getStatusStandardCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(statusStandardCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
