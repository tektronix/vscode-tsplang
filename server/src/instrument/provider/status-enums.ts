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

import { CompletionItemKind } from 'vscode-languageserver'

import { InstrumentCompletionItem } from '../../wrapper'

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['status'] },
        detail: 'status.MSB: 1',
        kind: CompletionItemKind.EnumMember,
        label: 'MSB'
    },
    {
        data: { domains: ['status'] },
        detail: 'status.EAV: 4',
        kind: CompletionItemKind.EnumMember,
        label: 'EAV'
    },
    {
        data: { domains: ['status'] },
        detail: 'status.QSB: 8',
        kind: CompletionItemKind.EnumMember,
        label: 'QSB'
    },
    {
        data: { domains: ['status'] },
        detail: 'status.MAV: 16',
        kind: CompletionItemKind.EnumMember,
        label: 'MAV'
    },
    {
        data: { domains: ['status'] },
        detail: 'status.ESB: 32',
        kind: CompletionItemKind.EnumMember,
        label: 'ESB'
    },
    {
        data: { domains: ['status'] },
        detail: 'status.MSS: 64',
        kind: CompletionItemKind.EnumMember,
        label: 'MSS'
    },
    {
        data: { domains: ['status'] },
        detail: 'status.OSB: 128',
        kind: CompletionItemKind.EnumMember,
        label: 'OSB'
    },
]
