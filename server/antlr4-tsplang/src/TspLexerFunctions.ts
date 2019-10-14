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
import { Position } from "vscode-languageserver"

import { TokenPlus } from "./tokenPlus"
import { TspLexer } from "./TspLexer"

declare module "./TspLexer" {
    interface TspLexer {
        nextTokenPlus(): TokenPlus
    }
}
// eslint-disable-next-line @typescript-eslint/unbound-method
TspLexer.prototype.nextTokenPlus = function(): TokenPlus {
    const hidden = (this.channelNames as string[]).indexOf("HIDDEN")
    let triviaCache: Token[] = []
    // Collect any leading trivia.
    let t: Token = this.nextToken()
    while (t.channel === hidden) {
        triviaCache.push(t)
        t = this.nextToken()
    }
    // The first Token found on the Default Channel is our target.
    const result = t as TokenPlus
    result.leadingTrivia = [...triviaCache]
    triviaCache = []
    // Collect any trailing trivia.
    let lastCharIndex: number = this._tokenStartCharIndex
    t = this.nextToken()
    while (t.channel === hidden && t.line === result.line) {
        triviaCache.push(t)
        lastCharIndex = this._tokenStartCharIndex
        t = this.nextToken()
    }
    result.trailingTrivia = [...triviaCache]
    // Reset to the start of the last Token.
    this.adjustSeekIndex(
        triviaCache.length > 0
            ? triviaCache[triviaCache.length - 1].tokenIndex
            : result.tokenIndex
    )
    // ;(this._input as InputStream).seek(lastCharIndex)
    // this.index = this.index--
    // this._token =
    //     result.trailingTrivia.length > 0
    //         ? result.trailingTrivia[result.trailingTrivia.length - 1]
    //         : (result as Token)
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
