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
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { SignatureInformation } from '../../decorators'

describe('Decorators', () => {
    describe('SignatureInformation', () => {
        describe('.resolveNamespace()', () => {
            it('returns an empty string when label is an empty string', () => {
                expect(SignatureInformation.resolveNamespace({
                    label: ''
                })).to.be.empty
            })

            it('returns an empty string when the first character is an open parenthesis', () => {
                expect(SignatureInformation.resolveNamespace({
                    label: '('
                })).to.be.empty
            })

            it('returns the string up to the first open parenthesis', () => {
                const scenarios = new Map<string, Array<string>>([
                    ['foo', ['foo(', 'foo((', 'foo(bar.baz(']],
                    ['foo.bar', ['foo.bar(', 'foo.bar((', 'foo.bar(baz(']],
                    ['baz[1*^)   ', ['baz[1*^)   (']]
                ])

                scenarios.forEach((testCases: Array<string>, expected: string) => {
                    testCases.forEach((test: string) => {
                        expect(
                            SignatureInformation.resolveNamespace({
                                label: test
                            }),
                            `failed to properly resolve signature with label "${test}"`
                        ).to.equal(expected)
                    })
                })
            })

            it('returns the whole string if an open parenthesis cannot be found', () => {
                const testCases = new Array<string>(...[
                    'foo',
                    'foo)',
                    'foo      ))',
                    'foo.bar',
                    'foo{}.baz)'
                ])

                testCases.forEach((test: string) => {
                    expect(
                        SignatureInformation.resolveNamespace({
                            label: test
                        }),
                        `failed to properly resolve signature with label "${test}"`
                    ).to.equal(test)
                })
            })

            it('removes empty indexers', () => {
                const scenarios = new Map<string, Array<string>>([
                    ['foo', ['foo[](', 'fo[]o((', '[]foo(bar.baz[](']],
                    ['foo.bar', ['foo.bar[](', 'foo[].bar((', 'foo[].bar(baz[](']],
                    ['baz[1*^)   ', ['baz[1*^) []  (']]
                ])

                scenarios.forEach((testCases: Array<string>, expected: string) => {
                    testCases.forEach((test: string) => {
                        expect(
                            SignatureInformation.resolveNamespace({
                                label: test
                            }),
                            `failed to properly resolve signature with label "${test}"`
                        ).to.equal(expected)
                    })
                })
            })

            it('removes indexers containing integers', () => {
                const scenarios = new Map<string, Array<string>>([
                    ['foo', ['foo[1][](', 'fo[]o[1]((', '[]foo[1](bar.baz[](']],
                    ['foo.bar', ['foo[3].bar[](', 'foo[999][].bar((', 'foo[5][].bar(baz[.](']],
                    ['baz[1*^)  ] ', ['baz[1*^) [22] ] (']]
                ])

                scenarios.forEach((testCases: Array<string>, expected: string) => {
                    testCases.forEach((test: string) => {
                        expect(
                            SignatureInformation.resolveNamespace({
                                label: test
                            }),
                            `failed to properly resolve signature with label "${test}"`
                        ).to.equal(expected)
                    })
                })
            })
        })
    })
})
