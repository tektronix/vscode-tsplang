'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const fileEnumCompletions: Array<CompletionItem> = [
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_APPEND'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_READ'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_WRITE'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'READ_ALL'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'READ_LINE'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'READ_NUMBER'
    },
]

export async function getFileEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(fileEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
