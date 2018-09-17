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
    close: string
    escape?: string
    open: string
}
const parentheses: Pair = { close: ')', open: '(' }
const singleQuotes: Pair = { close: "'", escape: '\\', open: "'" }
const doubleQuotes: Pair = { close: '"', escape: '\\', open: '"' }
const doubleSquareBrackets: Pair = { close: ']]', open: '[[' }

export const getOffsetOfUnmatched = (text: string, char: string, reverse: boolean): number => {
    let offset: number = (reverse) ? text.length : 0

    return -1
}

/**
 * @returns The new offset.
 */
const consumePair = (text: string, offset: number, reverse: boolean): number | undefined => {

}

const isPairStart = (char: string, reverse: boolean): boolean => {
    if (reverse) {
        if (char.localeCompare(parentheses.close) === 0) {
            return true
        }
    }

    return false
}

/**
 * @returns An object containing the next character and the new offset.
 */
const next = (text: string, offset: number, reverse: boolean): Next => {
    return {
        char: text.charAt(offset),
        offset: (reverse) ? offset - 1 : offset + 1
    }
}
