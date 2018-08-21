'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const waitcompleteCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction waitcomplete(group)\n```\n\nwaitcomplete([group])\n\
\n\
Wait for all overlapped commands to complete.\n\
\n\
If no group is specified, the local group is used. \
If 0, this function waits for all nodes in the system. \
A group number may only be specified when this node is the master node.'
        },
        kind: CompletionItemKind.Function,
        label: 'waitcomplete',
    },
]

const waitcompleteSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'waitcomplete([group])',
        undefined,
        ParameterInformation.create(
            'group',
            'Specifies which TSP-Link group on which to wait or 0 for all nodes.'
        ),
    ),
]

export async function getWaitcompleteCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(waitcompleteCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getWaitcompleteSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(waitcompleteSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
