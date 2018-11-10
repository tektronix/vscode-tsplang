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
import { ErrorNodeImpl, ParseTreeWalker, TerminalNode } from 'antlr4/tree/Tree'
import { CompletionItemKind, Position, TextDocument } from 'vscode-languageserver'

import { isPartialMatch } from './completionProcessor'
import { CommandSet } from './instrument'
import { InstrumentCompletionItem, resolveCompletionNamespace } from './instrument/provider'
import { getVariableCompletions, isVariableMultiline } from './rule-handler'
import { TspLexer, TspListener, TspParser } from './tsp'

export interface DocumentCompletionContext {
    completion: InstrumentCompletionItem
    position: Position
}

interface ExclusiveContext {
    completions: Array<InstrumentCompletionItem>
    text?: string
}

function getStartLine(node: ParserRuleContext | TerminalNode): number {
    return (node instanceof ParserRuleContext) ? node.start.line : node.symbol.line
}

/**
 * Handles the +1 when returning the start offset from the tree item.
 */
function getStartOffset(node: ParserRuleContext | TerminalNode): number {
    return ((node instanceof ParserRuleContext) ? node.start.start : node.symbol.start) + 1
}

/**
 * Handles the +1 when returning the stop offset from the tree item.
 */
function getStopOffset(node: ParserRuleContext | TerminalNode): number {
    return ((node instanceof ParserRuleContext) ? node.stop.stop : node.symbol.stop) + 1
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

        // const commaStopOffsets = new Array<number>()
        // expListContext.children.forEach((value: ParserRuleContext | TerminalNode): void => {
        //     if (value instanceof TerminalNode && value.getText().localeCompare(',') === 0) {
        //         commaStopOffsets.push(value.symbol.stop + 1)
        //     }
        // })

        /**
         * Only returns the previous parse tree item if there is an ErrorNode in the given context.
         */
        const getPrevious = (
            from: ParserRuleContext
        ): ParserRuleContext | TerminalNode | undefined => {
            if (from.getChildCount() === 0) {
                return
            }

            // If the first child of the expression is an ErrorNode
            if (from.getChild(0) instanceof ErrorNodeImpl) {
                // If i is zero, then get the equals sign from context
                // instead of the last expression.
                if (i === 0) {
                    return context.children.find(
                        (value: ParserRuleContext | TerminalNode) => value instanceof TerminalNode
                    )
                }
                // Use the ending position of the last expression.
                else {
                    return expressions[i - 1]
                }
            }
            else {
                // Descend until we hit a TerminalNode or an ErrorNode.
                return getPrevious(from.getChild(0))
            }
        }

        // If there is one expression per variable.
        if (variables.length === 1 || variables.length === expressions.length) {
            const expression = expressions[i]

            // Empty array item check.
            if (expression === undefined) {
                continue
            }

            const node = getPrevious(expression)

            if (node === undefined) {
                // If there is only 1 variable, then check to see that the expression starts
                // on the same line as the variable.
                if (variables.length === 1) {
                    const variable = variables[0]

                    // Empty array item check.
                    if (variable === undefined) {
                        continue
                    }

                    let invalidVariable = false
                    // expression  --{1}-->  value  --{1}-->  variable
                    const valueContext = expression.value()
                    if (valueContext !== null) {
                        const variableContext = valueContext.variable()
                        if (variableContext !== null) {
                            const multilineResult = isVariableMultiline(variableContext)
                            invalidVariable = (multilineResult || multilineResult === undefined)
                        }
                    }

                    if (expression.start.line === variable.stop.line) {
                        // Covers the case where...
                        //  display.lightstate = display.<COMPLETION REQUEST>
                        //  a = 1
                        // becomes...
                        // expression  --{1}-->  value  --{1}-->  variable  --{1}-->  prefix = display
                        //                                                  --{1}-->  index  = a
                        let partialText = expression.getText().split('.').shift()
                        if (partialText !== undefined) {
                            partialText = partialText.concat('.')
                        }

                        const offset = (partialText !== undefined)
                            ? getStartOffset(expression) + (partialText.length - 1)
                            : getStopOffset(expression)

                        // Just use the current expression and its text.
                        result.set(offset, {
                            completions: itemDataTypes,
                            text: (invalidVariable && partialText !== undefined) ? partialText : expression.getText()
                        })
                    }
                    else {
                        // Use the equal sign from context instead of the last expression.
                        const equals = context.children.find(
                            (value: ParserRuleContext | TerminalNode) => value instanceof TerminalNode
                        )

                        if (equals === undefined) {
                            continue
                        }

                        result.set(getStopOffset(equals), {
                            completions: itemDataTypes
                        })
                    }
                }

                continue
            }

            result.set(getStopOffset(node), {
                completions: itemDataTypes
            })
        }
        // Else use whatever expression follows comma i+1.
        else {
            let commaCount = 0
            let previousTerminal: TerminalNode | undefined
            for (const item of expListContext.children) {
                if (commaCount === i) {
                    // If this is a context, then ensure that we're not about to run
                    // into an ErrorNode.
                    // If there is an ErrorNode, then try to get the last tree item.
                    if (item instanceof ParserRuleContext) {
                        const node = getPrevious(item)

                        if (node !== undefined) {
                            result.set(getStopOffset(node), {
                                completions: itemDataTypes,
                                // text: node.getText()
                            })

                            break
                        }
                    }

                    // Covers the case where...
                    //  a, display.lightstate = 1,<COMPLETION REQUEST>
                    //  b = 2
                    // becomes...
                    //                 --{1}-->  expression  --{1}-->  value  --{1}-->  number   = 1
                    // expressionList  --{1}-->  ','
                    //                 --{1}-->  expression  --{1}-->  value  --{1}-->  variable = b
                    if (previousTerminal !== undefined && previousTerminal.symbol.line !== getStartLine(item)) {
                        result.set(previousTerminal.symbol.stop + 1, {
                            completions: itemDataTypes
                        })
                    }

                    let invalidVariable = false
                    if (item instanceof TspParser.ExpressionContext) {
                        // item  --{1}-->  value  --{1}-->  variable
                        const valueContext = item.value()
                        if (valueContext !== null) {
                            const variableContext = valueContext.variable()
                            if (variableContext !== null) {
                                const multilineResult = isVariableMultiline(variableContext)
                                invalidVariable = (multilineResult || multilineResult === undefined)
                            }
                        }
                    }

                    // Covers the case where...
                    //  display.lightstate = display.<COMPLETION REQUEST>
                    //  a = 1
                    // becomes...
                    // item  --{1}-->  value  --{1}-->  variable  --{1}-->  prefix = display
                    //                                            --{1}-->  index  = a
                    let partialText = item.getText().split('.').shift()
                    if (partialText !== undefined) {
                        partialText = partialText.concat('.')
                    }

                    const offset = (partialText !== undefined)
                        ? getStartOffset(item) + (partialText.length - 1)
                        : getStopOffset(item)

                    result.set(offset, {
                        completions: itemDataTypes,
                        text: (invalidVariable && partialText !== undefined) ? partialText : item.getText()
                    })

                    break

                    // const exclusiveContext: ExclusiveContext = {
                    //     completions: itemDataTypes
                    // }

                    // let position: number
                    // if (item instanceof ParserRuleContext) {
                    //     exclusiveContext.text = item.getText()
                    //     // TODO: we may have to dive into item.children to figure
                    //     // out where the first ErrorNode ends. (ErrorNode.symbol.stop)
                    //     position = item.stop.stop + 1
                    // }
                    // else {
                    //     position = item.symbol.stop + 1
                    // }

                    // result.set(position, exclusiveContext)
                    // break
                }

                if (item instanceof TerminalNode) {
                    previousTerminal = item

                    if (item.getText().localeCompare(',') === 0) {
                        commaCount++
                    }
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
            for (const [k, v] of newExclusives) {
                this.exclusives.set(k, v)
            }

            return
        }

        if (context.exception !== null) {
            return
        }

        this.globals = this.getCompletionsFromContext(context)
    }

    getCompletionItems(document: TextDocument, cursor: Position): Array<InstrumentCompletionItem> {
        const offset = document.offsetAt(cursor) - 1
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
            else {
                return exclusiveContext.completions
            }

            if (exclusiveResult.length > 0) {
                return exclusiveResult
            }
        }

        const result = new Array<InstrumentCompletionItem>(...this.commandSet.completions)

        // Add globals to the list of available instrument completions.
        for (const context of this.globals.values()) {
            for (const completion of context) {
                // If this completion is located before the cursor.
                if (document.offsetAt(completion.position) < document.offsetAt(cursor)) {
                    result.push(completion.completion)
                }
            }
        }

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
