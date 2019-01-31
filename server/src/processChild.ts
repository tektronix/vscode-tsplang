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
import { TextDocumentContentChangeEvent } from 'vscode-languageserver'

import { DocumentContext } from './documentContext'
import { Instrument, load } from './instrument'
import { ChangeNotification, ContextReply, ContextRequest, ErrorNotification, SettingsNotification } from './rpcTypes'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'

const connection = rpc.createMessageConnection(
    new rpc.IPCMessageReader(process),
    new rpc.IPCMessageWriter(process)
)
console.log(`pid ${process.pid}: established connection`)

class ProcessChild {
    context: DocumentContext
    readonly firstlineRegExp: RegExp
    instrument: Instrument
    shebang: Shebang
    uri: string

    constructor(uri: string) {
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
        this.uri = uri
    }
}

// tslint:disable-next-line:no-magic-numbers
const proc = new ProcessChild(process.argv[2])

connection.onNotification(ChangeNotification, (changes: Array<TextDocumentContentChangeEvent>) => {
    console.log(`pid ${process.pid}: received change event`)
})

connection.onNotification(SettingsNotification, (settings: TsplangSettings) => {
    proc.context.settings = settings
})

connection.listen()
console.log(`pid ${process.pid}: listening on the connection`)

/* Process Child Initialization */

connection.sendRequest(ContextRequest, proc.uri).then((context: ContextReply) => {
    proc.shebang = Shebang.deserialize(context.shebang)
    // Generate the instrument information for this document.
    proc.instrument = load(context.shebang.master)
    // Create the context for this document.
    proc.context = new DocumentContext(context.item, proc.instrument.set, context.settings)

    const diagnostics = context.shebangDiagnostics
    diagnostics.concat(proc.context.outline.diagnostics)

    connection.sendNotification(ErrorNotification, { diagnostics, uri: proc.uri })
})
