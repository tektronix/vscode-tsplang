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
