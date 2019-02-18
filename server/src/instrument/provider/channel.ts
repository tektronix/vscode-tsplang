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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'channel'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction close(channelList)\n```\n\
\n\
channel.close(channelList)\n\
\n\
The action of the close command depends on which, if any, function is set for the DMM.\n\
\n\
If no function is set, the listed channels or channel pairs are closed. You can select multiple channels.\n\
\n\
If the DMM for the channel is set to a function, the listed channels or channel pairs are closed. In addition, \
it opens channels or channel pairs that could affect the measurements. When a channel is set to a function, only \
one channel can be specified in the channel list.\n\
\n\
When you close a channel or channel pair, the instrument: \n\
* Closes the items in the list of channels.\n\
* Opens any channels on any slots that interfere with the measurement.\n\
* Incurs the settling time and any user-specified delay.\n\
\n\
Use the channel.getclose() command to return a list of closed measurement channels, including the paired channels \
for 4-wire measurements.'
        },
        kind: CompletionItemKind.Function,
        label: 'close'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getclose(channelList)\n```\n\
\n\
channel.getclose([channelList]) -> string | nil\n\
\n\
Use this command to return a list of closed measurement channels as a comma-deliminated string. \
It includes the paired channel for 4-wire measurements. It does not return non-measurement channels.\n\
\n\
If none of the channels in the channel list is closed, `nil` is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'getclose'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getcount(channelList)\n```\n\
\n\
channel.getcount([channelList]) -> string\n\
\n\
Returns a comma-delimited string that lists the number of times the specified channels have closed.\n\
\n\
The instrument keeps an internal count of the number of times each relay has been closed. This count can help you \
determine when relays require replacement. Refer to the card documentation for the contact life specifications \
for the relays.\n\
\n\
If channels are specified, the count values are returned in the order in which the channels are specified. \
If slots are specified, the response lists the channels starting from lowest to highest.\n\
\n\
Relay closures are counted only when a relay cycles from open to closed state.\n\
\n\
It is good practice to get the relay count at the end of a program. This saves the latest count to memory.'
        },
        kind: CompletionItemKind.Function,
        label: 'getcount'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getdelay(channelList)\n```\n\
\n\
channel.getdelay([channelList]) -> string\n\
\n\
Returns a comma-delimited string consisting of the delay times (in seconds) for channels specified in channelList\n\
\n\
A value of zero (0) indicates that no additional delay time is incurred before a close command completes.'
        },
        kind: CompletionItemKind.Function,
        label: 'getdelay'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getdmm(channelList, setting)\n```\n\
\n\
channel.getdmm(channelList, setting) -> string\n\
\n\
Returns the value for one or many channel\'s DMM attribute. You can retrieve one attribute at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'getdmm'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getlabel(channelList)\n```\n\
\n\
channel.getlabel([channelList]) -> string | nil\n\
\n\
Returns the label associated with the specified channel, or `nil` if no label is set.'
        },
        kind: CompletionItemKind.Function,
        label: 'getlabel'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getstate(channelList)\n```\n\
\n\
channel.getstate([channelList]) -> string\n\
\n\
Returns the state (closed or open) of the channels requested as a comma-delimited string.\n\
\n\
Each bit in the return represents a different indicator. Therefore, multiple indicators can be present \
(the OR operation is performed bitwise). Possible returns are:\n\
* `0`: Channel is open\n\
* `channel.IND_CLOSED`: Channel is closed',
        },
        kind: CompletionItemKind.Function,
        label: 'getstate'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction gettype(channelList)\n```\n\
\n\
channel.gettype([channelList]) -> string\n\
\n\
Returns a comma-delimited list of the type of channels specified in in channelList.\n\
\n\
The channel type is defined by the physical hardware of the card on which the channel exists.'
        },
        kind: CompletionItemKind.Function,
        label: 'gettype'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction open(channelList)\n```\n\
\n\
channel.open(channelList)\n\
\n\
Opens the specified channels and channel pairs.\n\
\n\
If the specified channels are not set to a measurement function, this command opens the specified channels without \
affecting other channels. If the specified channels are set to a measurement function, their paired channels and \
backplane channels are also opened.\n\
\n\
The settling time associated with a channel must elapse before the command completes. User delay is not added \
when a relay opens.'
        },
        kind: CompletionItemKind.Function,
        label: 'open'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setdelay(channelList, delay)\n```\n\
