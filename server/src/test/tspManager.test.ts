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

// describe('TspManager', () => {
//     const settings = TsplangSettings.defaults()
//     const documents = new TextDocuments()
//     const manager = new TspManager(documents)
//     const registeredUnmanagedUri = 'file://registered-unmanaged.tsp'
//     const registeredUnmanaged = vsls.TextDocument.create(registeredUnmanagedUri, 'tsp', 1, '')
//     const unregisteredUri = 'file://unregistered.tsp'

//     describe('#register()', () => {
//         before('Register with TspManager Only', () => {
//             documents.set(registeredUnmanagedUri, registeredUnmanaged)
//             manager.register(registeredUnmanagedUri, settings)
//             documents.delete(registeredUnmanagedUri)
//         })

//         it('throws an error when the document has already been registered', () => {
//             expect(() => { manager.register(registeredUnmanagedUri, settings) })
//                 .to.throw(`${registeredUnmanagedUri} is already registered`)
//         })

//         it('throws an error when the document manager does not have the URI', () => {
//             if (manager.has(registeredUnmanagedUri)) {
//                 manager.unregister(registeredUnmanagedUri)
//             }

//             expect(() => { manager.register(registeredUnmanagedUri, settings) })
//                 .to.throw(`unable to fetch ${registeredUnmanagedUri} from the document manager`)
//         })
//     })

//     describe('#unregister()', () => {
//         it('returns false if the TspManager does not contain the URI', () => {
//             expect(manager.unregister(unregisteredUri)).to.be.false
//         })
//     })

//     describe('#update()', () => {

//         before('Register with TspManager Only', () => {
//             documents.set(registeredUnmanagedUri, registeredUnmanaged)
//             manager.register(registeredUnmanagedUri, settings)
//             documents.delete(registeredUnmanagedUri)
//         })

//         it('throws an error when TspManager does not contain the URI', () => {
//             expect(() => { manager.update(unregisteredUri) })
//                 .to.throw(`${unregisteredUri} is not registered`)
//         })

//         it('throws an error when the document manager does not have the URI', () => {
//             expect(() => { manager.update(registeredUnmanagedUri) })
//                 .to.throw(`unable to fetch ${registeredUnmanagedUri} from the document manager`)
//         })
//     })
// })
