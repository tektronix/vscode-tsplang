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
import { Interval, ParserRuleContext, Parser } from "antlr4"
import { RecognitionException } from "antlr4/error/Errors"
import { ErrorNode, ParseTreeListener, TerminalNode} from "antlr4/tree/Tree"
import { RuleContext } from "antlr4/RuleContext"

import { CommonTokenStream } from "./commonTokenStream"
import { TspParser as GeneratedParser } from "./TspParser.generated"
import { Token } from "./token"

declare module "antlr4" {
    class ParserRuleContext extends RuleContext {
        static readonly EMPTY: ParserRuleContext

        readonly children: Array<ParserRuleContext | TerminalNode>
        readonly start: Token
        readonly stop: Token
        readonly ruleIndex: number
        readonly exception: RecognitionException

        constructor(parent: ParserRuleContext, invokingState: number)

        copyFrom(ctx: ParserRuleContext): void
        enterRule(listener: ParseTreeListener): void
        exitRule(listener: ParseTreeListener): void
        addChild(child: ParserRuleContext | TerminalNode): ParserRuleContext | TerminalNode
        removeLastChild(): void
        addTokenNode(token: Token): Token
        addErrorNode(badToken: Token): ErrorNode
        getChild(i: number, type?: ParserRuleContext | TerminalNode): ParserRuleContext | TerminalNode | null
        getToken(ttype: number, i: number): TerminalNode | null
        getTokens(ttype: number): Array<TerminalNode>
        getTypedRuleContext(ctxType: ParserRuleContext | TerminalNode, i: number): ParserRuleContext | TerminalNode | null
        getTypedRuleContexts(ctxType: ParserRuleContext | TerminalNode): Array<ParserRuleContext | TerminalNode>
        getChildCount(): number
        getSourceInterval(): Interval
    }
}

declare module "./TspParser.generated" {
    class TspParser extends Parser {
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

        readonly grammarFileName: string
        readonly literalNames: Array<string | null>
        readonly modeNames: Array<string>
        readonly ruleNames: Array<string>
        readonly symbolicNames: Array<string | null>

        constructor(input: CommonTokenStream)

        chunk(): TspParser.ChunkContext
        statement(): TspParser.StatementContext
        assignment(): TspParser.AssignmentContext
        value(): TspParser.ValueContext
        expression(): TspParser.ExpressionContext
        prefix(): TspParser.PrefixContext
        suffix(): TspParser.SuffixContext
        index(): TspParser.IndexContext
        variable(): TspParser.VariableContext
        functionCall(): TspParser.FunctionCallContext
        args(): TspParser.ArgsContext
        tableConstructor(): TspParser.TableConstructorContext
        fieldList(): TspParser.FieldListContext
        field(): TspParser.FieldContext
        operatorOr(): TspParser.OperatorOrContext
        operatorAnd(): TspParser.OperatorAndContext
        operatorComparison(): TspParser.OperatorComparisonContext
        operatorBitwiseOr(): TspParser.OperatorBitwiseOrContext
        operatorBitwiseXor(): TspParser.OperatorBitwiseXorContext
        operatorBitwiseAnd(): TspParser.OperatorBitwiseAndContext
        operatorBitwiseShift(): TspParser.OperatorBitwiseShiftContext
        operatorStrcat(): TspParser.OperatorStrcatContext
        operatorAddSub(): TspParser.OperatorAddSubContext
        operatorMulDiv(): TspParser.OperatorMulDivContext
        operatorPower(): TspParser.OperatorPowerContext
        operatorUnary(): TspParser.OperatorUnaryContext
        number(): TspParser.NumberContext
        string(): TspParser.StringContext
    }

    namespace TspParser {
        class ChunkContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            EOF(): TerminalNode
            statement(): StatementContext | null
        }

        class StatementContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            assignment(): AssignmentContext | null
            functionCall(): FunctionCallContext | null
            statement(i?: number): Array<StatementContext> | StatementContext | null
            expression(i?: number): Array<ExpressionContext> | ExpressionContext | null
            NAME(i?: number): Array<TerminalNode> | TerminalNode | null
            VARARG(): TerminalNode | null
            LOCAL(): TerminalNode | null
        }

        class AssignmentContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            variable(i?: number): Array<VariableContext> | VariableContext | null
            expression(i?: number): Array<ExpressionContext> | ExpressionContext | null
        }

        class ValueContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            NIL(): TerminalNode | null
            BOOLEAN(): TerminalNode | null
            number(): NumberContext | null
            string(): StringContext | null
            variable(): VariableContext | null
            functionCall(): FunctionCallContext | null
            tableConstructor(): TableConstructorContext | null
            expression(): ExpressionContext | null
        }

        class ExpressionContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            value(): ValueContext | null
            NAME(i?: number): Array<TerminalNode> | TerminalNode | null
            VARARG(): TerminalNode | null
            statement(i?: number): Array<StatementContext> | StatementContext | null
            expression(): ExpressionContext | null
            operatorOr(): TerminalNode | null
            operatorAnd(): TerminalNode | null
            operatorComparison(): TerminalNode | null
            operatorBitwiseOr(): TerminalNode | null
            operatorBitwiseXor(): TerminalNode | null
            operatorBitwiseAnd(): TerminalNode | null
            operatorBitwiseShift(): TerminalNode | null
            operatorStrcat(): TerminalNode | null
            operatorAddSub(): TerminalNode | null
            operatorMulDiv(): TerminalNode | null
            operatorPower(): TerminalNode | null
            operatorUnary(): TerminalNode | null
        }

        class PrefixContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            expression(): ExpressionContext | null
            NAME(): TerminalNode | null
        }

        class SuffixContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            args(): ArgsContext | null
            NAME(): TerminalNode | null
            index(): IndexContext | null
        }

        class IndexContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            expression(): ExpressionContext | null
            NAME(): TerminalNode | null
        }

        class VariableContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            prefix(): PrefixContext | null
            index(): IndexContext | null
            suffix(i?: number): Array<SuffixContext> | SuffixContext | null
            NAME(): TerminalNode | null
        }

        class FunctionCallContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            prefix(): PrefixContext | null
            args(): ArgsContext | null
            suffix(i?: number): Array<SuffixContext> | SuffixContext | null
            NAME(): TerminalNode | null
        }

        class ArgsContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            expression(i?: number): Array<ExpressionContext> | ExpressionContext | null
            tableConstructor(): TableConstructorContext | null
            string(): StringContext | null
        }

        class TableConstructorContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            fieldList(): FieldListContext | null
        }

        class FieldListContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            field(i?: number): Array<FieldContext> | FieldContext | null
        }

        class FieldContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            expression(i?: number): Array<ExpressionContext> | ExpressionContext | null
            NAME(): TerminalNode | null
        }

        class OperatorOrContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorAndContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorComparisonContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorBitwiseOrContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorBitwiseXorContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorBitwiseAndContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorBitwiseShiftContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorStrcatContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorAddSubContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorMulDivContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorPowerContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class OperatorUnaryContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
        }

        class NumberContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            INT(): TerminalNode | null
            HEX(): TerminalNode | null
            FLOAT(): TerminalNode | null
        }

        class StringContext extends ParserRuleContext {
            constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

            NORMALSTRING(): TerminalNode | null
            CHARSTRING(): TerminalNode | null
            LONGSTRING(): TerminalNode | null
        }
    }
}

export class TspParser extends GeneratedParser {
    constructor(input: CommonTokenStream) {
        super(input)
    }
}
