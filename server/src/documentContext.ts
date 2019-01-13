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
// tslint:disable:no-submodule-imports
import { ConsoleErrorListener } from 'antlr4/error/ErrorListener'
import { RecognitionException } from 'antlr4/error/Errors'
import { ParseTreeWalker, TerminalNode } from 'antlr4/tree/Tree'
// tslint:enable:no-submodule-imports
import { CompletionItemKind, Diagnostic, Position, SignatureHelp, TextDocument } from 'vscode-languageserver'

import { TspLexer, TspListener, TspParser } from './antlr4-tsplang'
import { CompletionItem, ResolvedNamespace, SignatureInformation } from './decorators'
import { CommandSet } from './instrument'
import { TokenUtil } from './language-comprehension'
import { ExclusiveContext, FuzzyOffsetMap } from './language-comprehension/exclusive-completion'
import { AssignmentResults, getAssignmentCompletions } from './language-comprehension/parser-context-handler'
import { ParameterContext, SignatureContext } from './language-comprehension/signature'
import { SuggestionSortKind, TsplangSettings } from './settings'

// tslint:disable-next-line:no-empty
ConsoleErrorListener.prototype.syntaxError = (): void => {}

declare class CorrectRecogException extends RecognitionException {
    startToken?: Token
}

export class DocumentContext extends TspListener {
    readonly commandSet: CommandSet
    readonly document: TextDocument
    errors: Array<Diagnostic>
    private _settings: TsplangSettings
    private _sortMap: Map<CompletionItemKind, SuggestionSortKind>
    private enteredStatementException: boolean
    /**
     * A Map keyed to the ending offset of an assignment operator (`=`) or
     * expression list separator (`,`). The associated key-value is an
     * ExclusiveContext.
     */
    private exclusives: Map<number, ExclusiveContext>
    private fuzzyOffsets: FuzzyOffsetMap
    private fuzzySignatureOffsets: FuzzyOffsetMap
    private inputStream: InputStream
    private lexer: TspLexer
    private parser: TspParser
    private parseTree: ParserRuleContext
    /**
     * A Map keyed to the ending offset of a function call's open parenthesis.
     * The associated key-value is a SignatureContext.
     */
    private signatures: Map<number, SignatureContext>
    private readonly tableIndexRegexp: RegExp
    private tokenStream: CommonTokenStream

    constructor(commandSet: CommandSet, document: TextDocument, settings: TsplangSettings) {
        super()

        this.commandSet = commandSet
        this.document = document
        this.settings = settings

        this.tableIndexRegexp = new RegExp(/\[[0-9]\]/g)

        this.update()
    }

    get settings(): TsplangSettings {
        return this._settings
    }

    set settings(value: TsplangSettings) {
        this._settings = value
        this._sortMap = TsplangSettings.sortMap(this._settings)
    }

