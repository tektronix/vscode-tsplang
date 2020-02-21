// Generated from ./Tsp.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { TspListener } from "./TspListener.generated";

export class TspParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly OR = 35;
	public static readonly AND = 36;
	public static readonly BIT_OR = 37;
	public static readonly BIT_XOR = 38;
	public static readonly BIT_AND = 39;
	public static readonly BIT_LS = 40;
	public static readonly BIT_RS = 41;
	public static readonly POW = 42;
	public static readonly NE = 43;
	public static readonly LT = 44;
	public static readonly GT = 45;
	public static readonly LOGICAL_NOT = 46;
	public static readonly BOOLEAN = 47;
	public static readonly LOCAL = 48;
	public static readonly VARARG = 49;
	public static readonly LONGSTRING = 50;
	public static readonly LONGCOMMENT = 51;
	public static readonly LINE_COMMENT = 52;
	public static readonly SHEBANG = 53;
	public static readonly NIL = 54;
	public static readonly NAME = 55;
	public static readonly NORMALSTRING = 56;
	public static readonly CHARSTRING = 57;
	public static readonly INT = 58;
	public static readonly HEX = 59;
	public static readonly FLOAT = 60;
	public static readonly HORIZONTAL_WS = 61;
	public static readonly VERTICAL_WS = 62;
	public static readonly RULE_chunk = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_value = 2;
	public static readonly RULE_expression = 3;
	public static readonly RULE_prefix = 4;
	public static readonly RULE_suffix = 5;
	public static readonly RULE_index = 6;
	public static readonly RULE_variable = 7;
	public static readonly RULE_functionCall = 8;
	public static readonly RULE_args = 9;
	public static readonly RULE_tableConstructor = 10;
	public static readonly RULE_fieldList = 11;
	public static readonly RULE_field = 12;
	public static readonly RULE_operatorOr = 13;
	public static readonly RULE_operatorAnd = 14;
	public static readonly RULE_operatorComparison = 15;
	public static readonly RULE_operatorBitwiseOr = 16;
	public static readonly RULE_operatorBitwiseXor = 17;
	public static readonly RULE_operatorBitwiseAnd = 18;
	public static readonly RULE_operatorBitwiseShift = 19;
	public static readonly RULE_operatorStrcat = 20;
	public static readonly RULE_operatorAddSub = 21;
	public static readonly RULE_operatorMulDiv = 22;
	public static readonly RULE_operatorPower = 23;
	public static readonly RULE_operatorUnary = 24;
	public static readonly RULE_number = 25;
	public static readonly RULE_string = 26;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"chunk", "statement", "value", "expression", "prefix", "suffix", "index", 
		"variable", "functionCall", "args", "tableConstructor", "fieldList", "field", 
		"operatorOr", "operatorAnd", "operatorComparison", "operatorBitwiseOr", 
		"operatorBitwiseXor", "operatorBitwiseAnd", "operatorBitwiseShift", "operatorStrcat", 
		"operatorAddSub", "operatorMulDiv", "operatorPower", "operatorUnary", 
		"number", "string",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "','", "'='", "'do'", "'end'", "'while'", "'repeat'", 
		"'until'", "'if'", "'then'", "'elseif'", "'else'", "'return'", "'break'", 
		"'for'", "'in'", "'function'", "'.'", "':'", "'('", "')'", "'['", "']'", 
		"'{'", "'}'", "'<='", "'>='", "'=='", "'..'", "'+'", "'-'", "'*'", "'/'", 
		"'not'", "'or'", "'and'", undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"'local'", "'...'", undefined, undefined, undefined, undefined, "'nil'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"OR", "AND", "BIT_OR", "BIT_XOR", "BIT_AND", "BIT_LS", "BIT_RS", "POW", 
		"NE", "LT", "GT", "LOGICAL_NOT", "BOOLEAN", "LOCAL", "VARARG", "LONGSTRING", 
		"LONGCOMMENT", "LINE_COMMENT", "SHEBANG", "NIL", "NAME", "NORMALSTRING", 
		"CHARSTRING", "INT", "HEX", "FLOAT", "HORIZONTAL_WS", "VERTICAL_WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(TspParser._LITERAL_NAMES, TspParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return TspParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Tsp.g4"; }

	// @Override
	public get ruleNames(): string[] { return TspParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return TspParser._serializedATN; }

	public get tsp1(): boolean { return !!this.inputStream.tokenSource["tsp1"]; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(TspParser._ATN, this);
	}
	// @RuleVersion(0)
	public chunk(): ChunkContext {
		let _localctx: ChunkContext = new ChunkContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, TspParser.RULE_chunk);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
				{
				{
				this.state = 54;
				this.statement();
				this.state = 56;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspParser.T__0) {
					{
					this.state = 55;
					this.match(TspParser.T__0);
					}
				}

				}
				}
				this.state = 62;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 63;
			this.match(TspParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, TspParser.RULE_statement);
		let _la: number;
		try {
			let _alt: number;
			this.state = 317;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				_localctx = new GlobalAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 65;
				this.variable();
				this.state = 70;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__1) {
					{
					{
					this.state = 66;
					this.match(TspParser.T__1);
					this.state = 67;
					this.variable();
					}
					}
					this.state = 72;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 73;
				this.match(TspParser.T__2);
				this.state = 74;
				this.expression();
				this.state = 79;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__1) {
					{
					{
					this.state = 75;
					this.match(TspParser.T__1);
					this.state = 76;
					this.expression();
					}
					}
					this.state = 81;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;

			case 2:
				_localctx = new CallFunctionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 82;
				this.functionCall();
				}
				break;

			case 3:
				_localctx = new BlockContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 83;
				this.match(TspParser.T__3);
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 84;
					this.statement();
					this.state = 86;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 85;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 92;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 93;
				this.match(TspParser.T__4);
				}
				break;

			case 4:
				_localctx = new WhileLoopContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 94;
				this.match(TspParser.T__5);
				this.state = 95;
				this.expression();
				this.state = 96;
				this.match(TspParser.T__3);
				this.state = 103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 97;
					this.statement();
					this.state = 99;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 98;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 105;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 106;
				this.match(TspParser.T__4);
				}
				break;

			case 5:
				_localctx = new RepeatLoopContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 108;
				this.match(TspParser.T__6);
				this.state = 115;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 109;
					this.statement();
					this.state = 111;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 110;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 117;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 118;
				this.match(TspParser.T__7);
				this.state = 119;
				this.expression();
				}
				break;

			case 6:
				_localctx = new IfStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 120;
				this.match(TspParser.T__8);
				this.state = 121;
				this.expression();
				this.state = 122;
				this.match(TspParser.T__9);
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 123;
					this.statement();
					this.state = 125;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 124;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 131;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__10) {
					{
					{
					this.state = 132;
					this.match(TspParser.T__10);
					this.state = 133;
					this.expression();
					this.state = 134;
					this.match(TspParser.T__9);
					this.state = 141;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
						{
						{
						this.state = 135;
						this.statement();
						this.state = 137;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === TspParser.T__0) {
							{
							this.state = 136;
							this.match(TspParser.T__0);
							}
						}

						}
						}
						this.state = 143;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
					}
					this.state = 148;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspParser.T__11) {
					{
					this.state = 149;
					this.match(TspParser.T__11);
					this.state = 156;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
						{
						{
						this.state = 150;
						this.statement();
						this.state = 152;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === TspParser.T__0) {
							{
							this.state = 151;
							this.match(TspParser.T__0);
							}
						}

						}
						}
						this.state = 158;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 161;
				this.match(TspParser.T__4);
				}
				break;

			case 7:
				_localctx = new ReturnContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 163;
				this.match(TspParser.T__12);
				this.state = 172;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
				case 1:
					{
					this.state = 164;
					this.expression();
					this.state = 169;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === TspParser.T__1) {
						{
						{
						this.state = 165;
						this.match(TspParser.T__1);
						this.state = 166;
						this.expression();
						}
						}
						this.state = 171;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
					break;
				}
				}
				break;

			case 8:
				_localctx = new BreakContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 174;
				this.match(TspParser.T__13);
				}
				break;

			case 9:
				_localctx = new NumericForContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 175;
				this.match(TspParser.T__14);
				this.state = 176;
				this.match(TspParser.NAME);
				this.state = 177;
				this.match(TspParser.T__2);
				this.state = 178;
				this.expression();
				this.state = 179;
				this.match(TspParser.T__1);
				this.state = 180;
				this.expression();
				this.state = 183;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspParser.T__1) {
					{
					this.state = 181;
					this.match(TspParser.T__1);
					this.state = 182;
					this.expression();
					}
				}

				this.state = 185;
				this.match(TspParser.T__3);
				this.state = 192;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 186;
					this.statement();
					this.state = 188;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 187;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 194;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 195;
				this.match(TspParser.T__4);
				}
				break;

			case 10:
				_localctx = new GenericForContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 197;
				this.match(TspParser.T__14);
				this.state = 198;
				this.match(TspParser.NAME);
				this.state = 203;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__1) {
					{
					{
					this.state = 199;
					this.match(TspParser.T__1);
					this.state = 200;
					this.match(TspParser.NAME);
					}
					}
					this.state = 205;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 206;
				this.match(TspParser.T__15);
				this.state = 207;
				this.expression();
				this.state = 212;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__1) {
					{
					{
					this.state = 208;
					this.match(TspParser.T__1);
					this.state = 209;
					this.expression();
					}
					}
					this.state = 214;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 215;
				this.match(TspParser.T__3);
				this.state = 222;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 216;
					this.statement();
					this.state = 218;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 217;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 224;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 225;
				this.match(TspParser.T__4);
				}
				break;

			case 11:
				_localctx = new GlobalFunctionContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 227;
				this.match(TspParser.T__16);
				this.state = 228;
				this.match(TspParser.NAME);
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__17) {
					{
					{
					this.state = 229;
					this.match(TspParser.T__17);
					this.state = 230;
					this.match(TspParser.NAME);
					}
					}
					this.state = 235;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 238;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspParser.T__18) {
					{
					this.state = 236;
					this.match(TspParser.T__18);
					this.state = 237;
					this.match(TspParser.NAME);
					}
				}

				this.state = 240;
				this.match(TspParser.T__19);
				this.state = 254;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspParser.NAME:
					{
					this.state = 241;
					this.match(TspParser.NAME);
					this.state = 246;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 242;
							this.match(TspParser.T__1);
							this.state = 243;
							this.match(TspParser.NAME);
							}
							}
						}
						this.state = 248;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
					}
					this.state = 251;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__1) {
						{
						this.state = 249;
						this.match(TspParser.T__1);
						this.state = 250;
						this.match(TspParser.VARARG);
						}
					}

					}
					break;
				case TspParser.VARARG:
					{
					this.state = 253;
					this.match(TspParser.VARARG);
					}
					break;
				case TspParser.T__20:
					break;
				default:
					break;
				}
				this.state = 256;
				this.match(TspParser.T__20);
				this.state = 263;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 257;
					this.statement();
					this.state = 259;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 258;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 265;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 266;
				this.match(TspParser.T__4);
				}
				break;

			case 12:
				_localctx = new LocalFunctionContext(_localctx);
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 267;
				this.match(TspParser.LOCAL);
				this.state = 268;
				this.match(TspParser.T__16);
				this.state = 269;
				this.match(TspParser.NAME);
				this.state = 270;
				this.match(TspParser.T__19);
				this.state = 284;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspParser.NAME:
					{
					this.state = 271;
					this.match(TspParser.NAME);
					this.state = 276;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 272;
							this.match(TspParser.T__1);
							this.state = 273;
							this.match(TspParser.NAME);
							}
							}
						}
						this.state = 278;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
					}
					this.state = 281;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__1) {
						{
						this.state = 279;
						this.match(TspParser.T__1);
						this.state = 280;
						this.match(TspParser.VARARG);
						}
					}

					}
					break;
				case TspParser.VARARG:
					{
					this.state = 283;
					this.match(TspParser.VARARG);
					}
					break;
				case TspParser.T__20:
					break;
				default:
					break;
				}
				this.state = 286;
				this.match(TspParser.T__20);
				this.state = 293;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 287;
					this.statement();
					this.state = 289;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 288;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 295;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 296;
				this.match(TspParser.T__4);
				}
				break;

			case 13:
				_localctx = new LocalAssignmentContext(_localctx);
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 297;
				this.match(TspParser.LOCAL);
				this.state = 298;
				this.match(TspParser.NAME);
				this.state = 303;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === TspParser.T__1) {
					{
					{
					this.state = 299;
					this.match(TspParser.T__1);
					this.state = 300;
					this.match(TspParser.NAME);
					}
					}
					this.state = 305;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 315;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspParser.T__2) {
					{
					this.state = 306;
					this.match(TspParser.T__2);
					this.state = 307;
					this.expression();
					this.state = 312;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === TspParser.T__1) {
						{
						{
						this.state = 308;
						this.match(TspParser.T__1);
						this.state = 309;
						this.expression();
						}
						}
						this.state = 314;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, TspParser.RULE_value);
		try {
			this.state = 330;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 319;
				this.match(TspParser.NIL);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 320;
				this.match(TspParser.BOOLEAN);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 321;
				this.number();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 322;
				this.string();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 323;
				this.variable();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 324;
				this.functionCall();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 325;
				this.tableConstructor();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 326;
				this.match(TspParser.T__19);
				this.state = 327;
				this.expression();
				this.state = 328;
				this.match(TspParser.T__20);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, TspParser.RULE_expression);
		let _la: number;
		try {
			let _alt: number;
			this.state = 391;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				_localctx = new ValueExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 332;
				this.value();
				}
				break;

			case 2:
				_localctx = new AnonymousFunctionExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 333;
				this.match(TspParser.T__16);
				this.state = 334;
				this.match(TspParser.T__19);
				this.state = 348;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspParser.NAME:
					{
					this.state = 335;
					this.match(TspParser.NAME);
					this.state = 340;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 336;
							this.match(TspParser.T__1);
							this.state = 337;
							this.match(TspParser.NAME);
							}
							}
						}
						this.state = 342;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
					}
					this.state = 345;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__1) {
						{
						this.state = 343;
						this.match(TspParser.T__1);
						this.state = 344;
						this.match(TspParser.VARARG);
						}
					}

					}
					break;
				case TspParser.VARARG:
					{
					this.state = 347;
					this.match(TspParser.VARARG);
					}
					break;
				case TspParser.T__20:
					break;
				default:
					break;
				}
				this.state = 350;
				this.match(TspParser.T__20);
				this.state = 357;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__3) | (1 << TspParser.T__5) | (1 << TspParser.T__6) | (1 << TspParser.T__8) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__14) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la === TspParser.LOCAL || _la === TspParser.NAME) {
					{
					{
					this.state = 351;
					this.statement();
					this.state = 353;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === TspParser.T__0) {
						{
						this.state = 352;
						this.match(TspParser.T__0);
						}
					}

					}
					}
					this.state = 359;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 360;
				this.match(TspParser.T__4);
				}
				break;

			case 3:
				_localctx = new PowerExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 361;
				this.value();
				this.state = 362;
				this.operatorPower();
				this.state = 363;
				this.expression();
				}
				break;

			case 4:
				_localctx = new UnaryExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 365;
				this.operatorUnary();
				this.state = 366;
				this.expression();
				}
				break;

			case 5:
				_localctx = new NumericExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 368;
				this.value();
				this.state = 375;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspParser.T__31:
				case TspParser.T__32:
					{
					this.state = 369;
					this.operatorMulDiv();
					}
					break;
				case TspParser.BIT_LS:
				case TspParser.BIT_RS:
					{
					this.state = 370;
					this.operatorBitwiseShift();
					}
					break;
				case TspParser.T__29:
				case TspParser.T__30:
					{
					this.state = 371;
					this.operatorAddSub();
					}
					break;
				case TspParser.BIT_AND:
					{
					this.state = 372;
					this.operatorBitwiseAnd();
					}
					break;
				case TspParser.BIT_OR:
					{
					this.state = 373;
					this.operatorBitwiseOr();
					}
					break;
				case TspParser.BIT_XOR:
					{
					this.state = 374;
					this.operatorBitwiseXor();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 377;
				this.expression();
				}
				break;

			case 6:
				_localctx = new StringExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 379;
				this.value();
				this.state = 380;
				this.operatorStrcat();
				this.state = 381;
				this.expression();
				}
				break;

			case 7:
				_localctx = new BooleanExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 383;
				this.value();
				this.state = 387;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspParser.T__25:
				case TspParser.T__26:
				case TspParser.T__27:
				case TspParser.NE:
				case TspParser.LT:
				case TspParser.GT:
					{
					this.state = 384;
					this.operatorComparison();
					}
					break;
				case TspParser.AND:
					{
					this.state = 385;
					this.operatorAnd();
					}
					break;
				case TspParser.OR:
					{
					this.state = 386;
					this.operatorOr();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 389;
				this.expression();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public prefix(): PrefixContext {
		let _localctx: PrefixContext = new PrefixContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, TspParser.RULE_prefix);
		try {
			this.state = 398;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspParser.T__19:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 393;
				this.match(TspParser.T__19);
				this.state = 394;
				this.expression();
				this.state = 395;
				this.match(TspParser.T__20);
				}
				break;
			case TspParser.NAME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 397;
				this.match(TspParser.NAME);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public suffix(): SuffixContext {
		let _localctx: SuffixContext = new SuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, TspParser.RULE_suffix);
		let _la: number;
		try {
			this.state = 406;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspParser.T__18:
			case TspParser.T__19:
			case TspParser.T__23:
			case TspParser.LONGSTRING:
			case TspParser.NORMALSTRING:
			case TspParser.CHARSTRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 402;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspParser.T__18) {
					{
					this.state = 400;
					this.match(TspParser.T__18);
					this.state = 401;
					this.match(TspParser.NAME);
					}
				}

				this.state = 404;
				this.args();
				}
				break;
			case TspParser.T__17:
			case TspParser.T__21:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 405;
				this.index();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public index(): IndexContext {
		let _localctx: IndexContext = new IndexContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, TspParser.RULE_index);
		try {
			this.state = 414;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspParser.T__21:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 408;
				this.match(TspParser.T__21);
				this.state = 409;
				this.expression();
				this.state = 410;
				this.match(TspParser.T__22);
				}
				break;
			case TspParser.T__17:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 412;
				this.match(TspParser.T__17);
				this.state = 413;
				this.match(TspParser.NAME);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, TspParser.RULE_variable);
		try {
			let _alt: number;
			this.state = 426;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 416;
				this.prefix();
				this.state = 420;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 417;
						this.suffix();
						}
						}
					}
					this.state = 422;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
				}
				this.state = 423;
				this.index();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 425;
				this.match(TspParser.NAME);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let _localctx: FunctionCallContext = new FunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, TspParser.RULE_functionCall);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 428;
			this.prefix();
			this.state = 432;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 58, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 429;
					this.suffix();
					}
					}
				}
				this.state = 434;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 58, this._ctx);
			}
			this.state = 437;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspParser.T__18) {
				{
				this.state = 435;
				this.match(TspParser.T__18);
				this.state = 436;
				this.match(TspParser.NAME);
				}
			}

			this.state = 439;
			this.args();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public args(): ArgsContext {
		let _localctx: ArgsContext = new ArgsContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, TspParser.RULE_args);
		let _la: number;
		try {
			this.state = 455;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspParser.T__19:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 441;
				this.match(TspParser.T__19);
				this.state = 450;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__16) | (1 << TspParser.T__19) | (1 << TspParser.T__23) | (1 << TspParser.T__30))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (TspParser.T__33 - 34)) | (1 << (TspParser.LOGICAL_NOT - 34)) | (1 << (TspParser.BOOLEAN - 34)) | (1 << (TspParser.LONGSTRING - 34)) | (1 << (TspParser.NIL - 34)) | (1 << (TspParser.NAME - 34)) | (1 << (TspParser.NORMALSTRING - 34)) | (1 << (TspParser.CHARSTRING - 34)) | (1 << (TspParser.INT - 34)) | (1 << (TspParser.HEX - 34)) | (1 << (TspParser.FLOAT - 34)))) !== 0)) {
					{
					this.state = 442;
					this.expression();
					this.state = 447;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === TspParser.T__1) {
						{
						{
						this.state = 443;
						this.match(TspParser.T__1);
						this.state = 444;
						this.expression();
						}
						}
						this.state = 449;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 452;
				this.match(TspParser.T__20);
				}
				break;
			case TspParser.T__23:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 453;
				this.tableConstructor();
				}
				break;
			case TspParser.LONGSTRING:
			case TspParser.NORMALSTRING:
			case TspParser.CHARSTRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 454;
				this.string();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableConstructor(): TableConstructorContext {
		let _localctx: TableConstructorContext = new TableConstructorContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, TspParser.RULE_tableConstructor);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 457;
			this.match(TspParser.T__23);
			this.state = 459;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspParser.T__16) | (1 << TspParser.T__19) | (1 << TspParser.T__21) | (1 << TspParser.T__23) | (1 << TspParser.T__30))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (TspParser.T__33 - 34)) | (1 << (TspParser.LOGICAL_NOT - 34)) | (1 << (TspParser.BOOLEAN - 34)) | (1 << (TspParser.LONGSTRING - 34)) | (1 << (TspParser.NIL - 34)) | (1 << (TspParser.NAME - 34)) | (1 << (TspParser.NORMALSTRING - 34)) | (1 << (TspParser.CHARSTRING - 34)) | (1 << (TspParser.INT - 34)) | (1 << (TspParser.HEX - 34)) | (1 << (TspParser.FLOAT - 34)))) !== 0)) {
				{
				this.state = 458;
				this.fieldList();
				}
			}

			this.state = 461;
			this.match(TspParser.T__24);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldList(): FieldListContext {
		let _localctx: FieldListContext = new FieldListContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, TspParser.RULE_fieldList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 463;
			this.field();
			this.state = 468;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 464;
					_la = this._input.LA(1);
					if (!(_la === TspParser.T__0 || _la === TspParser.T__1)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 465;
					this.field();
					}
					}
				}
				this.state = 470;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
			}
			this.state = 472;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspParser.T__0 || _la === TspParser.T__1) {
				{
				this.state = 471;
				_la = this._input.LA(1);
				if (!(_la === TspParser.T__0 || _la === TspParser.T__1)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public field(): FieldContext {
		let _localctx: FieldContext = new FieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, TspParser.RULE_field);
		try {
			this.state = 484;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 66, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 474;
				this.match(TspParser.T__21);
				this.state = 475;
				this.expression();
				this.state = 476;
				this.match(TspParser.T__22);
				this.state = 477;
				this.match(TspParser.T__2);
				this.state = 478;
				this.expression();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 480;
				this.match(TspParser.NAME);
				this.state = 481;
				this.match(TspParser.T__2);
				this.state = 482;
				this.expression();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 483;
				this.expression();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorOr(): OperatorOrContext {
		let _localctx: OperatorOrContext = new OperatorOrContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, TspParser.RULE_operatorOr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 486;
			this.match(TspParser.OR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorAnd(): OperatorAndContext {
		let _localctx: OperatorAndContext = new OperatorAndContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, TspParser.RULE_operatorAnd);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 488;
			this.match(TspParser.AND);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorComparison(): OperatorComparisonContext {
		let _localctx: OperatorComparisonContext = new OperatorComparisonContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, TspParser.RULE_operatorComparison);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 490;
			_la = this._input.LA(1);
			if (!(((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & ((1 << (TspParser.T__25 - 26)) | (1 << (TspParser.T__26 - 26)) | (1 << (TspParser.T__27 - 26)) | (1 << (TspParser.NE - 26)) | (1 << (TspParser.LT - 26)) | (1 << (TspParser.GT - 26)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorBitwiseOr(): OperatorBitwiseOrContext {
		let _localctx: OperatorBitwiseOrContext = new OperatorBitwiseOrContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, TspParser.RULE_operatorBitwiseOr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 492;
			this.match(TspParser.BIT_OR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorBitwiseXor(): OperatorBitwiseXorContext {
		let _localctx: OperatorBitwiseXorContext = new OperatorBitwiseXorContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, TspParser.RULE_operatorBitwiseXor);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 494;
			this.match(TspParser.BIT_XOR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorBitwiseAnd(): OperatorBitwiseAndContext {
		let _localctx: OperatorBitwiseAndContext = new OperatorBitwiseAndContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, TspParser.RULE_operatorBitwiseAnd);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 496;
			this.match(TspParser.BIT_AND);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorBitwiseShift(): OperatorBitwiseShiftContext {
		let _localctx: OperatorBitwiseShiftContext = new OperatorBitwiseShiftContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, TspParser.RULE_operatorBitwiseShift);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 498;
			_la = this._input.LA(1);
			if (!(_la === TspParser.BIT_LS || _la === TspParser.BIT_RS)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorStrcat(): OperatorStrcatContext {
		let _localctx: OperatorStrcatContext = new OperatorStrcatContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, TspParser.RULE_operatorStrcat);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 500;
			this.match(TspParser.T__28);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorAddSub(): OperatorAddSubContext {
		let _localctx: OperatorAddSubContext = new OperatorAddSubContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, TspParser.RULE_operatorAddSub);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 502;
			_la = this._input.LA(1);
			if (!(_la === TspParser.T__29 || _la === TspParser.T__30)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorMulDiv(): OperatorMulDivContext {
		let _localctx: OperatorMulDivContext = new OperatorMulDivContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, TspParser.RULE_operatorMulDiv);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 504;
			_la = this._input.LA(1);
			if (!(_la === TspParser.T__31 || _la === TspParser.T__32)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorPower(): OperatorPowerContext {
		let _localctx: OperatorPowerContext = new OperatorPowerContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, TspParser.RULE_operatorPower);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 506;
			this.match(TspParser.POW);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorUnary(): OperatorUnaryContext {
		let _localctx: OperatorUnaryContext = new OperatorUnaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, TspParser.RULE_operatorUnary);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 508;
			_la = this._input.LA(1);
			if (!(((((_la - 31)) & ~0x1F) === 0 && ((1 << (_la - 31)) & ((1 << (TspParser.T__30 - 31)) | (1 << (TspParser.T__33 - 31)) | (1 << (TspParser.LOGICAL_NOT - 31)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public number(): NumberContext {
		let _localctx: NumberContext = new NumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, TspParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 510;
			_la = this._input.LA(1);
			if (!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & ((1 << (TspParser.INT - 58)) | (1 << (TspParser.HEX - 58)) | (1 << (TspParser.FLOAT - 58)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public string(): StringContext {
		let _localctx: StringContext = new StringContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, TspParser.RULE_string);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 512;
			_la = this._input.LA(1);
			if (!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (TspParser.LONGSTRING - 50)) | (1 << (TspParser.NORMALSTRING - 50)) | (1 << (TspParser.CHARSTRING - 50)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03@\u0205\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x03" +
		"\x02\x03\x02\x05\x02;\n\x02\x07\x02=\n\x02\f\x02\x0E\x02@\v\x02\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x03\x03\x07\x03G\n\x03\f\x03\x0E\x03J\v\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x07\x03P\n\x03\f\x03\x0E\x03S\v\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x05\x03Y\n\x03\x07\x03[\n\x03\f\x03\x0E\x03^" +
		"\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03f\n\x03" +
		"\x07\x03h\n\x03\f\x03\x0E\x03k\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x05\x03r\n\x03\x07\x03t\n\x03\f\x03\x0E\x03w\v\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x80\n\x03\x07\x03\x82" +
		"\n\x03\f\x03\x0E\x03\x85\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x05\x03\x8C\n\x03\x07\x03\x8E\n\x03\f\x03\x0E\x03\x91\v\x03\x07\x03\x93" +
		"\n\x03\f\x03\x0E\x03\x96\v\x03\x03\x03\x03\x03\x03\x03\x05\x03\x9B\n\x03" +
		"\x07\x03\x9D\n\x03\f\x03\x0E\x03\xA0\v\x03\x05\x03\xA2\n\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\xAA\n\x03\f\x03\x0E\x03\xAD" +
		"\v\x03\x05\x03\xAF\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x05\x03\xBA\n\x03\x03\x03\x03\x03\x03\x03\x05" +
		"\x03\xBF\n\x03\x07\x03\xC1\n\x03\f\x03\x0E\x03\xC4\v\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\xCC\n\x03\f\x03\x0E\x03\xCF\v" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\xD5\n\x03\f\x03\x0E\x03\xD8" +
		"\v\x03\x03\x03\x03\x03\x03\x03\x05\x03\xDD\n\x03\x07\x03\xDF\n\x03\f\x03" +
		"\x0E\x03\xE2\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07" +
		"\x03\xEA\n\x03\f\x03\x0E\x03\xED\v\x03\x03\x03\x03\x03\x05\x03\xF1\n\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\xF7\n\x03\f\x03\x0E\x03\xFA\v" +
		"\x03\x03\x03\x03\x03\x05\x03\xFE\n\x03\x03\x03\x05\x03\u0101\n\x03\x03" +
		"\x03\x03\x03\x03\x03\x05\x03\u0106\n\x03\x07\x03\u0108\n\x03\f\x03\x0E" +
		"\x03\u010B\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x07\x03\u0115\n\x03\f\x03\x0E\x03\u0118\v\x03\x03\x03\x03\x03" +
		"\x05\x03\u011C\n\x03\x03\x03\x05\x03\u011F\n\x03\x03\x03\x03\x03\x03\x03" +
		"\x05\x03\u0124\n\x03\x07\x03\u0126\n\x03\f\x03\x0E\x03\u0129\v\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\u0130\n\x03\f\x03\x0E\x03" +
		"\u0133\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\u0139\n\x03\f\x03" +
		"\x0E\x03\u013C\v\x03\x05\x03\u013E\n\x03\x05\x03\u0140\n\x03\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x05\x04\u014D\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x07\x05\u0155\n\x05\f\x05\x0E\x05\u0158\v\x05\x03\x05\x03\x05\x05\x05" +
		"\u015C\n\x05\x03\x05\x05\x05\u015F\n\x05\x03\x05\x03\x05\x03\x05\x05\x05" +
		"\u0164\n\x05\x07\x05\u0166\n\x05\f\x05\x0E\x05\u0169\v\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\u017A\n\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05" +
		"\u0186\n\x05\x03\x05\x03\x05\x05\x05\u018A\n\x05\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x05\x06\u0191\n\x06\x03\x07\x03\x07\x05\x07\u0195\n\x07" +
		"\x03\x07\x03\x07\x05\x07\u0199\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x05\b\u01A1\n\b\x03\t\x03\t\x07\t\u01A5\n\t\f\t\x0E\t\u01A8\v\t\x03" +
		"\t\x03\t\x03\t\x05\t\u01AD\n\t\x03\n\x03\n\x07\n\u01B1\n\n\f\n\x0E\n\u01B4" +
		"\v\n\x03\n\x03\n\x05\n\u01B8\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x07" +
		"\v\u01C0\n\v\f\v\x0E\v\u01C3\v\v\x05\v\u01C5\n\v\x03\v\x03\v\x03\v\x05" +
		"\v\u01CA\n\v\x03\f\x03\f\x05\f\u01CE\n\f\x03\f\x03\f\x03\r\x03\r\x03\r" +
		"\x07\r\u01D5\n\r\f\r\x0E\r\u01D8\v\r\x03\r\x05\r\u01DB\n\r\x03\x0E\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05" +
		"\x0E\u01E7\n\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12" +
		"\x03\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16" +
		"\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1B" +
		"\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x02\x02\x02\x1D\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x02\x02\n\x03\x02\x03\x04\x04\x02\x1C\x1E-/\x03\x02*+\x03\x02 " +
		"!\x03\x02\"#\x05\x02!!$$00\x03\x02<>\x04\x0244:;\x02\u024C\x02>\x03\x02" +
		"\x02\x02\x04\u013F\x03\x02\x02\x02\x06\u014C\x03\x02\x02\x02\b\u0189\x03" +
		"\x02\x02\x02\n\u0190\x03\x02\x02\x02\f\u0198\x03\x02\x02\x02\x0E\u01A0" +
		"\x03\x02\x02\x02\x10\u01AC\x03\x02\x02\x02\x12\u01AE\x03\x02\x02\x02\x14" +
		"\u01C9\x03\x02\x02\x02\x16\u01CB\x03\x02\x02\x02\x18\u01D1\x03\x02\x02" +
		"\x02\x1A\u01E6\x03\x02\x02\x02\x1C\u01E8\x03\x02\x02\x02\x1E\u01EA\x03" +
		"\x02\x02\x02 \u01EC\x03\x02\x02\x02\"\u01EE\x03\x02\x02\x02$\u01F0\x03" +
		"\x02\x02\x02&\u01F2\x03\x02\x02\x02(\u01F4\x03\x02\x02\x02*\u01F6\x03" +
		"\x02\x02\x02,\u01F8\x03\x02\x02\x02.\u01FA\x03\x02\x02\x020\u01FC\x03" +
		"\x02\x02\x022\u01FE\x03\x02\x02\x024\u0200\x03\x02\x02\x026\u0202\x03" +
		"\x02\x02\x028:\x05\x04\x03\x029;\x07\x03\x02\x02:9\x03\x02\x02\x02:;\x03" +
		"\x02\x02\x02;=\x03\x02\x02\x02<8\x03\x02\x02\x02=@\x03\x02\x02\x02><\x03" +
		"\x02\x02\x02>?\x03\x02\x02\x02?A\x03\x02\x02\x02@>\x03\x02\x02\x02AB\x07" +
		"\x02\x02\x03B\x03\x03\x02\x02\x02CH\x05\x10\t\x02DE\x07\x04\x02\x02EG" +
		"\x05\x10\t\x02FD\x03\x02\x02\x02GJ\x03\x02\x02\x02HF\x03\x02\x02\x02H" +
		"I\x03\x02\x02\x02IK\x03\x02\x02\x02JH\x03\x02\x02\x02KL\x07\x05\x02\x02" +
		"LQ\x05\b\x05\x02MN\x07\x04\x02\x02NP\x05\b\x05\x02OM\x03\x02\x02\x02P" +
		"S\x03\x02\x02\x02QO\x03\x02\x02\x02QR\x03\x02\x02\x02R\u0140\x03\x02\x02" +
		"\x02SQ\x03\x02\x02\x02T\u0140\x05\x12\n\x02U\\\x07\x06\x02\x02VX\x05\x04" +
		"\x03\x02WY\x07\x03\x02\x02XW\x03\x02\x02\x02XY\x03\x02\x02\x02Y[\x03\x02" +
		"\x02\x02ZV\x03\x02\x02\x02[^\x03\x02\x02\x02\\Z\x03\x02\x02\x02\\]\x03" +
		"\x02\x02\x02]_\x03\x02\x02\x02^\\\x03\x02\x02\x02_\u0140\x07\x07\x02\x02" +
		"`a\x07\b\x02\x02ab\x05\b\x05\x02bi\x07\x06\x02\x02ce\x05\x04\x03\x02d" +
		"f\x07\x03\x02\x02ed\x03\x02\x02\x02ef\x03\x02\x02\x02fh\x03\x02\x02\x02" +
		"gc\x03\x02\x02\x02hk\x03\x02\x02\x02ig\x03\x02\x02\x02ij\x03\x02\x02\x02" +
		"jl\x03\x02\x02\x02ki\x03\x02\x02\x02lm\x07\x07\x02\x02m\u0140\x03\x02" +
		"\x02\x02nu\x07\t\x02\x02oq\x05\x04\x03\x02pr\x07\x03\x02\x02qp\x03\x02" +
		"\x02\x02qr\x03\x02\x02\x02rt\x03\x02\x02\x02so\x03\x02\x02\x02tw\x03\x02" +
		"\x02\x02us\x03\x02\x02\x02uv\x03\x02\x02\x02vx\x03\x02\x02\x02wu\x03\x02" +
		"\x02\x02xy\x07\n\x02\x02y\u0140\x05\b\x05\x02z{\x07\v\x02\x02{|\x05\b" +
		"\x05\x02|\x83\x07\f\x02\x02}\x7F\x05\x04\x03\x02~\x80\x07\x03\x02\x02" +
		"\x7F~\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x82\x03\x02\x02\x02" +
		"\x81}\x03\x02\x02\x02\x82\x85\x03\x02\x02\x02\x83\x81\x03\x02\x02\x02" +
		"\x83\x84\x03\x02\x02\x02\x84\x94\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02" +
		"\x86\x87\x07\r\x02\x02\x87\x88\x05\b\x05\x02\x88\x8F\x07\f\x02\x02\x89" +
		"\x8B\x05\x04\x03\x02\x8A\x8C\x07\x03\x02\x02\x8B\x8A\x03\x02\x02\x02\x8B" +
		"\x8C\x03\x02\x02\x02\x8C\x8E\x03\x02\x02\x02\x8D\x89\x03\x02\x02\x02\x8E" +
		"\x91\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90" +
		"\x93\x03\x02\x02\x02\x91\x8F\x03\x02\x02\x02\x92\x86\x03\x02\x02\x02\x93" +
		"\x96\x03\x02\x02\x02\x94\x92\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95" +
		"\xA1\x03\x02\x02\x02\x96\x94\x03\x02\x02\x02\x97\x9E\x07\x0E\x02\x02\x98" +
		"\x9A\x05\x04\x03\x02\x99\x9B\x07\x03\x02\x02\x9A\x99\x03\x02\x02\x02\x9A" +
		"\x9B\x03\x02\x02\x02\x9B\x9D\x03\x02\x02\x02\x9C\x98\x03\x02\x02\x02\x9D" +
		"\xA0\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F" +
		"\xA2\x03\x02\x02\x02\xA0\x9E\x03\x02\x02\x02\xA1\x97\x03\x02\x02\x02\xA1" +
		"\xA2\x03\x02\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3\xA4\x07\x07\x02\x02\xA4" +
		"\u0140\x03\x02\x02\x02\xA5\xAE\x07\x0F\x02\x02\xA6\xAB\x05\b\x05\x02\xA7" +
		"\xA8\x07\x04\x02\x02\xA8\xAA\x05\b\x05\x02\xA9\xA7\x03\x02\x02\x02\xAA" +
		"\xAD\x03\x02\x02\x02\xAB\xA9\x03\x02\x02\x02\xAB\xAC\x03\x02\x02\x02\xAC" +
		"\xAF\x03\x02\x02\x02\xAD\xAB\x03\x02\x02\x02\xAE\xA6\x03\x02\x02\x02\xAE" +
		"\xAF\x03\x02\x02\x02\xAF\u0140\x03\x02\x02\x02\xB0\u0140\x07\x10\x02\x02" +
		"\xB1\xB2\x07\x11\x02\x02\xB2\xB3\x079\x02\x02\xB3\xB4\x07\x05\x02\x02" +
		"\xB4\xB5\x05\b\x05\x02\xB5\xB6\x07\x04\x02\x02\xB6\xB9\x05\b\x05\x02\xB7" +
		"\xB8\x07\x04\x02\x02\xB8\xBA\x05\b\x05\x02\xB9\xB7\x03\x02\x02\x02\xB9" +
		"\xBA\x03\x02\x02\x02\xBA\xBB\x03\x02\x02\x02\xBB\xC2\x07\x06\x02\x02\xBC" +
		"\xBE\x05\x04\x03\x02\xBD\xBF\x07\x03\x02\x02\xBE\xBD\x03\x02\x02\x02\xBE" +
		"\xBF\x03\x02\x02\x02\xBF\xC1\x03\x02\x02\x02\xC0\xBC\x03\x02\x02\x02\xC1" +
		"\xC4\x03\x02\x02\x02\xC2\xC0\x03\x02\x02\x02\xC2\xC3\x03\x02\x02\x02\xC3" +
		"\xC5\x03\x02\x02\x02\xC4\xC2\x03\x02\x02\x02\xC5\xC6\x07\x07\x02\x02\xC6" +
		"\u0140\x03\x02\x02\x02\xC7\xC8\x07\x11\x02\x02\xC8\xCD\x079\x02\x02\xC9" +
		"\xCA\x07\x04\x02\x02\xCA\xCC\x079\x02\x02\xCB\xC9\x03\x02\x02\x02\xCC" +
		"\xCF\x03\x02\x02\x02\xCD\xCB\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE" +
		"\xD0\x03\x02\x02\x02\xCF\xCD\x03\x02\x02\x02\xD0\xD1\x07\x12\x02\x02\xD1" +
		"\xD6\x05\b\x05\x02\xD2\xD3\x07\x04\x02\x02\xD3\xD5\x05\b\x05\x02\xD4\xD2" +
		"\x03\x02\x02\x02\xD5\xD8\x03\x02\x02\x02\xD6\xD4\x03\x02\x02\x02\xD6\xD7" +
		"\x03\x02\x02\x02\xD7\xD9\x03\x02\x02\x02\xD8\xD6\x03\x02\x02\x02\xD9\xE0" +
		"\x07\x06\x02\x02\xDA\xDC\x05\x04\x03\x02\xDB\xDD\x07\x03\x02\x02\xDC\xDB" +
		"\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02\xDD\xDF\x03\x02\x02\x02\xDE\xDA" +
		"\x03\x02\x02\x02\xDF\xE2\x03\x02\x02\x02\xE0\xDE\x03\x02\x02\x02\xE0\xE1" +
		"\x03\x02\x02\x02\xE1\xE3\x03\x02\x02\x02\xE2\xE0\x03\x02\x02\x02\xE3\xE4" +
		"\x07\x07\x02\x02\xE4\u0140\x03\x02\x02\x02\xE5\xE6\x07\x13\x02\x02\xE6" +
		"\xEB\x079\x02\x02\xE7\xE8\x07\x14\x02\x02\xE8\xEA\x079\x02\x02\xE9\xE7" +
		"\x03\x02\x02\x02\xEA\xED\x03\x02\x02\x02\xEB\xE9\x03\x02\x02\x02\xEB\xEC" +
		"\x03\x02\x02\x02\xEC\xF0\x03\x02\x02\x02\xED\xEB\x03\x02\x02\x02\xEE\xEF" +
		"\x07\x15\x02\x02\xEF\xF1\x079\x02\x02\xF0\xEE\x03\x02\x02\x02\xF0\xF1" +
		"\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\u0100\x07\x16\x02\x02\xF3" +
		"\xF8\x079\x02\x02\xF4\xF5\x07\x04\x02\x02\xF5\xF7\x079\x02\x02\xF6\xF4" +
		"\x03\x02\x02\x02\xF7\xFA\x03\x02\x02\x02\xF8\xF6\x03\x02\x02\x02\xF8\xF9" +
		"\x03\x02\x02\x02\xF9\xFD\x03\x02\x02\x02\xFA\xF8\x03\x02\x02\x02\xFB\xFC" +
		"\x07\x04\x02\x02\xFC\xFE\x073\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD\xFE" +
		"\x03\x02\x02\x02\xFE\u0101\x03\x02\x02\x02\xFF\u0101\x073\x02\x02\u0100" +
		"\xF3\x03\x02\x02\x02\u0100\xFF\x03\x02\x02\x02\u0100\u0101\x03\x02\x02" +
		"\x02\u0101\u0102\x03\x02\x02\x02\u0102\u0109\x07\x17\x02\x02\u0103\u0105" +
		"\x05\x04\x03\x02\u0104\u0106\x07\x03\x02\x02\u0105\u0104\x03\x02\x02\x02" +
		"\u0105\u0106\x03\x02\x02\x02\u0106\u0108\x03\x02\x02\x02\u0107\u0103\x03" +
		"\x02\x02\x02\u0108\u010B\x03\x02\x02\x02\u0109\u0107\x03\x02\x02\x02\u0109" +
		"\u010A\x03\x02\x02\x02\u010A\u010C\x03\x02\x02\x02\u010B\u0109\x03\x02" +
		"\x02\x02\u010C\u0140\x07\x07\x02\x02\u010D\u010E\x072\x02\x02\u010E\u010F" +
		"\x07\x13\x02\x02\u010F\u0110\x079\x02\x02\u0110\u011E\x07\x16\x02\x02" +
		"\u0111\u0116\x079\x02\x02\u0112\u0113\x07\x04\x02\x02\u0113\u0115\x07" +
		"9\x02\x02\u0114\u0112\x03\x02\x02\x02\u0115\u0118\x03\x02\x02\x02\u0116" +
		"\u0114\x03\x02\x02\x02\u0116\u0117\x03\x02\x02\x02\u0117\u011B\x03\x02" +
		"\x02\x02\u0118\u0116\x03\x02\x02\x02\u0119\u011A\x07\x04\x02\x02\u011A" +
		"\u011C\x073\x02\x02\u011B\u0119\x03\x02\x02\x02\u011B\u011C\x03\x02\x02" +
		"\x02\u011C\u011F\x03\x02\x02\x02\u011D\u011F\x073\x02\x02\u011E\u0111" +
		"\x03\x02\x02\x02\u011E\u011D\x03\x02\x02\x02\u011E\u011F\x03\x02\x02\x02" +
		"\u011F\u0120\x03\x02\x02\x02\u0120\u0127\x07\x17\x02\x02\u0121\u0123\x05" +
		"\x04\x03\x02\u0122\u0124\x07\x03\x02\x02\u0123\u0122\x03\x02\x02\x02\u0123" +
		"\u0124\x03\x02\x02\x02\u0124\u0126\x03\x02\x02\x02\u0125\u0121\x03\x02" +
		"\x02\x02\u0126\u0129\x03\x02\x02\x02\u0127\u0125\x03\x02\x02\x02\u0127" +
		"\u0128\x03\x02\x02\x02\u0128\u012A\x03\x02\x02\x02\u0129\u0127\x03\x02" +
		"\x02\x02\u012A\u0140\x07\x07\x02\x02\u012B\u012C\x072\x02\x02\u012C\u0131" +
		"\x079\x02\x02\u012D\u012E\x07\x04\x02\x02\u012E\u0130\x079\x02\x02\u012F" +
		"\u012D\x03\x02\x02\x02\u0130\u0133\x03\x02\x02\x02\u0131\u012F\x03\x02" +
		"\x02\x02\u0131\u0132\x03\x02\x02\x02\u0132\u013D\x03\x02\x02\x02\u0133" +
		"\u0131\x03\x02\x02\x02\u0134\u0135\x07\x05\x02\x02\u0135\u013A\x05\b\x05" +
		"\x02\u0136\u0137\x07\x04\x02\x02\u0137\u0139\x05\b\x05\x02\u0138\u0136" +
		"\x03\x02\x02\x02\u0139\u013C\x03\x02\x02\x02\u013A\u0138\x03\x02\x02\x02" +
		"\u013A\u013B\x03\x02\x02\x02\u013B\u013E\x03\x02\x02\x02\u013C\u013A\x03" +
		"\x02\x02\x02\u013D\u0134\x03\x02\x02\x02\u013D\u013E\x03\x02\x02\x02\u013E" +
		"\u0140\x03\x02\x02\x02\u013FC\x03\x02\x02\x02\u013FT\x03\x02\x02\x02\u013F" +
		"U\x03\x02\x02\x02\u013F`\x03\x02\x02\x02\u013Fn\x03\x02\x02\x02\u013F" +
		"z\x03\x02\x02\x02\u013F\xA5\x03\x02\x02\x02\u013F\xB0\x03\x02\x02\x02" +
		"\u013F\xB1\x03\x02\x02\x02\u013F\xC7\x03\x02\x02\x02\u013F\xE5\x03\x02" +
		"\x02\x02\u013F\u010D\x03\x02\x02\x02\u013F\u012B\x03\x02\x02\x02\u0140" +
		"\x05\x03\x02\x02\x02\u0141\u014D\x078\x02\x02\u0142\u014D\x071\x02\x02" +
		"\u0143\u014D\x054\x1B\x02\u0144\u014D\x056\x1C\x02\u0145\u014D\x05\x10" +
		"\t\x02\u0146\u014D\x05\x12\n\x02\u0147\u014D\x05\x16\f\x02\u0148\u0149" +
		"\x07\x16\x02\x02\u0149\u014A\x05\b\x05\x02\u014A\u014B\x07\x17\x02\x02" +
		"\u014B\u014D\x03\x02\x02\x02\u014C\u0141\x03\x02\x02\x02\u014C\u0142\x03" +
		"\x02\x02\x02\u014C\u0143\x03\x02\x02\x02\u014C\u0144\x03\x02\x02\x02\u014C" +
		"\u0145\x03\x02\x02\x02\u014C\u0146\x03\x02\x02\x02\u014C\u0147\x03\x02" +
		"\x02\x02\u014C\u0148\x03\x02\x02\x02\u014D\x07\x03\x02\x02\x02\u014E\u018A" +
		"\x05\x06\x04\x02\u014F\u0150\x07\x13\x02\x02\u0150\u015E\x07\x16\x02\x02" +
		"\u0151\u0156\x079\x02\x02\u0152\u0153\x07\x04\x02\x02\u0153\u0155\x07" +
		"9\x02\x02\u0154\u0152\x03\x02\x02\x02\u0155\u0158\x03\x02\x02\x02\u0156" +
		"\u0154\x03\x02\x02\x02\u0156\u0157\x03\x02\x02\x02\u0157\u015B\x03\x02" +
		"\x02\x02\u0158\u0156\x03\x02\x02\x02\u0159\u015A\x07\x04\x02\x02\u015A" +
		"\u015C\x073\x02\x02\u015B\u0159\x03\x02\x02\x02\u015B\u015C\x03\x02\x02" +
		"\x02\u015C\u015F\x03\x02\x02\x02\u015D\u015F\x073\x02\x02\u015E\u0151" +
		"\x03\x02\x02\x02\u015E\u015D\x03\x02\x02\x02\u015E\u015F\x03\x02\x02\x02" +
		"\u015F\u0160\x03\x02\x02\x02\u0160\u0167\x07\x17\x02\x02\u0161\u0163\x05" +
		"\x04\x03\x02\u0162\u0164\x07\x03\x02\x02\u0163\u0162\x03\x02\x02\x02\u0163" +
		"\u0164\x03\x02\x02\x02\u0164\u0166\x03\x02\x02\x02\u0165\u0161\x03\x02" +
		"\x02\x02\u0166\u0169\x03\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0167" +
		"\u0168\x03\x02\x02\x02\u0168\u016A\x03\x02\x02\x02\u0169\u0167\x03\x02" +
		"\x02\x02\u016A\u018A\x07\x07\x02\x02\u016B\u016C\x05\x06\x04\x02\u016C" +
		"\u016D\x050\x19\x02\u016D\u016E\x05\b\x05\x02\u016E\u018A\x03\x02\x02" +
		"\x02\u016F\u0170\x052\x1A\x02\u0170\u0171\x05\b\x05\x02\u0171\u018A\x03" +
		"\x02\x02\x02\u0172\u0179\x05\x06\x04\x02\u0173\u017A\x05.\x18\x02\u0174" +
		"\u017A\x05(\x15\x02\u0175\u017A\x05,\x17\x02\u0176\u017A\x05&\x14\x02" +
		"\u0177\u017A\x05\"\x12\x02\u0178\u017A\x05$\x13\x02\u0179\u0173\x03\x02" +
		"\x02\x02\u0179\u0174\x03\x02\x02\x02\u0179\u0175\x03\x02\x02\x02\u0179" +
		"\u0176\x03\x02\x02\x02\u0179\u0177\x03\x02\x02\x02\u0179\u0178\x03\x02" +
		"\x02\x02\u017A\u017B\x03\x02\x02\x02\u017B\u017C\x05\b\x05\x02\u017C\u018A" +
		"\x03\x02\x02\x02\u017D\u017E\x05\x06\x04\x02\u017E\u017F\x05*\x16\x02" +
		"\u017F\u0180\x05\b\x05\x02\u0180\u018A\x03\x02\x02\x02\u0181\u0185\x05" +
		"\x06\x04\x02\u0182\u0186\x05 \x11\x02\u0183\u0186\x05\x1E\x10\x02\u0184" +
		"\u0186\x05\x1C\x0F\x02\u0185\u0182\x03\x02\x02\x02\u0185\u0183\x03\x02" +
		"\x02\x02\u0185\u0184\x03\x02\x02\x02\u0186\u0187\x03\x02\x02\x02\u0187" +
		"\u0188\x05\b\x05\x02\u0188\u018A\x03\x02\x02\x02\u0189\u014E\x03\x02\x02" +
		"\x02\u0189\u014F\x03\x02\x02\x02\u0189\u016B\x03\x02\x02\x02\u0189\u016F" +
		"\x03\x02\x02\x02\u0189\u0172\x03\x02\x02\x02\u0189\u017D\x03\x02\x02\x02" +
		"\u0189\u0181\x03\x02\x02\x02\u018A\t\x03\x02\x02\x02\u018B\u018C\x07\x16" +
		"\x02\x02\u018C\u018D\x05\b\x05\x02\u018D\u018E\x07\x17\x02\x02\u018E\u0191" +
		"\x03\x02\x02\x02\u018F\u0191\x079\x02\x02\u0190\u018B\x03\x02\x02\x02" +
		"\u0190\u018F\x03\x02\x02\x02\u0191\v\x03\x02\x02\x02\u0192\u0193\x07\x15" +
		"\x02\x02\u0193\u0195\x079\x02\x02\u0194\u0192\x03\x02\x02\x02\u0194\u0195" +
		"\x03\x02\x02\x02\u0195\u0196\x03\x02\x02\x02\u0196\u0199\x05\x14\v\x02" +
		"\u0197\u0199\x05\x0E\b\x02\u0198\u0194\x03\x02\x02\x02\u0198\u0197\x03" +
		"\x02\x02\x02\u0199\r\x03\x02\x02\x02\u019A\u019B\x07\x18\x02\x02\u019B" +
		"\u019C\x05\b\x05\x02\u019C\u019D\x07\x19\x02\x02\u019D\u01A1\x03\x02\x02" +
		"\x02\u019E\u019F\x07\x14\x02\x02\u019F\u01A1\x079\x02\x02\u01A0\u019A" +
		"\x03\x02\x02\x02\u01A0\u019E\x03\x02\x02\x02\u01A1\x0F\x03\x02\x02\x02" +
		"\u01A2\u01A6\x05\n\x06\x02\u01A3\u01A5\x05\f\x07\x02\u01A4\u01A3\x03\x02" +
		"\x02\x02\u01A5\u01A8\x03\x02\x02\x02\u01A6\u01A4\x03\x02\x02\x02\u01A6" +
		"\u01A7\x03\x02\x02\x02\u01A7\u01A9\x03\x02\x02\x02\u01A8\u01A6\x03\x02" +
		"\x02\x02\u01A9\u01AA\x05\x0E\b\x02\u01AA\u01AD\x03\x02\x02\x02\u01AB\u01AD" +
		"\x079\x02\x02\u01AC\u01A2\x03\x02\x02\x02\u01AC\u01AB\x03\x02\x02\x02" +
		"\u01AD\x11\x03\x02\x02\x02\u01AE\u01B2\x05\n\x06\x02\u01AF\u01B1\x05\f" +
		"\x07\x02\u01B0\u01AF\x03\x02\x02\x02\u01B1\u01B4\x03\x02\x02\x02\u01B2" +
		"\u01B0\x03\x02\x02\x02\u01B2\u01B3\x03\x02\x02\x02\u01B3\u01B7\x03\x02" +
		"\x02\x02\u01B4\u01B2\x03\x02\x02\x02\u01B5\u01B6\x07\x15\x02\x02\u01B6" +
		"\u01B8\x079\x02\x02\u01B7\u01B5\x03\x02\x02\x02\u01B7\u01B8\x03\x02\x02" +
		"\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BA\x05\x14\v\x02\u01BA\x13\x03" +
		"\x02\x02\x02\u01BB\u01C4\x07\x16\x02\x02\u01BC\u01C1\x05\b\x05\x02\u01BD" +
		"\u01BE\x07\x04\x02\x02\u01BE\u01C0\x05\b\x05\x02\u01BF\u01BD\x03\x02\x02" +
		"\x02\u01C0\u01C3\x03\x02\x02\x02\u01C1\u01BF\x03\x02\x02\x02\u01C1\u01C2" +
		"\x03\x02\x02\x02\u01C2\u01C5\x03\x02\x02\x02\u01C3\u01C1\x03\x02\x02\x02" +
		"\u01C4\u01BC\x03\x02\x02\x02\u01C4\u01C5\x03\x02\x02\x02\u01C5\u01C6\x03" +
		"\x02\x02\x02\u01C6\u01CA\x07\x17\x02\x02\u01C7\u01CA\x05\x16\f\x02\u01C8" +
		"\u01CA\x056\x1C\x02\u01C9\u01BB\x03\x02\x02\x02\u01C9\u01C7\x03\x02\x02" +
		"\x02\u01C9\u01C8\x03\x02\x02\x02\u01CA\x15\x03\x02\x02\x02\u01CB\u01CD" +
		"\x07\x1A\x02\x02\u01CC\u01CE\x05\x18\r\x02\u01CD\u01CC\x03\x02\x02\x02" +
		"\u01CD\u01CE\x03\x02\x02\x02\u01CE\u01CF\x03\x02\x02\x02\u01CF\u01D0\x07" +
		"\x1B\x02\x02\u01D0\x17\x03\x02\x02\x02\u01D1\u01D6\x05\x1A\x0E\x02\u01D2" +
		"\u01D3\t\x02\x02\x02\u01D3\u01D5\x05\x1A\x0E\x02\u01D4\u01D2\x03\x02\x02" +
		"\x02\u01D5\u01D8\x03\x02\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D6\u01D7" +
		"\x03\x02\x02\x02\u01D7\u01DA\x03\x02\x02\x02\u01D8\u01D6\x03\x02\x02\x02" +
		"\u01D9\u01DB\t\x02\x02\x02\u01DA\u01D9\x03\x02\x02\x02\u01DA\u01DB\x03" +
		"\x02\x02\x02\u01DB\x19\x03\x02\x02\x02\u01DC\u01DD\x07\x18\x02\x02\u01DD" +
		"\u01DE\x05\b\x05\x02\u01DE\u01DF\x07\x19\x02\x02\u01DF\u01E0\x07\x05\x02" +
		"\x02\u01E0\u01E1\x05\b\x05\x02\u01E1\u01E7\x03\x02\x02\x02\u01E2\u01E3" +
		"\x079\x02\x02\u01E3\u01E4\x07\x05\x02\x02\u01E4\u01E7\x05\b\x05\x02\u01E5" +
		"\u01E7\x05\b\x05\x02\u01E6\u01DC\x03\x02\x02\x02\u01E6\u01E2\x03\x02\x02" +
		"\x02\u01E6\u01E5\x03\x02\x02\x02\u01E7\x1B\x03\x02\x02\x02\u01E8\u01E9" +
		"\x07%\x02\x02\u01E9\x1D\x03\x02\x02\x02\u01EA\u01EB\x07&\x02\x02\u01EB" +
		"\x1F\x03\x02\x02\x02\u01EC\u01ED\t\x03\x02\x02\u01ED!\x03\x02\x02\x02" +
		"\u01EE\u01EF\x07\'\x02\x02\u01EF#\x03\x02\x02\x02\u01F0\u01F1\x07(\x02" +
		"\x02\u01F1%\x03\x02\x02\x02\u01F2\u01F3\x07)\x02\x02\u01F3\'\x03\x02\x02" +
		"\x02\u01F4\u01F5\t\x04\x02\x02\u01F5)\x03\x02\x02\x02\u01F6\u01F7\x07" +
		"\x1F\x02\x02\u01F7+\x03\x02\x02\x02\u01F8\u01F9\t\x05\x02\x02\u01F9-\x03" +
		"\x02\x02\x02\u01FA\u01FB\t\x06\x02\x02\u01FB/\x03\x02\x02\x02\u01FC\u01FD" +
		"\x07,\x02\x02\u01FD1\x03\x02\x02\x02\u01FE\u01FF\t\x07\x02\x02\u01FF3" +
		"\x03\x02\x02\x02\u0200\u0201\t\b\x02\x02\u02015\x03\x02\x02\x02\u0202" +
		"\u0203\t\t\x02\x02\u02037\x03\x02\x02\x02E:>HQX\\eiqu\x7F\x83\x8B\x8F" +
		"\x94\x9A\x9E\xA1\xAB\xAE\xB9\xBE\xC2\xCD\xD6\xDC\xE0\xEB\xF0\xF8\xFD\u0100" +
		"\u0105\u0109\u0116\u011B\u011E\u0123\u0127\u0131\u013A\u013D\u013F\u014C" +
		"\u0156\u015B\u015E\u0163\u0167\u0179\u0185\u0189\u0190\u0194\u0198\u01A0" +
		"\u01A6\u01AC\u01B2\u01B7\u01C1\u01C4\u01C9\u01CD\u01D6\u01DA\u01E6";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TspParser.__ATN) {
			TspParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(TspParser._serializedATN));
		}

		return TspParser.__ATN;
	}

}

/* istanbul ignore next */
export class ChunkContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(TspParser.EOF, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_chunk; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterChunk) {
			listener.enterChunk(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitChunk) {
			listener.exitChunk(this);
		}
	}
}


/* istanbul ignore next */
export class StatementContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_statement; }
	public copyFrom(ctx: StatementContext): void {
		super.copyFrom(ctx);
	}
}
/* istanbul ignore next */
export class GlobalAssignmentContext extends StatementContext {
	public variable(): VariableContext[];
	public variable(i: number): VariableContext;
	public variable(i?: number): VariableContext | VariableContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableContext);
		} else {
			return this.getRuleContext(i, VariableContext);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterGlobalAssignment) {
			listener.enterGlobalAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitGlobalAssignment) {
			listener.exitGlobalAssignment(this);
		}
	}
}
/* istanbul ignore next */
export class CallFunctionContext extends StatementContext {
	public functionCall(): FunctionCallContext {
		return this.getRuleContext(0, FunctionCallContext);
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterCallFunction) {
			listener.enterCallFunction(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitCallFunction) {
			listener.exitCallFunction(this);
		}
	}
}
/* istanbul ignore next */
export class BlockContext extends StatementContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
}
/* istanbul ignore next */
export class WhileLoopContext extends StatementContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterWhileLoop) {
			listener.enterWhileLoop(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitWhileLoop) {
			listener.exitWhileLoop(this);
		}
	}
}
/* istanbul ignore next */
export class RepeatLoopContext extends StatementContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterRepeatLoop) {
			listener.enterRepeatLoop(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitRepeatLoop) {
			listener.exitRepeatLoop(this);
		}
	}
}
/* istanbul ignore next */
export class IfStatementContext extends StatementContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterIfStatement) {
			listener.enterIfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitIfStatement) {
			listener.exitIfStatement(this);
		}
	}
}
/* istanbul ignore next */
export class ReturnContext extends StatementContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterReturn) {
			listener.enterReturn(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitReturn) {
			listener.exitReturn(this);
		}
	}
}
/* istanbul ignore next */
export class BreakContext extends StatementContext {
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterBreak) {
			listener.enterBreak(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitBreak) {
			listener.exitBreak(this);
		}
	}
}
/* istanbul ignore next */
export class NumericForContext extends StatementContext {
	public NAME(): TerminalNode { return this.getToken(TspParser.NAME, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterNumericFor) {
			listener.enterNumericFor(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitNumericFor) {
			listener.exitNumericFor(this);
		}
	}
}
/* istanbul ignore next */
export class GenericForContext extends StatementContext {
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspParser.NAME);
		} else {
			return this.getToken(TspParser.NAME, i);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterGenericFor) {
			listener.enterGenericFor(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitGenericFor) {
			listener.exitGenericFor(this);
		}
	}
}
/* istanbul ignore next */
export class GlobalFunctionContext extends StatementContext {
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspParser.NAME);
		} else {
			return this.getToken(TspParser.NAME, i);
		}
	}
	public VARARG(): TerminalNode | undefined { return this.tryGetToken(TspParser.VARARG, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterGlobalFunction) {
			listener.enterGlobalFunction(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitGlobalFunction) {
			listener.exitGlobalFunction(this);
		}
	}
}
/* istanbul ignore next */
export class LocalFunctionContext extends StatementContext {
	public LOCAL(): TerminalNode { return this.getToken(TspParser.LOCAL, 0); }
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspParser.NAME);
		} else {
			return this.getToken(TspParser.NAME, i);
		}
	}
	public VARARG(): TerminalNode | undefined { return this.tryGetToken(TspParser.VARARG, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterLocalFunction) {
			listener.enterLocalFunction(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitLocalFunction) {
			listener.exitLocalFunction(this);
		}
	}
}
/* istanbul ignore next */
export class LocalAssignmentContext extends StatementContext {
	public LOCAL(): TerminalNode { return this.getToken(TspParser.LOCAL, 0); }
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspParser.NAME);
		} else {
			return this.getToken(TspParser.NAME, i);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterLocalAssignment) {
			listener.enterLocalAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitLocalAssignment) {
			listener.exitLocalAssignment(this);
		}
	}
}