\n\
channel.setdelay(channelList, delay)\n\
\n\
Sets additional delay time for specified channels.\n\
\n\
The measurement sequence is:\n\
1. Command is processed\n\
2. Channel closes\n\
3. Internal settling time is incurred (not adjustable)\n\
4. **Channel delay** is incurred (this command)\n\
5. Command completes\n\
\n\
You can use this delay to allow additional settling time for a signal on that channel. For most cards, \
the resolution of the delay is 10 us. The delay being specified may be updated based on the delay resolution of the \
card. You can use `channel.getdelay()` to check the value of channel delays.'
        },
        kind: CompletionItemKind.Function,
        label: 'setdelay'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setdmm(channelList, setting, value)\n```\n\
\n\
channel.setdmm(channelList, setting, value[, ..., setting, value])\n\
\n\
Configures the DMM for a channel or group of channels. You can send up to four setting and value pairs for this \
command.\n\
\n\
You must use this command to set the measure or digitize function before using it to set the parameters for the \
selected function. To set up a measure function, assign `setting` to `dmm.ATTR_MEAS_FUNCTION` or \
`dmm.ATTR_DIGI_FUNCTION` and set the value to some `dmm.FUNC_*` or `dmm.DIGITIZE_*`'
        },
        kind: CompletionItemKind.Function,
        label: 'setdmm'
    },
    {
        data: { domains: ['channel'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setlabel(channelNumber, labelName)\n```\n\
\n\
channel.setlabel(channelNumber, labelName)\n\
\n\
This command sets the label of the specified channel to the label value. The label must be unique; you cannot \
assign the same label to more than one channel. Labels cannot start with a digit. On the front panel of the \
instrument, only the first few characters are displayed.\n\
\n\
After defining a label, you can use it to specify the channel instead of using the channel number in \
commands. To clear a label, set it to an empty string ("").'
        },
        kind: CompletionItemKind.Function,
        label: 'setlabel'
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'channel.close(channelList)',
        parameters: [
            {
                documentation: 'A string that lists the channels and channel pairs to close.',
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.getclose(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to be queried (including `allslots` or `slot1` to \
get information on all channels in both slots or a specific slot); default is `allslots`',
                },
                label: 'channelList',
            }
        ]
    },
    {
        documentation: undefined,
        label: 'channel.getcount(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to be queried (including `allslots` or `slot1` to \
get information on all channels in both slots or a specific slot); default is `allslots`',
                },
                label: 'channelList',
            }
        ]
    },
    {
        documentation: undefined,
        label: 'channel.getdelay(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to query for their delay times; `slot1` or `allslots` \
allowed',
                },
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.getdmm(channelList, setting)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to query for the DMM setting specified.',
                },
                label: 'channelList',
            },
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'The DMM function or parameters whose values will be returned for the selected channels. \
Given as some dmm.ATTR_*',
                },
                label: 'setting',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.label(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channel to query for the associated label',
                },
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.getstate(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to query for their status, default is `allslots`',
                },
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.gettype(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to query for their type, default is `allslots`',
                },
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.open(channelList)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels to open; `allslots` and `slot1` are available.',
                },
                label: 'channelList',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.setdelay(channelList, delay)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels for which to add delay time.',
                },
                label: 'channelList',
            },
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'Delay time for the selected channels; minimum and default is 0 seconds.',
                },
                label: 'delay',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.setdmm(channelList, setting, value)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that lists the channels for which to configure the DMM settings.',
                },
                label: 'channelList',
            },
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'The DMM function or the parameter for the function to be applied to the channelList; \
given as some dmm.ATTR_*',
                },
                label: 'setting',
            },
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'The function or attribute value to apply.',
                },
                label: 'value',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'channel.setlabel(channelNumber, labelName)',
        parameters: [
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string defining a single channel for which to set the label. Channels cannot share a \
label.',
                },
                label: 'channelNumber',
            },
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that contains the label for the channel in channelNumber, up to 19 characters.',
                },
                label: 'labelName',
            },
        ],
    },
]
