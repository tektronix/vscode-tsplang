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
import { ANTLRInputStream, CommonToken, CommonTokenStream, ParserRuleContext } from "antlr4ts"
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
    DocTypeContext,
    FirmwareEntryContext,
    FunctionTypeContext,
    LinkContext,
    NameDeclarationContext,
    NamespaceTypeContext,
    NameTypeContext,
    NilTypeContext,
    NumberTypeContext,
    SeeTargetContext,
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
                    This (") double-quote should't match the one below.

                    @returns "
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
                    @returns {number} DocContent that belongs to the \\@returns tag. Surprise '
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
            it("Can start with the @writeonly tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @writeonly The \\@writeonly tag indicates that the associated symbol
                        can be written to, but not read from.

                        This tag exists to service the \`localnode.password\` command,
                        but may be used elsewhere.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docWriteonly", context.parser)

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

            it("Can start with the @writeOnly tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @writeOnly The \\@writeOnly tag (with a capital "o") is an alias for
                        the \\@writeonly tag (with a lowercase "o").
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docWriteonly", context.parser)

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

            it("Does not need trailing content", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    @writeonly
                    @writeOnly
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docWriteonly", context.parser)

                const expectedSize = 2
                expect(actual).to.have.lengthOf(expectedSize)
                multiItemSetTextFixture(actual, expectedSize, item => {
                    expect(item.childCount).to.equal(1)
                    expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                })
            })
        })

        describe("docType", function() {
            it("Starts with the @type tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @type {smu.ON|smu.OFF} The \\@type tag is used to declare the
                        acceptable input types of a table field.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docType", context.parser)

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
                        @type
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Rejects a function whose parameters contain a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @type {function(string|nil) => any}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @type {function(number, userdata|myType, nil) => any}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Rejects a function whose return list contains a type union", function() {
                    let context = contextFactory<DocstringContext>(`--[[[
                        @type {function() => number|boolean,}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                    context = contextFactory<DocstringContext>(`--[[[
                        @type {function() => UserType,buffer.UNIT_VOLT|buffer.UNIT_AMP,table}
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                /*
                 * Due to their similarity, any test additions should also be made to
                 *      docParameter
                 *      docField
                 *      docIndex
                 */
            })

            it("Cannot have a name declaration", function() {
                expect(DocTypeContext).to.not.haveOwnProperty("nameDeclaration")
            })

            it("Does not need trailing content", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @type {string|number|nil}
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docType", context.parser)

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
             *      docIndex
             */
        })

        describe("docTypedef", function() {
            it("Starts with the @typedef tag", function(done) {
                const type = "table"
                const name = "NewTypeName"

                const context = contextFactory<DocstringContext>(`--[[[
                    @typedef {${type}} ${name} The \\@typedef (or type definition) tag
                        declares a complex type for use in other documentation strings.
                        \\@typedef types *cannot* be used outside of documentation
                        strings.

                        Valid \\@typedef types include: tables, functions, and type
                        unions.

                        When the \\@typedef is declared to be a table, the \\@index and
                        \\@field tags can used to describe its contents.

                        When the \\@typedef is declared to be a function, the \\@param/
                        \\@parameter and \\@return/\\@returns tags can be used to
                        describe its signature.

                        There are no special content-modifying tags when a \\@typedef is
                        declared as a type union.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docTypedef", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(6)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                        const typeChild = item.getChild(2)
                        expect(typeChild).to.be.an.instanceOf(TerminalNode)
                        expect(typeChild.text).to.equal(type)
                        expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                        const nameChild = item.getChild(4)
                        expect(nameChild).to.be.an.instanceOf(TerminalNode)
                        expect(nameChild.text).to.equal(name)
                        expect(item.getChild(5)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            // Differs from "typeDeclaration", since that parser rule is not referenced.
            describe("Type Declaration", function() {
                it("Requires a type declaration", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef MyNewType
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Accepts a type union", function(done) {
                    const type = "function|table"
                    const name = "typeUnionName"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef {${type}} ${name} Can be a type union.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docTypedef", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(6)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                            const typeChild = item.getChild(2)
                            expect(typeChild).to.be.an.instanceOf(TypeUnionContext)
                            expect(typeChild.text).to.equal(type)
                            expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                            const nameChild = item.getChild(4)
                            expect(nameChild).to.be.an.instanceOf(TerminalNode)
                            expect(nameChild.text).to.equal(name)
                            expect(item.getChild(5)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Accepts a FUNCTION type", function(done) {
                    const type = "function"
                    const name = "FunctionTypeName"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef {${type}} ${name} Can be a function.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docTypedef", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(6)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                            const typeChild = item.getChild(2)
                            expect(typeChild).to.be.an.instanceOf(TerminalNode)
                            expect(typeChild.text).to.equal(type)
                            expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                            const nameChild = item.getChild(4)
                            expect(nameChild).to.be.an.instanceOf(TerminalNode)
                            expect(nameChild.text).to.equal(name)
                            expect(item.getChild(5)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Rejects a FUNCTION signature", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef {function() => any} badType Use the \\@param and
                            \\@return tags for signature information.
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Accepts a TABLE type", function(done) {
                    const type = "table"
                    const name = "tableTypeName"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef {${type}} ${name} Can be a table.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docTypedef", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(6)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                            const typeChild = item.getChild(2)
                            expect(typeChild).to.be.an.instanceOf(TerminalNode)
                            expect(typeChild.text).to.equal(type)
                            expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                            const nameChild = item.getChild(4)
                            expect(nameChild).to.be.an.instanceOf(TerminalNode)
                            expect(nameChild.text).to.equal(name)
                            expect(item.getChild(5)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })
            })

            // Differs from "nameDeclaration", since that parser rule is not referenced.
            describe("NAME Declaration", function() {
                it("Accepts a NAME", function(done) {
                    const type = "function"
                    const name = "validLuaVariableName1"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef {${type}} ${name} NAME tokens only.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docTypedef", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(6)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                            const typeChild = item.getChild(2)
                            expect(typeChild).to.be.an.instanceOf(TerminalNode)
                            expect(typeChild.text).to.equal(type)
                            expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                            const nameChild = item.getChild(4)
                            expect(nameChild).to.be.an.instanceOf(TerminalNode)
                            expect(nameChild.text).to.equal(name)
                            expect(item.getChild(5)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Rejects a NAMESPACE", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @typedef {boolean|number} name.spaces Are not allowed.
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })
            })

            it("Does not need trailing content", function(done) {
                const type = "function"
                const name = "snakey_type_name"

                const context = contextFactory<DocstringContext>(`--[[[
                    @typedef {${type}} ${name}
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docTypedef", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(5)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(TerminalNode)
                        const typeChild = item.getChild(2)
                        expect(typeChild).to.be.an.instanceOf(TerminalNode)
                        expect(typeChild.text).to.equal(type)
                        expect(item.getChild(3)).to.be.an.instanceOf(TerminalNode)
                        const nameChild = item.getChild(4)
                        expect(nameChild).to.be.an.instanceOf(TerminalNode)
                        expect(nameChild.text).to.equal(name)
                    },
                    done
                )
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
            it("Starts with the @see tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @see reference The \\@see tag is used to point the reader toward
                        related information.

                        The reference target immediately follows the \\@see tag and is a
                        symbol name in the current scope, a fully qualified namespace in
                        the current scope, or an inline {\\@link} tag.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docSee", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(3)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(SeeTargetContext)
                        expect(item.getChild(2)).to.be.an.instanceOf(DocContentContext)
                    },
                    done
                )
            })

            describe("seeTarget", function() {
                it("Accepts a NAME", function(done) {
                    const target = "ValidLuaVariableName314"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @see ${target} Can be a name.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docSee", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            const targetChild = item.getChild(1)
                            expect(targetChild).to.be.an.instanceOf(SeeTargetContext)
                            expect(targetChild.childCount).to.equal(1)
                            const nameChild = targetChild.getChild(0)
                            expect(nameChild).to.be.an.instanceOf(TerminalNode)
                            expect(nameChild.text).to.equal(target)
                            expect(item.getChild(2)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Accepts a NAMESPACE", function(done) {
                    const target = "some.long.command.namespace"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @see ${target} Can be a namespace.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docSee", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            const targetChild = item.getChild(1)
                            expect(targetChild).to.be.an.instanceOf(SeeTargetContext)
                            expect(targetChild.childCount).to.equal(1)
                            const nameChild = targetChild.getChild(0)
                            expect(nameChild).to.be.an.instanceOf(TerminalNode)
                            expect(nameChild.text).to.equal(target)
                            expect(item.getChild(2)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Accepts an inline link", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @see {@link https://github.com/tektronix/vscode-tsplang
                            | Project Home} Can be an inline link.
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docSee", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            const targetChild = item.getChild(1)
                            expect(targetChild).to.be.an.instanceOf(SeeTargetContext)
                            expect(targetChild.childCount).to.equal(1)
                            const nameChild = targetChild.getChild(0)
                            expect(nameChild).to.be.an.instanceOf(LinkContext)
                            expect(item.getChild(2)).to.be.an.instanceOf(DocContentContext)
                        },
                        done
                    )
                })

                it("Rejects a raw URL", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @see https://github.com/tektronix/vscode-tsplang Raw URLs are bad.
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })
            })

            it("Does not need trailing content", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @see target
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docSee", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(SeeTargetContext)
                    },
                    done
                )
            })
        })

        describe("docTsplink", function() {
            it("Starts with the @tsplink tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @tsplink The \\@tsplink tag indicates that the associated command is
                        available over TSP-Link.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docTsplink", context.parser)

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

            it("Does not need trailing content", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    @tsplink
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "/docstring/docblock/docTsplink", context.parser)

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
        })

        describe("docFirmware", function() {
            it("Can start with the @fw tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    The \\@fw tag indicates the instrument firmware versions in which
                    the associated command is available.

                    @fw >0.0.0
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(FirmwareEntryContext)
                    },
                    done
                )
            })

            it("Can start with the @firmware tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    The \\@firmware tag is an alias for the \\@fw tag.

                    @firmware >0.0.0
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(2)
                        expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                        expect(item.getChild(1)).to.be.an.instanceOf(FirmwareEntryContext)
                    },
                    done
                )
            })

            describe("firmwareEntry", function() {
                it("Is required", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @fw
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it('Accepts the ">" prefix', function(done) {
                    const operator = ">"
                    const firmware = "3.14.159"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @fw ${operator}${firmware}
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(2)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            const firmwareEntryChild = item.getChild(1)
                            expect(firmwareEntryChild).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(firmwareEntryChild.childCount).to.equal(2)
                            const operatorChild = firmwareEntryChild.getChild(0)
                            expect(operatorChild).to.be.an.instanceOf(TerminalNode)
                            expect(operatorChild.text).to.equal(operator)
                            const firmwareChild = firmwareEntryChild.getChild(1)
                            expect(firmwareChild).to.be.an.instanceOf(TerminalNode)
                            expect(firmwareChild.text).to.equal(firmware)
                        },
                        done
                    )
                })

                it('Accepts the "<=" prefix', function(done) {
                    const operator = "<="
                    const firmware = "271.8.28"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @fw ${operator}${firmware}
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(2)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            const firmwareEntryChild = item.getChild(1)
                            expect(firmwareEntryChild).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(firmwareEntryChild.childCount).to.equal(2)
                            const operatorChild = firmwareEntryChild.getChild(0)
                            expect(operatorChild).to.be.an.instanceOf(TerminalNode)
                            expect(operatorChild.text).to.equal(operator)
                            const firmwareChild = firmwareEntryChild.getChild(1)
                            expect(firmwareChild).to.be.an.instanceOf(TerminalNode)
                            expect(firmwareChild.text).to.equal(firmware)
                        },
                        done
                    )
                })

                it('Accepts the "==" prefix', function(done) {
                    const operator = "=="
                    const firmware = "01.01.1970"

                    const context = contextFactory<DocstringContext>(`--[[[
                        @fw ${operator}${firmware}
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(2)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            const firmwareEntryChild = item.getChild(1)
                            expect(firmwareEntryChild).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(firmwareEntryChild.childCount).to.equal(3)
                            const operatorChild1 = firmwareEntryChild.getChild(0)
                            expect(operatorChild1).to.be.an.instanceOf(TerminalNode)
                            expect(operatorChild1.text).to.equal(operator[0])
                            const operatorChild2 = firmwareEntryChild.getChild(1)
                            expect(operatorChild2).to.be.an.instanceOf(TerminalNode)
                            expect(operatorChild2.text).to.equal(operator[1])
                            const firmwareChild = firmwareEntryChild.getChild(2)
                            expect(firmwareChild).to.be.an.instanceOf(TerminalNode)
                            expect(firmwareChild.text).to.equal(firmware)
                        },
                        done
                    )
                })

                it("Accepts multiple entries separated by COMMAs", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @fw >0.0.0, <=1.0.0, ==2.0.0
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(6)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(item.getChild(2)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(3)).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(item.getChild(4)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(5)).to.be.an.instanceOf(FirmwareEntryContext)
                        },
                        done
                    )
                })

                it("Supports trailing COMMAs", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @fw >1.23.456, <=7890.12345.678901, ==2345678.90123456.789012345,
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(7)
                            expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(1)).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(item.getChild(2)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(3)).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(item.getChild(4)).to.be.an.instanceOf(TerminalNode)
                            expect(item.getChild(5)).to.be.an.instanceOf(FirmwareEntryContext)
                            expect(item.getChild(6)).to.be.an.instanceOf(TerminalNode)
                        },
                        done
                    )
                })
            })

            it("Does not capture trailing content", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    @fw >0.0.0 Trailing content isn't included with the firmware rule.

                    @firmware <=1.0.0 More trailing content that isn't captured.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docFirmware", context.parser)

                const expectedSize = 2
                expect(actual).to.have.lengthOf(expectedSize)
                multiItemSetTextFixture(actual, expectedSize, item => {
                    expect(item.childCount).to.equal(2)
                    expect(item.getChild(0)).to.be.an.instanceOf(TerminalNode)
                    expect(item.getChild(1)).to.be.an.instanceOf(FirmwareEntryContext)
                })
            })
        })

        describe("docVersion", function() {
            it("Can start with a @tsp-v1 tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    The \\@tsp-v1 tag indicates the associated command is specific to
                    TSP version 1.

                    TSP version 1 instruments have the "smuA" namespace, while TSP
                    version 2 instruments favor the "smu" namespace.

                    @tsp-v1
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(1)
                        const tspVersionChild = item.getChild(0)
                        expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                        expect(tspVersionChild.text).to.equal("@tsp-v1")
                    },
                    done
                )
            })

            it("Can start with a @tsp-v2 tag", function(done) {
                const context = contextFactory<DocstringContext>(`--[[[
                    The \\@tsp-v2 tag indicates the associated command is specific to
                    TSP version 2.

                    TSP version 2 instruments have the "smu" namespace, while TSP
                    version 1 instruments favor the "smuA" namespace.

                    @tsp-v2
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                expect(actual).to.have.lengthOf(1)
                singleItemSetTestFixture(
                    actual,
                    item => {
                        expect(item.childCount).to.equal(1)
                        const tspVersionChild = item.getChild(0)
                        expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                        expect(tspVersionChild.text).to.equal("@tsp-v2")
                    },
                    done
                )
            })

            describe("Version 1", function() {
                it("Can have a @v2 tag", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        The \\@v2 tag is a special reference tag that associates symbols
                        between TSP versions. For example, the "smuA" symbol in TSP
                        version 1 is equivalent to the "smu" symbol in TSP version 2.

                        It must follow a \\@tsp-v1 tag.

                        @tsp-v1
                        @v2 smu
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            // Check the TSP version tag.
                            const tspVersionChild = item.getChild(0)
                            expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                            expect(tspVersionChild.text).to.equal("@tsp-v1")
                            // Check the association tag.
                            const associationChild = item.getChild(1)
                            expect(associationChild).to.be.an.instanceOf(TerminalNode)
                            expect(associationChild.text).to.equal("@v2")
                            // Check the associated reference target.
                            const referenceChild = item.getChild(2)
                            expect(referenceChild).to.be.an.instanceOf(TerminalNode)
                            expect(referenceChild.text).to.equal("smu")
                        },
                        done
                    )
                })

                it("Rejects the @v1 tag", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v1
                        @v1 smuA
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Requires the @v2 tag to be the next tag", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v1
                        @readonly
                        @v2 smu
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Accepts a NAME after the @v2 tag", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v1
                        @v2 version2UniqueName
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            // Check the TSP version tag.
                            const tspVersionChild = item.getChild(0)
                            expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                            expect(tspVersionChild.text).to.equal("@tsp-v1")
                            // Check the association tag.
                            const associationChild = item.getChild(1)
                            expect(associationChild).to.be.an.instanceOf(TerminalNode)
                            expect(associationChild.text).to.equal("@v2")
                            // Check the associated reference target.
                            const referenceChild = item.getChild(2)
                            expect(referenceChild).to.be.an.instanceOf(TerminalNode)
                            expect(referenceChild.text).to.equal("version2UniqueName")
                            // Check the token type.
                            const referencePayload = referenceChild.payload
                            expect(referencePayload).to.be.an.instanceOf(CommonToken)
                            expect((referencePayload as CommonToken).type).to.equal(TspDocParser.NAME)
                        },
                        done
                    )
                })

                it("Accepts a NAMESPACE after the @v2 tag", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v1
                        @v2 version_2.unique.namespace
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            // Check the TSP version tag.
                            const tspVersionChild = item.getChild(0)
                            expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                            expect(tspVersionChild.text).to.equal("@tsp-v1")
                            // Check the association tag.
                            const associationChild = item.getChild(1)
                            expect(associationChild).to.be.an.instanceOf(TerminalNode)
                            expect(associationChild.text).to.equal("@v2")
                            // Check the associated reference target.
                            const referenceChild = item.getChild(2)
                            expect(referenceChild).to.be.an.instanceOf(TerminalNode)
                            expect(referenceChild.text).to.equal("version_2.unique.namespace")
                            // Check the token type.
                            const referencePayload = referenceChild.payload
                            expect(referencePayload).to.be.an.instanceOf(CommonToken)
                            expect((referencePayload as CommonToken).type).to.equal(TspDocParser.NAMESPACE)
                        },
                        done
                    )
                })
            })

            describe("Version 2", function() {
                it("Can have a @v1 tag", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        The \\@v1 tag is a special reference tag that associates symbols
                        between TSP versions. For example, the "smu" symbol in TSP
                        version 2 is equivalent to the "smuA" symbol in TSP version 1.

                        It must follow a \\@tsp-v2 tag.

                        @tsp-v2
                        @v1 smuA
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            // Check the TSP version tag.
                            const tspVersionChild = item.getChild(0)
                            expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                            expect(tspVersionChild.text).to.equal("@tsp-v2")
                            // Check the association tag.
                            const associationChild = item.getChild(1)
                            expect(associationChild).to.be.an.instanceOf(TerminalNode)
                            expect(associationChild.text).to.equal("@v1")
                            // Check the associated reference target.
                            const referenceChild = item.getChild(2)
                            expect(referenceChild).to.be.an.instanceOf(TerminalNode)
                            expect(referenceChild.text).to.equal("smuA")
                        },
                        done
                    )
                })

                it("Rejects the @v2 tag", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v2
                        @v2 smu
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Requires the @v1 tag to be the next tag", function() {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v2
                        @tsplink
                        @v1 smu
                    ]]`)
                    expect(() => context.parser.docstring()).to.throw(Error)
                })

                it("Accepts a NAME after the @v1 tag", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v2
                        @v1 version1_unique_name
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            // Check the TSP version tag.
                            const tspVersionChild = item.getChild(0)
                            expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                            expect(tspVersionChild.text).to.equal("@tsp-v2")
                            // Check the association tag.
                            const associationChild = item.getChild(1)
                            expect(associationChild).to.be.an.instanceOf(TerminalNode)
                            expect(associationChild.text).to.equal("@v1")
                            // Check the associated reference target.
                            const referenceChild = item.getChild(2)
                            expect(referenceChild).to.be.an.instanceOf(TerminalNode)
                            expect(referenceChild.text).to.equal("version1_unique_name")
                            // Check the token type.
                            const referencePayload = referenceChild.payload
                            expect(referencePayload).to.be.an.instanceOf(CommonToken)
                            expect((referencePayload as CommonToken).type).to.equal(TspDocParser.NAME)
                        },
                        done
                    )
                })

                it("Accepts a NAMESPACE after the @v1 tag", function(done) {
                    const context = contextFactory<DocstringContext>(`--[[[
                        @tsp-v2
                        @v1 Version1.Unique.Namespace
                    ]]`)
                    context.root = context.parser.docstring()

                    const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                    expect(actual).to.have.lengthOf(1)
                    singleItemSetTestFixture(
                        actual,
                        item => {
                            expect(item.childCount).to.equal(3)
                            // Check the TSP version tag.
                            const tspVersionChild = item.getChild(0)
                            expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                            expect(tspVersionChild.text).to.equal("@tsp-v2")
                            // Check the association tag.
                            const associationChild = item.getChild(1)
                            expect(associationChild).to.be.an.instanceOf(TerminalNode)
                            expect(associationChild.text).to.equal("@v1")
                            // Check the associated reference target.
                            const referenceChild = item.getChild(2)
                            expect(referenceChild).to.be.an.instanceOf(TerminalNode)
                            expect(referenceChild.text).to.equal("Version1.Unique.Namespace")
                            // Check the token type.
                            const referencePayload = referenceChild.payload
                            expect(referencePayload).to.be.an.instanceOf(CommonToken)
                            expect((referencePayload as CommonToken).type).to.equal(TspDocParser.NAMESPACE)
                        },
                        done
                    )
                })
            })

            it("Does not capture trailing content", function() {
                const context = contextFactory<DocstringContext>(`--[[[
                    @tsp-v1 This is some trailing content that should not be captured.
                    @tsp-v2 Additional content that should not be captured.
                ]]`)
                context.root = context.parser.docstring()

                const actual = XPath.findAll(context.root, "docstring/docblock/docVersion", context.parser)

                const expectedSize = 2
                expect(actual).to.have.lengthOf(expectedSize)
                multiItemSetTextFixture(actual, expectedSize, item => {
                    expect(item.childCount).to.equal(1)
                    const tspVersionChild = item.getChild(0)
                    expect(tspVersionChild).to.be.an.instanceOf(TerminalNode)
                    switch (tspVersionChild.text) {
                        case "@tsp-v1":
                        case "@tsp-v2":
                            break
                        default:
                            expect.fail(tspVersionChild.text, '"@tsp-v1" or "@tsp-v2"', "unexpected version tag value")
                    }
                })
            })
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
