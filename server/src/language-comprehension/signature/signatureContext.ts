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

import { Token } from 'antlr4'
import { CompletionItemKind, Position, Range } from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from '../../decorators'
import { TokenUtil } from '../tokenUtil'

import { ParameterContext } from './parameterContext'

export interface SignatureContext {
    /**
     * This signature's parameter information as a Map keyed to either an open
     * parenthesis stop offset, a comma stop offset, or the stop offset of the
     * last TerminalNode within the parameter. The associated key-value is a
     * ParameterContext.
     */
    parameters: Map<number, ParameterContext>
    /**
     * The Range in which signature help and exclusive parameters should be provided.
     */
    range: Range
    /**
     * The signatures to provide within the associated Range.
     */
    signatures: Array<SignatureInformation>
}
export namespace SignatureContext {
    /**
     * If the token at the given index is a pairing token, then the current index
     * is advanced to the index of its closing partner.
     *
     * The original index is returned if a partner character was not found before
     * the end of the given token array or if the given token is not pairable.
     */
    export function consumePair(index: number, tokens: Array<Token>): number {
        if (index > tokens.length) {
            throw new Error(`Index ${index} is greater than the length of the given array (${tokens.length}).`)
        }

        const consumable = tokens[index]

        if (!isConsumable(consumable)) {
            return index
        }

        let currentIndex = index + 1
        for (; currentIndex < tokens.length; currentIndex++) {
            const currentToken = tokens[currentIndex]

            if (isPartner(consumable, currentToken)) {
                break
            }

            if (isConsumable(currentToken)) {
                currentIndex = consumePair(currentIndex, tokens)
            }
        }

        return (currentIndex === tokens.length) ? index : currentIndex
    }

    /**
     * Create a new SignatureContext. If the given signatures contain no parameter
     * completions, then any parameter created will.
     * @param openingParenthesis A Token representing an open parenthesis.
     * @param tokens An array of Tokens between the parentheses.
     * @param closingParenthesis A Token representing a close parenthesis.
     * @param signatures An array of signatures associated with the given tokens.
     * @param positionAt Some bound TextDocument.positionAt function.
     * @returns A new ParameterContext.
     */
    export function create(
        openingParenthesis: Token,
        tokens: Array<Token>,
        closingParenthesis: Token,
        signatures: Array<SignatureInformation>,
        positionAt: (offset: number) => Position
    ): SignatureContext {
        if (openingParenthesis.text.localeCompare('(') !== 0) {
            throw new Error('Parameter `openingParenthesis` is not an opening parenthesis ("(").')
        }

        if (closingParenthesis.text.localeCompare(')') !== 0) {
            throw new Error('Parameter `closingParenthesis` is not a closing parenthesis (")").')
        }

        const result: SignatureContext = {
            signatures,
            parameters: new Map(),
            range: Range.create(
                positionAt(openingParenthesis.stop + 1),
                positionAt(closingParenthesis.start)
            )
        }

        // If there are no Tokens, then use the parentheses as the range of the
        // 0th parameter and return.
        if (tokens.length === 0) {
            result.parameters.set(
                // Keyed offset is the opening parenthesis.
                openingParenthesis.stop + 1,
                {
                    completions: getCompletionsForParameter(0, result),
                    index: 0,
                    range: result.range,
                    tokens: []
                }
            )

            return result
        }

        // The parameter offset is either where the group started or the stop offset
        // of the last token in the group.
        const getOffset = function(groupStartOffset: number, group: Array<Token>): number {
            return (group.length === 0)
                ? groupStartOffset
                : group[group.length - 1].stop + 1
        }

        // Token groups split on commas of equal pairing level.
        // For example, given the combined text of all tokens
        //      (,), [,], {,}
        // Splitting on commas of equal pairing levels would result in
        // the following groups:
        //      (,)
        //      [,]
        //      {,}
        let tokenGroup = new Array<Token>()
        let groupStart = openingParenthesis.stop + 1
        let currentGroup = 0
        for (let i = 0; i < tokens.length; i++) {
            // Create a new parameter entry and move to the next group.
            if (tokens[i].text.localeCompare(',') === 0) {
                const comma = tokens[i]

                result.parameters.set(
                    getOffset(groupStart, tokenGroup),
                    {
                        completions: getCompletionsForParameter(currentGroup, result),
                        index: currentGroup,
                        range: Range.create(
                            positionAt(groupStart),
                            positionAt(comma.start)
                        ),
                        tokens: tokenGroup
                    }
                )

                result.signatures = filterSignatures(result)

                // Set the new starting position to the stop offset of this comma.
                groupStart = comma.stop + 1

                // Reset the token group.
                tokenGroup = new Array<Token>()

                // Increment the current group number.
                currentGroup++

                continue
            }

            // Get an ending index for the upcoming slice operation.
            // The Array.slice function won't mind if our ending index is out of bounds
            // when we're on the last loop.
            let endIndex = i + 1
            if (isConsumable(tokens[i])) {
                // Advance the ending index as necessary to skip commas nested in
                // other levels.
                endIndex = consumePair(i, tokens)
            }

            // We instantiated this earlier and the current group has not changed.
            tokenGroup.push(...tokens.slice(i, endIndex))
        }

        // Create the last parameter group.
        result.parameters.set(
            getOffset(groupStart, tokenGroup),
            {
                completions: getCompletionsForParameter(currentGroup, result),
                index: currentGroup,
                range: Range.create(
                    positionAt(groupStart),
                    result.range.end
                ),
                tokens: tokenGroup
            }
        )

        result.signatures = filterSignatures(result)

        return result
    }

