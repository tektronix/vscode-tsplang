// tslint:disable:no-implicit-dependencies prefer-function-over-method no-magic-numbers
// The above tslint:disable calls are acceptable becuase of the nature of these tests.
import { assert } from 'chai'
import { suite, test } from 'mocha-typescript'

import { Shebang } from '../../../server/src/shebang'

@suite class ShebangTest {
    @test('should error when shebang line begins with an unknown model')
    incorrectModel(): Promise<void> {
        const shebangLine = '--#!Unknown;'

        return Shebang.tokenize(shebangLine).then(() => { return }).catch((error: Error) => {
            assert(error.message === 'Model \"unknown\" is not a valid or supported model.')
        })
    }

    @test('should tokenize properly formated shebang string with a model and multiple nodes')
    modelMultipleNodesProperFormat(): Promise<void> {
        const shebangLine = '--#!2450; node[1] = 2450; node[2] = 2460; node[5] = 2461; node[63] = 6500;'

        return Shebang.tokenize(shebangLine).then((tokens: Array<Shebang.ShebangToken>): void => {
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

    @test('should tokenize properly formated shebang string with a model and a node')
    modelOneNodeProperFormat(): Promise<void> {
        const shebangLine = '--#!2450; node[1] = 2450;'

        return Shebang.tokenize(shebangLine).then((tokens: Array<Shebang.ShebangToken>): void => {
            assert(tokens.length === 2)
            assert(tokens[0].model === '2450')

            assert(tokens[1].model === '2450')
            assert(tokens[1].node === 1)
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('should tokenize properly formated shebang string with only a model')
    modelOnlyProperFormat(): Promise<void> {
        const shebangLine = '--#!2450;'

        return Shebang.tokenize(shebangLine).then((tokens: Array<Shebang.ShebangToken>): void => {
            assert((tokens.length === 1))
            assert((tokens[0].model === '2450'))
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('should ignore invalid node declarations')
    nodeInvalid(): Promise<void> {
        const shebangLine = '--#!2450; GARBAGE!!!; node[0] = 2450; node[1] = Unknown; node[2] = 2461; node[65] = 6500'

        return Shebang.tokenize(shebangLine).then((tokens: Array<Shebang.ShebangToken>): void => {
            assert(tokens.length === 2)
            assert(tokens[0].model === '2450')

            assert(tokens[1].model === '2461')
            assert(tokens[1].node === 2)
        }).catch((error: Error) => {
            throw new Error(error.toString())
        })
    }

    @test('should error when shebang line does not contain \"' + Shebang.prefix + '\"')
    noPrefix(): Promise<void> {
        const shebangLine = '--2450;'

        return Shebang.tokenize(shebangLine).then(() => { return }).catch((error: Error) => {
            assert(error.message === 'No \"' + Shebang.prefix + '\" detected on the first line of the file.')
        })
    }

    @test('should ignore repeated node number assignments')
    repeatedNode(): Promise<void> {
        const shebangLine = '--#!2450; node[1] = 2450; node[1] = 6500; node[2] = 2460; node[2] = 6500'

        return Shebang.tokenize(shebangLine).then((tokens: Array<Shebang.ShebangToken>): void => {
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
}
