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
// tslint:disable:no-magic-numbers
'use strict'

import { ApiSpec, ExclusiveCompletionApiSpec, InstrumentSpec } from '..'

const beeper: ApiSpec = {
    children: [
        { label: 'beeper.beep' },
    ],
    label: 'beeper'
}

namespace Buffer {
    const bufferEnumDigits: Array<ExclusiveCompletionApiSpec> = [
        { label: 'buffer.DIGITS_3_5' },
        { label: 'buffer.DIGITS_4_5' },
        { label: 'buffer.DIGITS_5_5' },
        { label: 'buffer.DIGITS_6_5' },
        { label: 'buffer.DIGITS_7_5' },
        { label: 'buffer.DIGITS_3_5' },
    ]
    const bufferEnumSave: Array<ExclusiveCompletionApiSpec> = [
        { label: 'buffer.SAVE_FORMAT_TIME' },
        { label: 'buffer.SAVE_RAW_TIME' },
        { label: 'buffer.SAVE_RELATIVE_TIME' },
        { label: 'buffer.SAVE_TIMESTAMP_TIME' },
    ]
    const bufferEnumStat: Array<ExclusiveCompletionApiSpec> = [
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
    ]
    const bufferEnumStyle: Array<ExclusiveCompletionApiSpec> = [
        { label: 'buffer.STYLE_COMPACT' },
        { label: 'buffer.STYLE_FULL' },
        { label: 'buffer.STYLE_STANDARD' },
        { label: 'buffer.STYLE_WRITABLE' },
        { label: 'buffer.STYLE_WRITABLE_FULL' },
    ]
    const bufferEnumUnit: Array<ExclusiveCompletionApiSpec> = [
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
    ]

    export const bufferWrite: ApiSpec = {
        children: [
            {
                label: 'buffer.write.format',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, bufferEnumUnit ],
                            [ 2, bufferEnumDigits ],
                            [ 3, bufferEnumUnit ],
                            [ 4, bufferEnumDigits ],
                        ])
                    }
                ]
            },
            {
                label: 'buffer.write.reading',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 4, bufferEnumStat ],
                        ]),
                        qualifier: 0
                    },
                    {
                        parameters: new Map([
                            [ 5, bufferEnumStat ],
                        ]),
                        qualifier: 1
                    },
                ]
            },
        ],
        label: 'buffer.write'
    }

    export const buffer: ApiSpec = {
        children: [
            { label: 'buffer.clearstats' },
            { label: 'buffer.delete' },
            { label: 'buffer.getstats' },
            {
                label: 'buffer.make',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, bufferEnumStyle ],
                        ]),
                    }
                ]
            },
            {
                label: 'buffer.save',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 2, bufferEnumSave ],
                        ]),
                    }
                ]
            },
            {
                label: 'buffer.saveappend',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 2, bufferEnumSave ],
                        ]),
                    }
                ]
            },
        ],
        enums: [
            ...bufferEnumDigits,
            { label: 'buffer.FILL_CONTINUOUS' },
            { label: 'buffer.FILL_ONCE' },
            { label: 'buffer.OFF' },
            { label: 'buffer.ON' },
            ...bufferEnumSave,
            ...bufferEnumStat,
            ...bufferEnumStyle,
            ...bufferEnumUnit,
        ],
        label: 'buffer'
    }
}

const createconfigscript: ApiSpec = { label: 'createconfigscript' }

const dataqueue: ApiSpec = {
    children: [
        { label: 'dataqueue.add' },
        { label: 'dataqueue.CAPACITY' },
        { label: 'dataqueue.clear' },
        { label: 'dataqueue.count' },
        { label: 'dataqueue.next' },
    ],
    label: 'dataqueue'
}

const delay: ApiSpec = { label: 'delay' }

const digioLine: ApiSpec = {
    children: [
        { label: 'digio.line.mode' },
        { label: 'digio.line.reset' },
        { label: 'digio.line.state' },
    ],
    label: 'digio.line'
}

const digio: ApiSpec = {
    children: [
        { label: 'digio.readport' },
        { label: 'digio.writeport' },
    ],
    enums: [
        { label: 'digio.MODE_DIGITAL_IN' },
        { label: 'digio.MODE_DIGITAL_OPEN_DRAIN' },
        { label: 'digio.MODE_DIGITAL_OUT' },
        { label: 'digio.MODE_TRIGGER_IN' },
        { label: 'digio.MODE_TRIGGER_OPEN_DRAIN' },
        { label: 'digio.MODE_TRIGGER_OUT' },
        { label: 'digio.MODE_SYNCHRONOUS_ACCEPTOR' },
        { label: 'digio.MODE_SYNCHRONOUS_MASTER' },
        { label: 'digio.STATE_HIGH' },
        { label: 'digio.STATE_LOW' },
    ],
    label: 'digio'
}