    function getCompletionsForParameter(
        parameter: number,
        context: SignatureContext
    ): Array<CompletionItem> {
        const results = new Array<CompletionItem>()

        // Track the root completion items that have been added to the results.
        // Roots are kept in a separate array for increased lookup speed since there are usually
        // fewer root items than there are completions.
        const existingRoots = new Array<CompletionItem>()

        context.signatures.forEach((signature: SignatureInformation) => {
            if (signature.data === undefined) {
                return
            }

            const completions = signature.data.parameterTypes.get(parameter)

            if (completions === undefined) {
                return
            }

            // Get all non-root completion items.
            const leafCompletions = completions.filter((completion: CompletionItem) => {
                // If this completion item is not a root completion
                if (completion.kind && completion.kind !== CompletionItemKind.Module) {
                    return true
                }
                else {
                    // Compares the given root to the current completion item.
                    const predicate = (root: CompletionItem): boolean => {
                        // Compare the two namespaces. Exclude their labels.
                        return CompletionItem.namespacesEqual(root, completion, true)
                    }

                    // Only add unique root completion items to the root completion array.
                    if (! existingRoots.some(predicate)) {
                        existingRoots.push(completion)
                    }
                }
            })

            // Add all non-root completions to the results.
            results.push(...leafCompletions)
        })

        // Add all root completions to the results.
        results.push(...existingRoots)

        return results
    }

    function filterSignatures(context: SignatureContext): Array<SignatureInformation> {
        // No filtering is possible when the context contains fewer than 2 signatures.
        if (context.signatures.length <= 1) {
            return context.signatures
        }

        // Every signature is a possibility if the user has not specified any parameters.
        if (context.parameters.size === 0) {
            return context.signatures
        }

        const matches = context.signatures.filter((signature: SignatureInformation) => {
            // Skip this signature if it contains no SignatureData.
            //  No SignatureData means no exclusive parameter completions.
            //  No exclusive parameter completions means we have nothing to filter on.
            if (signature.data === undefined) {
                return false
            }

            // For each parameter that the user has specified.
            for (const parameter of context.parameters.values()) {
                // Get the text of the current user-specified parameter.
                const parameterText = TokenUtil.getString(...parameter.tokens)
                // Continue to the next user-specified parameter if this one is blank.
                if (parameterText === undefined) {
                    continue
                }

                // Get the parameter completions that were suggested for this user-specified parameter.
                const completions = signature.data.parameterTypes.get(parameter.index)
                // Continue if there are no parameter completions.
                if (completions === undefined) {
                    continue
                }

                // Try to perform a partial match against at least one previously suggested parameter
                // completion.
                const onePartialMatch = completions.some((completionItem: CompletionItem) => {
                    return CompletionItem.namespaceMatch(parameterText, completionItem)
                })

                // If we failed to match against any parameter completion, then do not include
                // this signature.
                if (! onePartialMatch) {
                    return false
                }
            }

            return true
        })

        // Return the given signature set if no signatures matched our filter.
        return (matches.length > 0) ? matches : context.signatures
    }

    /**
     * @returns True if the token has a separate closing token and false otherwise.
     */
    function isConsumable(token: Token): boolean {
        return (token.text.localeCompare('(') === 0
            || token.text.localeCompare('[') === 0
            || token.text.localeCompare('{') === 0)
    }

    /**
     * Determines if the two Tokens form a pair.
     * @param consumable The consumable Token that needs a partner.
     * @param suitor A potential Token partner.
     * @returns True when both tokens form a pair and false otherwise.
     */
    function isPartner(consumable: Token, suitor: Token): boolean {
        return ((consumable.text.localeCompare('(') === 0 && suitor.text.localeCompare(')') === 0)
            || (consumable.text.localeCompare('[') === 0 && suitor.text.localeCompare(']') === 0)
            || (consumable.text.localeCompare('{') === 0 && suitor.text.localeCompare('}') === 0))
    }
}
