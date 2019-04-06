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

import { InputStream, Token } from 'antlr4'
import { Position } from 'vscode-languageserver'

import { TspFastLexer } from '../../antlr4-tsplang'
import { IToken } from '../../decorators'
import { TokenUtil } from '../tokenUtil'

interface IntermediateContext {
    parentheses: {
        /**
         * The index within a Token array at which the closing parenthesis can be found.
         */
        closeIndex: number;
        /**
         * The index within a Token array at which the opening parenthesis can be found.
         */
        openIndex: number;
    }
    /**
     * The index within a Token array which coincides with the current cursor position.
     * (The starting position of the Token found at this index is the actual cursor position.)
     */
    pivotIndex: number
    /**
     * The index within a Token array at which the signature starts.
     */
    startIndex: number
}

export interface SignatureContext {
    activeParameter: {
        /**
         * The zero-based index of this parameter in the argument expression list.
         */
        index: number;
        /**
         * The slice indices of Tokens comprising this parameter.
         */
        tokens: {
            end: number;
            start: number;
        };
    }
    /**
     * The slice indices of Tokens comprising the name of the signature.
     */
    name: {
        end: number;
        start: number;
    }
    /**
     * All Tokens that comprise the signature.
     */
    tokens: Array<IToken>
}
export namespace SignatureContext {
    export function create(text: string, position: Position, offset: Position): SignatureContext | undefined {
        const lexer = new TspFastLexer(new InputStream(text))
        const tokens = lexer.getAllTokens().filter((value: Token) => value.channel === 0)

        // Try to find a function call in the given Tokens.
        const relevant = lookaround(tokens, position, offset)

        if (relevant === undefined) {
            return
        }

        // If there are no parameters.
        if (relevant.parentheses.openIndex + 1 === relevant.parentheses.closeIndex) {
            return {
                activeParameter: {
                    index: 0,
                    tokens: { start: 0, end: 0 }
                },
                name: { start: relevant.startIndex, end: relevant.parentheses.openIndex },
                tokens: tokens
                            .slice(relevant.startIndex, relevant.parentheses.closeIndex + 1)
                            .map((value: Token) => IToken.create(value))
            }
        }

        // Find the index of the first comma (',') or opening parenthesis ('(')
        // starting from the pivot index and scanning right-to-left.
        const startingParamIndex = TokenUtil.consumeUntil(
            relevant.pivotIndex,
            tokens,
            (value: Token) => value.text.localeCompare(',') === 0 || value.text.localeCompare('(') === 0,
            false
        // We actually want the index after our search target, so increment the result by one.
        ) + 1

        // Count all commas between the opening parenthesis and our pivot index.
        const activeParameterIndex = TokenUtil.count(
            0,
            tokens.slice(relevant.parentheses.openIndex + 1, relevant.pivotIndex),
            (value: Token) => value.text.localeCompare(',') === 0
        )

        return {
            activeParameter: {
                index: activeParameterIndex,
                tokens: {
                    end: relevant.pivotIndex - relevant.startIndex,
                    start: startingParamIndex - relevant.startIndex
                }
            },
            name: {
                end: relevant.parentheses.openIndex - relevant.startIndex,
                start: 0
            },
            tokens: tokens
                        .slice(relevant.startIndex, relevant.parentheses.closeIndex + 1)
                        .map((value: Token) => IToken.create(value))
        }
    }

    function lookaround(tokens: Array<IToken>, pivot: Position, offset: Position): IntermediateContext | undefined {
        // Get the token index of the first token whose starting position
        // is greater than or equal to the pivot position.
        const pivotIndex = tokens.findIndex((value: IToken) => {
            return value.line - 1 + offset.line >= pivot.line && value.column + offset.character >= pivot.character
        })

        if (pivotIndex === -1) {
            return
        }

        // Check to see if we have an opening parenthesis to our right.
        let closeIndex = pivotIndex
        if (tokens[pivotIndex].text.localeCompare(')') !== 0) {
            closeIndex = TokenUtil.consumeUntil(
                pivotIndex,
                tokens as Array<Token>,
                (value: Token) => value.text.localeCompare(')') === 0
            )
            closeIndex = (closeIndex === pivotIndex) ? undefined : closeIndex
        }

        // Check to see if we have an closing parenthesis to our left.
        let openIndex = pivotIndex - 1
        if (tokens[pivotIndex - 1].text.localeCompare('(') !== 0) {
            openIndex = TokenUtil.consumeUntil(
                pivotIndex - 1,
                tokens as Array<Token>,
                (value: Token) => value.text.localeCompare('(') === 0,
                false
            )
            openIndex = (openIndex === pivotIndex - 1) ? undefined : openIndex
        }

        if (openIndex === undefined || closeIndex === undefined) {
            // This position is not surrounded by parenthesis.
            return
        }

        // Find the index of the first comma (',') or assignment operator ('=')
        // starting from the opening parenthesis and scanning right-to-left.
        const startIndex = TokenUtil.consumeUntil(
            openIndex,
            tokens as Array<Token>,
            (value: Token) => value.text.localeCompare(',') === 0 || value.text.localeCompare('=') === 0,
            false
        // We actually want the index after our search target, so increment the result by one.
        ) + 1

        return {
            pivotIndex,
            parentheses: {
                closeIndex,
                openIndex
            },
            startIndex: (startIndex - 1 === openIndex) ? 0 : startIndex
        }
    }
}
