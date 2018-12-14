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
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { TokenUtil } from '../../../../server/src/language-comprehension'

import { Token } from './token.fixture'

describe('Language Comprehension', () => {
    describe('TokenUtil', () => {
        describe('.getString()', () => {
            it('returns undefined when no tokens are given', () => {
                expect(TokenUtil.getString(), 'Test 1').to.be.undefined

                expect(TokenUtil.getString(...[]), 'Test 2').to.be.undefined
            })

            it('returns an accurate representation of the given Token array', () => {
                const scenario = new Map<string, Array<Token>>([
                    ['foo', [new Token('foo')]],
                    ['foo.', [new Token('foo'), new Token('.')]],
                    ['foo.bar', [new Token('foo'), new Token('.'), new Token('bar')]]
                ])

                scenario.forEach((given: Array<Token>, expected: string) => {
                    expect(TokenUtil.getString(...given)).to.equal(expected)
                })
            })
        })
    })
})
