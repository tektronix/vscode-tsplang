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
import { CompletionItem, MarkupContent, MarkupContentCallback, ParameterInformation, SignatureInformation } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    [
        'smu.source.level',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.source.level\n\`\`\`\n\
\n\
Get or set the output level of the active source function as a number. Defaults to 0 for all source functions.\n\
\n\
When the source function is set to Current, the valid range of this attribute is \
${spec.current.measure.level.high * -1} to ${spec.current.measure.level.high}.\n\
\n\
When the source function is set to Voltage, the valid range of this attribute is \
${spec.voltage.source.rangeDefault * -1} to ${spec.voltage.source.rangeDefault}.\n\
\n\
If manual source ranging is enabled, then this attribute cannot exceed the present source range setting.`
    ],
    [
        'smu.source.range',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.source.range\n\`\`\`\n\
\n\
Get or set the source range of the active source function by passing the expected source level as a number.\n\
\n\
When the source function is set to Current, the valid range of this attribute is \
${spec.current.source.ranges[spec.current.source.ranges.length - 1] * -1} to \
${spec.current.source.ranges[spec.current.source.ranges.length - 1]} and defaults to \
${spec.current.source.rangeDefault}. Fixed Current ranges include ${spec.current.source.ranges.join(', ')}.\n\
\n\
When the source function is set to Voltage, this range is \
${spec.voltage.source.ranges[spec.voltage.source.ranges.length - 1] * -1} to \
${spec.voltage.source.ranges[spec.voltage.source.ranges.length - 1]} and defaults to \
${spec.voltage.source.rangeDefault}. Fixed Voltage ranges include ${spec.voltage.source.ranges.join(', ')}.\n\
\n\
While this attribute accepts any number in the applicable range, the instrument is set to the closest effective range \
less than supplied source level.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.`
    ],
])

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['smu'] },
        kind: CompletionItemKind.Module,
        label: 'source'
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.autodelay\n```\n\
\n\
Get or set the automatic delay that occurs when the source is turned on to smu.OFF or ON. Defaults to smu.ON.\n\
\n\
This attribute is automatically set to smu.OFF on manual source delay configuration.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'autodelay',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.autorange\n```\n\
\n\
Get or set the present autorange setting to smu.OFF or ON. Defaults to smu.ON. Only available for the Current and \
Voltage functions.\n\
\n\
When set to smu.ON, the instrument automatically sets the most appropriate sourcing range.\n\
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
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.delay\n```\n\
\n\
Get or set a source delay for the active source function to a number from 0 to 10 000 seconds.\n\
\n\
Setting this attribute automatically sets the source autodelay to smu.OFF. This attribute is overwritten if autodelay \
is re-enabled.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'delay',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.func\n```\n\
\n\
Get or set the active source function to smu.FUNC_DC_CURRENT or FUNC_DC_VOLTAGE. Defaults to smu.FUNC_DC_CURRENT.\n\
\n\
When the active source function is changed, settings that are retained on a per-function basis are also changed.'
        },
        kind: CompletionItemKind.Property,
        label: 'func',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.highc\n```\n\
\n\
Get or set the present high-capacitance mode setting to smu.ON or OFF. Defaults to smu.OFF.\n\
\n\
When measuring a current in the 1 µA range or above and driving a capacitive load, enable this attribute to prevent \
any overshoot, ringing, or instability.'
        },
        kind: CompletionItemKind.Property,
        label: 'highc',
    },
    {
        data: { domains: ['source', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.offmode\n```\n\
\n\
Get or set the instrument state when output is turned off to smu.OFFMODE_\\*. Defaults to smu.OFFMODE_NORMAL.'
        },
        kind: CompletionItemKind.Property,
        label: 'offmode',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.output\n```\n\
\n\
Get or set the present source output state to smu.ON or OFF. Defaults to smu.OFF.'
        },
        kind: CompletionItemKind.Property,
        label: 'output',
    },
    {
        data: { domains: ['source', 'smu'] },
        kind: CompletionItemKind.Property,
        label: 'range',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.readback\n```\n\
