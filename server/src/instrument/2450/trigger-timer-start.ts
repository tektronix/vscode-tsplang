'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

/* TODO: CompletionItem.documentation.value */

const triggerTimerStartCompletions: Array<CompletionItem> = [
    {
        data: ['timer', 'trigger'],
        kind: CompletionItemKind.Module,
        label: 'start'
    },
    {
        data: ['start', 'timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute configures the fractional seconds of an alarm or a time in the future when the timer will start.\n\nThis command configures the alarm of the timer.\n\nWhen the timer is enabled, the timer starts immediately if the timer is configured for a start time that has passed.'
        },
        kind: CompletionItemKind.Property,
        label: 'fractionalseconds',
    },
    {
        data: ['start', 'timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies when timer events are generated.\n\nWhen this is set to on, a trigger event is generated immediately when the timer is triggered.\n\nWhen it is set to off, a trigger event is generated when the timer elapses. This generates the event trigger.EVENT_TIMERN.'
        },
        kind: CompletionItemKind.Property,
        label: 'generate',
    },
    {
        data: ['start', 'timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command indicates if an event was ignored because the event detector was already in the detected state when the event occurred.\n\nThis is an indication of the state of the event detector built into the timer itself. It does not indicate if an overrun occurred in any other part of the trigger model or in any other construct that is monitoring the delay completion event. It also is not an indication of a delay overrun.'
        },
        kind: CompletionItemKind.Constant,
        label: 'overrun',
    },
    {
        data: ['start', 'timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute configures the seconds of an alarm or a time in the future when the timer will start.\n\nThis command configures the alarm of the timer.\n\nWhen the timer is enabled, the timer starts immediately if the timer is configured for a start time that has passed.'
        },
        kind: CompletionItemKind.Property,
        label: 'seconds',
    },
    {
        data: ['start', 'timer', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute describes the event that starts the trigger timer.\n\nSet this attribute any trigger event to start the timer when that event occurs.\n\nSet this attribute to zero (0) to disable event processing and use the timer as a timer or alarm based on the start time.\n\nTrigger events are described in the table below.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]

export async function getTriggerTimerStartCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerTimerStartCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
