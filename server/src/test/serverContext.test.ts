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
// tslint:disable:no-implicit-dependencies no-import-side-effect no-unused-expression
import { expect } from 'chai'
import 'mocha'
// tslint:enable:no-implicit-dependencies
import * as vsls from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from '../decorators'
import { Model } from '../model'
import { ServerContext } from '../serverContext'
import { SuggestionSortKind, TsplangSettings } from '../settings'
import { TspItem } from '../tspItem'
import { TspManager } from '../tspManager'

import './fixtures/tspManager.fixture'
import './fixtures/vscode-languageserver.fixture'

class TextDocuments extends vsls.TextDocuments {
    private _docs: Map<string, vsls.TextDocument>

    constructor() {
        super()

        this._docs = new Map()
    }

    all(): Array<vsls.TextDocument> {
        return [...this._docs.values()]
    }

    delete(uri: string): boolean {
        return this._docs.delete(uri)
    }

    get(uri: string): vsls.TextDocument | undefined {
        return this._docs.get(uri)
    }

    set(uri: string, document: vsls.TextDocument): void {
        this._docs.set(uri, document)
    }
}

// describe('ServerContext', () => {
//     const connection: vsls.IConnection = vsls.createConnection(
//         new vsls.IPCMessageReader(process),
//         new vsls.IPCMessageWriter(process)
//     )
//     const diagnostics = new Map<string, Array<vsls.Diagnostic>>()
//     const documents = new TextDocuments()
//     const manager = new TspManager(documents)
//     const messages = new Array<string>()
//     const registeredUris = new Array<string>()
//     const unregisteredUri = 'file://unknown.tsp'
//     const unmanagedDocumentUri = 'file://unmanaged.tsp'
//     const basicDocumentUri = 'file://basicDocument.tsp'
//     const basicSignaturesUri = 'file://basicSignatures.tsp'
//     const basicCompletionsUri = 'file://basicCompletions.tsp'
//     const nodeRegistrantUri = 'file://nodeRegistrant.tsp'
//     const badShebangUri = 'file://badShebang.tsp'

//     connection.console.log = (message: string): void => {
//         messages.push(message)
//     }
//     connection.sendDiagnostics = (params: vsls.PublishDiagnosticsParams): void => {
//         diagnostics.set(params.uri, params.diagnostics)
//     }

//     let serverContext: ServerContext

//     before('Instantiate', () => {
//         serverContext = new ServerContext()

//         const unmanagedDocument = vsls.TextDocument.create(unmanagedDocumentUri, 'tsp', 1, '')
//         documents.set(unmanagedDocumentUri, unmanagedDocument)

//         const basicDocument = vsls.TextDocument.create(basicDocumentUri, 'tsp', 1, '--#!2460\n')
//         documents.set(basicDocumentUri, basicDocument)
//         manager.register(basicDocumentUri, serverContext.globalSettings)
//         diagnostics.set(basicDocumentUri, [])
//         registeredUris.push(basicDocumentUri)

//         const basicSignatures = vsls.TextDocument.create(basicSignaturesUri, 'tsp', 1, 'assert(,)\nfoo()')
//         documents.set(basicSignaturesUri, basicSignatures)
//         manager.register(basicSignaturesUri, serverContext.globalSettings)
//         diagnostics.set(basicSignaturesUri, [])
//         registeredUris.push(basicSignaturesUri)

//         const basicCompletions = vsls.TextDocument.create(
//             basicCompletionsUri,
//             'tsp',
//             1,
//             '--#!2450\nsmu.measure.limit[1].\nfoo.source'
//         )
//         documents.set(basicCompletionsUri, basicCompletions)
//         manager.register(basicCompletionsUri, serverContext.globalSettings)
//         diagnostics.set(basicCompletionsUri, [])
//         registeredUris.push(basicCompletionsUri)

//         const nodeRegistrant = vsls.TextDocument.create(
//             nodeRegistrantUri,
//             'tsp',
//             1,
//             '--#!2450;node[1]=2460;node[2]=2461\n'
//         )
//         documents.set(nodeRegistrantUri, nodeRegistrant)
//         manager.register(nodeRegistrantUri, serverContext.globalSettings)
//         diagnostics.set(nodeRegistrantUri, [])
//         registeredUris.push(nodeRegistrantUri)

