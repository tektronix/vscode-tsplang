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

import {
    ANTLRInputStream,
    ChunkContext,
    CommonTokenStream,
    TspLexer,
    TspParser,
} from "antlr4-tsplang"
import { RequestType } from "vscode-jsonrpc"
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
const ColorizeTokensRequest = new RequestType<
    TextDocumentItem,
    Array<TokenSpans>,
    Error,
    void
>("ColorizeTokensRequest")

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

declare type HRTime = [number, number]
let count = 0
connection.onRequest(ColorizeTokensRequest, (param: TextDocumentItem): TokenSpans[] => {
    const inputStream = new ANTLRInputStream(param.text)
    inputStream.name = param.uri
    const lexer = new TspLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new TspParser(tokenStream)

    const time: HRTime = process.hrtime()
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const root: ChunkContext = parser.chunk()
    const done: HRTime = process.hrtime(time)

    console.log(`${count}> parsed ${param.uri}`)

    // Format and print elapsed time.
    let seconds = done[0].toString()
    while (seconds.length < 3) {
        seconds = " " + seconds
    }
    let milli = (done[1] / 1000000).toString()
    while (milli.indexOf(".") < 3) {
        milli = " " + milli
    }
    while (milli.length < 9) {
        milli = milli.concat("0")
    }
    console.log(`${count}> elapsed time: ${seconds}s ${milli}ms`)

    count++

    // Notify client of all Token ranges.
    return tokenStream.getTokens().map(t => {
        return {
            fullSpan: t.fullSpan,
            span: t.span,
        }
    })
})

// Listen on the connection
connection.listen()
