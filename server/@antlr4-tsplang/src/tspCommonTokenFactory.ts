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
import { CharStream, CommonToken, CommonTokenFactory, TokenSource } from "antlr4ts"

import { TspCommonToken } from "./tspCommonToken"

export class TspCommonTokenFactory extends CommonTokenFactory {
    constructor(copyText?: boolean) {
        super(copyText)
    }

    create(
        source: {
            source?: TokenSource
            stream?: CharStream
        },
        type: number,
        text: string | undefined,
        channel: number,
        start: number,
        stop: number,
        line: number,
        charPositionInLine: number
    ): TspCommonToken {
        return this.extend(
            super.create(
                source,
                type,
                text,
                channel,
                start,
                stop,
                line,
                charPositionInLine
            )
        )
    }

    createSimple(type: number, text: string): TspCommonToken {
        return this.extend(super.createSimple(type, text))
    }

    protected extend(token: CommonToken): TspCommonToken {
        return TspCommonToken.fromToken(token)
    }
}
