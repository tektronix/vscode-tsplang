/* eslint-disable sort-imports */
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
import {
    AnonymousFunctionExpressionContext,
    ChunkContext,
    FieldContext,
    FunctionCallContext,
    GenericForContext,
    GlobalFunctionContext,
    IndexContext,
    LocalAssignmentContext,
    LocalFunctionContext,
    NumericForContext,
    ParserRuleContext,
    PrefixContext,
    SuffixContext,
    TerminalNode,
    TspListener,
    TspParser,
    VariableContext,
} from "antlr4-tsplang"
import { DocumentSymbol, SymbolKind, Position } from "vscode-languageserver"

export enum LuaType {
    NIL = "nil",
    BOOLEAN = "boolean",
    NUMBER = "number",
    STRING = "string",
    FUNCTION = "function",
    USERDATA = "userdata",
    THREAD = "thread",
    TABLE = "table",
}

export function toSymbolKind(object: LuaType | TspSymbol): SymbolKind {
    const type = object["type"] !== undefined ? object["type"] : object

    if (type === LuaType.NIL) {
        return SymbolKind.Null
    } else if (
        type === LuaType.BOOLEAN ||
        type === LuaType.NUMBER ||
        type === LuaType.STRING
    ) {
        return SymbolKind.Variable
    } else if (type === LuaType.FUNCTION) {
        return SymbolKind.Function
    } else if (type === LuaType.USERDATA || type === LuaType.THREAD) {
        return SymbolKind.Object
    } else if (type === LuaType.TABLE) {
        return SymbolKind.Namespace
    } else {
        if (
            (type as TspSymbol).container instanceof LocalAssignmentContext ||
            (type as TspSymbol).container instanceof VariableContext
        ) {
            return SymbolKind.Variable
        } else if ((type as TspSymbol).container instanceof FieldContext) {
            return SymbolKind.Property
        }

        return SymbolKind.TypeParameter
    }
}

export interface TspSymbol {
    container: ParserRuleContext
    name: string
    /**
     * Inclusive zero-based index of the first container child that helped
     * create this symbol name.
     */
    nameStart: number
    /**
     * Inclusive zero-based index of the last container child that helped
     * create this symbol name.
     */
    nameEnd: number
    declaration?: TspSymbol
    fields?: TspSymbol[]
    like?: TspSymbol[]
    type?: LuaType
}
export namespace TspSymbol {
    export const copy = function(symbol: TspSymbol): TspSymbol {
        // Create new arrays containing all the same objects.
        const copies: Pick<TspSymbol, "fields" | "like"> = {
            fields: symbol.fields !== undefined ? [...symbol.fields] : undefined,
            like: symbol.like !== undefined ? [...symbol.like] : undefined,
        }
        return {
            ...symbol,
            ...copies,
        }
    }
    export const toDocumentSymbol = function(
        symbol: TspSymbol
    ): DocumentSymbol | undefined {
        const node = symbol.container
        if (node.children === undefined) {
            return undefined
        }

        // Get the starting Position of any attached comment.
        let symbolStart: Position | undefined = undefined
        const leadingTrivia = node.leadingTrivia
        for (let i = leadingTrivia.length - 1; i >= 0; i--) {
            const trivia = leadingTrivia[i]
            if (trivia.text === undefined) {
                break
            } else if (trivia.text.trim().length === 0) {
                break
            } else {
                symbolStart = trivia.span.start
            }
        }
        // If the starting Position of the symbol is still undefined,
        // then get the starting Position of the symbol container.
        if (symbolStart === undefined) {
            symbolStart = node.span.start
        }

        // Get the Range of the name.
        const firstNameSymbol = node.children?.[symbol.nameStart]
        let firstNameSymbolSpanStart: Position | undefined
        if (
            firstNameSymbol instanceof ParserRuleContext ||
            firstNameSymbol instanceof TerminalNode
        ) {
            firstNameSymbolSpanStart = firstNameSymbol.span?.start
        } else {
            return undefined
        }
        if (firstNameSymbolSpanStart === undefined) {
            return undefined
        }
        const lastNameSymbol = node.children[symbol.nameEnd]
        let lastNameSymbolSpanEnd: Position | undefined
        if (
            lastNameSymbol instanceof ParserRuleContext ||
            lastNameSymbol instanceof TerminalNode
        ) {
            lastNameSymbolSpanEnd = lastNameSymbol.span?.end
        } else {
            return undefined
        }
        if (lastNameSymbolSpanEnd === undefined) {
            return undefined
        }

        return {
            kind: toSymbolKind(symbol),
            name: symbol.name,
            range: {
                end: { ...node.span.end },
                start: symbolStart,
            },
            selectionRange: {
                end: lastNameSymbolSpanEnd,
                start: firstNameSymbolSpanStart,
            },
        }
    }
}

