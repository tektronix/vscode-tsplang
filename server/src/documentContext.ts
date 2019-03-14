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
import { InputMismatchException, NoViableAltException, RecognitionException } from 'antlr4/error/Errors'
import { ParseTreeWalker, TerminalNode } from 'antlr4/tree/Tree'
// tslint:enable:no-submodule-imports
import {
    CompletionItemKind,
    CompletionList,
    Diagnostic,
    LocationLink,
    Position,
    SignatureHelp,
    SymbolKind,
    TextDocument,
    TextDocumentContentChangeEvent,
    TextDocumentItem
} from 'vscode-languageserver'

import { TspFastLexer, TspFastListener, TspFastParser, TspLexer, TspListener, TspParser } from './antlr4-tsplang'
import {
    CompletionItem,
    DocumentSymbol,
    FunctionLocalSymbol,
    FunctionSymbol,
    IToken,
    Range,
    ResolvedNamespace,
    SignatureInformation,
    VariableLocalSymbol,
    VariableSymbol
} from './decorators'
import { CommandSet } from './instrument'
import { Ambiguity, statementRecognizer, StatementType, TokenUtil } from './language-comprehension'
import { ExclusiveContext, FuzzyOffsetMap } from './language-comprehension/exclusive-completion'
import { AssignmentResults, getAssignmentCompletions } from './language-comprehension/parser-context-handler'
import { ParameterContext, SignatureContext } from './language-comprehension/signature'
import { Outline } from './outline'
import { DebugParseTimer, DebugParseTree } from './parse'
import { SuggestionSortKind, TsplangSettings } from './settings'
import { SymbolTable } from './symbolTable'

ConsoleErrorListener.prototype.syntaxError = (): void => { return }

// tslint:disable
export class DocumentContext extends TspFastListener {
    readonly commandSet: CommandSet
    document: TextDocument
    errors: Array<Diagnostic>
    // readonly outline: Outline
    // ranges: Array<Range>
    // statements: WeakMap<Range, TspFastParser.StatementContext>
    exceptionTokenIndex?: number
    settings: TsplangSettings
    symbolTable: SymbolTable
    tokens: Array<IToken>

    // private enteredStatementException: boolean
    // /**
    //  * A Map keyed to the ending offset of an assignment operator (`=`) or
    //  * expression list separator (`,`). The associated key-value is an
    //  * ExclusiveContext.
    //  */
    // private exclusives: Map<number, ExclusiveContext>
    // private fuzzyOffsets: FuzzyOffsetMap
    // private fuzzySignatureOffsets: FuzzyOffsetMap
    inputStream: InputStream
    lexer: TspFastLexer
    parser: TspFastParser
    tokenStream: CommonTokenStream
    // private parseTree: ParserRuleContext
    // /**
    //  * A Map keyed to the ending offset of a function call's open parenthesis.
    //  * The associated key-value is a SignatureContext.
    //  */
    // private signatures: Map<number, SignatureContext>
    // private readonly tableIndexRegexp: RegExp

    constructor(item: TextDocumentItem, commandSet: CommandSet, settings: TsplangSettings) {
        super()

        this.document = TextDocument.create(item.uri, item.languageId, item.version, item.text)
        this.commandSet = commandSet
        // this.outline = new Outline(item)
        this.settings = settings

        // this.tableIndexRegexp = new RegExp(/\[[0-9]\]/g)

        // this.ranges = new Array()
        // this.statements = new WeakMap()

        // this.enteredStatementException = false
        this.errors = new Array()
        // this.exclusives = new Map()
        // this.fuzzyOffsets = new FuzzyOffsetMap()
        // this.fuzzySignatureOffsets = new FuzzyOffsetMap()
        // this.signatures = new Map()
        this.tokens = new Array()

        this.symbolTable = new SymbolTable()
    }

