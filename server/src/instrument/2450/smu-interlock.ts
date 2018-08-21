'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const smuInterlockCompletions: Array<CompletionItem> = [
    {
        data: ['smu'],
        kind: CompletionItemKind.Module,
        label: 'interlock'
    },
    {
        data: ['interlock', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.interlock.tripped\n```\n\nsmu.interlock.tripped -> smu.OFF | smu.ON\n\
\n\
Get the status of the interlock.\n\
\n\
If smu.OFF is returned the 200V range is disabled, nominal output is limited to ±42V, and attempting to source more \
than ±21V will generate an error message; otherwise all voltage ranges are available.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]

export async function getSmuInterlockCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuInterlockCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