/* istanbul ignore next */
export class ValueContext extends ParserRuleContext {
	public NIL(): TerminalNode | undefined { return this.tryGetToken(TspParser.NIL, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(TspParser.BOOLEAN, 0); }
	public number(): NumberContext | undefined {
		return this.tryGetRuleContext(0, NumberContext);
	}
	public string(): StringContext | undefined {
		return this.tryGetRuleContext(0, StringContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	public functionCall(): FunctionCallContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallContext);
	}
	public tableConstructor(): TableConstructorContext | undefined {
		return this.tryGetRuleContext(0, TableConstructorContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_value; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
}


/* istanbul ignore next */
export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
/* istanbul ignore next */
export class ValueExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterValueExpression) {
			listener.enterValueExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitValueExpression) {
			listener.exitValueExpression(this);
		}
	}
}
/* istanbul ignore next */
export class AnonymousFunctionExpressionContext extends ExpressionContext {
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspParser.NAME);
		} else {
			return this.getToken(TspParser.NAME, i);
		}
	}
	public VARARG(): TerminalNode | undefined { return this.tryGetToken(TspParser.VARARG, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterAnonymousFunctionExpression) {
			listener.enterAnonymousFunctionExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitAnonymousFunctionExpression) {
			listener.exitAnonymousFunctionExpression(this);
		}
	}
}
/* istanbul ignore next */
export class PowerExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public operatorPower(): OperatorPowerContext {
		return this.getRuleContext(0, OperatorPowerContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterPowerExpression) {
			listener.enterPowerExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitPowerExpression) {
			listener.exitPowerExpression(this);
		}
	}
}
/* istanbul ignore next */
export class UnaryExpressionContext extends ExpressionContext {
	public operatorUnary(): OperatorUnaryContext {
		return this.getRuleContext(0, OperatorUnaryContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterUnaryExpression) {
			listener.enterUnaryExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitUnaryExpression) {
			listener.exitUnaryExpression(this);
		}
	}
}
/* istanbul ignore next */
export class NumericExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public operatorMulDiv(): OperatorMulDivContext | undefined {
		return this.tryGetRuleContext(0, OperatorMulDivContext);
	}
	public operatorBitwiseShift(): OperatorBitwiseShiftContext | undefined {
		return this.tryGetRuleContext(0, OperatorBitwiseShiftContext);
	}
	public operatorAddSub(): OperatorAddSubContext | undefined {
		return this.tryGetRuleContext(0, OperatorAddSubContext);
	}
	public operatorBitwiseAnd(): OperatorBitwiseAndContext | undefined {
		return this.tryGetRuleContext(0, OperatorBitwiseAndContext);
	}
	public operatorBitwiseOr(): OperatorBitwiseOrContext | undefined {
		return this.tryGetRuleContext(0, OperatorBitwiseOrContext);
	}
	public operatorBitwiseXor(): OperatorBitwiseXorContext | undefined {
		return this.tryGetRuleContext(0, OperatorBitwiseXorContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterNumericExpression) {
			listener.enterNumericExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitNumericExpression) {
			listener.exitNumericExpression(this);
		}
	}
}
/* istanbul ignore next */
export class StringExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public operatorStrcat(): OperatorStrcatContext {
		return this.getRuleContext(0, OperatorStrcatContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterStringExpression) {
			listener.enterStringExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitStringExpression) {
			listener.exitStringExpression(this);
		}
	}
}
/* istanbul ignore next */
export class BooleanExpressionContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public operatorComparison(): OperatorComparisonContext | undefined {
		return this.tryGetRuleContext(0, OperatorComparisonContext);
	}
	public operatorAnd(): OperatorAndContext | undefined {
		return this.tryGetRuleContext(0, OperatorAndContext);
	}
	public operatorOr(): OperatorOrContext | undefined {
		return this.tryGetRuleContext(0, OperatorOrContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterBooleanExpression) {
			listener.enterBooleanExpression(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitBooleanExpression) {
			listener.exitBooleanExpression(this);
		}
	}
}


