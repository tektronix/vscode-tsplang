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
import { CommonTokenStream, Parser, ParserRuleContext } from "antlr4"
// import { CommonTokenStream, Interval, Parser, ParserRuleContext, Token } from "antlr4"
// import { RecognitionException } from "antlr4/error/Errors"
// import { RuleContext } from "antlr4/RuleContext"
import { TerminalNode } from "antlr4/tree/Tree"
// import { ErrorNode, ParseTreeListener, TerminalNode } from "antlr4/tree/Tree"
import "./token"

import { TspParser } from "./TspParser.generated"
import "./TspParser.generated"

// declare module "antlr4" {
//     /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
//     class ParserRuleContext extends RuleContext {
//         static readonly EMPTY: ParserRuleContext

//         readonly children: Array<ParserRuleContext | TerminalNode>
//         readonly start: Token
//         readonly stop: Token
//         readonly ruleIndex: number
//         readonly exception: RecognitionException

//         constructor(parent: ParserRuleContext, invokingState: number)

//         copyFrom(ctx: ParserRuleContext): void
//         enterRule(listener: ParseTreeListener): void
//         exitRule(listener: ParseTreeListener): void
//         addChild(
//             child: ParserRuleContext | TerminalNode
//         ): ParserRuleContext | TerminalNode
//         removeLastChild(): void
//         addTokenNode(token: Token): Token
//         addErrorNode(badToken: Token): ErrorNode
//         getChild(
//             i: number,
//             type?: ParserRuleContext | TerminalNode
//         ): ParserRuleContext | TerminalNode | null
//         getToken(ttype: number, i: number): TerminalNode | null
//         getTokens(ttype: number): Array<TerminalNode>
//         getTypedRuleContext(
//             ctxType: ParserRuleContext | TerminalNode,
//             i: number
//         ): ParserRuleContext | TerminalNode | null
//         getTypedRuleContexts(
//             ctxType: ParserRuleContext | TerminalNode
//         ): Array<ParserRuleContext | TerminalNode>
//         getChildCount(): number
//         getSourceInterval(): Interval
//     }
// }

// @ts-ignore
export class ExtendedParser extends TspParser {
    static EOF: number
    static T__0: number
    static T__1: number
    static T__2: number
    static T__3: number
    static T__4: number
    static T__5: number
    static T__6: number
    static T__7: number
    static T__8: number
    static T__9: number
    static T__10: number
    static T__11: number
    static T__12: number
    static T__13: number
    static T__14: number
    static T__15: number
    static T__16: number
    static T__17: number
    static T__18: number
    static T__19: number
    static T__20: number
    static T__21: number
    static T__22: number
    static T__23: number
    static T__24: number
    static T__25: number
    static T__26: number
    static T__27: number
    static T__28: number
    static T__29: number
    static T__30: number
    static T__31: number
    static T__32: number
    static T__33: number
    static T__34: number
    static T__35: number
    static T__36: number
    static T__37: number
    static T__38: number
    static T__39: number
    static T__40: number
    static T__41: number
    static T__42: number
    static T__43: number
    static T__44: number
    static T__45: number
    static T__46: number
    static NIL: number
    static BOOLEAN: number
    static LOCAL: number
    static VARARG: number
    static NAME: number
    static NORMALSTRING: number
    static CHARSTRING: number
    static LONGSTRING: number
    static INT: number
    static HEX: number
    static FLOAT: number
    static LONGCOMMENT: number
    static LINE_COMMENT: number
    static WS: number
    static SHEBANG: number

