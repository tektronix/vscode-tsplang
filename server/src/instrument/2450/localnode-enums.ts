'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const localnodeEnumCompletions: Array<CompletionItem> = [
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_EXCLUSIVE'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_FULL'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_LOCKOUT'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ACCESS_PROTECTED'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'DISABLE'
    },
    {
        data: ['localnode'],
        kind: CompletionItemKind.EnumMember,
        label: 'ENABLE'
    },
]

export async function getLocalnodeEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(localnodeEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
