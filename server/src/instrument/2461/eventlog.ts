/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const eventlogCompletions: Array<CompletionItem> = [
    {
        detail: 'This function clears the event log.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command removes all events from the event log, including entries in the front-panel event log.'
        },
        kind: CompletionItemKind.Function,
        label: 'eventlog.clear',
    },
    {
        detail: 'This function returns the number of unread events in the event log.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'A count finds the number of unread events in the event log. You can specify the event types to return, or return the count for all events.\n\nThis command reports the number of events that have occurred since the command was last sent or since the event log was last cleared.\n\nEvents are read automatically when localnode.showevents is enabled. You can also read them individually with eventlog.next().'
        },
        kind: CompletionItemKind.Function,
        label: 'eventlog.getcount',
    },
    {
        detail: 'This function returns the oldest unread event message from the event log.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When an event occurs on the instrument, it is placed in the event log. The eventlog.next() command retrieves an unread event from the event log. Once an event is read, it can no longer be accessed remotely. However, it can be viewed on the front panel. When localnode.showevents is enabled, this command never returns an event because those events are automatically read and sent to the remote interface.\n\nTo read multiple events, execute this command multiple times.\n\nIf there are no entries in the event log, the following is returned:\n\nIf the event type is not defined, an event of any type is returned.'
        },
        kind: CompletionItemKind.Function,
        label: 'eventlog.next',
    },
    {
        detail: 'This function allows you to post your own text to the event log.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command to create your own event log entries and assign a severity level to them. This can be useful for debugging and status reporting.\n\nFrom the front panel, you must set the Log Warnings and Log Information options on to have the custom warning and information events placed into the event log.'
        },
        kind: CompletionItemKind.Function,
        label: 'eventlog.post',
    },
    {
        detail: 'This function saves the event log to a file on a USB flash drive.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command saves all event log entries to a USB flash drive.\n\nIf you do not define an event type, the instrument saves all event log entries.\n\nThe extension .csv is automatically added to the file name.'
        },
        kind: CompletionItemKind.Function,
        label: 'eventlog.save',
    },
]

const eventlogSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'eventlog.getcount(eventType)',
        undefined,
        ParameterInformation.create(
            'eventType',
            'Limits the return to specific event log types; set a cumulative integer value that represents the event log types to:\nErrors only: eventlog.SEV_ERROR or 1\nWarnings only: eventlog.SEV_WARN or 2\nErrors and warnings only: eventlog.SEV_WARN|eventlog.SEV_ERROR or 3\nInformation only: eventlog.SEV_INFO or 4\nErrors and information only: eventlog.SEV_INFO|eventlog.SEV_ERROR or 5\nWarnings and information only: eventlog.SEV_INFO|eventlog.SEV_WARN or 6\nAll events: eventlog.SEV_ALL or 7.'
        ),
    ),
    SignatureInformation.create(
        'eventlog.next(eventNumber, message, severity, nodeID, timeSeconds, timeNanoSeconds, eventType)',
        undefined,
        ParameterInformation.create(
            'eventNumber',
            'The event number.'
        ),
        ParameterInformation.create(
            'message',
            'A description of the event.'
        ),
        ParameterInformation.create(
            'severity',
            'The severity of the event:\nError: 1\nWarning: 2\nInformation: 4.'
        ),
        ParameterInformation.create(
            'nodeID',
            'The TSP-Link node where the event occurred or 0 if the event occurred on the local node.'
        ),
        ParameterInformation.create(
            'timeSeconds',
            'The seconds portion of the time when the event occurred.'
        ),
        ParameterInformation.create(
            'timeNanoSeconds',
            'The fractional seconds portion of the time when the event occurred.'
        ),
        ParameterInformation.create(
            'eventType',
            'Limits the return to specific event log types; set a cumulative integer value that represents the event log types to:\nErrors only: eventlog.SEV_ERROR or 1\nWarnings only: eventlog.SEV_WARN or 2\nErrors and warnings only: eventlog.SEV_WARN|eventlog.SEV_ERROR or 3\nInformation only: eventlog.SEV_INFO or 4\nErrors and information only: eventlog.SEV_INFO|eventlog.SEV_ERROR or 5\nWarnings and information only: eventlog.SEV_INFO|eventlog.SEV_WARN or 6\nAll events: eventlog.SEV_ALL or 7.'
        ),
    ),
    SignatureInformation.create(
        'eventlog.post(message, eventType)',
        undefined,
        ParameterInformation.create(
            'message',
            'String that contains the message.'
        ),
        ParameterInformation.create(
            'eventType',
            'The type of event; if no event is defined, defaults to eventlog.SEV_INFO:\nError: eventlog.SEV_ERROR or 1\nWarning: eventlog.SEV_WARN or 2\nInformation: eventlog.SEV_INFO or 4.'
        ),
    ),
    SignatureInformation.create(
        'eventlog.save(filename, eventType)',
        undefined,
        ParameterInformation.create(
            'filename',
            'A string that represents the name of the file to be saved.'
        ),
        ParameterInformation.create(
            'eventType',
            'Limits the return to specific event log types; set a cumulative integer value that represents the event log types to:\nErrors only: eventlog.SEV_ERROR or 1\nWarnings only: eventlog.SEV_WARN or 2\nErrors and warnings only: eventlog.SEV_WARN|eventlog.SEV_ERROR or 3\nInformation only: eventlog.SEV_INFO or 4\nErrors and information only: eventlog.SEV_INFO|eventlog.SEV_ERROR or 5\nWarnings and information only: eventlog.SEV_INFO|eventlog.SEV_WARN or 6\nAll events: eventlog.SEV_ALL or 7 (default).'
        ),
    ),
]

export async function getEventlogCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(eventlogCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getEventlogSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(eventlogSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
