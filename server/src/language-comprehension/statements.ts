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

import { SymbolKind } from 'vscode-languageserver'

export enum StatementType {
    None,
    Assignment,
    FunctionCall,
    Do,
    While,
    Repeat,
    If,
    Return,
    Break,
    For,
    Function,
    FunctionLocal,
    AssignmentLocal
}
export namespace StatementType {
    export function toString(type: StatementType): string {
        switch (type) {
            case StatementType.None:
                return 'None'
            case StatementType.Assignment:
                return 'Assignment'
            case StatementType.FunctionCall:
                return 'FunctionCall'
            case StatementType.Do:
                return 'Do'
            case StatementType.While:
                return 'While'
            case StatementType.Repeat:
                return 'Repeat'
            case StatementType.If:
                return 'If'
            case StatementType.Return:
                return 'Return'
            case StatementType.Break:
                return 'Break'
            case StatementType.For:
                return 'For'
            case StatementType.Function:
                return 'Function'
            case StatementType.FunctionLocal:
                return 'FunctionLocal'
            case StatementType.AssignmentLocal:
                return 'AssignmentLocal'
            default:
                return 'Unknown'
        }
    }
    export function toSymbolKind(type: StatementType): SymbolKind | undefined {
        switch (type) {
            case StatementType.Assignment:
            case StatementType.AssignmentLocal:
                return SymbolKind.Variable
            case StatementType.Function:
            case StatementType.FunctionLocal:
                return SymbolKind.Function
            default:
                return
        }
    }
}

export namespace StatementAmbiguity {
    export const LOCAL: [StatementType, StatementType] = [StatementType.AssignmentLocal, StatementType.FunctionLocal]
    export const FLOATING_TOKEN: [StatementType, StatementType] = [StatementType.Assignment, StatementType.FunctionCall]
    export function equal(a: [StatementType, StatementType], b: StatementAmbiguity): boolean {
        return (a[0] === b[0]) && (a[1] === b[1])
    }
    // tslint:disable-next-line:no-any
    export function is(value: any): boolean {
        return (value instanceof Array)
            && (value.length === StatementAmbiguity.LOCAL.length)
            && (typeof(value[0]) === 'number')
            && (typeof(value[1]) === 'number')
    }
    export function toString(value: [StatementType, StatementType]): string {
        switch (value) {
            case StatementAmbiguity.FLOATING_TOKEN:
                return 'Floating Token Ambiguity'
            case StatementAmbiguity.LOCAL:
                return 'Local Ambiguity'
            default:
                return '[' + StatementType.toString(value[0]) + ',' + StatementType.toString(value[1]) + ']'
        }
    }
}
export type StatementAmbiguity = [StatementType, StatementType]
