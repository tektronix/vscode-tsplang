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

import { MarkupContentCallback, ResolvedNamespace, SignatureInformation } from '../../../decorators'
import { CommandSetInterface, InstrumentSpec } from '../../../instrument'

import { expectCompletionDocFormat, expectSignatureFormat, SpecType } from './helpers'

describe('Instrument Provider', () => {
    describe('smu-source', () => {
        const altUndefinedSpec: InstrumentSpec = {
            beeper: { hertz: { max: NaN, min: NaN }, seconds: { max: NaN, min: NaN } },
            defaults: {
                measure: { range: { current: NaN, resistance: NaN, voltage: NaN } } },
            interlock: { maxNominal: NaN, maxSource: NaN },
            overflow: NaN,
            pulse: {
                percentDutyCycle: NaN,
                time: { max: NaN, min: NaN }
            },
            ranges: {
                autolow: { maxCurrent: NaN, maxResistance: NaN, maxVoltage: NaN },
                current: [NaN],
                resistance: [NaN],
                voltage: [NaN]
            }
        }
        let providerModule: CommandSetInterface

        before(() => {
            // tslint:disable-next-line:no-require-imports
            providerModule = require('../../../instrument/provider/smu-source')
        })

        it('exports "completionDocs"', () => {
            expect(providerModule).to.haveOwnProperty('completionDocs')
        })

        it('exports "completions"', () => {
            expect(providerModule).to.haveOwnProperty('completions')
        })

        it('exports "signatures"', () => {
            expect(providerModule).to.haveOwnProperty('signatures')
        })

        it('formats completionDocs', () => {
            expect(providerModule.completionDocs).to.not.be.empty

            providerModule.completionDocs.forEach((completionDoc: MarkupContentCallback, label: string) => {
                expectCompletionDocFormat(completionDoc, label)
            })
        })

        it('formats signatures', () => {
            expect(providerModule.signatures).to.not.be.empty

            providerModule.signatures.forEach((signature: SignatureInformation) => {
                expectSignatureFormat(signature)
            })
        })

        it('formats signatures when some specs values are undefined', () => {
            expect(providerModule.signatures).to.not.be.empty

            const applicableSignatures: Map<string, Array<string>> = new Map([
                ['smu.source.pulsesweeplinear', ['start', 'stop', 'width', 'pulseLimit']],
                ['smu.source.pulsesweeplinearstep', ['start', 'stop', 'width', 'pulseLimit']],
                ['smu.source.pulsesweeplist', ['width']],
                ['smu.source.pulsesweeplog', ['start', 'stop', 'width', 'pulseLimit']],
                ['smu.source.pulsetrain', ['pulseLevel', 'pulseWidth', 'pulseLimit']],
            ])

            applicableSignatures.forEach((defaultableParams: Array<string>, label: string) => {
                // Typecast because we just validated its existance.
                const signatures = (providerModule.signatures as Array<SignatureInformation>).filter(
                    (signature: SignatureInformation) => ResolvedNamespace.equal(
                        label,
                        SignatureInformation.resolveNamespace(signature)
                    )
                )

                expect(
                    signatures,
                    `"${label}" does not exist in the set of available signatures`
                ).to.not.be.empty

                signatures.forEach((signature: SignatureInformation) => {
                    expectSignatureFormat(signature, SpecType.UNDEFINED, defaultableParams)
                    expectSignatureFormat(signature, SpecType.CUSTOM, defaultableParams, altUndefinedSpec)
                })
            })
        })
    })
})
