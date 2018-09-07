/*
 *  Copyright 2018 Tektronix Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const scriptCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'script'
    },
    {
        data: ['script'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(scriptName)\n```\n\nscript.delete(scriptName)\n\
\n\
Delete a script from run-time and nonvolatile memory.\n\
\n\
When a script is deleted, the global variable referring to it is also deleted. Script variables are readonly, so \
calling this function is necessary if you wish to reuse the variable name.'
        },
        kind: CompletionItemKind.Function,
        label: 'delete',
    },
    {
        data: ['script'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction load(fileName)\n```\n\nscript.load(fileName) -> scriptVar\n\
\n\
Returns a reference to the specified script.\n\
\n\
For scripts residing on a USB flash drive, the given fileName should be absolute and begin with "/usb1/".'
        },
        kind: CompletionItemKind.Function,
        label: 'load',
    },
]

const scriptSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'script.delete(scriptName)',
        undefined,
        ParameterInformation.create(
            'scriptName',
            'A string that represents the name of the script.'
        ),
    ),
    SignatureInformation.create(
        'script.load(fileName)',
        undefined,
        ParameterInformation.create(
            'fileName',
            "The filepath of the script file to load.\n\
Scripts residing on a USB flash drive should be absolute and begin with '/usb1/'."
        ),
    ),
]

export async function getScriptCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(scriptCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getScriptSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(scriptSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
