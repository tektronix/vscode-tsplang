/*
 *  Copyright 2018 Tektronix Inc.
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

import { Token } from 'antlr4'

import { TokenUtil } from '../language-comprehension'

export namespace ResolvedNamespace {
    /**
     * This matches how array indexers may appear in a TextDocument
     * and how they currently appear in a SignatureInformation.label
     * (as defined in the Instrument Provider).
     * @see `node.ts` in the Instrument Provider for an example of how
     * indexers appear in some SignatureInformation.label.
     */
    const tableIndexRegExp = new RegExp(/\[[0-9]*\]/g)

    export function create(value: string | Array<Token>): ResolvedNamespace {
        let openParenIndex: number | undefined = (typeof value === 'object')
            ? value.findIndex((token: Token) => token.text.localeCompare('(') === 0)
            : value.indexOf('(')

        if (openParenIndex === -1) {
            openParenIndex = undefined
        }

        const target: string = (typeof value === 'object')
            ? TokenUtil.getString(...value.slice(0, openParenIndex)) || ''
            : value.slice(0, openParenIndex)

        return target.replace(tableIndexRegExp, '')
    }

    export function depth(value: ResolvedNamespace): number {
        // We don't need to coerce negative numbers to zero since string.split() always returns
        // an array with one member.
        return value.split('.').length - 1
    }

    export function equal(a: ResolvedNamespace, b: ResolvedNamespace): boolean {
        return a.localeCompare(b) === 0
    }
}
export type ResolvedNamespace = string
