/*
 *  Copyright Tektronix Inc.
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

import { Token } from 'antlr4'
// tslint:disable:no-submodule-imports
import { TerminalNode } from 'antlr4/tree/Tree'
// tslint:enable:no-submodule-imports

import { TspFastLexer, TspFastParser } from '../antlr4-tsplang'
import { IToken } from '../decorators'

import { StatementAmbiguity, StatementType } from './statements'
import { Field, FieldType } from './tables'

const whitespace = new RegExp(/\s+/)

export function statementTokenRecognizer(tokens: Array<Token>): StatementType | StatementAmbiguity {
    if (tokens.length === 0) {
        return StatementType.None
    }

    switch (tokens[0].text) {
        case 'do':
            return StatementType.Do
        case 'while':
            return StatementType.While
        case 'repeat':
            return StatementType.Repeat
        case 'if':
            return StatementType.If
        case 'return':
            return StatementType.Return
        case 'break':
            return StatementType.Break
        case 'for':
            return StatementType.For
        case 'function':
            return StatementType.Function
        case 'local':
            // Need a second Token to differentiate between a FunctionLocal and AssignmentLocal.
            if (tokens.length > 1) {
                return (tokens[1].text.localeCompare('function') === 0)
                    ? StatementType.FunctionLocal
                    : StatementType.AssignmentLocal
            }
            else {
                return StatementAmbiguity.LOCAL
            }
        default:
            return StatementAmbiguity.FLOATING_TOKEN
    }
}

export function variableContextRecognizer(context: TspFastParser.VariableContext): Array<Field> {
    if (!(!!context.children)) {
        return []
    }

    /**
     * ```
     * variable: NAME;
     * ```
     */
    if (context.children.length === 1
        && context.children[0] instanceof TerminalNode
        && (context.children[0] as TerminalNode).symbol.type === TspFastLexer.NAME) {
        const itoken = IToken.create((context.children[0] as TerminalNode).symbol)

        return [{
            last: true,
            name: context.getText(),
            tokens: {
                start: itoken,
                stop: itoken
            },
            type: FieldType.Unknown
        }]
    }

    const result = new Array<Field>()
    const parseIndexContext = function(index: TspFastParser.IndexContext, last?: boolean): Field | undefined {
        const extractParenWrappedString = (expression: TspFastParser.ExpressionContext): string | undefined => {
            if (!expression.children || expression.children.length !== 1) {
                return
            }

            const value: TspFastParser.ValueContext = expression.getChild(0, TspFastParser.ValueContext)

            if (value !== null) {
                const stringContext: TspFastParser.StringContext = expression.getChild(0, TspFastParser.StringContext)

                if (stringContext !== null) {
                    return stringContext.getText()
                }

                const childExpr: TspFastParser.ExpressionContext = index.getChild(0, TspFastParser.ExpressionContext)

                if (childExpr !== null) {
                    return extractParenWrappedString(childExpr)
                }
            }

            return
        }
        const fromName = (name: string): Field => {
            return {
                last,
                name,
                tokens: {
                    start: index.start,
                    stop: index.stop
                },
                type: (!!last) ? FieldType.Field : FieldType.Table
            }
        }

        if (!!index.children) {
            const expression: TspFastParser.ExpressionContext = index.getChild(0, TspFastParser.ExpressionContext)

            if (expression === null) {
                const nameNode: TerminalNode = index.getChild(1, TerminalNode)

                return (nameNode === null)
                    ? undefined
                    : fromName(nameNode.getText())
            }

            const nameLiteral = extractParenWrappedString(expression)

            return (nameLiteral === undefined || whitespace.test(nameLiteral))
                ? undefined
                : fromName(nameLiteral)
        }

        return
    }

    // The grammar says this will never return null.
    const prefix: TspFastParser.PrefixContext = context.getChild(0, TspFastParser.PrefixContext)

    /**
     * ```
     * prefix: '(' expression ')';
     * ```
     */
    if (!!prefix.children && prefix.children[0].getText().localeCompare('(') === 0) {
        return []
    }

    /**
     * ```
     * prefix: NAME;
     * ```
     */
    result.push({
        name: prefix.getText(),
        tokens: {
            start: IToken.create(prefix.start),
            stop: IToken.create(prefix.stop)
        },
        type: FieldType.Table
    })

    let i = 0
    let suffix: TspFastParser.SuffixContext = context.getChild(i, TspFastParser.SuffixContext)
    while (suffix !== null) {
        if (!!suffix.children) {
            const indexContext = suffix.getChild(0, TspFastParser.IndexContext)
            /**
             * ```
             * suffix: index;
             * ```
             */
            if (indexContext !== null) {
                const parseResult = parseIndexContext(indexContext)
                if (parseResult !== undefined) {
                    result.push(parseResult)
                }

                i++
                suffix = context.getChild(i, TspFastParser.SuffixContext)
                continue
            }

            const nameNode: TerminalNode = suffix.getChild(1, TerminalNode)
            /**
             * ```
             * suffix: ':' NAME args;
             * ```
             */
            if (nameNode !== null) {
                result.push({
                    name: nameNode.getText(),
                    tokens: {
                        start: suffix.start,
                        stop: suffix.stop
                    },
                    type: FieldType.Function
                })
            }

            /**
             * ```
             * suffix: (':' NAME)? args;
             * ```
             */
            return result
        }
        else {
            return result
        }
    }

    // The grammar says this will never return null.
    const finalIndex: TspFastParser.IndexContext = context.getChild(0, TspFastParser.IndexContext)
    const finalField = parseIndexContext(finalIndex, true)

    if (finalField !== undefined) {
        result.push(finalField)
    }

    return result
}
