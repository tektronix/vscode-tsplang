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
// tslint:disable:no-any

import { Token } from 'antlr4'

declare module 'antlr4' {
    class Token {
        static readonly EOF: number
        static readonly EPSILON: number
        static readonly HIDDEN_CHANNEL: number
        static readonly INVALID_TYPE: number
        static readonly MIN_USER_TOKEN_TYPE: number

        channel: any
        column: number
        line: number
        source: any
        start: number
        stop: number
        text: string
        tokenIndex: number
        type: any

        getInputStream(): any
        getTokenSource(): any
        static makeStringArray(...tokens: Array<Token>): Array<string>
    }
}
Token.makeStringArray = function(...tokens: Array<Token>): Array<string> {
    const result = new Array<string>()

    tokens.forEach((value: Token) => {
        result.push(value.text)
    })

    return result
}
