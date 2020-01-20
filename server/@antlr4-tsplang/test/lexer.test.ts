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

import { TspDocLexer } from "../out/TspDocLexer.generated"
import { TspLexer } from "../out/TspLexer.generated"
import { TspShebangLexer } from "../out/TspShebangLexer.generated"

/**
 * These tests exist to improve coverage statistics of generated files and are
 * in no way a substitute for proper unit tests.
 */
describe("antlr4-tsplang", function() {
    describe("Generated Lexers", function() {
        const inputStream = new ANTLRInputStream("")

        describe("TspLexer", function() {
            const lexer = new TspLexer(inputStream)
            const sempreds = (function(): string[] {
                const result: string[] = []
                Object.getOwnPropertyNames(Object.getPrototypeOf(lexer)).forEach(property => {
                    if (property.endsWith("_sempred")) {
                        result.push(property)
                    }
                })

                return result
            })()

            it("MUST have a #grammarFileName", function() {
                expect(lexer).to.have.property("grammarFileName")
            })

            it("MUST have a #ruleNames", function() {
                expect(lexer).to.have.property("ruleNames")
            })

            it("MUST have a #serializedATN", function() {
                expect(lexer).to.have.property("serializedATN")
            })

            it("MUST have a #channelNames", function() {
                expect(lexer).to.have.property("channelNames")
            })

            it("MUST have a #modeNames", function() {
                expect(lexer).to.have.property("modeNames")
            })

            describe("Semantic Predicates", function() {
                it("MUST have a #sempred() that returns true on bad ruleIndex", function() {
                    expect(lexer.sempred(undefined, -1, -1)).to.be.true
                })

                sempreds.forEach(sempred => {
                    it(`MUST have a #${sempred}() that returns true on bad predIndex`, function() {
                        expect(lexer[sempred](undefined, -1)).to.be.true
                    })
                })
            })
        })

        describe("TspDocLexer", function() {
            const lexer = new TspDocLexer(inputStream)
            const sempreds = (function(): string[] {
                const result: string[] = []
                Object.getOwnPropertyNames(Object.getPrototypeOf(lexer)).forEach(property => {
                    if (property.endsWith("_sempred")) {
                        result.push(property)
                    }
                })

                return result
            })()

            it("MUST have a #grammarFileName", function() {
                expect(lexer).to.have.property("grammarFileName")
            })

            it("MUST have a #ruleNames", function() {
                expect(lexer).to.have.property("ruleNames")
            })

            it("MUST have a #serializedATN", function() {
                expect(lexer).to.have.property("serializedATN")
            })

            it("MUST have a #channelNames", function() {
                expect(lexer).to.have.property("channelNames")
            })

            it("MUST have a #modeNames", function() {
                expect(lexer).to.have.property("modeNames")
            })

            describe("Semantic Predicates", function() {
                it("MUST have a #sempred() that returns true on bad ruleIndex", function() {
                    expect(lexer.sempred(undefined, -1, -1)).to.be.true
                })

                sempreds.forEach(sempred => {
                    it(`MUST have a #${sempred}() that returns true on bad predIndex`, function() {
                        expect(lexer[sempred](undefined, -1)).to.be.true
                    })
                })
            })
        })

        describe("TspShebangLexer", function() {
            const lexer = new TspShebangLexer(inputStream)

            it("MUST have a #grammarFileName", function() {
                expect(lexer).to.have.property("grammarFileName")
            })

            it("MUST have a #ruleNames", function() {
                expect(lexer).to.have.property("ruleNames")
            })

            it("MUST have a #serializedATN", function() {
                expect(lexer).to.have.property("serializedATN")
            })

            it("MUST have a #channelNames", function() {
                expect(lexer).to.have.property("channelNames")
            })

            it("MUST have a #modeNames", function() {
                expect(lexer).to.have.property("modeNames")
            })
        })
    })
})
