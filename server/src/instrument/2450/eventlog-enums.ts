'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const eventlogEnumCompletions: Array<CompletionItem> = [
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_ERROR: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_ERROR'
    },
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_WARN: 2',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_WARN'
    },
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_INFO: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_INFO'
    },
    {
        data: ['eventlog'],
        detail: 'eventlog.SEV_ALL: 7',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Alias for the bitwise operation SEV_ERROR|SEV_WARN|SEV_INFO.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SEV_ALL'
    },
]

export async function getEventlogEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(eventlogEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