    initialParse(): DocumentContext {
        this.inputStream = new InputStream(this.document.getText())
        this.lexer = new TspFastLexer(this.inputStream)
        this.tokenStream = new CommonTokenStream(this.lexer)
        this.tokenStream.fill()
        this.tokens = this.tokenStream.tokens.map((value: Token) => IToken.create(value))
        this.tokenStream.reset()
        this.parser = new TspFastParser(this.tokenStream)
        this.parser.buildParseTrees = true
        this.parser.addParseListener(new DebugParseTimer(this.settings.debug.print.rootStatementParseTime))
        if (this.settings.debug.print.rootStatementParseTree) {
            this.parser.addParseListener(new DebugParseTree())
        }
        const root = this.parser.chunk()
        ParseTreeWalker.DEFAULT.walk(this, root)

        this.parser.removeParseListeners()

        return this
    }

    reParse(from: number): void {
        let start = from
        if (from === -1) {
            for(let i = this.tokens.length - 1; i >= 0; i--) {
                if (this.tokens[i].channel === 0 && this.tokens[i].type !== TspFastLexer.EOF) {
                    start = i + 1
                    break
                }
            }
        }

        this.inputStream = new InputStream(this.document.getText())
        this.lexer = new TspFastLexer(this.inputStream)
        this.tokenStream.setTokenSource(this.lexer)
        this.tokenStream.fill()
        this.tokens = this.tokenStream.tokens.map((value: Token) => IToken.create(value))
        this.tokenStream.seek(start)
        this.parser = new TspFastParser(this.tokenStream)
        this.parser.buildParseTrees = true
        this.parser.addParseListener(new DebugParseTimer(this.settings.debug.print.rootStatementParseTime))
        if (this.settings.debug.print.rootStatementParseTree) {
            this.parser.addParseListener(new DebugParseTree())
        }
        const root = this.parser.chunk()
        ParseTreeWalker.DEFAULT.walk(this, root)

        this.parser.removeParseListeners()
    }

    exitChunk(): void {
        // if (this.exceptionTokenIndex && this.childCache.length > 0) {
        //     const child = this.childCache.pop()
        //     child.tokens = this.tokenStream.tokens.slice(this.exceptionTokenIndex, this.tokenStream.tokens.length - 1)
        //     this.symbols.push(new DocumentSymbol(
                
        //     ))

        //     this.exceptionTokenIndex = undefined
        // }

        // Mark all cached root symbols as completed.
        this.symbolTable.complete.push(...(this.symbolTable.symbolCache.get(0) || []))
        // Flush all symbols from the cache.
        this.symbolTable.symbolCache = new Map()
    }

    enterStatement(context: TspFastParser.StatementContext): void {
        // if (context.exception) {
        //     const exceptionStartIndex = ((context.exception as CorrectRecogException).startToken)
        //         ? (context.exception as CorrectRecogException).startToken.tokenIndex
        //         : undefined

        //     if (exceptionStartIndex < (this.exceptionTokenIndex || Number.MAX_VALUE)) {
        //         this.exceptionTokenIndex = exceptionStartIndex
        //     }

        //     return
        // }
        this.symbolTable.cacheSymbol(new DocumentSymbol(
            this.document.uri,
            TokenUtil.getPosition(context.start),
            context.start.tokenIndex
        ))
        this.symbolTable.statementDepth++
    }

