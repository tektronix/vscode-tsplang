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
    ArgsContext,
    BlockContext,
    ChunkContext,
    ExpressionContext,
    FieldContext,
    FieldListContext,
    FunctionCallContext,
    GenericForContext,
    GlobalAssignmentContext,
    GlobalFunctionContext,
    IfStatementContext,
    IndexContext,
    LocalAssignmentContext,
    LocalFunctionContext,
    NumericForContext,
    ParserRuleContext,
    PrefixContext,
    RepeatLoopContext,
    StatementContext,
    SuffixContext,
    TableConstructorContext,
    TerminalNode,
    TspListener,
    TspParser,
    ValueContext,
    VariableContext,
    WhileLoopContext,
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

export class ScopeMaker implements TspListener {
    // ParseTreeListener interface members
    readonly visitTerminal = undefined
    readonly visitErrorNode = undefined
    readonly enterEveryRule = undefined
    readonly exitEveryRule = undefined

    constructor() {
        // blank
    }

    enterGlobalAssignment(ctx: GlobalAssignmentContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterBlock(ctx: BlockContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterWhileLoop(ctx: WhileLoopContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterRepeatLoop(ctx: RepeatLoopContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterIfStatement(ctx: IfStatementContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterNumericFor(ctx: NumericForContext): void {
        ctx.scope = this.initScope(ctx)

        ctx.scope.local.push({
            container: ctx,
            name: ctx.NAME().text,
            nameStart: 1,
            nameEnd: 1,
        })
    }

    enterGenericFor(ctx: GenericForContext): void {
        ctx.scope = this.initScope(ctx)

        let nameIndex = 1
        for (const name of ctx.NAME()) {
            ctx.scope.local.push({
                container: ctx,
                name: name.text,
                nameStart: nameIndex,
                nameEnd: nameIndex,
            })
            nameIndex += 2
        }
    }

    enterGlobalFunction(ctx: GlobalFunctionContext): void {
        ctx.scope = this.initScope(ctx)

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
                    // ('.' NAME)*
                    while (ctx.children?.[i + 1]?.text === ".") {
                        funcSymbol.name += "."
                        i += 2
                        funcSymbol.name += ctx.children[i]?.text ?? ""
                    }
                    // (':' NAME)?
                    if (ctx.children?.[i + 1]?.text === ":") {
                        funcSymbol.name += ":"
                        i += 2
                        funcSymbol.name += ctx.children[i]?.text ?? ""
                    }
                    ctx.scope.global.push({
                        ...funcSymbol,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.NAME) {
                    ctx.scope.local.push({
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.VARARG) {
                    ctx.scope.local.push({
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
    }

    enterLocalFunction(ctx: LocalFunctionContext): void {
        ctx.scope = this.initScope(ctx)

        for (let i = 2; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode) {
                if (i === 2) {
                    const funcSymbol: TspSymbol = {
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                        type: LuaType.FUNCTION,
                    }
                    // Make available to later siblings.
                    ctx.parent?.scope?.local.push(funcSymbol)
                    // Make availble inside itself.
                    ctx.scope.global.push(funcSymbol)
                } else if (child.symbol.type === TspParser.NAME) {
                    ctx.scope.local.push({
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.VARARG) {
                    ctx.scope.local.push({
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
    }

    enterLocalAssignment(ctx: LocalAssignmentContext): void {
        ctx.scope = this.initScope(ctx)

        let nameIndex = 1
        for (const name of ctx.NAME()) {
            ctx.scope.local.push({
                container: ctx,
                name: name.text,
                nameStart: nameIndex,
                nameEnd: nameIndex,
            })
            nameIndex += 2
        }
    }

    enterValueExpression(): void {
        // TODO resolve and tag the resulting Lua type.
    }

    enterAnonymousFunctionExpression(ctx: AnonymousFunctionExpressionContext): void {
        ctx.scope = this.initScope(ctx)

        for (let i = 2; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode) {
                if (child.symbol.type === TspParser.NAME) {
                    ctx.scope.local.push({
                        container: ctx,
                        name: child.text,
                        nameStart: i,
                        nameEnd: i,
                    })
                } else if (child.symbol.type === TspParser.VARARG) {
                    ctx.scope.local.push({
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
    }

    enterPowerExpression(): void {
        // TODO resolve and tag the resulting Lua type.
    }

    enterUnaryExpression(): void {
        // TODO resolve and tag the resulting Lua type.
    }

    enterNumericExpression(): void {
        // TODO resolve and tag the resulting Lua type.
    }

    enterStringExpression(): void {
        // TODO resolve and tag the resulting Lua type.
    }

    enterBooleanExpression(): void {
        // TODO resolve and tag the resulting Lua type.
    }

    enterChunk(ctx: ChunkContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterStatement(ctx: StatementContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterValue(ctx: ValueContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterExpression(ctx: ExpressionContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterPrefix(ctx: PrefixContext): void {
        ctx.scope = this.initScope(ctx)

        // NAME
        const name = ctx.NAME()
        if (name !== undefined) {
            ctx.scope.global.push({
                container: ctx,
                name: name.text,
                nameStart: 0,
                nameEnd: 0,
            })
        }
    }

    enterSuffix(ctx: SuffixContext): void {
        ctx.scope = this.initScope(ctx)

        // (':' NAME)? args
        const name = ctx.NAME()
        if (name !== undefined) {
            ctx.scope.local.push({
                container: ctx,
                name: name.text,
                nameStart: 1,
                nameEnd: 1,
                type: LuaType.FUNCTION,
            })
        }
    }

    enterIndex(ctx: IndexContext): void {
        ctx.scope = this.initScope(ctx)

        // '.' NAME
        const name = ctx.NAME()
        if (name !== undefined) {
            ctx.scope.local.push({
                container: ctx,
                name: name.text,
                nameStart: 1,
                nameEnd: 1,
            })
        }
    }

    enterVariable(ctx: VariableContext): void {
        ctx.scope = this.initScope(ctx)

        // NAME
        const name = ctx.NAME()
        if (name !== undefined) {
            ctx.scope.global.push({
                container: ctx,
                name: name.text,
                nameStart: 0,
                nameEnd: 0,
            })
        }
    }

    enterFunctionCall(ctx: FunctionCallContext): void {
        ctx.scope = this.initScope(ctx)

        // 3 is the first possible index of a NAME child.
        for (let i = 3; i < ctx.childCount; i++) {
            const child = ctx.children?.[i]

            if (child instanceof TerminalNode && child.symbol.type === TspParser.NAME) {
                ctx.scope.local.push({
                    container: ctx,
                    name: child.text,
                    nameStart: i,
                    nameEnd: i,
                    type: LuaType.FUNCTION,
                })
            }
        }
    }

    enterArgs(ctx: ArgsContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterTableConstructor(ctx: TableConstructorContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterFieldList(ctx: FieldListContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterField(ctx: FieldContext): void {
        ctx.scope = this.initScope(ctx)

        const name = ctx.NAME()
        if (name !== undefined) {
            ctx.scope.local.push({
                container: ctx,
                name: name.text,
                nameStart: 0,
                nameEnd: 0,
            })
        }
    }

    // NOTE: We aren't listening for operator contexts on purpose.
    //       Same goes for string and number contexts.

    private initScope(ctx: ParserRuleContext): Scope {
        // TODO scope inheritance needs validation!

        let result: Scope = {
            global: [],
            local: [],
        }

        // Decrement through available siblings until we can inherit a scope.
        for (
            let index = (ctx.parent?.children?.indexOf(ctx) ?? 0) - 1;
            index >= 0;
            index--
        ) {
            const sibling = ctx.parent?.children?.[index]
            if (sibling instanceof ParserRuleContext) {
                result = {
                    // Always inherit globals from the last sibling.
                    global:
                        sibling.scope?.global !== undefined
                            ? sibling.scope.global.map(v => TspSymbol.copy(v))
                            : [],
                    // Default value. Special inheritance cases resolved below.
                    local: [],
                }

                const inherit: Partial<Scope> = {}

                // Resolve special local symbol inheritance cases.
                if (
                    sibling instanceof LocalAssignmentContext &&
                    sibling.scope?.local !== undefined
                ) {
                    inherit.local = sibling.scope.local.map(v => TspSymbol.copy(v))
                } else if (ctx.parent?.scope?.local !== undefined) {
                    inherit.local = ctx.parent.scope.local.map(v => TspSymbol.copy(v))
                }

                return { ...result, ...inherit }
            }
        }
        if (ctx.parent?.scope !== undefined) {
            // Inherit from the parent context.
            result = {
                global: ctx.parent.scope.global.map(v => TspSymbol.copy(v)),
                local: ctx.parent.scope.local.map(v => TspSymbol.copy(v)),
            }
        }

        return result
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

    addGlobals(...globals: TspSymbol[]): void {
        for (const symbol of globals) {
            this.global.set(symbol.name, symbol)
        }
    }

    addLocals(...locals: TspSymbol[]): void {
        for (const symbol of locals) {
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
