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
import { ParseTreeWalker, TerminalNode } from 'antlr4/tree/Tree'
import { CompletionItemKind } from 'vscode-languageserver'

import { InstrumentCompletionItem } from './instrument/provider'
import { getVariableCompletions } from './rule-handler'
import { TspLexer, TspListener, TspParser } from './tsp'

/**
 * The merge strategy is to accept all incoming changes.
 */
function mergeCompletions(
    incoming: Array<InstrumentCompletionItem>,
    current?: Array<InstrumentCompletionItem>,
): Array<InstrumentCompletionItem> {
    if (current === undefined) {
        return incoming
    }

    // Instantiate a new array object from incoming so our search cost won't increase as we add items.
    const result = new Array<InstrumentCompletionItem>(...incoming)

    // for each item in current that's not in incoming, add it to incoming
    while (current.length > 0) {
        const item = current.shift()

        // Skip empty array items.
        if (item === undefined) {
            continue
        }

        const index = incoming.findIndex((value: InstrumentCompletionItem): boolean =>
            InstrumentCompletionItem.namespacesEqual(item, value)
        )

        if (index === -1) {
            result.push(item)
        }
    }

    return result
}

export class DocumentContext extends TspListener {
    readonly uri: string
    private content: string
    private globals: Map<string, Array<InstrumentCompletionItem>>
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

    // tslint:disable-next-line:prefer-function-over-method
    exitStatement(context: TspParser.StatementContext): void {
        if (context.exception !== null) {
            return
        }

        // this.globals = this.getCompletionsFromContext(context)
    }

    getCompletionItems(): Array<InstrumentCompletionItem> {
        const result = new Array<InstrumentCompletionItem>()

        for (const completions of this.globals.values()) {
            result.push(...completions)
        }

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

    private getCompletionsFromContext = (context: ParserRuleContext): Map<string, Array<InstrumentCompletionItem>> => {
        const result = new Map<string, Array<InstrumentCompletionItem>>()

        const getCompletionsRecursive = (node: ParserRuleContext | TerminalNode): void => {
            if (node instanceof TerminalNode && node.symbol.type === TspLexer.NAME) {
                result.set(node.symbol.text, [{
                    kind: CompletionItemKind.Variable,
                    label: node.symbol.text
                }])
            }

            for (let i = 0; i < node.getChildCount(); i++) {
                const child = node.getChild(i)

                if (child === null) {
                    continue
                }

                if (child instanceof TspParser.VariableContext) {
                    const variableCompletions = getVariableCompletions(child)

                    if (variableCompletions.length > 0) {
                        const completion = variableCompletions[0]

                        if (completion === undefined) {
                            continue
                        }

                        const globalName = completion.label
                        result.set(globalName, mergeCompletions(variableCompletions, this.globals.get(globalName)))
                        continue
                    }
                }

                getCompletionsRecursive(child)
            }
        }
        getCompletionsRecursive(context)

        return result
    }
}