    exitStatement(context: TspFastParser.StatementContext): void {
        this.symbolTable.statementDepth--

        /**
         * NOTE:
         * Sometimes the stop token can be located before the start token. For instance:
         *      blah = 'blah'
         *      var
         * in this case we shouldn't include the stop token.
         */
        if (context.exception !== null) {
            this.handleExceptions(context)

            return
        }

        // if (context.exception) {
        //     const exceptionStartIndex = ((context.exception as CorrectRecogException).startToken)
        //         ? (context.exception as CorrectRecogException).startToken.tokenIndex
        //         : undefined

        //     if (exceptionStartIndex < (this.exceptionTokenIndex || Number.MAX_VALUE)) {
        //         this.exceptionTokenIndex = exceptionStartIndex
        //     }

        //     return
        // }
        // // If this is the first valid statement after an exception.
        // else if (this.exceptionTokenIndex) {
        //     this.addSymbol(new DocumentSymbol(
        //         this.tokenStream.tokens.slice(this.exceptionTokenIndex, context.start.tokenIndex)
        //     ))

        //     this.exceptionTokenIndex = undefined
        // }

        // Get all relevant ITokens.
        const tokens = this.tokens.slice(context.start.tokenIndex, context.stop.tokenIndex + 1)

        /**
         * We're interested in determining whether this is an Assignment,
         * AssignmentLocal, Function, or FunctionLocal.
         *
         * **Assignment or AssignmentLocal**: will need to be split into
         * multiple DocumentSymbols if multiple variables are declared.
         *
         * **Function or FunctionLocal**: each parameter will need its own
         * DocumentSymbol.
         */
        let type = statementRecognizer(tokens as Array<Token>)

        // (StatementType.Assignment || StatementType.FunctionCall)
        // || (StatementType.AssignmentLocal || StatementType.FunctionLocal)
        if (Ambiguity.is(type)) {
            // Discard evaluaton of incomplete local statements.
            // (It was ambiguous because the only Token was 'local'.)
            if (Ambiguity.equal(type as Ambiguity, Ambiguity.LOCAL)) {
                return
            }

            // Check the children of the current context for an assignment operator (=) type TerminalNode.
            type = (context.children.some((value: ParserRuleContext | TerminalNode) => {
                return (value instanceof TerminalNode) && (value.symbol.text.localeCompare('=') === 0)
            }))
            // Resolve the statement ambiguity based on whether we were able to find an assignment operator.
            ? StatementType.Assignment
            : StatementType.FunctionCall
        }

        if (type === StatementType.Assignment || type === StatementType.AssignmentLocal) {
            this.handleVariables(context, tokens, type)
        }
        else if (type === StatementType.Function || type === StatementType.FunctionLocal) {
            this.handleFunctionDeclarations(context, tokens, type)
        }
        else {
            const lastSymbol = this.symbolTable.lastSymbol()
            lastSymbol.detail = TokenUtil.getString(...tokens as Array<Token>)
            lastSymbol.statementType = StatementType.None
            lastSymbol.kind = SymbolKind.File

            const lastToken = tokens[tokens.length - 1]
            lastSymbol.end = TokenUtil.getPosition(lastToken as Token, lastToken.text.length)

            lastSymbol.name = `(${lastSymbol.range.start.line + 1},${lastSymbol.range.start.character + 1})`
            lastSymbol.name += `->(${lastSymbol.range.end.line + 1},${lastSymbol.range.end.character + 1})`

            this.symbolTable.cacheSymbol(lastSymbol)
        }
    }

    handleExceptions(context: TspFastParser.StatementContext): void {
        const lastSymbol = this.symbolTable.lastSymbol()

        if (context.children === null) {
            return
        }

        lastSymbol.exception = true
        lastSymbol.statementType = StatementType.None
        lastSymbol.kind = SymbolKind.File

        if (context.exception instanceof InputMismatchException) {
            lastSymbol.detail = `Unexpected "${context.exception.offendingToken.text}".`
            lastSymbol.start = TokenUtil.getPosition(context.exception.offendingToken)
            lastSymbol.end = TokenUtil.getPosition(
                context.exception.offendingToken,
                context.exception.offendingToken.text.length
            )
        }
        else {
            const lastTokenIndex = (context.stop.tokenIndex < context.start.tokenIndex)
                ? context.start.tokenIndex
                : context.stop.tokenIndex

            lastSymbol.end = TokenUtil.getPosition(
                this.tokens[lastTokenIndex] as Token,
                this.tokens[lastTokenIndex].text.length
            )

            if (context.exception instanceof NoViableAltException) {
                lastSymbol.detail = 'Invalid statement.'

                const lastTokenText = this.tokens[lastTokenIndex].text
                if (lastTokenText.localeCompare('.') === 0 || lastTokenText.localeCompare(':') === 0) {
                    const preceedingIndex = context.start.tokenIndex - 1
                    if ((this.tokens[preceedingIndex] || { text: '' }).text.localeCompare(',') === 0
                        || (this.tokens[preceedingIndex] || { text: '' }.text.localeCompare('=') === 0)) {
                        // Modify the symbol before last to be an exception.
                        const symbolBeforeLastSymbol = this.symbolTable.lastSymbol()

                        if (symbolBeforeLastSymbol !== undefined) {
                            symbolBeforeLastSymbol.exception = true
                            symbolBeforeLastSymbol.end = lastSymbol.end
                            symbolBeforeLastSymbol.detail = 'Identifier expected.'

                            this.symbolTable.cacheSymbol(symbolBeforeLastSymbol)

                            return
                        }
                    }
                    else {
                        lastSymbol.detail = 'Identifier expected.'
                        lastSymbol.statementType = Ambiguity.FLOATING_TOKEN
                    }
                }
            }
            else if (context.exception instanceof RecognitionException) {
                lastSymbol.detail = 'TSPLang has no prettification support for ANTLR4 RecognitionExceptions.'
            }
            else {
                lastSymbol.detail = 'ANTLR4 threw an unrecognized exception type.'
            }
        }

        lastSymbol.name = `EXCEPT (${lastSymbol.range.start.line + 1},${lastSymbol.range.start.character + 1})`
        lastSymbol.name += `->(${lastSymbol.range.end.line + 1},${lastSymbol.range.end.character + 1})`

        this.symbolTable.cacheSymbol(lastSymbol)
    }

