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

import { TspFastLexer } from '../antlr4-tsplang'
import { CompletionItem, IToken, MarkupContentCallback, ResolvedNamespace, SignatureInformation } from '../decorators'
import { Ambiguity, statementRecognizer, StatementType, TokenUtil } from '../language-comprehension'

import { InstrumentSpec } from './instrumentSpec'

export interface CommandSetInterface {
    completionDocs?: Map<string, MarkupContentCallback>
    completions: Array<CompletionItem>
    signatures?: Array<SignatureInformation>
}
export namespace CommandSetInterface {
    export function getCompletionMap(
        completions: Array<CompletionItem>
    ): Map<string, Array<CompletionItem>> {
        const result = new Map<string, Array<CompletionItem>>()

        completions.forEach((value: CompletionItem) => {
            const namespace = CompletionItem.resolveNamespace(value)

            const item = result.get(namespace) || new Array<CompletionItem>()
            item.push(value)

            result.set(namespace, item)
        })

        return result
    }

    export function getSignatureMap(
        signatures: Array<SignatureInformation>
    ): Map<string, Array<SignatureInformation>> {
        const result = new Map<string, Array<SignatureInformation>>()

        signatures.forEach((value: SignatureInformation) => {
            const namespace = SignatureInformation.resolveNamespace(value)

            const item = result.get(namespace) || new Array<SignatureInformation>()
            item.push(value)

            result.set(namespace, item)
        })

        return result
    }
}

export class CommandSet implements CommandSetInterface {
    readonly completionDepthMap: Map<number, Array<CompletionItem>>
    readonly completionDocs: Map<string, MarkupContentCallback>
    readonly reserved: Array<CompletionItem>
    readonly signatureDepthMap: Map<number, Array<SignatureInformation>>
    readonly specification: InstrumentSpec

    constructor(spec: InstrumentSpec) {
        this.completionDepthMap = new Map()
        this.completionDocs = new Map()
        this.reserved = new Array()
        this.signatureDepthMap = new Map()
        this.specification = spec
    }

    get completions(): Array<CompletionItem> {
        const result = new Array<CompletionItem>()
        this.completionDepthMap.forEach((value: Array<CompletionItem>) => {
            result.push(...value)
        })

        return result
    }

    get signatures(): Array<SignatureInformation> {
        const result = new Array<SignatureInformation>()
        this.signatureDepthMap.forEach((value: Array<SignatureInformation>) => {
            result.push(...value)
        })

        return result
    }

    add(set: CommandSetInterface): void {
        // merge completion documentation
        if (set.completionDocs !== undefined) {
            set.completionDocs.forEach((value: MarkupContentCallback, key: string) => {
                this.completionDocs.set(key, value)
            })
        }

        // merge completion items
        set.completions.forEach((value: CompletionItem) => {
            const depth = (value.data === undefined) ? 0 : value.data.domains.length

            if (value.reserved) {
                this.reserved.push(value)
            }
            else {
                const completions = this.completionDepthMap.get(depth) || new Array<CompletionItem>()
                completions.push(value)
                this.completionDepthMap.set(depth, completions)
            }
        })

        // merge signatures
        if (set.signatures !== undefined) {
            set.signatures.forEach((value: SignatureInformation) => {
                const depth = SignatureInformation.depth(value)
                const signatures = this.signatureDepthMap.get(depth) || new Array<SignatureInformation>()
                signatures.push(value)
                this.signatureDepthMap.set(depth, signatures)
            })
        }
    }

    isCompletion(token: IToken): boolean {
        return (this.completionDepthMap.get(0) || []).some((value: CompletionItem) => {
            return value.label.localeCompare(token.text) === 0
        })
    }

