/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const lanCompletions: Array<CompletionItem> = [
    {
        detail: 'This function specifies the LAN configuration for the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command specifies how the LAN IP address and other LAN settings are assigned. If automatic configuration is selected, the instrument automatically determines the LAN information. When method is automatic, the instrument first attempts to configure the LAN settings using dynamic host configuration protocol (DHCP). If DHCP fails, it tries dynamic link local addressing (DLLA). If DLLA fails, an error occurs.\n\nIf manual is selected, you must define the IP address. You can also assign a subnet mask, and default gateway. The IP address, subnet mask, and default gateway must be formatted in four groups of numbers, each separated by a decimal. If you do not specify a subnet mask or default gateway, the previous settings are used.'
        },
        kind: CompletionItemKind.Function,
        label: 'lan.ipconfig',
    },
    {
        detail: 'This attribute contains the LXI domain.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This attribute sets the LXI domain number.\n\nAll outgoing LXI packets are generated with this domain number. All inbound LXI packets are ignored unless they have this domain number.'
        },
        kind: CompletionItemKind.Property,
        label: 'lan.lxidomain',
    },
    {
        detail: 'This attribute describes the LAN MAC address.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The MAC address is a character string representing the MAC address of the instrument in hexadecimal notation. The string includes colons that separate the address octets.'
        },
        kind: CompletionItemKind.Constant,
        label: 'lan.macaddress',
    },
]

const lanSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'lan.ipconfig(method, ipV4Address, subnetMask, gateway)',
        undefined,
        ParameterInformation.create(
            'method',
            'The method for configuring LAN settings; it can be one of the following values:\nlan.MODE_AUTO: The instrument automatically assigns LAN settings\nlan.MODE_MANUAL: You specify the LAN settings.'
        ),
        ParameterInformation.create(
            'ipV4Address',
            'LAN IP address; must be a string specifying the IP address in dotted decimal notation.'
        ),
        ParameterInformation.create(
            'subnetMask',
            'The LAN subnet mask; must be a string in dotted decimal notation.'
        ),
        ParameterInformation.create(
            'gateway',
            'The LAN default gateway; must be a string in dotted decimal notation.'
        ),
    ),
]

export async function getLanCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(lanCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getLanSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(lanSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
