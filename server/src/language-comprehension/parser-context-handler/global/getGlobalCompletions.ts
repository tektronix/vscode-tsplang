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
import { CompletionItemKind, Position } from 'vscode-languageserver'

import { TspLexer, TspParser } from '../../../../antlr4-tsplang'

import { GlobalMap } from '../../global-completion'

import { getVariableCompletions } from './getVariableCompletions'

export function getGlobalCompletions(context: ParserRuleContext, globals: GlobalMap): GlobalMap {
    const result = new GlobalMap()

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
                    result.merge(globalName, globals.get(globalName) || [])
                    continue
                }
            }

            getCompletionsRecursive(child)
        }
    }
    getCompletionsRecursive(context)

    return result
}
