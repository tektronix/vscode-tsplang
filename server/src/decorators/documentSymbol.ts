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

import * as vsls from 'vscode-languageserver'

import { StatementAmbiguity, StatementType } from '../language-comprehension'

// tslint:disable-next-line:no-import-side-effect
import './antlr4'

// tslint:disable: no-magic-numbers
/**
 * In the following tables A and B represent the parameters to
 * some comparison function such that
 *
 * ```
 *      A < B, compare(A, B) -> -1
 * when A = B, compare(A, B) ->  0
 *      A > B, compare(A, B) -> +1```
 *
 * Each quadrant of the following 2-D table was added together
 * to get a unique key:
 *
 * |             | A_start | A_end |
 * | -----------:|:-------:|:-----:|
 * | **B_start** |  AsBs   | AeBs  |
 * | **B_end**   |  AsBe   | AeBe  |
 *
 * All valid results are shown in the following 1-D table, where
 * each column is a quadrant:
 *
 * | AsBe | AeBe | AsBs | AeBs | Sum |
 * | ----:| ----:| ----:| ----:| ---:|
 * |   -1 |   -1 |   -1 |   -1 |  -4 |
 * |   -1 |   -1 |   -1 |    0 |  -3 |
 * |   -1 |   -1 |   -1 |   +1 |  -2 |
 * |   -1 |   -1 |    0 |   +1 |  -1 |
 * |   -1 |    0 |    0 |   +1 |   0 |
 * |   -1 |   -1 |   +1 |   +1 |   0 |
 * |   -1 |    0 |   +1 |   +1 |  +1 |
 * |   -1 |   +1 |   +1 |   +1 |  +2 |
 * |    0 |   +1 |   +1 |   +1 |  +3 |
 * |   +1 |   +1 |   +1 |   +1 |  +4 |
 */
const compareRanges = new Map<number, number | undefined>([
    [ -4, -1        ],
    [ -3, -1        ],
    [ -2, undefined ], // overlapping
    [ -1,  0        ],
    [  0,  0        ],
    [  0,  0        ],
    [ +1,  0        ],
    [ +2, undefined ], // overlapping
    [ +3, +1        ],
    [ +4, +1        ],
])

/**
 * Similar logic follows from above. However, since Bs and Be are
 * equal, we can skip the AsBe and AeBe comparisons.
 *
 * Each quadrant of the following 2-D table was added together
 * to get a unique key:
 *
 * |             | A_start | A_end |
 * | -----------:|:-------:|:-----:|
 * | **B_start** |  AsBs   | AeBs  |
 *
 * All valid results are shown in the following 1-D table, where
 * each column is a quadrant:
 *
 * | AsBs | AeBs | Sum |
 * | ----:| ----:| ---:|
 * |   -1 |   -1 |  -2 |
 * |   -1 |    0 |  -1 |
 * |   -1 |   +1 |   0 |
 * |    0 |    0 |   0 |
 * |    0 |   +1 |  +1 |
 * |   +1 |   +1 |  +2 |
 */
const compareRangePosition = new Map<number, number | undefined>([
    [ -2, -1        ],
    [ -1,  0        ],
    [  0,  0        ],
    [  0,  0        ],
    [ +1,  0        ],
    [ +2, +1        ],
])
// tslint:enable: no-magic-numbers

export interface IDocumentSymbol extends vsls.DocumentSymbol {
    builtin: boolean
    declaration?: vsls.LocationLink
    exception: boolean
    local: boolean
    references?: Array<vsls.Location>
    startTokenIndex: number,
    statementType: StatementType | StatementAmbiguity
}
export class DocumentSymbol implements IDocumentSymbol {
    builtin: boolean = false
    children?: Array<DocumentSymbol>
    /**
     * The location where this DocumentSymbol was originally declared or
     * undefined if no previous declaration could be found.
     */
    declaration?: vsls.LocationLink
    deprecated?: boolean
    detail?: string
    exception: boolean = false
    kind: vsls.SymbolKind
    local: boolean = false
    name: string
    previousSymbol: DocumentSymbol
    range: vsls.Range
    references?: Array<vsls.Location>
    selectionRange: vsls.Range
    start: vsls.Position
    startTokenIndex: number
    statementType: StatementType | StatementAmbiguity
    table?: boolean
    uri: string

