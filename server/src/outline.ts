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

import { CommonTokenStream, InputStream, Recognizer, Token } from 'antlr4'
// tslint:disable-next-line:no-submodule-imports
import { ConsoleErrorListener, ErrorListener } from 'antlr4/error/ErrorListener'
import { Diagnostic, DiagnosticSeverity, Position, TextDocument, TextDocumentItem } from 'vscode-languageserver'

import { TspFastLexer, TspFastListener, TspFastParser } from './antlr4-tsplang'
import { Range } from './decorators'

// tslint:disable-next-line:no-empty
ConsoleErrorListener.prototype.syntaxError = (): void => {}

/**
 * XXX: This is just a dumb error-to-diagnostic converter.
 * It should be replaced with a more useful implementation.
 */
// tslint:disable:no-any
class ErrorOutline extends ErrorListener {
    diagnostics: Array<Diagnostic>
    private document: TextDocument

    constructor(item: TextDocumentItem) {
        super()

        this.diagnostics = new Array()

        this.document = TextDocument.create(item.uri, item.languageId, item.version, item.text)
    }

    reportAmbiguity(recognizer: Recognizer, dfa: any, startIndex: number, stopIndex: number): void {
        const range = {
            end: this.document.positionAt(stopIndex),
            start: this.document.positionAt(startIndex)
        }

        this.diagnostics.push({
            range,
            code: 'ambiguity',
            message: dfa.toString(),
            severity: DiagnosticSeverity.Error,
            source: 'tsplang'
        })
    }

    reportAttemptingFullContext(recognizer: Recognizer, dfa: any, startIndex: number, stopIndex: number): void {
        const range = {
            end: this.document.positionAt(stopIndex),
            start: this.document.positionAt(startIndex)
        }

        this.diagnostics.push({
            range,
            code: 'full-context-attempt',
            message: dfa.toString(),
            severity: DiagnosticSeverity.Error,
            source: 'tsplang'
        })
    }

    reportContextSensitivity(recognizer: Recognizer, dfa: any, startIndex: number, stopIndex: number): void {
        const range = {
            end: this.document.positionAt(stopIndex + 1),
            start: this.document.positionAt(startIndex)
        }

        this.diagnostics.push({
            range,
            code: 'sensitive-context',
            message: dfa.toString(),
            severity: DiagnosticSeverity.Error,
            source: 'tsplang'
        })
    }

    syntaxError(recognizer: Recognizer, offendingSymbol: Token, line: number, column: number, msg: string): void {
        const range = {
            end: {
                character: column + offendingSymbol.text.length,
                line: line - 1,
            },
            start: {
                character: column,
                line: line - 1,
            }
        }

        this.diagnostics.push({
            range,
            code: 'syntax-error',
            message: msg,
            severity: DiagnosticSeverity.Error,
            source: 'tsplang'
        })
    }
}
// tslint:enable:no-any

export class Outline extends TspFastListener {
    ranges: Array<Range>
    statements: WeakMap<Range, TspFastParser.StatementContext>
    private errorOutline: ErrorOutline
    private inputStream: InputStream
    private lexer: TspFastLexer
    private parser: TspFastParser
    private tokenStream: CommonTokenStream

    constructor(item: TextDocumentItem) {
        super()

        this.ranges = new Array()
        this.statements = new WeakMap()

        this.errorOutline = new ErrorOutline(item)

        this.inputStream = new InputStream(item.text)
        this.lexer = new TspFastLexer(this.inputStream)
        this.tokenStream = new CommonTokenStream(this.lexer)
        this.parser = new TspFastParser(this.tokenStream)

        this.parser.buildParseTrees = true
        this.parser.addErrorListener(this.errorOutline)
        this.parser.addParseListener(this)

        this.parser.chunk()
    }

    get errors(): Array<Diagnostic> {
        return this.errorOutline.diagnostics
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
