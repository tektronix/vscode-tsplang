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
'use strict'

// tslint:disable-next-line:no-require-imports
import escapeStringRegexp = require('escape-string-regexp')

import { InstrumentCompletionItem } from './instrument/provider'

export function isPartialMatch(content: string, completion: InstrumentCompletionItem): boolean {
    // If content is an empty string, then everything is a partial match
    if (content.localeCompare('') === 0) {
        return true
    }

    const completionData: Array<string> = (completion.data === undefined) ? [] : completion.data.domains

    let names: Array<string> = content.split('.')

    // Get the (possibly partial or empty) name requesting suggestions.
    // Array.pop returns undefined if the array is empty but String.split always returns an
    // array with at least 1 item, so disregard the undefined type.
    const lastName = names.pop() as string

    // Reverse the remaining names so we can more easily match against InstrumentCompletionItem.data.domains.
    names = names.reverse()

    // If the given completion's namespace length does not match our content's namespace length
    if (completionData.length !== names.length) {
        return false
    }

    // If the given completion has an identical namespace
    if (completionData.join('.').localeCompare(names.join('.')) === 0) {
        // If the last name is an empty string, then everything is a partial match
        if (lastName.localeCompare('') === 0) {
            return true
        }

        const labelRegexp = new RegExp('^' + escapeStringRegexp(lastName) + '.*$')

        const matches = completion.label.match(labelRegexp)

        if (matches === null) {
            return false
        }
        else {
            return true
        }
    }

    return false
}
