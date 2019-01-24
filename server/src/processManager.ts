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
import { Diagnostic, IConnection, TextDocumentItem } from 'vscode-languageserver'

import { BasicMessage, StartedMessage, StartMessage } from './ipcTypes'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { TspPool } from './tspPool'

interface Child {
    init: StartMessage
    proc: ChildProcess
}

export class ProcessManager {
    readonly children: Map<string, Child>
    readonly firstlineRegExp: RegExp
    readonly pool: TspPool
    private readonly connection: IConnection

    constructor(connection: IConnection) {
        this.children = new Map()
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
        this.pool = new TspPool()
        this.connection = connection

        ipc.config.id = 'TsplangServer'
        ipc.serve(() => {
            ipc.server.on('init', this.init)
            ipc.server.on('started', this.started)
        })
        ipc.server.start()
    }

    close(uri: string): void {
        this.children.get(uri).proc.kill('SIGKILL')

        this.children.delete(uri)
    }

    open(item: TextDocumentItem, settings: TsplangSettings): Array<Diagnostic> {
        // check if the doc has already been registered
        if (this.children.has(item.uri)) {
            throw new Error(`${item.uri} is already registered`)
        }

        const firstLine = this.firstlineRegExp.exec(item.text)[0]

        // Try to parse the shebang.
        const [shebang, errors]: [Shebang, Array<Diagnostic>] = Shebang.tokenize(firstLine)

        // Register the shebang in the TspPool.
        const poolEntry = this.pool.register(shebang.master)

        const child = fork(path.resolve('processChild.js'), [item.uri], {
            stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
        })

        this.children.set(item.uri, {
            init: {
                item,
                bang: shebang,
                config: settings,
                set: poolEntry.commandSet
            },
            proc: child
        })

        return errors
    }

    private init(message: BasicMessage): void {
        ipc.server.emit('start', this.children.get(message.uri).init)
    }

    private started(message: StartedMessage): void {
        this.connection.sendDiagnostics({ diagnostics: message.errors, uri: message.uri })
    }
}
