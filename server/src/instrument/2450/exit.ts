'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const exitCompletions: Array<CompletionItem> = [
    {
        detail: 'This function stops a script that is presently running.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction exit()\n```\n\
\n\
Terminate the currently running script.\n\
\n\
Does not wait for overlapped commands to complete before exiting. \
If overlapped commands are required to finish, call waitcomplete() before calling exit().'
        },
        kind: CompletionItemKind.Function,
        label: 'exit',
    },
]

export async function getExitCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(exitCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
