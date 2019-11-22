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
import { ParseTree, TerminalNode } from "antlr4ts/tree"
import { ParseTreePattern } from "antlr4ts/tree/pattern"
import { XPath } from "antlr4ts/tree/xpath"
import Chai = require("chai")
const expect = Chai.expect
import "mocha"

import { TspDocLexer } from "../out/TspDocLexer.generated"
import {
    AnyTypeContext,
    BooleanTypeContext,
    DocContentContext,
    DocstringContext,
    FunctionTypeContext,
    NameDeclarationContext,
    NamespaceTypeContext,
    NameTypeContext,
    NilTypeContext,
    NumberTypeContext,
    StringTypeContext,
    TableTypeContext,
    ThreadTypeContext,
    TspDocParser,
    TypeContext,
    TypeDeclarationContext,
    TypeEntryContext,
    UserdataTypeContext,
} from "../out/TspDocParser.generated"

import { ERROR_THROWER } from "./errorListener.fixture"

const DOCSTRING_PATTERN = "<OPEN><docblock><CLOSE>"
const TYPEDECLARATION_PATTERN = "<CURLY_OPEN><typeEntry><CURLY_CLOSE>"

interface TestContext<N extends ParserRuleContext> {
    inputStream: ANTLRInputStream
    lexer: TspDocLexer
    tokenStream: CommonTokenStream
    parser: TspDocParser
    root?: N
    docstringPattern?: Promise<ParseTreePattern>
}
/**
 * Create a context for the given test string.
 */
function contextFactory<N extends ParserRuleContext>(content: string): TestContext<N> {
    const inputStream = new ANTLRInputStream(content)
    const lexer = new TspDocLexer(inputStream)
    lexer.addErrorListener(ERROR_THROWER)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new TspDocParser(tokenStream)
    parser.removeErrorListeners()
    parser.addErrorListener(ERROR_THROWER)

    return {
        inputStream,
        lexer,
        tokenStream,
        parser,
    }
}

/**
 * Removes all whitespace so that a test string can be compared
 * against the text captured by a ParserRuleContext or TerminalNode.
 */
function dropWhitespace(value: string): string {
    return value.replace(/[\s\r\n]+/g, "")
}

function testDocstring(context: TestContext<DocstringContext>): Promise<Chai.Assertion> {
    context.docstringPattern = context.parser.compileParseTreePattern(DOCSTRING_PATTERN, TspDocParser.RULE_docstring)
    context.root = context.parser.docstring()

    return context.docstringPattern.then(pattern => {
        return expect(pattern.matches(context.root), `Expected the parse tree to match "${DOCSTRING_PATTERN}"`).to.be
            .true
    })
}

function testTypeDeclaration(context: TestContext<TypeDeclarationContext>): Promise<Chai.Assertion> {
    context.docstringPattern = context.parser.compileParseTreePattern(
        TYPEDECLARATION_PATTERN,
        TspDocParser.RULE_typeDeclaration
    )
    context.root = context.parser.typeDeclaration()

    return context.docstringPattern.then(pattern => {
        return expect(pattern.matches(context.root), `Expected the parse tree to match "${TYPEDECLARATION_PATTERN}"`).to
            .be.true
    })
}

/**
 * Run the given test callback once and only once.
 *
 * An Error is thrown if the given set does not contain exactly one item.
 */
function singleItemSetTestFixture(
    set: Set<ParseTree>,
    test: (item: ParseTree) => void | never,
    done: Mocha.Done
): void | never {
    set.forEach(function(item: ParseTree): void | never {
        test(item)
        // Mocha throws an error if done is called more than once.
        done()
    })
    // If done is called, then this error will be ignored.
    expect.fail()
}

