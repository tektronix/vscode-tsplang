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

import { ProcessManager } from './processManager'

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

// // Create a TSP Manager to provide command set completions.
// const manager: TspManager = new TspManager()

const manager = new ProcessManager(connection)

// After the server has started the client sends an initialize request. The server receives in the
// passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize((params: InitializeParams): InitializeResult => {
    return manager.initialize(params)
})

connection.onInitialized(() => {
    manager.initialized()
})

connection.onDidOpenTextDocument((params: DidOpenTextDocumentParams) => {
    manager.documentOpen(params)
})

connection.onDidChangeTextDocument((params: DidChangeTextDocumentParams) => {
    manager.documentChange(params)
})

connection.onDidCloseTextDocument((params: DidCloseTextDocumentParams) => {
    manager.documentClose(params)
})

// This handler provides the initial list of completion items.
connection.onCompletion((params: TextDocumentPositionParams): Array<CompletionItem> | undefined => {
    // return context.onCompletion(params, manager)

    return
})

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    // return context.onCompletionResolve(item, manager)

    return item
})

connection.onDidChangeConfiguration((params: DidChangeConfigurationParams) => {
    // context.onDidChangeConfiguration(params, connection, manager)
})

connection.onSignatureHelp((params: TextDocumentPositionParams): SignatureHelp | undefined => {
    // return context.onSignatureHelp(params, manager)

    return
})

connection.onShutdown(manager.dispose)
connection.onExit(manager.dispose)

// Listen on the connection
connection.listen()
