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

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { resolveCompletionNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_APPEND'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_READ'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'MODE_WRITE'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'READ_ALL'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'READ_LINE'
    },
    {
        data: ['file'],
        kind: CompletionItemKind.EnumMember,
        label: 'READ_NUMBER'
    },
]
