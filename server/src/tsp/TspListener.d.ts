/*
 *  Copyright 2018 Tektronix Inc.
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
import { ParserRuleContext } from 'antlr4'
import { ParseTreeListener, TerminalNode, ErrorNode } from 'antlr4/tree/Tree'

import { TspParser } from './TspParser'

export declare class TspListener implements ParseTreeListener {
    constructor()

    enterEveryRule(node: ParserRuleContext): void
    exitEveryRule(node: ParserRuleContext): void
    visitErrorNode(node: ErrorNode): void
    visitTerminal(node: TerminalNode): void

    enterChunk(context: TspParser.ChunkContext): void
    exitChunk(context: TspParser.ChunkContext): void

    enterBlock(context: TspParser.BlockContext): void
    exitBlock(context: TspParser.BlockContext): void

    enterStatement(context: TspParser.StatementContext): void
    exitStatement(context: TspParser.StatementContext): void

    enterReturnStatement(context: TspParser.ReturnStatementContext): void
    exitReturnStatement(context: TspParser.ReturnStatementContext): void

    enterFunctionName(context: TspParser.FunctionNameContext): void
    exitFunctionName(context: TspParser.FunctionNameContext): void

    enterVariableList(context: TspParser.VariableListContext): void
    exitVariableList(context: TspParser.VariableListContext): void

    enterNameList(context: TspParser.NameListContext): void
    exitNameList(context: TspParser.NameListContext): void

    enterExpressionList(context: TspParser.ExpressionListContext): void
    exitExpressionList(context: TspParser.ExpressionListContext): void

    enterValue(context: TspParser.ValueContext): void
    exitValue(context: TspParser.ValueContext): void

    enterExpression(context: TspParser.ExpressionContext): void
    exitExpression(context: TspParser.ExpressionContext): void

    enterPrefix(context: TspParser.PrefixContext): void
    exitPrefix(context: TspParser.PrefixContext): void

    enterSuffix(context: TspParser.SuffixContext): void
    exitSuffix(context: TspParser.SuffixContext): void

    enterCall(context: TspParser.CallContext): void
    exitCall(context: TspParser.CallContext): void

    enterIndex(context: TspParser.IndexContext): void
    exitIndex(context: TspParser.IndexContext): void

    enterVariable(context: TspParser.VariableContext): void
    exitVariable(context: TspParser.VariableContext): void

    enterFunctionCall(context: TspParser.FunctionCallContext): void
    exitFunctionCall(context: TspParser.FunctionCallContext): void

    enterArguments(context: TspParser.ArgumentsContext): void
    exitArguments(context: TspParser.ArgumentsContext): void

    enterFunctionDefinition(context: TspParser.FunctionDefinitionContext): void
    exitFunctionDefinition(context: TspParser.FunctionDefinitionContext): void

    enterFunctionBody(context: TspParser.FunctionBodyContext): void
    exitFunctionBody(context: TspParser.FunctionBodyContext): void

    enterParameterList(context: TspParser.ParameterListContext): void
    exitParameterList(context: TspParser.ParameterListContext): void

    enterTableConstructor(context: TspParser.TableConstructorContext): void
    exitTableConstructor(context: TspParser.TableConstructorContext): void

    enterFieldList(context: TspParser.FieldListContext): void
    exitFieldList(context: TspParser.FieldListContext): void

    enterField(context: TspParser.FieldContext): void
    exitField(context: TspParser.FieldContext): void

    enterFieldSeparator(context: TspParser.FieldSeparatorContext): void
    exitFieldSeparator(context: TspParser.FieldSeparatorContext): void

    enterOperatorOr(context: TspParser.OperatorOrContext): void
    exitOperatorOr(context: TspParser.OperatorOrContext): void

    enterOperatorAnd(context: TspParser.OperatorAndContext): void
    exitOperatorAnd(context: TspParser.OperatorAndContext): void

    enterOperatorComparison(context: TspParser.OperatorComparisonContext): void
    exitOperatorComparison(context: TspParser.OperatorComparisonContext): void

    enterOperatorStrcat(context: TspParser.OperatorStrcatContext): void
    exitOperatorStrcat(context: TspParser.OperatorStrcatContext): void

    enterOperatorAddSub(context: TspParser.OperatorAddSubContext): void
    exitOperatorAddSub(context: TspParser.OperatorAddSubContext): void

    enterOperatorMulDiv(context: TspParser.OperatorMulDivContext): void
    exitOperatorMulDiv(context: TspParser.OperatorMulDivContext): void

    enterOperatorBitwiseAnd(context: TspParser.OperatorBitwiseAndContext): void
    exitOperatorBitwiseAnd(context: TspParser.OperatorBitwiseAndContext): void

    enterOperatorBitwiseOr(context: TspParser.OperatorBitwiseOrContext): void
    exitOperatorBitwiseOr(context: TspParser.OperatorBitwiseOrContext): void

    enterOperatorBitwiseXor(context: TspParser.OperatorBitwiseXorContext): void
    exitOperatorBitwiseXor(context: TspParser.OperatorBitwiseXorContext): void

    enterOperatorBitwiseShift(context: TspParser.OperatorBitwiseShiftContext): void
    exitOperatorBitwiseShift(context: TspParser.OperatorBitwiseShiftContext): void

    enterOperatorUnary(context: TspParser.OperatorUnaryContext): void
    exitOperatorUnary(context: TspParser.OperatorUnaryContext): void

    enterOperatorPower(context: TspParser.OperatorPowerContext): void
    exitOperatorPower(context: TspParser.OperatorPowerContext): void

    enterNumber(context: TspParser.NumberContext): void
    exitNumber(context: TspParser.NumberContext): void

    enterString(context: TspParser.StringContext): void
    exitString(context: TspParser.StringContext): void
}