namespace Display {
    const displayEnumButtons: Array<ExclusiveCompletionApiSpec> = [
        { label: 'display.BUTTONS_OK' },
        { label: 'display.BUTTONS_CANCEL' },
        { label: 'display.BUTTONS_OKCANCEL' },
        { label: 'display.BUTTONS_YESNO' },
        { label: 'display.BUTTONS_YESNOCANCEL' },
    ]
    const displayEnumButtonsWithNone: Array<ExclusiveCompletionApiSpec> = [
        ...displayEnumButtons,
        { label: 'display.BUTTONS_NONE' },
    ]
    const displayEnumFormat: Array<ExclusiveCompletionApiSpec> = [
        { label: 'display.FORMAT_EXPONENT' },
        { label: 'display.FORMAT_PREFIX' },
    ]
    const displayEnumNformat: Array<ExclusiveCompletionApiSpec> = [
        { label: 'display.NFORMAT_DECIMAL' },
        { label: 'display.NFORMAT_EXPONENT' },
        {
            label: 'display.NFORMAT_INTEGER',
            preselect: true
        },
        { label: 'display.NFORMAT_PREFIX' },
    ]
    const displayEnumScreen: Array<ExclusiveCompletionApiSpec> = [
        { label: 'display.SCREEN_DATASHEET' },
        { label: 'display.SCREEN_GRAPH' },
        { label: 'display.SCREEN_GRAPH_SWIPE' },
        { label: 'display.SCREEN_HISTOGRAM' },
        { label: 'display.SCREEN_HOME' },
        { label: 'display.SCREEN_HOME_LARGE_READING' },
        { label: 'display.SCREEN_READING_TABLE' },
        { label: 'display.SCREEN_PLOT_SWIPE' },
        { label: 'display.SCREEN_SETTINGS_SWIPE' },
        { label: 'display.SCREEN_SOURCE_SWIPE' },
        { label: 'display.SCREEN_STATS_SWIPE' },
        { label: 'display.SCREEN_USER_SWIPE' },
    ]
    const displayEnumSformat: Array<ExclusiveCompletionApiSpec> = [
        {
            label: 'display.SFORMAT_ANY',
            preselect: true
        },
        { label: 'display.SFORMAT_UPPER' },
        { label: 'display.SFORMAT_UPPER_LOWER' },
    ]
    const displayEnumState: Array<ExclusiveCompletionApiSpec> = [
        { label: 'display.STATE_LCD_100' },
        { label: 'display.STATE_LCD_75' },
        { label: 'display.STATE_LCD_50' },
        { label: 'display.STATE_LCD_25' },
        { label: 'display.STATE_LCD_OFF' },
        { label: 'display.STATE_BLACKOUT' },
    ]
    const displayEnumText: Array<ExclusiveCompletionApiSpec> = [
        { label: 'display.TEXT1' },
        { label: 'display.TEXT2' },
    ]

    export const displayInput: ApiSpec = {
        children: [
            {
                label: 'display.input.number',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [1, displayEnumNformat]
                        ])
                    }
                ]
            },
            { label: 'display.input.option' },
            {
                label: 'display.input.prompt',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [0, displayEnumButtons]
                        ])
                    }
                ]
            },
            {
                label: 'display.input.string',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [1, displayEnumSformat]
                        ])
                    }
                ]
            },
        ],
        label: 'display.input'
    }

    export const display: ApiSpec = {
        children: [
            {
                label: 'display.changescreen',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [0, displayEnumScreen]
                        ])
                    }
                ]
            },
            { label: 'display.clear' },
            { label: 'display.delete' },
            {
                assignmentExclusives: displayEnumState,
                label: 'display.lightstate'
            },
            {
                label: 'display.prompt',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [0, displayEnumButtonsWithNone]
                        ])
                    }
                ]
            },
            {
                assignmentExclusives: displayEnumFormat,
                label: 'display.readingformat'
            },
            {
                label: 'display.settext',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [0, displayEnumText]
                        ])
                    }
                ]
            },
            { label: 'display.waitevent' },
        ],
        enums: [
            { label: 'display.BUTTON_CANCEL' },
            { label: 'display.BUTTON_NO' },
            { label: 'display.BUTTON_OK' },
            { label: 'display.BUTTON_YES' },
            { label: 'display.BUTTON_OPTION1' },
            { label: 'display.BUTTON_OPTION2' },
            { label: 'display.BUTTON_OPTION3' },
            { label: 'display.BUTTON_OPTION4' },
            { label: 'display.BUTTON_OPTION5' },
            { label: 'display.BUTTON_OPTION6' },
            { label: 'display.BUTTON_OPTION7' },
            { label: 'display.BUTTON_OPTION8' },
            { label: 'display.BUTTON_OPTION9' },
            { label: 'display.BUTTON_OPTION10' },
            ...displayEnumButtonsWithNone,
            ...displayEnumFormat,
            ...displayEnumNformat,
            ...displayEnumScreen,
            ...displayEnumSformat,
            ...displayEnumState,
            ...displayEnumText,
        ],
        label: 'display'
    }
}

