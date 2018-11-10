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

import { TspParser } from 'antlr4-tsplang'
import { CompletionItemKind, Position } from 'vscode-languageserver'

import { DocumentCompletionContext } from '../documentContext'

export function getVariableCompletions(context: TspParser.VariableContext): Array<DocumentCompletionContext> {
    // Only handle cases where variables are on the left-hand side of a statement.
    // The context.parent.parent check serves as protection against any future grammar changes.
    if (! (context.parentCtx instanceof TspParser.VariableListContext)
            || ! (context.parentCtx.parentCtx instanceof TspParser.StatementContext)) {
        return []
    }

    //  variable  --{1}-->  NAME
    const nameContext = context.NAME()
    if (nameContext !== null) {
        return [{
            completion: {
                kind: CompletionItemKind.Variable,
                label: nameContext.symbol.text
            },
            // Only suggest variables on the line after their declaration.
            position: Position.create(nameContext.symbol.line + 1, 0)
        }]
    }

    const result = new Array<DocumentCompletionContext>()

    //  variable  --{0}-->  prefix
    const prefixContext = context.prefix()
    if (prefixContext === null) {
        // If we've made it here, then we matched against <prefix suffix* index>.
        // If we don't have a prefix, then assume we have a syntax error.
        return []
    }

    //  variable  --{1}-->  prefix  --{0}-->  NAME
    //                              --{1}-->  expression
    const prefixNameTerminal = prefixContext.NAME()
    if (prefixNameTerminal === null) {
        // We're only performing static analysis and the expression must be evaluated to get the correct object.
        return []
    }

    let lastCompletion: DocumentCompletionContext = {
        completion: {
            // Because is this a prefix, it is guaranteed to have indices, thus making it a table.
            kind: CompletionItemKind.Module,
            label: prefixNameTerminal.symbol.text
        },
        // Only suggest variables on the line after their declaration.
        position: Position.create(prefixNameTerminal.symbol.line + 1, 0)
    }
    result.push(lastCompletion)

    //  variable  -{1,n}->  suffix
    const suffixContext = context.suffix()
    while (suffixContext.length > 0) {
        // Process suffixes in increasing order of depth.
        const suffixItem = suffixContext.shift()

        // Skip empty array items.
        if (suffixItem === undefined) {
            continue
        }

        // Create this suffix's domain starting from the previous label.
        const suffixDomains = new Array<string>(lastCompletion.completion.label)
        // If the last completion item has data, then we want that too.
        if (lastCompletion.completion.data !== undefined) {
            suffixDomains.push(...lastCompletion.completion.data.domains)
        }

        //  variable  -{1,n}->  suffix  --{1}-->  objectCall
        const objectCallContext = suffixItem.objectCall()
        if (objectCallContext !== null) {
            //  variable  -{1,n}->  suffix  --{1}-->  objectCall  --{1}-->  NAME
            const objectCallNameTerminal = objectCallContext.NAME()
            if (objectCallNameTerminal !== null) {
                // This new completion is a function since it matches <':' NAME args>.
                // Example:
                //  a:b().c = 1
                //  a:b{}.c = 1
                //  a:b'arg'.c = 1

                lastCompletion = {
                    completion: {
                        data: { domains: suffixDomains },
                        kind: CompletionItemKind.Function,
                        label: objectCallNameTerminal.symbol.text
                    },
                    // Only suggest variables on the line after their declaration.
                    position: Position.create(objectCallNameTerminal.symbol.line + 1, 0)
                }
                result.push(lastCompletion)
            }
            //  variable  -{1,n}->  suffix  --{1}-->  objectCall  --{0}-->  NAME
            //                                                    --{1}-->  args
            else {
                // The last completion was a function since we only match <args>.
                // Example:
                //  a.b().c = 1
                //  a.b{}.c = 1
                //  a.b'arg'.c = 1

                result[result.length - 1].completion.kind = CompletionItemKind.Function
            }

            // Don't process anything after a function call since it doesn't apply to this context.
            break
        }

        //  variable  -{1,n}->  suffix  --{0}-->  index
        const suffixIndexContext = suffixItem.index()
        if (suffixIndexContext === null) {
            // If we've made it here, then we didn't have an objectCall. (See previous break.)
            // If we don't have an objectCall, then we must have an index.
            // If we don't have an index, then assume we have a syntax error.
            return []
        }

        //  variable  -{1,n}->  suffix  --{1}-->  index  --{0}-->  NAME
        //                                               --{1}-->  expression
        const suffixIndexNameTerminal = suffixIndexContext.NAME()
        if (suffixIndexNameTerminal === null) {
            // We're only performing static analysis and the expression must be evaluated to get the object at the
            // correct index, so just return our current result.
            return result
        }

        // If this isn't the last suffix OR there is a final index, then it's a table; otherwise it's a field.
        const suffixIndexKind = (suffixContext.length !== 0 || context.index() !== null)
            ? CompletionItemKind.Module
            : CompletionItemKind.Field

        lastCompletion = {
            completion: {
                data: { domains: suffixDomains },
                kind: suffixIndexKind,
                label: suffixIndexNameTerminal.symbol.text
            },
            // Only suggest variables on the line after their declaration.
            position: Position.create(suffixIndexNameTerminal.symbol.line + 1, 0)
        }
        result.push(lastCompletion)
    }

    //  variable  --{0}-->  index
    const indexContext = context.index()
    if (indexContext === null) {
        // If we've made it here, then we matched against <prefix suffix* index>.
        // If we don't have an index, then assume we have a syntax error.
        return []
    }

    //  variable  --{1}-->  index  --{0}-->  NAME
    //                             --{1}-->  expression
    const indexNameTerminal = indexContext.NAME()
    if (indexNameTerminal === null) {
        // We're only performing static analysis and the expression must be evaluated to get the object at the
        // correct index, so just return our current result.
        return result
    }

    // Create this index's domain starting from the previous label (if the last completion was a table).
    const indexDomains: Array<string> = (lastCompletion.completion.kind === CompletionItemKind.Module)
        ? new Array(lastCompletion.completion.label)
        : new Array()
    // If the last completion item has data, then we want that too.
    if (lastCompletion.completion.data !== undefined) {
        indexDomains.push(...lastCompletion.completion.data.domains)
    }

    result.push({
        completion: {
            data: { domains: indexDomains },
            kind: CompletionItemKind.Field,
            label: indexNameTerminal.symbol.text
        },
        // Only suggest variables on the line after their declaration.
        position: Position.create(indexNameTerminal.symbol.line + 1, 0)
    })

    return result
}

/**
 * Returns undefined when an invalid context occurs.
 */
export function isVariableMultiline(context: TspParser.VariableContext): boolean | undefined {
    //  variable  --{1}-->  NAME
    const nameContext = context.NAME()
    if (nameContext !== null) {
        return false
    }

    //  variable  --{0}-->  prefix
    const prefixContext = context.prefix()
    if (prefixContext === null) {
        return
    }

    //  variable  --{0}-->  index
    const indexContext = context.index()
    if (indexContext === null) {
        return
    }

    return prefixContext.start.line !== indexContext.stop.line
}
