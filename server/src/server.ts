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

import { CompletionItem, createConnection, DidChangeConfigurationParams, DidChangeTextDocumentParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, Disposable, IConnection, InitializeParams, InitializeResult, IPCMessageReader, IPCMessageWriter, SignatureHelp, TextDocumentPositionParams } from 'vscode-languageserver'

import { ServerContext } from './serverContext'
import { TspManager } from './tspManager'

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

// Create a TSP Manager to provide command set completions.
const manager: TspManager = new TspManager()

const context = new ServerContext()

// After the server has started the client sends an initialize request. The server receives in the
// passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize((params: InitializeParams): InitializeResult => {
    return context.onInitialize(params, connection)
})

connection.onInitialized(() => {
    context.onInitialized(connection)
})

connection.onDidOpenTextDocument((params: DidOpenTextDocumentParams) => {
    connection.console.log(`opened ${params.textDocument.uri}`)

    context.onDidOpenTextDocument(params, connection, manager)
})

connection.onDidChangeTextDocument((params: DidChangeTextDocumentParams) => {
    connection.console.log(`changed ${params.textDocument.uri}`)

    context.onDidChangeTextDocument(params, connection, manager)
})

connection.onDidCloseTextDocument((params: DidCloseTextDocumentParams) => {
    connection.console.log(`closed ${params.textDocument.uri}`)

    context.onDidCloseTextDocument(params, connection, manager)
})

// This handler provides the initial list of completion items.
connection.onCompletion((params: TextDocumentPositionParams): Array<CompletionItem> | undefined => {
    return context.onCompletion(params, manager)
})

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return context.onCompletionResolve(item, manager)
})

connection.onDidChangeConfiguration((params: DidChangeConfigurationParams) => {
    context.onDidChangeConfiguration(params, connection, manager)
})

connection.onSignatureHelp((params: TextDocumentPositionParams): SignatureHelp | undefined => {
    return context.onSignatureHelp(params, manager)
})

// Shared dispose method.
const dispose = (): void => {
    if (context.disposable) {
        context.disposable.then((value: Disposable) => value.dispose())
    }
}
connection.onShutdown(dispose)
connection.onExit(dispose)

// Listen on the connection
connection.listen()
