/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const localnodeCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute contains the type of access users have to the instrument through different interfaces.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When access is set to full, the instrument accepts commands from any interface with no login or password.\n\nWhen access is set to exclusive, you must log out of one remote interface and log into another one to change interfaces. You do not need a password with this access.\n\nProtected access is similar to exclusive access, except that you must enter a password when logging in.\n\nWhen the access is set to locked out, a password is required to change interfaces, including the front-panel interface.\n\nUnder any access type, if a script is running on one remote interface when a command comes in from another remote interface, the command is ignored and the message "FAILURE: A script is running, use ABORT to stop it" is generated.'
        },
        kind: CompletionItemKind.Property,
        label: 'localnode.access',
    },
    {
        detail: 'This function retrieves the instrument date and time.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The time is returned in UTC time. UTC time is specified as the number of seconds since Jan 1, 1970, UTC. You can use UTC time from a local time specification, or you can use UTC time from another source (for example, your computer).'
        },
        kind: CompletionItemKind.Function,
        label: 'localnode.gettime',
    },
    {
        detail: 'This attribute contains the power line frequency setting that is used for NPLC calculations.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The instrument automatically detects the power line frequency when the instrument is powered on. Power line frequency can be 50Hz, 60Hz, or 400Hz.'
        },
        kind: CompletionItemKind.Constant,
        label: 'localnode.linefreq',
    },
    {
        detail: 'This attribute stores the model number.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Constant,
        label: 'localnode.model',
    },
    {
        detail: 'This attribute stores the instrument password.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the access to the instrument is set to protected or lockout, this is the password that is used to gain access.\n\nIf you forget the password, you can reset the password to the default:'
        },
        kind: CompletionItemKind.Property,
        label: 'localnode.password',
    },
    {
        detail: 'This attribute determines if the instrument generates prompts in response to command messages.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When the prompting mode is enabled, the instrument generates prompts when the instrument is ready to take another command. Because the prompt is not generated until the previous command completes, enabling prompts provides handshaking with the instrument to prevent buffer overruns.\n\nWhen prompting is enabled, the instrument might generate the following prompts:\n\nCommands do not generate prompts. The instrument generates prompts in response to command completion.\n\nPrompts are enabled or disabled only for the remote interface that is active when you send the command. For example, if you enable prompts when the LAN connection is active, they will not be enabled for a subsequent USB connection.'
        },
        kind: CompletionItemKind.Property,
        label: 'localnode.prompts',
    },
    {
        detail: 'This attribute enables and disables the generation of prompts for IEEE Std 488.2 common commands.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this attribute is enabled, the IEEE Std 488.2 common commands generate prompts if prompting is enabled with the localnode.prompts attribute. If localnode.prompts4882 is enabled, limit the number of *trg commands sent to a running script to 50 regardless of the setting of the localnode.prompts attribute.\n\nWhen this attribute is disabled, IEEE Std 488.2 common commands will not generate prompts. When using the *trg command with a script that executes trigger.wait() repeatedly, disable prompting to avoid problems associated with the command interface input queue filling.'
        },
        kind: CompletionItemKind.Property,
        label: 'localnode.prompts4882',
    },
    {
        detail: 'This attribute stores the instrument\'s serial number.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This indicates the instrument serial number.'
        },
        kind: CompletionItemKind.Constant,
        label: 'localnode.serialno',
    },
    {
        detail: 'This function sets the date and time of the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Internally, the instrument bases time in UTC time. UTC time is specified as the number of seconds since Jan 1, 1970, UTC. You can use UTC time from a local time specification, or you can use UTC time from another source (for example, your computer).\n\nWhen called without a parameter (the first form), the function returns the current time.'
        },
        kind: CompletionItemKind.Function,
        label: 'localnode.settime',
    },
    {
        detail: 'This attribute sets whether or not the instrument automatically outputs generated events to the remote interface.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Enable this attribute to have the instrument output generated events to the remote interface.\n\nEvents are output after a command message is executed but before prompts are issued (if prompts are enabled with localnode.prompts).\n\nIf this attribute is disabled, use eventlog.next() to retrieve unread events from the event log.\n\nEvents are enabled or disabled only for the remote interface that is active when you send the command. For example, if you enable show events when the GPIB connection is active, they will not be enabled for a subsequent USB connection.'
        },
        kind: CompletionItemKind.Property,
        label: 'localnode.showevents',
    },
    {
        detail: 'This attribute stores the firmware version of the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute indicates the version number of the firmware that is presently running in the instrument.'
        },
        kind: CompletionItemKind.Constant,
        label: 'localnode.version',
    },
]

const localnodeSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'localnode.settime(year, month, day, hour, minute, second)',
        undefined,
        ParameterInformation.create(
            'year',
            'Year; must be more than 1970.'
        ),
        ParameterInformation.create(
            'month',
            'Month (1 to 12).'
        ),
        ParameterInformation.create(
            'day',
            'Day (1 to 31).'
        ),
        ParameterInformation.create(
            'hour',
            'Hour in 24-hour time format (0 to 23).'
        ),
        ParameterInformation.create(
            'minute',
            'Minute (0 to 59).'
        ),
        ParameterInformation.create(
            'second',
            'Second (0 to 59).'
        ),
    ),
]

export async function getLocalnodeCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(localnodeCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getLocalnodeSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(localnodeSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
