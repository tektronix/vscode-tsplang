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

export declare type HRTime = [number, number]

export class DebugTimer {
    timeStack: Array<HRTime>

    constructor() {
        this.timeStack = new Array()
    }

    get running(): boolean {
        return this.timeStack.length > 0
    }

    createRootLog = (time: HRTime): string => {
        const pid = `${process.pid}:`
        // tslint:disable-next-line:no-magic-numbers
        const clk = `${time[0]}s ${time[1] / 1000000}ms`

        return [pid, '--> total time:', clk].join(' ')
    }

    createStatementLog(line: number, column: number, time: HRTime): string {
        const pid = `${process.pid}:`
        // tslint:disable:no-magic-numbers
        const loc = `(Ln ${this.pad(line, 4)}, Col ${this.pad(column, 3)})`
        const clk = `${this.pad(time[0], 3)}s ${this.pad(time[1] / 1000000, 10)}ms`
        // tslint:enable:no-magic-numbers

        return [pid, loc, clk].join(' ')
    }

    start(): void {
        this.timeStack.push(process.hrtime())
    }

    stop(): HRTime {
        return process.hrtime(this.timeStack.pop())
    }

    private pad = (n: number, width: number): string => {
        const padChar = ' '
        const s = n.toString()

        return (s.length >= width) ? s : new Array(width - s.length + 1).join(padChar) + s
    }
}
