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

/* TODO: CompletionItem.documentation.value */

const smuSourceCompletions: Array<CompletionItem> = [
    {
        data: ['smu'],
        kind: CompletionItemKind.Module,
        label: 'source'
    },
    {
        data: ['source', 'smu'],
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
        data: ['source', 'smu'],
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
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets a delay for the selected source function. This delay is in addition to normal settling times.\n\nAfter the programmed source is turned on, this delay allows the source level to settle before a measurement is made.\n\nIf you set a specific source delay (smu.source.delay), source autodelay is turned off.\n\nWhen source autodelay is turned on, the manual source delay setting is overwritten with the autodelay setting.\n\nWhen either a source delay or autodelay is set, the delay is applied to the first source output and then only when the magnitude of the source changes.'
        },
        kind: CompletionItemKind.Property,
        label: 'delay',
    },
    {
        data: ['source', 'smu'],
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
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the instrument is measuring low current and is driving a capacitive load, you may see overshoot, ringing, and instability. You can enable the high capacitance mode to minimize these problems.\n\nThe settings for high‑capacitance mode apply when you operate the instrument using the 1µA and above current ranges. When operating using the 1 A range, the high-capacitance setting will not affect the instrument rise time or current measure settling time.\n\nUse this command with limited autorange (low) with the low range set to 1 µA.'
        },
        kind: CompletionItemKind.Property,
        label: 'highc',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets the output level of the voltage or current source. If the output is on, the new level is sourced immediately.\n\nThe sign of the source level dictates the polarity of the source. Positive values generate positive voltage or current from the high terminal of the source relative to the low terminal. Negative values generate negative voltage or current from the high terminal of the source relative to the low terminal.\n\nIf a manual source range is selected, the level cannot exceed the specified range. For example, if the voltage source is on the 2V range (auto range is disabled), you cannot set the voltage source amplitude to 3V. When auto range is selected, the amplitude can be set to any level.'
        },
        kind: CompletionItemKind.Property,
        label: 'level',
    },
    {
        data: ['source', 'smu'],
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
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the output is switched on, the instrument sources either voltage or current, as set by smu.source.func.'
        },
        kind: CompletionItemKind.Property,
        label: 'output',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nsmu.source.range\n```\n\
\n\
Get or set the source range of the active source function by passing the expected source level as a number.\n\
\n\
When the source function is set to Current, the valid range of this attribute is -1.0 to +1.0 and defaults to +1e-8.\n\
\n\
When the source function is set to Voltage, this range is -200.0 to +200.0 and defaults to +2e-2.\n\
\n\
While this attribute accepts any number in the applicable range, the instrument is set to the closest effective range \
less than supplied source level.\n\
\n\
This attribute is saved with the active function and retained until the next instrument reset or power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'range',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When source readback is off, the instrument records and displays the source value you set. When you use the actual source value (source readback on), the instrument measures the actual source value immediately before making the device under test measurement.\n\nUsing source readback results in more accurate measurements, but also a reduction in measurement speed.\n\nWhen source readback is on, the front-panel display shows the measured source value and the buffer records the measured source value immediately before the device‑under‑test measurement. When source readback is off, the front-panel display shows the configured source value and the buffer records the configured source value immediately before the device‑under‑test measurement.'
        },
        kind: CompletionItemKind.Property,
        label: 'readback',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the sweep is started, the instrument sources a specific voltage or current value to the device under test (DUT). A measurement is made for each point of the sweep.\n\nWhen the sweep command is sent, it clears any existing trigger models, creates a source configuration list, and populates the trigger model. To run the sweep, initiate the trigger model.\n\nThe sweep continues until the source outputs the specified stop level. At this level, the instrument performs another measurement and then stops the sweep.\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the sweep delay, the actual delay is 35 ms.\n\nThe range type specifies the source range that is used for the sweep. You can select the following options:'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplinear',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the sweep is started, the instrument sources a specific voltage or current voltage to the device under test (DUT). A measurement is made for each point of the sweep.\n\nWhen the sweep command is sent, it deletes the existing trigger model and creates a trigger model with a uniform series of ascending or descending voltage or current changes, called steps. To run the sweep, initiate the trigger model.\n\nThe sweep continues until the source outputs the stop level, which is calculated from the number of steps. A measurement is performed at each source step (including the start and stop levels). At this level, the instrument performs another measurement and then stops the sweep.\n\nThe instrument uses the step size parameter to determine the number of source level changes. The source level changes in equal steps from the start level to the stop level. To avoid a setting conflicts error, make sure the step size is greater than the start value and less than the stop value. To calculate the number of source-measure points in a sweep, use the following formula:\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the delay in the for the log sweep command, the actual delay is 35 ms.\n\nThe range type specifies the source range that is used for the sweep. You can select the following options:'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplinearstep',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command allows you to set up a custom sweep, using a configuration list to specify the source levels.\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the delay in the for the log sweep command, the actual delay is 35 ms.\n\nTo run the sweep, initiate the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplist',
    },
    {
        data: ['source', 'smu'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the sweep is started, the instrument sources a specific voltage or current value to the device under test (DUT). A measurement is made for each point of the sweep.\n\nWhen the sweep command is sent, it clears the existing trigger model and creates a new trigger model. To run the sweep, initiate the trigger model.\n\nThe sweep continues until the source outputs the specified stop level. At this level, the instrument performs another measurement and then stops the sweep.\n\nWhen you specify a delay, a delay block is added to the sweep trigger model. This delay is added to any source delay you may have set. For example, if you set 10 ms for the source delay and 25 ms for the delay in the for the log sweep command, the actual delay is 35 ms.\n\nThe range type specifies the source range that is used for the sweep. You can select the following options:\n\nThe asymptote changes the inflection of the sweep curve and allows it to sweep through zero. You can use the asymptote parameter to customize the inflection and offset of the source value curve. Setting this parameter to zero provides a conventional logarithmic sweep. The asymptote value is the value that the curve has at either positive or negative infinity, depending on the direction of the sweep. The asymptote value must not be equal to or between the starting and ending values. It must be outside the range defined by the starting and ending values.'
        },
        kind: CompletionItemKind.Function,
        label: 'sweeplog',
    },
    {
        data: ['source', 'smu'],
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

const smuSourceSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'smu.source.sweeplinear(configListName, start, stop, points[, delay][, count][, rangeType][, failAbort][, dual][, bufferName])',
        undefined,
        ParameterInformation.create(
            'configListName',
            'A string that contains the name of the configuration list that the instrument will create for this sweep.'
        ),
        ParameterInformation.create(
            'start',
            'The voltage or current source level at which the sweep starts:\nCurrent: -1.05 A to 1.05 A\nVoltage: -210 V to 210 V.'
        ),
        ParameterInformation.create(
            'stop',
            'The voltage or current at which the sweep stops:\nCurrent: -1.05 A to 1.05 A\nVoltage: -210 V to 210 V.'
        ),
        ParameterInformation.create(
            'points',
            'The number of source-measure points between the start and stop values of the sweep (2 to 1e6); to calculate the number of source-measure points in a sweep, use the following formula:\nPoints = [(Stop - Start) / Step] + 1'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is `smu.DELAY_AUTO`, which enables autodelay, or a specific delay value from 50 μs to 10 ks, or 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: `smu.INFINITE`\nFinite loop: 1 to 268,435,455'
        ),
        ParameterInformation.create(
            'rangeType',
            'One of:\n`smu.RANGE_AUTO`\n`smu.RANGE_BEST` (default)\n`smu.RANGE_FIXED`'
        ),
        ParameterInformation.create(
            'failAbort',
            '`smu.ON` to abort the sweep if the source limit is exceeded (default) or `smu.OFF` to complete if exceeded.'
        ),
        ParameterInformation.create(
            'dual',
            '`smu.OFF` to sweep from start to stop only (default) or `smu.ON` to sweep from start to stop, then stop to start.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of a reading buffer; the default buffers (`defbuffer1` or `defbuffer2`) or the name of a user‑defined buffer; if no buffer is specified, this parameter defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplinearstep(configListName, start, stop, step[, delay][, count][, rangeType][, failAbort][, dual][, bufferName])',
        undefined,
        ParameterInformation.create(
            'configListName',
            'A string that contains the name of the configuration list that the instrument will create for this sweep.'
        ),
        ParameterInformation.create(
            'start',
            'The voltage or current source level at which the sweep starts:\nCurrent: -1.05 A to 1.05 A\nVoltage: -210 V to 210 V.'
        ),
        ParameterInformation.create(
            'stop',
            'The voltage or current at which the sweep stops:\nCurrent: -1.05 A to 1.05 A\nVoltage: -210 V to 210 V.'
        ),
        ParameterInformation.create(
            'step',
            'A step size > 0 at which the source level will change.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is `smu.DELAY_AUTO`, which enables autodelay, or a specific delay value from 50 μs to 10 ks, or 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: `smu.INFINITE`\nFinite loop: 1 to 268,435,455'
        ),
        ParameterInformation.create(
            'rangeType',
            'One of:\n`smu.RANGE_AUTO`\n`smu.RANGE_BEST` (default)\n`smu.RANGE_FIXED`'
        ),
        ParameterInformation.create(
            'failAbort',
            '`smu.ON` to abort the sweep if the source limit is exceeded (default) or `smu.OFF` to complete if exceeded.'
        ),
        ParameterInformation.create(
            'dual',
            '`smu.OFF` to sweep from start to stop only (default) or `smu.ON` to sweep from start to stop, then stop to start.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of a reading buffer; the default buffers (`defbuffer1` or `defbuffer2`) or the name of a user‑defined buffer; if no buffer is specified, this parameter defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplist(configListName[, index][, delay][, count][, failAbort][, bufferName])',
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
            'The delay between measurement points from 50 μs to 10 ks; default is 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: `smu.INFINITE`\nFinite loop: 1 to 268,435,455'
        ),
        ParameterInformation.create(
            'failAbort',
            '`smu.ON` to abort the sweep if the source limit is exceeded (default) or `smu.OFF` to complete if exceeded.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of a reading buffer; the default buffers (`defbuffer1` or `defbuffer2`) or the name of a user‑defined buffer; if no buffer is specified, this parameter defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'smu.source.sweeplog(configListName, start, stop, points[, delay][, count][, rangeType][, failAbort][, dual][, bufferName][, asymptote])',
        undefined,
        ParameterInformation.create(
            'configListName',
            'A string that contains the name of the configuration list that the instrument will create for this sweep.'
        ),
        ParameterInformation.create(
            'start',
            'The voltage or current source level at which the sweep starts:\nCurrent: 1 pA to 1.05 A\nVoltage: 1 pV to 210 V.'
        ),
        ParameterInformation.create(
            'stop',
            'The voltage or current at which the sweep stops:\nCurrent: 1 pA to 1.05 A\nVoltage: 1 pV to 210 V.'
        ),
        ParameterInformation.create(
            'points',
            'The number of source-measure points between the start and stop values of the sweep (2 to 1e6); to calculate the number of source-measure points in a sweep, use the following formula:\nPoints = [(Stop - Start) / Step] + 1'
        ),
        ParameterInformation.create(
            'delay',
            'The delay between measurement points; default is `smu.DELAY_AUTO`, which enables autodelay, or a specific delay value from 50 μs to 10 ks, or 0 for no delay.'
        ),
        ParameterInformation.create(
            'count',
            'The number of times to run the sweep; default is 1:\nInfinite loop: `smu.INFINITE`\nFinite loop: 1 to 268,435,455'
        ),
        ParameterInformation.create(
            'rangeType',
            'One of:\n`smu.RANGE_AUTO`\n`smu.RANGE_BEST` (default)\n`smu.RANGE_FIXED`'
        ),
        ParameterInformation.create(
            'failAbort',
            '`smu.ON` to abort the sweep if the source limit is exceeded (default) or `smu.OFF` to complete if exceeded.'
        ),
        ParameterInformation.create(
            'dual',
            '`smu.OFF` to sweep from start to stop only (default) or `smu.ON` to sweep from start to stop, then stop to start.'
        ),
        ParameterInformation.create(
            'bufferName',
            'A string that indicates the reading buffer; the default buffers (`defbuffer1` or `defbuffer2`) or the name of a user‑defined buffer; if no buffer is specified, `defbuffer1` is used.'
        ),
        ParameterInformation.create(
            'asymptote',
            'The value of the asymtotic curve at either positive or negative infinity, depending on the direction of the sweep.\nDefaults to 0, providing a logarithmic sweep.\n\nAsymtotic value cannot be equal to or within the sweep bounds as defined by `start` and `stop`.'
        ),
    ),
]

export async function getSmuSourceCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuSourceCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getSmuSourceSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(smuSourceSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
