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

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

const functionCompletions: Array<CompletionItem> = [
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction assert(condition, message)\n```\n\nassert(condition[, message])\n\
\n\
Logs an error message when the boolean condition evaluates to false or nil. The message parameter defaults to \
"assertion failed!"'
        },
        kind: CompletionItemKind.Function,
        label: 'assert'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction collectgarbage(limit)\n```\n\ncollectgarbage([limit])\n\
\n\
Sets the garbage-collection threshold to the given limit (in Kbytes) and checks it against the byte counter. If the \
new threshold is smaller than the byte counter, then Lua immediately runs the garbage collector. If limit is absent, \
it defaults to zero (thus forcing a garbage-collection cycle).'
        },
        kind: CompletionItemKind.Function,
        label: 'collectgarbage'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction dofile(filename)\n```\n\ndofile(filename) -> any\n\
\n\
Opens the named file and executes its contents as a Lua chunk. Returns any value returned by the chunk.'
        },
        kind: CompletionItemKind.Function,
        label: 'dofile'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction error(message, level)\n```\n\nerror(message[, level])\n\
\n\
Terminates the last protected function called and returns message as the error message. The level argument specifies \
where the error message points the error and defaults to 1.\n\
\n\
When level is set to 1, the error position is where the error function was called. Level 2 points the error to where \
the function that called error was called; and so on.'
        },
        kind: CompletionItemKind.Function,
        label: 'error'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction gcinfo()\n```\n\ngcinfo() -> number, number\n\
\n\
Returns `inUse, threshold` where \
*inUse* is the number of Kbytes of dynamic memory Lua is using \
and *threshold* is the current garbage collector threshold in Kbytes.'
        },
        kind: CompletionItemKind.Function,
        label: 'gcinfo'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getfenv(f)\n```\n\ngetfenv([f]) -> table | f.__fenv\n\
\n\
Returns the current environment in use by the function. f can be a Lua function or a number, which specifies the \
function at that stack level and defaults to 1. If the given function is not a Lua function, or if f is 0, getfenv \
returns the global environment.\n\
\n\
If the environment has a "__fenv" field, its associated value is returned instead of the environment.\n\
\n\
Stack level 1 is the function calling this function.'
        },
        kind: CompletionItemKind.Function,
        label: 'getfenv'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getmetatable(object)\n```\n\ngetmetatable(object) -> table | object.__metatable\n\
\n\
Returns the metatable of the given object. If the object does not have a metatable, then nil is returned. If the \
object has a metatable and it has a "__metatable" field, the value of that field is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'getmetatable'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction ipairs(t)\n```\n\nipairs(t) -> iterator, table, 0\n\
\n\
Returns an iterator function, a table t, and 0 so that the construction\n\
\n\
`for i,v in ipairs(t) do ... end`\n\
\n\
will iterate over the pairs `(1,t[1])`, `(2,t[2])`, ..., up to the first integer key with a nil value.'
        },
        kind: CompletionItemKind.Function,
        label: 'ipairs'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction loadfile(filename)\n```\n\nloadfile(filename) -> function | nil\n\
\n\
Loads a file as a Lua chunk without running it. If there are no errors, the compiled chunk is returned as a function; \
otherwise nil is returned and an error logged.\n\
\n\
The returned function resides in the global environment.'
        },
        kind: CompletionItemKind.Function,
        label: 'loadfile'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction loadstring(chunkString, chunkName)\n```\n\
\n\
loadstring(chunkString[, chunkName]) -> function | nil\n\
\n\
Loads chunkString as a Lua chunk without running it. If there are no errors, the compiled chunk is returned as a \
function; otherwise nil is returned and an error logged. The optional chunkName is a string to be used in error \
messages and debug information.\n\
\n\
The returned function resides in the global environment.'
        },
        kind: CompletionItemKind.Function,
        label: 'loadstring'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction next(t, i)\n```\n\nnext(t[, i]) -> number, any\n\
\n\
Returns `nextIndex, nextValue` where \
*nextIndex* is the index of the next non-nil value of table t \
and *nextValue* is the value of table t at nextIndex.\n\
\n\
If index i is omitted or nil, then nextIndex is the index of the first non-nil value found in table t.'
        },
        kind: CompletionItemKind.Function,
        label: 'next'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pairs(t)\n```\npairs(t) -> iterator, table, nil\n\
\n\
Returns an iterator function, a table t, and nil so that the construction\n\
\n\
`for k,v in pairs(t) do ... end`\n\
\n\
will iterate over all key-value pairs of the given table t.'
        },
        kind: CompletionItemKind.Function,
        label: 'pairs'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pcall(f, ...)\n```\n\
\n\
pcall(f[, ...]) -> false, string\n\
\n\
pcall(f[, ...]) -> true, f return values\n\
\n\
Calls function f with the given arguments in protected mode. In this mode, errors are caught before being logged. The \
first value returned by this function indicates the error status of the given function f.\n\
\n\
If the error status is false, then the next value returned is the error message; otherwise the following values are \
those returned by function f.'
        },
        kind: CompletionItemKind.Function,
        label: 'pcall'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction print(...)\n```\n\
