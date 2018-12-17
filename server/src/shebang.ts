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

import { Model } from './model'

/**
 * Valid shebang example:
 *
 * --#!2450;node[1]=2636;node[11]=2461
 */
export interface Shebang {
    master: Model
    nodes?: Map<number, Model>
    text: string
}
export namespace Shebang {
    export const PREFIX = '--#!'
    export const MAX_NODE_NUMBER = 64
    export const SEPARATOR = ';'
    const nodeAssignmentOp = '='
    const shebangRegExp = new RegExp('^\\s*'.concat(Shebang.PREFIX))
    const nodeRegExp = new RegExp(
        '^\\s*node\\s*\\[\\s*([-+]?[0-9]{1,2})\\s*\\]\\s*'.concat(nodeAssignmentOp, '\\s*(.+)')
    )

    export function tokenize(line: string): Shebang {
        // Test that the line begins with a shebang prefix.
        if (!shebangRegExp.test(line)) {
            // Resolve to Lua completions should no shebang line exist.
            return {
                master: Model.LUA,
                text: line
            }
        }

        // Remove the prefix and split on the separator.
        const rawBangArray = line.replace(shebangRegExp, '').trim().split(Shebang.SEPARATOR)

        // Drop all empty string entries.
        const bangArray = rawBangArray.filter((value: string) => value.length > 0)

        const result: Shebang = { master: undefined, text: line }

        for (const item of bangArray) {
            const niceItem = item.toLowerCase().trim()

            // Check for the required master model.
            if (result.master === undefined) {
                const supportedModel = Model.fromString(niceItem)

                if (supportedModel === undefined) {
                    throw new Error(`Model "${item.trim()}" is an invalid or unsupported model.`)
                }

                result.master = supportedModel
            }
            else if (nodeRegExp.test(niceItem)) {
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
                    throw new Error(`Node ${nodeNumber} has already been used.`)
                }

                // If the node number is out of bounds.
                if (nodeNumber < 1 || nodeNumber > Shebang.MAX_NODE_NUMBER) {
                    throw new Error(
                        `Node number ${nodeNumber} is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
                    )
                }

                const supportedNodeModel = Model.fromString(nodeModel)

                // If the specified model is invalid.
                if (supportedNodeModel === undefined) {
                    // If we have made it this far, we can be assured that we have an assignment operator.
                    // But if not, the whole node assignment will be placed in the error message. (Because
                    // lastIndexOf returns -1 on not found and string.slice(0) returns the original string.)
                    const originalModelString = item.slice(item.lastIndexOf(nodeAssignmentOp) + 1)

                    throw new Error(`Model "${originalModelString}" is an invalid or unsupported model.`)
                }

                // Instantiate the node Map if we have not done so already.
                if (result.nodes === undefined) {
                    result.nodes = new Map()
                }

                result.nodes.set(nodeNumber, supportedNodeModel)
            }
            else {
                // Ignore trailing separators.
                if (niceItem.localeCompare('') === 0) {
                    continue
                }

                throw new Error(`Invalid node expression "${item}".`)
            }
        }

        return result
    }
}