    handleFunctionDeclarations(
        context: TspFastParser.StatementContext,
        tokens: Array<IToken>,
        type: StatementType
    ): void {
        const startIndex = (type === StatementType.Function) ? 1 : 2
        const startSelectionToken = tokens[startIndex]
        let endSelectionToken: IToken
        const paramTokens = new Array<IToken>()
        for (let i = startIndex; i < context.children.length; i++) {
            // Lookhead for the opening parenthesis if we have yet to find it and a lookahead is possible.
            if (endSelectionToken === undefined && i + 1 < context.children.length) {
                if (context.children[i + 1].getText().localeCompare('(') === 0) {
                    let endSelectionIndex = (context.children[i] as TerminalNode).symbol.tokenIndex
                    endSelectionIndex -= tokens[0].tokenIndex
                    endSelectionToken = tokens[endSelectionIndex]
                }

                continue
            }

            const child = context.children[i]
            if (child instanceof TerminalNode) {
                if (child.symbol.type === TspFastParser.NAME || child.symbol.type === TspFastParser.VARARG) {
                    const paramIndex = child.symbol.tokenIndex - tokens[0].tokenIndex
                    paramTokens.push(tokens[paramIndex])
                }
            }
        }

        const lastSymbol = this.symbolTable.lastSymbol()

        const functionSymbol = (type === StatementType.Function)
            ? FunctionSymbol.from(lastSymbol)
            : FunctionLocalSymbol.from(lastSymbol)
        if (functionSymbol.children === undefined && paramTokens.length > 0) {
            functionSymbol.children = new Array()
        }
        functionSymbol.selectionRange = {
            end: TokenUtil.getPosition(endSelectionToken as Token, endSelectionToken.text.length),
            start: TokenUtil.getPosition(startSelectionToken as Token)
        }
        functionSymbol.name = this.document.getText(functionSymbol.selectionRange)
        functionSymbol.end = TokenUtil.getPosition(
            tokens[tokens.length - 1] as Token,
            tokens[tokens.length - 1].text.length
        )

        for(let i = 0; i < paramTokens.length; i++) {
            const token = paramTokens[i]

            const symbol = new VariableLocalSymbol(
                functionSymbol.uri,
                TokenUtil.getPosition(token as Token),
                tokens[0].tokenIndex
            )
            symbol.detail = 'local'
            symbol.end = TokenUtil.getPosition(token as Token, token.text.length)

            if (token.type === TspFastParser.NAME) {
                symbol.statementType = StatementType.AssignmentLocal
                symbol.kind = StatementType.toSymbolKind(symbol.statementType)
                symbol.name = token.text
            }
            else { // token type is VARARG
                // Variadic functions create a table called "arg" containing all variable arguments.
                symbol.children = new Array()
                symbol.statementType = StatementType.AssignmentLocal
                symbol.kind = SymbolKind.Object
                symbol.name = 'arg'

                // The "arg" table contains a length attribute "n"
                const argLength = new VariableLocalSymbol(functionSymbol.uri, symbol.start, symbol.startTokenIndex)
                argLength.detail = 'length'
                argLength.end = symbol.end
                argLength.statementType = StatementType.AssignmentLocal
                argLength.kind = SymbolKind.Property
                argLength.name = 'n'

                symbol.children.push(argLength)
            }

            // Update all child symbol links whose name matches the parameter.
            functionSymbol.children = functionSymbol.children.map((value: DocumentSymbol) => {
                if (value.name !== undefined && value.name.localeCompare(symbol.name) === 0) {
                    // Remove all back-references from was is now just a parameter reference.
                    if (value.references !== undefined) {
                        value.references = undefined
                    }

                    value.declaration = symbol.link(value.selectionRange)
                    value.detail = 'local'
                    value.local = true
                    return value as VariableLocalSymbol
                }

                return value
            })

            functionSymbol.children.push(symbol)
        }

        this.symbolTable.cacheSymbol(functionSymbol)
    }

