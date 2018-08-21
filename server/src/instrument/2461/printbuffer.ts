/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const printbufferCompletions: Array<CompletionItem> = [
    {
        detail: 'This function prints data from tables or reading buffer subtables.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'If startIndex is set to less than 1 or if endIndex is more than the size of the index, 9.910000e+37 is returned for each value outside the allowed index and an event is generated.\n\nIf overlapped commands use the specified reading buffers and the commands are not complete (at least to the specified index), this function outputs data as it becomes available.\n\nWhen there are outstanding overlapped commands to acquire data, n refers to the index that the last entry in the table has after all the readings have completed.\n\nIf you pass a reading buffer instead of a reading buffer subtable, the default subtable for that reading buffer is used.\n\nThis command generates a single response message that contains all data.\n\nThe format.data attribute controls the format of the response message.\n\nYou can use the bufferVar attributes that are listed in the following table with the print buffer command. For example, if testData is the buffer, you can use testData.dates attribute to print the date of each reading in the testData buffer.\n\nYou can use bufferVar.n to retrieve the number of readings in the specified reading buffer.'
        },
        kind: CompletionItemKind.Function,
        label: 'printbuffer',
    },
]

const printbufferSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'printbuffer(startIndex, endIndex, endIndex, startIndex, bufferVar, bufferVar2, bufferVarN, ...)',
        undefined,
        ParameterInformation.create(
            'startIndex',
            'Beginning index of the buffer to print; this must be more than one and less than endIndex.'
        ),
        ParameterInformation.create(
            'endIndex',
            'startIndex.'
        ),
        ParameterInformation.create(
            'endIndex',
            'Ending index of the buffer to print; this must be more than startIndex and less than the index of the last entry in the tables.'
        ),
        ParameterInformation.create(
            'startIndex',
            'endIndex.'
        ),
        ParameterInformation.create(
            'bufferVar',
            'Name of first table or reading buffer subtable to print; may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer.'
        ),
        ParameterInformation.create(
            'bufferVar2',
            'Second table or reading buffer subtable to print; may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer.'
        ),
        ParameterInformation.create(
            'bufferVarN',
            'The last table or reading buffer subtable to print; may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer.'
        ),
        ParameterInformation.create(
            '...',
            'One or more tables or reading buffer subtables separated with commas.'
        ),
    ),
]

export async function getPrintbufferCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(printbufferCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getPrintbufferSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(printbufferSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