/* istanbul ignore next */
export class PrefixContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_prefix; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterPrefix) {
			listener.enterPrefix(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitPrefix) {
			listener.exitPrefix(this);
		}
	}
}


/* istanbul ignore next */
export class SuffixContext extends ParserRuleContext {
	public args(): ArgsContext | undefined {
		return this.tryGetRuleContext(0, ArgsContext);
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspParser.NAME, 0); }
	public index(): IndexContext | undefined {
		return this.tryGetRuleContext(0, IndexContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_suffix; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterSuffix) {
			listener.enterSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitSuffix) {
			listener.exitSuffix(this);
		}
	}
}


/* istanbul ignore next */
export class IndexContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_index; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterIndex) {
			listener.enterIndex(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitIndex) {
			listener.exitIndex(this);
		}
	}
}


/* istanbul ignore next */
export class VariableContext extends ParserRuleContext {
	public prefix(): PrefixContext | undefined {
		return this.tryGetRuleContext(0, PrefixContext);
	}
	public index(): IndexContext | undefined {
		return this.tryGetRuleContext(0, IndexContext);
	}
	public suffix(): SuffixContext[];
	public suffix(i: number): SuffixContext;
	public suffix(i?: number): SuffixContext | SuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuffixContext);
		} else {
			return this.getRuleContext(i, SuffixContext);
		}
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_variable; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterVariable) {
			listener.enterVariable(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitVariable) {
			listener.exitVariable(this);
		}
	}
}


