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

import { CompletionItem, createConnection, IConnection, InitializedParams, InitializeResult, IPCMessageReader, IPCMessageWriter, SignatureHelp, TextDocumentChangeEvent, TextDocumentPositionParams, TextDocuments } from 'vscode-languageserver'

import { TspManager } from './tspManager'

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

// Create a simple text document manager. The text document manager supports full document sync
// only
const documents: TextDocuments = new TextDocuments()

// Create a TSP Manager to provide command set completions.
const manager: TspManager = new TspManager(documents)

// We need the last document URI to request a completion to prevent a bunch of
// expensive completion lookups.
let lastCompletionUri: string | undefined

// After the server has started the client sends an initialize request. The server receives in the
// passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize((params: InitializedParams): InitializeResult => {
    console.log('tsplang connection initialized')

    return {
        capabilities: {
            // provide context sensitive suggestions to the user
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.']
            },
            // display information about the function/method that is being called
            signatureHelpProvider: {
                triggerCharacters: [ ',', '(' ]
            },
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind
        }
    }
})

// The content of a text document has changed. This event is emitted when the text document first
// opened or when its content has changed.
documents.onDidChangeContent((change: TextDocumentChangeEvent) => {
    // if document is registered, then update
    if (manager.has(change.document.uri)) {
        manager.update(change.document.uri)
    }
    // if document is unregistered, then register
    else {
        manager.register(change.document.uri)
    }
})

documents.onDidClose((params: TextDocumentChangeEvent) => {
    connection.console.log(`${params.document.uri} closed.`)

    if (manager.has(params.document.uri)) {
        manager.unregister(params.document.uri)
    }
})

// This handler provides the initial list of completion items.
connection.onCompletion((params: TextDocumentPositionParams): Array<CompletionItem> | undefined => {
    lastCompletionUri = params.textDocument.uri

    const tspItem = manager.get(params.textDocument.uri)

    if (tspItem === undefined) {
        return
    }

    return tspItem.context.getCompletionItems(params.position)
})

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    if (lastCompletionUri === undefined) {
        return item
    }

    const tspItem = manager.get(lastCompletionUri)

    if (tspItem === undefined) {
        return item
    }

    return tspItem.context.resolveCompletion(item)
})

connection.onSignatureHelp((params: TextDocumentPositionParams): SignatureHelp | undefined => {
    const tspItem = manager.get(params.textDocument.uri)

    if (tspItem === undefined) {
        return
    }

    return tspItem.context.getSignatureHelp(params.position)
})

// Make the text document manager listen on the connection for open, change and close text
// document events
documents.listen(connection)
// Listen on the connection
connection.listen()
