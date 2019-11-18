// Generated from ./TspDocParser.g4 by ANTLR 4.7.3-SNAPSHOT


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

import { TspDocListener } from "./TspDocListener.generated";

export class TspDocParser extends Parser {
	public static readonly OPEN = 1;
	public static readonly TAG_START = 2;
	public static readonly DEPRECATED_TAG = 3;
	public static readonly DESCRIPTION_TAG = 4;
	public static readonly PARAM_TAG = 5;
	public static readonly RETURNS_TAG = 6;
	public static readonly SEE_TAG = 7;
	public static readonly TSPLINK_TAG = 8;
	public static readonly TYPEDEF_TAG = 9;
	public static readonly FIELD_TAG = 10;
	public static readonly READONLY_TAG = 11;
	public static readonly WRITEONLY_TAG = 12;
	public static readonly TYPE_TAG = 13;
	public static readonly FW_TAG = 14;
	public static readonly TSPV1_TAG = 15;
	public static readonly TSPV2_TAG = 16;
	public static readonly V1_TAG = 17;
	public static readonly V2_TAG = 18;
	public static readonly LINK_TAG_START = 19;
	public static readonly BOOLEAN = 20;
	public static readonly NUMBER = 21;
	public static readonly STRING = 22;
	public static readonly FUNCTION = 23;
	public static readonly USERDATA = 24;
	public static readonly THREAD = 25;
	public static readonly TABLE = 26;
	public static readonly ENUM = 27;
	public static readonly ANY = 28;
	public static readonly CLOSE = 29;
	public static readonly CURLY_OPEN = 30;
	public static readonly CURLY_CLOSE = 31;
	public static readonly COMMA = 32;
	public static readonly DOT = 33;
	public static readonly EQUALS = 34;
	public static readonly FALSE = 35;
	public static readonly PAREN_OPEN = 36;
	public static readonly PAREN_CLOSE = 37;
	public static readonly SQUARE_OPEN = 38;
	public static readonly SQUARE_CLOSE = 39;
	public static readonly TRUE = 40;
	public static readonly LT = 41;
	public static readonly GTE = 42;
	public static readonly RETURN_ARROW = 43;
	public static readonly PIPE = 44;
	public static readonly OTHER = 45;
	public static readonly NIL = 46;
	public static readonly NAME = 47;
	public static readonly NORMALSTRING = 48;
	public static readonly CHARSTRING = 49;
	public static readonly INT = 50;
	public static readonly HEX = 51;
	public static readonly FLOAT = 52;
	public static readonly HORIZONTAL_WS = 53;
	public static readonly VERTICAL_WS = 54;
	public static readonly LINK_TAG_END = 55;
	public static readonly LINK_TAG_TARGET = 56;
	public static readonly LINK_TAG_DISPLAY = 57;
	public static readonly RULE_docstring = 0;
	public static readonly RULE_docblock = 1;
	public static readonly RULE_docDeprecated = 2;
	public static readonly RULE_docDescription = 3;
	public static readonly RULE_docContent = 4;
	public static readonly RULE_link = 5;
	public static readonly RULE_docParameter = 6;
	public static readonly RULE_typeDeclaration = 7;
	public static readonly RULE_typeEntry = 8;
	public static readonly RULE_typeUnion = 9;
	public static readonly RULE_type = 10;
	public static readonly RULE_typeList = 11;
	public static readonly RULE_nameDeclaration = 12;
	public static readonly RULE_docReturns = 13;
	public static readonly RULE_docReadonly = 14;
	public static readonly RULE_docWriteonly = 15;
	public static readonly RULE_docType = 16;
	public static readonly RULE_docTypedef = 17;
	public static readonly RULE_docField = 18;
	public static readonly RULE_docSee = 19;
	public static readonly RULE_seeTarget = 20;
	public static readonly RULE_docTsplink = 21;
	public static readonly RULE_docFirmware = 22;
	public static readonly RULE_docVersion = 23;
	public static readonly RULE_docValue = 24;
	public static readonly RULE_num = 25;
	public static readonly RULE_str = 26;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"docstring", "docblock", "docDeprecated", "docDescription", "docContent", 
		"link", "docParameter", "typeDeclaration", "typeEntry", "typeUnion", "type", 
		"typeList", "nameDeclaration", "docReturns", "docReadonly", "docWriteonly", 
		"docType", "docTypedef", "docField", "docSee", "seeTarget", "docTsplink", 
		"docFirmware", "docVersion", "docValue", "num", "str",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'--[[['", "'@'", undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"'any'", "']]'", "'{'", undefined, "','", "'.'", "'='", "'false'", "'('", 
		"')'", "'['", "']'", "'true'", "'<'", "'>='", "'=>'", "'|'", undefined, 
		"'nil'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN", "TAG_START", "DEPRECATED_TAG", "DESCRIPTION_TAG", "PARAM_TAG", 
		"RETURNS_TAG", "SEE_TAG", "TSPLINK_TAG", "TYPEDEF_TAG", "FIELD_TAG", "READONLY_TAG", 
		"WRITEONLY_TAG", "TYPE_TAG", "FW_TAG", "TSPV1_TAG", "TSPV2_TAG", "V1_TAG", 
		"V2_TAG", "LINK_TAG_START", "BOOLEAN", "NUMBER", "STRING", "FUNCTION", 
		"USERDATA", "THREAD", "TABLE", "ENUM", "ANY", "CLOSE", "CURLY_OPEN", "CURLY_CLOSE", 
		"COMMA", "DOT", "EQUALS", "FALSE", "PAREN_OPEN", "PAREN_CLOSE", "SQUARE_OPEN", 
		"SQUARE_CLOSE", "TRUE", "LT", "GTE", "RETURN_ARROW", "PIPE", "OTHER", 
		"NIL", "NAME", "NORMALSTRING", "CHARSTRING", "INT", "HEX", "FLOAT", "HORIZONTAL_WS", 
		"VERTICAL_WS", "LINK_TAG_END", "LINK_TAG_TARGET", "LINK_TAG_DISPLAY",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(TspDocParser._LITERAL_NAMES, TspDocParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return TspDocParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "TspDocParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return TspDocParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return TspDocParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(TspDocParser._ATN, this);
	}
	// @RuleVersion(0)
	public docstring(): DocstringContext {
		let _localctx: DocstringContext = new DocstringContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, TspDocParser.RULE_docstring);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.match(TspDocParser.OPEN);
			this.state = 55;
			this.docblock();
			this.state = 56;
			this.match(TspDocParser.CLOSE);
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
	public docblock(): DocblockContext {
		let _localctx: DocblockContext = new DocblockContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, TspDocParser.RULE_docblock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 74;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspDocParser.OPEN) | (1 << TspDocParser.DEPRECATED_TAG) | (1 << TspDocParser.DESCRIPTION_TAG) | (1 << TspDocParser.PARAM_TAG) | (1 << TspDocParser.RETURNS_TAG) | (1 << TspDocParser.SEE_TAG) | (1 << TspDocParser.TSPLINK_TAG) | (1 << TspDocParser.TYPEDEF_TAG) | (1 << TspDocParser.FIELD_TAG) | (1 << TspDocParser.READONLY_TAG) | (1 << TspDocParser.WRITEONLY_TAG) | (1 << TspDocParser.TYPE_TAG) | (1 << TspDocParser.FW_TAG) | (1 << TspDocParser.TSPV1_TAG) | (1 << TspDocParser.TSPV2_TAG) | (1 << TspDocParser.V1_TAG) | (1 << TspDocParser.V2_TAG) | (1 << TspDocParser.LINK_TAG_START) | (1 << TspDocParser.BOOLEAN) | (1 << TspDocParser.NUMBER) | (1 << TspDocParser.STRING) | (1 << TspDocParser.FUNCTION) | (1 << TspDocParser.USERDATA) | (1 << TspDocParser.THREAD) | (1 << TspDocParser.TABLE) | (1 << TspDocParser.ENUM) | (1 << TspDocParser.ANY) | (1 << TspDocParser.CURLY_OPEN) | (1 << TspDocParser.CURLY_CLOSE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (TspDocParser.COMMA - 32)) | (1 << (TspDocParser.DOT - 32)) | (1 << (TspDocParser.EQUALS - 32)) | (1 << (TspDocParser.FALSE - 32)) | (1 << (TspDocParser.PAREN_OPEN - 32)) | (1 << (TspDocParser.PAREN_CLOSE - 32)) | (1 << (TspDocParser.SQUARE_OPEN - 32)) | (1 << (TspDocParser.SQUARE_CLOSE - 32)) | (1 << (TspDocParser.TRUE - 32)) | (1 << (TspDocParser.LT - 32)) | (1 << (TspDocParser.GTE - 32)) | (1 << (TspDocParser.RETURN_ARROW - 32)) | (1 << (TspDocParser.PIPE - 32)) | (1 << (TspDocParser.OTHER - 32)) | (1 << (TspDocParser.NIL - 32)) | (1 << (TspDocParser.NAME - 32)) | (1 << (TspDocParser.NORMALSTRING - 32)) | (1 << (TspDocParser.CHARSTRING - 32)) | (1 << (TspDocParser.INT - 32)) | (1 << (TspDocParser.HEX - 32)) | (1 << (TspDocParser.FLOAT - 32)) | (1 << (TspDocParser.HORIZONTAL_WS - 32)) | (1 << (TspDocParser.VERTICAL_WS - 32)) | (1 << (TspDocParser.LINK_TAG_END - 32)) | (1 << (TspDocParser.LINK_TAG_TARGET - 32)) | (1 << (TspDocParser.LINK_TAG_DISPLAY - 32)))) !== 0)) {
				{
				this.state = 72;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
				case 1:
					{
					this.state = 58;
					this.docDeprecated();
					}
					break;

				case 2:
					{
					this.state = 59;
					this.docDescription();
					}
					break;

				case 3:
					{
					this.state = 60;
					this.docParameter();
					}
					break;

				case 4:
					{
					this.state = 61;
					this.docReturns();
					}
					break;

				case 5:
					{
					this.state = 62;
					this.docReadonly();
					}
					break;

				case 6:
					{
					this.state = 63;
					this.docWriteonly();
					}
					break;

				case 7:
					{
					this.state = 64;
					this.docType();
					}
					break;

				case 8:
					{
					this.state = 65;
					this.docTypedef();
					}
					break;

				case 9:
					{
					this.state = 66;
					this.docField();
					}
					break;

				case 10:
					{
					this.state = 67;
					this.docSee();
					}
					break;

				case 11:
					{
					this.state = 68;
					this.docTsplink();
					}
					break;

				case 12:
					{
					this.state = 69;
					this.docFirmware();
					}
					break;

				case 13:
					{
					this.state = 70;
					this.docVersion();
					}
					break;

				case 14:
					{
					this.state = 71;
					this.docContent();
					}
					break;
				}
				}
				this.state = 76;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
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
	public docDeprecated(): DocDeprecatedContext {
		let _localctx: DocDeprecatedContext = new DocDeprecatedContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, TspDocParser.RULE_docDeprecated);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 77;
			this.match(TspDocParser.DEPRECATED_TAG);
			this.state = 79;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 78;
				this.docContent();
				}
				break;
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
	public docDescription(): DocDescriptionContext {
		let _localctx: DocDescriptionContext = new DocDescriptionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, TspDocParser.RULE_docDescription);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 81;
			this.match(TspDocParser.DESCRIPTION_TAG);
			this.state = 83;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 82;
				this.docContent();
				}
				break;
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
	public docContent(): DocContentContext {
		let _localctx: DocContentContext = new DocContentContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, TspDocParser.RULE_docContent);
		let _la: number;
		try {
			this.state = 89;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 85;
				this.link();
				this.state = 86;
				this.docContent();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 88;
				_la = this._input.LA(1);
				if (_la <= 0 || (_la === TspDocParser.TAG_START || _la === TspDocParser.CLOSE)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
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
	public link(): LinkContext {
		let _localctx: LinkContext = new LinkContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, TspDocParser.RULE_link);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 91;
			this.match(TspDocParser.LINK_TAG_START);
			this.state = 92;
			this.match(TspDocParser.LINK_TAG_TARGET);
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.LINK_TAG_DISPLAY) {
				{
				this.state = 93;
				this.match(TspDocParser.LINK_TAG_DISPLAY);
				}
			}

			this.state = 96;
			this.match(TspDocParser.LINK_TAG_END);
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
	public docParameter(): DocParameterContext {
		let _localctx: DocParameterContext = new DocParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, TspDocParser.RULE_docParameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 98;
			this.match(TspDocParser.PARAM_TAG);
			this.state = 100;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 99;
				this.typeDeclaration();
				}
			}

			this.state = 102;
			this.nameDeclaration();
			this.state = 104;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 103;
				this.docContent();
				}
				break;
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
	public typeDeclaration(): TypeDeclarationContext {
		let _localctx: TypeDeclarationContext = new TypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, TspDocParser.RULE_typeDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 106;
			this.match(TspDocParser.CURLY_OPEN);
			this.state = 107;
			this.typeEntry();
			this.state = 108;
			this.match(TspDocParser.CURLY_CLOSE);
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
	public typeEntry(): TypeEntryContext {
		let _localctx: TypeEntryContext = new TypeEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, TspDocParser.RULE_typeEntry);
		try {
			this.state = 112;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 110;
				this.type();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 111;
				this.typeUnion();
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
	public typeUnion(): TypeUnionContext {
		let _localctx: TypeUnionContext = new TypeUnionContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, TspDocParser.RULE_typeUnion);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 114;
			this.type();
			this.state = 115;
			this.match(TspDocParser.PIPE);
			this.state = 122;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 117;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 116;
						this.typeUnion();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 119;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 2:
				{
				this.state = 121;
				this.type();
				}
				break;
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
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, TspDocParser.RULE_type);
		let _la: number;
		try {
			this.state = 147;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NIL:
				_localctx = new NilTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 124;
				this.match(TspDocParser.NIL);
				}
				break;
			case TspDocParser.BOOLEAN:
				_localctx = new BooleanTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 125;
				this.match(TspDocParser.BOOLEAN);
				}
				break;
			case TspDocParser.NUMBER:
				_localctx = new NumberTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 126;
				this.match(TspDocParser.NUMBER);
				}
				break;
			case TspDocParser.STRING:
				_localctx = new StringTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 127;
				this.match(TspDocParser.STRING);
				}
				break;
			case TspDocParser.FUNCTION:
				_localctx = new FunctionTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 128;
				this.match(TspDocParser.FUNCTION);
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.PAREN_OPEN) {
					{
					this.state = 129;
					this.match(TspDocParser.PAREN_OPEN);
					this.state = 133;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & ((1 << (TspDocParser.BOOLEAN - 20)) | (1 << (TspDocParser.NUMBER - 20)) | (1 << (TspDocParser.STRING - 20)) | (1 << (TspDocParser.FUNCTION - 20)) | (1 << (TspDocParser.USERDATA - 20)) | (1 << (TspDocParser.THREAD - 20)) | (1 << (TspDocParser.TABLE - 20)) | (1 << (TspDocParser.ENUM - 20)) | (1 << (TspDocParser.ANY - 20)) | (1 << (TspDocParser.NIL - 20)) | (1 << (TspDocParser.NAME - 20)))) !== 0)) {
						{
						{
						this.state = 130;
						this.typeList();
						}
						}
						this.state = 135;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 136;
					this.match(TspDocParser.PAREN_CLOSE);
					this.state = 137;
					this.match(TspDocParser.RETURN_ARROW);
					this.state = 138;
					this.typeEntry();
					}
				}

				}
				break;
			case TspDocParser.USERDATA:
				_localctx = new UserdataTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 141;
				this.match(TspDocParser.USERDATA);
				}
				break;
			case TspDocParser.THREAD:
				_localctx = new ThreadTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 142;
				this.match(TspDocParser.THREAD);
				}
				break;
			case TspDocParser.TABLE:
				_localctx = new TableTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 143;
				this.match(TspDocParser.TABLE);
				}
				break;
			case TspDocParser.ENUM:
				_localctx = new EnumTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 144;
				this.match(TspDocParser.ENUM);
				}
				break;
			case TspDocParser.ANY:
				_localctx = new AnyTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 145;
				this.match(TspDocParser.ANY);
				}
				break;
			case TspDocParser.NAME:
				_localctx = new NameTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 146;
				this.match(TspDocParser.NAME);
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
	public typeList(): TypeListContext {
		let _localctx: TypeListContext = new TypeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, TspDocParser.RULE_typeList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.type();
			this.state = 150;
			this.match(TspDocParser.COMMA);
			this.state = 157;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				{
				this.state = 152;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 151;
						this.typeList();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 154;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 2:
				{
				this.state = 156;
				this.type();
				}
				break;
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
	public nameDeclaration(): NameDeclarationContext {
		let _localctx: NameDeclarationContext = new NameDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, TspDocParser.RULE_nameDeclaration);
		let _la: number;
		try {
			this.state = 167;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NAME:
				_localctx = new NameRequiredContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 159;
				this.match(TspDocParser.NAME);
				}
				break;
			case TspDocParser.SQUARE_OPEN:
				_localctx = new NameOptionalContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 160;
				this.match(TspDocParser.SQUARE_OPEN);
				this.state = 161;
				this.match(TspDocParser.NAME);
				this.state = 164;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.EQUALS) {
					{
					this.state = 162;
					this.match(TspDocParser.EQUALS);
					this.state = 163;
					this.docValue();
					}
				}

				this.state = 166;
				this.match(TspDocParser.SQUARE_CLOSE);
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
	public docReturns(): DocReturnsContext {
		let _localctx: DocReturnsContext = new DocReturnsContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, TspDocParser.RULE_docReturns);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 169;
			this.match(TspDocParser.RETURNS_TAG);
			this.state = 177;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 170;
				this.match(TspDocParser.CURLY_OPEN);
				this.state = 173;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
				case 1:
					{
					this.state = 171;
					this.typeEntry();
					}
					break;

				case 2:
					{
					this.state = 172;
					this.typeList();
					}
					break;
				}
				this.state = 175;
				this.match(TspDocParser.CURLY_CLOSE);
				}
				break;
			}
			this.state = 179;
			this.docContent();
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
	public docReadonly(): DocReadonlyContext {
		let _localctx: DocReadonlyContext = new DocReadonlyContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, TspDocParser.RULE_docReadonly);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 181;
			this.match(TspDocParser.READONLY_TAG);
			this.state = 183;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				{
				this.state = 182;
				this.docContent();
				}
				break;
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
	public docWriteonly(): DocWriteonlyContext {
		let _localctx: DocWriteonlyContext = new DocWriteonlyContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, TspDocParser.RULE_docWriteonly);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 185;
			this.match(TspDocParser.WRITEONLY_TAG);
			this.state = 187;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 186;
				this.docContent();
				}
				break;
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
	public docType(): DocTypeContext {
		let _localctx: DocTypeContext = new DocTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, TspDocParser.RULE_docType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 189;
			this.match(TspDocParser.TYPE_TAG);
			this.state = 190;
			this.typeDeclaration();
			this.state = 192;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 191;
				this.docContent();
				}
				break;
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
	public docTypedef(): DocTypedefContext {
		let _localctx: DocTypedefContext = new DocTypedefContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, TspDocParser.RULE_docTypedef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 194;
			this.match(TspDocParser.TYPEDEF_TAG);
			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 195;
				this.typeDeclaration();
				}
			}

			this.state = 198;
			this.match(TspDocParser.NAME);
			this.state = 200;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 199;
				this.docContent();
				}
				break;
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
	public docField(): DocFieldContext {
		let _localctx: DocFieldContext = new DocFieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, TspDocParser.RULE_docField);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 202;
			this.match(TspDocParser.FIELD_TAG);
			this.state = 204;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 203;
				this.typeDeclaration();
				}
			}

			this.state = 206;
			this.nameDeclaration();
			this.state = 208;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				{
				this.state = 207;
				this.docContent();
				}
				break;
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
	public docSee(): DocSeeContext {
		let _localctx: DocSeeContext = new DocSeeContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, TspDocParser.RULE_docSee);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 210;
			this.match(TspDocParser.SEE_TAG);
			this.state = 211;
			this.seeTarget();
			this.state = 213;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				{
				this.state = 212;
				this.docContent();
				}
				break;
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
	public seeTarget(): SeeTargetContext {
		let _localctx: SeeTargetContext = new SeeTargetContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, TspDocParser.RULE_seeTarget);
		try {
			let _alt: number;
			this.state = 224;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NAME:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 215;
				this.match(TspDocParser.NAME);
				this.state = 220;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 216;
						this.match(TspDocParser.DOT);
						this.state = 217;
						this.match(TspDocParser.NAME);
						}
						}
					}
					this.state = 222;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
				}
				}
				break;
			case TspDocParser.LINK_TAG_START:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 223;
				this.link();
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
	public docTsplink(): DocTsplinkContext {
		let _localctx: DocTsplinkContext = new DocTsplinkContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, TspDocParser.RULE_docTsplink);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 226;
			this.match(TspDocParser.TSPLINK_TAG);
			this.state = 228;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 227;
				this.docContent();
				}
				break;
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
	public docFirmware(): DocFirmwareContext {
		let _localctx: DocFirmwareContext = new DocFirmwareContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, TspDocParser.RULE_docFirmware);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 234;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.LT:
				{
				this.state = 230;
				this.match(TspDocParser.LT);
				}
				break;
			case TspDocParser.GTE:
				{
				this.state = 231;
				this.match(TspDocParser.GTE);
				}
				break;
			case TspDocParser.EQUALS:
				{
				this.state = 232;
				this.match(TspDocParser.EQUALS);
				this.state = 233;
				this.match(TspDocParser.EQUALS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 236;
			this.match(TspDocParser.INT);
			this.state = 237;
			this.match(TspDocParser.DOT);
			this.state = 238;
			this.match(TspDocParser.INT);
			this.state = 239;
			this.match(TspDocParser.DOT);
			this.state = 240;
			this.match(TspDocParser.INT);
			this.state = 242;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				this.state = 241;
				this.match(TspDocParser.COMMA);
				}
				break;
			}
			this.state = 245;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				{
				this.state = 244;
				this.docFirmware();
				}
				break;
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
	public docVersion(): DocVersionContext {
		let _localctx: DocVersionContext = new DocVersionContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, TspDocParser.RULE_docVersion);
		try {
			let _alt: number;
			this.state = 271;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.TSPV1_TAG:
				_localctx = new Version1Context(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 247;
				this.match(TspDocParser.TSPV1_TAG);
				this.state = 257;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
				case 1:
					{
					this.state = 248;
					this.match(TspDocParser.V2_TAG);
					this.state = 249;
					this.match(TspDocParser.NAME);
					this.state = 254;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 250;
							this.match(TspDocParser.DOT);
							this.state = 251;
							this.match(TspDocParser.NAME);
							}
							}
						}
						this.state = 256;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
					}
					}
					break;
				}
				}
				break;
			case TspDocParser.TSPV2_TAG:
				_localctx = new Version2Context(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 259;
				this.match(TspDocParser.TSPV2_TAG);
				this.state = 269;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
				case 1:
					{
					this.state = 260;
					this.match(TspDocParser.V1_TAG);
					this.state = 261;
					this.match(TspDocParser.NAME);
					this.state = 266;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 36, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 262;
							this.match(TspDocParser.DOT);
							this.state = 263;
							this.match(TspDocParser.NAME);
							}
							}
						}
						this.state = 268;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 36, this._ctx);
					}
					}
					break;
				}
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
	public docValue(): DocValueContext {
		let _localctx: DocValueContext = new DocValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, TspDocParser.RULE_docValue);
		try {
			this.state = 279;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NIL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 273;
				this.match(TspDocParser.NIL);
				}
				break;
			case TspDocParser.TRUE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 274;
				this.match(TspDocParser.TRUE);
				}
				break;
			case TspDocParser.FALSE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 275;
				this.match(TspDocParser.FALSE);
				}
				break;
			case TspDocParser.INT:
			case TspDocParser.HEX:
			case TspDocParser.FLOAT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 276;
				this.num();
				}
				break;
			case TspDocParser.NORMALSTRING:
			case TspDocParser.CHARSTRING:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 277;
				this.str();
				}
				break;
			case TspDocParser.NAME:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 278;
				this.match(TspDocParser.NAME);
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
	public num(): NumContext {
		let _localctx: NumContext = new NumContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, TspDocParser.RULE_num);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 281;
			_la = this._input.LA(1);
			if (!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (TspDocParser.INT - 50)) | (1 << (TspDocParser.HEX - 50)) | (1 << (TspDocParser.FLOAT - 50)))) !== 0))) {
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
	public str(): StrContext {
		let _localctx: StrContext = new StrContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, TspDocParser.RULE_str);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 283;
			_la = this._input.LA(1);
			if (!(_la === TspDocParser.NORMALSTRING || _la === TspDocParser.CHARSTRING)) {
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03;\u0120\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07" +
		"\x03K\n\x03\f\x03\x0E\x03N\v\x03\x03\x04\x03\x04\x05\x04R\n\x04\x03\x05" +
		"\x03\x05\x05\x05V\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\\\n\x06" +
		"\x03\x07\x03\x07\x03\x07\x05\x07a\n\x07\x03\x07\x03\x07\x03\b\x03\b\x05" +
		"\bg\n\b\x03\b\x03\b\x05\bk\n\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x05" +
		"\ns\n\n\x03\v\x03\v\x03\v\x06\vx\n\v\r\v\x0E\vy\x03\v\x05\v}\n\v\x03\f" +
		"\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f\x86\n\f\f\f\x0E\f\x89\v\f\x03" +
		"\f\x03\f\x03\f\x05\f\x8E\n\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f" +
		"\x96\n\f\x03\r\x03\r\x03\r\x06\r\x9B\n\r\r\r\x0E\r\x9C\x03\r\x05\r\xA0" +
		"\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xA7\n\x0E\x03\x0E" +
		"\x05\x0E\xAA\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xB0\n\x0F\x03" +
		"\x0F\x03\x0F\x05\x0F\xB4\n\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x05\x10" +
		"\xBA\n\x10\x03\x11\x03\x11\x05\x11\xBE\n\x11\x03\x12\x03\x12\x03\x12\x05" +
		"\x12\xC3\n\x12\x03\x13\x03\x13\x05\x13\xC7\n\x13\x03\x13\x03\x13\x05\x13" +
		"\xCB\n\x13\x03\x14\x03\x14\x05\x14\xCF\n\x14\x03\x14\x03\x14\x05\x14\xD3" +
		"\n\x14\x03\x15\x03\x15\x03\x15\x05\x15\xD8\n\x15\x03\x16\x03\x16\x03\x16" +
		"\x07\x16\xDD\n\x16\f\x16\x0E\x16\xE0\v\x16\x03\x16\x05\x16\xE3\n\x16\x03" +
		"\x17\x03\x17\x05\x17\xE7\n\x17\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18" +
		"\xED\n\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x05\x18\xF5" +
		"\n\x18\x03\x18\x05\x18\xF8\n\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19" +
		"\x07\x19\xFF\n\x19\f\x19\x0E\x19\u0102\v\x19\x05\x19\u0104\n\x19\x03\x19" +
		"\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\u010B\n\x19\f\x19\x0E\x19\u010E" +
		"\v\x19\x05\x19\u0110\n\x19\x05\x19\u0112\n\x19\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u011A\n\x1A\x03\x1B\x03\x1B\x03\x1C\x03" +
		"\x1C\x03\x1C\x02\x02\x02\x1D\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
		" \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x02\x02\x05" +
		"\x04\x02\x04\x04\x1F\x1F\x03\x0246\x03\x0223\x02\u0146\x028\x03\x02\x02" +
		"\x02\x04L\x03\x02\x02\x02\x06O\x03\x02\x02\x02\bS\x03\x02\x02\x02\n[\x03" +
		"\x02\x02\x02\f]\x03\x02\x02\x02\x0Ed\x03\x02\x02\x02\x10l\x03\x02\x02" +
		"\x02\x12r\x03\x02\x02\x02\x14t\x03\x02\x02\x02\x16\x95\x03\x02\x02\x02" +
		"\x18\x97\x03\x02\x02\x02\x1A\xA9\x03\x02\x02\x02\x1C\xAB\x03\x02\x02\x02" +
		"\x1E\xB7\x03\x02\x02\x02 \xBB\x03\x02\x02\x02\"\xBF\x03\x02\x02\x02$\xC4" +
		"\x03\x02\x02\x02&\xCC\x03\x02\x02\x02(\xD4\x03\x02\x02\x02*\xE2\x03\x02" +
		"\x02\x02,\xE4\x03\x02\x02\x02.\xEC\x03\x02\x02\x020\u0111\x03\x02\x02" +
		"\x022\u0119\x03\x02\x02\x024\u011B\x03\x02\x02\x026\u011D\x03\x02\x02" +
		"\x0289\x07\x03\x02\x029:\x05\x04\x03\x02:;\x07\x1F\x02\x02;\x03\x03\x02" +
		"\x02\x02<K\x05\x06\x04\x02=K\x05\b\x05\x02>K\x05\x0E\b\x02?K\x05\x1C\x0F" +
		"\x02@K\x05\x1E\x10\x02AK\x05 \x11\x02BK\x05\"\x12\x02CK\x05$\x13\x02D" +
		"K\x05&\x14\x02EK\x05(\x15\x02FK\x05,\x17\x02GK\x05.\x18\x02HK\x050\x19" +
		"\x02IK\x05\n\x06\x02J<\x03\x02\x02\x02J=\x03\x02\x02\x02J>\x03\x02\x02" +
		"\x02J?\x03\x02\x02\x02J@\x03\x02\x02\x02JA\x03\x02\x02\x02JB\x03\x02\x02" +
		"\x02JC\x03\x02\x02\x02JD\x03\x02\x02\x02JE\x03\x02\x02\x02JF\x03\x02\x02" +
		"\x02JG\x03\x02\x02\x02JH\x03\x02\x02\x02JI\x03\x02\x02\x02KN\x03\x02\x02" +
		"\x02LJ\x03\x02\x02\x02LM\x03\x02\x02\x02M\x05\x03\x02\x02\x02NL\x03\x02" +
		"\x02\x02OQ\x07\x05\x02\x02PR\x05\n\x06\x02QP\x03\x02\x02\x02QR\x03\x02" +
		"\x02\x02R\x07\x03\x02\x02\x02SU\x07\x06\x02\x02TV\x05\n\x06\x02UT\x03" +
		"\x02\x02\x02UV\x03\x02\x02\x02V\t\x03\x02\x02\x02WX\x05\f\x07\x02XY\x05" +
		"\n\x06\x02Y\\\x03\x02\x02\x02Z\\\n\x02\x02\x02[W\x03\x02\x02\x02[Z\x03" +
		"\x02\x02\x02\\\v\x03\x02\x02\x02]^\x07\x15\x02\x02^`\x07:\x02\x02_a\x07" +
		";\x02\x02`_\x03\x02\x02\x02`a\x03\x02\x02\x02ab\x03\x02\x02\x02bc\x07" +
		"9\x02\x02c\r\x03\x02\x02\x02df\x07\x07\x02\x02eg\x05\x10\t\x02fe\x03\x02" +
		"\x02\x02fg\x03\x02\x02\x02gh\x03\x02\x02\x02hj\x05\x1A\x0E\x02ik\x05\n" +
		"\x06\x02ji\x03\x02\x02\x02jk\x03\x02\x02\x02k\x0F\x03\x02\x02\x02lm\x07" +
		" \x02\x02mn\x05\x12\n\x02no\x07!\x02\x02o\x11\x03\x02\x02\x02ps\x05\x16" +
		"\f\x02qs\x05\x14\v\x02rp\x03\x02\x02\x02rq\x03\x02\x02\x02s\x13\x03\x02" +
		"\x02\x02tu\x05\x16\f\x02u|\x07.\x02\x02vx\x05\x14\v\x02wv\x03\x02\x02" +
		"\x02xy\x03\x02\x02\x02yw\x03\x02\x02\x02yz\x03\x02\x02\x02z}\x03\x02\x02" +
		"\x02{}\x05\x16\f\x02|w\x03\x02\x02\x02|{\x03\x02\x02\x02}\x15\x03\x02" +
		"\x02\x02~\x96\x070\x02\x02\x7F\x96\x07\x16\x02\x02\x80\x96\x07\x17\x02" +
		"\x02\x81\x96\x07\x18\x02\x02\x82\x8D\x07\x19\x02\x02\x83\x87\x07&\x02" +
		"\x02\x84\x86\x05\x18\r\x02\x85\x84\x03\x02\x02\x02\x86\x89\x03\x02\x02" +
		"\x02\x87\x85\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x8A\x03\x02\x02" +
		"\x02\x89\x87\x03\x02\x02\x02\x8A\x8B\x07\'\x02\x02\x8B\x8C\x07-\x02\x02" +
		"\x8C\x8E\x05\x12\n\x02\x8D\x83\x03\x02\x02\x02\x8D\x8E\x03\x02\x02\x02" +
		"\x8E\x96\x03\x02\x02\x02\x8F\x96\x07\x1A\x02\x02\x90\x96\x07\x1B\x02\x02" +
		"\x91\x96\x07\x1C\x02\x02\x92\x96\x07\x1D\x02\x02\x93\x96\x07\x1E\x02\x02" +
		"\x94\x96\x071\x02\x02\x95~\x03\x02\x02\x02\x95\x7F\x03\x02\x02\x02\x95" +
		"\x80\x03\x02\x02\x02\x95\x81\x03\x02\x02\x02\x95\x82\x03\x02\x02\x02\x95" +
		"\x8F\x03\x02\x02\x02\x95\x90\x03\x02\x02\x02\x95\x91\x03\x02\x02\x02\x95" +
		"\x92\x03\x02\x02\x02\x95\x93\x03\x02\x02\x02\x95\x94\x03\x02\x02\x02\x96" +
		"\x17\x03\x02\x02\x02\x97\x98\x05\x16\f\x02\x98\x9F\x07\"\x02\x02\x99\x9B" +
		"\x05\x18\r\x02\x9A\x99\x03\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9A" +
		"\x03\x02\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\xA0\x03\x02\x02\x02\x9E\xA0" +
		"\x05\x16\f\x02\x9F\x9A\x03\x02\x02\x02\x9F\x9E\x03\x02\x02\x02\xA0\x19" +
		"\x03\x02\x02\x02\xA1\xAA\x071\x02\x02\xA2\xA3\x07(\x02\x02\xA3\xA6\x07" +
		"1\x02\x02\xA4\xA5\x07$\x02\x02\xA5\xA7\x052\x1A\x02\xA6\xA4\x03\x02\x02" +
		"\x02\xA6\xA7\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA8\xAA\x07)\x02" +
		"\x02\xA9\xA1\x03\x02\x02\x02\xA9\xA2\x03\x02\x02\x02\xAA\x1B\x03\x02\x02" +
		"\x02\xAB\xB3\x07\b\x02\x02\xAC\xAF\x07 \x02\x02\xAD\xB0\x05\x12\n\x02" +
		"\xAE\xB0\x05\x18\r\x02\xAF\xAD\x03\x02\x02\x02\xAF\xAE\x03\x02\x02\x02" +
		"\xB0\xB1\x03\x02\x02\x02\xB1\xB2\x07!\x02\x02\xB2\xB4\x03\x02\x02\x02" +
		"\xB3\xAC\x03\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02" +
		"\xB5\xB6\x05\n\x06\x02\xB6\x1D\x03\x02\x02\x02\xB7\xB9\x07\r\x02\x02\xB8" +
		"\xBA\x05\n\x06\x02\xB9\xB8\x03\x02\x02\x02\xB9\xBA\x03\x02\x02\x02\xBA" +
		"\x1F\x03\x02\x02\x02\xBB\xBD\x07\x0E\x02\x02\xBC\xBE\x05\n\x06\x02\xBD" +
		"\xBC\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE!\x03\x02\x02\x02\xBF" +
		"\xC0\x07\x0F\x02\x02\xC0\xC2\x05\x10\t\x02\xC1\xC3\x05\n\x06\x02\xC2\xC1" +
		"\x03\x02\x02\x02\xC2\xC3\x03\x02\x02\x02\xC3#\x03\x02\x02\x02\xC4\xC6" +
		"\x07\v\x02\x02\xC5\xC7\x05\x10\t\x02\xC6\xC5\x03\x02\x02\x02\xC6\xC7\x03" +
		"\x02\x02\x02\xC7\xC8\x03\x02\x02\x02\xC8\xCA\x071\x02\x02\xC9\xCB\x05" +
		"\n\x06\x02\xCA\xC9\x03\x02\x02\x02\xCA\xCB\x03\x02\x02\x02\xCB%\x03\x02" +
		"\x02\x02\xCC\xCE\x07\f\x02\x02\xCD\xCF\x05\x10\t\x02\xCE\xCD\x03\x02\x02" +
		"\x02\xCE\xCF\x03\x02\x02\x02\xCF\xD0\x03\x02\x02\x02\xD0\xD2\x05\x1A\x0E" +
		"\x02\xD1\xD3\x05\n\x06\x02\xD2\xD1\x03\x02\x02\x02\xD2\xD3\x03\x02\x02" +
		"\x02\xD3\'\x03\x02\x02\x02\xD4\xD5\x07\t\x02\x02\xD5\xD7\x05*\x16\x02" +
		"\xD6\xD8\x05\n\x06\x02\xD7\xD6\x03\x02\x02\x02\xD7\xD8\x03\x02\x02\x02" +
		"\xD8)\x03\x02\x02\x02\xD9\xDE\x071\x02\x02\xDA\xDB\x07#\x02\x02\xDB\xDD" +
		"\x071\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD\xE0\x03\x02\x02\x02\xDE\xDC" +
		"\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\xE3\x03\x02\x02\x02\xE0\xDE" +
		"\x03\x02\x02\x02\xE1\xE3\x05\f\x07\x02\xE2\xD9\x03\x02\x02\x02\xE2\xE1" +
		"\x03\x02\x02\x02\xE3+\x03\x02\x02\x02\xE4\xE6\x07\n\x02\x02\xE5\xE7\x05" +
		"\n\x06\x02\xE6\xE5\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7-\x03\x02" +
		"\x02\x02\xE8\xED\x07+\x02\x02\xE9\xED\x07,\x02\x02\xEA\xEB\x07$\x02\x02" +
		"\xEB\xED\x07$\x02\x02\xEC\xE8\x03\x02\x02\x02\xEC\xE9\x03\x02\x02\x02" +
		"\xEC\xEA\x03\x02\x02\x02\xED\xEE\x03\x02\x02\x02\xEE\xEF\x074\x02\x02" +
		"\xEF\xF0\x07#\x02\x02\xF0\xF1\x074\x02\x02\xF1\xF2\x07#\x02\x02\xF2\xF4" +
		"\x074\x02\x02\xF3\xF5\x07\"\x02\x02\xF4\xF3\x03\x02\x02\x02\xF4\xF5\x03" +
		"\x02\x02\x02\xF5\xF7\x03\x02\x02\x02\xF6\xF8\x05.\x18\x02\xF7\xF6\x03" +
		"\x02\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8/\x03\x02\x02\x02\xF9\u0103\x07" +
		"\x11\x02\x02\xFA\xFB\x07\x14\x02\x02\xFB\u0100\x071\x02\x02\xFC\xFD\x07" +
		"#\x02\x02\xFD\xFF\x071\x02\x02\xFE\xFC\x03\x02\x02\x02\xFF\u0102\x03\x02" +
		"\x02\x02\u0100\xFE\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0104" +
		"\x03\x02\x02\x02\u0102\u0100\x03\x02\x02\x02\u0103\xFA\x03\x02\x02\x02" +
		"\u0103\u0104\x03\x02\x02\x02\u0104\u0112\x03\x02\x02\x02\u0105\u010F\x07" +
		"\x12\x02\x02\u0106\u0107\x07\x13\x02\x02\u0107\u010C\x071\x02\x02\u0108" +
		"\u0109\x07#\x02\x02\u0109\u010B\x071\x02\x02\u010A\u0108\x03\x02\x02\x02" +
		"\u010B\u010E\x03\x02\x02\x02\u010C\u010A\x03\x02\x02\x02\u010C\u010D\x03" +
		"\x02\x02\x02\u010D\u0110\x03\x02\x02\x02\u010E\u010C\x03\x02\x02\x02\u010F" +
		"\u0106\x03\x02\x02\x02\u010F\u0110\x03\x02\x02\x02\u0110\u0112\x03\x02" +
		"\x02\x02\u0111\xF9\x03\x02\x02\x02\u0111\u0105\x03\x02\x02\x02\u01121" +
		"\x03\x02\x02\x02\u0113\u011A\x070\x02\x02\u0114\u011A\x07*\x02\x02\u0115" +
		"\u011A\x07%\x02\x02\u0116\u011A\x054\x1B\x02\u0117\u011A\x056\x1C\x02" +
		"\u0118\u011A\x071\x02\x02\u0119\u0113\x03\x02\x02\x02\u0119\u0114\x03" +
		"\x02\x02\x02\u0119\u0115\x03\x02\x02\x02\u0119\u0116\x03\x02\x02\x02\u0119" +
		"\u0117\x03\x02\x02\x02\u0119\u0118\x03\x02\x02\x02\u011A3\x03\x02\x02" +
		"\x02\u011B\u011C\t\x03\x02\x02\u011C5\x03\x02\x02\x02\u011D\u011E\t\x04" +
		"\x02\x02\u011E7\x03\x02\x02\x02*JLQU[`fjry|\x87\x8D\x95\x9C\x9F\xA6\xA9" +
		"\xAF\xB3\xB9\xBD\xC2\xC6\xCA\xCE\xD2\xD7\xDE\xE2\xE6\xEC\xF4\xF7\u0100" +
		"\u0103\u010C\u010F\u0111\u0119";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TspDocParser.__ATN) {
			TspDocParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(TspDocParser._serializedATN));
		}

		return TspDocParser.__ATN;
	}

}

