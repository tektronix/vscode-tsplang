'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const statusStandardEnumCompletions: Array<CompletionItem> = [
    {
        data: ['standard', 'status'],
        detail: 'status.standard.OPC: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'OPC'
    },
    {
        data: ['standard', 'status'],
        detail: 'status.standard.QYE: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'QYE'
    },
    {
        data: ['standard', 'status'],
        detail: 'status.standard.PON: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'PON'
    },
]

export async function getStatusStandardEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(statusStandardEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
