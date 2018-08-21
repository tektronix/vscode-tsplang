'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const smuMeasureMathMxbCompletions: Array<CompletionItem> = [
    {
        data: ['math', 'measure', 'smu'],
        kind: CompletionItemKind.Module,
        label: 'mxb'
    },
    {
        data: ['mxb', 'math', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.mxb.bfactor\n```\n\
\n\
Get or set the offset *b* used by the *mx + b* operation to a number from -1e+12 to +1e+12. Defaults to 0.\n\
\n\
The *mx + b* operation is calculated as `y = m * x + b` where \
*y* is the supplied measurement result, \
*m* is a constant defined by the mxb mfactor attribute, \
*x* is the measurement with relative offset applied (if applicable), \
and *b* is this attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'bfactor',
    },
    {
        data: ['mxb', 'math', 'measure', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.math.mxb.mfactor\n```\n\
\n\
Get or set the scale factor *m* used by the *mx + b* operation to a number from -1e+12 to +1e+12. Defaults to 1.\n\
\n\
The *mx + b* operation is calculated as `y = m * x + b` where \
*y* is the supplied measurement result, \
*m* is this attribute, \
*x* is the measurement with relative offset applied (if applicable), \
and *b* is a constant defined by the mxb bfactor attribute.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'mfactor',
    },
]

export async function getSmuMeasureMathMxbCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuMeasureMathMxbCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