\n\
Generate a response message.\n\
\n\
The output of each parameter is separated by a tab character.\n\
\n\
Numbers are printed using the format.asciiprecision attribute.'
        },
        kind: CompletionItemKind.Function,
        label: 'print',
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rawequal(x, y)\n```\n\nrawequal(x, y) -> boolean\n\
\n\
Checks whether x is equal to y without invoking any metamethod. Returns true is x equals y and false otherwise.'
        },
        kind: CompletionItemKind.Function,
        label: 'rawequal'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rawget(t, i)\n```\n\nrawget(t, i) -> any\n\
\n\
Returns the value of table t at index i without invoking any metamethod.\n\
\n\
t must be a table and i cannot be nil.'
        },
        kind: CompletionItemKind.Function,
        label: 'rawget'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rawset(t, i, v)\n```\n\
\n\
Sets the value of table t at index i to value v without invoking any metamethod.\n\
\n\
t must be a table, i cannot be nil, and v is any value.'
        },
        kind: CompletionItemKind.Function,
        label: 'rawset'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction require(packagename)\n```\n\nrequire(packagename) -> any\n\
\n\
Loads the given package and returns what ever value is returned by that package. Return values of nil are converted \
to true.'
        },
        kind: CompletionItemKind.Function,
        label: 'require'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setfenv(f, t)\n```\n\
\n\
Sets the current environment table t to be used by the target f. f can be a Lua function or a number, which \
specifies the function at that stack level. If f is 0, then the global environment of the current execution context \
is changed.\n\
\n\
If the current environment of the target f has a "__fenv" field, then an error is raised.\n\
\n\
Stack level 1 is the function calling this function.'
        },
        kind: CompletionItemKind.Function,
        label: 'setfenv'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setmetatable(t, m)\n```\n\
\n\
Set the metatable for the table t to the given table m. If table m is nil, then the metatable of table t is removed.\n\
\n\
If the table t has a metatable and it has a "__metatable" field, then an error is raised.'
        },
        kind: CompletionItemKind.Function,
        label: 'setmetatable'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction tonumber(v, base)\n```\n\ntonumber(v[, base]) -> number | nil\n\
\n\
Tries to convert the value v to a number. If it cannot be converted, then nil is returned. base defaults to 10.\n\
\n\
When converting to base 10, the value v may have a decimal or exponent. For all other bases, only unsigned integers \
are accepted.'
        },
        kind: CompletionItemKind.Function,
        label: 'tonumber'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction tostring(v)\n```\n\ntostring(v) -> string\n\
\n\
Converts an argument of any type to a reasonably formatted string.\n\
\n\
If the metatable of v has a "__tostring" field, then it is invoked using the value v and its return value is used for \
this result.'
        },
        kind: CompletionItemKind.Function,
        label: 'tostring'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction type(v)\n```\n\ntype(v) -> string\n\
\n\
Returns the Lua type of the argument as a string.'
        },
        kind: CompletionItemKind.Function,
        label: 'type'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction unpack(list)\n```\n\nunpack(list) -> list[1], ..., list[n]\n\
