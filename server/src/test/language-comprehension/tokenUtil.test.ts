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
import { Range } from 'vscode-languageserver'

// tslint:disable-next-line:no-import-side-effect
import '../../decorators/antlr4'
import { TokenUtil } from '../../language-comprehension'

describe('Language Comprehension', () => {
    describe('TokenUtil', () => {
        describe('.getString()', () => {
            it('returns undefined when no tokens are given', () => {
                expect(TokenUtil.getString(), 'Test 1').to.be.undefined

                expect(TokenUtil.getString(...[]), 'Test 2').to.be.undefined
            })

            it('returns an accurate representation of the given Token array', () => {
                const fooToken = new Token()
                fooToken.text = 'foo'

                const dotToken = new Token()
                dotToken.text = '.'

                const barToken = new Token()
                barToken.text = 'bar'

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

        describe('.getRange()', () => {
            it('returns the correct Range when on the same line', () => {
                /**
                 * "foo.bar"
                 */

                const fooToken = new Token()
                fooToken.text = 'foo'
                fooToken.line = 1
                fooToken.start = 0
                fooToken.stop = fooToken.text.length - 1
                fooToken.column = 0

                const barToken = new Token()
                barToken.text = 'bar'
                barToken.line = fooToken.line
                barToken.start = fooToken.text.length + '.'.length
                barToken.stop = barToken.start + barToken.text.length - 1
                barToken.column = barToken.start

                const expected: Range = {
                    end: {
                        character: 'foo.bar'.length,
                        line: 0
                    },
                    start: {
                        character: 0,
                        line: 0
                    }
                }

                expect(TokenUtil.getRange(fooToken, barToken)).to.deep.equal(expected)
            })

            it('returns the correct Range when on different lines', () => {
                /**
                 * "foo.\n    bar"
                 */

                const fooToken = new Token()
                fooToken.text = 'foo'
                fooToken.line = 1
                fooToken.column = 0

                const barToken = new Token()
                barToken.text = 'bar'
                barToken.line = fooToken.line + 1
                barToken.column = '    '.length

                const expected: Range = {
                    end: {
                        character: '    bar'.length,
                        line: 1
                    },
                    start: {
                        character: 0,
                        line: 0
                    }
                }

                expect(TokenUtil.getRange(fooToken, barToken)).to.deep.equal(expected)
            })
        })
    })
})
