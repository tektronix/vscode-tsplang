// Generated from ./TspShebangParser.g4 by ANTLR 4.7.3-SNAPSHOT


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

import { TspShebangListener } from "./TspShebangListener.generated";

export class TspShebangParser extends Parser {
	public static readonly OPEN = 1;
	public static readonly CLOSE = 2;
	public static readonly DELIMITER = 3;
	public static readonly HORIZONTAL_WS = 4;
	public static readonly PLUGIN_FIRMWARE_START = 5;
	public static readonly PLUGIN = 6;
	public static readonly FIRMWARE = 7;
	public static readonly NODE_EQUALS = 8;
	public static readonly NODE = 9;
	public static readonly NODE_INDEX_OPEN = 10;
	public static readonly NODE_INDEX_CLOSE = 11;
	public static readonly NODE_NUMBER = 12;
	public static readonly RULE_shebang = 0;
	public static readonly RULE_plugin = 1;
	public static readonly RULE_node = 2;
	public static readonly RULE_nodeNumber = 3;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"shebang", "plugin", "node", "nodeNumber",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'#!'", undefined, undefined, undefined, "'@'", undefined, 
		undefined, "'='", undefined, "'['", "']'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN", "CLOSE", "DELIMITER", "HORIZONTAL_WS", "PLUGIN_FIRMWARE_START", 
		"PLUGIN", "FIRMWARE", "NODE_EQUALS", "NODE", "NODE_INDEX_OPEN", "NODE_INDEX_CLOSE", 
		"NODE_NUMBER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(TspShebangParser._LITERAL_NAMES, TspShebangParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return TspShebangParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "TspShebangParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return TspShebangParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return TspShebangParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(TspShebangParser._ATN, this);
	}
	// @RuleVersion(0)
	public shebang(): ShebangContext {
		let _localctx: ShebangContext = new ShebangContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, TspShebangParser.RULE_shebang);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 8;
			this.match(TspShebangParser.OPEN);
			this.state = 20;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspShebangParser.PLUGIN) {
				{
				this.state = 9;
				this.plugin();
				this.state = 14;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
				while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1 + 1) {
						{
						{
						this.state = 10;
						this.match(TspShebangParser.DELIMITER);
						this.state = 11;
						this.node();
						}
						}
					}
					this.state = 16;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
				}
				this.state = 18;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === TspShebangParser.DELIMITER) {
					{
					this.state = 17;
					this.match(TspShebangParser.DELIMITER);
					}
				}

				}
			}

			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspShebangParser.CLOSE) {
				{
				this.state = 22;
				this.match(TspShebangParser.CLOSE);
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
	public plugin(): PluginContext {
		let _localctx: PluginContext = new PluginContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, TspShebangParser.RULE_plugin);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 25;
			this.match(TspShebangParser.PLUGIN);
			this.state = 28;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === TspShebangParser.PLUGIN_FIRMWARE_START) {
				{
				this.state = 26;
				this.match(TspShebangParser.PLUGIN_FIRMWARE_START);
				this.state = 27;
				this.match(TspShebangParser.FIRMWARE);
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
	public node(): NodeContext {
		let _localctx: NodeContext = new NodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, TspShebangParser.RULE_node);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 30;
			this.match(TspShebangParser.NODE);
			this.state = 31;
			this.match(TspShebangParser.NODE_INDEX_OPEN);
			this.state = 32;
			this.nodeNumber();
			this.state = 33;
			this.match(TspShebangParser.NODE_INDEX_CLOSE);
			this.state = 34;
			this.match(TspShebangParser.NODE_EQUALS);
			this.state = 35;
			this.plugin();
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
	public nodeNumber(): NodeNumberContext {
		let _localctx: NodeNumberContext = new NodeNumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, TspShebangParser.RULE_nodeNumber);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 37;
			this.match(TspShebangParser.NODE_NUMBER);

			// Node number must be in the interval [1, 64].
			const num = Number(_localctx.text);
			if (num < 1) this.notifyErrorListeners("Node number must be greater than 0");
			if (num > 64) this.notifyErrorListeners("Node number must be less than 65");
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x0E+\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x07\x02\x0F\n\x02\f\x02\x0E\x02\x12\v\x02\x03\x02\x05\x02\x15" +
		"\n\x02\x05\x02\x17\n\x02\x03\x02\x05\x02\x1A\n\x02\x03\x03\x03\x03\x03" +
		"\x03\x05\x03\x1F\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x10\x02\x02\x06\x02\x02\x04" +
		"\x02\x06\x02\b\x02\x02\x02\x02+\x02\n\x03\x02\x02\x02\x04\x1B\x03\x02" +
		"\x02\x02\x06 \x03\x02\x02\x02\b\'\x03\x02\x02\x02\n\x16\x07\x03\x02\x02" +
		"\v\x10\x05\x04\x03\x02\f\r\x07\x05\x02\x02\r\x0F\x05\x06\x04\x02\x0E\f" +
		"\x03\x02\x02\x02\x0F\x12\x03\x02\x02\x02\x10\x11\x03\x02\x02\x02\x10\x0E" +
		"\x03\x02\x02\x02\x11\x14\x03\x02\x02\x02\x12\x10\x03\x02\x02\x02\x13\x15" +
		"\x07\x05\x02\x02\x14\x13\x03\x02\x02\x02\x14\x15\x03\x02\x02\x02\x15\x17" +
		"\x03\x02\x02\x02\x16\v\x03\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x19" +
		"\x03\x02\x02\x02\x18\x1A\x07\x04\x02\x02\x19\x18\x03\x02\x02\x02\x19\x1A" +
		"\x03\x02\x02\x02\x1A\x03\x03\x02\x02\x02\x1B\x1E\x07\b\x02\x02\x1C\x1D" +
		"\x07\x07\x02\x02\x1D\x1F\x07\t\x02\x02\x1E\x1C\x03\x02\x02\x02\x1E\x1F" +
		"\x03\x02\x02\x02\x1F\x05\x03\x02\x02\x02 !\x07\v\x02\x02!\"\x07\f\x02" +
		"\x02\"#\x05\b\x05\x02#$\x07\r\x02\x02$%\x07\n\x02\x02%&\x05\x04\x03\x02" +
		"&\x07\x03\x02\x02\x02\'(\x07\x0E\x02\x02()\b\x05\x01\x02)\t\x03\x02\x02" +
		"\x02\x07\x10\x14\x16\x19\x1E";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TspShebangParser.__ATN) {
			TspShebangParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(TspShebangParser._serializedATN));
		}

		return TspShebangParser.__ATN;
	}

}

