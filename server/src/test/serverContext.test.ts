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

import { SignatureInformation } from '../decorators'
import { ServerContext } from '../serverContext'
import { TsplangSettings } from '../settings'
import { TspManager } from '../tspManager'

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
    const documents = new TextDocuments()
    const manager = new TspManager(documents)
    const messages = new Array<string>()
    let serverContext: ServerContext

    before('Instantiate', () => {
        connection.console.log = (message: string): void => {
            messages.push(message)
        }

        serverContext = new ServerContext()

        const doc1Uri = 'file://document1.tsp'
        const document1 = vsls.TextDocument.create(doc1Uri, 'tsp', 1, '--#!2450\n')

        documents.set(doc1Uri, document1)
        manager.register(doc1Uri, serverContext.globalSettings)

        const doc2Uri = 'file://signatureDoc.tsp'
        const signatureDoc = vsls.TextDocument.create(doc2Uri, 'tsp', 1, 'assert(,)\nfoo()')

        documents.set(doc2Uri, signatureDoc)
        manager.register(doc2Uri, serverContext.globalSettings)
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

        const targetUri = 'file://signatureDoc.tsp'
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
                    textDocument: { uri: 'file://unknown.tsp' }
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
