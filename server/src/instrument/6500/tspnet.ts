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

const tspnetCompletions: Array<CompletionItem> = [
    {
        detail: 'This function clears any pending output data from the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function clears any pending output data from the device. No data is returned to the caller and no data is processed.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.clear',
    },
    {
        detail: 'This function establishes a network connection with another LAN instrument or device through the LAN interface.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command connects a device to another device through the LAN interface. If the portNumber is 23, the interface uses the Telnet protocol and sets appropriate termination characters to communicate with the device.\n\nIf a portNumber and initString are provided, it is assumed that the remote device is not TSP-enabled. The DMM6500 does not perform any extra processing, prompt handling, error handling, or sending of commands. In addition, the tspnet.tsp.* commands cannot be used on devices that are not TSP-enabled.\n\nIf neither a portNumber nor an initString is provided, the remote device is assumed to be a Keithley Instruments TSP-enabled device. Depending on the state of the tspnet.tsp.abortonconnect attribute, the DMM6500 sends an abort command to the remote device on connection.\n\nYou can simultaneously connect to a maximum of 32 remote devices.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.connect',
    },
    {
        detail: 'This function disconnects a specified TSP-Net session.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function disconnects the two devices by closing the connection. The connectionID is the session handle returned by tspnet.connect().\n\nFor TSP-enabled devices, this aborts any remotely running commands or scripts.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.disconnect',
    },
    {
        detail: 'This function sends a command string to the remote device.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sends a command string to the remote instrument. A termination is added to the command string when it is sent to the remote instrument (tspnet.termination()). You can also specify a format string, which causes the command to wait for a response from the remote instrument. The DMM6500 decodes the response message according to the format specified in the format string and returns the message as return values from the function (see tspnet.read() for format specifiers).\n\nWhen this command is sent to a TSP-enabled instrument, the DMM6500 suspends operation until a timeout error is generated or until the instrument responds. The TSP prompt from the remote instrument is read and discarded. The DMM6500 places any remotely generated errors and events into its event queue.When the optional format string is not specified, this command is equivalent to tspnet.write(), except that a termination is automatically added to the end of the command.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.execute',
    },
    {
        detail: 'This function retrieves the response of the remote device to *IDN?.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function retrieves the response of the remote device to *IDN?.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.idn',
    },
    {
        detail: 'This function reads data from a remote device.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command reads available data from the remote instrument and returns responses for the specified number of arguments.\n\nThe format string can contain the following specifiers:\n\nA maximum of 10 format specifiers can be used for a maximum of 10 return values.\n\nIf formatString is not provided, the command returns a string that contains the data until a new line is reached. If no data is available, the DMM6500 pauses operation until the requested data is available or until a timeout error is generated. Use tspnet.timeout to specify the timeout period.\n\nWhen the DMM6500 reads from a TSP-enabled remote instrument, the DMM6500 removes Test Script Processor (TSP®) prompts and places any errors or events it receives from the remote instrument into its own event queue. The DMM6500 prefaces events and errors from the remote device with Remote Error, followed by the event number and description.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.read',
    },
    {
        detail: 'This function checks to see if data is available from the remote device.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command checks to see if any output data is available from the device. No data is read from the instrument. This allows TSP scripts to continue to run without waiting on a remote command to finish.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.readavailable',
    },
    {
        detail: 'This function disconnects all TSP-Net sessions.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command disconnects all remote instruments connected through TSP-Net. For TSP-enabled devices, this causes any commands or scripts running remotely to be terminated.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.reset',
    },
    {
        detail: 'This function sets the device line termination sequence.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function sets and gets the termination character sequence that is used to indicate the end of a line for a TSP-Net connection.\n\nUsing the termSequence parameter sets the termination sequence. The present termination sequence is always returned.\n\nFor the termSequence parameter, use the same values listed in the table above for type. There are four possible combinations, all of which are made up of line feeds (LF or 0x10) and carriage returns (CR or 0x13). For TSP-enabled devices, the default is tspnet.TERM_LF. For devices that are not TSP-enabled, the default is tspnet.TERM_CRLF.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.termination',
    },
    {
        detail: 'This attribute sets the timeout value for the tspnet.connect(), tspnet.execute(), and tspnet.read() commands.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the amount of time the tspnet.connect(), tspnet.execute(), and tspnet.read() commands will wait for a response.\n\nThe time is specified in seconds. The timeout may be specified to millisecond resolution, but is only accurate to the nearest 10ms.'
        },
        kind: CompletionItemKind.Property,
        label: 'tspnet.timeout',
    },
    {
        detail: 'This function causes the TSP-enabled instrument to stop executing any of the commands that were sent to it.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function is appropriate only for TSP-enabled instruments.\n\nSends an abort command to the remote instrument.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.tsp.abort',
    },
    {
        detail: 'This attribute contains the setting for abort on connect to a TSP-enabled instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This setting determines if the instrument sends an abort message when it attempts to connect to a TSP-enabled instrument using the tspnet.connect() function.\n\nWhen you send the abort command on an interface, it causes any other active interface on that instrument to close. If you do not send an abort command (or if tspnet.tsp.abortonconnect is set to 0) and another interface is active, connecting to a TSP-enabled remote instrument results in a connection. However, the instrument will not respond to subsequent reads or executes because control of the instrument is not obtained until an abort command has been sent.'
        },
        kind: CompletionItemKind.Property,
        label: 'tspnet.tsp.abortonconnect',
    },
    {
        detail: 'This function copies a reading buffer synchronous table from a remote instrument to a TSP-enabled instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function is only appropriate for TSP-enabled instruments.\n\nThis function reads the data from a reading buffer on a remote instrument and returns an array of numbers or a string representing the data. The startIndex and endIndex parameters specify the portion of the reading buffer to read. If no index is specified, the entire buffer is copied.\n\nThe function returns a table if the table is an array of numbers; otherwise a comma-delimited string is returned.\n\nThis command is limited to transferring 50,000 readings at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.tsp.rbtablecopy',
    },
    {
        detail: 'This function loads and runs a script on a remote TSP-enabled instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function is appropriate only for TSP-enabled instruments.\n\nThis function downloads a script to a remote instrument and runs it. It automatically adds the appropriate loadscript and endscript commands around the script, captures any errors, and reads back any prompts. No additional substitutions are done on the text.\n\nThe script is automatically loaded, compiled, and run.\n\nAny output from previous commands is discarded.\n\nThis command does not wait for the script to complete.\n\nIf you do not want the script to do anything immediately, make sure the script only defines functions for later use. Use the tspnet.execute() function to execute those functions at a later time.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.tsp.runscript',
    },
    {
        detail: 'This function writes a string to the remote instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The tspnet.write() function sends inputString to the remote instrument. It does not wait for command completion on the remote instrument.\n\nThe DMM6500 sends inputString to the remote instrument exactly as indicated. The inputString must contain any necessary new lines, termination, or other syntax elements needed to complete properly.\n\nBecause tspnet.write() does not process output from the remote instrument, do not send commands that generate too much output without processing the output. This command can stop executing if there is too much unprocessed output from previous commands.'
        },
        kind: CompletionItemKind.Function,
        label: 'tspnet.write',
    },
]

const tspnetSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'tspnet.clear(connectionID)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
    ),
    SignatureInformation.create(
        'tspnet.connect(connectionID, ipAddress, portNumber, initString, ipAddress)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'The connection ID to be used as a handle in all other tspnet function calls.'
        ),
        ParameterInformation.create(
            'ipAddress',
            'IP address to which to connect in a string.'
        ),
        ParameterInformation.create(
            'portNumber',
            'Port number (default 5025).'
        ),
        ParameterInformation.create(
            'initString',
            'Initialization string to send to ipAddress.'
        ),
        ParameterInformation.create(
            'ipAddress',
            'initString.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.disconnect(connectionID)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
    ),
    SignatureInformation.create(
        'tspnet.execute(connectionID, commandString, value1, value2, valueN, N, ..., formatString)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
        ParameterInformation.create(
            'commandString',
            'The command to send to the remote device.'
        ),
        ParameterInformation.create(
            'value1',
            'The first value decoded from the response message.'
        ),
        ParameterInformation.create(
            'value2',
            'The second value decoded from the response message.'
        ),
        ParameterInformation.create(
            'valueN',
            'The Nth value decoded from the response message; there is one return value for each format specifier in the format string.'
        ),
        ParameterInformation.create(
            'N',
            'valueN.'
        ),
        ParameterInformation.create(
            '...',
            'One or more values separated with commas.'
        ),
        ParameterInformation.create(
            'formatString',
            'Format string for the output.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.idn(idnString, connectionID)',
        undefined,
        ParameterInformation.create(
            'idnString',
            'The returned *IDN? string.'
        ),
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
    ),
    SignatureInformation.create(
        'tspnet.read(value1, value2, valueN, ..., connectionID, formatString)',
        undefined,
        ParameterInformation.create(
            'value1',
            'The first value decoded from the response message.'
        ),
        ParameterInformation.create(
            'value2',
            'The second value decoded from the response message.'
        ),
        ParameterInformation.create(
            'valueN',
            'The nth value decoded from the response message; there is one return value for each format specifier in the format string.'
        ),
        ParameterInformation.create(
            '...',
            'One or more values separated with commas.'
        ),
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
        ParameterInformation.create(
            'formatString',
            'Format string for the output, maximum of 10 specifiers.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.readavailable(bytesAvailable, connectionID)',
        undefined,
        ParameterInformation.create(
            'bytesAvailable',
            'The number of bytes available to be read from the connection.'
        ),
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
    ),
    SignatureInformation.create(
        'tspnet.termination(type)',
        undefined,
        ParameterInformation.create(
            'type',
            'The termination type:\ntspnet.TERM_LF\ntspnet.TERM_CR\ntspnet.TERM_CRLF\ntspnet.TERM_LFCR.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.tsp.abort(connectionID)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'Integer value used as a handle for other tspnet commands.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.tsp.rbtablecopy(table, connectionID, name, startIndex, endIndex)',
        undefined,
        ParameterInformation.create(
            'table',
            'A copy of the synchronous table or a string.'
        ),
        ParameterInformation.create(
            'connectionID',
            'Integer value used as a handle for other tspnet commands.'
        ),
        ParameterInformation.create(
            'name',
            'The full name of the reading buffer name and synchronous table to copy.'
        ),
        ParameterInformation.create(
            'startIndex',
            'Integer start value.'
        ),
        ParameterInformation.create(
            'endIndex',
            'Integer end value.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.tsp.runscript(connectionID, name, script)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'Integer value used as an identifier for other tspnet commands.'
        ),
        ParameterInformation.create(
            'name',
            'The name that is assigned to the script.'
        ),
        ParameterInformation.create(
            'script',
            'The body of the script as a string.'
        ),
    ),
    SignatureInformation.create(
        'tspnet.write(connectionID, inputString)',
        undefined,
        ParameterInformation.create(
            'connectionID',
            'The connection ID returned from tspnet.connect().'
        ),
        ParameterInformation.create(
            'inputString',
            'The string to be written.'
        ),
    ),
]

export async function getTspnetCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(tspnetCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getTspnetSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(tspnetSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
