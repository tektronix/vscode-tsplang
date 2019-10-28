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
import { CharStream, TokenSource } from "antlr4ts"
import { Token } from "antlr4ts/Token"
import { Range } from "vscode-languageserver"

declare module "antlr4ts/Token" {
    interface Token {
        // Builtins
        readonly text: string | undefined
        readonly type: number
        readonly line: number
        readonly charPositionInLine: number
        readonly channel: number
        readonly tokenIndex: number
        readonly startIndex: number
        readonly stopIndex: number
        readonly tokenSource: TokenSource | undefined
        readonly inputStream: CharStream | undefined

        // Augmentations
        fullSpan?: Range
        leadingTrivia?: Array<Token>
        span?: Range
        trailingTrivia?: Array<Token>
    }
    namespace Token {
        function getFullSpan(token: Token): Range
        function getSpan(token: Token): Range
    }
}
Token.getSpan = function(token: Token): Range {
    return {
        end: {
            character: token.charPositionInLine + (token.text || "").length,
            line: token.line - 1,
        },
        start: {
            character: token.charPositionInLine,
            line: token.line - 1,
        },
    }
}
Token.getFullSpan = function(token: Token): Range {
    const result: Range = {} as Range
    let span: Range | undefined = undefined

    const getSpan = (): Range =>
        token.span === undefined ? Token.getSpan(token) : token.span

    // Calculate the starting range of any attached trivia.
    if (token.leadingTrivia !== undefined && token.leadingTrivia.length > 0) {
        result.start = {
            character: token.leadingTrivia[0].charPositionInLine,
            line: token.leadingTrivia[0].line - 1,
        }
    } else {
        span = getSpan()

        result.start = {
            character: span.start.character,
            line: span.start.line,
        }
    }

    // Calculate the ending range of any attached trivia.
    if (
        token.trailingTrivia !== undefined &&
        token.trailingTrivia.length > 0 &&
        token.trailingTrivia[token.trailingTrivia.length - 1].text !== undefined
    ) {
        const lastIndex = token.trailingTrivia.length - 1
        result.end = {
            character:
                token.trailingTrivia[lastIndex].charPositionInLine +
                (token.trailingTrivia[lastIndex].text as string).length,
            line: token.trailingTrivia[lastIndex].line - 1,
        }
    } else {
        if (!span) {
            span = getSpan()
        }

        result.end = {
            character: span.end.character,
            line: span.end.line,
        }
    }

    return result
}
