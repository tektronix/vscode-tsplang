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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const scriptVarCompletions: Array<CompletionItem> = [
    {
        detail: 'This function runs a script.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The scriptVar.run() function runs the script referenced by scriptVar. You can also run the script by using scriptVar().'
        },
        kind: CompletionItemKind.Function,
        label: 'scriptVar.run',
    },
    {
        detail: 'This function saves the script to nonvolatile memory or to a USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The scriptVar.save() function saves a script to nonvolatile memory or a USB flash drive. The root folder of the USB flash drive has the absolute path /usb1/.\n\nIf no filename is specified, the script is saved to internal nonvolatile memory. If a filename is given, the script is saved to the USB flash drive.\n\nIf you set scriptVar to autoexec, the script is run when the instrument powers up. You must delete the existing autoexec script before saving the new one. Note that performing a system reset does not delete the autoexec script.\n\nIf no filename is specified (the filename parameter is an empty string), the script is saved to internal nonvolatile memory. If a filename is given, the script is saved to the USB flash drive.\n\nYou can add the file extension, but it is not required. The only allowed extension is .tsp (see Example2).'
        },
        kind: CompletionItemKind.Function,
        label: 'scriptVar.save',
    },
    {
        detail: 'This attribute contains the source code of a script.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The body of the script is a single string with lines separated by the new line character.'
        },
        kind: CompletionItemKind.Constant,
        label: 'scriptVar.source',
    },
]

const scriptVarSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'scriptVar.run(scriptVar)',
        undefined,
        ParameterInformation.create(
            'scriptVar',
            'The name of the variable that references the script.'
        ),
    ),
    SignatureInformation.create(
        'scriptVar.save(scriptVar, filename)',
        undefined,
        ParameterInformation.create(
            'scriptVar',
            'The name of variable that references the script.'
        ),
        ParameterInformation.create(
            'filename',
            'The file name to use when saving the script to a USB flash drive.'
        ),
    ),
]

export async function getScriptVarCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(scriptVarCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getScriptVarSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(scriptVarSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
