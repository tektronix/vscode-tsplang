'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const smuSourceVlimitCompletions: Array<CompletionItem> = [
    {
        data: ['source', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'vlimit'
    },
    {
        data: ['vlimit', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.vlimit.level\n```\n\
\n\
Get or set the source limit for voltage to a number from 0.02V to 210V. Changing the source function will reset this \
attribute to its default value of +21.0.\n\
\n\
Specified values must be more than 0.1% of the measurement range unless the instrument is in autorange mode. If set \
to an invalid level, the instrument will use the nearest valid level and log a warning.\n\
\n\
Values that can be set for this attribute are limited by the overvoltage protection limit.'
        },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: ['vlimit', 'source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.vlimit.tripped\n```\n\nsmu.source.vlimit.tripped -> smu.OFF | smu.ON | nil\n\
\n\
Returns the present voltage-limit state as smu.OFF or ON. If the present output function is not set to voltage, then \
nil is returned.\n\
\n\
When smu.ON is returned, the instrument has clamped the source to keep it within the set limit.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tripped',
    },
]

export async function getSmuSourceVlimitCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuSourceVlimitCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
