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

import * as Namespace from '../../../../../server/src/instrument/provider/smu-enums'

@suite class SmuEnumsTest {
    @test('Exports completions')
    exportsCompletions(): void {
        assert(
            Namespace.completions !== undefined,
            'Expected Smu-Enums to export completions'
        )
    }

    @test('Exports no completionDocs')
    exportsNoCompletionDocs(): void {
        assert(
            ! Namespace.hasOwnProperty('completionDocs'),
            'Unexpected completionDocs export from Smu-Enums'
        )
    }

    @test('Exports no signatures')
    exportsSignatures(): void {
        assert(
            ! Namespace.hasOwnProperty('signatures'),
            'Unexpected signatures export from Smu-Enums'
        )
    }
}
