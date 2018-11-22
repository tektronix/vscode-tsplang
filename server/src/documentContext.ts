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

import { TspLexer, TspListener, TspParser } from '../antlr4-tsplang'

import { isPartialMatch } from './completionProcessor'
import { CommandSet } from './instrument'
import { InstrumentCompletionItem, InstrumentSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from './instrument/provider'
import { getVariableCompletions } from './rule-handler'

export interface DocumentCompletionContext {
    completion: InstrumentCompletionItem
    position: Position
}

interface ExclusiveContext {
    completions: Array<InstrumentCompletionItem>
    text?: string
}

function getTerminals(
    context: ParserRuleContext,
    predicate?: (value: TerminalNode, matches: Array<TerminalNode>) => boolean
): Array<TerminalNode> {
    const recurse = (current: ParserRuleContext, terminals: Array<TerminalNode>): Array<TerminalNode> => {
        let result = new Array<TerminalNode>(...terminals)

        for (let i = 0; i < current.getChildCount(); i++) {
            const child = current.getChild(i)

            if (child instanceof TerminalNode) {
                if (predicate === undefined || predicate(child, new Array(...result))) {
                    result.push(child)
                }
            }

            if (child instanceof ParserRuleContext) {
                result = recurse(child, result)
            }
        }

        return result
    }

    return recurse(context, [])
}

function getFuzzyOffsets(document: TextDocument, fromOffset: number): Array<number> {
    // Excluding the given offset, match all horizontal whitespace.
    const forwardMatches = document.getText().slice(fromOffset).match(/^[ \t]+/)

    // No matches were found.
    if (forwardMatches === null) {
        return new Array<number>()
    }

    const match = forwardMatches.shift()

    if (match === undefined) {
        return new Array<number>()
    }

    const result = new Array<number>()

    for (let i = 0; i < match.length; i++) {
        result.push(fromOffset + i + 1)
    }

    return result
}

/**
 * Get an Exclusive Completion offset Map for the given context and command set.
 * @param context The StatementContext to parse for Exclusive Completions.
 * @param commandSet The set of available commands to match variables against.
 * @param document The current document. Used to perform manual RegExp parsing
 * and offset conversion.
 * @returns An Exclusive Completion offset Map of <offset, ExclusiveContext>.
 */
function getExclusiveAssignmentCompletions(
    context: TspParser.StatementContext,
    commandSet: CommandSet,
    document: TextDocument
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

    // Keyed on the index of the variable with completions from the command set.
    // Think of it like partial results.
    const candidates = new Map<number, ExclusiveContext>()

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

        for (const item of commandSet.completions) {
            // If the candidate matches an instrument completion item.
            if (candidateText.localeCompare(resolveCompletionNamespace(item)) === 0) {
                // The item should have a data.types property with content.
                if (item.data !== undefined
                        && item.data.types !== undefined
                        && item.data.types.length > 0) {
                    candidates.set(i, {
                        completions: item.data.types
                    })
                    break
                }
            }
        }
    }

    const assignmentTerminal = context.children.find((value: ParserRuleContext | TerminalNode) => {
        return value instanceof TerminalNode && value.symbol.text.localeCompare('=') === 0
    })

    // Give up if our predicate is undefined or a ParserRuleContext.
    if (assignmentTerminal === undefined || assignmentTerminal instanceof ParserRuleContext) {
        return
    }

    // Create an array of TerminalNodes containing only those we care about.
    const expListTerminals = getTerminals(expListContext, (value: TerminalNode, matches: Array<TerminalNode>) => {
        const last = matches.pop()

        // The first TerminalNode must be on the same line as the assignment operator.
        if (last === undefined) {
            return value.symbol.line === assignmentTerminal.symbol.line
        }

        // Accept any TerminalNode that resides on the same line as the last item.
        if (value.symbol.line === last.symbol.line) {
            return true
        }

        // Accept any LONGSTRING that ends on the same line if this value is an expression
        // list separator (,).
        if (last.symbol.text.startsWith('[[') && last.symbol.text.endsWith(']]')) {
            const endingLine = document.positionAt(last.symbol.stop).line + 1
            if (value.symbol.line === endingLine && value.symbol.text.localeCompare(',') === 0) {
                return true
            }
        }

        /* NOTE
            Doesn't support Lua code with multi-line comments in the middle
            of expression lists.
        */

        return false
    })

    const validTextRegexp = new RegExp(/^[ \t]*[a-zA-Z0-9\[\].]+/)

    // An empty array of expressionList TerminalNodes means we only have an equals sign.
    if (expListTerminals.length === 0) {
        // Try to get the value of the first mapped key.
        const exclusiveContext = candidates.get(candidates.keys().next().value)

        if (exclusiveContext === undefined) {
            return
        }

        let exclusiveOffset = assignmentTerminal.symbol.stop + 1

        // Get any text following the equals sign that didn't make it into this
        // expression due to an EOF.
        // Example:
        //      display.lightstate = display.<EOF>
        const remainingText = document.getText().slice(exclusiveOffset)
        const matches = remainingText.match(validTextRegexp)

        if (matches !== null) {
            const orphanedText = matches.shift()

            if (orphanedText !== undefined) {
                exclusiveOffset += orphanedText.length
                exclusiveContext.text = orphanedText.trim()
            }
        }

        return new Map([[exclusiveOffset, exclusiveContext]])
    }

    // Keyed on the index of the expressionList where the TerminalNodes were found.
    const terminalSets = new Map<number, Array<TerminalNode>>()

    let commaCount = 0
    expListTerminals.forEach((value: TerminalNode, index: number, array: Array<TerminalNode>) => {
        if (value.symbol.text.localeCompare(',') !== 0) {
            const currentSet = terminalSets.get(commaCount) || new Array<TerminalNode>()
            currentSet.push(value)
            terminalSets.set(commaCount, currentSet)
        }
        else {
            commaCount++

            // If this comma is the last TerminalNode, then add this comma.
            if (index + 1 === array.length) {
                terminalSets.set(commaCount, new Array(value))
            }

            // If this comma is immediately followed by another comma, then add this comma.
            const nextValue = array[index + 1]
            if (nextValue !== undefined && nextValue.symbol.text.localeCompare(',') === 0) {
                terminalSets.set(commaCount, new Array(value))
            }
        }
    })

    // Drop all TerminalNode sets whose keys don't appear in the set of completion candidates.
    for (const key of terminalSets.keys()) {
        if (!candidates.has(key)) {
            terminalSets.delete(key)
        }
    }

    const result = new Map<number, ExclusiveContext>()

    // Complete any partial candidate results.
    for (const [key, partial] of candidates.entries()) {
        // Try to get all terminals within the same comma offset as our variable candidate.
        const terminals = terminalSets.get(key)
        if (terminals === undefined) {
            continue
        }

        // If the only terminal is a comma.
        if (terminals.length === 1 && terminals[0].symbol.text.localeCompare(',') === 0) {
            let exclusiveOffset = terminals[0].symbol.stop + 1

            // Get any text following the comma that didn't make it into this
            // expression due to an EOF.
            // Example:
            //      a, display.lightstate = 1, display.<EOF>
            const remainingText = document.getText().slice(exclusiveOffset)
            const matches = remainingText.match(validTextRegexp)

            if (matches !== null) {
                const orphanedText = matches.shift()

                if (orphanedText !== undefined) {
                    exclusiveOffset += orphanedText.length
                    partial.text = orphanedText.trim()
                }
            }

            result.set(exclusiveOffset, partial)
            continue
        }

        // Concatenate the text of all TerminalNodes in this set.
        let terminalText = ''
        terminals.forEach((value: TerminalNode) => {
            terminalText += value.symbol.text
        })

        // Try to get the last TerminalNode so we can use its stop offset.
        const lastTerminal = terminals.pop()
        if (lastTerminal === undefined) {
            continue
        }

        // Keep the text undefined if the string is empty.
        partial.text = (terminalText.length === 0) ? undefined : terminalText

        result.set(lastTerminal.symbol.stop + 1, partial)
    }

    return (result.size !== 0) ? result : undefined
}

