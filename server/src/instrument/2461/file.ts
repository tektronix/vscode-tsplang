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

const fileCompletions: Array<CompletionItem> = [
    {
        detail: 'This function closes a file on the USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Note that files are automatically closed when the file descriptors are garbage collected.'
        },
        kind: CompletionItemKind.Function,
        label: 'file.close',
    },
    {
        detail: 'This function writes buffered data to a file on the USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The file.write() function may buffer data instead of writing immediately to the USB flash drive. Use file.flush() to flush this data. Data may be lost if the file is not closed or flushed before a script ends.\n\nIf there is going to be a time delay before more data is written to a file, flush the file to prevent loss of data because of an aborted test.'
        },
        kind: CompletionItemKind.Function,
        label: 'file.flush',
    },
    {
        detail: 'This function creates a directory at the specified path on the USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The directory path must be absolute.'
        },
        kind: CompletionItemKind.Function,
        label: 'file.mkdir',
    },
    {
        detail: 'This function opens a file on the USB flash drive for later reference.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The path to the file to open must be absolute.\n\nThe root folder of the USB flash drive has the following absolute path:'
        },
        kind: CompletionItemKind.Function,
        label: 'file.open',
    },
    {
        detail: 'This function reads data from a file on the USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command reads data from a file.'
        },
        kind: CompletionItemKind.Function,
        label: 'file.read',
    },
    {
        detail: 'This function detects if a USB flash drive is inserted into the front-panel USB port.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can call this command from a script to verify that a USB flash drive is inserted before attempting to write data to it.'
        },
        kind: CompletionItemKind.Function,
        label: 'file.usbdriveexists',
    },
    {
        detail: 'This function writes data to a file on the USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The file.write() function may buffer data; it may not be written to the USB flash drive immediately. Use the file.flush() function to immediately write buffered data to the drive.\n\nYou must use the file.close() command to close the file after writing.'
        },
        kind: CompletionItemKind.Function,
        label: 'file.write',
    },
]

const fileSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'file.close(fileNumber)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'The file number returned from the file.open() function to close.'
        ),
    ),
    SignatureInformation.create(
        'file.flush(fileNumber)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'The file number returned from the file.open() function to flush.'
        ),
    ),
    SignatureInformation.create(
        'file.mkdir(path)',
        undefined,
        ParameterInformation.create(
            'path',
            'The path of the directory.'
        ),
    ),
    SignatureInformation.create(
        'file.open(fileNumber, fileName, accessType)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'A number identifying the open file that you use with other file commands to write, read, flush, or close the file after opening.'
        ),
        ParameterInformation.create(
            'fileName',
            'The file name to open, including the full path of file.'
        ),
        ParameterInformation.create(
            'accessType',
            'The type of action to do:\nAppend the file: file.MODE_APPEND\nRead the file: file.MODE_READ\nWrite to the file: file.MODE_WRITE.'
        ),
    ),
    SignatureInformation.create(
        'file.read(fileContents, readAction, fileNumber, readAction)',
        undefined,
        ParameterInformation.create(
            'fileContents',
            'The contents of the file based on  the readAction parameter.'
        ),
        ParameterInformation.create(
            'readAction',
            'fileContents.'
        ),
        ParameterInformation.create(
            'fileNumber',
            'The file number returned from the file.open() function to read.'
        ),
        ParameterInformation.create(
            'readAction',
            'The action:\nReturn the next line; returns nil if the present file position is at the end of the file: file.READ_LINE\nReturn a string that represents the number found; returns an event string if no number was found; returns nil if the current file position is at the end of file: file.READ_NUMBER\nReturn the whole file, starting at the present position; returns nil if the present file position is at the end of the file: file.READ_ALL.'
        ),
    ),
    SignatureInformation.create(
        'file.usbdriveexists(driveInserted)',
        undefined,
        ParameterInformation.create(
            'driveInserted',
            '0: No flash drive is detected\n1: Flash drive is detected.'
        ),
    ),
    SignatureInformation.create(
        'file.write(fileNumber, string)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'The file number returned from the file.open() function to write.'
        ),
        ParameterInformation.create(
            'string',
            'The data to write to the file.'
        ),
    ),
]

export async function getFileCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(fileCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getFileSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(fileSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
