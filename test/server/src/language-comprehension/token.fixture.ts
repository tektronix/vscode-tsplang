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

// tslint:disable:no-any
export class Token {
    channel: any
    column: number
    line: number
    source: any
    start: number
    stop: number
    readonly text: string
    tokenIndex: number
    type: any

    constructor(text: string) {
        this.text = text

        this.channel = undefined
        this.column = NaN
        this.line = NaN
        this.source = undefined
        this.start = NaN
        this.stop = NaN
        this.tokenIndex = NaN
        this.type = undefined
    }

    getInputStream = (): any => { return }
    getTokenSource = (): any => { return }
}
