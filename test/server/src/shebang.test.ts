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
import { Shebang } from '../../../server/src/shebang'

@suite class ShebangTest {
    @test('Error on duplicate node assignments')
    errorOnDuplicateNodeAssignments(): void {
        let shebangLine = '  --#!2450 ; node [ 1 ] = 2450 ; node [ 1] = 6500 ; node [2 ] = 2460 ; node[ 3] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Node 1 has already been specified.') === 0)
        }

        shebangLine = '  --#!2450 ; node[1 ] = 2450 ; node[2] = 6500 ; node [2] = 2460 ; node[ 3 ] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Node 2 has already been specified.') === 0)
        }

        shebangLine = '  --#!2450 ; node[ 1  ] = 2450 ; node  [ 2] = 6500 ; node [  3] = 2460 ; node[ 3  ] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Node 3 has already been specified.') === 0)
        }
    }

    @test('Error on invalid node number')
    errorOnInvalidNodeNumber(): void {
        let shebangLine = '  --#!2450 ; node[-1]=2450 ; node[-99]=6500 ; node[65] = 2460 ; node[+99] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare(
                `Node number -1 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
            ) === 0)
        }

        shebangLine = '  --#!2450 ; node[1]=2450 ; node[-99]=6500 ; node[65] = 2460 ; node[+99] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare(
                `Node number -99 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
            ) === 0)
        }

        shebangLine = '  --#!2450 ; node[1]=2450 ; node[2]=6500 ; node[65] = 2460 ; node[+99] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare(
                `Node number 65 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
            ) === 0)
        }

        shebangLine = '  --#!2450 ; node[1]=2450 ; node[2]=6500 ; node[3] = 2460 ; node[+99] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare(
                `Node number 99 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
            ) === 0)
        }
    }

    @test('Error on invalid node syntax')
    errorOnInvalidNodeSyntax(): void {
        let shebangLine = '  --#!2450 ; node[1] = 2450 ; node{1] = 6500 ; node(2) = 2460 ; node[3] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Invalid node expression " node{1] = 6500 ".') === 0)
        }

        shebangLine = '  --#!2450 ; node[1] = 2450 ; node[2] = 6500 ;    node(3) = 2460 ; node[4] = 6500  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Invalid node expression "    node(3) = 2460 ".') === 0)
        }

        shebangLine = '  --#!2450 ; node[1] = 2450 ; node[2] = 6500 ; node[3] = 2460 ;  <64L4QxLQ|$\\1ng4W<\\d  '

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Invalid node expression "  <64L4QxLQ|$\\1ng4W<\\d".') === 0)
        }
    }

    @test('Error on unknown model')
    errorOnUnknownModel(): void {
        let shebangLine = '--#!Unknown'

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Model "Unknown" is an invalid or unsupported model.') === 0)
        }

        shebangLine = 'VLXkyi(c&,^' + Shebang.SEPARATOR + 'MeKrAY8I'

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Model "VLXkyi(c&,^" is an invalid or unsupported model.') === 0)
        }

        shebangLine = '--#!2450;node[1]=VLXkyi(c&,^;MeKrAY8I'

        try {
            Shebang.tokenize(shebangLine)
        }
        catch (e) {
            assert(e.message.localeCompare('Model "VLXkyi(c&,^" is an invalid or unsupported model.') === 0)
        }
    }

    @test('Line returned as given.')
    lineReturnedAsGiven(): void {
        const shebangLine = 'c>Bj8oTgw_GTW:hYc=HZ'

        const shebang = Shebang.tokenize(shebangLine)

        assert(shebang.text.localeCompare(shebangLine) === 0)
    }

    @test('Lua model on invalid prefix')
    luaModelOnInvalidPrefix(): void {
        const shebangLine = '--2450;'

        const shebang = Shebang.tokenize(shebangLine)

        assert(shebang.master === Model.LUA)
    }

    @test('Parse model')
    parseModel(): void {
        const shebangLine = '--#!2450'

        const shebang = Shebang.tokenize(shebangLine)

        assert(shebang.master === Model.KI2450)
    }

    @test('Parse multiple nodes')
    parseMultipleNodes(): void {
        const shebangLine = '--#!2450; node[1] = 2450; node[2] = 2460; node[+5] = 2461; node[63] = 6500;'
        // tslint:disable-next-line:no-magic-numbers
        const nodeNumbers = [1, 2, 5, 63]
        const nodeModels = [Model.KI2450, Model.KI2460, Model.KI2461, Model.KI6500]

        const shebang = Shebang.tokenize(shebangLine)

        assert(shebang.nodes !== undefined)

        const nodes = shebang.nodes as Map<number, Model>

        assert(nodes.size === nodeNumbers.length)

        let nodeNumber = nodeNumbers.shift() as number
        let nodeModel = nodeModels.shift() as Model

        assert(nodes.has(nodeNumber))
        assert(nodes.get(nodeNumber) === nodeModel)

        nodeNumber = nodeNumbers.shift() as number
        nodeModel = nodeModels.shift() as Model

        assert(nodes.has(nodeNumber))
        assert(nodes.get(nodeNumber) === nodeModel)

        nodeNumber = nodeNumbers.shift() as number
        nodeModel = nodeModels.shift() as Model

        assert(nodes.has(nodeNumber))
        assert(nodes.get(nodeNumber) === nodeModel)

        nodeNumber = nodeNumbers.shift() as number
        nodeModel = nodeModels.shift() as Model

        assert(nodes.has(nodeNumber))
        assert(nodes.get(nodeNumber) === nodeModel)
    }

    @test('Parse single node')
    parseSingleNode(): void {
        const shebangLine = '--#!2450;node[+1]=2450'
        const nodeNumbers = [1]
        const nodeModels = [Model.KI2450]

        const shebang = Shebang.tokenize(shebangLine)

        assert(shebang.nodes !== undefined)

        const nodes = shebang.nodes as Map<number, Model>

        assert(nodes.size === nodeNumbers.length)

        const nodeNumber = nodeNumbers.shift() as number
        const nodeModel = nodeModels.shift() as Model

        assert(nodes.has(nodeNumber))
        assert(nodes.get(nodeNumber) === nodeModel)
    }
}
