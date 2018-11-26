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

export class FuzzyOffsetMap extends Map<number, number> {
    private readonly content: string

    constructor(content: string) {
        super()

        this.content = content
    }

    /**
     * Adds zero or more lexically equivalent (fuzzy) document offsets starting at each of the given offsets.
     * @param offsets Offsets to fuzz.
     */
    fuzz(...offsets: Array<number>): void {
        // Compile a regular expression that matches all horizontal whitespace.
        const horizontalSpaces = new RegExp(/^[ \t]+/)

        for (const offset of offsets) {
            const matches = this.content.slice(offset).match(horizontalSpaces)

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
}
