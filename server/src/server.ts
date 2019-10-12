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
"use strict"

import * as jsonrpc from "vscode-jsonrpc"
import { CommonTokenStream, InputStream, Token } from "antlr4"
import {
    createConnection,
    DidOpenTextDocumentParams,
    IConnection,
    InitializeResult,
    IPCMessageReader,
    IPCMessageWriter,
    Range,
    TextDocumentSyncKind,
} from "vscode-languageserver"

import { TspLexer } from "./antlr4-tsplang"

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

interface TokenSpans {
    fullSpan: Range
    span: Range
}
const DocumentAreaNotification = new jsonrpc.NotificationType<TokenSpans, void>(
    "DocAreaNotification"
)

connection.onInitialize(
    (): InitializeResult => {
        return {
            capabilities: {
                textDocumentSync: {
                    change: TextDocumentSyncKind.None,
                    openClose: true,
                },
            },
        }
    }
)

interface TokenPlus extends Token {
    fullSpan: Range
    leadingTrivia: Array<Token>
    span: Range
    trailingTrivia: Array<Token>
}
interface State {
    inputStream?: InputStream
    lexer?: TspLexer
    tokens?: Array<TokenPlus>
    tokenStream?: CommonTokenStream
}
connection.onDidOpenTextDocument((params: DidOpenTextDocumentParams) => {
    const state: State = {}
    state.inputStream = new InputStream(params.textDocument.text)
    state.lexer = new TspLexer(state.inputStream)
    state.tokenStream = new CommonTokenStream(state.lexer)
    state.tokenStream.fill()
    const hiddenTokens = state.tokenStream.tokens.filter(
        t => t.channel === Token.HIDDEN_CHANNEL
    )
    state.tokenStream.tokens
        .filter(t => t.channel === 0)
        .forEach((value: Token, index: number, array: Token[]) => {
            // Initialize tokenplus object
            const plus = value as TokenPlus
            plus.leadingTrivia = []
            plus.trailingTrivia = []
            plus.span = {
                end: {
                    character: value.column + value.text.length,
                    line: value.line - 1,
                },
                start: {
                    character: value.column,
                    line: value.line - 1,
                },
            }
            plus.fullSpan = {
                end: {
                    character: plus.span.end.character,
                    line: plus.span.end.line,
                },
                start: {
                    character: plus.span.start.character,
                    line: plus.span.start.line,
                },
            }

            // Collect leading trivia.
            while (
                hiddenTokens.length > 0 &&
                hiddenTokens[0].tokenIndex < value.tokenIndex
            ) {
                plus.leadingTrivia.push(hiddenTokens.shift())
            }
            // Get the token index of the next Token on the Default channel.
            let nextTokenIndex = Number.MAX_SAFE_INTEGER
            if (array[index + 1] !== undefined) {
                nextTokenIndex = array[index + 1].tokenIndex
            }
            // Collect trailing trivia.
            while (
                hiddenTokens.length > 0 &&
                hiddenTokens[0].tokenIndex > value.tokenIndex &&
                hiddenTokens[0].tokenIndex < nextTokenIndex &&
                (hiddenTokens[0].line === value.line ||
                    // Collect all trivia before the EOF.
                    index === array.length - 1)
            ) {
                plus.trailingTrivia.push(hiddenTokens.shift())
            }

            if (plus.leadingTrivia.length > 0) {
                plus.fullSpan.start = {
                    character: plus.leadingTrivia[0].column,
                    line: plus.leadingTrivia[0].line - 1,
                }
            }

            if (plus.trailingTrivia.length > 0) {
                const lastIndex = plus.trailingTrivia.length - 1
                plus.fullSpan.end = {
                    character:
                        plus.trailingTrivia[lastIndex].column +
                        plus.trailingTrivia[lastIndex].text.length,
                    line: plus.trailingTrivia[lastIndex].line - 1,
                }
            }

            connection.sendNotification(DocumentAreaNotification, {
                fullSpan: plus.fullSpan,
                span: plus.span,
            })
        })
})

// Listen on the connection
connection.listen()
