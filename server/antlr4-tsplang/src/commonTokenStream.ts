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
import { CommonTokenStream, Lexer, Token } from "antlr4"

import "./token"
import { ExtendedLexer } from "./TspLexer"

export class ExtendedTokenStream extends CommonTokenStream {
    tokens: Array<Token>

    constructor(lexer: ExtendedLexer) {
        super((lexer as unknown) as Lexer)
        this.tokens = []
    }

    fetch(n: number): number {
        if (this.fetchedEOF) {
            return 0
        }
        for (let i = 0; i < n; i++) {
            const t = this.tokenSource.nextToken()
            t.tokenIndex = this.tokens.length
            this.tokens.push(t)
            if (t.type === Token.EOF) {
                this.fetchedEOF = true
                return i + 1
            }
        }
        return n
    }
}
