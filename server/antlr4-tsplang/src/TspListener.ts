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
import { TspListener } from "./TspListener.generated"
import { ExtendedParser } from "./TspParser"

// @ts-ignore
export abstract class ExtendedListener extends TspListener {
    constructor() {
        super()
    }

    abstract enterChunk(ctx: ExtendedParser.ChunkContext): void
    abstract exitChunk(ctx: ExtendedParser.ChunkContext): void

    abstract enterStatement(ctx: ExtendedParser.StatementContext): void
    abstract exitStatement(ctx: ExtendedParser.StatementContext): void

    abstract enterAssignment(ctx: ExtendedParser.AssignmentContext): void
    abstract exitAssignment(ctx: ExtendedParser.AssignmentContext): void

    abstract enterValue(ctx: ExtendedParser.ValueContext): void
    abstract exitValue(ctx: ExtendedParser.ValueContext): void

    abstract enterExpression(ctx: ExtendedParser.ExpressionContext): void
    abstract exitExpression(ctx: ExtendedParser.ExpressionContext): void

    abstract enterPrefix(ctx: ExtendedParser.PrefixContext): void
    abstract exitPrefix(ctx: ExtendedParser.PrefixContext): void

    abstract enterSuffix(ctx: ExtendedParser.SuffixContext): void
    abstract exitSuffix(ctx: ExtendedParser.SuffixContext): void

    abstract enterIndex(ctx: ExtendedParser.IndexContext): void
    abstract exitIndex(ctx: ExtendedParser.IndexContext): void

    abstract enterVariable(ctx: ExtendedParser.VariableContext): void
    abstract exitVariable(ctx: ExtendedParser.VariableContext): void

    abstract enterFunctionCall(ctx: ExtendedParser.FunctionCallContext): void
    abstract exitFunctionCall(ctx: ExtendedParser.FunctionCallContext): void

    abstract enterArgs(ctx: ExtendedParser.ArgsContext): void
    abstract exitArgs(ctx: ExtendedParser.ArgsContext): void

    abstract enterTableConstructor(ctx: ExtendedParser.TableConstructorContext): void
    abstract exitTableConstructor(ctx: ExtendedParser.TableConstructorContext): void

    abstract enterFieldList(ctx: ExtendedParser.FieldListContext): void
    abstract exitFieldList(ctx: ExtendedParser.FieldListContext): void

    abstract enterField(ctx: ExtendedParser.FieldContext): void
    abstract exitField(ctx: ExtendedParser.FieldContext): void

    abstract enterOperatorOr(ctx: ExtendedParser.OperatorOrContext): void
    abstract exitOperatorOr(ctx: ExtendedParser.OperatorOrContext): void

    abstract enterOperatorAnd(ctx: ExtendedParser.OperatorAndContext): void
    abstract exitOperatorAnd(ctx: ExtendedParser.OperatorAndContext): void

    abstract enterOperatorComparison(
        ctx: ExtendedParser.OperatorComparisonContext
    ): void
    abstract exitOperatorComparison(ctx: ExtendedParser.OperatorComparisonContext): void

    abstract enterOperatorBitwiseOr(ctx: ExtendedParser.OperatorBitwiseOrContext): void
    abstract exitOperatorBitwiseOr(ctx: ExtendedParser.OperatorBitwiseOrContext): void

    abstract enterOperatorBitwiseXor(
        ctx: ExtendedParser.OperatorBitwiseXorContext
    ): void
    abstract exitOperatorBitwiseXor(ctx: ExtendedParser.OperatorBitwiseXorContext): void

    abstract enterOperatorBitwiseAnd(
        ctx: ExtendedParser.OperatorBitwiseAndContext
    ): void
    abstract exitOperatorBitwiseAnd(ctx: ExtendedParser.OperatorBitwiseAndContext): void

    abstract enterOperatorBitwiseShift(
        ctx: ExtendedParser.OperatorBitwiseShiftContext
    ): void
    abstract exitOperatorBitwiseShift(
        ctx: ExtendedParser.OperatorBitwiseShiftContext
    ): void

    abstract enterOperatorStrcat(ctx: ExtendedParser.OperatorStrcatContext): void
    abstract exitOperatorStrcat(ctx: ExtendedParser.OperatorStrcatContext): void

    abstract enterOperatorAddSub(ctx: ExtendedParser.OperatorAddSubContext): void
    abstract exitOperatorAddSub(ctx: ExtendedParser.OperatorAddSubContext): void

    abstract enterOperatorMulDiv(ctx: ExtendedParser.OperatorMulDivContext): void
    abstract exitOperatorMulDiv(ctx: ExtendedParser.OperatorMulDivContext): void

    abstract enterOperatorPower(ctx: ExtendedParser.OperatorPowerContext): void
    abstract exitOperatorPower(ctx: ExtendedParser.OperatorPowerContext): void

    abstract enterOperatorUnary(ctx: ExtendedParser.OperatorUnaryContext): void
    abstract exitOperatorUnary(ctx: ExtendedParser.OperatorUnaryContext): void

    abstract enterNumber(ctx: ExtendedParser.NumberContext): void
    abstract exitNumber(ctx: ExtendedParser.NumberContext): void

    abstract enterString(ctx: ExtendedParser.StringContext): void
    abstract exitString(ctx: ExtendedParser.StringContext): void
}
