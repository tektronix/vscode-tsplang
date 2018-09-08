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

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

const localnodeCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'localnode'
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.access\n```\n\
\n\
Get or set the privilege level of remote interface access.\n\
\n\
If set to ACCESS_FULL, the instrument accepts commands from any interface with no login or password. \
ACCESS_EXCLUSIVE allows access from one remote interface at a time with password-less logins required from other \
interfaces. \
ACCESS_PROTECTED similarly allows access from a single remote interface, but requires a password to login from other \
interfaces. \
ACCESS_LOCKOUT also requires a password to change interfaces, but includes the front‑panel.\n\
\n\
Under any access type, if a script is running on one remote interface when a command comes in from another remote \
interface, the command is ignored and the message "FAILURE: A script is running, use ABORT to stop it" is generated.'
        },
        kind: CompletionItemKind.Property,
        label: 'access',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction gettime()\n```\n\nlocalnode.gettime() -> number\n\
\n\
Returns the number of seconds since January 1, 1970.'
        },
        kind: CompletionItemKind.Function,
        label: 'gettime',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.linefreq\n```\n\nlocalnode.linefreq -> number\n\
\n\
Returns the power line frequency setting used for NPLC calculations. Is either 50 or 60.'
        },
        kind: CompletionItemKind.Constant,
        label: 'linefreq',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.model\n```\n\nlocalnode.model -> string\n\
\n\
Returns the model number of the instrument as a string.'
        },
        kind: CompletionItemKind.Constant,
        label: 'model',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.password\n```\n\nlocalnode.password = string\n\
\n\
Set the instrument password to the specified string (30 characters max).\n\
\n\
This password is required to gain access to the instrument while localnode.access is set to \
localnode.ACCESS_PROTECTED or ACCESS_LOCKOUT.\n\
\n\
The password can be reset to its default value from the front panel or by performing a LAN reset.'
        },
        kind: CompletionItemKind.Property,
        label: 'password',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.prompts\n```\n\
\n\
Get or set the current remote command prompt setting as either localnode.ENABLE or DISABLE.\n\
\n\
The prompt returned from the instrument can be \
`TSP>` for the standard command prompt, \
`TSP?` to indicate unread eventlog entries, \
or `>>>>` for the continuation prompt.\n\
\n\
Prompts are generated when the instrument is ready to receive another command.'
        },
        kind: CompletionItemKind.Property,
        label: 'prompts',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.prompts4882\n```\n\
\n\
Get or set the current remote command prompt setting for the GPIB interface as either localnode.ENABLE or DISABLE.\n\
\n\
To enable prompts, both this attribute and localnode.prompts should be set to localnode.ENABLE.\n\
\n\
When enabled, the total number of \\*TRG commands in the input queue is limited to 50 regardless of the current \
localnode.prompts setting.'
        },
        kind: CompletionItemKind.Property,
        label: 'prompts4882',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.serialno\n```\n\nlocalnode.serialno -> string\n\
\n\
Returns the serial number of the instrument as a string.'
        },
        kind: CompletionItemKind.Constant,
        label: 'serialno',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction settime()\n```\n\
\n\
localnode.settime(utcTime)\n\
\n\
localnode.settime(hour, minute, second)\n\
\n\
localnode.settime(year, month, day, hour, minute, second)\n\
\n\
Set the date and time of the instrument. Accepts UTC time as formatted by os.time.'
        },
        kind: CompletionItemKind.Function,
        label: 'settime',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.showevents\n```\n\
\n\
Get or set the event type to automatically output to the remote interface. Defaults to 0 for no events.\n\
\n\
In addition to 0, showevents can be a number from 1 to 7 as defined by the eventlog.SEV_\\* enumeration and its \
bitwise OR combinations.\n\
\n\
Events are output after a command but before the prompt, should prompts be enabled.'
        },
        kind: CompletionItemKind.Property,
        label: 'showevents',
    },
    {
        data: ['localnode'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlocalnode.version\n```\n\nlocalnode.version -> string\n\
\n\
Returns the firmware version of the instrument as a string.'
        },
        kind: CompletionItemKind.Constant,
        label: 'version',
    },
]

const localnodeSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'localnode.settime(utcTime)',
        undefined,
        ParameterInformation.create(
            'utcTime',
            'UTC time string as formatted by os.time.'
        ),
    ),
    SignatureInformation.create(
        'localnode.settime(hour, minute, second)',
        undefined,
        ParameterInformation.create(
            'year',
            'Year before 1970.'
        ),
        ParameterInformation.create(
            'month',
            'Month (1 to 12).'
        ),
        ParameterInformation.create(
            'day',
            'Day (1 to 31).'
        ),
        ParameterInformation.create(
            'hour',
            'Hour in 24‑hour time format (0 to 23).'
        ),
        ParameterInformation.create(
            'minute',
            'Minute (0 to 59).'
        ),
        ParameterInformation.create(
            'second',
            'Second (0 to 59).'
        ),
    ),
    SignatureInformation.create(
        'localnode.settime(year, month, day, hour, minute, second)',
        undefined,
        ParameterInformation.create(
            'year',
            'Year before 1970.'
        ),
        ParameterInformation.create(
            'month',
            'Month (1 to 12).'
        ),
        ParameterInformation.create(
            'day',
            'Day (1 to 31).'
        ),
        ParameterInformation.create(
            'hour',
            'Hour in 24‑hour time format (0 to 23).'
        ),
        ParameterInformation.create(
            'minute',
            'Minute (0 to 59).'
        ),
        ParameterInformation.create(
            'second',
            'Second (0 to 59).'
        ),
    ),
]

export async function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
            if (cmd.children !== undefined) {
                cmds.concat(cmd.children)
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                localnodeCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                localnodeSignatures.forEach((signature: SignatureInformation) => {
                    const signaNamespace = resolveSignatureNamespace(signature)

                    if (signaNamespace === undefined) {
                        throw new Error('Unable to resolve signature namespace for ' + signature.label)
                    }

                    if (cmdItem.label.localeCompare(signaNamespace) === 0) {
                        resultSignatures.push(signature)
                    }
                })
            })

            resolve({
                completions: resultCompletions,
                signatures: resultSignatures
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

// export async function getLocalnodeCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(localnodeCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getLocalnodeSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(localnodeSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
