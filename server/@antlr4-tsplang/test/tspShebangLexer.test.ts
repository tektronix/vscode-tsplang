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

import { TspShebangLexer } from "../out/TspShebangLexer.generated"

import { ERROR_THROWER, ErrorValidator } from "./errorListener.fixture"
import { flatten, nameExtractor, RecursiveStringArray, typeExtractor } from "./lexer.fixture"

// Test Template
interface LexTest {
    name: string
    content: string
    tokenNames: RecursiveStringArray
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
    describe("TspShebangLexer", function() {
        // Test against all tokens, including tokens on the HIDDEN channel.
        describe("all channels", function() {
            new Array<LexTest>(
                ...[
                    {
                        name: "Tokenizes an empty shebang",
                        content: "#!",
                        tokenNames: ["OPEN"],
                    },
                    {
                        name: "Tokenizes a shebang containing only horizontal whitespace",
                        content: "#!    \t   \u000C\t    ",
                        tokenNames: [
                            "OPEN",
                            // Plugin Mode
                            ["HORIZONTAL_WS"],
                        ],
                    },
                    {
                        name: "Tokenizes end of line characters as CLOSE",
                        content: "#!\r\n\n\r",
                        tokenNames: [
                            "OPEN",
                            // Plugin Mode
                            ["CLOSE"],
                            "CLOSE",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Surrounding whitespace is not captured by a plugin",
                        content: "#!   SomePlugin\t  ",
                        tokenNames: [
                            "OPEN",
                            // Plugin Mode
                            ["HORIZONTAL_WS", "PLUGIN", "HORIZONTAL_WS"],
                        ],
                    },
                    {
                        name: "Handles whitespace around the firmware start token",
                        content: "#!   1234\t@\t3.1.4  ",
                        tokenNames: [
                            "OPEN",
                            // Plugin Mode
                            [
                                "HORIZONTAL_WS",
                                "PLUGIN",
                                "HORIZONTAL_WS",
                                "PLUGIN_FIRMWARE_START",
                                // Firmware Mode
                                ["HORIZONTAL_WS", "FIRMWARE"],
                                "HORIZONTAL_WS",
                            ],
                        ],
                    },
                    {
                        name: "Handles whitespace around a DELIMITER following a PLUGIN",
                        content: "#!plugin \t,   ",
                        tokenNames: [
                            "OPEN",
                            // Plugin Mode
                            [
                                "PLUGIN",
                                "HORIZONTAL_WS",
                                "DELIMITER",
                                // Node Mode
                                ["HORIZONTAL_WS"],
                            ],
                        ],
                    },
                    {
                        name: "Handles whitespace around a DELIMITER following a FIRMWARE",
                        content: "#!plugin@1.2.3 ;\n\r\r\n",
                        tokenNames: [
                            "OPEN",
                            // Plugin Mode
                            [
                                "PLUGIN",
                                "PLUGIN_FIRMWARE_START",
                                // Firmware Mode
                                ["FIRMWARE"],
                                "HORIZONTAL_WS",
                                "DELIMITER",
                                // Node Mode
                                ["CLOSE"],
                                "CLOSE",
                            ],
                            "CLOSE",
                        ],
                    },
                ]
            ).forEach(test => {
                it(test.name, () => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspShebangLexer(inputStream)
                    lexer.addErrorListener(ERROR_THROWER)

                    const expected = flatten(test.tokenNames)
                    const actual = lexer
                        .getAllTokens()
                        .map(typeExtractor)
                        .map(nameExtractor.bind(lexer))

                    expect(actual).to.deep.equal(expected)
                })
            })
        })

        // Test against tokens on the default channel.
        describe("default channel", function() {
            new Array<LexTest>(
                ...[
                    {
                        name: "OPEN, CLOSE are in the default channel",
                        content: "#!\n",
                        tokenNames: ["OPEN", "CLOSE"],
                    },
                    {
                        name: "Tokenizes a master plugin",
                        content: "#! \t PluginTest101 \t \r\n",
                        tokenNames: ["OPEN", ["PLUGIN"], "CLOSE"],
                    },
                    {
                        name: "Tokenizes node plugin assignments",
                        content:
                            "#! TSPLinkMaster@3.1.4 ; NODE [ 1 ] = TSPSlave1@1.1.2 ,\tNoDe\t[\t64\t]\t=\ttspSlave2\t;",
                        tokenNames: [
                            "OPEN",
                            [
                                "PLUGIN",
                                "PLUGIN_FIRMWARE_START",
                                ["FIRMWARE"],
                                "DELIMITER",
                                ["NODE", "NODE_INDEX_OPEN", "NODE_NUMBER", "NODE_INDEX_CLOSE", "NODE_EQUALS"],
                                "PLUGIN",
                                "PLUGIN_FIRMWARE_START",
                                ["FIRMWARE"],
                                "DELIMITER",
                                ["NODE", "NODE_INDEX_OPEN", "NODE_NUMBER", "NODE_INDEX_CLOSE", "NODE_EQUALS"],
                                "PLUGIN",
                                "DELIMITER",
                            ],
                        ],
                    },
                    {
                        name: "Does not check the value of NODE_NUMBER",
                        content: "#!,nodE[-1]=a,nODe[+65]=b",
                        tokenNames: [
                            "OPEN",
                            [
                                "DELIMITER",
                                ["NODE", "NODE_INDEX_OPEN", "NODE_NUMBER", "NODE_INDEX_CLOSE", "NODE_EQUALS"],
                                "PLUGIN",
                                "DELIMITER",
                                ["NODE", "NODE_INDEX_OPEN", "NODE_NUMBER", "NODE_INDEX_CLOSE", "NODE_EQUALS"],
                                "PLUGIN",
                            ],
                        ],
                    },
                    {
                        name: 'Errors if plugin name contains "@"',
                        content: "#!@@1.2.3",
                        tokenNames: [],
                        expectFail: {
                            line: 1,
                            charPositionInLine: 3,
                            msgContains: ["token recognition", "@"],
                        },
                    },
                    {
                        name: 'Errors if plugin name contains "["',
                        content: "#!cannotHave[",
                        tokenNames: [],
                        expectFail: {
                            line: 1,
                            charPositionInLine: 12,
                            msgContains: ["token recognition", "["],
                        },
                    },
                    {
                        name: 'Errors if plugin name contains "]"',
                        content: "#!char]IsBad",
                        tokenNames: [],
                        expectFail: {
                            line: 1,
                            charPositionInLine: 6,
                            msgContains: ["token recognition", "]"],
                        },
                    },
                ]
            ).forEach(test => {
                it(test.name, (done: Mocha.Done) => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspShebangLexer(inputStream)
                    if (!test.expectFail) {
                        lexer.addErrorListener(ERROR_THROWER)

                        const targetTokens = lexer.getAllTokens().filter(token => {
                            return token.channel === TspShebangLexer.DEFAULT_TOKEN_CHANNEL
                        })

                        const expected = flatten(test.tokenNames)
                        const actual = targetTokens.map(typeExtractor).map(nameExtractor.bind(lexer))

                        expect(actual).to.deep.equal(expected)
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
