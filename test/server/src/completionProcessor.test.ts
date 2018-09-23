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
import { CompletionItem } from 'vscode-languageclient'

import { isPartialMatch } from '../../../server/src/completionProcessor'

function toString(completion: CompletionItem): string {
    let result = '{label: "' + completion.label + '"'

    if (completion.data !== undefined) {
        result += ', data: ['
        completion.data.forEach((item: string) => {
            result += '"' + item + '", '
        })
        // Remove the trailing ", "
        result = result.slice(0, result.length - 2)
        result += ']'
    }

    return result + '}'
}

@suite class CompletionProcessorTest {
    @test('isPartialMatch')
    isPartialMatchTest(): void {
        let testString = ''
        let testCompletion: CompletionItem = {
            label: 'a'
        }
        assert(
            isPartialMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: ['b'],
            label: 'a'
        }
        assert(
            isPartialMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )

        testString = 'a.'
        testCompletion = {
            label: 'a'
        }
        assert(
            ! isPartialMatch(testString, testCompletion),
            '"' + testString + '" partially matched "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: ['a'],
            label: 'b'
        }
        assert(
            isPartialMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )

        testString = 'a.p'
        testCompletion = {
            label: 'a'
        }
        assert(
            ! isPartialMatch(testString, testCompletion),
            '"' + testString + '" partially matched "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: ['a'],
            label: 'partial'
        }
        assert(
            isPartialMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )
    }
}
