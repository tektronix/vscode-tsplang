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

import { GlobalContext } from './globalContext'

export class GlobalMap extends Map<string, Array<GlobalContext>> {
    constructor() {
        super()
    }

    /**
     * Combines the current value at the given key with the given value.
     *
     * Same as the set function when the given key does not exist.
     *
     * Nothing is updated if the given value is empty.
     *
     * @param key The key to update.
     * @param value The new value to merge into any existing value.
     */
    merge(key: string, value: Array<GlobalContext>): void {
        if (value.length === 0) {
            return
        }

        // Get the current value at the given key.
        const current = this.get(key)

        // Call the set function if the given key does not exist.
        if (current === undefined) {
            this.set(key, value)

            return
        }

        // Instantiate a new array object from the given value so our search cost won't increase as we add items.
        const result = new Array<GlobalContext>(...value)

        // For each item we currently have that's not in the given value, add it to the result.
        while (current.length > 0) {
            const item = current.shift()

            // Skip empty array items.
            if (item === undefined) {
                continue
            }

            const index = value.findIndex((v: GlobalContext) => {
                return GlobalContext.completionsEqual(item, v)
            })

            if (index === -1) {
                result.push(item)
            }
        }

        // Update the given key with the results.
        this.set(key, result)
    }
}
