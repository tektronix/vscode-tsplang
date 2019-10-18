/*
 *  Copyright Tektronix Inc.
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
import { InputStream, Lexer } from "antlr4"
import { ATN, LexerATNSimulator } from "antlr4/atn"
import { Position } from "vscode-languageserver"

import { TspLexer as GeneratedLexer } from "./TspLexer.generated"
import { Token } from "./token"

declare module "./TspLexer.generated" {
    class TspLexer extends Lexer {
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
        static NIL: number
        static BOOLEAN: number
        static LOCAL: number
        static VARARG: number
        static NAME: number
        static NORMALSTRING: number
        static CHARSTRING: number
        static LONGSTRING: number
        static INT: number
        static HEX: number
        static FLOAT: number
        static LONGCOMMENT: number
        static LINE_COMMENT: number
        static HORIZONTAL_WS: number
        static VERTICAL_WS: number
        static SHEBANG: number

        constructor(input: InputStream)

        protected _interp: LexerATNSimulator

        readonly atn: ATN
        channelNames: Array<string>
        grammarFileName: string
        literalNames: Array<string | null>
        modeNames: Array<string>
        ruleNames: Array<string>
        symbolicNames: Array<string | null>
    }
}

export interface ATNState {
    column: number
    line: number
    mode: number
    startIndex: number
}

export class TspLexer extends GeneratedLexer {
    constructor(input: InputStream) {
        super(input)
    }

    protected saveATNState(): ATNState {
        return {
            column: this._interp.column,
            line: this._interp.line,
            mode: this._interp.mode,
            startIndex: this._interp.startIndex,
        }
    }

    public nextToken(): Token {
        const hidden = this.channelNames.indexOf("HIDDEN")
        let triviaCache: Token[] = []
        // Collect any leading trivia.
        let t: Token = this.nextToken()
        while (t.channel === hidden) {
            triviaCache.push(t)
            t = this.nextToken()
        }
        // The first Token found on the Default Channel is our target.
        const result = t
        result.leadingTrivia = [...triviaCache]
        triviaCache = []
        // Collect any trailing trivia.
        let lastATNState: ATNState = this.saveATNState()
        t = this.nextToken()
        while (t.channel === hidden && t.line === result.line) {
            triviaCache.push(t)
            lastATNState = this.saveATNState()
            t = this.nextToken()
        }
        result.trailingTrivia = [...triviaCache]
        // @ts-ignore
        // Reset to the start of the last Token.
        ;(this as Lexer).inputStream.seek(t.start)
        // this._token =
        //     result.trailingTrivia.length > 0
        //         ? result.trailingTrivia[result.trailingTrivia.length - 1]
        //         : (result as Token)
        // this._tokenStartCharIndex = lastCharIndex
        this._interp.copyState(lastATNState)
        // this._tokenStartColumn = this._interp.column
        // this._tokenStartLine = this._interp.line
        // this._text = null
        // Finalize the TokenPlus object.
        result.span = {
            end: {
                character: result.column + result.text.length,
                line: result.line - 1,
            },
            start: {
                character: result.column,
                line: result.line - 1,
            },
        }
        if (result.leadingTrivia.length > 0) {
            result.fullSpan = {
                end: {} as Position,
                start: {
                    character: result.leadingTrivia[0].column,
                    line: result.leadingTrivia[0].line - 1,
                },
            }
        } else {
            result.fullSpan = {
                end: {} as Position,
                start: {
                    character: result.span.start.character,
                    line: result.span.start.line,
                },
            }
        }
        if (result.trailingTrivia.length > 0) {
            const lastIndex = result.trailingTrivia.length - 1
            result.fullSpan.end = {
                character:
                    result.trailingTrivia[lastIndex].column +
                    result.trailingTrivia[lastIndex].text.length,
                line: result.trailingTrivia[lastIndex].line - 1,
            }
        } else {
            result.fullSpan.end = {
                character: result.span.end.character,
                line: result.span.end.line,
            }
        }
        return result
    }
}
