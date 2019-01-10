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

import { CommonTokenStream, ParserRuleContext, Token } from 'antlr4'
// tslint:disable:no-submodule-imports
import { NoViableAltException, RecognitionException } from 'antlr4/error/Errors'
import { TerminalNode, TerminalNodeImpl } from 'antlr4/tree/Tree'

declare class CorrectNoViableAltException extends NoViableAltException {
    startToken: Token
}

function getTerminalsFromException(
    exception: RecognitionException,
    last?: TerminalNode
): Array<TerminalNode> {
    let startingTokenIndex: number

    if (exception instanceof NoViableAltException) {
        startingTokenIndex = (exception as CorrectNoViableAltException).startToken.tokenIndex
    }
    else {
        return []
    }

    // tslint:disable-next-line:no-any
    const remainingTokens = ((exception.input as any) as CommonTokenStream).tokens.slice(startingTokenIndex)

    const result = new Array<TerminalNode>()

    for (const token of remainingTokens) {
        if (token.type === Token.EOF) {
            break
        }

        if (result.length === 0) {
            if (last === undefined) {
                result.push(new TerminalNodeImpl(token))

                continue
            }

            if (token.line === last.symbol.line) {
                result.push(new TerminalNodeImpl(token))

                continue
            }

            break
        }

        if (token.line === result[result.length - 1].symbol.line) {
            result.push(new TerminalNodeImpl(token))

            continue
        }

        break
    }

    return result
}

export function getTerminals(
    context: ParserRuleContext,
    predicate?: (value: TerminalNode, matches: Array<TerminalNode>) => boolean
): Array<TerminalNode> {
    const recurse = (current: ParserRuleContext, terminals: Array<TerminalNode>): Array<TerminalNode> => {
        let result = new Array<TerminalNode>(...terminals)

        if (current.exception !== null) {
            return result.concat(...getTerminalsFromException(current.exception, result[result.length - 1]))
        }

        for (let i = 0; i < current.getChildCount(); i++) {
            const child = current.getChild(i)

            if (child instanceof TerminalNode) {
                if (predicate === undefined || predicate(child, new Array(...result))) {
                    result.push(child)
                }
            }

            if (child instanceof ParserRuleContext) {
                result = recurse(child, result)
            }
        }

        return result
    }

    return recurse(context, [])
}
