'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const printCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction print(...)\n```\n\
\n\
Generate a response message.\n\
\n\
The output of each parameter is separated by a tab character.\n\
\n\
Numbers are printed using the format.asciiprecision attribute.'
        },
        kind: CompletionItemKind.Function,
        label: 'print',
    },
]

const printSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'print(...)',
        undefined,
        ParameterInformation.create(
            '...',
            'One or more values separated with commas.'
        ),
    ),
]

export async function getPrintCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getPrintSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
