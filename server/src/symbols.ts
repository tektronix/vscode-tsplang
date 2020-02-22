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
    ChunkContext,
    ParserRuleContext,
    TspListener,
    GlobalAssignmentContext,
    BlockContext,
    WhileLoopContext,
    RepeatLoopContext,
    IfStatementContext,
    NumericForContext,
    GenericForContext,
    GlobalFunctionContext,
    LocalFunctionContext,
    LocalAssignmentContext,
    StatementContext,
    ValueContext,
    ExpressionContext,
    PrefixContext,
    SuffixContext,
    IndexContext,
    VariableContext,
    FunctionCallContext,
    ArgsContext,
    TableConstructorContext,
    FieldListContext,
    FieldContext,
    AnonymousFunctionExpressionContext,
    TerminalNode,
    TspParser,
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
    declaration?: ParserRuleContext
    fields?: TspSymbol[]
    like?: ParserRuleContext[]
    type?: LuaType
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
                            ? [...sibling.scope.global]
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
                    inherit.local = [...sibling.scope.local]
                } else if (ctx.parent?.scope?.local !== undefined) {
                    inherit.local = [...ctx.parent.scope.local]
                }

                return { ...result, ...inherit }
            }
        }
        if (ctx.parent?.scope !== undefined) {
            // Inherit from the parent context.
            result = {
                global: [...ctx.parent.scope.global],
                local: [...ctx.parent.scope.local],
            }
        }

        return result
    }
}
