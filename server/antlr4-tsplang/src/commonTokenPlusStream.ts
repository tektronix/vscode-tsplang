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
import { CommonTokenStream, Token } from "antlr4"

import { TokenPlus } from "./tokenPlus"
import { TspLexer } from "./TspLexer"
import "./TspLexerFunctions"

export class CommonTokenPlusStream extends CommonTokenStream {
    tokens: TokenPlus[]

    constructor(lexer: TspLexer) {
        super(lexer)
        this.tokens = []
    }

    fetch(n: number): number {
        if (this.fetchEOF) {
            return 0
        }
        for (let i = 0; i < n; i++) {
            const t = (this.tokenSource as TspLexer).nextTokenPlus()
            t.tokenIndex = this.tokens.length
            this.tokens.push(t)
            if (t.type === Token.EOF) {
                this.fetchEOF = true
                return i + 1
            }
        }
        return n
    }
}
