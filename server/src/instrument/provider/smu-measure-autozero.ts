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

const smuMeasureAutozeroCompletions: Array<CompletionItem> = [
    {
        data: ['measure', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'autozero'
    },
    {
        data: ['autozero', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.autozero.enable\n```\n\
\n\
Get or set the present internal reference measurement setting to smu.OFF or ON. Defaults to smu.ON.\n\
\n\
To ensure the accuracy of readings, the instrument will periodically take update measurements of its internal ground \
and voltage reference. The time to take these measurements is in addition to normal measurement time. This time \
penality can be avoided by disabling autozero, but the instrument will drift out of specification.\n\
\n\
To manually correct instrument drift, call the autozero once function.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'enable',
    },
    {
        data: ['autozero', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction once()\n```\n\
\n\
Manually refresh the reference and zero measurements for the present function.\n\
\n\
If the NPLC setting is less than 0.2 PLC, calling this function may result in a delay of more than a second.'
        },
        kind: CompletionItemKind.Function,
        label: 'once',
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
                cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                smuMeasureAutozeroCompletions.forEach((completion: CompletionItem) => {
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

// export async function getSmuMeasureAutozeroCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(smuMeasureAutozeroCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
