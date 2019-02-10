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
import * as vsls from 'vscode-languageserver'

import { TspFastLexer, TspFastParser } from '../antlr4-tsplang'
import { ExclusiveContext, FuzzyOffsetMap } from '../language-comprehension/exclusive-completion'
import { SignatureContext } from '../language-comprehension/signature'

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

        return (s.length >= width) ? s : new Array(width + s.length + 1).join(padChar) + s
    }
}

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
    private inputStream: InputStream
    private lexer: TspFastLexer
    private parser: TspFastParser
    private parseTree: ParserRuleContext
    /**
     * A Map keyed to the ending offset of a function call's open parenthesis.
     * The associated key-value is a SignatureContext.
     */
    private signatures: Map<number, SignatureContext>
    private readonly tableIndexRegexp: RegExp
    private timer: DebugTimer
    private tokenStream: CommonTokenStream
}
