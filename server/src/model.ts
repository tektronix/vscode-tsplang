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

export enum Model {
    KI2450 = '2450',
    KI2460 = '2460',
    KI2461 = '2461',
    KI2461SYS = '2461-sys',
    KI6500 = '6500',
    LUA = 'lua'
}
export namespace Model {
    export function fromString(value: string): Model | undefined {
        if (value === Model.KI2450
                || value === Model.KI2460
                || value === Model.KI2461
                || value === Model.KI2461SYS
                || value === Model.KI6500
                || value === Model.LUA) {
            return value as Model
        }
        else {
            return undefined
        }
    }
}
