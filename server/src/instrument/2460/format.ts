/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const formatCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute sets the precision (number of digits) for all numbers returned in the ASCII format.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies the precision (number of digits) for numeric data printed with the print(), printbuffer(), and printnumber() functions. The format.asciiprecision attribute is only used with the ASCII format. The precision value must be a number from 0 to 16.\n\nNote that the precision is the number of significant digits printed. There is always one digit to the left of the decimal point; be sure to include this digit when setting the precision.'
        },
        kind: CompletionItemKind.Property,
        label: 'format.asciiprecision',
    },
    {
        detail: 'This attribute sets the binary byte order for the data that is printed using the printnumber() and printbuffer() functions.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute selects the byte order in which data is written when you are printing data values with the printnumber() and printbuffer() functions. The byte order attribute is only used with the format.REAL32 and format.REAL64 data formats.\n\nIf you are sending data to a computer with a Microsoft Windows operating system, select the format.LITTLEENDIAN byte order.'
        },
        kind: CompletionItemKind.Property,
        label: 'format.byteorder',
    },
    {
        detail: 'This attribute sets the data format for data that is printed using the printnumber() and printbuffer() functions.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can control the precision of numeric values with the format.asciiprecision attribute. If format.REAL32 or format.REAL64 is selected, you can select the byte order with the format.byteorder attribute.\n\nThe IEEE Std 754 binary formats use four bytes for single‑precision values and eight bytes for double‑precision values.\n\nWhen data is written with any of the binary formats, the response message starts with #0 and ends with a new line. When data is written with the ASCII format, elements are separated with a comma and space.'
        },
        kind: CompletionItemKind.Property,
        label: 'format.data',
    },
]

const formatSignatures: Array<SignatureInformation> = new Array()

export async function getFormatCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(formatCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getFormatSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(formatSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
