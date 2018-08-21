'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const smuSourceIlimitCompletions: Array<CompletionItem> = [
    {
        data: ['source', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'ilimit'
    },
    {
        data: ['ilimit', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.ilimit.level\n```\n\
\n\
Get or set the source limit for current to a number from 1nA to 1.05A. Changing the source function will reset this \
attribute to its default value of +1.05e-04.\n\
\n\
Specified values must be more than 0.1% of the measurement range unless the instrument is in autorange mode. If set \
to an invalid level, the instrument will use the nearest valid level and log a warning.'
        },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: ['ilimit', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.ilimit.tripped\n```\n\nsmu.source.ilimit.tripped -> smu.OFF | smu.ON | nil\n\
\n\
Returns the present current-limit state as smu.OFF or ON. If the present output function is not set to current, then \
nil is returned.\n\
\n\
When smu.ON is returned, the instrument has clamped the source to keep it within the set limit.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]

export async function getSmuSourceIlimitCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuSourceIlimitCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
