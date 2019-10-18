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
import { ParseTreeListener } from "antlr4/tree"

import { TspListener as GeneratedListener } from "./TspListener.generated"
import { TspParser } from "./TspParser.generated"

declare module "./TspListener.generated" {
    class TspListener extends ParseTreeListener {
        constructor()

        enterChunk(ctx: TspParser.ChunkContext): void
        exitChunk(ctx: TspParser.ChunkContext): void

        enterStatement(ctx: TspParser.StatementContext): void
        exitStatement(ctx: TspParser.StatementContext): void

        enterAssignment(ctx: TspParser.AssignmentContext): void
        exitAssignment(ctx: TspParser.AssignmentContext): void

        enterValue(ctx: TspParser.ValueContext): void
        exitValue(ctx: TspParser.ValueContext): void

        enterExpression(ctx: TspParser.ExpressionContext): void
        exitExpression(ctx: TspParser.ExpressionContext): void

        enterPrefix(ctx: TspParser.PrefixContext): void
        exitPrefix(ctx: TspParser.PrefixContext): void

        enterSuffix(ctx: TspParser.SuffixContext): void
        exitSuffix(ctx: TspParser.SuffixContext): void

        enterIndex(ctx: TspParser.IndexContext): void
        exitIndex(ctx: TspParser.IndexContext): void

        enterVariable(ctx: TspParser.VariableContext): void
        exitVariable(ctx: TspParser.VariableContext): void

        enterFunctionCall(ctx: TspParser.FunctionCallContext): void
        exitFunctionCall(ctx: TspParser.FunctionCallContext): void

        enterArgs(ctx: TspParser.ArgsContext): void
        exitArgs(ctx: TspParser.ArgsContext): void

        enterTableConstructor(ctx: TspParser.TableConstructorContext): void
        exitTableConstructor(ctx: TspParser.TableConstructorContext): void

        enterFieldList(ctx: TspParser.FieldListContext): void
        exitFieldList(ctx: TspParser.FieldListContext): void

        enterField(ctx: TspParser.FieldContext): void
        exitField(ctx: TspParser.FieldContext): void

        enterOperatorOr(ctx: TspParser.OperatorOrContext): void
        exitOperatorOr(ctx: TspParser.OperatorOrContext): void

        enterOperatorAnd(ctx: TspParser.OperatorAndContext): void
        exitOperatorAnd(ctx: TspParser.OperatorAndContext): void

        enterOperatorComparison(ctx: TspParser.OperatorComparisonContext): void
        exitOperatorComparison(ctx: TspParser.OperatorComparisonContext): void

        enterOperatorBitwiseOr(ctx: TspParser.OperatorBitwiseOrContext): void
        exitOperatorBitwiseOr(ctx: TspParser.OperatorBitwiseOrContext): void

        enterOperatorBitwiseXor(ctx: TspParser.OperatorBitwiseXorContext): void
        exitOperatorBitwiseXor(ctx: TspParser.OperatorBitwiseXorContext): void

        enterOperatorBitwiseAnd(ctx: TspParser.OperatorBitwiseAndContext): void
        exitOperatorBitwiseAnd(ctx: TspParser.OperatorBitwiseAndContext): void

        enterOperatorBitwiseShift(ctx: TspParser.OperatorBitwiseShiftContext): void
        exitOperatorBitwiseShift(ctx: TspParser.OperatorBitwiseShiftContext): void

        enterOperatorStrcat(ctx: TspParser.OperatorStrcatContext): void
        exitOperatorStrcat(ctx: TspParser.OperatorStrcatContext): void

        enterOperatorAddSub(ctx: TspParser.OperatorAddSubContext): void
        exitOperatorAddSub(ctx: TspParser.OperatorAddSubContext): void

        enterOperatorMulDiv(ctx: TspParser.OperatorMulDivContext): void
        exitOperatorMulDiv(ctx: TspParser.OperatorMulDivContext): void

        enterOperatorPower(ctx: TspParser.OperatorPowerContext): void
        exitOperatorPower(ctx: TspParser.OperatorPowerContext): void

        enterOperatorUnary(ctx: TspParser.OperatorUnaryContext): void
        exitOperatorUnary(ctx: TspParser.OperatorUnaryContext): void

        enterNumber(ctx: TspParser.NumberContext): void
        exitNumber(ctx: TspParser.NumberContext): void

        enterString(ctx: TspParser.StringContext): void
        exitString(ctx: TspParser.StringContext): void
    }
}

export class TspListener extends GeneratedListener {
    constructor() {
        super()
    }
}
