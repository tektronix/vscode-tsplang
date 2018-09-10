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

import { CompletionItem, CompletionItemKind, MarkupKind, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { resolveCompletionNamespace, resolveSignatureNamespace } from '.'

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
    {
        documentation: undefined,
        label: 'assert(condition[, message])',
        parameters: [
            {
                documentation: 'A boolean condition to evaluate.',
                label: 'condition',
            },
            {
                documentation: 'Optional failure message string. Defaults to "assertion failed!"',
                label: 'message',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'collectgarbage([limit])',
        parameters: [
            {
                documentation: 'A number representing the garbage-collection threshold in kilobytes.',
                label: 'limit',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'dofile(filename)',
        parameters: [
            {
                documentation: 'A string representing the path of the file to execute.',
                label: 'filename',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'error(message[, level])',
        parameters: [
            {
                documentation: 'An error message string.',
                label: 'message',
            },
            {
                documentation: 'Stack level of the error location starting at 1. Defaults to 1 (here).',
                label: 'level',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'getfenv([f])',
        parameters: [
            {
                documentation: 'A function name or a stack level starting at 0 (global environment). Defaults to 1 \
(here).',
                label: 'f',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'getmetatable(object)',
        parameters: [
            {
                documentation: 'The target object of the function call.',
                label: 'object',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'ipairs(t)',
        parameters: [
            {
                documentation: 'The table to iterate over.',
                label: 't',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'loadfile(filename)',
        parameters: [
            {
                documentation: 'A string representing the path of the file to load.',
                label: 'filename',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'loadstring(chunkString[, chunkName])',
        parameters: [
            {
                documentation: 'The string to load as a chunk.',
                label: 'chunkString',
            },
            {
                documentation: 'A string representing the name of the loaded chunk.',
                label: 'chunkName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'next(t[, i])',
        parameters: [
            {
                documentation: 'The table to iterate over.',
                label: 't',
            },
            {
                documentation: 'The previously returned index or nil to return the first index.',
                label: 'i',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'pairs(t)',
        parameters: [
            {
                documentation: 'The table to iterate over.',
                label: 't',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'pcall(f[, ...])',
        parameters: [
            {
                documentation: 'The function to call in protected mode.',
                label: 'f',
            },
            {
                documentation: 'Zero or more arguments that will be passed to function f.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'print(...)',
        parameters: [
            {
                documentation: 'One or more values separated with commas.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'rawequal(x, y)',
        parameters: [
            {
                documentation: 'An object whose equality will be compared against object y.',
                label: 'x',
            },
            {
                documentation: 'An object whose equality will be compared against object x.',
                label: 'y',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'rawget(t, i)',
        parameters: [
            {
                documentation: 'The table to access.',
                label: 't',
            },
            {
                documentation: 'The index of table t to access.',
                label: 'i',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'rawset(t, i, v)',
        parameters: [
            {
                documentation: 'The table to access.',
                label: 't',
            },
            {
                documentation: 'The index of table t to set.',
                label: 'i',
            },
            {
                documentation: 'The value of the table t at index i.',
                label: 'v',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'require(packagename)',
        parameters: [
            {
                documentation: 'A string or path string representing the package to load.',
                label: 'packagename',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'setfenv(f, t)',
        parameters: [
            {
                documentation: 'A function name or a stack level starting at 0 (current execution context).',
                label: 'f',
            },
            {
                documentation: 'The new environment table.',
                label: 't',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'setmetatable(t, m)',
        parameters: [
            {
                documentation: 'The table whose metatable will be altered.',
                label: 't',
            },
            {
                documentation: 'The new metatable or nil.',
                label: 'm',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'tonumber(v[, base])',
        parameters: [
            {
                documentation: 'Some value to convert.',
                label: 'v',
            },
            {
                documentation: 'Desired numeric base.',
                label: 'base',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'tostring(v)',
        parameters: [
            {
                documentation: 'Some value to convert.',
                label: 'v',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'type(v)',
        parameters: [
            {
                documentation: 'Some value to query.',
                label: 'v',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'unpack(list)',
        parameters: [
            {
                documentation: 'The list whose values will be returned.',
                label: 'list',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'xpcall(f, errHandler)',
        parameters: [
            {
                documentation: 'The function to call in protected mode.',
                label: 'f',
            },
            {
                documentation: 'The function to call if an error occurs.',
                label: 'errHandler',
            },
        ],
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
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