\n\
Returns all elements from the given list.'
        },
        kind: CompletionItemKind.Function,
        label: 'unpack'
    },
    {
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction xpcall(f, errHandler)\n```\n\
\n\
pcall(f, errHandler) -> false, errHandler return values\n\
\n\
pcall(f, errHandler) -> true, f return values\n\
\n\
Calls function f in protected mode. In this mode, errors are caught before being logged. The first value returned by \
this function indicates the error status of the given function f.\n\
\n\
If the error status is false, then the specified errHandler function is called and its return values are listed; \
otherwise the following values are those returned by function f.'
        },
        kind: CompletionItemKind.Function,
        label: 'xpcall'
    },
]

const functionSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'assert(condition[, message])',
        undefined,
        ParameterInformation.create(
            'condition',
            'A boolean condition to evaluate.'
        ),
        ParameterInformation.create(
            'message',
            'Optional failure message string. Defaults to "assertion failed!"'
        ),
    ),
    SignatureInformation.create(
        'collectgarbage([limit])',
        undefined,
        ParameterInformation.create(
            'limit',
            'A number representing the garbage-collection threshold in kilobytes.'
        ),
    ),
    SignatureInformation.create(
        'dofile(filename)',
        undefined,
        ParameterInformation.create(
            'filename',
            'A string representing the path of the file to execute.'
        ),
    ),
    SignatureInformation.create(
        'error(message[, level])',
        undefined,
        ParameterInformation.create(
            'message',
            'An error message string.'
        ),
        ParameterInformation.create(
            'level',
            'Stack level of the error location starting at 1. Defaults to 1 (here).'
        ),
    ),
    SignatureInformation.create(
        'getfenv([f])',
        undefined,
        ParameterInformation.create(
            'f',
            'A function name or a stack level starting at 0 (global environment). Defaults to 1 (here).'
        ),
    ),
    SignatureInformation.create(
        'getmetatable(object)',
        undefined,
        ParameterInformation.create(
            'object',
            'The target object of the function call.'
        ),
    ),
    SignatureInformation.create(
        'ipairs(t)',
        undefined,
        ParameterInformation.create(
            't',
            'The table to iterate over.'
        ),
    ),
    SignatureInformation.create(
        'loadfile(filename)',
        undefined,
        ParameterInformation.create(
            'filename',
            'A string representing the path of the file to load.'
        ),
    ),
    SignatureInformation.create(
        'loadstring(chunkString[, chunkName])',
        undefined,
        ParameterInformation.create(
            'chunkString',
            'The string to load as a chunk.'
        ),
        ParameterInformation.create(
            'chunkName',
            'A string representing the name of the loaded chunk.'
        ),
    ),
    SignatureInformation.create(
        'next(t[, i])',
        undefined,
        ParameterInformation.create(
            't',
            'The table to iterate over.'
        ),
        ParameterInformation.create(
            'i',
            'The previously returned index or nil to return the first index.'
        ),
    ),
    SignatureInformation.create(
        'pairs(t)',
        undefined,
        ParameterInformation.create(
            't',
            'The table to iterate over.'
        ),
    ),
    SignatureInformation.create(
        'pcall(f[, ...])',
        undefined,
        ParameterInformation.create(
            'f',
            'The function to call in protected mode.'
        ),
        ParameterInformation.create(
            '...',
            'Zero or more arguments that will be passed to function f.'
        ),
    ),
    SignatureInformation.create(
        'print(...)',
        undefined,
        ParameterInformation.create(
            '...',
            'One or more values separated with commas.'
        ),
    ),
    SignatureInformation.create(
        'rawequal(x, y)',
        undefined,
        ParameterInformation.create(
            'x',
            'An object whose equality will be compared against object y.'
        ),
        ParameterInformation.create(
            'y',
            'An object whose equality will be compared against object x.'
        ),
    ),
    SignatureInformation.create(
        'rawget(t, i)',
        undefined,
        ParameterInformation.create(
            't',
            'The table to access.'
        ),
        ParameterInformation.create(
            'i',
            'The index of table t to access.'
        ),
    ),
    SignatureInformation.create(
        'rawset(t, i, v)',
        undefined,
        ParameterInformation.create(
            't',
            'The table to access.'
        ),
        ParameterInformation.create(
            'i',
            'The index of table t to set.'
        ),
        ParameterInformation.create(
            'v',
            'The value of the table t at index i.'
        ),
    ),
    SignatureInformation.create(
        'require(packagename)',
        undefined,
        ParameterInformation.create(
            'packagename',
            'A string or path string representing the package to load.'
        ),
    ),
    SignatureInformation.create(
        'setfenv(f, t)',
        undefined,
        ParameterInformation.create(
            'f',
            'A function name or a stack level starting at 0 (current execution context).'
        ),
        ParameterInformation.create(
            't',
            'The new environment table.'
        ),
    ),
    SignatureInformation.create(
        'setmetatable(t, m)',
        undefined,
        ParameterInformation.create(
            't',
            'The table whose metatable will be altered.'
        ),
        ParameterInformation.create(
            'm',
            'The new metatable or nil.'
        ),
    ),
    SignatureInformation.create(
        'tonumber(v[, base])',
        undefined,
        ParameterInformation.create(
            'v',
            'Some value to convert.'
        ),
        ParameterInformation.create(
            'base',
            'Desired numeric base.'
        ),
    ),
    SignatureInformation.create(
        'tostring(v)',
        undefined,
        ParameterInformation.create(
            'v',
            'Some value to convert.'
        ),
    ),
    SignatureInformation.create(
        'type(v)',
        undefined,
        ParameterInformation.create(
            'v',
            'Some value to query.'
        ),
    ),
    SignatureInformation.create(
        'unpack(list)',
        undefined,
        ParameterInformation.create(
            'list',
            'The list whose values will be returned.'
        ),
    ),
    SignatureInformation.create(
        'xpcall(f, errHandler)',
        undefined,
        ParameterInformation.create(
            'f',
            'The function to call in protected mode.'
        ),
        ParameterInformation.create(
            'errHandler',
            'The function to call if an error occurs.'
        ),
    ),
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSet {
    const resultCompletions: Array<CompletionItem> = new Array()
    const resultSignatures: Array<SignatureInformation> = new Array()

    if (cmd.children === undefined) {
        throw new Error('Missing required children field.')
    }

    cmd.children.forEach((cmdItem: ApiSpec) => {
        functionCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })

        functionSignatures.forEach((signature: SignatureInformation) => {
            const signaNamespace = resolveSignatureNamespace(signature)

            if (signaNamespace === undefined) {
                throw new Error('Unable to resolve signature namespace for ' + signature.label)
            }

            if (cmdItem.label.localeCompare(signaNamespace) === 0) {
                resultSignatures.push(signature)
            }
        })
    })

    return { completions: resultCompletions, signatures: resultSignatures }
}
