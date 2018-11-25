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

import { InstrumentCompletionItem } from '../../../../server/src/wrapper'

function toString(completion: InstrumentCompletionItem): string {
    let result = '{label: "' + completion.label + '"'

    if (completion.data !== undefined) {
        result += ', data: ['
        completion.data.domains.forEach((item: string) => {
            result += '"' + item + '", '
        })
        // Remove the trailing ", "
        result = result.slice(0, result.length - 2)
        result += ']'
    }

    return result + '}'
}

@suite class InstrumentCompletionItemTest {
    @test('namespaceMatch')
    namespaceMatchTest(): void {
        let testString = ''
        let testCompletion: InstrumentCompletionItem = {
            label: 'a'
        }
        assert(
            InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: { domains: ['b'] },
            label: 'a'
        }
        assert(
            InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )

        testString = 'a.'
        testCompletion = {
            label: 'a'
        }
        assert(
            ! InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" partially matched "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: { domains: ['a'] },
            label: 'b'
        }
        assert(
            InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )

        testString = 'a.p'
        testCompletion = {
            label: 'a'
        }
        assert(
            ! InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" partially matched "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: { domains: ['a'] },
            label: 'b'
        }
        assert(
            ! InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" partially matched "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: { domains: ['b'] },
            label: 'partial'
        }
        assert(
            ! InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" partially matched "' + toString(testCompletion) + '"'
        )

        testCompletion = {
            data: { domains: ['a'] },
            label: 'partial'
        }
        assert(
            InstrumentCompletionItem.namespaceMatch(testString, testCompletion),
            '"' + testString + '" did not partially match "' + toString(testCompletion) + '"'
        )
    }

    // Issue #31 - Unescaped regular expression string input.
    @test('namespaceMatch Unescaped Regexp')
    namespaceMatchUnescapedRegexpTest(): void {
        let testStrings: Array<string> = ['(', '[', 'a(', 'a[']
        let testCompletion: InstrumentCompletionItem = {
            label: 'a'
        }
        try {
            testStrings.forEach((str: string) => {
                InstrumentCompletionItem.namespaceMatch(str, testCompletion)
            })
        } catch (err) {
            assert(
                false,
                'Failed to properly escape regular expression input. Raw Error: ' + err
            )
        }

        testStrings = ['a(b', 'a[b']
        testCompletion = {
            label: 'b'
        }
        try {
            testStrings.forEach((str: string) => {
                InstrumentCompletionItem.namespaceMatch(str, testCompletion)
            })
        } catch (err) {
            assert(
                false,
                'Failed to properly escape regular expression input. Raw Error: ' + err
            )
        }

        testStrings = ['a.b(', 'a.b[']
        testCompletion = {
            data: { domains: ['a'] },
            label: 'b'
        }
        try {
            testStrings.forEach((str: string) => {
                InstrumentCompletionItem.namespaceMatch(str, testCompletion)
            })
        } catch (err) {
            assert(
                false,
                'Failed to properly escape regular expression input. Raw Error: ' + err
            )
        }

        testStrings = ['a.b(p', 'a.b[p']
        testCompletion = {
            label: 'partial'
        }
        try {
            testStrings.forEach((str: string) => {
                InstrumentCompletionItem.namespaceMatch(str, testCompletion)
            })
        } catch (err) {
            assert(
                false,
                'Failed to properly escape regular expression input. Raw Error: ' + err
            )
        }
    }
}
