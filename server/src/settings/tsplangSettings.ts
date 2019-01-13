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

import { CompletionItemKind } from 'vscode-languageserver'

import { SuggestionSortKind } from './suggestionSortKind'

export interface TsplangSettings {
    enumerationSuggestions: SuggestionSortKind
}
export namespace TsplangSettings {
    /**
     * Creates a TsplangSettings object with default values.
     * @returns A default TsplangSettings object.
     */
    export function defaults(): TsplangSettings {
        return {
            enumerationSuggestions: SuggestionSortKind.INLINE
        }
    }

    /**
     * Returns a Map from the given settings that can be used as a recipe to create CompletionItem.sortText.
     * @param settings The settings used to seed the sort map.
     * @returns A Map object keyed on a CompletionItemKind whose key-value is the desired SuggestionSortKind.
     */
    export function sortMap(settings: TsplangSettings): Map<CompletionItemKind, SuggestionSortKind> {
        return new Map([
            [CompletionItemKind.EnumMember, settings.enumerationSuggestions]
        ])
    }
}
