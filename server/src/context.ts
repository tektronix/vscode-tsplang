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

import { ParserRuleContext } from 'antlr4'
import { CompletionItem } from 'vscode-languageserver'

import * as tsp from './tsp'

export class Context {
    readonly uri: string
    private content: string
    private readonly globals: Map<string, CompletionItem>
    private lexer;
    private readonly variableListener: tsp.VariableListener

    constructor(uri: string, content?: string) {
        this.uri = uri
        this.globals = new Map()

        

        this.variableListener = new tsp.VariableListener()

        if (content !== undefined) {
            this.update(content)
        }
    }

    update(content: string): void {
        this.content = content

    }

}
