/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const printnumberCompletions: Array<CompletionItem> = [
    {
        detail: 'This function prints numbers using the configured format.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'There are multiple ways to use this function, depending on how many numbers are to be printed.\n\nThis function prints the given numbers using the data format specified by format.data and format.asciiprecision.'
        },
        kind: CompletionItemKind.Function,
        label: 'printnumber',
    },
]

const printnumberSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'printnumber(value1, value2, valueN, ...)',
        undefined,
        ParameterInformation.create(
            'value1',
            'First value to print in the configured format.'
        ),
        ParameterInformation.create(
            'value2',
            'Second value to print in the configured format.'
        ),
        ParameterInformation.create(
            'valueN',
            'Last value to print in the configured format.'
        ),
        ParameterInformation.create(
            '...',
            'One or more values separated with commas.'
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
            }
            catch (e) {
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
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
