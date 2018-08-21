'use strict'

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

const formatEnumCompletions: Array<CompletionItem> = [
    {
        data: ['format'],
        kind: CompletionItemKind.EnumMember,
        label: 'ASCII'
    },
    {
        data: ['format'],
        documentation: 'Most significant byte first.',
        kind: CompletionItemKind.EnumMember,
        label: 'BIGENDIAN'
    },
    {
        data: ['format'],
        documentation: 'Least significant byte first.',
        kind: CompletionItemKind.EnumMember,
        label: 'LITTLEENDIAN'
    },
    {
        data: ['format'],
        documentation: 'Single-precision IEEE 754 binary32 interchange format. Uses four bytes per value.',
        kind: CompletionItemKind.EnumMember,
        label: 'REAL32'
    },
    {
        data: ['format'],
        documentation: 'Double-precision IEEE 754 binary64 interchange format. Uses eight bytes per value.',
        kind: CompletionItemKind.EnumMember,
        label: 'REAL64'
    },
]

export async function getFormatEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(formatEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
