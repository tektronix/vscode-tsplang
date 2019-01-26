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

import * as rpc from 'vscode-jsonrpc'

import { DocumentContext } from './documentContext'
import { ContextReply, ContextRequest, ErrorNotification } from './rpcTypes'
import { Shebang } from './shebang'

const connection = rpc.createMessageConnection(
    new rpc.IPCMessageReader(process),
    new rpc.IPCMessageWriter(process)
)
console.log(`pid ${process.pid}: established connection`)

class ProcessChild {
    context: DocumentContext
    readonly firstlineRegExp: RegExp
    shebang: Shebang
    uri: string

    constructor(uri: string) {
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
        this.uri = uri
    }
}

// tslint:disable-next-line:no-magic-numbers
const proc = new ProcessChild(process.argv[2])

connection.listen()
console.log(`pid ${process.pid}: listening on the connection`)

/* Process Child Initialization */

connection.sendRequest(ContextRequest, proc.uri).then((context: ContextReply) => {
    proc.shebang = context.shebang
    proc.context = new DocumentContext(context.item, context.commands, context.settings)

    const diagnostics = context.shebangDiagnostics
    diagnostics.concat(proc.context.outline.diagnostics)

    connection.sendNotification(ErrorNotification, { diagnostics, uri: proc.uri })
})
