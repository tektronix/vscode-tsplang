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

const mathCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'math'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction abs(x)\n```\n\nmath.abs(x) -> number\n\
\n\
Returns the absolute value of x.'
        },
        kind: CompletionItemKind.Function,
        label: 'abs'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction acos(x)\n```\n\nmath.acos(x) -> number\n\
\n\
Returns the arc cosine, in radians, of the value x that lays in the interval [-1, +1]. An error is logged if the \
given x is outside this interval.'
        },
        kind: CompletionItemKind.Function,
        label: 'acos'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction asin(x)\n```\n\nmath.asin(x) -> number\n\
\n\
Returns the arc sine, in radians, of the value x that lays in the interval [-1, +1]. An error is logged if the given \
x is outside this interval.'
        },
        kind: CompletionItemKind.Function,
        label: 'asin'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction atan(x)\n```\n\nmath.atan(x) -> number\n\
\n\
Returns the arc tangent, in radians, of the value x.'
        },
        kind: CompletionItemKind.Function,
        label: 'atan'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction atan2(y, x)\n```\n\nmath.atan2(y, x) -> number\n\
\n\
Returns the arc tangent, in radians, of the value y/x.'
        },
        kind: CompletionItemKind.Function,
        label: 'atan2'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction ceil(x)\n```\n\nmath.ceil(x) -> number\n\
\n\
Rounds x upward, returning the smallest integer value greater than or equal to x.'
        },
        kind: CompletionItemKind.Function,
        label: 'ceil'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction cos(x)\n```\n\nmath.cos(x) -> number\n\
\n\
Returns the cosine of angle x in radians.'
        },
        kind: CompletionItemKind.Function,
        label: 'cos'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction deg(x)\n```\n\nmath.deg(x) -> number\n\
\n\
Convert from radians to degrees and return the result.'
        },
        kind: CompletionItemKind.Function,
        label: 'deg'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction exp(x)\n```\n\nmath.exp(x) -> number\n\
\n\
Returns the base-e exponential function of x (e^x).'
        },
        kind: CompletionItemKind.Function,
        label: 'exp'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction floor(x)\n```\n\nmath.floor(x) -> number\n\
\n\
Rounds x downward, returning the largest integer value less than or equal to x.'
        },
        kind: CompletionItemKind.Function,
        label: 'floor'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction frexp(x)\n```\n\nmath.frexp(x) -> number, number\n\
\n\
Breaks x into its binary significand and exponent, returning `significand, exponent` where \
*significand* is an absolute value that lays in the interval [0.5, 1) \
and *exponent* is the integer exponent of 2.\n\
\n\
The significand and exponent are calculated from the expression:\n\
\n\
`x = significand * 2^exponent`'
        },
        kind: CompletionItemKind.Function,
        label: 'frexp'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction ldexp(x, exp)\n```\n\nmath.ldexp(x, exp) -> number\n\
\n\
Returns the result of the following expression:\n\
\n\
`x * 2 ^ exp`'
        },
        kind: CompletionItemKind.Function,
        label: 'ldexp'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction log(x)\n```\n\nmath.log(x) -> number\n\
\n\
Returns the natural logarithm of x.'
        },
        kind: CompletionItemKind.Function,
        label: 'log'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction log10(x)\n```\n\nmath.log10(x) -> number\n\
\n\
Returns the common (base-10) logarithm of x.'
        },
        kind: CompletionItemKind.Function,
        label: 'log10'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction max(...)\n```\n\nmath.max(...) -> number\n\
\n\
Returns the maximum value of its numeric arguments.'
        },
        kind: CompletionItemKind.Function,
        label: 'max'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction min(...)\n```\n\nmath.min(...) -> number\n\
\n\
Returns the minimum value of its numeric arguments.'
        },
        kind: CompletionItemKind.Function,
        label: 'min'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pow(base, exp)\n```\n\nmath.pow(base, exp) -> number\n\
\n\
Returns the result of base raised to the power exp.'
        },
        kind: CompletionItemKind.Function,
        label: 'pow'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction rad(x)\n```\n\nmath.rad(x) -> number\n\
