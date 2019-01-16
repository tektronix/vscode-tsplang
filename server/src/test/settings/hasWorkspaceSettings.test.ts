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

import { hasWorkspaceSettings } from '../../settings'
import '../fixtures/vscode-languageserver.fixture'

describe('Settings', () => {
    describe('hasWorkspaceSettings()', () => {
        it('returns false if ClientCapabilities.workspace is undefined', () => {
            expect(hasWorkspaceSettings({})).to.be.false
        })

        it('returns the value of ClientCapabilities.workspace.configuration', () => {
            expect(hasWorkspaceSettings({ workspace: { configuration: true } })).to.be.true
            expect(hasWorkspaceSettings({ workspace: { configuration: false } })).to.be.false
        })
    })
})
