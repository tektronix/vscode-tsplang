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

export declare class TspListener implements ParseTreeListener {
    constructor()

    enterEveryRule(node: ParserRuleContext): void
    exitEveryRule(node: ParserRuleContext): void
    visitErrorNode(node: ErrorNode): void
    visitTerminal(node: TerminalNode): void

    enterChunk(context: ParserRuleContext): void
    exitChunk(context: ParserRuleContext): void

    enterBlock(context: ParserRuleContext): void
    exitBlock(context: ParserRuleContext): void

    enterStat(context: ParserRuleContext): void
    exitStat(context: ParserRuleContext): void

    enterAssignment(context: ParserRuleContext): void
    exitAssignment(context: ParserRuleContext): void

    enterRetStat(context: ParserRuleContext): void
    exitRetStat(context: ParserRuleContext): void

    enterFuncname(context: ParserRuleContext): void
    exitFuncname(context: ParserRuleContext): void

    enterVarlist(context: ParserRuleContext): void
    exitVarlist(context: ParserRuleContext): void

    enterNamelist(context: ParserRuleContext): void
    exitNamelist(context: ParserRuleContext): void

    enterExplist(context: ParserRuleContext): void
    exitExplist(context: ParserRuleContext): void

    enterExp(context: ParserRuleContext): void
    exitExp(context: ParserRuleContext): void

    enterPrefixexp(context: ParserRuleContext): void
    exitPrefixexp(context: ParserRuleContext): void

    enterFunctioncall(context: ParserRuleContext): void
    exitFunctioncall(context: ParserRuleContext): void

    enterVarOrExp(context: ParserRuleContext): void
    exitVarOrExp(context: ParserRuleContext): void

    enterVariable(context: ParserRuleContext): void
    exitVariable(context: ParserRuleContext): void

    enterVarSuffix(context: ParserRuleContext): void
    exitVarSuffix(context: ParserRuleContext): void

    enterNameAndArgs(context: ParserRuleContext): void
    exitNameAndArgs(context: ParserRuleContext): void

    enterArgs(context: ParserRuleContext): void
    exitArgs(context: ParserRuleContext): void

    enterFunctiondef(context: ParserRuleContext): void
    exitFunctiondef(context: ParserRuleContext): void

    enterFuncbody(context: ParserRuleContext): void
    exitFuncbody(context: ParserRuleContext): void

    enterParlist(context: ParserRuleContext): void
    exitParlist(context: ParserRuleContext): void

    enterTableconstructor(context: ParserRuleContext): void
    exitTableconstructor(context: ParserRuleContext): void

    enterFieldlist(context: ParserRuleContext): void
    exitFieldlist(context: ParserRuleContext): void

    enterField(context: ParserRuleContext): void
    exitField(context: ParserRuleContext): void

    enterFieldsep(context: ParserRuleContext): void
    exitFieldsep(context: ParserRuleContext): void

    enterOperatorOr(context: ParserRuleContext): void
    exitOperatorOr(context: ParserRuleContext): void

    enterOperatorAnd(context: ParserRuleContext): void
    exitOperatorAnd(context: ParserRuleContext): void

    enterOperatorComparison(context: ParserRuleContext): void
    exitOperatorComparison(context: ParserRuleContext): void

    enterOperatorStrcat(context: ParserRuleContext): void
    exitOperatorStrcat(context: ParserRuleContext): void

    enterOperatorAddSub(context: ParserRuleContext): void
    exitOperatorAddSub(context: ParserRuleContext): void

    enterOperatorMulDiv(context: ParserRuleContext): void
    exitOperatorMulDiv(context: ParserRuleContext): void

    enterOperatorBitwise(context: ParserRuleContext): void
    exitOperatorBitwise(context: ParserRuleContext): void

    enterOperatorUnary(context: ParserRuleContext): void
    exitOperatorUnary(context: ParserRuleContext): void

    enterOperatorPower(context: ParserRuleContext): void
    exitOperatorPower(context: ParserRuleContext): void

    enterNumber(context: ParserRuleContext): void
    exitNumber(context: ParserRuleContext): void

    enterString(context: ParserRuleContext): void
    exitString(context: ParserRuleContext): void
}
