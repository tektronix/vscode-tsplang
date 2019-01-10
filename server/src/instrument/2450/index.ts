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
        { label: 'buffer.DIGITS_8_5' },
    ]
    const bufferEnumSave: Array<ExclusiveCompletionApiSpec> = [
        { label: 'buffer.SAVE_FORMAT_TIME' },
        { label: 'buffer.SAVE_RAW_TIME' },
        { label: 'buffer.SAVE_RELATIVE_TIME' },
        { label: 'buffer.SAVE_TIMESTAMP_TIME' },
    ]
    const bufferEnumStatMeasure: Array<ExclusiveCompletionApiSpec> = [
        { label: 'buffer.STAT_LIMIT1_HIGH' },
        { label: 'buffer.STAT_LIMIT1_LOW' },
        { label: 'buffer.STAT_LIMIT2_HIGH' },
        { label: 'buffer.STAT_LIMIT2_LOW' },
        { label: 'buffer.STAT_ORIGIN' },
        { label: 'buffer.STAT_QUESTIONABLE' },
        { label: 'buffer.STAT_START_GROUP' },
        { label: 'buffer.STAT_TERMINAL' },
    ]
    const bufferEnumStatSource: Array<ExclusiveCompletionApiSpec> = [
        { label: 'buffer.STAT_LIMIT' },
        { label: 'buffer.STAT_OUTPUT' },
        { label: 'buffer.STAT_OVER_TEMP' },
        { label: 'buffer.STAT_PROTECTION' },
        { label: 'buffer.STAT_READBACK' },
        { label: 'buffer.STAT_SENSE' },
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
                            [ 4, bufferEnumStatMeasure ],
                        ]),
                        qualifier: 0
                    },
                    {
                        parameters: new Map([
                            [ 5, bufferEnumStatMeasure ],
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
            ...bufferEnumStatMeasure,
            ...bufferEnumStatSource,
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

namespace Digio {
    const digioEnumMode: Array<ExclusiveCompletionApiSpec> = [
        { label: 'digio.MODE_DIGITAL_IN' },
        { label: 'digio.MODE_DIGITAL_OPEN_DRAIN' },
        { label: 'digio.MODE_DIGITAL_OUT' },
        { label: 'digio.MODE_TRIGGER_IN' },
        { label: 'digio.MODE_TRIGGER_OPEN_DRAIN' },
        { label: 'digio.MODE_TRIGGER_OUT' },
        { label: 'digio.MODE_SYNCHRONOUS_ACCEPTOR' },
        { label: 'digio.MODE_SYNCHRONOUS_MASTER' },
    ]
    const digioEnumState: Array<ExclusiveCompletionApiSpec> = [
        { label: 'digio.STATE_HIGH' },
        { label: 'digio.STATE_LOW' },
    ]

    export const digioLine: ApiSpec = {
        children: [
            {
                assignmentExclusives: digioEnumMode,
                label: 'digio.line.mode'
            },
            { label: 'digio.line.reset' },
            {
                assignmentExclusives: digioEnumState,
                label: 'digio.line.state'
            },
        ],
        label: 'digio.line'
    }

    export const digio: ApiSpec = {
        children: [
            { label: 'digio.readport' },
            { label: 'digio.writeport' },
        ],
        enums: [
            ...digioEnumMode,
            ...digioEnumState
        ],
        label: 'digio'
    }
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

namespace Eventlog {
    export const eventlogEnumSev: Array<ExclusiveCompletionApiSpec> = [
        { label: 'eventlog.SEV_ALL' },
        { label: 'eventlog.SEV_ERROR' },
        { label: 'eventlog.SEV_INFO' },
        { label: 'eventlog.SEV_WARN' },
    ]

    export const eventlog: ApiSpec = {
        children: [
            { label: 'eventlog.clear' },
            {
                label: 'eventlog.getcount',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 0, eventlogEnumSev ]
                        ])
                    }
                ]
            },
            {
                label: 'eventlog.next',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 0, eventlogEnumSev ]
                        ])
                    }
                ]
            },
            {
                label: 'eventlog.post',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, eventlogEnumSev ]
                        ])
                    }
                ]
            },
            {
                label: 'eventlog.save',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, eventlogEnumSev ]
                        ])
                    }
                ]
            },
        ],
        enums: [
            ...eventlogEnumSev
        ],
        label: 'eventlog'
    }
}

const exit: ApiSpec = { label: 'exit' }

namespace File {
    const fileEnumMode: Array<ExclusiveCompletionApiSpec> = [
        { label: 'file.MODE_APPEND' },
        { label: 'file.MODE_READ' },
        { label: 'file.MODE_WRITE' },
    ]
    const fileEnumRead: Array<ExclusiveCompletionApiSpec> = [
        { label: 'file.READ_ALL' },
        { label: 'file.READ_LINE' },
        { label: 'file.READ_NUMBER' },
    ]

    export const file: ApiSpec = {
        children: [
            { label: 'file.close' },
            { label: 'file.flush' },
            { label: 'file.mkdir' },
            {
                label: 'file.open',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, fileEnumMode ]
                        ])
                    }
                ]
            },
            {
                label: 'file.read',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, fileEnumRead ]
                        ])
                    }
                ]
            },
            { label: 'file.usbdriveexists' },
            { label: 'file.write' },
        ],
        enums: [
            ...fileEnumMode,
            ...fileEnumRead
        ],
        label: 'file'
    }
}

