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
'use strict'

import { Token } from 'antlr4'

// tslint:disable-next-line:no-import-side-effect
import '../fixtures/antlr4.fixture'

function makeStringArray(...tokens: Array<Token>): Array<string> {
    const result = new Array<string>()

    tokens.forEach((value: Token) => {
        result.push(value.text)
    })

    return result
}

function makeTestToken(text: string): Token {
    const result = new Token()
    result.text = text

    return result
}
