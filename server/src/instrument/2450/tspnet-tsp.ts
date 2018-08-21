'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const tspnetTspCompletions: Array<CompletionItem> = [
    {
        data: ['tspnet'],
        kind: CompletionItemKind.Module,
        label: 'tsp'
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction abort(connectionID)\n```\n\ntspnet.tsp.abort(connectionID)\n\
\n\
Abort command execution on the given TSP-enabled instrument.\n\
\n\
Causes all other connected interfaces to close.'
        },
        kind: CompletionItemKind.Function,
        label: 'abort',
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntspnet.tsp.abortonconnect\n```\n\ntspnet.tsp.abortonconnect -> 0 | 1\n\
\n\
Get or set whether an abort is send when attempting to connect to a TSP-enabled instrument. Defaults to 1 (enable).\n\
\n\
If set to 0 (disabled) and another interface is active upon connecting, the instrument will not respond to \
subsequent reads or executes until an abort command is sent.'
        },
        kind: CompletionItemKind.Property,
        label: 'abortonconnect',
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rbtablecopy(connectionID, name, startIndex, endIndex)\n```\n\
\n\
tspnet.tsp.rbtablecopy(connectionID, name[, startIndex, endIndex]) -> table | string\n\
\n\
Returns a copy of the specified reading buffer from a remote TSP-enabled instrument. If the buffer is an array of \
numbers, a table is returned; otherwise a comma-delimited string is returned.\n\
\n\
A buffer slice is returned if one-based startIndex and endIndex are specified; otherwise the entire buffer is \
returned.\n\
\n\
Limited to transferring 50,000 readings at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'rbtablecopy',
    },
    {
        data: ['tsp', 'tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction runscript(connectionID, name, script)\n```\n\
\n\
tspnet.tsp.runscript(connectionID, name, script)\n\
\n\
Load and run the given script on a remote TSP-enabled instrument. Does not wait for the remote script to finish \
executing.\n\
\n\
This function adds the loadscript and endscript commands, captures any errors, and reads back any prompts.\n\
\n\
Output from previous commands is discarded.'
        },
        kind: CompletionItemKind.Function,
        label: 'runscript',
    },
]

const tspnetTspSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'tspnet.tsp.abort(connectionID)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'Connection reference returned from the tspnet.connect() function.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.tsp.rbtablecopy(connectionID, name[, startIndex, endIndex])',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'Connection reference returned from the tspnet.connect() function.'
        ),
        ParameterInformation.create(
            'name',
            'The full name of the reading buffer name and synchronous table to copy.'
        ),
        ParameterInformation.create(
            'startIndex',
            'One-based integer start value.'
        ),
        ParameterInformation.create(
            'endIndex',
            'One-based integer end value.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.tsp.runscript(connectionID, name, script)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'Connection reference returned from the tspnet.connect() function.'
        ),
        ParameterInformation.create(
            'name',
            'The name that is assigned to the script.'
        ),
        ParameterInformation.create(
            'script',
            'The body of the script as a string.'
        ),
    ),
]

export async function getTspnetTspCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tspnetTspCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTspnetTspSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tspnetTspSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
