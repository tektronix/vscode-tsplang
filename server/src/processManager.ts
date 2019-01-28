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
import { Diagnostic, DidChangeConfigurationNotification, DidChangeConfigurationParams, DidChangeTextDocumentParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, Disposable, IConnection, InitializeParams, InitializeResult, PublishDiagnosticsParams, TextDocumentSyncKind } from 'vscode-languageserver'

import { ChangeNotification, ContextReply, ContextRequest, ErrorNotification, SettingsNotification } from './rpcTypes'
import { hasWorkspaceSettings, TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { TspPool } from './tspPool'

interface Child {
    connection: rpc.MessageConnection
    init: ContextReply
    proc: ChildProcess
}

export class ProcessManager {
    readonly children: Map<string, Child>
    connection: IConnection
    disposable?: Thenable<Disposable>
    readonly firstlineRegExp: RegExp
    globalSettings: TsplangSettings
    hasWorkspaceSettings: boolean
    lastCompletionUri?: string
    readonly pool: TspPool

    constructor(connection: IConnection) {
        this.children = new Map()
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
        this.globalSettings = TsplangSettings.defaults()
        this.hasWorkspaceSettings = false
        this.pool = new TspPool()

        this.connection = connection
    }

    /* Server Message Handlers */

    dispose(): void {
        if (this.disposable) {
            this.disposable.then((value: Disposable) => value.dispose())
        }

        this.children.forEach((value: Child) => {
            this._release(value.init.item.uri)
        })
    }

    documentChange = (params: DidChangeTextDocumentParams): void => {
        this.children.get(params.textDocument.uri).connection.sendNotification(
            ChangeNotification,
            params.contentChanges
        )
    }

    documentClose(params: DidCloseTextDocumentParams): void {
        this._release(params.textDocument.uri)
    }

    documentOpen(params: DidOpenTextDocumentParams): void {
        // Register this document with global settings.
        let settings = this.globalSettings

        // Override global settings with any workspace settings.
        if (this.hasWorkspaceSettings) {
            this.connection.workspace.getConfiguration({
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

        const firstLine = this.firstlineRegExp.exec(params.textDocument.text)[0]
        const [shebang, shebangDiagnostics]: [Shebang, Array<Diagnostic>] = Shebang.tokenize(firstLine)
        // Generate a CommandSet for this document.
        const poolEntry = this.pool.register(shebang.master)

        const proc = fork(path.resolve(__dirname, 'processChild.js'), [params.textDocument.uri], {
            // tslint:disable-next-line:no-magic-numbers
            execArgv: ['--debug', '--nolazy', `--inspect=${this.children.size + 6010}`],
            stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
        })

        const connection = rpc.createMessageConnection(
            new rpc.IPCMessageReader(proc),
            new rpc.IPCMessageWriter(proc)
        )

        const child: Child = {
            connection,
            proc,
            init: {
                settings,
                shebang,
                shebangDiagnostics,
                commands: poolEntry.commandSet,
                item: params.textDocument,
            }
        }

        this.children.set(params.textDocument.uri, child)

        child.connection.onNotification(ErrorNotification, (value: PublishDiagnosticsParams) => {
            this.connection.sendDiagnostics(value)
        })
        child.connection.onRequest(ContextRequest, (uri: string): ContextReply => {
            return this.children.get(uri).init
        })

        connection.trace(rpc.Trace.Messages, console)
        child.connection.listen()
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

    settingsChange = (params: DidChangeConfigurationParams): void => {
        if (this.hasWorkspaceSettings) {
            // Update all open document contexts.
            this.children.forEach((child: Child, uri: string) => {
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

                child.connection.sendNotification(SettingsNotification, settings)
            })
        }
        else {
            this.globalSettings = params.settings.tsplang || TsplangSettings.defaults()

            this.children.forEach((child: Child) => {
                child.connection.sendNotification(SettingsNotification, this.globalSettings)
            })
        }
    }

    /* Internal Methods */

    private _release(uri: string): void {
        const child = this.children.get(uri)

        child.connection.dispose()
        console.log(`closed connection for ${uri}`)

        child.proc.kill('SIGKILL')
        console.log(`killed process for ${uri}`)

        this.pool.unregister(child.init.shebang.master)
        console.log(`unregistered ${child.init.shebang.master} from ${uri}`)

        this.children.delete(uri)

        // Clear diagnostic information.
        this.connection.sendDiagnostics({ uri, diagnostics: [] })
    }
}