    private _end: vsls.Position

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        this.uri = uri
        this.start = start
        this.startTokenIndex = startTokenIndex
    }

    get diagnostics(): Array<vsls.Diagnostic> {
        const results = new Array<vsls.Diagnostic>()

        for (const child of (this.children || [])) {
            results.push(...child.diagnostics)
        }

        if (this.exception) {
            results.push(vsls.Diagnostic.create(
                this.range,
                this.detail,
                vsls.DiagnosticSeverity.Error,
                'syntax-error',
                'tsplang'
            ))
        }

        return results
    }

    get end(): vsls.Position {
        return this._end
    }

    set end(value: vsls.Position) {
        this._end = value
        this.range = {
            end: this._end,
            start: this.start
        }

        if (this.selectionRange === undefined) {
            this.selectionRange = this.range
        }
    }

    compare(value: vsls.Range): number | undefined {
        if (this._end === undefined) {
            return
        }

        // tslint:disable: variable-name
        // Rule disabled for name clarity.
        let AsBs: number
        let AsBe: number
        let AeBs: number
        let AeBe: number
        // tslint:enable: variable-name

        if (DocumentSymbol.comparePosition(value.start, value.end) === 0) {
            AsBs = DocumentSymbol.comparePosition(this.range.start, value.start)
            AeBs = DocumentSymbol.comparePosition(this.range.end, value.start)

            return compareRangePosition.get(AsBs + AeBs)
        }

        // Similar logic duplicated for clarity.
        if (DocumentSymbol.comparePosition(this.range.start, this.range.end) === 0) {
            AsBs = DocumentSymbol.comparePosition(this.range.start, value.start)
            AsBe = DocumentSymbol.comparePosition(this.range.start, value.end)

            return compareRangePosition.get(AsBs + AsBe)
        }

        AsBs = DocumentSymbol.comparePosition(this.range.start, value.start)
        AsBe = DocumentSymbol.comparePosition(this.range.start, value.end)
        AeBs = DocumentSymbol.comparePosition(this.range.end, value.start)
        AeBe = DocumentSymbol.comparePosition(this.range.end, value.end)

        return compareRanges.get(AsBs + AsBe + AeBs + AeBe)
    }

    link(from: vsls.Range): vsls.LocationLink {
        if (this.references === undefined) {
            this.references = new Array()
            if (this.declaration === undefined) {
                this.declaration = {
                    originSelectionRange: this.selectionRange,
                    targetRange: this.range,
                    targetSelectionRange: this.selectionRange,
                    targetUri: this.uri
                }
            }
        }
        this.references.push({
            range: from,
            uri: this.uri
        })

        return {
            originSelectionRange: from,
            targetRange: this.range,
            targetSelectionRange: this.selectionRange,
            targetUri: this.uri
        }
    }

    /**
     * Remove children that cause the given predicate to return true.
     */
    prune(predicate: (value: DocumentSymbol) => boolean): IDocumentSymbol {
        const clone: IDocumentSymbol = {
            builtin: this.builtin,
            children: new Array(),
            declaration: this.declaration,
            deprecated: this.deprecated,
            detail: this.detail,
            exception: this.exception,
            kind: this.kind,
            local: this.local,
            name: this.name,
            range: this.range,
            references: this.references,
            selectionRange: this.selectionRange,
            startTokenIndex: this.startTokenIndex,
            statementType: this.statementType
        }

        for (let i = 0; i < (this.children || []).length; i++) {
            const child = this.children[i].prune(predicate)

            if (predicate(child as DocumentSymbol)) {
                // Extract pruned grandchildren that aren't local declarations
                // or local declarations residing within assignment containers.
                const orphans = (child.children || []).filter(
                    (v: IDocumentSymbol) => {
                        return !v.local || (v.local && child.statementType === StatementType.Assignment)
                    }
                )
                clone.children.push(...orphans)
            }
            else {
                clone.children.push(child)
            }
        }

        return clone
    }

    updateReferences(declaration: DocumentSymbol): void {
        if (declaration.statementType !== StatementType.Assignment
            && declaration.statementType !== StatementType.AssignmentLocal
            && declaration.statementType !== StatementType.Function
            && declaration.statementType !== StatementType.FunctionLocal) {
            return
        }

        for (let i = 0; i < (this.children || []).length; i++) {
            const child = this.children[i]

            if (child.statementType === declaration.statementType) {
                break
            }

            if (!!child.name && child.name.localeCompare(declaration.name) === 0) {
                child.references = undefined
                child.declaration = declaration.link(child.selectionRange)
                child.detail = 'reference'
                child.local = declaration.local
                child.statementType = declaration.statementType

                this.children.splice(i, 1, child)
            }

            this.children[i].updateReferences(declaration)
        }
    }

    /**
     * `a < b -> -1`
     *
     * `a = b ->  0`
     *
     * `a > b -> +1`
     */
    protected static comparePosition(a: vsls.Position, b: vsls.Position): number {
        const coerce = function(value: number): number {
            return (value === 0)
                ? value
                : (value < 0)
                    ? -1
                    : +1
        }

        const lineOffset = a.line - b.line

        if (lineOffset === 0) {
            return coerce(a.character - b.character)
        }

        return coerce(lineOffset)
    }
}

