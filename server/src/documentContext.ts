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
// tslint:disable-next-line:no-submodule-imports
import { ParseTreeWalker, TerminalNode } from 'antlr4/tree/Tree'
import { CompletionItemKind, Position, Range, TextDocument } from 'vscode-languageserver'

import { TspLexer, TspListener, TspParser } from '../antlr4-tsplang'

import { CommandSet } from './instrument'
import { resolveSignatureNamespace } from './instrument/provider'
import { ExclusiveMap, FuzzyOffsetMap } from './language-comprehension/exclusive-completion'
import { GlobalMap } from './language-comprehension/global-completion'
import { getAssignmentCompletions, getGlobalCompletions, getParameterCompletions } from './language-comprehension/parser-context-handler'
import { SignatureMap } from './language-comprehension/signature'
import { InstrumentCompletionItem, InstrumentSignatureInformation } from './wrapper'

export class DocumentContext extends TspListener {
    readonly commandSet: CommandSet
    readonly document: TextDocument
    private exclusives: ExclusiveMap
    private fuzzyOffsets: FuzzyOffsetMap
    private globals: GlobalMap
    private inputStream: InputStream
    private lexer: TspLexer
    private parser: TspParser
    private parseTree: ParserRuleContext
    private signatures: SignatureMap
    private tokenStream: CommonTokenStream

    constructor(commandSet: CommandSet, document: TextDocument) {
        super()

        this.commandSet = commandSet
        this.document = document

        this.update()
    }

    exitStatement(context: TspParser.StatementContext): void {
        const newAssignmentExclusives = getAssignmentCompletions(context, this.commandSet, this.document)

        if (newAssignmentExclusives !== undefined) {
            this.fuzzyOffsets.fuzz(...newAssignmentExclusives.keys())

            for (const [k, v] of newAssignmentExclusives) {
                this.exclusives.set(k, v)
            }
        }

        //  statement  --{1}-->  functionCall
        const functionCallContext = context.functionCall()
        if (functionCallContext !== null) {
            // TODO: we can also parse the range of each parameter since we're doing that in
            // this method anyway.
            const newParameterExclusives = getParameterCompletions(
                functionCallContext,
                this.commandSet,
                this.registerSignatures.bind(this)
            )

            if (newParameterExclusives !== undefined) {
                this.fuzzyOffsets.fuzz(...newParameterExclusives.keys())

                for (const [k, v] of newParameterExclusives) {
                    this.exclusives.set(k, v)
                }
            }
        }

        if (context.exception === null) {
            // TODO pick up the slack when the parser chokes.

            // Get the index of the token list at which the exception starts.
            const tokenIndex = context.start.tokenIndex

            // Get all tokens starting at the exception index.
            const tokens = this.tokenStream.tokens.slice(tokenIndex)

            // Grab all NAME types and namespace accessors ('.' only).
            let signatureLabel: string | undefined
            for (const t of tokens) {
                if (t.type === TspLexer.NAME || t.text.localeCompare('.') === 0) {
                    signatureLabel = (signatureLabel === undefined) ? t.text : signatureLabel + t.text

                    continue
                }

                break
            }

            if (signatureLabel === undefined) {
                return
            }

            const signatures = this.commandSet.signatures.filter((signature: InstrumentSignatureInformation) => {
                // We can drop any matching signatures that don't provide any exclusive completions.
                return signature.data !== undefined
                    && resolveSignatureNamespace(signature).localeCompare(signatureLabel as string) === 0
            })

            if (signatures.length === 0) {
                return
            }

            // TODO
            // Given the following code variations:
            //      b(1,)
            //      b(1,,3)
            //      b.c(1,)
            //      b.c(1,,3)
            //      etc.
            // The statement structure will capture the opening parenthesis, closing parenthesis, and everything
            // in-between. This includes string variations. All whitespace is handled properly.
            // The children of the StatementContext will be ErrorNodes. One for each lexical item.
            // The structure resembles the following for `(1,,3)`:
            //   statement (
            //     <Error>"("
            //     <Error>"1"
            //     <Error>","
            //     <Error>","
            //     <Error>"3"
            //     <Error>")"
            //   )
            //
            // This should trigger a manual search for exclusive parameter offsets.
            //
            // NOTE: this is false for nested signatures with empty parameters.

            return
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

    registerSignatures(
        open: TerminalNode,
        close: TerminalNode,
        signatures: Array<InstrumentSignatureInformation>
    ): void {
        this.signatures.set(open.symbol.stop + 1, {
            signatures,
            range: Range.create(
                this.document.positionAt(open.symbol.stop + 1),
                this.document.positionAt(close.symbol.start)
            )
        })
    }

    update(): void {
        this.exclusives = new ExclusiveMap()
        this.fuzzyOffsets = new FuzzyOffsetMap(this.document.getText())
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
