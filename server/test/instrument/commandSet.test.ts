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
        describe('#completionDocs', () => {
            it('is empty on instantiation', () => {
                expect(new CommandSet(emptySpec).completionDocs).to.be.empty
            })
        })

        describe('#completions', () => {
            it('is empty on instantiation', () => {
                expect(new CommandSet(emptySpec).completions).to.be.empty
            })
        })

        describe('#signatures', () => {
            it('is empty on instantiation', () => {
                expect(new CommandSet(emptySpec).signatures).to.be.empty
            })
        })

        describe('#specification', () => {
            it('contains the passed InstrumentSpec', () => {
                expect(new CommandSet(emptySpec).specification).to.deep.equal(emptySpec)
            })
        })

        describe('#add()', () => {
            context('When adding nothing', () => {
                const emptyCommandSetInterface: CommandSetInterface = {
                    completions: []
                }
                const commandSet = new CommandSet(emptySpec)

                before('Add an empty CommandSet', () => {
                    commandSet.add(emptyCommandSetInterface)
                })

                it('does not add completion documentation when undefined', () => {
                    expect(commandSet.completionDocs).to.be.empty
                })

                it('does not add completions when none are given', () => {
                    expect(commandSet.completions).to.be.empty
                })

                it('does not add signatures when undefined', () => {
                    expect(commandSet.signatures).to.be.empty
                })
            })

            context('When adding to an empty CommandSet', () => {
                const commandSet = new CommandSet(emptySpec)

                before('Seed the CommandSet', () => {
                    commandSet.add({
                        completionDocs: documentationSetA,
                        completions: completionSetA,
                        signatures: signatureSetA
                    })
                })

                it('adds completion documentation to the empty set', () => {
                    expect(commandSet.completionDocs).to.deep.equal(documentationSetA)
                })

                it('adds completions to the empty set', () => {
                    expect(commandSet.completions).to.deep.equal(completionSetA)
                })

                it('adds signatures to the empty set', () => {
                    expect(commandSet.signatures).to.deep.equal(signatureSetA)
                })
            })

            context('When adding duplicates to the CommandSet', () => {
                const commandSet = new CommandSet(emptySpec)

                before('Seed the CommandSet', () => {
                    // Add an initial CommandSet.
                    commandSet.add({
                        completionDocs: documentationSetA,
                        completions: completionSetA,
                        signatures: signatureSetA
                    })

                    // Merge another set with our current CommandSet.
                    commandSet.add({
                        completionDocs: documentationSetB,
                        completions: completionSetB,
                        signatures: signatureSetB
                    })
                })

                it('merges completion documentation into an existing set', () => {
                    expect(commandSet.completionDocs).to.deep.equal(MapMerge(documentationSetA, documentationSetB))
                })

                it('merges completions into an existing set', () => {
                    expect(commandSet.completions).to.deep.equal(ArrayUnion(completionSetA, completionSetB))
                })

                it('merges signatures into an existing set', () => {
                    expect(commandSet.signatures).to.deep.equal(ArrayUnion(signatureSetA, signatureSetB))
                })
            })
        })

        describe('#getRootCompletions()', () => {
            context('When the CommandSet is empty', () => {
                const commandSet = new CommandSet(emptySpec)

                it('returns undefined if no completions are available', () => {
                    expect(commandSet.getRootCompletions()).to.be.undefined
                })
            })

            context('When the CommandSet is populated', () => {
                const rootBCompl: CompletionItem = {
                    label: 'foo'
                }
                const rootCCompl: CompletionItem = {
                    label: 'bar'
                }
                const commandSet = new CommandSet(emptySpec)

                before('Seed the CommandSet', () => {
                    commandSet.add({
                        completions: [
                            rootACompl,
                            rootASubrootCompl,
                            rootBCompl,
                            rootCCompl
                        ]
                    })
                })

                it('returns an array of root completions', () => {
                    const expected: Array<CompletionItem> = [
                        rootACompl,
                        rootBCompl,
                        rootCCompl
                    ]

                    expect(commandSet.getRootCompletions()).to.deep.equal(expected)
                })
            })
        })
    })
})