export class DocstringContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(TspDocParser.OPEN, 0); }
	public docblock(): DocblockContext {
		return this.getRuleContext(0, DocblockContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(TspDocParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docstring; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocstring) {
			listener.enterDocstring(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocstring) {
			listener.exitDocstring(this);
		}
	}
}


export class DocblockContext extends ParserRuleContext {
	public docDeprecated(): DocDeprecatedContext[];
	public docDeprecated(i: number): DocDeprecatedContext;
	public docDeprecated(i?: number): DocDeprecatedContext | DocDeprecatedContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocDeprecatedContext);
		} else {
			return this.getRuleContext(i, DocDeprecatedContext);
		}
	}
	public docDescription(): DocDescriptionContext[];
	public docDescription(i: number): DocDescriptionContext;
	public docDescription(i?: number): DocDescriptionContext | DocDescriptionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocDescriptionContext);
		} else {
			return this.getRuleContext(i, DocDescriptionContext);
		}
	}
	public docParameter(): DocParameterContext[];
	public docParameter(i: number): DocParameterContext;
	public docParameter(i?: number): DocParameterContext | DocParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocParameterContext);
		} else {
			return this.getRuleContext(i, DocParameterContext);
		}
	}
	public docReturns(): DocReturnsContext[];
	public docReturns(i: number): DocReturnsContext;
	public docReturns(i?: number): DocReturnsContext | DocReturnsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocReturnsContext);
		} else {
			return this.getRuleContext(i, DocReturnsContext);
		}
	}
	public docReadonly(): DocReadonlyContext[];
	public docReadonly(i: number): DocReadonlyContext;
	public docReadonly(i?: number): DocReadonlyContext | DocReadonlyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocReadonlyContext);
		} else {
			return this.getRuleContext(i, DocReadonlyContext);
		}
	}
	public docWriteonly(): DocWriteonlyContext[];
	public docWriteonly(i: number): DocWriteonlyContext;
	public docWriteonly(i?: number): DocWriteonlyContext | DocWriteonlyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocWriteonlyContext);
		} else {
			return this.getRuleContext(i, DocWriteonlyContext);
		}
	}
	public docType(): DocTypeContext[];
	public docType(i: number): DocTypeContext;
	public docType(i?: number): DocTypeContext | DocTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocTypeContext);
		} else {
			return this.getRuleContext(i, DocTypeContext);
		}
	}
	public docTypedef(): DocTypedefContext[];
	public docTypedef(i: number): DocTypedefContext;
	public docTypedef(i?: number): DocTypedefContext | DocTypedefContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocTypedefContext);
		} else {
			return this.getRuleContext(i, DocTypedefContext);
		}
	}
	public docField(): DocFieldContext[];
	public docField(i: number): DocFieldContext;
	public docField(i?: number): DocFieldContext | DocFieldContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocFieldContext);
		} else {
			return this.getRuleContext(i, DocFieldContext);
		}
	}
	public docSee(): DocSeeContext[];
	public docSee(i: number): DocSeeContext;
	public docSee(i?: number): DocSeeContext | DocSeeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocSeeContext);
		} else {
			return this.getRuleContext(i, DocSeeContext);
		}
	}
	public docTsplink(): DocTsplinkContext[];
	public docTsplink(i: number): DocTsplinkContext;
	public docTsplink(i?: number): DocTsplinkContext | DocTsplinkContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocTsplinkContext);
		} else {
			return this.getRuleContext(i, DocTsplinkContext);
		}
	}
	public docFirmware(): DocFirmwareContext[];
	public docFirmware(i: number): DocFirmwareContext;
	public docFirmware(i?: number): DocFirmwareContext | DocFirmwareContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocFirmwareContext);
		} else {
			return this.getRuleContext(i, DocFirmwareContext);
		}
	}
	public docVersion(): DocVersionContext[];
	public docVersion(i: number): DocVersionContext;
	public docVersion(i?: number): DocVersionContext | DocVersionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocVersionContext);
		} else {
			return this.getRuleContext(i, DocVersionContext);
		}
	}
	public docContent(): DocContentContext[];
	public docContent(i: number): DocContentContext;
	public docContent(i?: number): DocContentContext | DocContentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocContentContext);
		} else {
			return this.getRuleContext(i, DocContentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docblock; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocblock) {
			listener.enterDocblock(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocblock) {
			listener.exitDocblock(this);
		}
	}
}


