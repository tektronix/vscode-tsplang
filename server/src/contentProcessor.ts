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

interface Next {
    char: string
    offset: number
}

interface Pair {
    escape?: string
    close(reverse: boolean): string
    open(reverse: boolean): string
}

export const parentheses: Pair = {
    close: (reverse: boolean): string => {
        return (reverse) ? '(' : ')'
    },
    open: (reverse: boolean): string => {
        return (reverse) ? ')' : '('
    }
}

export const singleQuotes: Pair = {
    close: (reverse: boolean): string => {
        return "'"
    },
    escape: '\\',
    open: (reverse: boolean): string => {
        return "'"
    }
}

export const doubleQuotes: Pair = {
    close: (reverse: boolean): string => {
        return '"'
    },
    escape: '\\',
    open: (reverse: boolean): string => {
        return '"'
    }
}

export const doubleSquareBrackets: Pair = {
    close: (reverse: boolean): string => {
        return (reverse) ? '[[' : ']]'
    },
    open: (reverse: boolean): string => {
        return (reverse) ? ']]' : '[['
    }
}

export const getOffsetOfUnmatched = (text: string, type: Pair, reverse: boolean): number | undefined => {
    const offset = (reverse) ? text.length - 1 : 0
    let state: Next = {
        offset,
        char: text.charAt(offset)
    }

    do {
        let foundType: Pair | undefined

        const index1 = (reverse) ? 1 : 0

        if (state.char.localeCompare(type.close(reverse)) === 0) {
            return state.offset
        }
        else if (state.char.localeCompare(doubleQuotes.open(reverse)) === 0) {
            foundType = doubleQuotes
        }
        else if (state.char.localeCompare(doubleSquareBrackets.open(reverse)[index1]) === 0) {
            const index2 = (reverse) ? 0 : 1

            // Lookahead check to see if the next character is also an open square bracket.
            if (peek(text, state.offset, reverse).localeCompare(doubleSquareBrackets.open(reverse)[index2]) === 0) {
                foundType = doubleSquareBrackets
            }
        }
        else if (state.char.localeCompare(singleQuotes.open(reverse)) === 0) {
            foundType = singleQuotes
        }
        else if (state.char.localeCompare(parentheses.open(reverse)) === 0) {
            foundType = parentheses
        }

        if (foundType !== undefined) {
            state.offset = consumePair(text, state.offset, foundType, reverse)
        }

        state = next(text, state.offset, reverse)

    } while (state.char.localeCompare('') !== 0)

    return
}

/**
 * @returns The new offset.
 */
function consumePair(text: string, offset: number, type: Pair, reverse: boolean): number {
    let lastCharWasEscape = false
    let state: Next = {
        offset,
        char: text.charAt(offset)
    }

    do {

        state = next(text, state.offset, reverse)

        if (reverse && type.escape !== undefined) {
            lastCharWasEscape = (peek(text, state.offset, reverse).localeCompare(type.escape) === 0)
        }

        const index1 = (reverse && type.close(reverse).length > 1) ? 1 : 0
        const index2 = (reverse) ? 0 : 1

        if (state.char.localeCompare(type.close(reverse)[index1]) === 0 && !lastCharWasEscape) {
            // If the closing string is more than 1 character.
            if (type.close(reverse).length > 1) {
                // Lookahead check to see if the next character also matches the closing character.
                if (peek(text, state.offset, reverse).localeCompare(type.close(reverse)[index2]) === 0) {
                    state = next(text, state.offset, reverse)

                    return state.offset
                }
            }
            else {
                return state.offset
            }
        }

        let recurseType: Pair | undefined

        if (state.char.localeCompare(doubleQuotes.open(reverse)) === 0) {
            // If we are not inside double square brackets and we are not inside single quotes.
            if (type.open(reverse).localeCompare(doubleSquareBrackets.open(reverse)) !== 0
                && type.open(reverse).localeCompare(singleQuotes.open(reverse)) !== 0) {
                recurseType = doubleQuotes
            }
        }
        else if (state.char.localeCompare(doubleSquareBrackets.open(reverse)[index1]) === 0) {
            if (peek(text, state.offset, reverse).localeCompare(doubleSquareBrackets.open(reverse)[index2]) === 0) {
                // If we are not inside double quotes and we are not inside single quotes.
                if (type.open(reverse).localeCompare(doubleQuotes.open(reverse)) !== 0
                    && type.open(reverse).localeCompare(singleQuotes.open(reverse)) !== 0) {
                    recurseType = doubleSquareBrackets
                }
            }
        }
        else if (state.char.localeCompare(parentheses.open(reverse)) === 0) {
            // If we are not inside double quotes,
            // and we are not inside double square brackets,
            // and we are not inside single quotes.
            if (type.open(reverse).localeCompare(doubleQuotes.open(reverse)) !== 0
                && type.open(reverse).localeCompare(doubleSquareBrackets.open(reverse)) !== 0
                && type.open(reverse).localeCompare(singleQuotes.open(reverse)) !== 0) {
                recurseType = parentheses
            }
        }
        else if (state.char.localeCompare(singleQuotes.open(reverse)) === 0) {
            // If we are not inside double quotes and we are not inside double square brackets
            if (type.open(reverse).localeCompare(doubleQuotes.open(reverse)) !== 0
                && type.open(reverse).localeCompare(doubleSquareBrackets.open(reverse)) !== 0) {
                recurseType = singleQuotes
            }
        }

        if (recurseType !== undefined && !lastCharWasEscape) {
            state.offset = consumePair(text, state.offset, recurseType, reverse)
            state.char = text.charAt(state.offset)
        }

        if (type.escape !== undefined) {
            lastCharWasEscape = (state.char.localeCompare(type.escape) === 0)
        }

    } while (state.char.localeCompare('') !== 0)

    return offset
}

/**
 * @returns An object containing the next character and the new offset.
 */
const next = (text: string, offset: number, reverse: boolean): Next => {
    const newOffset = (reverse) ? offset - 1 : offset + 1

    return {
        char: text.charAt(newOffset),
        offset: newOffset
    }
}

/**
 * @returns The character at the next offset.
 */
const peek = (text: string, offset: number, reverse: boolean): string => {
    return text.charAt((reverse) ? offset - 1 : offset + 1)
}
