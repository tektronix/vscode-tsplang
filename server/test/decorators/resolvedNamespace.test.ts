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

import { Token } from 'antlr4'

import { ResolvedNamespace } from '../../src/decorators'

import { makeStringArray, makeTestToken } from '../testTypes'

describe('Decorators', () => {
    describe('ResolvedNamespace', () => {
        describe('typeof string', () => {
            const test: ResolvedNamespace = ''

            expect(typeof test === 'string').to.be.true
        })

        describe('.create()', () => {
            it('returns an empty string given an empty string', () => {
                expect(ResolvedNamespace.create('')).to.be.empty
            })

            it('returns an empty string given an empty array', () => {
                expect(ResolvedNamespace.create([])).to.be.empty
            })

            it('returns a resolved namespace given a string', () => {
                const scenarios: Map<string, Array<string>> = new Map([
                    ['foo', ['foo', 'foo[1]', 'foo[999](', 'foo(bar(']],
                    ['foo.bar', ['foo.bar', 'foo[42].bar(', 'foo[1].bar[999](baz(']]
                ])

                scenarios.forEach((testCases: Array<string>, expected: string) => {
                    testCases.forEach((test: string) => {
                        expect(
                            ResolvedNamespace.create(test),
                            `"${test}" did not resolve to "${expected}"`
                        ).to.equal(expected)
                    })
                })
            })

            it('returns a resolved namespace given a Token array', () => {
                const foo = makeTestToken('foo')
                const bar = makeTestToken('bar')
                const baz = makeTestToken('baz')
                const one = makeTestToken('1')
                const fourTwo = makeTestToken('42')
                const nineNineNine = makeTestToken('999')
                const dot = makeTestToken('.')
                const openParen = makeTestToken('(')
                const openBracket = makeTestToken('[')
                const closeBracket = makeTestToken(']')

                const scenarios: Map<string, Array<Array<Token>>> = new Map([
                    ['foo', [
                        // foo
                        [foo],
                        // foo[1]
                        [foo, openBracket, one, closeBracket],
                        // foo[999](
                        [foo, openBracket, nineNineNine, closeBracket, openParen],
                        // foo(bar(
                        [foo, openParen, bar, openParen]
                    ]],
                    ['foo.bar', [
                        // foo.bar
                        [foo, dot, bar],
                        // foo[42].bar(
                        [foo, openBracket, fourTwo, closeBracket, dot, bar, openParen],
                        // foo[1].bar[999](baz(
                        [
                            foo,
                            openBracket,
                            one,
                            closeBracket,
                            dot,
                            bar,
                            openBracket,
                            nineNineNine,
                            closeBracket,
                            openParen,
                            baz,
                            openParen
                        ]
                    ]]
                ])

                scenarios.forEach((testCases: Array<Array<Token>>, expected: string) => {
                    testCases.forEach((test: Array<Token>) => {
                        expect(
                            ResolvedNamespace.create(test),
                            `"${JSON.stringify(makeStringArray(...test))}" did not resolve to "${expected}"`
                        ).to.equal(expected)
                    })
                })
            })
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
