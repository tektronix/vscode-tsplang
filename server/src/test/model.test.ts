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

import { Model } from '../model'

describe('Model', () => {
    describe('.KI2450', () => {
        it('contained in Model', () => {
            expect(Model).to.have.ownProperty('KI2450')
        })

        it('equals "2450"', () => {
            expect(Model.KI2450).to.equal('2450')
        })
    })

    describe('.KI2460', () => {
        it('contained in Model', () => {
            expect(Model).to.have.ownProperty('KI2460')
        })

        it('equals "2460"', () => {
            expect(Model.KI2460).to.equal('2460')
        })
    })

    describe('.KI2461', () => {
        it('contained in Model', () => {
            expect(Model).to.have.ownProperty('KI2461')
        })

        it('equals "2461"', () => {
            expect(Model.KI2461).to.equal('2461')
        })
    })

    describe('.KI2461SYS', () => {
        it('contained in Model', () => {
            expect(Model).to.have.ownProperty('KI2461SYS')
        })

        it('equals "2461-sys"', () => {
            expect(Model.KI2461SYS).to.equal('2461-sys')
        })
    })
    describe('.KI6500', () => {
        it('contained in Model', () => {
            expect(Model).to.have.ownProperty('KI6500')
        })

        it('equals "6500"', () => {
            expect(Model.KI6500).to.equal('6500')
        })
    })

    describe('.LUA', () => {
        it('contained in Model', () => {
            expect(Model).to.have.ownProperty('LUA')
        })

        it('equals "lua"', () => {
            expect(Model.LUA).to.equal('lua')
        })
    })

    describe('.fromString', () => {
        it('returns a Model type when passed "2450"', () => {
            const result = Model.fromString('2450')

            expect(result).to.equal(Model.KI2450)
        })

        it('returns a Model type when passed "2460"', () => {
            const result = Model.fromString('2460')

            expect(result).to.equal(Model.KI2460)
        })

        it('returns a Model type when passed "2461"', () => {
            const result = Model.fromString('2461')

            expect(result).to.equal(Model.KI2461)
        })

        it('returns a Model type when passed "2461-sys"', () => {
            const result = Model.fromString('2461-sys')

            expect(result).to.equal(Model.KI2461SYS)
        })

        it('returns a Model type when passed "6500"', () => {
            const result = Model.fromString('6500')

            expect(result).to.equal(Model.KI6500)
        })

        it('returns a Model type when passed "lua"', () => {
            const result = Model.fromString('lua')

            expect(result).to.equal(Model.LUA)
        })

        it('returns undefined when passed an unsupported model', () => {
            const result = Model.fromString('unsupported')

            expect(result).to.be.undefined
        })
    })
})
