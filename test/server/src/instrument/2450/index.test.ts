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
// tslint:disable:no-implicit-dependencies prefer-function-over-method
import { assert } from 'chai'
import * as isEqual from 'lodash.isequal'
import { suite, test } from 'mocha-typescript'

import { ApiSpec } from '../../../../../server/src/instrument'
import * as Namespace from '../../../../../server/src/instrument/2450'
import { emptySpec } from '../emptySpec'

@suite class Model2450IndexTest {
    @test('Exports ApiSpec array')
    exportsCompletions(): void {
        // tslint:disable-next-line:no-magic-numbers
        assert(Namespace.get2450ApiSpec().length === 68, '2450 ApiSpec contains unknown namespaces')

        Namespace.get2450ApiSpec().forEach((value: ApiSpec) => {
            switch (value.label) {
                case 'beeper':
                case 'buffer':
                case 'buffer.write':
                case 'coroutine':
                case 'createconfigscript':
                case 'dataqueue':
                case 'delay':
                case 'digio':
                case 'digio.line':
                case 'display':
                case 'display.input':
                case 'eventlog':
                case 'exit':
                case 'file':
                case 'format':
                case 'functions':
                case 'gpib':
                case 'keywords':
                case 'lan':
                case 'localnode':
                case 'math':
                case 'node':
                case 'opc':
                case 'os':
                case 'printbuffer':
                case 'printnumber':
                case 'reset':
                case 'script':
                case 'smu':
                case 'smu.measure':
                case 'smu.measure.autozero':
                case 'smu.measure.configlist':
                case 'smu.measure.filter':
                case 'smu.measure.limit':
                case 'smu.measure.limit.high':
                case 'smu.measure.limit.low':
                case 'smu.measure.math':
                case 'smu.measure.math.mxb':
                case 'smu.measure.rel':
                case 'smu.source':
                case 'smu.source.configlist':
                case 'smu.source.ilimit':
                case 'smu.source.protect':
                case 'smu.source.vlimit':
                case 'status':
                case 'status.operation':
                case 'status.questionable':
                case 'status.standard':
                case 'string':
                case 'table':
                case 'timer':
                case 'trigger':
                case 'trigger.blender':
                case 'trigger.digin':
                case 'trigger.digout':
                case 'trigger.lanin':
                case 'trigger.lanout':
                case 'trigger.timer':
                case 'trigger.timer.start':
                case 'trigger.tsplinkin':
                case 'trigger.tsplinkout':
                case 'tsplink':
                case 'tsplink.line':
                case 'tspnet':
                case 'tspnet.tsp':
                case 'upgrade':
                case 'userstring':
                case 'waitcomplete':
                    return
                default:
                    assert(false, '2450 ApiSpec contains an unknown namespace "' + value.label + '"')
            }
        })
    }

    @test('Exports InstrumentSpec')
    exportsInstrumentSpec(): void {
        assert(
            ! isEqual(Namespace.get2450InstrumentSpec(), emptySpec),
            '2450 InstrumentSpec is an empty specification'
        )
    }
}
