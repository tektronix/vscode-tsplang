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
// tslint:disable:no-implicit-dependencies no-import-side-effect no-unused-expression
import { expect } from 'chai'
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { Model } from '../model'
import { TspPool } from '../tspPool'

import './fixtures/model.fixture'
import './fixtures/tspPool.fixture'

describe('TspPool', () => {
    const pool = new TspPool()

    describe('#get()', () => {
        it('throws an error if TspPool does not contain the Model', () => {
            const model = Model.KI2450

            expect(() => { pool._get(model) })
                .to.throw(`attempted to access the non-existant ${model} entry`)
        })
    })

    describe('#load()', () => {
        it('throws an error if passed an unsupported Model', () => {
            const model = Model.UNSUPPORTED

            expect(() => { pool._load(model as Model) })
                .to.throw(`model ${model} is not supported`)
        })
    })
})
