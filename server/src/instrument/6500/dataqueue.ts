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

const dataqueueCompletions: Array<CompletionItem> = [
    {
        detail: 'This function adds an entry to the data queue.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You cannot use the timeout value when accessing the data queue from a remote node (you can only use the timeout value while adding data to the local data queue).\n\nThe timeout value is ignored if the data queue is not full.\n\nThe dataqueue.add() function returns false:\n\nIf the value is a table, a duplicate of the table and any subtables is made. The duplicate table does not contain any references to the original table or to any subtables.'
        },
        kind: CompletionItemKind.Function,
        label: 'dataqueue.add',
    },
    {
        detail: 'This constant is the maximum number of entries that you can store in the data queue.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This constant always returns the maximum number of entries that can be stored in the data queue.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dataqueue.CAPACITY',
    },
    {
        detail: 'This function clears the data queue.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function forces all dataqueue.add() commands that are in progress to time out and deletes all data from the data queue.'
        },
        kind: CompletionItemKind.Function,
        label: 'dataqueue.clear',
    },
    {
        detail: 'This attribute contains the number of items in the data queue.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The count is updated as entries are added with dataqueue.add() and read from the data queue with dataqueue.next(). It is also updated when the data queue is cleared with dataqueue.clear().\n\nA maximum of dataqueue.CAPACITY items can be stored at any one time in the data queue.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dataqueue.count',
    },
    {
        detail: 'This function removes the next entry from the data queue.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'If the data queue is empty, the function waits up to the timeout value.\n\nIf data is not available in the data queue before the timeout expires, the return value is nil.\n\nThe entries in the data queue are removed in first-in, first-out (FIFO) order.\n\nIf the value is a table, a duplicate of the original table and any subtables is made. The duplicate table does not contain any references to the original table or to any subtables.'
        },
        kind: CompletionItemKind.Function,
        label: 'dataqueue.next',
    },
]

const dataqueueSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'dataqueue.add(result, value, value, timeout)',
        undefined,
        ParameterInformation.create(
            'result',
            'The resulting value of true or false based on the success of the function.'
        ),
        ParameterInformation.create(
            'value',
            'The data item to add; value can be of any type.'
        ),
        ParameterInformation.create(
            'value',
            'value.'
        ),
        ParameterInformation.create(
            'timeout',
            'The maximum number of seconds to wait for space in the data queue.'
        ),
    ),
    SignatureInformation.create(
        'dataqueue.next(value, timeout)',
        undefined,
        ParameterInformation.create(
            'value',
            'The next entry in the data queue.'
        ),
        ParameterInformation.create(
            'timeout',
            'The number of seconds to wait for data in the queue.'
        ),
    ),
]

export async function getDataqueueCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(dataqueueCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getDataqueueSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(dataqueueSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
