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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation } from 'vscode-languageserver'

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'file'
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction close(fileNumber)\n```\n\nfile.close(fileNumber)\n\
\n\
Close the given file descriptor, flushing any buffered file output data.\n\
\n\
Files are automatically closed when file descriptors are garbage collected.'
        },
        kind: CompletionItemKind.Function,
        label: 'close',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction flush(fileNumber)\n```\n\nfile.flush(fileNumber)\n\
\n\
Force a write of all buffered file output data.\n\
\n\
The file.write() function may buffer data instead of writing immediately to the USB flash drive, so calling this \
function is recommended before exiting your script to prevent loss of data.'
        },
        kind: CompletionItemKind.Function,
        label: 'flush',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction mkdir(path)\n```\n\nfile.mkdir(path)\n\
\n\
Create a directory at the absolute path specified on the USB flash drive.\n\
\n\
An error is logged if one or more parent directories contained within the specified path do not exist.\n\
\n\
The "/usb1/" prefix is optional.'
        },
        kind: CompletionItemKind.Function,
        label: 'mkdir',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction open(fileName, accessType)\n```\n\nfile.open(fileName, file.MODE_\\*) -> number\n\
\n\
Returns a number representing an open file descriptor.\n\
\n\
The given fileName should be absolute and begin with "/usb1/".'
        },
        kind: CompletionItemKind.Function,
        label: 'open',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction read(fileNumber, readAction)\n```\n\
\n\
file.read(fileNumber, file.READ_\\*) -> string | number | nil\n\
\n\
Returns the file content as a string or nil if the end of the file has been reached.\n\
\n\
If readAction is file.READ_NUMBER, the function returns the next set of digits in the file as a number. \
Should the next set of characters not be limited to digits, then "<ERR>" is returned and an error logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'read',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction usbdriveexists()\n```\n\nfile.usbdriveexists() -> 0 | 1\n\
\n\
Returns 1 if a flash drive is detected in the front-panel USB port and 0 otherwise.'
        },
        kind: CompletionItemKind.Function,
        label: 'usbdriveexists',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction write(fileNumber, data)\n```\n\nfile.write(fileNumber, data)\n\
\n\
Write the data string to the specified file.\n\
\n\
Data may be buffered and not be written to the USB flash drive immediately. Call file.flush() to force a file \
write.\n\
\n\
Files should be closed before script exit via file.close().'
        },
        kind: CompletionItemKind.Function,
        label: 'write',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'file.close(fileNumber)',
        parameters: [
            {
                documentation: 'A file reference returned from the file.open() function.',
                label: 'fileNumber',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'file.flush(fileNumber)',
        parameters: [
            {
                documentation: 'A file reference returned from the file.open() function.',
                label: 'fileNumber',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'file.mkdir(path)',
        parameters: [
            {
                documentation: 'Directory path. May begin with "/usb1/".',
                label: 'path',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'file.open(fileName, accessType)',
        parameters: [
            {
                documentation: 'Absolute filepath to the target file.',
                label: 'fileName',
            },
            {
                documentation: 'Some: file.MODE_*',
                label: 'accessType',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'file.read(fileNumber, readAction)',
        parameters: [
            {
                documentation: 'A file reference returned from the file.open() function.',
                label: 'fileNumber',
            },
            {
                documentation: 'Some file.READ_*',
                label: 'readAction',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'file.write(fileNumber, data)',
        parameters: [
            {
                documentation: 'A file reference returned from the file.open() function.',
                label: 'fileNumber',
            },
            {
                documentation: 'The string to write to the file.',
                label: 'data',
            },
        ],
    },
]
