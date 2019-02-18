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
        label: 'buffer'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction channelmath(bufferVar, unit, channelNumber, expression)\n\
```\n\nbuffer.channelmath(bufferVar, unit, channelNumber, buffer.EXPR_*)\n\
\n\
Apply a mathematical expression to a measurement from a scan card as it is placed into a reading buffer. The result \
of the expression is then placed in the Extra column of the reading buffer.\n\
\n\
The buffer cannot be a default buffer and must be of style buffer.STYLE_FULL. This command takes \
precidence over buffer.math().'
        },
        kind: CompletionItemKind.Function,
        label: 'channelmath'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clearstats(bufferVar)\n```\n\nbuffer.clearstats([bufferVar])\n\
\n\
Clear the statistical information associated with the specified buffer without clearing the readings.'
        },
        kind: CompletionItemKind.Function,
        label: 'clearstats'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(bufferName)\n```\n\nbuffer.delete(bufferName)\n\
\n\
Delete the specified, user-defined reading buffer.\n\
\n\
You cannot delete the default reading buffers, defbuffer1 and defbuffer2.'
        },
        kind: CompletionItemKind.Function,
        label: 'delete'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getstats(bufferVar)\n```\n\
\n\
buffer.getstats([bufferVar]) -> {max, mean, min, n, stddev}\n\
\n\
Returns a statistics table from the specified reading buffer.\n\
\n\
The stats table always has the entry "n" (number of data points).\n\
\n\
If n is greater than 0, then the stats table has the entries \
"mean" (average reading), \
"max" (subtable containing max value data), and \
"min" (subtable containing min value data).\n\
\n\
The max and min subtables contain the entries "reading", "timestamp", "seconds", and "fractionalseconds".\n\
\n\
If n is greater than 1, then the stats table has the entry "stddev" (standard deviation).\n\
\n\
When the reading buffer is configured to fill continuously and overwrite older data with new data, the buffer \
statistics include the data that was overwritten.'
        },
        kind: CompletionItemKind.Function,
        label: 'getstats'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction make(bufferSize, style)\n```\n\
\n\
buffer.make(bufferSize[, buffer.STYLE_\\*]) -> bufferVar\n\
\n\
Create a user-defined reading buffer and set it as the active buffer.\n\
\n\
Newly created user-defined buffers have a default fill mode of FILL_ONCE.\n\
\n\
If you create a reading buffer that has the same name as an existing user-defined buffer, the existing buffer is \
overwritten by the new buffer. Any data in the existing buffer is lost.\n\
\n\
You cannot assign user-defined reading buffers the name defbuffer1 and defbuffer2.'
        },
        kind: CompletionItemKind.Function,
        label: 'make'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction math(bufferVar, unit, expression)\n```\n\
\n\
buffer.math(bufferVar, buffer.UNIT_\\*, buffer.EXPR_\\*)\n\
\n\
Apply a mathematical expression to a measurement as it is placed into a reading buffer. The result \
of the expression is then placed in the Extra column of the reading buffer.\n\
\n\
The buffer cannot be a default buffer and must be of style buffer.STYLE_FULL. buffer.channelmath() takes \
precidence over this command.'
        },
        kind: CompletionItemKind.Function,
        label: 'math'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction save(bufferVar, fileName, timeFormat, start, end)\n```\n\
\n\
buffer.save(bufferVar, fileName[, buffer.SAVE_\\*][, start, end])\n\
\n\
Save data from the specified reading buffer to a USB flash drive.\n\
\n\
The filename must specify the full path (including "/usb1/"). If included, the file extension must be set to .csv (if \
no file extension is specified, .csv is added).\n\
\n\
Verify that you are using a unique name to avoid overwriting any existing .csv files on the flash drive.'
        },
        kind: CompletionItemKind.Function,
        label: 'save'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction saveappend(bufferVar, fileName, timeFormat, start, end)\n```\n\
