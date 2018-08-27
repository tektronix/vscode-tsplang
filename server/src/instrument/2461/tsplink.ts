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

const tsplinkCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute contains the group number of a TSP-Link node.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To remove the node from all groups, set the attribute value to 0.\n\nWhen the node is turned off, the group number for that node changes to 0.\n\nThe master node can be assigned to any group. You can also include other nodes in the group that includes the master.  Note that any nodes that are set to 0 are automatically included in the group that contains the master node, regardless of the group that is assigned to the master node.'
        },
        kind: CompletionItemKind.Property,
        label: 'tsplink.group',
    },
    {
        detail: 'This function initializes all instruments and enclosures in the TSP-Link system.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'If the only node on the TSP-Link network is the one running the command and expectedNodes is not provided, this function generates an error event. If you set expectedNodes to 1, the node is initialized.\n\nIf you include expectedNodes, if nodesFound is less than expectedNodes, an error event is generated.'
        },
        kind: CompletionItemKind.Function,
        label: 'tsplink.initialize',
    },
    {
        detail: 'This attribute defines the trigger operation of a TSP-Link line.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command defines whether or not the line is used as a digital or trigger control line and if it is an input or output.\n\nThe line mode can be set to the following options:'
        },
        kind: CompletionItemKind.Property,
        label: 'tsplink.line[N].mode',
    },
    {
        detail: 'This function resets some of the TSP-Link trigger attributes to their factory defaults.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The tsplink.line[N].reset() function resets the following attributes to their default values:\n\nThis also clears trigger.tsplinkin[N].overrun.'
        },
        kind: CompletionItemKind.Function,
        label: 'tsplink.line[N].reset',
    },
    {
        detail: 'This attribute reads or writes the digital state of a TSP-Link synchronization line.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use tsplink.writeport() to write to all TSP-Link synchronization lines.\n\nThe reset function does not affect the present states of the TSP-Link trigger lines.'
        },
        kind: CompletionItemKind.Property,
        label: 'tsplink.line[N].state',
    },
    {
        detail: 'This attribute reads the node number assigned to the master node.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute returns the node number of the master in a set of instruments connected using TSP-Link.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tsplink.master',
    },
    {
        detail: 'This attribute defines the node number.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the TSP-Link node number and saves the value in nonvolatile memory.\n\nChanges to the node number do not take effect until tsplink.reset() from an earlier TSP-Link instrument or tsplink.initialize() is executed on any node in the system.\n\nEach node connected to the TSP-Link system must be assigned a different node number.'
        },
        kind: CompletionItemKind.Property,
        label: 'tsplink.node',
    },
    {
        detail: 'This function reads the TSP-Link synchronization lines as a digital I/O port.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The binary equivalent of the returned value indicates the input pattern on the I/O port. The least significant bit of the binary number corresponds to line 1 and the value of bit 3 corresponds to line 3. For example, a returned value of 2 has a binary equivalent of 010. This indicates that line 2 is high (1), and that the other two lines are low (0).'
        },
        kind: CompletionItemKind.Function,
        label: 'tsplink.readport',
    },
    {
        detail: 'This function reads the TSP-Link synchronization lines as a digital I/O port.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: '*deprecated* — use tsplink.initialize()'
        },
        kind: CompletionItemKind.Function,
        label: 'tsplink.reset',
    },
    {
        detail: 'This attribute describes the TSP-Link online state.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the instrument power is first turned on, the state is offline. After tsplink.initialize() or tsplink.reset() is successful, the state is online.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tsplink.state',
    },
    {
        detail: 'This function writes to all TSP-Link synchronization lines as a digital I/O port.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The binary representation of data indicates the output pattern that is written to the I/O port. For example, a data value of 2 has a binary equivalent of 010. Line 2 is set high (1), and the other two lines are set low (0).\n\nThe reset() function does not affect the present states of the trigger lines.'
        },
        kind: CompletionItemKind.Function,
        label: 'tsplink.writeport',
    },
]

const tsplinkSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'tsplink.initialize(nodesFound, expectedNodes)',
        undefined,
        ParameterInformation.create(
            'nodesFound',
            'The number of nodes actually found on the system, including the node on which the command is running.'
        ),
        ParameterInformation.create(
            'expectedNodes',
            'The number of nodes expected on the system (1 to 32).'
        ),
    ),
    SignatureInformation.create(
        'tsplink.line[N].reset(N)',
        undefined,
        ParameterInformation.create(
            'N',
            'The trigger line (1 to 3).'
        ),
    ),
    SignatureInformation.create(
        'tsplink.readport(data)',
        undefined,
        ParameterInformation.create(
            'data',
            'Numeric value that indicates which lines are set.'
        ),
    ),
    SignatureInformation.create(
        'tsplink.writeport(data)',
        undefined,
        ParameterInformation.create(
            'data',
            'Value to write to the port (0 to 7).'
        ),
    ),
]

export async function getTsplinkCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(tsplinkCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getTsplinkSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tsplinkSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
