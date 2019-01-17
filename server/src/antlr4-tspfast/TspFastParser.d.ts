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
import { CommonTokenStream, Parser, ParserRuleContext } from 'antlr4'
import { ParseTreeListener, TerminalNode } from 'antlr4/tree/Tree'

export declare class TspFastParser extends Parser {
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

    chunk(): TspFastParser.ChunkContext
    statement(): TspFastParser.StatementContext
}

export namespace TspFastParser {
    class BaseContext extends ParserRuleContext {
        children: Array<ParserRuleContext | TerminalNode>
        parser: TspFastParser
        ruleIndex: number
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ChunkContext extends BaseContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        statement(): StatementContext | null
        EOF(): TerminalNode
    }

    export class StatementContext extends BaseContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)
    }
}
