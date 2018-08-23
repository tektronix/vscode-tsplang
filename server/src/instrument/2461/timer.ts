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

const timerCompletions: Array<CompletionItem> = [
    {
        detail: 'This function resets the timer to zero (0) seconds.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'timer.cleartime',
    },
    {
        detail: 'This function measures the elapsed time since the timer was last cleared.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'timer.gettime',
    },
]

const timerSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'timer.gettime(time)',
        undefined,
        ParameterInformation.create(
            'time',
            'The elapsed time in seconds (1s resolution).'
        ),
    ),
]

export async function getTimerCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(timerCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getTimerSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(timerSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
