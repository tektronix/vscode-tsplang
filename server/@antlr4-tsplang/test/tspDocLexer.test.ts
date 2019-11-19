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
import { ANTLRErrorListener, ANTLRInputStream, CommonToken } from "antlr4ts"
import { expect } from "chai"
import "mocha"

import { TspDocLexer } from "../out/TspDocLexer.generated"

class ErrorListener implements ANTLRErrorListener<TspDocLexer> {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e): never {
        throw Error(`line ${line}:${charPositionInLine} ${msg}`)
    }
}
const ERROR_LISTENER = new ErrorListener()

function flatten(value: Array<string | Array<string>>): Array<string> {
    const result = new Array<string>()
    value.forEach(v => {
        if (typeof v === "object") {
            result.push(...flatten(v))
        } else {
            result.push(v)
        }
    })
    return result
}
const typeExtractor = (token: CommonToken): number => token.type

interface LexTest {
    name: string
    content: string
    tokenNames: Array<string | Array<string>>
}

describe("antlr4-tsplang", function() {
    describe("TspDocLexer", function() {
        // Test against all tokens, including tokens on the HIDDEN channel.
        describe("all channels", function() {
            new Array<LexTest>(
                ...[
                    {
                        name: "Tokenizes an empty docstring",
                        content: "--[[[]]",
                        tokenNames: ["OPEN", "CLOSE"],
                    },
                    {
                        name: "Tokenizes a docstring containing only whitespace",
                        content: "--[[[  \n  \t  \r\n]]",
                        tokenNames: ["OPEN", "HORIZONTAL_WS", "VERTICAL_WS", "HORIZONTAL_WS", "VERTICAL_WS", "CLOSE"],
                    },
                ]
            ).forEach(test => {
                it(test.name, () => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspDocLexer(inputStream)
                    lexer.addErrorListener(ERROR_LISTENER)

                    const expected = flatten(test.tokenNames).map(name => {
                        return lexer.getTokenType(name)
                    })

                    const actual = lexer.getAllTokens().map(typeExtractor)

                    expect(actual).deep.equals(expected)
                })
            })
        })

        // Test against tokens on the default channel.
        describe("default channel", function() {
            new Array<LexTest>(
                ...[
                    {
                        name: "Open, closing tokens are in the default channel",
                        content: "--[[[]]",
                        tokenNames: ["OPEN", "CLOSE"],
                    },
                    {
                        name: "Tokenizes a docstring containing no tags",
                        content: `--[[[
                            Lorem ipsum dolor sit amet, ~consectetur adipiscing elit. 🎉
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "COMMA",
                            "OTHER",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            // Unicode is 2-bytes long.
                            "OTHER",
                            "OTHER",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes inline links",
                        content: `--[[[
                            Go { @link https://github.com/tektronix/vscode-tsplang | here }
                            to view this project.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "NAME",
                            ["LINK_TAG_START", "LINK_TAG_TARGET", "LINK_TAG_DISPLAY", "LINK_TAG_END"],
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @deprecated tags",
                        content: `--[[[ @deprecated Aliquam blandit nulla in volutpat dignissim.
                            @deprecated
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["DEPRECATED_TAG", "NAME", "NAME", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            "DEPRECATED_TAG",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @desc(ription) tags",
                        content: `--[[[ @desc Pellentesque ac iaculis velit.
                            @description Pellentesque ac iaculis velit.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["DESCRIPTION_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            ["DESCRIPTION_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param(eter) tags 1",
                        content: `--[[[
                            @param {type} lowercase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "PARAM_TAG",
                            ["CURLY_OPEN", "NAME", "CURLY_CLOSE"],
                            ["NAME"],
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param(eter) tags 2",
                        content: `--[[[
                            @parameter {function} PascalCase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "PARAM_TAG",
                            ["CURLY_OPEN", "FUNCTION", "CURLY_CLOSE"],
                            ["NAME"],
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param(eter) tags 3",
                        content: `--[[[
                            @param {
                                nil|
                                buffer.UNIT_AMP
                                |table?
                            } camelCase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "PARAM_TAG",
                            ["CURLY_OPEN", "NIL", "PIPE", "ENUM", "PIPE", "TABLE", "CURLY_CLOSE"],
                            ["NAME"],
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param(eter) tags 4",
                        content: `--[[[
                            @parameter {
                                function(userdata?) => any
                            } snake_case Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "PARAM_TAG",
                            [
                                "CURLY_OPEN",
                                "FUNCTION",
                                "PAREN_OPEN",
                                "USERDATA",
                                "PAREN_CLOSE",
                                "RETURN_ARROW",
                                "ANY",
                                "CURLY_CLOSE",
                            ],
                            ["NAME"],
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            "CLOSE",
                        ],
                    },
                ]
            ).forEach(test => {
                it(test.name, () => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspDocLexer(inputStream)
                    lexer.addErrorListener(ERROR_LISTENER)

                    const targetTokens = lexer.getAllTokens().filter(token => {
                        return token.channel === TspDocLexer.DEFAULT_TOKEN_CHANNEL
                    })

                    const expected = flatten(test.tokenNames).map(name => {
                        return lexer.getTokenType(name)
                    })
                    const actual = targetTokens.map(typeExtractor)

                    expect(actual).deep.equals(expected)
                })
            })
        })
    })
})
