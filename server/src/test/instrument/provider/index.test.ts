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
// tslint:disable:no-implicit-dependencies no-unused-expression no-magic-numbers
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { CompletionItem, ResolvedNamespace, SignatureInformation } from '../../../decorators'
import { ApiSpec, CommandSet, InstrumentSpec } from '../../../instrument'
import { generateCommandSet } from '../../../instrument/provider'
import { emptySpec } from '../emptySpec'

import { expectSignatureFormat } from './helpers'

interface Given {
    api: Array<ApiSpec>
    spec: InstrumentSpec
}

interface ExpectedSignature {
    exclusives?: Map<number, Array<string>>
    formattable?: boolean
    loaded: boolean
    qualifier?: number
}

interface ExpectedCompletion {
    /**
     * Exclusive assignment completion labels.
     */
    exclusives?: Array<string>
    /**
     * Whether this CompletionItem has a corresponding entry
     * in the resulting CommandSet.completionDocs Map.
     */
    formattable?: boolean
    label: string
    /**
     * All corresponding SignatureInformation.
     */
    signatures?: Array<ExpectedSignature>
}

interface TestCase {
    expected: Array<ExpectedCompletion>
    given: Given
    /**
     * The test name.
     */
    name: string
}

interface ErrorCase {
    /**
     * The expected error message.
     */
    expected: string
    given: Given
    /**
     * The test name.
     */
    name: string
}

