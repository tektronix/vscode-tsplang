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

import { Diagnostic, LocationLink, Position, Range } from 'vscode-languageserver'

import {
    DocumentSymbol,
    TableLocalSymbol,
    TableSymbol,
    VariableLocalSymbol,
    VariableSymbol
} from './decorators'
import { Field, StatementType } from './language-comprehension'

interface SearchResult {
    index: number
    symbol: DocumentSymbol
}

export interface LookupResult {
    path: Array<number>
    symbol: DocumentSymbol
}

export class SymbolTable {
    static MAX_SEARCH_PATH: number = 1000

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

    // namedLookup(name: string): LookupResult | undefined {
    //     const dive = (symbol: DocumentSymbol): boolean => !!symbol && symbol.container && !symbol.table

    //     const result: LookupResult = {
    //         path: new Array(),
    //         symbol: undefined
    //     }

    //     const buildResult = (symbols: Array<DocumentSymbol>): void => {
    //         if (symbols.length === 0) {
    //             return
    //         }

    //         for (let i = 0; i < symbols.length; i++) {
    //             if (dive(symbols[i])) {
    //                 buildResult(symbols[i].children || [])
    //             }

    //         }
    //     }

    //     for (const symbol of this.complete) {
    //         if (!!symbol.name && symbol.name.localeCompare(name) === 0) {
    //             return symbol
    //         }

    //         if (symbol.statementType === StatementType.Assignment && !!symbol.children) {
    //             for (const child of symbol.children) {
    //                 if (!!child.name && child.name.localeCompare(name) === 0) {
    //                     return child
    //                 }
    //             }
    //         }
    //     }

    //     for (let i = this.statementDepth; i >= 0; i--) {
    //         for (const symbol of (this.symbolCache.get(i) || [])) {
    //             if (!!symbol.name && symbol.name.localeCompare(name) === 0) {
    //                 return symbol
    //             }

    //             if (symbol.statementType === StatementType.Assignment && !!symbol.children) {
    //                 for (const child of symbol.children) {
    //                     if (!!child.name && child.name.localeCompare(name) === 0) {
    //                         return child
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     return
    // }

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
        const linkContainer = (symbol: DocumentSymbol): LocationLink | undefined => {
            for (const child of (symbol.children || [])) {
                if (child.name === undefined) {
                    continue
                }

                if (child.name.localeCompare(name) === 0) {
                    return symbol.link(range)
                }
            }
        }

        for (const symbol of this.complete) {
            if (symbol.name === undefined) {
                continue
            }

            if (symbol.container && !!symbol.children) {
                const result = linkContainer(symbol)

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

                if (symbol.container && !!symbol.children) {
                    const result = linkContainer(symbol)

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
        const range = (Position.is(target)) ? { end: target, start: target } : target

        let search = this.lookupBinarySearch(range, this.complete)

        const result: LookupResult = {
            path: new Array(),
            symbol: undefined
        }
        while (search !== undefined && result.path.length <= SymbolTable.MAX_SEARCH_PATH) {
            result.symbol = search.symbol
            result.path.push(search.index)
            search = (result.symbol.container)
                ? this.lookupReverseSearch(range, result.symbol.children || [])
                : search = this.lookupBinarySearch(range, result.symbol.children || [])
        }

        return (result.symbol !== undefined && result.path.length <= SymbolTable.MAX_SEARCH_PATH)
            ? result
            : undefined
    }

    // updateTable(fields: Array<Field>, value: DocumentSymbol): Diagnostic | undefined {
    //     if (fields.length === 0) {
    //         return
    //     }

    //     const localFields = [...fields]
    //     const rootField = localFields.shift()

    //     if (rootField === undefined || localFields.length === 0) {
    //         return
    //     }

    //     const findCallback = (symbol: DocumentSymbol): boolean => {
    //         if (symbol.container && !symbol.table) {
    //             return (symbol.children || []).findIndex(findIndexCallback) !== -1
    //         }
    //     }

    //     let index = this.complete.findIndex((symbol: DocumentSymbol) => {
    //         return symbol.name.localeCompare(rootField.name) === 0
    //     })

    //     if (index !== -1) {
    //         const table: TableSymbol | TableLocalSymbol = (this.complete[index].local)
    //             ? TableLocalSymbol.from(this.complete[index] as VariableLocalSymbol)
    //             : TableSymbol.from(this.complete[index] as VariableSymbol)

    //         const result = table.setField(localFields, value)

    //         if (result === undefined) {
    //             this.complete[index] = table
    //         }

    //         return result
    //     }

    //     for (let i = this.statementDepth; i >= 0; i--) {
    //         const symbols = (this.symbolCache.get(i) || [])
    //         index = symbols.findIndex((symbol: DocumentSymbol) => {
    //             return !!symbol.name && symbol.name.localeCompare(rootField.name) === 0
    //         })

    //         if (index !== -1) {
    //             const table: TableSymbol | TableLocalSymbol = (symbols[index].local)
    //                 ? TableLocalSymbol.from(symbols[index] as VariableLocalSymbol)
    //                 : TableSymbol.from(symbols[index] as VariableSymbol)

    //             const result = table.setField(localFields, value)

    //             if (result === undefined) {
    //                 symbols[index] = table
    //                 this.symbolCache.set(i, symbols)
    //             }

    //             return result
    //         }
    //     }
    // }

    updateSymbol(path: Array<number>, value: DocumentSymbol): void {
        const lastIndex = path.pop()

        // tslint:disable-next-line: no-null-keyword
        let symbol: DocumentSymbol = null

        for (const index of path) {
            if (symbol === null) {
                symbol = this.complete[index]

                continue
            }

            if (symbol === undefined || symbol.children === undefined) {
                break
            }

            symbol = symbol.children[index]
        }

        if (symbol !== null && symbol !== undefined) {
            if (symbol.children === undefined) {
                symbol.children = [value]
            }
            else {
                symbol.children[lastIndex] = value
            }
        }
    }

    private lookupBinarySearch = (target: Range, symbols: Array<DocumentSymbol>): SearchResult | undefined => {
        let start = 0
        let stop = symbols.length - 1

        while (start <= stop) {
            // tslint:disable-next-line: no-magic-numbers
            const index = Math.floor((start + stop) / 2)

            const comparison = symbols[index].compare(target)

            // If our index is too small.
            if (comparison < 0) {
                start = index + 1
            }
            // If our index is too big.
            else if (comparison > 0) {
                stop = index - 1
            }
            // If our index is just right.
            else {
                return { index, symbol: symbols[index] }
            }
        }

        return
    }

    private lookupReverseSearch = (target: Range, symbols: Array<DocumentSymbol>): SearchResult | undefined => {
        for (let index = (symbols.length - 1); index >= 0; index--) {
            const comparison = symbols[index].compare(target)

            if (comparison === 0) {
                return { index, symbol: symbols[index] }
            }
        }

        return
    }
}