\n\
Convert from degrees to radians and return the result.'
        },
        kind: CompletionItemKind.Function,
        label: 'rad'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction random(x, y)\n```\n\nmath.random([x[, y]]) -> number\n\
\n\
When called without arguments, return a pseudo-random value that lays in the interval [0, 1). When x is specified, \
this interval is [1, x]. When both x and y are specified, the interval is [x, y].'
        },
        kind: CompletionItemKind.Function,
        label: 'random'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction randomseed(x)\n```\n\
\n\
Use the given seed x for the pseudo-random number generator.'
        },
        kind: CompletionItemKind.Function,
        label: 'randomseed'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sin(x)\n```\n\nmath.sin(x) -> number\n\
\n\
Returns the sine of angle x in radians.'
        },
        kind: CompletionItemKind.Function,
        label: 'sin'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sqrt(x)\n```\n\nmath.sqrt(x) -> number\n\
\n\
Return the square root of x. An error is logged if x is negative.'
        },
        kind: CompletionItemKind.Function,
        label: 'sqrt'
    },
    {
        data: ['math'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction tan(x)\n```\n\nmath.tan(x) -> number\n\
\n\
Returns the tangent of angle x in radians.'
        },
        kind: CompletionItemKind.Function,
        label: 'tan'
    },
]

const mathSignatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'math.abs(x)',
        parameters: [
            {
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.acos(x)',
        parameters: [
            {
                documentation: 'A number on the interval [-1, +1].',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.asin(x)',
        parameters: [
            {
                documentation: 'A number on the interval [-1, +1].',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.atan(x)',
        parameters: [
            {
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.atan2(y, x)',
        parameters: [
            {
                documentation: 'A number representing the y-coordinate.',
                label: 'y',
            },
            {
                documentation: 'A number representing the x-coordinate.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.ceil(x)',
        parameters: [
            {
                documentation: 'Number to round upward.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.cos(x)',
        parameters: [
            {
                documentation: 'An angle in radians.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.deg(x)',
        parameters: [
            {
                documentation: 'An angle in radians.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.exp(x)',
        parameters: [
            {
                documentation: 'The exponent to raise e.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.floor(x)',
        parameters: [
            {
                documentation: 'Number to round downward.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.frexp(x)',
        parameters: [
            {
                documentation: 'Number to decompose into a significand and power of 2.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.ldexp(x, exp)',
        parameters: [
            {
                documentation: 'Binary significand.',
                label: 'x',
            },
            {
                documentation: 'Binary exponent.',
                label: 'exp',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.log(x)',
        parameters: [
            {
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.log10(x)',
        parameters: [
            {
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.max(...)',
        parameters: [
            {
                documentation: 'One or more numbers to compare.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.min(...)',
        parameters: [
            {
                documentation: 'One or more numbers to compare.',
                label: '...',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.pow(base, exp)',
        parameters: [
            {
                label: 'base',
            },
            {
                label: 'exp',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.rad(x)',
        parameters: [
            {
                documentation: 'An angle in degrees.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.random(x)',
        parameters: [
            {
                documentation: 'Upper bound of the inclusive interval [1, x].',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.random(x, y)',
        parameters: [
            {
                documentation: 'Lower bound of the inclusive interval [x, y].',
                label: 'x',
            },
            {
                documentation: 'Upper bound of the inclusive interval [x, y].',
                label: 'y',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.randomseed(x)',
        parameters: [
            {
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.sin(x)',
        parameters: [
            {
                documentation: 'An angle in degrees.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.sqrt(x)',
        parameters: [
            {
                documentation: 'A non-negative number.',
                label: 'x',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'math.tan(x)',
        parameters: [
            {
                documentation: 'An angle in degrees.',
                label: 'x',
            },
        ],
    },
]

export function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): CommandSetInterface {
    const resultCompletions: Array<CompletionItem> = new Array()
    const resultSignatures: Array<SignatureInformation> = new Array()

    const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
    if (cmd.children !== undefined) {
        cmd.children.forEach((child: ApiSpec) => {
            cmds.push(child)
        })
    }

    cmds.forEach((cmdItem: ApiSpec) => {
        mathCompletions.forEach((completion: CompletionItem) => {
            if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                resultCompletions.push(completion)
            }
        })

        mathSignatures.forEach((signature: SignatureInformation) => {
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
