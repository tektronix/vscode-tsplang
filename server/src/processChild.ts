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
import { Diagnostic, TextDocument, TextDocumentContentChangeEvent, TextDocumentItem } from 'vscode-languageserver'

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

    constructor() {
        this.firstlineRegExp = new RegExp(/^[^\n\r]*/)
    }
}

// tslint:disable-next-line:no-magic-numbers
const uri: string = process.argv[2]
const proc = new ProcessChild()

connection.onNotification(ChangeNotification, (changes: Array<TextDocumentContentChangeEvent>) => {
    let shebangEdited = false
    const item: TextDocumentItem = {
        uri,
        languageId: proc.context.document.languageId,
        text: proc.context.document.getText(),
        version: proc.context.document.version
    }
    for (const change of changes) {
        shebangEdited = change.range.start.line === 0

        item.text = TextDocument.applyEdits(
            TextDocument.create(item.uri, item.languageId, item.version, item.text),
            [{
                newText: change.text,
                range: change.range
            }]
        )
    }

    if (shebangEdited) {
        onContextReply({
            item,
            settings: proc.context.settings
        })

        return
    }

    // TODO: update the document context
})

connection.onNotification(SettingsNotification, (settings: TsplangSettings) => {
    proc.context.settings = settings
})

connection.listen()
console.log(`pid ${process.pid}: listening on the connection`)

/* Process Child Initialization */

if (process.env.TSPLANG_DEBUG) {
    // Give dev time to attach to this document before continuing.
    const contextRequest: Thenable<ContextReply> = connection.sendRequest(ContextRequest, uri)
    // tslint:disable-next-line:no-magic-numbers
    setTimeout(() => contextRequest.then(onContextReply), 20000)
}
else {
    connection.sendRequest(ContextRequest, uri).then(onContextReply)
}

function onContextReply(context: ContextReply): void {
    const firstLine = proc.firstlineRegExp.exec(context.item.text)[0]

    let diagnostics: Array<Diagnostic>
    [proc.shebang, diagnostics] = Shebang.tokenize(firstLine)

    let loadDiagnostics: Array<Diagnostic>
    // Try to generate instrument information for this document.
    [proc.instrument, loadDiagnostics] = load(proc.shebang)

    // Create the context for this document.
    proc.context = new DocumentContext(context.item, proc.instrument.set, context.settings)

    // Collect all diagnostics.
    diagnostics.push(...loadDiagnostics, ...proc.context.outline.diagnostics)

    connection.sendNotification(ErrorNotification, { diagnostics, uri })
}
