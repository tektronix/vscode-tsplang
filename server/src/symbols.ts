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
} from "antlr4-tsplang"

export interface TspSymbol {
    container: ParserRuleContext
    name: string
    declaration?: ParserRuleContext
    like?: ParserRuleContext[]
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
    }

    enterGenericFor(ctx: GenericForContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterGlobalFunction(ctx: GlobalFunctionContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterLocalFunction(ctx: LocalFunctionContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterLocalAssignment(ctx: LocalAssignmentContext): void {
        ctx.scope = this.initScope(ctx)
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
    }

    enterSuffix(ctx: SuffixContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterIndex(ctx: IndexContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterVariable(ctx: VariableContext): void {
        ctx.scope = this.initScope(ctx)
    }

    enterFunctionCall(ctx: FunctionCallContext): void {
        ctx.scope = this.initScope(ctx)
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
        for (let index = (ctx.parent?.childCount ?? 0) - 2; index >= 0; index--) {
            const sibling = ctx.parent?.children?.[index]
            if (sibling instanceof ParserRuleContext) {
                if (
                    sibling instanceof GlobalFunctionContext ||
                    sibling instanceof LocalFunctionContext
                ) {
                    // We only want to inherit from functions when they're called.
                    continue
                } else {
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

                    result = { ...result, ...inherit }
                }

                return result
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
