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

import { CompletionItem } from 'vscode-languageserver'

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
                return bottomSortCharacter + target

            case EnumerationSuggestionValue.TOP:
                return topSortCharacter + target

            default:
                return target
        }
    }

    /**
     * Calculates the appropriate CompletionItem.sortText value.
     * @param target The CompletionItem to resolve.
     * @param type How to resolve the sortText property.
     * @returns The appropriate value for the sortText property of the given CompletionItem.
     */
    export function resolveSortText(target: CompletionItem, type: EnumerationSuggestionValue): string | undefined {
        const result = target

        // Remove the sortText property if "inline" is the current setting.
        if (type === EnumerationSuggestionValue.INLINE
                && result.sortText !== undefined) {
            result.sortText = undefined

            return result
        }

        // Add the appropriate sort character if "bottom" or "top" is the current setting.
        result.sortText = addSortCharacter(result.label, type)

        return result
    }
}
export type EnumerationSuggestionValue = 'bottom' | 'inline' | 'top'
