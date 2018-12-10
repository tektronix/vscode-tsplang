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

import { CommonTokenStream, InputStream, ParserRuleContext, Token } from 'antlr4'
// tslint:disable:no-submodule-imports
import { RecognitionException } from 'antlr4/error/Errors'
import { ParseTreeWalker, TerminalNode } from 'antlr4/tree/Tree'
// tslint:enable:no-submodule-imports
import { Position, SignatureHelp, TextDocument } from 'vscode-languageserver'

import { TspLexer, TspListener, TspParser } from '../antlr4-tsplang'

import { CommandSet } from './instrument'
import { resolveSignatureNamespace } from './instrument/provider'
import { TokenUtil } from './language-comprehension'
import { ExclusiveMap, FuzzyOffsetMap } from './language-comprehension/exclusive-completion'
import { GlobalMap } from './language-comprehension/global-completion'
import { getAssignmentCompletions, getGlobalCompletions } from './language-comprehension/parser-context-handler'
import { ParameterContext, SignatureContext, SignatureMap } from './language-comprehension/signature'
import { InstrumentCompletionItem, InstrumentSignatureInformation } from './wrapper'

declare class CorrectRecogException extends RecognitionException {
    startToken?: Token
}

export class DocumentContext extends TspListener {
    readonly commandSet: CommandSet
    readonly document: TextDocument
    private exclusives: ExclusiveMap
    private fuzzyOffsets: FuzzyOffsetMap
    private fuzzySignatureOffsets: FuzzyOffsetMap
    private globals: GlobalMap
    private inputStream: InputStream
    private lexer: TspLexer
    private parser: TspParser
    private parseTree: ParserRuleContext
    private signatures: SignatureMap
    private readonly tableIndexRegexp: RegExp
    private tokenStream: CommonTokenStream

