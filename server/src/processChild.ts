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
    Location,
    LocationLink,
    Position,
    SignatureHelp,
    SymbolKind,
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
    DefinitionRequest,
    ErrorNotification,
    ProcessContext,
    ReferencesRequest,
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

connection.listen()
console.log(`pid ${process.pid}: listening on the connection`)

let documentContext: DocumentContext | undefined
let firstlineRegExp: RegExp
let instrument: Instrument
/**
 * DocumentSymbols that evaluate to true will be pruned from the reported
 * array.
 */
const prunePredicate = (value: DocumentSymbol): boolean => {
    return value.kind === SymbolKind.File
        || (value.declaration !== undefined && value.references === undefined)
        || value.builtin
}
let settings: TsplangSettings
let shebang: Shebang
let textDocumentItem: TextDocumentItem
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
        updateProcessContext({
            item,
            settings: context.settings
        })

        return
    }

    // proc.context.update(changes)
})

connection.onNotification(SettingsNotification, (received: TsplangSettings) => {
    settings = received
    if (documentContext) {
        documentContext.settings = received
    }
})

connection.onRequest(CompletionRequest, (params: TextDocumentPositionParams): CompletionList | undefined => {
    // TODO: provide dumb completions while waiting for a DocumentContext.

    // TODO: get completions from the DocumentContext.

    return
})

connection.onRequest(CompletionResolveRequest, async (item: CompletionItem): Promise<CompletionItem> => {
    // const context = await documentContext

    // return context.resolveCompletion(item)
    return
})

connection.onRequest(DefinitionRequest, (position: Position): LocationLink | undefined => {
    const here = documentContext.symbolTable.lookup({ end: position, start: position })

    return here.declaration
})

connection.onRequest(ReferencesRequest, (position: Position): Array<Location> => {
    const have = documentContext.symbolTable.lookup({ end: position, start: position })

    if (have === undefined) {
        return []
    }
    else if (have.declaration === undefined) {
        return []
    }

    const definition = documentContext.symbolTable.lookup(have.declaration.targetSelectionRange)

    return definition.references || []
})

connection.onRequest(SignatureRequest, (params: TextDocumentPositionParams): SignatureHelp | undefined => {
    // if (proc.context) {
    //     return proc.context.getSignatureHelp(params.position)
    // }

    return
})

connection.onRequest(SymbolRequest, async (params: ProcessContext): Promise<Array<DocumentSymbol>> => {
    if (textDocumentItem === undefined || instrument === undefined || settings === undefined) {
        await updateProcessContext(params)
    }

    if (documentContext === undefined) {
        // Create the context for this document.
        documentContext = new DocumentContext(textDocumentItem, instrument.set, settings)
    }

    if (settings.debug.outline) {
        return documentContext.symbolTable.complete
    }
    else {
        const prunedSymbols = new Array<DocumentSymbol>()
        for (const symbol of documentContext.symbolTable.complete) {
            if (prunePredicate(symbol)) {
                // Extract pruned grandchildren that aren't local declarations.
                const orphans = (symbol.prune(prunePredicate).children as Array<DocumentSymbol>)
                    .filter((value: DocumentSymbol) => !value.local)
                prunedSymbols.push(...orphans)
            }
            else {
                prunedSymbols.push(symbol.prune(prunePredicate) as DocumentSymbol)
            }
        }

        return prunedSymbols
    }
})

async function updateProcessContext(params: ProcessContext): Promise<void> {
    // Store information that a later DocumentContext will require.
    textDocumentItem = params.item
    settings = await Promise.resolve(params.settings)

    if (firstlineRegExp === undefined) {
        firstlineRegExp = new RegExp(/^[^\n\r]*/)
    }

    const firstLine = firstlineRegExp.exec(textDocumentItem.text)[0]

    let diagnostics: Array<Diagnostic>
    [shebang, diagnostics] = Shebang.tokenize(firstLine)

    let loadDiagnostics: Array<Diagnostic>
    // Try to generate instrument information for this document.
    [instrument, loadDiagnostics] = load(shebang)

    // Collect all diagnostics.
    diagnostics.push(...loadDiagnostics)

    connection.sendNotification(ErrorNotification, { diagnostics, uri })
}
