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
import { TspLexer, TspListener, TspParser } from './tsp'

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

    exitStatement(context: TspParser.StatementContext): void {
        if (context.exception !== null) {
            return
        }

        this.globals = this.getCompletionsFromContext(context)
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
        completions: Array<InstrumentCompletionItem>;
        name: string;
    } => {
        const getMatchingCompletionIndex = function(
            search: Array<InstrumentCompletionItem>,
            label: string,
            domains: Array<string>,
            root: boolean = false
        ): number {
            return search.findIndex((value: InstrumentCompletionItem): boolean => {
                if (root) {
                    // Root namespace items match the prefix text AND have no data.
                    return (value.label.localeCompare(label) === 0 && value.data === undefined)
                }

                // Check that the labels match
                if (value.label.localeCompare(label) !== 0) {
                    return false
                }

                // Perform quick data field comparisons
                if (value.data === undefined
                        || value.data.domains.length !== domains.length) {
                    return false
                }

                // Compare each item.
                for (let j = 0; j < domains.length; j++) {
                    const valueDomainItem = value.data.domains[j]
                    if (valueDomainItem.localeCompare(domains[j]) !== 0) {
                        return false
                    }
                }

                return true
            })
        }

        let result: Array<InstrumentCompletionItem> | undefined

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

        result = this.globals.get(prefixName.symbol.text)

        if (result === undefined) {
            result = new Array()
        }

        const existingRootIndex = getMatchingCompletionIndex(result, prefixName.symbol.text, [], true)

        // If we have a root namespace in the array...
        if (existingRootIndex !== -1) {
            // ...then update the completion kind to be a "table".
            result[existingRootIndex].kind = CompletionItemKind.Module
        }
        else {
            // ...else create a new root namespace item.
            result.push({
                kind: CompletionItemKind.Module,
                label: prefixName.symbol.text
            })
        }

        let i = -1
        const suffix = context.suffix()
        for (const suffixItem of suffix) {
            // Located at the start of the loop so it do not have to appear before every loop
            // control keyword.
            i++

            // Result is guaranteed to have an item
            const lastItem = (i === 0 && existingRootIndex !== -1) ? result[existingRootIndex] : result.pop()

            if (lastItem === undefined) {
                // Catastrophic failure
                return {
                    completions: [],
                    name: ''
                }
            }

            // Create this suffix's namespace
            const domains = new Array<string>(lastItem.label)
            if (lastItem.data !== undefined) {
                domains.push(...lastItem.data.domains)
            }

            const objectCall = suffixItem.objectCall()
            if (objectCall !== null) {
                const callName = objectCall.NAME()
                if (callName !== null) {
                    if (i !== 0) {
                        result.push(lastItem)
                    }

                    const existingCallItemIndex = getMatchingCompletionIndex(result, callName.symbol.text, domains)

                    // If we found a matching completion...
                    if (existingCallItemIndex !== -1) {
                        // ...then update the existing completion to be a function.
                        result[existingCallItemIndex].kind = CompletionItemKind.Function
                    }
                    else {
                        // ...else create a new function call suffix item.
                        result.push({
                            data: { domains },
                            kind: CompletionItemKind.Function,
                            label: callName.symbol.text
                        })
                    }
                }
                else {
                    lastItem.kind = CompletionItemKind.Function
                    if (i === 0 && existingRootIndex !== -1) {
                        result[existingRootIndex].kind = lastItem.kind
                    }
                    else {
                        result.push(lastItem)
                    }
                }

                // Do not process any more suffixes/indices.
                break
            }

            if (i !== 0) {
                result.push(lastItem)
            }

            const index = suffixItem.index()
            if (index === null) {
                continue
            }

            const indexName = index.NAME()
            if (indexName === null) {
                continue
            }

            // If this is not the last suffix of if there is a final index then it is a table.
            const kind = (i !== (suffix.length - 1) || context.index() !== null)
                ? CompletionItemKind.Module
                : CompletionItemKind.Field

            const existingSuffixItemIndex = getMatchingCompletionIndex(result, indexName.symbol.text, domains)

            // If we found a matching completion...
            if (existingSuffixItemIndex !== -1) {
                // ...then update the existing completion.
                result[existingSuffixItemIndex].kind = kind
            }
            else {
                // ...else create a new suffix item.
                result.push({
                    kind,
                    data: { domains },
                    label: indexName.symbol.text
                })
            }
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
        const finalDomains = (penultimateItem.kind === CompletionItemKind.Module)
            ? new Array<string>(penultimateItem.label)
            : new Array<string>()
        if (penultimateItem.data !== undefined) {
            finalDomains.push(...penultimateItem.data.domains)
        }

        result.push(penultimateItem)

        const existingFinalIndexItemIndex = getMatchingCompletionIndex(result, finalIndexName.symbol.text, finalDomains)

        // If we found a matching completion...
        if (existingFinalIndexItemIndex !== -1) {
            // ...then update the existing completion to be a field.
            result[existingFinalIndexItemIndex].kind = CompletionItemKind.Field
        }
        else {
            // ...else create a new index item.
            result.push({
                data: { domains: finalDomains },
                kind: CompletionItemKind.Field,
                label: finalIndexName.symbol.text
            })
        }

        return {
            completions: result,
            name: prefixName.symbol.text
        }
    }
}