/* istanbul ignore next */
export class FunctionCallContext extends ParserRuleContext {
	public prefix(): PrefixContext {
		return this.getRuleContext(0, PrefixContext);
	}
	public args(): ArgsContext {
		return this.getRuleContext(0, ArgsContext);
	}
	public suffix(): SuffixContext[];
	public suffix(i: number): SuffixContext;
	public suffix(i?: number): SuffixContext | SuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuffixContext);
		} else {
			return this.getRuleContext(i, SuffixContext);
		}
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_functionCall; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterFunctionCall) {
			listener.enterFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitFunctionCall) {
			listener.exitFunctionCall(this);
		}
	}
}


/* istanbul ignore next */
export class ArgsContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public tableConstructor(): TableConstructorContext | undefined {
		return this.tryGetRuleContext(0, TableConstructorContext);
	}
	public string(): StringContext | undefined {
		return this.tryGetRuleContext(0, StringContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_args; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterArgs) {
			listener.enterArgs(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitArgs) {
			listener.exitArgs(this);
		}
	}
}


/* istanbul ignore next */
export class TableConstructorContext extends ParserRuleContext {
	public fieldList(): FieldListContext | undefined {
		return this.tryGetRuleContext(0, FieldListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_tableConstructor; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterTableConstructor) {
			listener.enterTableConstructor(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitTableConstructor) {
			listener.exitTableConstructor(this);
		}
	}
}


/* istanbul ignore next */
export class FieldListContext extends ParserRuleContext {
	public field(): FieldContext[];
	public field(i: number): FieldContext;
	public field(i?: number): FieldContext | FieldContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FieldContext);
		} else {
			return this.getRuleContext(i, FieldContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_fieldList; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterFieldList) {
			listener.enterFieldList(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitFieldList) {
			listener.exitFieldList(this);
		}
	}
}