//         const badShebang = vsls.TextDocument.create(badShebangUri, 'tsp', 1, '--#!24\n')
//         documents.set(badShebangUri, badShebang)
//         manager.register(badShebangUri, serverContext.globalSettings)
//         diagnostics.set(badShebangUri, [])
//         registeredUris.push(badShebangUri)

//         connection.listen()
//     })

//     after('Unregister', () => {
//         describe('ServerContext', () => {
//             describe('#onDidClose()', () => {
//                 context('if the document was never registered', () => {
//                     let expectedManagerCount: number

//                     before('Close Unregistered File', () => {
//                         expect(manager.get(unregisteredUri)).to.be.undefined

//                         expectedManagerCount = manager.count()

//                         serverContext.onDidClose({ document: { uri: unregisteredUri } }, connection, manager)
//                     })

//                     it('does not affect TspManager', () => {
//                         expect(manager.count()).to.equal(expectedManagerCount)
//                     })

//                     it('never sent Diagnostics to the Client', () => {
//                         expect(diagnostics.get(unregisteredUri)).to.be.undefined
//                     })
//                 })

//                 context('if the document was registered', () => {
//                     registeredUris.forEach((uri: string) => {
//                         expect(manager.get(uri)).to.not.be.undefined
//                         expect(diagnostics.get(uri)).to.not.be.undefined

//                         serverContext.onDidClose({ document: { uri } }, connection, manager)

//                         it(`unregisters ${uri}`, () => {
//                             expect(manager.get(uri)).to.be.undefined
//                         })

//                         it(`clears all Diagnostics associated with ${uri}`, () => {
//                             expect(diagnostics.get(uri)).to.be.empty
//                         })
//                     })
//                 })
//             })
//         })
//     })

//     describe('#disposable', () => {
//         it('is undefined on instantiation', () => {
//             expect(serverContext.disposable).to.be.undefined
//         })
//     })

//     describe('#globalSettings', () => {
//         it('is a default TsplangSettings object on instantiation', () => {
//             expect(serverContext.globalSettings).to.deep.equal(TsplangSettings.defaults())
//         })
//     })

//     describe('#hasWorkspaceSettings', () => {
//         it('is false on instantiation', () => {
//             expect(serverContext.hasWorkspaceSettings).to.be.false
//         })
//     })

//     describe('#lastCompletionUri', () => {
//         it('is undefined on instantiation', () => {
//             expect(serverContext.lastCompletionUri).to.be.undefined
//         })
//     })

//     describe('#onSignatureHelp()', () => {
//         interface ExpectedSignatureHelp {
//             activeParameter: number
//             signatureLabels: Array<string>
//         }

//         const targetUri = basicSignaturesUri
//         const validTestCases: Array<[vsls.Position, ExpectedSignatureHelp]> = [
//             [{ character: 7, line: 0 }, { activeParameter: 0, signatureLabels: ['assert'] }],
//             [{ character: 8, line: 0 }, { activeParameter: 1, signatureLabels: ['assert'] }],
//         ]
//         const invalidUriPositions: Array<vsls.Position> = [
//             { character: 0, line: 0 },
//             { character: 6, line: 0 },
//             { character: 9, line: 0 },
//             { character: 4, line: 1 },
//         ]

//         it('returns undefined if the TspManager does not have the URI', () => {
//             expect(serverContext.onSignatureHelp(
//                 {
//                     position: { character: 0, line: 0 },
//                     textDocument: { uri: unregisteredUri }
//                 },
//                 manager
//             )).to.be.undefined
//         })

//         validTestCases.forEach(([position, expected]: [vsls.Position, ExpectedSignatureHelp]) => {
//             it('returns the expected SignatureHelp given a valid document position', () => {
//                 const actual = serverContext.onSignatureHelp({ position, textDocument: { uri: targetUri }}, manager)

//                 expect(actual).to.not.be.undefined

//                 expect(actual.activeParameter).to.equal(expected.activeParameter)

//                 const labelArray = new Array<string>()
//                 actual.signatures.forEach((value: SignatureInformation) => {
//                     labelArray.push(SignatureInformation.resolveNamespace(value))
//                 })
//                 expect(labelArray).to.contain.members(expected.signatureLabels)
//             })
//         })

//         invalidUriPositions.forEach((position: vsls.Position) => {
//             it('returns undefined given an invalid document position', () => {
//                 const actual = serverContext.onSignatureHelp({ position, textDocument: { uri: targetUri }}, manager)

