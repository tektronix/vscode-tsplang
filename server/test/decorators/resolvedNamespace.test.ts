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

import { ResolvedNamespace } from '../../src/decorators'

describe('Decorators', () => {
    describe('ResolvedNamespace', () => {
        describe('typeof string', () => {
            const test: ResolvedNamespace = ''

            expect(typeof test === 'string').to.be.true
        })

        describe('.create()', () => {
            it.skip('returns a resolved namespace given a string')

            it.skip('returns a resolved namespace given a Token array')
        })

        describe('.depth()', () => {
            it('returns zero when the given string is empty', () => {
                expect(ResolvedNamespace.depth('')).to.equal(0)
            })

            it('returns the depth of the given namespace', () => {
                // tslint:disable:no-magic-numbers
                const testCases: Array<[string, number]> = [
                    ['foo', 0],
                    ['foo[1](', 0],
                    ['foo.bar', 1],
                    ['foo[1].bar(', 1],
                    ['foo.bar.baz', 2],
                    ['foo[999].bar[ ].baz(', 2],
                ]
                // tslint:enable:no-magic-numbers

                testCases.forEach((test: [string, number]) => {
                    expect(
                        ResolvedNamespace.depth(test[0]),
                        `"${test[0]}" has an unexpected depth`
                    ).to.equal(test[1])
                })
            })
        })

        describe('.equal()', () => {
            it('returns true when two strings are equal', () => {
                const testCases: Array<[string, string]> = [
                    ['', ''],
                    ['foo', 'foo'],
                    ['foo[1].bar', 'foo[1].bar']
                ]

                testCases.forEach((test: [string, string]) => {
                    expect(
                        ResolvedNamespace.equal(test[0], test[1]),
                        `"${test[0]}" failed to equal "${test[1]}"`
                    ).to.be.true
                })
            })

            it('returns false when two strings are not equal', () => {
                const testCases: Array<[string, string]> = [
                    ['', 'foo'],
                    ['foo', ''],
                    ['bar', 'baz']
                ]

                testCases.forEach((test: [string, string]) => {
                    expect(
                        ResolvedNamespace.equal(test[0], test[1]),
                        `"${test[0]}" equals "${test[1]}"`
                    ).to.be.false
                })
            })
        })
    })
})
