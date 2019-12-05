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
import { CommonToken } from "antlr4ts"
import { expect } from "chai"
import "mocha"

import { TspCommonToken } from "../out/tspCommonToken"

describe("antlr4-tsplang", function() {
    describe("TspCommonToken", function() {
        it("is a CommonToken", function() {
            expect(new TspCommonToken(1)).is.an.instanceOf(CommonToken)
        })

        describe(".fromToken", function() {
            describe("given a TspCommonToken", function() {
                it("returns the unmodified object", function() {
                    const t = new TspCommonToken(1)
                    t.leadingTrivia.push(...[new TspCommonToken(2), new TspCommonToken(3)])
                    t.trailingTrivia.push(new TspCommonToken(4))
                    t["symbol"] = Symbol()

                    expect(TspCommonToken.fromToken(t)).to.deep.equal(t)
                })
            })

            describe("given a CommonToken", function() {
                it("returns a modified object", function() {
                    const t = new CommonToken(1)
                    t["symbol"] = Symbol()

                    expect(TspCommonToken.fromToken(t)["symbol"]).to.equal(t["symbol"])
                })

                it("returns an object whose trivia arrays are initialized", function() {
                    const t = TspCommonToken.fromToken(new CommonToken(1))

                    expect(t.leadingTrivia).to.not.be.undefined
                    expect(t.leadingTrivia).to.have.lengthOf(0)
                    expect(t.trailingTrivia).to.not.be.undefined
                    expect(t.trailingTrivia).to.have.lengthOf(0)
                })

                it("returns an object with a fullSpan property descriptor", function() {
                    const t = TspCommonToken.fromToken(new CommonToken(1))

                    expect(t).to.haveOwnPropertyDescriptor("fullSpan")
                })

                it("returns an object with a span property descriptor", function() {
                    const t = TspCommonToken.fromToken(new CommonToken(1))

                    expect(t).to.haveOwnPropertyDescriptor("span")
                })
            })
        })
    })
})