//                 expect(actual).to.be.undefined
//             })
//         })
//     })

//     describe('#onCompletion()', () => {
//         const targetUri = basicCompletionsUri
//         const validTestCases: Array<[vsls.Position, Array<string>]> = [
//             [{ character: 3, line: 1 }, ['smu']],
//             [{ character: 11, line: 1 }, ['smu.measure']],
//             [{ character: 17, line: 1 }, ['smu.measure.limit']],
//             [{ character: 21, line: 1 }, [
//                 'smu.measure.limit.audible',
//                 'smu.measure.limit.autoclear',
//                 'smu.measure.limit.clear',
//                 'smu.measure.limit.enable',
//                 'smu.measure.limit.fail',
//                 'smu.measure.limit.high',
//                 'smu.measure.limit.low',
//             ]],
//         ]
//         const invalidUriPositions: Array<vsls.Position> = [
//             { character: 3, line: 2 },
//             { character: 10, line: 2 },
//         ]

//         it('returns undefined if the TspManager does not have the URI', () => {
//             expect(serverContext.onCompletion(
//                 {
//                     position: { character: 0, line: 0 },
//                     textDocument: { uri: unregisteredUri }
//                 },
//                 manager
//             )).to.be.undefined
//         })

//         validTestCases.forEach(([position, expected]: [vsls.Position, Array<string>]) => {
//             it('returns the expected CompletionItems given a valid document position', () => {
//                 const actual = serverContext.onCompletion({ position, textDocument: { uri: targetUri }}, manager)

//                 expect(actual).to.not.be.undefined

//                 const labelArray = new Array<string>()
//                 actual.forEach((value: CompletionItem) => {
//                     labelArray.push(CompletionItem.resolveNamespace(value))
//                 })
//                 expect(labelArray).to.contain.members(expected)
//             })
//         })

//         invalidUriPositions.forEach((position: vsls.Position) => {
//             it('returns all root completions given a invalid document position', () => {
//                 const actual = serverContext.onCompletion({ position, textDocument: { uri: targetUri }}, manager)

//                 expect(
//                     actual,
//                     `failure at  Ln ${position.line + 1}, Col ${position.character + 1}  in  ${targetUri}`
//                 ).to.contain.members(manager.get(targetUri).context.commandSet.completionDepthMap.get(0))
//             })
//         })
//     })

//     describe('#onCompletionResolve()', () => {
//         it('returns the given item when #lastCompletionUri is undefined', () => {
//             const expected: CompletionItem = { label: 'foo' }
//             serverContext.lastCompletionUri = undefined

//             expect(serverContext.onCompletionResolve(expected, manager)).to.deep.equal(expected)
//         })

//         it('returns the given item when TspManager does not have the URI', () => {
//             const expected: CompletionItem = { label: 'foo' }
//             serverContext.lastCompletionUri = unregisteredUri

//             expect(serverContext.onCompletionResolve(expected, manager)).to.deep.equal(expected)
//         })

//         it('populates the CompletionItem.documentation property of a valid completion.', () => {
//             const given: CompletionItem = { label: 'smu.measure.autorangehigh' }
//             serverContext.lastCompletionUri = basicDocumentUri
//             const result = serverContext.onCompletionResolve(given, manager)

//             expect(result.documentation).to.not.be.undefined
//             expect(result.documentation).to.not.be.empty
//         })
//     })

//     describe('#onDidChangeConfiguration()', () => {
//         context('when #hasWorkspaceSettings is false', () => {
//             it('sets #globalSettings to default when the tsplang property is undefined', () => {
//                 serverContext.globalSettings = { enumerationSuggestions: SuggestionSortKind.BOTTOM }
//                 serverContext.hasWorkspaceSettings = false

//                 serverContext.onDidChangeConfiguration(
//                     { settings: { tsplang: undefined } },
//                     connection,
//                     documents,
//                     manager
//                 )

//                 expect(serverContext.globalSettings).to.deep.equal(TsplangSettings.defaults())
//             })

//             it('sets #globalSettings to the given settings', () => {
//                 const expected: TsplangSettings = { enumerationSuggestions: SuggestionSortKind.TOP }
//                 serverContext.globalSettings = { enumerationSuggestions: SuggestionSortKind.INLINE }
//                 serverContext.hasWorkspaceSettings = false

//                 serverContext.onDidChangeConfiguration(
//                     { settings: { tsplang: expected } },
//                     connection,
//                     documents,
//                     manager
//                 )

