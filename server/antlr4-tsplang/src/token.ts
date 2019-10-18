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
import { Token } from "antlr4"
import { Range } from "vscode-languageserver"

declare module "antlr4" {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    class Token {
        static readonly INVALID_TYPE: number
        static readonly EPSILON: number
        static readonly MIN_USER_TOKEN_TYPE: number
        static readonly EOF: number
        static readonly DEFAULT_CHANNEL: number
        static readonly HIDDEN_CHANNEL: number
        source: [unknown, unknown]
        type: number
        channel: number
        start: number
        stop: number
        /** from 0..n-1 of the token object in the input stream */
        tokenIndex: number
        /** line=1..n of the 1st character */
        line: number
        /** beginning of the line at which it occurs, 0..n-1 */
        column: number
        /**
         * Explicitly set the text for this token. If `text` is not
         * `null`, then `#getText` will return this value rather than
         * extracting the text from the input.
         *
         * @param text The explicit text of the token, or `null` if the text
         * should be obtained from the input along with the start and stop indices
         * of the token.
         */
        text: string

        getTokenSource(): unknown
        getInputStream(): unknown

        // Augmentations
        fullSpan: Range | null
        leadingTrivia: Array<Token>
        span: Range | null
        trailingTrivia: Array<Token>

        augment(): Token
    }
}
Token.prototype.constructor = function(): void {
    this.source = null
    this.type = null
    this.channel = null
    this.start = null
    this.stop = null
    this.tokenIndex = null
    this.line = null
    this.column = null
    this._text = null

    this.fullSpan = null
    this.leadingTrivia = []
    this.span = null
    this.trailingTrivia = []

    return this
}
/* eslint-disable-next-line @typescript-eslint/unbound-method */
Token.prototype.augment = function(): Token {
    if (this.leadingTrivia === undefined) {
        this.leadingTrivia = []
    }
    if (this.trailingTrivia === undefined) {
        this.trailingTrivia = []
    }
    return this
}
export default Token

// export class ExtendedToken extends Token {
//     fullSpan: Range | null
//     leadingTrivia: Array<Token>
//     span: Range | null
//     trailingTrivia: Array<Token>

//     constructor() {
//         super()
//         this.fullSpan = null
//         this.leadingTrivia = []
//         this.span = null
//         this.trailingTrivia = []
//     }
// }
