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

import { MarkupContentCallback } from '../../../decorators'
import { CommandSetInterface } from '../../../instrument'

import { expectCompletionDocFormat, expectCompletionDocUndefinedFormat } from './helpers'

describe('Instrument Provider', () => {
    describe('smu-digitize', () => {
        let providerModule: CommandSetInterface

        before(() => {
            // tslint:disable-next-line:no-require-imports
            providerModule = require('../../../instrument/provider/smu-digitize')
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

        it('formats completionDocs when some spec values are undefined', () => {
            expect(providerModule.completionDocs).to.not.be.empty

            const applicableCompletionDocs: Array<string> = [
                'smu.digitize.aperture',
                'smu.digitize.count',
                'smu.digitize.range'
            ]

            applicableCompletionDocs.forEach((label: string) => {
                // Typecast because we just validated its existance.
                const completionDoc = (providerModule.completionDocs as Map<string, MarkupContentCallback>).get(label)

                expect(
                    completionDoc,
                    `"${label}" does not exist in the set of available completionDocs`
                ).to.not.be.undefined

                // Typecast because we just failed the test if the variable was undefined.
                expectCompletionDocUndefinedFormat(completionDoc as MarkupContentCallback, label)
            })
        })
    })
})