export interface Scope {
    global: TspSymbol[]
    local: TspSymbol[]
}
export namespace Scope {
    export const empty = function(scope: Scope): boolean {
        return scope.global.length === 0 && scope.local.length === 0
    }
    export const make = function(): Scope {
        return {
            global: [],
            local: [],
        }
    }
}

// NOTE: attach to each node of the AST
export class SymbolTable {
    private global: Map<string, TspSymbol>
    private local: Map<string, TspSymbol[]>

    constructor() {
        this.global = new Map()
        this.local = new Map()
    }

    add(scope: Scope): void {
        for (const symbol of scope.global) {
            this.global.set(symbol.name, symbol)
        }

        for (const symbol of scope.local) {
            const existing = this.local.get(symbol.name)
            if (existing === undefined) {
                this.local.set(symbol.name, [symbol])
            } else {
                if (symbol.declaration === undefined) {
                    symbol.declaration = existing[0]
                }

                const lastIndex = existing.length - 1
                const lastFields = existing[lastIndex].fields
                if (lastFields !== undefined) {
                    if (symbol.fields === undefined) {
                        symbol.fields = [...lastFields]
                    } else {
                        symbol.fields.push(...lastFields)
                    }
                }

                if (symbol.like === undefined) {
                    symbol.like = [...existing]
                } else {
                    symbol.like.push(...existing)
                }

                existing.push(symbol)
                this.local.set(symbol.name, existing)
            }
        }
    }

    /**
     * Create a new SymbolTable from this object.
     *
     * Contained symbols are copied by reference.
     */
    copy(locals: boolean): SymbolTable {
        const result = new SymbolTable()
        result.global = new Map(this.global.entries())
        if (locals) {
            this.local.forEach((value: TspSymbol[], key: string) => {
                result.local.set(key, [...value])
            })
        }
        return result
    }

    extend(table: SymbolTable, which: "globals" | "locals" | "both"): void {
        if (which === "globals" || which == "both") {
            table.global.forEach((v, k) => {
                this.global.set(k, v)
            })
        }
        if (which === "locals" || which === "both") {
            table.local.forEach((v, k) => {
                this.local.set(k, [...v])
            })
        }
    }

    get(name: string): TspSymbol | undefined {
        const locals = this.local.get(name)
        if (locals !== undefined) {
            const lastIndex = locals.length - 1
            return locals[lastIndex]
        }
        return this.global.get(name)
    }
}

export class DocumentSymbolTree {
    private root: DocumentSymbol[]
    private stack: DocumentSymbol[][]
    private frameOwner: ParserRuleContext[]

    /**
     * NOTE: A "frame" is the top-most stack value.
     */
    constructor(ctx: ChunkContext) {
        this.root = []
        this.stack = [this.root]
        this.frameOwner = [ctx]
    }

    add(symbol?: DocumentSymbol, ...rest: DocumentSymbol[]): void {
        if (symbol === undefined) {
            return
        }
        rest.unshift(symbol)
        this.stack[this.stack.length - 1].push(...rest)
    }

    addScope(
        scope: Scope,
        push?: { nextFrame: string; owner: ParserRuleContext }
    ): void {
        let frame: DocumentSymbol[] | undefined = undefined
        this.add(
            ...[...scope.global, ...scope.local]
                .map(TspSymbol.toDocumentSymbol)
                .filter(function(s: DocumentSymbol | undefined): s is DocumentSymbol {
                    if (s !== undefined) {
                        if (push !== undefined && s.name === push.nextFrame) {
                            frame = []
                            s.children = frame
                        }
                        return true
                    }
                    return false
                })
        )
        if (push !== undefined) {
            if (frame !== undefined) {
                this.push(frame, push.owner)
            } else {
                const i = this.stack.length - 1
                for (let j = this.stack[i].length - 1; j >= 0; j--) {
                    if (this.stack[i]?.[j]?.name === push.nextFrame) {
                        frame = []
                        this.stack[i][j].children = frame
                        this.push(frame, push.owner)
                        break
                    }
                }
            }
        }
    }

