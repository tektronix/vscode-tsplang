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
import { ANTLRInputStream } from "antlr4ts"
import { expect } from "chai"
import "mocha"

import { TspLexer } from "../out/TspLexer.generated"

import { ERROR_THROWER, ErrorValidator } from "./errorListener.fixture"
import { flatten, nameExtractor, RecursiveStringArray, typeExtractor } from "./lexer.fixture"

// Test Template
interface LexTest {
    name: string
    content: string
    tokenNames: RecursiveStringArray
    tsp1: boolean
    expectFail?: {
        line: number
        /**
         * Position starts from zero and applies to the character immediately following.
         *
         * For example, the string "abcdefg" would have the following positions:
         * ```text
         *|0  |2  |4  |6
         *|a|b|c|d|e|f|g
         *  |1  |3  |5
         * ```
         */
        charPositionInLine: number
        msgContains: string[]
    }
}

describe("antlr4-tsplang", function() {
    describe("TspLexer", function() {
        // Test against all tokens, including tokens on the HIDDEN channel.
        describe("all channels", function() {
            new Array<LexTest>(
                ...[
                    {
                        name: 'Tokenizes the "or" keyword',
                        content: "x or y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "OR", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes the "and" keyword',
                        content: "x and y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "AND", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes the "~=" operator',
                        content: "x ~= y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "NE", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                    },
                    // #region @neq
                    {
                        name: 'Tokenizes the "!=" operator',
                        content: "x != y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "NE", "HORIZONTAL_WS", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the "!=" operator',
                        content: "x != y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "NE", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 2,
                            msgContains: ["token recognition", "!"],
                        },
                    },
                    // #endregion @neq
                    // #region @bitor
                    {
                        name: 'Tokenizes the "|" (bitwise OR) operator',
                        content: "x | y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_OR", "HORIZONTAL_WS", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the "|" (bitwise OR) operator',
                        content: "x | y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_OR", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 2,
                            msgContains: ["token recognition", "|"],
                        },
                    },
                    // #endregion @bitor
                    // #region @bitxor
                    {
                        name: 'Tokenizes the "^^" (bitwise XOR) operator',
                        content: "x ^^ y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_XOR", "HORIZONTAL_WS", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the "^^" (bitwise XOR) operator',
                        content: "x ^^ y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_XOR", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 2,
                            msgContains: ["token recognition", "^"],
                        },
                    },
                    // #endregion @bitxor
                    // #region @bitand
                    {
                        name: 'Tokenizes the "&" (bitwise AND) operator',
                        content: "x & y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_AND", "HORIZONTAL_WS", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the "&" (bitwise AND) operator',
                        content: "x & y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_AND", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 2,
                            msgContains: ["token recognition", "&"],
                        },
                    },
                    // #endregion @bitand
                    // #region @bitleftshift
                    {
                        name: 'Tokenizes the "<<" (bitwise left shift) operator',
                        content: "x << y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_LS", "HORIZONTAL_WS", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the "<<" (bitwise left shift) operator',
                        content: "x << y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_LS", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 2,
                            msgContains: ["token recognition", "<"],
                        },
                    },
                    // #endregion @bitleftshift
                    // #region @bitrightshift
                    {
                        name: 'Tokenizes the ">>" (bitwise right shift) operator',
                        content: "x >> y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_RS", "HORIZONTAL_WS", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the ">>" (bitwise right shift) operator',
                        content: "x >> y",
                        tokenNames: ["NAME", "HORIZONTAL_WS", "BIT_RS", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 2,
                            msgContains: ["token recognition", ">"],
                        },
                    },
                    // #endregion @bitrightshift
                    // #region @logicalnot
                    {
                        name: 'Tokenizes the "!" (logical NOT) operator',
                        content: "!x",
                        tokenNames: ["LOGICAL_NOT", "NAME"],
                        tsp1: false,
                    },
                    {
                        name: 'TSP1 does not tokenize the "!" (logical NOT) operator',
                        content: "!x",
                        tokenNames: ["LOGICAL_NOT", "NAME"],
                        tsp1: true,
                        expectFail: {
                            line: 1,
                            charPositionInLine: 0,
                            msgContains: ["token recognition", "!"],
                        },
                    },
                    // #endregion @logicalnot
                    {
                        name: 'Tokenizes boolean "true"',
                        content: "true",
                        tokenNames: ["BOOLEAN"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes boolean "false"',
                        content: "false",
                        tokenNames: ["BOOLEAN"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes "local" keyword',
                        content: "local x",
                        tokenNames: ["LOCAL", "HORIZONTAL_WS", "NAME"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes "..." (vararg) keyword',
                        content: "...",
                        tokenNames: ["VARARG"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes long strings (surrounded by "[[...]]")',
                        content: "[[String with some\nnewlines and\nsuch]]",
                        tokenNames: ["LONGSTRING"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes long commments (surrounded by "--[[...]]")',
                        content: "--[[String with\nsome newlines and\nsuch]]",
                        tokenNames: ["LONGCOMMENT"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes line commments (started by "--...")',
                        content: "--Single line comment\n",
                        tokenNames: ["LINE_COMMENT"],
                        tsp1: true,
                    },
                    {
                        name: 'Tokenizes shebang line (started by "#!")',
                        content: "#!shebang text",
                        tokenNames: ["SHEBANG"],
                        tsp1: true,
                    },
                ]
            ).forEach(test => {
                it(test.name, (done: Mocha.Done) => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspLexer(inputStream)
                    lexer.tsp1 = test.tsp1
                    if (!test.expectFail) {
                        lexer.addErrorListener(ERROR_THROWER)

                        const expected = flatten(test.tokenNames)
                        const actual = lexer
                            .getAllTokens()
                            .map(typeExtractor)
                            .map(nameExtractor.bind(lexer))

                        expect(actual).deep.equals(expected)
                        done()
                    } else {
                        lexer.removeErrorListeners()
                        lexer.addErrorListener(
                            new ErrorValidator(done, (line, charPositionInLine, msg) => {
                                expect(line).to.equal(test.expectFail.line)
                                expect(charPositionInLine).to.equal(test.expectFail.charPositionInLine)
                                test.expectFail.msgContains.forEach(substring => {
                                    expect(msg).to.contain(substring)
                                })
                            })
                        )

                        lexer.getAllTokens()
                    }
                })
            })
        })
    })
})
