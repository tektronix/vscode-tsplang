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
import { CompletionItemKind, Position, TextDocument } from 'vscode-languageserver'

import { isPartialMatch } from './completionProcessor'
import { CommandSet } from './instrument'
import { InstrumentCompletionItem, resolveCompletionNamespace } from './instrument/provider'
import { getVariableCompletions } from './rule-handler'
import { TspLexer, TspListener, TspParser } from './tsp'

export interface DocumentCompletionContext {
    completion: InstrumentCompletionItem
    position: Position
}

interface ExclusiveContext {
    completions: Array<InstrumentCompletionItem>
    text?: string
}

/**
 * Returns the first matching completion or undefined should no match exist.
 */
function getExclusiveCompletions(
    context: TspParser.StatementContext,
    commandSet: CommandSet
): Map<number, ExclusiveContext> | undefined {
    //  statement  --{0}-->  variableList
    const varlistContext = context.variableList()
    if (varlistContext === null) {
        return
    }

    //  statement  --{0}-->  expressionList
    const expListContext = context.expressionList()
    if (expListContext === null) {
        return
    }

    const result = new Map<number, ExclusiveContext>()

    const variables = varlistContext.variable()
    for (let i = 0; i < variables.length; i++) {
        const candidate = variables[i]

        // Empty array item check.
        if (candidate === undefined) {
            continue
        }

        // Candidates should have at least a prefix and an index contexts.
        if (candidate.prefix() === null || candidate.index() === null) {
            continue
        }

        const candidateText = candidate.getText()

        const itemDataTypes = new Array<InstrumentCompletionItem>()

        for (const item of commandSet.completions) {
            const completionText = resolveCompletionNamespace(item)

            // If the candidate matches an instrument completion item.
            if (candidateText.localeCompare(completionText) === 0) {
                // The item should have a data.types property.
                if (item.data !== undefined && item.data.types !== undefined) {
                    itemDataTypes.push(...item.data.types)
                    break
                }
            }
        }

        if (itemDataTypes.length === 0) {
            continue
        }

        const expressions = expListContext.expression()

        // Get the document offset of the location where exclusive completions can be requested.

        // If there is one expression per variable.
        if (variables.length === expressions.length) {
            const expression = expressions[i]

            // Empty array item check.
            if (expression === undefined) {
                continue
            }

            result.set(expression.stop.stop + 1, {
                completions: itemDataTypes,
                text: expression.getText()
            })
            continue
        }
        // Else use whatever expression follows comma i+1.
        else {
            let commaCount = 0
            for (const item of expressions) {
                if (commaCount === i) {
                    const exclusiveContext: ExclusiveContext = {
                        completions: itemDataTypes
                    }

                    if (item instanceof ParserRuleContext) {
                        exclusiveContext.text = item.getText()
                    }

                    result.set(item.stop.stop + 1, exclusiveContext)
                    break
                }

                if (item instanceof TerminalNode && item.getText().localeCompare(',') === 0) {
                    commaCount++
                }
            }
        }
    }

    return (result.size !== 0) ? result : undefined
}

/**
 * The merge strategy is to accept all incoming changes.
 */
function mergeCompletions(
    incoming: Array<DocumentCompletionContext>,
    current?: Array<DocumentCompletionContext>,
): Array<DocumentCompletionContext> {
    if (current === undefined) {
        return incoming
    }

    // Instantiate a new array object from incoming so our search cost won't increase as we add items.
    const result = new Array<DocumentCompletionContext>(...incoming)

    // for each item in current that's not in incoming, add it to incoming
    while (current.length > 0) {
        const item = current.shift()

        // Skip empty array items.
        if (item === undefined) {
            continue
        }

        const index = incoming.findIndex((value: DocumentCompletionContext): boolean =>
            InstrumentCompletionItem.namespacesEqual(item.completion, value.completion)
        )

        if (index === -1) {
            result.push(item)
        }
    }

    return result
}

export class DocumentContext extends TspListener {
    readonly commandSet: CommandSet
    private content: string
    /** Map<offset, [exclusive completions]> */
    private exclusives: Map<number, ExclusiveContext>
    private globals: Map<string, Array<DocumentCompletionContext>>
    private lexer: TspLexer
    private parser: TspParser
    private parseTree: ParserRuleContext

    constructor(commandSet: CommandSet, content?: string) {
        super()

        this.commandSet = commandSet

        this.update(content)
    }

    // tslint:disable-next-line:prefer-function-over-method
    exitStatement(context: TspParser.StatementContext): void {
        const newExclusives = getExclusiveCompletions(context, this.commandSet)

        if (newExclusives !== undefined) {
            for (const entry of newExclusives) {
                this.exclusives.set(...entry)
            }

            return
        }

        if (context.exception !== null) {
            return
        }

        this.globals = this.getCompletionsFromContext(context)
    }

    getCompletionItems(document: TextDocument, cursor: Position): Array<InstrumentCompletionItem> {
        const offset = document.offsetAt(cursor)
        // Recalculate this Position without trailing whitespace.
        const currentLineText = document.getText({
            end: cursor,
            start: { character: 0, line: cursor.line }
        })
        const trimmedLine = currentLineText.trim()
        const trimmedOffset = document.offsetAt(Position.create(cursor.line, trimmedLine.length))

        // Get available exclusive completion items.
        const exclusiveContext = this.exclusives.get(trimmedOffset)

        if (exclusiveContext !== undefined) {
            const exclusiveResult = new Array<InstrumentCompletionItem>()

            if (exclusiveContext.text !== undefined) {
                for (const completion of exclusiveContext.completions) {
                    if (isPartialMatch(exclusiveContext.text, completion)) {
                        exclusiveResult.push(completion)
                    }
                }
            }

            if (exclusiveResult.length > 0) {
                return exclusiveResult
            }
        }

        const result = new Array<InstrumentCompletionItem>()

        // Add globals to the list of available completions.
        for (const context of this.globals.values()) {
            for (const completion of context) {
                // If this completion is located before the cursor.
                if (document.offsetAt(completion.position) < document.offsetAt(cursor)) {
                    result.push(completion.completion)
                }
            }
        }

        // Add the instrument command set to the list of available completions.
        result.push(...this.commandSet.completions)

        return result
    }

    update(content?: string): void {
        this.content = (content === undefined) ? '' : content
        this.exclusives = new Map()
        this.globals = new Map()

        this.lexer = new TspLexer(new InputStream(this.content))
        this.parser = new TspParser(new CommonTokenStream(this.lexer))
        this.parser.buildParseTrees = true

        this.parseTree = this.parser.chunk()
    }

    walk(): void {
        ParseTreeWalker.DEFAULT.walk(this, this.parseTree)
    }

    private getCompletionsFromContext = (context: ParserRuleContext): Map<string, Array<DocumentCompletionContext>> => {
        const result = new Map<string, Array<DocumentCompletionContext>>()

        const getCompletionsRecursive = (node: ParserRuleContext | TerminalNode): void => {
            if (node instanceof TerminalNode && node.symbol.type === TspLexer.NAME) {
                result.set(node.symbol.text, [{
                    completion: {
                        kind: CompletionItemKind.Variable,
                        label: node.symbol.text
                    },
                    position: Position.create(node.symbol.line, node.symbol.stop)
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

                        const globalName = completion.completion.label
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
