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
	public static readonly FIRMWARE = 2;
	public static readonly TAG_DELIMETER = 3;
	public static readonly TAG_START = 4;
	public static readonly DEPRECATED_TAG = 5;
	public static readonly DESCRIPTION_TAG = 6;
	public static readonly FIELD_TAG = 7;
	public static readonly FIRMWARE_TAG = 8;
	public static readonly INDEX_TAG = 9;
	public static readonly PARAM_TAG = 10;
	public static readonly RETURNS_TAG = 11;
	public static readonly READONLY_TAG = 12;
	public static readonly SEE_TAG = 13;
	public static readonly TSPLINK_TAG = 14;
	public static readonly TSPV1_TAG = 15;
	public static readonly TSPV2_TAG = 16;
	public static readonly TYPE_TAG = 17;
	public static readonly TYPEDEF_TAG = 18;
	public static readonly V1_TAG = 19;
	public static readonly V2_TAG = 20;
	public static readonly WRITEONLY_TAG = 21;
	public static readonly LINK_TAG_START = 22;
	public static readonly BOOLEAN = 23;
	public static readonly FUNCTION = 24;
	public static readonly NUMBER = 25;
	public static readonly STRING = 26;
	public static readonly TABLE = 27;
	public static readonly THREAD = 28;
	public static readonly USERDATA = 29;
	public static readonly ANY = 30;
	public static readonly NAMESPACE = 31;
	public static readonly CLOSE = 32;
	public static readonly CURLY_OPEN = 33;
	public static readonly CURLY_CLOSE = 34;
	public static readonly COMMA = 35;
	public static readonly DOT = 36;
	public static readonly EQUALS = 37;
	public static readonly FALSE = 38;
	public static readonly GT = 39;
	public static readonly LTE = 40;
	public static readonly PAREN_OPEN = 41;
	public static readonly PAREN_CLOSE = 42;
	public static readonly PIPE = 43;
	public static readonly RETURN_ARROW = 44;
	public static readonly SIGN = 45;
	public static readonly SQUARE_OPEN = 46;
	public static readonly SQUARE_CLOSE = 47;
	public static readonly TRUE = 48;
	public static readonly OTHER = 49;
	public static readonly NIL = 50;
	public static readonly NAME = 51;
	public static readonly NORMALSTRING = 52;
	public static readonly CHARSTRING = 53;
	public static readonly INT = 54;
	public static readonly HEX = 55;
	public static readonly FLOAT = 56;
	public static readonly HORIZONTAL_WS = 57;
	public static readonly VERTICAL_WS = 58;
	public static readonly LINK_TAG_END = 59;
	public static readonly LINK_TAG_TARGET = 60;
	public static readonly LINK_TAG_DISPLAY = 61;
	public static readonly LINK_TAG_WHITESPACE = 62;
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
	public static readonly RULE_typeReturnEntry = 12;
	public static readonly RULE_nameDeclaration = 13;
	public static readonly RULE_nameValue = 14;
	public static readonly RULE_num = 15;
	public static readonly RULE_str = 16;
	public static readonly RULE_docReturns = 17;
	public static readonly RULE_docReadonly = 18;
	public static readonly RULE_docWriteonly = 19;
	public static readonly RULE_docType = 20;
	public static readonly RULE_docTypedef = 21;
	public static readonly RULE_typedefTypeUnion = 22;
	public static readonly RULE_typedefTypeUnionValue = 23;
	public static readonly RULE_docField = 24;
	public static readonly RULE_docIndex = 25;
	public static readonly RULE_docSee = 26;
	public static readonly RULE_seeTarget = 27;
	public static readonly RULE_docTsplink = 28;
	public static readonly RULE_docFirmware = 29;
	public static readonly RULE_firmwareEntry = 30;
	public static readonly RULE_docVersion = 31;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"docstring", "docblock", "docDeprecated", "docDescription", "docContent", 
		"link", "docParameter", "typeDeclaration", "typeEntry", "typeUnion", "type", 
		"typeList", "typeReturnEntry", "nameDeclaration", "nameValue", "num", 
		"str", "docReturns", "docReadonly", "docWriteonly", "docType", "docTypedef", 
		"typedefTypeUnion", "typedefTypeUnionValue", "docField", "docIndex", "docSee", 
		"seeTarget", "docTsplink", "docFirmware", "firmwareEntry", "docVersion",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'--[[['", undefined, "'@'", undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, "'boolean'", "'function'", "'number'", "'string'", 
		"'table'", "'thread'", "'userdata'", "'any'", undefined, "']]'", "'{'", 
		undefined, "','", "'.'", "'='", "'false'", "'>'", "'<='", "'('", "')'", 
		"'|'", "'=>'", undefined, "'['", "']'", "'true'", undefined, "'nil'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN", "FIRMWARE", "TAG_DELIMETER", "TAG_START", "DEPRECATED_TAG", 
		"DESCRIPTION_TAG", "FIELD_TAG", "FIRMWARE_TAG", "INDEX_TAG", "PARAM_TAG", 
		"RETURNS_TAG", "READONLY_TAG", "SEE_TAG", "TSPLINK_TAG", "TSPV1_TAG", 
		"TSPV2_TAG", "TYPE_TAG", "TYPEDEF_TAG", "V1_TAG", "V2_TAG", "WRITEONLY_TAG", 
		"LINK_TAG_START", "BOOLEAN", "FUNCTION", "NUMBER", "STRING", "TABLE", 
		"THREAD", "USERDATA", "ANY", "NAMESPACE", "CLOSE", "CURLY_OPEN", "CURLY_CLOSE", 
		"COMMA", "DOT", "EQUALS", "FALSE", "GT", "LTE", "PAREN_OPEN", "PAREN_CLOSE", 
		"PIPE", "RETURN_ARROW", "SIGN", "SQUARE_OPEN", "SQUARE_CLOSE", "TRUE", 
		"OTHER", "NIL", "NAME", "NORMALSTRING", "CHARSTRING", "INT", "HEX", "FLOAT", 
		"HORIZONTAL_WS", "VERTICAL_WS", "LINK_TAG_END", "LINK_TAG_TARGET", "LINK_TAG_DISPLAY", 
		"LINK_TAG_WHITESPACE",
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
			this.state = 64;
			this.match(TspDocParser.OPEN);
			this.state = 65;
			this.docblock();
			this.state = 66;
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
			this.state = 85;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspDocParser.OPEN) | (1 << TspDocParser.FIRMWARE) | (1 << TspDocParser.TAG_DELIMETER) | (1 << TspDocParser.TAG_START) | (1 << TspDocParser.DEPRECATED_TAG) | (1 << TspDocParser.DESCRIPTION_TAG) | (1 << TspDocParser.FIELD_TAG) | (1 << TspDocParser.FIRMWARE_TAG) | (1 << TspDocParser.INDEX_TAG) | (1 << TspDocParser.PARAM_TAG) | (1 << TspDocParser.RETURNS_TAG) | (1 << TspDocParser.READONLY_TAG) | (1 << TspDocParser.SEE_TAG) | (1 << TspDocParser.TSPLINK_TAG) | (1 << TspDocParser.TSPV1_TAG) | (1 << TspDocParser.TSPV2_TAG) | (1 << TspDocParser.TYPE_TAG) | (1 << TspDocParser.TYPEDEF_TAG) | (1 << TspDocParser.WRITEONLY_TAG) | (1 << TspDocParser.LINK_TAG_START) | (1 << TspDocParser.BOOLEAN) | (1 << TspDocParser.FUNCTION) | (1 << TspDocParser.NUMBER) | (1 << TspDocParser.STRING) | (1 << TspDocParser.TABLE) | (1 << TspDocParser.THREAD) | (1 << TspDocParser.USERDATA) | (1 << TspDocParser.ANY) | (1 << TspDocParser.NAMESPACE))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (TspDocParser.CURLY_OPEN - 33)) | (1 << (TspDocParser.CURLY_CLOSE - 33)) | (1 << (TspDocParser.COMMA - 33)) | (1 << (TspDocParser.DOT - 33)) | (1 << (TspDocParser.EQUALS - 33)) | (1 << (TspDocParser.FALSE - 33)) | (1 << (TspDocParser.GT - 33)) | (1 << (TspDocParser.LTE - 33)) | (1 << (TspDocParser.PAREN_OPEN - 33)) | (1 << (TspDocParser.PAREN_CLOSE - 33)) | (1 << (TspDocParser.PIPE - 33)) | (1 << (TspDocParser.RETURN_ARROW - 33)) | (1 << (TspDocParser.SIGN - 33)) | (1 << (TspDocParser.SQUARE_OPEN - 33)) | (1 << (TspDocParser.SQUARE_CLOSE - 33)) | (1 << (TspDocParser.TRUE - 33)) | (1 << (TspDocParser.OTHER - 33)) | (1 << (TspDocParser.NIL - 33)) | (1 << (TspDocParser.NAME - 33)) | (1 << (TspDocParser.NORMALSTRING - 33)) | (1 << (TspDocParser.CHARSTRING - 33)) | (1 << (TspDocParser.INT - 33)) | (1 << (TspDocParser.HEX - 33)) | (1 << (TspDocParser.FLOAT - 33)) | (1 << (TspDocParser.HORIZONTAL_WS - 33)) | (1 << (TspDocParser.VERTICAL_WS - 33)) | (1 << (TspDocParser.LINK_TAG_END - 33)) | (1 << (TspDocParser.LINK_TAG_TARGET - 33)) | (1 << (TspDocParser.LINK_TAG_DISPLAY - 33)) | (1 << (TspDocParser.LINK_TAG_WHITESPACE - 33)))) !== 0)) {
				{
				this.state = 83;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspDocParser.DEPRECATED_TAG:
					{
					this.state = 68;
					this.docDeprecated();
					}
					break;
				case TspDocParser.DESCRIPTION_TAG:
					{
					this.state = 69;
					this.docDescription();
					}
					break;
				case TspDocParser.PARAM_TAG:
					{
					this.state = 70;
					this.docParameter();
					}
					break;
				case TspDocParser.RETURNS_TAG:
					{
					this.state = 71;
					this.docReturns();
					}
					break;
				case TspDocParser.READONLY_TAG:
					{
					this.state = 72;
					this.docReadonly();
					}
					break;
				case TspDocParser.WRITEONLY_TAG:
					{
					this.state = 73;
					this.docWriteonly();
					}
					break;
				case TspDocParser.TYPE_TAG:
					{
					this.state = 74;
					this.docType();
					}
					break;
				case TspDocParser.TYPEDEF_TAG:
					{
					this.state = 75;
					this.docTypedef();
					}
					break;
				case TspDocParser.FIELD_TAG:
					{
					this.state = 76;
					this.docField();
					}
					break;
				case TspDocParser.INDEX_TAG:
					{
					this.state = 77;
					this.docIndex();
					}
					break;
				case TspDocParser.SEE_TAG:
					{
					this.state = 78;
					this.docSee();
					}
					break;
				case TspDocParser.TSPLINK_TAG:
					{
					this.state = 79;
					this.docTsplink();
					}
					break;
				case TspDocParser.FIRMWARE_TAG:
					{
					this.state = 80;
					this.docFirmware();
					}
					break;
				case TspDocParser.TSPV1_TAG:
				case TspDocParser.TSPV2_TAG:
					{
					this.state = 81;
					this.docVersion();
					}
					break;
				case TspDocParser.OPEN:
				case TspDocParser.FIRMWARE:
				case TspDocParser.TAG_DELIMETER:
				case TspDocParser.TAG_START:
				case TspDocParser.LINK_TAG_START:
				case TspDocParser.BOOLEAN:
				case TspDocParser.FUNCTION:
				case TspDocParser.NUMBER:
				case TspDocParser.STRING:
				case TspDocParser.TABLE:
				case TspDocParser.THREAD:
				case TspDocParser.USERDATA:
				case TspDocParser.ANY:
				case TspDocParser.NAMESPACE:
				case TspDocParser.CURLY_OPEN:
				case TspDocParser.CURLY_CLOSE:
				case TspDocParser.COMMA:
				case TspDocParser.DOT:
				case TspDocParser.EQUALS:
				case TspDocParser.FALSE:
				case TspDocParser.GT:
				case TspDocParser.LTE:
				case TspDocParser.PAREN_OPEN:
				case TspDocParser.PAREN_CLOSE:
				case TspDocParser.PIPE:
				case TspDocParser.RETURN_ARROW:
				case TspDocParser.SIGN:
				case TspDocParser.SQUARE_OPEN:
				case TspDocParser.SQUARE_CLOSE:
				case TspDocParser.TRUE:
				case TspDocParser.OTHER:
				case TspDocParser.NIL:
				case TspDocParser.NAME:
				case TspDocParser.NORMALSTRING:
				case TspDocParser.CHARSTRING:
				case TspDocParser.INT:
				case TspDocParser.HEX:
				case TspDocParser.FLOAT:
				case TspDocParser.HORIZONTAL_WS:
				case TspDocParser.VERTICAL_WS:
				case TspDocParser.LINK_TAG_END:
				case TspDocParser.LINK_TAG_TARGET:
				case TspDocParser.LINK_TAG_DISPLAY:
				case TspDocParser.LINK_TAG_WHITESPACE:
					{
					this.state = 82;
					this.docContent();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 87;
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
			this.state = 88;
			this.match(TspDocParser.DEPRECATED_TAG);
			this.state = 90;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 89;
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
			this.state = 92;
			this.match(TspDocParser.DESCRIPTION_TAG);
			this.state = 93;
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
	public docContent(): DocContentContext {
		let _localctx: DocContentContext = new DocContentContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, TspDocParser.RULE_docContent);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					this.state = 97;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
					case 1:
						{
						this.state = 95;
						this.link();
						}
						break;

					case 2:
						{
						this.state = 96;
						_la = this._input.LA(1);
						if (_la <= 0 || (((((_la - 5)) & ~0x1F) === 0 && ((1 << (_la - 5)) & ((1 << (TspDocParser.DEPRECATED_TAG - 5)) | (1 << (TspDocParser.DESCRIPTION_TAG - 5)) | (1 << (TspDocParser.FIELD_TAG - 5)) | (1 << (TspDocParser.FIRMWARE_TAG - 5)) | (1 << (TspDocParser.INDEX_TAG - 5)) | (1 << (TspDocParser.PARAM_TAG - 5)) | (1 << (TspDocParser.RETURNS_TAG - 5)) | (1 << (TspDocParser.READONLY_TAG - 5)) | (1 << (TspDocParser.SEE_TAG - 5)) | (1 << (TspDocParser.TSPLINK_TAG - 5)) | (1 << (TspDocParser.TSPV1_TAG - 5)) | (1 << (TspDocParser.TSPV2_TAG - 5)) | (1 << (TspDocParser.TYPE_TAG - 5)) | (1 << (TspDocParser.TYPEDEF_TAG - 5)) | (1 << (TspDocParser.V1_TAG - 5)) | (1 << (TspDocParser.V2_TAG - 5)) | (1 << (TspDocParser.WRITEONLY_TAG - 5)) | (1 << (TspDocParser.CLOSE - 5)))) !== 0))) {
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
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 99;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
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
			this.state = 101;
			this.match(TspDocParser.LINK_TAG_START);
			this.state = 102;
			this.match(TspDocParser.LINK_TAG_TARGET);
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.LINK_TAG_DISPLAY) {
				{
				this.state = 103;
				this.match(TspDocParser.LINK_TAG_DISPLAY);
				}
			}

			this.state = 106;
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
			this.state = 108;
			this.match(TspDocParser.PARAM_TAG);
			this.state = 110;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 109;
				this.typeDeclaration();
				}
			}

			this.state = 112;
			this.nameDeclaration();
			this.state = 114;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 113;
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
			this.state = 116;
			this.match(TspDocParser.CURLY_OPEN);
			this.state = 117;
			this.typeEntry();
			this.state = 118;
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
			this.state = 122;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 120;
				this.type();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 121;
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
			this.state = 124;
			this.type();
			this.state = 127;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 125;
					this.match(TspDocParser.PIPE);
					this.state = 126;
					this.type();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 129;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 132;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 131;
				this.match(TspDocParser.PIPE);
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
			this.state = 154;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NIL:
				_localctx = new NilTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 134;
				this.match(TspDocParser.NIL);
				}
				break;
			case TspDocParser.BOOLEAN:
				_localctx = new BooleanTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 135;
				this.match(TspDocParser.BOOLEAN);
				}
				break;
			case TspDocParser.NUMBER:
				_localctx = new NumberTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 136;
				this.match(TspDocParser.NUMBER);
				}
				break;
			case TspDocParser.STRING:
				_localctx = new StringTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 137;
				this.match(TspDocParser.STRING);
				}
				break;
			case TspDocParser.FUNCTION:
				_localctx = new FunctionTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 138;
				this.match(TspDocParser.FUNCTION);
				this.state = 146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.PAREN_OPEN) {
					{
					this.state = 139;
					this.match(TspDocParser.PAREN_OPEN);
					this.state = 141;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & ((1 << (TspDocParser.BOOLEAN - 23)) | (1 << (TspDocParser.FUNCTION - 23)) | (1 << (TspDocParser.NUMBER - 23)) | (1 << (TspDocParser.STRING - 23)) | (1 << (TspDocParser.TABLE - 23)) | (1 << (TspDocParser.THREAD - 23)) | (1 << (TspDocParser.USERDATA - 23)) | (1 << (TspDocParser.ANY - 23)) | (1 << (TspDocParser.NAMESPACE - 23)) | (1 << (TspDocParser.NIL - 23)) | (1 << (TspDocParser.NAME - 23)))) !== 0)) {
						{
						this.state = 140;
						this.typeList();
						}
					}

					this.state = 143;
					this.match(TspDocParser.PAREN_CLOSE);
					this.state = 144;
					this.match(TspDocParser.RETURN_ARROW);
					this.state = 145;
					this.typeReturnEntry();
					}
				}

				}
				break;
			case TspDocParser.USERDATA:
				_localctx = new UserdataTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 148;
				this.match(TspDocParser.USERDATA);
				}
				break;
			case TspDocParser.THREAD:
				_localctx = new ThreadTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 149;
				this.match(TspDocParser.THREAD);
				}
				break;
			case TspDocParser.TABLE:
				_localctx = new TableTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 150;
				this.match(TspDocParser.TABLE);
				}
				break;
			case TspDocParser.NAMESPACE:
				_localctx = new NamespaceTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 151;
				this.match(TspDocParser.NAMESPACE);
				}
				break;
			case TspDocParser.ANY:
				_localctx = new AnyTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 152;
				this.match(TspDocParser.ANY);
				}
				break;
			case TspDocParser.NAME:
				_localctx = new NameTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 153;
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
			this.state = 156;
			this.type();
			this.state = 161;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 157;
					this.match(TspDocParser.COMMA);
					this.state = 158;
					this.type();
					}
					}
				}
				this.state = 163;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
			}
			this.state = 165;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				{
				this.state = 164;
				this.match(TspDocParser.COMMA);
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
	public typeReturnEntry(): TypeReturnEntryContext {
		let _localctx: TypeReturnEntryContext = new TypeReturnEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, TspDocParser.RULE_typeReturnEntry);
		try {
			let _alt: number;
			this.state = 187;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 172;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 167;
						this.type();
						this.state = 168;
						this.match(TspDocParser.COMMA);
						}
						}
					}
					this.state = 174;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
				}
				this.state = 175;
				this.typeUnion();
				this.state = 176;
				this.match(TspDocParser.COMMA);
				this.state = 180;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 177;
						this.matchWildcard();
						}
						}
					}
					this.state = 182;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
				}
				this.notifyErrorListeners("Type lists cannot contain type unions");
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 185;
				this.typeUnion();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 186;
				this.typeList();
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
	public nameDeclaration(): NameDeclarationContext {
		let _localctx: NameDeclarationContext = new NameDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, TspDocParser.RULE_nameDeclaration);
		try {
			this.state = 196;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NAME:
				_localctx = new NameRequiredContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 189;
				this.match(TspDocParser.NAME);
				}
				break;
			case TspDocParser.SQUARE_OPEN:
				_localctx = new NameOptionalContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 190;
				this.match(TspDocParser.SQUARE_OPEN);
				this.state = 191;
				this.match(TspDocParser.NAME);
				this.state = 192;
				this.match(TspDocParser.EQUALS);
				this.state = 193;
				this.nameValue();
				this.state = 194;
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
	public nameValue(): NameValueContext {
		let _localctx: NameValueContext = new NameValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, TspDocParser.RULE_nameValue);
		let _la: number;
		try {
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NIL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 198;
				this.match(TspDocParser.NIL);
				}
				break;
			case TspDocParser.TRUE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 199;
				this.match(TspDocParser.TRUE);
				}
				break;
			case TspDocParser.FALSE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 200;
				this.match(TspDocParser.FALSE);
				}
				break;
			case TspDocParser.SIGN:
			case TspDocParser.INT:
			case TspDocParser.HEX:
			case TspDocParser.FLOAT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 202;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.SIGN) {
					{
					this.state = 201;
					this.match(TspDocParser.SIGN);
					}
				}

				this.state = 204;
				this.num();
				}
				break;
			case TspDocParser.NORMALSTRING:
			case TspDocParser.CHARSTRING:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 205;
				this.str();
				}
				break;
			case TspDocParser.NAME:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 206;
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
		this.enterRule(_localctx, 30, TspDocParser.RULE_num);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 209;
			_la = this._input.LA(1);
			if (!(((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & ((1 << (TspDocParser.INT - 54)) | (1 << (TspDocParser.HEX - 54)) | (1 << (TspDocParser.FLOAT - 54)))) !== 0))) {
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
		this.enterRule(_localctx, 32, TspDocParser.RULE_str);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 211;
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
	// @RuleVersion(0)
	public docReturns(): DocReturnsContext {
		let _localctx: DocReturnsContext = new DocReturnsContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, TspDocParser.RULE_docReturns);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 213;
			this.match(TspDocParser.RETURNS_TAG);
			this.state = 218;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 214;
				this.match(TspDocParser.CURLY_OPEN);
				this.state = 215;
				this.typeReturnEntry();
				this.state = 216;
				this.match(TspDocParser.CURLY_CLOSE);
				}
				break;
			}
			this.state = 221;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 220;
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
	public docReadonly(): DocReadonlyContext {
		let _localctx: DocReadonlyContext = new DocReadonlyContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, TspDocParser.RULE_docReadonly);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 223;
			this.match(TspDocParser.READONLY_TAG);
			this.state = 225;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 224;
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
		this.enterRule(_localctx, 38, TspDocParser.RULE_docWriteonly);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 227;
			this.match(TspDocParser.WRITEONLY_TAG);
			this.state = 229;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 228;
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
		this.enterRule(_localctx, 40, TspDocParser.RULE_docType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 231;
			this.match(TspDocParser.TYPE_TAG);
			this.state = 232;
			this.typeDeclaration();
			this.state = 234;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				{
				this.state = 233;
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
		this.enterRule(_localctx, 42, TspDocParser.RULE_docTypedef);
		let _la: number;
		try {
			this.state = 266;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 236;
				this.match(TspDocParser.TYPEDEF_TAG);
				this.state = 237;
				this.match(TspDocParser.CURLY_OPEN);
				this.state = 241;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
				case 1:
					{
					this.state = 238;
					this.typedefTypeUnion();
					}
					break;

				case 2:
					{
					this.state = 239;
					this.match(TspDocParser.FUNCTION);
					}
					break;

				case 3:
					{
					this.state = 240;
					this.match(TspDocParser.TABLE);
					}
					break;
				}
				this.state = 243;
				this.match(TspDocParser.CURLY_CLOSE);
				this.state = 244;
				this.match(TspDocParser.NAME);
				this.state = 246;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
				case 1:
					{
					this.state = 245;
					this.docContent();
					}
					break;
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 248;
				this.match(TspDocParser.TYPEDEF_TAG);
				this.state = 249;
				this.match(TspDocParser.CURLY_OPEN);
				this.state = 250;
				this.match(TspDocParser.FUNCTION);
				this.state = 251;
				this.match(TspDocParser.PAREN_OPEN);
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & ((1 << (TspDocParser.BOOLEAN - 23)) | (1 << (TspDocParser.FUNCTION - 23)) | (1 << (TspDocParser.NUMBER - 23)) | (1 << (TspDocParser.STRING - 23)) | (1 << (TspDocParser.TABLE - 23)) | (1 << (TspDocParser.THREAD - 23)) | (1 << (TspDocParser.USERDATA - 23)) | (1 << (TspDocParser.ANY - 23)) | (1 << (TspDocParser.NAMESPACE - 23)) | (1 << (TspDocParser.NIL - 23)) | (1 << (TspDocParser.NAME - 23)))) !== 0)) {
					{
					this.state = 252;
					this.typeList();
					}
				}

				this.state = 255;
				this.match(TspDocParser.PAREN_CLOSE);
				this.state = 258;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.RETURN_ARROW) {
					{
					this.state = 256;
					this.match(TspDocParser.RETURN_ARROW);
					this.state = 257;
					this.typeReturnEntry();
					}
				}

				this.state = 260;
				this.match(TspDocParser.CURLY_CLOSE);
				this.state = 261;
				this.match(TspDocParser.NAME);
				this.state = 263;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
				case 1:
					{
					this.state = 262;
					this.docContent();
					}
					break;
				}
				this.notifyErrorListeners("Typedefs cannot contain function signatures");
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
	public typedefTypeUnion(): TypedefTypeUnionContext {
		let _localctx: TypedefTypeUnionContext = new TypedefTypeUnionContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, TspDocParser.RULE_typedefTypeUnion);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 270;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.BOOLEAN:
			case TspDocParser.FUNCTION:
			case TspDocParser.NUMBER:
			case TspDocParser.STRING:
			case TspDocParser.TABLE:
			case TspDocParser.THREAD:
			case TspDocParser.USERDATA:
			case TspDocParser.ANY:
			case TspDocParser.NAMESPACE:
			case TspDocParser.NIL:
			case TspDocParser.NAME:
				{
				this.state = 268;
				this.type();
				}
				break;
			case TspDocParser.FALSE:
			case TspDocParser.SIGN:
			case TspDocParser.TRUE:
			case TspDocParser.NORMALSTRING:
			case TspDocParser.CHARSTRING:
			case TspDocParser.INT:
			case TspDocParser.HEX:
			case TspDocParser.FLOAT:
				{
				this.state = 269;
				this.typedefTypeUnionValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 277;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 272;
					this.match(TspDocParser.PIPE);
					this.state = 275;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case TspDocParser.BOOLEAN:
					case TspDocParser.FUNCTION:
					case TspDocParser.NUMBER:
					case TspDocParser.STRING:
					case TspDocParser.TABLE:
					case TspDocParser.THREAD:
					case TspDocParser.USERDATA:
					case TspDocParser.ANY:
					case TspDocParser.NAMESPACE:
					case TspDocParser.NIL:
					case TspDocParser.NAME:
						{
						this.state = 273;
						this.type();
						}
						break;
					case TspDocParser.FALSE:
					case TspDocParser.SIGN:
					case TspDocParser.TRUE:
					case TspDocParser.NORMALSTRING:
					case TspDocParser.CHARSTRING:
					case TspDocParser.INT:
					case TspDocParser.HEX:
					case TspDocParser.FLOAT:
						{
						this.state = 274;
						this.typedefTypeUnionValue();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 279;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 35, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.PIPE) {
				{
				this.state = 281;
				this.match(TspDocParser.PIPE);
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
	public typedefTypeUnionValue(): TypedefTypeUnionValueContext {
		let _localctx: TypedefTypeUnionValueContext = new TypedefTypeUnionValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, TspDocParser.RULE_typedefTypeUnionValue);
		let _la: number;
		try {
			this.state = 291;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.TRUE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 284;
				this.match(TspDocParser.TRUE);
				}
				break;
			case TspDocParser.FALSE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 285;
				this.match(TspDocParser.FALSE);
				}
				break;
			case TspDocParser.SIGN:
			case TspDocParser.INT:
			case TspDocParser.HEX:
			case TspDocParser.FLOAT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 287;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.SIGN) {
					{
					this.state = 286;
					this.match(TspDocParser.SIGN);
					}
				}

				this.state = 289;
				this.num();
				}
				break;
			case TspDocParser.NORMALSTRING:
			case TspDocParser.CHARSTRING:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 290;
				this.str();
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
	public docField(): DocFieldContext {
		let _localctx: DocFieldContext = new DocFieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, TspDocParser.RULE_docField);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 293;
			this.match(TspDocParser.FIELD_TAG);
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 294;
				this.typeDeclaration();
				}
			}

			this.state = 297;
			this.nameDeclaration();
			this.state = 299;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				this.state = 298;
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
	public docIndex(): DocIndexContext {
		let _localctx: DocIndexContext = new DocIndexContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, TspDocParser.RULE_docIndex);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 301;
			this.match(TspDocParser.INDEX_TAG);
			this.state = 302;
			this.typeDeclaration();
			this.state = 304;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				{
				this.state = 303;
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
		this.enterRule(_localctx, 52, TspDocParser.RULE_docSee);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this.match(TspDocParser.SEE_TAG);
			this.state = 307;
			this.seeTarget();
			this.state = 309;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				{
				this.state = 308;
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
		this.enterRule(_localctx, 54, TspDocParser.RULE_seeTarget);
		const startingIndex = this.currentToken.tokenIndex;
		try {
			this.state = 315;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NAME:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 311;
				this.match(TspDocParser.NAME);

						// Indirectly check for whitespace between NAME and the next token.
						if (this.currentToken.tokenIndex - startingIndex === 1) {
							// Throw an error if there was no whitespace.
							this.notifyErrorListeners("invalid see target");
						}
				}
				break;
			case TspDocParser.NAMESPACE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 313;
				this.match(TspDocParser.NAMESPACE);
				}
				break;
			case TspDocParser.LINK_TAG_START:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 314;
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
		this.enterRule(_localctx, 56, TspDocParser.RULE_docTsplink);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 317;
			this.match(TspDocParser.TSPLINK_TAG);
			this.state = 319;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				{
				this.state = 318;
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
		this.enterRule(_localctx, 58, TspDocParser.RULE_docFirmware);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 321;
			this.match(TspDocParser.FIRMWARE_TAG);
			this.state = 322;
			this.firmwareEntry();
			this.state = 327;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 323;
					this.match(TspDocParser.COMMA);
					this.state = 324;
					this.firmwareEntry();
					}
					}
				}
				this.state = 329;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			}
			this.state = 331;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				{
				this.state = 330;
				this.match(TspDocParser.COMMA);
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
	public firmwareEntry(): FirmwareEntryContext {
		let _localctx: FirmwareEntryContext = new FirmwareEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, TspDocParser.RULE_firmwareEntry);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 337;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.GT:
				{
				this.state = 333;
				this.match(TspDocParser.GT);
				}
				break;
			case TspDocParser.LTE:
				{
				this.state = 334;
				this.match(TspDocParser.LTE);
				}
				break;
			case TspDocParser.EQUALS:
				{
				this.state = 335;
				this.match(TspDocParser.EQUALS);
				this.state = 336;
				this.match(TspDocParser.EQUALS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 339;
			this.match(TspDocParser.FIRMWARE);
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
		this.enterRule(_localctx, 62, TspDocParser.RULE_docVersion);
		let _la: number;
		try {
			this.state = 351;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.TSPV1_TAG:
				_localctx = new Version1Context(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 341;
				this.match(TspDocParser.TSPV1_TAG);
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.V2_TAG) {
					{
					this.state = 342;
					this.match(TspDocParser.V2_TAG);
					this.state = 343;
					_la = this._input.LA(1);
					if (!(_la === TspDocParser.NAMESPACE || _la === TspDocParser.NAME)) {
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
				break;
			case TspDocParser.TSPV2_TAG:
				_localctx = new Version2Context(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 346;
				this.match(TspDocParser.TSPV2_TAG);
				this.state = 349;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.V1_TAG) {
					{
					this.state = 347;
					this.match(TspDocParser.V1_TAG);
					this.state = 348;
					_la = this._input.LA(1);
					if (!(_la === TspDocParser.NAMESPACE || _la === TspDocParser.NAME)) {
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

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03@\u0164\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03" +
		"V\n\x03\f\x03\x0E\x03Y\v\x03\x03\x04\x03\x04\x05\x04]\n\x04\x03\x05\x03" +
		"\x05\x03\x05\x03\x06\x03\x06\x06\x06d\n\x06\r\x06\x0E\x06e\x03\x07\x03" +
		"\x07\x03\x07\x05\x07k\n\x07\x03\x07\x03\x07\x03\b\x03\b\x05\bq\n\b\x03" +
		"\b\x03\b\x05\bu\n\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x05\n}\n\n\x03" +
		"\v\x03\v\x03\v\x06\v\x82\n\v\r\v\x0E\v\x83\x03\v\x05\v\x87\n\v\x03\f\x03" +
		"\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\x90\n\f\x03\f\x03\f\x03\f\x05\f" +
		"\x95\n\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\x9D\n\f\x03\r\x03\r" +
		"\x03\r\x07\r\xA2\n\r\f\r\x0E\r\xA5\v\r\x03\r\x05\r\xA8\n\r\x03\x0E\x03" +
		"\x0E\x03\x0E\x07\x0E\xAD\n\x0E\f\x0E\x0E\x0E\xB0\v\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x07\x0E\xB5\n\x0E\f\x0E\x0E\x0E\xB8\v\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x05\x0E\xBE\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x05\x0F\xC7\n\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x05" +
		"\x10\xCD\n\x10\x03\x10\x03\x10\x03\x10\x05\x10\xD2\n\x10\x03\x11\x03\x11" +
		"\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\xDD\n" +
		"\x13\x03\x13\x05\x13\xE0\n\x13\x03\x14\x03\x14\x05\x14\xE4\n\x14\x03\x15" +
		"\x03\x15\x05\x15\xE8\n\x15\x03\x16\x03\x16\x03\x16\x05\x16\xED\n\x16\x03" +
		"\x17\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\xF4\n\x17\x03\x17\x03\x17" +
		"\x03\x17\x05\x17\xF9\n\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x05" +
		"\x17\u0100\n\x17\x03\x17\x03\x17\x03\x17\x05\x17\u0105\n\x17\x03\x17\x03" +
		"\x17\x03\x17\x05\x17\u010A\n\x17\x03\x17\x05\x17\u010D\n\x17\x03\x18\x03" +
		"\x18\x05\x18\u0111\n\x18\x03\x18\x03\x18\x03\x18\x05\x18\u0116\n\x18\x06" +
		"\x18\u0118\n\x18\r\x18\x0E\x18\u0119\x03\x18\x05\x18\u011D\n\x18\x03\x19" +
		"\x03\x19\x03\x19\x05\x19\u0122\n\x19\x03\x19\x03\x19\x05\x19\u0126\n\x19" +
		"\x03\x1A\x03\x1A\x05\x1A\u012A\n\x1A\x03\x1A\x03\x1A\x05\x1A\u012E\n\x1A" +
		"\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u0133\n\x1B\x03\x1C\x03\x1C\x03\x1C\x05" +
		"\x1C\u0138\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u013E\n\x1D\x03" +
		"\x1E\x03\x1E\x05\x1E\u0142\n\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x07\x1F" +
		"\u0148\n\x1F\f\x1F\x0E\x1F\u014B\v\x1F\x03\x1F\x05\x1F\u014E\n\x1F\x03" +
		" \x03 \x03 \x03 \x05 \u0154\n \x03 \x03 \x03!\x03!\x03!\x05!\u015B\n!" +
		"\x03!\x03!\x03!\x05!\u0160\n!\x05!\u0162\n!\x03!\x03\xB6\x02\x02\"\x02" +
		"\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02" +
		"\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02" +
		",\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02\x02\x06\x04\x02" +
		"\x07\x17\"\"\x03\x028:\x03\x0267\x04\x02!!55\x02\u0196\x02B\x03\x02\x02" +
		"\x02\x04W\x03\x02\x02\x02\x06Z\x03\x02\x02\x02\b^\x03\x02\x02\x02\nc\x03" +
		"\x02\x02\x02\fg\x03\x02\x02\x02\x0En\x03\x02\x02\x02\x10v\x03\x02\x02" +
		"\x02\x12|\x03\x02\x02\x02\x14~\x03\x02\x02\x02\x16\x9C\x03\x02\x02\x02" +
		"\x18\x9E\x03\x02\x02\x02\x1A\xBD\x03\x02\x02\x02\x1C\xC6\x03\x02\x02\x02" +
		"\x1E\xD1\x03\x02\x02\x02 \xD3\x03\x02\x02\x02\"\xD5\x03\x02\x02\x02$\xD7" +
		"\x03\x02\x02\x02&\xE1\x03\x02\x02\x02(\xE5\x03\x02\x02\x02*\xE9\x03\x02" +
		"\x02\x02,\u010C\x03\x02\x02\x02.\u0110\x03\x02\x02\x020\u0125\x03\x02" +
		"\x02\x022\u0127\x03\x02\x02\x024\u012F\x03\x02\x02\x026\u0134\x03\x02" +
		"\x02\x028\u013D\x03\x02\x02\x02:\u013F\x03\x02\x02\x02<\u0143\x03\x02" +
		"\x02\x02>\u0153\x03\x02\x02\x02@\u0161\x03\x02\x02\x02BC\x07\x03\x02\x02" +
		"CD\x05\x04\x03\x02DE\x07\"\x02\x02E\x03\x03\x02\x02\x02FV\x05\x06\x04" +
		"\x02GV\x05\b\x05\x02HV\x05\x0E\b\x02IV\x05$\x13\x02JV\x05&\x14\x02KV\x05" +
		"(\x15\x02LV\x05*\x16\x02MV\x05,\x17\x02NV\x052\x1A\x02OV\x054\x1B\x02" +
		"PV\x056\x1C\x02QV\x05:\x1E\x02RV\x05<\x1F\x02SV\x05@!\x02TV\x05\n\x06" +
		"\x02UF\x03\x02\x02\x02UG\x03\x02\x02\x02UH\x03\x02\x02\x02UI\x03\x02\x02" +
		"\x02UJ\x03\x02\x02\x02UK\x03\x02\x02\x02UL\x03\x02\x02\x02UM\x03\x02\x02" +
		"\x02UN\x03\x02\x02\x02UO\x03\x02\x02\x02UP\x03\x02\x02\x02UQ\x03\x02\x02" +
		"\x02UR\x03\x02\x02\x02US\x03\x02\x02\x02UT\x03\x02\x02\x02VY\x03\x02\x02" +
		"\x02WU\x03\x02\x02\x02WX\x03\x02\x02\x02X\x05\x03\x02\x02\x02YW\x03\x02" +
		"\x02\x02Z\\\x07\x07\x02\x02[]\x05\n\x06\x02\\[\x03\x02\x02\x02\\]\x03" +
		"\x02\x02\x02]\x07\x03\x02\x02\x02^_\x07\b\x02\x02_`\x05\n\x06\x02`\t\x03" +
		"\x02\x02\x02ad\x05\f\x07\x02bd\n\x02\x02\x02ca\x03\x02\x02\x02cb\x03\x02" +
		"\x02\x02de\x03\x02\x02\x02ec\x03\x02\x02\x02ef\x03\x02\x02\x02f\v\x03" +
		"\x02\x02\x02gh\x07\x18\x02\x02hj\x07>\x02\x02ik\x07?\x02\x02ji\x03\x02" +
		"\x02\x02jk\x03\x02\x02\x02kl\x03\x02\x02\x02lm\x07=\x02\x02m\r\x03\x02" +
		"\x02\x02np\x07\f\x02\x02oq\x05\x10\t\x02po\x03\x02\x02\x02pq\x03\x02\x02" +
		"\x02qr\x03\x02\x02\x02rt\x05\x1C\x0F\x02su\x05\n\x06\x02ts\x03\x02\x02" +
		"\x02tu\x03\x02\x02\x02u\x0F\x03\x02\x02\x02vw\x07#\x02\x02wx\x05\x12\n" +
		"\x02xy\x07$\x02\x02y\x11\x03\x02\x02\x02z}\x05\x16\f\x02{}\x05\x14\v\x02" +
		"|z\x03\x02\x02\x02|{\x03\x02\x02\x02}\x13\x03\x02\x02\x02~\x81\x05\x16" +
		"\f\x02\x7F\x80\x07-\x02\x02\x80\x82\x05\x16\f\x02\x81\x7F\x03\x02\x02" +
		"\x02\x82\x83\x03\x02\x02\x02\x83\x81\x03\x02\x02\x02\x83\x84\x03\x02\x02" +
		"\x02\x84\x86\x03\x02\x02\x02\x85\x87\x07-\x02\x02\x86\x85\x03\x02\x02" +
		"\x02\x86\x87\x03\x02\x02\x02\x87\x15\x03\x02\x02\x02\x88\x9D\x074\x02" +
		"\x02\x89\x9D\x07\x19\x02\x02\x8A\x9D\x07\x1B\x02\x02\x8B\x9D\x07\x1C\x02" +
		"\x02\x8C\x94\x07\x1A\x02\x02\x8D\x8F\x07+\x02\x02\x8E\x90\x05\x18\r\x02" +
		"\x8F\x8E\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02" +
		"\x91\x92\x07,\x02\x02\x92\x93\x07.\x02\x02\x93\x95\x05\x1A\x0E\x02\x94" +
		"\x8D\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x9D\x03\x02\x02\x02\x96" +
		"\x9D\x07\x1F\x02\x02\x97\x9D\x07\x1E\x02\x02\x98\x9D\x07\x1D\x02\x02\x99" +
		"\x9D\x07!\x02\x02\x9A\x9D\x07 \x02\x02\x9B\x9D\x075\x02\x02\x9C\x88\x03" +
		"\x02\x02\x02\x9C\x89\x03\x02\x02\x02\x9C\x8A\x03\x02\x02\x02\x9C\x8B\x03" +
		"\x02\x02\x02\x9C\x8C\x03\x02\x02\x02\x9C\x96\x03\x02\x02\x02\x9C\x97\x03" +
		"\x02\x02\x02\x9C\x98\x03\x02\x02\x02\x9C\x99\x03\x02\x02\x02\x9C\x9A\x03" +
		"\x02\x02\x02\x9C\x9B\x03\x02\x02\x02\x9D\x17\x03\x02\x02\x02\x9E\xA3\x05" +
		"\x16\f\x02\x9F\xA0\x07%\x02\x02\xA0\xA2\x05\x16\f\x02\xA1\x9F\x03\x02" +
		"\x02\x02\xA2\xA5\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02" +
		"\x02\x02\xA4\xA7\x03\x02\x02\x02\xA5\xA3\x03\x02\x02\x02\xA6\xA8\x07%" +
		"\x02\x02\xA7\xA6\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA8\x19\x03\x02" +
		"\x02\x02\xA9\xAA\x05\x16\f\x02\xAA\xAB\x07%\x02\x02\xAB\xAD\x03\x02\x02" +
		"\x02\xAC\xA9\x03\x02\x02\x02\xAD\xB0\x03\x02\x02\x02\xAE\xAC\x03\x02\x02" +
		"\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB1\x03\x02\x02\x02\xB0\xAE\x03\x02\x02" +
		"\x02\xB1\xB2\x05\x14\v\x02\xB2\xB6\x07%\x02\x02\xB3\xB5\v\x02\x02\x02" +
		"\xB4\xB3\x03\x02\x02\x02\xB5\xB8\x03\x02\x02\x02\xB6\xB7\x03\x02\x02\x02" +
		"\xB6\xB4\x03\x02\x02\x02\xB7\xB9\x03\x02\x02\x02\xB8\xB6\x03\x02\x02\x02" +
		"\xB9\xBA\b\x0E\x01\x02\xBA\xBE\x03\x02\x02\x02\xBB\xBE\x05\x14\v\x02\xBC" +
		"\xBE\x05\x18\r\x02\xBD\xAE\x03\x02\x02\x02\xBD\xBB\x03\x02\x02\x02\xBD" +
		"\xBC\x03\x02\x02\x02\xBE\x1B\x03\x02\x02\x02\xBF\xC7\x075\x02\x02\xC0" +
		"\xC1\x070\x02\x02\xC1\xC2\x075\x02\x02\xC2\xC3\x07\'\x02\x02\xC3\xC4\x05" +
		"\x1E\x10\x02\xC4\xC5\x071\x02\x02\xC5\xC7\x03\x02\x02\x02\xC6\xBF\x03" +
		"\x02\x02\x02\xC6\xC0\x03\x02\x02\x02\xC7\x1D\x03\x02\x02\x02\xC8\xD2\x07" +
		"4\x02\x02\xC9\xD2\x072\x02\x02\xCA\xD2\x07(\x02\x02\xCB\xCD\x07/\x02\x02" +
		"\xCC\xCB\x03\x02\x02\x02\xCC\xCD\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02" +
		"\xCE\xD2\x05 \x11\x02\xCF\xD2\x05\"\x12\x02\xD0\xD2\x075\x02\x02\xD1\xC8" +
		"\x03\x02\x02\x02\xD1\xC9\x03\x02\x02\x02\xD1\xCA\x03\x02\x02\x02\xD1\xCC" +
		"\x03\x02\x02\x02\xD1\xCF\x03\x02\x02\x02\xD1\xD0\x03\x02\x02\x02\xD2\x1F" +
		"\x03\x02\x02\x02\xD3\xD4\t\x03\x02\x02\xD4!\x03\x02\x02\x02\xD5\xD6\t" +
		"\x04\x02\x02\xD6#\x03\x02\x02\x02\xD7\xDC\x07\r\x02\x02\xD8\xD9\x07#\x02" +
		"\x02\xD9\xDA\x05\x1A\x0E\x02\xDA\xDB\x07$\x02\x02\xDB\xDD\x03\x02\x02" +
		"\x02\xDC\xD8\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02\xDD\xDF\x03\x02\x02" +
		"\x02\xDE\xE0\x05\n\x06\x02\xDF\xDE\x03\x02\x02\x02\xDF\xE0\x03\x02\x02" +
		"\x02\xE0%\x03\x02\x02\x02\xE1\xE3\x07\x0E\x02\x02\xE2\xE4\x05\n\x06\x02" +
		"\xE3\xE2\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02\xE4\'\x03\x02\x02\x02" +
		"\xE5\xE7\x07\x17\x02\x02\xE6\xE8\x05\n\x06\x02\xE7\xE6\x03\x02\x02\x02" +
		"\xE7\xE8\x03\x02\x02\x02\xE8)\x03\x02\x02\x02\xE9\xEA\x07\x13\x02\x02" +
		"\xEA\xEC\x05\x10\t\x02\xEB\xED\x05\n\x06\x02\xEC\xEB\x03\x02\x02\x02\xEC" +
		"\xED\x03\x02\x02\x02\xED+\x03\x02\x02\x02\xEE\xEF\x07\x14\x02\x02\xEF" +
		"\xF3\x07#\x02\x02\xF0\xF4\x05.\x18\x02\xF1\xF4\x07\x1A\x02\x02\xF2\xF4" +
		"\x07\x1D\x02\x02\xF3\xF0\x03\x02\x02\x02\xF3\xF1\x03\x02\x02\x02\xF3\xF2" +
		"\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02\xF5\xF6\x07$\x02\x02\xF6\xF8" +
		"\x075\x02\x02\xF7\xF9\x05\n\x06\x02\xF8\xF7\x03\x02\x02\x02\xF8\xF9\x03" +
		"\x02\x02\x02\xF9\u010D\x03\x02\x02\x02\xFA\xFB\x07\x14\x02\x02\xFB\xFC" +
		"\x07#\x02\x02\xFC\xFD\x07\x1A\x02\x02\xFD\xFF\x07+\x02\x02\xFE\u0100\x05" +
		"\x18\r\x02\xFF\xFE\x03\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0101" +
		"\x03\x02\x02\x02\u0101\u0104\x07,\x02\x02\u0102\u0103\x07.\x02\x02\u0103" +
		"\u0105\x05\x1A\x0E\x02\u0104\u0102\x03\x02\x02\x02\u0104\u0105\x03\x02" +
		"\x02\x02\u0105\u0106\x03\x02\x02\x02\u0106\u0107\x07$\x02\x02\u0107\u0109" +
		"\x075\x02\x02\u0108\u010A\x05\n\x06\x02\u0109\u0108\x03\x02\x02\x02\u0109" +
		"\u010A\x03\x02\x02\x02\u010A\u010B\x03\x02\x02\x02\u010B\u010D\b\x17\x01" +
		"\x02\u010C\xEE\x03\x02\x02\x02\u010C\xFA\x03\x02\x02\x02\u010D-\x03\x02" +
		"\x02\x02\u010E\u0111\x05\x16\f\x02\u010F\u0111\x050\x19\x02\u0110\u010E" +
		"\x03\x02\x02\x02\u0110\u010F\x03\x02\x02\x02\u0111\u0117\x03\x02\x02\x02" +
		"\u0112\u0115\x07-\x02\x02\u0113\u0116\x05\x16\f\x02\u0114\u0116\x050\x19" +
		"\x02\u0115\u0113\x03\x02\x02\x02\u0115\u0114\x03\x02\x02\x02\u0116\u0118" +
		"\x03\x02\x02\x02\u0117\u0112\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02" +
		"\u0119\u0117\x03\x02\x02\x02\u0119\u011A\x03\x02\x02\x02\u011A\u011C\x03" +
		"\x02\x02\x02\u011B\u011D\x07-\x02\x02\u011C\u011B\x03\x02\x02\x02\u011C" +
		"\u011D\x03\x02\x02\x02\u011D/\x03\x02\x02\x02\u011E\u0126\x072\x02\x02" +
		"\u011F\u0126\x07(\x02\x02\u0120\u0122\x07/\x02\x02\u0121\u0120\x03\x02" +
		"\x02\x02\u0121\u0122\x03\x02\x02\x02\u0122\u0123\x03\x02\x02\x02\u0123" +
		"\u0126\x05 \x11\x02\u0124\u0126\x05\"\x12\x02\u0125\u011E\x03\x02\x02" +
		"\x02\u0125\u011F\x03\x02\x02\x02\u0125\u0121\x03\x02\x02\x02\u0125\u0124" +
		"\x03\x02\x02\x02\u01261\x03\x02\x02\x02\u0127\u0129\x07\t\x02\x02\u0128" +
		"\u012A\x05\x10\t\x02\u0129\u0128\x03\x02\x02\x02\u0129\u012A\x03\x02\x02" +
		"\x02\u012A\u012B\x03\x02\x02\x02\u012B\u012D\x05\x1C\x0F\x02\u012C\u012E" +
		"\x05\n\x06\x02\u012D\u012C\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02" +
		"\u012E3\x03\x02\x02\x02\u012F\u0130\x07\v\x02\x02\u0130\u0132\x05\x10" +
		"\t\x02\u0131\u0133\x05\n\x06\x02\u0132\u0131\x03\x02\x02\x02\u0132\u0133" +
		"\x03\x02\x02\x02\u01335\x03\x02\x02\x02\u0134\u0135\x07\x0F\x02\x02\u0135" +
		"\u0137\x058\x1D\x02\u0136\u0138\x05\n\x06\x02\u0137\u0136\x03\x02\x02" +
		"\x02\u0137\u0138\x03\x02\x02\x02\u01387\x03\x02\x02\x02\u0139\u013A\x07" +
		"5\x02\x02\u013A\u013E\b\x1D\x01\x02\u013B\u013E\x07!\x02\x02\u013C\u013E" +
		"\x05\f\x07\x02\u013D\u0139\x03\x02\x02\x02\u013D\u013B\x03\x02\x02\x02" +
		"\u013D\u013C\x03\x02\x02\x02\u013E9\x03\x02\x02\x02\u013F\u0141\x07\x10" +
		"\x02\x02\u0140\u0142\x05\n\x06\x02\u0141\u0140\x03\x02\x02\x02\u0141\u0142" +
		"\x03\x02\x02\x02\u0142;\x03\x02\x02\x02\u0143\u0144\x07\n\x02\x02\u0144" +
		"\u0149\x05> \x02\u0145\u0146\x07%\x02\x02\u0146\u0148\x05> \x02\u0147" +
		"\u0145\x03\x02\x02\x02\u0148\u014B\x03\x02\x02\x02\u0149\u0147\x03\x02" +
		"\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A\u014D\x03\x02\x02\x02\u014B" +
		"\u0149\x03\x02\x02\x02\u014C\u014E\x07%\x02\x02\u014D\u014C\x03\x02\x02" +
		"\x02\u014D\u014E\x03\x02\x02\x02\u014E=\x03\x02\x02\x02\u014F\u0154\x07" +
		")\x02\x02\u0150\u0154\x07*\x02\x02\u0151\u0152\x07\'\x02\x02\u0152\u0154" +
		"\x07\'\x02\x02\u0153\u014F\x03\x02\x02\x02\u0153\u0150\x03\x02\x02\x02" +
		"\u0153\u0151\x03\x02\x02\x02\u0154\u0155\x03\x02\x02\x02\u0155\u0156\x07" +
		"\x04\x02\x02\u0156?\x03\x02\x02\x02\u0157\u015A\x07\x11\x02\x02\u0158" +
		"\u0159\x07\x16\x02\x02\u0159\u015B\t\x05\x02\x02\u015A\u0158\x03\x02\x02" +
		"\x02\u015A\u015B\x03\x02\x02\x02\u015B\u0162\x03\x02\x02\x02\u015C\u015F" +
		"\x07\x12\x02\x02\u015D\u015E\x07\x15\x02\x02\u015E\u0160\t\x05\x02\x02" +
		"\u015F\u015D\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02\u0160\u0162\x03" +
		"\x02\x02\x02\u0161\u0157\x03\x02\x02\x02\u0161\u015C\x03\x02\x02\x02\u0162" +
		"A\x03\x02\x02\x025UW\\cejpt|\x83\x86\x8F\x94\x9C\xA3\xA7\xAE\xB6\xBD\xC6" +
		"\xCC\xD1\xDC\xDF\xE3\xE7\xEC\xF3\xF8\xFF\u0104\u0109\u010C\u0110\u0115" +
		"\u0119\u011C\u0121\u0125\u0129\u012D\u0132\u0137\u013D\u0141\u0149\u014D" +
		"\u0153\u015A\u015F\u0161";
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
	public docIndex(): DocIndexContext[];
	public docIndex(i: number): DocIndexContext;
	public docIndex(i?: number): DocIndexContext | DocIndexContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocIndexContext);
		} else {
			return this.getRuleContext(i, DocIndexContext);
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
	public docContent(): DocContentContext {
		return this.getRuleContext(0, DocContentContext);
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
	public link(): LinkContext[];
	public link(i: number): LinkContext;
	public link(i?: number): LinkContext | LinkContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LinkContext);
		} else {
			return this.getRuleContext(i, LinkContext);
		}
	}
	public DEPRECATED_TAG(): TerminalNode[];
	public DEPRECATED_TAG(i: number): TerminalNode;
	public DEPRECATED_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.DEPRECATED_TAG);
		} else {
			return this.getToken(TspDocParser.DEPRECATED_TAG, i);
		}
	}
	public DESCRIPTION_TAG(): TerminalNode[];
	public DESCRIPTION_TAG(i: number): TerminalNode;
	public DESCRIPTION_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.DESCRIPTION_TAG);
		} else {
			return this.getToken(TspDocParser.DESCRIPTION_TAG, i);
		}
	}
	public FIELD_TAG(): TerminalNode[];
	public FIELD_TAG(i: number): TerminalNode;
	public FIELD_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.FIELD_TAG);
		} else {
			return this.getToken(TspDocParser.FIELD_TAG, i);
		}
	}
	public FIRMWARE_TAG(): TerminalNode[];
	public FIRMWARE_TAG(i: number): TerminalNode;
	public FIRMWARE_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.FIRMWARE_TAG);
		} else {
			return this.getToken(TspDocParser.FIRMWARE_TAG, i);
		}
	}
	public INDEX_TAG(): TerminalNode[];
	public INDEX_TAG(i: number): TerminalNode;
	public INDEX_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.INDEX_TAG);
		} else {
			return this.getToken(TspDocParser.INDEX_TAG, i);
		}
	}
	public PARAM_TAG(): TerminalNode[];
	public PARAM_TAG(i: number): TerminalNode;
	public PARAM_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.PARAM_TAG);
		} else {
			return this.getToken(TspDocParser.PARAM_TAG, i);
		}
	}
	public RETURNS_TAG(): TerminalNode[];
	public RETURNS_TAG(i: number): TerminalNode;
	public RETURNS_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.RETURNS_TAG);
		} else {
			return this.getToken(TspDocParser.RETURNS_TAG, i);
		}
	}
	public READONLY_TAG(): TerminalNode[];
	public READONLY_TAG(i: number): TerminalNode;
	public READONLY_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.READONLY_TAG);
		} else {
			return this.getToken(TspDocParser.READONLY_TAG, i);
		}
	}
	public SEE_TAG(): TerminalNode[];
	public SEE_TAG(i: number): TerminalNode;
	public SEE_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.SEE_TAG);
		} else {
			return this.getToken(TspDocParser.SEE_TAG, i);
		}
	}
	public TSPLINK_TAG(): TerminalNode[];
	public TSPLINK_TAG(i: number): TerminalNode;
	public TSPLINK_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.TSPLINK_TAG);
		} else {
			return this.getToken(TspDocParser.TSPLINK_TAG, i);
		}
	}
	public TSPV1_TAG(): TerminalNode[];
	public TSPV1_TAG(i: number): TerminalNode;
	public TSPV1_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.TSPV1_TAG);
		} else {
			return this.getToken(TspDocParser.TSPV1_TAG, i);
		}
	}
	public TSPV2_TAG(): TerminalNode[];
	public TSPV2_TAG(i: number): TerminalNode;
	public TSPV2_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.TSPV2_TAG);
		} else {
			return this.getToken(TspDocParser.TSPV2_TAG, i);
		}
	}
	public TYPE_TAG(): TerminalNode[];
	public TYPE_TAG(i: number): TerminalNode;
	public TYPE_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.TYPE_TAG);
		} else {
			return this.getToken(TspDocParser.TYPE_TAG, i);
		}
	}
	public TYPEDEF_TAG(): TerminalNode[];
	public TYPEDEF_TAG(i: number): TerminalNode;
	public TYPEDEF_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.TYPEDEF_TAG);
		} else {
			return this.getToken(TspDocParser.TYPEDEF_TAG, i);
		}
	}
	public V1_TAG(): TerminalNode[];
	public V1_TAG(i: number): TerminalNode;
	public V1_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.V1_TAG);
		} else {
			return this.getToken(TspDocParser.V1_TAG, i);
		}
	}
	public V2_TAG(): TerminalNode[];
	public V2_TAG(i: number): TerminalNode;
	public V2_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.V2_TAG);
		} else {
			return this.getToken(TspDocParser.V2_TAG, i);
		}
	}
	public WRITEONLY_TAG(): TerminalNode[];
	public WRITEONLY_TAG(i: number): TerminalNode;
	public WRITEONLY_TAG(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.WRITEONLY_TAG);
		} else {
			return this.getToken(TspDocParser.WRITEONLY_TAG, i);
		}
	}
	public CLOSE(): TerminalNode[];
	public CLOSE(i: number): TerminalNode;
	public CLOSE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.CLOSE);
		} else {
			return this.getToken(TspDocParser.CLOSE, i);
		}
	}
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
	public PIPE(): TerminalNode[];
	public PIPE(i: number): TerminalNode;
	public PIPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.PIPE);
		} else {
			return this.getToken(TspDocParser.PIPE, i);
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
	public typeReturnEntry(): TypeReturnEntryContext | undefined {
		return this.tryGetRuleContext(0, TypeReturnEntryContext);
	}
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
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
export class NamespaceTypeContext extends TypeContext {
	public NAMESPACE(): TerminalNode { return this.getToken(TspDocParser.NAMESPACE, 0); }
	constructor(ctx: TypeContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNamespaceType) {
			listener.enterNamespaceType(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNamespaceType) {
			listener.exitNamespaceType(this);
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
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.COMMA);
		} else {
			return this.getToken(TspDocParser.COMMA, i);
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


export class TypeReturnEntryContext extends ParserRuleContext {
	public typeUnion(): TypeUnionContext | undefined {
		return this.tryGetRuleContext(0, TypeUnionContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.COMMA);
		} else {
			return this.getToken(TspDocParser.COMMA, i);
		}
	}
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typeReturnEntry; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypeReturnEntry) {
			listener.enterTypeReturnEntry(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypeReturnEntry) {
			listener.exitTypeReturnEntry(this);
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
	public EQUALS(): TerminalNode { return this.getToken(TspDocParser.EQUALS, 0); }
	public nameValue(): NameValueContext {
		return this.getRuleContext(0, NameValueContext);
	}
	public SQUARE_CLOSE(): TerminalNode { return this.getToken(TspDocParser.SQUARE_CLOSE, 0); }
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


export class NameValueContext extends ParserRuleContext {
	public NIL(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NIL, 0); }
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.FALSE, 0); }
	public num(): NumContext | undefined {
		return this.tryGetRuleContext(0, NumContext);
	}
	public SIGN(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.SIGN, 0); }
	public str(): StrContext | undefined {
		return this.tryGetRuleContext(0, StrContext);
	}
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAME, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_nameValue; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterNameValue) {
			listener.enterNameValue(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitNameValue) {
			listener.exitNameValue(this);
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


export class DocReturnsContext extends ParserRuleContext {
	public RETURNS_TAG(): TerminalNode { return this.getToken(TspDocParser.RETURNS_TAG, 0); }
	public CURLY_OPEN(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CURLY_OPEN, 0); }
	public typeReturnEntry(): TypeReturnEntryContext | undefined {
		return this.tryGetRuleContext(0, TypeReturnEntryContext);
	}
	public CURLY_CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CURLY_CLOSE, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
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
	public CURLY_OPEN(): TerminalNode { return this.getToken(TspDocParser.CURLY_OPEN, 0); }
	public CURLY_CLOSE(): TerminalNode { return this.getToken(TspDocParser.CURLY_CLOSE, 0); }
	public NAME(): TerminalNode { return this.getToken(TspDocParser.NAME, 0); }
	public typedefTypeUnion(): TypedefTypeUnionContext | undefined {
		return this.tryGetRuleContext(0, TypedefTypeUnionContext);
	}
	public FUNCTION(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.FUNCTION, 0); }
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.TABLE, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
	public PAREN_OPEN(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.PAREN_OPEN, 0); }
	public PAREN_CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.PAREN_CLOSE, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	public RETURN_ARROW(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.RETURN_ARROW, 0); }
	public typeReturnEntry(): TypeReturnEntryContext | undefined {
		return this.tryGetRuleContext(0, TypeReturnEntryContext);
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


export class TypedefTypeUnionContext extends ParserRuleContext {
	public type(): TypeContext[];
	public type(i: number): TypeContext;
	public type(i?: number): TypeContext | TypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeContext);
		} else {
			return this.getRuleContext(i, TypeContext);
		}
	}
	public typedefTypeUnionValue(): TypedefTypeUnionValueContext[];
	public typedefTypeUnionValue(i: number): TypedefTypeUnionValueContext;
	public typedefTypeUnionValue(i?: number): TypedefTypeUnionValueContext | TypedefTypeUnionValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypedefTypeUnionValueContext);
		} else {
			return this.getRuleContext(i, TypedefTypeUnionValueContext);
		}
	}
	public PIPE(): TerminalNode[];
	public PIPE(i: number): TerminalNode;
	public PIPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.PIPE);
		} else {
			return this.getToken(TspDocParser.PIPE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typedefTypeUnion; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypedefTypeUnion) {
			listener.enterTypedefTypeUnion(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypedefTypeUnion) {
			listener.exitTypedefTypeUnion(this);
		}
	}
}


