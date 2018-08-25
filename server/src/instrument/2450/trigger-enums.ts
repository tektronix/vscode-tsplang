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

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

// starts on 15785.htm

const triggerEnumCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_ALWAYS'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_COUNTER'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_DELTA'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_LIMIT_CONSTANT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_LIMIT_DYNAMIC'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_ON_EVENT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_ONCE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BRANCH_ONCE_EXCLUDED'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_BUFFER_CLEAR'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_CONFIG_NEXT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_CONFIG_PREV'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_CONFIG_RECALL'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_DELAY_CONSTANT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_DELAY_DYNAMIC'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_DIGITAL_IO'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_LOG_EVENT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_MEASURE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_NOP'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_NOTIFY'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_RESET_BRANCH_COUNT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_SOURCE_OUTPUT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'BLOCK_WAIT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'CLEAR_ENTER'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'CLEAR_NEVER'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'COUNT_INFINITE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'COUNT_STOP'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Detects rising- or falling-edge triggers as input when the line is configured as an input or open \
drain.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EDGE_EITHER'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Detects falling-edge triggers as input when the line is configured as an input or open drain.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EDGE_FALLING'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Detects rising-edge triggers as input when the line is configured as an open drain.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EDGE_RISING'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger event blender 1.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_BLENDER1'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger event blender 2.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_BLENDER2'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'If the active interface is GPIB, then trigger upon receiving a GET command. On VXI-11, trigger \
when the device_trigger method is invoked. If neither of those interfaces are active, then trigger upon receiving a \
\\*TRG message.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_COMMAND'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on digital input line 1.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DIGIO1'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on digital input line 2.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DIGIO2'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on digital input line 3.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DIGIO3'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on digital input line 4.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DIGIO4'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on digital input line 5.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DIGIO5'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on digital input line 6.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DIGIO6'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Front-panel TRIGGER key press.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_DISPLAY'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 1.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN1'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 2.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN2'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 3.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN3'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 4.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN4'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 5.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN5'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 6.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN6'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 7.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN7'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger upon receiving an LXI trigger packet on LAN trigger 8.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_LAN8'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'No trigger event.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NONE'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 1 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY1'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 2 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY2'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 3 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY3'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 4 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY4'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 5 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY5'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 6 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY6'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 7 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY7'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when Notify Block 8 is executed by the trigger model.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_NOTIFY8'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when a source limit condition occurs.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_SOURCE_LIMIT'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when timer 1 expires.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TIMER1'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when timer 2 expires.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TIMER2'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when timer 3 expires.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TIMER3'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when timer 4 expires.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TIMER4'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on TSP-Link synchronization line 1.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TSPLINK1'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on TSP-Link synchronization line 2.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TSPLINK2'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Trigger when the configured edge is detected on TSP-Link synchronization line 3.'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'EVENT_TSPLINK3'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LIMIT_ABOVE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LIMIT_BELOW'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LIMIT_INSIDE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LIMIT_OUTSIDE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_INFO1'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_INFO2'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_INFO3'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_INFO4'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_WARN_ABORT'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_WARN1'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_WARN2'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_WARN3'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_WARN4'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_ERROR1'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_ERROR2'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_ERROR3'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOG_ERROR4'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOGIC_NEGATIVE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'LOGIC_POSITIVE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'OFF'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'ON'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_ABORTED'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_ABORTING'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_BUILDING'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_EMPTY'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_FAILED'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_IDLE'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_RUNNING'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_WAITING'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_M1'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_M2'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_M3'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_M4'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_M5'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_S1'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_S2'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_S3'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_S4'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'USER_DELAY_S5'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'WAIT_AND'
    },
    {
        data: ['trigger'],
        kind: CompletionItemKind.EnumMember,
        label: 'WAIT_OR'
    },
]

export async function getTriggerEnumCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
