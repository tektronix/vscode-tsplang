'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const createconfigscriptCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction createconfigscript(scriptName)\n```\n\ncreateconfigscript(scriptName)\n\
\n\
Create a setup file that captures most of the present settings of the instrument.\n\
\n\
If scriptName is set to the name of an existing script, an eventlog message is returned.\n\
\n\
Once created, the script that contains the settings can be run and edited like any other script.'
        },
        kind: CompletionItemKind.Function,
        label: 'createconfigscript',
    },
]

const createconfigscriptSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'createconfigscript(scriptName)',
        undefined,
        ParameterInformation.create(
            'scriptName',
            'A string that represents the name of the script that will be created.'
        ),
    ),
]

export async function getCreateconfigscriptCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void): void => {
            try {
                resolve(createconfigscriptCompletions)
            } catch (e) {
                reject(new Error(e.toString()))
            }

    })
}

export async function getCreateconfigscriptSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(createconfigscriptSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
