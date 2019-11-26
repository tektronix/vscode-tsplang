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
    DocIndexContext,
    DocReadonlyContext,
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
    TypeListContext,
    TypeReturnEntryContext,
    TypeUnionContext,
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

/**
 * Run the given test callback for each Set item.
 */
function multiItemSetTextFixture(
    set: Set<ParseTree>,
    expectedSetSize: number,
    test: (item: ParseTree) => void | never
): void | never {
    let paranoidLoopCounter = 0
    set.forEach(item => {
        test(item)
        expect(paranoidLoopCounter).to.be.lessThan(expectedSetSize)
        paranoidLoopCounter++
    })
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
                        const expectedType = DocContentContext
                        if (item instanceof expectedType) {
                            expect(item.link()).to.have.lengthOf(3)
                        } else {
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
                    @parameter {string} arg The \\@parameter tag is an alias for the \\@param tag.
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

            describe("typeDeclaration", function() {
                it("Is not required", function(done) {
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

                it("Rejects a function whose parameters contain a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @param {function(string|nil) => any} p
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @param {function(number, userdata|myType, nil) => any} p
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Rejects a function whose return list contains a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @param {function() => number|boolean,} p
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @param {function() => UserType,buffer.UNIT_VOLT|buffer.UNIT_AMP,table} p
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                /*
                 * Due to their similarity, any test additions should also be made to
                 *      docType
                 *      docField
                 *      docIndex
                 */
            })

            it("Requires a name declaration", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    @param {string}
                ]]`)
                expect(() => context.parser.docstring()).to.throw(Error)
            })

            it("Does not need trailing content", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @param arg
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docParameter", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(NameDeclarationContext)
                    },
                    done
                )
            })

            /*
             * Due to their similarity, any test additions should also be made to
             *      docField
             */
        })

        describe("docReturns", function() {
            it("Can start with the @return tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @return {number|nil} This \\@return tag declares the return type of
                        some imaginary function to be either "number" or "nil".
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(5)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(2)).to.be.an.instanceOf(TypeReturnEntryContext)
                        expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(4)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            it("Can start with the @returns tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @returns {number|nil} The \\@returns tag (with an "s") is an alias
                        for the \\@return tag (without an "s").
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(5)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(2)).to.be.an.instanceOf(TypeReturnEntryContext)
                        expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(4)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            // Differs from "typeDeclaration", since that parser rule is not referenced.
            describe("Type Declaration", function() {
                it("Is not required", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @return A \\@return declaration without a type is assumed to be the ANY type.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(2)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Accepts a single type", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @return {string}
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(4)

                            // Check the tag.
                            const tagChild = item.getChild(0)
                            expect(tagChild).to.be.an.instanceOf(TerminalNode)
                            expect(tagChild.text).to.equal("@return")

                            // Check the type declaration.
                            const typeReturnEntryChild = item.getChild(2)
                            expect(typeReturnEntryChild).to.be.an.instanceOf(TypeReturnEntryContext)
                            const typeListChild = (typeReturnEntryChild as TypeReturnEntryContext).typeList()
                            expect(typeListChild).to.not.be.undefined
                            const listTypes = (typeListChild as TypeListContext).type()
                            expect(listTypes).to.have.lengthOf(1)
                            expect(listTypes[0]).to.be.an.instanceOf(StringTypeContext)
                        },
                        done
                    )
                })

                it("Accepts a type list", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @returns {function, number, table}
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(4)

                            // Check the tag.
                            const tagChild = item.getChild(0)
                            expect(tagChild).to.be.an.instanceOf(TerminalNode)
                            expect(tagChild.text).to.equal("@returns")

                            // Check the type declaration.
                            const typeReturnEntryChild = item.getChild(2)
                            expect(typeReturnEntryChild).to.be.an.instanceOf(TypeReturnEntryContext)
                            const typeListChild = (typeReturnEntryChild as TypeReturnEntryContext).typeList()
                            expect(typeListChild).to.not.be.undefined
                            const listTypes = (typeListChild as TypeListContext).type()
                            expect(listTypes).to.have.lengthOf(3)
                            expect(listTypes[0]).to.be.an.instanceOf(FunctionTypeContext)
                            expect(listTypes[1]).to.be.an.instanceOf(NumberTypeContext)
                            expect(listTypes[2]).to.be.an.instanceOf(TableTypeContext)
                        },
                        done
                    )
                })

                it("Accepts a type union", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @return {smu.ON|smu.OFF|number|nil}
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(4)

                            // Check the tag.
                            const tagChild = item.getChild(0)
                            expect(tagChild).to.be.an.instanceOf(TerminalNode)
                            expect(tagChild.text).to.equal("@return")

                            // Check the type declaration.
                            const typeReturnEntryChild = item.getChild(2)
                            expect(typeReturnEntryChild).to.be.an.instanceOf(TypeReturnEntryContext)
                            const typeUnionChild = (typeReturnEntryChild as TypeReturnEntryContext).typeUnion()
                            expect(typeUnionChild).to.not.be.undefined
                            const unionTypes = (typeUnionChild as TypeUnionContext).type()
                            expect(unionTypes).to.have.lengthOf(4)
                            expect(unionTypes[0]).to.be.an.instanceOf(NamespaceTypeContext)
                            expect(unionTypes[1]).to.be.an.instanceOf(NamespaceTypeContext)
                            expect(unionTypes[2]).to.be.an.instanceOf(NumberTypeContext)
                            expect(unionTypes[3]).to.be.an.instanceOf(NilTypeContext)
                        },
                        done
                    )
                })

                it("Rejects a type list containing a type union", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @return {function, userdata, number|nil, thread}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })
            })

            it("Does not need trailing content", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    @return
                    @returns
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docReturns", context.parser)

                const expectedSize = 2
                expect(actual).to.have.lengthOf(expectedSize)
                multiItemSetTextFixture(actual, expectedSize, item => {
                    expect(item.childCount).to.equal(1)
                    expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                })
            })
        })

        describe("docReadonly", function() {
            it("Can start with the @const tag", function(done) {
                const nonTrailingContext = `
                @desc Content that I don't expect to be part of \\@const tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @const
                    ${nonTrailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(1)
                        const contentChild = item.getChild(0)
                        expect(contentChild).to.be.an.instanceOf(TerminalNode)
                        expect(contentChild.text).to.equal("@const")
                    },
                    done
                )
            })

            it("Can start with the @const tag and have trailing content", function(done) {
                const trailingContext = `
                Content that I expect to be part of \\@const tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @desc Content that I don't expect to be part of \\@const tag.
                    @const ${trailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(2)
                        const tagChild = item.getChild(0)
                        expect(tagChild).to.be.an.instanceOf(TerminalNode)
                        expect(tagChild.text).to.equal("@const")

                        const contentChild = item.getChild(1)
                        expect(contentChild).to.be.an.instanceOf(DocContentContext)
                        expect(contentChild.text).to.equal(dropWhitespace(trailingContext))
                    },
                    done
                )
            })

            it("Can start with the @constant tag", function(done) {
                const nonTrailingContext = `
                @desc Content that I don't expect to be part of \\@constant tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @constant
                    ${nonTrailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(1)
                        const contentChild = item.getChild(0)
                        expect(contentChild).to.be.an.instanceOf(TerminalNode)
                        expect(contentChild.text).to.equal("@constant")
                    },
                    done
                )
            })

            it("Can start with the @constant tag and have trailing content", function(done) {
                const trailingContext = `
                Content that I expect to be part of \\@constant tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @desc Content that I don't expect to be part of \\@constant tag.
                    @constant ${trailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(2)
                        const tagChild = item.getChild(0)
                        expect(tagChild).to.be.an.instanceOf(TerminalNode)
                        expect(tagChild.text).to.equal("@constant")

                        const contentChild = item.getChild(1)
                        expect(contentChild).to.be.an.instanceOf(DocContentContext)
                        expect(contentChild.text).to.equal(dropWhitespace(trailingContext))
                    },
                    done
                )
            })

            it("Can start with the @readonly tag", function(done) {
                const nonTrailingContext = `
                @desc Content that I don't expect to be part of \\@readonly tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @readonly
                    ${nonTrailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(1)
                        const contentChild = item.getChild(0)
                        expect(contentChild).to.be.an.instanceOf(TerminalNode)
                        expect(contentChild.text).to.equal("@readonly")
                    },
                    done
                )
            })

            it("Can start with the @readonly tag and have trailing content", function(done) {
                const trailingContext = `
                Content that I expect to be part of \\@readonly tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @desc Content that I don't expect to be part of \\@readonly tag.
                    @readonly ${trailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(2)
                        const tagChild = item.getChild(0)
                        expect(tagChild).to.be.an.instanceOf(TerminalNode)
                        expect(tagChild.text).to.equal("@readonly")

                        const contentChild = item.getChild(1)
                        expect(contentChild).to.be.an.instanceOf(DocContentContext)
                        expect(contentChild.text).to.equal(dropWhitespace(trailingContext))
                    },
                    done
                )
            })

            it("Can start with the @readOnly tag", function(done) {
                const nonTrailingContext = `
                @desc Content that I don't expect to be part of \\@readOnly tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @readOnly
                    ${nonTrailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(1)
                        const contentChild = item.getChild(0)
                        expect(contentChild).to.be.an.instanceOf(TerminalNode)
                        expect(contentChild.text).to.equal("@readOnly")
                    },
                    done
                )
            })

            it("Can start with the @readOnly tag and have trailing content", function(done) {
                const trailingContext = `
                Content that I expect to be part of \\@readOnly tag.`
                const context = contextFactory<DocstringContext>(`--[[[
                    @desc Content that I don't expect to be part of \\@readOnly tag.
                    @readOnly ${trailingContext}
                ]]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docReadonly", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item).to.be.an.instanceOf(DocReadonlyContext)
                        expect(item.childCount).to.equal(2)
                        const tagChild = item.getChild(0)
                        expect(tagChild).to.be.an.instanceOf(TerminalNode)
                        expect(tagChild.text).to.equal("@readOnly")

                        const contentChild = item.getChild(1)
                        expect(contentChild).to.be.an.instanceOf(DocContentContext)
                        expect(contentChild.text).to.equal(dropWhitespace(trailingContext))
                    },
                    done
                )
            })
        })

        describe("docWriteonly", function() {
            it.skip("Can start with the @writeonly tag")

            it.skip("Can start with the @writeonly tag and have trailing content")

            it.skip("Can start with the @writeOnly tag")

            it.skip("Can start with the @writeOnly tag and have trailing content")
        })

        describe("docType", function() {
            it.skip("Can start with the @type tag")

            it.skip("Can start with the @type tag and have trailing content")

            // Try to parse a @type without a type declaration.
            it.skip("Requires a type declaration")
        })

        describe("docTypedef", function() {
            it.skip("Can start with the @typedef tag")

            it.skip("Can start with the @typedef tag and have trailing content")

            // Differs from "typeDeclaration", since that parser rule is not referenced.
            describe("Type Declaration", function() {
                // Try to parse a @typedef without a type declaration.
                it.skip("Requires a type declaration")

                it.skip("Accepts a type union")

                it.skip("Accepts a FUNCTION type")

                it.skip("Rejects a FUNCTION signature")

                it.skip("Accepts a TABLE type")
            })

            // Differs from "nameDeclaration", since that parser rule is not referenced.
            describe("NAME Declaration", function() {
                it.skip("Accepts a NAME")

                it.skip("Rejects a NAMESPACE")
            })
        })

        describe("docField", function() {
            it("Starts with the @field tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @field {number} item This \\@field tag declares a table element called "item"
                        of type "number" for some imaginary table.
                        The \\@field tag is only valid if it follows a \\@typedef tag that
                        declares a table.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docField", context.parser)

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

            describe("typeDeclaration", function() {
                it("Is not required", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @field item A \\@field declaration without a type is assumed to be the ANY type.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docField", context.parser)

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

                it("Rejects a function whose parameters contain a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @field {function(string|nil) => any} f
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @field {function(number, userdata|myType, nil) => any} f
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Rejects a function whose return list contains a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @field {function() => number|boolean,} f
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @field {function() => UserType,buffer.UNIT_VOLT|buffer.UNIT_AMP,table} f
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                /*
                 * Due to their similarity, any test additions should also be made to
                 *      docParameter
                 *      docType
                 *      docIndex
                 */
            })

            it("Requires a name declaration", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    @field {string}
                ]]`)
                expect(() => context.parser.docstring()).to.throw(Error)
            })

            it("Does not need trailing content", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @field item
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docField", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(NameDeclarationContext)
                    },
                    done
                )
            })

            /*
             * Due to their similarity, any test additions should also be made to
             *      docParameter
             */
        })

        describe("docIndex", function() {
            it("Starts with the @index tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @index {function} This \\@index tag declares an indexable element of
                        type "function" for some imaginary table.

                        The exact position of this element in the containing table changes
                        based on the total number of preceeding \\@index tags. If there
                        are no preceeding \\@index tags, then its position is "1".

                        The \\@index tag is only valid if it follows a \\@typedef tag that
                        declares a table.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docIndex", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(3)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TypeDeclarationContext)
                        expect(item.getChild(2)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            describe("typeDeclaration", function() {
                it("Is required", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @index
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Rejects a function whose parameters contain a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @index {function(string|nil) => any}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @index {function(number, userdata|myType, nil) => any}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Rejects a function whose return list contains a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @index {function() => number|boolean,}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @index {function() => UserType,buffer.UNIT_VOLT|buffer.UNIT_AMP,table}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                /*
                 * Due to their similarity, any test additions should also be made to
                 *      docParameter
                 *      docType
                 *      docField
                 */
            })

            it("Cannot have a name declaration", function() {
                expect(DocIndexContext).to.not.haveOwnProperty("nameDeclaration")
            })

            it("Does not need trailing content", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @index {string|number|nil}
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docIndex", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TypeDeclarationContext)
                    },
                    done
                )
            })

            /*
             * Due to their similarity, any test additions should also be made to
             *      docType
             *      docIndex
             */
        })

        describe("docSee", function() {
            it.skip("Starts with the @see tag")

            describe("seeTarget", function() {
                it.skip("Can be a NAME")

                it.skip("Can be a NAMESPACE")

                it.skip("Can be an inline link")
            })

            it.skip("Supports trailing content")
        })

        describe("docTsplink", function() {
            it.skip("Starts with the @tsplink tag")

            it.skip("Supports trailing content")
        })

        describe("docFirmware", function() {
            it.skip("Can start with the @fw tag")

            it.skip("Can start with the @firmware tag")

            describe("firmwareEntry", function() {
                it.skip("Firmware versions are one or more integers separated with DOTs")

                it.skip('Firmware versions support the ">" prefix')

                it.skip('Firmware versions support the "<=" prefix')

                it.skip('Firmware versions support the "==" prefix')

                it.skip("Requires one firmware version")

                it.skip("Supports multiple firmware versions separated by COMMAs")

                it.skip("Supports trailing COMMAs")
            })

            it.skip("Does not capture trailing content")
        })

        describe("docVersion", function() {
            it.skip("Can start with a @tsp-v1 tag")

            it.skip("Can start with a @tsp-v2 tag")

            describe("Version1", function() {
                it.skip("Can have a @v2 tag")

                it.skip("Rejects the @v1 tag")

                it.skip("Requires the @v2 tag to be the next tag")

                it.skip("Accepts a NAME after the @v2 tag")

                it.skip("Accepts a NAMESPACE after the @v2 tag")
            })

            describe("Version2", function() {
                it.skip("Can have a @v1 tag")

                it.skip("Rejects the @v2 tag")

                it.skip("Requires the @v1 tag to be the next tag")

                it.skip("Accepts a NAME after the @v1 tag")

                it.skip("Accepts a NAMESPACE after the @v1 tag")
            })

            it.skip("Does not capture trailing content")
        })

        describe("typeDeclaration", function() {
            it("Is a type surrounded by curly braces", function() {
                const context = contextFactory<TypeDeclarationContext>("{type}")
                return testTypeDeclaration(context)
            })

            describe("Single Type", function() {
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
                                const expectedType = TypeEntryContext
                                if (item instanceof expectedType) {
                                    expect(item.childCount).to.equal(1)
                                    const typeChild = item.getChild(0)
                                    expect(typeChild).to.be.an.instanceOf(test.type)
                                } else {
                                    expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                                }
                            },
                            done
                        )
                    })
                })
            })

            describe("Type Union", function() {
                it("Is two types delimited by a PIPE", function(done) {
                    const context = contextFactory<TypeDeclarationContext>(
                        "{awesomeType1|function(function(function()=>any)=>any)=>any}"
                    )
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/typeUnion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeUnionContext
                            if (item instanceof expectedType) {
                                const unionTypes = item.type()
                                expect(unionTypes).to.have.lengthOf(2)
                                expect(unionTypes[0]).to.be.an.instanceOf(NameTypeContext)
                                expect(unionTypes[1]).to.be.an.instanceOf(FunctionTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts more than two types delimited by PIPEs", function(done) {
                    const context = contextFactory<TypeDeclarationContext>(
                        "{trigger.timer.start.fractionalseconds|string|table|nil}"
                    )
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/typeUnion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeUnionContext
                            if (item instanceof expectedType) {
                                const unionTypes = item.type()
                                expect(unionTypes).to.have.lengthOf(4)
                                expect(unionTypes[0]).to.be.an.instanceOf(NamespaceTypeContext)
                                expect(unionTypes[1]).to.be.an.instanceOf(StringTypeContext)
                                expect(unionTypes[2]).to.be.an.instanceOf(TableTypeContext)
                                expect(unionTypes[3]).to.be.an.instanceOf(NilTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Is not one type", function() {
                    const context = contextFactory<TypeUnionContext>("string")
                    expect(() => context.parser.typeUnion()).to.throw(Error)
                })

                it("Supports trailing PIPEs", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{string|number|}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/typeUnion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeUnionContext
                            if (item instanceof expectedType) {
                                expect(item.PIPE()).to.be.lengthOf(2)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })
            })

            describe("Function Signature", function() {
                it("Rejects a signature containing only a COMMA", function() {
                    const context = contextFactory<TypeDeclarationContext>("{function(,) => any}")
                    expect(() => context.parser.typeDeclaration()).to.throw(Error)
                })

                it("Rejects a signature without a return type", function() {
                    const context = contextFactory<TypeDeclarationContext>("{function()}")
                    expect(() => context.parser.typeDeclaration()).to.throw(Error)

                    const context2 = contextFactory<TypeDeclarationContext>("{function(any)}")
                    expect(() => context2.parser.typeDeclaration()).to.throw(Error)
                })

                it("Rejects a signature with a return type list containing a type union", function() {
                    let context = contextFactory<TypeDeclarationContext>("{function() => string|nil,}")
                    expect(() => context.parser.typeDeclaration()).to.throw(Error)
                    context = contextFactory<TypeDeclarationContext>(
                        "{function(any) => userType, thread, smu.ON|beeper.beep, number}"
                    )
                    expect(() => context.parser.typeDeclaration()).to.throw(Error)
                })

                it("Accepts a signature with no parameters and one return type", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function() => any}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/type", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = FunctionTypeContext
                            if (item instanceof expectedType) {
                                // Check parameter types.
                                expect(item.typeList()).to.be.undefined

                                // Check return types.
                                const typeReturnEntryChild = item.typeReturnEntry()
                                expect(typeReturnEntryChild).to.not.be.undefined
                                const typeListChild = typeReturnEntryChild.typeList()
                                expect(typeListChild).to.not.be.undefined
                                expect(typeListChild.type()).to.have.lengthOf(1)
                                expect(typeListChild.getChild(0)).to.be.instanceOf(AnyTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with a COMMA trailing the return type", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function() => number,}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(
                        context.root,
                        "/typeDeclaration/typeEntry/type/typeReturnEntry/typeList",
                        context.parser
                    )

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeListContext
                            if (item instanceof expectedType) {
                                expect(item.COMMA()).to.have.lengthOf(1)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with one parameter and one return type", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function(string) => any}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/type", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = FunctionTypeContext
                            if (item instanceof expectedType) {
                                // Check parameter types.
                                const typeListChild = item.typeList()
                                expect(typeListChild).to.not.be.undefined
                                expect(typeListChild.type()).to.have.lengthOf(1)
                                expect(typeListChild.getChild(0)).to.be.an.instanceOf(StringTypeContext)

                                // Check return types.
                                const typeReturnEntryChild = item.typeReturnEntry()
                                expect(typeReturnEntryChild).to.not.be.undefined
                                const typeListChild2 = typeReturnEntryChild.typeList()
                                expect(typeListChild2).to.not.be.undefined
                                expect(typeListChild2.type()).to.have.lengthOf(1)
                                expect(typeListChild2.getChild(0)).to.be.instanceOf(AnyTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with a COMMA trailing one parameter type", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function(string,) => any}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(
                        context.root,
                        "/typeDeclaration/typeEntry/type/typeList",
                        context.parser
                    )

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeListContext
                            if (item instanceof expectedType) {
                                expect(item.COMMA()).to.have.lengthOf(1)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with multiple parameter types", function(done) {
                    const context = contextFactory<TypeDeclarationContext>(
                        "{function(userdata, thread, number) => any}"
                    )
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/type", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = FunctionTypeContext
                            if (item instanceof expectedType) {
                                const typeListChild = item.typeList()
                                expect(typeListChild).to.not.be.undefined
                                const paramTypes = typeListChild.type()
                                expect(paramTypes).to.have.lengthOf(3)
                                expect(paramTypes[0]).to.be.an.instanceOf(UserdataTypeContext)
                                expect(paramTypes[1]).to.be.an.instanceOf(ThreadTypeContext)
                                expect(paramTypes[2]).to.be.an.instanceOf(NumberTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with a COMMA trailing multiple parameter types", function(done) {
                    const context = contextFactory<TypeDeclarationContext>(
                        "{function(userdata, thread, number,) => any}"
                    )
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(
                        context.root,
                        "/typeDeclaration/typeEntry/type/typeList",
                        context.parser
                    )

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeListContext
                            if (item instanceof expectedType) {
                                expect(item.COMMA()).to.have.lengthOf(3)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with one param and a return type union", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function(any) => boolean|string|nil}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(
                        context.root,
                        "/typeDeclaration/typeEntry/type/typeReturnEntry/typeUnion",
                        context.parser
                    )

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeUnionContext
                            if (item instanceof expectedType) {
                                const unionTypes = item.type()
                                expect(unionTypes).to.have.lengthOf(3)
                                expect(unionTypes[0]).to.be.an.instanceOf(BooleanTypeContext)
                                expect(unionTypes[1]).to.be.an.instanceOf(StringTypeContext)
                                expect(unionTypes[2]).to.be.an.instanceOf(NilTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with a PIPE trailing a return type union", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function(any) => snakey_type|userdata|}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(
                        context.root,
                        "/typeDeclaration/typeEntry/type/typeReturnEntry/typeUnion",
                        context.parser
                    )

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeUnionContext
                            if (item instanceof expectedType) {
                                expect(item.PIPE()).to.have.lengthOf(2)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with multiple params and a return type union", function(done) {
                    const context = contextFactory<TypeDeclarationContext>(
                        "{function(myType, table, smu.FUNC_DC_CURRENT) => any | UserListType | function()=>function }"
                    )
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(context.root, "/typeDeclaration/typeEntry/type", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = FunctionTypeContext
                            if (item instanceof expectedType) {
                                // Check the parameter types.
                                const typeListChild = item.typeList()
                                expect(typeListChild).to.not.be.undefined
                                const paramTypes = typeListChild.type()
                                expect(paramTypes).to.have.lengthOf(3)
                                expect(paramTypes[0]).to.be.an.instanceOf(NameTypeContext)
                                expect(paramTypes[1]).to.be.an.instanceOf(TableTypeContext)
                                expect(paramTypes[2]).to.be.an.instanceOf(NamespaceTypeContext)

                                // Check the return type union.
                                const typeReturnEntryChild = item.typeReturnEntry()
                                expect(typeReturnEntryChild).to.not.be.undefined
                                const typeUnionChild = typeReturnEntryChild.typeUnion()
                                expect(typeUnionChild).to.not.be.undefined
                                const unionTypes = typeUnionChild.type()
                                expect(unionTypes).to.have.lengthOf(3)
                                expect(unionTypes[0]).to.be.an.instanceOf(AnyTypeContext)
                                expect(unionTypes[1]).to.be.an.instanceOf(NameTypeContext)
                                expect(unionTypes[2]).to.be.an.instanceOf(FunctionTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })

                it("Accepts a signature with one param and a return type list", function(done) {
                    const context = contextFactory<TypeDeclarationContext>("{function(any) => function, number, table}")
                    context.root = context.parser.typeDeclaration()

                    const actual = XPath.findAll(
                        context.root,
                        "/typeDeclaration/typeEntry/type/typeReturnEntry/typeList",
                        context.parser
                    )

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            const expectedType = TypeListContext
                            if (item instanceof expectedType) {
                                const listTypes = item.type()
                                expect(listTypes).to.have.lengthOf(3)
                                expect(listTypes[0]).to.be.an.instanceOf(FunctionTypeContext)
                                expect(listTypes[1]).to.be.an.instanceOf(NumberTypeContext)
                                expect(listTypes[2]).to.be.an.instanceOf(TableTypeContext)
                            } else {
                                expect.fail(item, expectedType, `Matched item is not of type ${expectedType.name}`)
                            }
                        },
                        done
                    )
                })
            })
        })

        describe("nameDeclaration", function() {
            it("Is a NAME", function() {
                const NAMEDECLARATION_PATTERN = "<NAME>"

                const context = contextFactory<NameDeclarationContext>("n")

                context.docstringPattern = context.parser.compileParseTreePattern(
                    NAMEDECLARATION_PATTERN,
                    TspDocParser.RULE_nameDeclaration
                )
                context.root = context.parser.nameDeclaration()

                return context.docstringPattern.then(pattern => {
                    return expect(
                        pattern.matches(context.root),
                        `Expected the parse tree to match "${NAMEDECLARATION_PATTERN}"`
                    ).to.be.true
                })
            })

            interface NameOptionalTest {
                title: string
                pattern: string
                value: string
            }

            new Array<NameOptionalTest>(
                ...[
                    {
                        title: "Can be a NIL default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><NIL><SQUARE_CLOSE>",
                        value: "nil",
                    },
                    {
                        title: "Can be a TRUE default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><TRUE><SQUARE_CLOSE>",
                        value: "true",
                    },
                    {
                        title: "Can be a FALSE default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><FALSE><SQUARE_CLOSE>",
                        value: "false",
                    },
                    {
                        title: "Can be an INT default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><INT><SQUARE_CLOSE>",
                        value: "3",
                    },
                    {
                        title: "Can be a negative INT default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><SIGN><INT><SQUARE_CLOSE>",
                        value: "-00",
                    },
                    {
                        title: "Can be a positive INT default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><SIGN><INT><SQUARE_CLOSE>",
                        value: "+217",
                    },
                    {
                        title: "Can be a HEX default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><HEX><SQUARE_CLOSE>",
                        value: "0xF",
                    },
                    {
                        title: "Can be a negative HEX default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><SIGN><HEX><SQUARE_CLOSE>",
                        value: "-0X0A",
                    },
                    {
                        title: "Can be a positive HEX default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><SIGN><HEX><SQUARE_CLOSE>",
                        value: "+0xBEEF",
                    },
                    {
                        title: "Can be a FLOAT default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><FLOAT><SQUARE_CLOSE>",
                        value: ".00217E+3",
                    },
                    {
                        title: "Can be a negative FLOAT default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><SIGN><FLOAT><SQUARE_CLOSE>",
                        value: "-0e5",
                    },
                    {
                        title: "Can be a positive FLOAT default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><SIGN><FLOAT><SQUARE_CLOSE>",
                        value: "+314.15e-2",
                    },
                    {
                        title: "Can be a NORMALSTRING default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><NORMALSTRING><SQUARE_CLOSE>",
                        value: '"\\t\\" is a\\r\\ndouble quote"',
                    },
                    {
                        title: "Can be a CHARSTRING default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><CHARSTRING><SQUARE_CLOSE>",
                        value: "'\\t\\' is a\\nsingle quote'",
                    },
                    {
                        title: "Can be a NAME default value",
                        pattern: "<SQUARE_OPEN><NAME><EQUALS><NAME><SQUARE_CLOSE>",
                        value: "MyCustomType",
                    },
                ]
            ).forEach(test => {
                it(test.title, function() {
                    const context = contextFactory<NameDeclarationContext>(`[n=${test.value}]`)

                    context.docstringPattern = context.parser.compileParseTreePattern(
                        test.pattern,
                        TspDocParser.RULE_nameDeclaration
                    )
                    context.root = context.parser.nameDeclaration()

                    return context.docstringPattern.then(pattern => {
                        return expect(
                            pattern.matches(context.root),
                            `Expected the parse tree to match "${test.pattern}"`
                        ).to.be.true
                    })
                })
            })
        })
    })
})
