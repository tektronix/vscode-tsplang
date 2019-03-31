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

import { ParserRuleContext } from 'antlr4'

/**
 * Recursively calls `antlr4.ParserRuleContext.getChild` until the ith instance of the given type is found.
 * @param context The context whose ith child of the given type should be retrieved.
 * @param i The number of instances of the given type that should be ignored.
 * Passing zero will retrieve the first instance.
 * @param type The type of child that should be retrieved.
 * @returns The ith instance of the given type or null if the target could not be found.
 */
// tslint:disable:no-any
export function getChildRecursively(context: ParserRuleContext, i: number, type: any): any | null {
    let result: any | null = context.getChild(i, type)

    for (let j = 0; j < context.getChildCount(); j++) {
        if (result !== null) {
            return result
        }

        result = getChildRecursively(context.getChild(j), i, type)
    }

    return result
}