export class FunctionSymbol extends DocumentSymbol {
    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol): FunctionSymbol {
        const result = new FunctionSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'global'
        result.references = symbol.references
        result.statementType = StatementType.Function
        result.kind = StatementType.toSymbolKind(result.statementType)

        return result
    }
}

export class FunctionLocalSymbol extends FunctionSymbol {
    local: boolean = true

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol): FunctionLocalSymbol {
        const result = new FunctionLocalSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'local'
        result.references = symbol.references
        result.statementType = StatementType.FunctionLocal
        result.kind = StatementType.toSymbolKind(result.statementType)

        return result
    }
}

export class TableSymbol extends DocumentSymbol {
    table: boolean = true

    protected constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    getField(name: string, parents: Array<string> = []): DocumentSymbol | undefined {
        const localParents = [...parents]
        const nextParent = localParents.shift()

        for (const child of (this.children || [])) {
            if (!!child.name) {
                if (!!nextParent && !!child.table && child.name.localeCompare(nextParent) === 0) {
                    return (child as TableSymbol).getField(name, localParents)
                }

                if (child.name.localeCompare(name) === 0) {
                    return child
                }
            }
        }

        return
    }

    /**
     * Set the value of the child symbol at the given table index.
     *
     * If the symbol at the last index of the given field array does not exist, then it is
     * created.
     *
     * @param fields An array of strings containing the name of each child symbol that should
     * be set.
     * @param value The new value of the symbol residing at the given field array.
     * @returns A Diagnostic message if any value in the given field array (excluding the
     * last item) does not exist.
     */
    setFields(fields: Array<string>, value: DocumentSymbol): vsls.Diagnostic | undefined {
        if (fields.length === 0) {
            return
        }

        const localFields = [...fields]
        const setOrCreate = localFields.length === 1
        const nextName = localFields.shift()

        // Find the next child.
        const index = (this.children || []).findIndex((child: DocumentSymbol) => {
            return !!child.name && child.name.localeCompare(nextName) === 0
        })

        if (setOrCreate) {
            let terminalChild = (this.children || [])[index]

            if (terminalChild !== undefined) {
                terminalChild = new DocumentSymbol(value.uri, value.start, value.startTokenIndex)
                terminalChild.name = nextName
                terminalChild.end = value.end
                terminalChild.statementType = value.statementType
            }

            const inheritKind =
                value.table
                || value.statementType === StatementType.Function
                || value.statementType === StatementType.FunctionCall
                || value.statementType === StatementType.FunctionLocal

            terminalChild.kind = (inheritKind) ? value.kind : vsls.SymbolKind.Field
            if (!!terminalChild.children) {
                terminalChild.children.push(...value.children)
            }
            else {
                terminalChild.children = value.children
            }

            if (index !== -1) {
                this.children[index] = terminalChild
            }
            else {
                if (!!this.children) {
                    this.children.push(terminalChild)
                }
                else {
                    this.children = [terminalChild]
                }
            }

            return
        }

        if (index === -1) {
            return vsls.Diagnostic.create(
                value.range,
                `Cannot index field "${nextName}".`,
                vsls.DiagnosticSeverity.Warning,
                'table-index-error',
                'tsplang'
            )
        }

        if (!(this.children[index] instanceof TableSymbol) || !(this.children[index] instanceof TableLocalSymbol)) {
            let targetChild = this.children[index]
            targetChild = TableSymbol.from(targetChild as VariableSymbol)
            this.children[index] = targetChild
        }

        return (this.children[index] as TableSymbol).setFields(localFields, value)
    }

