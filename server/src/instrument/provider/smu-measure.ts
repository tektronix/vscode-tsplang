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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback, SignatureInformation } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.measure.autorangehigh',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.measure.autorangehigh\n\`\`\`\n\
\n\
Acts as a read-write attribute if and only if the present measurement function is set to Resistance; otherwise it \
acts as a read-only attribute.\n\
\n\
For Resistance measurements, this attribute can be set to any number from ${spec.ranges.resistance[0]} to \
${spec.ranges.resistance[spec.ranges.resistance.length - 1]} that is greater than or equal to the measure \
autorangelow attribute. Defaults to ${spec.ranges.resistance[spec.ranges.resistance.length - 1]}.\n\
\n\
Any set value is saved with the resistance function and retained until the next instrument reset or power cycle.`
    ],
    [
        'smu.measure.autorangelow',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.measure.autorangelow\n\`\`\`\n\
\n\
Get or set the lowest range available to the autorange setting to a number.\n\
\n\
When the measurement function is set to Current, the valid range of this attribute is \
${spec.ranges.current[0]} to ${spec.ranges.autolow.maxCurrent} and defaults to ${spec.ranges.current[0]}.\n\
\n\
When the measurement function is set to Voltage, the valid range is ${spec.ranges.voltage[0]} to \
${spec.ranges.autolow.maxVoltage} and defaults to ${spec.ranges.voltage[0]}.\n\
\n\
When the measurement function is set to Resistance, the valid range is any number ${spec.ranges.resistance[0]} to \
${spec.ranges.autolow.maxResistance} that is less than or equal to the measure autorangehigh attribute. Defaults to \
${spec.ranges.resistance[0]}.\n\
\n\
While this attribute accepts any number in the applicable range, the instrument is set to the closest effective range \
greater than or equal to the supplied value.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.`
    ],
    [
        'smu.measure.range',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.measure.range\n\`\`\`\n\
\n\
Get or set the measurement range of the active measure function as a number.\n\
\n\
When the measurement function is set to Current, the valid range of this attribute is \
${spec.ranges.current[0]} to ${spec.ranges.current[spec.ranges.current.length - 1]} \
${(spec.extendedRanges) ? `(${spec.extendedRanges.current[spec.extendedRanges.current.length - 1]} pulsed)` : ''} \
and defaults to ${spec.defaults.measure.range.current}.\n\
\n\
When the measurement function is set to Voltage, this range is ${spec.ranges.voltage[0]} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1]} and defaults to ${spec.defaults.measure.range.voltage}.\n\
\n\
When the measurement function is set to Resistance, this range is ${spec.ranges.resistance[0]} to \
${spec.ranges.resistance[spec.ranges.resistance.length - 1]} and defaults to \
${spec.defaults.measure.range.resistance}.\n\
\n\
While this attribute accepts any number in the applicable range, the instrument is set to the closest effective range \
greater than or equal to the supplied value.\n\
\n\
Any signal greater than the set range is returned as ${spec.overflow}.\n\
\n\
If sourcing and measuring the same function, the source range takes precendence.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.`
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.Module,
        label: 'measure'
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.autorange\n```\n\
\n\
Get or set the present autorange setting to smu.OFF or ON. Defaults to smu.ON.\n\
\n\
When set to smu.ON, the instrument automatically sets the most sensitive range to perform a measurement.\n\
\n\
When set to smu.OFF, the instrument range must be configured manually. If the range is not configured, the instrument \
will remain at the range last used by autorange. This attribute is automatically set to smu.OFF on manual range \
configuration.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'autorange',
    },
    {
        data: { domains: ['measure', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'autorangehigh',
    },
    {
        data: { domains: ['measure', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'autorangelow',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.count\n```\n\
\n\
Get or set the number of measurements taken when a measurement is requested from 1 to 300 000. Defaults to 1.\n\
\n\
If you set to a value larger than the capacity of the reading buffer and the buffer fill mode is set to continuous, \
the buffer wraps until the number of specified readings have occurred, overwriting the earliest readings. If the \
buffer is set to fill once, readings stop when the buffer is filled, even if the count is not complete.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.\n\
\n\
Does not affect the trigger model.'
        },
        kind: CompletionItemKind.Property,
        label: 'count',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.displaydigits\n```\n\
\n\
Get or set the number of measurement digits to display on the front-panel to smu.DIGITS_\\*. Defaults to \
smu.DIGITS_5_5. New digit settings will be displayed after the next measurement.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.\n\
\n\
This attribute affects neither instrument speed, accuracy, nor the number of digits returned in a remote command \
reading.'
        },
        kind: CompletionItemKind.Property,
        label: 'displaydigits',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.func\n```\n\
