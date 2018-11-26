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

import { Position } from 'vscode-languageserver'

import { InstrumentCompletionItem } from '../../wrapper'

export interface GlobalContext {
    completion: InstrumentCompletionItem,
    position: Position
}
export namespace GlobalContext {
    /**
     * Compare the completion.label and completion.data.domains properties of two items to determine their equality.
     * @param a The first item.
     * @param b The second item.
     * @returns True if the two items match and false otherwise.
     */
    export function completionsEqual(a: GlobalContext, b: GlobalContext): boolean {
        return InstrumentCompletionItem.namespacesEqual(a.completion, b.completion)
    }
}
