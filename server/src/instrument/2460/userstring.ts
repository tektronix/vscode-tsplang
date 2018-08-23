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

const userstringCompletions: Array<CompletionItem> = [
    {
        detail: 'This function adds a user-defined string to nonvolatile memory.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function associates the string value with the string name and stores this key-value pair in nonvolatile memory.\n\nUse the userstring.get() function to retrieve the value associated with the specified name.\n\nYou can use the userstring functions to store custom, instrument-specific information in the instrument, such as department number, asset number, or manufacturing plant location.'
        },
        kind: CompletionItemKind.Function,
        label: 'userstring.add',
    },
    {
        detail: 'This function creates an iterator for the user‑defined string catalog.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The catalog provides access for user‑defined string pairs, allowing you to manipulate all the key-value pairs in nonvolatile memory. The entries are enumerated in no particular order.'
        },
        kind: CompletionItemKind.Function,
        label: 'userstring.catalog',
    },
    {
        detail: 'This function deletes a user-defined string from nonvolatile memory.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function deletes the string that is associated with name from nonvolatile memory.'
        },
        kind: CompletionItemKind.Function,
        label: 'userstring.delete',
    },
    {
        detail: 'This function retrieves a user-defined string from nonvolatile memory.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function retrieves the string that is associated with name from nonvolatile memory.'
        },
        kind: CompletionItemKind.Function,
        label: 'userstring.get',
    },
]

const userstringSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'userstring.add(name, value, name)',
        undefined,
        ParameterInformation.create(
            'name',
            'The name of the string; the key of the key-value pair.'
        ),
        ParameterInformation.create(
            'value',
            'The string to associate with name; the value of the key-value pair.'
        ),
        ParameterInformation.create(
            'name',
            'value.'
        ),
    ),
    SignatureInformation.create(
        'userstring.catalog(name, body)',
        undefined,
        ParameterInformation.create(
            'name',
            'The name of the string; the key of the key-value pair.'
        ),
        ParameterInformation.create(
            'body',
            'Code to execute in the body of the for loop.'
        ),
    ),
    SignatureInformation.create(
        'userstring.delete(name)',
        undefined,
        ParameterInformation.create(
            'name',
            'The name (key) of the key-value pair of the user‑defined string to delete.'
        ),
    ),
    SignatureInformation.create(
        'userstring.get(value, name)',
        undefined,
        ParameterInformation.create(
            'value',
            'The value of the user‑defined string key-value pair.'
        ),
        ParameterInformation.create(
            'name',
            'The name (key) of the user‑defined string.'
        ),
    ),
]

export async function getUserstringCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(userstringCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getUserstringSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(userstringSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