const eventlog: ApiSpec = {
    children: [
        { label: 'eventlog.clear' },
        { label: 'eventlog.getcount' },
        { label: 'eventlog.next' },
        { label: 'eventlog.post' },
        { label: 'eventlog.save' },
    ],
    enums: [
        { label: 'eventlog.SEV_ALL' },
        { label: 'eventlog.SEV_ERROR' },
        { label: 'eventlog.SEV_INFO' },
        { label: 'eventlog.SEV_WARN' },
    ],
    label: 'eventlog'
}

const exit: ApiSpec = { label: 'exit' }

const file: ApiSpec = {
    children: [
        { label: 'file.close' },
        { label: 'file.flush' },
        { label: 'file.mkdir' },
        { label: 'file.open' },
        { label: 'file.read' },
        { label: 'file.usbdriveexists' },
        { label: 'file.write' },
    ],
    enums: [
        { label: 'file.MODE_APPEND' },
        { label: 'file.MODE_READ' },
        { label: 'file.MODE_WRITE' },
        { label: 'file.READ_ALL' },
        { label: 'file.READ_LINE' },
        { label: 'file.READ_NUMBER' },
    ],
    label: 'file'
}

const format: ApiSpec = {
    children: [
        { label: 'format.asciiprecision' },
        { label: 'format.byteorder' },
        { label: 'format.data' },
    ],
    enums: [
        { label: 'format.ASCII' },
        { label: 'format.BIGENDIAN' },
        { label: 'format.LITTLEENDIAN' },
        { label: 'format.REAL32' },
        { label: 'format.REAL64' },
    ],
    label: 'format'
}

const gpib: ApiSpec = { label: 'gpib' }

const lan: ApiSpec = {
    children: [
        { label: 'lan.ipconfig' },
        { label: 'lan.lxidomain' },
        { label: 'lan.macaddress' },
    ],
    enums: [
        { label: 'lan.MODE_AUTO' },
        { label: 'lan.MODE_MANUAL' },
    ],
    label: 'lan'
}

const localnode: ApiSpec = {
    children: [
        { label: 'localnode.access' },
        { label: 'localnode.gettime' },
        { label: 'localnode.linefreq' },
        { label: 'localnode.model' },
        { label: 'localnode.password' },
        { label: 'localnode.prompts' },
        { label: 'localnode.prompts4882' },
        { label: 'localnode.serialno' },
        { label: 'localnode.settime' },
        { label: 'localnode.showevents' },
        { label: 'localnode.version' },
    ],
    enums: [
        { label: 'localnode.ACCESS_EXCLUSIVE' },
        { label: 'localnode.ACCESS_FULL' },
        { label: 'localnode.ACCESS_LOCKOUT' },
        { label: 'localnode.ACCESS_PROTECTED' },
        { label: 'localnode.DISABLE' },
        { label: 'localnode.ENABLE' },
    ],
    label: 'localnode'
}

const node: ApiSpec = {
    children: [
        { label: 'node.execute' },
        { label: 'node.getglobal' },
        { label: 'node.setglobal' },
    ],
    label: 'node'
}

const opc: ApiSpec = { label: 'opc' }

const printbuffer: ApiSpec = { label: 'printbuffer' }

const printnumber: ApiSpec = { label: 'printnumber' }

const reset: ApiSpec = { label: 'reset' }

const script: ApiSpec = {
    children: [
        { label: 'script.delete' },
        { label: 'script.load' },
    ],
    label: 'script'
}

const smuInterlock: ApiSpec = {
    children: [
        { label: 'smu.interlock.tripped' },
    ],
    label: 'smu.interlock'
}

const smuMeasureAutozero: ApiSpec = {
    children: [
        { label: 'smu.measure.autozero.enable' },
        { label: 'smu.measure.autozero.once' },
    ],
    label: 'smu.measure.autozero'
}

const smuMeasureConfiglist: ApiSpec = {
    children: [
        { label: 'smu.measure.configlist.catalog' },
        { label: 'smu.measure.configlist.create' },
        { label: 'smu.measure.configlist.delete' },
        { label: 'smu.measure.configlist.query' },
        { label: 'smu.measure.configlist.recall' },
        { label: 'smu.measure.configlist.size' },
        { label: 'smu.measure.configlist.store' },
    ],
    label: 'smu.measure.configlist'
}