    static RULE_chunk: number
    static RULE_block: number
    static RULE_statement: number
    static RULE_returnStatement: number
    static RULE_functionName: number
    static RULE_variableList: number
    static RULE_nameList: number
    static RULE_expressionList: number
    static RULE_value: number
    static RULE_expression: number
    static RULE_prefix: number
    static RULE_suffix: number
    static RULE_objectCall: number
    static RULE_index: number
    static RULE_variable: number
    static RULE_functionCall: number
    static RULE_args: number
    static RULE_functionDefinition: number
    static RULE_functionBody: number
    static RULE_parameterList: number
    static RULE_tableConstructor: number
    static RULE_fieldList: number
    static RULE_field: number
    static RULE_fieldSeparator: number
    static RULE_operatorOr: number
    static RULE_operatorAnd: number
    static RULE_operatorComparison: number
    static RULE_operatorStrcat: number
    static RULE_operatorAddSub: number
    static RULE_operatorMulDiv: number
    static RULE_operatorBitwiseAnd: number
    static RULE_operatorBitwiseOr: number
    static RULE_operatorBitwiseXor: number
    static RULE_operatorBitwiseShift: number
    static RULE_operatorUnary: number
    static RULE_operatorPower: number
    static RULE_number: number
    static RULE_string: number

    buildParseTrees: boolean
    grammarFileName: string
    literalNames: Array<string | null>
    modeNames: Array<string>
    ruleNames: Array<string>
    symbolicNames: Array<string | null>

