/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const upgradeCompletions: Array<CompletionItem> = [
    {
        detail: 'This function returns to a previous version of the DMM6500 firmware.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This function allows you to revert to an earlier version of the firmware.\n\nWhen you send this function, the instrument searches the USB flash drive that is inserted in the front-panel USB port for an upgrade file. If the file is found, the instrument performs the upgrade. An error is returned if an upgrade file is not found.\n\nIf you have a communications accessory card (KTTI-GPIB, KTTI-TSP, or KTTI-RS232) installed in the instrument, the firmware on the card is also reverted to the previous version.'
        },
        kind: CompletionItemKind.Function,
        label: 'upgrade.previous',
    },
    {
        detail: 'This function upgrades the DMM6500 firmware.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'When upgrade.unit() is used, the firmware is only loaded if the version of the firmware is newer than the existing version. If the version is older or at the same revision level, it is not upgraded.\n\nWhen you send this function, the instrument searches the USB flash drive that is inserted in the front-panel USB port for an upgrade file. If the file is found, the instrument verifies that the file is a newer version. If the version is older or at the same revision level, it is not upgraded, although it does request a reboot. If it is a newer version, the instrument performs the upgrade. An error event message is returned if no upgrade file is found.\n\nIf you have a communications accessory card (KTTI-GPIB, KTTI-TSP, or KTTI-RS232) installed in the instrument, the firmware on the card is also upgraded.'
        },
        kind: CompletionItemKind.Function,
        label: 'upgrade.unit',
    },
]

const upgradeSignatures: Array<SignatureInformation> = new Array()

export async function getUpgradeCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(upgradeCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getUpgradeSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(upgradeSignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
