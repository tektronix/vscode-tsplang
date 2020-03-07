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
import { ParserRuleContext } from "antlr4-tsplang"

import { Scope, SymbolTable } from "../symbols"

declare module "antlr4-tsplang" {
    interface ParserRuleContext {
        getLastChildRuleContext: () => ParserRuleContext | undefined
        getPreviousSiblingRuleContext: () => ParserRuleContext | undefined
        scope?: Scope
        symbolTable?: SymbolTable
    }
}
ParserRuleContext.prototype.scope = undefined
ParserRuleContext.prototype.symbolTable = undefined
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
ParserRuleContext.prototype.getPreviousSiblingRuleContext = function():
    | ParserRuleContext
    | undefined {
    if (this.parent?.children === undefined) {
        return
    }

    for (let i = (this.parent.children.indexOf(this) ?? 0) - 1; i >= 0; i--) {
        if (this.parent.children[i] instanceof ParserRuleContext) {
            return this.parent.children[i]
        }
    }

    return undefined
}
