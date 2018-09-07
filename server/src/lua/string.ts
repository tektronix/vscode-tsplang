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

const stringCompletions: Array<CompletionItem> = [
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

const stringSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'string.byte(s[, index])',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
        ParameterInformation.create(
            'index',
            'An optional one-based index. Defaults to 1.'
        ),
    ),
    SignatureInformation.create(
        'string.char([...])',
        undefined,
        ParameterInformation.create(
            '...',
            'Zero or more integers representing character codes.'
        ),
    ),
    SignatureInformation.create(
        'string.dump(f)',
        undefined,
        ParameterInformation.create(
            'f',
            'A function to convert to a binary string.'
        ),
    ),
    SignatureInformation.create(
        'string.find(s, pattern[, start[, plain]])',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
        ParameterInformation.create(
            'pattern',
            'A pattern string.'
        ),
        ParameterInformation.create(
            'start',
            'The index to start searching. Defaults to 1.'
        ),
        ParameterInformation.create(
            'plain',
            'Whether or not to perform a plain-text search. Defaults to false (disabled).'
        ),
    ),
    SignatureInformation.create(
        'string.format(formatstring[, ...])',
        undefined,
        ParameterInformation.create(
            'formatstring',
            'A C-like printf format string.'
        ),
        ParameterInformation.create(
            '...',
            'Zero or more arguments as required by the formatstring.'
        ),
    ),
    SignatureInformation.create(
        'string.gsub(s, pattern, repl[, n])',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
        ParameterInformation.create(
            'pattern',
            'A pattern string.'
        ),
        ParameterInformation.create(
            'repl',
            'A replacement string or replacement function that returns the string to use for the match substitution.'
        ),
        ParameterInformation.create(
            'n',
            'The maximum number of substitutions to perform. Defaults to all occurrences.'
        ),
    ),
    SignatureInformation.create(
        'string.len(s)',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
    ),
    SignatureInformation.create(
        'string.lower(s)',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
    ),
    SignatureInformation.create(
        'string.rep(s, n)',
        undefined,
        ParameterInformation.create(
            's',
            'The source string.'
        ),
        ParameterInformation.create(
            'n',
            'The number of times to duplicate the source string s.'
        ),
    ),
    SignatureInformation.create(
        'string.sub(s, start[, end])',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
        ParameterInformation.create(
            'start',
            'The one-based index to begin the substring (inclusive). May be negative.'
        ),
        ParameterInformation.create(
            'end',
            'An optional one-based index to end the substring (inclusive). May be negative. Defaults to -1.'
        ),
    ),
    SignatureInformation.create(
        'string.upper(s)',
        undefined,
        ParameterInformation.create(
            's',
            'The target string.'
        ),
    ),
]

export async function getStringCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(stringCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getStringSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(stringSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