    constructor(commandSet: CommandSet, document: TextDocument) {
        super()

        this.commandSet = commandSet
        this.document = document

        this.tableIndexRegexp = new RegExp(/\[[0-9]\]/g)

        this.update()
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
        const signatureLabel = resolveSignatureNamespace({
            label: context.getText().replace(this.tableIndexRegexp, '[]')
        })
        const matchingSignatures = this.commandSet.signatures.filter((signature: InstrumentSignatureInformation) => {
            return resolveSignatureNamespace(signature).localeCompare(signatureLabel) === 0
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
        // Context decompositions.
        const variableList = context.variableList()
        const expressionList = context.expressionList()

        if (context.exception !== null) {
            const exception: CorrectRecogException = context.exception

            // Skip this exception if it doesn't contain a start token.
            if (exception.startToken === undefined) {
                return
            }

            // Get the index of the Token at which the exception starts.
            const blameIndex = exception.startToken.tokenIndex

            // Get all Tokens starting at the exception index.
            const remainingTokens = this.tokenStream.tokens.slice(blameIndex)

            // We need to track our progress through the Token array.
            let index = 0

            // Grab Tokens if they form a valid namespace.
            // (NAME types, full-stop accessors, and array indexers only)
            const namespaceTokens = new Array<Token>()
            for (; index < remainingTokens.length; index++) {
                const token = remainingTokens[index]

                if (token.type === TspLexer.NAME || token.text.localeCompare('.') === 0) {
                    namespaceTokens.push(token)

                    continue
                }

                // Consume everything inside the array indexer.
                if (token.text.localeCompare('[') === 0) {
                    const startingIndex = index

                    index = SignatureContext.consumePair(index, remainingTokens)

                    // If we successfully consumed the array indexer.
                    if (index !== startingIndex) {
                        // Advance the index by 1.
                        index++

                        // Add the array indexer to the namespace tokens.
                        namespaceTokens.push(...remainingTokens.slice(startingIndex, index))
                    }

                    continue
                }

                break
            }

            // Get the string representation of the namespace tokens.
            const namespaceString = TokenUtil.getString(...namespaceTokens)

            const matchingSignatures = new Array<InstrumentSignatureInformation>()

            // If the leading tokens were a valid namespace.
            if (namespaceString !== undefined) {
                // Filter all matching signatures from the CommandSet
                const signatureLabel = resolveSignatureNamespace({
                    label: namespaceString.replace(this.tableIndexRegexp, '[]') + '('
                })
                matchingSignatures.push(...this.commandSet.signatures.filter(
                    (signature: InstrumentSignatureInformation) => {
                        return resolveSignatureNamespace(signature).localeCompare(signatureLabel) === 0
                    }
                ))
            }

            // Try to process these tokens as a signature if there are signature matches.
            if (matchingSignatures.length > 0) {
                // If the next token is an open parenthesis.
                if (index < remainingTokens.length && remainingTokens[index].text.localeCompare('(') === 0) {
                    const openParenthesis = remainingTokens[index]

                    // Try to reach the pairing close parenthesis.
                    const closingIndex = SignatureContext.consumePair(index, remainingTokens)

                    // If we found a close parenthesis.
                    if (closingIndex !== index) {
                        const closeParenthesis = remainingTokens[closingIndex]

                        // Get all tokens between the parentheses.
                        const midTokens = remainingTokens.slice(index + 1, closingIndex)

                        // Advance to the token after the close parenthesis.
                        index = closingIndex + 1

                        // Create a SignatureContext.
                        const signatureContext = SignatureContext.create(
                            openParenthesis,
                            midTokens,
                            closeParenthesis,
                            matchingSignatures,
                            this.document.positionAt.bind(this.document)
                        )

                        // Register this signature context.
                        this.registerSignatureContext(openParenthesis.stop + 1, signatureContext)
                    }
                }
            }

            return
        }

        // Context TerminalNode filters.
        const assignmentTerminal = context.children.find((value: ParserRuleContext | TerminalNode) => {
            return value instanceof TerminalNode && value.symbol.text.localeCompare('=') === 0
        })

        let newAssignmentExclusives: ExclusiveMap | undefined
        //  statement  --{1}-->  variableList
        //             --{1}-->  '='
        //             --{1}-->  expressionList
        if (variableList !== null && assignmentTerminal instanceof TerminalNode && expressionList !== null) {
            newAssignmentExclusives = getAssignmentCompletions(
                variableList,
                assignmentTerminal,
                expressionList,
                this.commandSet,
                this.document
            )
        }

        if (newAssignmentExclusives !== undefined) {
            this.fuzzyOffsets.fuzz(this.document.getText(), ...newAssignmentExclusives.keys())

            for (const [k, v] of newAssignmentExclusives) {
                this.exclusives.set(k, v)
            }
        }

        this.globals = getGlobalCompletions(context, this.globals)
    }

    getCompletionItems(cursor: Position): Array<InstrumentCompletionItem> {
        let offset = this.document.offsetAt(cursor)

        if (!this.exclusives.has(offset)) {
            offset = this.fuzzyOffsets.get(offset) || offset
        }

        // Get available exclusive completion items.
        const exclusiveContext = this.exclusives.get(offset)

        if (exclusiveContext !== undefined) {
            const exclusiveResult = new Array<InstrumentCompletionItem>()

            if (exclusiveContext.text !== undefined) {
                for (const completion of exclusiveContext.completions) {
                    if (InstrumentCompletionItem.namespaceMatch(exclusiveContext.text, completion)) {
                        exclusiveResult.push(completion)
                    }
                }
            }
            else {
                return exclusiveContext.completions
            }

            if (exclusiveResult.length > 0) {
                return exclusiveResult
            }
        }

        const result = new Array<InstrumentCompletionItem>(...this.commandSet.completions)

        // Add globals to the list of available instrument completions.
        for (const globalContexts of this.globals.values()) {
            for (const globalContext of globalContexts) {
                // If this completion is located before the cursor.
                if (this.document.offsetAt(globalContext.position) < this.document.offsetAt(cursor)) {
                    result.push(globalContext.completion)
                }
            }
        }

        return result
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

            this.fuzzyOffsets.fuzz(allContent, key)
            this.exclusives.set(key, {
                completions: value.completions,
                text: this.document.getText(value.range).trim()
            })
        })
    }

    update(): void {
        this.exclusives = new ExclusiveMap()
        this.fuzzyOffsets = new FuzzyOffsetMap()
        this.fuzzySignatureOffsets = new FuzzyOffsetMap()
        this.globals = new GlobalMap()
        this.signatures = new SignatureMap()

        this.inputStream = new InputStream(this.document.getText())
        this.lexer = new TspLexer(this.inputStream)
        this.tokenStream = new CommonTokenStream(this.lexer)
        this.parser = new TspParser(this.tokenStream)
        this.parser.buildParseTrees = true

        this.parseTree = this.parser.chunk()
    }

    walk(): void {
        ParseTreeWalker.DEFAULT.walk(this, this.parseTree)
    }
}