    handleVariables(context: TspFastParser.StatementContext, tokens: Array<IToken>, type: StatementType): void {
        const variableCommaIndices = new Array<number>()
        let assignmentIndex: number

        // Indices will be zero-based from the starting Token (which is index 0).
        const startingIndex = context.start.tokenIndex
        for (let i = 0; i < context.children.length; i++) {
            if (context.children[i] instanceof ParserRuleContext) {
                continue
            }

            if ((context.children[i] as TerminalNode).symbol.text.localeCompare(',') === 0) {
                variableCommaIndices.push((context.children[i] as TerminalNode).symbol.tokenIndex - startingIndex)
            }
            else if ((context.children[i] as TerminalNode).symbol.text.localeCompare('=') === 0) {
                assignmentIndex = (context.children[i] as TerminalNode).symbol.tokenIndex - startingIndex
                break
            }
        }

        // Create one or more assignment symbols from the last symbol.
        const lastSymbol = this.symbolTable.lastSymbol()
        for(let i = 0; i <= variableCommaIndices.length; i++) {
            const symbol = (type === StatementType.Assignment)
                ? VariableSymbol.from(lastSymbol, i, assignmentIndex)
                : VariableLocalSymbol.from(lastSymbol, i, assignmentIndex)

            let startSelectionIndex: number
            let startSelectionToken: IToken
            let endSelectionToken: IToken
            if (i === 0) {
                startSelectionIndex = (type === StatementType.Assignment) ? 0 : 1
                startSelectionToken = tokens[startSelectionIndex]
                endSelectionToken = (variableCommaIndices.length === 0)
                    ? tokens[assignmentIndex - 1]
                    : tokens[variableCommaIndices[i] - 1]
            }
            else if (i === variableCommaIndices.length) {
                startSelectionIndex = variableCommaIndices[i - 1] + 1
                startSelectionToken = tokens[startSelectionIndex]
                endSelectionToken = (assignmentIndex === undefined)
                    ? tokens[tokens.length - 1]
                    : tokens[assignmentIndex - 1]
            }
            else {
                startSelectionIndex = variableCommaIndices[i - 1] + 1
                startSelectionToken = tokens[startSelectionIndex]
                endSelectionToken = tokens[variableCommaIndices[i] - 1]
            }

            symbol.selectionRange = {
                end: TokenUtil.getPosition(endSelectionToken as Token, endSelectionToken.text.length),
                start: TokenUtil.getPosition(startSelectionToken as Token)
            }
            symbol.name = this.document.getText(symbol.selectionRange)
            symbol.end = TokenUtil.getPosition(
                tokens[tokens.length - 1] as Token,
                tokens[tokens.length - 1].text.length
            )
            symbol.declaration = this.symbolTable.link(symbol.name, symbol.range)

            if (type === StatementType.Assignment) {
                let tokenIndex: number
                let firstNameToken: IToken
                do {
                    tokenIndex = ((tokenIndex === undefined) ? startSelectionIndex - 1: tokenIndex) + 1
                    firstNameToken = tokens[tokenIndex]
                } while (firstNameToken.type !== TspFastParser.NAME)

                symbol.builtin = this.commandSet.isCompletion(firstNameToken)
            }

            this.symbolTable.cacheSymbol(symbol)
        }
    }
}
