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

/*
    Example valid shebang line:
        --#!2450 node[1]=2636 node[11]=2461
*/
export namespace Shebang {
    export const prefix = '--#!'
    export const maxNodeNumber = 64
    const separator = ';'
    const nodeAssignmentOp = '='

    export interface ShebangToken {
        model: Model
        node?: number
    }

    const shebangRegexp: RegExp = new RegExp(
        '^'.concat(prefix)
    )

    const nodeRegexp: RegExp = new RegExp(
        '^\\s*node\\[[0-9]{1,2}\\]\\s*'.concat(
            nodeAssignmentOp,
            '\\s*.+'
        )
    )

    export async function tokenize(line: string): Promise<Array<ShebangToken>> {
        return new Promise<Array<ShebangToken>>((
            resolve: (value?: Array<ShebangToken>) => void,
            reject: (reason?: Error) => void
        ): void => {
            let bangline: string = line.toLowerCase()
            const results: Array<ShebangToken> = new Array()

            // check for required shebang
            if (shebangRegexp.test(bangline)) {
                // remove shebang if it exists
                bangline = bangline.replace(shebangRegexp, '').trim()
            }
            else {
                reject(new Error('No \"' + prefix + '\" detected on the first line of the file.'))

                return
            }

            const splitBangline: Array<string> = bangline.split(separator)
            const usedNodeNums: Array<number> = new Array()

            for (const item of splitBangline) {
                // check for required master model
                if (results.length === 0) {
                    const thisModel: Model = Model.fromString(item.trim())

                    // check for instrument support
                    if (thisModel === undefined) {
                        reject(new Error('Model \"' + item.trim() + '\" is not a valid or supported model.'))

                        return
                    }

                    // add match to output array
                    results.push({model: thisModel})
                }
                else if (results.length >= 1 && nodeRegexp.test(item)) {
                    // get the node number
                    const splitRegExp: RegExp = new RegExp(
                        '[\\[|\\]|'.concat(nodeAssignmentOp, ']')
                    )
                    // split on either '[' or ']' or NodeAssignmentOp
                    const splitstr = item.split(splitRegExp)

                    // ignore item 0, just get the contents of the square brackets:
                    const nodeNum: number = parseInt(splitstr[1].trim(), 10)
                    /* TODO: resolve usage of magic number */
                    // tslint:disable-next-line:no-magic-numbers
                    const nodeModel: Model = Model.fromString(splitstr[3].trim())
                    // the nodeNum and nodeModel can be retrieved from indices because the form of the
                    // string is known (from the nodeRegexp.test(item) line)

                    // check if nodeNum is an integer between 1 and 64 (inclusive) that hasn't been
                    // used before. If it doesn't fit any of those things, ignore this item and move on.
                    if (nodeNum % 1 !== 0
                        || usedNodeNums.indexOf(nodeNum) !== -1
                        || nodeNum < 1
                        || nodeNum > maxNodeNumber
                        || nodeModel === undefined) {
                        continue
                    }
                    results.push({model: nodeModel, node: nodeNum})
                    usedNodeNums.push(nodeNum)
                }
                else {
                    // item is after the model number, but is not a node assignment. Ignore it.
                    continue
                }
            }

            resolve(results)
        })
    }
}
