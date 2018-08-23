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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const eventlogCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'eventlog'
    },
    {
        data: ['eventlog'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Remove all events from the event log, including front‑panel entries.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['eventlog'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getcount(eventType)\n```\n\neventlog.getcount([eventlog.SEV_\\*]) -> number\n\
\n\
Return the number of unread events in the event log. All unread event types are returned if eventType is \
unspecified.\n\
\n\
If localnode.showevents is enabled, then this function will always return 0.'
        },
        kind: CompletionItemKind.Function,
        label: 'getcount',
    },
    {
        data: ['eventlog'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction next(eventType)\n```\n\
\n\
eventlog.next([eventlog.SEV_\\*]) -> number, string, eventlog.SEV_\\*, number, number, number\n\
\n\
Returns `eventNumber, message, eventType, nodeID, timeSeconds, timeNanoSeconds` where \
*eventNumber* is this eventlog index; \
*message* is the event description; \
*eventType* is one of eventlog.SEV_ERROR, SEV_WARN, SEV_INFO, or the specifed eventType; \
*nodeID* is the TSP-Link node where the event occurred or 0 for the local node; \
*timeSeconds* is the seconds portion of the time when the event occurred; \
and *timeNanoSeconds* is the fractional seconds portion of the time when the event occurred.\n\
\n\
`0 No error 0 0 0 0` is returned if there are no eventlog entries or if localnode.showevents is enabled.\n\
\n\
Once an event is read, it can no longer be accessed remotely. However, can still be viewed from the front panel.'
        },
        kind: CompletionItemKind.Function,
        label: 'next',
    },
    {
        data: ['eventlog'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction post(message, eventType)\n```\n\neventlog.post(message[, eventlog.SEV_\\*])\n\
\n\
Log a custom event with the given severity to the eventlog. Severity defaults to SEV_INFO if unspecified.'
        },
        kind: CompletionItemKind.Function,
        label: 'post',
    },
    {
        data: ['eventlog'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction save(filename, eventType)\n```\n\neventlog.save(filename[, eventlog.SEV_\\*])\n\
\n\
Save eventlog entries to the given filename on a USB flash drive. Filenames are absolute and should begin with \
"/usb1/". All events are saved if eventType is unspecified.\n\
\n\
The .csv extension is automatically added to the file name.'
        },
        kind: CompletionItemKind.Function,
        label: 'save',
    },
]

const eventlogSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'eventlog.getcount([eventType])',
        undefined,
        ParameterInformation.create(
            'eventType',
            'Limit the return to specific event log types as defined by:\n\
eventlog.SEV_ERROR (1)\n\
eventlog.SEV_WARN (2)\n\
eventlog.SEV_INFO (4)\n\
eventlog.SEV_ALL (7)\n\
Combinations via bitwise OR are supported.'
        ),
    ),
    SignatureInformation.create(
        'eventlog.next([eventType])',
        undefined,
        ParameterInformation.create(
            'eventType',
            'Limit the return to specific event log types as defined by:\n\
eventlog.SEV_ERROR (1)\n\
eventlog.SEV_WARN (2)\n\
eventlog.SEV_INFO (4)\n\
eventlog.SEV_ALL (7)\n\
Combinations via bitwise OR are supported.'
        ),
    ),
    SignatureInformation.create(
        'eventlog.post(message[, eventType])',
        undefined,
        ParameterInformation.create(
            'message',
            'String that contains the message.'
        ),
        ParameterInformation.create(
            'eventType',
            'One of:\n`eventlog.SEV_ERROR` (1)\n`eventlog.SEV_WARN` (2)\n`eventlog.SEV_INFO` (4, default)'
        ),
    ),
    SignatureInformation.create(
        'eventlog.save(filename, eventType)',
        undefined,
        ParameterInformation.create(
            'filename',
            'A string that represents the name of the file to be saved.'
        ),
        ParameterInformation.create(
            'eventType',
            'Limit the return to specific event log types as defined by:\n\
eventlog.SEV_ERROR (1)\n\
eventlog.SEV_WARN (2)\n\
eventlog.SEV_INFO (4)\n\
eventlog.SEV_ALL (7)\n\
Combinations via bitwise OR are supported.'
        ),
    ),
]

export async function getEventlogCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(eventlogCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getEventlogSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(eventlogSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
