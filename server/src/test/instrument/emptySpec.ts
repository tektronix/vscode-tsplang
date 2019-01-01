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

import { InstrumentSpec } from '../../instrument'

export const emptySpec: InstrumentSpec = {
    beeper: { maxHertz: NaN, maxSeconds: NaN, minHertz: NaN, minSeconds: NaN },
    contact: { defaultThreshold: 'foo' },
    current: {
        measure: { level: { high: NaN, low: NaN }, range: { default: 1, high: NaN, low: NaN } },
        source: { rangeDefault: NaN, ranges: [ NaN ] }
    },
    overflow: NaN,
    resistance: { level: { high: NaN, low: NaN }, range: { default: 1, high: NaN, low: NaN } },
    smuInterlock: { maxNominalVoltageTripped: NaN, maxSourceVoltageTripped: NaN },
    smuMeasureAutorange: {
        currentLowDefault: NaN,
        resistanceHighDefault: NaN,
        resistanceLowDefault: NaN,
        voltageLowDefault: NaN
    },
    smuSourceSweepLog: { currentLevelLow: NaN, voltageLevelLow: NaN },
    voltage: {
        measure: { level: { high: NaN, low: NaN }, range: { default: 1, high: NaN, low: NaN } },
        source: { rangeDefault: NaN, ranges: [ NaN ] }
    }
}

export const emptySpecUndefinedOptionals: InstrumentSpec = {
    beeper: { maxHertz: NaN, maxSeconds: NaN, minHertz: NaN, minSeconds: NaN },
    current: {
        measure: { level: { high: NaN, low: NaN }, range: { high: NaN, low: NaN } },
        source: { rangeDefault: NaN, ranges: [ NaN ] }
    },
    overflow: NaN,
    resistance: { level: { high: NaN, low: NaN }, range: { high: NaN, low: NaN } },
    smuInterlock: { maxNominalVoltageTripped: NaN, maxSourceVoltageTripped: NaN },
    smuMeasureAutorange: {
        currentLowDefault: NaN,
        resistanceHighDefault: NaN,
        resistanceLowDefault: NaN,
        voltageLowDefault: NaN
    },
    smuSourceSweepLog: { currentLevelLow: NaN, voltageLevelLow: NaN },
    voltage: {
        measure: { level: { high: NaN, low: NaN }, range: { high: NaN, low: NaN } },
        source: { rangeDefault: NaN, ranges: [ NaN ] }
    }
}
