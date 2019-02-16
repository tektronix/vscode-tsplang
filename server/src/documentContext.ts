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
import {
    CompletionItemKind,
    CompletionList,
    Diagnostic,
    Position,
    SignatureHelp,
    TextDocument,
    TextDocumentContentChangeEvent,
    TextDocumentItem
} from 'vscode-languageserver'

import { TspFastLexer, TspFastListener, TspFastParser, TspLexer, TspListener, TspParser } from './antlr4-tsplang'
import { CompletionItem, DocumentSymbol, Range, ResolvedNamespace, SignatureInformation } from './decorators'
import { CommandSet } from './instrument'
import { TokenUtil } from './language-comprehension'
import { ExclusiveContext, FuzzyOffsetMap } from './language-comprehension/exclusive-completion'
import { AssignmentResults, getAssignmentCompletions } from './language-comprehension/parser-context-handler'
import { ParameterContext, SignatureContext } from './language-comprehension/signature'
import { Outline } from './outline'
import { SuggestionSortKind, TsplangSettings } from './settings'

// tslint:disable-next-line:no-empty
ConsoleErrorListener.prototype.syntaxError = (): void => {}

declare class CorrectRecogException extends RecognitionException {
    startToken?: Token
}

declare type HRTime = [number, number]

class DebugTimer {
    timeStack: Array<HRTime>

    constructor() {
        this.timeStack = new Array()
    }

    createChunkLog = (time: HRTime): string => {
        const pid = `${process.pid}:`
        // tslint:disable-next-line:no-magic-numbers
        const clk = `${time[0]}s ${time[1] / 1000000}ms`

        return [pid, '--> total time:', clk].join(' ')
    }

    createStatementLog(line: number, column: number, time: HRTime): string {
        const pid = `${process.pid}:`
        // tslint:disable:no-magic-numbers
        const loc = `(Ln ${this.pad(line, 4)}, Col ${this.pad(column, 3)})`
        const clk = `${this.pad(time[0], 3)}s ${this.pad(time[1] / 1000000, 10)}ms`
        // tslint:enable:no-magic-numbers

        return [pid, loc, clk].join(' ')
    }

    start(): void {
        this.timeStack.push(process.hrtime())
    }

    stop(): HRTime {
        return process.hrtime(this.timeStack.pop())
    }

    private pad = (n: number, width: number): string => {
        const padChar = ' '
        const s = n.toString()

        return (s.length >= width) ? s : new Array(width - s.length + 1).join(padChar) + s
    }
}

// tslint:disable
export class DocumentContext extends TspFastListener {
    readonly commandSet: CommandSet
    document: TextDocument
    errors: Array<Diagnostic>
    // readonly outline: Outline
    // ranges: Array<Range>
    // statements: WeakMap<Range, TspFastParser.StatementContext>
    exceptionTokenIndex?: number
    symbols: Array<DocumentSymbol>

    private _settings: TsplangSettings
    private _sortMap: Map<CompletionItemKind, SuggestionSortKind>
    private childCache: Map<number, Array<DocumentSymbol>>
    // private enteredStatementException: boolean
    // /**
    //  * A Map keyed to the ending offset of an assignment operator (`=`) or
    //  * expression list separator (`,`). The associated key-value is an
    //  * ExclusiveContext.
    //  */
    // private exclusives: Map<number, ExclusiveContext>
    private exceptionRanges: Array<Range>
    // private fuzzyOffsets: FuzzyOffsetMap
    // private fuzzySignatureOffsets: FuzzyOffsetMap
    private inputStream: InputStream
    private lexer: TspFastLexer
    private parser: TspFastParser
    // private parseTree: ParserRuleContext
    // /**
    //  * A Map keyed to the ending offset of a function call's open parenthesis.
    //  * The associated key-value is a SignatureContext.
    //  */
    // private signatures: Map<number, SignatureContext>
    private statementDepth = 0
    // private readonly tableIndexRegexp: RegExp
    private timer: DebugTimer
    private tokenStream: CommonTokenStream

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

        this.exceptionRanges = new Array()
        this.symbols = new Array()
        this.childCache = new Map()
        this.timer = new DebugTimer()

        this.inputStream = new InputStream(this.document.getText())
        this.lexer = new TspFastLexer(this.inputStream)
        this.tokenStream = new CommonTokenStream(this.lexer)
        this.parser = new TspFastParser(this.tokenStream)
        this.parser.buildParseTrees = true

        this.parser.addParseListener(this)