\n\
buffer.saveappend(bufferVar, fileName[, buffer.SAVE_\\*][, start, end])\n\
\n\
Append data from the specified reading buffer to a file on the USB flash drive or create the file if it does not \
exist.\n\
\n\
The index column entry in the .csv file starts at 1 for each append operation.'
        },
        kind: CompletionItemKind.Function,
        label: 'saveappend'
    },
    {
        data: { domains: ['buffer'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction unit(buffer.UNIT_CUSTOMN, unitOfMeasure)\n```\n\
\n\
buffer.unit(buffer.UNIT_CUSTOMN, unitOfMeasure)\n\
\n\
Set one of three custom units of measure for use in buffers. You can use custom units of measure in buffer math, \
channel math, and writable buffers.\n\
\n\
The unit is reset when power is cycled, it is not affected by reset.'
        },
        kind: CompletionItemKind.Function,
        label: 'unit'
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 0
        },
        documentation: 'For most expressions.',
        label: 'buffer.channelmath(bufferVar, unit, channelNumber, expression)',
        parameters: [
            {
                documentation: 'The name of a user-defined buffer of style buffer.STYLE_FULL to apply the \
mathematical expression to.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'String that contains the channel to apply the expression to, using normal channel \
list syntax; this is also the channel that supplies the r value in the expressions.',
                label: 'channelNumber',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'expression',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 1
        },
        documentation: 'For expressions that require a previous measurment, taken from channelNum2.',
        label: 'buffer.channelmath(bufferVar, unit, channelNumber, expression, channelNum2)',
        parameters: [
            {
                documentation: 'The name of a user-defined buffer of style buffer.STYLE_FULL to apply the \
mathematical expression to.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'String that contains the channel to apply the expression to, using normal channel \
list syntax; this is also the channel that supplies the r value in the expressions',
                label: 'channelNumber',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'expression',
            },
            {
                documentation: 'String that contains the channel from which to get the previous measurement (the a \
value in the expressions); a measurement must be made on this channel before the channelNumber channel. Only used for\
expressions that require a previous measurement.',
                label: 'channelNum2',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 2
        },
        documentation: 'For the buffer.EXPR_POWER expression which requires a constant.',
        label: 'buffer.channelmath(bufferVar, unit, channelNumber, buffer.EXPR_POWER, constant0)',
        parameters: [
            {
                documentation: 'The name of a user-defined buffer of style buffer.STYLE_FULL to apply the \
mathematical expression to.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'String that contains the channel to apply the expression to, using normal channel \
list syntax; this is also the channel that supplies the r value in the expressions',
                label: 'channelNumber',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'expression',
            },
            {
                documentation: 'The constant to be used for c0 in the buffer.EXPR_POWER expression.',
                label: 'constant0',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 3
        },
        documentation: 'For the buffer.EXPR_POLY expression which requires constants.',
        label: 'buffer.channelmath(bufferVar, unit, channelNumber, buffer.EXPR_POLY, constant0, \
constant1, constant2, constant3, constant4, constant5)',
        parameters: [
            {
                documentation: 'The name of a user-defined buffer of style buffer.STYLE_FULL to apply the \
mathematical expression to.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'String that contains the channel to apply the expression to, using normal channel \
list syntax; this is also the channel that supplies the r value in the expressions',
                label: 'channelNumber',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'buffer.EXPR_POLY'
            },
            {
                documentation: 'The constant to be used as c0 in the buffer.EXPR_POLY expression',
                label: 'constant0'
            },
            {
                documentation: 'The constant to be used as c1 in the buffer.EXPR_POLY expression',
                label: 'constant1'
            },
            {
                documentation: 'The constant to be used as c2 in the buffer.EXPR_POLY expression',
                label: 'constant2'
            },
            {
                documentation: 'The constant to be used as c3 in the buffer.EXPR_POLY expression',
                label: 'constant3'
            },
            {
                documentation: 'The constant to be used as c4 in the buffer.EXPR_POLY expression',
                label: 'constant4'
            },
            {
                documentation: 'The constant to be used as c5 in the buffer.EXPR_POLY expression',
                label: 'constant5'
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.clearstats([bufferVar])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.',
                label: 'bufferVar',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.delete(bufferName)',
        parameters: [
            {
                documentation: 'The name of a user‑defined reading buffer.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.getstats([bufferVar])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1 if not specified.',
                label: 'bufferVar',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.make(bufferSize[, style])',
        parameters: [
            {
                documentation: 'The maximum number of readings that can be stored in bufferVar; minimum is 10.',
                label: 'bufferSize',
            },
            {
                documentation: 'The type of reading buffer to create as some buffer.STYLE_*. Defaults to \
buffer.STYLE_STANDARD.\n\
Once the first reading is stored in a COMPACT buffer, its range, display digits, and units cannot be changed.\n\
WRITABLE buffers are used to import external data and cannot be used to collect readings from the instrument.',
                label: 'style',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 0
        },
        documentation: 'For most expressions.',
        label: 'buffer.math(bufferVar, unit, expression)',
        parameters: [
            {
                documentation: 'The name of the reading buffer readings will be saved to. Cannot be a default buffer. \
Must be a buffer with style buffer.STYLE_FULL.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'expression'
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 1
        },
        documentation: 'For the buffer.EXPR_POWER expression which requires a constant.',
        label: 'buffer.math(bufferVar, unit, buffer.EXPR_POWER, constant)',
        parameters: [
            {
                documentation: 'The name of the reading buffer readings will be saved to. Cannot be a default buffer. \
Must be a buffer with style buffer.STYLE_FULL.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'buffer.EXPR_POWER'
            },
            {
                documentation: 'The constant to be used with the buffer.EXPR_POWER expression.',
                label: 'constant'
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 2
        },
        documentation: 'For the buffer.EXPR_POLY expression, which requires several constants.',
        label: 'buffer.math(bufferVar, unit, buffer.EXPR_POLY, constant0, constant1, constant2, constant3, \
c4onstant, constant5)',
        parameters: [
            {
                documentation: 'The name of the reading buffer readings will be saved to. Cannot be a default buffer. \
Must be a buffer with style buffer.STYLE_FULL.',
                label: 'bufferVar',
            },
            {
                documentation: 'The units to be applied to the value generated by the mathematical expression, \
given as some buffer.UNIT_*',
                label: 'unit',
            },
            {
                documentation: 'The type of expression to apply to the reading, given as some buffer.EXPR_*',
                label: 'buffer.EXPR_POLY'
            },
            {
                documentation: 'The constant to be used as c0 in the buffer.EXPR_POLY expression',
                label: 'constant0'
            },
            {
                documentation: 'The constant to be used as c1 in the buffer.EXPR_POLY expression',
                label: 'constant1'
            },
            {
                documentation: 'The constant to be used as c2 in the buffer.EXPR_POLY expression',
                label: 'constant2'
            },
            {
                documentation: 'The constant to be used as c3 in the buffer.EXPR_POLY expression',
                label: 'constant3'
            },
            {
                documentation: 'The constant to be used as c4 in the buffer.EXPR_POLY expression',
                label: 'constant4'
            },
            {
                documentation: 'The constant to be used as c5 in the buffer.EXPR_POLY expression',
                label: 'constant5'
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.save(bufferVar, fileName[, timeFormat][, start, end])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer.',
                label: 'bufferVar',
            },
            {
                documentation: 'A string that indicates the name of the file on the USB flash drive in which to save \
the reading buffer.',
                label: 'fileName',
            },
            {
                documentation: 'Define how date and time information from the buffer is saved in the file on the USB \
flash drive; given as some buffer.SAVE_*.',
                label: 'timeFormat',
            },
            {
                documentation: 'Defines the starting point in the buffer to start saving data.',
                label: 'start',
            },
            {
                documentation: 'Defines the ending point in the buffer to stop saving data.',
                label: 'end',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.saveappend(bufferVar, fileName[, timeFormat][, start, end])',
        parameters: [
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer.',
                label: 'bufferVar',
            },
            {
                documentation: 'A string that indicates the name of the file on the USB flash drive in which to save \
the reading buffer.',
                label: 'fileName',
            },
            {
                documentation: 'Define how date and time information from the buffer is saved in the file on the USB \
flash drive; given as some buffer.SAVE_*.',
                label: 'timeFormat',
            },
            {
                documentation: 'Defines the starting point in the buffer to start saving data.',
                label: 'start',
            },
            {
                documentation: 'Defines the ending point in the buffer to stop saving data.',
                label: 'end',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'buffer.unit(buffer.UNIT_CUSTOMN, unitOfMeasure)',
        parameters: [
            {
                documentation: 'Custom unit to define: buffer.UNIT_CUSTOM1, 2, or 3',
                label: 'buffer.UNIT_CUSTOMN'
            },
            {
                documentation: {
                    kind: MarkupKind.Markdown,
                    value: 'A string that defines the custom unit; up to two characters, any more are ignored; \
defaults are X for custom unit 1, Y for unit 2, and Z for unit 3. Some characters are converted to other symbols:\n\
* u is displayed as the greek letter mu\n\
* dC is displayed as degrees C\n\
* dF is displayed as degrees F\n\
* RA is displayed as a voltage ratio',
                },
                label: 'unitOfMeasure'
            }
        ]
    }
]
