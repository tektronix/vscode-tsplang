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
import { InputStream, Token } from "antlr4"
import { LexerATNSimulator } from "antlr4/atn"
import { Position } from "vscode-languageserver"

import "./token"
import { TspLexer } from "./TspLexer.generated"
import "./TspLexer.generated"

interface ATNSnapshot {
    column: number
    line: number
    mode: number
    startIndex: number
}

// @ts-ignore
export class ExtendedLexer extends TspLexer {
    static readonly EOF: number
    static readonly T__0: number
    static readonly T__1: number
    static readonly T__2: number
    static readonly T__3: number
    static readonly T__4: number
    static readonly T__5: number
    static readonly T__6: number
    static readonly T__7: number
    static readonly T__8: number
    static readonly T__9: number
    static readonly T__10: number
    static readonly T__11: number
    static readonly T__12: number
    static readonly T__13: number
    static readonly T__14: number
    static readonly T__15: number
    static readonly T__16: number
    static readonly T__17: number
    static readonly T__18: number
    static readonly T__19: number
    static readonly T__20: number
    static readonly T__21: number
    static readonly T__22: number
    static readonly T__23: number
    static readonly T__24: number
    static readonly T__25: number
    static readonly T__26: number
    static readonly T__27: number
    static readonly T__28: number
    static readonly T__29: number
    static readonly T__30: number
    static readonly T__31: number
    static readonly T__32: number
    static readonly T__33: number
    static readonly T__34: number
    static readonly T__35: number
    static readonly T__36: number
    static readonly T__37: number
    static readonly T__38: number
    static readonly T__39: number
    static readonly T__40: number
    static readonly T__41: number
    static readonly T__42: number
    static readonly T__43: number
    static readonly T__44: number
    static readonly T__45: number
    static readonly T__46: number
    static readonly NIL: number
    static readonly BOOLEAN: number
    static readonly LOCAL: number
    static readonly VARARG: number
    static readonly NAME: number
    static readonly NORMALSTRING: number
    static readonly CHARSTRING: number
    static readonly LONGSTRING: number
    static readonly INT: number
    static readonly HEX: number
    static readonly FLOAT: number
    static readonly LONGCOMMENT: number
    static readonly LINE_COMMENT: number
    static readonly HORIZONTAL_WS: number
    static readonly VERTICAL_WS: number
    static readonly SHEBANG: number

    // protected _factory: CommonTokenFactory
    protected _interp: LexerATNSimulator

    constructor(input: InputStream) {
        super(input)
        // this._factory = new ExtendedTokenFactory(this._factory.copyText)
    }

    protected getATNSnapshot(): ATNSnapshot {
        return {
            column: this._interp.column,
            line: this._interp.line,
            mode: this._interp.mode,
            startIndex: this._interp.startIndex,
        }
    }

    public nextToken(): Token {
        const hidden = super.channelNames.indexOf("HIDDEN")
        // let triviaCache: ExtendedCommonToken[] = []
        let triviaCache: Token[] = []
        // Collect any leading trivia.
        // let t: ExtendedCommonToken = ExtendedCommonToken.extend(super.nextToken())
        let t: Token = super.nextToken()
        while (t.channel === hidden) {
            triviaCache.push(t)
            // t = ExtendedCommonToken.extend(super.nextToken())
            t = super.nextToken()
        }
        // The first token found on the Default Channel is our target.
        const result = t
        result.leadingTrivia = [...triviaCache]
        triviaCache = []
        // Collect any trailing trivia.
        let lastATNState: ATNSnapshot = this.getATNSnapshot()
        // t = ExtendedCommonToken.extend(super.nextToken())
        t = super.nextToken()
        while (t.channel === hidden && t.line === result.line) {
            triviaCache.push(t)
            lastATNState = this.getATNSnapshot()
            // t = ExtendedCommonToken.extend(super.nextToken())
            t = super.nextToken()
        }
        result.trailingTrivia = [...triviaCache]
        // Reset to the start of the last token.
        super.inputStream.seek(t.start)
        this._interp.copyState(lastATNState as LexerATNSimulator)
        // Calculate the range of the token's content.
        if (result.column !== null && result.line !== null) {
            result.span = {
                end: {
                    character: result.column + (result.text || "").length,
                    line: result.line - 1,
                },
                start: {
                    character: result.column,
                    line: result.line - 1,
                },
            }
        } else {
            // Full-span cannot be calculated without a span.
            return result
        }
        // Calculate the starting range of any attached trivia.
        if (
            result.leadingTrivia.length > 0 &&
            result.leadingTrivia[0].column !== null &&
            result.leadingTrivia[0].line !== null
        ) {
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
        // Calculated the ending range of any attached trivia.
        const lastIndex = result.trailingTrivia.length - 1
        if (
            lastIndex > -1 &&
            result.trailingTrivia[lastIndex].column !== null &&
            result.trailingTrivia[lastIndex].text !== null &&
            result.trailingTrivia[lastIndex].line !== null
        ) {
            result.fullSpan.end = {
                character:
                    (result.trailingTrivia[lastIndex].column as number) +
                    (result.trailingTrivia[lastIndex].text as string).length,
                line: (result.trailingTrivia[lastIndex].line as number) - 1,
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
