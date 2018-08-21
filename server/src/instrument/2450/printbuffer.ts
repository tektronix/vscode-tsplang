'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const printbufferCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction printbuffer(startIndex, endIndex, ...)\n```\n\
\n\
Generate a single response message containing data from the specified tables or reading buffer subtables. \
Passing a reading buffer will cause its default subtable to be printed.\n\
\n\
The format.data attribute controls the output format of the response message.\n\
\n\
If the given startIndex is less than 1 or endIndex greater than the size of the table, 9.910000e+37 is returned for \
each value outside the table indices and an event is generated.\n\
\n\
If overlapped commands use the specified reading buffers and the commands are not complete (at least to the \
specified index), data will be printed as it becomes available.'
        },
        kind: CompletionItemKind.Function,
        label: 'printbuffer',
    },
]

const printbufferSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'printbuffer(startIndex, endIndex, ...)',
        undefined,
        ParameterInformation.create(
            'startIndex',
            'Beginning index of the buffer to print; must be greater than or equal to one and less than endIndex.'
        ),
        ParameterInformation.create(
            'endIndex',
            'Ending index of the buffer to print; \
must be greater than startIndex and less than or equal to the last table index.'
        ),
        ParameterInformation.create(
            '...',
            'One or more tables or reading buffer subtables separated with commas.'
        ),
    ),
]

export async function getPrintbufferCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printbufferCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getPrintbufferSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printbufferSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
