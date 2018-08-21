/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const exitCompletions: Array<CompletionItem> = [
    {
        detail: 'This function stops a script that is presently running.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Terminates script execution when called from a script that is being executed.\n\nThis command does not wait for overlapped commands to complete before terminating script execution. If overlapped commands are required to finish, use the waitcomplete() function before calling exit().'
        },
        kind: CompletionItemKind.Function,
        label: 'exit',
    },
]

const exitSignatures: Array<SignatureInformation> = new Array()

export async function getExitCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(exitCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getExitSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(exitSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