    get(): DocumentSymbol[] {
        return this.root
    }

    peek(): DocumentSymbol[] {
        return this.stack[this.stack.length - 1]
    }

    pop(ctx: ParserRuleContext): DocumentSymbol[] | undefined {
        if (ctx === this.frameOwner[this.frameOwner.length - 1]) {
            const frame = this.stack.pop()
            this.frameOwner.pop()
            if (frame === undefined) {
                return undefined
            }
            return [...frame]
        }
        return undefined
    }

    push(frame: DocumentSymbol[], owner: ParserRuleContext): void {
        this.stack.push(frame)
        this.frameOwner.push(owner)
    }
}

interface ContextSymbolInfo {
    scope: Scope
    /** TspSymbol name whose child array will be the next frame. */
    nextFrame?: string
}

export class SymbolTableMaker implements TspListener {
    // ParseTreeListener interface members
    readonly visitTerminal = undefined
    readonly visitErrorNode = undefined

    private tree: DocumentSymbolTree

    constructor() {
        // blank
    }

    enterEveryRule(ctx: ParserRuleContext): void {
        if (ctx.symbolTable === undefined) {
            ctx.symbolTable = new SymbolTable()
        }

        const indexInParent = ctx.parent?.children?.indexOf(ctx)

        // Inherit everything from an existing parent.
        if (ctx.parent?.symbolTable !== undefined) {
            ctx.symbolTable.extend(ctx.parent.symbolTable, "both")
        }

        // Inherit from any previous siblings.
        const sibling = ctx.getPreviousSiblingRuleContext(indexInParent)
        if (sibling?.symbolTable !== undefined) {
            ctx.symbolTable.extend(sibling.symbolTable, "both")

            // Inherit deferred symbols from a local assignment sibling.
            if (sibling instanceof LocalAssignmentContext) {
                ctx.symbolTable.add(sibling.deferred as Scope)
            }

            // Inherit globals from the last rule context of our sibling.
            const lastSiblingChild = sibling.getLastChildRuleContext()
            if (lastSiblingChild !== undefined) {
                if (lastSiblingChild.symbolTable !== undefined) {
                    ctx.symbolTable.extend(lastSiblingChild.symbolTable, "globals")
                }
            }
        }

        if (indexInParent !== undefined) {
            const deferred = this.inheritDeferred(ctx, indexInParent)
            if (deferred !== undefined) {
                this.tree.addScope(deferred)
            }
        }

        // Extract symbols from this scope.
        const info = this.getContextScopeInfo(ctx)
        ctx.symbolTable.add(info.scope)
        this.tree?.addScope(
            info.scope,
            info.nextFrame === undefined
                ? undefined
                : { nextFrame: info.nextFrame, owner: ctx }
        )
        if (this.tree !== undefined) {
            ctx.documentSymbols = this.tree.peek()
        }
    }

    exitEveryRule(ctx: ParserRuleContext): void {
        this.tree?.pop(ctx)
        if (ctx instanceof ChunkContext) {
            ctx.documentSymbols = this.tree.get()
        }
    }

    enterChunk(ctx: ChunkContext): void {
        this.tree = new DocumentSymbolTree(ctx)
    }

    private getContextScopeInfo(ctx: ParserRuleContext): ContextSymbolInfo {
        if (ctx instanceof NumericForContext) {
            return this.parseNumericFor(ctx)
        } else if (ctx instanceof GenericForContext) {
            return this.parseGenericFor(ctx)
        } else if (ctx instanceof GlobalFunctionContext) {
            return this.parseGlobalFunction(ctx)
        } else if (ctx instanceof LocalFunctionContext) {
            return this.parseLocalFunction(ctx)
        } else if (ctx instanceof LocalAssignmentContext) {
            return this.parseLocalAssignment(ctx)
        } else if (ctx instanceof AnonymousFunctionExpressionContext) {
            return this.parseAnonymousFunctionExpression(ctx)
        } else if (ctx instanceof PrefixContext) {
            return this.parsePrefix(ctx)
        } else if (ctx instanceof SuffixContext) {
            return this.parseSuffix(ctx)
        } else if (ctx instanceof IndexContext) {
            return this.parseIndex(ctx)
        } else if (ctx instanceof VariableContext) {
            return this.parseVariable(ctx)
        } else if (ctx instanceof FunctionCallContext) {
            return this.parseFunctionCall(ctx)
        } else if (ctx instanceof FieldContext) {
            return this.parseField(ctx)
        } else {
            return {
                scope: Scope.make(),
            }
        }
    }

