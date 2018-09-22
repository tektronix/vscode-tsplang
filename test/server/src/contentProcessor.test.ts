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
// tslint:disable:no-implicit-dependencies no-magic-numbers prefer-function-over-method
import { assert } from 'chai'
import { suite, test } from 'mocha-typescript'

import { getActiveParameter, getOffsetOfUnmatched } from '../../../server/src/contentProcessor'
import { parentheses } from '../../../server/src/lua/pair'

@suite class ContentProcessorTest {
    @test('getActiveParameter')
    getActiveParameterTest(): void {
        let testString = ''
        let cursorOffset = 0
        let openParenOffset = 0
        let closeParentOffset = 0
        let expected = 0
        let actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        testString = '()'
        cursorOffset = 1
        openParenOffset = 0
        closeParentOffset = 1
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        testString = '(,,,)'
        cursorOffset = 1
        openParenOffset = 0
        closeParentOffset = 4
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 2
        expected = 1
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 3
        expected = 2
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 4
        expected = 3
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        testString = "a(',',,,)"
        cursorOffset = 4
        openParenOffset = 1
        closeParentOffset = 8
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 6
        expected = 1
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 7
        expected = 2
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 8
        expected = 3
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        testString = 'a( ,",",, )'
        cursorOffset = 3
        openParenOffset = 1
        closeParentOffset = 10
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 6
        expected = 1
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 8
        expected = 2
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 9
        expected = 3
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        testString = 'a(  , ,[[,]],  )'
        cursorOffset = 3
        openParenOffset = 1
        closeParentOffset = 15
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 6
        expected = 1
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 10
        expected = 2
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 15
        expected = 3
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        testString = 'a(   ,  , ,   b(,)   )'
        cursorOffset = 5
        openParenOffset = 1
        closeParentOffset = 21
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 7
        expected = 1
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 9
        expected = 2
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 15
        expected = 3
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        // a(',', b(",",',',c(),[[,]]), [[,]], ",")
        testString = 'a(\',\', b(",",\',\',c(),[[,]]), [[,]], ",")'
        cursorOffset = 2
        openParenOffset = 1
        closeParentOffset = 39
        expected = 0
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 27
        expected = 1
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 29
        expected = 2
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )

        cursorOffset = 37
        expected = 3
        actual = getActiveParameter(testString, cursorOffset, openParenOffset, closeParentOffset)
        assert(
            actual === expected,
            'getActiveParameter failure - expected: "' + expected + '" got: "' + actual + '".'
        )
    }

    @test('getOffsetOfUnmatched Parenthesis')
    getOffsetOfUnmatchedParenthesis(): void {
        let testString = ''
        let expectedOffset: number | undefined
        let actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '"'
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = ')'
        expectedOffset = 0
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '1)'
        expectedOffset = 1
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '3.14159)'
        expectedOffset = 7
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = "')')"
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // '\')')
        testString = "'\\')')"
        expectedOffset = 5
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '")")'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // "\")")
        testString = '"\\")")'
        expectedOffset = 5
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '[[)]])'
        expectedOffset = 5
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '[[] ])]])'
        expectedOffset = 8
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // '\')', "\")", [[] ])]])
        testString = '\'\\\')\', "\\")", [[] ])]])'
        expectedOffset = 22
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '5, math.abs(-3.14159))'
        expectedOffset = 21
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '((((((((((())))))))))))'
        expectedOffset = 22
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '((((((((((()))))))))))),)'
        expectedOffset = 22
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a('\')', b("\")", c([[] ])]]))))
        testString = 'a(\'\\\')\', b("\\")", c([[] ])]]))))'
        expectedOffset = 31
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a('(\'', b("(\"", c([[(] ] ]]))))
        testString = 'a(\'(\\\'\', b("(\\"", c([[(] ] ]]))))'
        expectedOffset = 32
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a('(\')', b("(\")", c([[(] ])]]))))
        testString = 'a(\'(\\\')\', b("(\\")", c([[(] ])]]))))'
        expectedOffset = 34
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            false
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )
    }

    @test('getOffsetOfUnmatched Parenthesis Reverse')
    getOffsetOfUnmatchedParenthesisReverse(): void {
        let testString = ''
        let expectedOffset: number | undefined
        let actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '"'
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b('
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b(1'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b(3.14159'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = "a.b('('"
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a.b('(\''
        testString = "a.b('(\\''"
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b("("'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a.b("(\""
        testString = 'a.b("(\\""'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b([[(]]'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b([[(] ] ]]'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a.b('(\'', "(\"", [[(] ] ]]
        testString = 'a.b(\'(\\\'\', "(\\"", [[(] ] ]]'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = 'a.b(5, math.abs(-3.14159)'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '(((((((((((()))))))))))'
        expectedOffset = 0
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        testString = '(,(((((((((((()))))))))))'
        expectedOffset = 2
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a.b(c('(\'', d("(\"", e([[(] ] ]])))
        testString = 'a.b(c(\'(\\\'\', d("(\\"", e([[(] ] ]])))'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a.b(c('\')', d("\")", e([[(] ] ]])))
        testString = 'a.b(c(\'\\\')\', d("\\")", e([[] ])]])))'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )

        // a.b(c('(\')', d("(\")", e([[(] ])]])))
        testString = 'a.b(c(\'(\\\')\', d("(\\")", e([[(] ])]])))'
        expectedOffset = 3
        actualOffset = getOffsetOfUnmatched(
            testString,
            parentheses,
            true
        )
        assert(
            actualOffset === expectedOffset,
            'Failed to return offset "' + expectedOffset + '" for input string "' + testString + '"'
        )
    }
}
