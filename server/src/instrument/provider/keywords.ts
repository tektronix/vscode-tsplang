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

const keywordCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Keyword,
        label: 'break'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'do'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'else'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'elseif'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'end'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'for'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'function'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'if'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'in'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'local'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'repeat'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'return'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'then'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'until'
    },
    {
        kind: CompletionItemKind.Keyword,
        label: 'while'
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
    const resultCompletions: Array<CompletionItem> = new Array()

    if (cmd.children === undefined) {
        throw new Error('Missing required children field.')
    }

    cmd.children.forEach((cmdItem: ApiSpec) => {
        keywordCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })
    })

    return { completions: resultCompletions }
}
