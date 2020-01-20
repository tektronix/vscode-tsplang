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
import { ANTLRInputStream, CommonTokenStream, ParserRuleContext } from "antlr4ts"
import { expect } from "chai"
import "mocha"

import { TspShebangLexer } from "../out/TspShebangLexer.generated"
import { ShebangContext, TspShebangParser } from "../out/TspShebangParser.generated"

import { ERROR_THROWER } from "./errorListener.fixture"
import { contextFactoryConstructor, TestContext } from "./parser.fixture"

declare type ShebangTestContext<N extends ParserRuleContext> = TestContext<
    TspShebangLexer,
    CommonTokenStream,
    TspShebangParser,
    N
>

/**
 * Uses the default ERROR_THROWER as both the lexer and parser error listener.
 */
const contextFactory: <N extends ParserRuleContext>(
    content: string
) => ShebangTestContext<N> = contextFactoryConstructor<TspShebangLexer, CommonTokenStream, TspShebangParser>(
    (input: ANTLRInputStream): TspShebangLexer => new TspShebangLexer(input),
    (lexer: TspShebangLexer): CommonTokenStream => new CommonTokenStream(lexer),
    (tokenStream: CommonTokenStream): TspShebangParser => new TspShebangParser(tokenStream)
)

function testPattern(context: ShebangTestContext<ShebangContext>, pattern: string): Promise<Chai.Assertion> {
    context.docstringPattern = context.parser.compileParseTreePattern(pattern, TspShebangParser.RULE_shebang)
    context.root = context.parser.shebang()

    return context.docstringPattern.then(pattern => {
        return expect(pattern.matches(context.root), `Expected the parse tree to match "${pattern}"`).to.be.true
    })
}

describe("antlr4-tsplang", function() {
    describe("TspShebangParser", function() {
        describe("shebang", function() {
            describe('MUST start with "#!"', function() {
                // This must be valid when we add the shebang prefix.
                const contentWithoutPrefix = "6500;node[5]=7510"
                const pattern = "<OPEN><plugin><DELIMITER><node>"

                it('Fails to lex without a leading "#!"', function() {
                    const inputStream = new ANTLRInputStream(contentWithoutPrefix)
                    const lexer = new TspShebangLexer(inputStream)
                    lexer.removeErrorListeners()
                    lexer.addErrorListener(ERROR_THROWER)

                    expect(() => lexer.nextToken()).to.throw(Error, /line 1:0[^']*'6'/)
                })

                it('Does not error with a leading "#!"', function() {
                    const context = contextFactory<ShebangContext>("#!" + contentWithoutPrefix)
                    return testPattern(context, pattern)
                })
            })

            describe("MUST NOT start with a node entry", function() {
                const badShebang = "#! node [38] = MyPlugin ,2450\r\n"
                const goodShebang = "#!2450, node [38] = MyPlugin \r\n"
                const pattern = "<OPEN><plugin><DELIMITER><node><CLOSE>"

                it("Fails to lex with a leading node entry", function() {
                    const inputStream = new ANTLRInputStream(badShebang)
                    const lexer = new TspShebangLexer(inputStream)
                    lexer.removeErrorListeners()
                    lexer.addErrorListener(ERROR_THROWER)

                    expect(() => lexer.getAllTokens()).to.throw(Error, /line 1:8[^']*'\['/)
                })

                it("Does not error when a node entry follows the master plugin entry", function() {
                    const context = contextFactory<ShebangContext>(goodShebang)
                    return testPattern(context, pattern)
                })
            })

            describe("MUST use semicolons or commas to delimit plugin and node entries", function() {
                const badShebang1 = "#!greatest-plugin>node[1]=2nd-greatest-plugin\r"
                const badShebang2 = "#!greatest-plugin > node[1]=2nd-greatest-plugin\r"
                const goodShebangSemicolons = badShebang1.replace(">", ";")
                const goodShebangCommas = badShebang2.replace(">", ",")
                const pattern = "<OPEN><plugin><DELIMITER><node><CLOSE>"

                it("Fails to lex when entries are not semicolon delimited", function() {
                    let inputStream = new ANTLRInputStream(badShebang1)
                    let lexer = new TspShebangLexer(inputStream)
                    lexer.removeErrorListeners()
                    lexer.addErrorListener(ERROR_THROWER)
                    // The comma is consumed during the TOKEN rule. Consumption is stopped
                    // when the "[" is encountered since plugin names cannot contain that
                    // character.
                    expect(() => lexer.getAllTokens()).to.throw(Error, /line 1:22[^']*'\['/)

                    inputStream = new ANTLRInputStream(badShebang2)
                    lexer = new TspShebangLexer(inputStream)
                    lexer.removeErrorListeners()
                    lexer.addErrorListener(ERROR_THROWER)
                    // You might think that the invalid delimiter might trigger the error, but
                    // both it and "node" are considered valid PLUGIN tokens.
                    expect(() => lexer.getAllTokens()).to.throw(Error, /line 1:24[^']*'\['/)
                })

                it("Does not error when entries are semicolon delimited", function() {
                    const context = contextFactory<ShebangContext>(goodShebangSemicolons)
                    return testPattern(context, pattern)
                })

                it("Does not error when entries are comma delimited", function() {
                    const context = contextFactory<ShebangContext>(goodShebangCommas)
                    return testPattern(context, pattern)
                })
            })

            it("MUST NOT allow multiple plugin entries", function() {
                const inputStream = new ANTLRInputStream("#!2461;2636B")
                const lexer = new TspShebangLexer(inputStream)
                lexer.removeErrorListeners()
                lexer.addErrorListener(ERROR_THROWER)

                // The "2636" portion of the shebang is tokenized as a NODE_NUMBER.
                expect(() => lexer.getAllTokens()).to.throw(Error, /line 1:11[^']*'B'/)
            })

            it("MAY have zero or more node entries", function() {
                let context = contextFactory<ShebangContext>("#!2450")
                context.parser.shebang()

                context = contextFactory<ShebangContext>("#!2450;node[1]=2460")
                context.parser.shebang()

                context = contextFactory<ShebangContext>("#!2450;node[1]=2460,node[2]=2461\n")
                context.parser.shebang()
            })

            it("MAY be empty", function() {
                const context = contextFactory<ShebangContext>("#!")
                return testPattern(context, "<OPEN>")
            })

            it("MAY end in a vertial whitespace character", function() {
                const context = contextFactory<ShebangContext>("#!\n")
                return testPattern(context, "<OPEN><CLOSE>")
            })

            it("MAY end in a semicolon if preceeded by a valid plugin", function() {
                const context = contextFactory<ShebangContext>("#!plugin;")
                return testPattern(context, "<OPEN><plugin><DELIMITER>")
            })

            it("MAY end in a comma if preceeded by a valid plugin", function() {
                const context = contextFactory<ShebangContext>("#!plugin,")
                return testPattern(context, "<OPEN><plugin><DELIMITER>")
            })
        })

        describe("plugin", function() {
            it("MUST start with a PLUGIN token", function() {
                const context = contextFactory<ShebangContext>("#!2612A")
                return testPattern(context, "<OPEN><PLUGIN>")
            })

            it("MAY specify a firmware version", function() {
                const context = contextFactory<ShebangContext>("#!RandomPlugin@2.7.1")
                return testPattern(context, "<OPEN><PLUGIN><PLUGIN_FIRMWARE_START><FIRMWARE>")
            })
        })

        describe("node", function() {
            it('MUST assign the plugin to an index of the "node" array')
        })

        describe("nodeNumber", function() {
            it("MUST be a number greater than 0")

            it("MUST be a number less than 65")
        })
    })
})
