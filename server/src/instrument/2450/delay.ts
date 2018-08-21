'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const delayCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delay(seconds)\n```\n\ndelay([seconds])\n\
\n\
Delay execution for at least the specified number of seconds and fractional seconds.\n\
\n\
However, the processing time may cause the instrument to delay 5μs to 10μs more than the requested delay.'
        },
        kind: CompletionItemKind.Function,
        label: 'delay',
    },
]

const delaySignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'delay([seconds])',
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
            } catch (e) {
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
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
