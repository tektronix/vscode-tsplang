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
import * as ipc from 'node-ipc'
import * as path from 'path'
import { DidChangeConfigurationNotification, DidChangeConfigurationParams, DidChangeTextDocumentParams, DidCloseTextDocumentParams, DidOpenTextDocumentParams, Disposable, IConnection, InitializeParams, InitializeResult, TextDocumentSyncKind } from 'vscode-languageserver'

import { BasicChildErrorMessage, BasicChildMessage, ContextMessage, RegisterChildMessage } from './ipcTypes'
import { hasWorkspaceSettings, TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { TspPool } from './tspPool'

interface Child {
    firstLine: string
    init: ContextMessage
    proc: ChildProcess
    shebang?: Shebang
    uri: string
}

export class ProcessManager {
    readonly children: Map<string, Child>
    disposable?: Thenable<Disposable>
    readonly firstlineRegExp: RegExp
    globalSettings: TsplangSettings
    hasWorkspaceSettings: boolean
    lastCompletionUri?: string
    readonly pool: TspPool
    private readonly connection: IConnection

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
        ipc.server.emit('change', params)
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

        const child = fork(path.resolve('processChild.js'), [params.textDocument.uri], {
            stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
        })

        this.children.set(params.textDocument.uri, {
            firstLine: this.firstlineRegExp.exec(params.textDocument.text)[0],
            init: {
                config: settings,
                item: params.textDocument
            },
            proc: child,
            uri: params.textDocument.uri
        })
    }

    initialize(params: InitializeParams): InitializeResult {
        this.connection.console.log('tsplang connection initialized')

        ipc.config.id = 'TsplangServer'
        ipc.serve(() => {
            ipc.server.on('created', this.created)
            ipc.server.on('register', this.register)
            ipc.server.on('registered', this.registered)
        })
        ipc.server.start()

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

    settingsChange(params: DidChangeConfigurationParams): void {
        if (this.hasWorkspaceSettings) {
            // Update all open document contexts.
            this.children.forEach((child: Child) => {
                let settings = params.settings.tsplang || TsplangSettings.defaults()

                this.connection.workspace.getConfiguration({
                    scopeUri: child.uri,
                    section: 'tsplang'
                })
                .then(
                    (value: TsplangSettings) => {
                        settings = value
                    },
                    // On rejection, just use the values we set above.
                    () => { return }
                )

                ipc.server.emit('settings', { config: settings })
            })
        }
        else {
            this.globalSettings = params.settings.tsplang || TsplangSettings.defaults()

            ipc.server.emit('settings', { config: this.globalSettings })
        }
    }

    /* Internal Methods */

    private _release(uri: string): void {
        const child = this.children.get(uri)

        child.proc.kill('SIGKILL')

        if (child.shebang) {
            // Unregister the child's command set.
            this.pool.unregister(child.shebang.master)
        }

        // Dereference the child.
        this.children.delete(uri)

        // Clear diagnostic information.
        this.connection.sendDiagnostics({ uri, diagnostics: [] })
    }

    /* Process Message Handlers */

    private created(message: BasicChildMessage): void {
        ipc.server.emit('shebang', this.children.get(message.uri).firstLine)
    }

    private register(message: RegisterChildMessage): void {
        // Update diagnostics.
        this.connection.sendDiagnostics({ diagnostics: message.errors, uri: message.uri })

        // Get the stored Child item
        const child = this.children.get(message.uri)

        // Update child.
        child.shebang = message.shebang

        // Send a registration message.
        // This is much easier than sending the whole command set in a message.
        const callback = this.pool.register
        callback.bind(this.pool)
        ipc.server.emit('registration', { callback, config: child.init.config, item: child.init.item })

        // Store the updated child.
        this.children.set(message.uri, child)
    }

    private registered(message: BasicChildErrorMessage): void {
        this.connection.sendDiagnostics({ diagnostics: message.errors, uri: message.uri })
    }
}
