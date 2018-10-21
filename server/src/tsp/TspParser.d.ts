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
import { CommonTokenStream, Parser, ParserRuleContext } from 'antlr4'
import { ParseTreeListener, TerminalNode } from 'antlr4/tree/Tree'

export declare class TspParser extends Parser {
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
    static T__47: number
    static T__48: number
    static T__49: number
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
    static RULE_call: number
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
    block(): TspParser.BlockContext
    statement(): TspParser.StatementContext
    returnStatement(): TspParser.ReturnStatementContext
    functionName(): TspParser.FunctionNameContext
    variableList(): TspParser.VariableListContext
    nameList(): TspParser.NameListContext
    expressionList(): TspParser.ExpressionListContext
    value(): TspParser.ValueContext
    expression(): TspParser.ExpressionContext
    prefix(): TspParser.PrefixContext
    suffix(): TspParser.SuffixContext
    call(): TspParser.CallContext
    index(): TspParser.IndexContext
    variable(): TspParser.VariableContext
    functionCall(): TspParser.FunctionCallContext
    args(): TspParser.ArgsContext
    functionDefinition(): TspParser.FunctionDefinitionContext
    functionBody(): TspParser.FunctionBodyContext
    parameterList(): TspParser.ParameterListContext
    tableConstructor(): TspParser.TableConstructorContext
    fieldList(): TspParser.FieldListContext
    field(): TspParser.FieldContext
    fieldSeparator(): TspParser.FieldSeparatorContext
    operatorOr(): TspParser.OperatorOrContext
    operatorAnd(): TspParser.OperatorAndContext
    operatorComparison(): TspParser.OperatorComparisonContext
    operatorStrcat(): TspParser.OperatorStrcatContext
    operatorAddSub(): TspParser.OperatorAddSubContext
    operatorMulDiv(): TspParser.OperatorMulDivContext
    operatorBitwiseAnd(): TspParser.OperatorBitwiseAndContext
    operatorBitwiseOr(): TspParser.OperatorBitwiseOrContext
    operatorBitwiseXor(): TspParser.OperatorBitwiseXorContext
    operatorBitwiseShift(): TspParser.OperatorBitwiseShiftContext
    operatorUnary(): TspParser.OperatorUnaryContext
    operatorPower(): TspParser.OperatorPowerContext
    number(): TspParser.NumberContext
    string(): TspParser.StringContext
}

export namespace TspParser {
    export class ChunkContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        block(): BlockContext
        EOF(): TerminalNode
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class BlockContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        statement(i?: number): StatementContext[]
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class StatementContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        variableList(): VariableListContext | null
        expressionList(): ExpressionListContext | null
        functionCall(): FunctionCallContext | null
        block(i?: number): BlockContext[]
        expression(i?: number): ExpressionContext[]
        returnStatement(): ReturnStatementContext | null
        NAME(): TerminalNode | null
        nameList(): NameListContext | null
        functionName(): FunctionNameContext | null
        functionBody(): FunctionBodyContext | null
        LOCAL(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ReturnStatementContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        expressionList(): ExpressionListContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FunctionNameContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NAME(i?: number): TerminalNode[]
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class VariableListContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        variable(i?: number): VariableContext[]
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class NameListContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NAME(i?: number): TerminalNode[]
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ExpressionListContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        exp(i?: number): ExpressionContext[]
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ValueContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        number(): NumberContext | null
        string(): StringContext | null
        functionDefinition(): FunctionDefinitionContext | null
        variable(): VariableContext | null
        functionCall(): FunctionCallContext | null
        tableConstructor(): TableConstructorContext | null
        expression(): ExpressionContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ExpressionContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        operatorOr(): OperatorOrContext | null
        expression(): ExpressionContext | null
        operatorAnd(): OperatorAndContext | null
        operatorComparison(): OperatorComparisonContext | null
        operatorBitwiseOr(): OperatorBitwiseOrContext | null
        operatorBitwiseXor(): OperatorBitwiseXorContext | null
        operatorBitwiseAnd(): OperatorBitwiseAndContext | null
        operatorBitwiseShift(): OperatorBitwiseShiftContext | null
        operatorStrcat(): OperatorStrcatContext | null
        operatorAddSub(): OperatorAddSubContext | null
        operatorMulDiv(): OperatorMulDivContext | null
        operatorUnary(): OperatorUnaryContext | null
        operatorPower(): OperatorPowerContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class PrefixContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        expression(): ExpressionContext | null
        NAME(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class SuffixContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        call(): CallContext | null
        index(): IndexContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class CallContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        args(): ArgsContext | null
        NAME(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class IndexContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        expression(): ExpressionContext | null
        NAME(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class VariableContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        prefix(): PrefixContext | null
        index(): IndexContext | null
        suffix(): SuffixContext | null
        NAME(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FunctionCallContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        prefix(): PrefixContext | null
        call(): CallContext | null
        suffix(): SuffixContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ArgsContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        expressionList(): ExpressionListContext | null
        tableConstructor(): TableConstructorContext | null
        string(): StringContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FunctionDefinitionContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        functionBody(): FunctionBodyContext
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FunctionBodyContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        block(): BlockContext
        parameterList(): ParameterListContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ParameterListContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        nameList(): NameListContext | null
        VARARG(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class TableConstructorContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        fieldList(): FieldListContext | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FieldListContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        field(i?: number): FieldContext[]
        fieldSeparator(i?: number): FieldSeparatorContext[]
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FieldContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        expression(i?: number): ExpressionContext[]
        NAME(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FieldSeparatorContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorOrContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorAndContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorComparisonContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorStrcatContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorAddSubContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorMulDivContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorBitwiseAndContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorBitwiseOrContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorBitwiseXorContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorBitwiseShiftContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorUnaryContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class OperatorPowerContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class NumberContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        INT(): TerminalNode | null
        HEX(): TerminalNode | null
        FLOAT(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class StringContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NORMALSTRING(): TerminalNode | null
        CHARSTRING(): TerminalNode | null
        LONGSTRING(): TerminalNode | null
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }
}
