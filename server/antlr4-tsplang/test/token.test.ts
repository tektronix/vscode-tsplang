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
import { Token } from "antlr4ts"
import { expect } from "chai"
import { Range } from "vscode-languageserver"
import "mocha"

import "../src/token"

suite("antlr4-tsplang", function() {
    suite("Token", function() {
        interface SpanTest {
            title: string
            token: {
                /** any integer > -1 */
                charPositionInLine: number
                /** can be a zero-length string */
                text: undefined | null | string
                /** any integer > 0 */
                line: number
            }
            expected: Range
        }

        suite(".getSpan(token)", function() {
            const tests: Array<SpanTest> = [
                {
                    title: "handles undefined token.text value",
                    token: { charPositionInLine: 0, text: undefined, line: 1 },
                    expected: {
                        end: { character: 0, line: 0 },
                        start: { character: 0, line: 0 },
                    },
                },
                {
                    title: "handles null token.text value",
                    token: { charPositionInLine: 0, text: null, line: 1 },
                    expected: {
                        end: { character: 0, line: 0 },
                        start: { character: 0, line: 0 },
                    },
                },
                {
                    title: "handles empty string token.text value",
                    token: { charPositionInLine: 0, text: "", line: 1 },
                    expected: {
                        end: { character: 0, line: 0 },
                        start: { character: 0, line: 0 },
                    },
                },
                // TODO
            ]

            tests.forEach((value: SpanTest) => {
                test(value.title, function() {
                    expect(Token.getSpan(value.token as Token)).to.deep.equal(
                        value.expected
                    )
                })
            })
        })
    })
})
