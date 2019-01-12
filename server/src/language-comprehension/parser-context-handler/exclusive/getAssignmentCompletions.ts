/*
 *  Copyright Tektronix Inc.
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

// tslint:disable-next-line:no-submodule-imports
import { TerminalNode } from 'antlr4/tree/Tree'
import { CompletionItemKind, Diagnostic, DiagnosticSeverity, TextDocument } from 'vscode-languageserver'

import { TspParser } from '../../../antlr4-tsplang'
import { CompletionItem, ResolvedNamespace } from '../../../decorators'
import { CommandSet } from '../../../instrument'
import { ExclusiveContext } from '../../exclusive-completion'
import { TokenUtil } from '../../tokenUtil'
import { getTerminals } from '../getTerminals'

export interface AssignmentResults {
    assignments?: Map<number, ExclusiveContext>
    errors: Array<Diagnostic>
}

/**
 * Get an ExclusiveMap for the command set given the components of an assignment context.
 * @param varListContext The variable list of an assignment.
 * @param assignmentTerminal The assignment operator.
 * @param expListContext The expressions being assigned.
 * @param commandSet The set of available commands to match variables against.
 * @param document The current document. Used to perform manual RegExp parsing
 * and offset conversion.
 * @returns An Exclusive Completion offset Map of <offset, ExclusiveContext>.
 */
export function getAssignmentCompletions(
    varListContext: TspParser.VariableListContext,
    assignmentTerminal: TerminalNode,
    expListContext: TspParser.ExpressionListContext,
    commandSet: CommandSet,
    document: TextDocument
): AssignmentResults {
    // Keyed on the index of the variable with completions from the command set.
    // Think of it like partial results.
    const candidates = new Map<number, ExclusiveContext>()
    const errors = new Array<Diagnostic>()

    const variables = varListContext.variable()
    for (let i = 0; i < variables.length; i++) {
        const candidate = variables[i]

        const candidateText = candidate.getText()
        const candidateDepth = ResolvedNamespace.depth(candidateText)

        const completionCandidates = commandSet.completionDepthMap.get(candidateDepth) || []

        // Used to check for whole-item matches.
        const resolvedCandidate = ResolvedNamespace.create(candidateText)

        let hasReservation = false
        // Create an error and skip this variable if it is a reserved word.
        for (const reservation of commandSet.reserved) {
            if (ResolvedNamespace.equal(resolvedCandidate, CompletionItem.resolveNamespace(reservation))) {
                errors.push({
                    code: 'forbidden-name',
                    message: 'Variable name cannot be used in a TSP script.',
                    range: TokenUtil.getRange(candidate.start, candidate.stop),
                    severity: DiagnosticSeverity.Error,
                    source: 'tsplang'
                })

                hasReservation = true
                break
            }
        }

        if (hasReservation) {
            continue
        }

        for (const item of completionCandidates) {
            // If the candidate matches an instrument completion item.
            if (CompletionItem.namespaceMatch(resolvedCandidate, item)) {
                const equal = ResolvedNamespace.equal(resolvedCandidate, CompletionItem.resolveNamespace(item))

                // Make an error the candidate exactly matches this item
                // and if the item is not a Property.
                if (equal && item.kind !== CompletionItemKind.Property) {
                    if (item.kind === CompletionItemKind.Constant) {
                        errors.push({
                            code: 'readonly-assignment',
                            message: 'Cannot set a readonly attribute.',
                            range: TokenUtil.getRange(candidate.start, candidate.stop),
                            severity: DiagnosticSeverity.Error,
                            source: 'tsplang'
                        })

                        continue
                    }

                    let message = 'Cannot reassign a built-in'
                    if (item.kind === CompletionItemKind.EnumMember) {
                        message += ' enumeration'
                    }
                    else if (item.kind === CompletionItemKind.Function) {
                        message += ' function'
                    }
                    else if (item.kind === CompletionItemKind.Module) {
                        message += ' table'
                    }
                    message += '.'

                    errors.push({
                        message,
                        code: 'builtin-assignment',
                        range: TokenUtil.getRange(candidate.start, candidate.stop),
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    })

                    continue
                }

                // The item should have a data.types property with content.
                if (item.data !== undefined && item.data.types !== undefined && item.data.types.length > 0) {
                    candidates.set(i, {
                        completions: item.data.types
                    })
                    break
                }
            }
        }
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
            return { errors }
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

        return {
            errors,
            assignments: new Map<number, ExclusiveContext>([[exclusiveOffset, exclusiveContext]]),
        }
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

    return {
        errors,
        assignments: (result.size !== 0) ? result : undefined
    }
}