describe("antlr4-tsplang", function() {
    describe("TspDocParser", function() {
        describe("docstring", function() {
            it("Can be empty", function() {
                const context = contextFactory<DocstringContext>("--[[[]]")
                return testDocstring(context)
            })

            it("Can be only only whitespace", function() {
                const parser = contextFactory<DocstringContext>("--[[[  \n  \t  \r\n]]")
                return testDocstring(parser)
            })

            it("Can contain no tags", function() {
                const parser = contextFactory<DocstringContext>(`--[[[
                    Lorem ipsum dolor sit amet, ~consectetur adipiscing elit. 🎉
                ]]`)
                return testDocstring(parser)
            })

            // All other TspDocParser test cases will implicitly expand upon these tests.
        })

        describe("docblock", function() {
            it("Has no children for an empty docstring", function() {
                const context = contextFactory<DocstringContext>("--[[[]]")
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/*", context.parser)

                expect(actual).to.have.lengthOf(0)
            })

            it("Contains a single docContent for a docstring without tags", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    Lorem ipsum dolor sit amet, ~consectetur adipiscing elit. 🎉
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docContent", context.parser)

                expect(actual).to.have.lengthOf(1)
            })

            // All other TspDocParser test cases will implicitly expand upon these tests.
        })

        describe("docDeprecated", function() {
            it("Supports inlining", function(done) {
                const context = contextFactory<DocstringContext>("--[[[@deprecated]]")
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docDeprecated", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(1)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                    },
                    done
                )
            })

            it("Supports trailing content", function(done) {
                const trailingContent = "It's for the best. ⚰"
                const context = contextFactory<DocstringContext>(`--[[[
                    @deprecated ${trailingContent}
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docDeprecated", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        const itemChild = item.getChild(1)
                        expect(itemChild).to.be.an.instanceOf(DocContentContext)
                        expect(itemChild.text).to.equal(dropWhitespace(trailingContent))
                    },
                    done
                )
            })
        })

        describe("docDescription", function() {
            it("Can start with the @desc tag", function(done) {
                const trailingContent = `
                    It's helpful to have deprecation notices come before anything
                    else, but it means that the description can no longer be inferred
                    from leading content. Use the \\@desc tag to prevent the
                    description from attaching to the deprecation notice.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @deprecated Content that belongs to the \\@deprecated tag.
                    @desc ${trailingContent}
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docDescription", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        const contentChild = item.getChild(1)
                        expect(contentChild).to.be.an.instanceOf(DocContentContext)
                        expect(contentChild.text).to.equal(dropWhitespace(trailingContent))
                    },
                    done
                )
            })

            it("Can start with the @description tag", function(done) {
                const trailingContent = "The \\@description tag is an alias for the \\@desc tag."
                const context = contextFactory<DocstringContext>(`--[[[
                    @deprecated Content that belongs to the \\@deprecated tag.
                    @description ${trailingContent}
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docDescription", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        const contentChild = item.getChild(1)
                        expect(contentChild).to.be.an.instanceOf(DocContentContext)
                        expect(contentChild.text).to.equal(dropWhitespace(trailingContent))
                    },
                    done
                )
            })

            it("Requires trailing content", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    If you use a description tag, then it must be followed by content!
                    (Whitespace doesn't count.)

                    @description\t
                ]]`)
                expect(() => context.parser.docstring()).to.throw(Error)
            })
        })

        describe("docContent", function() {
            it("Stops before the next valid tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    This is some __very__ fake docstring content.

                    @returns
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docContent", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.text).to.not.contain("@returns")
                    },
                    done
                )
            })

            it("Consumes escaped TAG_DELIMITERs", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    \\@ Some random "content" with an \\@invalidtag thrown in for good measure
                    (and good testing). Here's a dinosaur: 🦖 \\@\\@\\@
                    @returns {number} DocContent that belongs to the \\@returns tag.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docContent", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.text).to.not.contain("@returns")
                    },
                    done
                )
            })

            it("Consumes inline links", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    {@link here} are various
                    {@link https://github.com/jsdoc/jsdoc.github.io/blob/master/tags-inline-link.html
                        | inline link}
                    tags within some {@link docstring.docblock.docContent | docstring content}.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docContent", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        if (item instanceof DocContentContext) {
                            expect(item.link()).to.have.lengthOf(3)
                        } else {
                            const expectedType = DocContentContext
                            expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                        }
                    },
                    done
                )
            })
        })

        describe("docParameter", function() {
            it("Can start with the @param tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @param {string} arg This \\@param tag declares a parameter called "arg"
                        of type "string" for some imaginary function.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docParameter", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(4)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TypeDeclarationContext)
                        expect(item.getChild(2)).to.be.an.instanceOf(NameDeclarationContext)
                        expect(item.getChild(3)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            it("Can start with the @parameter tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @parameter {string} arg The \\@parameter is an alias for the \\@param tag.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docParameter", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(4)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TypeDeclarationContext)
                        expect(item.getChild(2)).to.be.an.instanceOf(NameDeclarationContext)
                        expect(item.getChild(3)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            it("Does not need a type declaration", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @param arg A \\@param declaration without a type is assumed to be the ANY type.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docParameter", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(3)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(NameDeclarationContext)
                        expect(item.getChild(2)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            it.skip("TODO more type declaration tests")

            it.skip("TODO name declaration tests")
        })

        describe("docReturns", function() {
            it.skip("Can start with the @return tag")

            it.skip("Can start with the @returns tag")

            it.skip("TODO type declaration tests")

            it.skip("Supports trailing content")
        })

        describe("docReadonly", function() {
            it.skip("Can start with the @const tag")

            it.skip("Can start with the @constant tag")

            it.skip("Can start with the @readonly tag")

            it.skip("Can start with the @readOnly tag")

            it.skip("Supports trailing content")
        })

        describe("docWriteonly", function() {
            it.skip("Can start with the @writeonly tag")

            it.skip("Can start with the @writeOnly tag")

            it.skip("Supports trailing content")
        })

        describe("docType", function() {
            it.skip("Starts with the @type tag")

            it.skip("TODO type declaration tests")

            it.skip("Supports trailing content")
        })

        describe("docTypedef", function() {
            it.skip("Starts with the @typedef tag")

            it.skip("TODO type declaration tests")

            it.skip("Only accepts a NAME")

            it.skip("Supports trailing content")
        })

        describe("docField", function() {
            it.skip("Starts with the @field tag")

            it.skip("TODO type declaration tests")

            it.skip("TODO name declaration tests")

            it.skip("Supports trailing content")
        })

        describe("docIndex", function() {
            it.skip("Starts with the @index tag")

            it.skip("TODO type declaration tests")

            it.skip("Supports trailing content")
        })

        describe("docSee", function() {
            it.skip("TODO")

            it.skip("Supports trailing content")
        })

        describe("docTsplink", function() {
            it.skip("Starts with the @see tag")

            it.skip("Target can be a NAME")

            it.skip("Target can be a NAMESPACE")

            it.skip("Target can be an inline link")

            it.skip("Supports trailing content")
        })

        describe("docFirmware", function() {
            it.skip("Can start with the @fw tag")

            it.skip("Can start with the @firmware tag")

            it.skip("Firmware versions are one or more integers separated with DOTs")

            it.skip('Firmware versions support the ">" prefix')

            it.skip('Firmware versions support the "<=" prefix')

            it.skip('Firmware versions support the "==" prefix')

            it.skip("Requires one firmware version")

            it.skip("Supports multiple firmware versions separated by COMMAs")

            it.skip("Supports trailing COMMAs")

            it.skip("Does not capture trailing content")
        })

        describe("docVersion", function() {
            it.skip("Can start with a @tsp-v1 tag")

            it.skip("Can start with a @tsp-v2 tag")

            it.skip("TODO optional trailing @v# tests")

            it.skip("Does not capture trailing content")
        })

        describe("typeDeclaration", function() {
            it("Is a type surrounded by curly braces", function() {
                const context = contextFactory<TypeDeclarationContext>("{type}")
                return testTypeDeclaration(context)
            })

            describe("Basic Type", function() {
                interface BasicType {
                    title: string
                    value: string
                    type: typeof TypeContext
                }

                new Array<BasicType>(
                    ...[
                        { title: "Accepts NIL", value: "nil", type: NilTypeContext },
                        { title: "Accepts BOOLEAN", value: "boolean", type: BooleanTypeContext },
                        { title: "Accepts NUMBER", value: "number", type: NumberTypeContext },
                        { title: "Accepts STRING", value: "string", type: StringTypeContext },
                        { title: "Accepts FUNCTION", value: "function", type: FunctionTypeContext },
                        { title: "Accepts USERDATA", value: "userdata", type: UserdataTypeContext },
                        { title: "Accepts THREAD", value: "thread", type: ThreadTypeContext },
                        { title: "Accepts TABLE", value: "table", type: TableTypeContext },
                        {
                            title: "Accepts a NAMESPACE",
                            value: "smu.measure.math.mxb.bfactor",
                            type: NamespaceTypeContext,
                        },
                        { title: "Accepts ANY", value: "any", type: AnyTypeContext },
                        { title: "Accepts a NAME", value: "userDefinedType5", type: NameTypeContext },
                    ]
                ).forEach(test => {
                    it(test.title, function(done) {
                        const context = contextFactory<TypeDeclarationContext>(`{${test.value}}`)
                        context.root = context.parser.typeDeclaration()

                        const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry", context.parser)

                        expect(actual).to.have.lengthOf(1)
                        singleItemSetTestFixture(
                            actual,
                            item => {
                                if (item instanceof TypeEntryContext) {
                                    expect(item.childCount).to.equal(1)
                                    const typeChild = item.getChild(0)
                                    expect(typeChild).to.be.an.instanceOf(test.type)
                                } else {
                                    const expectedType = TypeEntryContext
                                    expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                                }
                            },
                            done
                        )
                    })
                })
            })

            describe("Basic Function Signature", function() {
                it("Accepts a signature without parameters", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function() => any}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/type", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            if (item instanceof FunctionTypeContext) {
                                expect(item.typeList()).to.have.lengthOf(0)
                            } else {
                                const expectedType = FunctionTypeContext
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it.skip("Accepts a signature with one parameter type")

                it.skip("Accepts a signature with multiple parameter types")

                it.skip("Accepts a signature with one param and multiple return types")

                it.skip("Accepts a signature with multiple params and returns types")

                it.skip("Supports trailing COMMAs")
            })
        })
    })
})
