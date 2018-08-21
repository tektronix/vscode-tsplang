/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const acalCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute returns the number of times automatic calibration has been run.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The number of times that autocalibration has been run since the last factory calibration. The count restarts at 1 after a factory calibration.'
        },
        kind: CompletionItemKind.Constant,
        label: 'acal.count',
    },
    {
        detail: 'This attribute returns the internal temperature of the instrument when autocalibration was run.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The temperature is displayed in Celsius (°C).'
        },
        kind: CompletionItemKind.Constant,
        label: 'acal.lastrun.internaltemp',
    },
    {
        detail: 'This attribute returns the difference between the internal temperature and the temperature when autocalibration was last run.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The temperature is displayed in Celsius (°C).'
        },
        kind: CompletionItemKind.Constant,
        label: 'acal.lastrun.tempdiff',
    },
    {
        detail: 'This attribute returns the date and time when autocalibration was last run.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The date and time is returned in the format:\n\nMM/DD/YYYY HH:MM:SS.NNNNNNNNN\n\nWhere:'
        },
        kind: CompletionItemKind.Constant,
        label: 'acal.lastrun.time',
    },
    {
        detail: 'This function immediately runs autocalibration and stores the constants.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When an autocalibration command is received, the instrument runs the autocalibration to completion before executing the next command.'
        },
        kind: CompletionItemKind.Function,
        label: 'acal.run',
    },
]

const acalSignatures: Array<SignatureInformation> = new Array()

export async function getAcalCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(acalCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getAcalSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(acalSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
