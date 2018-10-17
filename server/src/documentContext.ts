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

import { CommonTokenStream, InputStream, ParserRuleContext } from 'antlr4'
// tslint:disable-next-line:no-submodule-imports
import { ParseTreeListener, ParseTreeWalker } from 'antlr4/tree/Tree'
import { CompletionItem } from 'vscode-languageserver'

import { TspLexer, TspListener, TspParser } from './tsp'

export class DocumentContext {
    readonly uri: string
    private content: string
    private readonly globals: Map<string, CompletionItem>
    private lexer: TspLexer
    private readonly listener: TspListener
    private parser: TspParser
    private parseTree: ParserRuleContext

    constructor(uri: string, content: string) {
        this.uri = uri
        this.globals = new Map()
        this.listener = new TspListener()

        this.update(content)
    }

    exitVariable = (context: ParserRuleContext): void => {
        console.log('exited a variable')
    }

    getCompletionItems(): Array<CompletionItem> {
        const result = new Array<CompletionItem>()
        result.concat(this.getGlobalCompletionItems())

        return result
    }

    update(content: string): void {
        this.content = content

        this.listener.exitVariable = this.exitVariable

        this.lexer = new TspLexer(new InputStream(this.content))
        this.parser = new TspParser(new CommonTokenStream(this.lexer))
        this.parser.buildParseTrees = true

        this.parseTree = this.parser.chunk()
    }

    walk(): void {
        ParseTreeWalker.DEFAULT.walk(this.listener as unknown as ParseTreeListener, this.parseTree)
    }

    private getGlobalCompletionItems(): Array<CompletionItem> {
        return Array.from(this.globals.values())
    }
}

