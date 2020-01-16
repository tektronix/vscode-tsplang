// Generated from ./TspShebang.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class TspShebangLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"OPEN", "CLOSE", "SEMICOLON", "PLUGIN", "NODE", "BRACKET_OPEN", "BRACKET_CLOSE", 
		"NODE_NUMBER", "EQUALS", "HORIZONTAL_WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'#!'", undefined, "';'", undefined, "'node'", "'['", "']'", 
		undefined, "'='",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "OPEN", "CLOSE", "SEMICOLON", "PLUGIN", "NODE", "BRACKET_OPEN", 
		"BRACKET_CLOSE", "NODE_NUMBER", "EQUALS", "HORIZONTAL_WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(TspShebangLexer._LITERAL_NAMES, TspShebangLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return TspShebangLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(TspShebangLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "TspShebang.g4"; }

	// @Override
	public get ruleNames(): string[] { return TspShebangLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return TspShebangLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return TspShebangLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return TspShebangLexer.modeNames; }

	// @Override
	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 3:
			return this.PLUGIN_sempred(_localctx, predIndex);

		case 7:
			return this.NODE_NUMBER_sempred(_localctx, predIndex);
		}
		return true;
	}
	private PLUGIN_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return (
				// Previous two characters were "#!"...
				(this._input.LA(-2) === 35 && this._input.LA(-1) === 33)
				// ...OR previous character was "=".
				|| this._input.LA(-1) === 61
			);
		}
		return true;
	}
	private NODE_NUMBER_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return (
				// Previous character was "[".
				this._input.LA(-1) === 91
			);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\fC\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x03" +
		"\x02\x03\x03\x03\x03\x03\x03\x05\x03\x1E\n\x03\x03\x04\x03\x04\x03\x05" +
		"\x03\x05\x06\x05$\n\x05\r\x05\x0E\x05%\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x05\t4\n\t\x03" +
		"\t\x06\t7\n\t\r\t\x0E\t8\x03\n\x03\n\x03\v\x06\v>\n\v\r\v\x0E\v?\x03\v" +
		"\x03\v\x02\x02\x02\f\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02" +
		"\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x03\x02\x06\x04\x02" +
		"\f\f\x0F\x0F\x05\x02==]]__\x03\x022;\x05\x02\v\v\x0E\x0E\"\"\x02G\x02" +
		"\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02" +
		"\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F" +
		"\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15" +
		"\x03\x02\x02\x02\x03\x17\x03\x02\x02\x02\x05\x1D\x03\x02\x02\x02\x07\x1F" +
		"\x03\x02\x02\x02\t!\x03\x02\x02\x02\v\'\x03\x02\x02\x02\r,\x03\x02\x02" +
		"\x02\x0F.\x03\x02\x02\x02\x110\x03\x02\x02\x02\x13:\x03\x02\x02\x02\x15" +
		"=\x03\x02\x02\x02\x17\x18\x07%\x02\x02\x18\x19\x07#\x02\x02\x19\x04\x03" +
		"\x02\x02\x02\x1A\x1B\x07\x0F\x02\x02\x1B\x1E\x07\f\x02\x02\x1C\x1E\t\x02" +
		"\x02\x02\x1D\x1A\x03\x02\x02\x02\x1D\x1C\x03\x02\x02\x02\x1E\x06\x03\x02" +
		"\x02\x02\x1F \x07=\x02\x02 \b\x03\x02\x02\x02!#\x06\x05\x02\x02\"$\n\x03" +
		"\x02\x02#\"\x03\x02\x02\x02$%\x03\x02\x02\x02%#\x03\x02\x02\x02%&\x03" +
		"\x02\x02\x02&\n\x03\x02\x02\x02\'(\x07p\x02\x02()\x07q\x02\x02)*\x07f" +
		"\x02\x02*+\x07g\x02\x02+\f\x03\x02\x02\x02,-\x07]\x02\x02-\x0E\x03\x02" +
		"\x02\x02./\x07_\x02\x02/\x10\x03\x02\x02\x0203\x06\t\x03\x0212\x07-\x02" +
		"\x0224\x07/\x02\x0231\x03\x02\x02\x0234\x03\x02\x02\x0246\x03\x02\x02" +
		"\x0257\t\x04\x02\x0265\x03\x02\x02\x0278\x03\x02\x02\x0286\x03\x02\x02" +
		"\x0289\x03\x02\x02\x029\x12\x03\x02\x02\x02:;\x07?\x02\x02;\x14\x03\x02" +
		"\x02\x02<>\t\x05\x02\x02=<\x03\x02\x02\x02>?\x03\x02\x02\x02?=\x03\x02" +
		"\x02\x02?@\x03\x02\x02\x02@A\x03\x02\x02\x02AB\b\v\x02\x02B\x16\x03\x02" +
		"\x02\x02\b\x02\x1D%38?\x03\x02\x03\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TspShebangLexer.__ATN) {
			TspShebangLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(TspShebangLexer._serializedATN));
		}

		return TspShebangLexer.__ATN;
	}

}

