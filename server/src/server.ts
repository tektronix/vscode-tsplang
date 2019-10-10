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

import { CommonTokenStream, InputStream, Token } from "antlr4"
import {
    createConnection,
    DidCloseTextDocumentParams,
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
const uriStateMap = new Map<string, State>()
connection.onDidOpenTextDocument((params: DidOpenTextDocumentParams) => {
    if (uriStateMap.has(params.textDocument.uri)) {
        return
    }

    const state: State = {}
    state.inputStream = new InputStream(params.textDocument.text)
    state.lexer = new TspLexer(state.inputStream)
    const hiddenTokenStream = new CommonTokenStream(state.lexer, TspLexer.HIDDEN)
    hiddenTokenStream.fill()
    const hiddenTokens = hiddenTokenStream.tokens
    state.lexer.reset()
    state.tokenStream = new CommonTokenStream(
        state.lexer,
        TspLexer.DEFAULT_TOKEN_CHANNEL
    )
    state.tokenStream.fill()
    state.tokens = state.tokenStream.tokens.map(
        (value: Token, index: number, array: Array<Token>): TokenPlus => {
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
            plus.fullSpan = plus.span

            while (
                hiddenTokens.length > 0 &&
                hiddenTokens[0].tokenIndex < value.tokenIndex
            ) {
                plus.leadingTrivia.push(hiddenTokens.pop())
            }
            while (
                hiddenTokens.length > 0 &&
                hiddenTokens[0].tokenIndex > value.tokenIndex &&
                (hiddenTokens[0].line === value.line || index === array.length - 1)
            ) {
                plus.trailingTrivia.push(hiddenTokens.pop())
            }

            if (plus.leadingTrivia.length > 0) {
                plus.fullSpan.start = {
                    character: plus.leadingTrivia[0].column,
                    line: plus.leadingTrivia[0].line - 1,
                }
            }

            if (plus.trailingTrivia.length > 0) {
                plus.fullSpan.end = {
                    character:
                        plus.trailingTrivia[0].column +
                        plus.trailingTrivia[0].text.length,
                    line: plus.trailingTrivia[0].line - 1,
                }
            }

            return plus
        }
    )

    uriStateMap[params.textDocument.uri] = state
})
connection.onDidCloseTextDocument((params: DidCloseTextDocumentParams) => {
    if (uriStateMap.has(params.textDocument.uri)) {
        uriStateMap.delete(params.textDocument.uri)
    }
})

// Listen on the connection
connection.listen()
