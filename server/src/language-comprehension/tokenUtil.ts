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
import { Position, Range } from 'vscode-languageserver'

export namespace TokenUtil {
    /**
     * Checks if the Token has the possibility of closing pair according to TSP syntax.
     * @param token The Token to check.
     * @returns True if the Token a member of a syntactic Token pair and false otherwise.
     */
    export function consumable(token: Token): boolean {
        return (token.text.localeCompare('(') === 0
            || token.text.localeCompare('[') === 0
            || token.text.localeCompare('{') === 0)
    }

    export function consumeExpressionFunction(index: number, tokens: Array<Token>): number {
        if (index >= tokens.length) {
            throw new Error(
                `Zero-based index ${index} is greater than the length of the given array (${tokens.length}).`
            )
        }

        const offset = (tokens[index].text.localeCompare('(') === 0) ? 1 : 0

        if (index + offset >= tokens.length || index + offset + 1 >= tokens.length) {
            return index
        }

        if (tokens[index + offset].text.localeCompare('function') !== 0
            || tokens[index + offset + 1].text.localeCompare('(') !== 0) {

            return index
        }

        let endSkips = 0

        let currentIndex = consumePair(index + offset + 1, tokens)
        for (; tokens.length; currentIndex++) {
            switch (tokens[currentIndex].text) {
                case 'do':
                case 'while':
                case 'if':
                case 'for':
                case 'function':
                    endSkips++
                    continue
            }

            if (tokens[currentIndex].text.localeCompare('end') === 0) {
                if (endSkips > 0) {
                    endSkips--
                    continue
                }

                break
            }
        }

        return (currentIndex === tokens.length) ? index : currentIndex
    }

    /**
     * Advances the given index to the index of its pairing token.
     * @param index The index of the pair-able Token.
     * @param tokens An array of source Tokens.
     * @returns The index of the pairing Token or the original index if a partner character was not found before
     * the end of the given token array or if the given token is not pairable.
     * @throws If the given index is greater than the list of tokens.
     */
    export function consumePair(index: number, tokens: Array<Token>): number {
        if (index >= tokens.length) {
            throw new Error(
                `Zero-based index ${index} is greater than the length of the given array (${tokens.length}).`
            )
        }

        const openingToken = tokens[index]

        if (!consumable(openingToken)) {
            return index
        }

        let currentIndex = index + 1
        for (; currentIndex < tokens.length; currentIndex++) {
            const currentToken = tokens[currentIndex]

            if (partners(openingToken, currentToken)) {
                break
            }

            if (consumable(currentToken)) {
                currentIndex = consumePair(currentIndex, tokens)
            }
        }

        return (currentIndex === tokens.length) ? index : currentIndex
    }

    /**
     * Advances the given index until the predicate is true.
     * @param index The starting index.
     * @param tokens An array of source Tokens.
     * @param predicate A callback that returns true when the target token has been reached and false otherwise.
     * @returns The target index or the original index if the first token matches the predicate or if the predicate
     * did not return true before the end of the given token array.
     * @throws If the given index is greater than the list of tokens.
     */
    export function consumeUntil(index: number, tokens: Array<Token>, predicate: (value: Token) => boolean): number {
        if (index >= tokens.length) {
            throw new Error(
                `Zero-based index ${index} is greater than the length of the given array (${tokens.length}).`
            )
        }

        let currentIndex = index
        for (; currentIndex < tokens.length; currentIndex++) {
            if (predicate(tokens[currentIndex])) {
                break
            }

            currentIndex = consumePair(currentIndex, tokens)
        }

        return (currentIndex === tokens.length) ? index : currentIndex
    }

    /**
     * Compares the spacial properties of two Tokens to determine their equality.
     */
    export function equal(a: Token, b: Token): boolean {
        return (a.start === b.start) && (a.stop === b.stop)
    }

    /**
     * Get a string representing the given tokens or undefined if no Tokens were given.
     * @param tokens The Tokens whose text should comprise the string.
     * @returns A string or undefined if no tokens were supplied.
     */
    export function getString(...tokens: Array<Token>): string | undefined {
        let result: string | undefined

        for (const t of tokens) {
            result = (result === undefined) ? t.text : result + t.text
        }

        return result
    }

    /**
     * Extract a Position from the given Token.
     * @param token The target Token.
     * @param offset An optional offset. Passing the text length of the given
     * Token will produce that Token's ending Position.
     * @returns The Position of the given Token.
     */
    export function getPosition(token: Token, offset: number = 0): Position {
        return {
            character: token.column + offset,
            line: token.line - 1
        }
    }

    export function getRange(start: Token, stop: Token): Range {
        if (start.line === stop.line) {
            return {
                end: {
                    character: start.column + ((stop.stop + 1) - start.start),
                    line: stop.line - 1
                },
                start: {
                    character: start.column,
                    line: start.line - 1
                }
            }
        }
        else {
            return {
                end: getPosition(stop, stop.text.length),
                start: getPosition(start)
            }
        }
    }

    /**
     * Determines if the two Tokens form a pair.
     * @param single The consumable Token that needs a partner.
     * @param suitor A potential Token partner.
     * @returns True when the Tokens form a pair and false otherwise.
     */
    function partners(single: Token, suitor: Token): boolean {
        return ((single.text.localeCompare('(') === 0 && suitor.text.localeCompare(')') === 0)
            || (single.text.localeCompare('[') === 0 && suitor.text.localeCompare(']') === 0)
            || (single.text.localeCompare('{') === 0 && suitor.text.localeCompare('}') === 0))
    }
}
