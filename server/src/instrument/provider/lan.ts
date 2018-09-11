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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'lan'
    },
    {
        data: ['lan'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction ipconfig(method, ipV4Address, subnetMask, gateway)\n```\n\
\n\
lan.ipconfig(lan.MODE_\\*[, ipV4Address][, subnetMask][, gateway])\n\
\n\
lan.ipconfig() -> lan.MODE_\\*, string, string, string\n\
\n\
Sets the current IPv4 configuration if one or more arguments are specified.\n\
\n\
Gets the current IPv4 configuration if no arguments are specified. \
Returns `method, ipV4Address, subnetMask, gateway` where \
*method* is one of lan.MODE_AUTO or MODE_MANUAL \
and *ipV4Address*, *subnetMask*, and *gateway* are IPv4 address strings.\n\
\n\
When method is lan.MODE_AUTO, the instrument first attempts to configure the LAN settings using dynamic host \
configuration protocol (DHCP). If DHCP fails, it tries dynamic link local addressing (DLLA). If DLLA fails, an error \
occurs.\n\
\n\
The previous settings are used if method is set lan.MODE_MANUAL and no other arguments are specified.'
        },
        kind: CompletionItemKind.Function,
        label: 'ipconfig',
    },
    {
        data: ['lan'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlan.lxidomain\n```\n\
\n\
Get the LXI domain or set it to a number from 0 to 255.\n\
\n\
All outgoing LXI packets are generated with the specified domain number. All inbound LXI packets are ignored unless \
they have the specified domain number.'
        },
        kind: CompletionItemKind.Property,
        label: 'lxidomain',
    },
    {
        data: ['lan'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nlan.macaddress\n```\n\
\n\
Returns the MAC address of the instrument as a string.\n\
\n\
The returned string represents a MAC addresses (a 48-bit value grouped into six octets) where each octet is \
separated by a colon.'
        },
        kind: CompletionItemKind.Constant,
        label: 'macaddress',
    },
]

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'lan.ipconfig([method][, ipV4Address][, subnetMask][, gateway])',
        parameters: [
            {
                documentation: 'The method for configuring LAN settings; Some lan.MODE_*',
                label: 'method',
            },
            {
                documentation: 'LAN IP address; must be a valid IPv4 address.',
                label: 'ipV4Address',
            },
            {
                documentation: 'The LAN subnet mask; must be a valid IPv4 subnet mask.',
                label: 'subnetMask',
            },
            {
                documentation: 'The LAN default gateway; must be a valid IPv4 address.',
                label: 'gateway',
            },
        ],
    },
]
