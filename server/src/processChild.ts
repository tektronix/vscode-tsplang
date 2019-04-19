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

import { InputStream, Token } from 'antlr4'
import * as rpc from 'vscode-jsonrpc'
import {
    CompletionList,
    CompletionParams,
    CompletionTriggerKind,
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

import { TspFastLexer } from './antlr4-tsplang'
import { CompletionItem, DocumentSymbol, IToken, ResolvedNamespace, SignatureInformation } from './decorators'
import { DocumentContext } from './documentContext'
import { Instrument, load } from './instrument'
import { StatementType, TokenUtil } from './language-comprehension'
import { SignatureContext } from './language-comprehension/signature'
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
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { LookupResult } from './symbolTable'

const connection = rpc.createMessageConnection(
    new rpc.IPCMessageReader(process),
    new rpc.IPCMessageWriter(process)
)
console.log(`pid ${process.pid}: established connection`)

let initializationErrors = new Array<Diagnostic>()
const firstlineRegExp = new RegExp(/^[^\n\r]*/)
/**
 * DocumentSymbols that evaluate to true will be pruned from the reported
 * array.
 */
const prunePredicate = (value: DocumentSymbol): boolean => {
    return value.kind === SymbolKind.File
        || (value.declaration !== undefined && value.references === undefined)
        || value.builtin
}
// tslint:disable-next-line:no-magic-numbers
const uri: string = process.argv[2]

connection.onNotification(ChangeNotification, async (changes: Array<TextDocumentContentChangeEvent>) => {
    // TODO: detect shebang additions

    const textDocumentItem = await textDocumentItemPromise
    const settings = await settingsPromise
    let documentContext: DocumentContext
    let textDocument: TextDocument

    let shebangEdited = false
    let smallestPosition: Position
    for (const change of changes) {
        if (settings.debug.print.documentChangeEvents) {
            console.log(TsplangSettings.formatDocumentChangeEvent(change))
        }

        shebangEdited = change.range.start.line === 0 && Shebang.has(textDocumentItem.text)

        if (!shebangEdited) {
            if (smallestPosition === undefined
                || smallestPosition.line > change.range.start.line
                || (smallestPosition.line === change.range.start.line
                    && smallestPosition.character > change.range.start.character)) {
                smallestPosition = change.range.start
            }
        }

        textDocument = TextDocument.create(
            textDocumentItem.uri,
            textDocumentItem.languageId,
            textDocumentItem.version,
            textDocumentItem.text
        )

        textDocumentItem.text = TextDocument.applyEdits(
            textDocument,
            [{
                newText: change.text,
                range: change.range
            }]
        )
    }

    textDocumentItemPromise = Promise.resolve(textDocumentItem)

    if (shebangEdited) {
        initializationErrors = new Array()

        shebangPromise = new Promise(handleShebang)
        instrumentPromise = new Promise(handleInstrument)
        documentContextPromise = new Promise(handleDocumentContext)

        return
    }

    documentContext = await documentContextPromise
    documentContext.document = textDocument

    // Get the symbol table index of the symbol containing the smallest Position.
    const symbolIndex = documentContext.symbolTable.complete.findIndex((value: DocumentSymbol) => {
        return value.range.start.line >= smallestPosition.line || value.range.end.line >= smallestPosition.line
    })

    let tokenIndex: number
    if (symbolIndex === -1) {
        // Reparse everything starting after the last Token on the default channel.
        documentContext.reParse(-1)
    }
    else {
        // Get the Token index of the first Token containing the smallest Position.
        tokenIndex = documentContext.tokens.findIndex((value: IToken) => {
            return value.line - 1 >= smallestPosition.line
                && value.column + value.text.length >= smallestPosition.character
        })

        // Get the Token index of the first Token contained in the symbol containing the smallest Position.
        const symbolTokenIndex = documentContext.symbolTable.complete[symbolIndex].startTokenIndex

        // Remove the symbol containing the smallest Position and all following symbols.
        documentContext.symbolTable.complete.splice(symbolIndex)

        // Reparse everything starting at the smallest Token index.
        documentContext.reParse((tokenIndex < symbolTokenIndex) ? tokenIndex : symbolTokenIndex)
    }

    documentContextPromise = Promise.resolve(documentContext)

    return
})

connection.onNotification(SettingsNotification, (received: TsplangSettings) => {
    settingsPromise = Promise.resolve(received)
})

connection.onRequest(
    CompletionRequest,
    async (params: CompletionParams): Promise<CompletionList | undefined> => {
        const documentContext = await documentContextPromise

        const found = documentContext.symbolTable.lookup(params.position)

        if (found === undefined) {
            return {
                isIncomplete: false,
                items: CompletionItem.addSortText(
                    TsplangSettings.sortMap(documentContext.settings),
                    ...documentContext.commandSet.completionDepthMap.get(0)
                )
            }
        }

        let results: Array<CompletionItem>

        const signatureContext = getSignatureContext(documentContext, found, params.position)

        if (signatureContext !== undefined) {
            results = documentContext.commandSet.suggestCompletions(
                signatureContext.tokens.slice(0, signatureContext.activeParameter.tokens.end),
                StatementType.FunctionCall
            )
        }
        else {
            const range = { end: params.position, start: found.symbol.start }
            const text = documentContext.document.getText(range)
            const lexer = new TspFastLexer(new InputStream(text))
            results = documentContext.commandSet.suggestCompletions(
                lexer.getAllTokens()
                    .filter((value: Token) => value.channel === 0)
                    .map((value: Token) => IToken.create(value)),
                found.symbol.statementType
            )
        }

        if (results.length === 0) {
            // TODO: combine with user completions.
            return {
                isIncomplete: false,
                items: CompletionItem.addSortText(
                    TsplangSettings.sortMap(documentContext.settings),
                    ...documentContext.commandSet.completionDepthMap.get(0)
                )
            }
        }

        return {
            isIncomplete: false,
            items: CompletionItem.addSortText(TsplangSettings.sortMap(documentContext.settings), ...results)
        }
    }
)

connection.onRequest(CompletionResolveRequest, async (item: CompletionItem): Promise<CompletionItem> => {
    const documentContext = await documentContextPromise

    // Only service an item if its "documentation" property is undefined.
    if (item.documentation === undefined) {
        const makeDocs = documentContext.commandSet.completionDocs.get(CompletionItem.resolveNamespace(item))

        if (makeDocs === undefined) {
            return item
        }

        item.documentation = makeDocs(documentContext.commandSet.specification)
    }

    return item
})

connection.onRequest(DefinitionRequest, async (position: Position): Promise<LocationLink | undefined> => {
    const documentContext = await documentContextPromise

    const here = documentContext.symbolTable.lookup({ end: position, start: position })

    if (here === undefined) {
        return
    }

    return here.symbol.declaration
})

connection.onRequest(ReferencesRequest, async (position: Position): Promise<Array<Location>> => {
    const documentContext = await documentContextPromise

    const have = documentContext.symbolTable.lookup({ end: position, start: position })

    if (have === undefined) {
        return []
    }
    else if (have.symbol.declaration === undefined) {
        return []
    }

    const definition = documentContext.symbolTable.lookup(have.symbol.declaration.targetSelectionRange)

    return definition.symbol.references || []
})

connection.onRequest(
    SignatureRequest,
    async (params: TextDocumentPositionParams): Promise<SignatureHelp | undefined> => {
        const documentContext = await documentContextPromise

        const found = documentContext.symbolTable.lookup(params.position)

        if (found === undefined) {
            return
        }

        if (found.symbol.statementType !== StatementType.FunctionCall) {
            const signatureContext = getSignatureContext(documentContext, found, params.position)

            if (signatureContext === undefined) {
                return
            }

            const name = ResolvedNamespace.create(
                signatureContext.tokens.slice(signatureContext.name.start, signatureContext.name.end) as Array<Token>
            )
            const depth = ResolvedNamespace.depth(name)
            const matchingSignatures = (documentContext.commandSet.signatureDepthMap.get(depth) || []).filter(
                (value: SignatureInformation) => {
                    return SignatureInformation.resolveNamespace(value).localeCompare(name) === 0
                }
            )

            if (matchingSignatures.length > 0) {
                return {
                    activeParameter: signatureContext.activeParameter.index,
                    activeSignature: 0,
                    signatures: matchingSignatures
                }
            }
        }
        else {
            let text = ResolvedNamespace.create(documentContext.document.getText(found.symbol.range))
            const depth = ResolvedNamespace.depth(text)
            const matchingSignatures = (documentContext.commandSet.signatureDepthMap.get(depth) || []).filter(
                (value: SignatureInformation) => {
                    return SignatureInformation.resolveNamespace(value).localeCompare(text) === 0
                }
            )

            if (matchingSignatures.length > 0) {
                const range = { end: params.position, start: found.symbol.start }
                text = documentContext.document.getText(range)
                const lexer = new TspFastLexer(new InputStream(text))

                const tokens = lexer.getAllTokens()
                    .filter((value: Token) => value.channel === 0)

                const startCounting = TokenUtil.consumeUntil(
                    0,
                    tokens,
                    (value: Token) => value.text.localeCompare('(') === 0
                )

                return {
                    activeParameter: TokenUtil.count(
                        startCounting,
                        tokens,
                        (value: Token) => value.text.localeCompare(',') === 0
                    ),
                    activeSignature: 0,
                    signatures: matchingSignatures
                }
            }
        }

        return
})

connection.onRequest(SymbolRequest, async (): Promise<Array<DocumentSymbol>> => {
    const settings = await settingsPromise
    const documentContext = await documentContextPromise

    if (settings.debug.outline) {
        return documentContext.symbolTable.complete
    }
    else {
        const prunedSymbols = new Array<DocumentSymbol>()
        for (const symbol of documentContext.symbolTable.complete) {
            if (prunePredicate(symbol)) {
                // Extract pruned grandchildren that aren't local declarations
                // or local declarations residing within assignment containers.
                const orphans = (symbol.prune(prunePredicate).children as Array<DocumentSymbol>)
                    .filter(
                        (value: DocumentSymbol) => {
                            return !value.local || (value.local && symbol.statementType === StatementType.Assignment)
                        }
                    )
                prunedSymbols.push(...orphans)
            }
            else {
                prunedSymbols.push(symbol.prune(prunePredicate) as DocumentSymbol)
            }
        }

        return prunedSymbols
    }
})

connection.listen()
console.log(`pid ${process.pid}: listening on the connection`)

let settingsPromise = new Promise(requestSettings)
let textDocumentItemPromise = new Promise(requestTextDocumentItem);

// Delay after process initialization.
(async function(): Promise<void> {
    const settings = await settingsPromise

    if (settings.debug.open.documentInitializationDelay !== null) {
        // tslint:disable-next-line: prefer-const
        let [start, _]: [number, number] = process.hrtime()
        let now: number
        do {
            [now, _] = process.hrtime([start, _])
        } while (now < settings.debug.open.documentInitializationDelay)
    }
})()

let shebangPromise = new Promise(handleShebang)
let instrumentPromise = new Promise(handleInstrument)
let documentContextPromise = new Promise(handleDocumentContext)

function getSignatureContext(
    documentContext: DocumentContext,
    lookup: LookupResult,
    position: Position
): SignatureContext | undefined {
    if (lookup.symbol.exception) {
        // The last value of the path array is removed so it can be repeatedly
        // decremented without affecting the array itself.
        let lastPathIndex = lookup.path.pop() - 1
        let previousStart: Position
        // The number of encountered exceptions alters where we choose to start.
        let previousExceptions = 0

        for (; lastPathIndex > 0; lastPathIndex--) {
            // Update the array with the previously removed value before using it
            // to walk the symbol table.
            const previousSymbol = documentContext.symbolTable.getChildSymbol(
                lookup.path.concat(lastPathIndex)
            )

            if (previousSymbol === undefined) {
                break
            }

            // If the previous symbol is also an exception, then keep performing lookbehinds.
            if (previousSymbol.exception) {
                previousExceptions++
                previousStart = previousSymbol.start
            }
            // If the symbol at this path is not an exception but we encountered multiple
            // exceptions, then we only want exception symbols.
            else if (previousExceptions > 0) {
                break
            }
            // If the first lookbehind is not an exception, then combine it with
            // the exception symbol returned from our lookup.
            else {
                previousStart = previousSymbol.start
                break
            }
        }
        const start = previousStart || lookup.symbol.start

        return SignatureContext.create(
            documentContext.document.getText({ start, end: lookup.symbol.range.end }),
            position,
            start
        )
    }
    else {
        return SignatureContext.create(
            documentContext.document.getText(lookup.symbol.range),
            position,
            lookup.symbol.start
        )
    }
}

async function handleDocumentContext(resolve: (value: DocumentContext | undefined) => void): Promise<void> {
    const instrument = await instrumentPromise
    if (instrument === undefined) {
        return resolve(undefined)
    }

    const settings = await settingsPromise
    const textDocumentItem = await textDocumentItemPromise

    const documentContext = (new DocumentContext(textDocumentItem, instrument.set, settings)).initialParse()

    initializationErrors.push(...documentContext.symbolTable.diagnostics)
    connection.sendNotification(ErrorNotification, {
        uri,
        diagnostics: initializationErrors
    })

    resolve(documentContext)
}

async function handleInstrument(resolve: (value: Instrument | undefined) => void): Promise<void> {
    const shebang = await shebangPromise
    const settings = await settingsPromise

    const loaded = await load(shebang, settings.suggestions.hideInputEnumerations)

    if (loaded.diagnostic !== undefined) {
        initializationErrors.push(loaded.diagnostic)
        connection.sendNotification(ErrorNotification, {
            uri,
            diagnostics: initializationErrors
        })
    }
    else if (loaded.instrument !== undefined) {
        return resolve(loaded.instrument)
    }

    return resolve(undefined)
}

async function handleShebang(resolve: (value: Shebang) => void): Promise<void> {
    const documentItem = await textDocumentItemPromise
    const firstLine = firstlineRegExp.exec(documentItem.text)[0]
    const tokenized = Shebang.tokenize(firstLine)

    initializationErrors.push(...tokenized[1])
    connection.sendNotification(ErrorNotification, {
        uri,
        diagnostics: initializationErrors
    })

    resolve(tokenized[0])
}

async function requestSettings(resolve: (value: TsplangSettings) => void): Promise<void> {
    try {
        const reply = await connection.sendRequest(TsplangSettingsRequest, undefined)
        resolve(reply)
    }
    catch (e) {
        console.log(e)
        connection.dispose()
        process.abort()
    }
}

async function requestTextDocumentItem(resolve: (value: TextDocumentItem) => void): Promise<void> {
    try {
        const reply = await connection.sendRequest(TextDocumentItemRequest, undefined)
        resolve(reply)
    }
    catch (e) {
        console.log(e)
        connection.dispose()
        process.abort()
    }
}
