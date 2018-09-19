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
    let state: Next = {
        char: '',
        offset: (reverse) ? text.length - 1 : 0
    }

    do {
        let foundType: Pair | undefined

        state = next(text, state.offset, reverse)

        if (state.char.localeCompare(type.close(reverse)) === 0) {
            return state.offset
        }
        else if (state.char.localeCompare(singleQuotes.open(reverse)) === 0) {
            foundType = singleQuotes
            state.offset = consumePair(text, state.offset, singleQuotes, reverse)
        }
        else if (state.char.localeCompare(doubleQuotes.open(reverse)) === 0) {
            foundType = doubleQuotes
            state.offset = consumePair(text, state.offset, doubleQuotes, reverse)
        }
        else if (state.char.localeCompare(doubleSquareBrackets.open(reverse)[0]) === 0) {
            // lookahead check to see if the next character is also an open square bracket
            if (peek(text, state.offset, reverse).localeCompare(doubleSquareBrackets.open(reverse)[0]) === 0) {
                foundType = doubleSquareBrackets
                state = next(text, state.offset, reverse)
            }
        }

        if (foundType !== undefined) {
            state.offset = consumePair(text, state.offset, foundType, reverse)
        }

    } while (state.char.localeCompare('') === 0)

    return
}

/**
 * @returns The new offset.
 */
const consumePair = (text: string, offset: number, type: Pair, reverse: boolean): number => {
    let lastCharWasEscape = false
    let state: Next = {
        offset,
        char: ''
    }

    do {
        state = next(text, state.offset, false)

        if (state.char.localeCompare(type.close(reverse)) === 0 && !lastCharWasEscape) {
            return state.offset
        }

        if (type.escape !== undefined) {
            lastCharWasEscape = (state.char.localeCompare(type.escape) === 0)
        }

    } while (state.char.localeCompare('') === 0)

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
