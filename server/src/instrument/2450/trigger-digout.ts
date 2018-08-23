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

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

/* TODO: CompletionItem.documentation.value */

const triggerDigoutCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available digital I/O lines. Indexed from 1 to 6.'
        },
        kind: CompletionItemKind.Module,
        label: 'digout'
    },
    {
        data: ['digout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function asserts a trigger pulse on one of the digital I/O lines.\n\nInitiates a trigger event and does not wait for completion. The pulse width that is set determines how long the instrument asserts the trigger.'
        },
        kind: CompletionItemKind.Function,
        label: 'assert',
    },
    {
        data: ['digout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the output logic of the trigger event generator to positive or negative for the specified line.\n\nThis attribute controls the logic that the output trigger generator uses on the given trigger line.\n\nThe output state of the digital I/O line is controlled by the trigger logic, and the user-specified output state of the line is ignored.'
        },
        kind: CompletionItemKind.Property,
        label: 'logic',
    },
    {
        data: ['digout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute describes the length of time that the trigger line is asserted for output triggers.\n\nSetting the pulse width to zero (0) seconds asserts the trigger indefinitely. To release the trigger line, use .release().'
        },
        kind: CompletionItemKind.Property,
        label: 'pulsewidth',
    },
    {
        data: ['digout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Releases a trigger that was asserted with an indefinite pulsewidth time. It also releases a trigger that was latched in response to receiving a synchronous mode trigger. Only the specified trigger line is affected.'
        },
        kind: CompletionItemKind.Function,
        label: 'release',
    },
    {
        data: ['digout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute selects the event that causes a trigger to be asserted on the digital output line.\n\nThe digital trigger pulsewidth command determines how long the trigger is asserted.\n\nThe trigger stimulus for a digital I/O line can be set to one of the trigger events that are described in the following table.\n\n'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]

export async function getTriggerDigoutCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerDigoutCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
