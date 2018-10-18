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
import { ParseTreeListener } from 'antlr4/tree/Tree'

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
    static T__50: number
    static T__51: number
    static LOCAL: number
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
    static RULE_stat: number
    static RULE_assignment: number
    static RULE_retstat: number
    static RULE_funcname: number
    static RULE_varlist: number
    static RULE_namelist: number
    static RULE_explist: number
    static RULE_exp: number
    static RULE_prefixexp: number
    static RULE_functioncall: number
    static RULE_varOrExp: number
    static RULE_variable: number
    static RULE_varSuffix: number
    static RULE_nameAndArgs: number
    static RULE_args: number
    static RULE_functiondef: number
    static RULE_funcbody: number
    static RULE_parlist: number
    static RULE_tableconstructor: number
    static RULE_fieldlist: number
    static RULE_field: number
    static RULE_fieldsep: number
    static RULE_operatorOr: number
    static RULE_operatorAnd: number
    static RULE_operatorComparison: number
    static RULE_operatorStrcat: number
    static RULE_operatorAddSub: number
    static RULE_operatorMulDiv: number
    static RULE_operatorBitwise: number
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
    stat(): TspParser.StatContext
    assignment(): TspParser.AssignmentContext
    retstat(): TspParser.RetstatContext
    funcname(): TspParser.FuncnameContext
    varlist(): TspParser.VarlistContext
    namelist(): TspParser.NamelistContext
    explist(): TspParser.ExplistContext
    exp(): TspParser.ExpContext
    prefixexp(): TspParser.PrefixexpContext
    functioncall(): TspParser.FunctioncallContext
    varOrExp(): TspParser.VarOrExpContext
    variable(): TspParser.VariableContext
    varSuffix(): TspParser.VarSuffixContext
    nameAndArgs(): TspParser.NameAndArgsContext
    args(): TspParser.ArgsContext
    functiondef(): TspParser.FunctiondefContext
    funcbody(): TspParser.FuncbodyContext
    parlist(): TspParser.ParlistContext
    tableconstructor(): TspParser.TableconstructorContext
    fieldlist(): TspParser.FieldlistContext
    field(): TspParser.FieldContext
    fieldsep(): TspParser.FieldsepContext
    operatorOr(): TspParser.OperatorOrContext
    operatorAnd(): TspParser.OperatorAndContext
    operatorComparison(): TspParser.OperatorComparisonContext
    operatorStrcat(): TspParser.OperatorStrcatContext
    operatorAddSub(): TspParser.OperatorAddSubContext
    operatorMulDiv(): TspParser.OperatorMulDivContext
    operatorBitwise(): TspParser.OperatorBitwiseContext
    operatorUnary(): TspParser.OperatorUnaryContext
    operatorPower(): TspParser.OperatorPowerContext
    number(): TspParser.NumberContext
    string(): TspParser.StringContext
}

export namespace TspParser {
    export class ChunkContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        block()
        EOF()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class BlockContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        stat(i?: number)
        retstat()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class StatContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        assignment()
        functioncall()
        block(i?: number)
        exp(i?: number)
        NAME()
        namelist()
        explist()
        funcname()
        funcbody()
        LOCAL()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class AssignmentContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        varlist()
        explist()
        LOCAL()
        namelist()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class RetstatContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        explist()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FuncnameContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NAME(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class VarlistContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        variable(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class NamelistContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NAME(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ExplistContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        exp(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ExpContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        number()
        string()
        functiondef()
        prefixexp()
        tableconstructor()
        operatorUnary()
        exp(i?: number)
        operatorPower()
        operatorMulDiv()
        operatorAddSub()
        operatorStrcat()
        operatorComparison()
        operatorAnd()
        operatorOr()
        operatorBitwise()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class PrefixexpContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        varOrExp()
        nameAndArgs()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FunctioncallContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        varOrExp()
        nameAndArgs()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class VarOrExpContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        variable()
        exp()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class VariableContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NAME()
        exp()
        varSuffix(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class VarSuffixContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        exp()
        NAME()
        nameAndArgs(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class NameAndArgsContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        args()
        NAME()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ArgsContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        explist()
        tableconstructor()
        string()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FunctiondefContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        funcbody()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FuncbodyContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        block()
        parlist()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class ParlistContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        namelist()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class TableconstructorContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        fieldlist()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FieldlistContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        field(i?: number)
        fieldsep(i?: number)
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FieldContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        exp(i?: number)
        NAME()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class FieldsepContext extends ParserRuleContext {
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

    export class OperatorBitwiseContext extends ParserRuleContext {
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

        INT()
        HEX()
        FLOAT()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }

    export class StringContext extends ParserRuleContext {
        constructor(parser: Parser, parent?: ParserRuleContext, invokingState?: number)

        NORMALSTRING()
        CHARSTRING()
        LONGSTRING()
        enterRule(listener: ParseTreeListener)
        exitRule(listener: ParseTreeListener)
    }
}
