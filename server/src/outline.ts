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

import { CommonTokenStream, InputStream } from 'antlr4'
import { Position } from 'vscode-languageserver'

import { TspFastLexer, TspFastListener, TspFastParser } from './antlr4-tsplang'
import { Range } from './decorators'

export class Outline extends TspFastListener {
    ranges: Array<Range>
    statements: WeakMap<Range, TspFastParser.StatementContext>
    private inputStream: InputStream
    private lexer: TspFastLexer
    private parser: TspFastParser
    private tokenStream: CommonTokenStream

    constructor(content: string) {
        super()

        this.ranges = new Array()
        this.statements = new WeakMap()

        this.inputStream = new InputStream(content)
        this.lexer = new TspFastLexer(this.inputStream)
        this.tokenStream = new CommonTokenStream(this.lexer)
        this.parser = new TspFastParser(this.tokenStream)

        this.parser.buildParseTrees = true
        this.parser.addParseListener(this)

        this.parser.chunk()
    }

    exitStatement(context: TspFastParser.StatementContext): void {
        const range: Range = {
            end: {
                character: context.stop.column,
                line: context.stop.line - 1
            },
            start: {
                character: context.start.column,
                line: context.start.line - 1
            }
        }

        this.ranges.push(range)
        this.statements.set(range, context)
    }

    getStatementAt(position: Position): TspFastParser.StatementContext | undefined {
        const within = this.ranges.filter((value: Range) => Range.within(position, value))
        const deltas = within.map((value: Range) => Range.delta(position, value))

        // We want the Range Delta with the smallest start (positive numbers) and end (negative numbers)
        const smallest = deltas.reduce((prev: Range, current: Range, index: number) => {
            if (index === 0) {
                return current
            }

            const lower = (current.start.character < prev.start.character || current.start.line < prev.start.line)
            const upper = (current.end.character > prev.end.character || current.end.line > prev.end.line)

            return (lower || upper) ? current : prev
        })

        return this.statements.get(smallest)
    }
}
