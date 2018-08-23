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

const triggerModelCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        kind: CompletionItemKind.Module,
        label: 'model'
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this command is received, the instrument stops the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'abort',
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This returns the settings for the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'getblocklist',
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command returns the counter value of a `BRANCH_COUNTER` block. When the counter is active, this returns the present count. If the trigger model has started or is running but has not yet reached the counter block, this value is 0.'
        },
        kind: CompletionItemKind.Function,
        label: 'getbranchcount',
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function starts the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'initiate',
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Load a predefined trigger model configuration.\n\
\n\
### Config List\n\
\n\
This trigger model template incorporates a source configuration list and measure configuration list. You must set up the configuration lists before loading the trigger model.\n\
\n\
### Duration Loop\n\
\n\
When you load this predefined trigger model, you can specify amount of time to make a measurement and the length of the delay before the measurement.\n\
\n\
### Empty\n\
\n\
When you load this predefined trigger model, any blocks that have been defined in the trigger model are cleared so the trigger model has no blocks defined.\n\
\n\
### Grade Binning\n\
\n\
This trigger model template allows you to grade components and place them into up to four bins, based on the comparison to limits.\n\
\n\
### Logic Trigger\n\
\n\
This trigger model waits for a digital input event to occur, makes a measurement, and issues a notify event. The notify event asserts a digital output line.\n\
\n\
### Loop Until Event\n\
\n\
The event constant is the event that ends infinite triggering or ends readings set to occur before the trigger and start post-trigger readings. The trigger model makes readings until it detects the event constant. After the event, it makes a finite number of readings, based on the setting of the trigger position.\n\
\n\
The position marks the location in the reading buffer where the trigger will occur. The position is set as a percentage of the active buffer capacity. The buffer captures measurements until a trigger occurs. When the trigger occurs, the buffer retains the percentage of readings specified by the position, then captures remaining readings until 100 percent of the buffer is filled. For example, if this is set to 75 for a reading buffer that holds 10,000 readings, the trigger model makes 2500 readings after it detects the source event. There will be 7500 pre-trigger readings and 2500 post‑trigger readings.\n\
\n\
The instrument makes two sets of readings. The first set is made until the trigger event occurs. The second set is made after the trigger event occurs, up to the number of readings calculated by the position parameter.\n\
\n\
You cannot have the event constant set at none when you run this predefined trigger model.\n\
\n\
### Simple Loop\n\
\n\
This command sets up a loop that sets a delay, makes a measurement, and then repeats the loop the number of times you define in the count parameter.\n\
\n\
### Sort Binning\n\
\n\
This trigger model template allows you to sort components and place them into up to four bins, based on the comparison to limits.\n'
        },
        kind: CompletionItemKind.Function,
        label: 'load',
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Add a block to the trigger model.\n\
\n\
### Branch: Always\n\
\n\
Transfer execution to the specified block number.\n\
\n\
### Branch: Counter\n\
\n\
Transfer execution if the total number of branches is less than the specified counter; otherwise continue.\n\
\n\
### Branch: Delta\n\
\n\
Transfer execution if the delta between the last two measurements (ultimate - penultimate) is less than the specified value; otherwise continue.\n\
\n\
### Branch: Limit — Constant\n\
\n\
Transfer execution if a measurement meets the specified criteria.\n\
\n\
### Branch: Limit — Dynamic\n\
\n\
Transfer execution if a measurement meets the criteria specified by a loaded measurement configuration list.\n\
\n\
### Branch: On Event\n\
\n\
Transfer execution if the specified event has occurred; otherwise continue.\n\
\n\
### Branch: Once\n\
\n\
Transfer execution if this block has not been executed; otherwise continue.\n\
\n\
### Branch: Once — Excluded\n\
\n\
Transfer execution if this block has been executed; otherwise continue.\n\
\n\
### Buffer: Clear\n\
\n\
Clear the specified reading buffer.\n\
\n\
### Config: Next\n\
\n\
Recall the settings at the next index of the specified source/measurement configuration list.\n\
\n\
### Config: Previous\n\
\n\
Recall the settings at the previous index of the specified source/measurement configuration list.\n\
\n\
### Config: Recall\n\
\n\
Recall the settings stored in the specified source/measurement configuration list.\n\
\n\
### Delay — Constant\n\
\n\
Halt measurement and trigger model execution for the specified amount of time.\n\
\n\
Background measurements will continue, as will any infinite measurements set by a previous block.\n\
\n\
### Delay — Dynamic\n\
\n\
Halt measurement and trigger model execution for a remotely programmable amount of time.\n\
\n\
Delay can be one of `trigger.USER_DELAY_M<n>` or `trigger.USER_DELAY_S<n>` where `<n>` is 1 to 5. User values can be set with the `smu.measure.userdelay[<n>]` or `smu.source.userdelay[<n>]` and affect their respective function.\n\
\n\
Background measurements will continue, as will any infinite measurements set by a previous block.\n\
\n\
### Digital I/O\n\
\n\
Send a given bit pattern (0 to 63) on the specified digital I/O line.\n\
\n\
The least significant bit maps to digital I/O line 1 and the most significant bit to line 6.\n\
\n\
Ensure the trigger type and state of the target I/O line is properly configured prior to use.\n\
\n\
### Log Event\n\
\n\
Post the specified event to the event log.\n\
\n\
Note that using this block too often in a trigger model could overflow the event log. It may also take away from the time needed to process more critical trigger model blocks.\n\
\n\
### Measure\n\
\n\
Take the specified number of measurements. If an infinite measure count is given, then execution continues until the next `MEASURE` block.\n\
\n\
### No Operation\n\
\n\
Placeholder block to prevent trigger model renumbering.\n\
\n\
### Notify\n\
\n\
Generate the specified trigger event and continue.\n\
\n\
### Reset Branch Count\n\
\n\
Resets the total branch count of the specified `COUNTER` block.\n\
\n\
### Source Output\n\
\n\
Sets the source to the specified output state.\n\
\n\
### Wait\n\
\n\
Halts execution until the specified event occurs.\n'
        },
        kind: CompletionItemKind.Function,
        label: 'setblock',
    },
    {
        data: ['model', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command returns the state of the trigger model. The instrument checks the state of a started trigger model every 100ms.\n\nThis command returns the trigger state and the block that the trigger model last executed.\n\nThe trigger model states are:'
        },
        kind: CompletionItemKind.Function,
        label: 'state',
    },
]

const triggerModelSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.model.getbranchcount(blockNumber)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the `BRANCH_COUNTER` block in the trigger model.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("ConfigList", measureConfigList, sourceConfigList[, delay][, bufferName])',
        'Load trigger model from Source and Measure config lists.',
        ParameterInformation.create(
            '"ConfigList"',
            'The string "ConfigList".'
        ),
        ParameterInformation.create(
            'measureConfigList',
            'A string that contains the name of the measurement configuration list to use.'
        ),
        ParameterInformation.create(
            'sourceConfigList',
            'A string that contains the name of the source configuration list to use.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("DurationLoop", duration[, delay][, bufferName])',
        'Load a basic duration loop trigger model.',
        ParameterInformation.create(
            '"DurationLoop"',
            'The string "DurationLoop".'
        ),
        ParameterInformation.create(
            'duration',
            'The amount of time for which to make measurements (167 ns to 100 ks).'
        ),
        ParameterInformation.create(
            'delay',
            'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("Empty")',
        'Clear the trigger model.',
        ParameterInformation.create(
            '"Empty"',
            'The string "Empty".'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("GradeBinning", components, startInLine, startDelay, endDelay, limit1High, limit1Low[, limit1Pattern][, limit2High][, limit2Low][, limit2Pattern][, limit3High][, limit3Low][, limit3Pattern][, limit4High][, limit4Low][, limit4Pattern][, allPattern][, bufferName])',
        'Load a basic grade binning trigger model.',
        ParameterInformation.create(
            '"GradeBinning"',
            'The string "GradeBinning".'
        ),
        ParameterInformation.create(
            'components',
            'The number of components to measure (1 to 268,435,455).'
        ),
        ParameterInformation.create(
            'startInLine',
            'The digital input line that starts the test (5 or 6)'
        ),
        ParameterInformation.create(
            'startDelay',
            'The delay time before each measurement (167 ns to 10 ks); 0 for no delay.'
        ),
        ParameterInformation.create(
            'endDelay',
            'The delay time after each measurement (167 ns to 10 ks); 0 for no delay.'
        ),
        ParameterInformation.create(
            'limit1High',
            'The first upper limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value lower than `limit1Low`.'
        ),
        ParameterInformation.create(
            'limit1Low',
            'The first lower limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value higher than `limit1High`.'
        ),
        ParameterInformation.create(
            'limit1Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 1; defaults to 1.\n\nSent on digital I/O lines 1 to 4, where 1 is the least significant bit.'
        ),
        ParameterInformation.create(
            'limit2High',
            'The second upper limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value lower than `limit2Low`.'
        ),
        ParameterInformation.create(
            'limit2Low',
            'The second lower limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value higher than `limit2High`.'
        ),
        ParameterInformation.create(
            'limit2Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 2; defaults to 2.\n\nSent on digital I/O lines 1 to 4, where 1 is the least significant bit.'
        ),
        ParameterInformation.create(
            'limit3High',
            'The third upper limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value lower than `limit3Low`.'
        ),
        ParameterInformation.create(
            'limit3Low',
            'The third lower limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value higher than `limit3High`.'
        ),
        ParameterInformation.create(
            'limit3Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 3; defaults to 4.\n\nSent on digital I/O lines 1 to 4, where 1 is the least significant bit.'
        ),
        ParameterInformation.create(
            'limit4High',
            'The fourth upper limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value lower than `limit4Low`.'
        ),
        ParameterInformation.create(
            'limit4Low',
            'The fourth lower limit that the measurement is compared against.\n\nTo mark this limit as unused, set this value higher than `limit4High`.'
        ),
        ParameterInformation.create(
            'limit4Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 4; defaults to 8.\n\nSent on digital I/O lines 1 to 4, where 1 is the least significant bit.'
        ),
        ParameterInformation.create(
            'allPattern',
            'The bit pattern (1 to 15) that is sent when all limits have passed; defaults to 15.\n\nSent on digital I/O lines 1 to 4, where 1 is the least significant bit.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("LogicTrigger", digInLine, digOutLine, count, clear[, delay][, bufferName])',
        'Load a basic logic trigger model.',
        ParameterInformation.create(
            '"LogicTrigger"',
            'The string "LogicTrigger".'
        ),
        ParameterInformation.create(
            'digInLine',
            'The digital input line (1 to 6); also the event that the trigger model will wait on in block 1.'
        ),
        ParameterInformation.create(
            'digOutLine',
            'The digital output line (1 to 6).'
        ),
        ParameterInformation.create(
            'count',
            'The number of measurements the instrument will make.'
        ),
        ParameterInformation.create(
            'clear',
            '`trigger.CLEAR_NEVER` to immediately act on any previously detected triggers and not clear them (default) or `trigger.CLEAR_ENTER` to clear previously detected trigger events when entering the wait block.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("LoopUntilEvent", triggerEvent, position, clear[, delay][, bufferName])',
        'Load a basic event loop trigger model.',
        ParameterInformation.create(
            '"LoopUntilEvent"',
            'The string "LoopUntilEvent".'
        ),
        ParameterInformation.create(
            'triggerEvent',
            'The event that ends infinite triggering or readings set to occur before the trigger; value is one of:\n\
`trigger.EVENT_DISPLAY` — Front-panel TRIGGER key pressed.\n\
`trigger.EVENT_NOTIFY<n>` — `NOTIFY` block `<n>` (1 to 8) generates an event on execution.\n\
`trigger.EVENT_COMMAND` — `*TRG` or GPIB `GET` command or VXI-11 `device_trigger` command.\n\
`trigger.EVENT_DIGIO<n>` — Edge state (based on configuration) detected on digital input line `<n>` (1 to 6).\n\
`trigger.EVENT_TSPLINK<n>` — Edge detected on TSP-Link synchronization line `<n>` (1 to 3).\n\
`trigger.EVENT_LAN<n>` — LXI trigger packet received on LAN trigger object `<n>` (1 to 8).\n\
`trigger.EVENT_BLENDER<n>` — Event blender `<n>` (1 or 2).\n\
`trigger.EVENT_TIMER<n>` — Timer `<n>` (1 to 4) expires.\n\
`trigger.EVENT_SOURCE_LIMIT` — Source limit condition.'
        ),
        ParameterInformation.create(
            'position',
            'The number of readings to make in relation to the size of the reading buffer; enter as percentage out of 100.'
        ),
        ParameterInformation.create(
            'clear',
            '`trigger.CLEAR_NEVER` to immediately act on any previously detected triggers and not clear them (default) or `trigger.CLEAR_ENTER` to clear previously detected trigger events when entering the wait block.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("SimpleLoop", count[, delay][, bufferName])',
        'Load a basic looping trigger model.',
        ParameterInformation.create(
            '"SimpleLoop"',
            'The string "SimpleLoop".'
        ),
        ParameterInformation.create(
            'count',
            'The number of measurements the instrument will make.'
        ),
        ParameterInformation.create(
            'delay',
            'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.load("SortBinning", components, startInLine, startDelay, endDelay, limit1High, limit1Low[, limit1Pattern][, limit2High][, limit2Low][, limit2Pattern][, limit3High][, limit3Low][, limit3Pattern][, limit4High][, limit4Low][, limit4Pattern][, allPattern][, bufferName])',
        'Load a basic sort binning trigger model.',
        ParameterInformation.create(
            '"SortBinning"',
            'The string "SortBinning".'
        ),
        ParameterInformation.create(
            'components',
            'The number of components to measure (1 to 268,435,455).'
        ),
        ParameterInformation.create(
            'startInLine',
            'The digital input line that starts the test (5 or 6)'
        ),
        ParameterInformation.create(
            'startDelay',
            'The delay time before each measurement (167 ns to 10 ks); 0 for no delay.'
        ),
        ParameterInformation.create(
            'endDelay',
            'The delay time after each measurement (167 ns to 10 ks); 0 for no delay.'
        ),
        ParameterInformation.create(
            'limit1High',
            'The first upper limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit1Low',
            'The first lower limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit1Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 1; defaults to 1'
        ),
        ParameterInformation.create(
            'limit2High',
            'The second upper limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit2Low',
            'The second lower limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit2Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 2; defaults to 2'
        ),
        ParameterInformation.create(
            'limit3High',
            'The third upper limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit3Low',
            'The third lower limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit3Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 3; defaults to 4'
        ),
        ParameterInformation.create(
            'limit4High',
            'The fourth upper limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit4Low',
            'The fourth lower limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limit4Pattern',
            'The bit pattern (1 to 15) that is sent when the measurement fails limit 4; defaults to 8'
        ),
        ParameterInformation.create(
            'allPattern',
            'The bit pattern (1 to 15) that is sent when all limits have passed; defaults to 15.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the reading buffer, which may be a default buffer (`defbuffer1` or `defbuffer2`) or a user‑defined buffer; defaults to `defbuffer1`.'
        ),
    ),
    /* vvv TODO vvv */
    SignatureInformation.create(
        'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_ALWAYS, branchToBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'trigger.BLOCK_BRANCH_ALWAYS',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number to execute when the trigger model reaches the Always block.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_COUNTER(blockNumber, targetCount, branchToBlock, targetCount)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'targetCount',
            'The number of times to repeat.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the counter is less than the targetCount value.'
        ),
        ParameterInformation.create(
            'targetCount',
            'branchToBlock.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_DELTA(blockNumber, targetDifference, branchToBlock, targetDifference, measureBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'targetDifference',
            'The value against which the block compares the difference between the measurements.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the difference between the measurements is less than or equal to the targetDifference.'
        ),
        ParameterInformation.create(
            'targetDifference',
            'branchToBlock.'
        ),
        ParameterInformation.create(
            'measureBlock',
            'The block number of the measure block that makes the measurements to be compared; if this is 0 or undefined, the trigger model uses the previous measure block.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_LIMIT_CONSTANT(blockNumber, limitType, limitA, limitType, limitB, limitType, branchToBlock, measureBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'limitType',
            'The type of limit, which can be one of the following types:\ntrigger.LIMIT_ABOVE\ntrigger.LIMIT_BELOW\ntrigger.LIMIT_INSIDE\ntrigger.LIMIT_OUTSIDE.'
        ),
        ParameterInformation.create(
            'limitA',
            'The lower limit that the measurement is tested against; if  limitType is set to:\ntrigger.LIMIT_ABOVE: This value is ignored\ntrigger.LIMIT_BELOW: The measurement must be below this value\ntrigger.LIMIT_INSIDE: The low limit that the measurement is compared against\ntrigger.LIMIT_OUTSIDE: The low limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limitType',
            'limitA.'
        ),
        ParameterInformation.create(
            'limitB',
            'The upper limit that the measurement is tested against; if  limitType is set to:\ntrigger.LIMIT_ABOVE: The measurement must be above this value\ntrigger.LIMIT_BELOW: This value is ignored\ntrigger.LIMIT_INSIDE: The high limit that the measurement is compared against\ntrigger.LIMIT_OUTSIDE: The high limit that the measurement is compared against.'
        ),
        ParameterInformation.create(
            'limitType',
            'limitB.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the measurement meets the defined criteria.'
        ),
        ParameterInformation.create(
            'measureBlock',
            'The block number of the measure block that makes the measurements to be compared; if this is 0 or undefined, the trigger model uses the previous measure block.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_LIMIT_DYNAMIC(blockNumber, limitType, branchToBlock, measureBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'limitType',
            'The type of limit, which can be one of the following types:\ntrigger.LIMIT_ABOVE\ntrigger.LIMIT_BELOW\ntrigger.LIMIT_INSIDE\ntrigger.LIMIT_OUTSIDE.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the measurement meets the criteria set in the configuration list.'
        ),
        ParameterInformation.create(
            'measureBlock',
            'The block number of the measure block that makes the measurements to be compared; if this is 0 or undefined, the trigger model uses the previous measure block.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_ONCE(blockNumber, branchToBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the trigger model first encounters this block.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_ONCE_EXCLUDED(blockNumber, branchToBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the trigger model encounters this block after the first encounter.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BRANCH_ON_EVENT(blockNumber, event, branchToBlock)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'event',
            'The event that must occur before the trigger model branches the specified block.'
        ),
        ParameterInformation.create(
            'branchToBlock',
            'The block number of the trigger model block to execute when the specified event occurs.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_BUFFER_CLEAR(blockNumber, bufferName)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the buffer, which must be an existing buffer; if no buffer is defined, defbuffer1 is used.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_CONFIG_NEXT(blockNumber, configurationList)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'configurationList',
            'A string that defines the source or measure configuration list to recall.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_CONFIG_PREV(blockNumber, configurationList)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'configurationList',
            'A string that defines the source or measure configuration list to recall.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_CONFIG_RECALL(blockNumber, configurationList, index)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'configurationList',
            'A string that defines the source or measure configuration list to recall.'
        ),
        ParameterInformation.create(
            'index',
            'The index in the configuration list to recall; default is 1.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_DELAY_CONSTANT(blockNumber, time)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'time',
            'The amount of time to delay in seconds (167 ns to 10 ks, or 0 for no delay).'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_DELAY_DYNAMIC(blockNumber, blockNumber, userDelay, userDelay, n, n, n, n, N, n, n, n, n, N, N)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'blockNumber',
            'blockNumber.'
        ),
        ParameterInformation.create(
            'userDelay',
            'The number of the user delay:\ntrigger.USER_DELAY_Mn, where n is the number of the user delay (1 to 5) set by smu.measure.userdelay[N]\ntrigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N].'
        ),
        ParameterInformation.create(
            'userDelay',
            'userDelay.'
        ),
        ParameterInformation.create(
            'n',
            'trigger.USER_DELAY_Mn, where n is the number of the user delay (1 to 5) set by smu.measure.userdelay[N]trigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N].'
        ),
        ParameterInformation.create(
            'n',
            'trigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N].'
        ),
        ParameterInformation.create(
            'n',
            'The number of the user delay:.'
        ),
        ParameterInformation.create(
            'n',
            'trigger.USER_DELAY_Mn, where n is the number of the user delay (1 to 5) set by smu.measure.userdelay[N].'
        ),
        ParameterInformation.create(
            'N',
            'trigger.USER_DELAY_Mn, where n is the number of the user delay (1 to 5) set by smu.measure.userdelay[N]trigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N].'
        ),
        ParameterInformation.create(
            'n',
            'The number of the user delay:.'
        ),
        ParameterInformation.create(
            'n',
            'trigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N].'
        ),
        ParameterInformation.create(
            'n',
            'trigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N]trigger.USER_DELAY_Mn, where n is the number of the user delay (1 to 5) set by smu.measure.userdelay[N].'
        ),
        ParameterInformation.create(
            'n',
            'trigger.USER_DELAY_Mn, where n is the number of the user delay (1 to 5) set by smu.measure.userdelay[N].'
        ),
        ParameterInformation.create(
            'N',
            'The number of the user delay:.'
        ),
        ParameterInformation.create(
            'N',
            'trigger.USER_DELAY_Sn, where n is the number of the user delay (1 to 5) set by smu.source.userdelay[N].'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_DIGITAL_IO(blockNumber, bitPattern, bitMask)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'bitPattern',
            'Sets the value that specifies the output line bit pattern (0 to 63).'
        ),
        ParameterInformation.create(
            'bitMask',
            'Specifies the bit mask; if omitted, all lines are driven (0 to 63).'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_LOG_EVENT(blockNumber, eventNumber, N, N, N, N, message)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'eventNumber',
            'The event number:\ntrigger.LOG_INFON\ntrigger.LOG_WARNN\ntrigger.LOG_ERRORN\nWhere N is 1 to 4; you can define up to four of each type\nYou can also set trigger.LOG_WARN_ABORT, which aborts the trigger model immediately and posts a warning event log message.'
        ),
        ParameterInformation.create(
            'N',
            'You can also set trigger.LOG_WARN_ABORT, which aborts the trigger model immediately and posts a warning event log message.'
        ),
        ParameterInformation.create(
            'N',
            'The event number:.'
        ),
        ParameterInformation.create(
            'N',
            'You can also set trigger.LOG_WARN_ABORT, which aborts the trigger model immediately and posts a warning event log message.'
        ),
        ParameterInformation.create(
            'N',
            'eventNumber.'
        ),
        ParameterInformation.create(
            'message',
            'A string up to 31 characters.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_MEASURE(blockNumber, bufferName, count)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'bufferName',
            'The name of the buffer, which must be an existing buffer; if no buffer is defined, defbuffer1 is used.'
        ),
        ParameterInformation.create(
            'count',
            'The number of readings to make before moving to the next block in the trigger model; set to a specific value or infinite (trigger.COUNT_INFINITE) or stop infinite (trigger.COUNT_STOP).'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_NOP(blockNumber)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_NOTIFY(blockNumber, N)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'N',
            'The identification number of the notification; 1 to 8.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_RESET_BRANCH_COUNT(blockNumber, counter)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'counter',
            'The block number of the counter that is to be reset.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_SOURCE_OUTPUT(blockNumber, state)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'state',
            'Turn the source off: smu.OFF\nTurn the source on: smu.ON.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.setblock() — trigger.BLOCK_WAIT(blockNumber, event, clear, logic)',
        undefined,
        ParameterInformation.create(
            'blockNumber',
            'The sequence of the block in the trigger model.'
        ),
        ParameterInformation.create(
            'event',
            'The event that must occur before the trigger block allows trigger execution to continue (see Details).'
        ),
        ParameterInformation.create(
            'clear',
            'To clear previously detected trigger events when entering the wait block: trigger.CLEAR_ENTER\nTo immediately act on any previously detected triggers and not clear them (default): trigger.CLEAR_NEVER.'
        ),
        ParameterInformation.create(
            'logic',
            'If each event must occur before the trigger model continues: trigger.WAIT_AND\nIf at least one of the events must occur before the trigger model continues: trigger.WAIT_OR.'
        ),
    ),
    SignatureInformation.create(
        'trigger.model.state(status, n)',
        undefined,
        ParameterInformation.create(
            'status',
            'The status of the trigger model:\ntrigger.STATE_IDLE\ntrigger.STATE_RUNNING\ntrigger.STATE_WAITING\ntrigger.STATE_EMPTY\ntrigger.STATE_BUILDING\ntrigger.STATE_FAILED\ntrigger.STATE_ABORTING\ntrigger.STATE_ABORTED.'
        ),
        ParameterInformation.create(
            'n',
            'The last trigger model block that was executed.'
        ),
    ),
]

export async function getTriggerModelCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerModelCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerModelSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerModelSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
