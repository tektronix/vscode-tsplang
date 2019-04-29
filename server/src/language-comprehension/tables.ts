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

import { IToken } from '../decorators'

/**
 * ## Field Equivalence Rules
 *
 * From https://www.lua.org/manual/5.0/manual.html#2.5.6
 *
 * 1. `[expr1] = expr2` adds a new table entry with `expr1` as the key to
 * the value of `expr2`.
 * 2. `name = expr` is equivalent to `["name"] = expr`.
 * 3. `expr` is equivalent to `[i] = expr`, where `i` is a consecutive
 * integer starting at 1.
 *
 * ## Invalid Field Expressions
 *
 * Despite what the grammar says, these field expressions are invalid.
 *
 * 1. `a.b = 2`
 * 2. `a['b'] = 2`
 * 3. `a[1] = 1`
 */
export enum FieldType {
    /**
     * It depends what lies on the right hand side of the global assignment.
     */
    Unknown,
    Field,
    Function,
    Index,
    Table
}

export interface Field {
    last?: boolean
    name: string
    tokens: {
        start: IToken;
        stop: IToken;
    }
    type: FieldType
}