    constructor(input: CommonTokenStream) {
        super(input)
    }
    chunk(): ExtendedParser.ChunkContext {
        return super.chunk()
    }
    statement(): ExtendedParser.StatementContext {
        return super.statement()
    }
    assignment(): ExtendedParser.AssignmentContext {
        return super.assignment()
    }
    value(): ExtendedParser.ValueContext {
        return super.value()
    }
    expression(): ExtendedParser.ExpressionContext {
        return super.expression()
    }
    prefix(): ExtendedParser.PrefixContext {
        return super.prefix()
    }
    suffix(): ExtendedParser.SuffixContext {
        return super.suffix()
    }
    index(): ExtendedParser.IndexContext {
        return super.index()
    }
    variable(): ExtendedParser.VariableContext {
        return super.variable()
    }
    functionCall(): ExtendedParser.FunctionCallContext {
        return super.functionCall()
    }
    args(): ExtendedParser.ArgsContext {
        return super.args()
    }
    tableConstructor(): ExtendedParser.TableConstructorContext {
        return super.tableConstructor()
    }
    fieldList(): ExtendedParser.FieldListContext {
        return super.fieldList()
    }
    field(): ExtendedParser.FieldContext {
        return super.field()
    }
    operatorOr(): ExtendedParser.OperatorOrContext {
        return super.operatorOr()
    }
    operatorAnd(): ExtendedParser.OperatorAndContext {
        return super.operatorAnd()
    }
    operatorComparison(): ExtendedParser.OperatorComparisonContext {
        return super.operatorComparison()
    }
    operatorBitwiseOr(): ExtendedParser.OperatorBitwiseOrContext {
        return super.operatorBitwiseOr()
    }
    operatorBitwiseXor(): ExtendedParser.OperatorBitwiseXorContext {
        return super.operatorBitwiseXor()
    }
    operatorBitwiseAnd(): ExtendedParser.OperatorBitwiseAndContext {
        return super.operatorBitwiseAnd()
    }
    operatorBitwiseShift(): ExtendedParser.OperatorBitwiseShiftContext {
        return super.operatorBitwiseShift()
    }
    operatorStrcat(): ExtendedParser.OperatorStrcatContext {
        return super.operatorStrcat()
    }
    operatorAddSub(): ExtendedParser.OperatorAddSubContext {
        return super.operatorAddSub()
    }
    operatorMulDiv(): ExtendedParser.OperatorMulDivContext {
        return super.operatorMulDiv()
    }
    operatorPower(): ExtendedParser.OperatorPowerContext {
        return super.operatorPower()
    }
    operatorUnary(): ExtendedParser.OperatorUnaryContext {
        return super.operatorUnary()
    }
    number(): ExtendedParser.NumberContext {
        return super.number()
    }
    string(): ExtendedParser.StringContext {
        return super.string()
    }
}
export namespace ExtendedParser {
    // @ts-ignore
    export class ChunkContext extends TspParser.ChunkContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        EOF(): TerminalNode {
            return super.EOF()
        }
        statement(): StatementContext | null {
            return super.statement()
        }
    }

    // @ts-ignore
    export class StatementContext extends TspParser.StatementContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        assignment(): AssignmentContext | null {
            return super.assignment()
        }
        functionCall(): FunctionCallContext | null {
            return super.functionCall()
        }
        statement(i?: number): Array<StatementContext> | StatementContext | null {
            return super.statement(i)
        }
        expression(i?: number): Array<ExpressionContext> | ExpressionContext | null {
            return super.expression(i)
        }
        NAME(i?: number): Array<TerminalNode> | TerminalNode | null {
            return super.NAME(i)
        }
        VARARG(): TerminalNode | null {
            return super.VARARG()
        }
        LOCAL(): TerminalNode | null {
            return super.LOCAL()
        }
    }

    // @ts-ignore
    export class AssignmentContext extends TspParser.AssignmentContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        variable(i?: number): Array<VariableContext> | VariableContext | null {
            return super.variable(i)
        }
        expression(i?: number): Array<ExpressionContext> | ExpressionContext | null {
            return super.expression(i)
        }
    }

    // @ts-ignore
    export class ValueContext extends TspParser.ValueContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        NIL(): TerminalNode | null {
            return super.NIL()
        }
        BOOLEAN(): TerminalNode | null {
            return super.BOOLEAN()
        }
        number(): NumberContext | null {
            return super.number()
        }
        string(): StringContext | null {
            return super.string()
        }
        variable(): VariableContext | null {
            return super.variable()
        }
        functionCall(): FunctionCallContext | null {
            return super.functionCall()
        }
        tableConstructor(): TableConstructorContext | null {
            return super.tableConstructor()
        }
        expression(): ExpressionContext | null {
            return super.expression()
        }
    }

    // @ts-ignore
    export class ExpressionContext extends TspParser.ExpressionContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        value(): ValueContext | null {
            return super.value()
        }
        NAME(i?: number): Array<TerminalNode> | TerminalNode | null {
            return super.NAME(i)
        }
        VARARG(): TerminalNode | null {
            return super.VARARG()
        }
        statement(i?: number): Array<StatementContext> | StatementContext | null {
            return super.statement(i)
        }
        expression(): ExpressionContext | null {
            return super.expression()
        }
        operatorOr(): TerminalNode | null {
            return super.operatorOr()
        }
        operatorAnd(): TerminalNode | null {
            return super.operatorAnd()
        }
        operatorComparison(): TerminalNode | null {
            return super.operatorComparison()
        }
        operatorBitwiseOr(): TerminalNode | null {
            return super.operatorBitwiseOr()
        }
        operatorBitwiseXor(): TerminalNode | null {
            return super.operatorBitwiseXor()
        }
        operatorBitwiseAnd(): TerminalNode | null {
            return super.operatorBitwiseAnd()
        }
        operatorBitwiseShift(): TerminalNode | null {
            return super.operatorBitwiseShift()
        }
        operatorStrcat(): TerminalNode | null {
            return super.operatorStrcat()
        }
        operatorAddSub(): TerminalNode | null {
            return super.operatorAddSub()
        }
        operatorMulDiv(): TerminalNode | null {
            return super.operatorMulDiv()
        }
        operatorPower(): TerminalNode | null {
            return super.operatorPower()
        }
        operatorUnary(): TerminalNode | null {
            return super.operatorUnary()
        }
    }

    // @ts-ignore
    export class PrefixContext extends TspParser.PrefixContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        expression(): ExpressionContext | null {
            return super.expression()
        }
        NAME(): TerminalNode | null {
            return super.NAME()
        }
    }

    // @ts-ignore
    export class SuffixContext extends TspParser.SuffixContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        args(): ArgsContext | null {
            return super.args()
        }
        NAME(): TerminalNode | null {
            return super.NAME()
        }
        index(): IndexContext | null {
            return super.index()
        }
    }

    // @ts-ignore
    export class IndexContext extends TspParser.IndexContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        expression(): ExpressionContext | null {
            return super.expression()
        }
        NAME(): TerminalNode | null {
            return super.NAME()
        }
    }

    // @ts-ignore
    export class VariableContext extends TspParser.VariableContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        prefix(): PrefixContext | null {
            return super.prefix()
        }
        index(): IndexContext | null {
            return super.index()
        }
        suffix(i?: number): Array<SuffixContext> | SuffixContext | null {
            return super.suffix(i)
        }
        NAME(): TerminalNode | null {
            return super.NAME()
        }
    }

    // @ts-ignore
    export class FunctionCallContext extends TspParser.FunctionCallContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        prefix(): PrefixContext | null {
            return super.prefix()
        }
        args(): ArgsContext | null {
            return super.args()
        }
        suffix(i?: number): Array<SuffixContext> | SuffixContext | null {
            return super.suffix(i)
        }
        NAME(): TerminalNode | null {
            return super.NAME()
        }
    }

    // @ts-ignore
    export class ArgsContext extends TspParser.ArgsContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        expression(i?: number): Array<ExpressionContext> | ExpressionContext | null {
            return super.expression(i)
        }
        tableConstructor(): TableConstructorContext | null {
            return super.tableConstructor()
        }
        string(): StringContext | null {
            return super.string()
        }
    }

    // @ts-ignore
    export class TableConstructorContext extends TspParser.TableConstructorContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        fieldList(): FieldListContext | null {
            return super.fieldList()
        }
    }

    // @ts-ignore
    export class FieldListContext extends TspParser.FieldListContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        field(i?: number): Array<FieldContext> | FieldContext | null {
            return super.field(i)
        }
    }

    // @ts-ignore
    export class FieldContext extends TspParser.FieldContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        expression(i?: number): Array<ExpressionContext> | ExpressionContext | null {
            return super.expression(i)
        }
        NAME(): TerminalNode | null {
            return super.NAME()
        }
    }

    // @ts-ignore
    export class OperatorOrContext extends TspParser.OperatorOrContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorAndContext extends TspParser.OperatorAndContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorComparisonContext extends TspParser.OperatorComparisonContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorBitwiseOrContext extends TspParser.OperatorBitwiseOrContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorBitwiseXorContext extends TspParser.OperatorBitwiseXorContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorBitwiseAndContext extends TspParser.OperatorBitwiseAndContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorBitwiseShiftContext extends TspParser.OperatorBitwiseShiftContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorStrcatContext extends TspParser.OperatorStrcatContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorAddSubContext extends TspParser.OperatorAddSubContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorMulDivContext extends TspParser.OperatorMulDivContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorPowerContext extends TspParser.OperatorPowerContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class OperatorUnaryContext extends TspParser.OperatorUnaryContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }
    }

    // @ts-ignore
    export class NumberContext extends TspParser.NumberContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        INT(): TerminalNode | null {
            return super.INT()
        }
        HEX(): TerminalNode | null {
            return super.HEX()
        }
        FLOAT(): TerminalNode | null {
            return super.FLOAT()
        }
    }

    // @ts-ignore
    export class StringContext extends TspParser.StringContext {
        constructor(
            parser: Parser,
            parent?: ParserRuleContext,
            invokingState?: number
        ) {
            super(parser, parent, invokingState)
        }

        NORMALSTRING(): TerminalNode | null {
            return super.NORMALSTRING()
        }
        CHARSTRING(): TerminalNode | null {
            return super.CHARSTRING()
        }
        LONGSTRING(): TerminalNode | null {
            return super.LONGSTRING()
        }
    }
}