\n\
Get or set the active measurment function to smu.FUNC_\\*. Defaults to smu.FUNC_DC_CURRENT.\n\
\n\
When the active measurement function is changed, settings that are retained on a per-function basis are also changed.'
        },
        kind: CompletionItemKind.Property,
        label: 'func',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.nplc\n```\n\
\n\
Get or set the number of power line cycles (NPLCs) per measurement from 0.01 to 10. Defaults to 1.\n\
\n\
One PLC for 60Hz is 16.67ms (1/60) and one PLC for 50Hz is 20ms (1/50).\n\
\n\
Lowering the NPLC setting results in a faster reading rate, but increases the reading noise and decreases the number \
of usable digits.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'nplc',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.offsetcompensation\n```\n\
\n\
Get or set the present offset compensation setting to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
Only available for resistance measurements or when the measure unit attribute is set to Ohms. Any set value is saved \
with the resistance function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'offsetcompensation',
    },
    {
        data: { domains: ['measure', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'range',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction read(bufferName)\n```\n\nsmu.measure.read([bufferName]) -> number\n\
\n\
Take a reading using the active measurement function, store it in the specified reading buffer, and return it as a \
number. If no bufferName is specified, then defbuffer1 is used. If the instrument is configured to take multiple \
readings, then only the last reading is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'read',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction readwithtime(bufferName)\n```\n\
\n\
smu.measure.readwithtime([bufferName]) -> number, number, number\n\
\n\
Returns `reading, seconds, fractional` where \
*reading* is the last reading of the measurement process, \
*seconds* is seconds since 1970-01-01 00:00:00 UTC, \
and *fractional* is fractional seconds.\n\
\n\
If bufferName is not specified, then defbuffer1 is used. If the instrument is configured to take multiple readings, \
then only the last reading is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'readwithtime',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.sense\n```\n\
\n\
Get or set the sensing method used during measurements to smu.SENSE_\\*. Defaults to smu.SENSE_2WIRE.\n\
\n\
When set to smu.SENSE_2WIRE, measurements are taken at the output connectors.\n\
\n\
When set to smu.SENSE_4WIRE, measurements are taken at the device under test\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle..'
        },
        kind: CompletionItemKind.Property,
        label: 'sense',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.terminals\n```\n\
\n\
Get or set the terminals used during measurements to smu.TERMINALS_\\*. Defaults to smu.TERMINALS_FRONT.\n\
\n\
Output is turned off before switching active terminals.'
        },
        kind: CompletionItemKind.Property,
        label: 'terminals',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.unit\n```\n\
\n\
Get or set the unit of measure for the active measurement function to smu.UNIT_\\*.\n\
\n\
When the measurement function is set to Current, the default is smu.UNIT_AMP.\n\
\n\
When the measurement function is set to Voltage, the default is smu.UNIT_VOLT.\n\
\n\
When the measurement function is set to Resistance, the default is smu.UNIT_OHM.\n\
\n\
The change in measurement units is displayed when the next measurement occurs.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'unit',
    },
    {
        data: { domains: ['measure', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.userdelay[N]\n```\n\
\n\
An array of available user delays for use by the Dynamic Delay block of the trigger model. Indexed from 1 to 5. Get \
or set the index to a number from +167e-9 to +10e+3 seconds or 0.\n\
\n\
If set to 0 seconds, then no delay is performed.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'userdelay',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'smu.measure.read([bufferName])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'smu.measure.readwithtime([bufferName])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.',
                label: 'bufferName',
            },
        ],
    },
]
