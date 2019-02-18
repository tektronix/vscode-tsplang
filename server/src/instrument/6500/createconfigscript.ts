/*
 *  Copyright Tektronix Inc.
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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const createconfigscriptCompletions: Array<CompletionItem> = [
    {
        detail: 'This function creates a setup file that captures most of the present settings of the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function does not automatically overwrite existing scripts with the same name.  If scriptName is set to the name of an existing script, an event message is returned. You must delete the existing script before using the same script name. This includes the autoexec script, which runs automatically when the instrument power is turned on. You can set scriptName to autoexec, but you must delete the existing autoexec script first using the script.delete("autoexec") command.\n\nOnce created, the script that contains the settings can be run and edited like any other script.'
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
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(createconfigscriptCompletions)
            }
            catch (e) {
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
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
