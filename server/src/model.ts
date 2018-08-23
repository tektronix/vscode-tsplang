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

export namespace Model {
    export const KI2450 = '2450'
    export const KI2460 = '2460'
    export const KI2461 = '2461'
    export const KI2461SYS = '2461-sys'
    export const KI6500 = '6500'
    export function fromString(value: string): Model {
        if (value === KI2450
                || value === KI2460
                || value === KI2461
                || value === KI2461SYS
                || value === KI6500) {
            return value as Model
        }
        else {
            return undefined
        }
    }
}
export type Model = '2450' | '2460' | '2461' | '2461-sys' | '6500' | undefined
