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

import { DidChangeConfigurationNotification, DidChangeConfigurationParams, Disposable, IConnection, InitializeParams, InitializeResult, SignatureHelp, TextDocument, TextDocumentChangeEvent, TextDocumentPositionParams, TextDocuments } from 'vscode-languageserver'

import { CompletionItem } from './decorators'
import { hasWorkspaceSettings, TsplangSettings } from './settings'
import { TspManager } from './tspManager'

export class ServerContext {
    disposable?: Thenable<Disposable>
    globalSettings: TsplangSettings
    hasWorkspaceSettings: boolean
    lastCompletionUri?: string

    constructor() {
        this.globalSettings = TsplangSettings.defaults()
        this.hasWorkspaceSettings = false
    }

    onCompletion(params: TextDocumentPositionParams, manager: TspManager): Array<CompletionItem> | undefined {
        this.lastCompletionUri = params.textDocument.uri

        const tspItem = manager.get(params.textDocument.uri)

        if (tspItem === undefined) {
            return
        }

        return tspItem.context.getCompletionItems(params.position)
    }

    onCompletionResolve(item: CompletionItem, manager: TspManager): CompletionItem {
        if (this.lastCompletionUri === undefined) {
            return item
        }

        const tspItem = manager.get(this.lastCompletionUri)

        if (tspItem === undefined) {
            return item
        }

        return tspItem.context.resolveCompletion(item)
    }

    onDidChangeConfiguration(
        params: DidChangeConfigurationParams,
        connection: IConnection,
        documents: TextDocuments,
        manager: TspManager
    ): void {
        if (this.hasWorkspaceSettings) {
            // Update all open document contexts.
            documents.all().forEach((document: TextDocument) => {
                let settings = params.settings.tsplang || TsplangSettings.defaults()

                connection.workspace.getConfiguration({
                    scopeUri: document.uri,
                    section: 'tsplang'
                })
                .then(
                    (value: TsplangSettings) => {
                        settings = value
                    },
                    // On rejection, just use the values we set above.
                    (reason: Error) => { return }
                )

                const tspItem = manager.get(document.uri)

                if (tspItem !== undefined) {
                    tspItem.context.settings = settings
                }
            })
        }
        else {
            this.globalSettings = params.settings.tsplang || TsplangSettings.defaults()
        }
    }

    onDidChangeContent(change: TextDocumentChangeEvent, connection: IConnection, manager: TspManager): void {
        // if document is registered, then update
        if (manager.has(change.document.uri)) {
            const diagnostics = manager.update(change.document.uri)

            connection.sendDiagnostics({ diagnostics, uri: change.document.uri })
        }
        // if document is unregistered, then register
        else {
            // Register this document with global settings.
            let settings = this.globalSettings

            // Override global settings with any workspace settings.
            if (this.hasWorkspaceSettings) {
                connection.workspace.getConfiguration({
                    scopeUri: change.document.uri,
                    section: 'tsplang'
                })
                .then(
                    (value: TsplangSettings) => {
                        settings = value
                    },
                    (reason: Error) => { return }
                )
            }

            const diagnostics = manager.register(change.document.uri, settings)

            connection.sendDiagnostics({ diagnostics, uri: change.document.uri })
        }
    }

    onDidClose = (params: TextDocumentChangeEvent, connection: IConnection, manager: TspManager): void => {
        connection.console.log(`${params.document.uri} closed.`)

        if (manager.has(params.document.uri)) {
            manager.unregister(params.document.uri)

            connection.sendDiagnostics({ diagnostics: [], uri: params.document.uri })
        }
    }

    onInitialize(params: InitializeParams, connection: IConnection, documents: TextDocuments): InitializeResult {
        connection.console.log('tsplang connection initialized')

        this.hasWorkspaceSettings = hasWorkspaceSettings(params.capabilities)

        return {
            capabilities: {
                completionProvider: {
                    resolveProvider: true,
                    triggerCharacters: ['.']
                },
                // display information about the function/method that is being called
                signatureHelpProvider: {
                    triggerCharacters: [',', '(']
                },
                // Tell the client that the server works in FULL text document sync mode
                textDocumentSync: documents.syncKind
            }
        }
    }

    onInitialized(connection: IConnection): void {
        if (this.hasWorkspaceSettings) {
            this.disposable = connection.client.register(DidChangeConfigurationNotification.type, {
                section: 'tsplang'
            })
        }
    }

    onSignatureHelp = (params: TextDocumentPositionParams, manager: TspManager): SignatureHelp | undefined => {
        const tspItem = manager.get(params.textDocument.uri)

        if (tspItem === undefined) {
            return
        }

        return tspItem.context.getSignatureHelp(params.position)
    }
}