//                 expect(serverContext.globalSettings).to.deep.equal(expected)
//             })
//         })

//         // XXX: These tests don't actually get the current workspace configuration.
//         //      Because we're not in a proper workspace, calling `connection.workspace.getConfiguration`
//         //      returns a rejected promise. However, we don't propagate the error and just continue on
//         //      our merry way, using the settings values set before the `getConfiguration` call.
//         context('when #hasWorkspaceSettings is true', () => {
//             before('Change all settings', () => {
//                 documents.all().forEach((document: vsls.TextDocument) => {
//                     const tspItem = manager.get(document.uri)

//                     if (tspItem !== undefined) {
//                         tspItem.context.settings = {
//                             enumerationSuggestions: SuggestionSortKind.TOP
//                         }
//                     }
//                 })
//             })

//             it('sets all registered document settings to default when the tsplang property is undefined', () => {
//                 serverContext.hasWorkspaceSettings = true

//                 serverContext.onDidChangeConfiguration(
//                     { settings: { tsplang: undefined } },
//                     connection,
//                     documents,
//                     manager
//                 )

//                 documents.all().forEach((document: vsls.TextDocument) => {
//                     const tspItem = manager.get(document.uri)

//                     if (tspItem !== undefined) {
//                         expect(
//                             tspItem.context.settings,
//                             `failed to change the settings for ${document.uri}`
//                         ).to.deep.equal(TsplangSettings.defaults())
//                     }
//                 })
//             })

//             it('sets all registered document settings to the given settings', () => {
//                 const expected: TsplangSettings = { enumerationSuggestions: SuggestionSortKind.BOTTOM }
//                 serverContext.hasWorkspaceSettings = true

//                 serverContext.onDidChangeConfiguration(
//                     { settings: { tsplang: expected } },
//                     connection,
//                     documents,
//                     manager
//                 )

//                 documents.all().forEach((document: vsls.TextDocument) => {
//                     const tspItem = manager.get(document.uri)

//                     if (tspItem !== undefined) {
//                         expect(
//                             tspItem.context.settings,
//                             `failed to change the settings for ${document.uri}`
//                         ).to.deep.equal(expected)
//                     }
//                 })
//             })
//         })
//     })

//     describe('#onInitialize()', () => {
//         const expected: vsls.InitializeResult = {
//             capabilities: {
//                 completionProvider: {
//                     resolveProvider: true,
//                     triggerCharacters: ['.']
//                 },
//                 signatureHelpProvider: {
//                     triggerCharacters: [',', '(']
//                 },
//                 textDocumentSync: vsls.TextDocumentSyncKind.Full
//             }
//         }
//         let actual: vsls.InitializeResult

//         before('Call #onInitialize()', () => {
//             actual = serverContext.onInitialize(
//                 { capabilities: { workspace: { configuration: true } } },
//                 connection,
//                 documents
//             )
//         })

//         it('logs a connection initialized message', () => {
//             expect(messages.length).to.equal(1)
//             expect(messages.pop()).to.equal('tsplang connection initialized')
//         })

//         it('sets #hasWorkspaceSettings', () => {
//             expect(serverContext.hasWorkspaceSettings).to.be.true
//         })

//         it('returns expected Capabilities', () => {
//             expect(actual).to.deep.equal(expected)
//         })
//     })

//     describe('#onInitialized()', () => {
//         it('does not set #disposable if #hasWorkspaceSettings is false', () => {
//             expect(serverContext.disposable).to.be.undefined

//             serverContext.hasWorkspaceSettings = false
//             serverContext.onInitialized(connection)

//             expect(serverContext.disposable).to.be.undefined
//         })

//         it('sets #disposable if #hasWorkspaceSettings is true', () => {
//             expect(serverContext.disposable).to.be.undefined

//             serverContext.hasWorkspaceSettings = true
//             serverContext.onInitialized(connection)

//             expect(serverContext.disposable).to.not.be.undefined
//         })
//     })

//     describe('#onDidChangeContent()', () => {
//         context('if the document is registered', () => {
//             context('if the edit contains errors', () => {
//                 const targetUri = basicSignaturesUri
//                 let previousMasterModel: Model
//                 let previousDiagnosticCount: number

//                 before('Apply Target Edits & Call #onDidChangeContent', () => {
//                     previousMasterModel = manager.get(targetUri).shebang.master
//                     previousDiagnosticCount = diagnostics.get(targetUri).length