const smuMeasureFilter: ApiSpec = {
    children: [
        { label: 'smu.measure.filter.count' },
        { label: 'smu.measure.filter.enable' },
        { label: 'smu.measure.filter.type' },
    ],
    label: 'smu.measure.filter'
}

const smuMeasureLimitHigh: ApiSpec = {
    children: [
        { label: 'smu.measure.limit.high.value' },
    ],
    label: 'smu.measure.limit.high'
}

const smuMeasureLimitLow: ApiSpec = {
    children: [
        { label: 'smu.measure.limit.low.value' },
    ],
    label: 'smu.measure.limit.low'
}

const smuMeasureLimit: ApiSpec = {
    children: [
        { label: 'smu.measure.limit.audible' },
        { label: 'smu.measure.limit.autoclear' },
        { label: 'smu.measure.limit.clear' },
        { label: 'smu.measure.limit.enable' },
        { label: 'smu.measure.limit.fail' },
    ],
    label: 'smu.measure.limit'
}

const smuMeasureMathMxb: ApiSpec = {
    children: [
        { label: 'smu.measure.math.mxb.bfactor' },
        { label: 'smu.measure.math.mxb.mfactor' },
    ],
    label: 'smu.measure.math.mxb'
}

const smuMeasureMath: ApiSpec = {
    children: [
        { label: 'smu.measure.math.enable' },
        { label: 'smu.measure.math.format' },
        { label: 'smu.measure.math.percent' },
    ],
    label: 'smu.measure.math'
}

const smuMeasureRel: ApiSpec = {
    children: [
        { label: 'smu.measure.rel.acquire' },
        { label: 'smu.measure.rel.enable' },
        { label: 'smu.measure.rel.level' },
    ],
    label: 'smu.measure.rel'
}

const smuMeasure: ApiSpec = {
    children: [
        { label: 'smu.measure.autorange' },
        { label: 'smu.measure.autorangehigh' },
        { label: 'smu.measure.autorangelow' },
        { label: 'smu.measure.count' },
        { label: 'smu.measure.displaydigits' },
        { label: 'smu.measure.func' },
        { label: 'smu.measure.nplc' },
        { label: 'smu.measure.offsetcompensation' },
        { label: 'smu.measure.range' },
        { label: 'smu.measure.read' },
        { label: 'smu.measure.readwithtime' },
        { label: 'smu.measure.sense' },
        { label: 'smu.measure.terminals' },
        { label: 'smu.measure.unit' },
        { label: 'smu.measure.userdelay' },
    ],
    label: 'smu.measure'
}

const smuSourceConfiglist: ApiSpec = {
    children: [
        { label: 'smu.source.configlist.catalog' },
        { label: 'smu.source.configlist.create' },
        { label: 'smu.source.configlist.delete' },
        { label: 'smu.source.configlist.query' },
        { label: 'smu.source.configlist.recall' },
        { label: 'smu.source.configlist.size' },
        { label: 'smu.source.configlist.store' },
    ],
    label: 'smu.source.configlist'
}

const smuSourceIlimit: ApiSpec = {
    children: [
        { label: 'smu.source.ilimit.level' },
        { label: 'smu.source.ilimit.tripped' },
    ],
    label: 'smu.source.ilimit'
}

const smuSourceProtect: ApiSpec = {
    children: [
        { label: 'smu.source.protect.level' },
        { label: 'smu.source.protect.tripped' },
    ],
    label: 'smu.source.protect'
}

const smuSourceVlimit: ApiSpec = {
    children: [
        { label: 'smu.source.vlimit.level' },
        { label: 'smu.source.vlimit.tripped' },
    ],
    label: 'smu.source.vlimit'
}

const smuSource: ApiSpec = {
    children: [
        { label: 'smu.source.autodelay' },
        { label: 'smu.source.autorange' },
        { label: 'smu.source.delay' },
        { label: 'smu.source.func' },
        { label: 'smu.source.highc' },
        { label: 'smu.source.level' },
        { label: 'smu.source.offmode' },
        { label: 'smu.source.output' },
        { label: 'smu.source.range' },
        { label: 'smu.source.readback' },
        { label: 'smu.source.sweeplinear' },
        { label: 'smu.source.sweeplinearstep' },
        { label: 'smu.source.sweeplist' },
        { label: 'smu.source.sweeplog' },
        { label: 'smu.source.userdelay' },
    ],
    label: 'smu.source'
}

