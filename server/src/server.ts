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

import { CompletionItem, createConnection, IConnection, InitializedParams, InitializeResult, IPCMessageReader, IPCMessageWriter, SignatureHelp, TextDocumentChangeEvent, TextDocumentItem, TextDocumentPositionParams, TextDocuments } from 'vscode-languageserver'

import { ContentHandler } from './contentHandler'
import { InstrumentCompletionItem, InstrumentSignatureInformation } from './instrument/provider'
import { getActiveParameter } from './signatureProcessor'
import { TspManager } from './tspManager'

const manager: TspManager = new TspManager()

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

// Create a simple text document manager. The text document manager supports full document sync
// only
const documents: TextDocuments = new TextDocuments()

// Create a content parser to provide regular-expression based document parsing
const parser: ContentHandler = new ContentHandler(documents)

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
    const docItem: TextDocumentItem = {
        languageId: change.document.languageId,
        text: change.document.getText(),
        uri: change.document.uri,
        version: change.document.version
    }

    // if document is registered, then update
    if (manager.has(docItem.uri)) {
        manager.update(docItem)
    }
    // if document is unregistered, then register
    else {
        manager.register(docItem)
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
    const tspItem = manager.get(params.textDocument.uri)

    if (tspItem === undefined) {
        return
    }

    // TODO: exclude completions
    //
    //  1) if we should be providing exclusive completions
    //      a) provide exclusive completions until the text no longer partially matches any exclusive completion
    //      b) if the user text no longer partially matches any exclusive completion, then provide other completions

    const signatureHelp = parser.getSignatures(params.textDocument.uri, params.position, tspItem)
    if (signatureHelp !== undefined) {
        const availableParameterCompletions = new Array<InstrumentCompletionItem>()
        signatureHelp.signatures.forEach(
            (value: InstrumentSignatureInformation): void => {
                if (value.data === undefined) {
                    return
                }

                if (signatureHelp.activeParameter === null) {
                    return
                }

                const parameterTypes = value.data.parameterTypes.get(signatureHelp.activeParameter)

                if (parameterTypes === undefined) {
                    return
                }

                availableParameterCompletions.push(...parameterTypes)
            }
        )

        return availableParameterCompletions
    }

    return parser.getCompletions(params.textDocument.uri, params.position, tspItem)
})

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    if (parser.lastCompletionUri === undefined) {
        return item
    }

    const tspItem = manager.get(parser.lastCompletionUri)

    if (tspItem === undefined) {
        return item
    }

    return parser.getCompletionDoc(item, tspItem)
})

connection.onSignatureHelp((params: TextDocumentPositionParams): SignatureHelp | undefined => {
    const tspItem = manager.get(params.textDocument.uri)

    if (tspItem === undefined) {
        return
    }

    return parser.getSignatures(params.textDocument.uri, params.position, tspItem)
})

// Make the text document manager listen on the connection for open, change and close text
// document events
documents.listen(connection)
// Listen on the connection
connection.listen()
