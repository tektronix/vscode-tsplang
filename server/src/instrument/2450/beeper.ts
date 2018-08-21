'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const beeperCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'beeper'
    },
    {
        data: ['beeper'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction beep(duration, frequency)\n```\n\nbeeper.beep(duration, frequency)\n\
\n\
You can use the beeper of the instrument to provide an audible signal at a specific frequency and time duration.\n\
\n\
Using this function from a remote interface does not affect audible errors or key click settings that were made from \
the front panel.'
        },
    },
]

const beeperSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'beeper.beep(duration, frequency)',
        undefined,
        ParameterInformation.create(
            'duration',
            'The amount of time to play the tone (0.001 to 100s).'
        ),
        ParameterInformation.create(
            'frequency',
            'The frequency of the beep (20 to 8000 Hz).'
        ),
    ),
]

export async function getBeeperCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(beeperCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getBeeperSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(beeperSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
