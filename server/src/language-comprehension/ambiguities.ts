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

import { StatementType } from './statements'

export namespace Ambiguity {
    export const LOCAL: [StatementType, StatementType] = [StatementType.AssignmentLocal, StatementType.FunctionLocal]
    export const FLOATING_TOKEN: [StatementType, StatementType] = [StatementType.Assignment, StatementType.FunctionCall]
    export function equal(a: [StatementType, StatementType], b: Ambiguity): boolean {
        return (a[0] === b[0]) && (a[1] === b[1])
    }
    // tslint:disable-next-line:no-any
    export function is(value: any): boolean {
        return (value instanceof Array)
            && (value.length === Ambiguity.LOCAL.length)
            && (typeof(value[0]) === 'number')
            && (typeof(value[1]) === 'number')
    }
    export function toString(value: [StatementType, StatementType]): string {
        switch (value) {
            case Ambiguity.FLOATING_TOKEN:
                return 'Floating Token Ambiguity'
            case Ambiguity.LOCAL:
                return 'Local Ambiguity'
            default:
                return '[' + StatementType.toString(value[0]) + ',' + StatementType.toString(value[1]) + ']'
        }
    }
}
export type Ambiguity = [StatementType, StatementType]
