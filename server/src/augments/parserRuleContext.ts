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
import { CommonToken, ParserRuleContext } from "antlr4-tsplang"
import { DocumentSymbol, Position, Range } from "vscode-languageserver"

import { Scope, SymbolTable } from "../symbols"

declare module "antlr4-tsplang" {
    interface ParserRuleContext {
        deferred?: Scope
        documentSymbols?: DocumentSymbol[]
        fullSpan: Range
        getLastChildRuleContext: () => ParserRuleContext | undefined
        getPreviousSiblingRuleContext: (start?: number) => ParserRuleContext | undefined
        hasParentOf: <T extends new (...args) => T>(type: InstanceType<T>) => boolean
        leadingTrivia: CommonToken[]
        span: Range
        symbolTable?: SymbolTable
        trailingTrivia: CommonToken[]
    }
}
ParserRuleContext.prototype.deferred = undefined
ParserRuleContext.prototype.documentSymbols = undefined
Object.defineProperty(ParserRuleContext.prototype, "fullSpan", {
    get: function(): Range {
        const firstTriviaToken: CommonToken | undefined = this.leadingTrivia[0]
        const start: Position = {
            ...(firstTriviaToken?.span.start ?? (this.start as CommonToken).span.start),
        }

        const lastTriviaToken: CommonToken | undefined = this.leadingTrivia[
            this.leadingTrivia.length - 1
        ]
        const end: Position = {
            ...(lastTriviaToken?.span.start ??
                (this.stop as CommonToken | undefined)?.span.end ??
                start),
        }

        return {
            end,
            start,
        }
    },
})
ParserRuleContext.prototype.getLastChildRuleContext = function():
    | ParserRuleContext
    | undefined {
    if (this.children === undefined) {
        return undefined
    }

    for (let i = this.childCount - 1; i >= 0; i--) {
        if (this.children[i] instanceof ParserRuleContext) {
            return this.children[i]
        }
    }

    return undefined
}
ParserRuleContext.prototype.getPreviousSiblingRuleContext = function(
    start?: number
): ParserRuleContext | undefined {
    if (this.parent?.children === undefined) {
        return
    }

    for (let i = (start ?? this.parent.children.indexOf(this) ?? 0) - 1; i >= 0; i--) {
        if (this.parent.children[i] instanceof ParserRuleContext) {
            return this.parent.children[i]
        }
    }

    return undefined
}
ParserRuleContext.prototype.hasParentOf = function<T extends new (...args) => T>(
    type: InstanceType<T>
): boolean {
    let parent: ParserRuleContext | undefined = this.parent
    while (parent !== undefined) {
        if (parent instanceof type) {
            return true
        }
        parent = parent.parent
    }
    return false
}
Object.defineProperty(ParserRuleContext.prototype, "leadingTrivia", {
    get: function(): CommonToken[] {
        if (this.children === undefined) {
            return []
        }

        return this.children[0].leadingTrivia
    },
})
Object.defineProperty(ParserRuleContext.prototype, "span", {
    get: function(): Range {
        const start: Position = { ...(this.start as CommonToken).span.start }
        return {
            start,
            end: {
                ...((this.stop as CommonToken | undefined)?.span.end ?? start),
            },
        }
    },
})
ParserRuleContext.prototype.symbolTable = undefined
Object.defineProperty(ParserRuleContext.prototype, "trailingTrivia", {
    get: function(): CommonToken[] {
        if (this.children === undefined) {
            return []
        }

        return this.children[0].trailingTrivia
    },
})
