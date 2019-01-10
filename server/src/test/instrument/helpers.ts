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

export function ArrayUnion<T>(a: Array<T>, b: Array<T>): Array<T> {
    return new Array<T>(...a, ...b)
}

 /**
  * Updates the first Map with all of the key-value pairs from the second.
  */
export function MapMerge<K, V>(a: Map<K, V>, b: Map<K, V>): Map<K, V> {
    const result = new Map<K, V>(a.entries())

    b.forEach((value: V, key: K) => {
        result.set(key, value)
    })

    return result
}
