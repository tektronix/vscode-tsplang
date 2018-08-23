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

const triggerTsplinkoutCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available TSP-Link trigger lines. Indexed from 1 to 3.'
        },
        kind: CompletionItemKind.Module,
        label: 'tsplinkout'
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function simulates the occurrence of the trigger and generates the corresponding trigger event.\n\nInitiates a trigger event and does not wait for completion. The set pulse width determines how long the trigger is asserted.'
        },
        kind: CompletionItemKind.Function,
        label: 'assert',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute controls the logic that the output trigger generator uses on the given trigger line.\n\nThe output state of the digital I/O line is controlled by the trigger logic, and the user-specified output state of the line is ignored.'
        },
        kind: CompletionItemKind.Property,
        label: 'logic',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the length of time that the trigger line is asserted for output triggers.\n\nSetting the pulse width to 0 asserts the trigger indefinitely.'
        },
        kind: CompletionItemKind.Property,
        label: 'pulsewidth',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Releases a trigger that was asserted with an indefinite pulse width. It also releases a trigger that was latched in response to receiving a synchronous mode trigger.'
        },
        kind: CompletionItemKind.Function,
        label: 'release',
    },
    {
        data: ['tsplinkout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies the event that causes the synchronization line to assert a trigger.\n\nTo disable automatic trigger assertion on the synchronization line, set this attribute to trigger.EVENT_NONE.\n\nDo not use this attribute when triggering under script control. Use trigger.tsplinkout[N].assert() instead.\n\nThe event parameters that you can use are described in the table below.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]

export async function getTriggerTsplinkoutCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerTsplinkoutCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