describe('Instrument Provider', () => {
    describe('generateCommandSet()', () => {
        const testCases: Array<TestCase> = [
            {
                expected: [
                    {
                        label: 'beeper'
                    },
                    {
                        label: 'beeper.beep',
                        signatures: [
                            {
                                formattable: true,
                                loaded: false
                            }
                        ]
                    },
                    {
                        label: 'reset',
                        signatures: [
                            {
                                loaded: false
                            }
                        ]
                    },
                    {
                        label: 'smu.measure'
                    },
                    {
                        formattable: true,
                        label: 'smu.measure.range'
                    },
                    {
                        formattable: true,
                        label: 'test/root.completion.docs'
                    }
                ],
                given: {
                    api: [
                        {
                            children: [
                                // Gets signatures
                                // Formats parameters based on the given InstrumentSpec
                                { label: 'beeper.beep' }
                            ],
                            label: 'beeper'
                        },
                        {
                            // Gets root namespace signatures.
                            label: 'reset'
                        },
                        {
                            children: [
                                // Gets completion documentation.
                                { label: 'smu.measure.range' }
                            ],
                            label: 'smu.measure'
                        },
                        {
                            // Gets root namespace completion documentation.
                            label: 'test/root.completion.docs'
                        },
                        // Get a provider file that doesn't export a completion with the same name.
                        {
                            label: 'keywords'
                        }
                    ],
                    spec: emptySpec
                },
                name: 'Basic Test'
            },
            {
                expected: [
                    {
                        label: 'beeper'
                    },
                    {
                        label: 'beeper.beep',
                        signatures: [
                            {
                                formattable: true,
                                loaded: true
                            }
                        ]
                    }
                ],
                given: {
                    api: [
                        {
                            children: [
                                { label: 'beeper.beep' },
                                // Try to get a completion that shouldn't exist here.
                                { label: 'smu.measure.range' }
                            ],
                            label: 'beeper'
                        }
                    ],
                    spec: emptySpec
                },
                name: 'Loaded Signature Test'
            },
            {
                expected: [
                    {
                        label: 'display'
                    }
                ],
                given: {
                    api: [
                        {
                            enums: [
                                { label: 'display.NFORMAT_DECIMAL' },
                                // Try to get an enumeration that shouldn't exist here
                                { label: 'smu.ON' }
                            ],
                            label: 'display'
                        }
                    ],
                    spec: emptySpec
                },
                name: 'Removes Exclusive Enumerations'
            },
            {
                expected: [
                    {
                        label: 'eventlog'
                    },
                    {
                        exclusives: [
                            'smu',
                            'smu.ON'
                        ],
                        label: 'eventlog.getcount',
                        signatures: [
                            {
                                loaded: false
                            }
                        ]
                    },
                    {
                        label: 'smu'
                    },
                    {
                        label: 'smu.ON'
                    }
                ],
                given: {
                    api: [
                        {
                            children: [
                                {
                                    assignmentExclusives: [
                                        { label: 'smu.ON' }
                                    ],
                                    label: 'eventlog.getcount'
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
                    ],
                    spec: emptySpec
                },
                name: 'Cross-Namespace Exclusives'
            },
            {
                expected: [
                    {
                        label: 'buffer'
                    },
                    {
                        label: 'buffer.FILL_CONTINUOUS'
                    },
                    {
                        label: 'buffer.FILL_ONCE'
                    },
                    {
                        label: 'buffer.OFF'
                    },
                    {
                        label: 'buffer.ON'
                    },
                    {
                        label: 'buffer.write'
                    },
                    {
                        label: 'buffer.write.format',
                        signatures: [
                            {
                                exclusives: new Map([
                                    [
                                        0,
                                        [
                                            'buffer',
                                            'buffer.OFF'
                                        ]
                                    ]
                                ]),
                                loaded: false
                            }
                        ]
                    },
                    {
                        exclusives: [
                            'buffer',
                            'buffer.FILL_CONTINUOUS',
                            'buffer.FILL_ONCE'
                        ],
                        label: 'buffer.write.reading',
                        signatures: [
                            {
                                exclusives: new Map([
                                    [
                                        4,
                                        [
                                            'buffer',
                                            'buffer.OFF'
                                        ]
                                    ]
                                ]),
                                loaded: false,
                                qualifier: 0
                            },
                            {
                                exclusives: new Map([
                                    [
                                        5,
                                        [
                                            'buffer',
                                            'buffer.ON'
                                        ]
                                    ]
                                ]),
                                loaded: false,
                                qualifier: 1
                            }
                        ]
                    }
                ],
                given: {
                    api: [
                        {
                            children: [
                                {
                                    // Creates SignatureInformation.data during parameter exclusive population.
                                    label: 'buffer.write.format',
                                    signatureExclusives: [
                                        {
                                            parameters: new Map([
                                                [
                                                    0,
                                                    [
                                                        { label: 'buffer.OFF' }
                                                    ]
                                                ]
                                            ])
                                        }
                                    ]
                                },
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
                    ],
                    spec: emptySpec
                },
                name: 'Same-Namespace Exclusives'
            }
        ]

        testCases.forEach((test: TestCase) => {
            let commandSet: CommandSet
            let completionDocLength: number
            const completionLength = test.expected.length
            let signatureLength: number

            beforeEach('Generate', () => {
                commandSet = generateCommandSet(test.given.api, emptySpec, false)
                completionDocLength = test.expected.filter((value: ExpectedCompletion) => !!value.formattable).length
                signatureLength = 0
                test.expected.forEach((value: ExpectedCompletion) => {
                    if (value.signatures !== undefined) {
                        signatureLength += value.signatures.length
                    }
                })
            })

            describe(test.name, () => {
                test.expected.forEach((apiEntry: ExpectedCompletion) => {
                    let matchingCompletion: CompletionItem

                    // #completionDocs
                    if (apiEntry.formattable === true) {
                        it(`${apiEntry.label}: has a #completionDocs entry`, () => {
                            expect([...commandSet.completionDocs.keys()]).to.contain(apiEntry.label)
                        })

                        completionDocLength++
                    }
                    else {
                        it(`${apiEntry.label}: does not have a #completionDocs entry`, () => {
                            expect([...commandSet.completionDocs.keys()]).to.not.contain(apiEntry.label)
                        })
                    }

                    // #completions
                    it(`${apiEntry.label}: has a single #completions entry`, () => {
                        const matches = commandSet.completions.filter(
                            (completion: CompletionItem) => CompletionItem.namespaceMatch(apiEntry.label, completion)
                        )

                        expect(matches.length, 'found duplicate completions').to.be.lessThan(2)

                        expect(matches, 'no completion matches found').to.not.be.empty

                        matchingCompletion = matches.pop()
                    })

                    // exclusive assignment completions
                    if (apiEntry.exclusives !== undefined) {
                        it(`${apiEntry.label}: provides ${apiEntry.exclusives.length} assignment exclusives`, () => {
                            expect(matchingCompletion.data.types.length).to.equal(apiEntry.exclusives.length)
                        })

                        apiEntry.exclusives.forEach((value: string) => {
                            it(`${apiEntry.label}: has a "${value}" assignment exclusive`, () => {
                                expect(matchingCompletion.data.types.some(
                                    (completion: CompletionItem) => CompletionItem.namespaceMatch(
                                        value,
                                        completion
                                    )
                                )).to.be.true
                            })
                        })
                    }
                    else {
                        it(`${apiEntry.label}: provides no assignment exclusives`, () => {
                            expect(
                                matchingCompletion.data === undefined || matchingCompletion.data.types === undefined
                            ).to.be.true
                        })
                    }

                    // #signatures
                    if (apiEntry.signatures !== undefined) {
                        apiEntry.signatures.forEach((signatureEntry: ExpectedSignature, index: number) => {
                            let matchingSignature: SignatureInformation

                            it(`${apiEntry.label}: has a #signatures entry`, () => {
                                const matchingLabelSignatures = commandSet.signatures.filter(
                                    (value: SignatureInformation) => ResolvedNamespace.equal(
                                        apiEntry.label,
                                        SignatureInformation.resolveNamespace(value)
                                    )
                                )

                                if (signatureEntry.qualifier !== undefined) {
                                    const fullMatch = matchingLabelSignatures.filter(
                                        (value: SignatureInformation) => {
                                            return value.data !== undefined
                                                && value.data.qualifier === signatureEntry.qualifier
                                        }
                                    )

                                    expect(
                                        fullMatch.length,
                                        `found duplicate signature qualifiers for "${apiEntry.label}"`
                                    ).to.be.lessThan(2)

                                    expect(
                                        fullMatch,
                                        'no signature matches found for '
                                            + `"${apiEntry.label}" (#${signatureEntry.qualifier})`
                                    ).to.not.be.empty

                                    matchingSignature = fullMatch.pop()
                                }
                                else {
                                    expect(
                                        matchingLabelSignatures.length,
                                        `found multiple signature matches, but no test case qualifier was given`
                                    ).to.be.lessThan(2)

                                    expect(
                                        matchingLabelSignatures,
                                        `no signature matches found for "${apiEntry.label}"`
                                    ).to.not.be.empty

                                    matchingSignature = matchingLabelSignatures.pop()
                                }
                            })

                            if (signatureEntry.loaded) {
                                it(`${apiEntry.label}: has already been loaded`, () => {
                                    expect(matchingSignature._loaded).to.be.true
                                })
                            }

                            if (signatureEntry.formattable === true) {
                                it(`${apiEntry.label}: parameters are formatted correctly`, () => {
                                    expectSignatureFormat(matchingSignature)
                                })
                            }
                            else {
                                it(`${apiEntry.label}: does not have a parameter formatter`, () => {
                                    expect(matchingSignature.getFormattedParameters).to.be.undefined
                                })
                            }

                            // exclusive parameter completions
                            if (signatureEntry.exclusives !== undefined) {
                                signatureEntry.exclusives.forEach(
                                    (exclusivesExpected: Array<string>, param: number) => {
                                        it(
                                            `${apiEntry.label} (#${index}): provides expected parameter exclusives`,
                                            () => {
                                                // convert all available Array<CompletionItem> to Array<string>
                                                const exclusivesActual = new Array<string>()
                                                matchingSignature.data.parameterTypes.get(param).forEach(
                                                    (completion: CompletionItem) => {
                                                        exclusivesActual.push(
                                                            CompletionItem.resolveNamespace(completion)
                                                        )
                                                    }
                                                )

                                                expect(exclusivesActual).to.have.members(exclusivesExpected)
                                            }
                                        )
                                    }
                                )
                            }
                            else {
                                it(`${apiEntry.label} (#${index}): provides no parameter exclusives`, () => {
                                    expect(
                                        matchingSignature.data === undefined
                                        || matchingSignature.data.qualifier === undefined
                                    ).to.be.true
                                })
                            }
                        })
                    }
                    else {
                        it(`${apiEntry.label}: does not have a #signatures entry`, () => {
                            expect(commandSet.signatures.some(
                                (signature: SignatureInformation) => ResolvedNamespace.equal(
                                    apiEntry.label,
                                    SignatureInformation.resolveNamespace(signature)
                                )
                            )).to.be.false
                        })
                    }
                })

                it('Contains no additional #completionDocs', () => {
                    expect(commandSet.completionDocs.size).to.equal(completionDocLength)
                })

                it('Contains no additional #completions', () => {
                    expect(commandSet.completions.length).to.equal(completionLength)
                })

                it('Contains no additional #signatures', () => {
                    expect(commandSet.signatures.length).to.equal(signatureLength)
                })
            })
        })

        const errorCases: Array<ErrorCase> = [
            {
                expected: 'Unable to satisfy assignment exclusives for "smu.reset"',
                given: {
                    api: [
                        {
                            children: [
                                {
                                    assignmentExclusives: [
                                        { label: 'foo' }
                                    ],
                                    label: 'smu.reset'
                                }
                            ],
                            label: 'smu'
                        },
                    ],
                    spec: emptySpec
                },
                name: 'Errors when no assignment exclusives can be satisfied'
            },
            {
                expected: 'Unable to satisfy assignment exclusives for "smu.reset"',
                given: {
                    api: [
                        {
                            children: [
                                {
                                    assignmentExclusives: [
                                        { label: 'smu.ON' },
                                        { label: 'foo.BAR' }
                                    ],
                                    label: 'smu.reset'
                                }
                            ],
                            enums: [
                                { label: 'smu.ON' }
                            ],
                            label: 'smu'
                        },
                    ],
                    spec: emptySpec
                },
                name: 'Errors when some assignment exclusives cannot be satisfied'
            },
            {
                expected: 'Unable to satisfy exclusives for parameter 0 of "buffer.make"',
                given: {
                    api: [
                        {
                            children: [
                                {
                                    label: 'buffer.make',
                                    signatureExclusives: [
                                        {
                                            parameters: new Map([
                                                [0, [{ label: 'foo' }]]
                                            ])
                                        }
                                    ]
                                }
                            ],
                            label: 'buffer'
                        }
                    ],
                    spec: emptySpec
                },
                name: 'Errors when no parameter exclusives can be satisfied'
            },
            {
                expected: 'Unable to satisfy exclusives for parameter 1 of "buffer.make"',
                given: {
                    api: [
                        {
                            children: [
                                {
                                    label: 'buffer.make',
                                    signatureExclusives: [
                                        {
                                            parameters: new Map([
                                                [0, [{ label: 'buffer.UNIT_X' }]],
                                                [
                                                    1,
                                                    [
                                                        { label: 'buffer.STAT_TERMINAL' },
                                                        { label: 'foo.BAR' }
                                                    ]
                                                ]
                                            ])
                                        }
                                    ]
                                }
                            ],
                            enums: [
                                { label: 'buffer.STAT_TERMINAL' },
                                { label: 'buffer.UNIT_X' }
                            ],
                            label: 'buffer'
                        }
                    ],
                    spec: emptySpec
                },
                name: 'Errors when some parameter exclusives cannot be satisfied'
            }
        ]

        describe('Error Tests', () => {
            errorCases.forEach((errorTest: ErrorCase) => {
                it(errorTest.name, () => {
                    expect(
                        () => {
                            generateCommandSet(errorTest.given.api, errorTest.given.spec, false)
                        }
                    ).to.throw(errorTest.expected)
                })
            })
        })
    })
})
