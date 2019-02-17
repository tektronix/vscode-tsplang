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
import { Ambiguity, LocalDeclaration, statementRecognizer, StatementType, TokenUtil } from '../language-comprehension'
import { ExclusiveContext, FuzzyOffsetMap } from '../language-comprehension/exclusive-completion'
import { SignatureContext } from '../language-comprehension/signature'

import { IToken } from '.'
// tslint:disable-next-line:no-import-side-effect
import './antlr4'
import { Range } from './range'

export interface IDocumentSymbol extends vsls.DocumentSymbol {
    local: boolean
}
export class DocumentSymbol implements IDocumentSymbol {
    children?: Array<DocumentSymbol>
    deprecated?: boolean
    detail?: string
    kind: vsls.SymbolKind
    local: boolean = false
    name: string
    range: vsls.Range
    selectionRange: vsls.Range
    readonly start: vsls.Position
    tokens?: Array<IToken>

    private _end: vsls.Position
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

    constructor(start: vsls.Position) {
        this.start = start
    }

    get end(): vsls.Position {
        return this._end
    }

    set end(value: vsls.Position) {
        this._end = value
        this.range = {
            end: this._end,
            start: this.start
        }

        if (this.selectionRange === undefined) {
            this.selectionRange = this.range
        }
    }

    /**
     * Remove children that cause the given predicate to return true.
     */
    prune(predicate: (value: DocumentSymbol) => boolean): IDocumentSymbol {
        const clone: IDocumentSymbol = {
            children: new Array(),
            deprecated: this.deprecated,
            detail: this.detail,
            kind: this.kind,
            local: this.local,
            name: this.name,
            range: this.range,
            selectionRange: this.selectionRange
        }

        for (let i = 0; i < (this.children || []).length; i++) {
            const child = this.children[i].prune(predicate)

            if (predicate(child as DocumentSymbol)) {
                // Extract pruned grandchildren that aren't local declarations.
                const orphans = (child.children || []).filter((v: IDocumentSymbol) => !v.local)
                clone.children.push(...orphans)
            }
            else {
                clone.children.push(child)
            }
        }

        return clone
    }

    setSymbolProperties(tokens: Array<Token>): void {
        const type = statementRecognizer(tokens)
        let startSelectionPosition: vsls.Position
        let endSelectionPosition: vsls.Position

        // If we had trouble determining the StatementType from the provided Tokens.
        if (Ambiguity.is(type)) {
            if (Ambiguity.equal(type as Ambiguity, Ambiguity.FLOATING_TOKEN)) {
                let isAssignment = false
                let isProperty = false
                let foundComma = false
                // Try to find the location of an assignment operator ("="),
                // except for those within consumable pairs.
                let i = 0
                for (; i < tokens.length; i++) {
                    i = TokenUtil.consumePair(i, tokens)

                    if (tokens[i].text.localeCompare('.') === 0) {
                        isProperty = true
                    }
                    else if (tokens[i].text.localeCompare(',') === 0) {
                        foundComma = true
                    }
                    else if (tokens[i].text.localeCompare('=') === 0) {
                        isAssignment = true
                        endSelectionPosition = TokenUtil.getPosition(tokens[i - 1], tokens[i - 1].text.length)
                        this.name = TokenUtil.getString(...tokens.slice(0, i))

                        break
                    }
                }

                this.kind = (isAssignment)
                    ? (isProperty && !foundComma) ? vsls.SymbolKind.Property : vsls.SymbolKind.Variable
                    : vsls.SymbolKind.File

                this.tokens = tokens.map((value: Token) => IToken.create(value))
            }
            else if (Ambiguity.equal(type as Ambiguity, Ambiguity.LOCAL)) {
                this.kind = vsls.SymbolKind.File
                this.local = true
            }
        }
        else {
            this.kind = StatementType.toSymbolKind(type as StatementType) || vsls.SymbolKind.File
            this.local = LocalDeclaration.is(type as StatementType)
        }

        if (this.kind !== vsls.SymbolKind.File) {
            this.detail = (this.local) ? 'local' : 'global'

            let lastNameIndexPredicate: (t: Token) => boolean
            if (this.kind === vsls.SymbolKind.Function) {
                lastNameIndexPredicate = (t: Token): boolean => t.text.localeCompare('(') === 0
            }
            else if (type === StatementType.AssignmentLocal) {
                lastNameIndexPredicate = (t: Token): boolean => t.text.localeCompare('=') === 0
            }

            if (lastNameIndexPredicate !== undefined) {
                let lastNameIndex = TokenUtil.consumeUntil(1, tokens, lastNameIndexPredicate)
                if (lastNameIndex === 1) {
                    lastNameIndex = tokens.length
                }
                endSelectionPosition = TokenUtil.getPosition(
                    tokens[lastNameIndex - 1],
                    tokens[lastNameIndex - 1].text.length
                )
                startSelectionPosition = TokenUtil.getPosition(tokens[0])

                this.name = TokenUtil.getString(...tokens.slice(1, lastNameIndex))
            }
        }

        if (this.end === undefined) {
            const lastIndex = tokens.length - 1
            this.end = TokenUtil.getPosition(tokens[lastIndex], tokens[lastIndex].text.length)

            this.selectionRange = {
                end: endSelectionPosition || this.end,
                start: startSelectionPosition || this.start
            }
        }

        if (this.detail === undefined) {
            // tslint:disable-next-line:no-magic-numbers
            this.detail = TokenUtil.getString(...tokens.slice(0, 10))
        }

        if (this.name === undefined) {
            this.name = `(${this.range.start.line + 1},${this.range.start.character + 1})`
            this.name += `->(${this.range.end.line + 1},${this.range.end.character + 1})`
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