function getExclusiveParameterCompletions(
    context: TspParser.FunctionCallContext,
    commandSet: CommandSet,
    document: TextDocument
): Map<number, ExclusiveContext> | undefined {
    // No signatures means no exclusive completions.
    if (commandSet.signatures.length === 0) {
        return
    }

    //  functionCall  --{1}-->  objectCall  --{1}-->  ':' NAME
    if (context.objectCall().NAME() !== null) {
        return
    }

    const argsContext = context.objectCall().args()

    //  functionCall  --{1}-->  objectCall  --{1}-->  args  --{1}-->  tableConstructor
    if (argsContext.tableConstructor() !== null) {
        return
    }

    //  functionCall  --{1}-->  objectCall  --{1}-->  args  --{1}-->  string
    if (argsContext.string() !== null) {
        return
    }

    // TODO
    //  1st Param: the stop offset of the open parenthesis.
    //       text: the text of expression 1.
    //  2nd Param: the stop offset of comma 1.
    //       text: the text of expression 2.
    //  ...
    //  Nth Param: the stop offset of comma N-1 OR the start offset of the close parenthesis.
    //       text: the text of expression N.
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
    readonly document: TextDocument
    private content: string
    /** Map<offset, [exclusive completions]> */
    private exclusives: Map<number, ExclusiveContext>
    /** Map<valid exclusive offset, exclusives offset key> */
    private fuzzyOffsets: Map<number, number>
    private globals: Map<string, Array<DocumentCompletionContext>>
    private lexer: TspLexer
    private parser: TspParser
    private parseTree: ParserRuleContext

    constructor(commandSet: CommandSet, document: TextDocument) {
        super()

        this.commandSet = commandSet
        this.document = document

        this.update('')
    }

    exitStatement(context: TspParser.StatementContext): void {
        const newExclusives = getExclusiveAssignmentCompletions(context, this.commandSet, this.document)

        if (newExclusives !== undefined) {
            for (const key of newExclusives.keys()) {
                getFuzzyOffsets(this.document, key).forEach((value: number) => {
                    this.fuzzyOffsets.set(value, key)
                })
            }
        }

        if (newExclusives !== undefined) {
            for (const [k, v] of newExclusives) {
                this.exclusives.set(k, v)
            }

            return
        }

        if (context.exception !== null) {
            return
        }

        //  statement  --{1}-->  functionCall
        const functionCallContext = context.functionCall()
        if (functionCallContext !== null) {
            const newParameterExclusives = getExclusiveParameterCompletions(
                functionCallContext,
                this.commandSet,
                this.document
            )

            if (newParameterExclusives !== undefined) {
                for (const key of newParameterExclusives.keys()) {
                    getFuzzyOffsets(this.document, key).forEach((value: number) => {
                        this.fuzzyOffsets.set(value, key)
                    })
                }

                for (const [k, v] of newParameterExclusives) {
                    this.exclusives.set(k, v)
                }
            }
        }

        this.globals = this.getCompletionsFromContext(context)
    }

    getCompletionItems(cursor: Position): Array<InstrumentCompletionItem> {
        let offset = this.document.offsetAt(cursor)

        if (!this.exclusives.has(offset)) {
            offset = this.fuzzyOffsets.get(offset) || offset
        }

        // Get available exclusive completion items.
        const exclusiveContext = this.exclusives.get(offset)

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
                if (this.document.offsetAt(completion.position) < this.document.offsetAt(cursor)) {
                    result.push(completion.completion)
                }
            }
        }

        return result
    }

    update(content: string): void {
        this.content = content
        this.exclusives = new Map()
        this.fuzzyOffsets = new Map()
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