namespace Format {
    const formatEnumData: Array<ExclusiveCompletionApiSpec> = [
        { label: 'format.ASCII' },
        { label: 'format.REAL32' },
        { label: 'format.REAL64' },
    ]
    const formatEnumEnding: Array<ExclusiveCompletionApiSpec> = [
        { label: 'format.BIGENDIAN' },
        { label: 'format.LITTLEENDIAN' },
    ]

    export const format: ApiSpec = {
        children: [
            { label: 'format.asciiprecision' },
            {
                assignmentExclusives: formatEnumEnding,
                label: 'format.byteorder'
            },
            {
                assignmentExclusives: formatEnumData,
                label: 'format.data'
            },
        ],
        enums: [
            ...formatEnumData,
            ...formatEnumEnding,
        ],
        label: 'format'
    }
}

const gpib: ApiSpec = { label: 'gpib' }

namespace Lan {
    const lanEnumMode: Array<ExclusiveCompletionApiSpec> = [
        { label: 'lan.MODE_AUTO' },
        { label: 'lan.MODE_MANUAL' },
    ]

    export const lan: ApiSpec = {
        children: [
            {
                label: 'lan.ipconfig',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 0, lanEnumMode ]
                        ])
                    }
                ]
            },
            { label: 'lan.lxidomain' },
            { label: 'lan.macaddress' },
        ],
        enums: [
            ...lanEnumMode
        ],
        label: 'lan'
    }
}

namespace Localnode {
    const localnodeEnumAccess: Array<ExclusiveCompletionApiSpec> = [
        { label: 'localnode.ACCESS_EXCLUSIVE' },
        { label: 'localnode.ACCESS_FULL' },
        { label: 'localnode.ACCESS_LOCKOUT' },
        { label: 'localnode.ACCESS_PROTECTED' },
    ]
    const localnodeEnumEnableDisable: Array<ExclusiveCompletionApiSpec> = [
        { label: 'localnode.DISABLE' },
        { label: 'localnode.ENABLE' },
    ]