    /**
     * NOTE: The end of the last Token is the current location of the cursor.
     */
    suggestCompletions(tokens: Array<IToken>, type: StatementType | Ambiguity): Array<CompletionItem> {
        const _type = (type === StatementType.None) ? statementRecognizer(tokens as Array<Token>) : type

        /**
         * # Rules
         *
         * ## No Completions
         * 0. tokens is empty
         * 1. type is Break
         * 2. type is Function
         * 3. type is FunctionLocal
         * 4. type is Ambiguity.LOCAL
         * 5. type is AssignmentLocal & '=' is not present
         * 6. type is Assignment or AssignmentLocal or Ambiguity.FLOATING_TOKEN
         *      & last Token is neither a NAME nor accessor ('.', ':')
         */

        // No Completions: Rule 0
        if (tokens.length === 0) {
            return []
        }

        // No Completions: Rules 1, 2, 3, 4
        if (_type === StatementType.Break
            || _type === StatementType.Function
            || _type === StatementType.FunctionLocal
            || (Ambiguity.is(_type) && Ambiguity.equal(_type as Ambiguity, Ambiguity.LOCAL))) {
            return []
        }

        /**
         * Information relevant only to Assignment & AssignmentLocal.
         * Stores left-hand/right-hand side information.
         */
        interface SideAssignmentInfo {
            /**
             * The total number of commas that occur before this assignment item.
             */
            commaIndex: number
            /**
             * Whether or not we encountered an accessor before our first NAME token.
             * Only applicable to the RHS.
             */
            hangingAccessor: boolean
            /**
             * An array of NAME Tokens that comprise a namespace.
             * The array is cleared when a non-namespace Token is encountered before either
             * the end of the Token array or a non-consumable comma.
             */
            names: Array<string>
        }
        interface AssignmentInfo {
            /**
             * The optional index of the assignment operator within the passed IToken array.
             */
            assignmentIndex?: number
            /**
             * Information comprising the left-hand side of the assignment.
             */
            left: SideAssignmentInfo
            /**
             * Information comprising the right-hand side of the assigment.
             */
            right?: SideAssignmentInfo
        }

        if (_type === StatementType.Assignment
            || _type === StatementType.AssignmentLocal
            || (Ambiguity.is(_type) && Ambiguity.equal(_type as Ambiguity, Ambiguity.FLOATING_TOKEN))) {
            const assignInfo: AssignmentInfo = {
                left: {
                    commaIndex: 0,
                    hangingAccessor: false,
                    names: new Array()
                }
            }

            const lastIndex = tokens.length - 1

            if (lastIndex === -1) {
                return []
            }

            // No Completions: Rule 6
            if (!(tokens[lastIndex].type === TspFastLexer.NAME
                || tokens[lastIndex].text.localeCompare('.') === 0
                || tokens[lastIndex].text.localeCompare(':') === 0)) {
                return []
            }

            /**
             * Handle Tokens from right-to-left until the assignment operator.
             * If the assignment operator is found and we have identified commas, then
             * perform left-hand-side parsing left-to-right through the Token array.
             *
             * This mitigates the cost of parsing multi-assignment statements where
             * the cursor is somewhere along the right-hand-side.
             * Parsing this case left-to-right requires us to store N total LHS
             * assignment items when we may only care about providing exclusive
             * completions for a single item.
             * Parsing the same case right-to-left requires us to store potentially 2N
             * total assignment items (one for each side), since we cannot determine
             * the position (relative to the assignment operator) of the RHS item that
             * the cursor resides in until the entire assignment statement has been
             * parsed.
             *
             * However, if we start parsing right-to-left then conditionally switch to
             * right-to-left parsing, we gain the following advantages:
             * * If we come across a non-cosumable comma before the assignment operator,
             *      then we only need to store the total number of non-consumable commas
             *      before finding it.
             * * If we do not find any non-consumable commas before the assignment
             *      operator, then we can continue parsing right-to-left since we know
             *      that our LHS will immediately follow.
             * * If we switch our parse direction, then we only need to count the number
             *      of non-consumable commas before storing the relevant LHS information.
             */
            for (let i = lastIndex; i >= 0; i--) {
                i = TokenUtil.consumePair(i, tokens as Array<Token>, false)

                if (tokens[i].type === TspFastLexer.NAME && assignInfo.left.commaIndex === 0) {
                    assignInfo.left.names.push(tokens[i].text)
                }
                else if (tokens[i].text.localeCompare('.') === 0 || tokens[i].text.localeCompare(':') === 0) {
                    if (assignInfo.left.names.length === 0) {
                        assignInfo.left.hangingAccessor = true
                    }

                    continue
                }
                else if (tokens[i].text.localeCompare(',') === 0) {
                    // We seem to be parsing the entire assignment left-to-right since both
                    // the RHS and assignment operator have been identified.
                    if (assignInfo.right !== undefined && assignInfo.assignmentIndex !== undefined) {
                        break
                    }

                    assignInfo.left.commaIndex++
                }
                else if (tokens[i].text.localeCompare('=') === 0) {
                    assignInfo.assignmentIndex = i
                    // assignInfo.left.startIndex = i + 1

                    // Move what we assumed to be the left-hand side to the right-hand side.
                    assignInfo.right = assignInfo.left
                    assignInfo.left = undefined

                    // We want to handle the left-hand-side while iterating from left-to-right.
                    if (assignInfo.right.commaIndex > 0
                        // Only global assignments benefit from LHS & RHS analysis.
                        || _type === StatementType.AssignmentLocal) {
                        break
                    }

                    assignInfo.left = {
                        commaIndex: 0,
                        hangingAccessor: false,
                        names: new Array()
                    }
                }
                else {
                    if (assignInfo.left.commaIndex === 0 && assignInfo.left.names.length > 0) {
                        assignInfo.left.names = new Array()
                    }
                }
            }

            // No Completions: Rule 5
            if (assignInfo.assignmentIndex === undefined && _type === StatementType.AssignmentLocal) {
                return []
            }
            // Handle the left-hand-side of the assignment if applicable.
            else if (assignInfo.left === undefined
                && assignInfo.assignmentIndex !== undefined
                && assignInfo.right.commaIndex > 0
                && _type !== StatementType.AssignmentLocal) {

                assignInfo.left = {
                    commaIndex: 0,
                    hangingAccessor: false,
                    names: new Array()
                }

                for (let i = 0; i < assignInfo.assignmentIndex; i++) {
                    i = TokenUtil.consumePair(i, tokens as Array<Token>)

                    if (tokens[i].text.localeCompare(',') === 0) {
                        assignInfo.left.commaIndex++
                    }
                    else if (assignInfo.left.commaIndex < assignInfo.right.commaIndex) {
                        continue
                    }
                    else if (assignInfo.left.commaIndex > assignInfo.right.commaIndex) {
                        break
                    }
                    else if (tokens[i].type === TspFastLexer.NAME) {
                        assignInfo.left.names.push(tokens[i].text)
                    }
                    else {
                        if (assignInfo.left.commaIndex !== assignInfo.right.commaIndex
                            && assignInfo.left.names.length > 0) {
                            assignInfo.left.names = new Array()
                        }
                    }
                }
            }

            // Get any exclusive assignment completions.
            if (assignInfo.left !== undefined && assignInfo.right !== undefined) {
                const rootLHS = assignInfo.left.names.shift()
                const domainsLHS = new Array<string>(...assignInfo.left.names).reverse()
                const completionFragmentLHS = {
                    data: (domainsLHS.length > 0) ? { domains: domainsLHS } : undefined,
                    label: rootLHS
                }
                let namespaceRHS = assignInfo.right.names.reverse().join('.')

                // Append an accessor as necessary.
                if (assignInfo.right.hangingAccessor) {
                    namespaceRHS += '.'
                }

                // Get any completions that exactly match the LHS.
                const completionsLHS = (this.completionDepthMap.get(assignInfo.left.names.length - 1) || []).filter(
                    (value: CompletionItem) => CompletionItem.namespacesEqual(completionFragmentLHS, value)
                )

                // Provide regular completions should no exclusive completions be available.
                if (completionsLHS.length === 0) {
                    const depth = ResolvedNamespace.depth(namespaceRHS)

                    // Get any completions that match the LHS.
                    return (this.completionDepthMap.get(depth) || []).filter(
                        (value: CompletionItem) => CompletionItem.namespaceMatch(namespaceRHS, value)
                    )
                }

                // Get all valid exclusive assignments.
                const exclusiveAssigns = new Array<CompletionItem>()
                for (const completion of completionsLHS) {
                    if (completion.data === undefined || completion.data.types === undefined) {
                        continue
                    }

                    exclusiveAssigns.push(...completion.data.types)
                }

                // Return any exclusive completions that match the RHS.
                return exclusiveAssigns.filter(
                    (value: CompletionItem) => CompletionItem.namespaceMatch(namespaceRHS, value)
                )
            }
            // Handle the left-hand-side of Assignments/Function Calls.
            else if (assignInfo.right === undefined && assignInfo.assignmentIndex === undefined) {
                let namespaceLHS = assignInfo.left.names.reverse().join('.')

                // Append an accessor as necessary.
                if (assignInfo.left.hangingAccessor) {
                    namespaceLHS += '.'
                }

                const depth = ResolvedNamespace.depth(namespaceLHS)

                // Get any completions that match the LHS.
                return (this.completionDepthMap.get(depth) || []).filter(
                    (value: CompletionItem) => CompletionItem.namespaceMatch(namespaceLHS, value)
                )
            }
        }

        return []
    }
}
