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

import { Ambiguity, StatementType } from '../language-comprehension'

// tslint:disable-next-line:no-import-side-effect
import './antlr4'
import { Range } from './range'

export interface IDocumentSymbol extends vsls.DocumentSymbol {
    builtin: boolean
    declaration?: vsls.LocationLink
    exception: boolean
    local: boolean
    references?: Array<vsls.Location>
    startTokenIndex: number,
    statementType: StatementType | Ambiguity
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
    statementType: StatementType | Ambiguity
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

    within(symbol: DocumentSymbol): boolean {
        return Range.within(symbol.range, this.range)
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
