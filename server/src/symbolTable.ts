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

import { Diagnostic, LocationLink, Position } from 'vscode-languageserver'

import { DocumentSymbol, Range, VariableLocalSymbol, VariableSymbol } from './decorators'

export class SymbolTable {
    complete: Array<DocumentSymbol>
    symbolCache: Map<number, Array<DocumentSymbol>>

    private _statementDepth: number

    constructor() {
        this.complete = new Array()
        this.symbolCache = new Map()
        this._statementDepth = 0
    }

    get diagnostics(): Array<Diagnostic> {
        const result = new Array<Diagnostic>()

        for (const symbol of this.complete) {
            result.push(...symbol.diagnostics)
        }

        return result
    }

    get statementDepth(): number {
        return this._statementDepth
    }

    set statementDepth(value: number) {
        this._statementDepth = value
    }

    cacheSymbol(symbol: DocumentSymbol): void {
        if (symbol instanceof VariableLocalSymbol) {
            // TODO: add this name to the local name list.
        }
        else if (symbol instanceof VariableSymbol) {
            // TODO: add this name to the global name list.
        }

        if (this.symbolCache.has(this.statementDepth)) {
            this.symbolCache.get(this.statementDepth).push(symbol)

            return
        }

        this.symbolCache.set(this.statementDepth, [symbol])
    }

    lastSymbol(): DocumentSymbol | undefined {
        const result = (this.symbolCache.get(this.statementDepth) || []).pop()

        if (result === undefined) {
            return
        }

        // Add any symbols from the previous depth as children.
        result.children = this.symbolCache.get(this.statementDepth + 1)

        // Clear the cache at the previous depth.
        this.symbolCache.delete(this.statementDepth + 1)

        return result
    }

    link(name: string, range: Range): LocationLink | undefined {
        for (let i = this.statementDepth; i >= 0; i--) {
            for (const symbol of (this.symbolCache.get(i) || [])) {
                if (symbol.name === undefined) {
                    continue
                }

                if (symbol.name.localeCompare(name) === 0) {
                    return symbol.link(range)
                }
            }
        }

        return
    }

    lookup(target: Range | Position): DocumentSymbol | undefined {
        const range = (Position.is(target)) ? { end: target, start: target } : target

        let lookahead = this.lookupBinarySearch(range, this.complete)

        let result: DocumentSymbol
        while (lookahead !== undefined) {
            result = lookahead
            lookahead = this.lookupBinarySearch(range, lookahead.children || [])
        }

        return result
    }

    private lookupBinarySearch = (target: Range, symbols: Array<DocumentSymbol>): DocumentSymbol | undefined => {
        let start = 0
        let stop = symbols.length - 1

        while (start <= stop) {
            // tslint:disable-next-line: no-magic-numbers
            const index = Math.floor((start + stop) / 2)

            const comparison = Range.compare(target, symbols[index].range)

            // If our index is too small.
            if (comparison > 0) {
                start = index + 1
            }
            // If our index is too big.
            else if (comparison < 0) {
                stop = index - 1
            }
            // If our index is just right.
            else {
                return symbols[index]
            }
        }

        return
    }
}