    private inheritDeferred(
        ctx: ParserRuleContext,
        indexInParent: number
    ): Scope | undefined {
        const deferred = ctx.parent?.deferred
        if (deferred === undefined) {
            return undefined
        }

            return undefined
        }

        const lastSibling = (ctx.parent as ParserRuleContext).children?.[
            indexInParent - 1
        ]
        if (lastSibling === undefined) {
            ;(ctx.symbolTable as SymbolTable).add(deferred)
        } else {
            if (ctx.parent instanceof NumericForContext) {
                if (lastSibling.text === "do") {
                    ;(ctx.symbolTable as SymbolTable).add(deferred)
                }
            } else if (ctx.parent instanceof GenericForContext) {
                if (lastSibling.text === "do") {
                    ;(ctx.symbolTable as SymbolTable).add(deferred)
                }
            } else {
                ;(ctx.symbolTable as SymbolTable).add(deferred)
            }
        }
        return deferred
    }

    private parseNumericFor(ctx: NumericForContext): ContextSymbolInfo {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        ctx.deferred.local.push({
            container: ctx,
            name: ctx.NAME().text,
            nameStart: 1,
            nameEnd: 1,
        })
        return {
            scope: Scope.make(),
        }
    }

    private parseGenericFor(ctx: GenericForContext): ContextSymbolInfo {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        let nameIndex = 1
        for (const name of ctx.NAME()) {
            ctx.deferred.local.push({
                container: ctx,
                name: name.text,
                nameStart: nameIndex,
                nameEnd: nameIndex,
            })
            nameIndex += 2
        }
        return {
            scope: Scope.make(),
        }
    }

    private parseGlobalFunction(ctx: GlobalFunctionContext): ContextSymbolInfo {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        const scope = Scope.make()
        let nextFrame: string | undefined = undefined
        for (let i = 1; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode) {
                if (i === 1) {
                    const funcSymbol: Omit<TspSymbol, "nameEnd"> = {
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        type: LuaType.FUNCTION,
                    }
                    // Consume children to make the symbol name.
                    // Alternative ` ('.' NAME)* `
                    while (ctx.children?.[i + 1]?.text === ".") {
                        funcSymbol.name += "."
                        i += 2
                        funcSymbol.name += ctx.children[i]?.text ?? ""
                    }
                    // Alternative ` (':' NAME)? `
                    if (ctx.children?.[i + 1]?.text === ":") {
                        funcSymbol.name += ":"
                        i += 2
                        funcSymbol.name += ctx.children[i]?.text ?? ""
                    }
                    scope.global.push({
                        ...funcSymbol,
                        nameEnd: i,
                    })
                    nextFrame = funcSymbol.name
                } else if (child.symbol.type === TspParser.NAME) {
                    ctx.deferred.local.push({
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.VARARG) {
                    ctx.deferred.local.push({
                        container: ctx,
                        name: "arg",
                        nameStart: i,
                        nameEnd: i,
                        type: LuaType.TABLE,
                        fields: [
                            {
                                container: ctx,
                                name: "n",
                                nameStart: i,
                                nameEnd: i,
                                type: LuaType.NUMBER,
                            },
                        ],
                    })
                    // Varargs are always the last argument, so we're done parsing symbols.
                    break
                }
            }
        }
        return {
            scope,
            nextFrame,
        }
    }

    private parseLocalFunction(ctx: LocalFunctionContext): ContextSymbolInfo {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        const scope = Scope.make()
        let nextFrame: string | undefined = undefined
        for (let i = 2; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode) {
                if (i === 2) {
                    nextFrame = child.text
                    scope.local.push({
                        container: ctx,
                        name: nextFrame,
                        nameStart: i,
                        nameEnd: i,
                        type: LuaType.FUNCTION,
                    })
                } else if (child.symbol.type === TspParser.NAME) {
                    ctx.deferred.local.push({
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.VARARG) {
                    ctx.deferred.local.push({
                        container: ctx,
                        name: "arg",
                        nameStart: i,
                        nameEnd: i,
                        type: LuaType.TABLE,
                        fields: [
                            {
                                container: ctx,
                                name: "n",
                                nameStart: i,
                                nameEnd: i,
                                type: LuaType.NUMBER,
                            },
                        ],
                    })
                    // Varargs are always the last argument, so we're done parsing symbols.
                    break
                }
            }
        }
        return {
            scope,
            nextFrame,
        }
    }

    private parseLocalAssignment(ctx: LocalAssignmentContext): ContextSymbolInfo {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        let nameIndex = 1
        for (const name of ctx.NAME()) {
            ctx.deferred.local.push({
                container: ctx,
                name: name.text,
                nameStart: nameIndex,
                nameEnd: nameIndex,
            })
            nameIndex += 2
        }
        return {
            scope: Scope.make(),
        }
    }

    private parseAnonymousFunctionExpression(
        ctx: AnonymousFunctionExpressionContext
    ): ContextSymbolInfo {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        for (let i = 2; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode) {
                if (child.symbol.type === TspParser.NAME) {
                    ctx.deferred.local.push({
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.VARARG) {
                    ctx.deferred.local.push({
                        container: ctx,
                        name: "arg",
                        nameStart: i,
                        nameEnd: i,
                        type: LuaType.TABLE,
                        fields: [
                            {
                                container: ctx,
                                name: "n",
                                nameStart: i,
                                nameEnd: i,
                                type: LuaType.NUMBER,
                            },
                        ],
                    })
                    // Varargs are always the last argument, so we're done parsing symbols.
                    break
                }
            }
        }

        // Create a unique DocumentSymbol for this callback
        const nextFrame = "<unknown> callback"
        const symbol: DocumentSymbol = {
            kind: SymbolKind.Function,
            name: nextFrame,
            range: ctx.span,
            selectionRange: ctx.span,
            children: [],
        }
        this.tree.add(symbol)

        return {
            nextFrame,
            scope: Scope.make(),
        }
    }

    private parsePrefix(ctx: PrefixContext): ContextSymbolInfo {
        let scope: Scope
        // Alternative ` NAME ` of rule "prefix".
        const name = ctx.NAME()
        if (name === undefined) {
            scope = Scope.make()
        } else {
            scope = {
                global: [
                    {
                        container: ctx,
                        name: name.text,
                        nameStart: 0,
                        nameEnd: 0,
                    },
                ],
                local: [],
            }
        }
        return { scope }
    }

    private parseSuffix(ctx: SuffixContext): ContextSymbolInfo {
        let scope: Scope
        // Alternative ` (':' NAME)? args ` of rule "suffix".
        const name = ctx.NAME()
        if (name === undefined) {
            scope = Scope.make()
        } else {
            scope = {
                global: [],
                local: [
                    {
                        container: ctx,
                        name: name.text,
                        nameStart: 1,
                        nameEnd: 1,
                        type: LuaType.FUNCTION,
                    },
                ],
            }
        }
        return { scope }
    }

    private parseIndex(ctx: IndexContext): ContextSymbolInfo {
        let scope: Scope
        // Alternative ` '.' NAME ` of rule "index".
        const name = ctx.NAME()
        if (name === undefined) {
            scope = Scope.make()
        } else {
            scope = {
                global: [],
                local: [
                    {
                        container: ctx,
                        name: name.text,
                        nameStart: 1,
                        nameEnd: 1,
                    },
                ],
            }
        }
        return { scope }
    }

    private parseVariable(ctx: VariableContext): ContextSymbolInfo {
        let scope: Scope
        // Alternative ` NAME ` of rule "variable".
        const name = ctx.NAME()
        if (name === undefined) {
            scope = Scope.make()
        } else {
            scope = {
                global: [
                    {
                        container: ctx,
                        name: name.text,
                        nameStart: 0,
                        nameEnd: 0,
                    },
                ],
                local: [],
            }
        }
        return { scope }
    }

    private parseFunctionCall(ctx: FunctionCallContext): ContextSymbolInfo {
        const scope = Scope.make()

        // 3 is the first possible index of a NAME child.
        for (let i = 3; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode && child.symbol.type === TspParser.NAME) {
                scope.local.push({
                    container: ctx,
                    name: child.text,
                    nameStart: i,
                    nameEnd: i,
                    type: LuaType.FUNCTION,
                })
            }
        }
        return { scope }
    }

    private parseField(ctx: FieldContext): ContextSymbolInfo {
        let scope: Scope
        const name = ctx.NAME()
        if (name === undefined) {
            scope = Scope.make()
        } else {
            scope = {
                global: [],
                local: [
                    {
                        container: ctx,
                        name: name.text,
                        nameStart: 0,
                        nameEnd: 0,
                    },
                ],
            }
        }
        return { scope }
    }
}
