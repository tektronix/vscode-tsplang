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
import {
    CompletionItem,
    IToken,
    MarkupContentCallback,
    ResolvedNamespace,
    SignatureInformation
} from '../decorators'
import {
    StatementAmbiguity,
    statementTokenRecognizer,
    StatementType,
    TokenUtil
} from '../language-comprehension'

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
    private readonly tableIndexRegexp: RegExp

    constructor(spec: InstrumentSpec) {
        this.completionDepthMap = new Map()
        this.completionDocs = new Map()
        this.reserved = new Array()
        this.signatureDepthMap = new Map()
        this.specification = spec
        this.tableIndexRegexp = new RegExp(/\[[0-9]\]/g)
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
    suggestCompletions(tokens: Array<IToken>, type: StatementType | StatementAmbiguity): Array<CompletionItem> {
        const _type = (type === StatementType.None) ? statementTokenRecognizer(tokens as Array<Token>) : type

        /**
         * No Completion Rules
         * ---
         * 0. tokens is empty
         * 1. type is Break
         * 2. type is Function
         * 3. type is FunctionLocal
         * 4. type is Ambiguity.LOCAL
         * 5. type is AssignmentLocal & '=' is not present
         * 6. type is Assignment or AssignmentLocal or FunctionCall or Ambiguity.FLOATING_TOKEN
         *      & last Token is not a
         *      * NAME
         *      * accessor ('.', ':')
         *      * comma (',')
         *      * assignment operator ('=')
         *      * open parenthesis ('(')
         */

        // No Completions: Rule 0
        if (tokens.length === 0) {
            return []
        }

        // No Completions: Rules 1, 2, 3, 4
        if (_type === StatementType.Break
            || _type === StatementType.Function
            || _type === StatementType.FunctionLocal
            || (StatementAmbiguity.is(_type)
                && StatementAmbiguity.equal(_type as StatementAmbiguity, StatementAmbiguity.LOCAL))) {
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
             *
             * When the current type is of StatementType.FunctionCall, this is the first
             * unconsumable open parenthesis.
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
            || _type === StatementType.FunctionCall
            || (StatementAmbiguity.is(_type)
                && StatementAmbiguity.equal(_type as StatementAmbiguity, StatementAmbiguity.FLOATING_TOKEN))) {
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
                || tokens[lastIndex].text.localeCompare(':') === 0
                || tokens[lastIndex].text.localeCompare(',') === 0
                || tokens[lastIndex].text.localeCompare('=') === 0
                || tokens[lastIndex].text.localeCompare('(') === 0)) {
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
             * left-to-right parsing, we gain the following advantages:
             * * If we come across a non-consumable comma before the assignment operator,
             *      then we only need to store the total number of non-consumable commas
             *      before finding said assignment operator.
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
                    // We seem to be parsing the entire assignment right-to-left since both
                    // the RHS and assignment operator have been identified. However, since
                    // we found a comma on the LHS, we can stop parsing.
                    if (assignInfo.right !== undefined && assignInfo.assignmentIndex !== undefined) {
                        break
                    }

                    assignInfo.left.commaIndex++
                }
                else if (tokens[i].text.localeCompare('=') === 0
                    || (tokens[i].text.localeCompare('(') === 0 && _type === StatementType.FunctionCall)) {

                    assignInfo.assignmentIndex = i

                    // Move what we assumed to be the LHS to the RHS.
                    assignInfo.right = assignInfo.left
                    assignInfo.left = undefined

                    // We want to handle the LHS while iterating from left-to-right
                    // when we have encountered one or more commas.
                    if (assignInfo.right.commaIndex > 0
                        // Only global assignments benefit from LHS & RHS analysis.
                        || _type === StatementType.AssignmentLocal
                        || _type === StatementType.FunctionCall) {
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
            // Handle the LHS of the assignment if applicable.
            else if (assignInfo.left === undefined
                && assignInfo.assignmentIndex !== undefined
                && assignInfo.right.commaIndex > 0
                && _type !== StatementType.AssignmentLocal
                && _type !== StatementType.FunctionCall) {

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
                    else if (_type !== StatementType.FunctionCall
                        && assignInfo.left.commaIndex < assignInfo.right.commaIndex) {
                        continue
                    }
                    else if (_type !== StatementType.FunctionCall
                        && assignInfo.left.commaIndex > assignInfo.right.commaIndex) {
                        break
                    }
                    else if (tokens[i].type === TspFastLexer.NAME) {
                        assignInfo.left.names.push(tokens[i].text)
                    }
                    else {
                        if (_type === StatementType.FunctionCall) {
                            continue
                        }

                        if (assignInfo.left.commaIndex !== assignInfo.right.commaIndex
                            && assignInfo.left.names.length > 0) {
                            assignInfo.left.names = new Array()
                        }
                    }
                }
            }

            // Get any exclusive parameters from matching functions.
            if (_type === StatementType.FunctionCall
                && assignInfo.left === undefined
                && assignInfo.right !== undefined) {
                const signatureLabel = SignatureInformation.resolveNamespace({
                    label: TokenUtil
                        .getString(...(tokens.slice(0, assignInfo.assignmentIndex) as Array<Token>))
                        .replace(this.tableIndexRegexp, '')
                })
                const depth = SignatureInformation.depth({ label: signatureLabel })
                const matchingSignatures = (this.signatureDepthMap.get(depth) || []).filter(
                    (value: SignatureInformation) => {
                        return (SignatureInformation
                            .resolveNamespace(value)
                            .localeCompare(signatureLabel) === 0)
                    }
                )

                // Get all valid exclusive assignments.
                const exclusiveAssigns = new Array<CompletionItem>()
                for (const signature of matchingSignatures) {
                    if (signature.data === undefined || signature.data.parameterTypes === undefined) {
                        continue
                    }

                    exclusiveAssigns.push(...(signature.data.parameterTypes.get(assignInfo.right.commaIndex) || []))
                }

                let namespaceRHS = assignInfo.right.names.reverse().join('.')
                // Append an accessor as necessary.
                if (assignInfo.right.hangingAccessor) {
                    namespaceRHS += '.'
                }

                // If there are no NAME Tokens on the RHS, then only provide root excusive completions.
                if (assignInfo.right.names.length === 0) {
                    return exclusiveAssigns.filter(
                        (value: CompletionItem) => value.data === undefined || value.data.domains === undefined
                    )
                }

                // Return any exclusive completions that match the RHS.
                return exclusiveAssigns.filter(
                    (value: CompletionItem) => CompletionItem.namespaceMatch(namespaceRHS, value)
                )
            }
            // Get any exclusive assignment completions.
            else if (assignInfo.left !== undefined && assignInfo.right !== undefined) {
                let labelLHS: string
                const domainsLHS = new Array<string>()
                // If no commas were found, then LHS names will be in right-to-left order.
                if (assignInfo.right.commaIndex === 0) {
                    labelLHS = assignInfo.left.names.shift()
                    domainsLHS.push(...assignInfo.left.names)
                }
                // If commas were found, then LHS names will be in left-to-right order.
                else {
                    labelLHS = assignInfo.left.names.pop()
                    domainsLHS.push(...assignInfo.left.names.reverse())
                }

                const completionFragmentLHS = {
                    data: (domainsLHS.length > 0) ? { domains: domainsLHS } : undefined,
                    label: labelLHS
                }

                let namespaceRHS = assignInfo.right.names.reverse().join('.')
                // Append an accessor as necessary.
                if (assignInfo.right.hangingAccessor) {
                    namespaceRHS += '.'
                }

                // Get any completions that exactly match the LHS.
                const completionsLHS = (this.completionDepthMap.get(domainsLHS.length) || []).filter(
                    (value: CompletionItem) => CompletionItem.namespacesEqual(completionFragmentLHS, value)
                )

                // Provide regular completions should no exclusive completions be available.
                if (completionsLHS.length === 0) {
                    const depth = ResolvedNamespace.depth(namespaceRHS)

                    // Get any completions that match the RHS.
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

                // If there are no NAME Tokens on the RHS, then only provide root excusive completions.
                if (assignInfo.right.names.length === 0) {
                    return exclusiveAssigns.filter(
                        (value: CompletionItem) => value.data === undefined || value.data.domains === undefined
                    )
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
