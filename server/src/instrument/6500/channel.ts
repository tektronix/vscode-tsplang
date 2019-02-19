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

const channelCompletions: Array<CompletionItem> = [
    {
        detail: 'This function closes the channels and channel pairs that are specified by the channel list parameter.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The action of the close command depends on which, if any, function is set for the DMM.\n\nIf no function is set, the listed channels or channel pairs are closed. You can select multiple channels.\n\nIf the DMM for the channel is set to a function, the listed channels or channel pairs are closed. In addition, it opens channels or channel pairs that could affect the measurements. When a channel is set to a function, only one channel can be specified in the channel list.\n\nWhen you close a channel or channel pair, the instrument:\n\nUse the channel.getclose() command to return a list of closed measurement channels, including the paired channels for 4-wire measurements.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.close',
    },
    {
        detail: 'This function queries for the closed channels indicated by the channel list parameter.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Use this command to return a list of closed measurement channels, including the paired channel for 4-wire measurements. It does not return non-measurement channels.\n\nIf more than one channel is closed, they are delimited in the string.\n\nIf none of the channels in the channel list is closed, nil is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.getclose',
    },
    {
        detail: 'This function returns the number of times the relays have been closed for the specified channels.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The DMM6500 keeps an internal count of the number of times each relay has been closed. This count can help you determine when relays require replacement. Refer to the module documentation for the contact life specifications for the relays.\n\nIf channels are specified, the count values are returned in the order in which the channels are specified. If slots are specified, the response lists the channels starting from lowest to highest.\n\nRelay closures are counted only when a relay cycles from open to closed state.\n\nIt is good practice to get the relay count at the end of a program. This saves the latest count to memory.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.getcount',
    },
    {
        detail: 'This function queries for the additional delay time for the specified channels.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The delay times are returned in a comma-delimited list in the same order that the channels are specified in the channel list parameter. A value of zero (0) indicates that no additional delay time is incurred before a close command completes.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.getdelay',
    },
    {
        detail: 'This function returns the setting for a channel DMM attribute.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can retrieve one attribute at a time.\n\nFor detail on the options for settings, see the examples and lists in the channel.setdmm command.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.getdmm',
    },
    {
        detail: 'This function returns the label associated with the specified channel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Returns nil if no label is set.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.getlabel',
    },
    {
        detail: 'This function returns the state indicators of the channels in the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command returns the closed or open state of a channel.\n\nCards are returned sequentially by channel number.\n\nEach bit in the return represents a different indicator. Therefore, multiple indicators can be present (the OR operation is performed bitwise).\n\nPossible returns are:'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.getstate',
    },
    {
        detail: 'This function returns the type associated with a channel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The channel type is defined by the physical hardware of the card on which the channel exists. The only valid channel type for the DMM6500 is channel.TYPE_SWITCH.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.gettype',
    },
    {
        detail: 'This function closes the listed channels without affecting any other channels.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command closes the specified channels without affecting any other channels, including paired channels.\n\nIf the channel list is large, you should use the opc() function with the multiple close.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.multiple.close',
    },
    {
        detail: 'This function opens the channels in the channel list without affecting any others.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Opens only the specified channels. Backplane relays and paired channels are not affected.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.multiple.open',
    },
    {
        detail: 'This command opens the specified channels and channel pairs.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'If the specified channels are not set to a measurement function, this command opens the specified channels without affecting other channels.\n\nIf the specified channels are set to a measurement function, their paired channels and backplane channels are also opened.\n\nThe settling time associated with a channel must elapse before the command completes. User delay is not added when a relay opens.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.open',
    },
    {
        detail: 'This function sets additional delay time for specified channels.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'After a channel closes, a command incurs the delay time indicated in the response for a channel before it completes. However, the internal settling time must elapse before the user delay is incurred. Therefore, the sequence is:\n\nThe channel delay is an additional delay that is added after a channel is closed. You can use this delay to allow additional settling time for a signal on that channel. For most cards, the resolution of the delay is 10us. However, check the documentation for your card to verify. To see if the delay value was modified after setting, query the value.\n\nSetting a delay only applies to switch channels.\n\nThe delay being specified may be updated based on the delay resolution of the card.\n\nTo query the delay value, use the channel.getdelay() command. Pseudocards do not replicate the additional delay time.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.setdelay',
    },
    {
        detail: 'This function configures the DMM for a channel or group of channels.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You must use this command to set the measure or digitize function before using it to set the parameters for the selected function. You can send up to four setting and value pairs for this command.\n\nTo set up a measure function, assign setting to dmm.ATTR_MEAS_FUNCTION and set the value to one of the options in the table below. For example, to set channel 1 in slot 1 to the DC voltage function, you send:\n\nOptions for dmm.ATTR_MEAS_FUNCTION\n\nTo set up a digitize function, assign setting to dmm.ATTR_DIGI_FUNCTION. Set the value to either dmm.FUNC_DIGITIZE_CURRENT or dmm.FUNC_DIGITIZE_VOLTAGE. For example, to set channel 3 to the digitize voltage function, you send:\n\nOnce the function is set, you can set the parameters and settings for that function. The following lists describe the settings that are available for each function, with links to the descriptions of the corresponding TSP command descriptions. The options for each function setting are the same as the settings for the TSP commands.\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\ndB reference: dmm.ATTR_MEAS_DB_REFERENCE\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nInput impedance: dmm.ATTR_MEAS_INPUT_IMPEDANCE\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUnit: dmm.ATTR_MEAS_UNIT\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\ndB reference: dmm.ATTR_MEAS_DB_REFERENCE\n\nDetector bandwidth: dmm.ATTR_MEAS_DETECTBW\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUnit: dmm.ATTR_MEAS_UNIT\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nDetector bandwidth: dmm.ATTR_MEAS_DETECTBW\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\n2-wire RTD type: dmm.ATTR_MEAS_TWO_RTD\n\n3-wire RTD type: dmm.ATTR_MEAS_THREE_RTD\n\n4-wire RTD type: dmm.ATTR_MEAS_FOUR_RTD\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nOffset Compensation: dmm.ATTR_MEAS_OFFCOMP_ENABLE\n\nOpen lead detector: dmm.ATTR_MEAS_OPEN_DETECTOR\n\nReference junction: dmm.ATTR_MEAS_REF_JUNCTION\n\nRTD Alpha: dmm.ATTR_MEAS_RTD_ALPHA\n\nRTD Beta: dmm.ATTR_MEAS_RTD_BETA\n\nRTD Delta: dmm.ATTR_MEAS_RTD_DELTA\n\nRTD Zero: dmm.ATTR_MEAS_RTD_ZERO\n\nSimulated reference temperature: dmm.ATTR_MEAS_SIM_REF_TEMP\n\nThermistor: dmm.ATTR_MEAS_THERMISTOR\n\nThermocouple: dmm.ATTR_MEAS_THERMOCOUPLE\n\nTransducer: dmm.ATTR_MEAS_TRANSDUCER\n\nUnit: dmm.ATTR_MEAS_UNIT\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nOffset compensation: dmm.ATTR_MEAS_OFFCOMP_ENABLE\n\nOpen lead detector: dmm.ATTR_MEAS_OPEN_DETECTOR\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\nBias level: dmm.ATTR_MEAS_BIAS_LEVEL\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLimit 1 audible: dmm.ATTR_MEAS_LIMIT_AUDIBLE_1\n\nLimit 1 high value: dmm.ATTR_MEAS_LIMIT_HIGH_1\n\nLimit 1 low value: dmm.ATTR_MEAS_LIMIT_LOW_1\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nRange:dmm.ATTR_MEAS_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLimit 1 audible: dmm.ATTR_MEAS_LIMIT_AUDIBLE_1\n\nLimit 1 high value: dmm.ATTR_MEAS_LIMIT_HIGH_1\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nThreshold autorange: dmm.ATTR_MEAS_THRESHOLD_RANGE_AUTO\n\nThreshold range: dmm.ATTR_MEAS_THRESHOLD_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nThreshold autorange: dmm.ATTR_MEAS_THRESHOLD_RANGE_AUTO\n\nThreshold range: dmm.ATTR_MEAS_THRESHOLD_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_MEAS_APERTURE\n\nAuto delay: dmm.ATTR_MEAS_AUTO_DELAY\n\nAuto range: dmm.ATTR_MEAS_RANGE_AUTO\n\nAuto zero: dmm.ATTR_MEAS_AUTO_ZERO\n\nDisplay digits: dmm.ATTR_MEAS_DIGITS\n\nLine sync: dmm.ATTR_MEAS_LINE_SYNC\n\nMeasure count: dmm.ATTR_MEAS_COUNT\n\nNPLC: dmm.ATTR_MEAS_NPLC\n\nRange:dmm.ATTR_MEAS_RANGE\n\nRelative offset for DC voltage ratio: dmm.ATTR_MEAS_REL_METHOD\n\nSense range (read only): dmm.ATTR_MEAS_SENSE_RANGE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_MEAS_USER_DELAY_N\n\nAperture: dmm.ATTR_DIGI_APERTURE\n\nDisplay digits: dmm.ATTR_DIGI_DIGITS\n\nDigitize count: dmm.ATTR_DIGI_COUNT\n\nRange: dmm.ATTR_DIGI_RANGE\n\nSample rate: dmm.ATTR_DIGI_SAMPLE_RATE\n\nUser delay N (where N is 1 to 5): dmm.ATTR_DIGI_USER_DELAY_N\n\nAperture: dmm.ATTR_DIGI_APERTURE\n\nDecibel reference: dmm.ATTR_DIGI_DB_REFERENCE\n\nDisplay digits: dmm.ATTR_DIGI_DIGITS\n\nDigitize count: dmm.ATTR_DIGI_COUNT\n\nInput impedance: dmm.ATTR_DIGI_INPUT_IMPEDANCE\n\nRange: dmm.ATTR_DIGI_RANGE\n\nSample rate: dmm.ATTR_DIGI_SAMPLE_RATE\n\nUnit: dmm.ATTR_DIGI_UNIT\n\nEnable math: dmm.ATTR_MEAS_MATH_ENABLE\n\nb (offset) value: dmm.ATTR_MEAS_MATH_MXB_BF\n\nm (scalar) value: dmm.ATTR_MEAS_MATH_MXB_MF\n\nMath format: dmm.ATTR_MEAS_MATH_FORMAT\n\nPercent: dmm.ATTR_MEAS_MATH_PERCENT\n\nEnable math: dmm.ATTR_DIGI_MATH_ENABLE\n\nb (offset) value: dmm.ATTR_DIGI_MATH_MXB_BF\n\nm (scalar) value: dmm.ATTR_DIGI_MATH_MXB_MF\n\nMath format: dmm.ATTR_DIGI_MATH_FORMAT\n\nPercent: dmm.ATTR_DIGI_MATH_PERCENT\n\nLimit 1 enable: dmm.ATTR_MEAS_LIMIT_ENABLE_1\n\nLimit 1 audible: dmm.ATTR_MEAS_LIMIT_AUDIBLE_1\n\nLimit 1 auto clear: dmm.ATTR_MEAS_LIMIT_AUTO_CLEAR_1\n\nLimit 1 fail: dmm.ATTR_MEAS_LIMIT_FAIL_1\n\nLimit 1 high value: dmm.ATTR_MEAS_LIMIT_HIGH_1\n\nLimit 1 low value: dmm.ATTR_MEAS_LIMIT_LOW_1\n\nLimit 2 enable: dmm.ATTR_MEAS_LIMIT_ENABLE_2\n\nLimit 2 audible: dmm.ATTR_MEAS_LIMIT_AUDIBLE_2\n\nLimit 2 auto clear: dmm.ATTR_MEAS_LIMIT_AUTO_CLEAR_2\n\nLimit 2 fail: dmm.ATTR_MEAS_LIMIT_FAIL_2\n\nLimit 2 high value: dmm.ATTR_MEAS_LIMIT_HIGH_2\n\nLimit 2 low value: dmm.ATTR_MEAS_LIMIT_LOW_2\n\nDigitize limit 1 enable: dmm.ATTR_DIGI_LIMIT_ENABLE_1\n\nDigitize limit 1 audible: dmm.ATTR_DIGI_LIMIT_AUDIBLE_1\n\nDigitize limit 1 auto clear: dmm.ATTR_DIGI_LIMIT_AUTO_CLEAR_1\n\nDigitize limit 1 fail: dmm.ATTR_DIGI_LIMIT_FAIL_1\n\nDigitize limit 1 high value: dmm.ATTR_DIGI_LIMIT_HIGH_1\n\nDigitize limit 1 low value: dmm.ATTR_DIGI_LIMIT_LOW_1\n\nDigitize limit 2 enable: dmm.ATTR_DIGI_LIMIT_ENABLE_2\n\nDigitize limit 2 audible: dmm.ATTR_DIGI_LIMIT_AUDIBLE_2\n\nDigitize limit 2 auto clear: dmm.ATTR_DIGI_LIMIT_AUTO_CLEAR_2\n\nDigitize limit 2 fail: dmm.ATTR_DIGI_LIMIT_FAIL_2\n\nDigitize limit 2 high value: dmm.ATTR_DIGI_LIMIT_HIGH_2\n\nDigitize limit 2 low value: dmm.ATTR_DIGI_LIMIT_LOW_2\n\nEnable measure filter: dmm.ATTR_MEAS_FILTER_ENABLE\n\nMeasure filter count: dmm.ATTR_MEAS_FILTER_COUNT\n\nMeasure filter type: dmm.ATTR_MEAS_FILTER_TYPE\n\nMeasure filter window: dmm.ATTR_MEAS_FILTER_WINDOW\n\nEnable relative offset: dmm.ATTR_MEAS_REL_ENABLE\n\nRelative offset method (DCV ratio measurements only): dmm.ATTR_MEAS_REL_METHOD\n\nRelative offset value: dmm.ATTR_MEAS_REL_LEVEL\n\nEnable relative offset: dmm.ATTR_DIGI_REL_ENABLE\n\nRelative offset value: dmm.ATTR_DIGI_REL_LEVEL'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.setdmm',
    },
    {
        detail: 'This function sets the label associated with a channel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the label of the specified channel to the label value. The label must be unique; you cannot assign the same label to more than one channel. Labels cannot start with a digit. They can be up to 19 characters. On the front panel of the instrument, only the first few characters are displayed.\n\nTo clear a label, set it to an empty string ("").\n\nAfter defining a label, you can use it to specify the channel instead of using the channel number in commands.'
        },
        kind: CompletionItemKind.Function,
        label: 'channel.setlabel',
    },
]

const channelSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'channel.close(channelList)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'A string that lists the channels and channel pairs to close.'
        ),
    ),
    SignatureInformation.create(
        'channel.getclose(closed, channelList)',
        undefined,
        ParameterInformation.create(
            'closed',
            'A string that lists the channels that are presently closed in the specified channel list.'
        ),
        ParameterInformation.create(
            'channelList',
            'A string that lists the channels to be queried (including allslots or slot1 to get information on all channels in both slots or a specific slot); returns all slots if nothing is specified.'
        ),
    ),
    SignatureInformation.create(
        'channel.getcount(counts, channelList)',
        undefined,
        ParameterInformation.create(
            'counts',
            'A comma-delimited string that lists the number of times the specified channels have closed.'
        ),
        ParameterInformation.create(
            'channelList',
            'A string listing the items to query, which can include:\nChannels\nslot1\nallslots.'
        ),
    ),
    SignatureInformation.create(
        'channel.getdelay(delayTimes, channelList, channelList)',
        undefined,
        ParameterInformation.create(
            'delayTimes',
            'A comma-delimited string consisting of the delay times (in seconds) for channels specified in channelList.'
        ),
        ParameterInformation.create(
            'channelList',
            'delayTimes.'
        ),
        ParameterInformation.create(
            'channelList',
            'A string listing the channels to query for their delay times; slot1 or allslots allowed.'
        ),
    ),
    SignatureInformation.create(
        'channel.getdmm(channelList, settings)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'List of channels for which to set the DMM.'
        ),
        ParameterInformation.create(
            'settings',
            'The DMM function or the parameter values to return for the selected channels.'
        ),
    ),
    SignatureInformation.create(
        'channel.getlabel(label, channelNumber, channelNumber)',
        undefined,
        ParameterInformation.create(
            'label',
            'A string that lists the comma-delimited label for the channel specified in channelNumber.'
        ),
        ParameterInformation.create(
            'channelNumber',
            'label.'
        ),
        ParameterInformation.create(
            'channelNumber',
            'A string that lists the channel to query for the associated label.'
        ),
    ),
    SignatureInformation.create(
        'channel.getstate(state, channelList, channelList)',
        undefined,
        ParameterInformation.create(
            'state',
            'Return a comma-delimited string that lists the states for the channels in channelList; refer to Details.'
        ),
        ParameterInformation.create(
            'channelList',
            'state.'
        ),
        ParameterInformation.create(
            'channelList',
            'String specifying the channels to query; use normal channel list syntax; if no channels are defined, all channels are returned.'
        ),
    ),
    SignatureInformation.create(
        'channel.gettype(type, channelList, channelList, channelList)',
        undefined,
        ParameterInformation.create(
            'type',
            'Returns a comma-delimited list of the type of channels in channelList.'
        ),
        ParameterInformation.create(
            'channelList',
            'type.'
        ),
        ParameterInformation.create(
            'channelList',
            'String specifying the channels to query, using normal channelList syntax.'
        ),
        ParameterInformation.create(
            'channelList',
            'channelList.'
        ),
    ),
    SignatureInformation.create(
        'channel.multiple.close(channelList)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'The list of channels to close.'
        ),
    ),
    SignatureInformation.create(
        'channel.multiple.open(channelList)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'A list of the channels to open.'
        ),
    ),
    SignatureInformation.create(
        'channel.open(channelList)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'String listing the channels to open; allslots and slot1 are available; both open all channels.'
        ),
    ),
    SignatureInformation.create(
        'channel.setdelay(channelList, delay)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'A string listing the channels for which to add delay time.'
        ),
        ParameterInformation.create(
            'delay',
            'Delay time for the selected channels; minimum is 0 seconds.'
        ),
    ),
    SignatureInformation.create(
        'channel.setdmm(channelList, setting, channelList, value)',
        undefined,
        ParameterInformation.create(
            'channelList',
            'List of channels for which to set the DMM.'
        ),
        ParameterInformation.create(
            'setting',
            'The DMM function or the parameter for the function to be applied to the channelList; refer to Details and the tables following the examples.'
        ),
        ParameterInformation.create(
            'channelList',
            'setting.'
        ),
        ParameterInformation.create(
            'value',
            'The function or attribute value.'
        ),
    ),
    SignatureInformation.create(
        'channel.setlabel(channelNumber, labelname, channelNumber)',
        undefined,
        ParameterInformation.create(
            'channelNumber',
            'A string that lists the channel for which to set the label.'
        ),
        ParameterInformation.create(
            'labelname',
            'A string that contains the label for the channel in channelNumber, up to 19 characters.'
        ),
        ParameterInformation.create(
            'channelNumber',
            'labelname.'
        ),
    ),
]

export async function getChannelCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(channelCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getChannelSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(channelSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