export class DocDeprecatedContext extends ParserRuleContext {
	public DEPRECATED_TAG(): TerminalNode { return this.getToken(TspDocParser.DEPRECATED_TAG, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docDeprecated; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocDeprecated) {
			listener.enterDocDeprecated(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocDeprecated) {
			listener.exitDocDeprecated(this);
		}
	}
}


export class DocDescriptionContext extends ParserRuleContext {
	public DESCRIPTION_TAG(): TerminalNode { return this.getToken(TspDocParser.DESCRIPTION_TAG, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docDescription; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocDescription) {
			listener.enterDocDescription(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocDescription) {
			listener.exitDocDescription(this);
		}
	}
}


export class DocContentContext extends ParserRuleContext {
	public link(): LinkContext | undefined {
		return this.tryGetRuleContext(0, LinkContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	public TAG_START(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.TAG_START, 0); }
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docContent; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocContent) {
			listener.enterDocContent(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocContent) {
			listener.exitDocContent(this);
		}
	}
}


export class LinkContext extends ParserRuleContext {
	public LINK_TAG_START(): TerminalNode { return this.getToken(TspDocParser.LINK_TAG_START, 0); }
	public LINK_TAG_TARGET(): TerminalNode { return this.getToken(TspDocParser.LINK_TAG_TARGET, 0); }
	public LINK_TAG_END(): TerminalNode { return this.getToken(TspDocParser.LINK_TAG_END, 0); }
	public LINK_TAG_DISPLAY(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.LINK_TAG_DISPLAY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_link; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterLink) {
			listener.enterLink(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitLink) {
			listener.exitLink(this);
		}
	}
}


export class DocParameterContext extends ParserRuleContext {
	public PARAM_TAG(): TerminalNode { return this.getToken(TspDocParser.PARAM_TAG, 0); }
	public nameDeclaration(): NameDeclarationContext {
		return this.getRuleContext(0, NameDeclarationContext);
	}
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docParameter; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocParameter) {
			listener.enterDocParameter(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocParameter) {
			listener.exitDocParameter(this);
		}
	}
}


export class TypeDeclarationContext extends ParserRuleContext {
	public CURLY_OPEN(): TerminalNode { return this.getToken(TspDocParser.CURLY_OPEN, 0); }
	public typeEntry(): TypeEntryContext {
		return this.getRuleContext(0, TypeEntryContext);
	}
	public CURLY_CLOSE(): TerminalNode { return this.getToken(TspDocParser.CURLY_CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typeDeclaration; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypeDeclaration) {
			listener.enterTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypeDeclaration) {
			listener.exitTypeDeclaration(this);
		}
	}
}


export class TypeEntryContext extends ParserRuleContext {
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public typeUnion(): TypeUnionContext | undefined {
		return this.tryGetRuleContext(0, TypeUnionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typeEntry; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypeEntry) {
			listener.enterTypeEntry(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypeEntry) {
			listener.exitTypeEntry(this);
		}
	}
}


export class TypeUnionContext extends ParserRuleContext {
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public PIPE(): TerminalNode { return this.getToken(TspDocParser.PIPE, 0); }
	public typeUnion(): TypeUnionContext[];
	public typeUnion(i: number): TypeUnionContext;
	public typeUnion(i?: number): TypeUnionContext | TypeUnionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeUnionContext);
		} else {
			return this.getRuleContext(i, TypeUnionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typeUnion; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypeUnion) {
			listener.enterTypeUnion(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypeUnion) {
			listener.exitTypeUnion(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_type; }
	public copyFrom(ctx: TypeContext): void {
		super.copyFrom(ctx);
	}
}
export class NilTypeContext extends TypeContext {
	public NIL(): TerminalNode { return this.getToken(TspDocParser.NIL, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNilType) {
			listener.enterNilType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNilType) {
			listener.exitNilType(this);
		}
	}
}
export class BooleanTypeContext extends TypeContext {
	public BOOLEAN(): TerminalNode { return this.getToken(TspDocParser.BOOLEAN, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterBooleanType) {
			listener.enterBooleanType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitBooleanType) {
			listener.exitBooleanType(this);
		}
	}
}
export class NumberTypeContext extends TypeContext {
	public NUMBER(): TerminalNode { return this.getToken(TspDocParser.NUMBER, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNumberType) {
			listener.enterNumberType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNumberType) {
			listener.exitNumberType(this);
		}
	}
}
export class StringTypeContext extends TypeContext {
	public STRING(): TerminalNode { return this.getToken(TspDocParser.STRING, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterStringType) {
			listener.enterStringType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitStringType) {
			listener.exitStringType(this);
		}
	}
}
export class FunctionTypeContext extends TypeContext {
	public FUNCTION(): TerminalNode { return this.getToken(TspDocParser.FUNCTION, 0); }
	public PAREN_OPEN(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.PAREN_OPEN, 0); }
	public PAREN_CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.PAREN_CLOSE, 0); }
	public RETURN_ARROW(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.RETURN_ARROW, 0); }
	public typeEntry(): TypeEntryContext | undefined {
		return this.tryGetRuleContext(0, TypeEntryContext);
	}
	public typeList(): TypeListContext[];
	public typeList(i: number): TypeListContext;
	public typeList(i?: number): TypeListContext | TypeListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeListContext);
		} else {
			return this.getRuleContext(i, TypeListContext);
		}
	}
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterFunctionType) {
			listener.enterFunctionType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitFunctionType) {
			listener.exitFunctionType(this);
		}
	}
}
export class UserdataTypeContext extends TypeContext {
	public USERDATA(): TerminalNode { return this.getToken(TspDocParser.USERDATA, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterUserdataType) {
			listener.enterUserdataType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitUserdataType) {
			listener.exitUserdataType(this);
		}
	}
}
export class ThreadTypeContext extends TypeContext {
	public THREAD(): TerminalNode { return this.getToken(TspDocParser.THREAD, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterThreadType) {
			listener.enterThreadType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitThreadType) {
			listener.exitThreadType(this);
		}
	}
}
export class TableTypeContext extends TypeContext {
	public TABLE(): TerminalNode { return this.getToken(TspDocParser.TABLE, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTableType) {
			listener.enterTableType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTableType) {
			listener.exitTableType(this);
		}
	}
}
export class EnumTypeContext extends TypeContext {
	public ENUM(): TerminalNode { return this.getToken(TspDocParser.ENUM, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterEnumType) {
			listener.enterEnumType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitEnumType) {
			listener.exitEnumType(this);
		}
	}
}
export class AnyTypeContext extends TypeContext {
	public ANY(): TerminalNode { return this.getToken(TspDocParser.ANY, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterAnyType) {
			listener.enterAnyType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitAnyType) {
			listener.exitAnyType(this);
		}
	}
}
export class NameTypeContext extends TypeContext {
	public NAME(): TerminalNode { return this.getToken(TspDocParser.NAME, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNameType) {
			listener.enterNameType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNameType) {
			listener.exitNameType(this);
		}
	}
}


