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

import { CompletionItemKind, MarkupKind, ParameterInformation } from 'vscode-languageserver'

import { InstrumentCompletionItem, InstrumentSignatureInformation } from '../../wrapper'

import { InstrumentSpec } from '..'

export const completions: Array<InstrumentCompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'eventlog'
    },
    {
        data: { domains: ['eventlog'] },
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
        data: { domains: ['eventlog'] },
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
        data: { domains: ['eventlog'] },
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
        data: { domains: ['eventlog'] },
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
        data: { domains: ['eventlog'] },
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

export const signatures: Array<InstrumentSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'eventlog.getcount([eventType])',
        parameters: [
            {
                documentation: 'Limit the return to specific event log types as defined by eventlog.SEV_*.\n\
Combinations via bitwise OR are supported.',
                label: 'eventType',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'eventlog.next([eventType])',
        parameters: [
            {
                documentation: 'Limit the return to specific event log types as defined by eventlog.SEV_*.\n\
Combinations via bitwise OR are supported.',
                label: 'eventType',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'eventlog.post(message[, eventType])',
        parameters: [
            {
                documentation: 'String that contains the message.',
                label: 'message',
            },
            {
                documentation: 'The type of event to post as some eventlog.SEV_*. Defaults to eventlog.SEV_INFO.',
                label: 'eventType',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'eventlog.save(filename, eventType)',
        parameters: [
            {
                documentation: 'A string that represents the name of the file to be saved.',
                label: 'filename',
            },
            {
                documentation: 'Limit the return to specific event log types as defined by eventlog.SEV_*.\n\
Combinations via bitwise OR are supported.',
                label: 'eventType',
            },
        ],
    },
]