    export const localnode: ApiSpec = {
        children: [
            {
                assignmentExclusives: localnodeEnumAccess,
                label: 'localnode.access'
            },
            { label: 'localnode.gettime' },
            { label: 'localnode.linefreq' },
            { label: 'localnode.model' },
            { label: 'localnode.password' },
            {
                assignmentExclusives: localnodeEnumEnableDisable,
                label: 'localnode.prompts'
            },
            {
                assignmentExclusives: localnodeEnumEnableDisable,
                label: 'localnode.prompts4882'
            },
            { label: 'localnode.serialno' },
            { label: 'localnode.settime' },
            {
                assignmentExclusives: Eventlog.eventlogEnumSev,
                label: 'localnode.showevents'
            },
            { label: 'localnode.version' },
        ],
        enums: [
            ...localnodeEnumAccess,
            ...localnodeEnumEnableDisable,
        ],
        label: 'localnode'
    }
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

namespace Smu {
    namespace Func {
        export const DC_CURRENT: ExclusiveCompletionApiSpec = { label: 'smu.FUNC_DC_CURRENT' }
        export const DC_VOLTAGE: ExclusiveCompletionApiSpec = { label: 'smu.FUNC_DC_VOLTAGE' }
        export const RESISTANCE: ExclusiveCompletionApiSpec = { label: 'smu.FUNC_RESISTANCE' }
    }
    const smuEnumAudible: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.AUDIBLE_FAIL' },
        { label: 'smu.AUDIBLE_NONE' },
        { label: 'smu.AUDIBLE_PASS' },
    ]
    const smuEnumDelay: ExclusiveCompletionApiSpec = { label: 'smu.DELAY_AUTO' }
    const smuEnumDigits: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.DIGITS_3_5' },
        { label: 'smu.DIGITS_4_5' },
        { label: 'smu.DIGITS_5_5' },
        { label: 'smu.DIGITS_6_5' },
    ]
    const smuEnumFail: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.FAIL_BOTH' },
        { label: 'smu.FAIL_HIGH' },
        { label: 'smu.FAIL_LOW' },
        { label: 'smu.FAIL_NONE' },
    ]
    const smuEnumFilter: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.FILTER_MOVING_AVG' },
        { label: 'smu.FILTER_REPEAT_AVG' },
    ]
    const smuEnumFuncMeasure: Array<ExclusiveCompletionApiSpec> = [
        Func.RESISTANCE
    ]
    const smuEnumFuncSource: Array<ExclusiveCompletionApiSpec> = [
        Func.DC_CURRENT,
        Func.DC_VOLTAGE
    ]
    const smuEnumInfinite: ExclusiveCompletionApiSpec = { label: 'smu.INFINITE' }
    const smuEnumMath: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.MATH_MXB' },
        { label: 'smu.MATH_PERCENT' },
        { label: 'smu.MATH_RECIPROCAL' },
    ]
    const smuEnumOffmode: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.OFFMODE_GUARD' },
        { label: 'smu.OFFMODE_HIGHZ' },
        { label: 'smu.OFFMODE_NORMAL' },
        { label: 'smu.OFFMODE_ZERO' },
    ]
    export const smuEnumOnOff: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.OFF' },
        { label: 'smu.ON' },
    ]
    const smuEnumProtect: Array<ExclusiveCompletionApiSpec> = [
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
    ]
    const smuEnumRange: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.RANGE_AUTO' },
        { label: 'smu.RANGE_BEST' },
        { label: 'smu.RANGE_FIXED' },
    ]
    const smuEnumSense: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.SENSE_2WIRE' },
        { label: 'smu.SENSE_4WIRE' },
    ]
    const smuEnumTerminals: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.TERMINALS_FRONT' },
        { label: 'smu.TERMINALS_REAR' },
    ]
    const smuEnumUnits: Array<ExclusiveCompletionApiSpec> = [
        { label: 'smu.UNIT_AMP' },
        { label: 'smu.UNIT_OHM' },
        { label: 'smu.UNIT_VOLT' },
        { label: 'smu.UNIT_WATT' },
    ]

    export const smuInterlock: ApiSpec = {
        children: [
            { label: 'smu.interlock.tripped' },
        ],
        label: 'smu.interlock'
    }

    export const smuMeasureAutozero: ApiSpec = {
        children: [
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.autozero.enable'
            },
            { label: 'smu.measure.autozero.once' },
        ],
        label: 'smu.measure.autozero'
    }

    export const smuMeasureConfiglist: ApiSpec = {
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

    export const smuMeasureFilter: ApiSpec = {
        children: [
            { label: 'smu.measure.filter.count' },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.filter.enable'
            },
            {
                assignmentExclusives: smuEnumFilter,
                label: 'smu.measure.filter.type'
            },
        ],
        label: 'smu.measure.filter'
    }

    export const smuMeasureLimitHigh: ApiSpec = {
        children: [
            { label: 'smu.measure.limit.high.value' },
        ],
        label: 'smu.measure.limit.high'
    }

    export const smuMeasureLimitLow: ApiSpec = {
        children: [
            { label: 'smu.measure.limit.low.value' },
        ],
        label: 'smu.measure.limit.low'
    }

    export const smuMeasureLimit: ApiSpec = {
        children: [
            {
                assignmentExclusives: smuEnumAudible,
                label: 'smu.measure.limit.audible'
            },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.limit.autoclear'
            },
            { label: 'smu.measure.limit.clear' },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.limit.enable'
            },
            {
                assignmentExclusives: smuEnumFail,
                label: 'smu.measure.limit.fail'
            },
        ],
        label: 'smu.measure.limit'
    }

    export const smuMeasureMathMxb: ApiSpec = {
        children: [
            { label: 'smu.measure.math.mxb.bfactor' },
            { label: 'smu.measure.math.mxb.mfactor' },
        ],
        label: 'smu.measure.math.mxb'
    }

    export const smuMeasureMath: ApiSpec = {
        children: [
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.math.enable'
            },
            {
                assignmentExclusives: smuEnumMath,
                label: 'smu.measure.math.format'
            },
            { label: 'smu.measure.math.percent' },
        ],
        label: 'smu.measure.math'
    }

    export const smuMeasureRel: ApiSpec = {
        children: [
            { label: 'smu.measure.rel.acquire' },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.rel.enable'
            },
            { label: 'smu.measure.rel.level' },
        ],
        label: 'smu.measure.rel'
    }

    export const smuMeasure: ApiSpec = {
        children: [
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.autorange'
            },
            { label: 'smu.measure.autorangehigh' },
            { label: 'smu.measure.autorangelow' },
            { label: 'smu.measure.count' },
            {
                assignmentExclusives: smuEnumDigits,
                label: 'smu.measure.displaydigits'
            },
            {
                assignmentExclusives: smuEnumFuncSource.concat(...smuEnumFuncMeasure),
                label: 'smu.measure.func'
            },
            { label: 'smu.measure.nplc' },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.measure.offsetcompensation'
            },
            { label: 'smu.measure.range' },
            { label: 'smu.measure.read' },
            { label: 'smu.measure.readwithtime' },
            {
                assignmentExclusives: smuEnumSense,
                label: 'smu.measure.sense'
            },
            {
                assignmentExclusives: smuEnumTerminals,
                label: 'smu.measure.terminals'
            },
            {
                assignmentExclusives: smuEnumUnits,
                label: 'smu.measure.unit'
            },
            { label: 'smu.measure.userdelay' },
        ],
        label: 'smu.measure'
    }

    export const smuSourceConfiglist: ApiSpec = {
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

    export const smuSourceIlimit: ApiSpec = {
        children: [
            { label: 'smu.source.ilimit.level' },
            { label: 'smu.source.ilimit.tripped' },
        ],
        label: 'smu.source.ilimit'
    }

    export const smuSourceProtect: ApiSpec = {
        children: [
            {
                assignmentExclusives: smuEnumProtect,
                label: 'smu.source.protect.level'
            },
            { label: 'smu.source.protect.tripped' },
        ],
        label: 'smu.source.protect'
    }

    export const smuSourceVlimit: ApiSpec = {
        children: [
            { label: 'smu.source.vlimit.level' },
            { label: 'smu.source.vlimit.tripped' },
        ],
        label: 'smu.source.vlimit'
    }

    export const smuSource: ApiSpec = {
        children: [
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.source.autodelay'
            },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.source.autorange'
            },
            { label: 'smu.source.delay' },
            {
                assignmentExclusives: smuEnumFuncSource,
                label: 'smu.source.func'
            },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.source.highc'
            },
            { label: 'smu.source.level' },
            {
                assignmentExclusives: smuEnumOffmode,
                label: 'smu.source.offmode'
            },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.source.output'
            },
            { label: 'smu.source.range' },
            {
                assignmentExclusives: smuEnumOnOff,
                label: 'smu.source.readback'
            },
            {
                label: 'smu.source.sweeplinear',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 4, [smuEnumDelay] ],
                            [ 5, [smuEnumInfinite] ],
                            [ 6, smuEnumRange ],
                            [ 7, smuEnumOnOff ],
                            [ 8, smuEnumOnOff ]
                        ])
                    }
                ]
            },
            {
                label: 'smu.source.sweeplinearstep',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 4, [smuEnumDelay] ],
                            [ 5, [smuEnumInfinite] ],
                            [ 6, smuEnumRange ],
                            [ 7, smuEnumOnOff ],
                            [ 8, smuEnumOnOff ]
                        ])
                    }
                ]
            },
            {
                label: 'smu.source.sweeplist',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 3, [smuEnumInfinite] ],
                            [ 4, smuEnumOnOff ]
                        ])
                    }
                ]
            },
            {
                label: 'smu.source.sweeplog',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 4, [smuEnumDelay] ],
                            [ 5, [smuEnumInfinite] ],
                            [ 6, smuEnumRange ],
                            [ 7, smuEnumOnOff ],
                            [ 8, smuEnumOnOff ]
                        ])
                    }
                ]
            },
            { label: 'smu.source.userdelay' },
        ],
        label: 'smu.source'
    }

    export const smu: ApiSpec = {
        children: [
            { label: 'smu.reset' },
        ],
        enums: [
            ...smuEnumAudible,
            smuEnumDelay,
            ...smuEnumDigits,
            ...smuEnumFail,
            ...smuEnumFilter,
            Func.DC_CURRENT,
            Func.DC_VOLTAGE,
            Func.RESISTANCE,
            smuEnumInfinite,
            ...smuEnumMath,
            ...smuEnumOffmode,
            ...smuEnumOnOff,
            ...smuEnumProtect,
            ...smuEnumRange,
            ...smuEnumSense,
            ...smuEnumTerminals,
            ...smuEnumUnits,
        ],
        label: 'smu'
    }
}

