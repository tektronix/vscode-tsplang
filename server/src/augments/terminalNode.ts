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
import { CommonToken, TerminalNode } from "antlr4-tsplang"
import { Range } from "vscode-languageserver"

declare module "antlr4-tsplang" {
    interface TerminalNode {
        fullSpan: Range
        leadingTrivia: CommonToken[]
        span: Range
        trailingTrivia: CommonToken[]
    }
}
Object.defineProperty(TerminalNode.prototype, "fullSpan", {
    get: function(): Range {
        return (this.symbol as CommonToken).fullSpan
    },
})
Object.defineProperty(TerminalNode.prototype, "leadingTrivia", {
    get: function(): CommonToken[] {
        return (this.symbol as CommonToken).leadingTrivia
    },
})
Object.defineProperty(TerminalNode.prototype, "span", {
    get: function(): Range {
        return (this.symbol as CommonToken).span
    },
})
Object.defineProperty(TerminalNode.prototype, "trailingTrivia", {
    get: function(): CommonToken[] {
        return (this.symbol as CommonToken).trailingTrivia
    },
})
