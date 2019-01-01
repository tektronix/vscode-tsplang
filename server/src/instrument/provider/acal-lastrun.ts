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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['acal'] },
        kind: CompletionItemKind.Module,
        label: 'lastrun'
    },
    {
        data: { domains: ['lastrun', 'acal'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nacal.lastrun.internaltemp\n```\n\nacal.lastrun.internaltemp -> number\n\
\n\
Returns the internal temperature, in Celsius, of the instrument during the last automatic calibration.'
        },
        kind: CompletionItemKind.Constant,
        label: 'internaltemp'
    },
    {
        data: { domains: ['lastrun', 'acal'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nacal.lastrun.tempdiff\n```\n\nacal.lastrun.tempdiff -> number\n\
\n\
Returns the difference, in Celsius, between the present internal temperature and the internal temperature during the \
last automatic calibration.'
        },
        kind: CompletionItemKind.Constant,
        label: 'tempdiff'
    },
    {
        data: { domains: ['lastrun', 'acal'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nacal.lastrun.time\n```\n\nacal.lastrun.time -> string\n\
\n\
Returns a string representing the date and time of the last automatic calibration.\n\
\n\
The string takes the form "MM/DD/YYYY HH:MM:SS.NNNNNNNNN", where \
*MM/DD/YYYY* is the month, day, and year \
and *HH:MM:SS.NNNNNNNNN* is the hour, minute, second, and fractional second.'
        },
        kind: CompletionItemKind.Constant,
        label: 'time'
    },
]