\n\
Get or set the present source readback setting to smu.OFF or ON. Defaults to smu.ON.\n\
\n\
When source readback is set to smu.OFF, the front-panel displays the present value of the source level attribute in \
addition to recording it in the buffer alongside each measurement.\n\
\n\
When source readback is set to smu.ON, the actual source level is measured, displayed on the front-panel, and \
recorded in the buffer alongside each measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'readback',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sweeplinear(configListName, start, stop, points, delay, count, rangeType, \
failAbort, dual, bufferName)\n```\n\
\n\
smu.source.sweeplinear(configListName, start, stop, points[, delay][, count][, rangeType][, failAbort][, dual]\
[, bufferName])\n\
\n\
Configure a linear sweep for a fixed number of measurement points.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model. Initiate \
the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplinear',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sweeplinearstep(configListName, start, stop, step, delay, count, rangeType, \
failAbort, dual, bufferName)\n```\n\
\n\
smu.source.sweeplinearstep(configListName, start, stop, step[, delay][, count][, rangeType][, failAbort][, dual]\
[, bufferName])\n\
\n\
Configure a stepped linear sweep for a fixed number of measurement points.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model to perform a \
uniform series of ascending or descending output steps. Initiate the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplinearstep',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sweeplist(configListName, index, delay, count, failAbort, bufferName)\n```\n\
\n\
smu.source.sweeplist(configListName[, index][, delay][, count][, failAbort][, bufferName])\n\
\n\
Configure a custom sweep using the given configListName to specify each source level.\n\
\n\
Clears any existing trigger models, loads from the specified source configuration list, and populates the trigger \
model. Initiate the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplist',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction sweeplog(configListName, start, stop, points, delay, count, rangeType, \
failAbort, dual, bufferName, asymptote)\n```\n\
\n\
smu.source.sweeplog(configListName, start, stop, points[, delay][, count][, rangeType][, failAbort][, dual]\
[, bufferName][, asymptote])\n\
\n\
Configure a logarithmic sweep for a fixed number of measurement points.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model. Initiate \
the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplog',
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.measure.userdelay[N]\n```\n\
\n\
An array of available user delays for use by the Dynamic Delay block of the trigger model. Indexed from 1 to 5. Get \
or set the index to a number from 0 to +10e+3 seconds.\n\
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
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
            return [
                {
                    documentation: 'The source level at which to start sweeping as a number.\n\
Current range: %{0} to %{1}\n\
Voltage range: %{2} to %{3}'
                        .replace('%{0}', spec.current.measure.level.low.toString())
                        .replace('%{1}', spec.current.measure.level.high.toString())
                        .replace('%{2}', spec.voltage.measure.level.low.toString())
                        .replace('%{3}', spec.voltage.measure.level.high.toString()),
                    index: 1,
                    label: 'start'
                },
                {
                    documentation: 'The source level at which to stop sweeping as a number.\n\
Current range: %{0} to %{1}\n\
Voltage range: %{2} to %{3}'
                        .replace('%{0}', spec.current.measure.level.low.toString())
                        .replace('%{1}', spec.current.measure.level.high.toString())
                        .replace('%{2}', spec.voltage.measure.level.low.toString())
                        .replace('%{3}', spec.voltage.measure.level.high.toString()),
                    index: 2,
                    label: 'stop'
                },
            ]
        },
        label: 'smu.source.sweeplinear(configListName, start, stop, points[, delay][, count][, rangeType][, failAbort]\
[, dual][, bufferName])',
        parameters: [
            {
                documentation: 'The name of the source configuration list to create as a string.',
                label: 'configListName'
            },
            {
                documentation: 'The number of source-measure points between the start and stop values of the sweep as \
a number from +2.0 to +1e+6.',
                label: 'points'
            },
            {
                documentation: 'The delay between measurement points as a number from +50e-6 to +10e+3 seconds, 0 for \
no delay, or smu.DELAY_AUTO. Defaults to smu.DELAY_AUTO.',
                label: 'delay'
            },
            {
                documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
smu.INFINITE. Defaults to 1.',
                label: 'count'
            },
            {
                documentation: 'Some smu.RANGE_*. Defaults to smu.RANGE_BEST.',
                label: 'rangeType'
            },
            {
                documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
exceeded. Defaults to smu.ON.',
                label: 'failAbort'
            },
            {
                documentation: 'smu.OFF to sweep from start to stop only or smu.ON to sweep from start to stop, then \
back to start. Defaults to smu.OFF.',
                label: 'dual'
            },
            {
                documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
                label: 'bufferName'
            },
        ]
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
            return [
                {
                    documentation: 'The source level at which to start sweeping as a number.\n\
Current range: %{0} to %{1}\n\
Voltage range: %{2} to %{3}'
                        .replace('%{0}', spec.current.measure.level.low.toString())
                        .replace('%{1}', spec.current.measure.level.high.toString())
                        .replace('%{2}', spec.voltage.measure.level.low.toString())
                        .replace('%{3}', spec.voltage.measure.level.high.toString()),
                    index: 1,
                    label: 'start'
                },
                {
                    documentation: 'The source level at which to stop sweeping as a number.\n\
Current range: %{0} to %{1}\n\
Voltage range: %{2} to %{3}'
                        .replace('%{0}', spec.current.measure.level.low.toString())
                        .replace('%{1}', spec.current.measure.level.high.toString())
                        .replace('%{2}', spec.voltage.measure.level.low.toString())
                        .replace('%{3}', spec.voltage.measure.level.high.toString()),
                    index: 2,
                    label: 'stop'
                },
            ]
        },
        label: 'smu.source.sweeplinearstep(configListName, start, stop, step[, delay][, count][, rangeType]\
[, failAbort][, dual][, bufferName])',
        parameters: [
            {
                documentation: 'The name of the source configuration list to create as a string.',
                label: 'configListName'
            },
            {
                documentation: 'The magnitude by which the output level will change for each step as a number greater \
than 0.',
                label: 'step'
            },
            {
                documentation: 'The delay between measurement points as a number from +50e-6 to +10e+3 seconds, 0 for \
no delay, or smu.DELAY_AUTO. Defaults to smu.DELAY_AUTO.',
                label: 'delay'
            },
            {
                documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
smu.INFINITE. Defaults to 1.',
                label: 'count'
            },
            {
                documentation: 'Some smu.RANGE_*. Defaults to smu.RANGE_BEST.',
                label: 'rangeType'
            },
            {
                documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
exceeded. Defaults to smu.ON.',
                label: 'failAbort'
            },
            {
                documentation: 'smu.OFF to sweep from start to stop only or smu.ON to sweep from start to stop, then \
back to start. Defaults to smu.OFF.',
                label: 'dual'
            },
            {
                documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
                label: 'bufferName'
            },
        ]
    },
    {
        documentation: undefined,
        label: 'smu.source.sweeplist(configListName[, index][, delay][, count][, failAbort][, bufferName])',
        parameters: [
            {
                documentation: 'The name of the source configuration list to load as a string.',
                label: 'configListName'
            },
            {
                documentation: 'A number that defines a specific configuration index in the configuration list. \
Defaults to the first configuration index.',
                label: 'index'
            },
            {
                documentation: 'The delay between measurement points as a number from +50e-6 to +10e+3 seconds or 0 \
for no delay.',
                label: 'delay'
            },
            {
                documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
smu.INFINITE. Defaults to 1.',
                label: 'count'
            },
            {
                documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
exceeded. Defaults to smu.ON.',
                label: 'failAbort'
            },
            {
                documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
                label: 'bufferName'
            },
        ]
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
            return [
                {
                    documentation: 'The source level at which to start sweeping as a number.\n\
Current range: %{0} to %{1}\n\
Voltage range: %{2} to %{3}'
                        .replace('%{0}', spec.smuSourceSweepLog.currentLevelLow.toString())
                        .replace('%{1}', spec.current.measure.level.high.toString())
                        .replace('%{2}', spec.smuSourceSweepLog.voltageLevelLow.toString())
                        .replace('%{3}', spec.voltage.measure.level.high.toString()),
                    index: 1,
                    label: 'start'
                },
                {
                    documentation: 'The source level at which to stop sweeping as a number.\n\
Current range: %{0} to %{1}\n\
Voltage range: %{2} to %{3}'
                        .replace('%{0}', spec.smuSourceSweepLog.currentLevelLow.toString())
                        .replace('%{1}', spec.current.measure.level.high.toString())
                        .replace('%{2}', spec.smuSourceSweepLog.voltageLevelLow.toString())
                        .replace('%{3}', spec.voltage.measure.level.high.toString()),
                    index: 2,
                    label: 'stop'
                },
            ]
        },
        label: 'smu.source.sweeplog(configListName, start, stop, points[, delay][, count][, rangeType][, failAbort]\
[, dual][, bufferName][, asymptote])',
        parameters: [
            {
                documentation: 'The name of the source configuration list to create as a string.',
                label: 'configListName'
            },
            {
                documentation: 'The number of source-measure points between the start and stop values of the sweep as \
a number from +2.0 to +1e+6.',
                label: 'points'
            },
            {
                documentation: 'The delay between measurement points as a number from +50e-6 to +10e+3 seconds, 0 for \
no delay, or smu.DELAY_AUTO. Defaults to smu.DELAY_AUTO.',
                label: 'delay'
            },
            {
                documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
smu.INFINITE. Defaults to 1.',
                label: 'count'
            },
            {
                documentation: 'Some smu.RANGE_*. Defaults to smu.RANGE_BEST.',
                label: 'rangeType'
            },
            {
                documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
exceeded. Defaults to smu.ON.',
                label: 'failAbort'
            },
            {
                documentation: 'smu.OFF to sweep from start to stop only or smu.ON to sweep from start to stop, then \
back to start. Defaults to smu.OFF.',
                label: 'dual'
            },
            {
                documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
                label: 'bufferName'
            },
            {
                documentation: 'The value of the asymtotic curve at either positive or negative infinity, depending \
on the direction of the sweep. Defaults to 0.\n\
Asymtotic value cannot be less than or equal to the sweep bounds.',
                label: 'asymptote'
            },
        ]
    },
]
