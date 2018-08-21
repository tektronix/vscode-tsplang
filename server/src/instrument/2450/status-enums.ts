'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const statusEnumCompletions: Array<CompletionItem> = [
    {
        data: ['status'],
        detail: 'status.MSB: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'MSB'
    },
    {
        data: ['status'],
        detail: 'status.EAV: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'EAV'
    },
    {
        data: ['status'],
        detail: 'status.QSB: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'QSB'
    },
    {
        data: ['status'],
        detail: 'status.MAV: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'MAV'
    },
    {
        data: ['status'],
        detail: 'status.ESB: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'ESB'
    },
    {
        data: ['status'],
        detail: 'status.MSS: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'MSS'
    },
    {
        data: ['status'],
        detail: 'status.OSB: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'OSB'
    },
]

export async function getStatusEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(statusEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
