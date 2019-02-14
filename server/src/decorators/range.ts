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
import * as vsls from 'vscode-languageserver'

import { TokenUtil } from '../language-comprehension'

export declare type Range = vsls.Range
export namespace Range {
    /**
     * Compares Range `a` to Range `b`.
     *
     * If `a` falls within `b`, then it is considered equal.
     *
     * @param a The left-hand side of the comparison.
     * @param b The right-hand side of the comparison.
     * @returns -1 if `a < b`, 0 if `a == b`, and +1 if `a > b`.
     * @throws If `a` overlaps `b`.
     */
    export function compare(a: Range, b: Range): number {
        if (Range.within(a, b)) {
            return 0
        }

        const start: vsls.Position = {
            character: a.start.character - b.start.character,
            line: a.start.line - b.start.line
        }
        const end: vsls.Position = {
            character: a.end.character - b.end.character,
            line: a.end.line - b.end.line
        }

        const resolvedStart = (start.line === 0) ? start.character : start.line
        const resolvedEnd = (end.line === 0) ? end.character : end.line

        if (resolvedStart < 0 && resolvedEnd < 0) {
            return -1
        }
        else if (resolvedStart > 0 && resolvedEnd > 0) {
            return 1
        }
        else {
            throw Error(`Cannot compare overlapping Ranges ${JSON.stringify(a)} and ${JSON.stringify(b)}`)
        }
    }

    /**
     * Get the delta of Position to Range.
     * @param position The final Position of the delta calculation.
     * @param range The initial Positions of the delta calculation.
     * @return A Range whose Positions are relative distances from the given Position.
     */
    export function delta(position: vsls.Position, range: Range): Range {
        return {
            end: {
                character: range.end.character - position.character,
                line: range.end.character - position.line
            },
            start: {
                character: range.start.character - position.character,
                line: range.start.line - position.line
            }
        }
    }

    export const is = vsls.Range.is

    /**
     * Determine if the Position/Range lies within Range.
     * @param value The Position/Range to check.
     * @param range The Range to check.
     * @returns True if Position/Range lies within Range and false otherwise.
     */
    export function within(value: vsls.Position | Range | Token, range: Range): boolean {
        if (Range.is(value)) {
            return within(value.start, range) || within(value.end, range)
        }
        else if (value instanceof Token) {
            return within(TokenUtil.getRange(value, value), range)
        }

        // Within lower bound.
        return ((value.character >= range.start.character && value.line >= range.start.line)
            // And within upper bound.
            && (value.character <= range.end.character && value.line <= range.end.line))
    }
}
