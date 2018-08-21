'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const upgradeCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'upgrade',
    },
    {
        data: ['upgrade'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction previous()\n```\n\
\n\
Revert to an earlier version of firmware.\n\
\n\
Searches the USB flash drive that is inserted in the front‑panel USB port for a firmware file. \
An error is logged if no suitable firmware file is found.'
        },
        kind: CompletionItemKind.Function,
        label: 'previous',
    },
    {
        data: ['upgrade'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction unit()\n```\n\
\n\
Upgrade to a newer version of firmware.\n\
\n\
Searches the USB flash drive that is inserted in the front‑panel USB port for a firmware file. \
An error is logged if no suitable firmware file is found.'
        },
        kind: CompletionItemKind.Function,
        label: 'unit',
    },
]

export async function getUpgradeCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(upgradeCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
