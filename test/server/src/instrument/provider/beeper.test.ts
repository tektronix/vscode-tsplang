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
import { suite, test } from 'mocha-typescript'

import * as Beeper from '../../../../../server/src/instrument/provider/beeper'

@suite class BeeperTest {
    @test('Exports completions')
    exportsCompletions(): void {
        assert(
            Beeper.completions !== undefined,
            'Expected Beeper to export completions'
        )
    }

    @test('Exports no completionDocs')
    exportsNoCompletionDocs(): void {
        assert(
            ! Beeper.hasOwnProperty('completionDocs'),
            'Unexpected completionDocs export from Beeper'
        )
    }

    @test('Exports signatures')
    exportsSignatures(): void {
        assert(
            Beeper.signatures !== undefined,
            'Expected Beeper to export signatures'
        )
    }
}
