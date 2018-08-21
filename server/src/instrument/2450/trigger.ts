'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const triggerCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'trigger'
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear any pending command triggers and discard the trigger event history.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction wait(timeout)\n```\n\ntrigger.wait(timeout) -> boolean\n\
\n\
Wait up to timeout seconds for a trigger on the active command interface. Returns true if a trigger was detected and \
false otherwise.\n\
\n\
If the active interface is GPIB, the trigger is set if a GET command is detected. On VXI-11, the trigger is set if \
the device_trigger method is invoked. If neither of those interfaces are active, then the trigger is set upon \
receiving a \\*TRG message.\n\
\n\
The event detector is automatically reset and rearmed when this function returns.'
        },
        kind: CompletionItemKind.Function,
        label: 'wait',
    },
]

const triggerSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'trigger.wait(timeout)',
        undefined,
        ParameterInformation.create(
            'timeout',
            'The timeout value in seconds.'
        ),
    ),
]

export async function getTriggerCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getTriggerSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
