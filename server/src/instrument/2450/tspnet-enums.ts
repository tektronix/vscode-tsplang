'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const tspnetEnumCompletions: Array<CompletionItem> = [
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_CR'
    },
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_CRLF'
    },
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_LF'
    },
    {
        data: ['tspnet'],
        kind: CompletionItemKind.EnumMember,
        label: 'TERM_LFCR'
    },
]

export async function getTspnetEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tspnetEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
