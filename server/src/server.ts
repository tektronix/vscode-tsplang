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
    CommonToken,
    CommonTokenStream,
    ParseTreeWalker,
    TspCommonTokenStream,
    TspLexer,
    TspParser,
    TspShebangLexer,
    TspShebangParser,
} from "antlr4-tsplang"
import { NotificationType, RequestType } from "vscode-jsonrpc"
import {
    createConnection,
    IConnection,
    InitializeResult,
    IPCMessageReader,
    IPCMessageWriter,
    Range,
    TextDocumentChangeEvent,
    TextDocumentItem,
    TextDocuments,
    TextDocumentSyncKind,
} from "vscode-languageserver"

import { SymbolTableMaker } from "./symbols"
import "./augments"

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

const TextDocumentManager = new TextDocuments()

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

const ServerReadyNotification = new NotificationType<undefined, void>(
    "ServerReadyNotification"
)

connection.onInitialize(
    (): InitializeResult => {
        return {
            capabilities: {
                textDocumentSync: {
                    change: TextDocumentSyncKind.Full,
                    openClose: true,
                    save: {
                        includeText: true,
                    },
                },
            },
        }
    }
)

declare type HRTime = [number, number]

function printParseTime(
    target: string,
    type: string,
    stop: HRTime,
    count: number
): void {
    console.log(`${count}> parsed ${target}`)
    // Format and print elapsed time.
    let seconds = stop[0].toString()
    while (seconds.length < 3) {
        seconds = " " + seconds
    }
    let milli = (stop[1] / 1000000).toString()
    while (milli.indexOf(".") < 3) {
        milli = " " + milli
    }
    while (milli.length < 9) {
        milli = milli.concat("0")
    }
    console.log(`${count}> ${type} elapsed time: ${seconds}s ${milli}ms`)
}

let count = 0
connection.onRequest(ColorizeTokensRequest, (param: TextDocumentItem): TokenSpans[] => {
    const inputStream = new ANTLRInputStream(param.text)
    inputStream.name = param.uri
    const lexer = new TspLexer(inputStream)
    const tokenStream = new TspCommonTokenStream(lexer)
    const parser = new TspParser(tokenStream)

    const start: HRTime = process.hrtime()
    const root: ChunkContext = parser.chunk()
    const done: HRTime = process.hrtime(start)

    printParseTime(param.uri, "TSP", done, count)

    // Extract Token ranges.
    const ranges = tokenStream.getTokens().map(t => {
        return {
            fullSpan: t.fullSpan,
            span: t.span,
        }
    })

    // Parse the shebang
    {
        let child = root.getChild(0)
        while (child.childCount !== 0) {
            child = child.getChild(0)
        }
        if (child["symbol"]?.["leadingTrivia"]?.length > 0) {
            const firstTrivia = child["symbol"]["leadingTrivia"][0] as CommonToken
            if (firstTrivia.type === TspLexer.SHEBANG) {
                console.log(`parsing shebang: ${firstTrivia.text}`)
                const inputStream = new ANTLRInputStream(firstTrivia.text ?? "")
                const lexer = new TspShebangLexer(inputStream)
                const tokenStream = new CommonTokenStream(lexer)
                const parser = new TspShebangParser(tokenStream)

                const start: HRTime = process.hrtime()
                parser.shebang()
                const done: HRTime = process.hrtime(start)

                printParseTime(firstTrivia.text ?? "", "Shebang", done, count)

                // Extract Token ranges.
                ranges.push(
                    ...tokenStream.getTokens().map(
                        (t: CommonToken): TokenSpans => {
                            const range: Range = {
                                end: {
                                    character:
                                        t.charPositionInLine + (t.text ?? "").length,
                                    line: t.line - 1,
                                },
                                start: {
                                    character: t.charPositionInLine,
                                    line: t.line - 1,
                                },
                            }
                            return {
                                fullSpan: range,
                                span: range,
                            }
                        }
                    )
                )
            }
        }
    }

    count++

    // Notify client of all Token ranges.
    return ranges
})

TextDocumentManager.onDidOpen((param: TextDocumentChangeEvent): void => {
    const inputStream = new ANTLRInputStream(param.document.getText())
    inputStream.name = param.document.uri
    const lexer = new TspLexer(inputStream)
    const tokenStream = new TspCommonTokenStream(lexer)
    const parser = new TspParser(tokenStream)

    parser.buildParseTree = true

    const chunk = parser.chunk()
    ParseTreeWalker.DEFAULT.walk(new SymbolTableMaker(), chunk)

    console.log(chunk.depth())
})

// Listen on the connection.
connection.listen()
// Listen for document events.
TextDocumentManager.listen(connection)

connection.sendNotification(ServerReadyNotification, undefined)
