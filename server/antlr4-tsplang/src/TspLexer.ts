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
import { Position } from "vscode-languageserver"

import { TspLexer as GeneratedLexer } from "./TspLexer.generated"
import { Token } from "./token"

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