const smu: ApiSpec = {
    children: [
        { label: 'smu.reset' },
    ],
    enums: [
        { label: 'smu.AUDIBLE_FAIL' },
        { label: 'smu.AUDIBLE_NONE' },
        { label: 'smu.AUDIBLE_PASS' },
        { label: 'smu.DELAY_AUTO' },
        { label: 'smu.DIGITS_3_5' },
        { label: 'smu.DIGITS_4_5' },
        { label: 'smu.DIGITS_5_5' },
        { label: 'smu.DIGITS_6_5' },
        { label: 'smu.FAIL_BOTH' },
        { label: 'smu.FAIL_HIGH' },
        { label: 'smu.FAIL_LOW' },
        { label: 'smu.FAIL_NONE' },
        { label: 'smu.FILTER_MOVING_AVG' },
        { label: 'smu.FILTER_REPEAT_AVG' },
        { label: 'smu.FUNC_DC_CURRENT' },
        { label: 'smu.FUNC_DC_VOLTAGE' },
        { label: 'smu.FUNC_RESISTANCE' },
        { label: 'smu.INFINITE' },
        { label: 'smu.MATH_MXB' },
        { label: 'smu.MATH_PERCENT' },
        { label: 'smu.MATH_RECIPROCAL' },
        { label: 'smu.OFF' },
        { label: 'smu.OFFMODE_GUARD' },
        { label: 'smu.OFFMODE_HIGHZ' },
        { label: 'smu.OFFMODE_NORMAL' },
        { label: 'smu.OFFMODE_ZERO' },
        { label: 'smu.ON' },
        { label: 'smu.PROTECT_2V' },
        { label: 'smu.PROTECT_5V' },
        { label: 'smu.PROTECT_10V' },
        { label: 'smu.PROTECT_20V' },
        { label: 'smu.PROTECT_40V' },
        { label: 'smu.PROTECT_60V' },
        { label: 'smu.PROTECT_80V' },
        { label: 'smu.PROTECT_100V' },
        { label: 'smu.PROTECT_120V' },
        { label: 'smu.PROTECT_140V' },
        { label: 'smu.PROTECT_160V' },
        { label: 'smu.PROTECT_180V' },
        { label: 'smu.PROTECT_NONE' },
        { label: 'smu.RANGE_AUTO' },
        { label: 'smu.RANGE_BEST' },
        { label: 'smu.RANGE_FIXED' },
        { label: 'smu.SENSE_2WIRE' },
        { label: 'smu.SENSE_4WIRE' },
        { label: 'smu.TERMINALS_FRONT' },
        { label: 'smu.TERMINALS_REAR' },
        { label: 'smu.UNIT_AMP' },
        { label: 'smu.UNIT_OHM' },
        { label: 'smu.UNIT_VOLT' },
        { label: 'smu.UNIT_WATT' },
    ],
    label: 'smu'
}

const statusOperation: ApiSpec = {
    children: [
        { label: 'status.operation.condition' },
        { label: 'status.operation.enable' },
        { label: 'status.operation.event' },
        { label: 'status.operation.getmap' },
        { label: 'status.operation.setmap' },
    ],
    label: 'status.operation'
}

const statusQuestionable: ApiSpec = {
    children: [
        { label: 'status.questionable.condition' },
        { label: 'status.questionable.enable' },
        { label: 'status.questionable.event' },
        { label: 'status.questionable.getmap' },
        { label: 'status.questionable.setmap' },
    ],
    label: 'status.questionable'
}

const statusStandard: ApiSpec = {
    children: [
        { label: 'status.standard.enable' },
        { label: 'status.standard.event' },
    ],
    enums: [
        { label: 'status.standard.OPC' },
        { label: 'status.standard.QYE' },
        { label: 'status.standard.PON' },
    ],
    label: 'status.standard'
}

const status: ApiSpec = {
    children: [
        { label: 'status.clear' },
        { label: 'status.condition' },
        { label: 'status.preset' },
        { label: 'status.request_enable' },
    ],
    enums: [
        { label: 'status.MSB' },
        { label: 'status.EAV' },
        { label: 'status.QSB' },
        { label: 'status.MAV' },
        { label: 'status.ESB' },
        { label: 'status.MSS' },
        { label: 'status.OSB' },
    ],
    label: 'status'
}

const timer: ApiSpec = {
    children: [
        { label: 'timer.cleartime' },
        { label: 'timer.gettime' },
    ],
    label: 'timer'
}

const triggerBlender: ApiSpec = {
    children: [
        { label: 'trigger.blender.clear' },
        { label: 'trigger.blender.orenable' },
        { label: 'trigger.blender.overrun' },
        { label: 'trigger.blender.reset' },
        { label: 'trigger.blender.stimulus' },
        { label: 'trigger.blender.wait' },
    ],
    label: 'trigger.blender'
}

const triggerDigin: ApiSpec = {
    children: [
        { label: 'trigger.digin.clear' },
        { label: 'trigger.digin.edge' },
        { label: 'trigger.digin.overrun' },
        { label: 'trigger.digin.wait' },
    ],
    label: 'trigger.digin'
}