export class TypeListContext extends ParserRuleContext {
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public COMMA(): TerminalNode { return this.getToken(TspDocParser.COMMA, 0); }
	public typeList(): TypeListContext[];
	public typeList(i: number): TypeListContext;
	public typeList(i?: number): TypeListContext | TypeListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeListContext);
		} else {
			return this.getRuleContext(i, TypeListContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typeList; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypeList) {
			listener.enterTypeList(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypeList) {
			listener.exitTypeList(this);
		}
	}
}


export class NameDeclarationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_nameDeclaration; }
	public copyFrom(ctx: NameDeclarationContext): void {
		super.copyFrom(ctx);
	}
}
export class NameRequiredContext extends NameDeclarationContext {
	public NAME(): TerminalNode { return this.getToken(TspDocParser.NAME, 0); }
	constructor(ctx: NameDeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNameRequired) {
			listener.enterNameRequired(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNameRequired) {
			listener.exitNameRequired(this);
		}
	}
}
export class NameOptionalContext extends NameDeclarationContext {
	public SQUARE_OPEN(): TerminalNode { return this.getToken(TspDocParser.SQUARE_OPEN, 0); }
	public NAME(): TerminalNode { return this.getToken(TspDocParser.NAME, 0); }
	public SQUARE_CLOSE(): TerminalNode { return this.getToken(TspDocParser.SQUARE_CLOSE, 0); }
	public EQUALS(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.EQUALS, 0); }
	public docValue(): DocValueContext | undefined {
		return this.tryGetRuleContext(0, DocValueContext);
	}
	constructor(ctx: NameDeclarationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNameOptional) {
			listener.enterNameOptional(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNameOptional) {
			listener.exitNameOptional(this);
		}
	}
}


