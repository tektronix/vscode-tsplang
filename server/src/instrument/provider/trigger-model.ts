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

import { CompletionItem, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['trigger'] },
        kind: CompletionItemKind.Module,
        label: 'model'
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction abort()\n```\n\
\n\
Stop all trigger model commands.'
        },
        kind: CompletionItemKind.Function,
        label: 'abort',
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getblocklist()\n```\n\ntrigger.model.getblocklist() -> string\n\
\n\
Returns the present blocks in the trigger model as a string.'
        },
        kind: CompletionItemKind.Function,
        label: 'getblocklist',
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction getbranchcount(blockNumber)\n```\n\
\n\
trigger.model.getbranchcount(blockNumber) -> number\n\
\n\
Returns the counter value of the specified BRANCH_COUNTER block as a number. If execution has not yet reached the \
block, then a 0 is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'getbranchcount',
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction initiate()\n```\n\
\n\
Start the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'initiate',
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction load(typeString, typeParam, ...)\n```\n\
\n\
Load a predefined trigger model configuration.'
        },
        kind: CompletionItemKind.Function,
        label: 'load',
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction setblock(blockNumber, trigger.BLOCK_*, blockParams, ...)\n```\n\
\n\
Add a block to the trigger model.'
        },
        kind: CompletionItemKind.Function,
        label: 'setblock',
    },
    {
        data: { domains: ['model', 'trigger'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction state()\n```\n\
\n\
trigger.model.state() -> trigger.STATE_\\*, trigger.STATE_\\*, number\n\
\n\
Returns `overallStatus, engineStatus, blockNumber` where \
*overallStatus* is the overall trigger model status, \
*engineStatus* is the present status of the trigger engine, \
and *blockNumber* is the last executed block number.\n\
\n\
Trigger state is updated every 100 ms.'
        },
        kind: CompletionItemKind.Function,
        label: 'state',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'trigger.model.getbranchcount(blockNumber)',
        parameters: [
            {
                documentation: 'The sequence of the BRANCH_COUNTER block in the trigger model.',
                label: 'blockNumber',
            },
        ],
    },
    {
        documentation: 'Load trigger model from Source and Measure config lists.',
        label: 'trigger.model.load("ConfigList", measureConfigList, sourceConfigList[, delay][, bufferName])',
        parameters: [
            {
                documentation: 'The string "ConfigList".',
                label: '"ConfigList"',
            },
            {
                documentation: 'A string that contains the name of the measurement configuration list to use.',
                label: 'measureConfigList',
            },
            {
                documentation: 'A string that contains the name of the source configuration list to use.',
                label: 'sourceConfigList',
            },
            {
                documentation: 'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.',
                label: 'delay',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: 'Load a basic duration loop trigger model.',
        label: 'trigger.model.load("DurationLoop", duration[, delay][, bufferName])',
        parameters: [
            {
                documentation: 'The string "DurationLoop".',
                label: '"DurationLoop"',
            },
            {
                documentation: 'The amount of time for which to make measurements (167 ns to 100 ks).',
                label: 'duration',
            },
            {
                documentation: 'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.',
                label: 'delay',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: 'Clear the trigger model.',
        label: 'trigger.model.load("Empty")',
        parameters: [
            {
                documentation: 'The string "Empty".',
                label: '"Empty"',
            },
        ],
    },
    {
        documentation: 'Load a basic grade binning trigger model.',
        label: 'trigger.model.load("GradeBinning", components, startInLine, startDelay, endDelay, \
limit1High, limit1Low[, limit1Pattern]\
[, limit2High][, limit2Low][, limit2Pattern]\
[, limit3High][, limit3Low][, limit3Pattern]\
[, limit4High][, limit4Low][, limit4Pattern]\
[, allPattern][, bufferName])',
        parameters: [
            {
                documentation: 'The string "GradeBinning".',
                label: '"GradeBinning"',
            },
            {
                documentation: 'The number of components to measure (1 to 268,435,455).',
                label: 'components',
            },
            {
                documentation: 'The digital input line that starts the test (5 or 6)',
                label: 'startInLine',
            },
            {
                documentation: 'The delay time before each measurement (167 ns to 10 ks); 0 for no delay.',
                label: 'startDelay',
            },
            {
                documentation: 'The delay time after each measurement (167 ns to 10 ks); 0 for no delay.',
                label: 'endDelay',
            },
            {
                documentation: 'The first upper limit that the measurement is compared against.\n\
To mark this limit as unused, set this value lower than limit1Low.',
                label: 'limit1High',
            },
            {
                documentation: 'The first lower limit that the measurement is compared against.\n\
To mark this limit as unused, set this value higher than limit1High.',
                label: 'limit1Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 1; defaults \
to 1. Sent on digital I/O lines 1 to 4, where 1 is the least significant bit.',
                label: 'limit1Pattern',
            },
            {
                documentation: 'The second upper limit that the measurement is compared against.\n\
To mark this limit as unused, set this value lower than limit2Low.',
                label: 'limit2High',
            },
            {
                documentation: 'The second lower limit that the measurement is compared against.\n\
To mark this limit as unused, set this value higher than limit2High.',
                label: 'limit2Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 2; defaults \
to 2. Sent on digital I/O lines 1 to 4, where 1 is the least significant bit.',
                label: 'limit2Pattern',
            },
            {
                documentation: 'The third upper limit that the measurement is compared against.\n\
To mark this limit as unused, set this value lower than limit3Low.',
                label: 'limit3High',
            },
            {
                documentation: 'The third lower limit that the measurement is compared against.\n\
To mark this limit as unused, set this value higher than limit3High.',
                label: 'limit3Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 3; defaults \
to 4. Sent on digital I/O lines 1 to 4, where 1 is the least significant bit.',
                label: 'limit3Pattern',
            },
            {
                documentation: 'The fourth upper limit that the measurement is compared against.\n\
To mark this limit as unused, set this value lower than limit4Low.',
                label: 'limit4High',
            },
            {
                documentation: 'The fourth lower limit that the measurement is compared against.\n\
To mark this limit as unused, set this value higher than limit4High.',
                label: 'limit4Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 4; defaults \
to 8. Sent on digital I/O lines 1 to 4, where 1 is the least significant bit.',
                label: 'limit4Pattern',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when all limits have passed; defaults to 15. \
Sent on digital I/O lines 1 to 4, where 1 is the least significant bit.',
                label: 'allPattern',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: 'Load a basic logic trigger model.',
        label: 'trigger.model.load("LogicTrigger", digInLine, digOutLine, count, clear[, delay][, bufferName])',
        parameters: [
            {
                documentation: 'The string "LogicTrigger".',
                label: '"LogicTrigger"',
            },
            {
                documentation: 'The digital input line (1 to 6); also the event that the trigger model will wait on \
in block 1.',
                label: 'digInLine',
            },
            {
                documentation: 'The digital output line (1 to 6).',
                label: 'digOutLine',
            },
            {
                documentation: 'The number of measurements the instrument will make.',
                label: 'count',
            },
            {
                documentation: 'Use trigger.CLEAR_NEVER to immediately act on any previously detected triggers and \
not clear them (default) or trigger.CLEAR_ENTER to clear previously detected trigger events when entering the wait \
block.',
                label: 'clear',
            },
            {
                documentation: 'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.',
                label: 'delay',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: 'Load a basic event loop trigger model.',
        label: 'trigger.model.load("LoopUntilEvent", triggerEvent, position, clear[, delay][, bufferName])',
        parameters: [
            {
                documentation: 'The string "LoopUntilEvent".',
                label: '"LoopUntilEvent"',
            },
            {
                documentation: 'The event that ends infinite triggering or readings set to occur before the trigger; \
value is some trigger.EVENT_* enumeration besides trigger.EVENT_NONE.',
                label: 'triggerEvent',
            },
            {
                documentation: 'The number of readings to make in relation to the size of the reading buffer; enter \
as some percentage out of 100.',
                label: 'position',
            },
            {
                documentation: 'Use trigger.CLEAR_NEVER to immediately act on any previously detected triggers and \
not clear them (default) or trigger.CLEAR_ENTER to clear previously detected trigger events when entering the wait \
block.',
                label: 'clear',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: 'Load a basic looping trigger model.',
        label: 'trigger.model.load("SimpleLoop", count[, delay][, bufferName])',
        parameters: [
            {
                documentation: 'The string "SimpleLoop".',
                label: '"SimpleLoop"',
            },
            {
                documentation: 'The number of measurements the instrument will make.',
                label: 'count',
            },
            {
                documentation: 'The delay time before each measurement (167 ns to 10 ks); default is 0 for no delay.',
                label: 'delay',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        documentation: 'Load a basic sort binning trigger model.',
        label: 'trigger.model.load("SortBinning", components, startInLine, startDelay, endDelay, \
limit1High, limit1Low[, limit1Pattern]\
[, limit2High][, limit2Low][, limit2Pattern]\
[, limit3High][, limit3Low][, limit3Pattern]\
[, limit4High][, limit4Low][, limit4Pattern]\
[, allPattern][, bufferName])',
        parameters: [
            {
                documentation: 'The string "SortBinning".',
                label: '"SortBinning"',
            },
            {
                documentation: 'The number of components to measure (1 to 268,435,455).',
                label: 'components',
            },
            {
                documentation: 'The digital input line that starts the test (5 or 6)',
                label: 'startInLine',
            },
            {
                documentation: 'The delay time before each measurement (167 ns to 10 ks); 0 for no delay.',
                label: 'startDelay',
            },
            {
                documentation: 'The delay time after each measurement (167 ns to 10 ks); 0 for no delay.',
                label: 'endDelay',
            },
            {
                documentation: 'The first upper limit that the measurement is compared against.',
                label: 'limit1High',
            },
            {
                documentation: 'The first lower limit that the measurement is compared against.',
                label: 'limit1Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 1; defaults \
to 1',
                label: 'limit1Pattern',
            },
            {
                documentation: 'The second upper limit that the measurement is compared against.',
                label: 'limit2High',
            },
            {
                documentation: 'The second lower limit that the measurement is compared against.',
                label: 'limit2Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 2; defaults \
to 2',
                label: 'limit2Pattern',
            },
            {
                documentation: 'The third upper limit that the measurement is compared against.',
                label: 'limit3High',
            },
            {
                documentation: 'The third lower limit that the measurement is compared against.',
                label: 'limit3Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 3; defaults \
to 4',
                label: 'limit3Pattern',
            },
            {
                documentation: 'The fourth upper limit that the measurement is compared against.',
                label: 'limit4High',
            },
            {
                documentation: 'The fourth lower limit that the measurement is compared against.',
                label: 'limit4Low',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when the measurement fails limit 4; defaults \
to 8',
                label: 'limit4Pattern',
            },
            {
                documentation: 'The bit pattern (1 to 15) that is sent when all limits have passed; defaults to 15.',
                label: 'allPattern',
            },
            {
                documentation: 'The name of the reading buffer, which may be a default buffer (defbuffer1 or \
defbuffer2) or a user‑defined buffer; defaults to defbuffer1.',
                label: 'bufferName',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 0
        },
        documentation: 'Transfer execution to the specified block number.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_ALWAYS, branchToBlock)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_ALWAYS" enumeration.',
                label: 'trigger.BLOCK_BRANCH_ALWAYS',
            },
            {
                documentation: 'The block number to execute when the trigger model reaches this block.',
                label: 'branchToBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 1
        },
        documentation: 'Transfer execution if the total number of branches is less than the specified counter; \
otherwise continue.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_COUNTER, targetCount, branchToBlock)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_COUNTER" enumeration.',
                label: 'trigger.BLOCK_BRANCH_COUNTER',
            },
            {
                documentation: 'The number of times to repeat.',
                label: 'targetCount',
            },
            {
                documentation: 'The block number to execute when the counter is less than the targetCount value.',
                label: 'branchToBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 2
        },
        documentation: 'Transfer execution if the delta between the last two measurements (ultimate - penultimate) is \
less than the specified value; otherwise continue.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_DELTA, targetDifference, branchToBlock\
[, measureBlock])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_DELTA" enumeration.',
                label: 'trigger.BLOCK_BRANCH_DELTA',
            },
            {
                documentation: 'The value against which the block compares the difference between the measurements.',
                label: 'targetDifference',
            },
            {
                documentation: 'The block number to execute when the difference between the measurements is less than \
or equal to the targetDifference.',
                label: 'branchToBlock',
            },
            {
                documentation: 'The block number that makes the measurements to be compared; if this is 0 or \
undefined, the trigger model uses a previous measure block.',
                label: 'measureBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 3
        },
        documentation: 'Transfer execution if a measurement meets the specified criteria.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_LIMIT_CONSTANT, limitType, limitA, limitB, \
branchToBlock[, measureBlock])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_LIMIT_CONSTANT" enumeration.',
                label: 'trigger.BLOCK_BRANCH_LIMIT_CONSTANT',
            },
            {
                documentation: 'The type of limit, which can be some trigger.LIMIT_*.',
                label: 'limitType',
            },
            {
                documentation: 'The lower limit that the measurement is tested against as a number. Limit is ignored \
if limitType is set to trigger.LIMIT_ABOVE.\n\
If limitType is set to trigger.LIMIT_INSIDE or LIMIT_OUTSIDE, then this is the low limit that the measurement is \
compared against.\n\
If limitType is set to trigger.LIMIT_BELOW, then the measurement must be below this value.',
                label: 'limitA',
            },
            {
                documentation: 'The upper limit that the measurement is tested against as a number. Limit is ignored \
if limitType is set to trigger.LIMIT_BELOW.\n\
If limitType is set to trigger.LIMIT_INSIDE or LIMIT_OUTSIDE, then this is the low limit that the measurement is \
compared against.\n\
If limitType is set to trigger.LIMIT_ABOVE, then the measurement must be above this value.',
                label: 'limitB',
            },
            {
                documentation: 'The block number to execute when the measurement meets the defined criteria.',
                label: 'branchToBlock',
            },
            {
                documentation: 'The block number that makes the measurements to be compared; if this is 0 or \
undefined, the trigger model uses the previous measure block.',
                label: 'measureBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 4
        },
        documentation: 'Transfer execution if a measurement meets the criteria specified by a loaded measurement \
configuration list.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_LIMIT_DYNAMIC, limitType, limitNumber, \
branchToBlock[, measureBlock])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_LIMIT_DYNAMIC" enumeration.',
                label: 'trigger.BLOCK_BRANCH_LIMIT_DYNAMIC',
            },
            {
                documentation: 'The type of limit, which can be some trigger.LIMIT_*.',
                label: 'limitType',
            },
            {
                documentation: 'The limit number (1 or 2).',
                label: 'limitNumber',
            },
            {
                documentation: 'The block number to execute when the measurement meets the criteria set in the \
configuration list.',
                label: 'branchToBlock',
            },
            {
                documentation: 'The block number that makes the measurements to be compared; if this is 0 or \
undefined, the trigger model uses the previous measure block.',
                label: 'measureBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 5
        },
        documentation: 'Transfer execution if this block has not been executed; otherwise continue.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_ONCE, branchToBlock)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_ONCE" enumeration.',
                label: 'trigger.BLOCK_BRANCH_ONCE',
            },
            {
                documentation: 'The block number to execute when the trigger model first encounters this block.',
                label: 'branchToBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 6
        },
        documentation: 'Transfer execution if this block has been executed; otherwise continue.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_ONCE_EXCLUDED, branchToBlock)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_ONCE_EXCLUDED" enumeration.',
                label: 'trigger.BLOCK_BRANCH_ONCE_EXCLUDED',
            },
            {
                documentation: 'The block number to execute when the trigger model encounters this block after the \
first encounter.',
                label: 'branchToBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 7
        },
        documentation: 'Transfer execution if the specified event has occurred; otherwise continue.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BRANCH_ON_EVENT, event, branchToBlock)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BRANCH_ON_EVENT" enumeration.',
                label: 'trigger.BLOCK_BRANCH_ON_EVENT',
            },
            {
                documentation: 'Some trigger.EVENT_* that must occur before the trigger model branches to the \
specified block.',
                label: 'event',
            },
            {
                documentation: 'The block number to execute when the specified event occurs.',
                label: 'branchToBlock',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 8
        },
        documentation: 'Clear the specified reading buffer.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_BUFFER_CLEAR[, bufferName])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_BUFFER_CLEAR" enumeration.',
                label: 'trigger.BLOCK_BUFFER_CLEAR',
            },
            {
                documentation: 'The name of an existing buffer; if no buffer is defined, defbuffer1 is used.',
                label: 'bufferName',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 9
        },
        documentation: 'Recall the settings at the next index of the specified source/measurement configuration list.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_CONFIG_NEXT, configurationList)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_CONFIG_NEXT" enumeration.',
                label: 'trigger.BLOCK_CONFIG_NEXT',
            },
            {
                documentation: 'A string that defines the source or measure configuration list to recall.',
                label: 'configurationList',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 10
        },
        documentation: 'Recall the settings at the previous index of the specified source/measurement configuration \
list.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_CONFIG_PREV, configurationList)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_CONFIG_PREV" enumeration.',
                label: 'trigger.BLOCK_CONFIG_PREV',
            },
            {
                documentation: 'A string that defines the source or measure configuration list to recall.',
                label: 'configurationList',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 11
        },
        documentation: 'Recall the settings stored in the specified source/measurement configuration list.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_CONFIG_RECALL, configurationList[, index])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_CONFIG_RECALL" enumeration.',
                label: 'trigger.BLOCK_CONFIG_RECALL',
            },
            {
                documentation: 'A string that defines the source or measure configuration list to recall.',
                label: 'configurationList',
            },
            {
                documentation: 'The index in the configuration list to recall; default is 1.',
                label: 'index',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 12
        },
        documentation: 'Halt measurement and trigger model execution for the specified amount of time. Background \
measurements will continue, as will any infinite measurements set by a previous block.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_DELAY_CONSTANT, time)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_DELAY_CONSTANT" enumeration.',
                label: 'trigger.BLOCK_DELAY_CONSTANT',
            },
            {
                documentation: 'The amount of time to delay in seconds (+167e-9 to 10 000, or 0 for no delay).',
                label: 'time',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 13
        },
        documentation: 'Halt measurement and trigger model execution for a remotely programmable amount of time. \
Background measurements will continue, as will any infinite measurements set by a previous block.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_DELAY_DYNAMIC, trigger.USER_DELAY_*)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_DELAY_DYNAMIC" enumeration.',
                label: 'trigger.BLOCK_DELAY_DYNAMIC',
            },
            {
                documentation: 'Either USER_DELAY_M<n> or USER_DELAY_S<n> depending on whether you want to use the \
measure or source user delays, respectively. Where <n> is the index of the userdelay array attribute to use.',
                label: 'trigger.USER_DELAY_*',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 14
        },
        documentation: 'Send a given bit pattern (0 to 63) on the specified digital I/O line. The least significant \
bit maps to digital I/O line 1 and the most significant bit to line 6.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_DIGITAL_IO, bitPattern, bitMask)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_DIGITAL_IO" enumeration.',
                label: 'trigger.BLOCK_DIGITAL_IO',
            },
            {
                documentation: 'Sets the value that specifies the output line bit pattern (0 to 63).',
                label: 'bitPattern',
            },
            {
                documentation: 'Specifies the bit mask; if omitted, all lines are driven (0 to 63).',
                label: 'bitMask',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 15
        },
        documentation: 'Post the specified event to the event log. Using this block too often in a trigger model \
could overflow the event log. It may also take away from the time needed to process more critical trigger model \
blocks.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_LOG_EVENT, eventNumber, message)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_LOG_EVENT" enumeration.',
                label: 'trigger.BLOCK_LOG_EVENT',
            },
            {
                documentation: 'Some trigger.LOG_*. You can also set trigger.LOG_WARN_ABORT, which aborts the trigger \
model immediately and posts a warning message to the event log.',
                label: 'eventNumber',
            },
            {
                documentation: 'A string up to 31 characters.',
                label: 'message',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 16
        },
        documentation: 'Take the specified number of measurements. If an infinite measure count is given, then \
execution continues until the next MEASURE block.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_MEASURE[, bufferName][, count])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_MEASURE" enumeration.',
                label: 'trigger.BLOCK_MEASURE',
            },
            {
                documentation: 'The name of an existing buffer; if no buffer is defined, defbuffer1 is used.',
                label: 'bufferName',
            },
            {
                documentation: 'The number of readings to make before moving to the next block in the trigger model; \
set to a specific number or trigger.COUNT_INFINITE or trigger.COUNT_STOP to stop infinite measurements.',
                label: 'count',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 17
        },
        documentation: 'Placeholder block to prevent trigger model renumbering.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_NOP)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_NOP" enumeration.',
                label: 'trigger.BLOCK_NOP',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 18
        },
        documentation: 'Generate the specified trigger event and continue.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_NOTIFY, trigger.EVENT_NOTIFY*)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_NOTIFY" enumeration.',
                label: 'trigger.BLOCK_NOTIFY',
            },
            {
                documentation: 'Some trigger.EVENT_NOTIFY*.',
                label: 'trigger.EVENT_NOTIFY*',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 19
        },
        documentation: 'Resets the total branch count of the specified COUNTER block.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_RESET_BRANCH_COUNT, counter)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_RESET_BRANCH_COUNT" enumeration.',
                label: 'trigger.BLOCK_RESET_BRANCH_COUNT',
            },
            {
                documentation: 'The block number of the counter to be reset.',
                label: 'counter',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 20
        },
        documentation: 'Sets the source to the specified output state.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_SOURCE_OUTPUT, state)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_SOURCE_OUTPUT" enumeration.',
                label: 'trigger.BLOCK_SOURCE_OUTPUT',
            },
            {
                documentation: 'Either smu.OFF to turn off the output source or smu.ON to turn it on.',
                label: 'state',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 21
        },
        documentation: 'Halts execution until the specified event occurs.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_WAIT, event[, clear][, logic][, event][, event])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_WAIT" enumeration.',
                label: 'trigger.BLOCK_WAIT',
            },
            {
                documentation: 'Some trigger.EVENT_* that must occur before the trigger block allows trigger \
execution to continue.',
                label: 'event',
            },
            {
                documentation: 'To clear previously detected trigger events when entering the wait block use \
trigger.CLEAR_ENTER. To immediately act on any previously detected triggers and not clear them use \
trigger.CLEAR_NEVER. Defaults to trigger.CLEAR_NEVER.',
                label: 'clear',
            },
            {
                documentation: 'To force each event to occur before the trigger model continues use trigger.WAIT_AND. \
To continue trigger model execution if at least one event occurs use trigger.WAIT_OR.',
                label: 'logic',
            },
            {
                documentation: 'Some trigger.EVENT_* that must occur before the trigger block allows trigger \
execution to continue.',
                label: 'event',
            },
            {
                documentation: 'Some trigger.EVENT_* that must occur before the trigger block allows trigger \
execution to continue.',
                label: 'event',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 22
        },
        documentation: 'Take the specified number of measurements using a digitize function. If an infinite measure \
count is given, then execution continues until the next DIGITIZE block.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_DIGITIZE[, bufferName][, count])',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_DIGITIZE" enumeration.',
                label: 'trigger.BLOCK_DIGITIZE',
            },
            {
                documentation: 'The name of an existing buffer; if no buffer is defined, defbuffer1 is used.',
                label: 'bufferName',
            },
            {
                documentation: 'The number of readings to make before moving to the next block in the trigger model; \
set to a specific number or trigger.COUNT_INFINITE or trigger.COUNT_STOP to stop infinite measurements.',
                label: 'count',
            },
        ],
    },
    {
        data: {
            parameterTypes: new Map(),
            qualifier: 23
        },
        documentation: 'Sets the pulse source to the specified output state.',
        label: 'trigger.model.setblock(blockNumber, trigger.BLOCK_SOURCE_PULSE_OUTPUT, state)',
        parameters: [
            {
                documentation: 'The sequence of the block in the trigger model.',
                label: 'blockNumber',
            },
            {
                documentation: 'The "trigger.BLOCK_SOURCE_PULSE_OUTPUT" enumeration.',
                label: 'trigger.BLOCK_SOURCE_PULSE_OUTPUT',
            },
            {
                documentation: 'Either smu.OFF to turn off the pulse output source or smu.ON to turn it on.',
                label: 'state',
            },
        ],
    },
]
