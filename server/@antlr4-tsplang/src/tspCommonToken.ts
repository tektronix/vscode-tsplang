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
import { CommonToken, Token } from "antlr4ts"
import { Range } from "vscode-languageserver"

export class TspCommonToken extends CommonToken {
    public leadingTrivia: Array<TspCommonToken>
    public trailingTrivia: Array<TspCommonToken>

    private _fullSpan: Range | undefined
    private _span: Range | undefined

    constructor(
        type: number,
        text?: string,
        source?: {
            source?: import("antlr4ts").TokenSource
            stream?: import("antlr4ts").CharStream
        },
        channel?: number,
        start?: number,
        stop?: number
    ) {
        super(type, text, source, channel, start, stop)
        this.leadingTrivia = []
        this.trailingTrivia = []
    }

    get fullSpan(): Range {
        if (this._fullSpan === undefined) {
            this._fullSpan = {} as Range

            // Calculate the starting range of any attached trivia.
            if (this.leadingTrivia !== undefined && this.leadingTrivia.length > 0) {
                this._fullSpan.start = {
                    character: this.leadingTrivia[0].charPositionInLine,
                    line: this.leadingTrivia[0].line - 1,
                }
            } else {
                this._fullSpan.start = {
                    character: this.span.start.character,
                    line: this.span.start.line,
                }
            }

            // Calculate the ending range of any attached trivia.
            if (
                this.trailingTrivia !== undefined &&
                this.trailingTrivia.length > 0 &&
                this.trailingTrivia[this.trailingTrivia.length - 1].text !== undefined
            ) {
                const lastIndex = this.trailingTrivia.length - 1
                this._fullSpan.end = {
                    character:
                        this.trailingTrivia[lastIndex].charPositionInLine +
                        (this.trailingTrivia[lastIndex].text as string).length,
                    line: this.trailingTrivia[lastIndex].line - 1,
                }
            } else {
                this._fullSpan.end = {
                    character: this.span.end.character,
                    line: this.span.end.line,
                }
            }
        }
        return this._fullSpan
    }

    get span(): Range {
        if (this._span === undefined) {
            this._span = {
                end: {
                    character: this.charPositionInLine + (this.text || "").length,
                    line: this.line - 1,
                },
                start: {
                    character: this.charPositionInLine,
                    line: this.line - 1,
                },
            }
        }
        return this._span
    }

    public resetFullSpan(): void {
        this._fullSpan = undefined
    }

    public resetSpan(): void {
        this._span = undefined
    }

    /**
     * NOTICE: THIS IS VERY IMPORTANT TO UPDATE!
     *
     * Any additional properties, functions, or property descriptors
     * added to this class should also be added here!
     */
    public static fromToken(token: Token): TspCommonToken {
        if (token instanceof TspCommonToken) {
            return token
        } else if (!(token instanceof CommonToken)) {
            token = super.fromToken(token)
        }

        /**
         * Everything below this is a hack. Or JavaScript.
         *
         * Basically we want to take a CommonToken and add things to it
         * until it becomes a TspCommonToken.
         *
         * But why.
         * Well, this function was probably called by TspCommonTokenFactory
         * in order to create a new TspCommonToken. The factory calls its
         * super (CommonTokenFactory) to generate a new CommonToken and hands
         * that object off to us to make it a TspCommonToken. If the
         * TspCommonTokenFactory didn't call its super, then we would have to
         * copy a big 'ole code block from the antlr4ts source code in order
         * to properly instantiate the new TspCommonToken. Better to just
         * take a new CommonToken and add things to it.
         */

        /** PROPERTIES */

        // @ts-ignore
        token.leadingTrivia = []
        // @ts-ignore
        token.trailingTrivia = []

        /** FUNCTIONS */

        // @ts-ignore
        token.resetFullSpan = TspCommonToken.prototype.resetFullSpan.bind(token)
        // @ts-ignore
        token.resetSpan = TspCommonToken.prototype.resetSpan.bind(token)

        /** PROPERTY DESCRIPTORS */

        Object.defineProperties(token, {
            fullSpan: Object.getOwnPropertyDescriptor(
                TspCommonToken.prototype,
                "fullSpan"
            ) as PropertyDescriptor,
            span: Object.getOwnPropertyDescriptor(
                TspCommonToken.prototype,
                "span"
            ) as PropertyDescriptor,
        })

        return token as TspCommonToken
    }
}
