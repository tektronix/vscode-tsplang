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
// tslint:disable-next-line: no-submodule-imports
import { RecognitionException } from 'antlr4/error/Errors'
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
    builtin: boolean
    declaration?: vsls.LocationLink
    exception: boolean
    local: boolean
    references?: Array<vsls.Location>
    startTokenIndex: number,
    statementType: StatementType | Ambiguity
}
export class DocumentSymbol implements IDocumentSymbol {
    builtin: boolean = false
    children?: Array<DocumentSymbol>
    /**
     * The location where this DocumentSymbol was originally declared or
     * undefined if no previous declaration could be found.
     */
    declaration?: vsls.LocationLink
    deprecated?: boolean
    detail?: string
    exception: boolean = false
    kind: vsls.SymbolKind
    local: boolean = false
    name: string
    previousSymbol: DocumentSymbol
    range: vsls.Range
    references?: Array<vsls.Location>
    selectionRange: vsls.Range
    start: vsls.Position
    startTokenIndex: number
    statementType: StatementType | Ambiguity
    uri: string

    private _end: vsls.Position
    // private enteredStatementException: boolean
    // private exceptionTokenIndex?: number
    // /**
    //  * A Map keyed to the ending offset of an assignment operator (`=`) or
    //  * expression list separator (`,`). The associated key-value is an
    //  * ExclusiveContext.
    //  */
    // private exclusives: Map<number, ExclusiveContext>
    // private fuzzyOffsets: FuzzyOffsetMap
    // private fuzzySignatureOffsets: FuzzyOffsetMap
    // /**
    //  * A Map keyed to the ending offset of a function call's open parenthesis.
    //  * The associated key-value is a SignatureContext.
    //  */
    // private signatures: Map<number, SignatureContext>
    // private readonly tableIndexRegexp: RegExp

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        this.uri = uri
        this.start = start
        this.startTokenIndex = startTokenIndex
    }

    get diagnostics(): Array<vsls.Diagnostic> {
        const results = new Array<vsls.Diagnostic>()

        for (const child of (this.children || [])) {
            results.push(...child.diagnostics)
        }

        if (this.exception) {
            results.push(vsls.Diagnostic.create(
                this.range,
                this.detail,
                vsls.DiagnosticSeverity.Error,
                'syntax-error',
                'tsplang'
            ))
        }

        return results
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

    link(from: vsls.Range): vsls.LocationLink {
        if (this.references === undefined) {
            this.references = new Array()
            if (this.declaration === undefined) {
                this.declaration = {
                    originSelectionRange: this.selectionRange,
                    targetRange: this.range,
                    targetSelectionRange: this.selectionRange,
                    targetUri: this.uri
                }
            }
        }
        this.references.push({
            range: from,
            uri: this.uri
        })

        return {
            originSelectionRange: from,
            targetRange: this.range,
            targetSelectionRange: this.selectionRange,
            targetUri: this.uri
        }
    }

    /**
     * Remove children that cause the given predicate to return true.
     */
    prune(predicate: (value: DocumentSymbol) => boolean): IDocumentSymbol {
        const clone: IDocumentSymbol = {
            builtin: this.builtin,
            children: new Array(),
            declaration: this.declaration,
            deprecated: this.deprecated,
            detail: this.detail,
            exception: this.exception,
            kind: this.kind,
            local: this.local,
            name: this.name,
            range: this.range,
            references: this.references,
            selectionRange: this.selectionRange,
            startTokenIndex: this.startTokenIndex,
            statementType: this.statementType
        }

        for (let i = 0; i < (this.children || []).length; i++) {
            const child = this.children[i].prune(predicate)

            if (predicate(child as DocumentSymbol)) {
                // Extract pruned grandchildren that aren't local declarations
                // or local declarations residing within assignment containers.
                const orphans = (child.children || []).filter(
                    (v: IDocumentSymbol) => !v.local || (v.local && child.statementType === StatementType.Assignment)
                )
                clone.children.push(...orphans)
            }
            else {
                clone.children.push(child)
            }
        }

        return clone
    }

    // setSymbolProperties(tokens: Array<IToken>): void {
    //     this.tokens = tokens

    //     let startSelectionPosition: vsls.Position
    //     let endSelectionPosition: vsls.Position

    //     const type = statementRecognizer(tokens as Array<Token>)

    //     // TODO: add support for function assignments.

    //     // If we had trouble determining the StatementType from the provided Tokens.
    //     if (Ambiguity.is(type)) {
    //         if (Ambiguity.equal(type as Ambiguity, Ambiguity.FLOATING_TOKEN)) {
    //             let foundAccessor = false
    //             // Try to find the location of an assignment operator ("="),
    //             // except for those within consumable pairs.
    //             for (let i = 0; i < tokens.length; i++) {
    //                 i = TokenUtil.consumePair(i, tokens as Array<Token>)

    //                 if (tokens[i].text.localeCompare('.') === 0) {
    //                     foundAccessor = true
    //                 }
    //                 else if (tokens[i].text.localeCompare(',') === 0) {
    //                     if (this.variableCommaIndices === undefined) {
    //                         this.variableCommaIndices = new Array()
    //                     }

    //                     this.variableCommaIndices.push(i)
    //                 }
    //                 else if (tokens[i].text.localeCompare('=') === 0) {
    //                     this.statementType = StatementType.Assignment
    //                     endSelectionPosition = TokenUtil.getPosition(
    //                         tokens[i - 1] as Token, tokens[i - 1].text.length
    //                     )
    //                     this.name = TokenUtil.getString(...tokens.slice(0, i) as Array<Token>)

    //                     // If we found commas, then this symbol will require post-processing. In the meantime, set
    //                     // to a non-File symbol so additional processing occurs below.
    //                     this.kind = (foundAccessor && !this.variableCommaIndices)
    //                         // NOTE: Changing this SymbolKind will require a corresponding change to
    //                         // DocumentContext.symbolPostProcess
    //                         ? vsls.SymbolKind.Property
    //                         : vsls.SymbolKind.Variable

    //                     break
    //                 }
    //             }

    //             // If we couldn't find an assignment operator, then this is a function call.
    //             if (this.statementType !== StatementType.Assignment) {
    //                 this.statementType = StatementType.FunctionCall
    //             }
    //         }
    //         else if (Ambiguity.equal(type as Ambiguity, Ambiguity.LOCAL)) {
    //             this.kind = vsls.SymbolKind.File
    //             this.local = true
    //         }
    //     }
    //     else {
    //         this.kind = StatementType.toSymbolKind(type as StatementType) || vsls.SymbolKind.File
    //         this.local = LocalDeclaration.is(type as StatementType)
    //         this.statementType = (type as StatementType)

    //         if (this.statementType === StatementType.AssignmentLocal) {
    //             for (let i = 0; i < tokens.length; i++) {
    //                 i = TokenUtil.consumePair(i, tokens as Array<Token>)

    //                 if (tokens[i].text.localeCompare(',') === 0) {
    //                     if (this.variableCommaIndices === undefined) {
    //                         this.variableCommaIndices = new Array()
    //                     }

    //                     this.variableCommaIndices.push(i)
    //                 }
    //                 else if (tokens[i].text.localeCompare('=') === 0) {
    //                     break
    //                 }
    //             }
    //         }
    //     }

    //     if (this.kind !== vsls.SymbolKind.File) {
    //         this.detail = (this.local) ? 'local' : 'global'

    //         let lastNameIndexPredicate: (t: Token) => boolean
    //         if (this.kind === vsls.SymbolKind.Function || this.statementType === StatementType.FunctionCall) {
    //             lastNameIndexPredicate = (t: Token): boolean => t.text.localeCompare('(') === 0
    //         }
    //         else if (type === StatementType.AssignmentLocal) {
    //             lastNameIndexPredicate = (t: Token): boolean => t.text.localeCompare('=') === 0
    //         }

    //         if (lastNameIndexPredicate !== undefined) {
    //             const startIndex = (this.statementType === StatementType.FunctionCall) ? 0 : 1
    //             let lastNameIndex = TokenUtil.consumeUntil(
    //                 startIndex, tokens as Array<Token>,
    //                 lastNameIndexPredicate
    //             )
    //             if (lastNameIndex === startIndex) {
    //                 lastNameIndex = tokens.length
    //             }
    //             endSelectionPosition = TokenUtil.getPosition(
    //                 tokens[lastNameIndex - 1] as Token,
    //                 tokens[lastNameIndex - 1].text.length
    //             )
    //             startSelectionPosition = TokenUtil.getPosition(tokens[0] as Token)

    //             this.name = TokenUtil.getString(...tokens.slice(startIndex, lastNameIndex) as Array<Token>)

    //             if (this.kind === vsls.SymbolKind.Function) {
    //                 const signatureStopIndex = TokenUtil.consumePair(lastNameIndex, tokens as Array<Token>)
    //                 if (signatureStopIndex !== lastNameIndex) {
    //                     this.tokens = tokens.slice(lastNameIndex, signatureStopIndex + 1).map(
    //                         (value: Token) => IToken.create(value)
    //                     )
    //                 }
    //             }
    //         }
    //     }

    //     if (this.end === undefined) {
    //         const lastIndex = tokens.length - 1
    //         this.end = TokenUtil.getPosition(tokens[lastIndex] as Token, tokens[lastIndex].text.length)

    //         this.selectionRange = {
    //             end: endSelectionPosition || this.end,
    //             start: startSelectionPosition || this.start
    //         }
    //     }

    //     if (this.detail === undefined) {
    //         // tslint:disable-next-line:no-magic-numbers
    //         this.detail = TokenUtil.getString(...tokens.slice(0, 10) as Array<Token>)
    //     }

    //     if (this.name === undefined) {
    //         this.name = `(${this.range.start.line + 1},${this.range.start.character + 1})`
    //         this.name += `->(${this.range.end.line + 1},${this.range.end.character + 1})`
    //     }
    // }

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

export class FunctionSymbol extends DocumentSymbol {
    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol): FunctionSymbol {
        const result = new FunctionSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'global'
        result.references = symbol.references
        result.statementType = StatementType.Function
        result.kind = StatementType.toSymbolKind(result.statementType)

        return result
    }
}

