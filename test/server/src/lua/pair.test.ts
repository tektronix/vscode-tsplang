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

import { curlyBraces, doubleQuotes, doubleSquareBrackets, parentheses, singleQuotes } from '../../../../server/src/lua/pair'

@suite class PairTest {
    @test('curlyBraces.close')
    curlyBracesClose(): void {
        assert(
            curlyBraces.close.localeCompare('}') === 0,
            'curlyBraces.close does not return }'
        )
    }

    @test('curlyBraces.open')
    curlyBracesOpen(): void {
        assert(
            curlyBraces.open.localeCompare('{') === 0,
            'curlyBraces.open does not return {'
        )
    }

    @test('doubleQuotes.close')
    doubleQuotesClose(): void {
        assert(
            doubleQuotes.close.localeCompare('"') === 0,
            'doubleQuotes.close does not return "'
        )
    }

    @test('doubleQuotes.open')
    doubleQuotesOpen(): void {
        assert(
            doubleQuotes.open.localeCompare('"') === 0,
            'doubleQuotes.open does not return "'
        )
    }

    @test('doubleSquareBrackets.close')
    doubleSquareBracketsClose(): void {
        assert(
            doubleSquareBrackets.close.localeCompare(']]') === 0,
            'doubleSquareBrackets.close does not return ]]'
        )
    }

    @test('doubleSquareBrackets.open')
    doubleSquareBracketsOpen(): void {
        assert(
            doubleSquareBrackets.open.localeCompare('[[') === 0,
            'doubleSquareBrackets.open does not return [['
        )
    }

    @test('parentheses.close')
    parenthesesClose(): void {
        assert(
            parentheses.close.localeCompare(')') === 0,
            'parentheses.close does not return )'
        )
    }

    @test('parentheses.open')
    parenthesesOpen(): void {
        assert(
            parentheses.open.localeCompare('(') === 0,
            'parentheses.open does not return ('
        )
    }

    @test('singleQuotes.close')
    singleQuotesClose(): void {
        assert(
            singleQuotes.close.localeCompare("'") === 0,
            "singleQuotes.close does not return '"
        )
    }

    @test('singleQuotes.open')
    singleQuotesOpen(): void {
        assert(
            singleQuotes.open.localeCompare("'") === 0,
            "singleQuotes.open does not return '"
        )
    }
}
