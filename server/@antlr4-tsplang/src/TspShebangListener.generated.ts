// Generated from ./TspShebangParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ShebangContext } from "./TspShebangParser.generated";
import { PluginContext } from "./TspShebangParser.generated";
import { NodeContext } from "./TspShebangParser.generated";
import { NodeNumberContext } from "./TspShebangParser.generated";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `TspShebangParser`.
 */
export interface TspShebangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `TspShebangParser.shebang`.
	 * @param ctx the parse tree
	 */
	enterShebang?: (ctx: ShebangContext) => void;
	/**
	 * Exit a parse tree produced by `TspShebangParser.shebang`.
	 * @param ctx the parse tree
	 */
	exitShebang?: (ctx: ShebangContext) => void;

	/**
	 * Enter a parse tree produced by `TspShebangParser.plugin`.
	 * @param ctx the parse tree
	 */
	enterPlugin?: (ctx: PluginContext) => void;
	/**
	 * Exit a parse tree produced by `TspShebangParser.plugin`.
	 * @param ctx the parse tree
	 */
	exitPlugin?: (ctx: PluginContext) => void;

	/**
	 * Enter a parse tree produced by `TspShebangParser.node`.
	 * @param ctx the parse tree
	 */
	enterNode?: (ctx: NodeContext) => void;
	/**
	 * Exit a parse tree produced by `TspShebangParser.node`.
	 * @param ctx the parse tree
	 */
	exitNode?: (ctx: NodeContext) => void;

	/**
	 * Enter a parse tree produced by `TspShebangParser.nodeNumber`.
	 * @param ctx the parse tree
	 */
	enterNodeNumber?: (ctx: NodeNumberContext) => void;
	/**
	 * Exit a parse tree produced by `TspShebangParser.nodeNumber`.
	 * @param ctx the parse tree
	 */
	exitNodeNumber?: (ctx: NodeNumberContext) => void;
}

