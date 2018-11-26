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
// tslint:disable:no-implicit-dependencies no-magic-numbers prefer-function-over-method promise-function-async
import { assert } from 'chai'
import { suite, test } from 'mocha-typescript'

import { ShebangToken } from '../../../server/src/shebangToken'

@suite class ShebangTest {
    @test('Error on invalid prefix')
    errorOnInvalidPrefix(): Promise<void> {
        const shebangLine = '--2450;'

        return ShebangToken.tokenize(shebangLine).then(() => { return }).catch((error: Error) => {
            assert(error.message === 'No \"' + ShebangToken.prefix + '\" detected on the first line of the file.')
        })
    }

    @test('Error on unknown model')
    errorOnUnknownModel(): Promise<void> {
        const shebangLine = '--#!Unknown;'

        return ShebangToken.tokenize(shebangLine).then(() => { return }).catch((error: Error) => {
            assert(error.message === 'Model \"unknown\" is not a valid or supported model.')
        })
    }

    @test('Ignore duplicate node assignments')
    ignoreDuplicateNodeAssignments(): Promise<void> {
        const shebangLine = '--#!2450; node[1] = 2450; node[1] = 6500; node[2] = 2460; node[2] = 6500'

        return ShebangToken.tokenize(shebangLine).then((tokens: Array<ShebangToken>): void => {
            assert(tokens.length === 3)
            assert(tokens[0].model === '2450')

            assert(tokens[1].model === '2450')
            assert(tokens[1].node === 1)

            assert(tokens[2].model === '2460')
            assert(tokens[2].node === 2)
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('Ignore invalid node syntax')
    ignoreInvalidNodeSyntax(): Promise<void> {
        const shebangLine = '--#!2450; GARBAGE!!!; node[0] = 2450; node[1] = Unknown; node[2] = 2461; node[65] = 6500'

        return ShebangToken.tokenize(shebangLine).then((tokens: Array<ShebangToken>): void => {
            assert(tokens.length === 2)
            assert(tokens[0].model === '2450')

            assert(tokens[1].model === '2461')
            assert(tokens[1].node === 2)
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('Parse model')
    parseModel(): Promise<void> {
        const shebangLine = '--#!2450;'

        return ShebangToken.tokenize(shebangLine).then((tokens: Array<ShebangToken>): void => {
            assert((tokens.length === 1))
            assert((tokens[0].model === '2450'))
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('Parse multiple nodes')
    parseMultipleNodes(): Promise<void> {
        const shebangLine = '--#!2450; node[1] = 2450; node[2] = 2460; node[5] = 2461; node[63] = 6500;'

        return ShebangToken.tokenize(shebangLine).then((tokens: Array<ShebangToken>): void => {
            assert(tokens.length === 5)

            assert(tokens[0].model === '2450')

            assert(tokens[1].model === '2450')
            assert(tokens[1].node === 1)

            assert(tokens[2].model === '2460')
            assert(tokens[2].node === 2)

            assert(tokens[3].model === '2461')
            assert(tokens[3].node === 5)

            assert(tokens[4].model === '6500')
            assert(tokens[4].node === 63)
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('Parse single node')
    parseSingleNode(): Promise<void> {
        const shebangLine = '--#!2450; node[1] = 2450;'

        return ShebangToken.tokenize(shebangLine).then((tokens: Array<ShebangToken>): void => {
            assert(tokens.length === 2)
            assert(tokens[0].model === '2450')

            assert(tokens[1].model === '2450')
            assert(tokens[1].node === 1)
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }
}
