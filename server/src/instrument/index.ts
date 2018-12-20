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

export { CommandSet, CommandSetInterface } from './commandSet'

export declare type DefaultFillValue = 'UNDEFINED'
// tslint:disable-next-line:variable-name
export const DefaultFillValue: DefaultFillValue = 'UNDEFINED'

export interface InstrumentModule {
    getApiSpec(): Array<ApiSpec>
    getInstrumentSpec(): InstrumentSpec
}

export interface BaseApiSpec {
    label: string
}

export interface ExclusiveCompletionApiSpec extends BaseApiSpec {
    /** TODO: use this fill-in CompletionItem.preselect to hightlight the default value. */
    preselect?: boolean
}

export interface SignatureDataApiSpec {
    parameters: Map<number, Array<ExclusiveCompletionApiSpec>>
    qualifier?: number
}

export interface ChildApiSpec extends BaseApiSpec {
    assignmentExclusives?: Array<ExclusiveCompletionApiSpec>
    signatureExclusives?: Array<SignatureDataApiSpec>
}

export interface ApiSpec extends BaseApiSpec {
    children?: Array<ChildApiSpec>
    enums?: Array<ExclusiveCompletionApiSpec>
}

export interface BeeperSpec {
    /**
     * 2450: 8000
     */
    maxHertz: number
    /**
     * 2450: 100
     */
    maxSeconds: number
    /**
     * 2450: 20
     */
    minHertz: number
    /**
     * 2450: 0.001
     */
    minSeconds: number
}

export interface MeasureCurrentSpec {
    /**
     * 2450: -1.05 to 1.05; default 0
     *
     * 2460: -7.35 to 7.35; default 0
     */
    level: RangeSpec
    /**
     * 2450: 1e-9 to 1; default 1e-4
     *
     * 2460: 1e-6 to 7; default 1e-6
     */
    range: RangeSpec
}

export interface MeasureResistanceSpec {
    /**
     * 2450: -2.1e6 to 2.1e6; default 0
     *
     * 2460: -210e6 to 210e6; default 0
     */
    level: RangeSpec
    /**
     * 2450: 20 to 200e6; default 200,000
     *
     * 2460: 2  to 200e6; default 200e6
     */
    range: RangeSpec
}

export interface MeasureVoltageSpec {
    /**
     * 2450: -210 to 210; default 0
     *
     * 2460: -105 to 105; default 0
     */
    level: RangeSpec
    /**
     * 2450: 0.02 to 200; default 0.02
     *
     * 2460: 0.2  to 100; default 2
     */
    range: RangeSpec
}

export interface SourceCurrentSpec {
    /**
     * 2450: 1e-8
     *
     * 2460: 1e-6
     */
    rangeDefault: number
    /**
     * 2450: [10e-9, 100e-9, 1e-6, 10e-6, 100e-6, 1e-3, 10e-3, 100e-3, 1]
     *
     * 2460: [1e-6, 10e-6, 100e-6, 1e-3, 10e-3, 100e-3, 1, 4, 5, 7]
     */
    ranges: Array<number>
}

export interface SourceVoltageSpec {
    /**
     * 2450: 2e-2
     *
     * 2460: 200e-3
     */
    rangeDefault: number
    /**
     * 2450: [20e-3, 200e-3, 2, 20, 200]
     *
     * 2460: [200e-3, 2, 7, 10, 20, 100]
     */
    ranges: Array<number>
}

export interface RangeSpec {
    default?: number | DefaultFillValue
    high: number
    low: number
}

export interface SmuInterlockSpec {
    /**
     * 2450: 42
     *
     * 2460: 42
     */
    maxNominalVoltageTripped: number
    /**
     * 2450: 21
     *
     * 2460: 21
     */
    maxSourceVoltageTripped: number
}

export interface SmuMeasureAutorangeSpec {
    currentHighDefault?: number | DefaultFillValue
    /**
     * 2450: 10e-9
     *
     * 2460: 1e-6
     */
    currentLowDefault: number
    /**
     * 2450: 200e6
     *
     * 2460: 200e6
     */
    resistanceHighDefault: number
    /**
     * 2450: 20
     *
     * 2460: 2
     */
    resistanceLowDefault: number
    voltageHighDefault?: number | DefaultFillValue
    /**
     * 2450: 20
     *
     * 2460: 200e-3
     */
    voltageLowDefault: number
}

export interface SmuSourceSweepLog {
    /**
     * 2450: 1e-12
     *
     * 2460: 1e-6
     */
    currentLevelLow: number
    /**
     * 2450: 1e-12
     *
     * 2460: 200e-3
     */
    voltageLevelLow: number
}

export interface InstrumentSpec {
    beeper: BeeperSpec
    current: {
        measure: MeasureCurrentSpec;
        source: SourceCurrentSpec;
    }
    overflow: number
    resistance: MeasureResistanceSpec
    smuInterlock: SmuInterlockSpec
    smuMeasureAutorange: SmuMeasureAutorangeSpec
    smuSourceSweepLog: SmuSourceSweepLog,
    voltage: {
        measure: MeasureVoltageSpec;
        source: SourceVoltageSpec;
    }
}
