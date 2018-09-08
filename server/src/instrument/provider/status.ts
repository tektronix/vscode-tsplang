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

const statusCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'status'
    },
    {
        data: ['status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the event log and the Questionable Event and Operation Event registers.\n\
\n\
Does not affect the Questionable Event Enable or Operation Event Enable registers.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.condition\n```\n\nstatus.condition -> number\n\
\n\
Returns a number from 0 to 253 that, in binary, represents the Status Byte (STB) register. The value \
is the binary sum of all bits set in the register.\n\
\n\
When an enabled event occurs, its associated Status bit is set to 1. From right to left, each bit represents the \
following: \
*B0* — Measurement Summary Bit (MSB), \
*B1* — not used, \
*B2* — Error Available (EAV), \
*B3* — Questionable Summary Bit (QSB), \
*B4* — Message Available (MAV), \
*B5* — Event Summary Bit (ESB), \
*B6* — Master Summary Status (MSS), \
and *B7* — Operation Summary Bit (OSB).\n\
\n\
For example, a return value of 129 can be represented as 1000 0001, where B0 and B7 are enabled. This indicates that \
the MSB (1) and OSB (129) registers are set.\n\
\n\
If using the GPIB, USB, or VXI-11 serial poll sequence to retrieve the status byte (also called a serial poll byte), \
then B6 is the Request for Service (RQS) bit. When set, it indicates that a serial poll request (SRQ) has occurred.'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.condition',
    },
    {
        data: ['status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction preset()\n```\n\
\n\
Reset all event and enable registers for Operation and Questionable.\n\
\n\
Does not affect the event queue or the Service Request Enable (SRE), Standard Request Enable (ESE), or Standard \
Event Status (ESR) registers.'
        },
        kind: CompletionItemKind.Function,
        label: 'preset',
    },
    {
        data: ['status'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nstatus.request_enable\n```\n\
\n\
Get or set a number from 0 to 189 that, in binary, represents the Service Request Enable (SRE) register. The value \
is the binary sum of all bits set in the register.\n\
\n\
The SRE register is cleared when power is cycled or when set to 0.\n\
\n\
When an enabled event occurs, its associated SRE bit is set to 1. From right to left, each bit represents the \
following: \
*B0* — Measurement Summary Bit (MSB), \
*B1* — not used, \
*B2* — Error Available (EAV), \
*B3* — Questionable Summary Bit (QSB), \
*B4* — Message Available (MAV), \
*B5* — Event Summary Bit (ESB), \
*B6* — not used, \
and *B7* — Operation Summary Bit (OSB).\n\
\n\
For example, a return value of 129 can be represented as 1000 0001, where B0 and B7 are enabled. This indicates that \
the MSB (1) and OSB (129) registers are set.'
        },
        kind: CompletionItemKind.Property,
        label: 'request_enable',
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
                statusCompletions.forEach((completion: CompletionItem) => {
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

// export async function getStatusCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(statusCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
