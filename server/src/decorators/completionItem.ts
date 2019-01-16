/*
 *  Copyright Tektronix Inc.
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

import { Token } from 'antlr4'
// tslint:disable-next-line:no-require-imports
import escapeStringRegexp = require('escape-string-regexp')
import * as vscode_ls from 'vscode-languageserver'

import { SuggestionSortKind } from '../settings'

import { BaseItem } from './baseItem'
import { ResolvedNamespace } from './resolvedNamespace'

export interface CompletionItemData {
    domains: Array<string>
    types?: Array<CompletionItem>
}

export interface CompletionItem extends vscode_ls.CompletionItem, BaseItem {
    allowBitwise?: boolean
    data?: CompletionItemData
    exclusive?: boolean
    reserved?: boolean
}
export namespace CompletionItem {
    /**
     * Creates CompletionItem.sortText for each item according to the given sort map.
     * @param sorts A Map object keyed on a CompletionItemKind whose key-value is the desired SuggestionSortKind.
     * @param items The set of items needing sort text.
     * @returns The given set of items, each with a newly generated sortText property.
     */
    export function addSortText(
        sorts: Map<vscode_ls.CompletionItemKind, SuggestionSortKind>,
        ...items: Array<CompletionItem>
    ): Array<CompletionItem> {
        return items.map((item: CompletionItem) => {
            if (item.kind === undefined) {
                // If BaseItem.kind is undefined, then default to INLINE.
                item.sortText = SuggestionSortKind.addSortCharacter(item.label, SuggestionSortKind.INLINE)
            }
            else {
                item.sortText = SuggestionSortKind.addSortCharacter(
                    item.label,
                    // If this CompletionItemKind is not covered by the edit map, then default to INLINE.
                    sorts.get(item.kind) || SuggestionSortKind.INLINE
                )
            }

            return item
        })
    }

    /**
     * Creates InstrumentCompletionItems of kind Module based on the given string.
     * @param label The label whose namespaces will become root completions items.
     * @param excludeLast Exclude the last item of the namespace from the results.
     * @returns An array of generated root namespaces or an empty array if nothing could be generated.
     */
    export function createRootItems(
        label: string,
        excludeLast: boolean
    ): Array<CompletionItem> {
        const namespaces = label.split('.')

        if (excludeLast) {
            // Remove the last element of the namespace.
            namespaces.pop()

            if (namespaces.length === 0) {
                return []
            }
        }

        const result = new Array<CompletionItem>()

        for (const name of namespaces) {
            // If any name is an empty string, then return an empty array.
            if (name.localeCompare('') === 0) {
                return []
            }

            // Get the last root completion item to use as reference.
            const last = result.pop()

            // Create a completion item for the current namespace name.
            const current: CompletionItem = {
                kind: vscode_ls.CompletionItemKind.Module,
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
     * @param completion The CompletionItem to attempt a match against.
     * @returns True if the search string has the same namespace depth as the given completion and
     * wholly or partially matches against it. False otherwise.
     */
    export function namespaceMatch(target: string, completion: CompletionItem): boolean {
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

        // Reverse the remaining names so we can more easily match against CompletionItem.data.domains.
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
        a: CompletionItem,
        b: CompletionItem,
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

    /**
     * Fully resolves the namespace of the given completion item using the label property and
     * the data.domains property (if available).
     * @param completion The completion item to resolve.
     * @returns The fully resolved namespace of the given completion.
     */
    export function resolveNamespace(completion: CompletionItem): ResolvedNamespace {
        const namespaceArray: Array<string> = (completion.data) ? [...completion.data.domains].reverse() : []

        return namespaceArray.concat(completion.label).join('.')
    }

    /**
     * Compare the given Token array to the label and data.domains properties of the completion item.
     * **Note:** empty arrays match everything.
     * @param tokens The array of Tokens to use for the search.
     * @param completion The CompletionItem to attempt a match against.
     * @returns True if the given Tokens have the same namespace depth as the given completion and
     * wholly or partially match against it. False otherwise.
     */
    export function tokensMatch(tokens: Array<Token>, completion: CompletionItem): boolean {
        if (tokens.length === 0) {
            return true
        }

        return ResolvedNamespace.equal(
            ResolvedNamespace.create(tokens),
            CompletionItem.resolveNamespace(completion)
        )
    }
}
