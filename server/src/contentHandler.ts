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

import { CompletionItem, Position, SignatureHelp, SignatureInformation, TextDocuments } from 'vscode-languageserver'

import { getActiveParameter, getOffsetOfUnmatched } from './contentProcessor'
import { resolveCompletionNamespace } from './instrument/provider'
import { parentheses } from './lua/pair'
import { TspItem } from './tspManager'

export class ContentHandler {
    lastCompletionUri?: string

    private readonly documents: TextDocuments
    private namespaceRegexp: RegExp = new RegExp(/^[a-zA-Z0-9\[\].]*/)
    private tableIndexRegexp: RegExp = new RegExp(/\[[0-9]\]/g)

    constructor(documents: TextDocuments) {
        this.documents = documents
    }

    getCompletionDoc = (item: CompletionItem, tspItem: TspItem): CompletionItem => {
        const result: CompletionItem = item

        // We cannot provide completion documentation if none exist
        if (tspItem.commandSet.completionDocs.size === 0) {
            return result
        }

        // Only service those CompletionItems whose "documentation" property is undefined
        if (result.documentation === undefined) {
            const commandDoc = tspItem.commandSet.completionDocs.get(resolveCompletionNamespace(result))

            if (commandDoc === undefined) {
                return result
            }

            result.documentation = {
                kind: commandDoc.kind,
                value: commandDoc.toString(tspItem.commandSet.specification)
            }
        }

        return result
    }

    getCompletions(uri: string, position: Position, tspItem: TspItem): Array<CompletionItem> | undefined {
        // Save the last uri that asked us for a list of completions
        this.lastCompletionUri = uri

        // We cannot provide completions if none exist
        if (tspItem.commandSet.completions.length === 0) {
            return
        }

        const content = this.documents.get(this.lastCompletionUri)

        if (content === undefined) {
            return
        }

        const contentText = content.getText()

        // Convert the current Position to a zero-based offset
        const offset: number = content.offsetAt(position)

        // Get all text before the cursor offset, reverse it, and match against it.
        // Reversing allows for a simpler regular expression since the match
        // will start at the beginning of the string.
        const reverseMatches = this.reverse(contentText.slice(0, offset)).match(this.namespaceRegexp)

        if (reverseMatches === null) {
            return
        }

        const results: Array<CompletionItem> = new Array()

        let firstMatch = reverseMatches.shift()

        // Show root namespace completions if we did not match against a namespace
        if (firstMatch === undefined || firstMatch === '') {
            for (const completion of tspItem.commandSet.completions) {
                // Root namespaces have an undefined "data" property
                if (completion.data === undefined) {
                    results.push(completion)
                }
            }

            return results
        }

        let endingQualifier = false

        // Remove any trailing namespace qualifiers (".").
        // Since the string is reversed, this is index 0.
        if (firstMatch.indexOf('.') === 0) {
            firstMatch = firstMatch.slice(1)
            endingQualifier = true

            // Return if we just deleted the entire string
            if (firstMatch.length === 0) {
                return
            }
        }

        // Un-reverse the string and remove any table indexers
        const unreversed = this.reverse(firstMatch.replace(this.tableIndexRegexp, ''))
        // Split the unreversed string on namespace qualifiers and reverse the resulting array
        const reverseNamespaceArray: Array<string> = unreversed.split('.').reverse()

        for (const completion of tspItem.commandSet.completions) {
            // Use the "data" property if it exists...
            if (completion.data !== undefined) {
                if (completion.data.join('.') === reverseNamespaceArray.join('.')) {
                    results.push(completion)
                }
            }
            // ...otherwise this completion should be treated as a root namespace.
            else {
                // Do not include a root namespace in our results if the last character
                // of the user's current namespace is a namespace qualifier.
                // Suggest the foo module on a "foo" match but not on a "foo." match.
                if (endingQualifier) {
                    continue
                }

                // Partial match against the "label" property
                const partialMatches = completion.label.match(reverseNamespaceArray.join('.'))

                if (partialMatches === null) {
                    continue
                }

                const partial = partialMatches.shift()
                if (partial !== undefined && partial.length !== 0) {
                    results.push(completion)
                }
            }
        }

        return results
    }

    getSignatures(uri: string, position: Position, tspItem: TspItem): SignatureHelp | undefined {
        // We cannot provide signatures if none exist
        if (tspItem.commandSet.signatures.length === 0) {
            return
        }

        const content = this.documents.get(uri)

        if (content === undefined) {
            return
        }

        const contentText = content.getText()

        // Convert the current Position to a zero-based offset
        const offset: number = content.offsetAt(position)

        // Get the document offset of the nearest open-parenthesis to the left of the cursor offset
        const openParenOffset = getOffsetOfUnmatched(contentText.slice(0, offset), parentheses, true)

        if (openParenOffset === undefined) {
            return
        }

        // Get the document offset of the nearest close-parenthesis to the right of the cursor offset
        let closeParenOffset = getOffsetOfUnmatched(contentText.slice(offset), parentheses, false)

        if (closeParenOffset === undefined) {
            return
        }

        closeParenOffset = offset + closeParenOffset

        // Do not provide signature help if the cursor moves outside of a parenthesis-pair
        if (offset <= openParenOffset || offset > closeParenOffset) {
            return
        }

        // Get all text before the open-parenthesis offset, reverse it, and remove leading horizontal spaces
        const reverse = this.reverse(contentText.slice(0, openParenOffset)).replace(/^\s*/, '')
        // Match against the reversed string.
        const reverseMatches = reverse.match(this.namespaceRegexp)

        if (reverseMatches === null) {
            return
        }

        const firstMatch = reverseMatches.shift()

        if (firstMatch === undefined) {
            return
        }

        // Un-reverse the string and remove digits inside of table indexers
        const unreversed = this.reverse(firstMatch).replace(this.tableIndexRegexp, '[]')

        const results: Array<SignatureInformation> = new Array()

        for (const fullSignature of tspItem.commandSet.signatures) {
            // Get the namespace of the signature before the first open-parenthesis
            const signature: string = fullSignature.label.slice(0, fullSignature.label.indexOf('('))

            // Only add signatures if they are an exact match
            if (signature.localeCompare(unreversed) === 0) {
                results.push(fullSignature)
            }
        }

        const activeParameter = getActiveParameter(
            contentText,
            offset,
            openParenOffset,
            closeParenOffset
        )

        return {
            activeParameter,
            activeSignature: 0,
            signatures: results
        }
    }

    /**
     * Reverse the given string.
     * @param value - The string to reverse.
     * @returns The given string in reverse order.
     */
    private reverse = (value: string): string => {
        // Convert the string to an array of characters,
        // Reverse the array of characters
        // Convert the array to a string
        return value.split('').reverse().join('')
    }
}
