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

const digioCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute sets the mode of the digital I/O line to be a digital line, trigger line, or synchronous line and sets the line to be input, output, or open-drain.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Property,
        label: 'digio.line[N].mode',
    },
    {
        detail: 'This function resets digital I/O line values to their factory defaults.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function resets the following attributes to their default values:\n\nIt also clears trigger.digin[N].overrun.'
        },
        kind: CompletionItemKind.Function,
        label: 'digio.line[N].reset',
    },
    {
        detail: 'This function sets a digital I/O line high or low when the line is set for digital control and returns the state on the digital I/O lines.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When a reset occurs, the digital line state can be read as high because the digital line is reset to a digital input. A digital input floats high if nothing is connected to the digital line.\n\nThis returns the integer equivalent values of the binary states on all six digital I/O lines.\n\nSet the state to digio.STATE_LOW to clear the bit; set the state to digio.STATE_HIGH to set the bit.'
        },
        kind: CompletionItemKind.Property,
        label: 'digio.line[N].state',
    },
    {
        detail: 'This function reads the digital I/O port.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The binary equivalent of the returned value indicates the value of the input lines on the digital I/O port. The least significant bit (bit B1) of the binary number corresponds to digital I/O line 1; bit B6 corresponds to digital I/O line 6.\n\nFor example, a returned value of 42 has a binary equivalent of 101010, which indicates that lines 2, 4, 6 are high (1), and the other lines are low (0).\n\nAn instrument reset does not affect the present states of the digital I/O lines.\n\nAll six lines must be configured as digital control lines. If not, this command generates an error.'
        },
        kind: CompletionItemKind.Function,
        label: 'digio.readport',
    },
    {
        detail: 'This function writes to all digital I/O lines.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function writes to the digital I/O port by setting the binary state of each digital line from an integer equivalent value.\n\nThe binary representation of the value indicates the output pattern to be written to the I/O port. For example, a value of 63 has a binary equivalent of 111111 (all lines are set high); a data value of 42 has a binary equivalent of 101010 (lines 2, 4, and 6 are set high, and the other three lines are set low).\n\nAn instrument reset does not affect the present states of the digital I/O lines.\n\nAll six lines must be configured as digital control lines. If not, this command generates an error.'
        },
        kind: CompletionItemKind.Function,
        label: 'digio.writeport',
    },
]

const digioSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'digio.line[N].reset(N)',
        undefined,
        ParameterInformation.create(
            'N',
            'The digital I/O line: 1 to 6.'
        ),
    ),
    SignatureInformation.create(
        'digio.readport(data)',
        undefined,
        ParameterInformation.create(
            'data',
            'The present value of the input lines on the digital I/O port.'
        ),
    ),
    SignatureInformation.create(
        'digio.writeport(data)',
        undefined,
        ParameterInformation.create(
            'data',
            'The value to write to the port (0 to 63).'
        ),
    ),
]

export async function getDigioCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(digioCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getDigioSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(digioSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