const triggerDigout: ApiSpec = {
    children: [
        { label: 'trigger.digout.assert' },
        { label: 'trigger.digout.logic' },
        { label: 'trigger.digout.pulsewidth' },
        { label: 'trigger.digout.release' },
        { label: 'trigger.digout.stimulus' },
    ],
    label: 'trigger.digout'
}

const triggerLanin: ApiSpec = {
    children: [
        { label: 'trigger.lanin.clear' },
        { label: 'trigger.lanin.edge' },
        { label: 'trigger.lanin.overrun' },
        { label: 'trigger.lanin.wait' },
    ],
    label: 'trigger.lanin'
}

const triggerLanout: ApiSpec = {
    children: [
        { label: 'trigger.lanout.assert' },
        { label: 'trigger.lanout.connect' },
        { label: 'trigger.lanout.connected' },
        { label: 'trigger.lanout.disconnect' },
        { label: 'trigger.lanout.ipaddress' },
        { label: 'trigger.lanout.logic' },
        { label: 'trigger.lanout.protocol' },
        { label: 'trigger.lanout.stimulus' },
    ],
    label: 'trigger.lanout'
}

const triggerModel: ApiSpec = {
    children: [
        { label: 'trigger.model.abort' },
        { label: 'trigger.model.getblocklist' },
        { label: 'trigger.model.getbranchcount' },
        { label: 'trigger.model.initiate' },
        { label: 'trigger.model.load' },
        { label: 'trigger.model.setblock' },
        { label: 'trigger.model.state' },
    ],
    label: 'trigger.model'
}

const triggerTimerStart: ApiSpec = {
    children: [
        { label: 'trigger.timer.start.fractionalseconds' },
        { label: 'trigger.timer.start.generate' },
        { label: 'trigger.timer.start.overrun' },
        { label: 'trigger.timer.start.seconds' },
        { label: 'trigger.timer.start.stimulus' },
    ],
    label: 'trigger.timer.start'
}

const triggerTimer: ApiSpec = {
    children: [
        { label: 'trigger.timer.clear' },
        { label: 'trigger.timer.count' },
        { label: 'trigger.timer.delay' },
        { label: 'trigger.timer.delaylist' },
        { label: 'trigger.timer.enable' },
        { label: 'trigger.timer.reset' },
        { label: 'trigger.timer.wait' },
    ],
    label: 'trigger.timer'
}

const triggerTsplinkin: ApiSpec = {
    children: [
        { label: 'trigger.tsplinkin.clear' },
        { label: 'trigger.tsplinkin.edge' },
        { label: 'trigger.tsplinkin.overrun' },
        { label: 'trigger.tsplinkin.wait' },
    ],
    label: 'trigger.tsplinkin'
}

const triggerTsplinkout: ApiSpec = {
    children: [
        { label: 'trigger.tsplinkout.assert' },
        { label: 'trigger.tsplinkout.logic' },
        { label: 'trigger.tsplinkout.pulsewidth' },
        { label: 'trigger.tsplinkout.release' },
        { label: 'trigger.tsplinkout.stimulus' },
    ],
    label: 'trigger.tsplinkout'
}

