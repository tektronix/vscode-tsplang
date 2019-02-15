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
import {
    CompletionList,
    Diagnostic,
    SignatureHelp,
    TextDocument,
    TextDocumentContentChangeEvent,
    TextDocumentItem,
    TextDocumentPositionParams
} from 'vscode-languageserver'

import { CompletionItem, DocumentSymbol } from './decorators'
import { DocumentContext } from './documentContext'
import { Instrument, load } from './instrument'
import {
    ChangeNotification,
    CompletionRequest,
    CompletionResolveRequest,
    ContextReply,
    ContextRequest,
    ErrorNotification,
    SettingsNotification,
    SignatureRequest,
    SymbolRequest
} from './rpcTypes'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'

const connection = rpc.createMessageConnection(
    new rpc.IPCMessageReader(process),
    new rpc.IPCMessageWriter(process)
)
console.log(`pid ${process.pid}: established connection`)

let documentContext: Promise<DocumentContext>
const firstlineRegExp = new RegExp(/^[^\n\r]*/)
let instrument: Instrument
let shebang: Shebang
// tslint:disable-next-line:no-magic-numbers
const uri: string = process.argv[2]

connection.onNotification(ChangeNotification, async (changes: Array<TextDocumentContentChangeEvent>) => {
    const context = await documentContext

    let shebangEdited = false
    const item: TextDocumentItem = {
        uri,
        languageId: context.document.languageId,
        text: context.document.getText(),
        version: context.document.version
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
            settings: context.settings
        })

        return
    }

    // proc.context.update(changes)
})

connection.onNotification(SettingsNotification, (settings: TsplangSettings) => {
    documentContext.then((value: DocumentContext) => value.settings = settings)
})

connection.onRequest(CompletionRequest, (params: TextDocumentPositionParams): CompletionList | undefined => {
    // if (proc.context) {
    //     return proc.context.getCompletionItems(params.position)
    // }

    return
})

connection.onRequest(CompletionResolveRequest, async (item: CompletionItem): Promise<CompletionItem> => {
    const context = await documentContext

    return context.resolveCompletion(item)
})

connection.onRequest(SignatureRequest, (params: TextDocumentPositionParams): SignatureHelp | undefined => {
    // if (proc.context) {
    //     return proc.context.getSignatureHelp(params.position)
    // }

    return
})

connection.onRequest(SymbolRequest, async (): Promise<Array<DocumentSymbol>> => {
    const context = await documentContext

    return context.symbols
})

connection.listen()
console.log(`pid ${process.pid}: listening on the connection`)

if (process.env.TSPLANG_DEBUG) {
    // Give dev time to attach to this document before continuing.
    const contextRequest: Thenable<ContextReply> = connection.sendRequest(ContextRequest, uri)
    // tslint:disable-next-line:no-magic-numbers
    setTimeout(() => contextRequest.then(onContextReply), 0)
}
else {
    connection.sendRequest(ContextRequest, uri).then(onContextReply)
}

function onContextReply(contextReply: ContextReply): void {
    const firstLine = firstlineRegExp.exec(contextReply.item.text)[0]

    let diagnostics: Array<Diagnostic>
    [shebang, diagnostics] = Shebang.tokenize(firstLine)

    let loadDiagnostics: Array<Diagnostic>
    // Try to generate instrument information for this document.
    [instrument, loadDiagnostics] = load(shebang)

    // Create the context for this document.
    const context = new DocumentContext(contextReply.item, instrument.set, contextReply.settings)
    documentContext = new Promise<DocumentContext>(((): DocumentContext => {
        return context
    }))

    // Collect all diagnostics.
    diagnostics.push(...loadDiagnostics) // , ...proc.context.outline.diagnostics)

    connection.sendNotification(ErrorNotification, { diagnostics, uri })
}
