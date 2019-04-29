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

import { Token } from 'antlr4'

import { Ambiguity } from './ambiguities'
import { StatementType } from './statements'

export function statementRecognizer(tokens: Array<Token>): StatementType | Ambiguity {
    if (tokens.length === 0) {
        return StatementType.None
    }

    switch (tokens[0].text) {
        case 'do':
            return StatementType.Do
        case 'while':
            return StatementType.While
        case 'repeat':
            return StatementType.Repeat
        case 'if':
            return StatementType.If
        case 'return':
            return StatementType.Return
        case 'break':
            return StatementType.Break
        case 'for':
            return StatementType.For
        case 'function':
            return StatementType.Function
        case 'local':
            // Need a second Token to differentiate between a FunctionLocal and AssignmentLocal.
            if (tokens.length > 1) {
                return (tokens[1].text.localeCompare('function') === 0)
                    ? StatementType.FunctionLocal
                    : StatementType.AssignmentLocal
            }
            else {
                return Ambiguity.LOCAL
            }
        default:
            return Ambiguity.FLOATING_TOKEN
    }
}
