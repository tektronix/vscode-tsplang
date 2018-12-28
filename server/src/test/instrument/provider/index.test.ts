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
// tslint:disable:no-implicit-dependencies no-unused-expression no-magic-numbers
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { CompletionItem, ResolvedNamespace, SignatureInformation } from '../../../decorators'
import { ApiSpec, CommandSet } from '../../../instrument'
import { generateCommandSet } from '../../../instrument/provider'
import { emptySpec } from '../emptySpec'

import { expectSignatureFormat } from './helpers'

describe('Instrument Provider', () => {
    describe('generateCommandSet()', () => {
        // Gets completions
        const basicSpec: Array<ApiSpec> = [
            {
                children: [
                    // Gets signatures
                    // Formats parameters based on the given InstrumentSpec
                    { label: 'beeper.beep' }
                ],
                label: 'beeper'
            },
            {
                children: [
                    // Gets completion documentation
                    { label: 'smu.measure.range' }
                ],
                label: 'smu.measure'
            }
        ]
        let commandSet: CommandSet

        before('Generate', () => {
            commandSet = generateCommandSet(basicSpec, emptySpec)
        })

        describe('return', () => {
            describe('#completionDocs', () => {
                const expectedLabels: Array<string> = ['smu.measure.range']

                expectedLabels.forEach((label: string) => {
                    it(`Contains a "${label}" key`, () => {
                        expect([...commandSet.completionDocs.keys()]).to.contain('smu.measure.range')
                    })
                })

                it('Contains no additional items', () => {
                    expect(commandSet.completionDocs.size).to.equal(expectedLabels.length)
                })
            })

            describe('#completions', () => {
                const expectedLabels: Array<string> = [
                    'beeper',
                    'beeper.beep',
                    'smu.measure',
                    'smu.measure.range'
                ]

                expectedLabels.forEach((label: string) => {
                    it(`Contains a "${label}" completion`, () => {
                        expect(commandSet.completions.some(
                            (completion: CompletionItem) => CompletionItem.namespaceMatch(label, completion)
                        )).to.be.true
                    })
                })

                it('Contains no additional items', () => {
                    expect(commandSet.completions.length).to.equal(expectedLabels.length)
                })
            })

            describe('#signatures', () => {
                const expectedLabels: Array<string> = ['beeper.beep']
                const formattableLabels: Array<string> = expectedLabels

                expectedLabels.forEach((label: string) => {
                    it(`Contains a "${label}" signature`, () => {
                        expect(commandSet.signatures.some(
                            (signature: SignatureInformation) => ResolvedNamespace.equal(
                                label,
                                SignatureInformation.resolveNamespace(signature)
                            )
                        )).to.be.true
                    })
                })

                formattableLabels.forEach((label: string) => {
                    it(`Signature "${label}" should be formatted`, () => {
                        expectSignatureFormat(commandSet.signatures.find(
                            (signature: SignatureInformation) => ResolvedNamespace.equal(
                                label,
                                SignatureInformation.resolveNamespace(signature)
                            )
                        ))
                    })
                })

                it('Contains no additional items', () => {
                    expect(commandSet.signatures.length).to.equal(expectedLabels.length)
                })
            })
        })

        // Same-namespace exclusives
        const specB: Array<ApiSpec> = [
            {
                children: [
                    {
                        // Populates assignment exclusives
                        assignmentExclusives: [
                            { label: 'buffer.FILL_CONTINUOUS' },
                            { label: 'buffer.FILL_ONCE' }
                        ],
                        label: 'buffer.write.reading',
                        // Populates signature exclusives
                        signatureExclusives: [
                            // Respects signature qualifiers
                            {
                                parameters: new Map([
                                    [
                                        4,
                                        [
                                            { label: 'buffer.OFF' }
                                        ]
                                    ],
                                ]),
                                qualifier: 0
                            },
                            {
                                parameters: new Map([
                                    [
                                        5,
                                        [
                                            { label: 'buffer.ON' }
                                        ]
                                    ],
                                ]),
                                qualifier: 1
                            },
                        ]
                    }
                ],
                label: 'buffer.write'
            },
            {
                enums: [
                    { label: 'buffer.FILL_CONTINUOUS' },
                    { label: 'buffer.FILL_ONCE' },
                    { label: 'buffer.OFF' },
                    { label: 'buffer.ON' }
                ],
                label: 'buffer'
            }
        ]
        // Cross-namespace exclusives
        const specC: Array<ApiSpec> = [
            {
                children: [
                    {
                        assignmentExclusives: [
                            { label: 'smu.ON' }
                        ],
                        label: 'eventlog.clear'
                    }
                ],
                label: 'eventlog'
            },
            {
                enums: [
                    { label: 'smu.ON' }
                ],
                label: 'smu'
            }
        ]
        // Removes exclusive enumerations
        const specD: ApiSpec = {
            enums: [
                { label: 'display.NFORMAT_DECIMAL' }
            ],
            label: 'display'
        }

        // it.skip('returns a CommandSet containing items which match the given ApiSpec')
        // it.skip('returns a CommandSet whose signatures have been formatted according the given InstrumentSpec')
        // it.skip('returns a CommandSet without extra items')

        // it.skip('assignment completions')
        // it.skip('populates same-namespace enumeration specs')
        // it.skip('populates cross-namespace enumeration specs')

        // it.skip('parameter completions')
        // it.skip('populates the correct parameter')
        // it.skip('populates the correct signature qualifier')
        // it.skip('populates same-namespace enumeration specs')
        // it.skip('populates cross-namespace enumeration specs')
    })
})
