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

interface Range {
    max: number
    min: number
}

export interface InstrumentSpec {
    beeper: {
        hertz: Range;
        seconds: Range;
    }
    defaults: {
        contact?: {
            threshold: string;
        };
        digitize?: {
            range: {
                current: number;
                voltage: number;
            };
        };
        measure: {
            range: {
                current: number;
                resistance: number;
                voltage: number;
            };
        };
        source?: {
            ilimit: {
                level: number;
            };
            pulse?: {
                ilimit: {
                    level: number;
                };
                vlimit: {
                    level: number;
                };
            };
            vlimit: {
                level: number;
            };
        };
    }
    extendedRanges?: {
        current: Array<number>;
        voltage: Array<number>;
    }
    interlock: {
        maxNominal: number;
        maxSource: number;
    }
    overflow: number
    pulse?: {
        extended?: {
            percentDutyCycle: number;
            time: Range;
        };
        percentDutyCycle: number;
        time: Range;
    }
    ranges: {
        autolow: {
            maxCurrent: number;
            maxResistance: number;
            maxVoltage: number;
        };
        current: Array<number>;
        digitize?: {
            aperture: Range & {
                resolution: string;
            };
            count: Range;
        };
        resistance: Array<number>;
        voltage: Array<number>;
    }
}
