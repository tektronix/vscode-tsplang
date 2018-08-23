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
/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const smuCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute indicates that the interlock has been tripped.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command gives you the status of the interlock. When the safety interlock signal is asserted, all voltage ranges of the instrument are available. However, when the safety interlock signal is not asserted, the 100V range is disabled, limiting the nominal output to less than ±42V.\n\nWhen the interlock is not asserted:'
        },
        kind: CompletionItemKind.Constant,
        label: 'smu.interlock.tripped',
    },
    {
        detail: 'This attribute determines if the measurement range is set manually or automatically for the selected measure function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command determines how the range is selected.\n\nWhen this command is set to off, you must set the range. If you do not set the range, the instrument remains at the range that was selected by autorange.\n\nWhen this command is set to on, the instrument automatically goes to the most sensitive range to perform the measurement.\n\nIf a range is manually selected through the front panel or a remote command, this command is automatically set to off.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.autorange',
    },
    {
        detail: 'When autorange is selected, this attribute represents the highest measurement range that is used when the instrument selects the measurement range automatically.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command can be written to and read for resistance measurements. For current and voltage measurements, it can only be read.\n\nFor current and voltage measurements, the upper limit is controlled by the current or voltage limit.\n\nFor resistance measurements, you can use this command when automatic range selection is enabled to put an upper bound on the range that is used for resistance measurements.\n\nThe upper limit must be more than the lower limit.\n\nIf the lower limit is equal to the upper limit, automatic range setting is effectively disabled.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.autorangehigh',
    },
    {
        detail: 'This attribute selects the lower limit for measurements of the selected function when the range is selected automatically.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command when automatic range selection is enabled. It prevents the instrument from selecting a range that is below this limit. Because the lowest ranges generally require longer settling times, setting the low limit that is appropriate for your application but above the lowest possible range can make measurements require less settling time.\n\nThe lower limit must be less than the upper limit.\n\nThough you can send any value when you send this command, the instrument selects the next highest range value. For example, if you send 15 for the lowest voltage range, the instrument will be set to the 20V range as the low limit.\n\nIf the lower limit is equal to the upper limit, automatic range setting is effectively disabled.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.autorangelow',
    },
    {
        detail: 'This attribute enables or disables automatic updates to the internal reference measurements (autozero) of the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To ensure the accuracy of readings, the instrument must periodically get new measurements of its internal ground and voltage reference. The time interval between updates to these reference measurements is determined by the integration aperture that is being used for measurements. The Model 2460 uses separate reference and zero measurements for each aperture.\n\nBy default, the instrument automatically checks these reference measurements whenever a signal measurement is made.\n\nThe time to make the reference measurements is in addition to the normal measurement time. If timing is critical, such as in sweeps, you can disable autozero to avoid this time penalty.\n\nWhen autozero is set to off, the instrument may gradually drift out of specification. To minimize the drift, you can send the once command to make a reference and zero measurement immediately before a test sequence.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.autozero.enable',
    },
    {
        detail: 'This function causes the instrument to refresh the reference and zero measurements once.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command forces a refresh of the reference and zero measurements that are used for the present aperture setting for the selected function.\n\nWhen autozero is set to off, the instrument may gradually drift out of specification. To minimize the drift, you can send the once command to make a reference and zero measurement immediately before a test sequence.\n\nIf the NPLC setting is less than 0.2PLC, sending autozero once can result in delay of more than a second.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.autozero.once',
    },
    {
        detail: 'This function returns the name of one measure configuration list that is stored on the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command to retrieve the names of measure configuration lists that are stored in the instrument.\n\nThis command returns one name each time you send it. This command returns nil to indicate that there are no more names to return. If the command returns nil the first time you send it, no measure configuration lists have been created for the instrument.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.catalog',
    },
    {
        detail: 'This function creates an empty measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command creates an empty configuration list. To add configuration indexes to this list, you need to use the store command.\n\nConfiguration lists are not saved when the instrument is turned off. To save a configuration list, create a configuration script to save instrument settings, including any defined configuration lists.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.create',
    },
    {
        detail: 'This function deletes a measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Deletes a configuration list. If the index is not specified, the entire configuration list is deleted. If the index is specified, only the specified configuration index in the list is deleted.\n\nWhen an index is deleted from a configuration list, the index numbers of the following indexes are shifted up by one. For example, if you have a configuration list with 10 indexes and you delete index 3, the index that was numbered 4 becomes index 3, and the all the following indexes are renumbered in sequence to index 9. Because of this, if you want to delete several nonconsecutive indexes in a configuration list, it is best to delete the higher numbered index first, then the next lower index, and so on. This also means that if you want to delete all the indexes in a configuration list, you must delete index 1 repeatedly until all indexes have been removed.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.delete',
    },
    {
        detail: 'This function returns a list of TSP commands and parameter settings that are stored in the specified configuration index.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command returns data for one configuration index.\n\nFor additional information about the information this command returns, see Instrument settings stored in a measure configuration list.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.query',
    },
    {
        detail: 'This function recalls a configuration index in a measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to recall the settings stored in a specific configuration index in a specific configuration list. If you do not specify an index when you send the command, it recalls the settings stored in the first configuration index in the specified configuration list.\n\nIf you recall an invalid index (for example, calling index 3 when there are only two indexes in the configuration list) or try to recall an index from an empty configuration list, event code 2790, "Configuration list, error, does not exist" is displayed.\n\nEach index contains the settings for the selected function. Settings for other functions are not affected when the configuration list index is recalled.\n\n Note: Recall source configuration lists before measure configuration lists. This order ensures that dependencies between source and measure settings will be properly handled.\n\nThis command returns data for one configuration index.\n\nFor additional information about the information this command returns, see Instrument settings stored in a measure configuration list.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.recall',
    },
    {
        detail: 'This function returns the size (number of configuration indexes) of a measure configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.size',
    },
    {
        detail: 'This function stores the active measure settings into the named configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to store the active measure settings to a configuration index in a configuration list. If the index parameter is not provided, the configuration index will append to the end of the list.\n\nConfiguration lists are not saved when the instrument is turned off. To save a configuration list, create a configuration script to save instrument settings, including any defined configuration lists.\n\nRefer to Instrument settings stored in a measure configuration list for a complete list of measure settings that the instrument stores.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.configlist.store',
    },
    {
        detail: 'This attribute sets the number of measurements to make when a measurement is requested.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the number of measurements that are made when a measurement is requested. This command does not affect the trigger model.\n\nThis command sets the count for all measure functions.\n\nIf you set the count to a value that is larger than the capacity of the reading buffer and the buffer fill  mode is set to continuous, the buffer wraps until the number of readings specified have occurred. The earliest readings in the count are overwritten. If the buffer is set to fill once, readings stop when the buffer is filled, even if the count is not complete.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.count',
    },
    {
        detail: 'This attribute determines the number of digits that are displayed for measurements on the front panel for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command affects how the reading for a measurement is displayed on the front panel of the instrument. It does not affect the number of digits returned in a remote command reading. It also does not affect the accuracy or speed of measurements.\n\nThe display digits setting is saved with the function setting, so if you use another function, then return to the function for which you set display digits, the display digits setting you set previously is retained.\n\nThe change in digits occurs the next time a measurement is made.\n\nTo change the number of digits returned in a remote command reading, use format.asciiprecision.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.displaydigits',
    },
    {
        detail: 'This attribute sets the number of measurements that are averaged when filtering is enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The filter count is the number of readings that are acquired and stored in the filter stack for the averaging calculation. When the filter count is larger, more filtering is done and the data is less noisy.\n\nThis command is set for the selected function.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.filter.count',
    },
    {
        detail: 'This attribute enables or disables the averaging filter for the selected measurement function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command enables or disables the averaging filter. When this is enabled, the reading returned by the instrument is an averaged value, taken from multiple measurements. The settings of the filter count and filter type for the selected measure function determines how the reading is averaged.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.filter.enable',
    },
    {
        detail: 'This attribute sets the type of averaging filter that is used for the selected measure function when the measurement filter is enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can select one of two types of averaging filters: repeating average or moving average.\n\nWhen the repeating average filter is selected, a set of measurements are made. These measurements are stored in a measurement stack and averaged together to produce the averaged sample. Once the averaged sample is produced, the stack is flushed and the next set of data is used to produce the next averaged sample. This type of filter is the slowest, since the stack must be completely filled before an averaged sample can be produced.\n\nThe repeating average filter produces slower results, but produces more stable results than the moving average filter. For either method, the greater the number of measurements that are averaged, the slower the averaged sample rate, but the lower the noise error. Trade-offs between speed and noise are normally required to tailor the instrumentation to your measurement application.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.filter.type',
    },
    {
        detail: 'This attribute selects the active measure function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Set this command to the type of measurement you want to make.\n\nReading this command returns the measure function that is presently active.\n\nWhen you select a function, settings for other commands that are related to the function become active. For example, assume that:\n\nIf you return to the current function, the math function returns to reciprocal. If you then switch from the current function to the voltage function, the math function returns to percent. All attributes that begin with smu.measure. are saved with the active measure function unless otherwise indicated in the command description.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.func',
    },
    {
        detail: 'This attribute determines if the instrument beeper sounds when a limit test passes or fails, or disables the beeper.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The tone and length of beeper cannot be adjusted.\n\nSee smu.measure.limit[Y].fail for an example of how to use this command.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.limit[Y].audible',
    },
    {
        detail: 'This attribute indicates if the test result for limit Y should be cleared automatically or not.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When auto clear is set to on for a measure function, limit conditions are cleared automatically after each measurement. If you are making a series of measurements, the instrument shows the limit test result of the last measurement for the pass or fail indication for the limit.\n\nIf you want to know if any of a series of measurements failed the limit, set the auto clear setting to off. When this set to off, a failed indication is not cleared automatically. It remains set until it is cleared with the clear command.\n\nThe auto clear setting affects both the high and low limits.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.limit[Y].autoclear',
    },
    {
        detail: 'This function clears the results of the limit test defined by Y for the selected measurement function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to clear the test results of limit Y when the limit auto clear option is turned off. Both the high and low test results are cleared.\n\nTo avoid the need to manually clear the test results for a limit, turn the auto clear option on.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.limit[Y].clear',
    },
    {
        detail: 'This attribute enables or disables a limit test on the measurement from the selected measure function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command enables or disables a limit test for the selected measurement function. When this attribute is enabled, the limit Y testing occurs on each measurement made by the instrument. Limit Y testing compares the measurements to the high and low limit values. If a measurement falls outside these limits, the test fails.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.limit[Y].enable',
    },
    {
        detail: 'This attribute queries the results of a limit test.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command queries the result of a limit test for the selected measurement function.\n\nThe response message indicates if the limit test passed or how it failed (on the high or low limit).\n\nIf autoclear is set to off, reading the results of a limit test does not clear the fail indication of the test. To clear a failure, send the clear command. To automatically clear the results, set auto clear on.\n\nIf auto clear is set to on and you are making a series of measurements, the last measurement limit determines the fail indication for the limit. If auto clear is turned off, the results return a test fail if any of one of the readings failed.\n\nTo use this attribute, you must set the limit state to on.\n\nIf the readings are stored in a reading buffer, you can use the bufferVar.statuses command to see the results.\n\nThis example enables limits 1 and 2 for voltage, measurements. Limit 1 is checking for readings to be between 3 and 5 V, while limit2 is checking for the readings to be between 1 and 7 V. The auto clear feature is disabled, so if any reading is outside these limits, the corresponding fail is 1. Therefore, if any one of the fails is 1, analyze the reading buffer data to find out which reading failed the limits.'
        },
        kind: CompletionItemKind.Constant,
        label: 'smu.measure.limit[Y].fail',
    },
    {
        detail: 'This attribute specifies the upper limit for a limit test.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the high limit for the limit Y test for the selected measurement function. When limit Y testing is enabled, the instrument generates a fail indication when the measurement value is more than this value.\n\nSee the example in smu.measure.limit[Y].fail.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.limit[Y].high.value',
    },
    {
        detail: 'This attribute specifies the lower limit for limit tests.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the lower limit for the limit Y test for the selected measure function. When limit Y testing is enabled, this causes a fail indication to occur when the measurement value is less than this value.\n\nSee the example in smu.measure.limit[Y].fail.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.limit[Y].low.value',
    },
    {
        detail: 'This attribute enables or disables math operations on measurements for the selected measurement function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this command is set to on, the math operation specified by the math format command is performed before completing a measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.math.enable',
    },
    {
        detail: 'This attribute specifies which math operation is performed on measurements when math operations are enabled.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This specifies which math operation is performed on measurements for the selected measurement function.\n\nYou can choose one of the following math operations:\n\nMath calculations are applied to the input signal after relative offset and before limit tests.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.math.format',
    },
    {
        detail: 'This attribute specifies the offset, b, for the y = mx + b operation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies the offset (b) for an mx + b operation.\n\nThe mx + b math operation lets you manipulate normal display readings (x) mathematically according to the following calculation:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.math.mxb.bfactor',
    },
    {
        detail: 'This attribute specifies the scale factor, m, for the y = mx + b math operation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the scale factor (m) for an mx + b operation for the selected measurement function.\n\nThe mx + b math operation lets you manipulate normal display readings (x) mathematically according to the following calculation:\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.math.mxb.mfactor',
    },
    {
        detail: 'This attribute specifies the reference constant that is used when math operations are set to percent.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This is the constant that is used when the math operation is set to percent for the selected measurement function.\n\nThe percent math function displays measurements as percent deviation from a specified reference constant. The percent calculation is:\n\n\n\nWhere:'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.math.percent',
    },
    {
        detail: 'This command sets the time that the input signal is measured for the selected function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the amount of time that the input signal is measured.\n\nThe amount of time is specified as the number of power line cycles (NPLCs). Each PLC for 60Hz is 16.67ms (1/60) and each PLC for 50Hz is 20ms (1/50). For 60 Hz, if you set the NPLC to 0.1, the measure time is 1.667 ms.\n\nThis command is set for the measurement of specific functions (current, resistance, or voltage).\n\nThe shortest amount of time results in the fastest reading rate, but increases the reading noise and decreases the number of usable digits.\n\nThe longest amount of time provides the lowest reading noise and more usable digits, but has the slowest reading rate.\n\nSettings between the fastest and slowest number of PLCs are a compromise between speed and noise.\n\nIf you change the PLCs, you may want to adjust the displayed digits to reflect the change in usable digits.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.nplc',
    },
    {
        detail: 'This attribute enables or disables offset compensation.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This feature is only available for resistance measurements or when the smu.measure.unit is set to smu.UNIT_OHM.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.offsetcompensation',
    },
    {
        detail: 'This attribute determines the positive full‑scale measure range.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can assign any real number using this command. The instrument selects the closest fixed range that is large enough to measure the entered number. For example, for current measurements, if you expect a reading of approximately 9mA, set the range to 9 mA to select the 10mA range. When you read this setting, you see the positive full-scale value of the measurement range that the instrument is presently using.\n\nThis command is primarily intended to eliminate the time that is required by the instrument to automatically search for a range.\n\nWhen a range is fixed, any signal greater than the entered range generates an overrange condition. When an overrange condition occurs, the front panel displays "Overflow" and the remote interface returns 9.9e+37.\n\nIf the source function is the same as the measurement function (for example, sourcing voltage and measuring voltage), the measurement range is the same as the source range, regardless of measurement range setting. However, the setting for the measure range is retained, and when the source function is changed (for example, from sourcing voltage to sourcing current), the retained measurement range is used.\n\nIf you change the range while the output is off, the instrument does not update the hardware settings, but if you read the range setting, the return is the setting that will be used when the output is turned on. If you set a range while the output is on, the new setting takes effect immediately.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.range',
    },
    {
        detail: 'This function makes measurements, places them in a reading buffer, and returns the last reading.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function makes a measurement using the present function setting, stores the reading in a reading buffer, and returns the last reading.\n\nThe smu.measure.count attribute determines how many measurements are performed. You can also use the trigger model Simple Loop.\n\nWhen you use a reading buffer with a command or action that makes multiple readings, all readings are available in the reading buffer. However, only the last reading is returned as a reading with the command.\n\nIf you define a specific reading buffer, the reading buffer must exist before you make the measurement.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.read',
    },
    {
        detail: 'This function initiates measurements and returns the last actual measurement and time information in UTC format without using the trigger model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command initiates measurements using the present function setting, stores the readings in a reading buffer, and returns the last reading.\n\nThe smu.measure.count attribute determines how many measurements are performed.\n\nWhen you use a reading buffer with a command or action that makes multiple readings, all readings are available in the reading buffer. However, only the last reading is returned as a reading with the command.\n\nIf you define a specific reading buffer, the reading buffer must exist before you make the measurement.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.readwithtime',
    },
    {
        detail: 'This function acquires a measurement and stores it as the relative offset value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command triggers the instrument to make a new measurement for the selected function. This measurement is then stored as the new relative offset level.\n\nWhen you send this command, the instrument does not apply any math, limit test, or filter settings to the measurement, even if they are set. It is a measurement that is made as if these settings are disabled.\n\nIf an error event occurs during the measurement, nil is returned and the relative offset level remains at the last valid setting.\n\nYou must change to the function for which you want to acquire a value before sending this command.\n\nThe instrument must have relative offset enabled to use the acquired relative offset value.\n\nAfter executing this command, you can use the smu.measure.rel.level attribute to see the last relative level value that was acquired or that was set.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.measure.rel.acquire',
    },
    {
        detail: 'This attribute enables or disables the application of a relative offset value to the measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When relative measurements are enabled, all subsequent measured readings are offset by the relative offset value calculated when you acquire the relative offset value.\n\nEach returned measured relative reading is the result of the following calculation:'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.rel.enable',
    },
    {
        detail: 'This attribute contains the relative offset value.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command specifies the relative offset value that can be applied to new measurements. When relative offset is enabled, all subsequent measured readings are offset by the value that is set for this command.\n\nYou can set this value, or have the instrument acquire a value. If the instrument acquires the value, read this setting to return the value that was measured internally.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.rel.level',
    },
    {
        detail: 'This attribute selects local (2‑wire) or remote (4‑wire) sensing.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command determines if 2-wire (local) or 4‑wire (remote) sensing is used.\n\nWhen you use 4‑wire sensing, voltages are measured at the device under test (DUT). For the source voltage, if the sensed voltage is lower than the programmed amplitude, the voltage source increases the voltage until the sensed voltage is the same as the programmed amplitude. This compensates for IR drop in the output test leads.\n\nUsing 4‑wire sensing with voltage measurements eliminates any voltage drops that may be in the test leads between the Model 2460 and the DUT.\n\nWhen you are using 2-wire sensing, voltage is measured at the output connectors.\n\nWhen you are measuring resistance, you can enable 4-wire sensing to make 4-wire resistance measurements.\n\nWhen the output is off, 4‑wire sensing is disabled and the instrument uses 2‑wire sense, regardless of the sense setting. When the output is on, the selected sense setting is used.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.sense',
    },
    {
        detail: 'This attribute describes which set of input and output terminals the instrument is using.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command selects which set of input and output terminals the instrument uses. You can select front panel or rear panel terminals.\n\nIf the output is turned on when you change from one set of terminals to the other, the output is turned off.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.terminals',
    },
    {
        detail: 'This attribute sets the units of measurement that are displayed on the front panel of the instrument and stored in the reading buffer.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The change in measurement units is displayed when the next measurement occurs.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.unit',
    },
    {
        detail: 'This attribute sets a user‑defined delay that you can use in the trigger model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To use this command in a trigger model, assign the delay to the dynamic delay block.\n\nThe delay is specific to the selected function.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.measure.userdelay[N]',
    },
    {
        detail: 'This function turns off the output and resets the commands that begin with smu. to their default settings.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function turns off the output and resets the commands that begin with smu. to their default settings.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.reset',
    },
    {
        detail: 'This attribute enables or disables the automatic delay that occurs when the source is turned on.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When autodelay is turned on, the actual delay that is set depends on the range.\n\nWhen source autodelay is on, if you set a source delay, the autodelay is turned off.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.autodelay',
    },
    {
        detail: 'This attribute determines if the range is selected manually or automatically for the selected source function or voltage source.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command indicates the state of the range for the selected source. When automatic source range is disabled, the source range is set manually.\n\nWhen automatic source range is enabled, the instrument selects the range that is most appropriate for the value that is being sourced. The output level controls the range. If you read the range after the output level is set, the instrument returns the range that the instrument chose as appropriate for that source level.\n\nIf the source range is set to a specific value from the front panel or a remote command, the setting for automatic range is set to disabled.\n\nOnly available for the current and voltage functions.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.autorange',
    },
    {
        detail: 'This function returns the name of one source configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command to retrieve the names of source configuration lists that are stored in the instrument.\n\nThis command returns one name each time you send it. This command returns nil to indicate that there are no more names to return. If the command returns nil  the first time you send it, no source configuration lists have been created for the instrument.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.catalog',
    },
    {
        detail: 'This function creates an empty source configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command creates an empty configuration list. To add configuration indexes to this list, you need to use the store command.\n\nConfiguration lists are not saved when the instrument is turned off. If you want to save a configuration list through a power cycle, create a configuration script to save instrument settings, including any defined configuration lists.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.create',
    },
    {
        detail: 'This function deletes a source configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Deletes a configuration list. If the index is not specified, the entire configuration list is deleted. If the index is specified, only the specified configuration index in the list is deleted.\n\nWhen an index is deleted from a configuration list, the index numbers of the following indexes are shifted up by one. For example, if you have a configuration list with 10 indexes and you delete index 3, the index that was numbered 4 becomes index 3, and the all the following indexes are renumbered in sequence to index 9. Because of this, if you want to delete several nonconsecutive indexes in a configuration list, it is best to delete the higher numbered index first, then the next lower index, and so on. This also means that if you want to delete all the indexes in a configuration list, you must delete index 1 repeatedly until all indexes have been removed.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.delete',
    },
    {
        detail: 'This function returns a list of TSP commands and parameter settings that are stored in the specified configuration index.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command can only return data for one configuration index. To get data for additional configuration indexes, resend the command and specify different configuration indexes.\n\nRefer to Instrument settings stored in a source configuration list for a complete list of source settings that the instrument stores in a source configuration list.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.query',
    },
    {
        detail: 'This function recalls a specific configuration index in a specific source configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to recall the settings stored in a specific configuration index in a specific configuration list. If you do not specify an index when you send the command, it recalls the settings stored in the first configuration index in the specified configuration list.\n\nIf you recall an invalid index (for example, calling index 3 when there are only two indexes in the configuration list) or try to recall an index from an empty configuration list, event code 2790, "Configuration list, error, does not exist" is displayed.\n\nEach index contains the settings for the selected function. Settings for other functions are not affected when the configuration list index is recalled.\n\n Note: Recall source configuration lists before measure configuration lists. This order ensures that dependencies between source and measure settings will be properly handled.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.recall',
    },
    {
        detail: 'This function returns the number of configuration indexes in a source configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The size of the list is equal to the number of configuration indexes in a configuration list.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.size',
    },
    {
        detail: 'This function stores the active source settings into the named configuration list.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to store the active source settings to a configuration index in a configuration list. If the index is defined, the configuration list is stored in that index. If the index is not defined, the configuration index is appended to the end of the list. If a configuration index already exists for the specified index, the new configuration overwrites the existing configuration index.\n\nRefer to Instrument settings stored in a source configuration list for information about the settings this command stores.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.configlist.store',
    },
    {
        detail: 'This attribute contains the source delay.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets a delay for the selected source function. This delay is in addition to normal settling times.\n\nAfter the programmed source is turned on, this delay allows the source level to settle before a measurement is made.\n\nIf you set a specific source delay (smu.source.delay), source autodelay is turned off.\n\nWhen source autodelay is turned on, the manual source delay setting is overwritten with the autodelay setting.\n\nWhen either a source delay or autodelay is set, the delay is applied to the first source output and then only when the magnitude of the source changes.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.delay',
    },
    {
        detail: 'This attribute contains the source function, which can be voltage or current.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When you set this command, it configures the instrument as either a voltage source or a current source.\n\nWhen you read this command, it returns the output setting of the source.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.func',
    },
    {
        detail: 'This attribute enables or disables high-capacitance mode.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the instrument is measuring low current and is driving a capacitive load, you may see overshoot, ringing, and instability. You can enable the high capacitance mode to minimize these problems.\n\nThe settings for high‑capacitance mode apply when you operate the instrument using the 1µA and above current ranges. When operating using the 1 A range, the high-capacitance setting will not affect the instrument rise time or current measure settling time.\n\nUse this command with limited autorange (low) with the low range set to 1 µA.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.highc',
    },
    {
        detail: 'This attribute immediately selects a fixed amplitude for the selected source function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the output level of the voltage or current source. If the output is on, the new level is sourced immediately.\n\nThe sign of the source level dictates the polarity of the source. Positive values generate positive voltage or current from the high terminal of the source relative to the low terminal. Negative values generate negative voltage or current from the high terminal of the source relative to the low terminal.\n\nIf a manual source range is selected, the level cannot exceed the specified range. For example, if the voltage source is on the 2V range (auto range is disabled), you cannot set the voltage source amplitude to 3V. When auto range is selected, the amplitude can be set to any level.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.level',
    },
    {
        detail: 'This attribute defines the state of the source when the output is turned off.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.offmode',
    },
    {
        detail: 'This attribute enables or disables the source output.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the output is switched on, the instrument sources either voltage or current, as set by smu.source.func.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.output',
    },
    {
        detail: 'This attribute sets the overvoltage protection setting of the source output.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Overvoltage protection restricts the maximum voltage level that the instrument can source. It is in effect when either current or voltage is sourced.\n\nThis protection is in effect for both positive and negative output voltages.\n\nWhen this attribute is used in a test sequence, it should be set before turning the source on.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.protect.level',
    },
    {
        detail: 'This attribute indicates if the overvoltage source protection feature is active.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When overvoltage protection is active, the instrument restricts the maximum voltage level that the instrument can source.'
        },
        kind: CompletionItemKind.Constant,
        label: 'smu.source.protect.tripped',
    },
    {
        detail: 'This attribute selects the range for the source for the selected source function.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command manually selects the measurement range for the specified source.\n\nIf you select a specific source range, the range must be large enough to source the value. If not, an overrange condition can occur.\n\nIf an overrange condition occurs, an event is displayed and the change to the setting is ignored.\n\nThe fixed current source ranges are 1µA, 10µA, 100µA, 1mA, 10mA, 100mA, 1A, 4A, 5A, and 7A.\n\nThe fixed voltage source ranges are 200mV, 2V, 7V, 10V, 20V, and 100V.\n\nWhen you read this value, the instrument returns the positive full‑scale value that the instrument is presently using.\n\nThis command is intended to eliminate the time required by the automatic range selection.\n\nTo select the range, you can specify the approximate source value that you will use. The instrument  selects the lowest range that can accommodate that level. For example, if you expect to source levels around 50mV, send 0.05 (or 50e-3) to select the 200mV range.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.range',
    },
    {
        detail: 'This attribute determines if the instrument records the measured source value or the configured source value when making a measurement.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When source readback is off, the instrument records and displays the source value you set. When you use the actual source value (source readback on), the instrument measures the actual source value immediately before making the device under test measurement.\n\nUsing source readback results in more accurate measurements, but also a reduction in measurement speed.\n\nWhen source readback is on, the front-panel display shows the measured source value and the buffer records the measured source value immediately before the device‑under‑test measurement. When source readback is off, the front-panel display shows the configured source value and the buffer records the configured source value immediately before the device‑under‑test measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.readback',
    },
    {
        detail: 'This function sets up a linear sweep for a fixed number of measurement points.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the sweep is started, the instrument sources a specific voltage or current value to the device under test (DUT). A measurement is made for each point of the sweep.\n\nWhen the sweep command is sent, it clears any existing trigger models, creates a source configuration list, and populates the trigger model. To run the sweep, initiate the trigger model.\n\nThe sweep continues until the source outputs the specified stop level. At this level, the instrument performs another measurement and then stops the sweep.\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the sweep delay, the actual delay is 35 ms.\n\nThe range type specifies the source range that is used for the sweep. You can select the following options:'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.sweeplinear',
    },
    {
        detail: 'This function sets up a linear source sweep configuration list and trigger model with a fixed number of steps.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the sweep is started, the instrument sources a specific voltage or current voltage to the device under test (DUT). A measurement is made for each point of the sweep.\n\nWhen the sweep command is sent, it deletes the existing trigger model and creates a trigger model with a uniform series of ascending or descending voltage or current changes, called steps. To run the sweep, initiate the trigger model.\n\nThe sweep continues until the source outputs the stop level, which is calculated from the number of steps. A measurement is performed at each source step (including the start and stop levels). At this level, the instrument performs another measurement and then stops the sweep.\n\nThe instrument uses the step size parameter to determine the number of source level changes. The source level changes in equal steps from the start level to the stop level. To avoid a setting conflicts error, make sure the step size is greater than the start value and less than the stop value. To calculate the number of source-measure points in a sweep, use the following formula:\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the delay in the for the log sweep command, the actual delay is 35 ms.\n\nThe range type specifies the source range that is used for the sweep. You can select the following options:'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.sweeplinearstep',
    },
    {
        detail: 'This function sets up a sweep based on a configuration list, which allows you to customize the sweep.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command allows you to set up a custom sweep, using a configuration list to specify the source levels.\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the delay in the for the log sweep command, the actual delay is 35 ms.\n\nTo run the sweep, initiate the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.sweeplist',
    },
    {
        detail: 'This function sets up a logarithmic sweep for a set number of measurement points.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the sweep is started, the instrument sources a specific voltage or current value to the device under test (DUT). A measurement is made for each point of the sweep.\n\nWhen the sweep command is sent, it clears the existing trigger model and creates a new trigger model. To run the sweep, initiate the trigger model.\n\nThe sweep continues until the source outputs the specified stop level. At this level, the instrument performs another measurement and then stops the sweep.\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the delay in the for the log sweep command, the actual delay is 35 ms.\n\nThe range type specifies the source range that is used for the sweep. You can select the following options:\n\nThe asymptote changes the inflection of the sweep curve and allows it to sweep through zero. You can use the asymptote parameter to customize the inflection and offset of the source value curve. Setting this parameter to zero provides a conventional logarithmic sweep. The asymptote value is the value that the curve has at either positive or negative infinity, depending on the direction of the sweep. The asymptote value must not be equal to or between the starting and ending values. It must be outside the range defined by the starting and ending values.'
        },
        kind: CompletionItemKind.Function,
        label: 'smu.source.sweeplog',
    },
    {
        detail: 'This attribute sets a user‑defined delay that you can use in the trigger model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'To use this command in a trigger model, assign the delay to the dynamic delay block.\n\nThe delay is specific to the selected function.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.userdelay[N]',
    },
    {
        detail: 'This attribute selects the source limit for measurements.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the source limit for measurements. The Model 2460 cannot source levels that exceed this limit.\n\nThe values that can be set for this command are limited by the setting for the overvoltage protection limit.\n\nThis value can also be limited by the measurement range. If a specific measurement range is set, the limit must be more than 0.1% of the measurement range. If you set the measurement range to be automatically selected, the measurement range does not affect the limit.\n\nIf you change the source range to a level that is not appropriate for this limit, the instrument changes the source limit to a limit that is appropriate to the range and a warning is generated.\n\nLimits are absolute values.'
        },
        kind: CompletionItemKind.Property,
        label: 'smu.source.xlimit.level',
    },
    {
        detail: 'This attribute indicates if the source exceeded the limits that were set for the selected measurements.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command check the limit state of the source.\n\nIf the limits were exceeded, the instrument clamps the source to keep the source within the set limits.\n\nIf you check the limit for the source that is not presently selected, nil is returned.'
        },
        kind: CompletionItemKind.Constant,
        label: 'smu.source.xlimit.tripped',
    },
]

const smuSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'smu.measure.configlist.create(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.measure.configlist.delete(listName, index)',
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
        'smu.measure.configlist.query(listName, fieldSeparator)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
        ParameterInformation.create(
            'fieldSeparator',
            'String that represents the separator for the data; use one of the following:\nComma (default): ,\nSemicolon: ;\nNew line: \n.'
        ),
    ),
    SignatureInformation.create(
        'smu.measure.configlist.recall(listName, index)',
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
        'smu.measure.configlist.size(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a measure configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.measure.configlist.store(listName, index)',
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
        'smu.measure.limit[Y].clear(Y)',
        undefined,
        ParameterInformation.create(
            'Y',
            'Limit number: 1 or 2.'
        ),
    ),
    SignatureInformation.create(
        'smu.measure.read(reading, bufferName)',
        undefined,
        ParameterInformation.create(
            'reading',
            'The last reading of the measurement process.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user‑defined buffer; if no buffer is defined, it defaults to defbuffer1.'
        ),
    ),
    SignatureInformation.create(
        'smu.measure.readwithtime(reading, seconds, bufferName)',
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
            'The name of the reading buffer, which may be a default buffer (defbuffer1 or defbuffer2) or a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.'
        ),
    ),
    SignatureInformation.create(
        'smu.measure.rel.acquire(relativeValue)',
        undefined,
        ParameterInformation.create(
            'relativeValue',
            'The internal measurement acquired for the relative offset value.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.create(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.delete(listName, index)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.query(listName, index, fieldSeparator)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list; the default is the first index in the configuration list.'
        ),
        ParameterInformation.create(
            'fieldSeparator',
            'String that represents the separator for the data; use one of the following:\nComma (default): ,\nSemicolon: ;\nNew line: \n.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.recall(listName, index)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.size(listName)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.configlist.store(listName, index)',
        undefined,
        ParameterInformation.create(
            'listName',
            'A string that represents the name of a source configuration list.'
        ),
        ParameterInformation.create(
            'index',
            'A number that defines a specific configuration index in the configuration list.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplinear(configListName, start, stop, points, delay, count, rangeType, failAbort, dual, bufferName)',
        undefined,
        ParameterInformation.create(
            'configListName',
            'A string that contains the name of the configuration list that the instrument will create for this sweep.'
        ),
        ParameterInformation.create(
            'start',
            'The voltage or current source level at which the sweep starts:\nCurrent: -7.35A to 7.35A\nVoltage: -105V to 105V.'
        ),
        ParameterInformation.create(
            'stop',
            'The voltage or current at which the sweep stops:\nCurrent: -7.35A to 7.35A\nVoltage: -105V to 105V.'
        ),
        ParameterInformation.create(
            'points',
            'The number of source-measure points between the start and stop values of the sweep (2 to 1e6); to calculate the number of source-measure points in a sweep, use the following formula:\nPoints = [(Stop - Start) / Step] + 1.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is smu.DELAY_AUTO, which enables autodelay, or a specific delay value from 50ms to 10 ks, or 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: smu.INFINITE\nFinite loop: 1 to 268,435,455.'
        ),
        ParameterInformation.create(
            'rangeType',
            'The source range that is used for the sweep:\nMost sensitive source range for each source level in the sweep: smu.RANGE_AUTO\nBest fixed range: smu.RANGE_BEST (default)\nPresent source range for the entire sweep: smu.RANGE_FIXED.'
        ),
        ParameterInformation.create(
            'failAbort',
            'Complete the sweep if the source limit is exceeded: smu.OFF\nAbort the sweep if the source limit is exceeded: smu.ON (default).'
        ),
        ParameterInformation.create(
            'dual',
            'Determines if the sweep runs from start to stop and then from stop to start:\nSweep from start to stop only: smu.OFF (default)\nSweep from start to stop, then stop to start: smu.ON.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplinearstep(configListName, start, stop, step, delay, count, rangeType, failAbort, dual, bufferName)',
        undefined,
        ParameterInformation.create(
            'configListName',
            'A string that contains the name of the configuration list that the instrument will create for this sweep.'
        ),
        ParameterInformation.create(
            'start',
            'The voltage or current source level at which the sweep starts:\nCurrent: -7.35A to 7.35A\nVoltage: -105V to 105V.'
        ),
        ParameterInformation.create(
            'stop',
            'The voltage or current at which the sweep stops:\nCurrent: -7.35A to 7.35A\nVoltage: -105V to 105V.'
        ),
        ParameterInformation.create(
            'step',
            'The step size at which the source level will change; must be more than 0.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is smu.DELAY_AUTO, which enables autodelay, a specific delay value from 50 ms to 10 ks, or 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: smu.INFINITE\nFinite loop: 1 to 268,435,455.'
        ),
        ParameterInformation.create(
            'rangeType',
            'The source range that is used for the sweep:\nMost sensitive source range for each source level in the sweep: smu.RANGE_AUTO\nBest fixed range: smu.RANGE_BEST (default)\nPresent source range for the entire sweep: smu.RANGE_FIXED.'
        ),
        ParameterInformation.create(
            'failAbort',
            'Complete the sweep if the source limit is exceeded: smu.OFF\nAbort the sweep if the source limit is exceeded: smu.ON (default).'
        ),
        ParameterInformation.create(
            'dual',
            'Determines if the sweep runs from start to stop and then from stop to start:\nSweep from start to stop only: smu.OFF (default)\nSweep from start to stop, then stop to start: smu.ON.'
        ),
        ParameterInformation.create(
            'bufferName',
            'A string that indicates the reading buffer; the default buffers (defbuffer1 or defbuffer2) or the name of a user‑defined buffer; if no buffer is specified, defbuffer1 is used.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplist(configListName, index, delay, count, failAbort, bufferName)',
        undefined,
        ParameterInformation.create(
            'configListName',
            'The name of the source configuration list that the sweep uses; this must be defined before sending this command.'
        ),
        ParameterInformation.create(
            'index',
            'The index in the configuration list where the sweep starts; default is 1.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is 0 for no delay or you can set a specific delay value from 50 ms to 10 ks.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: smu.INFINITE\nFinite loop: 1 to 268,435,455.'
        ),
        ParameterInformation.create(
            'failAbort',
            'Complete the sweep if the source limit is exceeded: smu.OFF\nAbort the sweep if the source limit is exceeded: smu.ON (default).'
        ),
        ParameterInformation.create(
            'bufferName',
            'A string that indicates the reading buffer; the default buffers (defbuffer1 or defbuffer2) or the name of a user‑defined buffer; if no buffer is specified, defbuffer1 is used.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplog(configListName, start, stop, points, delay, count, rangeType, failAbort, dual, bufferName, asymptote)',
        undefined,
        ParameterInformation.create(
            'configListName',
            'A string that contains the name of the configuration list that the instrument will create for this sweep.'
        ),
        ParameterInformation.create(
            'start',
            'The voltage or current source level at which the sweep starts:\nCurrent: 1 µA to 7.35 A\nVoltage 200 mV to 105 V.'
        ),
        ParameterInformation.create(
            'stop',
            'The voltage or current at which the sweep stops:\nCurrent: 1 µA to 7.35 A\nVoltage 200 mV to 105 V.'
        ),
        ParameterInformation.create(
            'points',
            'The number of source-measure points between the start and stop values of the sweep (2 to 1e6); to calculate the number of source-measure points in a sweep, use the following formula:\nPoints = [(Stop - Start) / Step] + 1.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is smu.DELAY_AUTO, which enables autodelay, or a specific delay value from 50 ms to 10 ks, or 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: smu.INFINITE\nFinite loop: 1 to 268,435,455.'
        ),
        ParameterInformation.create(
            'rangeType',
            'The source range that is used for the sweep:\nMost sensitive source range for each source level in the sweep: smu.RANGE_AUTO\nBest fixed range: smu.RANGE_BEST (default)\nPresent source range for the entire sweep: smu.RANGE_FIXED.'
        ),
        ParameterInformation.create(
            'failAbort',
            'Complete the sweep if the source limit is exceeded: smu.OFF\nAbort the sweep if the source limit is exceeded: smu.ON (default).'
        ),
        ParameterInformation.create(
            'dual',
            'Determines if the sweep runs from start to stop and then from stop to start:\nSweep from start to stop only: smu.OFF (default)\nSweep from start to stop, then stop to start: smu.ON.'
        ),
        ParameterInformation.create(
            'bufferName',
            'A string that indicates the reading buffer; the default buffers (defbuffer1 or defbuffer2) or the name of a user‑defined buffer; if no buffer is specified, defbuffer1 is used.'
        ),
        ParameterInformation.create(
            'asymptote',
            'Default is 0; see Details.'
        ),
    ),
]

export async function getSmuCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(smuCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getSmuSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
