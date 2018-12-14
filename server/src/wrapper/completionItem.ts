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

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { InstrumentSpec } from '../instrument'

export interface CommandDocumentation {
    kind: MarkupKind
    toString(spec: InstrumentSpec): string
}

export interface CompletionItemData {
    domains: Array<string>
    types?: Array<InstrumentCompletionItem>
}

export interface InstrumentCompletionItem extends CompletionItem {
    allowBitwise?: boolean
    data?: CompletionItemData
    exclusive?: boolean
}
export namespace InstrumentCompletionItem {
    /**
     * Creates InstrumentCompletionItems of kind Module based on the given string.
     * @param label The label whose namespaces will become root completions items.
     * @param excludeLast Exclude the last item of the namespace from the results.
     * @returns An array of generated root namespaces or an empty array if nothing could be generated.
     */
    export function createRootItems(
        label: string,
        excludeLast: boolean
    ): Array<InstrumentCompletionItem> {
        const namespaces = label.split('.')

        if (excludeLast) {
            // Remove the last element of the namespace.
            namespaces.pop()

            if (namespaces.length === 0) {
                return []
            }
        }

        const result = new Array<InstrumentCompletionItem>()

        for (const name of namespaces) {
            // Get the last root completion item to use as reference.
            const last = result.pop()

            // Create a completion item for the current namespace name.
            const current: InstrumentCompletionItem = {
                kind: CompletionItemKind.Module,
                label: name
            }

            // If we have a previous root completion item to use as reference for
            // the data.domains property.
            if (last !== undefined) {
                // The current data.domains array will always start with the label of
                // the previous root completion item.
                const domains: Array<string> = [last.label]

                // The remaining items in the current data.domains array are those from
                // the previous root completion's data.domains array, if any such items
                // exist.
                if (last.data !== undefined) {
                    domains.push(...last.data.domains)
                }

                current.data = { domains }

                // Add the previous root completion item back to the results before the
                // current item to maintain proper domain ordering.
                result.push(last)
            }

            // If last is undefined, then this item is a top-level root completion item
            // with an undefined data.domains property;
            // otherwise the data.domains property has already been defined.
            result.push(current)
        }

        return result
    }

    /**
     * Compare the given string to the label and data.domains properties of the completion item.
     * **Note:** empty strings match everything.
     * @param target The search string.
     * @param completion The InstrumentCompletionItem to attempt a match against.
     * @returns True if the search string has the same namespace depth as the given completion and
     * wholly or partially matches against it. False otherwise.
     */
    export function namespaceMatch(target: string, completion: InstrumentCompletionItem): boolean {
        // If content is an empty string, then everything is a partial match
        if (target.localeCompare('') === 0) {
            return true
        }

        const completionData: Array<string> = (completion.data === undefined) ? [] : completion.data.domains

        let names: Array<string> = target.split('.')

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

    /**
     * Compare the labels and data.domains properties of two items to determine their equality.
     * @param a The first item.
     * @param b The second item.
     * @param excludeLabel Exclude the label from the comparision. Defaults to false.
     * @returns True if the two items match and false otherwise.
     */
    export function namespacesEqual(
        a: InstrumentCompletionItem,
        b: InstrumentCompletionItem,
        excludeLabel: boolean = false
    ): boolean {
        // Compare labels.
        if (! excludeLabel && a.label.localeCompare(b.label) !== 0) {
            return false
        }

        if (a.data === undefined) {
            // If neither have a data property, then these two root completions are equal.
            if (b.data === undefined) {
                return true
            }

            // Both data properties should be defined.
            return false
        }

        // TypeScript demands the following
        if (b.data === undefined) {
            return false
        }

        // Both domains should be of equal length.
        if (a.data.domains.length !== b.data.domains.length) {
            return false
        }

        // Both domains should have the same domain items.
        for (let i = 0; i < a.data.domains.length; i++) {
            const aDomain = a.data.domains[i]
            if (aDomain === undefined || aDomain.localeCompare(b.data.domains[i]) !== 0) {
                return false
            }
        }

        return true
    }
}
