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

import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver'

import { Model } from './model'

interface Assignment {
    model: Model
    range: Range
}

/**
 * Valid shebang example:
 *
 * --#!2450;node[1]=2636;node[11]=2461
 */
export interface Shebang extends Assignment {
    nodes?: Map<number, Assignment>
}
export namespace Shebang {
    export const PREFIX = '--#!'
    export const MAX_NODE_NUMBER = 64
    export const SEPARATOR = ';'
    const nodeAssignmentOp = '='
    const shebangRegExp = new RegExp('^\\s*'.concat(PREFIX))
    const nodeRegExp = new RegExp(
        '^\\s*node\\s*\\[\\s*([-+]?[0-9]{1,2})\\s*\\]\\s*'.concat(nodeAssignmentOp, '\\s*(.+)')
    )

    export interface JSONable extends Assignment {
        nodes?: Array<[string, Assignment]>
    }

    export function deserialize(jsonable: JSONable): Shebang {
        const result: Shebang = {
            model: jsonable.model,
            range: jsonable.range
        }

        if (jsonable.nodes) {
            result.nodes = new Map()

            jsonable.nodes.forEach(([key, value]: [string, Assignment]) => {
                result.nodes.set(Number.parseInt(key), value)
            })
        }

        return result
    }

    function itemRange(item: string, index: number, offset: number): Range {
        const start = PREFIX.length + (SEPARATOR.length * index) + offset

        return {
            end: {
                character: start + item.length,
                line: 0
            },
            start: {
                character: start,
                line: 0
            }
        }
    }

    export function serialize(shebang: Shebang): JSONable {
        const result: JSONable = {
            model: shebang.model,
            range: shebang.range
        }

        if (shebang.nodes) {
            result.nodes = new Array()

            shebang.nodes.forEach((value: Assignment, key: number) => {
                result.nodes.push([key.toString(), value])
            })
        }

        return result
    }

    export function tokenize(line: string): [Shebang, Array<Diagnostic>] {
        // Test that the line begins with a shebang prefix.
        if (!shebangRegExp.test(line)) {
            // Resolve to Lua completions should no shebang line exist.
            return [{ model: Model.LUA, range: Range.create(0, 0, 0, 0)}, []]
        }

        // Remove the prefix and split on the separator.
        const rawBangArray = line.replace(PREFIX, '').split(SEPARATOR)

        const result: Shebang = { model: undefined, range: Range.create(0, 0, 0, Number.MAX_VALUE) }

        const errors: Array<Diagnostic> = new Array()

        let encounteredCharacters = 0
        rawBangArray.forEach((item: string, index: number) => {
            if (item.length === 0) {
                return
            }

            const niceItem = item.toLowerCase().trim()

            if (niceItem.length === 0) {
                return
            }

            // Check for the required master model.
            if (result.model === undefined) {
                const supportedModel = Model.fromString(niceItem)

                if (supportedModel === undefined) {
                    errors.push(Diagnostic.create(
                        itemRange(item, index, encounteredCharacters),
                        `Model "${item.trim()}" is an invalid or unsupported model.`,
                        DiagnosticSeverity.Error,
                        'shebang-model',
                        'tsplang'
                    ))
                }
                else {
                    result.model = supportedModel
                    result.range = itemRange(item, index, encounteredCharacters)
                }
            }
            else if (nodeRegExp.test(niceItem)) {
                let error = false

                // We have already tested that the string matches, so we are safe to type-cast.
                const nodeMatch = niceItem.match(nodeRegExp) as RegExpMatchArray

                // Remove the first element (the full match).
                nodeMatch.shift()

                // We know that there will always be 3 array items:
                //  0) Full match
                //  1) Group 1 (the node number)
                //  2) Group 2 (the assigned model)
                // and we just removed the 0th array item.
                const [nodeNumberString, nodeModel]: Array<string> = nodeMatch

                const nodeNumber = parseInt(nodeNumberString, 10)

                // If we have already defined this node.
                if (result.nodes !== undefined && result.nodes.has(nodeNumber)) {
                    errors.push(Diagnostic.create(
                        itemRange(item, index, encounteredCharacters),
                        `Node ${nodeNumber} has already been used.`,
                        DiagnosticSeverity.Error,
                        'shebang-node-defined',
                        'tsplang'
                    ))

                    error = true
                }

                // If the node number is out of bounds.
                if (nodeNumber < 1 || nodeNumber > MAX_NODE_NUMBER) {
                    errors.push(Diagnostic.create(
                        itemRange(item, index, encounteredCharacters),
                        `Node number ${nodeNumber} is less than 1 or greater than ${MAX_NODE_NUMBER}.`,
                        DiagnosticSeverity.Error,
                        'shebang-node-index',
                        'tsplang'
                    ))

                    error = true
                }

                const model = Model.fromString(nodeModel)

                // If the specified model is invalid.
                if (model === undefined) {
                    // If we have made it this far, we can be assured that we have an assignment operator.
                    // But if not, the whole node assignment will be placed in the error message. (Because
                    // lastIndexOf returns -1 on not found and string.slice(0) returns the original string.)
                    const originalModelString = item.slice(item.lastIndexOf(nodeAssignmentOp) + 1)

                    errors.push(Diagnostic.create(
                        itemRange(item, index, encounteredCharacters),
                        `Model "${originalModelString}" is an invalid or unsupported model.`,
                        DiagnosticSeverity.Error,
                        'shebang-model',
                        'tsplang'
                    ))

                    error = true
                }

                // Instantiate the node Map if we have not done so already.
                if (result.nodes === undefined) {
                    result.nodes = new Map()
                }

                if (!error) {
                    result.nodes.set(nodeNumber, { model, range: itemRange(item, index, encounteredCharacters) })
                }
            }
            else {
                errors.push(Diagnostic.create(
                    itemRange(item, index, encounteredCharacters),
                    `Invalid node expression "${item}".`,
                    DiagnosticSeverity.Error,
                    'shebang-node-expression',
                    'tsplang'
                ))
            }

            encounteredCharacters += item.length
        })

        // Fall back on Lua suggestions if we failed to tokenize a master model.
        if (result.model === undefined) {
            return [{ model: Model.LUA, range: result.range}, errors]
        }

        return [result, errors]
    }
}
