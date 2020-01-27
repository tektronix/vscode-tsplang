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
/*
 import { ANTLRInputStream, CommonToken, CommonTokenStream, ParserRuleContext } from "antlr4ts"
import { ParseTree, TerminalNode } from "antlr4ts/tree"
import { XPath } from "antlr4ts/tree/xpath"
import { expect } from "chai"
*/
import "mocha"
/*
import { TspLexer } from "../out/TspLexer.generated"
import {
    ArgsContext,
    AssignmentContext,
    ChunkContext,
    ExpressionContext,
    FieldContext,
    FieldListContext,
    FunctionCallContext,
    IndexContext,
    NumberContext,
    OperatorAddSubContext,
    OperatorAndContext,
    OperatorBitwiseAndContext,
    OperatorBitwiseOrContext,
    OperatorBitwiseShiftContext,
    OperatorBitwiseXorContext,
    OperatorComparisonContext,
    OperatorMulDivContext,
    OperatorOrContext,
    OperatorPowerContext,
    OperatorStrcatContext,
    OperatorUnaryContext,
    PrefixContext,
    StatementContext,
    StringContext,
    SuffixContext,
    TableConstructorContext,
    TspParser,
    ValueContext,
    VariableContext,
} from "../out/TspParser.generated"

import {
    contextFactoryConstructor,
    multiItemXPathSetTestFixture,
    singleItemXPathSetTestFixture,
    TestContext,
} from "./parser.fixture"

import { ERROR_THROWER, ErrorValidator } from "./errorListener.fixture"
*/

describe("antlr4-tsplang", function() {
    describe("TspParser", function() {
        describe("string", function() {
            it.skip("Can be a NORMALSTRING token.")

            it.skip("Can be a CHARSTRING token")

            it.skip("Can be a LONGSTRING token")
        })

        describe("number", function() {
            it.skip("Can be an INT token")

            it.skip("Can be a HEX token")

            it.skip("Can be a FLOAT token")
        })

        describe("operatorUnary", function() {
            it.skip('Can be a "not" string')

            it.skip('Can be a "-" string')

            it.skip("Can be a LOGICAL_NOT token")
        })

        describe("operatorPower", function() {
            it.skip("Can be a POW token")
        })

        describe("operatorMulDiv", function() {
            it.skip('Can be a "*" string')

            it.skip('Can be a "/" string')
        })

        describe("operatorAddSub", function() {
            it.skip('Can be a "+" string')

            it.skip('Can be a "-" string')
        })

        describe("operatorStrcat", function() {
            it.skip('Can be a ".." string')
        })

        describe("operatorBitwiseShift", function() {
            it.skip("Can be a BIT_LS token")
            it.skip("Can be a BIT_RS token")
        })

        describe("operatorBitwiseAnd", function() {
            it.skip("Can be a BIT_AND token")
        })

        describe("operatorBitwiseXor", function() {
            it.skip("Can be a BIT_XOR token")
        })

        describe("operatorBitwiseOr", function() {
            it.skip("Can be a BIT_OR token")
        })

        describe("operatorComparison", function() {
            it.skip("Can be an LT token")
            it.skip("Can be a GT token")
            it.skip('Can be a "<=" string')
            it.skip('Can be a ">=" string')
            it.skip("Can be a NE token")
            it.skip('Can be a "==" string')
        })

        describe("operatorAnd", function() {
            it.skip("Can be an AND token")
        })

        describe("operatorOr", function() {
            it.skip("Can be an OR token")
        })

        describe("field", function() {
            it.skip("Can use rule 1 of 3")
            it.skip("Can use rule 2 of 3")
            it.skip("Can use rule 3 of 3")
        })

        describe("fieldlist", function() {
            it.skip("Can parse multiple fields on a single line")
        })

        describe("tableConstructor", function() {
            it.skip("Can parse and empty table constructor")
            it.skip("Can parse a table constructor containing a fieldlist")
        })

        describe("args", function() {
            it.skip("")
        })

        describe("functionCall", function() {
            it.skip("")
        })

        describe("variable", function() {
            it.skip("")
        })

        describe("index", function() {
            it.skip("")
        })

        describe("suffix", function() {
            it.skip("")
        })

        describe("prefix", function() {
            it.skip("")
        })

        describe("expression", function() {
            it.skip("")
        })

        describe("value", function() {
            it.skip("")
        })

        describe("assignment", function() {
            it.skip("")
        })

        describe("statement", function() {
            it.skip("")
        })

        describe("chunk", function() {
            it.skip("")
        })
    })
})
