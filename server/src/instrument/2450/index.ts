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

import { ApiSpec, InstrumentSpec } from '..'
import { getLuaApiSpec } from '../lua'

const beeper: ApiSpec = {
    children: [
        { label: 'beeper.beep' },
    ],
    label: 'beeper'
}

const buffer: ApiSpec = {
    children: [
        { label: 'buffer.clearstats' },
        { label: 'buffer.delete' },
        { label: 'buffer.getstats' },
        { label: 'buffer.make' },
        { label: 'buffer.save' },
        { label: 'buffer.saveappend' },
    ],
    enums: [
        { label: 'buffer.DIGITS_3_5' },
        { label: 'buffer.DIGITS_4_5' },
        { label: 'buffer.DIGITS_5_5' },
        { label: 'buffer.DIGITS_6_5' },
        { label: 'buffer.DIGITS_7_5' },
        { label: 'buffer.DIGITS_3_5' },
        { label: 'buffer.FILL_CONTINUOUS' },
        { label: 'buffer.FILL_ONCE' },
        { label: 'buffer.OFF' },
        { label: 'buffer.ON' },
        { label: 'buffer.SAVE_FORMAT_TIME' },
        { label: 'buffer.SAVE_RAW_TIME' },
        { label: 'buffer.SAVE_RELATIVE_TIME' },
        { label: 'buffer.SAVE_TIMESTAMP_TIME' },
        { label: 'buffer.STAT_LIMIT' },
        { label: 'buffer.STAT_LIMIT1_HIGH' },
        { label: 'buffer.STAT_LIMIT1_LOW' },
        { label: 'buffer.STAT_LIMIT2_HIGH' },
        { label: 'buffer.STAT_LIMIT2_LOW' },
        { label: 'buffer.STAT_ORIGIN' },
        { label: 'buffer.STAT_OUTPUT' },
        { label: 'buffer.STAT_OVER_TEMP' },
        { label: 'buffer.STAT_PROTECTION' },
        { label: 'buffer.STAT_QUESTIONABLE' },
        { label: 'buffer.STAT_READBACK' },
        { label: 'buffer.STAT_SENSE' },
        { label: 'buffer.STAT_START_GROUP' },
        { label: 'buffer.STAT_TERMINAL' },
        { label: 'buffer.STYLE_COMPACT' },
        { label: 'buffer.STYLE_FULL' },
        { label: 'buffer.STYLE_STANDARD' },
        { label: 'buffer.STYLE_WRITABLE' },
        { label: 'buffer.STYLE_WRITABLE_FULL' },
        { label: 'buffer.UNIT_AMP' },
        { label: 'buffer.UNIT_AMP_AC' },
        { label: 'buffer.UNIT_CELSIUS' },
        { label: 'buffer.UNIT_DECIBEL' },
        { label: 'buffer.UNIT_FAHRENHEIT' },
        { label: 'buffer.UNIT_FARAD' },
        { label: 'buffer.UNIT_HERTZ' },
        { label: 'buffer.UNIT_KELVIN' },
        { label: 'buffer.UNIT_NONE' },
        { label: 'buffer.UNIT_OHM' },
        { label: 'buffer.UNIT_PERCENT' },
        { label: 'buffer.UNIT_RATIO' },
        { label: 'buffer.UNIT_RECIPROCAL' },
        { label: 'buffer.UNIT_SECOND' },
        { label: 'buffer.UNIT_VOLT' },
        { label: 'buffer.UNIT_VOLT_AC' },
        { label: 'buffer.UNIT_WATT' },
        { label: 'buffer.UNIT_X' },
    ],
    label: 'buffer'
}

const bufferWrite: ApiSpec = {
    children: [
        { label: 'buffer.write.format' },
        { label: 'buffer.write.reading' },
    ],
    label: 'buffer.write'
}

export function get2450ApiSpec(): Array<ApiSpec> {
    return getLuaApiSpec().concat([
        beeper,
        buffer,
        bufferWrite
    ])
}

export function get2450InstrumentSpec(): InstrumentSpec {
    return {
        beeper: {
            maxHertz: 8000,
            maxSeconds: 100,
            minHertz: 20,
            minSeconds: 0.001
        },
        current: {
            measure: {
                level: {
                    high: 1.05,
                    low: -1.05
                },
                range: {
                    default: 1e-4,
                    high: 1,
                    low: 1e-9
                }
            },
            source: {
                rangeDefault: 1e-8,
                // tslint:disable-next-line:no-magic-numbers
                ranges: [10e-9, 100e-9, 1e-6, 10e-6, 100e-6, 1e-3, 10e-3, 100e-3, 1]
            }
        },
        overflow: 9.9e37,
        resistance: {
            level: {
                high: 2.1e6,
                low: -2.1e6
            },
            range: {
                default: 200000,
                high: 200e6,
                low: 20
            }
        },
        smuInterlock: {
            maxNominalVoltageTripped: 42,
            maxSourceVoltageTripped: 21
        },
        smuMeasureAutorange: {
            currentLowDefault: 10e-9,
            resistanceHighDefault: 200e6,
            resistanceLowDefault: 20,
            voltageLowDefault: 20
        },
        smuSourceSweepLog: {
            currentLevelLow: 1e-12,
            voltageLevelLow: 1e-12
        },
        voltage: {
            measure: {
                level: {
                    high: 210,
                    low: -210
                },
                range: {
                    default: 0.02,
                    high: 200,
                    low: 0.02
                }
            },
            source: {
                rangeDefault: 2e-2,
                // tslint:disable-next-line:no-magic-numbers
                ranges: [20e-3, 200e-3, 2, 20, 200]
            }
        }
    }
}
