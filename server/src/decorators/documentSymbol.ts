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

import { CommonTokenStream, InputStream, ParserRuleContext, Token } from 'antlr4'
import * as vsls from 'vscode-languageserver'

import { TspFastLexer, TspFastParser } from '../antlr4-tsplang'
import { ExclusiveContext, FuzzyOffsetMap } from '../language-comprehension/exclusive-completion'
import { SignatureContext } from '../language-comprehension/signature'

import { Range } from './range'

export class DocumentSymbol implements vsls.DocumentSymbol {
    children?: Array<DocumentSymbol>
    deprecated?: boolean
    detail?: string
    kind: vsls.SymbolKind
    name: string
    range: vsls.Range
    selectionRange: vsls.Range

    private enteredStatementException: boolean
    private exceptionTokenIndex?: number
    /**
     * A Map keyed to the ending offset of an assignment operator (`=`) or
     * expression list separator (`,`). The associated key-value is an
     * ExclusiveContext.
     */
    private exclusives: Map<number, ExclusiveContext>
    private fuzzyOffsets: FuzzyOffsetMap
    private fuzzySignatureOffsets: FuzzyOffsetMap
    /**
     * A Map keyed to the ending offset of a function call's open parenthesis.
     * The associated key-value is a SignatureContext.
     */
    private signatures: Map<number, SignatureContext>
    private readonly tableIndexRegexp: RegExp
    private tokens: Array<Token>

    constructor(tokens: Array<Token>) {
        if (tokens.length === 0) {
            throw Error('DocumentSymbol constructor received zero Tokens')
        }

        // TODO: general statement checks here

        // this.parseTokens(tokens)
    }

    /**
     * Add the given DocumentSymbol leaf to this object's tree.
     */
    grow(child: DocumentSymbol): void {
        if (this.children) {
            // Returns the index of the DocumentSymbol this child resides in,
            // or -1 if the child is a direct child.
            const index = this.children.findIndex((value: DocumentSymbol) => {
                return Range.within(child.range, value.range)
            })

            if (index === -1) {
                this.children.push(child)
                this.children.sort((a: DocumentSymbol, b: DocumentSymbol) => {
                    return Range.compare(a.range, b.range)
                })
            }
            else {
                this.children[index].grow(child)
            }
        }
        else {
            this.children = new Array()
            this.children.push(child)
        }
    }

    within(symbol: DocumentSymbol): boolean {
        return Range.within(symbol.range, this.range)
    }

    private parseTokens = (tokens: Array<Token>): void => {
        // // Cache Tokens if they form a valid namespace.
        // // (NAME types, full-stop accessors, and array indexers only)
        // let namespaceTokens = new Array<Token>()

        // for (let index = 0; index < tokens.length; index++) {
        //     const token = tokens[index]

        //     if (token.type === TspFastLexer.NAME || token.type === TspFastLexer.EOF) {
        //         let resolvedNamespace: ResolvedNamespace
        //         let depth: number

        //         // If the current Token is the EOF, then register and return
        //         if (token.type === TspFastLexer.EOF) {
        //             this.registerCompletionTokens(namespaceTokens)

        //             return
        //         }

        //         namespaceTokens.push(token)

        //         this.registerCompletionTokens(namespaceTokens)

        //         // Look ahead to see if the next Token is an open parenthesis.
        //         const nextToken = tokens[index + 1]

        //         if (nextToken !== undefined && nextToken.text.localeCompare('(') === 0) {
        //             resolvedNamespace = ResolvedNamespace.create(namespaceTokens)
        //             depth = ResolvedNamespace.depth(resolvedNamespace)

        //             // Filter on any available signatures at our current namespace depth.
        //             const signatures = (this.commandSet.signatureDepthMap.get(depth) || []).filter(
        //                 (value: SignatureInformation) => {
        //                     return ResolvedNamespace.equal(
        //                         SignatureInformation.resolveNamespace(value),
        //                         resolvedNamespace
        //                     )
        //                 }
        //             )

        //             if (signatures.length > 0) {
        //                 const nextIndex = index + 1

        //                 // Try to reach the pairing close parenthesis.
        //                 const closingIndex = SignatureContext.consumePair(nextIndex, tokens)

        //                 // If we found a close parenthesis.
        //                 if (closingIndex !== nextIndex) {
        //                     const closeParenthesis = tokens[closingIndex]

        //                     // Get all Tokens between the parentheses.
        //                     const midTokens = tokens.slice(nextIndex + 1, closingIndex)

        //                     // Advance to the Token after the close parenthesis.
        //                     index = closingIndex + 1

        //                     // Register this signature context.
        //                     this.registerSignatureContext(
        //                         nextToken.stop + 1,
        //                         SignatureContext.create(
        //                             nextToken,
        //                             midTokens,
        //                             closeParenthesis,
        //                             signatures,
        //                             this.document.positionAt.bind(this.document)
        //                         )
        //                     )
        //                 }
        //             }
        //         }
        //     }
        //     else if (token.text.localeCompare('.') === 0) {
        //         namespaceTokens.push(token)

        //         this.registerCompletionTokens(namespaceTokens)
        //     }
        //     // Consume everything inside the array indexer.
        //     else if (token.text.localeCompare('[') === 0) {
        //         const startingIndex = index

        //         index = SignatureContext.consumePair(index, tokens)

        //         // If we successfully consumed the array indexer.
        //         if (index !== startingIndex) {
        //             // Add the array indexer to the namespace tokens.
        //             namespaceTokens.push(...tokens.slice(startingIndex, index + 1))
        //         }
        //     }
        //     // If this Token is an invalid namespace component.
        //     else {
        //         // Clear the cache.
        //         namespaceTokens = new Array<Token>()
        //     }
        // }
    }
}