const trigger: ApiSpec = {
    children: [
        { label: 'trigger.clear' },
        { label: 'trigger.wait' },
    ],
    enums: [
        { label: 'trigger.BLOCK_BRANCH_ALWAYS' },
        { label: 'trigger.BLOCK_BRANCH_COUNTER' },
        { label: 'trigger.BLOCK_BRANCH_DELTA' },
        { label: 'trigger.BLOCK_BRANCH_LIMIT_CONSTANT' },
        { label: 'trigger.BLOCK_BRANCH_LIMIT_DYNAMIC' },
        { label: 'trigger.BLOCK_BRANCH_ON_EVENT' },
        { label: 'trigger.BLOCK_BRANCH_ONCE' },
        { label: 'trigger.BLOCK_BRANCH_ONCE_EXCLUDED' },
        { label: 'trigger.BLOCK_BUFFER_CLEAR' },
        { label: 'trigger.BLOCK_CONFIG_NEXT' },
        { label: 'trigger.BLOCK_CONFIG_PREV' },
        { label: 'trigger.BLOCK_CONFIG_RECALL' },
        { label: 'trigger.BLOCK_DELAY_CONSTANT' },
        { label: 'trigger.BLOCK_DELAY_DYNAMIC' },
        { label: 'trigger.BLOCK_DIGITAL_IO' },
        { label: 'trigger.BLOCK_LOG_EVENT' },
        { label: 'trigger.BLOCK_MEASURE' },
        { label: 'trigger.BLOCK_NOP' },
        { label: 'trigger.BLOCK_NOTIFY' },
        { label: 'trigger.BLOCK_RESET_BRANCH_COUNT' },
        { label: 'trigger.BLOCK_SOURCE_OUTPUT' },
        { label: 'trigger.BLOCK_WAIT' },
        { label: 'trigger.CLEAR_ENTER' },
        { label: 'trigger.CLEAR_NEVER' },
        { label: 'trigger.COUNT_INFINITE' },
        { label: 'trigger.COUNT_STOP' },
        { label: 'trigger.EDGE_EITHER' },
        { label: 'trigger.EDGE_FALLING' },
        { label: 'trigger.EDGE_RISING' },
        { label: 'trigger.EVENT_BLENDER1' },
        { label: 'trigger.EVENT_BLENDER2' },
        { label: 'trigger.EVENT_COMMAND' },
        { label: 'trigger.EVENT_DIGIO1' },
        { label: 'trigger.EVENT_DIGIO2' },
        { label: 'trigger.EVENT_DIGIO3' },
        { label: 'trigger.EVENT_DIGIO4' },
        { label: 'trigger.EVENT_DIGIO5' },
        { label: 'trigger.EVENT_DIGIO6' },
        { label: 'trigger.EVENT_DISPLAY' },
        { label: 'trigger.EVENT_LAN1' },
        { label: 'trigger.EVENT_LAN2' },
        { label: 'trigger.EVENT_LAN3' },
        { label: 'trigger.EVENT_LAN4' },
        { label: 'trigger.EVENT_LAN5' },
        { label: 'trigger.EVENT_LAN6' },
        { label: 'trigger.EVENT_LAN7' },
        { label: 'trigger.EVENT_LAN8' },
        { label: 'trigger.EVENT_NONE' },
        { label: 'trigger.EVENT_NOTIFY1' },
        { label: 'trigger.EVENT_NOTIFY2' },
        { label: 'trigger.EVENT_NOTIFY3' },
        { label: 'trigger.EVENT_NOTIFY4' },
        { label: 'trigger.EVENT_NOTIFY5' },
        { label: 'trigger.EVENT_NOTIFY6' },
        { label: 'trigger.EVENT_NOTIFY7' },
        { label: 'trigger.EVENT_NOTIFY8' },
        { label: 'trigger.EVENT_SOURCE_LIMIT' },
        { label: 'trigger.EVENT_TIMER1' },
        { label: 'trigger.EVENT_TIMER2' },
        { label: 'trigger.EVENT_TIMER3' },
        { label: 'trigger.EVENT_TIMER4' },
        { label: 'trigger.EVENT_TSPLINK1' },
        { label: 'trigger.EVENT_TSPLINK2' },
        { label: 'trigger.EVENT_TSPLINK3' },
        { label: 'trigger.LIMIT_ABOVE' },
        { label: 'trigger.LIMIT_BELOW' },
        { label: 'trigger.LIMIT_INSIDE' },
        { label: 'trigger.LIMIT_OUTSIDE' },
        { label: 'trigger.LOG_INFO1' },
        { label: 'trigger.LOG_INFO2' },
        { label: 'trigger.LOG_INFO3' },
        { label: 'trigger.LOG_INFO4' },
        { label: 'trigger.LOG_WARN_ABORT' },
        { label: 'trigger.LOG_WARN1' },
        { label: 'trigger.LOG_WARN2' },
        { label: 'trigger.LOG_WARN3' },
        { label: 'trigger.LOG_WARN4' },
        { label: 'trigger.LOG_ERROR1' },
        { label: 'trigger.LOG_ERROR2' },
        { label: 'trigger.LOG_ERROR3' },
        { label: 'trigger.LOG_ERROR4' },
        { label: 'trigger.LOGIC_NEGATIVE' },
        { label: 'trigger.LOGIC_POSITIVE' },
        { label: 'trigger.OFF' },
        { label: 'trigger.ON' },
        { label: 'trigger.STATE_ABORTED' },
        { label: 'trigger.STATE_ABORTING' },
        { label: 'trigger.STATE_BUILDING' },
        { label: 'trigger.STATE_EMPTY' },
        { label: 'trigger.STATE_FAILED' },
        { label: 'trigger.STATE_IDLE' },
        { label: 'trigger.STATE_RUNNING' },
        { label: 'trigger.STATE_WAITING' },
        { label: 'trigger.USER_DELAY_M1' },
        { label: 'trigger.USER_DELAY_M2' },
        { label: 'trigger.USER_DELAY_M3' },
        { label: 'trigger.USER_DELAY_M4' },
        { label: 'trigger.USER_DELAY_M5' },
        { label: 'trigger.USER_DELAY_S1' },
        { label: 'trigger.USER_DELAY_S2' },
        { label: 'trigger.USER_DELAY_S3' },
        { label: 'trigger.USER_DELAY_S4' },
        { label: 'trigger.USER_DELAY_S5' },
        { label: 'trigger.WAIT_AND' },
        { label: 'trigger.WAIT_OR' },
    ],
    label: 'trigger'
}

