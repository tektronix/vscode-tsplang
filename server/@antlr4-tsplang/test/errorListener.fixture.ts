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
import { ANTLRErrorListener } from "antlr4ts"
import "chai"
import "mocha"

/**
 * Throws an error when called by the Lexer or Parser.
 */
class ErrorThrower implements ANTLRErrorListener<unknown> {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e): never {
        throw Error(`line ${line}:${charPositionInLine} ${msg}`)
    }
}
export const ERROR_THROWER = new ErrorThrower()

/**
 * Invokes a `Mocha.Done` callback on Lexer or Parser error.
 * Optionally invokes a callback to verify the arguments of the
 * triggered `syntaxError` method.
 */
export class ErrorValidator implements ANTLRErrorListener<unknown> {
    constructor(
        private done: Mocha.Done,
        private verify?: (
            line: unknown,
            charPositionInLine: unknown,
            msg: unknown
        ) => void | never
    ) {}

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e): void {
        this.verify?.(line, charPositionInLine, msg)
        this.done()
    }
}
