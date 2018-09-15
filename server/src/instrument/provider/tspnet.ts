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

import { InstrumentSpec } from '..'

import { FormattableSignatureInformation } from '.'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'tspnet'
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear(connectionID)\n```\n\ntspnet.clear(connectionID)\n\
\n\
Clear pending output data from the remote instrument without processing.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction connect(ipAddress, portNumber, initString)\n```\n\
\n\
tspnet.connect(ipAddress[, portNumber, initString]) -> connectionID\n\
\n\
Establish a LAN connection with a remote instrument and return its reference. Specify portNumber and initString to \
connect to a device that does not support TSP. If both are left unspecified, the device is assumed to be \
TSP-enabled.\n\
\n\
When portNumber is 23, the Telnet protocol is used and termination characters are set as appropriate.\n\
\n\
If connected to a TSP-enabled device, remote errors and events are added to the local event queue and prefaced \
with "Remote Error". If the device does not support TSP, then no extra processing, prompt handling, error handling, \
or sending of commands is performed.\n\
\n\
Changing either the prompt functionality (localnode.prompts) or show events (localnode.showerrors or \
localnode.showevents) on the remote TSP-enabled device may cause additional tspnet commands to fail.\n\
\n\
You can simultaneously connect to a maximum of 32 remote devices.'
        },
        kind: CompletionItemKind.Function,
        label: 'connect',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction disconnect(connectionID)\n```\n\ntspnet.disconnect(connectionID)\n\
\n\
Disconnect from the specified TSP-Net session.\n\
\n\
For TSP-enabled devices, this aborts any remotely running commands or scripts.'
        },
        kind: CompletionItemKind.Function,
        label: 'disconnect',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction execute(connectionID, commandString, formatString)\n```\n\
\n\
tspnet.execute(connectionID, commandString[, formatString]) -> string | number, ...\n\
\n\
Send a commandString to the remote instrument, appending termination characters automatically. Specifying \
formatString will cause this function to wait for a response and return a value for each format specifier in the \
string, up to the maximum of 10. The "%d" format specifier returns a value of type number.\n\
\n\
If sent to a TSP-enabled device, this command blocks operation until the device responds or a timeout occurs.'
        },
        kind: CompletionItemKind.Function,
        label: 'execute',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction idn(connectionID)\n```\n\ntspnet.idn(connectionID) -> string\n\
\n\
Send a \\*IDN? to the remote instrument and return its response.'
        },
        kind: CompletionItemKind.Function,
        label: 'idn',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction read(connectionID, formatString)\n```\n\
\n\
tspnet.read(connectionID[, formatString]) -> string | number, ...\n\
\n\
Returns a newline-delimited response string from the specified connection. If no data is available, operation is \
blocked until data is available or a timeout occurs. If formatString is given, then one value is returned for each \
format specifier in the string, up to the maximum of 10. The "%d" format specifier returns a value of type number.'
        },
        kind: CompletionItemKind.Function,
        label: 'read',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction readavailable(connectionID)\n```\n\
\n\
tspnet.readavailable(connectionID) -> number\n\
\n\
Returns the number of bytes available to read from the specified connection.'
        },
        kind: CompletionItemKind.Function,
        label: 'readavailable',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n```\n\
\n\
Disconnect all remote TSP-Net instruments.\n\
\n\
On remote TSP-enabled devices, this causes any commands or scripts running to be terminated.'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction termination(connectionID, termSequence)\n```\n\
\n\
tspnet.termination(connectionID[, tspnet.TERM_\\*]) -> tspnet.TERM_\\*\n\
\n\
Get or set the line termination sequence. The current line termination setting is always returned. The default is \
tspnet.TERM_LF for TSP-enabled devices and tspnet.TERM_CRLF for non TSP devices.'
        },
        kind: CompletionItemKind.Function,
        label: 'termination',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntspnet.timeout\n```\n\
\n\
Get or set the timeout value as a number from 0.001 to 30.0 seconds. Defaults to 20.0 seconds.\n\
\n\
Accurate to 10 milliseconds.'
        },
        kind: CompletionItemKind.Property,
        label: 'timeout',
    },
    {
        data: ['tspnet'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction write(connectionID, inputString)\n```\n\
\n\
tspnet.write(connectionID, inputString)\n\
\n\
Send the unmodified inputString to the remote instrument. Does not wait for the sent command to finish executing.\n\
\n\
The specified inputString must contain all necessary new lines, termination, or other syntax elements as needed.\n\
\n\
This function may return before sending the inputString if there is too much unprocessed output from previous \
commands.'
        },
        kind: CompletionItemKind.Function,
        label: 'write',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.clear(connectionID)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.connect(ipAddress[, portNumber, initString])',
        parameters: [
            {
                documentation: 'IPv4 address string.',
                label: 'ipAddress',
            },
            {
                documentation: 'Port number (default 5025).',
                label: 'portNumber',
            },
            {
                documentation: 'Initialization string to send.',
                label: 'initString',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.disconnect(connectionID)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.execute(connectionID, commandString[, formatString])',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
            {
                documentation: 'The command to send to the remote device.',
                label: 'commandString',
            },
            {
                documentation: 'Format string for the output. Maximum of 10 specifiers. Format specifiers include:\n\
%[width]s to read until the specified length\n\
%[max width]t to read until the specified length or until punctuation is found\n\
%[max width]n to read until the specified length or until a newline or carriage return is found\n\
%d to read a punctuation-delimited number.',
                label: 'formatString',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.idn(connectionID)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.read(connectionID[, formatString])',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
            {
                documentation: 'Format string for the output. Maximum of 10 specifiers. Format specifiers include:\n\
%[width]s to read until the specified length\n\
%[max width]t to read until the specified length or until punctuation is found\n\
%[max width]n to read until the specified length or until a newline or carriage return is found\n\
%d to read a punctuation-delimited number.',
                label: 'formatString',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.readavailable(connectionID)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.termination(connectionID[, termSequence])',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
            {
                documentation: 'One of:\n\
tspnet.TERM_LF (default for TSP-enabled devices)\n\
tspnet.TERM_CR\n\
tspnet.TERM_CRLF (default for non TSP-enabled devices)\n\
tspnet.TERM_LFCR',
                label: 'termSequence',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'tspnet.write(connectionID, inputString)',
        parameters: [
            {
                documentation: 'Connection reference returned from the tspnet.connect() function.',
                label: 'connectionID',
            },
            {
                documentation: 'The string to be written.',
                label: 'inputString',
            },
        ],
    },
]
