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
import { CommonTokenStream } from "antlr4ts"

import { ExtendedTspLexer } from "./extendedTspLexer"
import { TspCommonToken } from "./tspCommonToken"

export class TspCommonTokenStream extends CommonTokenStream {
    constructor(tokenSource: ExtendedTspLexer, channel?: number) {
        super(tokenSource, channel)
    }

    public getTokens(
        start?: number,
        stop?: number,
        types?: number | Set<number>
    ): Array<TspCommonToken> {
        if (start !== undefined && stop === undefined) {
            stop = this.tokens.length - 1 // Cribbed from the antlr4ts implementation.

            if (typeof types === "number") {
                return super.getTokens(start, stop, types) as Array<TspCommonToken>
            } else if (typeof types === "object") {
                return super.getTokens(start, stop, types) as Array<TspCommonToken>
            }
            return super.getTokens(start, stop) as Array<TspCommonToken>
        }
        return super.getTokens() as Array<TspCommonToken>
    }
}