//                     let currentDoc = documents.get(targetUri)
//                     currentDoc = vsls.TextDocument.create(
//                         currentDoc.uri,
//                         currentDoc.languageId,
//                         currentDoc.version,
//                         vsls.TextDocument.applyEdits(currentDoc, [
//                             {
//                                 newText: '--#!2460\n',
//                                 range: {
//                                     end: { character: 0, line: 0 },
//                                     start: { character: 0, line: 0 },
//                                 }
//                             }
//                         ])
//                     )
//                     currentDoc = vsls.TextDocument.create(
//                         currentDoc.uri,
//                         currentDoc.languageId,
//                         currentDoc.version,
//                         vsls.TextDocument.applyEdits(currentDoc, [
//                             {
//                                 newText: '\nabort = 1\n',
//                                 range: {
//                                     end: { character: Number.MAX_VALUE, line: Number.MAX_VALUE },
//                                     start: { character: Number.MAX_VALUE, line: Number.MAX_VALUE },
//                                 }
//                             }
//                         ])
//                     )
//                     documents.set(targetUri, currentDoc)

//                     serverContext.onDidChangeContent({ document: { uri: targetUri } }, connection, manager)
//                 })

//                 it('updates a previously registered document', () => {
//                     expect(manager.get(targetUri).shebang.master).to.not.equal(previousMasterModel)
//                 })

//                 it('returns Diagnostic messages', () => {
//                     expect(diagnostics.get(targetUri).length).to.not.equal(previousDiagnosticCount)
//                 })
//             })

//             context('if the document already contained errors', () => {
//                 const targetUri = badShebangUri
//                 let previousTspItem: TspItem
//                 let previousDiagnostics: Array<vsls.Diagnostic>

//                 before('Call #onDidChangeContent', () => {
//                     previousTspItem = manager.get(targetUri)
//                     previousDiagnostics = diagnostics.get(targetUri)

//                     serverContext.onDidChangeContent({ document: { uri: targetUri } }, connection, manager)
//                 })

//                 it('retains its state if no text was changed', () => {
//                     expect(manager.get(targetUri)).to.deep.equal(previousTspItem)
//                 })

//                 it('returns the same Diagnostic messages', () => {
//                     expect(diagnostics.get(targetUri)).to.contain.members(previousDiagnostics)
//                 })
//             })
//         })

//         context('if the document is not registered', () => {
//             interface DocumentProperties {
//                 content: string
//                 errors: number
//                 workspaceSettings: boolean
//             }

//             const testCases = new Map<string, DocumentProperties>([
//                 [
//                     'file://newFileWithError.tsp',
//                     {
//                         content: '--#!2450;node[1]=24\nfs = {}\n',
//                         errors: 2,
//                         workspaceSettings: false
//                     }
//                 ],
//                 [
//                     'file://newFile.tsp',
//                     {
//                         content: '--#!2461\na, display.lightstate, c = 1, display.STATE_BLACKOUT, 3\n',
//                         errors: 0,
//                         workspaceSettings: true
//                     }
//                 ]
//             ])

//             before('Create New Documents & Call #onDidChangeContent', () => {
//                 testCases.forEach((properties: DocumentProperties, uri: string) => {
//                     const newDoc = vsls.TextDocument.create(uri, 'tsp', 1, properties.content)
//                     documents.set(uri, newDoc)
//                     serverContext.hasWorkspaceSettings = properties.workspaceSettings

//                     serverContext.onDidChangeContent({ document: { uri } }, connection, manager)
//                 })
//             })

//             after('Close All Created Documents', () => {
//                 testCases.forEach((_: DocumentProperties, uri: string) => {
//                     serverContext.onDidClose({ document: { uri } }, connection, manager)
//                     documents.delete(uri)
//                 })
//             })

//             testCases.forEach((properties: DocumentProperties, uri: string) => {
//                 it(`registered ${uri}`, () => {
//                     expect(manager.has(uri)).to.be.true
//                 })

//                 it(`registered ${uri} without modifying its content`, () => {
//                     expect(manager.get(uri).context.document.getText()).to.equal(properties.content)
//                 })

//                 it(`returned the expected number of diagnostics for ${uri}`, () => {
//                     expect(diagnostics.get(uri).length).to.equal(properties.errors)
//                 })
//             })
//         })
//     })
// })
