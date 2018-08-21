'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const digioCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'digio'
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction readport()\n```\n\ndigio.readport() -> number\n\
\n\
Returns a bitmask representing the state of each digital I/O line, where the most significant bit represents line 1.\n\
\n\
An instrument reset does not affect the state of digital I/O lines.\n\
\n\
All six lines must be configured as digital control lines or an error will be logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'readport',
    },
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction writeport(data)\n```\n\ndigio.writeport(data)\n\
\n\
Set each digital I/O line high or low based on the given bitmask, where the most significant bit represents line 1.\n\
\n\
An instrument reset does not affect the state of the digital I/O lines.\n\
\n\
All six lines must be configured as digital control lines or an error will be logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'writeport',
    },
]

const digioSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'digio.writeport(data)',
        undefined,
        ParameterInformation.create(
            'data',
            'The value to write to the port (0 to 63).'
        ),
    ),
]

export async function getDigioCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(digioCompletions)
            } catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getDigioSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(digioSignatures)
            } catch (e) {
                reject(new Error(e.toString()))
            }
    })
}