namespace Status {
    const statusEnum: Array<ExclusiveCompletionApiSpec> = [
        { label: 'status.MSB' },
        { label: 'status.EAV' },
        { label: 'status.QSB' },
        { label: 'status.MAV' },
        { label: 'status.ESB' },
        { label: 'status.MSS' },
        { label: 'status.OSB' },
    ]
    const statusStandardEnum: Array<ExclusiveCompletionApiSpec> = [
        { label: 'status.standard.OPC' },
        { label: 'status.standard.QYE' },
        { label: 'status.standard.PON' },
    ]

    export const statusOperation: ApiSpec = {
        children: [
            { label: 'status.operation.condition' },
            { label: 'status.operation.enable' },
            { label: 'status.operation.event' },
            { label: 'status.operation.getmap' },
            { label: 'status.operation.setmap' },
        ],
        label: 'status.operation'
    }

    export const statusQuestionable: ApiSpec = {
        children: [
            { label: 'status.questionable.condition' },
            { label: 'status.questionable.enable' },
            { label: 'status.questionable.event' },
            { label: 'status.questionable.getmap' },
            { label: 'status.questionable.setmap' },
        ],
        label: 'status.questionable'
    }

    export const statusStandard: ApiSpec = {
        children: [
            {
                assignmentExclusives: statusStandardEnum,
                label: 'status.standard.enable'
            },
            { label: 'status.standard.event' },
        ],
        enums: [
            ...statusStandardEnum,
        ],
        label: 'status.standard'
    }

    export const status: ApiSpec = {
        children: [
            { label: 'status.clear' },
            { label: 'status.condition' },
            { label: 'status.preset' },
            {
                assignmentExclusives: statusEnum,
                label: 'status.request_enable'
            },
        ],
        enums: [
            ...statusEnum,
        ],
        label: 'status'
    }
}

const timer: ApiSpec = {
    children: [
        { label: 'timer.cleartime' },
        { label: 'timer.gettime' },
    ],
    label: 'timer'
}

