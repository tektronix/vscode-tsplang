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

import * as vscode_ls from 'vscode-languageserver'

import { InstrumentSpec } from '../instrument'

export declare type MarkupContent = vscode_ls.MarkupContent

class MarkupContentClass implements MarkupContent {
    readonly kind: vscode_ls.MarkupKind
    readonly value: string

    constructor(strings: TemplateStringsArray, ...values: Array<string | number>) {
        const result = new Array<string>()

        strings.forEach((str: string) => {
            const value = values.shift() || ''

            result.push(str, value.toString())
        })

        this.kind = vscode_ls.MarkupKind.Markdown
        this.value = result.join('')
    }
}

export function MarkupContent(strings: TemplateStringsArray, ...values: Array<string | number>): MarkupContent {
    return new MarkupContentClass(strings, ...values)
}

export declare type MarkupContentCallback = (spec: InstrumentSpec) => MarkupContent
