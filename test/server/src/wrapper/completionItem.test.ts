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

import { InstrumentCompletionItem } from '../../../../server/src/wrapper'

describe('Wrapper', () => {
    describe('InstrumentCompletionItem', () => {
        describe('.createRootItems()', () => {
            expect.fail
        })

        describe('.namespaceMatch()', () => {
            const emptyCompletion: InstrumentCompletionItem = {
                label: ''
            }
            const noDomainCompletion: InstrumentCompletionItem = {
                label: 'foo'
            }
            const singleDomainCompletion: InstrumentCompletionItem = {
                data: { domains: ['foo'] },
                label: 'bar'
            }
            const multiDomainCompletion: InstrumentCompletionItem = {
                data: { domains: ['bar', 'foo'] },
                label: 'baz'
            }

            it('returns true when the given string is empty', () => {
                const testCompletions = [
                    emptyCompletion,
                    noDomainCompletion,
                    singleDomainCompletion,
                    multiDomainCompletion
                ]

                testCompletions.forEach((completion: InstrumentCompletionItem) => {
                    expect(
                        InstrumentCompletionItem.namespaceMatch('', completion),
                        `an empty string failed to match "${JSON.stringify(completion)}"`
                    ).to.be.true
                })
            })

            it('returns true when the given string is a partial match', () => {
                const scenarios = new Map<InstrumentCompletionItem, Array<string>>([
                    [noDomainCompletion, ['f', 'fo']],
                    [singleDomainCompletion, ['foo.', 'foo.b', 'foo.ba']],
                    [multiDomainCompletion, ['foo.bar.', 'foo.bar.b', 'foo.bar.ba']]
                ])

                scenarios.forEach((cases: Array<string>, completion: InstrumentCompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            InstrumentCompletionItem.namespaceMatch(test, completion),
                            `"${test}" failed to match "${JSON.stringify(completion)}"`
                        ).to.be.true
                    })
                })
            })

            it('returns true when the given string is a whole match', () => {
                const scenarios = new Map<InstrumentCompletionItem, string>([
                    [noDomainCompletion, 'foo'],
                    [singleDomainCompletion, 'foo.bar'],
                    [multiDomainCompletion, 'foo.bar.baz']
                ])

                scenarios.forEach((test: string, completion: InstrumentCompletionItem) => {
                    expect(
                        InstrumentCompletionItem.namespaceMatch(test, completion),
                        `"${test}" failed to match "${JSON.stringify(completion)}"`
                    ).to.be.true
                })
            })

            it('returns false when the given string is not a whole or partial match', () => {
                const scenarios = new Map<InstrumentCompletionItem, Array<string>>([
                    [noDomainCompletion, ['z', 'foz', 'F', 'fOO']],
                    [singleDomainCompletion, ['z.ba', 'FoO.bar', 'foo.bAr']],
                    [multiDomainCompletion, ['foo.z.baz', 'foo.bar.B', 'Foo.bar.baz']]
                ])

                scenarios.forEach((cases: Array<string>, completion: InstrumentCompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            InstrumentCompletionItem.namespaceMatch(test, completion),
                            `"${test}" matched "${JSON.stringify(completion)}"`
                        ).to.be.false
                    })
                })
            })

            it('returns false when namespace depths are not equal', () => {
                const scenarios = new Map<InstrumentCompletionItem, Array<string>>([
                    [noDomainCompletion, ['foo.', 'foo..']],
                    [singleDomainCompletion, ['foo', 'foo..', 'foo.bar.']],
                    [multiDomainCompletion, ['foo', 'foo.bar', 'foo.bar..', 'foo.bar.baz.']]
                ])

                scenarios.forEach((cases: Array<string>, completion: InstrumentCompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            InstrumentCompletionItem.namespaceMatch(test, completion),
                            `"${test}" matched "${JSON.stringify(completion)}"`
                        ).to.be.false
                    })
                })
            })

            it('(#31) escapes the given string before creating a RegExp', () => {
                const scenarios = new Map<InstrumentCompletionItem, Array<string>>([
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

                scenarios.forEach((cases: Array<string>, completion: InstrumentCompletionItem) => {
                    cases.forEach((test: string) => {
                        expect(
                            () => InstrumentCompletionItem.namespaceMatch(test, completion),
                            `failed to properly escape the RegExp input "${test}"`
                        ).to.not.throw()
                    })
                })
            })
        })

        describe('.namespacesEqual()', () => {
            expect.fail
        })
    })
})
