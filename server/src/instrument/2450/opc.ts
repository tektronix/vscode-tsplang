'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const opcCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction opc()\n```\n\
\n\
Set the operation complete bit in the Standard Event Status Register once all overlapped commands are complete \
or immediately if no overlapped commands are being performed.\n\
\n\
Each node independently sets its operation complete bit in its own status model.'
        },
        kind: CompletionItemKind.Function,
        label: 'opc',
    },
]

export async function getOpcCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(opcCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
