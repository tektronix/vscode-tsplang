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

import { doubleQuotes, doubleSquareBrackets, Pair, parentheses, singleQuotes } from './lua/pair'

interface Next {
    char: string
    offset: number
}

/**
 * @param openParenOffset - The zero-based index of the signature's opening parenthesis.
 * @param closeParenOffset - The zero-based index of the signature's closing parenthesis.
 */
export const getActiveParameter = (
    text: string,
    cursorOffset: number,
    openParenOffset: number,
    closeParenOffset: number
): number => {
    const commaIndices: Array<number> = new Array()
    const searchString = text.slice(openParenOffset + 1, closeParenOffset)
    let state: Next = {
        char: searchString.charAt(0),
        offset: 0
    }

    do {
        if (state.char.localeCompare(',') === 0) {
            commaIndices.push(state.offset + openParenOffset + 1)
        }

        if (isPairStart(searchString, state.offset, false)) {
            const foundType = getPair(searchString, state.offset, false)

            if (foundType !== undefined) {
                state.offset = consumePair(searchString, state.offset, foundType, false)
            }
        }

        state = next(searchString, state.offset, false)

    } while (state.char.localeCompare('') !== 0)

    // The zero-based index of the parameter to highlight and show documentation for
    let result = 0

    // For each comma index, increment the active parameter until the current offset
    // is greater than the current comma index.
    commaIndices.forEach((index: number) => {
        if (cursorOffset > index) {
            result++
        }
        else {
            return
        }
    })

    return result
}

export const getOffsetOfUnmatched = (text: string, type: Pair, reverse: boolean): number | undefined => {
    const offset = (reverse) ? text.length - 1 : 0
    let state: Next = {
        offset,
        char: text.charAt(offset)
    }

    do {
        if (state.char.localeCompare(getClose(type, reverse)) === 0) {
            return state.offset
        }

        if (isPairStart(text, state.offset, reverse)) {
            const foundType = getPair(text, state.offset, reverse)

            if (foundType !== undefined) {
                state.offset = consumePair(text, state.offset, foundType, reverse)
            }
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

        const index1 = (reverse && getClose(type, reverse).length > 1) ? 1 : 0
        const index2 = (reverse) ? 0 : 1

        if (state.char.localeCompare(getClose(type, reverse)[index1]) === 0 && !lastCharWasEscape) {
            // If the closing string is more than 1 character.
            if (getClose(type, reverse).length > 1) {
                // Lookahead check to see if the next character also matches the closing character.
                if (peek(text, state.offset, reverse).localeCompare(getClose(type, reverse)[index2]) === 0) {
                    state = next(text, state.offset, reverse)

                    return state.offset
                }
            }
            else {
                return state.offset
            }
        }

        let recurseType: Pair | undefined

        if (state.char.localeCompare(getOpen(doubleQuotes, reverse)) === 0) {
            // If we are not inside double square brackets and we are not inside single quotes.
            if (getOpen(type, reverse).localeCompare(getOpen(doubleSquareBrackets, reverse)) !== 0
                && getOpen(type, reverse).localeCompare(getOpen(singleQuotes, reverse)) !== 0) {
                recurseType = doubleQuotes
            }
        }
        else if (state.char.localeCompare(getOpen(doubleSquareBrackets, reverse)[index1]) === 0) {
            if (peek(text, state.offset, reverse).localeCompare(getOpen(
                doubleSquareBrackets,
                reverse)[index2]) === 0
            ) {
                // If we are not inside double quotes and we are not inside single quotes.
                if (getOpen(type, reverse).localeCompare(getOpen(doubleQuotes, reverse)) !== 0
                    && getOpen(type, reverse).localeCompare(getOpen(singleQuotes, reverse)) !== 0) {
                    recurseType = doubleSquareBrackets
                }
            }
        }
        else if (state.char.localeCompare(getOpen(parentheses, reverse)) === 0) {
            // If we are not inside double quotes,
            // and we are not inside double square brackets,
            // and we are not inside single quotes.
            if (getOpen(type, reverse).localeCompare(getOpen(doubleQuotes, reverse)) !== 0
                && getOpen(type, reverse).localeCompare(getOpen(doubleSquareBrackets, reverse)) !== 0
                && getOpen(type, reverse).localeCompare(getOpen(singleQuotes, reverse)) !== 0) {
                recurseType = parentheses
            }
        }
        else if (state.char.localeCompare(getOpen(singleQuotes, reverse)) === 0) {
            // If we are not inside double quotes and we are not inside double square brackets
            if (getOpen(type, reverse).localeCompare(getOpen(doubleQuotes, reverse)) !== 0
                && getOpen(type, reverse).localeCompare(getOpen(doubleSquareBrackets, reverse)) !== 0) {
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

const getClose = (type: Pair, reverse: boolean): string => {
    return (reverse) ? type.open : type.close
}

const getOpen = (type: Pair, reverse: boolean): string => {
    return (reverse) ? type.close : type.open
}

const getPair = (text: string, offset: number, reverse: boolean): Pair | undefined => {
    const char = text.charAt(offset)
    const index1 = (reverse) ? 1 : 0

    if (char.localeCompare(getOpen(doubleQuotes, reverse)) === 0) {
        return doubleQuotes
    }
    else if (char.localeCompare(getOpen(doubleSquareBrackets, reverse)[index1]) === 0) {
        const index2 = (reverse) ? 0 : 1
        if (peek(text, offset, reverse).localeCompare(getOpen(doubleSquareBrackets, reverse)[index2]) === 0) {
            return doubleSquareBrackets
        }
    }
    else if (char.localeCompare(getOpen(parentheses, reverse)) === 0) {
        return parentheses
    }
    else if (char.localeCompare(getOpen(singleQuotes, reverse)) === 0) {
        return singleQuotes
    }

    /* istanbul ignore next */
    return
}

const isPairStart = (text: string, offset: number, reverse: boolean): boolean => {
    const char = text.charAt(offset)
    const index1 = (reverse) ? 1 : 0

    if (char.localeCompare(getOpen(doubleQuotes, reverse)) === 0
        || char.localeCompare(getOpen(parentheses, reverse)) === 0
        || char.localeCompare(getOpen(singleQuotes, reverse)) === 0) {
        return true
    }
    else if (char.localeCompare(getOpen(doubleSquareBrackets, reverse)[index1]) === 0) {
        const index2 = (reverse) ? 0 : 1
        if (peek(text, offset, reverse).localeCompare(getOpen(doubleSquareBrackets, reverse)[index2]) === 0) {
            return true
        }
    }

    return false
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
