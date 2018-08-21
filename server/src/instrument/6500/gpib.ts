/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const gpibCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute contains the GPIB address.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The address can be set to any address value from 1 to 30. However, the address must be unique in the system. It cannot conflict with an address that is assigned to another instrument or to the GPIB controller.\n\nA new GPIB address takes effect when the command to change it is processed. If there are response messages in the output queue when this command is processed, they must be read at the new address.\n\nIf command messages are being queued (sent before this command has executed), the new settings may take effect in the middle of a subsequent command message, so care should be exercised when setting this attribute from the GPIB interface.\n\nYou should allow sufficient time for the command to be processed before attempting to communicate with the instrument again.\n\nThe reset() function does not affect the GPIB address.'
        },
        kind: CompletionItemKind.Property,
        label: 'gpib.address',
    },
]

const gpibSignatures: Array<SignatureInformation> = new Array()

export async function getGpibCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(gpibCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getGpibSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(gpibSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
