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

export class SymbolTableMaker implements TspListener {
    // ParseTreeListener interface members
    readonly visitTerminal = undefined
    readonly visitErrorNode = undefined
    readonly exitEveryRule = undefined

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

        this.inheritDeferred(ctx, indexInParent)

        // Extract symbols from this scope.
        ctx.symbolTable.add(this.getScope(ctx))
    }

    private getScope(ctx: ParserRuleContext): Scope {
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
            return Scope.make()
        }
    }

    private inheritDeferred(
        ctx: ParserRuleContext,
        indexInParent: number | undefined
    ): void {
        if (indexInParent === undefined) {
            return
        }

        const deferred = ctx.parent?.deferred
        if (deferred === undefined) {
            return
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
    }

    private parseNumericFor(ctx: NumericForContext): Scope {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        ctx.deferred.local.push({
            container: ctx,
            name: ctx.NAME().text,
            nameStart: 1,
            nameEnd: 1,
        })
        return Scope.make()
    }

    private parseGenericFor(ctx: GenericForContext): Scope {
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
        return Scope.make()
    }

    private parseGlobalFunction(ctx: GlobalFunctionContext): Scope {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        const result = Scope.make()
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
                    result.global.push({
                        ...funcSymbol,
                        nameEnd: i,
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
        return result
    }

    private parseLocalFunction(ctx: LocalFunctionContext): Scope {
        if (ctx.deferred === undefined) {
            ctx.deferred = Scope.make()
        }

        const result = Scope.make()
        for (let i = 2; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode) {
                if (i === 2) {
                    result.local.push({
                        container: ctx,
                        name: child.text,
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
        return result
    }

    private parseLocalAssignment(ctx: LocalAssignmentContext): Scope {
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
        return Scope.make()
    }

    private parseAnonymousFunctionExpression(
        ctx: AnonymousFunctionExpressionContext
    ): Scope {
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

        return Scope.make()
    }

    private parsePrefix(ctx: PrefixContext): Scope {
        // Alternative ` NAME ` of rule "prefix".
        const name = ctx.NAME()
        if (name === undefined) {
            return Scope.make()
        } else {
            return {
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
    }

    private parseSuffix(ctx: SuffixContext): Scope {
        // Alternative ` (':' NAME)? args ` of rule "suffix".
        const name = ctx.NAME()
        if (name === undefined) {
            return Scope.make()
        } else {
            return {
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
    }

    private parseIndex(ctx: IndexContext): Scope {
        // Alternative ` '.' NAME ` of rule "index".
        const name = ctx.NAME()
        if (name === undefined) {
            return Scope.make()
        } else {
            return {
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
    }

    private parseVariable(ctx: VariableContext): Scope {
        // Alternative ` NAME ` of rule "variable".
        const name = ctx.NAME()
        if (name === undefined) {
            return Scope.make()
        } else {
            return {
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
    }

    private parseFunctionCall(ctx: FunctionCallContext): Scope {
        const result = Scope.make()

        // 3 is the first possible index of a NAME child.
        for (let i = 3; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode && child.symbol.type === TspParser.NAME) {
                result.local.push({
                    container: ctx,
                    name: child.text,
                    nameStart: i,
                    nameEnd: i,
                    type: LuaType.FUNCTION,
                })
            }
        }
        return result
    }

    private parseField(ctx: FieldContext): Scope {
        const name = ctx.NAME()
        if (name === undefined) {
            return Scope.make()
        } else {
            return {
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
    }
}
