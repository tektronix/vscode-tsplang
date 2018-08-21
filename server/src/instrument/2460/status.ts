/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const statusCompletions: Array<CompletionItem> = [
    {
        detail: 'This function clears event registers and the event log.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command clears the event registers of the Questionable Event and Operation Event Register set. It does not affect the Questionable Event Enable or Operation Event Enable registers.'
        },
        kind: CompletionItemKind.Function,
        label: 'status.clear',
    },
    {
        detail: 'This attribute stores the status byte condition register.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command to read the status byte, which is returned as a numeric value.\n\nWhen an enabled status event occurs, a summary bit is set in this register to indicate the event occurrence. The returned value can indicate that one or more status events occurred. If  more than one bit of the register is set, statusByte equals the sum of their decimal weights. For example, if 129 is returned, bits B0 and B7 are set (1 + 128). See Understanding bit settings for additional information about reading bit values.\n\nThe meanings of the individual bits of this register are shown in the following table.'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.condition',
    },
    {
        detail: 'This attribute reads the Operation Event Register of the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command reads the contents of the Operation Condition Register, which is one of the Operation Event Registers.\n\nFor detail on interpreting the value of a register, see Understanding bit settings.'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.operation.condition',
    },
    {
        detail: 'This attribute sets or reads the contents of the Operation Event Enable Register of the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets or reads the contents of the Enable register of the Operation Event Register.\n\nWhen one of these bits is set, when the corresponding bit in the Operation Event Register or Operation Condition Register is set, the OSB bit in the Status Byte Register is set.'
        },
        kind: CompletionItemKind.Property,
        label: 'status.operation.enable',
    },
    {
        detail: 'This attribute reads the Operation Event Register of the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute reads the operation event register of the status model.\n\nThe instrument returns a decimal value that corresponds to the binary-weighted sum of all bits set in the register.'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.operation.event',
    },
    {
        detail: 'This function requests the mapped set event and mapped clear event status for a bit in the Operation Event Registers.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When you query the mapping for a specific bit, the instrument returns the events that were mapped to set and clear that bit. Zero (0) indicates that the bits have not been set.'
        },
        kind: CompletionItemKind.Function,
        label: 'status.operation.getmap',
    },
    {
        detail: 'This function maps events to bits in the Operation Event Register.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can map events to bits in the event registers with this command. This allows you to cause bits in the condition and event registers to be set or cleared when the specified events occur. You can use any valid event number as the event that sets or clears bits.\n\nWhen a mapped event is programmed to set bits, the corresponding bits in both the condition register and event register are set when the event is detected.\n\nWhen a mapped event is programmed to clear bits, the bit in the condition register is set to 0 when the event is detected.\n\nIf the event is set to zero (0), the bit is never set.\n\nSee Event numbers for information about event numbers.'
        },
        kind: CompletionItemKind.Function,
        label: 'status.operation.setmap',
    },
    {
        detail: 'This function resets all bits in the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function clears the event registers and the enable registers for operation and questionable. It will not clear the Service Request Enable Register (*SRE) to Standard Request Enable Register (*ESE).\n\nPreset does not affect the event queue.\n\nThe Standard Event Status Register is not affected by this command.'
        },
        kind: CompletionItemKind.Function,
        label: 'status.preset',
    },
    {
        detail: 'This attribute reads the Questionable Condition Register of the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command reads the contents of the Questionable Condition Register, which is one of the Questionable Event Registers.\n\nFor detail on interpreting the value of a register, see Understanding bit settings.'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.questionable.condition',
    },
    {
        detail: 'This attribute sets or reads the contents of the questionable event enable register of the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets or reads the contents of the Enable register of the Questionable Event Register.\n\nWhen one of these bits is set, when the corresponding bit in the Questionable Event Register or Questionable Condition Register is set, the MSB and QSM bits in the Status Byte Register are set.\n\nFor detail on interpreting the value of a register, see Understanding bit settings.'
        },
        kind: CompletionItemKind.Property,
        label: 'status.questionable.enable',
    },
    {
        detail: 'This attribute reads the Questionable Event Register.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This query reads the contents of the questionable status event register. After sending this command and addressing the instrument to talk, a value is sent to the computer. This value indicates which bits in the appropriate register are set.\n\nThe Questionable Register can be set to the numeric equivalent of the bit to set. To set more than one bit of the register, set the Questionable Register to the sum of their decimal weights. For example, to set bits B12 and B13, set the Questionable Register to 12,288 (which is the sum of 4,096 + 8,192).'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.questionable.event',
    },
    {
        detail: 'This function requests the mapped set event and mapped clear event status for a bit in the Questionable Event Registers.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When you query the mapping for a specific bit, the instrument returns the events that were mapped to set and clear that bit. Zero (0) indicates that the bits have not been set.'
        },
        kind: CompletionItemKind.Function,
        label: 'status.questionable.getmap',
    },
    {
        detail: 'This function maps events to bits in the questionable event registers.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can map events to bits in the event registers with this command. This allows you to cause bits in the condition and event registers to be set or cleared when the specified events occur. You can use any valid event number as the event that sets or clears bits.\n\nWhen a mapped event is programmed to set bits, the corresponding bits in both the condition register and event register are set when the event is detected.\n\nWhen a mapped event is programmed to clear bits, the bit in the condition register is set to 0 when the event is detected.\n\nIf the event is set to zero (0), the bit is never set.\n\nSee Event numbers for information about event numbers.'
        },
        kind: CompletionItemKind.Function,
        label: 'status.questionable.setmap',
    },
    {
        detail: 'This attribute stores the settings of the Service Request (SRQ) Enable Register.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command sets or clears the individual bits of the Status Request Enable Register.\n\nThe Status Request Enable Register is cleared when power is cycled or when a parameter value of 0 is sent with this command.\n\nThe instrument returns a decimal value that corresponds to the binary-weighted sum of all bits set in the register.'
        },
        kind: CompletionItemKind.Property,
        label: 'status.request_enable',
    },
    {
        detail: 'This attribute reads or sets the bits in the Status Enable register of the Standard Event Register.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When a bit in the Status Enable register is set on and the corresponding bit in the Standard Event Status register is set on, the ESB bit of the Status Byte Register is set to on.\n\nTo set a bit on, send the constant or value of the bit as the standardRegister parameter.\n\nYou can set the bit as a constant or a numeric value, as shown in the table below.  To set more than one bit of the register, you can send multiple constants with + between them. You can also set standardRegister to the sum of their decimal weights. For example, to set bits B0 and B2, set standardRegister to 5 (which is the sum of 1 + 4). You can also send:\n\nstatus.standard.enable = status.standard.OPC + status.standard.QYE\n\nWhen zero (0) is returned, no bits are set. You can also send 0 to clear all bits.\n\nThe instrument returns a decimal value that corresponds to the binary-weighted sum of all bits set in the register.\n\n\n\nCommand errors include:'
        },
        kind: CompletionItemKind.Property,
        label: 'status.standard.enable',
    },
    {
        detail: 'This attribute returns the contents of the Standard Event Status Register set of the status model.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When this command returns zero (0), no bits are set. You can send 0 to clear all bits.\n\nThe instrument returns a decimal value that corresponds to the binary-weighted sum of all bits set in the register.\n\n\n\nCommand errors include:'
        },
        kind: CompletionItemKind.Constant,
        label: 'status.standard.event',
    },
]

const statusSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'status.operation.getmap(setEvent, clearEvent, bitNumber)',
        undefined,
        ParameterInformation.create(
            'setEvent',
            'The event mapped to set this bit; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'clearEvent',
            'The event mapped to clear this bit; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'bitNumber',
            'The bit number to check.'
        ),
    ),
    SignatureInformation.create(
        'status.operation.setmap(bitNumber, setEvent, clearEvent)',
        undefined,
        ParameterInformation.create(
            'bitNumber',
            'The bit number that is mapped to an event (0 to 14).'
        ),
        ParameterInformation.create(
            'setEvent',
            'The number of the event that sets the bits in the condition and event registers; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'clearEvent',
            'The number of the event that clears the bit in the condition register; 0 if no mapping.'
        ),
    ),
    SignatureInformation.create(
        'status.questionable.getmap(setEvent, clearEvent, bitNumber)',
        undefined,
        ParameterInformation.create(
            'setEvent',
            'The event mapped to set this bit; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'clearEvent',
            'The event mapped to clear this bit; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'bitNumber',
            'The bit number to check (0 to 14).'
        ),
    ),
    SignatureInformation.create(
        'status.questionable.setmap(bitNumber, setEvent, clearEvent)',
        undefined,
        ParameterInformation.create(
            'bitNumber',
            'The bit number that is mapped to an event (0 to 14).'
        ),
        ParameterInformation.create(
            'setEvent',
            'The number of the event that sets the bits in the condition and event registers; 0 if no mapping.'
        ),
        ParameterInformation.create(
            'clearEvent',
            'The number of the event that clears the bit in the condition register; 0 if no mapping.'
        ),
    ),
]

export async function getStatusCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(statusCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getStatusSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(statusSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