    exitFunctionCall(context: TspParser.FunctionCallContext): void {
        // There's no exception handling in this function.
        if (context.exception !== null) {
            return
        }

        // Context decompositions.
        const objectCall = context.objectCall()
        const args = objectCall.args()

        // Uninteresting context states
        if (objectCall.NAME() !== null) {
            //  functionCall  --{1}-->  objectCall  --{1}-->  ':' NAME
            return
        }

        if (args.tableConstructor() !== null) {
            //  functionCall  --{1}-->  objectCall  --{1}-->  args  --{1}-->  tableConstructor
            return
        }

        if (args.string() !== null) {
            //  functionCall  --{1}-->  objectCall  --{1}-->  args  --{1}-->  string
            return
        }

        // Context TerminalNode filters.
        const openParenthesis = args.children.find((value: ParserRuleContext | TerminalNode) => {
            return value instanceof TerminalNode && value.symbol.text.localeCompare('(') === 0
        })
        const closeParenthesis = args.children.find((value: ParserRuleContext | TerminalNode) => {
            return value instanceof TerminalNode && value.symbol.text.localeCompare(')') === 0
        })

        // We need both TerminalNodes in order to proceed.
        if (!(openParenthesis instanceof TerminalNode)) {
            return
        }

        if (!(closeParenthesis instanceof TerminalNode)) {
            return
        }

        // Filter all matching signatures from the CommandSet
        const signatureLabel = SignatureInformation.resolveNamespace({
            label: context.getText().replace(this.tableIndexRegexp, '')
        })
        const matchingSignatures = this.commandSet.signatures.filter((signature: SignatureInformation) => {
            return SignatureInformation.resolveNamespace(signature).localeCompare(signatureLabel) === 0
        })

        // If we have matching signatures, then create an associated SignatureContext.
        if (matchingSignatures.length > 0) {
            const tokens = this.tokenStream.tokens.slice(
                openParenthesis.symbol.tokenIndex + 1,
                closeParenthesis.symbol.tokenIndex
            )

            const signatureContext = SignatureContext.create(
                openParenthesis.symbol,
                tokens,
                closeParenthesis.symbol,
                matchingSignatures,
                this.document.positionAt.bind(this.document)
            )

            // Register this SignatureContext
            this.registerSignatureContext(openParenthesis.symbol.stop + 1, signatureContext)
        }
    }

    exitStatement(context: TspParser.StatementContext): void {
        let startIndex: number

        // Use the parse tree if no exceptions occurred within the StatementContext.
        if (context.exception === null) {
            // Reset our exception status if necessary.
            if (this.enteredStatementException) {
                this.enteredStatementException = false
            }

            // Context decompositions.
            const variableList = context.variableList()
            const expressionList = context.expressionList()

            // Context TerminalNode filters.
            const assignmentTerminal = context.children.find((value: ParserRuleContext | TerminalNode) => {
                return value instanceof TerminalNode && value.symbol.text.localeCompare('=') === 0
            })

            let assignmentResults: AssignmentResults
            //  statement  --{1}-->  variableList
            //             --{1}-->  '='
            //             --{1}-->  expressionList
            if (variableList !== null && assignmentTerminal instanceof TerminalNode && expressionList !== null) {
                assignmentResults = getAssignmentCompletions(
                    variableList,
                    assignmentTerminal,
                    expressionList,
                    this.commandSet,
                    this.document
                )
            }

            if (assignmentResults !== undefined) {
                if (assignmentResults.errors.length > 0) {
                    this.errors.push(...assignmentResults.errors)
                }

                if (assignmentResults.assignments !== undefined) {
                    this.registerExclusiveEntries([...assignmentResults.assignments.entries()])

                    return
                }
            }

            startIndex = context.start.tokenIndex
        }
        else {
            // Exceptions tend to cluster, so only parse them once.
            // Reset on the next StatementContext without an exception.
            if (this.enteredStatementException) {
                return
            }

            const exception: CorrectRecogException = context.exception

            // Get the index of a starting Token.
            startIndex = (exception.startToken === undefined)
                ? context.start.tokenIndex
                : exception.startToken.tokenIndex

            this.enteredStatementException = true
        }

        // Get all Tokens starting at the exception index.
        const remainingTokens = this.tokenStream.tokens.slice(startIndex)

        // Cache Tokens if they form a valid namespace.
        // (NAME types, full-stop accessors, and array indexers only)
        let namespaceTokens = new Array<Token>()

        for (let index = 0; index < remainingTokens.length; index++) {
            const token = remainingTokens[index]

            if (token.type === TspLexer.NAME || token.type === TspLexer.EOF) {
                let resolvedNamespace: ResolvedNamespace
                let depth: number

                // If the current Token is the EOF, then register and return
                if (token.type === TspLexer.EOF) {
                    this.registerCompletionTokens(namespaceTokens)

                    return
                }

                namespaceTokens.push(token)

                this.registerCompletionTokens(namespaceTokens)

                // Look ahead to see if the next Token is an open parenthesis.
                const nextToken = remainingTokens[index + 1]

                if (nextToken !== undefined && nextToken.text.localeCompare('(') === 0) {
                    resolvedNamespace = ResolvedNamespace.create(namespaceTokens)
                    depth = ResolvedNamespace.depth(resolvedNamespace)

                    // Filter on any available signatures at our current namespace depth.
                    const signatures = (this.commandSet.signatureDepthMap.get(depth) || []).filter(
                        (value: SignatureInformation) => {
                            return ResolvedNamespace.equal(
                                SignatureInformation.resolveNamespace(value),
                                resolvedNamespace
                            )
                        }
                    )

                    if (signatures.length > 0) {
                        const nextIndex = index + 1

                        // Try to reach the pairing close parenthesis.
                        const closingIndex = SignatureContext.consumePair(nextIndex, remainingTokens)

                        // If we found a close parenthesis.
                        if (closingIndex !== nextIndex) {
                            const closeParenthesis = remainingTokens[closingIndex]

                            // Get all Tokens between the parentheses.
                            const midTokens = remainingTokens.slice(nextIndex + 1, closingIndex)

                            // Advance to the Token after the close parenthesis.
                            index = closingIndex + 1

                            // Register this signature context.
                            this.registerSignatureContext(
                                nextToken.stop + 1,
                                SignatureContext.create(
                                    nextToken,
                                    midTokens,
                                    closeParenthesis,
                                    signatures,
                                    this.document.positionAt.bind(this.document)
                                )
                            )
                        }
                    }
                }
            }
            else if (token.text.localeCompare('.') === 0) {
                namespaceTokens.push(token)

                this.registerCompletionTokens(namespaceTokens)
            }
            // Consume everything inside the array indexer.
            else if (token.text.localeCompare('[') === 0) {
                const startingIndex = index

                index = SignatureContext.consumePair(index, remainingTokens)

                // If we successfully consumed the array indexer.
                if (index !== startingIndex) {
                    // Add the array indexer to the namespace tokens.
                    namespaceTokens.push(...remainingTokens.slice(startingIndex, index + 1))
                }
            }
            // If this Token is an invalid namespace component.
            else {
                // Clear the cache.
                namespaceTokens = new Array<Token>()
            }
        }
    }

