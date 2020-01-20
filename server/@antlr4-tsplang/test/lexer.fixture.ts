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
import { CommonToken } from "antlr4ts"

// An infinitely nested string array type.
type NestedArray<T> = Array<string | T>
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface RecursiveStringArray extends NestedArray<RecursiveStringArray> {}

// Remove all dimensionality from the recursive array. N-D array -> 1-D array.
export function flatten(value: RecursiveStringArray): Array<string> {
    const result = new Array<string>()
    value.forEach(v => {
        if (typeof v === "object") {
            result.push(...flatten(v))
        } else {
            result.push(v)
        }
    })
    return result
}

// Array<CommonToken>.map helper function to extract the token type.
export const typeExtractor = (token: CommonToken): number => token.type
// Array<TokenType>.map helper function to extract the vocab name.
export const nameExtractor = function(ttype: number): string {
    return this.vocabulary.getSymbolicName(ttype)
}
