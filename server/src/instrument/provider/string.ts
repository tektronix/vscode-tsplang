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

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'string'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction byte(s, index)\n```\n\nstring.byte(s[, index]) -> number | nil\n\
\n\
Returns the numeric representation of the character at the index of s or nil if index is out of range. If omitted, \
then index defaults to 1.'
        },
        kind: CompletionItemKind.Function,
        label: 'byte'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction char(...)\n```\n\nstring.char([...]) -> string\n\
\n\
Returns a string comprised of the given arguments concatenated together, where each argument is a numeric character \
representation.'
        },
        kind: CompletionItemKind.Function,
        label: 'char'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction dump(f)\n```\n\nstring.dump(f) -> string\n\
\n\
Returns a binary string representation of the given function f.'
        },
        kind: CompletionItemKind.Function,
        label: 'dump'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction find(s, pattern, start, plain)\n```\n\
\n\
string.find(s, pattern[, start[, plain]]) -> number, number, captures\n\
\n\
Looks for the first match of pattern in the string s, starting at the given start index (or 1 if omitted). If a match \
is found, then the start and end indices of the match are returned; otherwise nil is returned. Any group captures are \
returned as extra results. If plain is true, then a plain-text search is performed; defaults to false if omitted.'
        },
        kind: CompletionItemKind.Function,
        label: 'find'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction format(formatstring, ...)\n```\n\
\n\
string.format(formatstring[, ...]) -> string\n\
\n\
Returns a formatted string based on its formatstring and variable arguments. The formatstring adheres to a C-like \
printf syntax.'
        },
        kind: CompletionItemKind.Function,
        label: 'format'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction gsub(s, pattern, repl, n)\n```\n\
\n\
string.gsub(s, pattern, repl[, n]) -> string, number\n\
\n\
Returns a copy of s in which the first n occurrences of the pattern have been replaced with the string repl. If n is \
omitted, then all occurrences are replaced. The second return value is the total number of replacements made.\n\
\n\
If repl is a string, then it may contain capture-group specifiers of the form "%n", where n is a number between 1 and \
9.\n\
\n\
If repl is a function, then it is called for every match, with all captured substrings being passed as arguments in \
order of capture. If pattern contains no capture groups, then the whole match is passed as a single argument. If the \
repl function returns a string, then it is used as the replacement; otherwise an empty string is used.'
        },
        kind: CompletionItemKind.Function,
        label: 'gsub'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction len(s)\n```\n\nstring.len(s) -> number\n\
\n\
Returns the length of the given string s, including any embedded null characters.'
        },
        kind: CompletionItemKind.Function,
        label: 'len'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction lower(s)\n```\n\nstring.lower(s) -> string\n\
\n\
Returns a copy of the string s with all cased characters converted to lowercase.'
        },
        kind: CompletionItemKind.Function,
        label: 'lower'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rep(s, n)\n```\n\nstring.rep(s, n) -> string\n\
\n\
Returns a string that is the concatenation of n copies of the string s.'
        },
        kind: CompletionItemKind.Function,
        label: 'rep'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sub(s, start, end)\n```\n\nstring.sub(s, start[, end]) -> string\n\
\n\
Returns the substring of s that begins at the start index and continues until the end index. Both indices are \
inclusive. If omitted, the end index defaults to -1 (the last index).'
        },
        kind: CompletionItemKind.Function,
        label: 'sub'
    },
    {
        data: ['string'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction upper(s)\n```\n\nstring.upper(s) -> string\n\
\n\
Returns a copy of the string s with all cased characters converted to uppercase.'
        },
        kind: CompletionItemKind.Function,
        label: 'upper'
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.byte(s[, index])',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
            {
                documentation: 'An optional one-based index. Defaults to 1.',
                label: 'index',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.char([...])',
        parameters: [
            {
                documentation: 'Zero or more integers representing character codes.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.dump(f)',
        parameters: [
            {
                documentation: 'A function to convert to a binary string.',
                label: 'f',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.find(s, pattern[, start[, plain]])',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
            {
                documentation: 'A pattern string.',
                label: 'pattern',
            },
            {
                documentation: 'The index to start searching. Defaults to 1.',
                label: 'start',
            },
            {
                documentation: 'Whether or not to perform a plain-text search. Defaults to false (disabled).',
                label: 'plain',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.format(formatstring[, ...])',
        parameters: [
            {
                documentation: 'A C-like printf format string.',
                label: 'formatstring',
            },
            {
                documentation: 'Zero or more arguments as required by the formatstring.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.gsub(s, pattern, repl[, n])',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
            {
                documentation: 'A pattern string.',
                label: 'pattern',
            },
            {
                documentation: 'A replacement string or replacement function that returns the string to use for the \
match substitution.',
                label: 'repl',
            },
            {
                documentation: 'The maximum number of substitutions to perform. Defaults to all occurrences.',
                label: 'n',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.len(s)',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.lower(s)',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.rep(s, n)',
        parameters: [
            {
                documentation: 'The source string.',
                label: 's',
            },
            {
                documentation: 'The number of times to duplicate the source string s.',
                label: 'n',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.sub(s, start[, end])',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
            {
                documentation: 'The one-based index to begin the substring (inclusive). May be negative.',
                label: 'start',
            },
            {
                documentation: 'An optional one-based index to end the substring (inclusive). May be negative. \
Defaults to -1.',
                label: 'end',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'string.upper(s)',
        parameters: [
            {
                documentation: 'The target string.',
                label: 's',
            },
        ],
    },
]
