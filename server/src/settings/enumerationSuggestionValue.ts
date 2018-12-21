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
'use strict'

export namespace EnumerationSuggestionValue {
    export const BOTTOM = 'bottom'
    export const INLINE = 'inline'
    export const TOP = 'top'

    const bottomSortCharacter = '\u007E'
    const topSortCharacter = '\u0020'

    /**
     * Adds a sorting character to the beginning of a string.
     * @param target The string to prepend with a sorting character.
     * @param type The type of sorting character to prepend.
     * @returns The resulting string.
     */
    export function addSortCharacter(target: string, type: EnumerationSuggestionValue): string {
        switch (type) {
            case EnumerationSuggestionValue.BOTTOM:
                return bottomSortCharacter + target.toLocaleLowerCase()

            case EnumerationSuggestionValue.TOP:
                return topSortCharacter + target.toLocaleLowerCase()

            default:
                return target.toLocaleLowerCase()
        }
    }
}
export type EnumerationSuggestionValue = 'bottom' | 'inline' | 'top'
