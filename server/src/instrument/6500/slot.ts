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

const slotCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute returns a string that contains information about the module.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The information that is returned depends on whether the module in the slot is a physical card or pseudocard.\n\nFor physical cards, this returns a comma-separated string that contains the model number, description, firmware revision, and serial number of the module installed in the specified slot.\n\nFor pseudocards, the response is Pseudo, followed by the model number, description, and ??? for the firmware revision and serial number.'
        },
        kind: CompletionItemKind.Constant,
        label: 'slot[1].idn',
    },
    {
        detail: 'This attribute returns the maximum voltage of all channels on a module in the specified slot.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is only available for a slot if the installed module supports voltage settings.'
        },
        kind: CompletionItemKind.Constant,
        label: 'slot[1].maxvoltage',
    },
    {
        detail: 'This attribute specifies a pseudocard to use.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Pseudocards allow you to configure your system without having an actual scanner card installed in your system. You can perform open, close, and scan operations and configure your system with pseudocards.\n\nThis command is only applicable to a slot that does not have a scanner card or pseudocard installed. If a pseudocard is presently assigned to the slot, you must set the slot to no pseudocard before assigning the new pseudocard.\n\nAfter assigning a pseudocard, you can use valid commands for the scanner card for that slot.\n\nChanging the pseudocard card assignment from a pseudocard to no pseudocard invalidates scan lists that include that slot.\n\nIf a module is installed in the slot, this command returns nil. If the slot is empty and no pseudocard is installed, the return is 0.'
        },
        kind: CompletionItemKind.Property,
        label: 'slot[1].pseudocard',
    },
    {
        detail: 'This attribute indicates the last channel in the specified slot that supports voltage.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The returned value is the number of the last channel. If only one channel on the card supports voltage, the start channel matches the end channel. If the channel does not support voltage, the return is nil.'
        },
        kind: CompletionItemKind.Constant,
        label: 'slot[1].voltage.endchannel',
    },
    {
        detail: 'This attribute indicates the first channel in the specified slot that supports voltage.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The returned value is the number of the first channel. If only one channel on the card supports voltage, the start channel matches the end channel. If the channel does not support voltage, the return is nil.'
        },
        kind: CompletionItemKind.Constant,
        label: 'slot[1].voltage.startchannel',
    },
]

const slotSignatures: Array<SignatureInformation> = new Array()

export async function getSlotCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(slotCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getSlotSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(slotSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