namespace Trigger {
    namespace Block {
        export namespace Branch {
            export const ALWAYS: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_ALWAYS' }
            export const COUNTER: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_COUNTER' }
            export const DELTA: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_DELTA' }
            export const LIMIT_CONSTANT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_LIMIT_CONSTANT' }
            export const LIMIT_DYNAMIC: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_LIMIT_DYNAMIC' }
            export const ONCE: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_ONCE' }
            export const ONCE_EXCLUDED: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_ONCE_EXCLUDED' }
            export const ON_EVENT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BRANCH_ON_EVENT' }
        }
        export const BUFFER_CLEAR: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_BUFFER_CLEAR' }
        export namespace Config {
            export const NEXT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_CONFIG_NEXT' }
            export const PREV: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_CONFIG_PREV' }
            export const RECALL: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_CONFIG_RECALL' }
        }
        export namespace Delay {
            export const CONSTANT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_DELAY_CONSTANT' }
            export const DYNAMIC: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_DELAY_DYNAMIC' }
        }
        export const DIGITAL_IO: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_DIGITAL_IO' }
        export const LOG_EVENT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_LOG_EVENT' }
        export const MEASURE: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_MEASURE' }
        export const NOP: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_NOP' }
        export const NOTIFY: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_NOTIFY' }
        export const RESET_BRANCH_COUNT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_RESET_BRANCH_COUNT' }
        export const SOURCE_OUTPUT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_SOURCE_OUTPUT' }
        export const WAIT: ExclusiveCompletionApiSpec = { label: 'trigger.BLOCK_WAIT' }
    }
    const triggerEnumClear: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.CLEAR_ENTER' },
        { label: 'trigger.CLEAR_NEVER' },
    ]
    const triggerEnumCount: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.COUNT_INFINITE' },
        { label: 'trigger.COUNT_STOP' },
    ]
    const triggerEnumEdge: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.EDGE_EITHER' },
        { label: 'trigger.EDGE_FALLING' },
        { label: 'trigger.EDGE_RISING' },
    ]
    namespace Event {
        export const BLENDER: Array<ExclusiveCompletionApiSpec> = [
            { label: 'trigger.EVENT_BLENDER1' },
            { label: 'trigger.EVENT_BLENDER2' },
        ]
        export const COMMAND: ExclusiveCompletionApiSpec = { label: 'trigger.EVENT_COMMAND' }
        export const DIGIO: Array<ExclusiveCompletionApiSpec> = [
            { label: 'trigger.EVENT_DIGIO1' },
            { label: 'trigger.EVENT_DIGIO2' },
            { label: 'trigger.EVENT_DIGIO3' },
            { label: 'trigger.EVENT_DIGIO4' },
            { label: 'trigger.EVENT_DIGIO5' },
            { label: 'trigger.EVENT_DIGIO6' },
        ]
        export const DISPLAY: ExclusiveCompletionApiSpec = { label: 'trigger.EVENT_DISPLAY' }
        export const LAN: Array<ExclusiveCompletionApiSpec> = [
            { label: 'trigger.EVENT_LAN1' },
            { label: 'trigger.EVENT_LAN2' },
            { label: 'trigger.EVENT_LAN3' },
            { label: 'trigger.EVENT_LAN4' },
            { label: 'trigger.EVENT_LAN5' },
            { label: 'trigger.EVENT_LAN6' },
            { label: 'trigger.EVENT_LAN7' },
            { label: 'trigger.EVENT_LAN8' },
        ]
        export const NONE: ExclusiveCompletionApiSpec = { label: 'trigger.EVENT_NONE' }
        export const NOTIFY: Array<ExclusiveCompletionApiSpec> = [
            { label: 'trigger.EVENT_NOTIFY1' },
            { label: 'trigger.EVENT_NOTIFY2' },
            { label: 'trigger.EVENT_NOTIFY3' },
            { label: 'trigger.EVENT_NOTIFY4' },
            { label: 'trigger.EVENT_NOTIFY5' },
            { label: 'trigger.EVENT_NOTIFY6' },
            { label: 'trigger.EVENT_NOTIFY7' },
            { label: 'trigger.EVENT_NOTIFY8' },
        ]
        export const SOURCE_LIMIT: ExclusiveCompletionApiSpec = { label: 'trigger.EVENT_SOURCE_LIMIT' }
        export const TIMER: Array<ExclusiveCompletionApiSpec> = [
            { label: 'trigger.EVENT_TIMER1' },
            { label: 'trigger.EVENT_TIMER2' },
            { label: 'trigger.EVENT_TIMER3' },
            { label: 'trigger.EVENT_TIMER4' },
        ]
        export const TSPLINK: Array<ExclusiveCompletionApiSpec> = [
            { label: 'trigger.EVENT_TSPLINK1' },
            { label: 'trigger.EVENT_TSPLINK2' },
            { label: 'trigger.EVENT_TSPLINK3' },
        ]

        export function all(): Array<ExclusiveCompletionApiSpec> {
            return [
                ...BLENDER,
                COMMAND,
                ...DIGIO,
                DISPLAY,
                ...LAN,
                NONE,
                ...NOTIFY,
                SOURCE_LIMIT,
                ...TIMER,
                ...TSPLINK,
            ]
        }
    }
    const triggerEnumLimit: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.LIMIT_ABOVE' },
        { label: 'trigger.LIMIT_BELOW' },
        { label: 'trigger.LIMIT_INSIDE' },
        { label: 'trigger.LIMIT_OUTSIDE' },
    ]
    const triggerEnumLog: Array<ExclusiveCompletionApiSpec> = [
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
    ]
    const triggerEnumLogic: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.LOGIC_NEGATIVE' },
        { label: 'trigger.LOGIC_POSITIVE' },
    ]
    const triggerEnumOnOff: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.OFF' },
        { label: 'trigger.ON' },
    ]
    const triggerEnumProtocol: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.PROTOCOL_MULTICAST' },
        { label: 'trigger.PROTOCOL_TCP' },
        { label: 'trigger.PROTOCOL_UDP' },
    ]
    const triggerEnumUserDelay: Array<ExclusiveCompletionApiSpec> = [
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
    ]
    const triggerEnumWait: Array<ExclusiveCompletionApiSpec> = [
        { label: 'trigger.WAIT_AND' },
        { label: 'trigger.WAIT_OR' },
    ]

    export const triggerBlender: ApiSpec = {
        children: [
            { label: 'trigger.blender.clear' },
            { label: 'trigger.blender.orenable' },
            { label: 'trigger.blender.overrun' },
            { label: 'trigger.blender.reset' },
            {
                assignmentExclusives: Event.all(),
                label: 'trigger.blender.stimulus'
            },
            { label: 'trigger.blender.wait' },
        ],
        label: 'trigger.blender'
    }

    export const triggerDigin: ApiSpec = {
        children: [
            { label: 'trigger.digin.clear' },
            {
                assignmentExclusives: triggerEnumEdge,
                label: 'trigger.digin.edge'
            },
            { label: 'trigger.digin.overrun' },
            { label: 'trigger.digin.wait' },
        ],
        label: 'trigger.digin'
    }

    export const triggerDigout: ApiSpec = {
        children: [
            { label: 'trigger.digout.assert' },
            {
                assignmentExclusives: triggerEnumLogic,
                label: 'trigger.digout.logic'
            },
            { label: 'trigger.digout.pulsewidth' },
            { label: 'trigger.digout.release' },
            {
                assignmentExclusives: Event.all(),
                label: 'trigger.digout.stimulus'
            },
        ],
        label: 'trigger.digout'
    }

    export const triggerLanin: ApiSpec = {
        children: [
            { label: 'trigger.lanin.clear' },
            {
                assignmentExclusives: triggerEnumEdge,
                label: 'trigger.lanin.edge'
            },
            { label: 'trigger.lanin.overrun' },
            { label: 'trigger.lanin.wait' },
        ],
        label: 'trigger.lanin'
    }

    export const triggerLanout: ApiSpec = {
        children: [
            { label: 'trigger.lanout.assert' },
            { label: 'trigger.lanout.connect' },
            { label: 'trigger.lanout.connected' },
            { label: 'trigger.lanout.disconnect' },
            { label: 'trigger.lanout.ipaddress' },
            {
                assignmentExclusives: triggerEnumLogic,
                label: 'trigger.lanout.logic'
            },
            {
                assignmentExclusives: triggerEnumProtocol,
                label: 'trigger.lanout.protocol'
            },
            {
                assignmentExclusives: Event.all(),
                label: 'trigger.lanout.stimulus'
            },
        ],
        label: 'trigger.lanout'
    }

    export const triggerModel: ApiSpec = {
        children: [
            { label: 'trigger.model.abort' },
            { label: 'trigger.model.getblocklist' },
            { label: 'trigger.model.getbranchcount' },
            { label: 'trigger.model.initiate' },
            { label: 'trigger.model.load' },
            {
                label: 'trigger.model.setblock',
                signatureExclusives: [
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.ALWAYS] ]
                        ]),
                        qualifier: 0
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.COUNTER] ]
                        ]),
                        qualifier: 1
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.DELTA] ]
                        ]),
                        qualifier: 2
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.LIMIT_CONSTANT] ],
                            [ 2, triggerEnumLimit ]
                        ]),
                        qualifier: 3
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.LIMIT_DYNAMIC] ],
                            [ 2, triggerEnumLimit ]
                        ]),
                        qualifier: 4
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.ONCE] ]
                        ]),
                        qualifier: 5
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.ONCE_EXCLUDED] ]
                        ]),
                        qualifier: 6
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Branch.ON_EVENT] ],
                            [ 2, Event.all() ]
                        ]),
                        qualifier: 7
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.BUFFER_CLEAR] ]
                        ]),
                        qualifier: 8
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Config.NEXT] ]
                        ]),
                        qualifier: 9
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Config.PREV] ]
                        ]),
                        qualifier: 10
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Config.RECALL] ]
                        ]),
                        qualifier: 11
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Delay.CONSTANT] ]
                        ]),
                        qualifier: 12
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.Delay.DYNAMIC] ],
                            [ 2, triggerEnumUserDelay ]
                        ]),
                        qualifier: 13
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.DIGITAL_IO] ]
                        ]),
                        qualifier: 14
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.LOG_EVENT] ],
                            [ 2, triggerEnumLog ]
                        ]),
                        qualifier: 15
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.MEASURE] ],
                            [ 3, triggerEnumCount ]
                        ]),
                        qualifier: 16
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.NOP] ]
                        ]),
                        qualifier: 17
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.NOTIFY] ],
                            [ 2, Event.NOTIFY ]
                        ]),
                        qualifier: 18
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.RESET_BRANCH_COUNT] ]
                        ]),
                        qualifier: 19
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.SOURCE_OUTPUT] ],
                            [ 2, Smu.smuEnumOnOff ]
                        ]),
                        qualifier: 20
                    },
                    {
                        parameters: new Map([
                            [ 1, [Block.WAIT] ],
                            [ 2, Event.all() ],
                            [ 3, triggerEnumClear ],
                            [ 4, triggerEnumWait ],
                            [ 5, Event.all() ],
                            [ 6, Event.all() ]
                        ]),
                        qualifier: 21
                    },
                ]
            },
            { label: 'trigger.model.state' },
        ],
        label: 'trigger.model'
    }

    export const triggerTimerStart: ApiSpec = {
        children: [
            { label: 'trigger.timer.start.fractionalseconds' },
            {
                assignmentExclusives: triggerEnumOnOff,
                label: 'trigger.timer.start.generate'
            },
            { label: 'trigger.timer.start.overrun' },
            { label: 'trigger.timer.start.seconds' },
            {
                assignmentExclusives: Event.all(),
                label: 'trigger.timer.start.stimulus'
            },
        ],
        label: 'trigger.timer.start'
    }

    export const triggerTimer: ApiSpec = {
        children: [
            { label: 'trigger.timer.clear' },
            { label: 'trigger.timer.count' },
            { label: 'trigger.timer.delay' },
            { label: 'trigger.timer.delaylist' },
            {
                assignmentExclusives: triggerEnumOnOff,
                label: 'trigger.timer.enable'
            },
            { label: 'trigger.timer.reset' },
            { label: 'trigger.timer.wait' },
        ],
        label: 'trigger.timer'
    }

    export const triggerTsplinkin: ApiSpec = {
        children: [
            { label: 'trigger.tsplinkin.clear' },
            {
                assignmentExclusives: triggerEnumEdge,
                label: 'trigger.tsplinkin.edge'
            },
            { label: 'trigger.tsplinkin.overrun' },
            { label: 'trigger.tsplinkin.wait' },
        ],
        label: 'trigger.tsplinkin'
    }

    export const triggerTsplinkout: ApiSpec = {
        children: [
            { label: 'trigger.tsplinkout.assert' },
            {
                assignmentExclusives: triggerEnumLogic,
                label: 'trigger.tsplinkout.logic'
            },
            { label: 'trigger.tsplinkout.pulsewidth' },
            { label: 'trigger.tsplinkout.release' },
            {
                assignmentExclusives: Event.all(),
                label: 'trigger.tsplinkout.stimulus'
            },
        ],
        label: 'trigger.tsplinkout'
    }

    export const trigger: ApiSpec = {
        children: [
            { label: 'trigger.clear' },
            { label: 'trigger.wait' },
        ],
        enums: [
            Block.Branch.ALWAYS,
            Block.Branch.COUNTER,
            Block.Branch.DELTA,
            Block.Branch.LIMIT_CONSTANT,
            Block.Branch.LIMIT_DYNAMIC,
            Block.Branch.ONCE,
            Block.Branch.ONCE_EXCLUDED,
            Block.Branch.ON_EVENT,
            Block.BUFFER_CLEAR,
            Block.Config.NEXT,
            Block.Config.PREV,
            Block.Config.RECALL,
            Block.Delay.CONSTANT,
            Block.Delay.DYNAMIC,
            Block.DIGITAL_IO,
            Block.LOG_EVENT,
            Block.MEASURE,
            Block.NOP,
            Block.NOTIFY,
            Block.RESET_BRANCH_COUNT,
            Block.SOURCE_OUTPUT,
            Block.WAIT,
            ...triggerEnumClear,
            ...triggerEnumCount,
            ...triggerEnumEdge,
            ...Event.all(),
            ...triggerEnumLimit,
            ...triggerEnumLog,
            ...triggerEnumLogic,
            ...triggerEnumOnOff,
            ...triggerEnumProtocol,
            { label: 'trigger.STATE_ABORTED' },
            { label: 'trigger.STATE_ABORTING' },
            { label: 'trigger.STATE_BUILDING' },
            { label: 'trigger.STATE_EMPTY' },
            { label: 'trigger.STATE_FAILED' },
            { label: 'trigger.STATE_IDLE' },
            { label: 'trigger.STATE_RUNNING' },
            { label: 'trigger.STATE_WAITING' },
            ...triggerEnumUserDelay,
            ...triggerEnumWait,
        ],
        label: 'trigger'
    }
}

