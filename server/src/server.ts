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

import { CommonTokenPlusStream, InputStream, TspLexer } from "antlr4-tsplang"
import * as jsonrpc from "vscode-jsonrpc"
import {
    createConnection,
    IConnection,
    InitializeResult,
    IPCMessageReader,
    IPCMessageWriter,
    Range,
    TextDocumentItem,
    TextDocumentSyncKind,
} from "vscode-languageserver"

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
const ParseDocumentNotification = new jsonrpc.NotificationType<TextDocumentItem, void>(
    "ParseDocNotification"
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

// interface State {
//     inputStream?: InputStream
//     lexer?: TspLexer
//     tokens?: Array<TokenPlus>
//     tokenStream?: CommonTokenPlusStream
// }
connection.onNotification(ParseDocumentNotification, (param: TextDocumentItem) => {
    const inputStream = new InputStream(param.text)
    const lexer = new TspLexer(inputStream)
    const tokenStream = new CommonTokenPlusStream(lexer)
    tokenStream.fill()
    console.log(`Done with ${param.uri}`)
    // const state: State = {}
    // state.inputStream = new InputStream(params.textDocument.text)
    // state.lexer = new TspLexer(state.inputStream)
    // state.tokenStream = new CommonTokenStream(state.lexer)
    // state.tokenStream.fill()
    // let leadingTriviaCache: Token[] = []
    // let skipNextN = 0
    // state.tokenStream.tokens.forEach((value: Token, index: number, array: Token[]) => {
    //     // Skip N items.
    //     if (skipNextN > 0) {
    //         skipNextN--
    //         return
    //     }
    //
    //     // Consume leading trivia.
    //     if (value.channel === Token.HIDDEN_CHANNEL) {
    //         leadingTriviaCache.push(value)
    //         return
    //     }
    //
    //     // Initialize TokenPlus object.
    //     const plus = value as TokenPlus
    //     plus.trailingTrivia = []
    //     plus.span = {
    //         end: {
    //             character: value.column + value.text.length,
    //             line: value.line - 1,
    //         },
    //         start: {
    //             character: value.column,
    //             line: value.line - 1,
    //         },
    //     }
    //     plus.fullSpan = {
    //         end: {
    //             character: plus.span.end.character,
    //             line: plus.span.end.line,
    //         },
    //         start: {} as Position,
    //     }
    //     if (leadingTriviaCache.length > 0) {
    //         plus.leadingTrivia = [...leadingTriviaCache]
    //         leadingTriviaCache = []
    //         plus.fullSpan.start = {
    //             character: plus.leadingTrivia[0].column,
    //             line: plus.leadingTrivia[0].line - 1,
    //         }
    //     } else {
    //         plus.leadingTrivia = []
    //         plus.fullSpan.start = {
    //             character: plus.span.start.character,
    //             line: plus.span.start.line,
    //         }
    //     }
    //
    //     // Consume trailing trivia.
    //     while (
    //         array[index + skipNextN + 1] !== undefined &&
    //         array[index + skipNextN + 1].channel === Token.HIDDEN_CHANNEL &&
    //         array[index + skipNextN + 1].line === value.line
    //     ) {
    //         plus.trailingTrivia.push(array[index + skipNextN + 1])
    //         skipNextN++
    //     }
    //
    //     // Adjust fullSpan if trailing trivia exists.
    //     if (plus.trailingTrivia.length > 0) {
    //         const lastIndex = plus.trailingTrivia.length - 1
    //         plus.fullSpan.end = {
    //             character:
    //                 plus.trailingTrivia[lastIndex].column +
    //                 plus.trailingTrivia[lastIndex].text.length,
    //             line: plus.trailingTrivia[lastIndex].line - 1,
    //         }
    //     }
    //
    //     connection.sendNotification(DocumentAreaNotification, {
    //         fullSpan: plus.fullSpan,
    //         span: plus.span,
    //     })
    // })
})

// Listen on the connection
connection.listen()
