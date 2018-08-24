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

import { Model } from '../../../server/src/model'

@suite class ModelTest {
    @test('Model.fromString returns Model')
    modelFromStringReturnsModelType(): void {
        try {
            let _typeCompatibilityCheck: Model = Model.fromString('2450')
            _typeCompatibilityCheck = Model.fromString('2460')
            _typeCompatibilityCheck = Model.fromString('2461')
            _typeCompatibilityCheck = Model.fromString('2461-sys')
            _typeCompatibilityCheck = Model.fromString('6500')
        }
        catch {
            assert(false, 'Model.fromString failed to return a Model type')
        }
    }

    @test('Model.fromString returns undefined')
    modelFromStringReturnsUndefinedOnInvalid(): void {
        assert(
            Model.fromString('invalid model') === undefined,
            'Model.fromString failed to return a Model type'
        )
    }

    @test('Model.KI2450 is a Model type')
    modelKI2450IsAModelType(): void {
        try {
            const _typeCompatibilityCheck: Model = Model.KI2450
        }
        catch {
            assert(false, 'Model.KI2450 incompatible with type Model')
        }
    }

    @test('Model.KI2460 is a Model type')
    modelKI2460IsAModelType(): void {
        try {
            const _typeCompatibilityCheck: Model = Model.KI2460
        }
        catch {
            assert(false, 'Model.KI2460 incompatible with type Model')
        }
    }

    @test('Model.KI2461 is a Model type')
    modelKI2461IsAModelType(): void {
        try {
            const _typeCompatibilityCheck: Model = Model.KI2461
        }
        catch {
            assert(false, 'Model.KI2461 incompatible with type Model')
        }
    }

    @test('Model.KI2461SYS is a Model type')
    modelKI2461SYSIsAModelType(): void {
        try {
            const _typeCompatibilityCheck: Model = Model.KI2461SYS
        }
        catch {
            assert(false, 'Model.KI2461SYS incompatible with type Model')
        }
    }

    @test('Model.KI6500 is a Model type')
    modelKI6500IsAModelType(): void {
        try {
            const _typeCompatibilityCheck: Model = Model.KI6500
        }
        catch {
            assert(false, 'Model.KI6500 incompatible with type Model')
        }
    }
}
