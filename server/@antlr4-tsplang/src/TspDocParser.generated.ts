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
	public static readonly SQUARE_OPEN = 45;
	public static readonly SQUARE_CLOSE = 46;
	public static readonly TRUE = 47;
	public static readonly OTHER = 48;
	public static readonly NIL = 49;
	public static readonly NAME = 50;
	public static readonly NORMALSTRING = 51;
	public static readonly CHARSTRING = 52;
	public static readonly INT = 53;
	public static readonly HEX = 54;
	public static readonly FLOAT = 55;
	public static readonly HORIZONTAL_WS = 56;
	public static readonly VERTICAL_WS = 57;
	public static readonly LINK_TAG_END = 58;
	public static readonly LINK_TAG_TARGET = 59;
	public static readonly LINK_TAG_DISPLAY = 60;
	public static readonly LINK_TAG_WHITESPACE = 61;
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
	public static readonly RULE_nameValue = 13;
	public static readonly RULE_num = 14;
	public static readonly RULE_str = 15;
	public static readonly RULE_docReturns = 16;
	public static readonly RULE_docReadonly = 17;
	public static readonly RULE_docWriteonly = 18;
	public static readonly RULE_docType = 19;
	public static readonly RULE_docTypedef = 20;
	public static readonly RULE_docField = 21;
	public static readonly RULE_docIndex = 22;
	public static readonly RULE_docSee = 23;
	public static readonly RULE_seeTarget = 24;
	public static readonly RULE_docTsplink = 25;
	public static readonly RULE_docFirmware = 26;
	public static readonly RULE_firmwareEntry = 27;
	public static readonly RULE_docVersion = 28;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"docstring", "docblock", "docDeprecated", "docDescription", "docContent", 
		"link", "docParameter", "typeDeclaration", "typeEntry", "typeUnion", "type", 
		"typeList", "nameDeclaration", "nameValue", "num", "str", "docReturns", 
		"docReadonly", "docWriteonly", "docType", "docTypedef", "docField", "docIndex", 
		"docSee", "seeTarget", "docTsplink", "docFirmware", "firmwareEntry", "docVersion",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'--[[['", undefined, "'@'", undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, "'any'", undefined, "']]'", "'{'", undefined, "','", 
		"'.'", "'='", "'false'", "'>'", "'<='", "'('", "')'", "'|'", "'=>'", "'['", 
		"']'", "'true'", undefined, "'nil'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN", "FIRMWARE", "TAG_DELIMETER", "TAG_START", "DEPRECATED_TAG", 
		"DESCRIPTION_TAG", "FIELD_TAG", "FIRMWARE_TAG", "INDEX_TAG", "PARAM_TAG", 
		"RETURNS_TAG", "READONLY_TAG", "SEE_TAG", "TSPLINK_TAG", "TSPV1_TAG", 
		"TSPV2_TAG", "TYPE_TAG", "TYPEDEF_TAG", "V1_TAG", "V2_TAG", "WRITEONLY_TAG", 
		"LINK_TAG_START", "BOOLEAN", "FUNCTION", "NUMBER", "STRING", "TABLE", 
		"THREAD", "USERDATA", "ANY", "NAMESPACE", "CLOSE", "CURLY_OPEN", "CURLY_CLOSE", 
		"COMMA", "DOT", "EQUALS", "FALSE", "GT", "LTE", "PAREN_OPEN", "PAREN_CLOSE", 
		"PIPE", "RETURN_ARROW", "SQUARE_OPEN", "SQUARE_CLOSE", "TRUE", "OTHER", 
		"NIL", "NAME", "NORMALSTRING", "CHARSTRING", "INT", "HEX", "FLOAT", "HORIZONTAL_WS", 
		"VERTICAL_WS", "LINK_TAG_END", "LINK_TAG_TARGET", "LINK_TAG_DISPLAY", 
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
			this.state = 58;
			this.match(TspDocParser.OPEN);
			this.state = 59;
			this.docblock();
			this.state = 60;
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
			this.state = 79;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << TspDocParser.OPEN) | (1 << TspDocParser.FIRMWARE) | (1 << TspDocParser.TAG_DELIMETER) | (1 << TspDocParser.TAG_START) | (1 << TspDocParser.DEPRECATED_TAG) | (1 << TspDocParser.DESCRIPTION_TAG) | (1 << TspDocParser.FIELD_TAG) | (1 << TspDocParser.FIRMWARE_TAG) | (1 << TspDocParser.INDEX_TAG) | (1 << TspDocParser.PARAM_TAG) | (1 << TspDocParser.RETURNS_TAG) | (1 << TspDocParser.READONLY_TAG) | (1 << TspDocParser.SEE_TAG) | (1 << TspDocParser.TSPLINK_TAG) | (1 << TspDocParser.TSPV1_TAG) | (1 << TspDocParser.TSPV2_TAG) | (1 << TspDocParser.TYPE_TAG) | (1 << TspDocParser.TYPEDEF_TAG) | (1 << TspDocParser.WRITEONLY_TAG) | (1 << TspDocParser.LINK_TAG_START) | (1 << TspDocParser.BOOLEAN) | (1 << TspDocParser.FUNCTION) | (1 << TspDocParser.NUMBER) | (1 << TspDocParser.STRING) | (1 << TspDocParser.TABLE) | (1 << TspDocParser.THREAD) | (1 << TspDocParser.USERDATA) | (1 << TspDocParser.ANY) | (1 << TspDocParser.NAMESPACE))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (TspDocParser.CURLY_OPEN - 33)) | (1 << (TspDocParser.CURLY_CLOSE - 33)) | (1 << (TspDocParser.COMMA - 33)) | (1 << (TspDocParser.DOT - 33)) | (1 << (TspDocParser.EQUALS - 33)) | (1 << (TspDocParser.FALSE - 33)) | (1 << (TspDocParser.GT - 33)) | (1 << (TspDocParser.LTE - 33)) | (1 << (TspDocParser.PAREN_OPEN - 33)) | (1 << (TspDocParser.PAREN_CLOSE - 33)) | (1 << (TspDocParser.PIPE - 33)) | (1 << (TspDocParser.RETURN_ARROW - 33)) | (1 << (TspDocParser.SQUARE_OPEN - 33)) | (1 << (TspDocParser.SQUARE_CLOSE - 33)) | (1 << (TspDocParser.TRUE - 33)) | (1 << (TspDocParser.OTHER - 33)) | (1 << (TspDocParser.NIL - 33)) | (1 << (TspDocParser.NAME - 33)) | (1 << (TspDocParser.NORMALSTRING - 33)) | (1 << (TspDocParser.CHARSTRING - 33)) | (1 << (TspDocParser.INT - 33)) | (1 << (TspDocParser.HEX - 33)) | (1 << (TspDocParser.FLOAT - 33)) | (1 << (TspDocParser.HORIZONTAL_WS - 33)) | (1 << (TspDocParser.VERTICAL_WS - 33)) | (1 << (TspDocParser.LINK_TAG_END - 33)) | (1 << (TspDocParser.LINK_TAG_TARGET - 33)) | (1 << (TspDocParser.LINK_TAG_DISPLAY - 33)) | (1 << (TspDocParser.LINK_TAG_WHITESPACE - 33)))) !== 0)) {
				{
				this.state = 77;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case TspDocParser.DEPRECATED_TAG:
					{
					this.state = 62;
					this.docDeprecated();
					}
					break;
				case TspDocParser.DESCRIPTION_TAG:
					{
					this.state = 63;
					this.docDescription();
					}
					break;
				case TspDocParser.PARAM_TAG:
					{
					this.state = 64;
					this.docParameter();
					}
					break;
				case TspDocParser.RETURNS_TAG:
					{
					this.state = 65;
					this.docReturns();
					}
					break;
				case TspDocParser.READONLY_TAG:
					{
					this.state = 66;
					this.docReadonly();
					}
					break;
				case TspDocParser.WRITEONLY_TAG:
					{
					this.state = 67;
					this.docWriteonly();
					}
					break;
				case TspDocParser.TYPE_TAG:
					{
					this.state = 68;
					this.docType();
					}
					break;
				case TspDocParser.TYPEDEF_TAG:
					{
					this.state = 69;
					this.docTypedef();
					}
					break;
				case TspDocParser.FIELD_TAG:
					{
					this.state = 70;
					this.docField();
					}
					break;
				case TspDocParser.INDEX_TAG:
					{
					this.state = 71;
					this.docIndex();
					}
					break;
				case TspDocParser.SEE_TAG:
					{
					this.state = 72;
					this.docSee();
					}
					break;
				case TspDocParser.TSPLINK_TAG:
					{
					this.state = 73;
					this.docTsplink();
					}
					break;
				case TspDocParser.FIRMWARE_TAG:
					{
					this.state = 74;
					this.docFirmware();
					}
					break;
				case TspDocParser.TSPV1_TAG:
				case TspDocParser.TSPV2_TAG:
					{
					this.state = 75;
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
					this.state = 76;
					this.docContent();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 81;
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
			this.state = 82;
			this.match(TspDocParser.DEPRECATED_TAG);
			this.state = 84;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				this.state = 83;
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
			this.state = 86;
			this.match(TspDocParser.DESCRIPTION_TAG);
			this.state = 87;
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
			this.state = 97;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 89;
				this.link();
				this.state = 90;
				this.docContent();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 93;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 92;
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
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 95;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
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
			this.state = 99;
			this.match(TspDocParser.LINK_TAG_START);
			this.state = 100;
			this.match(TspDocParser.LINK_TAG_TARGET);
			this.state = 102;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.LINK_TAG_DISPLAY) {
				{
				this.state = 101;
				this.match(TspDocParser.LINK_TAG_DISPLAY);
				}
			}

			this.state = 104;
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
			this.state = 106;
			this.match(TspDocParser.PARAM_TAG);
			this.state = 108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 107;
				this.typeDeclaration();
				}
			}

			this.state = 110;
			this.nameDeclaration();
			this.state = 112;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 111;
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
			this.state = 114;
			this.match(TspDocParser.CURLY_OPEN);
			this.state = 115;
			this.typeEntry();
			this.state = 116;
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
			this.state = 120;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 118;
				this.type();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 119;
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
			this.state = 122;
			this.type();
			this.state = 123;
			this.match(TspDocParser.PIPE);
			this.state = 130;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 125;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 124;
						this.typeUnion();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 127;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 2:
				{
				this.state = 129;
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
			this.state = 155;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NIL:
				_localctx = new NilTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 132;
				this.match(TspDocParser.NIL);
				}
				break;
			case TspDocParser.BOOLEAN:
				_localctx = new BooleanTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 133;
				this.match(TspDocParser.BOOLEAN);
				}
				break;
			case TspDocParser.NUMBER:
				_localctx = new NumberTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 134;
				this.match(TspDocParser.NUMBER);
				}
				break;
			case TspDocParser.STRING:
				_localctx = new StringTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 135;
				this.match(TspDocParser.STRING);
				}
				break;
			case TspDocParser.FUNCTION:
				_localctx = new FunctionTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 136;
				this.match(TspDocParser.FUNCTION);
				this.state = 147;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.PAREN_OPEN) {
					{
					this.state = 137;
					this.match(TspDocParser.PAREN_OPEN);
					this.state = 141;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & ((1 << (TspDocParser.BOOLEAN - 23)) | (1 << (TspDocParser.FUNCTION - 23)) | (1 << (TspDocParser.NUMBER - 23)) | (1 << (TspDocParser.STRING - 23)) | (1 << (TspDocParser.TABLE - 23)) | (1 << (TspDocParser.THREAD - 23)) | (1 << (TspDocParser.USERDATA - 23)) | (1 << (TspDocParser.ANY - 23)) | (1 << (TspDocParser.NAMESPACE - 23)) | (1 << (TspDocParser.NIL - 23)) | (1 << (TspDocParser.NAME - 23)))) !== 0)) {
						{
						{
						this.state = 138;
						this.typeList();
						}
						}
						this.state = 143;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 144;
					this.match(TspDocParser.PAREN_CLOSE);
					this.state = 145;
					this.match(TspDocParser.RETURN_ARROW);
					this.state = 146;
					this.typeEntry();
					}
				}

				}
				break;
			case TspDocParser.USERDATA:
				_localctx = new UserdataTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 149;
				this.match(TspDocParser.USERDATA);
				}
				break;
			case TspDocParser.THREAD:
				_localctx = new ThreadTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 150;
				this.match(TspDocParser.THREAD);
				}
				break;
			case TspDocParser.TABLE:
				_localctx = new TableTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 151;
				this.match(TspDocParser.TABLE);
				}
				break;
			case TspDocParser.NAMESPACE:
				_localctx = new NamespaceTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 152;
				this.match(TspDocParser.NAMESPACE);
				}
				break;
			case TspDocParser.ANY:
				_localctx = new AnyTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 153;
				this.match(TspDocParser.ANY);
				}
				break;
			case TspDocParser.NAME:
				_localctx = new NameTypeContext(_localctx);
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 154;
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
			this.state = 157;
			this.type();
			this.state = 158;
			this.match(TspDocParser.COMMA);
			this.state = 165;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				{
				this.state = 160;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 159;
						this.typeList();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 162;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 2:
				{
				this.state = 164;
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
		try {
			this.state = 174;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NAME:
				_localctx = new NameRequiredContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 167;
				this.match(TspDocParser.NAME);
				}
				break;
			case TspDocParser.SQUARE_OPEN:
				_localctx = new NameOptionalContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 168;
				this.match(TspDocParser.SQUARE_OPEN);
				this.state = 169;
				this.match(TspDocParser.NAME);
				this.state = 170;
				this.match(TspDocParser.EQUALS);
				this.state = 171;
				this.nameValue();
				this.state = 172;
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
		this.enterRule(_localctx, 26, TspDocParser.RULE_nameValue);
		try {
			this.state = 182;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NIL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 176;
				this.match(TspDocParser.NIL);
				}
				break;
			case TspDocParser.TRUE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 177;
				this.match(TspDocParser.TRUE);
				}
				break;
			case TspDocParser.FALSE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 178;
				this.match(TspDocParser.FALSE);
				}
				break;
			case TspDocParser.INT:
			case TspDocParser.HEX:
			case TspDocParser.FLOAT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 179;
				this.num();
				}
				break;
			case TspDocParser.NORMALSTRING:
			case TspDocParser.CHARSTRING:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 180;
				this.str();
				}
				break;
			case TspDocParser.NAME:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 181;
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
		this.enterRule(_localctx, 28, TspDocParser.RULE_num);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 184;
			_la = this._input.LA(1);
			if (!(((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (TspDocParser.INT - 53)) | (1 << (TspDocParser.HEX - 53)) | (1 << (TspDocParser.FLOAT - 53)))) !== 0))) {
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
		this.enterRule(_localctx, 30, TspDocParser.RULE_str);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 186;
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
		this.enterRule(_localctx, 32, TspDocParser.RULE_docReturns);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 188;
			this.match(TspDocParser.RETURNS_TAG);
			this.state = 196;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 189;
				this.match(TspDocParser.CURLY_OPEN);
				this.state = 192;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
				case 1:
					{
					this.state = 190;
					this.typeEntry();
					}
					break;

				case 2:
					{
					this.state = 191;
					this.typeList();
					}
					break;
				}
				this.state = 194;
				this.match(TspDocParser.CURLY_CLOSE);
				}
				break;
			}
			this.state = 199;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				{
				this.state = 198;
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
		this.enterRule(_localctx, 34, TspDocParser.RULE_docReadonly);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 201;
			this.match(TspDocParser.READONLY_TAG);
			this.state = 203;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 202;
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
		this.enterRule(_localctx, 36, TspDocParser.RULE_docWriteonly);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 205;
			this.match(TspDocParser.WRITEONLY_TAG);
			this.state = 207;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 206;
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
		this.enterRule(_localctx, 38, TspDocParser.RULE_docType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 209;
			this.match(TspDocParser.TYPE_TAG);
			this.state = 210;
			this.typeDeclaration();
			this.state = 212;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 211;
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
		this.enterRule(_localctx, 40, TspDocParser.RULE_docTypedef);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 214;
			this.match(TspDocParser.TYPEDEF_TAG);
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 215;
				this.typeDeclaration();
				}
			}

			this.state = 218;
			this.match(TspDocParser.NAME);
			this.state = 220;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 219;
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
		this.enterRule(_localctx, 42, TspDocParser.RULE_docField);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 222;
			this.match(TspDocParser.FIELD_TAG);
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspDocParser.CURLY_OPEN) {
				{
				this.state = 223;
				this.typeDeclaration();
				}
			}

			this.state = 226;
			this.nameDeclaration();
			this.state = 228;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
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
	public docIndex(): DocIndexContext {
		let _localctx: DocIndexContext = new DocIndexContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, TspDocParser.RULE_docIndex);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 230;
			this.match(TspDocParser.INDEX_TAG);
			this.state = 231;
			this.typeDeclaration();
			this.state = 233;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 232;
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
		this.enterRule(_localctx, 46, TspDocParser.RULE_docSee);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 235;
			this.match(TspDocParser.SEE_TAG);
			this.state = 236;
			this.seeTarget();
			this.state = 238;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 237;
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
		this.enterRule(_localctx, 48, TspDocParser.RULE_seeTarget);
		try {
			let _alt: number;
			this.state = 249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.NAME:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 240;
				this.match(TspDocParser.NAME);
				this.state = 245;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 241;
						this.match(TspDocParser.DOT);
						this.state = 242;
						this.match(TspDocParser.NAME);
						}
						}
					}
					this.state = 247;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
				}
				}
				break;
			case TspDocParser.LINK_TAG_START:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 248;
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
		this.enterRule(_localctx, 50, TspDocParser.RULE_docTsplink);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 251;
			this.match(TspDocParser.TSPLINK_TAG);
			this.state = 253;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				{
				this.state = 252;
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
		this.enterRule(_localctx, 52, TspDocParser.RULE_docFirmware);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 255;
			this.match(TspDocParser.FIRMWARE_TAG);
			this.state = 257;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 256;
					this.firmwareEntry();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 259;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 33, this._ctx);
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
	public firmwareEntry(): FirmwareEntryContext {
		let _localctx: FirmwareEntryContext = new FirmwareEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, TspDocParser.RULE_firmwareEntry);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 265;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.GT:
				{
				this.state = 261;
				this.match(TspDocParser.GT);
				}
				break;
			case TspDocParser.LTE:
				{
				this.state = 262;
				this.match(TspDocParser.LTE);
				}
				break;
			case TspDocParser.EQUALS:
				{
				this.state = 263;
				this.match(TspDocParser.EQUALS);
				this.state = 264;
				this.match(TspDocParser.EQUALS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 267;
			this.match(TspDocParser.FIRMWARE);
			this.state = 269;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				this.state = 268;
				this.match(TspDocParser.COMMA);
				}
				break;
			}
			this.state = 272;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 271;
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
		this.enterRule(_localctx, 56, TspDocParser.RULE_docVersion);
		let _la: number;
		try {
			let _alt: number;
			this.state = 298;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case TspDocParser.TSPV1_TAG:
				_localctx = new Version1Context(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 274;
				this.match(TspDocParser.TSPV1_TAG);
				this.state = 284;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.V2_TAG) {
					{
					this.state = 275;
					this.match(TspDocParser.V2_TAG);
					this.state = 276;
					this.match(TspDocParser.NAME);
					this.state = 281;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 37, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 277;
							this.match(TspDocParser.DOT);
							this.state = 278;
							this.match(TspDocParser.NAME);
							}
							}
						}
						this.state = 283;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 37, this._ctx);
					}
					}
				}

				}
				break;
			case TspDocParser.TSPV2_TAG:
				_localctx = new Version2Context(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 286;
				this.match(TspDocParser.TSPV2_TAG);
				this.state = 296;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspDocParser.V1_TAG) {
					{
					this.state = 287;
					this.match(TspDocParser.V1_TAG);
					this.state = 288;
					this.match(TspDocParser.NAME);
					this.state = 293;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 39, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 289;
							this.match(TspDocParser.DOT);
							this.state = 290;
							this.match(TspDocParser.NAME);
							}
							}
						}
						this.state = 295;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 39, this._ctx);
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03?\u012F\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x03\x02\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03P\n\x03\f\x03\x0E\x03S\v\x03\x03" +
		"\x04\x03\x04\x05\x04W\n\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x06\x06`\n\x06\r\x06\x0E\x06a\x05\x06d\n\x06\x03\x07\x03" +
		"\x07\x03\x07\x05\x07i\n\x07\x03\x07\x03\x07\x03\b\x03\b\x05\bo\n\b\x03" +
		"\b\x03\b\x05\bs\n\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x05\n{\n\n\x03" +
		"\v\x03\v\x03\v\x06\v\x80\n\v\r\v\x0E\v\x81\x03\v\x05\v\x85\n\v\x03\f\x03" +
		"\f\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f\x8E\n\f\f\f\x0E\f\x91\v\f\x03\f" +
		"\x03\f\x03\f\x05\f\x96\n\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\x9E" +
		"\n\f\x03\r\x03\r\x03\r\x06\r\xA3\n\r\r\r\x0E\r\xA4\x03\r\x05\r\xA8\n\r" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xB1\n" +
		"\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xB9\n\x0F" +
		"\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12" +
		"\xC3\n\x12\x03\x12\x03\x12\x05\x12\xC7\n\x12\x03\x12\x05\x12\xCA\n\x12" +
		"\x03\x13\x03\x13\x05\x13\xCE\n\x13\x03\x14\x03\x14\x05\x14\xD2\n\x14\x03" +
		"\x15\x03\x15\x03\x15\x05\x15\xD7\n\x15\x03\x16\x03\x16\x05\x16\xDB\n\x16" +
		"\x03\x16\x03\x16\x05\x16\xDF\n\x16\x03\x17\x03\x17\x05\x17\xE3\n\x17\x03" +
		"\x17\x03\x17\x05\x17\xE7\n\x17\x03\x18\x03\x18\x03\x18\x05\x18\xEC\n\x18" +
		"\x03\x19\x03\x19\x03\x19\x05\x19\xF1\n\x19\x03\x1A\x03\x1A\x03\x1A\x07" +
		"\x1A\xF6\n\x1A\f\x1A\x0E\x1A\xF9\v\x1A\x03\x1A\x05\x1A\xFC\n\x1A\x03\x1B" +
		"\x03\x1B\x05\x1B\u0100\n\x1B\x03\x1C\x03\x1C\x06\x1C\u0104\n\x1C\r\x1C" +
		"\x0E\x1C\u0105\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\u010C\n\x1D\x03" +
		"\x1D\x03\x1D\x05\x1D\u0110\n\x1D\x03\x1D\x05\x1D\u0113\n\x1D\x03\x1E\x03" +
		"\x1E\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u011A\n\x1E\f\x1E\x0E\x1E\u011D\v" +
		"\x1E\x05\x1E\u011F\n\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x07\x1E" +
		"\u0126\n\x1E\f\x1E\x0E\x1E\u0129\v\x1E\x05\x1E\u012B\n\x1E\x05\x1E\u012D" +
		"\n\x1E\x03\x1E\x02\x02\x02\x1F\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
		" \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
		"\x02\x05\x04\x02\x07\x17\"\"\x03\x0279\x03\x0256\x02\u0156\x02<\x03\x02" +
		"\x02\x02\x04Q\x03\x02\x02\x02\x06T\x03\x02\x02\x02\bX\x03\x02\x02\x02" +
		"\nc\x03\x02\x02\x02\fe\x03\x02\x02\x02\x0El\x03\x02\x02\x02\x10t\x03\x02" +
		"\x02\x02\x12z\x03\x02\x02\x02\x14|\x03\x02\x02\x02\x16\x9D\x03\x02\x02" +
		"\x02\x18\x9F\x03\x02\x02\x02\x1A\xB0\x03\x02\x02\x02\x1C\xB8\x03\x02\x02" +
		"\x02\x1E\xBA\x03\x02\x02\x02 \xBC\x03\x02\x02\x02\"\xBE\x03\x02\x02\x02" +
		"$\xCB\x03\x02\x02\x02&\xCF\x03\x02\x02\x02(\xD3\x03\x02\x02\x02*\xD8\x03" +
		"\x02\x02\x02,\xE0\x03\x02\x02\x02.\xE8\x03\x02\x02\x020\xED\x03\x02\x02" +
		"\x022\xFB\x03\x02\x02\x024\xFD\x03\x02\x02\x026\u0101\x03\x02\x02\x02" +
		"8\u010B\x03\x02\x02\x02:\u012C\x03\x02\x02\x02<=\x07\x03\x02\x02=>\x05" +
		"\x04\x03\x02>?\x07\"\x02\x02?\x03\x03\x02\x02\x02@P\x05\x06\x04\x02AP" +
		"\x05\b\x05\x02BP\x05\x0E\b\x02CP\x05\"\x12\x02DP\x05$\x13\x02EP\x05&\x14" +
		"\x02FP\x05(\x15\x02GP\x05*\x16\x02HP\x05,\x17\x02IP\x05.\x18\x02JP\x05" +
		"0\x19\x02KP\x054\x1B\x02LP\x056\x1C\x02MP\x05:\x1E\x02NP\x05\n\x06\x02" +
		"O@\x03\x02\x02\x02OA\x03\x02\x02\x02OB\x03\x02\x02\x02OC\x03\x02\x02\x02" +
		"OD\x03\x02\x02\x02OE\x03\x02\x02\x02OF\x03\x02\x02\x02OG\x03\x02\x02\x02" +
		"OH\x03\x02\x02\x02OI\x03\x02\x02\x02OJ\x03\x02\x02\x02OK\x03\x02\x02\x02" +
		"OL\x03\x02\x02\x02OM\x03\x02\x02\x02ON\x03\x02\x02\x02PS\x03\x02\x02\x02" +
		"QO\x03\x02\x02\x02QR\x03\x02\x02\x02R\x05\x03\x02\x02\x02SQ\x03\x02\x02" +
		"\x02TV\x07\x07\x02\x02UW\x05\n\x06\x02VU\x03\x02\x02\x02VW\x03\x02\x02" +
		"\x02W\x07\x03\x02\x02\x02XY\x07\b\x02\x02YZ\x05\n\x06\x02Z\t\x03\x02\x02" +
		"\x02[\\\x05\f\x07\x02\\]\x05\n\x06\x02]d\x03\x02\x02\x02^`\n\x02\x02\x02" +
		"_^\x03\x02\x02\x02`a\x03\x02\x02\x02a_\x03\x02\x02\x02ab\x03\x02\x02\x02" +
		"bd\x03\x02\x02\x02c[\x03\x02\x02\x02c_\x03\x02\x02\x02d\v\x03\x02\x02" +
		"\x02ef\x07\x18\x02\x02fh\x07=\x02\x02gi\x07>\x02\x02hg\x03\x02\x02\x02" +
		"hi\x03\x02\x02\x02ij\x03\x02\x02\x02jk\x07<\x02\x02k\r\x03\x02\x02\x02" +
		"ln\x07\f\x02\x02mo\x05\x10\t\x02nm\x03\x02\x02\x02no\x03\x02\x02\x02o" +
		"p\x03\x02\x02\x02pr\x05\x1A\x0E\x02qs\x05\n\x06\x02rq\x03\x02\x02\x02" +
		"rs\x03\x02\x02\x02s\x0F\x03\x02\x02\x02tu\x07#\x02\x02uv\x05\x12\n\x02" +
		"vw\x07$\x02\x02w\x11\x03\x02\x02\x02x{\x05\x16\f\x02y{\x05\x14\v\x02z" +
		"x\x03\x02\x02\x02zy\x03\x02\x02\x02{\x13\x03\x02\x02\x02|}\x05\x16\f\x02" +
		"}\x84\x07-\x02\x02~\x80\x05\x14\v\x02\x7F~\x03\x02\x02\x02\x80\x81\x03" +
		"\x02\x02\x02\x81\x7F\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x85\x03" +
		"\x02\x02\x02\x83\x85\x05\x16\f\x02\x84\x7F\x03\x02\x02\x02\x84\x83\x03" +
		"\x02\x02\x02\x85\x15\x03\x02\x02\x02\x86\x9E\x073\x02\x02\x87\x9E\x07" +
		"\x19\x02\x02\x88\x9E\x07\x1B\x02\x02\x89\x9E\x07\x1C\x02\x02\x8A\x95\x07" +
		"\x1A\x02\x02\x8B\x8F\x07+\x02\x02\x8C\x8E\x05\x18\r\x02\x8D\x8C\x03\x02" +
		"\x02\x02\x8E\x91\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x8F\x90\x03\x02" +
		"\x02\x02\x90\x92\x03\x02\x02\x02\x91\x8F\x03\x02\x02\x02\x92\x93\x07," +
		"\x02\x02\x93\x94\x07.\x02\x02\x94\x96\x05\x12\n\x02\x95\x8B\x03\x02\x02" +
		"\x02\x95\x96\x03\x02\x02\x02\x96\x9E\x03\x02\x02\x02\x97\x9E\x07\x1F\x02" +
		"\x02\x98\x9E\x07\x1E\x02\x02\x99\x9E\x07\x1D\x02\x02\x9A\x9E\x07!\x02" +
		"\x02\x9B\x9E\x07 \x02\x02\x9C\x9E\x074\x02\x02\x9D\x86\x03\x02\x02\x02" +
		"\x9D\x87\x03\x02\x02\x02\x9D\x88\x03\x02\x02\x02\x9D\x89\x03\x02\x02\x02" +
		"\x9D\x8A\x03\x02\x02\x02\x9D\x97\x03\x02\x02\x02\x9D\x98\x03\x02\x02\x02" +
		"\x9D\x99\x03\x02\x02\x02\x9D\x9A\x03\x02\x02\x02\x9D\x9B\x03\x02\x02\x02" +
		"\x9D\x9C\x03\x02\x02\x02\x9E\x17\x03\x02\x02\x02\x9F\xA0\x05\x16\f\x02" +
		"\xA0\xA7\x07%\x02\x02\xA1\xA3\x05\x18\r\x02\xA2\xA1\x03\x02\x02\x02\xA3" +
		"\xA4\x03\x02\x02\x02\xA4\xA2\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5" +
		"\xA8\x03\x02\x02\x02\xA6\xA8\x05\x16\f\x02\xA7\xA2\x03\x02\x02\x02\xA7" +
		"\xA6\x03\x02\x02\x02\xA8\x19\x03\x02\x02\x02\xA9\xB1\x074\x02\x02\xAA" +
		"\xAB\x07/\x02\x02\xAB\xAC\x074\x02\x02\xAC\xAD\x07\'\x02\x02\xAD\xAE\x05" +
		"\x1C\x0F\x02\xAE\xAF\x070\x02\x02\xAF\xB1\x03\x02\x02\x02\xB0\xA9\x03" +
		"\x02\x02\x02\xB0\xAA\x03\x02\x02\x02\xB1\x1B\x03\x02\x02\x02\xB2\xB9\x07" +
		"3\x02\x02\xB3\xB9\x071\x02\x02\xB4\xB9\x07(\x02\x02\xB5\xB9\x05\x1E\x10" +
		"\x02\xB6\xB9\x05 \x11\x02\xB7\xB9\x074\x02\x02\xB8\xB2\x03\x02\x02\x02" +
		"\xB8\xB3\x03\x02\x02\x02\xB8\xB4\x03\x02\x02\x02\xB8\xB5\x03\x02\x02\x02" +
		"\xB8\xB6\x03\x02\x02\x02\xB8\xB7\x03\x02\x02\x02\xB9\x1D\x03\x02\x02\x02" +
		"\xBA\xBB\t\x03\x02\x02\xBB\x1F\x03\x02\x02\x02\xBC\xBD\t\x04\x02\x02\xBD" +
		"!\x03\x02\x02\x02\xBE\xC6\x07\r\x02\x02\xBF\xC2\x07#\x02\x02\xC0\xC3\x05" +
		"\x12\n\x02\xC1\xC3\x05\x18\r\x02\xC2\xC0\x03\x02\x02\x02\xC2\xC1\x03\x02" +
		"\x02\x02\xC3\xC4\x03\x02\x02\x02\xC4\xC5\x07$\x02\x02\xC5\xC7\x03\x02" +
		"\x02\x02\xC6\xBF\x03\x02\x02\x02\xC6\xC7\x03\x02\x02\x02\xC7\xC9\x03\x02" +
		"\x02\x02\xC8\xCA\x05\n\x06\x02\xC9\xC8\x03\x02\x02\x02\xC9\xCA\x03\x02" +
		"\x02\x02\xCA#\x03\x02\x02\x02\xCB\xCD\x07\x0E\x02\x02\xCC\xCE\x05\n\x06" +
		"\x02\xCD\xCC\x03\x02\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE%\x03\x02\x02" +
		"\x02\xCF\xD1\x07\x17\x02\x02\xD0\xD2\x05\n\x06\x02\xD1\xD0\x03\x02\x02" +
		"\x02\xD1\xD2\x03\x02\x02\x02\xD2\'\x03\x02\x02\x02\xD3\xD4\x07\x13\x02" +
		"\x02\xD4\xD6\x05\x10\t\x02\xD5\xD7\x05\n\x06\x02\xD6\xD5\x03\x02\x02\x02" +
		"\xD6\xD7\x03\x02\x02\x02\xD7)\x03\x02\x02\x02\xD8\xDA\x07\x14\x02\x02" +
		"\xD9\xDB\x05\x10\t\x02\xDA\xD9\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02" +
		"\xDB\xDC\x03\x02\x02\x02\xDC\xDE\x074\x02\x02\xDD\xDF\x05\n\x06\x02\xDE" +
		"\xDD\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF+\x03\x02\x02\x02\xE0" +
		"\xE2\x07\t\x02\x02\xE1\xE3\x05\x10\t\x02\xE2\xE1\x03\x02\x02\x02\xE2\xE3" +
		"\x03\x02\x02\x02\xE3\xE4\x03\x02\x02\x02\xE4\xE6\x05\x1A\x0E\x02\xE5\xE7" +
		"\x05\n\x06\x02\xE6\xE5\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7-\x03" +
		"\x02\x02\x02\xE8\xE9\x07\v\x02\x02\xE9\xEB\x05\x10\t\x02\xEA\xEC\x05\n" +
		"\x06\x02\xEB\xEA\x03\x02\x02\x02\xEB\xEC\x03\x02\x02\x02\xEC/\x03\x02" +
		"\x02\x02\xED\xEE\x07\x0F\x02\x02\xEE\xF0\x052\x1A\x02\xEF\xF1\x05\n\x06" +
		"\x02\xF0\xEF\x03\x02\x02\x02\xF0\xF1\x03\x02\x02\x02\xF11\x03\x02\x02" +
		"\x02\xF2\xF7\x074\x02\x02\xF3\xF4\x07&\x02\x02\xF4\xF6\x074\x02\x02\xF5" +
		"\xF3\x03\x02\x02\x02\xF6\xF9\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF7" +
		"\xF8\x03\x02\x02\x02\xF8\xFC\x03\x02\x02\x02\xF9\xF7\x03\x02\x02\x02\xFA" +
		"\xFC\x05\f\x07\x02\xFB\xF2\x03\x02\x02\x02\xFB\xFA\x03\x02\x02\x02\xFC" +
		"3\x03\x02\x02\x02\xFD\xFF\x07\x10\x02\x02\xFE\u0100\x05\n\x06\x02\xFF" +
		"\xFE\x03\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u01005\x03\x02\x02\x02" +
		"\u0101\u0103\x07\n\x02\x02\u0102\u0104\x058\x1D\x02\u0103\u0102\x03\x02" +
		"\x02\x02\u0104\u0105\x03\x02\x02\x02\u0105\u0103\x03\x02\x02\x02\u0105" +
		"\u0106\x03\x02\x02\x02\u01067\x03\x02\x02\x02\u0107\u010C\x07)\x02\x02" +
		"\u0108\u010C\x07*\x02\x02\u0109\u010A\x07\'\x02\x02\u010A\u010C\x07\'" +
		"\x02\x02\u010B\u0107\x03\x02\x02\x02\u010B\u0108\x03\x02\x02\x02\u010B" +
		"\u0109\x03\x02\x02\x02\u010C\u010D\x03\x02\x02\x02\u010D\u010F\x07\x04" +
		"\x02\x02\u010E\u0110\x07%\x02\x02\u010F\u010E\x03\x02\x02\x02\u010F\u0110" +
		"\x03\x02\x02\x02\u0110\u0112\x03\x02\x02\x02\u0111\u0113\x056\x1C\x02" +
		"\u0112\u0111\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u01139\x03\x02" +
		"\x02\x02\u0114\u011E\x07\x11\x02\x02\u0115\u0116\x07\x16\x02\x02\u0116" +
		"\u011B\x074\x02\x02\u0117\u0118\x07&\x02\x02\u0118\u011A\x074\x02\x02" +
		"\u0119\u0117\x03\x02\x02\x02\u011A\u011D\x03\x02\x02\x02\u011B\u0119\x03" +
		"\x02\x02\x02\u011B\u011C\x03\x02\x02\x02\u011C\u011F\x03\x02\x02\x02\u011D" +
		"\u011B\x03\x02\x02\x02\u011E\u0115\x03\x02\x02\x02\u011E\u011F\x03\x02" +
		"\x02\x02\u011F\u012D\x03\x02\x02\x02\u0120\u012A\x07\x12\x02\x02\u0121" +
		"\u0122\x07\x15\x02\x02\u0122\u0127\x074\x02\x02\u0123\u0124\x07&\x02\x02" +
		"\u0124\u0126\x074\x02\x02\u0125\u0123\x03\x02\x02\x02\u0126\u0129\x03" +
		"\x02\x02\x02\u0127\u0125\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128" +
		"\u012B\x03\x02\x02\x02\u0129\u0127\x03\x02\x02\x02\u012A\u0121\x03\x02" +
		"\x02\x02\u012A\u012B\x03\x02\x02\x02\u012B\u012D\x03\x02\x02\x02\u012C" +
		"\u0114\x03\x02\x02\x02\u012C\u0120\x03\x02\x02\x02\u012D;\x03\x02\x02" +
		"\x02,OQVachnrz\x81\x84\x8F\x95\x9D\xA4\xA7\xB0\xB8\xC2\xC6\xC9\xCD\xD1" +
		"\xD6\xDA\xDE\xE2\xE6\xEB\xF0\xF7\xFB\xFF\u0105\u010B\u010F\u0112\u011B" +
		"\u011E\u0127\u012A\u012C";
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
	public link(): LinkContext | undefined {
		return this.tryGetRuleContext(0, LinkContext);
	}
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
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
	public CURLY_CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.CURLY_CLOSE, 0); }
	public docContent(): DocContentContext | undefined {
		return this.tryGetRuleContext(0, DocContentContext);
	}
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
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(TspDocParser.COMMA, 0); }
	public docFirmware(): DocFirmwareContext | undefined {
		return this.tryGetRuleContext(0, DocFirmwareContext);
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


