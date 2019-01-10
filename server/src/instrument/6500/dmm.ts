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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const dmmCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute defines the signal level that generates the analog trigger event for the edge trigger mode.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is only available when the analog trigger mode is set to edge.\n\nThe edge level can be set to any value in the active measurement range.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.analogtrigger.edge.level',
    },
    {
        detail: 'This attribute defines the slope of the analog trigger edge.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This is only available when the analog trigger mode is set to edge.\n\nRising causes an analog trigger event when the analog signal trends from below the analog signal level to above the level.\n\nFalling causes an analog trigger event when the signal trends from above to below the level.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.analogtrigger.edge.slope',
    },
    {
        detail: 'This attribute configures the type of signal behavior that can generate an analog trigger event.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When edge is selected, the analog trigger occurs when the signal crosses a certain level. You also specify if the analog trigger occurs on the rising or falling edge of the signal.\n\nWhen window is selected, the analog trigger occurs when the signal enters or exits the window defined by the low and high signal levels.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.analogtrigger.mode',
    },
    {
        detail: 'This attribute defines if the analog trigger occurs when the signal enters or leaves the defined upper and lower analog signal level boundaries.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This is only available when the analog trigger mode is set to window.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.analogtrigger.window.direction',
    },
    {
        detail: 'This attribute defines the upper boundary of the analog trigger window.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available when the analog trigger mode is set to window.\n\nThe high level must be greater than the low level.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.analogtrigger.window.levelhigh',
    },
    {
        detail: 'This attribute defines the lower boundary of the analog trigger window.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available when the analog trigger mode is set to window.\n\nThe low level must be less than the high level.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.analogtrigger.window.levellow',
    },
    {
        detail: 'This attribute determines the aperture setting for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The aperture is the actual acquisition time of the instrument on the signal. The aperture can be set to automatic or to a specific value in 1μs intervals. If the value is not specified in microseconds, the value is rounded down to the nearest microsecond resolution. When automatic is selected, the aperture setting is set to the maximum value possible for the selected sample rate.\n\nThe aperture must be less than the reciprocal of the sample rate. The minimum aperture is 1μs at the maximum sampling rate of 1,000,000 samples per second.\n\nSet the sample rate before changing the aperture.\n\nThe maximum aperture available is 1 divided by the sample rate. The aperture cannot be set to more than this value.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.aperture',
    },
    {
        detail: 'This attribute sets the number of measurements to digitize when a measurement is requested.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The digitizer makes the number of readings set by this command in the time set by the sample rate. This command does not affect the trigger model.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.count',
    },
    {
        detail: 'This attribute defines the decibel (dB) reference setting for the DMM in volts.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This value only applies when the unit setting for the function is set to decibels.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.dbreference',
    },
    {
        detail: 'This attribute describes the number of digits that are displayed on the front panel for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command affects how the reading for a measurement is displayed on the front panel of the instrument. It does not affect the number of digits returned in a remote command reading. It also does not affect the accuracy or speed of measurements.\n\nThe display digits setting is saved with the function setting, so if you use another function, then return to the function for which you set display digits, the display digits setting you set previously is retained.\n\nThe change in digits occurs the next time a measurement is made.\n\nTo change the number of digits returned in a remote command reading, use format.asciiprecision.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.displaydigits',
    },
    {
        detail: 'This attribute determines which digitize function is active.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Set this command to the type of measurement you want to digitize.\n\nReading this command returns the digitize function that is presently active.\n\nIf a basic (non-digitize) measurement function is selected, this returns dmm.FUNC_NONE. The none setting is automatically made if you select a function with dmm.measure.func or through the options from the front-panel Measure Functions tab.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.func',
    },
    {
        detail: 'This attribute determines when the 10MΩ input divider is enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Choosing automatic input impedance is a balance between achieving low DC voltage noise on the 100mV and 1V ranges and optimizing measurement noise due to charge injection. The DMM6500 is optimized for low noise and charge injection when the DUT has less than 100kΩ input resistance. When the DUT input impedance is more than 100kΩ, selecting an input impedance of 10MΩ optimizes the measurement for lowest noise on the 100mV and 1V ranges. You can achieve short-term low noise and low charge injection on the 100mV and 1V ranges with autozero off. For the 10V to 1000V ranges, both input impedance settings achieve low charge injection.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.inputimpedance',
    },
    {
        detail: 'This attribute determines if the instrument beeper sounds when a limit test passes or fails.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The tone and length of beeper cannot be adjusted.\n\nSee dmm.digitize.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.limit[Y].audible',
    },
    {
        detail: 'This attribute indicates if the test result for limit Y should be cleared automatically or not.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When auto clear is set to on, limit conditions are cleared automatically after each measurement. If you are making a series of measurements, the instrument shows the limit test result of the last measurement for the pass or fail indication for the limit.\n\nIf you want to know if any of a series of measurements failed the limit, set the auto clear setting to off. When this is set to off, a failed indication is not cleared automatically. It remains set until it is cleared with the clear command.\n\nThe auto clear setting affects both the high and low limits.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.limit[Y].autoclear',
    },
    {
        detail: 'This attribute clears the results of the limit test defined by Y.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to clear the test results of limit Y when the limit auto clear option is turned off. Both the high and low test results are cleared.\n\nTo avoid the need to manually clear the test results for a limit, turn the auto clear option on.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.digitize.limit[Y].clear',
    },
    {
        detail: 'This attribute enables or disables a limit test on the measurement from the selected digitize function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command enables or disables a limit test for the selected digitize function. When this attribute is enabled, the limit Y testing occurs on each measurement made by the instrument. Limit Y testing compares the measurements to the high and low limit values. If a measurement falls outside these limits, the test fails.\n\nSee dmm.digitize.limit[Y].low.value for examples of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.limit[Y].enable',
    },
    {
        detail: 'This attribute queries the results of a limit test.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command queries the result of a limit test for the selected digitize function.\n\nThe response message indicates if the limit test passed or how it failed (on the high or low limit).\n\nIf autoclear is set to off, reading the results of a limit test does not clear the fail indication of the test. To clear a failure, send the clear command. To automatically clear the results, set auto clear on.\n\nIf auto clear is set to on and you are making a series of measurements, the last measurement limit determines the fail indication for the limit. If auto clear is turned off, the results return a test fail if any of one of the readings failed.\n\nTo use this attribute, you must set the limit state to on.\n\nIf the readings are stored in a reading buffer, you can use the bufferVar.statuses command to see the results.\n\nSee dmm.digitize.limit[Y].low.value for examples of how to use this command.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dmm.digitize.limit[Y].fail',
    },
    {
        detail: 'This attribute specifies the upper limit for a limit test.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the high limit for the limit Y test for the selected digitize function. When limit Y testing is enabled, the instrument generates a fail indication when the measurement value is more than this value.\n\nSee dmm.digitize.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.limit[Y].high.value',
    },
    {
        detail: 'This attribute specifies the lower limit for limit tests.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the lower limit for the limit Y test for the selected digitize function. When limit Y testing is enabled, this causes a fail indication to occur when the measurement value is less than this value.\n\nThis example enables limits 1 and 2 for digitize voltage measurements. Limit 1 is checking for readings to be between 3 and 5 V, while limit2 is checking for the readings to be between 1 and 7 V. The auto clear feature is disabled, so if any reading is outside these limits, the corresponding fail is 1. Therefore, if any one of the fails is 1, analyze the reading buffer data to find out which reading failed the limits.\n\nThis example enables limits 1 and 2 for digitize voltage measurements on channels 1 and 2 of slot 1. Limit 1 is checking for readings to be between 3 and 5 V, while limit2 is checking for the readings to be between 1 and 7 V. The auto clear feature is disabled, so if any reading is outside these limits, the corresponding fail is 1. Therefore, if any one of the fails is 1, analyze the reading buffer data to find out which reading failed the limits.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.limit[Y].low.value',
    },
    {
        detail: 'This attribute enables or disables math operations on measurements for the selected digitize function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this command is set to on, the math operation specified by the math format command is performed before completing a measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.math.enable',
    },
    {
        detail: 'This attribute specifies which math operation is performed on measurements when math operations are enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This specifies which math operation is performed on measurements for the selected digitize function.\n\nYou can choose one of the following math operations:\n\nMath calculations are applied to the input signal after relative offset and before limit tests.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.math.format',
    },
    {
        detail: 'This attribute specifies the offset, b, for the y = mx + b operation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies the offset (b) for an mx + b operation.\n\nThe mx + b math operation lets you manipulate normal display readings (x) mathematically based on the calculation:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.math.mxb.bfactor',
    },
    {
        detail: 'This attribute specifies the scale factor, m, for the y = mx + b math operation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the scale factor (m) for an mx + b operation for the selected measurement function.\n\nThe mx + b math operation lets you manipulate normal display readings (x) mathematically according to the following calculation:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.math.mxb.mfactor',
    },
    {
        detail: 'This attribute specifies the reference constant that is used when math operations are set to percent.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The percent math function displays measurements as percent deviation from a specified reference constant. The percent calculation is:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.math.percent',
    },
    {
        detail: 'This attribute determines the positive full-scale measure range for the digitize function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When you assign a range value, the instrument selects a fixed range that is large enough to measure the assigned value. The instrument selects the best range for measuring the maximum expected value.\n\nFor example, for digitize current measurements, if you expect a reading of approximately 9mA, set the range to 9 mA to select the 10mA range.\n\nWhen you read this setting, you see the positive full-scale value of the measurement range that the instrument is presently using.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.range',
    },
    {
        detail: 'This function makes digitize measurements, places them in a reading buffer, and returns the last reading.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You must set the instrument to make digitize measurements before sending this command with the dmm.digitize.func attribute.\n\nThis command initiates measurements using the present function settings, stores the readings in a reading buffer, and returns the last reading.\n\nThis command makes the number of digitize measurements that is set by the dmm.digitize.count attribute.\n\nWhen you use a reading buffer with a command or action that makes multiple readings, all readings are available in the reading buffer. However, only the last reading is returned as a reading with the command.\n\nIf you define a specific reading buffer, the reading buffer must exist before you make the measurement.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.digitize.read',
    },
    {
        detail: 'This function initiates digitize measurements and returns the last actual measurement and time information in UTC format without using the trigger mode.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command initiates digitize measurements using the present function settings, stores the readings in a reading buffer, and returns the last reading.\n\nThe dmm.digitize.count attribute determines how many measurements are performed.\n\nWhen you use a reading buffer with a command or action that makes multiple readings, all readings are available in the reading buffer. However, only the last reading is returned as a reading with the command.\n\nIf you define a specific reading buffer, the reading buffer must exist before you make the measurement.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.digitize.readwithtime',
    },
    {
        detail: 'This function acquires a measurement and stores it as the relative offset value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command triggers the instrument to make a new measurement for the selected function. This measurement is then stored as the new relative offset level.\n\nWhen you send this command, the instrument does not apply any math, limit test, or filter settings to the measurement, even if they are set. It is a measurement that is made as if these settings are disabled.\n\nIf an error event occurs during the measurement, nil is returned and the relative offset level remains at the last valid setting.\n\nYou must change to the function for which you want to acquire a value before sending this command.\n\nThe instrument must have relative offset enabled to use the acquired relative offset value.\n\nAfter executing this command, you can use the dmm.digitize.rel.level attribute to see the last relative level value that was acquired or that was set.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.digitize.rel.acquire',
    },
    {
        detail: 'This attribute enables or disables the application of a relative offset value to the measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When relative measurements are enabled, all subsequent digitized readings are offset by the relative offset value that was calculated when you acquired the relative offset value.\n\nEach returned measured relative reading is the result of the following calculation:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.rel.enable',
    },
    {
        detail: 'This attribute contains the relative offset value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command specifies the relative offset value that can be applied to new measurements. When relative offset is enabled, all subsequent digitized readings are offset by the value that is set for this command.\n\nYou can set this value, or have the instrument acquire a value. If the instrument acquires the value, read this setting to return the value that was measured internally.\n\nThe ranges for the relative offset values for all functions are listed in the following table.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.rel.level',
    },
    {
        detail: 'This attribute defines the precise acquisition rate at which the digitizing measurements are made.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The sample rate determines how fast the DMM6500 acquires a digitized reading.\n\nSet the sample rate before setting the aperture. If the aperture setting is too high for the selected sample rate, it is automatically adjusted to the highest aperture that can be used with the sample rate.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.samplerate',
    },
    {
        detail: 'This attribute sets the units of measurement that are displayed on the front panel of the instrument and stored in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The change in measurement units is displayed when the next measurement is made. You can only change the units for the listed functions.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.unit',
    },
    {
        detail: 'This attribute sets a user-defined delay that you can use in the trigger model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To use this command in a trigger model, assign the delay to the dynamic delay block.\n\nThe delay is specific to the selected function.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.digitize.userdelay[N]',
    },
    {
        detail: 'This attribute defines the signal level that generates the analog trigger event for the edge trigger mode.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is only available when the analog trigger mode is set to edge.\n\nThe edge level can be set to any value in the active measurement range.\n\nTo use the analog trigger with the measure functions, a range must be set (you cannot use autorange) and autozero must be disabled.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.analogtrigger.edge.level',
    },
    {
        detail: 'This attribute defines the slope of the analog trigger edge.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This is only available when the analog trigger mode is set to edge.\n\nRising causes an analog trigger event when the analog signal trends from below the analog signal level to above the level.\n\nFalling causes an analog trigger event when the signal trends from above to below the level.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.analogtrigger.edge.slope',
    },
    {
        detail: 'This attribute configures the type of signal behavior that can generate an analog trigger event.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When edge is selected, the analog trigger occurs when the signal crosses a certain level. You also specify if the analog trigger occurs on the rising or falling edge of the signal.\n\nWhen window is selected, the analog trigger occurs when the signal enters or exits the window defined by the low and high signal levels.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.analogtrigger.mode',
    },
    {
        detail: 'This attribute defines if the analog trigger occurs when the signal enters or leaves the defined upper and lower analog signal level boundaries.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This is only available when the analog trigger mode is set to window.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.analogtrigger.window.direction',
    },
    {
        detail: 'This attribute defines the upper boundary of the analog trigger window.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available when the analog trigger mode is set to window.\n\nThe high level must be greater than the low level.\n\nTo use the analog trigger with the measure functions, a range must be set (you cannot use autorange) and autozero must be disabled.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.analogtrigger.window.levelhigh',
    },
    {
        detail: 'This attribute defines the lower boundary of the analog trigger window.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available when the analog trigger mode is set to window.\n\nThe high level must be greater than the low level.\n\nTo use the analog trigger with the measure functions, a range must be set (you cannot use autorange) and autozero must be disabled.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.analogtrigger.window.levellow',
    },
    {
        detail: 'This function determines the aperture setting for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The aperture sets the amount of time the ADC takes when making a measurement, which is the integration period for the selected measurement function. The integration period is specified in seconds. In general, a short integration period provides a fast reading rate, while a long integration period provides better accuracy. The selected integration period is a compromise between speed and accuracy.\n\nDuring the integration period, if an external trigger with a count of 1 is sent, the trigger is ignored. If the count is set to more than 1, the first reading is initialized by this trigger. Subsequent readings occur as rapidly as the instrument can make them. If a trigger occurs during the group measurement, the trigger is latched and another group of measurements with the same count will be triggered after the current group completes.\n\nYou can also set the integration rate by setting the number of power-line cycles (NPLCs). Changing the NPLC value changes the aperture time and changing the aperture time changes the NPLC value.\n\nTo calculate the aperture based on the NPLC value, use the following formula.\n\nwhere:\n\nIf you set the NPLCs, the aperture setting changes to reflect that value. If you set the aperture, the NPLC setting is changed.\n\nFor the AC voltage and AC current functions, if the detector bandwidth setting is set to 3Hz or 30Hz, the aperture value is fixed and cannot be changed.\n\nIf line synchronization is enabled, the integration period does not start until the beginning of the next power-line cycle. For example, if a reading is triggered at the positive peak of a power-line cycle, the integration period does not start until that power-line cycle is completed. The integration period starts when the positive-going sine wave crosses 0volts.\n\nTo see the line frequency that is auto-detected by the instrument, use the localnode.linefreq command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.aperture',
    },
    {
        detail: 'This attribute enables or disables the automatic delay that occurs before each measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this is enabled, a delay is added before each measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.autodelay',
    },
    {
        detail: 'This attribute determines if the measurement range is set manually or automatically for the selected measure function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command determines how the range is selected.\n\nWhen this command is set to off, you must set the range. If you do not set the range, the instrument remains at the range that was last selected by autorange.\n\nWhen this command is set to on, the instrument automatically goes to the most sensitive range to perform the measurement.\n\nIf a range is manually selected through the front panel or a remote command, this command is automatically set to off.\n\nAuto range selects the best range in which to measure the signal that is applied to the input terminals of the instrument. When auto range is enabled, the range increases at 120percent of range. The range decreases occur when the reading is <10percent of nominal range. For example, if you are on the 1V range and auto range is enabled, the instrument auto ranges up to the 10V range when the measurement exceeds 1.2V. It auto ranges down to the 100mV range when the measurement falls below 1V.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.autorange',
    },
    {
        detail: 'This attribute enables or disables automatic updates to the internal reference measurements (autozero) of the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To ensure the accuracy of readings, the instrument must periodically get new measurements of its internal ground and voltage reference. The time interval between updates to these reference measurements is determined by the integration aperture that is being used for measurements. The DMM6500 uses separate reference and zero measurements for each aperture.\n\nBy default, the instrument automatically checks these reference measurements whenever a signal measurement is made.\n\nThe time to make the reference measurements is in addition to the normal measurement time. If timing is critical, you can disable autozero to avoid this time penalty.\n\nWhen autozero is set to off, the instrument may gradually drift out of specification. To minimize the drift, you can send the once command to make a reference and zero measurement immediately before a test sequence.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.autozero.enable',
    },
    {
        detail: 'This function causes the instrument to refresh the reference and zero measurements once.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command forces a refresh of the reference and zero measurements that are used for the present aperture setting for the selected function.\n\nWhen autozero is set to off, the instrument may gradually drift out of specification. To minimize the drift, you can send the once command to make a reference and zero measurement immediately before a test sequence.\n\nIf the NPLC setting is less than 0.2PLC, sending autozero once can result in delay of more than a second.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.autozero.once',
    },
    {
        detail: 'This attribute selects the amount of current the instrument sources when it makes measurements.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Selects the amount of current that is sourced by the instrument to make measurements.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.bias.level',
    },
    {
        detail: 'This function returns the name of one measure configuration list that is stored on the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command to retrieve the names of measure configuration lists that are stored in the instrument.\n\nThis command returns one name each time you send it. This command returns nil to indicate that there are no more names to return. If the command returns nil the first time you send it, no measure configuration lists have been created for the instrument.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.catalog',
    },
    {
        detail: 'This function creates an empty measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command creates an empty configuration list. To add configuration indexes to this list, you need to use the store command.\n\nConfiguration lists are not saved when the instrument is turned off. To save a configuration list, create a configuration script to save instrument settings, including any defined configuration lists.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.create',
    },
    {
        detail: 'This function deletes a measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Deletes a configuration list. If the index is not specified, the entire configuration list is deleted. If the index is specified, only the specified configuration index in the list is deleted.\n\nWhen an index is deleted from a configuration list, the index numbers of the following indexes are shifted up by one. For example, if you have a configuration list with 10 indexes and you delete index 3, the index that was numbered 4 becomes index 3, and the all the following indexes are renumbered in sequence to index 9. Because of this, if you want to delete several nonconsecutive indexes in a configuration list, it is best to delete the higher numbered index first, then the next lower index, and so on. This also means that if you want to delete all the indexes in a configuration list, you must delete index 1 repeatedly until all indexes have been removed.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.delete',
    },
    {
        detail: 'This function returns a list of TSP commands and parameter settings that are stored in the specified configuration index.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command recalls data for one configuration index.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.query',
    },
    {
        detail: 'This function recalls a configuration index in a measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to recall the settings stored in a specific configuration index in a measure configuration list. If you do not specify an index when you send the command, it recalls the settings stored in the first configuration index in the specified measure configuration list.\n\nIf you recall an invalid index (for example, calling index 3 when there are only two indexes in the configuration list) or try to recall an index from an empty configuration list, event code 2790, "Configuration list, error, does not exist" is displayed.\n\nEach index contains the settings for the selected function of that index. Settings for other functions are not affected when the configuration list index is recalled. A single index stores the settings associated with a single measure or digitize function.\n\nThis command recalls data for one configuration index.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.recall',
    },
    {
        detail: 'This function returns the size (number of configuration indexes) of a measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.size',
    },
    {
        detail: 'This function stores the active measure or digitize settings into the named configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to store the active measure or digitize settings to a configuration index in a configuration list. If the index parameter is not provided, the new settings are appended to the end of the list. The index only stores the active settings for a single active measure or digitize function.\n\nA measure configuration list can store measure or digitize settings, but not at the same time. If the active function is a digitize function, digitize settings are saved. When the index is queried, digitize settings and their values are listed, but measure settings are listed as not being used. Similarly, if the active function is a measure function, measure settings are saved. When the index is queried, the measure settings and their values are listed, but the digitize settings are listed as not used.\n\nConfiguration lists are not saved when the instrument is turned off or reset. To save a configuration list, create a configuration script to save instrument settings, including any defined configuration lists.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.configlist.store',
    },
    {
        detail: 'This attribute sets the number of measurements to make when a measurement is requested.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the number of measurements that are made when a measurement is requested. This command does not affect the trigger model.\n\nThis command sets the count for all measure functions.\n\nIf you set the count to a value that is larger than the capacity of the reading buffer and the buffer fill mode is set to continuous, the buffer wraps until the number of readings specified have occurred. The earliest readings in the count are overwritten. If the buffer is set to fill once, readings stop when the buffer is filled, even if the count is not complete.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.count',
    },
    {
        detail: 'This attribute defines the decibel-milliwatts (dBm) reference.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This value only applied when the unit setting for the function is set to dBm.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.dbmreference',
    },
    {
        detail: 'This attribute defines the decibel (dB) reference setting for the DMM in volts.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This value only applies when the unit setting for the function is set to decibels.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.dbreference',
    },
    {
        detail: 'This attribute selects the detector bandwidth for AC current and AC voltage measurements.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can set the detector bandwidth to improve measurement accuracy. Select the bandwidth that contains the lowest frequency component of the input signal. For example, if the lowest frequency component of your input signal is 40Hz, use a bandwidth setting of 30Hz.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.detectorbandwidth',
    },
    {
        detail: 'This attribute determines the number of digits that are displayed for measurements on the front panel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command affects how the reading for a measurement is displayed on the front panel of the instrument. It does not affect the number of digits returned in a remote command reading. It also does not affect the accuracy or speed of measurements.\n\nThe display digits setting is saved with the function setting, so if you use another function, then return to the function for which you set display digits, the display digits setting you set previously is retained.\n\nThe change in digits occurs the next time a measurement is made.\n\nTo change the number of digits returned in a remote command reading, use format.asciiprecision.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.displaydigits',
    },
    {
        detail: 'This attribute sets the number of measurements that are averaged when filtering is enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The filter count is the number of readings that are acquired and stored in the filter stack for the averaging calculation. When the filter count is larger, more filtering is done and the data is less noisy.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.filter.count',
    },
    {
        detail: 'This attribute enables or disables the averaging filter for measurements of the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command enables or disables the averaging filter. When this is enabled, the reading returned by the instrument is an averaged value, taken from multiple measurements. The settings of the filter count and filter type for the selected measure function determines how the reading is averaged.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.filter.enable',
    },
    {
        detail: 'This attribute defines the type of averaging filter that is used for the selected measure function when the measurement filter is enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the repeating average filter is selected, a set of measurements are made. These measurements are stored in a measurement stack and averaged together to produce the averaged sample. Once the averaged sample is produced, the stack is flushed and the next set of data is used to produce the next averaged sample. This type of filter is the slowest, since the stack must be completely filled before an averaged sample can be produced.\n\nThe repeating average filter produces slower results, but produces more stable results than the moving average filter. For either method, the greater the number of measurements that are averaged, the slower the averaged sample rate, but the lower the noise error. Trade-offs between speed and noise are normally required to tailor the instrumentation to your measurement application.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.filter.type',
    },
    {
        detail: 'This attribute sets the window for the averaging filter that is used for measurements for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command selects the window size for the averaging filter.\n\nThe noise window allows a faster response time to large signal step changes. A reading that falls outside the plus or minus noise window fills the filter stack immediately.\n\nIf the noise does not exceed the selected percentage of range, the reading is based on an average of reading conversions —  the normal averaging filter. If the noise does exceed the selected percentage, the reading is a single reading conversion, and new averaging starts from this point.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.filter.window',
    },
    {
        detail: 'This attribute defines the type of 4-wire RTD that is being used',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The transducer type must be set to temperature and the transducer must be set to 4-wire RTD before you can set the RTD type.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.fourrtd',
    },
    {
        detail: 'This attribute selects the active measure function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Set this command to the type of measurement you want to make.\n\nReading this command returns the measure function that is presently active.\n\nWhen you select a function, settings for other commands that are related to the function become active. For example, assume that:\n\nIf you return to the current function, the math function returns to reciprocal. If you then switch from the current function to the voltage function, the math function returns to percent. All attributes that begin with dmm.measure. are saved with the active measure function unless otherwise indicated in the command description.\n\nIf a digitize measurement function is active, calling this command returns dmm.FUNC_NONE. The no function setting is automatically made if you select a function with dmm.digitize.func or through the options from the front-panel Digitize Functions tab.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.func',
    },
    {
        detail: 'This attribute determines when the 10MΩ input divider is enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Choosing automatic input impedance is a balance between achieving low DC voltage noise on the 100mV and 1V ranges and optimizing measurement noise due to charge injection. The DMM6500 is optimized for low noise and charge injection when the DUT has less than 100kΩ input resistance. When the DUT input impedance is more than 100kΩ, selecting an input impedance of 10MΩ optimizes the measurement for lowest noise on the 100mV and 1V ranges. You can achieve short-term low noise and low charge injection on the 100mV and 1V ranges with autozero off. For the 10V to 1000V ranges, both input impedance settings achieve low charge injection.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.inputimpedance',
    },
    {
        detail: 'This attribute determines if the instrument beeper sounds when a limit test passes or fails.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The tone and length of beeper cannot be adjusted.\n\nSee dmm.measure.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.limit[Y].audible',
    },
    {
        detail: 'This attribute indicates if the test result for limit Y should be cleared automatically or not.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When auto clear is set to on, limit conditions are cleared automatically after each measurement. If you are making a series of measurements, the instrument shows the limit test result of the last measurement for the pass or fail indication for the limit.\n\nIf you want to know if any of a series of measurements failed the limit, set the auto clear setting to off. When this is set to off, a failed indication is not cleared automatically. It remains set until it is cleared with the clear command.\n\nThe auto clear setting affects both the high and low limits.\n\nSee dmm.measure.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.limit[Y].autoclear',
    },
    {
        detail: 'This function clears the results of the limit test defined by Y.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to clear the test results of limit Y when the limit auto clear option is turned off. Both the high and low test results are cleared.\n\nTo avoid the need to manually clear the test results for a limit, turn the auto clear option on.\n\nSee dmm.measure.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.limit[Y].clear',
    },
    {
        detail: 'This attribute enables or disables a limit test on the measurement from the selected measure function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command enables or disables a limit test for the selected measurement function. When this attribute is enabled, the limit Y testing occurs on each measurement made by the instrument. Limit Y testing compares the measurements to the high-limit and low-limit values. If a measurement falls outside these limits, the test fails.\n\nSee dmm.measure.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.limit[Y].enable',
    },
    {
        detail: 'This attribute queries the results of a limit test.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command queries the result of a limit test for the selected measurement function.\n\nThe response message indicates if the limit test passed or how it failed (on the high or low limit).\n\nIf autoclear is set to off, reading the results of a limit test does not clear the fail indication of the test. To clear a failure, send the clear command. To automatically clear the results, set auto clear on.\n\nIf auto clear is set to on and you are making a series of measurements, the last measurement limit determines the fail indication for the limit. If auto clear is turned off, the results return a test fail if any of one of the readings failed.\n\nTo use this attribute, you must set the limit state to on.\n\nIf the readings are stored in a reading buffer, you can use the bufferVar.statuses command to see the results.\n\nSee dmm.measure.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dmm.measure.limit[Y].fail',
    },
    {
        detail: 'This attribute specifies the upper limit for a limit test.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the high limit for the limit Y test for the selected measurement function. When limit Y testing is enabled, the instrument generates a fail indication when the measurement value is more than this value.\n\nDefault is 0.8 for limit 1 when the diode function is selected; 10 when the continuity function is selected. The default for limit 2 for the diode and continuity functions is 1.\n\nSee dmm.measure.limit[Y].low.value for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.limit[Y].high.value',
    },
    {
        detail: 'This attribute specifies the lower limit for limit tests.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the lower limit for the limit Y test for the selected measure function. When limit Y testing is enabled, this causes a fail indication to occur when the measurement value is less than this value.\n\nDefault is 0.3 for limit 1 when the diode function is selected. The default for limit 2 for the diode function is –1.\n\nThis example enables limits 1 and 2 for voltage measurements. Limit 1 is checking for readings to be between 3 and 5 V, while limit2 is checking for the readings to be between 1 and 7 V. The auto clear feature is disabled, so if any reading is outside these limits, the corresponding fail is 1. Therefore, if any one of the fails is 1, analyze the reading buffer data to determine which reading failed the limits.\n\nThis example enables limits 1 and 2 for voltage measurements on channels 1 and 2 of slot 1. Limit 1 is checking for readings to be between 3 and 5 V, while limit2 is checking for the readings to be between 1 and 7 V. The auto clear feature is disabled, so if any reading is outside these limits, the corresponding fail is 1. Therefore, if any one of the fails is 1, analyze the reading buffer data to find out which reading failed the limits.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.limit[Y].low.value',
    },
    {
        detail: 'This attribute determines if line synchronization is used during the measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When line synchronization is enabled, measurements are initiated at the first positive-going zero crossing of the power line cycle after the trigger.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.linesync',
    },
    {
        detail: 'This attribute enables or disables math operations on measurements for the selected measurement function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this command is set to on, the math operation specified by the math format command is performed before completing a measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.math.enable',
    },
    {
        detail: 'This attribute specifies which math operation is performed on measurements when math operations are enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This specifies which math operation is performed on measurements for the selected measurement function.\n\nYou can choose one of the following math operations:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.math.format',
    },
    {
        detail: 'This attribute specifies the offset, b, for the y = mx + b operation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies the offset (b) for an mx + b operation.\n\nThe mx + b math operation lets you manipulate normal display readings (x) mathematically based on the calculation:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.math.mxb.bfactor',
    },
    {
        detail: 'This attribute specifies the scale factor, m, for the y = mx + b math operation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the scale factor (m) for an mx + b operation for the selected measurement function.\n\nThe mx + b math operation lets you manipulate normal display readings (x) mathematically according to the following calculation:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.math.mxb.mfactor',
    },
    {
        detail: 'This attribute specifies the reference constant that is used when math operations are set to percent.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The percent math function displays measurements as percent deviation from a specified reference constant. The percent calculation is:\n\n\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.math.percent',
    },
    {
        detail: 'This command sets the time that the input signal is measured for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the amount of time that the input signal is measured.\n\nThe amount of time is specified as the number of power line cycles (NPLCs). Each PLC for 60Hz is 16.67ms (1/60) and each PLC for 50Hz or 400Hz is 20ms (1/50). For 60Hz, if you set the NPLC to 0.1, the measure time is 1.667 ms.\n\nThe shortest amount of time results in the fastest reading rate, but increases the reading noise and decreases the number of usable digits.\n\nThe longest amount of time provides the lowest reading noise and more usable digits, but has the slowest reading rate.\n\nSettings between the fastest and slowest number of PLCs are a compromise between speed and noise.\n\nIf you change the PLCs, you may want to adjust the displayed digits to reflect the change in usable digits.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.nplc',
    },
    {
        detail: 'This attribute determines if offset compensation is used.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.offsetcompensation.enable',
    },
    {
        detail: 'This attribute determines if the detection of open leads is enabled or disabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'For temperature measurements, this is only available when the transducer is set to a thermocouple or one of the RTDs.\n\nLong lengths of thermocouple wire can have a large amount of capacitance, which is seen at the input of the DMM. If an intermittent open occurs in the thermocouple circuit, the capacitance can cause an erroneous on-scale reading. The open thermocouple detection circuit, when enabled, applies a 100µA pulse of current to the thermocouple before the start of each temperature measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.opendetector',
    },
    {
        detail: 'This attribute determines the positive full-scale measure range.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can assign any real number using this command. The instrument selects the closest fixed range that is large enough to measure the entered number. For example, for current measurements, if you expect a reading of approximately 9mA, set the range to 9 mA to select the 10mA range. When you read this setting, you see the positive full-scale value of the measurement range that the instrument is presently using.\n\nThis command is primarily intended to eliminate the time that is required by the instrument to automatically search for a range.\n\nWhen a range is fixed, any signal greater than the entered range generates an overrange condition. When an overrange condition occurs, the front panel displays "Overflow" and the remote interface returns 9.9e+37.\n\nThe following table lists the ranges for each function.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.range',
    },
    {
        detail: 'This function makes measurements, places them in a reading buffer, and returns the last reading.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command initiates measurements using the present function setting, stores the readings in a reading buffer, and returns the last reading.\n\nThe dmm.measure.count attribute determines how many measurements are made.\n\nWhen you use a reading buffer with a command or action that makes multiple readings, all readings are available in the reading buffer. However, only the last reading is returned as a reading with the command.\n\nIf you define a specific reading buffer, the reading buffer must exist before you make the measurement.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.read',
    },
    {
        detail: 'This function initiates measurements and returns the last actual measurement and time information in UTC format without using the trigger model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command initiates measurements using the present function setting, stores the readings in a reading buffer, and returns the last reading.\n\nThe dmm.measure.count attribute determines how many measurements are performed.\n\nWhen you use a reading buffer with a command or action that makes multiple readings, all readings are available in the reading buffer. However, only the last reading is returned as a reading with the command.\n\nIf you define a specific reading buffer, the reading buffer must exist before you make the measurement.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.readwithtime',
    },
    {
        detail: 'This attribute defines the type of the thermocouple reference junction.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Only available when the temperature function is selected and the transducer type is set to thermocouple.\n\nWhen you are making rear terminal measurements, you can select the internal or external option. When the internal option is selected, the DMM6500 periodically updates the temperature. When the external option is selected, the temperature is updated when the external reference function channel is scanned.\n\nWhen you are making front terminal measurements, the only option is simulated. You can set the simulated reference temperature with the command dmm.measure.simreftemperature.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.refjunction',
    },
    {
        detail: 'This function acquires a measurement and stores it as the relative offset value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command triggers the instrument to make a new measurement for the selected function. This measurement is then stored as the new relative offset level.\n\nWhen you send this command, the instrument does not apply any math, limit test, or filter settings to the measurement, even if they are set. It is a measurement that is made as if these settings are disabled.\n\nIf an error event occurs during the measurement, nil is returned and the relative offset level remains at the last valid setting.\n\nYou must change to the function for which you want to acquire a value before sending this command.\n\nThe instrument must have relative offset enabled to use the acquired relative offset value.\n\nAfter executing this command, you can use the dmm.measure.rel.level attribute to see the last relative level value that was acquired or that was set.'
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.measure.rel.acquire',
    },
    {
        detail: 'This attribute enables or disables the application of a relative offset value to the measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When relative measurements are enabled, all subsequent measured readings are offset by the relative offset value. You can enter a relative offset value or have the instrument acquire a relative offset value.\n\nEach returned measured relative reading is the result of the following calculation:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rel.enable',
    },
    {
        detail: 'This attribute contains the relative offset value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command specifies the relative offset value that can be applied to new measurements. When relative offset is enabled, all subsequent measured readings are offset by the value that is set for this command.\n\nYou can set this value, or have the instrument acquire a value. If the instrument acquires the value, read this setting to return the value that was measured internally.\n\nThe ranges for the relative offset values for all functions are listed in the following table.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rel.level',
    },
    {
        detail: 'This attribute determines if relative offset is applied to the measurements before calculating the DC voltage ratio value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command determines if relative offset is applied to the voltage measurements before the ratio calculation or if the relative offset is applied to the final calculated value.\n\nWhen the parts methods is selected, the individual readings each have the relative offset value applied before being used to calculate the measurement reading. When parts is selected, the relative offset value is working with smaller ranges, so an error may occur. Reduce the relative offset value if you receive an error. A relative offset is applied to the sense value and then to the input value.\n\nWhen the results method is selected, the individual readings do not have the relative offset value applied. The relative offset value is applied to the final calculation.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rel.method',
    },
    {
        detail: 'This attribute contains the alpha value of a user-defined RTD.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute is only valid when:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rtdalpha',
    },
    {
        detail: 'This attribute contains the beta value of a user-defined RTD.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute is only valid when:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rtdbeta',
    },
    {
        detail: 'This attribute contains the delta value of a user-defined RTD.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute is only valid when:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rtddelta',
    },
    {
        detail: 'This attribute contains the zero value of a user-defined RTD.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute is only valid when:'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.rtdzero',
    },
    {
        detail: 'This attribute displays the positive full-scale range that is being used for the sense measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Displays the full-scale input that is used for the reference measurement in the denominator of the ratio.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dmm.measure.sense.range',
    },
    {
        detail: 'This attribute sets the simulated reference temperature of the thermocouple reference junction.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute applies to the temperature function when the transducer type is set to thermocouple and the reference junction is set to simulated. It allows you to set the simulated reference temperature value.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.simreftemperature',
    },
    {
        detail: 'This attribute describes the type of thermistor.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is only applicable when the transducer type is set to thermistor.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.thermistor',
    },
    {
        detail: 'This attribute indicates the thermocouple type.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command is only applicable when the transducer type is set to thermocouple.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.thermocouple',
    },
    {
        detail: 'This attribute defines the type of three-wire RTD that is being used.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The transducer type must be set to temperature and the transducer must be set to 3-wire RTD before you can set the RTD type.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.threertd',
    },
    {
        detail: 'This attribute determines if the threshold range is set manually or automatically.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command determines how the range is selected.\n\nWhen this command is set to off, you must set the range. If you do not set the range, the instrument remains at the range that was last selected by autorange.\n\nWhen this command is set to on, the instrument uses the signal to determine the most sensitive range on which to perform the measurement. The instrument sets the range when a measurement is requested. To set the range, the instrument makes a measurement to determine the range before making the final measurement, which can result in slower reading times. Turn autorange off and set a specific range to increase measure time.\n\nIf a range is manually selected through the front panel or a remote command, this command is automatically set to off.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.threshold.autorange',
    },
    {
        detail: 'This attribute indicates the expected input level of the voltage signal.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The range setting conditions the signal. The instrument automatically selects the most sensitive threshold range for the value you enter. For example, if you specify the expected input voltage to be 90mV, the instrument automatically selects the100 mV threshold range.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.threshold.range',
    },
    {
        detail: 'This attribute sets the transducer type for the temperature measurement function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The transducer type determines the type of temperature measurement that is made. Each transducer type has related settings that must also be set. For example, thermocouple measurements are only made if the type is set is set to thermocouple. You also need to set the thermocouple type when setting up a thermocouple. For the RTD transducer types, you also set the RTD type.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.transducer',
    },
    {
        detail: 'This attribute defines the type of 2-wire RTD that is being used.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The transducer type must be set to temperature and the transducer must be set to 2-wire RTD before you can set the RTD type.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.twortd',
    },
    {
        detail: 'This attribute sets the units of measurement that are displayed on the front panel of the instrument and stored in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The change in measurement units is displayed when the next measurement is made. You can only change the units for the listed functions.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.unit',
    },
    {
        detail: 'This attribute sets a user-defined delay that you can use in the trigger model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To use this command in a trigger model, assign the delay to the dynamic delay block.\n\nThe delay is specific to the selected function.'
        },
        kind: CompletionItemKind.Property,
        label: 'dmm.measure.userdelay[N]',
    },
    {
        detail: 'This function resets commands that begin with dmm. to their default settings.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'dmm.reset',
    },
    {
        detail: 'This attribute describes which set of input and output terminals the instrument is using.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You must use the front-panel TERMINALS button to change which set of terminals the instrument reads.'
        },
        kind: CompletionItemKind.Constant,
        label: 'dmm.terminals',
    },
]

const dmmSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'dmm.digitize.limit[Y].clear(Y)',
        undefined,
        ParameterInformation.create(
            'Y',
            'Limit number: 1 or 2.'
        ),
    ),
    SignatureInformation.create(
        'dmm.digitize.read(reading, bufferName)',
        undefined,
        ParameterInformation.create(
            'reading',
            'The last reading of the measurement process.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer; if nothing is specified, the reading is stored in defbuffer1.'
        ),
    ),
    SignatureInformation.create(
        'dmm.digitize.readwithtime(reading, seconds, bufferName)',
        undefined,
        ParameterInformation.create(
            'reading',
            'The last reading of the measurement process.'
        ),
        ParameterInformation.create(
            'seconds',
            'Seconds in UTC format.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.configlist.create(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.configlist.delete(listName, index)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.configlist.query(listName, index, fieldSeparator)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list.'
        ),
        ParameterInformation.create(
            'fieldSeparator',
            'String that represents the separator for the data; use one of the following:\nComma (default): ,\nSemicolon: ;\nNew line: \n.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.configlist.recall(listName, index)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the measure configuration list.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.configlist.size(indexCount, listName)',
        undefined,
        ParameterInformation.create(
            'indexCount',
            'A number that represents the total count of indexes stored in the specified measure configuration list.'
        ),
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.configlist.store(listName, index)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.limit[Y].clear(Y, channelList)',
        undefined,
        ParameterInformation.create(
            'Y',
            'Limit number: 1 or 2.'
        ),
        ParameterInformation.create(
            'channelList',
            'The channels to set, using standard channel naming.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.read(reading, bufferName)',
        undefined,
        ParameterInformation.create(
            'reading',
            'The last reading of the measurement process.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer;  if no buffer is defined, it defaults to defbuffer1.'
        ),
    ),
    SignatureInformation.create(
        'dmm.measure.readwithtime(reading, seconds, bufferName)',
        undefined,
        ParameterInformation.create(
            'reading',
            'The last reading of the measurement process.'
        ),
        ParameterInformation.create(
            'seconds',
            'Seconds in UTC format.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user-defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.'
        ),
    ),
]

export async function getDmmCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(dmmCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getDmmSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(dmmSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
