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

import { DidChangeConfigurationNotification, DidChangeConfigurationParams, DidChangeTextDocumentParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, Disposable, IConnection, InitializeParams, InitializeResult, SignatureHelp, TextDocument, TextDocumentChangeEvent, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind } from 'vscode-languageserver'

import { CompletionItem } from './decorators'
import { hasWorkspaceSettings, TsplangSettings } from './settings'
import { TspManager } from './tspManager'

// tslint:disable:member-ordering
export class ServerContext {
    disposable?: Thenable<Disposable>
    globalSettings: TsplangSettings
    hasWorkspaceSettings: boolean
    lastCompletionUri?: string

    constructor() {
        this.globalSettings = TsplangSettings.defaults()
        this.hasWorkspaceSettings = false
    }

    onInitialize(params: InitializeParams, connection: IConnection): InitializeResult {
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
                textDocumentSync: TextDocumentSyncKind.Incremental
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

    onDidOpenTextDocument(params: DidOpenTextDocumentParams, connection: IConnection, manager: TspManager): void {
        // Register this document with global settings.
        let settings = this.globalSettings

        // Override global settings with any workspace settings.
        if (this.hasWorkspaceSettings) {
            connection.workspace.getConfiguration({
                scopeUri: params.textDocument.uri,
                section: 'tsplang'
            })
            .then(
                (value: TsplangSettings) => {
                    settings = value
                },
                () => { return }
            )
        }

        const diagnostics = manager.register(params.textDocument, settings)

        connection.sendDiagnostics({ diagnostics, uri: params.textDocument.uri })
    }

    onDidChangeTextDocument = (
        params: DidChangeTextDocumentParams,
        connection: IConnection,
        manager: TspManager
    ): void => {
        const diagnostics = manager.update(params.textDocument, params.contentChanges)

        if (diagnostics !== undefined) {
            connection.sendDiagnostics({ diagnostics, uri: params.textDocument.uri })
        }
    }

    onDidCloseTextDocument = (
        params: DidCloseTextDocumentParams,
        connection: IConnection,
        manager: TspManager
    ): void => {
        if (manager.has(params.textDocument.uri)) {
            manager.unregister(params.textDocument.uri)

            connection.sendDiagnostics({ diagnostics: [], uri: params.textDocument.uri })
        }
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
        manager: TspManager
    ): void {
        if (this.hasWorkspaceSettings) {
            // Update all open document contexts.
            manager.all().forEach((uri: string) => {
                let settings = params.settings.tsplang || TsplangSettings.defaults()

                connection.workspace.getConfiguration({
                    scopeUri: uri,
                    section: 'tsplang'
                })
                .then(
                    (value: TsplangSettings) => {
                        settings = value
                    },
                    // On rejection, just use the values we set above.
                    () => { return }
                )

                const tspItem = manager.get(uri)

                if (tspItem !== undefined) {
                    tspItem.context.settings = settings
                }
            })
        }
        else {
            this.globalSettings = params.settings.tsplang || TsplangSettings.defaults()
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
// tslint:enable:member-ordering
