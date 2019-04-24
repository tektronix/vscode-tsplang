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
    TextDocumentSyncKind,
    WorkspaceFolder,
    WorkspaceFoldersChangeEvent
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
import { localWorkspaceSettings, multiWorkspaceSettings, TsplangSettings } from './settings'

interface Child {
    connection: rpc.MessageConnection
    proc: ChildProcess,
    uri: string
}

export class ProcessManager {
    readonly children: Map<string, Thenable<Child>>
    connection: IConnection
    disposables: Array<Thenable<Disposable>>
    readonly firstlineRegExp: RegExp
    globalSettings: TsplangSettings
    lastCompletionUri?: string
    localWorkspaceSettings: boolean
    multiWorkspaceSettings: boolean
    settingsCache: Map<string, Thenable<TsplangSettings>>

    constructor(connection: IConnection) {
        this.children = new Map()
        this.disposables = new Array()
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
        this.globalSettings = TsplangSettings.defaults()
        this.localWorkspaceSettings = false
        this.multiWorkspaceSettings = false
        this.settingsCache = new Map<string, Thenable<TsplangSettings>>()

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
        this.disposables.forEach((value: Thenable<Disposable>) => {
            value.then((disposable: Disposable) => disposable.dispose())
        })

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
        this.children.set(
            params.textDocument.uri,
            // TODO: add promise rejections
            new Promise((resolve: (value: Child) => void): void => {
                const proc = fork(path.resolve(__dirname, 'processChild.js'), [params.textDocument.uri], {
                    // tslint:disable-next-line:no-magic-numbers
                    execArgv: ['--nolazy', `--inspect=${this.children.size + 6010}`],
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
                child.connection.onRequest(TsplangSettingsRequest, async (): Promise<TsplangSettings> => {
                    return this.getSettings(params.textDocument.uri)
                })

                connection.trace(rpc.Trace.Messages, console)
                child.connection.listen()

                resolve(child)
            })
        )
    }

    initialize(params: InitializeParams): InitializeResult {
        console.log('tsplang connection initialized')

        this.localWorkspaceSettings = localWorkspaceSettings(params.capabilities)
        this.multiWorkspaceSettings = multiWorkspaceSettings(params.capabilities)

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
                // Tell the client that the server works in incremental text document sync mode
                textDocumentSync: TextDocumentSyncKind.Incremental,
                workspace: {
                    workspaceFolders: {
                        changeNotifications: this.multiWorkspaceSettings,
                        supported: true
                    }
                }
            }
        }
    }

    initialized(): void {
        if (this.localWorkspaceSettings) {
            this.disposables.push(this.connection.client.register(DidChangeConfigurationNotification.type, {
                section: 'tsplang'
            }))
        }

        if (this.multiWorkspaceSettings) {
            this.disposables.push(Promise.resolve(
                this.connection.workspace.onDidChangeWorkspaceFolders(this.workspaceFolders)
            ))
        }
    }

    async references(params: ReferenceParams): Promise<Array<Location>> {
        const child = await this.children.get(params.textDocument.uri)

        return child.connection.sendRequest(ReferencesRequest, params.position)
    }

    async settingsChange(params: DidChangeConfigurationParams): Promise<void> {
        if (this.localWorkspaceSettings) {
            this.settingsCache.clear()
        }
        else {
            this.globalSettings = params.settings.tsplang || TsplangSettings.defaults()
        }

        for (const [uri, childPromise] of this.children.entries()) {
            const child = await childPromise
            const settings = await this.getSettings(uri)

            child.connection.sendNotification(SettingsNotification, settings)
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

    private getSettings(uri: string): Thenable<TsplangSettings> {
        if (!this.localWorkspaceSettings) {
            return Promise.resolve(this.globalSettings)
        }

        let settings = this.settingsCache.get(uri)

        if (settings === undefined) {
            settings = this.connection.workspace.getConfiguration({
                scopeUri: uri,
                section: 'tsplang'
            })

            this.settingsCache.set(uri, settings)
        }

        return settings
    }

    private workspaceFolders = (event: WorkspaceFoldersChangeEvent): void => {
        event.added.forEach((value: WorkspaceFolder) => {
            console.log(`added workspace folder ${value.name} @ ${value.uri}`)
        })

        event.removed.forEach((value: WorkspaceFolder) => {
            console.log(`removed workspace folder ${value.name} @ ${value.uri}`)
        })
    }
}