    static from(symbol: VariableSymbol): TableSymbol {
        const result = new TableSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.builtin = symbol.builtin
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'global'
        result.name = symbol.name
        result.references = symbol.references
        result.selectionRange = symbol.selectionRange
        result.statementType = symbol.statementType
        result.kind = vsls.SymbolKind.Object
        result.end = symbol.end

        return result
    }
}

export class TableLocalSymbol extends TableSymbol {
    local: boolean = true
    table: boolean = true

    protected constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: VariableLocalSymbol): TableSymbol {
        const result = new TableSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.builtin = symbol.builtin
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'local'
        result.references = symbol.references
        result.statementType = symbol.statementType
        result.kind = vsls.SymbolKind.Object

        return result
    }
}

export class VariableSymbol extends DocumentSymbol {
    /**
     * The index of the assignment operator (=) within this object's stored Token
     * array.
     *
     * Assignment operators separate variable declarations from their expressions.
     */
    assignmentOperatorIndex?: number
    /**
     * Whether this symbol is an instrument builtin.
     *
     * Defaults to false.
     */
    builtin: boolean = false
    /**
     * The index of this variable declaration within the comma-delimited list of
     * variable declarations.
     *
     * Defaults to 0.
     */
    variableIndex: number = 0

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol, variableIndex?: number, assignmentOpIndex?: number): VariableSymbol {
        const result = new VariableSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.builtin = symbol.builtin
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'global'
        result.references = symbol.references
        result.statementType = StatementType.Assignment
        result.kind = StatementType.toSymbolKind(result.statementType)
        if (variableIndex !== undefined) {
            result.variableIndex = variableIndex
        }
        result.assignmentOperatorIndex = assignmentOpIndex

        return result
    }
}

export class VariableLocalSymbol extends VariableSymbol {
    local: boolean = true

    constructor(uri: string, start: vsls.Position, startTokenIndex: number) {
        super(uri, start, startTokenIndex)
    }

    static from(symbol: DocumentSymbol, variableIndex?: number, assignmentOpIndex?: number): VariableLocalSymbol {
        const result = new VariableLocalSymbol(symbol.uri, symbol.start, symbol.startTokenIndex)
        result.children = symbol.children
        result.declaration = symbol.declaration
        result.detail = 'local'
        result.references = symbol.references
        result.statementType = StatementType.AssignmentLocal
        result.kind = StatementType.toSymbolKind(result.statementType)
        if (variableIndex !== undefined) {
            result.variableIndex = variableIndex
        }
        result.assignmentOperatorIndex = assignmentOpIndex

        return result
    }
}
