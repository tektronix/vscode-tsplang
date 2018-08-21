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
