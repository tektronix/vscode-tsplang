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
import { CompletionItem, CompletionItemKind } from 'vscode-languageserver'

import { TspLexer, TspListener, TspParser } from './tsp'

export class DocumentContext extends TspListener {
    readonly uri: string
    private content: string
    private globals: Map<string, Array<CompletionItem>>
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
        if (context.exception !== null) {
            return
        }

        this.globals = this.getCompletionsFromContext(context)
    }

    getCompletionItems(): Array<CompletionItem> {
        const result = new Array<CompletionItem>()

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

    private getCompletionsFromContext = (context: ParserRuleContext): Map<string, Array<CompletionItem>> => {
        const result = new Map<string, Array<CompletionItem>>()

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
                    const prefixSuffix = this.getPrefixSuffixCompletions(child)

                    if (prefixSuffix.completions.length > 0) {
                        result.set(prefixSuffix.name, prefixSuffix.completions)
                        continue
                    }
                }

                getCompletionsRecursive(child)
            }
        }
        getCompletionsRecursive(context)

        return result
    }

    private getPrefixSuffixCompletions = (context: TspParser.VariableContext): {
        completions: Array<CompletionItem>;
        name: string;
    } => {
        // TODO: need to perform a lookup to see if the prefixName already exists
        //  in the global map.
        //  If it does, then update that entry accordingly instead of blasting
        //  away the previous group.
        //  Test Code:
        //      a.b = 1
        //      a.c = 2
        //      a.<COMPLETION REQUEST>
        //  Should provide both b and c.

        const result = new Array<CompletionItem>()

        const prefix = context.prefix()
        if (prefix === null) {
            return {
                completions: [],
                name: ''
            }
        }

        const prefixName = prefix.NAME()
        if (prefixName === null) {
            return {
                completions: [],
                name: ''
            }
        }

        result.push({
            kind: CompletionItemKind.Module,
            label: prefixName.symbol.text
        })

        let i = -1
        const suffix = context.suffix()
        for (const suffixItem of suffix) {
            // Located at the start of the loop so it do not have to appear before every loop
            // control keyword.
            i++

            // Result is guaranteed to have an item
            const lastItem = result.pop()

            if (lastItem === undefined) {
                // Catastrophic failure
                return {
                    completions: [],
                    name: ''
                }
            }

            // Create this suffix's namespace
            const data = new Array<string>(lastItem.label)
            if (lastItem.data !== undefined) {
                data.push(...lastItem.data)
            }

            const objectCall = suffixItem.objectCall()
            if (objectCall !== null) {
                const callName = objectCall.NAME()
                if (callName !== null) {
                    result.push(lastItem)
                    result.push({
                        data,
                        kind: CompletionItemKind.Function,
                        label: callName.symbol.text
                    })
                }
                else {
                    lastItem.kind = CompletionItemKind.Function
                    result.push(lastItem)
                }

                // Do not process any more suffixes/indices.
                break
            }

            result.push(lastItem)

            const index = suffixItem.index()
            if (index === null) {
                continue
            }

            const indexName = index.NAME()
            if (indexName === null) {
                continue
            }

            result.push({
                data,
                // If this is not the last suffix then it is a table.
                kind: (i !== (suffix.length - 1)) ?
                    CompletionItemKind.Module :
                    CompletionItemKind.Field,
                label: indexName.symbol.text
            })
        }

        const finalIndex = context.index()
        if (finalIndex === null) {
            return {
                completions: [],
                name: ''
            }
        }

        const finalIndexName = finalIndex.NAME()
        if (finalIndexName === null) {
            return {
                completions: result,
                name: prefixName.symbol.text
            }
        }

        // Result is guaranteed to have an item
        const penultimateItem = result.pop()

        if (penultimateItem === undefined) {
            // Catastrophic failure
            return {
                completions: [],
                name: ''
            }
        }

        // Create this index's namespace
        const finalData = new Array<string>(penultimateItem.label)
        if (penultimateItem.data !== undefined) {
            finalData.push(...penultimateItem.data)
        }

        result.push(penultimateItem)
        result.push({
            data: finalData,
            kind: CompletionItemKind.Field,
            label: finalIndexName.symbol.text
        })

        return {
            completions: result,
            name: prefixName.symbol.text
        }
    }
}