export class DocReturnsContext extends ParserRuleContext {
	public RETURNS_TAG(): TerminalNode { return this.getToken(TspDocParser.RETURNS_TAG, 0); }
	public docContent(): DocContentContext {
		return this.getRuleContext(0, DocContentContext);
	}
	public CURLY_OPEN(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CURLY_OPEN, 0); }
	public CURLY_CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CURLY_CLOSE, 0); }
	public typeEntry(): TypeEntryContext | undefined {
		return this.tryGetRuleContext(0, TypeEntryContext);
	}
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docReturns; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocReturns) {
			listener.enterDocReturns(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocReturns) {
			listener.exitDocReturns(this);
		}
	}
}


export class DocReadonlyContext extends ParserRuleContext {
	public READONLY_TAG(): TerminalNode { return this.getToken(TspDocParser.READONLY_TAG, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docReadonly; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocReadonly) {
			listener.enterDocReadonly(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocReadonly) {
			listener.exitDocReadonly(this);
		}
	}
}


export class DocWriteonlyContext extends ParserRuleContext {
	public WRITEONLY_TAG(): TerminalNode { return this.getToken(TspDocParser.WRITEONLY_TAG, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docWriteonly; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocWriteonly) {
			listener.enterDocWriteonly(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocWriteonly) {
			listener.exitDocWriteonly(this);
		}
	}
}


export class DocTypeContext extends ParserRuleContext {
	public TYPE_TAG(): TerminalNode { return this.getToken(TspDocParser.TYPE_TAG, 0); }
	public typeDeclaration(): TypeDeclarationContext {
		return this.getRuleContext(0, TypeDeclarationContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docType; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocType) {
			listener.enterDocType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocType) {
			listener.exitDocType(this);
		}
	}
}


export class DocTypedefContext extends ParserRuleContext {
	public TYPEDEF_TAG(): TerminalNode { return this.getToken(TspDocParser.TYPEDEF_TAG, 0); }
	public NAME(): TerminalNode { return this.getToken(TspDocParser.NAME, 0); }
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docTypedef; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocTypedef) {
			listener.enterDocTypedef(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocTypedef) {
			listener.exitDocTypedef(this);
		}
	}
}


export class DocFieldContext extends ParserRuleContext {
	public FIELD_TAG(): TerminalNode { return this.getToken(TspDocParser.FIELD_TAG, 0); }
	public nameDeclaration(): NameDeclarationContext {
		return this.getRuleContext(0, NameDeclarationContext);
	}
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docField; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocField) {
			listener.enterDocField(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocField) {
			listener.exitDocField(this);
		}
	}
}


