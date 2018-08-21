'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const lanEnumCompletions: Array<CompletionItem> = [
    {
        data: ['lan'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_AUTO'
    },
    {
        data: ['lan'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_MANUAL'
    },
]

export async function getLanEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(lanEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