namespace Tsplink {
    const tsplinkEnumMode: Array<ExclusiveCompletionApiSpec> = [
        { label: 'tsplink.MODE_DIGITAL_OPEN_DRAIN' },
        { label: 'tsplink.MODE_TRIGGER_OPEN_DRAIN' },
        { label: 'tsplink.MODE_SYNCHRONOUS_ACCEPTOR' },
        { label: 'tsplink.MODE_SYNCHRONOUS_MASTER' },
    ]
    const tsplinkEnumState: Array<ExclusiveCompletionApiSpec> = [
        { label: 'tsplink.STATE_HIGH' },
        { label: 'tsplink.STATE_LOW' },
    ]

    export const tsplinkLine: ApiSpec = {
        children: [
            {
                assignmentExclusives: tsplinkEnumMode,
                label: 'tsplink.line.mode'
            },
            { label: 'tsplink.line.reset' },
            {
                assignmentExclusives: tsplinkEnumState,
                label: 'tsplink.line.state'
            },
        ],
        label: 'tsplink.line'
    }

    export const tsplink: ApiSpec = {
        children: [
            { label: 'tsplink.group' },
            { label: 'tsplink.initialize' },
            { label: 'tsplink.master' },
            { label: 'tsplink.node' },
            { label: 'tsplink.readport' },
            { label: 'tsplink.reset' },
            { label: 'tsplink.state' },
            { label: 'tsplink.writeport' },
        ],
        enums: [
            ...tsplinkEnumMode,
            ...tsplinkEnumState,
        ],
        label: 'tsplink'
    }
}