export class DocSeeContext extends ParserRuleContext {
	public SEE_TAG(): TerminalNode { return this.getToken(TspDocParser.SEE_TAG, 0); }
	public seeTarget(): SeeTargetContext {
		return this.getRuleContext(0, SeeTargetContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docSee; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocSee) {
			listener.enterDocSee(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocSee) {
			listener.exitDocSee(this);
		}
	}
}


export class SeeTargetContext extends ParserRuleContext {
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.NAME);
		} else {
			return this.getToken(TspDocParser.NAME, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.DOT);
		} else {
			return this.getToken(TspDocParser.DOT, i);
		}
	}
	public link(): LinkContext | undefined {
		return this.tryGetRuleContext(0, LinkContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_seeTarget; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterSeeTarget) {
			listener.enterSeeTarget(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitSeeTarget) {
			listener.exitSeeTarget(this);
		}
	}
}


export class DocTsplinkContext extends ParserRuleContext {
	public TSPLINK_TAG(): TerminalNode { return this.getToken(TspDocParser.TSPLINK_TAG, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docTsplink; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocTsplink) {
			listener.enterDocTsplink(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocTsplink) {
			listener.exitDocTsplink(this);
		}
	}
}


export class DocFirmwareContext extends ParserRuleContext {
	public INT(): TerminalNode[];
	public INT(i: number): TerminalNode;
	public INT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.INT);
		} else {
			return this.getToken(TspDocParser.INT, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.DOT);
		} else {
			return this.getToken(TspDocParser.DOT, i);
		}
	}
	public LT(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.LT, 0); }
	public GTE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.GTE, 0); }
	public EQUALS(): TerminalNode[];
	public EQUALS(i: number): TerminalNode;
	public EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.EQUALS);
		} else {
			return this.getToken(TspDocParser.EQUALS, i);
		}
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.COMMA, 0); }
	public docFirmware(): DocFirmwareContext | undefined {
		return this.tryGetRuleContext(0, DocFirmwareContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docFirmware; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocFirmware) {
			listener.enterDocFirmware(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocFirmware) {
			listener.exitDocFirmware(this);
		}
	}
}


