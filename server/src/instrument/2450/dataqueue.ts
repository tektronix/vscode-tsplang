'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const dataqueueCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'dataqueue'
    },
    {
        data: ['dataqueue'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction add(value, timeout)\n```\n\ndataqueue.add(value[, timeout]) -> boolean\n\
\n\
Add an entry to the data queue.\n\
\n\
Returns `true` on success or `false` if the data queue is full and timeout was not given or timeout expires before \
space is available in the data queue.\n\
\n\
If value is a table, a duplicate of the table and any subtables is made. The duplicate table does not contain any \
references to the original table or to any subtables.\n\
\n\
You cannot use the timeout value when accessing the data queue from a remote node (you can only use the timeout value \
while adding data to the local data queue).'
        },
        kind: CompletionItemKind.Function,
        label: 'add',
    },
    {
        data: ['dataqueue'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndataqueue.CAPACITY\n```\n\ndataqueue.CAPACITY -> number\n\
\n\
Returns the maximum number of entries that can be stored in the data queue.'
        },
        kind: CompletionItemKind.Constant,
        label: 'CAPACITY',
    },
    {
        data: ['dataqueue'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\nDelete all data from the data queue.\n\
\n\
Forces all in-progress dataqueue.add() commands to time out.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['dataqueue'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndataqueue.count\n```\n\ndataqueue.count -> number\n\
\n\
Returns the current number of items in the data queue.'
        },
        kind: CompletionItemKind.Constant,
        label: 'count',
    },
    {
        data: ['dataqueue'],
        detail: 'This function removes the next entry from the data queue.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction next(timeout)\n```\n\ndataqueue.next([timeout]) -> any\n\
\n\
Remove and return the next entry in the data queue. If data is not available before timeout expires, the return \
value is nil.\n\
\n\
The entries are removed in first-in, first-out order.\n\
\n\
Any returned tables and subtables are duplicates and contain no references to the original table or any subtables.'
        },
        kind: CompletionItemKind.Function,
        label: 'next',
    },
]

const dataqueueSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'dataqueue.add(value[, timeout])',
        undefined,
        ParameterInformation.create(
            'value',
            'The data item to add; value can be of any type.'
        ),
        ParameterInformation.create(
            'timeout',
            'The maximum number of seconds to wait for space in the data queue.'
        ),
    ),
    SignatureInformation.create(
        'dataqueue.next([timeout])',
        undefined,
        ParameterInformation.create(
            'timeout',
            'The number of seconds to wait for data in the queue.'
        ),
    ),
]

export async function getDataqueueCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(dataqueueCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getDataqueueSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(dataqueueSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
