'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const tsplinkLineCompletions: Array<CompletionItem> = [
    {
        data: ['tsplink'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available trigger lines. Indexed from 1 to 3.'
        },
        kind: CompletionItemKind.Module,
        label: 'line'
    },
    {
        data: ['line', 'tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.line[N].mode\n```\n\
\n\
Get or set the TSP-Link trigger line to tsplink.MODE_\\*. Defaults to tsplink.MODE_DIGITAL_OPEN_DRAIN.'
        },
        kind: CompletionItemKind.Property,
        label: 'mode',
    },
    {
        data: ['line', 'tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n```\n\
\n\
This function resets the following attributes to their default values: \
"trigger.tsplinkin[N].edge", \
"trigger.tsplinkout[N].logic", \
"trigger.tsplinkout[N].pulsewidth", \
"trigger.tsplinkout[N].stimulus", \
and "tsplink.line[N].mode". \
\n\
It also clears "trigger.tsplinkin[N].overrun".'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['line', 'tsplink'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntsplink.line[N].state\n```\n\
\n\
Get or set the state of a TSP-Link trigger line to tsplink.STATE_HIGH or STATE_LOW. Defaults to STATE_HIGH.'
        },
        kind: CompletionItemKind.Property,
        label: 'state',
    },
]

export async function getTsplinkLineCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tsplinkLineCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
