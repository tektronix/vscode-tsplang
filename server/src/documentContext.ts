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
// tslint:disable-next-line:ordered-imports
import { TspLexer, TspListener, TspParser } from 'antlr4-tsplang'
import { Position, SignatureHelp, TextDocument } from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from './decorators'
import { CommandSet } from './instrument'
import { TokenUtil } from './language-comprehension'
import { ExclusiveContext, FuzzyOffsetMap } from './language-comprehension/exclusive-completion'
import { getAssignmentCompletions } from './language-comprehension/parser-context-handler'
import { ParameterContext, SignatureContext } from './language-comprehension/signature'

declare class CorrectRecogException extends RecognitionException {
    startToken?: Token
}

export class DocumentContext extends TspListener {
    readonly commandSet: CommandSet
    readonly document: TextDocument
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

            const matchingSignatures = new Array<SignatureInformation>()

            // If the leading tokens were a valid namespace.
            if (namespaceString !== undefined) {
                // Filter all matching signatures from the CommandSet
                const signatureLabel = SignatureInformation.resolveNamespace({
                    label: namespaceString.replace(this.tableIndexRegexp, '')
                })
                matchingSignatures.push(...this.commandSet.signatures.filter(
                    (signature: SignatureInformation) => {
                        return SignatureInformation
                            .resolveNamespace(signature).localeCompare(signatureLabel) === 0
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

        let newAssignmentExclusives: Map<number, ExclusiveContext> | undefined
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
    }

    getCompletionItems(cursor: Position): Array<CompletionItem> {
        let offset = this.document.offsetAt(cursor)

        if (!this.exclusives.has(offset)) {
            offset = this.fuzzyOffsets.get(offset) || offset
        }

        // Get available exclusive completion items.
        const exclusiveContext = this.exclusives.get(offset)

        if (exclusiveContext !== undefined) {
            const exclusiveResult = new Array<CompletionItem>()

            if (exclusiveContext.text !== undefined) {
                for (const completion of exclusiveContext.completions) {
                    if (CompletionItem.namespaceMatch(exclusiveContext.text, completion)) {
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

        return this.commandSet.completions
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

    walk(): void {
        ParseTreeWalker.DEFAULT.walk(this, this.parseTree)
    }
}