    getCompletionItems(cursor: Position): Array<CompletionItem> | undefined {
        let offset = this.document.offsetAt(cursor)

        if (!this.exclusives.has(offset)) {
            offset = this.fuzzyOffsets.get(offset) || offset
        }

        // Get available exclusive completion items.
        const exclusiveContext = this.exclusives.get(offset)

        if (exclusiveContext !== undefined) {
            const exclusiveResult = new Array<CompletionItem>()

            if (exclusiveContext.text !== undefined) {
                // Only show those completions which partially match the text.
                for (const completion of exclusiveContext.completions) {
                    if (CompletionItem.namespaceMatch(ResolvedNamespace.create(exclusiveContext.text), completion)) {
                        exclusiveResult.push(completion)
                    }
                }
            }
            else {
                // Only add root completions from this exclusive context if no
                // text is available to filter on.
                exclusiveResult.push(...exclusiveContext.completions.filter((value: CompletionItem) => {
                    return value.data === undefined
                }))
            }

            if (exclusiveResult.length > 0) {
                return CompletionItem.addSortText(this._sortMap, ...exclusiveResult)
            }
        }

        const rootCompletions = this.commandSet.completionDepthMap.get(0)

        if (rootCompletions === undefined || rootCompletions.length === 0) {
            return
        }

        return CompletionItem.addSortText(this._sortMap, ...rootCompletions)
    }

    getSignatureHelp(cursor: Position): SignatureHelp | undefined {
        const offset = this.document.offsetAt(cursor)

        let signatureOffset = offset
        if (!this.signatures.has(offset)) {
            signatureOffset = this.fuzzySignatureOffsets.get(signatureOffset) || offset
        }

        const context = this.signatures.get(signatureOffset)

        if (context === undefined) {
            return
        }

        // Get the active parameter.
        let activeParameter = 0
        for (const parameter of context.parameters.values()) {
            const startOffset = this.document.offsetAt(parameter.range.start)
            const endOffset = this.document.offsetAt(parameter.range.end)

            // If the cursor position falls within the parameter range.
            if (offset >= startOffset && offset <= endOffset) {
                activeParameter = parameter.index
                break
            }
        }

        return {
            activeParameter,
            activeSignature: 0,
            signatures: context.signatures
        }
    }

