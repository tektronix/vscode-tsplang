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

import { Diagnostic, LocationLink, Position, SymbolKind } from 'vscode-languageserver'

import { DocumentSymbol, Range, VariableLocalSymbol, VariableSymbol } from './decorators'
import { StatementType } from './language-comprehension'

export interface LookupResult {
    path: Array<number>
    symbol: DocumentSymbol
}

export class SymbolTable {
    complete: Array<DocumentSymbol>
    statementDepth: number
    symbolCache: Map<number, Array<DocumentSymbol>>

    constructor() {
        this.complete = new Array()
        this.symbolCache = new Map()
        this.statementDepth = 0
    }

    get diagnostics(): Array<Diagnostic> {
        const result = new Array<Diagnostic>()

        for (const symbol of this.complete) {
            result.push(...symbol.diagnostics)
        }

        return result
    }

    cacheSymbol(symbol: DocumentSymbol): void {
        if (!symbol.exception) {
            if (symbol instanceof VariableLocalSymbol) {
                // TODO: add this name to the local name list.
            }
            else if (symbol instanceof VariableSymbol) {
                // TODO: add this name to the global name list.
            }
        }

        if (this.symbolCache.has(this.statementDepth)) {
            // Tie this exception to the previous symbol.
            if (symbol.exception) {
                const lastIndex = this.symbolCache.get(this.statementDepth).length - 1
                if (lastIndex >= 0) {
                    symbol.previousSymbol = this.symbolCache.get(this.statementDepth)[lastIndex]
                }
            }
            this.symbolCache.get(this.statementDepth).push(symbol)

            return
        }

        this.symbolCache.set(this.statementDepth, [symbol])
    }

    getChildSymbol(path: Array<number>): DocumentSymbol | undefined {
        // tslint:disable-next-line: no-null-keyword
        let result: DocumentSymbol = null

        for (const index of path) {
            if (result === null) {
                result = this.complete[index]

                continue
            }

            if (result === undefined || result.children === undefined) {
                break
            }

            result = result.children[index]
        }

        return (result === null) ? undefined : result
    }

    lastSymbol(): DocumentSymbol | undefined {
        const result = (this.symbolCache.get(this.statementDepth) || []).pop()

        if (result === undefined) {
            return
        }

        // Only get children if this symbol has yet to be modified.
        if (result.children === undefined) {
            // Add any symbols from the previous depth as children.
            result.children = this.symbolCache.get(this.statementDepth + 1)
        }

        // Clear the cache at the previous depth.
        this.symbolCache.delete(this.statementDepth + 1)

        return result
    }

    link(name: string, range: Range): LocationLink | undefined {
        const linkAssignment = (symbol: DocumentSymbol): LocationLink | undefined => {
            for (const child of (symbol.children || [])) {
                if (child.name === undefined) {
                    continue
                }

                if (child.name.localeCompare(name) === 0
                    && child.kind === SymbolKind.Variable) {
                    return symbol.link(range)
                }
            }
        }

        for (const symbol of this.complete) {
            if (symbol.name === undefined) {
                continue
            }

            if (symbol.statementType === StatementType.Assignment && !!symbol.children) {
                const result = linkAssignment(symbol)

                if (result !== undefined) {
                    return result
                }
            }

            if (symbol.name.localeCompare(name) === 0) {
                return symbol.link(range)
            }
        }

        for (let i = this.statementDepth; i >= 0; i--) {
            for (const symbol of (this.symbolCache.get(i) || [])) {
                if (symbol.name === undefined) {
                    continue
                }

                if (symbol.statementType === StatementType.Assignment && !!symbol.children) {
                    const result = linkAssignment(symbol)

                    if (result !== undefined) {
                        return result
                    }
                }

                if (symbol.name.localeCompare(name) === 0) {
                    return symbol.link(range)
                }
            }
        }

        return
    }

    lookup(target: Range | Position): LookupResult | undefined {
        // TODO look inside Assignment Containers.
        const range = (Position.is(target)) ? { end: target, start: target } : target

        let [lookahead, nextIndex]: [DocumentSymbol, number] = this.lookupBinarySearch(range, this.complete)

        const result: LookupResult = {
            path: new Array(),
            symbol: undefined
        }
        while (lookahead !== undefined) {
            result.symbol = lookahead
            result.path.push(nextIndex)
            if ((result.symbol.detail || '').localeCompare('Assignment Container') === 0) {
                // Search assignment containers linearly and in reverse.
                for (let i = (result.symbol.children || []).length - 1; i >= 0; i--) {
                    const comparison = Range.compare(range, result.symbol.children[i].range)

                    if (comparison === 0) {
                        lookahead = result.symbol.children[i]

                        break
                    }
                }
            }
            else {
                [lookahead, nextIndex] = this.lookupBinarySearch(range, lookahead.children || [])
            }
        }

        return result
    }

    private lookupBinarySearch = (
        target: Range,
        symbols: Array<DocumentSymbol>
    ): [DocumentSymbol, number] | undefined => {
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
                return [symbols[index], index]
            }
        }

        // Return the closest result if an exact match does not exist.
        return [symbols[stop], stop]
    }
}
