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

import { TspParser } from '../../../../antlr4-tsplang'

import { CommandSet } from '../../../instrument'
import { resolveSignatureNamespace } from '../../../instrument/provider'
import { InstrumentCompletionItem, InstrumentSignatureInformation } from '../../../wrapper'

import { ExclusiveMap } from '../../exclusive-completion'

import { getTerminals } from '../getTerminals'

function getCompletionsForParameter(
    parameter: number,
    signatures: Array<InstrumentSignatureInformation>
): Array<InstrumentCompletionItem> {
    const results = new Array<InstrumentCompletionItem>()

    signatures.forEach((signature: InstrumentSignatureInformation) => {
        if (signature.data === undefined) {
            return
        }

        const completions = signature.data.parameterTypes.get(parameter)

        if (completions === undefined) {
            return
        }

        results.push(...completions)
    })

    return results
}

export function getParameterCompletions(
    context: TspParser.FunctionCallContext,
    commandSet: CommandSet,
    registerSignatures: (
        open: TerminalNode,
        close: TerminalNode,
        signatures: Array<InstrumentSignatureInformation>
    ) => void
): ExclusiveMap | undefined {
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

    const signatureLabel = resolveSignatureNamespace({ label: context.getText() })

    const matchingSignatures = commandSet.signatures.filter((signature: InstrumentSignatureInformation) => {
        return resolveSignatureNamespace(signature).localeCompare(signatureLabel) === 0
    })

    const signatures = matchingSignatures.filter((signature: InstrumentSignatureInformation) => {
        // We can drop any matching signatures that don't provide any exclusive completions.
        return signature.data !== undefined
    })

    const argsContextChildren = argsContext.children

    //  functionCall  --{1}-->  objectCall  --{1}-->  args[0] === '('
    const openParenthesis = argsContextChildren.shift()
    if (!(openParenthesis instanceof TerminalNode) || openParenthesis.symbol.text.localeCompare('(') !== 0) {
        throw new Error('Exclusive Parameter Parser: expected an open parenthesis.')
    }

    //  functionCall  --{1}-->  objectCall  --{1}-->  args[args.length - 1] === ')'
    const closeParenthesis = argsContextChildren.pop()
    if (!(closeParenthesis instanceof TerminalNode) || closeParenthesis.symbol.text.localeCompare(')') !== 0) {
        throw new Error('Exclusive Parameter Parser: expected a closing parenthesis.')
    }

    // If we have matching instrument signatures, then register them using the found parentheses
    if (matchingSignatures.length > 0) {
        registerSignatures(openParenthesis, closeParenthesis, matchingSignatures)
    }

    //  functionCall  --{1}-->  objectCall  --{1}-->  args  --{0}-->  expressionList
    if (argsContextChildren.length === 0 || argsContext.expressionList() === null) {
        const completions = getCompletionsForParameter(0, signatures)

        // Provide nothing if this parameter has no exclusive completions.
        // Example:
        //  buffer.write.format()
        if (completions.length === 0) {
            return
        }

        // Provide just the offset of the open parenthesis without any partial text.
        // Example:
        //  display.prompt()
        return new ExclusiveMap([
            [
                openParenthesis.symbol.stop + 1,
                { completions }
            ]
        ])
    }

    //  functionCall  --{1}-->  objectCall  --{1}-->  args  --{1}-->  expressionList
    const expressionListContext = argsContextChildren.pop()
    if (!(expressionListContext instanceof TspParser.ExpressionListContext)) {
        throw new Error('Exclusive Parameter Parser: expected a list of expressions.')
    }

    // Get all child comma TerminalNodes from the expressionList.
    const commaTerminals = new Array<TerminalNode>()
    expressionListContext.children.forEach((child: ParserRuleContext | TerminalNode) => {
        if (child instanceof TerminalNode && child.symbol.text.localeCompare(',') === 0) {
            commaTerminals.push(child)
        }
    })

    // Get all child ParserRuleContext nodes from the expressionList.
    const parameters = new Array<ParserRuleContext>()
    expressionListContext.children.forEach((child: ParserRuleContext | TerminalNode) => {
        if (child instanceof ParserRuleContext) {
            parameters.push(child)
        }
    })

    // Start collecting the results.
    const result = new ExclusiveMap()

    // NOTE: there will never be an empty parameter because they make the parser choke on
    //  the entire statement context.
    parameters.forEach((parameterContext: ParserRuleContext, index: number) => {
        const completions = getCompletionsForParameter(index, signatures)

        // If this parameter has no exclusive completions.
        if (completions.length === 0) {
            return
        }

        const lastTerminal = getTerminals(parameterContext).pop()

        if (lastTerminal === undefined) {
            throw new Error('Exclusive Parameter Parser: context contains no terminal nodes.')
        }

        result.set(
            lastTerminal.symbol.stop + 1,
            {
                completions,
                text: parameterContext.getText()
            }
        )
    })

    return (result.size !== 0) ? result : undefined
}
