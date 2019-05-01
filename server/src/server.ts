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

import {
    createConnection,
    IConnection,
    IPCMessageReader,
    IPCMessageWriter
} from 'vscode-languageserver'

import { ProcessManager } from './processManager'

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

const manager = new ProcessManager(connection)

// After the server has started the client sends an initialize request. The server receives in the
// passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize(manager.initialize.bind(manager))

connection.onInitialized(manager.initialized.bind(manager))

connection.onDidOpenTextDocument(manager.documentOpen.bind(manager))

connection.onDidChangeTextDocument(manager.documentChange.bind(manager))

connection.onDidCloseTextDocument(manager.documentClose.bind(manager))

// This handler provides the initial list of completion items.
connection.onCompletion(manager.completion.bind(manager))

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve(manager.completionResolve.bind(manager))

connection.onDefinition(manager.definition.bind(manager))

connection.onDidChangeConfiguration(manager.settingsChange.bind(manager))

connection.onDocumentSymbol(manager.symbol.bind(manager))

connection.onHover(manager.hover.bind(manager))

connection.onReferences(manager.references.bind(manager))

connection.onSignatureHelp(manager.signature.bind(manager))

connection.onShutdown(manager.dispose.bind(manager))
connection.onExit(manager.dispose.bind(manager))

// Listen on the connection
connection.listen()
