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
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies
import { MarkupKind } from 'vscode-languageserver'

import { MarkupContent } from '../../decorators'

describe('Decorators', () => {
    describe('MarkupContent', () => {
        describe('#kind', () => {
            it('is of kind MarkupKind.Markdown', () => {
                expect(MarkupContent``.kind).to.be.equal(MarkupKind.Markdown)
            })
        })

        describe('#value', () => {
            it('is an empty string when passed an empty template string', () => {
                expect(MarkupContent``.value).to.be.empty

                expect(MarkupContent`${''}`.value).to.be.empty

                expect(MarkupContent`${NaN}`.value).to.be.empty
            })

            it('is not an empty string when passed a template string with content', () => {
                expect(MarkupContent` `.value).to.not.be.empty

                expect(MarkupContent`${'foo'}`.value).to.not.be.empty

                expect(MarkupContent`${Number.EPSILON}`.value).to.not.be.empty
            })
        })
    })
})
