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

import { Range, TextDocument } from 'vscode-languageserver'

/**
 * A Map used as a lookup table for the document offset of various contexts.
 * Keyed to a lexically equivalent offset of the original context offset. The
 * associated key-value is that original offset.
 *
 * **TODO:** we only consider horizontal whitespace to be lexically equivalent
 * for now. This should change eventually.
 */
export class FuzzyOffsetMap extends Map<number, number> {
    private readonly horizontalSpaces: RegExp

    constructor() {
        super()

        // Compile a regular expression that matches all horizontal whitespace.
        this.horizontalSpaces = new RegExp(/^[ \t]+/)
    }

    /**
     * Adds zero or more lexically equivalent (fuzzy) document offsets starting at each of the given offsets.
     * @param content The string used to check for lexical equivalence.
     * @param offsets Offsets to fuzz.
     */
    fuzz(content: string, ...offsets: Array<number>): void {
        for (const offset of offsets) {
            const matches = content.slice(offset).match(this.horizontalSpaces)

            // No matches were found.
            if (matches === null) {
                return
            }

            const match = matches.shift()

            if (match === undefined) {
                return
            }

            // For each horizontal whitespace character...
            for (let i = 0; i < match.length; i++) {
                // ...add its offset as a key that points to the original offset.
                this.set(offset + i + 1, offset)
            }
        }
    }

    /**
     * Adds all document offsets in each range.
     * @param document A TextDocument to use for Range conversions.
     * @param ranges Ranges to fuzz.
     */
    fuzzRange(document: TextDocument, ...ranges: Array<Range>): void {
        for (const range of ranges) {
            // Recurse with each line as a distinct range if the Range spans multiple lines.
            if (range.start.line !== range.end.line) {
                // Range from the starting position to the end of the start line.
                this.fuzzRange(document, Range.create(
                    range.start.line,
                    range.start.character,
                    range.start.line,
                    Number.MAX_VALUE
                ))

                for (let i = range.start.line + 1; i < range.end.line; i++) {
                    // Range from the start of the line to the end of the line.
                    this.fuzzRange(document, Range.create(i, 0, i, Number.MAX_VALUE))
                }

                // Range from the start of the end line to the ending position.
                this.fuzzRange(document, Range.create(
                    range.end.line,
                    0,
                    range.end.line,
                    range.end.character
                ))
            }

            const offset = document.offsetAt(range.start)
            const length = document.getText(range).length

            // For all characters except vertical whitespace characters...
            for (let i = 0; i < length; i++) {
                // ...add its offset as a key that points to the original offset.
                this.set(offset + i + 1, offset)
            }
        }
    }
}
