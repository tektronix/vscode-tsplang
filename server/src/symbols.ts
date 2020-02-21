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
        this.initScope(ctx)
    }

    enterBlock(ctx: BlockContext): void {
        this.initScope(ctx)
    }

    enterWhileLoop(ctx: WhileLoopContext): void {
        this.initScope(ctx)
    }

    enterRepeatLoop(ctx: RepeatLoopContext): void {
        this.initScope(ctx)
    }

    enterIfStatement(ctx: IfStatementContext): void {
        this.initScope(ctx)
    }

    enterNumericFor(ctx: NumericForContext): void {
        this.initScope(ctx)
    }

    enterGenericFor(ctx: GenericForContext): void {
        this.initScope(ctx)
    }

    enterGlobalFunction(ctx: GlobalFunctionContext): void {
        this.initScope(ctx)
    }

    enterLocalFunction(ctx: LocalFunctionContext): void {
        this.initScope(ctx)
    }

    enterLocalAssignment(ctx: LocalAssignmentContext): void {
        this.initScope(ctx)
    }

    enterChunk(ctx: ChunkContext): void {
        this.initScope(ctx)
    }

    enterStatement(ctx: StatementContext): void {
        this.initScope(ctx)
    }

    enterValue(ctx: ValueContext): void {
        this.initScope(ctx)
    }

    enterExpression(ctx: ExpressionContext): void {
        this.initScope(ctx)
    }

    enterPrefix(ctx: PrefixContext): void {
        this.initScope(ctx)
    }

    enterSuffix(ctx: SuffixContext): void {
        this.initScope(ctx)
    }

    enterIndex(ctx: IndexContext): void {
        this.initScope(ctx)
    }

    enterVariable(ctx: VariableContext): void {
        this.initScope(ctx)
    }

    enterFunctionCall(ctx: FunctionCallContext): void {
        this.initScope(ctx)
    }

    enterArgs(ctx: ArgsContext): void {
        this.initScope(ctx)
    }

    enterTableConstructor(ctx: TableConstructorContext): void {
        this.initScope(ctx)
    }

    enterFieldList(ctx: FieldListContext): void {
        this.initScope(ctx)
    }

    enterField(ctx: FieldContext): void {
        this.initScope(ctx)
    }

    exitChunk(ctx: ChunkContext): void {
        // Expose all symbols of the ... TODO
        for (let i = ctx.childCount - 1; i > ctx.childCount; i--) {

        }
    }

    // NOTE: We aren't listening for operator contexts on purpose.

    private initScope(ctx: ParserRuleContext): void {
        // TODO scope inheritance needs validation!

        // Decrement through available siblings until we can inherit a scope.
        for (let index = (ctx.parent?.childCount ?? 0) - 2; index > 0; index--) {
            const sibling = ctx.parent?.children?.[index]
            if (sibling instanceof ParserRuleContext) {
                if (
                    sibling instanceof GlobalFunctionContext ||
                    sibling instanceof LocalFunctionContext
                ) {
                    // We only want to inherit from functions when they're called.
                    continue
                } else {
                    ctx.scope = {
                        // Inherit sibling globals.
                        global:
                            sibling.scope?.global !== undefined
                                ? [...sibling.scope.global]
                                : [],
                        // Inherit parent locals.
                        local:
                            ctx.parent?.scope?.local !== undefined
                                ? [...ctx.parent.scope.local]
                                : [],
                    }
                }

                return
            }
        }
        if (ctx.parent?.scope !== undefined) {
            // Inherit from the parent context.
            ctx.scope = {
                global: [...ctx.parent.scope.global],
                local: [...ctx.parent.scope.local],
            }
        } else {
            // Give up and initialize an empty scope.
            ctx.scope = {
                global: [],
                local: [],
            }
        }
    }
}
