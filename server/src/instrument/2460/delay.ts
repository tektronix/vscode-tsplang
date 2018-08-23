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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const delayCompletions: Array<CompletionItem> = [
    {
        detail: 'This function delays the execution of the commands that follow it.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The instrument delays execution of the commands for at least the specified number of seconds and fractional seconds. However, the processing time may cause the instrument to delay 5μs to 10μs (typical) more than the requested delay.'
        },
        kind: CompletionItemKind.Function,
        label: 'delay',
    },
]

const delaySignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'delay(seconds)',
        undefined,
        ParameterInformation.create(
            'seconds',
            'The number of seconds to delay (0 to 100 ks).'
        ),
    ),
]

export async function getDelayCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(delayCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getDelaySignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(delaySignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
