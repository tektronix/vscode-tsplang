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

const osCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'os'
    },
    {
        data: ['os'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clock()\n```\n\nos.clock() -> number\n\
\n\
Returns an approximation of the total CPU time used by the calling program, in seconds.'
        },
        kind: CompletionItemKind.Function,
        label: 'clock'
    },
    {
        data: ['os'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction date(format, time)\n```\n\nos.date([format[, time]]) -> string | table\n\
\n\
Converts the number of time seconds to a string or table based on the supplied format and returns the resulting \
value. If time is omitted, then the current time is used. If format is omitted, then it defaults to "%c".\n\
\n\
If the format string begins with "!", then the date is formatted in Coordinated Universal Time. After the UTC \
optional character, if format is "*t", then the current date is returned as a table. All other format specifiers will \
result in a string and follow the convention set by the C-language strftime function.\n\
\n\
Tables returned from this function contain the fields year (four digits), month (1-12), day (1-31), hour (0-23), min \
(0-59), sec (0-61), wday (1-7, where 1 is Sunday), yday (1-366), and isdst (daylight savings boolean).'
        },
        kind: CompletionItemKind.Function,
        label: 'date'
    },
    {
        data: ['os'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction difftime(t1, t2)\n```\n\nos.difftime(t1, t2) -> number\n\
\n\
Returns the number of seconds from time t1 to time t2.'
        },
        kind: CompletionItemKind.Function,
        label: 'difftime'
    },
    {
        data: ['os'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rename(source, destination)\n```\n\
\n\
os.rename(source, destination) -> void | nil, string\n\
\n\
Renames the source file to destination. If the function fails, it returns nil and the error message as a string; \
otherwise nothing is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'rename'
    },
    {
        data: ['os'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction time(t)\n```\n\nos.time(t) -> number\n\
\n\
Converts a time table into seconds since January 1, 1970 and returns the resulting value.\n\
\n\
A time table must contain a year, month, and day field. If present, the hour, min, sec, and isdst fields will be used \
for a more accurate conversion.'
        },
        kind: CompletionItemKind.Function,
        label: 'time'
    },
]

const osSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'os.date([format[, time]])',
        undefined,
        ParameterInformation.create(
            'format',
            'A date format string. Optionally begins with "!" for UTC. "*t" returns a time table. All other format \
specifiers follow the convention set by the C-language strftime function.'
        ),
        ParameterInformation.create(
            'time',
            'An optional number representing a time in seconds.'
        ),
    ),
    SignatureInformation.create(
        'os.difftime(t1, t2)',
        undefined,
        ParameterInformation.create(
            't1'
        ),
        ParameterInformation.create(
            't2'
        ),
    ),
    SignatureInformation.create(
        'os.rename(source, destination)',
        undefined,
        ParameterInformation.create(
            'source',
            'The filepath of the target file as a string.'
        ),
        ParameterInformation.create(
            'destination',
            'The new filepath of the source file.'
        ),
    ),
    SignatureInformation.create(
        'os.time(t)',
        undefined,
        ParameterInformation.create(
            't',
            'A time table that contains a year, month, and day field. The hour, min, sec, and isdst fields are used \
if available.'
        ),
    ),
]

export async function getOSCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(osCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getOSSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(osSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
