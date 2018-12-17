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

import { CompletionItem, MarkupContent, MarkupContentCallback, SignatureInformation } from '../../src/decorators'
import { CommandSet, CommandSetInterface } from '../../src/instrument'

import { emptySpec } from '../instrument/emptySpec'

import { ArrayUnion, MapMerge } from './helpers'

describe('Instrument', () => {
    const emptyDocCallback: MarkupContentCallback = (): MarkupContent => MarkupContent``

    const rootADoc: [string, MarkupContentCallback] = [
        'root',
        emptyDocCallback
    ]
    const rootAFooDoc: [string, MarkupContentCallback] = [
        'root.foo',
        emptyDocCallback
    ]
    const rootABarDoc: [string, MarkupContentCallback] = [
        'foo.bar',
        emptyDocCallback
    ]
    const rootASubrootDoc: [string, MarkupContentCallback] = [
        'root.subroot',
        emptyDocCallback
    ]
    const rootASubrootFooDoc: [string, MarkupContentCallback] = [
        'root.subroot.foo',
        emptyDocCallback
    ]
    const rootASubrootBarDoc: [string, MarkupContentCallback] = [
        'root.subroot.bar',
        emptyDocCallback
    ]
    const rootASubrootBazDoc: [string, MarkupContentCallback] = [
        'root.subroot.baz',
        emptyDocCallback
    ]

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

    const documentationSetA: Map<string, MarkupContentCallback> = new Map([
        rootADoc,
        rootAFooDoc,
        rootASubrootDoc,
        rootASubrootFooDoc
    ])
    const documentationSetB: Map<string, MarkupContentCallback> = new Map([
        rootADoc,
        rootAFooDoc,
        rootABarDoc,
        rootASubrootDoc,
        rootASubrootFooDoc,
        rootASubrootBarDoc,
        rootASubrootBazDoc
    ])

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

    describe('CommandSetInterface', () => {
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
        let commandSet: CommandSet

        before(() => {
            commandSet = new CommandSet(emptySpec)
        })

        describe('#completionDocs', () => {
            it('is empty on instantiation', () => {
                expect(commandSet.completionDocs).to.be.empty
            })
        })

        describe('#completions', () => {
            it('is empty on instantiation', () => {
                expect(commandSet.completions).to.be.empty
            })
        })

        describe('#signatures', () => {
            it('is empty on instantiation', () => {
                expect(commandSet.signatures).to.be.empty
            })
        })

        describe('#specification', () => {
            it('contains the passed InstrumentSpec', () => {
                expect(commandSet.specification).to.deep.equal(emptySpec)
            })
        })

        describe('#add()', () => {
            const emptyCommandSetInterface: CommandSetInterface = {
                completions: []
            }

            it('does not add completion documentation when undefined', () => {
                expect(commandSet.completionDocs).to.be.empty

                commandSet.add(emptyCommandSetInterface)

                expect(commandSet.completionDocs).to.be.empty
            })

            it('does not add completions when none are given', () => {
                expect(commandSet.completions).to.be.empty

                commandSet.add(emptyCommandSetInterface)

                expect(commandSet.completions).to.be.empty
            })

            it('does not add signatures when undefined', () => {
                expect(commandSet.signatures).to.be.empty

                commandSet.add(emptyCommandSetInterface)

                expect(commandSet.signatures).to.be.empty
            })

            it('adds completion documentation to the empty set', () => {
                expect(commandSet.completionDocs).to.be.empty

                commandSet.add({
                    completionDocs: documentationSetA,
                    completions: []
                })

                expect(commandSet.completionDocs).to.deep.equal(documentationSetA)
            })

            it('adds completions to the empty set', () => {
                expect(commandSet.completions).to.be.empty

                commandSet.add({
                    completions: completionSetA
                })

                expect(commandSet.completions).to.deep.equal(completionSetA)
            })

            it('adds signatures to the empty set', () => {
                expect(commandSet.signatures).to.be.empty

                commandSet.add({
                    completions: [],
                    signatures: signatureSetA
                })

                expect(commandSet.signatures).to.deep.equal(signatureSetA)
            })

            it('merges completion documentation into an existing set', () => {
                if (commandSet.completionDocs.size === 0) {
                    commandSet.add({
                        completionDocs: documentationSetA,
                        completions: []
                    })
                }

                expect(commandSet.completionDocs).to.deep.equal(documentationSetA)

                commandSet.add({
                    completionDocs: documentationSetB,
                    completions: []
                })

                expect(commandSet.completionDocs).to.deep.equal(MapMerge(documentationSetA, documentationSetB))
            })

            it('merges completions into an existing set', () => {
                if (commandSet.completions.length === 0) {
                    commandSet.add({
                        completions: completionSetA
                    })
                }

                expect(commandSet.completions).to.deep.equal(completionSetA)

                commandSet.add({
                    completions: completionSetB
                })

                expect(commandSet.completions).to.deep.equal(ArrayUnion(completionSetA, completionSetB))
            })

            it('merges signatures into an existing set', () => {
                if (commandSet.signatures.length === 0) {
                    commandSet.add({
                        completions: [],
                        signatures: signatureSetA
                    })
                }

                expect(commandSet.signatures).to.deep.equal(signatureSetA)

                commandSet.add({
                    completions: [],
                    signatures: signatureSetB
                })

                expect(commandSet.signatures).to.deep.equal(ArrayUnion(signatureSetA, signatureSetB))
            })
        })
    })
})
