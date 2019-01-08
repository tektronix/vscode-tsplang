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

import { DefaultFillValue, InstrumentSpec } from '..'
import { CompletionItem, MarkupContent, MarkupContentCallback, ParameterInformation, SignatureInformation } from '../../decorators'

export const completionDocs: Map<string, MarkupContentCallback> = new Map([
    // tslint:disable:max-line-length no-magic-numbers
    [
        'smu.source.level',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.source.level\n\`\`\`\n\
\n\
Get or set the output level of the active source function as a number. Defaults to 0 for all source functions.\n\
\n\
When the source function is set to Current, the valid range of this attribute is \
${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} \
to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}.\n\
\n\
When the source function is set to Voltage, the valid range of this attribute is \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} \
to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}.\n\
\n\
If manual source ranging is enabled, then this attribute cannot exceed the present source range setting.`
    ],
    // tslint:enable:max-line-length no-magic-numbers
    [
        'smu.source.range',
        (spec: InstrumentSpec): MarkupContent => MarkupContent`\
\`\`\`lua\nsmu.source.range\n\`\`\`\n\
\n\
Get or set the source range of the active source function by passing the expected source level as a number.\n\
\n\
When the source function is set to Current, the valid range of this attribute is \
${spec.ranges.current[spec.ranges.current.length - 1] * -1} to ${spec.ranges.current[spec.ranges.current.length - 1]} \
and defaults to ${spec.ranges.current[0]}. Fixed Current ranges include ${spec.ranges.current.join(', ')}.\n\
\n\
When the source function is set to Voltage, this range is \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1} to ${spec.ranges.voltage[spec.ranges.voltage.length - 1]} \
and defaults to ${spec.ranges.voltage[0]}. Fixed Voltage ranges include ${spec.ranges.voltage.join(', ')}.\n\
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
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pulsesweeplinear(configListName, biasLevel, start, stop, points, width, \
measEnable, bufferName, delay, offTime, count, biasLimit, pulseLimit, failAbort, dual)\n```\n\
\n\
smu.source.pulsesweeplinear(configListName, biasLevel, start, stop, points, width\
[, measEnable][, bufferName][, delay][, offTime][, count][, biasLimit][, pulseLimit][, failAbort][, dual])\n\
\n\
Configure a linear pulse sweep for a fixed number of pulse points.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model. Initiate \
the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'pulsesweeplinear'
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pulsesweeplinearstep(configListName, biasLevel, start, stop, step, width, \
measEnable, bufferName, delay, offTime, count, biasLimit, pulseLimit, failAbort, dual)\n```\n\
\n\
smu.source.pulsesweeplinearstep(configListName, biasLevel, start, stop, step, width\
[, measEnable][, bufferName][, delay][, offTime][, count][, biasLimit][, pulseLimit][, failAbort][, dual])\n\
\n\
Configure a linear pulse sweep for a fixed number of pulse steps.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model to perform a \
uniform series of ascending or descending output steps. Initiate the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'pulsesweeplinearstep'
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pulsesweeplist(configListName, width, measEnable, bufferName, index, count, \
delay, offTime, failAbort)\n```\n\
\n\
smu.source.pulsesweeplist(configListName, width[, measEnable][, bufferName][, index][, count][, delay][, offTime]\
[, failAbort])\n\
\n\
Configure a custom pulse sweep using the given configListName to specify each pulse level.\n\
\n\
Clears any existing trigger models, loads from the specified source configuration list, and populates the trigger \
model. Initiate the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'pulsesweeplist'
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pulsesweeplog(configListName, biasLevel, start, stop, points, width, measEnable, \
bufferName, delay, offTime, count, biasLimit, pulseLimit, failAbort, dual, asymptote)\n```\n\
\n\
smu.source.pulsesweeplog(configListName, biasLevel, start, stop, points, width[, measEnable][, bufferName][, delay]\
[, offTime][, count][, biasLimit][, pulseLimit][, failAbort][, dual][, asymptote])\n\
\n\
Configure a logarithmic pulse sweep for a fixed number of source points.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model. Initiate \
the trigger model to start the sweep.'
        },
        kind: CompletionItemKind.Function,
        label: 'pulsesweeplog'
    },
    {
        data: { domains: ['source', 'smu'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction pulsetrain(configListName, biasLevel, pulseLevel, pulseWidth, count, measEnable, \
bufferName, delay, offTime, biasLimit, pulseLimit, failAbort)\n```\n\
\n\
smu.source.pulsetrain(configListName, biasLevel, pulseLevel, pulseWidth, count[, measEnable][, bufferName][, delay]\
[, offTime][, biasLimit][, pulseLimit][, failAbort])\n\
\n\
Configure a series of source pulses.\n\
\n\
Clears any existing trigger models, creates a source configuration list, and populates the trigger model. Initiate \
the trigger model to start the pulse train.'
        },
        kind: CompletionItemKind.Function,
        label: 'pulsetrain'
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
//     {
//         documentation: undefined,
//         getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
//             return [
//                 {
//                     documentation: `The source level to output before and after each pulse.\n\
// Current range: ${(spec.current.pulse) ? spec.current.pulse.bias.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage range: ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 1,
//                     label: 'biasLevel'
//                 },
//                 {
//                     documentation: `The source level at which the pulse sweep starts as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 2,
//                     label: 'start'
//                 },
//                 {
//                     documentation: `The source level at which the pulse sweep stops as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 3,
//                     label: 'stop'
//                 },
//                 {
//                     documentation: `The output time of each pulse as a number in seconds.\n\
// Extended operating area (\
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.currentSource : DefaultFillValue}A at \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.voltageSource : DefaultFillValue}V, \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.high : DefaultFillValue} (load dependent)\n\
// Normal operating area (DC, \
// ${(spec.operatingArea) ? spec.operatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.high : DefaultFillValue}`,
//                     index: 5,
//                     label: 'width'
//                 },
//                 {
//                     documentation: `The output limit for the given biasLevel as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 11,
//                     label: 'biasLimit'
//                 },
//                 {
//                     documentation: `The output limit for each pulse as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 12,
//                     label: 'pulseLimit'
//                 },
//             ]
//         },
//         label: 'smu.source.pulsesweeplinear(configListName, biasLevel, start, stop, points, width[, measEnable]\
// [, bufferName][, delay][, offTime][, count][, biasLimit][, pulseLimit][, failAbort][, dual])',
//         parameters: [
//             {
//                 documentation: 'The name of the source configuration list to use as a string.',
//                 label: 'configListName'
//             },
//             // 1) biasLevel
//             // 2) start
//             // 3) stop
//             {
//                 documentation: 'The number of pulse-measure points between the start and stop values of the pulse \
// sweep as a number from +2.0 to +1e+6.',
//                 label: 'points'
//             },
//             // 5) width
//             {
//                 documentation: 'smu.ON to take a measurement at the top of each pulse or smu.OFF to disable pulse \
// measurements. Defaults to smu.ON',
//                 label: 'measEnable'
//             },
//             {
//                 documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
// name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
//                 label: 'bufferName'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel before each pulse as a number from \
// 0 to +10e+3 seconds. Defaults to 0.',
//                 label: 'delay'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel after each pulse as a number from 0 \
// to +10e+3 seconds. Defaults to 0.',
//                 label: 'offTime'
//             },
//             {
//                 documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
// smu.INFINITE. Defaults to 1.',
//                 label: 'count'
//             },
//             // 11) biasLimit
//             // 12) pulseLimit
//             {
//                 documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
// exceeded. Defaults to smu.ON.',
//                 label: 'failAbort'
//             },
//             {
//                 documentation: 'smu.OFF to sweep from start to stop only or smu.ON to sweep from start to stop, then \
// back to start. Defaults to smu.OFF.',
//                 label: 'dual'
//             },
//         ]
//     },
//     {
//         documentation: undefined,
//         getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
//             return [
//                 {
//                     documentation: `The source level to output before and after each pulse.\n\
// Current range: ${(spec.current.pulse) ? spec.current.pulse.bias.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage range: ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 1,
//                     label: 'biasLevel'
//                 },
//                 {
//                     documentation: `The source level at which the pulse sweep starts as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 2,
//                     label: 'start'
//                 },
//                 {
//                     documentation: `The source level at which the pulse sweep stops as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 3,
//                     label: 'stop'
//                 },
//                 {
//                     documentation: `The output time of each pulse as a number in seconds.\n\
// Extended operating area (\
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.currentSource : DefaultFillValue}A at \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.voltageSource : DefaultFillValue}V, \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.high : DefaultFillValue} (load dependent)\n\
// Normal operating area (DC, \
// ${(spec.operatingArea) ? spec.operatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.high : DefaultFillValue}`,
//                     index: 5,
//                     label: 'width'
//                 },
//                 {
//                     documentation: `The output limit for the given biasLevel as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 11,
//                     label: 'biasLimit'
//                 },
//                 {
//                     documentation: `The output limit for each pulse as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 12,
//                     label: 'pulseLimit'
//                 },
//             ]
//         },
//         label: 'smu.source.pulsesweeplinearstep(configListName, biasLevel, start, stop, step, width[, measEnable]\
// [, bufferName][, delay][, offTime][, count][, biasLimit][, pulseLimit][, failAbort][, dual])',
//         parameters: [
//             {
//                 documentation: 'The name of the source configuration list to use as a string.',
//                 label: 'configListName'
//             },
//             // 1) biasLevel
//             // 2) start
//             // 3) stop
//             {
//                 documentation: 'The magnitude by which the output level will change for each step as a number greater \
// than 0.',
//                 label: 'step'
//             },
//             // 5) width
//             {
//                 documentation: 'smu.ON to take a measurement at the top of each pulse or smu.OFF to disable pulse \
// measurements. Defaults to smu.ON',
//                 label: 'measEnable'
//             },
//             {
//                 documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
// name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
//                 label: 'bufferName'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel before each pulse as a number from \
// 0 to +10e+3 seconds. Defaults to 0.',
//                 label: 'delay'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel after each pulse as a number from 0 \
// to +10e+3 seconds. Defaults to 0.',
//                 label: 'offTime'
//             },
//             {
//                 documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
// smu.INFINITE. Defaults to 1.',
//                 label: 'count'
//             },
//             // 11) biasLimit
//             // 12) pulseLimit
//             {
//                 documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
// exceeded. Defaults to smu.ON.',
//                 label: 'failAbort'
//             },
//             {
//                 documentation: 'smu.OFF to sweep from start to stop only or smu.ON to sweep from start to stop, then \
// back to start. Defaults to smu.OFF.',
//                 label: 'dual'
//             },
//         ]
//     },
//     {
//         documentation: undefined,
//         getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
//             return [
//                 {
//                     documentation: `The output time of each pulse as a number in seconds.\n\
// Extended operating area (\
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.currentSource : DefaultFillValue}A at \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.voltageSource : DefaultFillValue}V, \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.high : DefaultFillValue} (load dependent)\n\
// Normal operating area (DC, \
// ${(spec.operatingArea) ? spec.operatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.high : DefaultFillValue}`,
//                     index: 1,
//                     label: 'width'
//                 },
//             ]
//         },
//         label: 'smu.source.pulsesweeplist(configListName, width[, measEnable][, bufferName][, index][, count][, delay]\
// [, offTime][, failAbort])',
//         parameters: [
//             {
//                 documentation: 'The name of the source configuration list to use as a string.',
//                 label: 'configListName'
//             },
//             // 1) width
//             {
//                 documentation: 'smu.ON to take a measurement at the top of each pulse or smu.OFF to disable pulse \
// measurements. Defaults to smu.ON',
//                 label: 'measEnable'
//             },
//             {
//                 documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
// name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
//                 label: 'bufferName'
//             },
//             {
//                 documentation: 'A number that defines a specific configuration index in the configuration list. \
// Defaults to the first configuration index.',
//                 label: 'index'
//             },
//             {
//                 documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
// smu.INFINITE. Defaults to 1.',
//                 label: 'count'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel before each pulse as a number from \
// 0 to +10e+3 seconds. Defaults to 0.',
//                 label: 'delay'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel after each pulse as a number from 0 \
// to +10e+3 seconds. Defaults to 0.',
//                 label: 'offTime'
//             },
//             {
//                 documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
// exceeded. Defaults to smu.ON.',
//                 label: 'failAbort'
//             },
//         ]
//     },
//     {
//         documentation: undefined,
//         getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
//             return [
//                 {
//                     documentation: `The source level to output before and after each pulse.\n\
// Current range: ${(spec.current.pulse) ? spec.current.pulse.bias.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage range: ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 1,
//                     label: 'biasLevel'
//                 },
//                 {
//                     documentation: `The source level at which the pulse sweep starts as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 2,
//                     label: 'start'
//                 },
//                 {
//                     documentation: `The source level at which the pulse sweep stops as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 3,
//                     label: 'stop'
//                 },
//                 {
//                     documentation: `The output time of each pulse as a number in seconds.\n\
// Extended operating area (\
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.currentSource : DefaultFillValue}A at \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.voltageSource : DefaultFillValue}V, \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.high : DefaultFillValue} (load dependent)\n\
// Normal operating area (DC, \
// ${(spec.operatingArea) ? spec.operatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.high : DefaultFillValue}`,
//                     index: 5,
//                     label: 'width'
//                 },
//                 {
//                     documentation: `The output limit for the given biasLevel as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 11,
//                     label: 'biasLimit'
//                 },
//                 {
//                     documentation: `The output limit for each pulse as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 12,
//                     label: 'pulseLimit'
//                 },
//             ]
//         },
//         label: 'smu.source.pulsesweeplog(configListName, biasLevel, start, stop, points, width[, measEnable]\
// [, bufferName][, delay][, offTime][, count][, biasLimit][, pulseLimit][, failAbort][, dual][, asymptote])',
//         parameters: [
//             {
//                 documentation: 'The name of the source configuration list to use as a string.',
//                 label: 'configListName'
//             },
//             // 1) biasLevel
//             // 2) start
//             // 3) stop
//             {
//                 documentation: 'The number of pulse-measure points between the start and stop values of the pulse \
// sweep as a number from +2.0 to +1e+6.',
//                 label: 'points'
//             },
//             // 5) width
//             {
//                 documentation: 'smu.ON to take a measurement at the top of each pulse or smu.OFF to disable pulse \
// measurements. Defaults to smu.ON',
//                 label: 'measEnable'
//             },
//             {
//                 documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
// name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
//                 label: 'bufferName'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel before each pulse as a number from \
// 0 to +10e+3 seconds. Defaults to 0.',
//                 label: 'delay'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel after each pulse as a number from 0 \
// to +10e+3 seconds. Defaults to 0.',
//                 label: 'offTime'
//             },
//             {
//                 documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
// smu.INFINITE. Defaults to 1.',
//                 label: 'count'
//             },
//             // 11) biasLimit
//             // 12) pulseLimit
//             {
//                 documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
// exceeded. Defaults to smu.ON.',
//                 label: 'failAbort'
//             },
//             {
//                 documentation: 'smu.OFF to sweep from start to stop only or smu.ON to sweep from start to stop, then \
// back to start. Defaults to smu.OFF.',
//                 label: 'dual'
//             },
//             {
//                 documentation: 'The value of the asymptotic curve at either positive or negative infinity, depending \
// on the direction of the sweep. Defaults to 0.\n\
// Asymtotic value cannot be less than or equal to the sweep bounds.',
//                 label: 'asymptote'
//             },
//         ]
//     },
//     {
//         documentation: undefined,
//         getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
//             return [
//                 {
//                     documentation: `The source level to output before and after each pulse.\n\
// Current range: ${(spec.current.pulse) ? spec.current.pulse.bias.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage range: ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 1,
//                     label: 'biasLevel'
//                 },
//                 {
//                     documentation: `The source level to output during each pulse (from 0).\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high * -1 : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 2,
//                     label: 'pulseLevel'
//                 },
//                 {
//                     documentation: `The output time of each pulse as a number in seconds.\n\
// Extended operating area (\
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.currentSource : DefaultFillValue}A at \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.voltageSource : DefaultFillValue}V, \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.extendedOperatingArea) ? spec.extendedOperatingArea.sourceTime.high : DefaultFillValue} (load dependent)\n\
// Normal operating area (DC, \
// ${(spec.operatingArea) ? spec.operatingArea.percentDutyCycle : DefaultFillValue}% duty cycle): \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.low : DefaultFillValue} to \
// ${(spec.operatingArea) ? spec.operatingArea.sourceTime.high : DefaultFillValue}`,
//                     index: 3,
//                     label: 'pulseWidth'
//                 },
//                 {
//                     documentation: `The output limit for the given biasLevel as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.bias.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.bias.high : DefaultFillValue}`,
//                     index: 9,
//                     label: 'biasLimit'
//                 },
//                 {
//                     documentation: `The output limit for each pulse as a number.\n\
// Current: ${(spec.current.pulse) ? spec.current.pulse.range.low : DefaultFillValue} to \
// ${(spec.current.pulse) ? spec.current.pulse.range.high : DefaultFillValue}\n\
// Voltage: ${(spec.voltage.pulse) ? spec.voltage.pulse.range.low : DefaultFillValue} to \
// ${(spec.voltage.pulse) ? spec.voltage.pulse.range.high : DefaultFillValue}`,
//                     index: 10,
//                     label: 'pulseLimit'
//                 },
//             ]
//         },
//         label: 'smu.source.pulsetrain(configListName, biasLevel, pulseLevel, pulseWidth, count[, measEnable]\
// [, bufferName][, delay][, offTime][, biasLimit][, pulseLimit][, failAbort])',
//         parameters: [
//             {
//                 documentation: 'The name of the source configuration list to use as a string.',
//                 label: 'configListName'
//             },
//             // 1) biasLevel
//             // 2) pulseLevel
//             // 3) pulseWidth
//             {
//                 documentation: 'The number of times to run the sweep as a number from 1 to 268 435 455 or \
// smu.INFINITE. Defaults to 1.',
//                 label: 'count'
//             },
//             {
//                 documentation: 'smu.ON to take a measurement at the top of each pulse or smu.OFF to disable pulse \
// measurements. Defaults to smu.ON',
//                 label: 'measEnable'
//             },
//             {
//                 documentation: 'The name of a reading buffer; the default buffers (defbuffer1 or defbuffer2) or the \
// name of a user‑defined buffer; if no buffer is specified, this parameter defaults to defbuffer1.',
//                 label: 'bufferName'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel before each pulse as a number from \
// 0 to +10e+3 seconds. Defaults to 0.',
//                 label: 'delay'
//             },
//             {
//                 documentation: 'The amount of time to stay at the given biasLevel after each pulse as a number from 0 \
// to +10e+3 seconds. Defaults to 0.',
//                 label: 'offTime'
//             },
//             // 9) biasLimit
//             // 10) pulseLimit
//             {
//                 documentation: 'smu.ON to abort the sweep if the source limit is exceeded or smu.OFF to complete if \
// exceeded. Defaults to smu.ON.',
//                 label: 'failAbort'
//             },
//         ]
//     },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
            // tslint:disable:max-line-length no-magic-numbers
            return [
                {
                    documentation: `The source level at which to start sweeping as a number.\n\
Current range: ${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}\n\
Voltage range: ${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}`,
                    index: 1,
                    label: 'start'
                },
                {
                    documentation: `The source level at which to stop sweeping as a number.\n\
Current range: ${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}\n\
Voltage range: ${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}`,
                    index: 2,
                    label: 'stop'
                },
            ]
            // tslint:enable:max-line-length no-magic-numbers
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
            // tslint:disable:max-line-length no-magic-numbers
            return [
                {
                    documentation: `The source level at which to start sweeping as a number.\n\
Current range: ${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}\n\
Voltage range: ${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}`,
                    index: 1,
                    label: 'start'
                },
                {
                    documentation: `The source level at which to stop sweeping as a number.\n\
Current range: ${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}\n\
Voltage range: ${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}`,
                    index: 2,
                    label: 'stop'
                },
            ]
            // tslint:enable:max-line-length no-magic-numbers
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
            // tslint:disable:max-line-length no-magic-numbers
            return [
                {
                    documentation: `The source level at which to start sweeping as a number.\n\
Current range: ${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}\n\
Voltage range: ${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}`,
                    index: 1,
                    label: 'start'
                },
                {
                    documentation: `The source level at which to stop sweeping as a number.\n\
Current range: ${spec.ranges.current[spec.ranges.current.length - 1] * -1.05} to \
${spec.ranges.current[spec.ranges.current.length - 1] * 1.05}\n\
Voltage range: ${spec.ranges.voltage[spec.ranges.voltage.length - 1] * -1.05} to \
${spec.ranges.voltage[spec.ranges.voltage.length - 1] * 1.05}`,
                    index: 2,
                    label: 'stop'
                },
            ]
            // tslint:enable:max-line-length no-magic-numbers
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
                documentation: 'The value of the asymptotic curve at either positive or negative infinity, depending \
on the direction of the sweep. Defaults to 0.\n\
Asymtotic value cannot be less than or equal to the sweep bounds.',
                label: 'asymptote'
            },
        ]
    },
]