namespace Tspnet {
    const tspnetEnumTerm: Array<ExclusiveCompletionApiSpec> = [
        { label: 'tspnet.TERM_CR' },
        { label: 'tspnet.TERM_CRLF' },
        { label: 'tspnet.TERM_LF' },
        { label: 'tspnet.TERM_LFCR' },
    ]

    export const tspnetTsp: ApiSpec = {
        children: [
            { label: 'tspnet.tsp.abort' },
            { label: 'tspnet.tsp.abortonconnect' },
            { label: 'tspnet.tsp.rbtablecopy' },
            { label: 'tspnet.tsp.runscript' },
        ],
        label: 'tspnet.tsp'
    }

    export const tspnet: ApiSpec = {
        children: [
            { label: 'tspnet.clear' },
            { label: 'tspnet.connect' },
            { label: 'tspnet.disconnect' },
            { label: 'tspnet.execute' },
            { label: 'tspnet.idn' },
            { label: 'tspnet.read' },
            { label: 'tspnet.readavailable' },
            { label: 'tspnet.reset' },
            {
                assignmentExclusives: tspnetEnumTerm,
                label: 'tspnet.termination'
            },
            { label: 'tspnet.timeout' },
            { label: 'tspnet.write' },
        ],
        enums: [
            ...tspnetEnumTerm,
        ],
        label: 'tspnet'
    }
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
        Digio.digioLine,
        Digio.digio,
        Display.displayInput,
        Display.display,
        Eventlog.eventlog,
        exit,
        File.file,
        Format.format,
        gpib,
        Lan.lan,
        Localnode.localnode,
        node,
        opc,
        printbuffer,
        printnumber,
        reset,
        script,
        Smu.smuInterlock,
        Smu.smuMeasureAutozero,
        Smu.smuMeasureConfiglist,
        Smu.smuMeasureFilter,
        Smu.smuMeasureLimitHigh,
        Smu.smuMeasureLimitLow,
        Smu.smuMeasureLimit,
        Smu.smuMeasureMath,
        Smu.smuMeasureMathMxb,
        Smu.smuMeasureRel,
        Smu.smuMeasure,
        Smu.smuSourceConfiglist,
        Smu.smuSourceIlimit,
        Smu.smuSourceProtect,
        Smu.smuSourceVlimit,
        Smu.smuSource,
        Smu.smu,
        Status.statusOperation,
        Status.statusQuestionable,
        Status.statusStandard,
        Status.status,
        timer,
        Trigger.triggerBlender,
        Trigger.triggerDigin,
        Trigger.triggerDigout,
        Trigger.triggerLanin,
        Trigger.triggerLanout,
        Trigger.triggerModel,
        Trigger.triggerTimerStart,
        Trigger.triggerTimer,
        Trigger.triggerTsplinkin,
        Trigger.triggerTsplinkout,
        Trigger.trigger,
        Tsplink.tsplinkLine,
        Tsplink.tsplink,
        Tspnet.tspnetTsp,
        Tspnet.tspnet,
        upgrade,
        userstring,
        waitcomplete
    ]
}

export function getInstrumentSpec(): InstrumentSpec {
    return {
        beeper: {
            hertz: { max: 8000, min: 20 },
            seconds: { max: 100, min: 0.001 }
        },
        defaults: {
            measure: {
                range: {
                    current: 100e-6,
                    resistance: 200e3,
                    voltage: 20e-3
                }
            },
            source: {
                ilimit: {
                    level: 1.05e-4
                },
                vlimit: {
                    level: 21
                }
            }
        },
        interlock: {
            maxNominal: 42,
            maxSource: 21
        },
        overflow: 9.9e37,
        ranges: {
            autolow: {
                maxCurrent: 1,
                maxResistance: 200e6,
                maxVoltage: 200
            },
            current: [10e-9, 100e-9, 1e-6, 10e-6, 100e-6, 1e-3, 10e-3, 100e-3, 1],
            resistance: [2, 20, 200, 2e3, 20e3, 200e3, 2e6, 20e6, 200e6],
            voltage: [20e-3, 200e-3, 2, 20, 200]
        }
    }
}
