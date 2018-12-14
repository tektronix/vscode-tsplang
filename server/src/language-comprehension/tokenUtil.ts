/*
 *  Copyright 2018 Tektronix Inc.
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
'use strict'

import { Token } from 'antlr4'

export namespace TokenUtil {
    /**
     * Get a string representing the given tokens or undefined if no Tokens were given.
     * @param tokens The Tokens whose text should comprise the string.
     * @returns A string or undefined if no tokens were supplied.
     */
    export function getString(...tokens: Array<Token>): string | undefined {
        let result: string | undefined

        for (const t of tokens) {
            result = (result === undefined) ? t.text : result + t.text
        }

        return result
    }
}