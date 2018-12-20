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

import { CompletionItem } from '../../src/decorators'

import { makeStringArray, makeTestToken } from '../testTypes'

describe('Decorators', () => {
    describe('CompletionItem', () => {
        const emptyCompletion: CompletionItem = {
            label: ''
        }
        const noDomainCompletion: CompletionItem = {
            kind: 9,
            label: 'foo'
        }
        const singleDomainCompletion: CompletionItem = {
            data: { domains: ['foo'] },
            kind: 9,
            label: 'bar'
        }
        const multiDomainCompletion: CompletionItem = {
            data: { domains: ['bar', 'foo'] },
            kind: 9,
            label: 'baz'
        }

        describe('.createRootItems()', () => {
            it('returns an empty array when the given string is empty', () => {
                expect(
                    CompletionItem.createRootItems('', false),
                    'results not empty given an empty string with the last item included'
                ).to.be.empty

                expect(
                    CompletionItem.createRootItems('', true),
                    'results not empty given an empty string without the last item'
                ).to.be.empty
            })

            it('returns an empty array if nothing could be created', () => {
                interface TestRecipe {
                    excludeLast: boolean
                    includeLast: boolean
                    test: string
                }

                const scenarios = new Array<TestRecipe>(...[
                    {excludeLast: true, includeLast: false, test: 'foo'},
                    {excludeLast: true, includeLast: true, test: '.bar'},
                    {excludeLast: true, includeLast: true, test: 'foo..baz'},
                    {excludeLast: false, includeLast: true, test: 'foo.bar.'}
                ])

                scenarios.forEach((recipe: TestRecipe) => {
                    // Fail this test if both are false
                    if (! recipe.excludeLast && ! recipe.includeLast) {
                        expect.fail(
                            'both are false',
                            'expected "excludeLast" or "includeLast" to be true',
                            `invalid test recipe "${JSON.stringify(recipe)}"`
                        )
                    }

                    if (recipe.excludeLast) {
                        expect(
                            CompletionItem.createRootItems(recipe.test, true),
                            `results not empty given "${recipe.test}" without the last item`
                        ).to.be.empty
                    }

                    if (recipe.includeLast) {
                        expect(
                            CompletionItem.createRootItems(recipe.test, false),
                            `results not empty given "${recipe.test}" with the last item included`
                        ).to.be.empty
                    }
                })
            })

            it('returns an accurate set of completion items when the last namespace is included', () => {
                const scenarios = new Map<string, Array<CompletionItem>>([
                    ['foo', [noDomainCompletion]],
                    ['foo.bar', [noDomainCompletion, singleDomainCompletion]],
                    ['foo.bar.baz', [noDomainCompletion, singleDomainCompletion, multiDomainCompletion]]
                ])

                scenarios.forEach((expected: Array<CompletionItem>, test: string) => {
                    expect(
                        CompletionItem.createRootItems(test, false),
                        `failed to create accurate root completions for "${test}" with the last item included`
                    ).to.deep.equal(expected)
                })
            })

            it('returns an accurate set of completion items when the last namespace is excluded', () => {
                const scenarios = new Map<string, Array<CompletionItem>>([
                    ['foo.bar', [noDomainCompletion]],
                    ['foo.bar.baz', [noDomainCompletion, singleDomainCompletion]]
                ])

                scenarios.forEach((expected: Array<CompletionItem>, test: string) => {
                    expect(
                        CompletionItem.createRootItems(test, true),
                        `failed to create accurate root completions for "${test}" without the last item`
                    ).to.deep.equal(expected)
                })
            })
        })

        describe('.namespaceMatch()', () => {
            it('returns true when the given string is empty', () => {
                const testCompletions = [
                    emptyCompletion,
                    noDomainCompletion,
                    singleDomainCompletion,
                    multiDomainCompletion
                ]

                testCompletions.forEach((completion: CompletionItem) => {
                    expect(
                        CompletionItem.namespaceMatch('', completion),
                        `an empty string failed to match "${JSON.stringify(completion)}"`
                    ).to.be.true
                })
            })

            it('returns true when the given string is a partial match', () => {
                const scenarios = new Map<CompletionItem, Array<string>>([
                    [noDomainCompletion, ['f', 'fo']],
                    [singleDomainCompletion, ['foo.', 'foo.b', 'foo.ba']],
                    [multiDomainCompletion, ['foo.bar.', 'foo.bar.b', 'foo.bar.ba']]
                ])

                scenarios.forEach((cases: Array<string>, completion: CompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            CompletionItem.namespaceMatch(test, completion),
                            `"${test}" failed to match "${JSON.stringify(completion)}"`
                        ).to.be.true
                    })
                })
            })

            it('returns true when the given string is a whole match', () => {
                const scenarios = new Map<CompletionItem, string>([
                    [noDomainCompletion, 'foo'],
                    [singleDomainCompletion, 'foo.bar'],
                    [multiDomainCompletion, 'foo.bar.baz']
                ])

                scenarios.forEach((test: string, completion: CompletionItem) => {
                    expect(
                        CompletionItem.namespaceMatch(test, completion),
                        `"${test}" failed to match "${JSON.stringify(completion)}"`
                    ).to.be.true
                })
            })

            it('returns false when the given string is not a whole or partial match', () => {
                const scenarios = new Map<CompletionItem, Array<string>>([
                    [noDomainCompletion, ['z', 'foz', 'F', 'fOO']],
                    [singleDomainCompletion, ['z.ba', 'FoO.bar', 'foo.bAr']],
                    [multiDomainCompletion, ['foo.z.baz', 'foo.bar.B', 'Foo.bar.baz']]
                ])

                scenarios.forEach((cases: Array<string>, completion: CompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            CompletionItem.namespaceMatch(test, completion),
                            `"${test}" matched "${JSON.stringify(completion)}"`
                        ).to.be.false
                    })
                })
            })

            it('returns false when namespace depths are not equal', () => {
                const scenarios = new Map<CompletionItem, Array<string>>([
                    [noDomainCompletion, ['foo.', 'foo..']],
                    [singleDomainCompletion, ['foo', 'foo..', 'foo.bar.']],
                    [multiDomainCompletion, ['foo', 'foo.bar', 'foo.bar..', 'foo.bar.baz.']]
                ])

                scenarios.forEach((cases: Array<string>, completion: CompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            CompletionItem.namespaceMatch(test, completion),
                            `"${test}" matched "${JSON.stringify(completion)}"`
                        ).to.be.false
                    })
                })
            })

            it('(#31) escapes the given string before creating a RegExp', () => {
                const scenarios = new Map<CompletionItem, Array<string>>([
                    [noDomainCompletion, [
                        '(',
                        '[',
                        'foo(',
                        'foo[',
                        'y(foo',
                        'y[foo',
                        'y.z(fo',
                        'y.z[fo'
                    ]],
                    [singleDomainCompletion, [
                        'foo.bar(',
                        'foo.bar[',
                        'y(foo.bar',
                        'y[foo.bar',
                        'y.z(foo.',
                        'y.z[foo.ba'
                    ]],
                ])

                scenarios.forEach((cases: Array<string>, completion: CompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            () => CompletionItem.namespaceMatch(test, completion),
                            `failed to properly escape the RegExp input "${test}"`
                        ).to.not.throw()
                    })
                })
            })
        })

        describe('.namespacesEqual()', () => {
            it('returns true when the given completions are equivalent', () => {
                const testCompletions = [
                    emptyCompletion,
                    noDomainCompletion,
                    singleDomainCompletion,
                    multiDomainCompletion
                ]

                testCompletions.forEach((test: CompletionItem) => {
                    expect(
                        CompletionItem.namespacesEqual(test, test),
                        `"${JSON.stringify(test)}" failed to equal itself`
                    ).to.be.true

                    expect(
                        CompletionItem.namespacesEqual(test, test, true),
                        `"${JSON.stringify(test)}" failed to equal itself without its label`
                    ).to.be.true
                })
            })

            it('returns false when the given completions are different', () => {
                const testCompletions = [
                    noDomainCompletion,
                    singleDomainCompletion,
                    multiDomainCompletion,
                    {
                        data: { domains: ['bar'] },
                        label: 'baz'
                    }
                ]

                testCompletions.forEach((itemA: CompletionItem, indexA: number) => {
                    testCompletions.forEach((itemB: CompletionItem, indexB: number) => {
                        // Skip the current item B if it's the same as item A
                        if (indexB === indexA) {
                            return
                        }

                        expect(
                            CompletionItem.namespacesEqual(itemA, itemB),
                            `"${JSON.stringify(itemA)}" equals "${JSON.stringify(itemB)}"`
                        ).to.be.false

                        expect(
                            CompletionItem.namespacesEqual(itemA, itemB, true),
                            `"${JSON.stringify(itemA)}" equals "${JSON.stringify(itemB)}" without labels`
                        ).to.be.false
                    })
                })
            })
        })

        describe('.resolveNamespace()', () => {
            it('returns an empty string when label is an empty string', () => {
                expect(CompletionItem.resolveNamespace(emptyCompletion)).to.be.empty
            })

            it('returns a properly resolved completion namespace', () => {
                const scenarios = new Map<string, CompletionItem>([
                    ['foo', noDomainCompletion],
                    ['foo.bar', singleDomainCompletion],
                    ['foo.bar.baz', multiDomainCompletion]
                ])

                scenarios.forEach((test: CompletionItem, expected: string) => {
                    expect(
                        CompletionItem.resolveNamespace(test),
                        `failed to properly resolve completion "${JSON.stringify(test)}"`
                    ).to.equal(expected)
                })
            })
        })

        describe('.tokensMatch()', () => {
            const foo = makeTestToken('foo')
            const bar = makeTestToken('bar')
            const baz = makeTestToken('baz')
            const dot = makeTestToken('.')

            it('returns true given an empty Token array', () => {
                expect(CompletionItem.tokensMatch([], singleDomainCompletion)).to.be.true
            })

            it('returns true if the Token array matches the CompletionItem', () => {
                const testCases: Map<CompletionItem, Array<Token>> = new Map([
                    [noDomainCompletion, [foo]],
                    [singleDomainCompletion, [foo, dot, bar]],
                    [multiDomainCompletion, [foo, dot, bar, dot, baz]]
                ])

                testCases.forEach((itemA: Array<Token>, itemB: CompletionItem) => {
                    expect(
                        CompletionItem.tokensMatch(itemA, itemB),
                        `"${JSON.stringify(makeStringArray(...itemA))}" did not match "${JSON.stringify(itemB)}"`
                    ).to.be.true
                })
            })

            it('returns false if the Token array does not match the CompletionItem', () => {
                const testCases: Map<CompletionItem, Array<Token>> = new Map([
                    [noDomainCompletion, [foo, dot, bar, dot, baz]],
                    [singleDomainCompletion, [foo]],
                    [multiDomainCompletion, [foo, dot, bar]]
                ])

                testCases.forEach((itemA: Array<Token>, itemB: CompletionItem) => {
                    expect(
                        CompletionItem.tokensMatch(itemA, itemB),
                        `"${JSON.stringify(makeStringArray(...itemA))}" matched "${JSON.stringify(itemB)}"`
                    ).to.be.false
                })
            })
        })
    })
})