/* istanbul ignore next */
export class ShebangContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(TspShebangParser.OPEN, 0); }
	public plugin(): PluginContext | undefined {
		return this.tryGetRuleContext(0, PluginContext);
	}
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(TspShebangParser.CLOSE, 0); }
	public DELIMITER(): TerminalNode[];
	public DELIMITER(i: number): TerminalNode;
	public DELIMITER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspShebangParser.DELIMITER);
		} else {
			return this.getToken(TspShebangParser.DELIMITER, i);
		}
	}
	public node(): NodeContext[];
	public node(i: number): NodeContext;
	public node(i?: number): NodeContext | NodeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NodeContext);
		} else {
			return this.getRuleContext(i, NodeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspShebangParser.RULE_shebang; }
	// @Override
	public enterRule(listener: TspShebangListener): void {
		if (listener.enterShebang) {
			listener.enterShebang(this);
		}
	}
	// @Override
	public exitRule(listener: TspShebangListener): void {
		if (listener.exitShebang) {
			listener.exitShebang(this);
		}
	}
}


/* istanbul ignore next */
export class PluginContext extends ParserRuleContext {
	public PLUGIN(): TerminalNode { return this.getToken(TspShebangParser.PLUGIN, 0); }
	public PLUGIN_FIRMWARE_START(): TerminalNode | undefined { return this.tryGetToken(TspShebangParser.PLUGIN_FIRMWARE_START, 0); }
	public FIRMWARE(): TerminalNode | undefined { return this.tryGetToken(TspShebangParser.FIRMWARE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspShebangParser.RULE_plugin; }
	// @Override
	public enterRule(listener: TspShebangListener): void {
		if (listener.enterPlugin) {
			listener.enterPlugin(this);
		}
	}
	// @Override
	public exitRule(listener: TspShebangListener): void {
		if (listener.exitPlugin) {
			listener.exitPlugin(this);
		}
	}
}


/* istanbul ignore next */
export class NodeContext extends ParserRuleContext {
	public NODE(): TerminalNode { return this.getToken(TspShebangParser.NODE, 0); }
	public NODE_INDEX_OPEN(): TerminalNode { return this.getToken(TspShebangParser.NODE_INDEX_OPEN, 0); }
	public nodeNumber(): NodeNumberContext {
		return this.getRuleContext(0, NodeNumberContext);
	}
	public NODE_INDEX_CLOSE(): TerminalNode { return this.getToken(TspShebangParser.NODE_INDEX_CLOSE, 0); }
	public NODE_EQUALS(): TerminalNode { return this.getToken(TspShebangParser.NODE_EQUALS, 0); }
	public plugin(): PluginContext {
		return this.getRuleContext(0, PluginContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspShebangParser.RULE_node; }
	// @Override
	public enterRule(listener: TspShebangListener): void {
		if (listener.enterNode) {
			listener.enterNode(this);
		}
	}
	// @Override
	public exitRule(listener: TspShebangListener): void {
		if (listener.exitNode) {
			listener.exitNode(this);
		}
	}
}


/* istanbul ignore next */
export class NodeNumberContext extends ParserRuleContext {
	public NODE_NUMBER(): TerminalNode { return this.getToken(TspShebangParser.NODE_NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspShebangParser.RULE_nodeNumber; }
	// @Override
	public enterRule(listener: TspShebangListener): void {
		if (listener.enterNodeNumber) {
			listener.enterNodeNumber(this);
		}
	}
	// @Override
	public exitRule(listener: TspShebangListener): void {
		if (listener.exitNodeNumber) {
			listener.exitNodeNumber(this);
		}
	}
}


