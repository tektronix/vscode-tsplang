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

import { ChildProcess, fork } from 'child_process'
import * as path from 'path'
import * as rpc from 'vscode-jsonrpc'
import {
    CompletionList,
    CompletionParams,
    DidChangeConfigurationNotification,
    DidChangeConfigurationParams,
    DidChangeTextDocumentParams,
    DidCloseTextDocumentParams,
    DidOpenTextDocumentParams,
    Disposable,
    DocumentSymbol,
    DocumentSymbolParams,
    IConnection,
    InitializeParams,
    InitializeResult,
    Location,
    LocationLink,
    PublishDiagnosticsParams,
    ReferenceParams,
    SignatureHelp,
    TextDocumentItem,
    TextDocumentPositionParams,
    TextDocumentSyncKind
} from 'vscode-languageserver'

import { CompletionItem } from './decorators'
import {
    ChangeNotification,
    CompletionRequest,
    CompletionResolveRequest,
    DefinitionRequest,
    ErrorNotification,
    ReferencesRequest,
    SettingsNotification,
    SignatureRequest,
    SymbolRequest,
    TextDocumentItemRequest,
    TsplangSettingsRequest
} from './rpcTypes'
import { hasWorkspaceSettings, TsplangSettings } from './settings'

interface Child {
    connection: rpc.MessageConnection
    proc: ChildProcess,
    uri: string
}

export class ProcessManager {
    readonly children: Map<string, Promise<Child>>
    connection: IConnection
    disposable?: Thenable<Disposable>
    readonly firstlineRegExp: RegExp
    globalSettings: TsplangSettings
    hasWorkspaceSettings: boolean
    lastCompletionUri?: string

    constructor(connection: IConnection) {
        this.children = new Map()
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
        this.globalSettings = TsplangSettings.defaults()
        this.hasWorkspaceSettings = false

        this.connection = connection
    }

    /* Server Message Handlers */

    async completion(params: CompletionParams): Promise<CompletionList | undefined> {
        this.lastCompletionUri = params.textDocument.uri

        const child = await this.children.get(params.textDocument.uri)

        return child.connection.sendRequest(CompletionRequest, params)
    }

    async completionResolve(item: CompletionItem): Promise<CompletionItem> {
        const child = await this.children.get(this.lastCompletionUri)

        return child.connection.sendRequest(CompletionResolveRequest, item)
    }

    async definition(params: TextDocumentPositionParams): Promise<LocationLink> {
        const child = await this.children.get(params.textDocument.uri)

        return child.connection.sendRequest(DefinitionRequest, params.position)
    }

    dispose(): void {
        if (this.disposable) {
            this.disposable.then((value: Disposable) => value.dispose())
        }

        this.children.forEach((value: Promise<Child>) => {
            value.then((child: Child) => this._release(child.uri))
        })
    }

    async documentChange(params: DidChangeTextDocumentParams): Promise<void> {
        (await this.children.get(params.textDocument.uri)).connection.sendNotification(
            ChangeNotification,
            params.contentChanges
        )
    }

    documentClose(params: DidCloseTextDocumentParams): void {
        this._release(params.textDocument.uri)
    }

    documentOpen(params: DidOpenTextDocumentParams): void {
        this.children.set(params.textDocument.uri, new Promise((resolve: (value: Child) => void): void => {
            this.connection.workspace.getConfiguration({
                scopeUri: params.textDocument.uri,
                section: 'tsplang'
            })
            .then((settings: TsplangSettings) => {
                const proc = fork(path.resolve(__dirname, 'processChild.js'), [params.textDocument.uri], {
                    // tslint:disable-next-line:no-magic-numbers
                    execArgv: ['--nolazy', `--inspect=${this.children.size + 6010 - 1}`],
                    stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]
                })

                const connection = rpc.createMessageConnection(
                    new rpc.IPCMessageReader(proc),
                    new rpc.IPCMessageWriter(proc)
                )

                const child: Child = {
                    connection,
                    proc,
                    uri: params.textDocument.uri
                }

                child.connection.onNotification(ErrorNotification, (value: PublishDiagnosticsParams) => {
                    this.connection.sendDiagnostics(value)
                })
                child.connection.onRequest(TextDocumentItemRequest, (): TextDocumentItem => {
                    return params.textDocument
                })
                child.connection.onRequest(TsplangSettingsRequest, (): TsplangSettings => {
                    return settings
                })

                connection.trace(rpc.Trace.Messages, console)
                child.connection.listen()

                resolve(child)
            })
        }))
    }

    initialize(params: InitializeParams): InitializeResult {
        console.log('tsplang connection initialized')

        this.hasWorkspaceSettings = hasWorkspaceSettings(params.capabilities)

        return {
            capabilities: {
                completionProvider: {
                    resolveProvider: true,
                    triggerCharacters: ['.']
                },
                definitionProvider: true,
                documentSymbolProvider: true,
                referencesProvider: true,
                // display information about the function/method that is being called
                signatureHelpProvider: {
                    triggerCharacters: [',', '(']
                },
                // Tell the client that the server works in FULL text document sync mode
                textDocumentSync: TextDocumentSyncKind.Incremental
            }
        }
    }

    initialized(): void {
        if (this.hasWorkspaceSettings) {
            this.disposable = this.connection.client.register(DidChangeConfigurationNotification.type, {
                section: 'tsplang'
            })
        }
    }

    async references(params: ReferenceParams): Promise<Array<Location>> {
        const child = await this.children.get(params.textDocument.uri)

        return child.connection.sendRequest(ReferencesRequest, params.position)
    }

    settingsChange = (params: DidChangeConfigurationParams): void => {
        if (this.hasWorkspaceSettings) {
            // Update all open document contexts.
            this.children.forEach((child: Promise<Child>, uri: string) => {
                let settings = params.settings.tsplang || TsplangSettings.defaults()

                this.connection.workspace.getConfiguration({
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

                child.then((value: Child) => value.connection.sendNotification(SettingsNotification, settings))
            })
        }
        else {
            this.globalSettings = params.settings.tsplang || TsplangSettings.defaults()

            this.children.forEach((child: Promise<Child>) => {
                child.then(
                    (value: Child) => value.connection.sendNotification(SettingsNotification, this.globalSettings)
                )
            })
        }
    }

    async signature(params: TextDocumentPositionParams): Promise<SignatureHelp | undefined> {
        const child = await this.children.get(params.textDocument.uri)

        return child.connection.sendRequest(SignatureRequest, params)
    }

    async symbol(params: DocumentSymbolParams): Promise<Array<DocumentSymbol>> {
        const child = await this.children.get(params.textDocument.uri)

        return child.connection.sendRequest(SymbolRequest, undefined)
    }

    /* Internal Methods */

    private async _release(uri: string): Promise<void> {
        const child = await this.children.get(uri)

        child.connection.dispose()
        console.log(`closed connection for ${uri}`)

        child.proc.kill('SIGKILL')
        console.log(`killed process for ${uri}`)

        this.children.delete(uri)

        // Clear diagnostic information.
        this.connection.sendDiagnostics({ uri, diagnostics: [] })
    }
}
