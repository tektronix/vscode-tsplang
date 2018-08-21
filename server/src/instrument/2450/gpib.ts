'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const gpibCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'gpib'
    },
    {
        data: ['gpib'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ngpib.address\n```\n\
\n\
Get the GPIB address or set it to a number from 1 to 30.\n\
\n\
The specified address must be unique in the system and cannot conflict with an address that is assigned to another \
instrument or to the GPIB controller.\n\
\n\
A new GPIB address assignment takes effect once the attribute change is processed. If there are response messages in \
the output queue after an address change, they must be read at the new address.\n\
\n\
If command messages are queued before the attribute change has been processed, the new setting may take effect in \
the middle of a subsequent command message, so care should be exercised when setting this attribute remotely.\n\
\n\
The reset() function does not affect a GPIB address set remotely.'
        },
        kind: CompletionItemKind.Property,
        label: 'address',
    },
]

export async function getGpibCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(gpibCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