    registerCompletionTokens(tokens: Array<Token>): void {
        if (tokens.length === 0) {
            return
        }

        const resolvedTokens = ResolvedNamespace.create(tokens)
        const depth = ResolvedNamespace.depth(resolvedTokens)

        // Filter on any available completions at our current namespace depth.
        const completions = (this.commandSet.completionDepthMap.get(depth) || []).filter(
            (value: CompletionItem) => CompletionItem.namespaceMatch(resolvedTokens, value)
        )

        // Register any matching completions.
        if (completions.length > 0) {
            const stopOffset = tokens[tokens.length - 1].stop + 1

            // If someone else hasn't already registered at this offset.
            if (!this.exclusives.has(stopOffset)) {
                this.registerExclusiveContext(stopOffset, {
                    completions,
                    text: TokenUtil.getString(...tokens)
                })
            }
        }
    }

    registerExclusiveContext(offset: number, context: ExclusiveContext): void {
        // Fuzz the exclusive offset range.
        this.fuzzyOffsets.fuzz(this.document.getText(), offset)

        // Add this new exclusive context.
        this.exclusives.set(offset, context)
    }

    registerExclusiveEntries(entries: Array<[number, ExclusiveContext]>): void {
        entries.forEach(([offset, context]: [number, ExclusiveContext]) => {
            this.registerExclusiveContext(offset, context)
        })
    }

    registerSignatureContext(offset: number, context: SignatureContext): void {
        // Fuzz the signature offset range.
        this.fuzzySignatureOffsets.fuzzRange(this.document, context.range)

        // Add this new signature context starting at the stop offset of the open
        // parenthesis.
        this.signatures.set(offset, context)

        // Fuzz parameters if they have completions and add them to the ExclusiveMap.
        const allContent = this.document.getText()
        context.parameters.forEach((value: ParameterContext, key: number) => {
            // Continue if we don't have any completions
            if (value.completions.length === 0) {
                return
            }

            let text: string | undefined = this.document.getText(value.range).trim()
            if (text.length === 0) {
                text = undefined
            }

            this.fuzzyOffsets.fuzz(allContent, key)
            this.exclusives.set(key, {
                text,
                completions: value.completions
            })
        })
    }

    resolveCompletion(item: CompletionItem): CompletionItem {
        // We cannot provide completion documentation if none exist
        if (this.commandSet.completionDocs.size === 0) {
            return item
        }

        // Only service a given item if its "documentation" property is undefined.
        if (item.documentation === undefined) {
            const docCallback = this.commandSet.completionDocs.get(CompletionItem.resolveNamespace(item))

            // Nothing to do if no command documentation exists for this label.
            if (docCallback === undefined) {
                return item
            }

            item.documentation = docCallback(this.commandSet.specification)
        }

        return item
    }

    update(): void {
        this.enteredStatementException = false
        this.errors = new Array()
        this.exclusives = new Map()
        this.fuzzyOffsets = new FuzzyOffsetMap()
        this.fuzzySignatureOffsets = new FuzzyOffsetMap()
        this.signatures = new Map()

        this.inputStream = new InputStream(this.document.getText())
        this.lexer = new TspLexer(this.inputStream)
        this.tokenStream = new CommonTokenStream(this.lexer)
        this.parser = new TspParser(this.tokenStream)
        this.parser.buildParseTrees = true

        this.parseTree = this.parser.chunk()
    }

    walk(): Array<Diagnostic> {
        ParseTreeWalker.DEFAULT.walk(this, this.parseTree)

        return this.errors
    }
}