const tsplink: ApiSpec = {
    children: [
        { label: 'tsplink.MODE_DIGITAL_OPEN_DRAIN' },
        { label: 'tsplink.MODE_TRIGGER_OPEN_DRAIN' },
        { label: 'tsplink.MODE_SYNCHRONOUS_ACCEPTOR' },
        { label: 'tsplink.MODE_SYNCHRONOUS_MASTER' },
        { label: 'tsplink.STATE_HIGH' },
        { label: 'tsplink.STATE_LOW' },
    ],
    enums: [
        { label: 'tsplink.group' },
        { label: 'tsplink.initialize' },
        { label: 'tsplink.master' },
        { label: 'tsplink.node' },
        { label: 'tsplink.readport' },
        { label: 'tsplink.reset' },
        { label: 'tsplink.state' },
        { label: 'tsplink.writeport' },
    ],
    label: 'tsplink'
}

const tsplinkLine: ApiSpec = {
    children: [
        { label: 'tsplink.line.mode' },
        { label: 'tsplink.line.reset' },
        { label: 'tsplink.line.state' },
    ],
    label: 'tsplink.line'
}

const tspnet: ApiSpec = {
    children: [
        { label: 'tspnet.clear' },
        { label: 'tspnet.connect' },
        { label: 'tspnet.disconnect' },
        { label: 'tspnet.execute' },
        { label: 'tspnet.idn' },
        { label: 'tspnet.read' },
        { label: 'tspnet.readavailable' },
        { label: 'tspnet.reset' },
        { label: 'tspnet.termination' },
        { label: 'tspnet.timeout' },
        { label: 'tspnet.write' },
    ],
    enums: [
        { label: 'tspnet.TERM_CR' },
        { label: 'tspnet.TERM_CRLF' },
        { label: 'tspnet.TERM_LF' },
        { label: 'tspnet.TERM_LFCR' },
    ],
    label: 'tspnet'
}

const tspnetTsp: ApiSpec = {
    children: [
        { label: 'tspnet.tsp.abort' },
        { label: 'tspnet.tsp.abortonconnect' },
        { label: 'tspnet.tsp.rbtablecopy' },
        { label: 'tspnet.tsp.runscript' },
    ],
    label: 'tspnet.tsp'
}

const upgrade: ApiSpec = {
    children: [
        { label: 'upgrade.previous' },
        { label: 'upgrade.unit' },
    ],
    label: 'upgrade'
}

const userstring: ApiSpec = {
    children: [
        { label: 'userstring.add' },
        { label: 'userstring.catalog' },
        { label: 'userstring.delete' },
        { label: 'userstring.get' },
    ],
    label: 'userstring'
}

const waitcomplete: ApiSpec = { label: 'waitcomplete' }

export function getApiSpec(): Array<ApiSpec> {
    return [
        beeper,
        Buffer.bufferWrite,
        Buffer.buffer,
        createconfigscript,
        dataqueue,
        delay,
        digioLine,
        digio,
        Display.displayInput,
        Display.display,
        eventlog,
        exit,
        file,
        format,
        gpib,
        lan,
        localnode,
        node,
        opc,
        printbuffer,
        printnumber,
        reset,
        script,
        smuInterlock,
        smuMeasureAutozero,
        smuMeasureConfiglist,
        smuMeasureFilter,
        smuMeasureLimitHigh,
        smuMeasureLimitLow,
        smuMeasureLimit,
        smuMeasureMath,
        smuMeasureMathMxb,
        smuMeasureRel,
        smuMeasure,
        smuSourceConfiglist,
        smuSourceIlimit,
        smuSourceProtect,
        smuSourceVlimit,
        smuSource,
        smu,
        statusOperation,
        statusQuestionable,
        statusStandard,
        status,
        timer,
        triggerBlender,
        triggerDigin,
        triggerDigout,
        triggerLanin,
        triggerLanout,
        triggerModel,
        triggerTimerStart,
        triggerTimer,
        triggerTsplinkin,
        triggerTsplinkout,
        trigger,
        tsplinkLine,
        tsplink,
        tspnetTsp,
        tspnet,
        upgrade,
        userstring,
        waitcomplete
    ]
}

export function getInstrumentSpec(): InstrumentSpec {
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
                ranges: [20e-3, 200e-3, 2, 20, 200]
            }
        }
    }
}
