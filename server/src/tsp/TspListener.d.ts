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

    enterStat(context: TspParser.StatContext): void
    exitStat(context: TspParser.StatContext): void

    enterAssignment(context: TspParser.AssignmentContext): void
    exitAssignment(context: TspParser.AssignmentContext): void

    enterRetStat(context: TspParser.RetstatContext): void
    exitRetStat(context: TspParser.RetstatContext): void

    enterFuncname(context: TspParser.FuncnameContext): void
    exitFuncname(context: TspParser.FuncnameContext): void

    enterVarlist(context: TspParser.VarlistContext): void
    exitVarlist(context: TspParser.VarlistContext): void

    enterNamelist(context: TspParser.NamelistContext): void
    exitNamelist(context: TspParser.NamelistContext): void

    enterExplist(context: TspParser.ExplistContext): void
    exitExplist(context: TspParser.ExplistContext): void

    enterExp(context: TspParser.ExpContext): void
    exitExp(context: TspParser.ExpContext): void

    enterPrefixexp(context: TspParser.PrefixexpContext): void
    exitPrefixexp(context: TspParser.PrefixexpContext): void

    enterFunctioncall(context: TspParser.FunctioncallContext): void
    exitFunctioncall(context: TspParser.FunctioncallContext): void

    enterVarOrExp(context: TspParser.VarOrExpContext): void
    exitVarOrExp(context: TspParser.VarOrExpContext): void

    enterVariable(context: TspParser.VariableContext): void
    exitVariable(context: TspParser.VariableContext): void

    enterVarSuffix(context: TspParser.VarSuffixContext): void
    exitVarSuffix(context: TspParser.VarSuffixContext): void

    enterNameAndArgs(context: TspParser.NameAndArgsContext): void
    exitNameAndArgs(context: TspParser.NameAndArgsContext): void

    enterArgs(context: TspParser.ArgsContext): void
    exitArgs(context: TspParser.ArgsContext): void

    enterFunctiondef(context: TspParser.FunctiondefContext): void
    exitFunctiondef(context: TspParser.FunctiondefContext): void

    enterFuncbody(context: TspParser.FuncbodyContext): void
    exitFuncbody(context: TspParser.FuncbodyContext): void

    enterParlist(context: TspParser.ParlistContext): void
    exitParlist(context: TspParser.ParlistContext): void

    enterTableconstructor(context: TspParser.TableconstructorContext): void
    exitTableconstructor(context: TspParser.TableconstructorContext): void

    enterFieldlist(context: TspParser.FieldlistContext): void
    exitFieldlist(context: TspParser.FieldlistContext): void

    enterField(context: TspParser.FieldContext): void
    exitField(context: TspParser.FieldContext): void

    enterFieldsep(context: TspParser.FieldsepContext): void
    exitFieldsep(context: TspParser.FieldsepContext): void

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

    enterOperatorBitwise(context: TspParser.OperatorBitwiseContext): void
    exitOperatorBitwise(context: TspParser.OperatorBitwiseContext): void

    enterOperatorUnary(context: TspParser.OperatorUnaryContext): void
    exitOperatorUnary(context: TspParser.OperatorUnaryContext): void

    enterOperatorPower(context: TspParser.OperatorPowerContext): void
    exitOperatorPower(context: TspParser.OperatorPowerContext): void

    enterNumber(context: TspParser.NumberContext): void
    exitNumber(context: TspParser.NumberContext): void

    enterString(context: TspParser.StringContext): void
    exitString(context: TspParser.StringContext): void
}
