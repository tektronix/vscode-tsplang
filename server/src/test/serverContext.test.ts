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
import { ServerContext } from '../serverContext'
import { TsplangSettings } from '../settings'
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

    get(uri: string): vsls.TextDocument | undefined {
        return this._docs.get(uri)
    }

    set(uri: string, document: vsls.TextDocument): void {
        this._docs.set(uri, document)
    }
}

describe('ServerContext', () => {
    const connection: vsls.IConnection = vsls.createConnection(
        new vsls.IPCMessageReader(process),
        new vsls.IPCMessageWriter(process)
    )
    const diagnostics = new Map<string, Array<vsls.Diagnostic>>()
    const documents = new TextDocuments()
    const manager = new TspManager(documents)
    const messages = new Array<string>()
    const registeredUris = new Array<string>()
    const unregisteredUri = 'file://unknown.tsp'
    let serverContext: ServerContext

    before('Instantiate', () => {
        connection.console.log = (message: string): void => {
            messages.push(message)
        }
        connection.sendDiagnostics = (params: vsls.PublishDiagnosticsParams): void => {
            diagnostics.set(params.uri, params.diagnostics)
        }

        serverContext = new ServerContext()

        const basicDocumentUri = 'file://basicDocument.tsp'
        const basicDocument = vsls.TextDocument.create(basicDocumentUri, 'tsp', 1, '--#!2460\n')

        documents.set(basicDocumentUri, basicDocument)
        manager.register(basicDocumentUri, serverContext.globalSettings)
        // XXX: remove once #onDidChangeContent tests have been created
        diagnostics.set(basicDocumentUri, [])
        registeredUris.push(basicDocumentUri)

        const basicSignaturesUri = 'file://basicSignatures.tsp'
        const basicSignatures = vsls.TextDocument.create(basicSignaturesUri, 'tsp', 1, 'assert(,)\nfoo()')

        documents.set(basicSignaturesUri, basicSignatures)
        manager.register(basicSignaturesUri, serverContext.globalSettings)
        // XXX: remove once #onDidChangeContent tests have been created
        diagnostics.set(basicSignaturesUri, [])
        registeredUris.push(basicSignaturesUri)

        const basicCompletionsUri = 'file://basicCompletions.tsp'
        const basicCompletions = vsls.TextDocument.create(
            basicCompletionsUri,
            'tsp',
            1,
            '--#!2450\nsmu.measure.limit[1].\nfoo.source'
        )

        documents.set(basicCompletionsUri, basicCompletions)
        manager.register(basicCompletionsUri, serverContext.globalSettings)
        // XXX: remove once #onDidChangeContent tests have been created
        diagnostics.set(basicCompletionsUri, [])
        registeredUris.push(basicCompletionsUri)
    })

    after('Unregister', () => {
        describe('ServerContext', () => {
            describe('#onDidClose()', () => {
                context('if the document was never registered', () => {
                    let expectedManagerCount: number

                    before('Close Unregistered File', () => {
                        expect(manager.get(unregisteredUri)).to.be.undefined

                        expectedManagerCount = manager.count()

                        serverContext.onDidClose({ document: { uri: unregisteredUri } }, connection, manager)
                    })

                    it('does not affect TspManager', () => {
                        expect(manager.count()).to.equal(expectedManagerCount)
                    })

                    it('never sent Diagnostics to the Client', () => {
                        expect(diagnostics.get(unregisteredUri)).to.be.undefined
                    })
                })

                context('if the document was registered', () => {
                    registeredUris.forEach((uri: string) => {
                        expect(manager.get(uri)).to.not.be.undefined
                        expect(diagnostics.get(uri)).to.not.be.undefined

                        serverContext.onDidClose({ document: { uri } }, connection, manager)

                        it(`unregisters "${uri}"`, () => {
                            expect(manager.get(uri)).to.be.undefined
                        })

                        it('clears all Diagnostics', () => {
                            expect(diagnostics.get(uri)).to.be.empty
                        })
                    })
                })
            })
        })
    })

    describe('#globalSettings', () => {
        it('is a default TsplangSettings object on instantiation', () => {
            expect(serverContext.globalSettings).to.deep.equal(TsplangSettings.defaults())
        })
    })

    describe('#hasWorkspaceSettings', () => {
        it('is false on instantiation', () => {
            expect(serverContext.hasWorkspaceSettings).to.be.false
        })
    })

    describe('#lastCompletionUri', () => {
        it('is undefined on instantiation', () => {
            expect(serverContext.lastCompletionUri).to.be.undefined
        })
    })

    describe('#onCompletion()', () => {
        const targetUri = 'file://basicCompletions.tsp'
        const validTestCases: Array<[vsls.Position, Array<string>]> = [
            [{ character: 3, line: 1 }, ['smu']],
            [{ character: 11, line: 1 }, ['smu.measure']],
            [{ character: 17, line: 1 }, ['smu.measure.limit']],
            [{ character: 21, line: 1 }, [
                'smu.measure.limit.audible',
                'smu.measure.limit.autoclear',
                'smu.measure.limit.clear',
                'smu.measure.limit.enable',
                'smu.measure.limit.fail',
                'smu.measure.limit.high',
                'smu.measure.limit.low',
            ]],
        ]
        const invalidUriPositions: Array<vsls.Position> = [
            { character: 3, line: 2 },
            { character: 10, line: 2 },
        ]

        it('returns undefined if the TspManager does not have the URI', () => {
            expect(serverContext.onCompletion(
                {
                    position: { character: 0, line: 0 },
                    textDocument: { uri: unregisteredUri }
                },
                manager
            )).to.be.undefined
        })

        validTestCases.forEach(([position, expected]: [vsls.Position, Array<string>]) => {
            it('returns the expected CompletionItems given a valid document position', () => {
                const actual = serverContext.onCompletion({ position, textDocument: { uri: targetUri }}, manager)

                expect(actual).to.not.be.undefined

                const labelArray = new Array<string>()
                actual.forEach((value: CompletionItem) => {
                    labelArray.push(CompletionItem.resolveNamespace(value))
                })
                expect(labelArray).to.contain.members(expected)
            })
        })

        invalidUriPositions.forEach((position: vsls.Position) => {
            it('returns all root completions given a invalid document position', () => {
                const actual = serverContext.onCompletion({ position, textDocument: { uri: targetUri }}, manager)

                expect(
                    actual,
                    `failure at  Ln ${position.line + 1}, Col ${position.character + 1}  in  ${targetUri}`
                ).to.contain.members(manager.get(targetUri).context.commandSet.completionDepthMap.get(0))
            })
        })
    })

    describe('#onCompletionResolve()', () => {
        it('returns the given item when #lastCompletionUri is undefined', () => {
            const expected: CompletionItem = { label: 'foo' }
            serverContext.lastCompletionUri = undefined

            expect(serverContext.onCompletionResolve(expected, manager)).to.deep.equal(expected)
        })

        it('returns the given item when TspManager does not have the URI', () => {
            const expected: CompletionItem = { label: 'foo' }
            serverContext.lastCompletionUri = unregisteredUri

            expect(serverContext.onCompletionResolve(expected, manager)).to.deep.equal(expected)
        })

        it('populates the CompletionItem.documentation property of a valid completion.', () => {
            const given: CompletionItem = { label: 'smu.measure.autorangehigh' }
            serverContext.lastCompletionUri = 'file://basicDocument.tsp'
            const result = serverContext.onCompletionResolve(given, manager)

            expect(result.documentation).to.not.be.undefined
            expect(result.documentation).to.not.be.empty
        })
    })

    describe('#onInitialize()', () => {
        const expected: vsls.InitializeResult = {
            capabilities: {
                completionProvider: {
                    resolveProvider: true,
                    triggerCharacters: ['.']
                },
                signatureHelpProvider: {
                    triggerCharacters: [',', '(']
                },
                textDocumentSync: vsls.TextDocumentSyncKind.Full
            }
        }
        let actual: vsls.InitializeResult

        before('call #onInitialize()', () => {
            actual = serverContext.onInitialize(
                { capabilities: { workspace: { configuration: true } } },
                connection,
                documents
            )
        })

        it('logs a connection initialized message', () => {
            expect(messages.length).to.equal(1)
            expect(messages.pop()).to.equal('tsplang connection initialized')
        })

        it('sets #hasWorkspaceSettings', () => {
            expect(serverContext.hasWorkspaceSettings).to.be.true
        })

        it('returns expected Capabilities', () => {
            expect(actual).to.deep.equal(expected)
        })
    })

    describe('#onSignatureHelp()', () => {
        interface ExpectedSignatureHelp {
            activeParameter: number
            signatureLabels: Array<string>
        }

        const targetUri = 'file://basicSignatures.tsp'
        const validTestCases: Array<[vsls.Position, ExpectedSignatureHelp]> = [
            [{ character: 7, line: 0 }, { activeParameter: 0, signatureLabels: ['assert'] }],
            [{ character: 8, line: 0 }, { activeParameter: 1, signatureLabels: ['assert'] }],
        ]
        const invalidUriPositions: Array<vsls.Position> = [
            { character: 0, line: 0 },
            { character: 6, line: 0 },
            { character: 9, line: 0 },
            { character: 4, line: 1 },
        ]

        it('returns undefined if the TspManager does not have the URI', () => {
            expect(serverContext.onSignatureHelp(
                {
                    position: { character: 0, line: 0 },
                    textDocument: { uri: unregisteredUri }
                },
                manager
            )).to.be.undefined
        })

        validTestCases.forEach(([position, expected]: [vsls.Position, ExpectedSignatureHelp]) => {
            it('returns the expected SignatureHelp given a valid document position', () => {
                const actual = serverContext.onSignatureHelp({ position, textDocument: { uri: targetUri }}, manager)

                expect(actual).to.not.be.undefined

                expect(actual.activeParameter).to.equal(expected.activeParameter)

                const labelArray = new Array<string>()
                actual.signatures.forEach((value: SignatureInformation) => {
                    labelArray.push(SignatureInformation.resolveNamespace(value))
                })
                expect(labelArray).to.contain.members(expected.signatureLabels)
            })
        })

        invalidUriPositions.forEach((position: vsls.Position) => {
            it('returns undefined given an invalid document position', () => {
                const actual = serverContext.onSignatureHelp({ position, textDocument: { uri: targetUri }}, manager)

                expect(actual).to.be.undefined
            })
        })
    })
})
