'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const printnumberCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction printnumber(...)\n```\n\
\n\
Generate a single response message containing the specified numbers using the data format specified by \
format.data and format.asciiprecision.'
        },
        kind: CompletionItemKind.Function,
        label: 'printnumber',
    },
]

const printnumberSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'printnumber(...)',
        undefined,
        ParameterInformation.create(
            '...',
            'One or more values separated with commas. Values are printed in the currently configured format.'
        ),
    ),
]

export async function getPrintnumberCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printnumberCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getPrintnumberSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printnumberSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
