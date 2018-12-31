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

import { ApiSpec, InstrumentModule, InstrumentSpec } from '../../../instrument'
import { emptySpec } from '../emptySpec'

describe('Instrument Specification', () => {
    describe('2450', () => {
        let instrumentModule: InstrumentModule

        before(() => {
            // tslint:disable-next-line:no-require-imports
            instrumentModule = require('../../../instrument/2450')
        })

        it('exports "getApiSpec"', () => {
            expect(instrumentModule).to.haveOwnProperty('getApiSpec')
        })

        it('exports "getInstrumentSpec"', () => {
            expect(instrumentModule).to.haveOwnProperty('getInstrumentSpec')
        })

        describe('getApiSpec()', () => {
            const knownNamespaces = [
                'beeper',
                'buffer.write',
                'buffer',
                'createconfigscript',
                'dataqueue',
                'delay',
                'digio.line',
                'digio',
                'display.input',
                'display',
                'eventlog',
                'exit',
                'file',
                'format',
                'gpib',
                'lan',
                'localnode',
                'node',
                'opc',
                'printbuffer',
                'printnumber',
                'reset',
                'script',
                'smu.interlock',
                'smu.measure.autozero',
                'smu.measure.configlist',
                'smu.measure.filter',
                'smu.measure.limit.high',
                'smu.measure.limit.low',
                'smu.measure.limit',
                'smu.measure.math.mxb',
                'smu.measure.math',
                'smu.measure.rel',
                'smu.measure',
                'smu.source.configlist',
                'smu.source.ilimit',
                'smu.source.protect',
                'smu.source.vlimit',
                'smu.source',
                'smu',
                'status.operation',
                'status.questionable',
                'status.standard',
                'status',
                'timer',
                'trigger.blender',
                'trigger.digin',
                'trigger.digout',
                'trigger.lanin',
                'trigger.lanout',
                'trigger.model',
                'trigger.timer.start',
                'trigger.timer',
                'trigger.tsplinkin',
                'trigger.tsplinkout',
                'trigger',
                'tsplink.line',
                'tsplink',
                'tspnet.tsp',
                'tspnet',
                'upgrade',
                'userstring',
                'waitcomplete'
            ]
            let specs: Array<ApiSpec>

            before(() => {
                specs = instrumentModule.getApiSpec()
            })

            knownNamespaces.forEach((label: string) => {
                it(`contains the ${label} namespace`, () => {
                    expect(
                        specs.some((spec: ApiSpec) => spec.label.localeCompare(label) === 0),
                        `failed to contain the "${label}" namespace`
                    ).to.be.true
                })
            })

            it('contains no additional namespaces', () => {
                expect(specs.length).to.equal(knownNamespaces.length)
            })
        })

        describe('getInstrumentSpec()', () => {
            let spec: InstrumentSpec

            before(() => {
                spec = instrumentModule.getInstrumentSpec()
            })

            it('is not empty', () => {
                expect(spec).to.not.deep.equal(emptySpec)
            })
        })
    })
})
