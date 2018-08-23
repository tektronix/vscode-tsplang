/*
 * Type definitions for luaparse v0.2.1
 * Project: https://github.com/oxyc/luaparse
 *
 * Modified by Tektronix. Original Content by Sam Saint-Pettersen
 * <https://github.com/stpettersens> for the DefinitelyTyped project available
 * at https://github.com/DefinitelyTyped/DefinitelyTyped.
 *
 * Except as otherwise noted, the content of this file is licensed under the
 * MIT license. The text of the MIT license is reproduced below.
 *
 * ----------------------------------------------------------------------------
 *
 * Copyright 2018 Tektronix Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * Lua versions supported by luaparse.
 */
export declare enum LuaVersion {
    v5_1 = '5.1',
    v5_2 = '5.2',
    v5_3 = '5.3'
}

export declare enum TypeString {
    AssignmentStatement = 'AssignmentStatement',
    BinaryExpression = 'BinaryExpression',
    BooleanLiteral = 'BooleanLiteral',
    BreakStatement = 'BreakStatement',
    CallExpression = 'CallExpression',
    CallStatement = 'CallStatement',
    Chunk = 'Chunk',
    Comment = 'Comment',
    DoStatement = 'DoStatement',
    ElseClause = 'ElseClause',
    ElseifClause = 'ElseifClause',
    ForGenericStatement = 'ForGenericStatement',
    ForNumericStatement = 'ForNumericStatement',
    FunctionDeclaration = 'FunctionDeclaration',
    GotoStatement = 'GotoStatement',
    Identifier = 'Identifier',
    IfClause = 'IfClause',
    IfStatement = 'IfStatement',
    IndexExpression = 'IndexExpression',
    LabelStatement = 'LabelStatement',
    LocalStatement = 'LocalStatement',
    LogicalExpression = 'LogicalExpression',
    MemberExpression = 'MemberExpression',
    NilLiteral = 'NilLiteral',
    NumericLiteral = 'NumericLiteral',
    RepeatStatement = 'RepeatStatement',
    ReturnStatement = 'ReturnStatement',
    StringCallExpression = 'StringCallExpression',
    StringLiteral = 'StringLiteral',
    TableCallExpression = 'TableCallExpression',
    TableConstructorExpression = 'TableConstructorExpression',
    TableKey = 'TableKey',
    TableKeyString = 'TableKeyString',
    TableValue = 'TableValue',
    UnaryExpression = 'UnaryExpression',
    VarargLiteral = 'VarargLiteral',
    WhileStatement = 'WhileStatement'
}

export declare enum TokenType {
    EOF = 1,
    StringLiteral = 2,
    Keyword = 4,
    Identifier = 8,
    NumericLiteral = 16,
    Punctuator = 32,
    BooleanLiteral = 64,
    NilLiteral = 128,
    VarargLiteral = 256
}

export declare namespace AbstractSyntaxNodes {
    interface INode {
        argument?: INode
        arguments?: Array<INode>
        base?: INode
        body?: Array<INode>
        clauses?: Array<INode>
        comments?: Array<INode>
        condition?: INode
        end?: INode
        expression?: INode
        fields?: Array<INode>
        globals?: Array<INode>
        identifier?: INode
        index?: INode
        indexer?: string
        init?: Array<INode>
        isLocal?: boolean
        iterators?: Array<INode>
        key?: INode
        label?: INode
        left?: INode
        loc?: Location
        name?: string
        operator?: string
        parameters?: Array<INode>
        range?: Range
        raw?: string
        right?: INode
        start?: INode
        step?: INode
        type: TypeString
        value?: boolean | INode | null | number | string
        variable?: INode
        variables?: Array<INode>
    }

    type Chunk = INode
}

export interface Position {
    line: number,
    column: number
}

export interface Location {
    start: Position,
    end: Position
}

export interface Range {
    start: number,
    end: number
}

export interface LuaParseOptions {
    /**
     * Store comments as an array in the chunk object. Defaults to `true`.
     */
    comments?: boolean,
    /**
     * Whether to allow code points outside the Basic Latin block in
     * identifiers. Defaults to `false`.
     */
    extendedIdentifiers?: boolean,
    /**
     * Store location information on each syntax node as
     * `loc: { start: { line, column }, end: { line, column } }`. Defaults to
     * `false`.
     */
    locations?: boolean,
    /**
     * The version of Lua targeted by the parser. Defaults to '5.1'.
     */
    luaVersion?: LuaVersion,
    /**
     * Store the start and end character locations on each syntax node as
     * `range: [start, end]`. Defaults to `false`.
     */
    ranges?: boolean,
    /**
     * Track identifier scopes by adding an `isLocal` attribute to each
     * identifier-node. Defaults to `false`.
     */
    scope?: boolean,
    /**
     * Explicitly tell the parser when the input ends. Defaults to `false`.
     */
    wait?: boolean,
    /**
     * A callback which will be invoked when a syntax node as been completed.
     * The node which has been created will be passed as the only parameter.
     * @param node The newly created node object.
     */
    onCreateNode?(node: Object): void,
    /**
     * A callback which will be invoked when a new scope is created.
     */
    onCreateScope?(): void,
    /**
     * A callback which will be invoked when the current scope is destroyed.
     */
    onDestroyScope?(): void,
    /**
     * A callback which will be invoked when a local variable is declared in
     * the current scope. The variable's name will be passed as the only
     * parameter.
     * @param name The name of the newly declared local variable.
     */
    onLocalDeclaration?(name: string): void
}

/**
 * Parses the given Lua source code.
 * @param code Lua source code to parse.
 * @param options Optional parser options.
 */
export declare function parse(code: string, options?: LuaParseOptions): AbstractSyntaxNodes.Chunk;
