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

import { ParserRuleContext } from 'antlr4'
// tslint:disable-next-line:no-submodule-imports
import { TerminalNode } from 'antlr4/tree/Tree'

export function getTerminals(
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
