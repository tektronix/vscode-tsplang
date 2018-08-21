'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

/* TODO: CompletionItem.documentation.value */

const triggerLanoutCompletions: Array<CompletionItem> = [
    {
        data: ['trigger'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available LAN events. Indexed from 1 to 8.'
        },
        kind: CompletionItemKind.Module,
        label: 'lanout'
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function simulates the occurrence of the trigger and generates the corresponding event.\n\nGenerates and sends a LAN trigger packet for the LAN event number specified.\n\nSets the pseudo line state to the appropriate state.\n\nThe following indexes provide the listed LXI events:'
        },
        kind: CompletionItemKind.Function,
        label: 'assert',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command prepares the event generator to send event messages. For TCP connections, this opens the TCP connection.\n\nThe event generator automatically disconnects when either the protocol or IP address for this event is changed.'
        },
        kind: CompletionItemKind.Function,
        label: 'connect',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute contains the LAN event connection state.\n\nThis is set to true when the LAN trigger is connected and ready to send trigger events after a successful trigger.lanout[N].connect()  command. If the LAN trigger is not ready to send trigger events, this value is false.\n\nThis attribute is also false when the trigger.lanout[N].protocol or trigger.lanout[N].ipaddress attribute is changed or when the remote connection closes the connection.'
        },
        kind: CompletionItemKind.Constant,
        label: 'connected',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function disconnects the LAN trigger event generator.\n\nWhen this command is set for TCP connections, this closes the TCP connection.\n\nThe LAN trigger automatically disconnects when either the trigger.lanout[N].protocol or trigger.lanout[N].ipaddress attributes for this event are changed.'
        },
        kind: CompletionItemKind.Function,
        label: 'disconnect',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies the address (in dotted‑decimal format) of UDP or TCP listeners.\n\nSets the IP address for outgoing trigger events.\n\nAfter you change this setting, you must send the connect command before outgoing messages can be sent.'
        },
        kind: CompletionItemKind.Property,
        label: 'ipaddress',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ntrigger.lanout[N].logic\n```\n\
\n\
Get or set the trigger logic for the event detector and output generator to trigger.LOGIC_\\*. Defaults to \
trigger.LOGIC_NEGATIVE.'
        },
        kind: CompletionItemKind.Property,
        label: 'logic',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the LAN protocol to use for sending trigger messages.\n\nThe LAN trigger listens for trigger messages on all the supported protocols. However, it uses the designated protocol for sending outgoing messages.\n\nAfter you change this setting, you must re-connect the LAN trigger event generator before you can send outgoing event messages.\n\nWhen multicast is selected, the trigger IP address is ignored and event messages are sent to the multicast address 224.0.23.159.'
        },
        kind: CompletionItemKind.Property,
        label: 'protocol',
    },
    {
        data: ['lanout', 'trigger'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute specifies which event causes a LAN trigger packet to be sent for this trigger. Set the event to one of the existing trigger events, which are shown in the following table.\n\nSetting this attribute to none disables automatic trigger generation.\n\nIf any events are detected before the trigger LAN connection is sent, the event is ignored and the action overrun is set.'
        },
        kind: CompletionItemKind.Property,
        label: 'stimulus',
    },
]

export async function getTriggerLanoutCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(triggerLanoutCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
