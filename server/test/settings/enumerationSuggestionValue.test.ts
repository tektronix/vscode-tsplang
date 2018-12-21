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

import { EnumerationSuggestionValue } from '../../src/settings'

describe('Settings', () => {
    describe('EnumerationSuggestionValue', () => {
        describe('.BOTTOM', () => {
            it('contained in EnumerationSuggestionValue', () => {
                expect(EnumerationSuggestionValue).to.have.ownProperty('BOTTOM')
            })

            it('equals "bottom"', () => {
                expect(EnumerationSuggestionValue.BOTTOM).to.equal('bottom')
            })
        })

        describe('.INLINE', () => {
            it('contained in EnumerationSuggestionValue', () => {
                expect(EnumerationSuggestionValue).to.have.ownProperty('INLINE')
            })

            it('equals "inline"', () => {
                expect(EnumerationSuggestionValue.INLINE).to.equal('inline')
            })
        })

        describe('.TOP', () => {
            it('contained in EnumerationSuggestionValue', () => {
                expect(EnumerationSuggestionValue).to.have.ownProperty('TOP')
            })

            it('equals "top"', () => {
                expect(EnumerationSuggestionValue.TOP).to.equal('top')
            })
        })

        describe('.addSortCharacter()', () => {
            const bottomSortChar = '\u007E'
            const bottomSortLiteral = '\\u007E'
            const topSortChar = '\u0020'
            const topSortLiteral = '\\u0020'
            const scenarios = new Map<string, Array<string>>([
                ['foo', ['foo']],
                ['foo.bar', ['FOO.BAR', 'fOo.BaR']],
                ['foo.bar.baz', ['FOO.bar.BAZ']]
            ])

            context('When type is BOTTOM', () => {
                const sortType = EnumerationSuggestionValue.BOTTOM

                it(`returns a string starting with "${bottomSortChar}" (${bottomSortLiteral})`, () => {
                    scenarios.forEach((testCases: Array<string>) => {
                        testCases.forEach((test: string) => {
                            expect(
                                EnumerationSuggestionValue.addSortCharacter(test, sortType)[0],
                                `BOTTOM sortText character not equal to "${bottomSortChar}" (${bottomSortLiteral})`
                            ).to.equal(bottomSortChar)
                        })
                    })
                })

                it('returns a lowercase string', () => {
                    scenarios.forEach((testCases: Array<string>, expected: string) => {
                        testCases.forEach((test: string) => {
                            expect(
                                EnumerationSuggestionValue.addSortCharacter(test, sortType)
                            ).to.equal(bottomSortChar + expected)
                        })
                    })
                })
            })

            context('When type is INLINE', () => {
                const sortType = EnumerationSuggestionValue.INLINE

                it('returns a string without a special starting character', () => {
                    scenarios.forEach((testCases: Array<string>) => {
                        testCases.forEach((test: string) => {
                            expect(
                                EnumerationSuggestionValue.addSortCharacter(test, sortType)
                            ).to.equal(test.toLocaleLowerCase())
                        })
                    })
                })

                it('returns a lowercase string', () => {
                    scenarios.forEach((testCases: Array<string>, expected: string) => {
                        testCases.forEach((test: string) => {
                            expect(
                                EnumerationSuggestionValue.addSortCharacter(test, sortType)
                            ).to.equal(expected)
                        })
                    })
                })
            })

            context('When type is TOP', () => {
                const sortType = EnumerationSuggestionValue.TOP

                it(`returns a string starting with "${topSortChar}" (${topSortLiteral})`, () => {
                    scenarios.forEach((testCases: Array<string>) => {
                        testCases.forEach((test: string) => {
                            expect(
                                EnumerationSuggestionValue.addSortCharacter(test, sortType)[0],
                                `TOP sortText character not equal to "${topSortChar}" (${topSortLiteral})`
                            ).to.equal(topSortChar)
                        })
                    })
                })

                it('returns a lowercase string', () => {
                    scenarios.forEach((testCases: Array<string>, expected: string) => {
                        testCases.forEach((test: string) => {
                            expect(
                                EnumerationSuggestionValue.addSortCharacter(test, sortType)
                            ).to.equal(topSortChar + expected)
                        })
                    })
                })
            })
        })
    })
})
