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
import { ANTLRInputStream, CommonToken } from "antlr4ts"
import { expect } from "chai"
import "mocha"

import { TspDocLexer } from "../out/TspDocLexer.generated"

import { ERROR_THROWER } from "./errorListener.fixture"

// An infinitely nested string array type.
type NestedArray<T> = Array<string | T>
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface RecursiveStringArray extends NestedArray<RecursiveStringArray> {}

// Remove all dimensionality from the recursive array. N-D array -> 1-D array.
function flatten(value: RecursiveStringArray): Array<string> {
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

// Array<CommonToken>.map helper function to extract the token type.
const typeExtractor = (token: CommonToken): number => token.type
// Array<TokenType>.map helper function to extract the vocab name.
const nameExtractor = function(ttype: number): string {
    return this.vocabulary.getSymbolicName(ttype)
}

// Test Template
interface LexTest {
    name: string
    content: string
    tokenNames: RecursiveStringArray
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
                    {
                        name: "NORMALSTRINGs and CHARSTRINGs stop at vertical whitespace",
                        content: `--[[["\r\n"'\n']]`,
                        tokenNames: ["OPEN", "OTHER", "VERTICAL_WS", "OTHER", "OTHER", "VERTICAL_WS", "OTHER", "CLOSE"],
                    },
                    {
                        name: "NORMALSTRINGs and CHARSTRINGs respect newline continuations",
                        content: `--[[["\\\r\n"'\\\n']]`,
                        tokenNames: ["OPEN", "NORMALSTRING", "CHARSTRING", "CLOSE"],
                    },
                ]
            ).forEach(test => {
                it(test.name, () => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspDocLexer(inputStream)
                    lexer.addErrorListener(ERROR_THROWER)

                    const expected = flatten(test.tokenNames)
                    const actual = lexer
                        .getAllTokens()
                        .map(typeExtractor)
                        .map(nameExtractor.bind(lexer))

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

                    // #region @link
                    {
                        name: "Tokenizes inline links",
                        content: `--[[[
                            Go { @link https://github.com/tektronix/vscode-tsplang | here }
                            to view this project.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            "NAME",
                            ["LINK_TAG_START", ["LINK_TAG_TARGET", "LINK_TAG_DISPLAY"], "LINK_TAG_END"],
                            "NAME",
                            "NAME",
                            "NAME",
                            "NAME",
                            "DOT",
                            "CLOSE",
                        ],
                    },
                    // #endregion @link

                    // #region @deprecated
                    {
                        name: "Tokenizes @deprecated tag",
                        content: `--[[[
                            @deprecated Aliquam blandit nulla in volutpat dignissim.
                            @deprecated
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["DEPRECATED_TAG", ["NAME", "NAME", "NAME", "NAME", "NAME", "NAME", "DOT"]],
                            "DEPRECATED_TAG",
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes inline @deprecated tag",
                        content: "--[[[@deprecated]]",
                        tokenNames: ["OPEN", "DEPRECATED_TAG", "CLOSE"],
                    },
                    {
                        name: "Tokenizes @description tag",
                        content: `--[[[
                            @description Pellentesque ac iaculis velit.
                            @desc Pellentesque ac iaculis velit.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["DESCRIPTION_TAG", ["NAME", "NAME", "NAME", "NAME", "DOT"]],
                            ["DESCRIPTION_TAG", ["NAME", "NAME", "NAME", "NAME", "DOT"]],
                            "CLOSE",
                        ],
                    },
                    // #endregion @deprecated

                    // #region @param
                    // These tests are similar to the @field tests.
                    {
                        name: "Tokenizes @param tag with a basic type declaration",
                        content: `--[[[
                            @param {type} lowercase Aenean et gravida nulla.
                            @parameter {type} lowercase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with a type union",
                        content: `--[[[
                            @param {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } camelCase Aenean et gravida nulla.

                            @parameter {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } camelCase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with a function signature",
                        content: `--[[[
                            @param {
                                function(userdata) => any
                            } snake_case Aenean et gravida nulla.

                            @parameter {
                                function(userdata) => any
                            } snake_case Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with no type declaration",
                        content: `--[[[
                            @param lowercase Pellentesque ullamcorper facilisis viverra.
                            @parameter lowercase Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["PARAM_TAG", ["NAME"], "NAME", "NAME", "NAME", "NAME", "DOT"],
                            ["PARAM_TAG", ["NAME"], "NAME", "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with an empty, double-quoted default value",
                        content: `--[[[
                            @param [PascalCase=""] Pellentesque ullamcorper facilisis viverra.
                            @parameter [PascalCase=""] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NORMALSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NORMALSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with a double-quoted default value",
                        content: `--[[[
                            @param [PascalCase="\\"double (\\")\\" quoted"] Pellentesque ullamcorper facilisis viverra.
                            @parameter [PascalCase="\\"double (\\")\\" quoted"] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NORMALSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NORMALSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with an empty, single-quoted default value",
                        content: `--[[[
                            @param [camelCase=''] Pellentesque ullamcorper facilisis viverra.
                            @parameter [camelCase=''] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "CHARSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "CHARSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with a single-quoted default value",
                        content: `--[[[
                            @param [camelCase='\\'single (\\')\\' quoted'] Pellentesque ullamcorper facilisis viverra.
                            @parameter [camelCase='\\'single (\\')\\' quoted'] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "CHARSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "CHARSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @param tag with a namespace default value",
                        content: `--[[[
                            @param [snake_case=smu.FUNC_DC_VOLTAGE] Pellentesque ullamcorper facilisis viverra.
                            @parameter [snake_case=smu.FUNC_DC_VOLTAGE] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NAMESPACE"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "PARAM_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NAMESPACE"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    // #endregion @param

                    // #region @returns
                    // These tests are similar to the following tests:
                    //      @index
                    //      @type
                    {
                        name: "Tokenizes @returns tag with a basic type",
                        content: `--[[[
                            @returns {type} Quisque fringilla est.
                            @return {type} Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["RETURNS_TAG", ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"], "NAME", "NAME", "NAME", "DOT"],
                            ["RETURNS_TAG", ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"], "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @returns tag with a nilable type",
                        content: `--[[[
                            @returns {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } Quisque fringilla est.

                            @return {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "RETURNS_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "RETURNS_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @returns tag with a function signature",
                        content: `--[[[
                            @returns {
                                function(userdata) => any
                            } snake_case Quisque fringilla est.

                            @return {
                                function(userdata) => any
                            } snake_case Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "RETURNS_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            [
                                "RETURNS_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @returns tag with no type declaration",
                        content: `--[[[
                            @returns Quisque fringilla est.
                            @return Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["RETURNS_TAG", "NAME", "NAME", "NAME", "DOT"],
                            ["RETURNS_TAG", "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    // #endregion @returns

                    // #region @see
                    {
                        name: "Tokenizes @see tag with a local type.",
                        content: `--[[[
                            @see my.table.field Nulla facilisi.
                            @see MyType Nulla facilisi.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["SEE_TAG", ["NAMESPACE"], "NAME", "NAME", "DOT"],
                            ["SEE_TAG", ["NAME"], "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @see tag with raw URL",
                        content: `--[[[
                            @see https://www.github.com/tektronix Nulla facilisi.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "SEE_TAG",
                                ["NAME", "OTHER", "OTHER", "OTHER", "NAMESPACE", "OTHER", "NAME"],
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @see tag with an inline external link tag",
                        content: `--[[[
                            @see {@link https://www.github.com/tektronix/vscode-tsplang
                                |vscode-tsplang} Nulla facilisi.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "SEE_TAG",
                                ["LINK_TAG_START", ["LINK_TAG_TARGET", "LINK_TAG_DISPLAY"], "LINK_TAG_END"],
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @see tag with an inline plugin link tag",
                        content: `--[[[
                            @see {@link beeper.beep} Nulla facilisi.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["SEE_TAG", ["LINK_TAG_START", ["LINK_TAG_TARGET"], "LINK_TAG_END"], "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    // #endregion @see

                    // #region @tsplink
                    // These tests are similar to the following tests:
                    //      @readonly
                    //      @writeonly
                    {
                        name: "Tokenizes @tsplink tag",
                        content: `--[[[
                            @tsplink Nullam id risus ex.
                            @tsplink
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["TSPLINK_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            ["TSPLINK_TAG"],
                            "CLOSE",
                        ],
                    },
                    // #endregion @tsplink

                    // #region @typedef
                    {
                        name: "Tokenizes @typedef tag with a name declaration.",
                        content: `--[[[
                            @typedef MyNewType Morbi at consequat est.
                        ]]`,
                        tokenNames: ["OPEN", ["TYPEDEF_TAG", ["NAME"], "NAME", "NAME", "NAME", "NAME", "DOT"], "CLOSE"],
                    },
                    {
                        name: "Tokenizes @typedef tag with a type union",
                        content: `--[[[
                            @typedef {
                                buffer.DIGIT_3_5
                                |buffer.DIGIT_4_5
                                |buffer.DIGIT_5_5
                                |buffer.DIGIT_6_5
                                |buffer.DIGIT_7_5
                                |buffer.DIGIT_8_5
                            } BufferDigits Morbi at consequat est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "TYPEDEF_TAG",
                                [
                                    "CURLY_OPEN",
                                    "NAMESPACE",
                                    "PIPE",
                                    "NAMESPACE",
                                    "PIPE",
                                    "NAMESPACE",
                                    "PIPE",
                                    "NAMESPACE",
                                    "PIPE",
                                    "NAMESPACE",
                                    "PIPE",
                                    "NAMESPACE",
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    // #endregion @typedef

                    // #region @field
                    // These tests are similar to the @param tests.
                    {
                        name: "Tokenizes @field tag with a basic type declaration",
                        content: `--[[[
                            @field {type} lowercase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with a type union",
                        content: `--[[[
                            @field {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } camelCase Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with a function signature",
                        content: `--[[[
                            @field {
                                function(userdata) => any
                            } snake_case Aenean et gravida nulla.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with no type declaration",
                        content: `--[[[
                            @field lowercase Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: ["OPEN", ["FIELD_TAG", ["NAME"], "NAME", "NAME", "NAME", "NAME", "DOT"], "CLOSE"],
                    },
                    {
                        name: "Tokenizes @field tag with an empty, double-quoted default value",
                        content: `--[[[
                            @field [PascalCase=""] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NORMALSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with a double-quoted default value",
                        content: `--[[[
                            @field [PascalCase="\\"double (\\")\\" quoted"] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NORMALSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with an empty, single-quoted default value",
                        content: `--[[[
                            @field [camelCase=''] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "CHARSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with a single-quoted default value",
                        content: `--[[[
                            @field [camelCase='\\'single (\\')\\' quoted'] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "CHARSTRING"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @field tag with a namespace default value",
                        content: `--[[[
                            @field [snake_case=smu.FUNC_DC_VOLTAGE] Pellentesque ullamcorper facilisis viverra.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIELD_TAG",
                                ["SQUARE_OPEN", ["NAME", "EQUALS", "NAMESPACE"], "SQUARE_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    // #endregion @field

                    // #region @index
                    // These tests are similar to the following tests:
                    //      @returns
                    //      @type
                    {
                        name: "Tokenizes @index tag with a basic type",
                        content: `--[[[
                            @index {type} Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["INDEX_TAG", ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"], "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @index tag with a nilable type",
                        content: `--[[[
                            @index {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "INDEX_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @index tag with a function signature",
                        content: `--[[[
                            @index {
                                function(userdata) => any
                            } snake_case Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "INDEX_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @index tag with no type declaration",
                        content: `--[[[
                            @index Quisque fringilla est.
                        ]]`,
                        tokenNames: ["OPEN", ["INDEX_TAG", "NAME", "NAME", "NAME", "DOT"], "CLOSE"],
                    },
                    // #endregion @index

                    // #region @readonly
                    // These tests are similar to the following tests:
                    //      @tsplink
                    //      @writeonly
                    {
                        name: "Tokenizes @constant tag",
                        content: `--[[[
                            @const Nullam id risus ex.
                            @constant
                            @const
                            @constant Nullam id risus ex.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["READONLY_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            ["READONLY_TAG"],
                            ["READONLY_TAG"],
                            ["READONLY_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @readonly tag",
                        content: `--[[[
                            @readonly Nullam id risus ex.
                            @readOnly
                            @readonly
                            @readOnly Nullam id risus ex.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["READONLY_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            ["READONLY_TAG"],
                            ["READONLY_TAG"],
                            ["READONLY_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    // #endregion @readonly

                    // #region @writeonly
                    // These tests are similar to the following tests:
                    //      @tsplink
                    //      @readonly
                    {
                        name: "Tokenizes @writeonly tag",
                        content: `--[[[
                            @writeonly Nullam id risus ex.
                            @writeOnly
                            @writeonly
                            @writeOnly Nullam id risus ex.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["WRITEONLY_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            ["WRITEONLY_TAG"],
                            ["WRITEONLY_TAG"],
                            ["WRITEONLY_TAG", "NAME", "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    // #endregion @writeonly

                    // #region @type
                    // These tests are similar to the following tests:
                    //      @returns
                    //      @index
                    {
                        name: "Tokenizes @type tag with a basic type",
                        content: `--[[[
                            @type {type} Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            ["TYPE_TAG", ["CURLY_OPEN", ["NAME"], "CURLY_CLOSE"], "NAME", "NAME", "NAME", "DOT"],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @type tag with a nilable type",
                        content: `--[[[
                            @type {
                                nil|
                                buffer.UNIT_AMP
                                |table
                            } Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "TYPE_TAG",
                                ["CURLY_OPEN", ["NIL", "PIPE", "NAMESPACE", "PIPE", "TABLE"], "CURLY_CLOSE"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @type tag with a function signature",
                        content: `--[[[
                            @type {
                                function(userdata) => any
                            } snake_case Quisque fringilla est.
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "TYPE_TAG",
                                [
                                    "CURLY_OPEN",
                                    ["FUNCTION", "PAREN_OPEN", "USERDATA", "PAREN_CLOSE", "RETURN_ARROW", "ANY"],
                                    "CURLY_CLOSE",
                                ],
                                ["NAME"],
                                "NAME",
                                "NAME",
                                "NAME",
                                "DOT",
                            ],
                            "CLOSE",
                        ],
                    },
                    {
                        name: "Tokenizes @type tag with no type declaration",
                        content: `--[[[
                            @type Quisque fringilla est.
                        ]]`,
                        tokenNames: ["OPEN", ["TYPE_TAG", "NAME", "NAME", "NAME", "DOT"], "CLOSE"],
                    },
                    // #endregion @type

                    // #region @firmware
                    {
                        name: "Tokenizes @firmware tag with version indicators",
                        content: `--[[[
                            @firmware >0.0.0, <=1.0.0, ==2.0.0
                            @fw ==3.14.159, >271.8.28, <=01.01.1970
                        ]]`,
                        tokenNames: [
                            "OPEN",
                            [
                                "FIRMWARE_TAG",
                                [
                                    ["GT", "FIRMWARE"],
                                    "COMMA",
                                    ["LTE", "FIRMWARE"],
                                    "COMMA",
                                    ["EQUALS", "EQUALS", "FIRMWARE"],
                                ],
                            ],
                            [
                                "FIRMWARE_TAG",
                                [
                                    ["EQUALS", "EQUALS", "FIRMWARE"],
                                    "COMMA",
                                    ["GT", "FIRMWARE"],
                                    "COMMA",
                                    ["LTE", "FIRMWARE"],
                                ],
                            ],
                            "CLOSE",
                        ],
                    },
                    // #endregion @firmware

                    // #region @tsp-v1
                    // These tests are similar to the @tsp-v2 tests.
                    {
                        name: "Tokenizes @tsp-v1 tag",
                        content: `--[[[
                            @tsp-v1
                        ]]`,
                        tokenNames: ["OPEN", ["TSPV1_TAG"], "CLOSE"],
                    },
                    // #endregion @tsp-v1

                    // #region @tsp-v2
                    // These tests are similar to the @tsp-v1 tests.
                    {
                        name: "Tokenizes @tsp-v2 tag",
                        content: `--[[[
                            @tsp-v2
                        ]]`,
                        tokenNames: ["OPEN", ["TSPV2_TAG"], "CLOSE"],
                    },
                    // #endregion @tsp-v2

                    // #region @v1
                    // These tests are similar to the @v2 tests.
                    {
                        name: "Tokenize @v1 tag",
                        content: `--[[[
                            @v1 smu.measure.math.mxb.mfactor
                            @v1 TypeAlias
                        ]]`,
                        tokenNames: ["OPEN", ["V1_TAG", ["NAMESPACE"]], ["V1_TAG", ["NAME"]], "CLOSE"],
                    },
                    // #endregion @v1

                    // #region @v2
                    // These tests are similar to the @v1 tests.
                    {
                        name: "Tokenize @v2 tag",
                        content: `--[[[
                            @v2 smu.measure.math.mxb.mfactor
                            @v2 TypeAlias
                        ]]`,
                        tokenNames: ["OPEN", ["V2_TAG", ["NAMESPACE"]], ["V2_TAG", ["NAME"]], "CLOSE"],
                    },
                    // #endregion @v2
                ]
            ).forEach(test => {
                it(test.name, () => {
                    const inputStream = new ANTLRInputStream(test.content)
                    const lexer = new TspDocLexer(inputStream)
                    lexer.addErrorListener(ERROR_THROWER)

                    const targetTokens = lexer.getAllTokens().filter(token => {
                        return token.channel === TspDocLexer.DEFAULT_TOKEN_CHANNEL
                    })

                    const expected = flatten(test.tokenNames)
                    const actual = targetTokens.map(typeExtractor).map(nameExtractor.bind(lexer))

                    expect(actual).deep.equals(expected)
                })
            })
        })
    })
})
