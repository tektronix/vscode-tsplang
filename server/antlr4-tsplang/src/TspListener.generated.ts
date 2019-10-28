// Generated from ./Tsp.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ChunkContext } from "./TspParser.generated";
import { StatementContext } from "./TspParser.generated";
import { AssignmentContext } from "./TspParser.generated";
import { ValueContext } from "./TspParser.generated";
import { ExpressionContext } from "./TspParser.generated";
import { PrefixContext } from "./TspParser.generated";
import { SuffixContext } from "./TspParser.generated";
import { IndexContext } from "./TspParser.generated";
import { VariableContext } from "./TspParser.generated";
import { FunctionCallContext } from "./TspParser.generated";
import { ArgsContext } from "./TspParser.generated";
import { TableConstructorContext } from "./TspParser.generated";
import { FieldListContext } from "./TspParser.generated";
import { FieldContext } from "./TspParser.generated";
import { OperatorOrContext } from "./TspParser.generated";
import { OperatorAndContext } from "./TspParser.generated";
import { OperatorComparisonContext } from "./TspParser.generated";
import { OperatorBitwiseOrContext } from "./TspParser.generated";
import { OperatorBitwiseXorContext } from "./TspParser.generated";
import { OperatorBitwiseAndContext } from "./TspParser.generated";
import { OperatorBitwiseShiftContext } from "./TspParser.generated";
import { OperatorStrcatContext } from "./TspParser.generated";
import { OperatorAddSubContext } from "./TspParser.generated";
import { OperatorMulDivContext } from "./TspParser.generated";
import { OperatorPowerContext } from "./TspParser.generated";
import { OperatorUnaryContext } from "./TspParser.generated";
import { NumberContext } from "./TspParser.generated";
import { StringContext } from "./TspParser.generated";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `TspParser`.
 */
export interface TspListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `TspParser.chunk`.
	 * @param ctx the parse tree
	 */
	enterChunk?: (ctx: ChunkContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.chunk`.
	 * @param ctx the parse tree
	 */
	exitChunk?: (ctx: ChunkContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.prefix`.
	 * @param ctx the parse tree
	 */
	enterPrefix?: (ctx: PrefixContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.prefix`.
	 * @param ctx the parse tree
	 */
	exitPrefix?: (ctx: PrefixContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.suffix`.
	 * @param ctx the parse tree
	 */
	enterSuffix?: (ctx: SuffixContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.suffix`.
	 * @param ctx the parse tree
	 */
	exitSuffix?: (ctx: SuffixContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.index`.
	 * @param ctx the parse tree
	 */
	enterIndex?: (ctx: IndexContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.index`.
	 * @param ctx the parse tree
	 */
	exitIndex?: (ctx: IndexContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.variable`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.variable`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.args`.
	 * @param ctx the parse tree
	 */
	enterArgs?: (ctx: ArgsContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.args`.
	 * @param ctx the parse tree
	 */
	exitArgs?: (ctx: ArgsContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.tableConstructor`.
	 * @param ctx the parse tree
	 */
	enterTableConstructor?: (ctx: TableConstructorContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.tableConstructor`.
	 * @param ctx the parse tree
	 */
	exitTableConstructor?: (ctx: TableConstructorContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.fieldList`.
	 * @param ctx the parse tree
	 */
	enterFieldList?: (ctx: FieldListContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.fieldList`.
	 * @param ctx the parse tree
	 */
	exitFieldList?: (ctx: FieldListContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.field`.
	 * @param ctx the parse tree
	 */
	enterField?: (ctx: FieldContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.field`.
	 * @param ctx the parse tree
	 */
	exitField?: (ctx: FieldContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorOr`.
	 * @param ctx the parse tree
	 */
	enterOperatorOr?: (ctx: OperatorOrContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorOr`.
	 * @param ctx the parse tree
	 */
	exitOperatorOr?: (ctx: OperatorOrContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorAnd`.
	 * @param ctx the parse tree
	 */
	enterOperatorAnd?: (ctx: OperatorAndContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorAnd`.
	 * @param ctx the parse tree
	 */
	exitOperatorAnd?: (ctx: OperatorAndContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorComparison`.
	 * @param ctx the parse tree
	 */
	enterOperatorComparison?: (ctx: OperatorComparisonContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorComparison`.
	 * @param ctx the parse tree
	 */
	exitOperatorComparison?: (ctx: OperatorComparisonContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorBitwiseOr`.
	 * @param ctx the parse tree
	 */
	enterOperatorBitwiseOr?: (ctx: OperatorBitwiseOrContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorBitwiseOr`.
	 * @param ctx the parse tree
	 */
	exitOperatorBitwiseOr?: (ctx: OperatorBitwiseOrContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorBitwiseXor`.
	 * @param ctx the parse tree
	 */
	enterOperatorBitwiseXor?: (ctx: OperatorBitwiseXorContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorBitwiseXor`.
	 * @param ctx the parse tree
	 */
	exitOperatorBitwiseXor?: (ctx: OperatorBitwiseXorContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorBitwiseAnd`.
	 * @param ctx the parse tree
	 */
	enterOperatorBitwiseAnd?: (ctx: OperatorBitwiseAndContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorBitwiseAnd`.
	 * @param ctx the parse tree
	 */
	exitOperatorBitwiseAnd?: (ctx: OperatorBitwiseAndContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorBitwiseShift`.
	 * @param ctx the parse tree
	 */
	enterOperatorBitwiseShift?: (ctx: OperatorBitwiseShiftContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorBitwiseShift`.
	 * @param ctx the parse tree
	 */
	exitOperatorBitwiseShift?: (ctx: OperatorBitwiseShiftContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorStrcat`.
	 * @param ctx the parse tree
	 */
	enterOperatorStrcat?: (ctx: OperatorStrcatContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorStrcat`.
	 * @param ctx the parse tree
	 */
	exitOperatorStrcat?: (ctx: OperatorStrcatContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorAddSub`.
	 * @param ctx the parse tree
	 */
	enterOperatorAddSub?: (ctx: OperatorAddSubContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorAddSub`.
	 * @param ctx the parse tree
	 */
	exitOperatorAddSub?: (ctx: OperatorAddSubContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorMulDiv`.
	 * @param ctx the parse tree
	 */
	enterOperatorMulDiv?: (ctx: OperatorMulDivContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorMulDiv`.
	 * @param ctx the parse tree
	 */
	exitOperatorMulDiv?: (ctx: OperatorMulDivContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorPower`.
	 * @param ctx the parse tree
	 */
	enterOperatorPower?: (ctx: OperatorPowerContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorPower`.
	 * @param ctx the parse tree
	 */
	exitOperatorPower?: (ctx: OperatorPowerContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.operatorUnary`.
	 * @param ctx the parse tree
	 */
	enterOperatorUnary?: (ctx: OperatorUnaryContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.operatorUnary`.
	 * @param ctx the parse tree
	 */
	exitOperatorUnary?: (ctx: OperatorUnaryContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `TspParser.string`.
	 * @param ctx the parse tree
	 */
	enterString?: (ctx: StringContext) => void;
	/**
	 * Exit a parse tree produced by `TspParser.string`.
	 * @param ctx the parse tree
	 */
	exitString?: (ctx: StringContext) => void;
}

