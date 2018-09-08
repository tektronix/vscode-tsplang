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

/* TODO: buffer.write.reading parameter 'status' is not helpful */

const bufferWriteCompletions: Array<CompletionItem> = [
    {
        data: ['buffer'],
        kind: CompletionItemKind.Module,
        label: 'write'
    },
    {
        data: ['write', 'buffer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction format(bufferVar, units, displayDigits, extraUnits, extraDigits)\n```\n\
\n\
buffer.write.format(bufferVar, buffer.UNIT_\\*, buffer.DIGITS_\\*[, extraUnits][, extraDigits])\n\
\n\
Set the units and number of digits of readings written to the specified WRITABLE or WRITABLE_FULL buffer.\n\
\n\
Defines the units and the number of digits that are reported for the data. This function affects how the data is \
shown in the reading buffer and what is shown on the front‑panel Home, Histogram, Reading Table, and Graph screens.'
        },
        kind: CompletionItemKind.Function,
        label: 'format'
    },
    {
        data: ['write', 'buffer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reading(bufferVar, readingValue, seconds, fractionalSeconds, status)\n```\n\
\n\
buffer.write.reading(bufferVar, readingValue[, seconds][, fractionalSeconds][, status])\n\
\n\
Write readings into the specified WRITABLE or WRITABLE_FULL buffer.\n\
\n\
Data must be added in chronological order. If the time is not specified for a reading, it is set to one integer \
second after the last reading. As you write the data, the front‑panel Home screen updates and displays the reading \
you entered.'
        },
        kind: CompletionItemKind.Function,
        label: 'reading'
    },
]

const bufferWriteSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'buffer.write.format(bufferVar, units, displayDigits[, extraUnits][, extraDigits])',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'units',
            'Some buffer.UNIT_*.'
        ),
        ParameterInformation.create(
            'displayDigits',
            'The number of digits to use for the first measurement. Some buffer.DIGITS_*.'
        ),
        ParameterInformation.create(
            'extraUnits',
            'The units for the second measurement in the buffer index; the selections are the same as units (only \
valid for buffer style WRITABLE_FULL); if not specified, will use the value for units.'
        ),
        ParameterInformation.create(
            'extraDigits',
            'The number of digits to use for the second measurement; the selections are the same as displayDigits \
(only valid for buffer style WRITABLE_FULL); if not specified, will use the value for displayDigits.'
        ),
    ),
    SignatureInformation.create(
        'buffer.write.reading(bufferVar, readingValue[, seconds][, fractionalSeconds][, status])',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'readingValue',
            'The first value that is recorded in the buffer index.'
        ),
        ParameterInformation.create(
            'seconds',
            'An integer that repesents the seconds.'
        ),
        ParameterInformation.create(
            'fractionalSeconds',
            'The portion of the time that represents the fractional seconds.'
        ),
        ParameterInformation.create(
            'status',
            'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to 256 to graph a \
family of curves (default is 0).'
        ),
    ),
    SignatureInformation.create(
        'buffer.write.reading(bufferVar, readingValue[, extraValue][, seconds][, fractionalSeconds][, status])',
        undefined,
        ParameterInformation.create(
            'bufferVar',
            'The name of the buffer.'
        ),
        ParameterInformation.create(
            'readingValue',
            'The first value that is recorded in the buffer index.'
        ),
        ParameterInformation.create(
            'extraValue',
            'A second value that is recorded in the buffer index (only valid for buffer style WRITABLE_FULL).'
        ),
        ParameterInformation.create(
            'seconds',
            'An integer that repesents the seconds.'
        ),
        ParameterInformation.create(
            'fractionalSeconds',
            'The portion of the time that represents the fractional seconds.'
        ),
        ParameterInformation.create(
            'status',
            'The reading that is the start of a group of readings: buffer.STAT_START_GROUP; set to 256 to graph a \
family of curves (default is 0).'
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
                cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                bufferWriteCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                bufferWriteSignatures.forEach((signature: SignatureInformation) => {
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

// export async function getBufferWriteCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(bufferWriteCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getBufferWriteSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(bufferWriteSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
