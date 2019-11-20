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
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts"
import { ParseTreePattern } from "antlr4ts/tree/pattern"
import { XPath } from "antlr4ts/tree/xpath"
import { expect } from "chai"
import "mocha"

import { TspDocLexer } from "../out/TspDocLexer.generated"
import { DocContentContext, DocstringContext, TspDocParser } from "../out/TspDocParser.generated"

import { ERROR_THROWER } from "./errorListener.fixture"

const DOCSTRING_PATTERN = "<OPEN><docblock><CLOSE>"

interface TestContext {
    inputStream: ANTLRInputStream
    lexer: TspDocLexer
    tokenStream: CommonTokenStream
    parser: TspDocParser
    root?: DocstringContext
    docstringPattern: Promise<ParseTreePattern>
}
/**
 * Create a context for the given test string.
 */
function contextFactory(content: string): TestContext {
    const inputStream = new ANTLRInputStream(content)
    const lexer = new TspDocLexer(inputStream)
    lexer.addErrorListener(ERROR_THROWER)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new TspDocParser(tokenStream)
    parser.addErrorListener(ERROR_THROWER)
    const docstringPattern = parser.compileParseTreePattern(DOCSTRING_PATTERN, TspDocParser.RULE_docstring)

    return {
        inputStream,
        lexer,
        tokenStream,
        parser,
        docstringPattern,
    }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function testDocstring(context: TestContext): Promise<any> {
    context.root = context.parser.docstring()

    return context.docstringPattern.then(pattern => {
        return expect(pattern.matches(context.root), `Expected the parse tree to match "${DOCSTRING_PATTERN}"`).to.be
            .true
    })
}

describe("antlr4-tsplang", function() {
    describe("TspDocParser", function() {
        describe("docstring", function() {
            it("Parses an empty docstring", function() {
                const context = contextFactory("--[[[]]")
                return testDocstring(context)
            })

            it("Parses a docstring containing only whitespace", function() {
                const parser = contextFactory("--[[[  \n  \t  \r\n]]")
                return testDocstring(parser)
            })

            it("Parses a docstring containing no tags", function() {
                const parser = contextFactory(`--[[[
                    Lorem ipsum dolor sit amet, ~consectetur adipiscing elit. 🎉
                ]]`)
                return testDocstring(parser)
            })

            // All other TspDocParser test cases will implicitly expand upon these tests.
        })

        describe("docblock", function() {
            it("Has no children for an empty docstring", function() {
                const context = contextFactory("--[[[]]")
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/*", context.parser)

                expect(actual).to.have.lengthOf(0)
            })

            it("Contains a single docContent for a docstring without tags", function() {
                const context = contextFactory(`--[[[
                    Lorem ipsum dolor sit amet, ~consectetur adipiscing elit. 🎉
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docContent", context.parser)

                expect(actual).to.have.lengthOf(1)
            })
        })

        describe("docContent", function() {
            it("Stops before the next valid tag", function(done) {
                const context = contextFactory(`--[[[
                    \\@ Some random "content" with an \\@invalidtag thrown in for good measure
                    (and good testing). \\@\\@\\@
                    @returns {number} docContent that belongs to the \\@returns tag.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docContent", context.parser)

                expect(actual).to.have.lengthOf(1)

                actual.forEach(value => {
                    expect(value.text).to.not.contain("@returns")
                    // Call done so if there is a 2nd loop, then it will fail.
                    done()
                })
            })
        })
    })
})
