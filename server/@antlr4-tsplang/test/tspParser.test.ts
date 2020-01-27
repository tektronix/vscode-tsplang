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
import { XPath } from "antlr4ts/tree/xpath"
import { expect } from "chai"
import "mocha"

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
            it.skip('Parses an operatorUnary composed of a "not" string')

            it.skip('Parses an operatorUnary composed of a "-" string')

            it.skip("Parses an operatorUnary composed of a LOGICAL_NOT token")
        })

        it.skip("Parses an operatorPower composed of a POW token")

        it.skip('Parses an operatorMulDiv composed of a "*" string')

        it.skip('Parses an operatorMulDiv composed of a "/" string')

        it.skip('Parses an operatorAddSub composed of a "+" string')

        it.skip('Parses an operatorAddSub composed of a "-" string')

        it.skip('Parses an operatorStrcat composed of a ".." string')

        it.skip("Parses an operatorBitwiseShift composed of a BIT_LS token")

        it.skip("Parses an operatorBitwiseShift composed of a BIT_RS token")

        it.skip("Parses an operatorBitwiseAnd composed of a BIT_AND token")

        it.skip("Parses an operatorBitwiseXor composed of a BIT_XOR token")

        it.skip("Parses an operatorBitwiseOr composed of a BIT_OR token")

        it.skip("Parses an operatorComparison composed of an LT token")

        it.skip("Parses an operatorComparison composed of a GT token")

        it.skip('Parses an operatorComparison composed of a "<=" string')

        it.skip('Parses an operatorComparison composed of a ">=" string')

        it.skip("Parses an operatorComparison composed of a NE token")

        it.skip('Parses an operatorComparison composed of a "==" string')

        it.skip("Parses an operatorAnd composed of an AND token")

        it.skip("Parses an operatorOr composed of an OR token")

        it.skip("Parses a field using rule 1 of 3")
    })
})
