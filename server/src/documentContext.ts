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
import { ParseTreeWalker } from 'antlr4/tree/Tree'
import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

import { TspLexer, TspListener, TspParser } from './tsp'

export class DocumentContext extends TspListener {
    readonly uri: string
    private content: string
    private globals: Map<string, CompletionItem>
    private lexer: TspLexer
    private parser: TspParser
    private parseTree: ParserRuleContext
    private scopeDepth: number

    constructor(uri: string, content: string) {
        super()

        this.uri = uri
        this.globals = new Map()
        this.scopeDepth = 0

        this.update(content)
    }

    enterBlock(context: TspParser.BlockContext): void {
        this.scopeDepth++
    }

    exitBlock(context: TspParser.BlockContext): void {
        this.scopeDepth--
    }

    exitStatement(context: TspParser.StatementContext): void {
        // Add global variable completions.
        const varlist = context.variableList()

        if (varlist === null) {
            return
        }

        const newGlobals = new Map<string, CompletionItem>()
        const variables = varlist.variable()
        variables.forEach((variable: TspParser.VariableContext): void => {
            const name = variable.NAME()

            if (name === null) {
                return
            }

            // If we have a prefix or suffix or index, then skip this variable
            if (variable.prefix() !== null || variable.suffix().length !== 0 || variable.index() !== null) {
                return
            }

            newGlobals.set(name.getText(), {
                kind: CompletionItemKind.Variable,
                label: name.getText()
            })
        })

        this.globals = new Map([...this.globals, ...newGlobals])
    }

    getCompletionItems(): Array<CompletionItem> {
        const result = new Array<CompletionItem>()
        result.push(...this.getGlobalCompletionItems())

        return result
    }

    update(content: string): void {
        this.content = content
        this.globals = new Map()

        this.lexer = new TspLexer(new InputStream(this.content))
        this.parser = new TspParser(new CommonTokenStream(this.lexer))
        this.parser.buildParseTrees = true

        this.parseTree = this.parser.chunk()
    }

    walk(): void {
        ParseTreeWalker.DEFAULT.walk(this, this.parseTree)
    }

    private getGlobalCompletionItems(): Array<CompletionItem> {
        return Array.from(this.globals.values())
    }

    // private isGlobalFunction = (context: TspParser.StatContext | TspParser.AssignmentContext): boolean => {
    //     if (context instanceof TspParser.StatContext) {
    //         return (context.funcname() !== null && context.funcbody() !== null)
    //     }
    //     else {
    //         // Perform a local lookup to see if the variable is listed
    //     }
    // }
}
