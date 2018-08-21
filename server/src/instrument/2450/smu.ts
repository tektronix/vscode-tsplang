'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const smuCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'smu'
    },
    {
        data: ['smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n```\n\
\n\
Turn off instrument output and reset smu. commands to their default values.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
]

export async function getSmuCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
