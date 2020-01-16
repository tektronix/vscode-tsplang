// Generated from ./TspShebang.g4 by ANTLR 4.7.3-SNAPSHOT


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
	public static readonly SEMICOLON = 3;
	public static readonly PLUGIN = 4;
	public static readonly NODE = 5;
	public static readonly BRACKET_OPEN = 6;
	public static readonly BRACKET_CLOSE = 7;
	public static readonly NODE_NUMBER = 8;
	public static readonly EQUALS = 9;
	public static readonly HORIZONTAL_WS = 10;
	public static readonly RULE_shebang = 0;
	public static readonly RULE_node = 1;
	public static readonly RULE_nodeNumber = 2;
	public static readonly RULE_nodePlugin = 3;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"shebang", "node", "nodeNumber", "nodePlugin",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'#!'", undefined, "';'", undefined, "'node'", "'['", "']'", 
		undefined, "'='",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN", "CLOSE", "SEMICOLON", "PLUGIN", "NODE", "BRACKET_OPEN", 
		"BRACKET_CLOSE", "NODE_NUMBER", "EQUALS", "HORIZONTAL_WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(TspShebangParser._LITERAL_NAMES, TspShebangParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return TspShebangParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "TspShebang.g4"; }

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
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 8;
			this.match(TspShebangParser.OPEN);
			this.state = 9;
			this.match(TspShebangParser.PLUGIN);
			this.state = 14;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 10;
					this.match(TspShebangParser.SEMICOLON);
					this.state = 11;
					this.node();
					}
					}
				}
				this.state = 16;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
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
		this.enterRule(_localctx, 2, TspShebangParser.RULE_node);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 17;
			this.match(TspShebangParser.NODE);
			this.state = 18;
			this.match(TspShebangParser.BRACKET_OPEN);
			this.state = 19;
			this.nodeNumber();
			this.state = 20;
			this.match(TspShebangParser.BRACKET_CLOSE);
			this.state = 21;
			this.match(TspShebangParser.EQUALS);
			this.state = 22;
			this.nodePlugin();
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
		this.enterRule(_localctx, 4, TspShebangParser.RULE_nodeNumber);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 24;
			this.match(TspShebangParser.NODE_NUMBER);

			// Node number must be in the interval [1, 64].
			const num = Number(this.currentToken.text);
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
	// @RuleVersion(0)
	public nodePlugin(): NodePluginContext {
		let _localctx: NodePluginContext = new NodePluginContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, TspShebangParser.RULE_nodePlugin);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 27;
			this.match(TspShebangParser.PLUGIN);
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\f \x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x07\x02\x0F\n\x02\f\x02\x0E\x02\x12\v\x02\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x05\x03" +
		"\x05\x03\x05\x03\x10\x02\x02\x06\x02\x02\x04\x02\x06\x02\b\x02\x02\x02" +
		"\x02\x1C\x02\n\x03\x02\x02\x02\x04\x13\x03\x02\x02\x02\x06\x1A\x03\x02" +
		"\x02\x02\b\x1D\x03\x02\x02\x02\n\v\x07\x03\x02\x02\v\x10\x07\x06\x02\x02" +
		"\f\r\x07\x05\x02\x02\r\x0F\x05\x04\x03\x02\x0E\f\x03\x02\x02\x02\x0F\x12" +
		"\x03\x02\x02\x02\x10\x11\x03\x02\x02\x02\x10\x0E\x03\x02\x02\x02\x11\x03" +
		"\x03\x02\x02\x02\x12\x10\x03\x02\x02\x02\x13\x14\x07\x07\x02\x02\x14\x15" +
		"\x07\b\x02\x02\x15\x16\x05\x06\x04\x02\x16\x17\x07\t\x02\x02\x17\x18\x07" +
		"\v\x02\x02\x18\x19\x05\b\x05\x02\x19\x05\x03\x02\x02\x02\x1A\x1B\x07\n" +
		"\x02\x02\x1B\x1C\b\x04\x01\x02\x1C\x07\x03\x02\x02\x02\x1D\x1E\x07\x06" +
		"\x02\x02\x1E\t\x03\x02\x02\x02\x03\x10";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TspShebangParser.__ATN) {
			TspShebangParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(TspShebangParser._serializedATN));
		}

		return TspShebangParser.__ATN;
	}

}

export class ShebangContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(TspShebangParser.OPEN, 0); }
	public PLUGIN(): TerminalNode { return this.getToken(TspShebangParser.PLUGIN, 0); }
	public SEMICOLON(): TerminalNode[];
	public SEMICOLON(i: number): TerminalNode;
	public SEMICOLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(TspShebangParser.SEMICOLON);
		} else {
			return this.getToken(TspShebangParser.SEMICOLON, i);
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


export class NodeContext extends ParserRuleContext {
	public NODE(): TerminalNode { return this.getToken(TspShebangParser.NODE, 0); }
	public BRACKET_OPEN(): TerminalNode { return this.getToken(TspShebangParser.BRACKET_OPEN, 0); }
	public nodeNumber(): NodeNumberContext {
		return this.getRuleContext(0, NodeNumberContext);
	}
	public BRACKET_CLOSE(): TerminalNode { return this.getToken(TspShebangParser.BRACKET_CLOSE, 0); }
	public EQUALS(): TerminalNode { return this.getToken(TspShebangParser.EQUALS, 0); }
	public nodePlugin(): NodePluginContext {
		return this.getRuleContext(0, NodePluginContext);
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


export class NodePluginContext extends ParserRuleContext {
	public PLUGIN(): TerminalNode { return this.getToken(TspShebangParser.PLUGIN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return TspShebangParser.RULE_nodePlugin; }
	// @Override
	public enterRule(listener: TspShebangListener): void {
		if (listener.enterNodePlugin) {
			listener.enterNodePlugin(this);
		}
	}
	// @Override
	public exitRule(listener: TspShebangListener): void {
		if (listener.exitNodePlugin) {
			listener.exitNodePlugin(this);
		}
	}
}


