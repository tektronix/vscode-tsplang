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

import { CompletionItem, SignatureInformation } from '../../src/decorators'
import { CommandSetInterface } from '../../src/instrument'

describe('Instrument', () => {
    describe('CommandSetInterface', () => {
        const rootACompl: CompletionItem = {
            label: 'root'
        }
        const rootAFooCompl: CompletionItem = {
            data: { domains: ['root'] },
            label: 'foo'
        }
        const rootABarCompl: CompletionItem = {
            data: { domains: ['root'] },
            label: 'bar'
        }
        const rootASubrootCompl: CompletionItem = {
            data: { domains: ['root'] },
            label: 'subroot'
        }
        const rootASubrootFooCompl: CompletionItem = {
            data: { domains: ['subroot', 'root'] },
            label: 'foo'
        }
        const rootASubrootBarCompl: CompletionItem = {
            data: { domains: ['subroot', 'root'] },
            label: 'bar'
        }
        const rootASubrootBazCompl: CompletionItem = {
            data: { domains: ['subroot', 'root'] },
            label: 'baz'
        }

        const rootAFooSig: SignatureInformation = {
            label: 'root.foo()'
        }
        const rootABarSig: SignatureInformation = {
            label: 'root.bar()'
        }
        const rootASubrootFooSig: SignatureInformation = {
            label: 'root.subroot[].foo()'
        }
        const rootASubrootBarSig: SignatureInformation = {
            label: 'root.subroot[].bar()'
        }
        const rootASubrootBazSig: SignatureInformation = {
            label: 'root.subroot[].baz()'
        }

        const completionSetA: Array<CompletionItem> = [
            rootACompl,
            rootAFooCompl,
            rootABarCompl,
            rootASubrootCompl,
            rootASubrootFooCompl,
            rootASubrootBarCompl,
            rootASubrootBazCompl
        ]
        const completionSetB: Array<CompletionItem> = [
            rootACompl,
            rootACompl,
            rootACompl,
            rootASubrootBarCompl,
            rootASubrootBarCompl,
            rootAFooCompl
        ]

        const signatureSetA: Array<SignatureInformation> = [
            rootAFooSig,
            rootABarSig,
            rootASubrootFooSig,
            rootASubrootBarSig,
            rootASubrootBazSig
        ]
        const signatureSetB: Array<SignatureInformation> = [
            rootAFooSig,
            rootAFooSig,
            rootAFooSig,
            rootASubrootBarSig,
            rootASubrootBarSig,
            rootASubrootFooSig,
        ]

        describe('.getCompletionMap()', () => {
            const expectedMapA = new Map<string, Array<CompletionItem>>([
                ['root', [rootACompl]],
                ['root.foo', [rootAFooCompl]],
                ['root.bar', [rootABarCompl]],
                ['root.subroot', [rootASubrootCompl]],
                ['root.subroot.foo', [rootASubrootFooCompl]],
                ['root.subroot.bar', [rootASubrootBarCompl]],
                ['root.subroot.baz', [rootASubrootBazCompl]]
            ])
            const expectedMapB = new Map<string, Array<CompletionItem>>([
                ['root', [rootACompl, rootACompl, rootACompl]],
                ['root.subroot.bar', [rootASubrootBarCompl, rootASubrootBarCompl]],
                ['root.foo', [rootAFooCompl]],
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
            const expectedMapA = new Map<string, Array<SignatureInformation>>([
                ['root.foo', [rootAFooSig]],
                ['root.bar', [rootABarSig]],
                ['root.subroot.foo', [rootASubrootFooSig]],
                ['root.subroot.bar', [rootASubrootBarSig]],
                ['root.subroot.baz', [rootASubrootBazSig]]
            ])
            const expectedMapB = new Map<string, Array<SignatureInformation>>([
                ['root.foo', [rootAFooSig, rootAFooSig, rootAFooSig]],
                ['root.subroot.bar', [rootASubrootBarSig, rootASubrootBarSig]],
                ['root.subroot.foo', [rootASubrootFooSig]],
            ])

            it('returns an empty map if the given array is empty', () => {
                expect(CommandSetInterface.getSignatureMap([])).to.be.empty
            })

            it('returns an accurate signature map', () => {
                expect(CommandSetInterface.getSignatureMap(signatureSetA)).to.deep.equal(expectedMapA)

                expect(CommandSetInterface.getSignatureMap(signatureSetB)).to.deep.equal(expectedMapB)
            })
        })
    })

    describe('CommandSet', () => {
        describe('#add()', () => {
            // expect.fail()
        })
    })
})