export class DocVersionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docVersion; }
	public copyFrom(ctx: DocVersionContext): void {
		super.copyFrom(ctx);
	}
}
export class Version1Context extends DocVersionContext {
	public TSPV1_TAG(): TerminalNode { return this.getToken(TspDocParser.TSPV1_TAG, 0); }
	public V2_TAG(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.V2_TAG, 0); }
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.NAME);
		} else {
			return this.getToken(TspDocParser.NAME, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.DOT);
		} else {
			return this.getToken(TspDocParser.DOT, i);
		}
	}
	constructor(ctx: DocVersionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterVersion1) {
			listener.enterVersion1(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitVersion1) {
			listener.exitVersion1(this);
		}
	}
}
export class Version2Context extends DocVersionContext {
	public TSPV2_TAG(): TerminalNode { return this.getToken(TspDocParser.TSPV2_TAG, 0); }
	public V1_TAG(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.V1_TAG, 0); }
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.NAME);
		} else {
			return this.getToken(TspDocParser.NAME, i);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.DOT);
		} else {
			return this.getToken(TspDocParser.DOT, i);
		}
	}
	constructor(ctx: DocVersionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterVersion2) {
			listener.enterVersion2(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitVersion2) {
			listener.exitVersion2(this);
		}
	}
}


export class DocValueContext extends ParserRuleContext {
	public NIL(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NIL, 0); }
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.FALSE, 0); }
	public num(): NumContext | undefined {
		return this.tryGetRuleContext(0, NumContext);
	}
	public str(): StrContext | undefined {
		return this.tryGetRuleContext(0, StrContext);
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_docValue; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocValue) {
			listener.enterDocValue(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocValue) {
			listener.exitDocValue(this);
		}
	}
}


export class NumContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.INT, 0); }
	public HEX(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.HEX, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.FLOAT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_num; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNum) {
			listener.enterNum(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNum) {
			listener.exitNum(this);
		}
	}
}


export class StrContext extends ParserRuleContext {
	public NORMALSTRING(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NORMALSTRING, 0); }
	public CHARSTRING(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CHARSTRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_str; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterStr) {
			listener.enterStr(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitStr) {
			listener.exitStr(this);
		}
	}
}


