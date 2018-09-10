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
import { CommandDocumentation } from '../provider';

const coroutine: ApiSpec = {
    children: [
        { label: 'coroutine.create' },
        { label: 'coroutine.resume' },
        { label: 'coroutine.status' },
        { label: 'coroutine.wrap' },
        { label: 'coroutine.yield' },
    ],
    label: 'coroutine'
}

const functions: ApiSpec = {
    children: [
        { label: 'assert' },
        { label: 'collectgarbage' },
        { label: 'dofile' },
        { label: 'error' },
        { label: 'gcinfo' },
        { label: 'getfenv' },
        { label: 'getmetatable' },
        { label: 'ipairs' },
        { label: 'loadfile' },
        { label: 'loadstring' },
        { label: 'next' },
        { label: 'pairs' },
        { label: 'pcall' },
        { label: 'print' },
        { label: 'rawequal' },
        { label: 'rawget' },
        { label: 'rawset' },
        { label: 'require' },
        { label: 'setfenv' },
        { label: 'setmetatable' },
        { label: 'tonumber' },
        { label: 'tostring' },
        { label: 'type' },
        { label: 'unpack' },
        { label: 'xpcall' },
    ],
    label: 'functions'
}

const keywords: ApiSpec = {
    children: [
        { label: 'break' },
        { label: 'do' },
        { label: 'else' },
        { label: 'elseif' },
        { label: 'end' },
        { label: 'for' },
        { label: 'function' },
        { label: 'if' },
        { label: 'in' },
        { label: 'local' },
        { label: 'repeat' },
        { label: 'return' },
        { label: 'then' },
        { label: 'until' },
        { label: 'while' },
    ],
    label: 'keywords'
}

const math: ApiSpec = {
    children: [
        { label: 'math.abs' },
        { label: 'math.acos' },
        { label: 'math.asin' },
        { label: 'math.atan' },
        { label: 'math.atan2' },
        { label: 'math.ceil' },
        { label: 'math.cos' },
        { label: 'math.deg' },
        { label: 'math.exp' },
        { label: 'math.floor' },
        { label: 'math.frexp' },
        { label: 'math.ldexp' },
        { label: 'math.log' },
        { label: 'math.log10' },
        { label: 'math.max' },
        { label: 'math.min' },
        { label: 'math.pow' },
        { label: 'math.rad' },
        { label: 'math.random' },
        { label: 'math.randomseed' },
        { label: 'math.sin' },
        { label: 'math.sqrt' },
        { label: 'math.tan' },
    ],
    enums: [
        { label: 'math.pi' },
    ],
    label: 'math'
}

const os: ApiSpec = {
    children: [
        { label: 'os.clock' },
        { label: 'os.date' },
        { label: 'os.difftime' },
        { label: 'os.rename' },
        { label: 'os.time' },
    ],
    label: 'os'
}

const _string: ApiSpec = {
    children: [
        { label: 'string.byte' },
        { label: 'string.char' },
        { label: 'string.dump' },
        { label: 'string.find' },
        { label: 'string.format' },
        { label: 'string.gsub' },
        { label: 'string.len' },
        { label: 'string.lower' },
        { label: 'string.rep' },
        { label: 'string.sub' },
        { label: 'string.upper' },
    ],
    label: 'string'
}

const table: ApiSpec = {
    children: [
        { label: 'table.concat' },
        { label: 'table.insert' },
        { label: 'table.remove' },
        { label: 'table.sort' },
    ],
    label: 'table'
}

export function getLuaApiSpec(): Array<ApiSpec> {
    return [
        coroutine,
        functions,
        keywords,
        math,
        os,
        _string,
        table
    ]
}

export function getLuaInstrumentSpec(): InstrumentSpec {
    return {
        beeper: { maxHertz: NaN, maxSeconds: NaN, minHertz: NaN, minSeconds: NaN },
        current: {
            measure: { level: { high: NaN, low: NaN }, range: { high: NaN, low: NaN } },
            source: { rangeDefault: NaN, ranges: [] }
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
            source: { rangeDefault: NaN, ranges: [] }
        }
    }
}
