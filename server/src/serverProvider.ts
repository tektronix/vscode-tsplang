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

import { Position } from 'vscode-languageserver'

import { CompletionItem } from './decorators'
import { TspItem } from './tspItem'

const namespaceRegexp = new RegExp(/^[a-zA-Z0-9\[\].]*/)
const tableIndexRegexp = new RegExp(/\[[0-9]\]/g)

export function getCompletions(position: Position, tspItem: TspItem): Array<CompletionItem> | undefined {
    // We cannot provide completions if none exist
    if (tspItem.context.commandSet.completions.length === 0) {
        return
    }

    const contentText = tspItem.context.document.getText()

    // Convert the current Position to a zero-based offset
    const offset: number = tspItem.context.document.offsetAt(position)

    // Get all text before the cursor offset, reverse it, and match against it.
    // Reversing allows for a simpler regular expression since the match
    // will start at the beginning of the string.
    const reverseMatches = contentText.slice(0, offset).split('').reverse().join('').match(namespaceRegexp)

    if (reverseMatches === null) {
        return
    }

    const results: Array<CompletionItem> = new Array()

    const firstMatch = reverseMatches.shift()

    // Show root namespace completions if we did not match against a namespace
    if (firstMatch === undefined || firstMatch === '') {
        // Add this document's user completion items
        if (tspItem.context !== undefined) {
            for (const userCompletion of tspItem.context.getCompletionItems(position)) {
                // Only match against completions without a "data" property
                if (userCompletion.data === undefined) {
                    results.push(userCompletion)
                }
            }
        }

        return results
    }

    // Un-reverse the string and remove any table indexers
    const unreversed = firstMatch.replace(tableIndexRegexp, '').split('').reverse().join('')

    if (tspItem.context !== undefined) {
        // Attempt to partial match against the current user completion items.
        for (const completion of tspItem.context.getCompletionItems(position)) {
            if (CompletionItem.namespaceMatch(unreversed, completion)) {
                results.push(completion)
            }
        }
    }

    return results
}
