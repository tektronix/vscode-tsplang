'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const smuMeasureLimitLowCompletions: Array<CompletionItem> = [
    {
        data: ['limit', 'measure', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'low'
    },
    {
        data: ['low', 'limit', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.limit[Y].low.value\n```\n\
\n\
Get or set the low limit value for the indexed limit as a number from -9.99999e+11 to +9.99999e+11. Defaults to -1.\n\
\n\
If the indexed limit is enabled, a failure indication will be generated when a measurement is less than this value.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'value',
    },
]

export async function getSmuMeasureLimitLowCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuMeasureLimitLowCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
