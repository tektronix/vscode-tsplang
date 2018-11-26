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
import * as Namespace from '../../../../../server/src/instrument/lua'
import { emptySpec } from '../emptySpec'

@suite class LuaIndexTest {
    @test('Exports ApiSpec array')
    exportsCompletions(): void {
        // tslint:disable-next-line:no-magic-numbers
        assert(Namespace.getApiSpec().length === 7, 'Lua ApiSpec contains unknown namespaces')

        Namespace.getApiSpec().forEach((value: ApiSpec) => {
            switch (value.label) {
                case 'coroutine':
                case 'functions':
                case 'keywords':
                case 'math':
                case 'os':
                case 'string':
                case 'table':
                    return
                default:
                    assert(false, 'Lua ApiSpec contains an unknown namespace "' + value.label + '"')
            }
        })
    }

    @test('Exports empty InstrumentSpec')
    exportsEmptyInstrumentSpec(): void {
        assert(
            isEqual(Namespace.getInstrumentSpec(), emptySpec),
            'Lua InstrumentSpec is not an empty specification'
        )
    }
}
