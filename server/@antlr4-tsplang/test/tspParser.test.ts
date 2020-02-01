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
            it.skip("SHOULD parse a NORMALSTRING token.")
            it.skip("SHOULD parse a CHARSTRING token")
            it.skip("SHOULD parse a LONGSTRING token")
        })

        describe("number", function() {
            it.skip("SHOULD parse an INT token")
            it.skip("SHOULD parse a HEX token")
            it.skip("SHOULD parse a FLOAT token")
        })

        describe("operatorUnary", function() {
            it.skip('SHOULD parse a "not" token')
            it.skip('SHOULD parse a "-" token')
            it.skip("SHOULD parse a LOGICAL_NOT token")
        })

        describe("operatorPower", function() {
            it.skip("MUST parse a POW token")
        })

        describe("operatorMulDiv", function() {
            it.skip('SHOULD parse a "*" token')
            it.skip('SHOULD parse a "/" token')
        })

        describe("operatorAddSub", function() {
            it.skip('SHOULD parse a "+" token')
            it.skip('SHOULD parse a "-" token')
        })

        describe("operatorStrcat", function() {
            it.skip('MUST parse a ".." token')
        })

        describe("operatorBitwiseShift", function() {
            it.skip("SHOULD parse a BIT_LS token")
            it.skip("SHOULD parse a BIT_RS token")
        })

        describe("operatorBitwiseAnd", function() {
            it.skip("MUST parse a BIT_AND token")
        })

        describe("operatorBitwiseXor", function() {
            it.skip("MUST parse a BIT_XOR token")
        })

        describe("operatorBitwiseOr", function() {
            it.skip("MUST parse a BIT_OR token")
        })

        describe("operatorComparison", function() {
            it.skip("SHOULD parse a LT token")
            it.skip("SHOULD parse a GT token")
            it.skip('SHOULD parse a "<=" token')
            it.skip('SHOULD parse a ">=" token')
            it.skip("SHOULD parse a NE token")
            it.skip('SHOULD parse a "==" token')
        })

        describe("operatorAnd", function() {
            it.skip("MUST parse an AND token")
        })

        describe("operatorOr", function() {
            it.skip("MUST parse an OR token")
        })

        describe("field", function() {
            // Alternative 1
            it.skip('SHOULD parse an index assignment ("[expression]=expression")')

            // Alternative 2
            it.skip('SHOULD parse a name assignment ("NAME=expression")')

            // Alternative 3
            it.skip("SHOULD parse an expression")
        })

        describe("fieldlist", function() {
            it.skip("MUST parse a field rule")
            it.skip('MAY parse multiple fields separated by "," tokens')
            it.skip('MAY parse multiple fields separated by ";" tokens')
            it.skip('MAY parse a trailing "," token')
            it.skip('MAY parse a trailing ";" token')
        })

        describe("tableConstructor", function() {
            it.skip('MUST parse an empty table constructor ("{}")')
            it.skip('MAY parse a single fieldList ("{fieldList}")')
        })

        describe("args", function() {
            // Alternative 1
            it.skip('SHOULD parse an empty argument list ("()")')
            it.skip('MAY parse a single argument expression ("(expression)")')
            it.skip('MAY parse multiple argument expressions separated by "," tokens')

            // Alternative 2
            it.skip("SHOULD parse a tableConstructor")

            // Alternative 3
            it.skip("SHOULD parse a string")
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
