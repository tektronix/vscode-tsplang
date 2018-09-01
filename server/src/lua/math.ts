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
Returns the base-e exponential function of x (e<sup>x</sup>).'
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
The significand and exponent are calculated from the expression: <code>x = significand * 2<sup> exponent</sup></code>'
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
Returns the result of the following expression: <code>x * 2<sup> exp</sup></code>'
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
    SignatureInformation.create(
        'math.abs(x)',
        undefined,
        ParameterInformation.create(
            'x'
        ),
    ),
    SignatureInformation.create(
        'math.acos(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'A number on the interval [-1, +1].'
        ),
    ),
    SignatureInformation.create(
        'math.asin(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'A number on the interval [-1, +1].'
        ),
    ),
    SignatureInformation.create(
        'math.atan(x)',
        undefined,
        ParameterInformation.create(
            'x'
        ),
    ),
    SignatureInformation.create(
        'math.atan2(y, x)',
        undefined,
        ParameterInformation.create(
            'y',
            'A number representing the y-coordinate.'
        ),
        ParameterInformation.create(
            'x',
            'A number representing the x-coordinate.'
        ),
    ),
    SignatureInformation.create(
        'math.ceil(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'Number to round upward.'
        ),
    ),
    SignatureInformation.create(
        'math.cos(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'An angle in radians.'
        ),
    ),
    SignatureInformation.create(
        'math.deg(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'An angle in radians.'
        ),
    ),
    SignatureInformation.create(
        'math.exp(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'The exponent to raise e.'
        ),
    ),
    SignatureInformation.create(
        'math.floor(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'Number to round downward.'
        ),
    ),
    SignatureInformation.create(
        'math.frexp(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'Number to decompose into a significand and power of 2.'
        ),
    ),
    SignatureInformation.create(
        'math.ldexp(x, exp)',
        undefined,
        ParameterInformation.create(
            'x',
            'Binary significand.'
        ),
        ParameterInformation.create(
            'exp',
            'Binary exponent.'
        ),
    ),
    SignatureInformation.create(
        'math.log(x)',
        undefined,
        ParameterInformation.create(
            'x'
        ),
    ),
    SignatureInformation.create(
        'math.log10(x)',
        undefined,
        ParameterInformation.create(
            'x'
        ),
    ),
    SignatureInformation.create(
        'math.max(...)',
        undefined,
        ParameterInformation.create(
            '...',
            'One or more numbers to compare.'
        ),
    ),
    SignatureInformation.create(
        'math.min(...)',
        undefined,
        ParameterInformation.create(
            '...',
            'One or more numbers to compare.'
        ),
    ),
    SignatureInformation.create(
        'math.pow(base, exp)',
        undefined,
        ParameterInformation.create(
            'base'
        ),
        ParameterInformation.create(
            'exp'
        ),
    ),
    SignatureInformation.create(
        'math.rad(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'An angle in degrees.'
        ),
    ),
    SignatureInformation.create(
        'math.random(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'Upper bound of the inclusive interval [1, x].'
        ),
    ),
    SignatureInformation.create(
        'math.random(x, y)',
        undefined,
        ParameterInformation.create(
            'x',
            'Lower bound of the inclusive interval [x, y].'
        ),
        ParameterInformation.create(
            'y',
            'Upper bound of the inclusive interval [x, y].'
        ),
    ),
    SignatureInformation.create(
        'math.randomseed(x)',
        undefined,
        ParameterInformation.create(
            'x'
        ),
    ),
    SignatureInformation.create(
        'math.sin(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'An angle in degrees.'
        ),
    ),
    SignatureInformation.create(
        'math.sqrt(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'A non-negative number.'
        ),
    ),
    SignatureInformation.create(
        'math.tan(x)',
        undefined,
        ParameterInformation.create(
            'x',
            'An angle in degrees.'
        ),
    ),
]

export async function getMathCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(mathCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getMathSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(mathSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
