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
import { ANTLRInputStream, Token } from "antlr4ts"
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator"

import "./token"
import { TspLexer } from "./TspLexer.generated"

interface ATNSnapshot {
    charPositionInLine: number
    _line: number
    mode: number
    startIndex: number
}

export class ExtendedLexer extends TspLexer {
    constructor(input: ANTLRInputStream) {
        super(input)
    }

    protected getATNSnapshot(): ATNSnapshot {
        return {
            charPositionInLine: this._interp.charPositionInLine,
            _line: this._interp.line,
            mode: this._mode,
            startIndex: this._tokenStartCharIndex,
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
        super.inputStream.seek(t.startIndex)
        this._interp.copyState((lastATNState as unknown) as LexerATNSimulator)

        // Calculate token spans
        result.span = Token.getSpan(result)
        result.fullSpan = Token.getFullSpan(result)

        return result
    }
}
