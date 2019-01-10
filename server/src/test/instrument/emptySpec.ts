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

import { InstrumentSpec } from '../../instrument'

export const emptySpec: InstrumentSpec = {
    beeper: { hertz: { max: NaN, min: NaN }, seconds: { max: NaN, min: NaN } },
    defaults: {
        contact: { threshold: 'foo' },
        digitize: { range: { current: NaN, voltage: NaN } },
        measure: { range: { current: NaN, resistance: NaN, voltage: NaN } },
        source: {
            ilimit: { level: NaN },
            pulse: {
                ilimit: { level: NaN },
                vlimit: { level: NaN }
            },
            vlimit: { level: NaN }
        }
    },
    extendedRanges: { current: [NaN], voltage: [NaN] },
    interlock: { maxNominal: NaN, maxSource: NaN },
    overflow: NaN,
    pulse: {
        extended: { percentDutyCycle: NaN, time: { max: NaN, min: NaN } },
        percentDutyCycle: NaN,
        time: { max: NaN, min: NaN }
    },
    ranges: {
        autolow: { maxCurrent: NaN, maxResistance: NaN, maxVoltage: NaN },
        current: [NaN],
        digitize: {
            aperture: { max: NaN, min: NaN, resolution: 'foo' },
            count: { max: NaN, min: NaN }
        },
        resistance: [NaN],
        voltage: [NaN]
    }
}

export const emptySpecUndefinedOptionals: InstrumentSpec = {
    beeper: { hertz: { max: NaN, min: NaN }, seconds: { max: NaN, min: NaN } },
    defaults: { measure: { range: { current: NaN, resistance: NaN, voltage: NaN } } },
    interlock: { maxNominal: NaN, maxSource: NaN },
    overflow: NaN,
    ranges: {
        autolow: { maxCurrent: NaN, maxResistance: NaN, maxVoltage: NaN },
        current: [NaN],
        resistance: [NaN],
        voltage: [NaN]
    }
}
