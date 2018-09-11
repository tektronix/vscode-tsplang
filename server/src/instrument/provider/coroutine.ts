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
        label: 'coroutine'
    },
    {
        data: ['coroutine'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction create(f)\n```\n\ncoroutine.create(f) -> thread\n\
\n\
Creates and returns a new coroutine whose body is the given function f.'
        },
        kind: CompletionItemKind.Function,
        label: 'create'
    },
    {
        data: ['coroutine'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction resume(co, ...)\n```\n\
\n\
coroutine.resume(co, ...) -> false, string\n\
\n\
coroutine.resume(co, ...) -> true, yield arguments\n\
\n\
Starts the execution of the given coroutine co or resumes its execution from the last yield call. The first value \
returned by this function indicates the error status of the coroutine co.\n\
\n\
If the error status is false, then the next value returned is the error message; otherwise the following values are \
those passed to the yield function.'
        },
        kind: CompletionItemKind.Function,
        label: 'resume'
    },
    {
        data: ['coroutine'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction status(co)\n```\n\ncoroutine.status(co) -> string\n\
\n\
Returns the status of the given coroutine co as a string. Possible statuses are "running", "suspended", and "dead".'
        },
        kind: CompletionItemKind.Function,
        label: 'status'
    },
    {
        data: ['coroutine'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wrap(f)\n```\n\ncoroutine.wrap(f) -> function\n\
\n\
Creates a new coroutine whose body is the given function f and returns a function that resumes the coroutine each \
time it is called.\n\
\n\
Arguments passed to the returned function behave like those passed to a typical resume call. Return values from the \
resulting function do not include an error status boolean.'
        },
        kind: CompletionItemKind.Function,
        label: 'wrap'
    },
    {
        data: ['coroutine'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction yield(...)\n```\n\ncoroutine.yield(...)\n\
\n\
Suspends execution of the current coroutine. Any arguments given are returned as extra results to the resume function.'
        },
        kind: CompletionItemKind.Function,
        label: 'yield'
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'coroutine.create(f)',
        parameters: [
            {
                documentation: 'A function to use as the coroutine body.',
                label: 'f',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'coroutine.resume(co, ...)',
        parameters: [
            {
                documentation: 'A coroutine object of type "thread".',
                label: 'co',
            },
            {
                documentation: 'Zero or more arguments to pass to the coroutine.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'coroutine.status(co)',
        parameters: [
            {
                documentation: 'A coroutine object of type "thread".',
                label: 'co',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'coroutine.wrap(f)',
        parameters: [
            {
                documentation: 'A function to use as the coroutine body.',
                label: 'f',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'coroutine.yield(...)',
        parameters: [
            {
                documentation: 'Zero or more arguments to return as extra results to the resume function.',
                label: '...',
            },
        ],
    },
]
