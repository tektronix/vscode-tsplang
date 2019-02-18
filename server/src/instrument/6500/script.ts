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

const scriptCompletions: Array<CompletionItem> = [
    {
        detail: 'This function returns an iterator that can be used in a for loop to iterate over all the scripts stored in nonvolatile memory.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function accesses the catalog of scripts stored in nonvolatile memory, which allows you to process all scripts in nonvolatile memory. The entries are enumerated in no particular order.\n\nEach time the body of the function executes, name takes on the name of one of the scripts stored in nonvolatile memory. The for loop repeats until all scripts have been iterated.'
        },
        kind: CompletionItemKind.Function,
        label: 'script.catalog',
    },
    {
        detail: 'This function deletes a script from the run-time memory and nonvolatile memory.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When a script is deleted, the global variable referring to this script is also deleted.\n\nYou must delete an existing script before you can use the name of that script again. Scripts are not automatically overwritten.'
        },
        kind: CompletionItemKind.Function,
        label: 'script.delete',
    },
    {
        detail: 'This function creates a script from a specified file.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The named that is used for scriptVar must not already exist as a global variable. In addition, the scriptVar name must be a global reference and not a local variable, table, or array.\n\nFor external scripts, the root folder of the USB flash drive has the absolute path /usb1/.'
        },
        kind: CompletionItemKind.Function,
        label: 'script.load',
    },
]

const scriptSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'script.catalog(name, body)',
        undefined,
        ParameterInformation.create(
            'name',
            'String representing the name of the script.'
        ),
        ParameterInformation.create(
            'body',
            'Code that implements the body of the for loop to process the names in the catalog.'
        ),
    ),
    SignatureInformation.create(
        'script.delete(scriptName)',
        undefined,
        ParameterInformation.create(
            'scriptName',
            'A string that represents the name of the script.'
        ),
    ),
    SignatureInformation.create(
        'script.load(file, scriptVar, scriptVar)',
        undefined,
        ParameterInformation.create(
            'file',
            'A string that contains the path and file name of the script file to load; if scriptVar is not defined, this name is used as the global variable name for this script.'
        ),
        ParameterInformation.create(
            'scriptVar',
            'file.'
        ),
        ParameterInformation.create(
            'scriptVar',
            'The created script; a global variable with this name is used to reference the script.'
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
            }
            catch (e) {
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
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
