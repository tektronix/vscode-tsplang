'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const resetCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset(system)\n```\n\nreset([system])\n\
\n\
Revert settings and clear all buffers.\n\
\n\
If you want to reset a specific TSP-Link instrument, use the node[N].reset() command.\n\
\n\
If system is true (default) and the local node is not the master, then an error is logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
]

const resetSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'reset([system])',
        undefined,
        ParameterInformation.create(
            'system',
            'true to reset all nodes (default) or false to reset the local node.\n\
\n\
If true and local node is not the master, then an error is logged.'
        ),
    ),
]

export async function getResetCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(resetCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getResetSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(resetSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