/* istanbul ignore next */
export class FieldContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_field; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterField) {
			listener.enterField(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitField) {
			listener.exitField(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorOrContext extends ParserRuleContext {
	public OR(): TerminalNode { return this.getToken(TspParser.OR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorOr; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorOr) {
			listener.enterOperatorOr(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorOr) {
			listener.exitOperatorOr(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorAndContext extends ParserRuleContext {
	public AND(): TerminalNode { return this.getToken(TspParser.AND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorAnd; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorAnd) {
			listener.enterOperatorAnd(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorAnd) {
			listener.exitOperatorAnd(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorComparisonContext extends ParserRuleContext {
	public LT(): TerminalNode | undefined { return this.tryGetToken(TspParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(TspParser.GT, 0); }
	public NE(): TerminalNode | undefined { return this.tryGetToken(TspParser.NE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorComparison; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorComparison) {
			listener.enterOperatorComparison(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorComparison) {
			listener.exitOperatorComparison(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorBitwiseOrContext extends ParserRuleContext {
	public BIT_OR(): TerminalNode { return this.getToken(TspParser.BIT_OR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorBitwiseOr; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorBitwiseOr) {
			listener.enterOperatorBitwiseOr(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorBitwiseOr) {
			listener.exitOperatorBitwiseOr(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorBitwiseXorContext extends ParserRuleContext {
	public BIT_XOR(): TerminalNode { return this.getToken(TspParser.BIT_XOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorBitwiseXor; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorBitwiseXor) {
			listener.enterOperatorBitwiseXor(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorBitwiseXor) {
			listener.exitOperatorBitwiseXor(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorBitwiseAndContext extends ParserRuleContext {
	public BIT_AND(): TerminalNode { return this.getToken(TspParser.BIT_AND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorBitwiseAnd; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorBitwiseAnd) {
			listener.enterOperatorBitwiseAnd(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorBitwiseAnd) {
			listener.exitOperatorBitwiseAnd(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorBitwiseShiftContext extends ParserRuleContext {
	public BIT_LS(): TerminalNode | undefined { return this.tryGetToken(TspParser.BIT_LS, 0); }
	public BIT_RS(): TerminalNode | undefined { return this.tryGetToken(TspParser.BIT_RS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorBitwiseShift; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorBitwiseShift) {
			listener.enterOperatorBitwiseShift(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorBitwiseShift) {
			listener.exitOperatorBitwiseShift(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorStrcatContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorStrcat; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorStrcat) {
			listener.enterOperatorStrcat(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorStrcat) {
			listener.exitOperatorStrcat(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorAddSubContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorAddSub; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorAddSub) {
			listener.enterOperatorAddSub(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorAddSub) {
			listener.exitOperatorAddSub(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorMulDivContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorMulDiv; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorMulDiv) {
			listener.enterOperatorMulDiv(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorMulDiv) {
			listener.exitOperatorMulDiv(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorPowerContext extends ParserRuleContext {
	public POW(): TerminalNode { return this.getToken(TspParser.POW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorPower; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorPower) {
			listener.enterOperatorPower(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorPower) {
			listener.exitOperatorPower(this);
		}
	}
}


/* istanbul ignore next */
export class OperatorUnaryContext extends ParserRuleContext {
	public LOGICAL_NOT(): TerminalNode { return this.getToken(TspParser.LOGICAL_NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_operatorUnary; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterOperatorUnary) {
			listener.enterOperatorUnary(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitOperatorUnary) {
			listener.exitOperatorUnary(this);
		}
	}
}


/* istanbul ignore next */
export class NumberContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(TspParser.INT, 0); }
	public HEX(): TerminalNode | undefined { return this.tryGetToken(TspParser.HEX, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(TspParser.FLOAT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_number; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
}


/* istanbul ignore next */
export class StringContext extends ParserRuleContext {
	public NORMALSTRING(): TerminalNode | undefined { return this.tryGetToken(TspParser.NORMALSTRING, 0); }
	public CHARSTRING(): TerminalNode | undefined { return this.tryGetToken(TspParser.CHARSTRING, 0); }
	public LONGSTRING(): TerminalNode | undefined { return this.tryGetToken(TspParser.LONGSTRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspParser.RULE_string; }
	// @Override
	public enterRule(listener: TspListener): void {
		if (listener.enterString) {
			listener.enterString(this);
		}
	}
	// @Override
	public exitRule(listener: TspListener): void {
		if (listener.exitString) {
			listener.exitString(this);
		}
	}
}


