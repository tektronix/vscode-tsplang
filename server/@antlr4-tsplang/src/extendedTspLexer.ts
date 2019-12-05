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

/*
 * NOTICE! any updates to this file should also be made to:
 *      ./extendedTspDocLexer.ts
 */

import { ANTLRInputStream } from "antlr4ts"
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator"

import { TspCommonToken } from "./tspCommonToken"
import { TspCommonTokenFactory } from "./tspCommonTokenFactory"
import { TspLexer } from "./TspLexer.generated"

interface ATNSnapshot {
    charPositionInLine: number
    _line: number
    mode: number
    startIndex: number
}

export class ExtendedTspLexer extends TspLexer {
    constructor(input: ANTLRInputStream) {
        super(input)
        this.tokenFactory = new TspCommonTokenFactory()
    }

    protected getATNSnapshot(): ATNSnapshot {
        return {
            charPositionInLine: this._interp.charPositionInLine,
            _line: this._interp.line,
            mode: this._mode,
            startIndex: this._tokenStartCharIndex,
        }
    }

    public nextToken(): TspCommonToken {
        const defaultChannel: number = TspLexer.DEFAULT_TOKEN_CHANNEL
        let triviaCache: TspCommonToken[] = []

        // Collect any leading trivia.
        let token = super.nextToken() as TspCommonToken
        while (token.channel !== defaultChannel) {
            triviaCache.push(token)
            token = super.nextToken() as TspCommonToken
        }
        // The first token found on the Default Channel is our target.
        const result = token
        result.leadingTrivia = [...triviaCache]
        triviaCache = []
        // Collect any trailing trivia.
        let lastATNState: ATNSnapshot = this.getATNSnapshot()
        token = super.nextToken() as TspCommonToken
        while (token.channel !== defaultChannel && token.line === result.line) {
            triviaCache.push(token)
            lastATNState = this.getATNSnapshot()
            token = super.nextToken() as TspCommonToken
        }
        result.trailingTrivia = [...triviaCache]

        // Reset to the start of the last token.
        super.inputStream.seek(token.startIndex)
        this._interp.copyState((lastATNState as unknown) as LexerATNSimulator)

        return result
    }
}
