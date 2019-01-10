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
import { Token } from 'antlr4'
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { TokenUtil } from '../../language-comprehension'
import { makeTestToken } from '../testTypes'

describe('Language Comprehension', () => {
    describe('TokenUtil', () => {
        describe('.getString()', () => {
            it('returns undefined when no tokens are given', () => {
                expect(TokenUtil.getString(), 'Test 1').to.be.undefined

                expect(TokenUtil.getString(...[]), 'Test 2').to.be.undefined
            })

            it('returns an accurate representation of the given Token array', () => {
                const fooToken = makeTestToken('foo')

                const dotToken = makeTestToken('.')

                const barToken = makeTestToken('bar')

                const scenario = new Map<string, Array<Token>>([
                    ['foo', [fooToken]],
                    ['foo.', [fooToken, dotToken]],
                    ['foo.bar', [fooToken, dotToken, barToken]]
                ])

                scenario.forEach((given: Array<Token>, expected: string) => {
                    expect(TokenUtil.getString(...given)).to.equal(expected)
                })
            })
        })
    })
})
