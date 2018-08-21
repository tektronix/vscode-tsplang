/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const printCompletions: Array<CompletionItem> = [
    {
        detail: 'This function generates a response message.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'TSP-enabled instruments do not have inherent query commands. Like any other scripting environment, the print() command and other related print() commands generate output. The print() command creates one response message.\n\nThe output from multiple arguments is separated with a tab character.\n\nNumbers are printed using the format.asciiprecision attribute. If you want use Lua formatting, print the return value from the tostring() function.'
        },
        kind: CompletionItemKind.Function,
        label: 'print',
    },
]

const printSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'print(value1, value2, valueN, ...)',
        undefined,
        ParameterInformation.create(
            'value1',
            'The first argument to output.'
        ),
        ParameterInformation.create(
            'value2',
            'The second argument to output.'
        ),
        ParameterInformation.create(
            'valueN',
            'The last argument to output.'
        ),
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
            }
            catch (e) {
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
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
