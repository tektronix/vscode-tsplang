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

import { resolveCompletionNamespace } from './instrument/provider'
import { parentheses } from './lua/pair'
import { getActiveParameter, getOffsetOfUnmatched } from './signatureProcessor'
import { TspItem } from './tspManager'
import { InstrumentCompletionItem, InstrumentSignatureHelp, InstrumentSignatureInformation } from './wrapper'

const namespaceRegexp = new RegExp(/^[a-zA-Z0-9\[\].]*/)
const tableIndexRegexp = new RegExp(/\[[0-9]\]/g)

export function resolveCompletion(item: InstrumentCompletionItem, tspItem: TspItem): InstrumentCompletionItem {
    const result = item

    // We cannot provide completion documentation if none exist
    if (tspItem.context.commandSet.completionDocs.size === 0) {
        return result
    }

    // Only service those CompletionItems whose "documentation" property is undefined
    if (result.documentation === undefined) {
        const commandDoc = tspItem.context.commandSet.completionDocs.get(resolveCompletionNamespace(result))

        if (commandDoc === undefined) {
            return result
        }

        result.documentation = {
            kind: commandDoc.kind,
            value: commandDoc.toString(tspItem.context.commandSet.specification)
        }
    }

    return result
}

export function getCompletions(position: Position, tspItem: TspItem): Array<InstrumentCompletionItem> | undefined {
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

    const results: Array<InstrumentCompletionItem> = new Array()

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
            if (InstrumentCompletionItem.namespaceMatch(unreversed, completion)) {
                results.push(completion)
            }
        }
    }

    return results
}

export function getSignatureHelp(position: Position, tspItem: TspItem): InstrumentSignatureHelp | undefined {
    // We cannot provide signatures if none exist
    if (tspItem.context.commandSet.signatures.length === 0) {
        return
    }

    const contentText = tspItem.context.document.getText()

    // Convert the current Position to a zero-based offset
    const offset: number = tspItem.context.document.offsetAt(position)

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
    const reversed = contentText.slice(0, openParenOffset).split('').reverse().join('').replace(/^\s*/, '')
    // Match against the reversed string.
    const reverseMatches = reversed.match(namespaceRegexp)

    if (reverseMatches === null) {
        return
    }

    const firstMatch = reverseMatches.shift()

    if (firstMatch === undefined) {
        return
    }

    // Un-reverse the string and remove digits inside of table indexers
    const unreversed = firstMatch.split('').reverse().join('').replace(tableIndexRegexp, '[]')

    const results: Array<InstrumentSignatureInformation> = new Array()

    for (const fullSignature of tspItem.context.commandSet.signatures) {
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
