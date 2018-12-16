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

import { CommandSetInterface } from '../../src/instrument'
import { InstrumentCompletionItem } from '../../src/wrapper'

describe('Instrument', () => {
    describe('CommandSetInterface', () => {
        const rootA: InstrumentCompletionItem = {
            label: 'root'
        }
        const rootAFoo: InstrumentCompletionItem = {
            data: { domains: ['root'] },
            label: 'foo'
        }
        const rootABar: InstrumentCompletionItem = {
            data: { domains: ['root'] },
            label: 'bar'
        }
        const rootASubroot: InstrumentCompletionItem = {
            data: { domains: ['root'] },
            label: 'subroot'
        }
        const rootASubrootFoo: InstrumentCompletionItem = {
            data: { domains: ['subroot', 'root'] },
            label: 'foo'
        }
        const rootASubrootBar: InstrumentCompletionItem = {
            data: { domains: ['subroot', 'root'] },
            label: 'bar'
        }
        const rootASubrootBaz: InstrumentCompletionItem = {
            data: { domains: ['subroot', 'root'] },
            label: 'baz'
        }

        const completionSetA: Array<InstrumentCompletionItem> = [
            rootA,
            rootAFoo,
            rootABar,
            rootASubroot,
            rootASubrootFoo,
            rootASubrootBar,
            rootASubrootBaz
        ]
        const completionSetB: Array<InstrumentCompletionItem> = [
            rootA,
            rootA,
            rootA,
            rootASubrootBar,
            rootASubrootBar,
            rootAFoo
        ]

        describe('.getCompletionMap()', () => {
            const expectedMapA = new Map<string, Array<InstrumentCompletionItem>>([
                ['root', [rootA]],
                ['root.foo', [rootAFoo]],
                ['root.bar', [rootABar]],
                ['root.subroot', [rootASubroot]],
                ['root.subroot.foo', [rootASubrootFoo]],
                ['root.subroot.bar', [rootASubrootBar]],
                ['root.subroot.baz', [rootASubrootBaz]]
            ])
            const expectedMapB = new Map<string, Array<InstrumentCompletionItem>>([
                ['root', [rootA, rootA, rootA]],
                ['root.subroot.bar', [rootASubrootBar, rootASubrootBar]],
                ['root.foo', [rootAFoo]],
            ])

            it('returns an empty map if the given array is empty', () => {
                expect(CommandSetInterface.getCompletionMap([])).to.be.empty
            })

            it('returns an accurate completion map', () => {
                expect(CommandSetInterface.getCompletionMap(completionSetA)).to.deep.equal(expectedMapA)

                expect(CommandSetInterface.getCompletionMap(completionSetB)).to.deep.equal(expectedMapB)
            })
        })

        describe('.getSignatureMap()', () => {
            // expect.fail()
        })
    })

    describe('CommandSet', () => {
        describe('#add()', () => {
            // expect.fail()
        })
    })
})