export class TypedefTypeUnionValueContext extends ParserRuleContext {
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.FALSE, 0); }
	public num(): NumContext | undefined {
		return this.tryGetRuleContext(0, NumContext);
	}
	public SIGN(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.SIGN, 0); }
	public str(): StrContext | undefined {
		return this.tryGetRuleContext(0, StrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_typedefTypeUnionValue; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterTypedefTypeUnionValue) {
			listener.enterTypedefTypeUnionValue(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitTypedefTypeUnionValue) {
			listener.exitTypedefTypeUnionValue(this);
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


export class DocIndexContext extends ParserRuleContext {
	public INDEX_TAG(): TerminalNode { return this.getToken(TspDocParser.INDEX_TAG, 0); }
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
	public get ruleIndex(): number { return TspDocParser.RULE_docIndex; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterDocIndex) {
			listener.enterDocIndex(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitDocIndex) {
			listener.exitDocIndex(this);
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
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAME, 0); }
	public NAMESPACE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAMESPACE, 0); }
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
	public FIRMWARE_TAG(): TerminalNode { return this.getToken(TspDocParser.FIRMWARE_TAG, 0); }
	public firmwareEntry(): FirmwareEntryContext[];
	public firmwareEntry(i: number): FirmwareEntryContext;
	public firmwareEntry(i?: number): FirmwareEntryContext | FirmwareEntryContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FirmwareEntryContext);
		} else {
			return this.getRuleContext(i, FirmwareEntryContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.COMMA);
		} else {
			return this.getToken(TspDocParser.COMMA, i);
		}
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


export class FirmwareEntryContext extends ParserRuleContext {
	public FIRMWARE(): TerminalNode { return this.getToken(TspDocParser.FIRMWARE, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.GT, 0); }
	public LTE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.LTE, 0); }
	public EQUALS(): TerminalNode[];
	public EQUALS(i: number): TerminalNode;
	public EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspDocParser.EQUALS);
		} else {
			return this.getToken(TspDocParser.EQUALS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspDocParser.RULE_firmwareEntry; }
	// @Override
	public enterRule(listener: TspDocListener): void {
		if (listener.enterFirmwareEntry) {
			listener.enterFirmwareEntry(this);
		}
	}
	// @Override
	public exitRule(listener: TspDocListener): void {
		if (listener.exitFirmwareEntry) {
			listener.exitFirmwareEntry(this);
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
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAME, 0); }
	public NAMESPACE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAMESPACE, 0); }
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
	public NAME(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAME, 0); }
	public NAMESPACE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.NAMESPACE, 0); }
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


