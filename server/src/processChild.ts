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

import { CommonTokenStream, InputStream, Token } from 'antlr4'
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

import { TspFastLexer } from './antlr4-tsplang'
import { CompletionItem, DocumentSymbol, IToken, Range, ResolvedNamespace, SignatureInformation } from './decorators'
import { DocumentContext } from './documentContext'
import { Instrument, load } from './instrument'
import { StatementType, TokenUtil } from './language-comprehension'
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

let documentContext: DocumentContext | undefined
let firstlineRegExp: RegExp
let initializeErrors = new Array<Diagnostic>()
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
    // TODO: detect shebang additions
    await documentContext

    let shebangEdited = false
    let smallestPosition: Position
    for (const change of changes) {
        console.log(`{
  range: {
    start: ${JSON.stringify(change.range.start)}
      end: ${JSON.stringify(change.range.end)}
  },
  rangeLength: ${change.rangeLength},
  text: "${change.text}"
}`)
        shebangEdited = change.range.start.line === 0 && Shebang.has(textDocumentItem.text)

        if (!shebangEdited) {
            if (smallestPosition === undefined
                || smallestPosition.line > change.range.start.line
                || (smallestPosition.line === change.range.start.line
                    && smallestPosition.character > change.range.start.character)) {
                smallestPosition = change.range.start
            }
        }

        textDocumentItem.text = TextDocument.applyEdits(
            documentContext.document,
            [{
                newText: change.text,
                range: change.range
            }]
        )
        documentContext.document = TextDocument.create(
            textDocumentItem.uri,
            textDocumentItem.languageId,
            textDocumentItem.version,
            textDocumentItem.text
        )
    }

    if (shebangEdited) {
        updateProcessContext({ item: textDocumentItem, settings: documentContext.settings })

        return
    }

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

    return
})

connection.onNotification(SettingsNotification, (received: TsplangSettings) => {
    settings = received
    if (documentContext) {
        documentContext.settings = received
    }
})

connection.onRequest(
    CompletionRequest,
    async (params: TextDocumentPositionParams): Promise<CompletionList | undefined> => {
        await documentContext

        const symbol = documentContext.symbolTable.lookup(params.position)

        if (symbol === undefined) {
            return { isIncomplete: true, items: documentContext.commandSet.completionDepthMap.get(0) }
        }

        const range = { end: params.position, start: symbol.start }
        const text = documentContext.document.getText(range)
        const lexer = new TspFastLexer(new InputStream(text))
        const results = documentContext.commandSet.suggestCompletions(
            lexer.getAllTokens()
                .filter((value: Token) => value.channel === 0)
                .map((value: Token) => IToken.create(value)),
            symbol.statementType
        )

        if (results.length === 0) {
            // TODO: combine with user completions.
            return { isIncomplete: true, items: documentContext.commandSet.completionDepthMap.get(0) }
        }

        return { isIncomplete: true, items: results }
    }
)

connection.onRequest(CompletionResolveRequest, async (item: CompletionItem): Promise<CompletionItem> => {
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

connection.onRequest(
    SignatureRequest,
    async (params: TextDocumentPositionParams): Promise<SignatureHelp | undefined> => {
        await documentContext

        const symbol = documentContext.symbolTable.lookup(params.position)

        if (symbol === undefined) {
            return
        }

        if (symbol.statementType === StatementType.FunctionCall) {
            const depth = ResolvedNamespace.depth(symbol.name)
            const matchingSignatures = (documentContext.commandSet.signatureDepthMap.get(depth) || []).filter(
                (value: SignatureInformation) => {
                    return SignatureInformation.resolveNamespace(value).localeCompare(symbol.name) === 0
                }
            )

            if (matchingSignatures.length > 0) {
                const range = { end: params.position, start: symbol.start }
                const text = documentContext.document.getText(range)
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

connection.onRequest(SymbolRequest, async (params: ProcessContext): Promise<Array<DocumentSymbol>> => {
    if (textDocumentItem === undefined || instrument === undefined || settings === undefined) {
        await updateProcessContext(params)
    }

    if (documentContext === undefined) {
        // Create the context for this document.
        documentContext = (new DocumentContext(textDocumentItem, instrument.set, settings)).initialParse()
    }

    const diagnostics = documentContext.symbolTable.diagnostics
    diagnostics.push(...initializeErrors)

    connection.sendNotification(ErrorNotification, { diagnostics, uri })

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

async function updateProcessContext(params: ProcessContext): Promise<void> {
    // Store information that a later DocumentContext will require.
    textDocumentItem = params.item
    settings = await Promise.resolve(params.settings)

    if (settings.debug.open.documentInitializationDelay !== null) {
        // tslint:disable-next-line: prefer-const
        let [start, _]: [number, number] = process.hrtime()
        let seconds: number
        do {
            [seconds, _] = process.hrtime([start, _])
        } while (seconds < settings.debug.open.documentInitializationDelay)
    }

    if (firstlineRegExp === undefined) {
        firstlineRegExp = new RegExp(/^[^\n\r]*/)
    }

    const firstLine = firstlineRegExp.exec(textDocumentItem.text)[0];

    [shebang, initializeErrors] = Shebang.tokenize(firstLine)

    let loadDiagnostics: Array<Diagnostic>
    // Try to generate instrument information for this document.
    [instrument, loadDiagnostics] = load(shebang)

    // Collect all diagnostics.
    initializeErrors.push(...loadDiagnostics)

    connection.sendNotification(ErrorNotification, { uri, diagnostics: initializeErrors })
}