        // this.parseTree = this.parser.chunk()
        this.parser.chunk()
    }

    get settings(): TsplangSettings {
        return this._settings
    }

    set settings(value: TsplangSettings) {
        this._settings = value
        this._sortMap = TsplangSettings.sortMap(this._settings)
    }

    enterChunk(): void {
        this.timer.start()
    }

    exitChunk(): void {
        console.log(this.timer.createChunkLog(this.timer.stop()))

        // if (this.exceptionTokenIndex && this.childCache.length > 0) {
        //     const child = this.childCache.pop()
        //     child.tokens = this.tokenStream.tokens.slice(this.exceptionTokenIndex, this.tokenStream.tokens.length - 1)
        //     this.symbols.push(new DocumentSymbol(
                
        //     ))

        //     this.exceptionTokenIndex = undefined
        // }
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
        if (context.parentCtx instanceof TspFastParser.ChunkContext) {
            this.symbols.push(new DocumentSymbol(TokenUtil.getPosition(context.start)))
        }
        else {
            const siblings = this.childCache.get(this.statementDepth) || []
            siblings.push(new DocumentSymbol(TokenUtil.getPosition(context.start)))
            this.childCache.set(this.statementDepth, siblings)
        }
        this.statementDepth++

        if (this.settings.debug.print.rootStatementParseTime) {
            if (!(context.parentCtx instanceof TspFastParser.ChunkContext)) {
                return
            }

            // Only time top-level statements
            this.timer.start()
        }
    }

    exitStatement(context: TspFastParser.StatementContext): void {
        if (this.settings.debug.print.rootStatementParseTime) {
            // Only parse top-level statements
            if (context.parentCtx instanceof TspFastParser.ChunkContext) {
                console.info(this.timer.createStatementLog(
                    context.start.line,
                    context.start.column,
                    this.timer.stop()
                ))
                if (this.settings.debug.print.rootStatementParseTree) {
                    const tree = TextTree.prettify(context.toStringTree(this.parser.ruleNames, context.parser), 2)
                    console.info(tree)
                }
            }
        }

        const previousDepth = this.statementDepth
        this.statementDepth--

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

        // Perform child updates if this isn't a root statement.
        if (!(context.parentCtx instanceof TspFastParser.ChunkContext)) {
            // Get all children at the current depth
            const siblings = this.childCache.get(this.statementDepth)
            // Remove the latest child
            const child = siblings.pop()

            // If the previous depth had children, then add them to this child.
            if (this.childCache.has(previousDepth)) {
                const children = this.childCache.get(previousDepth)
                child.children = new Array(...children)
            }
            // Get all relevant Tokens for this child.
            child.tokens = this.tokenStream.tokens.slice(
                context.start.tokenIndex,
                context.stop.tokenIndex + 1
            )

            // Update data structures
            siblings.push(child)
            this.childCache.set(this.statementDepth, siblings)
        }
        else {
            // Get the latest root statement
            const root = this.symbols.pop()

            // If the previous depth had children, then add them to this root.
            if (this.childCache.has(previousDepth)) {
                const children = this.childCache.get(previousDepth)
                root.children = new Array(...children)
            }
            root.tokens = this.tokenStream.tokens.slice(
                context.start.tokenIndex,
                context.stop.tokenIndex + 1
            )

            // Update data structures
            this.symbols.push(root)
        }

        // Clear the cache at the previous depth
        this.childCache.delete(previousDepth)
    }
}

namespace TextTree {
    const ruleStartRegExp = new RegExp(/\([a-zA-Z]+/)
    const ruleEndRegExp = new RegExp(/.*\)$/)

    export function prettify(tree: string, indent: number, from?: string): string {
        return _(tree.split(' '), indent, from || '')
    }

    function _(items: Array<string>, indent: number, from: string, level: number = 1): string {
        const workingSet = new Array<string>(...items)
        let result = from
        let workingLevel = level
        let totalCloseParenIgnores = 0

        while (workingSet.length > 0) {
            let item = workingSet.shift()

            // If this item is the start of a rule.
            if (ruleStartRegExp.test(item)) {
                result = result + ' '.repeat(indent * workingLevel) + item + '\n'

                workingLevel ++
            }
            else {
                if (item.localeCompare('(') === 0) {
                    totalCloseParenIgnores++
                }

                result = result + ' '.repeat(indent * workingLevel) + item + '\n'
            }

            // Reduce the current level if this item ends a rule.
            if (ruleEndRegExp.test(item)) {
                // Trim irrelevant close parentheses from the item if it starts with a close parenthesis.
                if (item[0].localeCompare(')') === 0) {
                    item = item.slice(totalCloseParenIgnores)

                    totalCloseParenIgnores = 0
                }

                // Decrement level by total trailing close parentheses.
                const reversedCharacters = item.split('').reverse()
                for (const char of reversedCharacters) {
                    if (char.localeCompare(')') === 0) {
                        workingLevel--
                    }
                    else {
                        break
                    }
                }
            }
        }

        return result
    }
}