export class FunctionLocalSymbol extends FunctionSymbol {
    local: boolean = true

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol): FunctionLocalSymbol {
        const result = new FunctionLocalSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'local'
        result.references = symbol.references
        result.statementType = StatementType.FunctionLocal
        result.kind = StatementType.toSymbolKind(result.statementType)

        return result
    }
}

export class VariableSymbol extends DocumentSymbol {
    /**
     * The index of the assignment operator (=) within this object's stored Token
     * array.
     *
     * Assignment operators separate variable declarations from their expressions.
     */
    assignmentOperatorIndex?: number
    /**
     * Whether this symbol is an instrument builtin.
     *
     * Defaults to false.
     */
    builtin: boolean = false
    /**
     * The index of this variable declaration within the comma-delimited list of
     * variable declarations.
     *
     * Defaults to 0.
     */
    variableIndex: number = 0

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol, variableIndex?: number, assignmentOpIndex?: number): VariableSymbol {
        const result = new VariableSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.builtin = symbol.builtin
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'global'
        result.references = symbol.references
        result.statementType = StatementType.Assignment
        result.kind = StatementType.toSymbolKind(result.statementType)
        if (variableIndex !== undefined) {
            result.variableIndex = variableIndex
        }
        result.assignmentOperatorIndex = assignmentOpIndex

        return result
    }
}

export class VariableLocalSymbol extends VariableSymbol {
    local: boolean = true

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol, variableIndex?: number, assignmentOpIndex?: number): VariableLocalSymbol {
        const result = new VariableLocalSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'local'
        result.references = symbol.references
        result.statementType = StatementType.AssignmentLocal
        result.kind = StatementType.toSymbolKind(result.statementType)
        if (variableIndex !== undefined) {
            result.variableIndex = variableIndex
        }
        result.assignmentOperatorIndex = assignmentOpIndex

        return result
    }
}
