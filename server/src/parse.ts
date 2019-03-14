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

import { CommonTokenStream, InputStream, ParserRuleContext } from 'antlr4'
// tslint:disable:no-submodule-imports
import { ConsoleErrorListener } from 'antlr4/error/ErrorListener'
import { ParseTreeWalker } from 'antlr4/tree/Tree'
// tslint:enable:no-submodule-imports
import * as vsls from 'vscode-languageserver'

import { TspFastLexer, TspFastListener, TspFastParser } from './antlr4-tsplang'
import { DebugTimer } from './debugTimer'
import { DebugPrintSettings } from './settings'

// ConsoleErrorListener.prototype.syntaxError = (): void => { return }

export class DebugParseTimer extends TspFastListener {
    readonly printStatementTimes: boolean
    readonly timer: DebugTimer

    constructor(printStatementTimes: boolean) {
        super()

        this.printStatementTimes = printStatementTimes
        this.timer = new DebugTimer()
    }

    enterChunk(): void {
        this.timer.start()
    }

    enterStatement(): void {
        this.timer.start()
    }

    exitChunk(): void {
        console.log(this.timer.createRootLog(this.timer.stop()))
    }

    exitStatement(context: TspFastParser.StatementContext): void {
        const time = this.timer.stop()

        if (!this.timer.running) {
            console.log(this.timer.createRootLog(time))
        }
        else if (this.printStatementTimes && context.start !== undefined) {
            console.log(this.timer.createStatementLog(context.start.line, context.start.column, time))
        }
    }
}

export class DebugParseTree extends TspFastListener {
    readonly ruleEndRegExp: RegExp
    readonly ruleStartRegExp: RegExp
    statementDepth: number

    constructor() {
        super()

        this.ruleEndRegExp = new RegExp(/.*\)$/)
        this.ruleStartRegExp = new RegExp(/\([a-zA-Z]+/)
        this.statementDepth = 0
    }

    enterStatement(): void {
        this.statementDepth++
    }

    exitStatement(context: TspFastParser.StatementContext): void {
        this.statementDepth--

        if (this.statementDepth === 0) {
            // tslint:disable-next-line:no-magic-numbers
            console.log(this.prettify(context.toStringTree(context.parser.ruleNames, context.parser), 2))
        }
    }

    private prettify(tree: string, indent: number, from?: string): string {
        return this.prettifyRecursive(tree.split(' '), indent, from || '')
    }

    private prettifyRecursive(items: Array<string>, indent: number, from: string, level: number = 1): string {
        const workingSet = new Array<string>(...items)
        let result = from
        let workingLevel = level
        let totalCloseParenIgnores = 0

        while (workingSet.length > 0) {
            let item = workingSet.shift()

            // If this item is the start of a rule.
            if (this.ruleStartRegExp.test(item)) {
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
            if (this.ruleEndRegExp.test(item)) {
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

export interface Parse {
    inputStream: InputStream
    lexer: TspFastLexer
    parser: TspFastParser
    root: ParserRuleContext
    tokenStream: CommonTokenStream
}
export namespace Parse {
    export function chunk(text: string, printSettings: DebugPrintSettings): Parse {
        const result = create(text, printSettings)
        result.root = result.parser.chunk()

        return result
    }

    export function create(text: string, printSettings: DebugPrintSettings): Parse {
        const result = {
            inputStream: undefined,
            lexer: undefined,
            parser: undefined,
            root: undefined,
            tokenStream: undefined
        }
        result.inputStream = new InputStream(text)
        result.lexer = new TspFastLexer(result.inputStream)
        result.tokenStream = new CommonTokenStream(result.lexer)
        result.parser = new TspFastParser(result.tokenStream)
        result.parser.buildParseTree = true
        result.parser.addParseListener(new DebugParseTimer(printSettings.rootStatementParseTime))
        if (printSettings.rootStatementParseTree) {
            result.parser.addParseListener(new DebugParseTree())
        }

        return result
    }

    export function statement(text: string, printSettings: DebugPrintSettings): Parse {
        const result = create(text, printSettings)
        result.root = result.parser.statement()

        return result
    }

    export function walk(listener: TspFastListener, root: ParserRuleContext): void {
        ParseTreeWalker.DEFAULT.walk(listener, root)
    }
}
