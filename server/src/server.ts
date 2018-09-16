/*
 *  Copyright 2018 Tektronix Inc.
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

import { CompletionItem, createConnection, IConnection, InitializedParams, InitializeResult, IPCMessageReader, IPCMessageWriter, SignatureHelp, SignatureInformation, TextDocumentChangeEvent, TextDocumentItem, TextDocumentPositionParams, TextDocuments } from 'vscode-languageserver'

import { resolveCompletionNamespace } from './instrument/provider'
import { TspManager } from './tspManager'

const manager: TspManager = new TspManager()

// Create a connection for the server. The connection uses Node's IPC as a transport
const connection: IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

// Create a simple text document manager. The text document manager supports full document sync
// only
const documents: TextDocuments = new TextDocuments()

// Lets onCompletionResolve perform a TspItem lookup on TspManager using the last document uri
// that completions were requested for
let lastOnCompleteUri: string | undefined

// After the server has started the client sends an initialize request. The server receives in the
// passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize((params: InitializedParams): InitializeResult => {
    console.log('tsplang connection initialized')

    return {
        capabilities: {
            // provide context sensitive suggestions to the user
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.']
            },
            // display information about the function/method that is being called
            signatureHelpProvider: {
                triggerCharacters: [ ',', '(' ]
            },
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind
        }
    }
})

// The content of a text document has changed. This event is emitted when the text document first
// opened or when its content has changed.
documents.onDidChangeContent((change: TextDocumentChangeEvent) => {
    const docItem: TextDocumentItem = {
        languageId: change.document.languageId,
        text: change.document.getText(),
        uri: change.document.uri,
        version: change.document.version
    }

    // if document is registered, then update
    if (manager.has(docItem.uri)) {
        manager.update(docItem)
    }
    // if document is unregistered, then register
    else {
            manager.register(docItem)
    }
})

documents.onDidClose((params: TextDocumentChangeEvent) => {
    connection.console.log(`${params.document.uri} closed.`)

    if (manager.has(params.document.uri)) {
        manager.unregister(params.document.uri)
    }
})

// This handler provides the initial list of completion items.
connection.onCompletion((textDocumentPosition: TextDocumentPositionParams): Array<CompletionItem> | undefined => {
    // save the last uri for which we are registed to accept events
    lastOnCompleteUri = textDocumentPosition.textDocument.uri

    const content = documents.get(textDocumentPosition.textDocument.uri)

    if (content === undefined) {
        return
    }

    const offset: number = content.offsetAt(textDocumentPosition.position)

    const namespaceRegexp = new RegExp('^[a-zA-Z.\\[\\]0-9]*')

    // get all text before the cursor position,
    // convert the string to an array of characters,
    // reverse the array of characters,
    // convert the array to a string
    // (we need to reverse because we don't know where the namespace starts)
    const reverseText = content.getText().slice(0, offset).split('').reverse().join('')
    const reverseMatches = reverseText.match(namespaceRegexp)

    const results: Array<CompletionItem> = new Array()

    const tspItem = manager.get(textDocumentPosition.textDocument.uri)

    if (tspItem === undefined) {
        return
    }

    if (reverseMatches === null) {
        return
    }

    let firstMatch = reverseMatches.shift()

    if (firstMatch === undefined || firstMatch === '') {
        for (const compl of tspItem.commandSet.completions) {
            // get root namespace completions
            if (compl.data === undefined) {
                results.push(compl)
            }
        }

        return results
    }

    let endingQualifier = false

    // remove any namespace qualifier at position 0
    if (firstMatch.indexOf('.') === 0) {
        firstMatch = firstMatch.slice(1)
        endingQualifier = true

        // return if we just deleted the entire string
        if (firstMatch.length === 0) {
            return
        }
    }

    // un-reverse the string and remove square brackets and their contents
    const unreversed = firstMatch.split('').reverse().join('').replace(/\[[0-9]\]/g, '')
    // split the unreversed string on namespace qualifiers and reverse the namespace domains
    const namespaceArray: Array<string> = unreversed.split('.').reverse()

    for (const compl of tspItem.commandSet.completions) {
        // if the completion has a data field, then it's not a root namespace
        if (compl.data !== undefined && compl.data instanceof Array) {
            if (compl.data.join('.') === namespaceArray.join('.')) {
                results.push(compl)
            }
        }
        else {
            // prevent the same namespace from showing up again if it is 1 deep
            if (endingQualifier) {
                continue
            }

            // root namespaces only have label fields, so partial match against that
            const partialMatches = compl.label.match(namespaceArray.join('.'))

            if (partialMatches === null) {
                continue
            }

            const partial = partialMatches.shift()
            if (partial !== undefined && partial !== '') {
                results.push(compl)
            }
        }
    }

    return results
})

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    const result: CompletionItem = item

    if (result.documentation === undefined && lastOnCompleteUri !== undefined) {
        // get the TspItem servicing this document
        const tspItem = manager.get(lastOnCompleteUri)

        // if no TspItem is registered to this uri OR there are no completionDocs
        if (tspItem === undefined || tspItem.commandSet.completionDocs === undefined) {
            return result
        }

        // resolve our namespace
        const label = resolveCompletionNamespace(result)

        // get the CommandDocumentation for our label
        const commandDoc = tspItem.commandSet.completionDocs.get(label)

        // if no CommandDocumentation exists for our label
        if (commandDoc === undefined) {
            return result
        }

        result.documentation = {
            kind: commandDoc.kind,
            value: commandDoc.toString(tspItem.commandSet.specification)
        }
    }

    return result
})

connection.onSignatureHelp((params: TextDocumentPositionParams) => {
    const content = documents.get(params.textDocument.uri)

    if (content === undefined) {
        return
    }

    const offset: number = content.offsetAt(params.position)
    const openParenOffset: number = content.getText().lastIndexOf('(', offset)
    const closeParenOffset: number = content.getText().indexOf(')', offset)
    const commaIndices: Array<number> = new Array()

    if (closeParenOffset === -1) {
        return
    }

    // stop providing signature info if the cursor is outside of the parenthesis
    if (offset <= openParenOffset || offset > closeParenOffset) {
        return
    }

    const callRegexp = new RegExp('^[a-zA-Z.\\[\\]0-9]*')

    // get all text before the open parenthesis offset,
    // convert the string to an array of characters,
    // reverse the array of characters,
    // convert the array to a string
    // (we need to reverse because we don't know where the function call starts)
    const reverseText = content.getText().slice(0, openParenOffset).split('').reverse().join('')
    const reverseMatches = reverseText.match(callRegexp)

    if (reverseMatches === null) {
        return
    }

    const firstMatch = reverseMatches.shift()

    if (firstMatch === undefined) {
        return
    }

    // un-reverse the string and remove digits inside of square brackets
    const unreversed = firstMatch.split('').reverse().join('').replace(/\[[0-9]\]/g, '[]')

    const tspItem = manager.get(params.textDocument.uri)

    if (tspItem === undefined || tspItem.commandSet.signatures === undefined) {
        return
    }

    const results: Array<SignatureInformation> = new Array()

    // add all matching signatures to the results array
    for (const signa of tspItem.commandSet.signatures) {
        const signaBeforeParams: string = signa.label.slice(0, signa.label.indexOf('('))

        if (signaBeforeParams.localeCompare(unreversed) === 0) {
            results.push(signa)
        }
    }

    // get the index of each comma between our surrounding parenthesis
    for (let i = openParenOffset + 1; i < closeParenOffset;) {
        const commaIndex = content.getText().indexOf(',', i)
        if (commaIndex >= i) {
            commaIndices.push(commaIndex)
            i = commaIndex + 1
        }
        else {
            i++
        }
    }

    // compare the current offset to the index of the last comma to get the active parameter
    let activeParam = 0
    commaIndices.forEach((element: number) => {
        if (offset > element) {
            activeParam++
        }
        else {
            return
        }
    })

    const sig: SignatureHelp = {
        activeParameter: activeParam,
        activeSignature: 0,
        signatures: results
    }

    return sig
})

// Make the text document manager listen on the connection for open, change and close text
// document events
documents.listen(connection)
// Listen on the connection
connection.listen()
