'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const timerCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'timer'
    },
    {
        data: ['timer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction cleartime()\n```\n\
\n\
Reset timer to 0 seconds.'
        },
        kind: CompletionItemKind.Function,
        label: 'cleartime',
    },
    {
        data: ['timer'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction gettime()\n```\n\ntimer.gettime() -> number\n\
\n\
Returns the elapsed time in seconds (1 μs resolution) since the timer was last cleared.'
        },
        kind: CompletionItemKind.Function,
        label: 'gettime',
    },
]

export async function getTimerCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(timerCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
