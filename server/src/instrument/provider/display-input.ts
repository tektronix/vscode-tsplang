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

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, InstrumentSpec } from '..'

import { CommandSet, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

const displayInputCompletions: Array<CompletionItem> = [
    {
        data: ['display'],
        kind: CompletionItemKind.Module,
        label: 'input'
    },
    {
        data: ['input', 'display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction number(dialogTitle, numberFormat, defaultValue, minimumValue, maximumValue)\n\
```\n\
\n\
display.input.number(dialogTitle[, display.NFORMAT_\\*][, defaultValue][, minimumValue][, maximumValue]) -> \
number | nil\n\
\n\
Display a number prompt and return the number entered from the front-panel; nil if Cancel is pressed.\n\
\n\
The prompt is displayed until it has been responded to.'
        },
        kind: CompletionItemKind.Function,
        label: 'number',
    },
    {
        data: ['input', 'display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\n\
function option(dialogTitle, buttonTitle1, buttonTitle2, buttonTitle3, buttonTitle4, buttonTitle5, buttonTitle6, \
buttonTitle7, buttonTitle8, buttonTitle9, buttonTitle10)\n\
```\n\
\n\
display.input.option(dialogTitle, buttonTitle1, buttonTitle2[, buttonTitle3][, buttonTitle4][, buttonTitle5][, \
buttonTitle6][, buttonTitle7][, buttonTitle8][, buttonTitle9][, buttonTitle10]) -> display.BUTTON_OPTION<n> | nil\n\
\n\
Display a custom multi-selection prompt and return display.BUTTON_OPTION<n> where <n> is the one-indexed button that \
was selected from the front-panel display; nil if Cancel is pressed.\n\
\n\
Buttons are created and numbered (<n>) from top to bottom, left to right. If you have more than five buttons, they \
are placed into two columns.\n\
\n\
The prompt is displayed until it has been responded to.'
        },
        kind: CompletionItemKind.Function,
        label: 'option',
    },
    {
        data: ['input', 'display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction prompt(buttonSet, dialogTitle)\n```\n\
\n\
display.input.prompt(display.BUTTONS_\\*, dialogTitle) -> display.BUTTON_CANCEL | BUTTON_NO | BUTTON_OK | BUTTON_YES\n\
\n\
Display a simple multi-selection prompt and return the button selected from the front-panel. For a non-blocking \
prompt, see display.prompt().\n\
\n\
The prompt is displayed until it has been responded to by the user.'
        },
        kind: CompletionItemKind.Function,
        label: 'prompt',
    },
    {
        data: ['input', 'display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction string(dialogTitle, textFormat)\n```\n\
\n\
display.input.string(dialogTitle[, display.SFORMAT_\\*]) -> string | nil\n\
\n\
Display a string prompt and return the text entered from the front-panel; nil if Cancel is pressed.\n\
\n\
The prompt is displayed until it has been responded to.'
        },
        kind: CompletionItemKind.Function,
        label: 'string',
    },
]

const displayInputSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'display.input.number(dialogTitle[, numberFormat][, defaultValue][, minimumValue][, maximumValue])',
        undefined,
        ParameterInformation.create(
            'dialogTitle',
            'A string that contains the text to be displayed as the title of the dialog box on the front-panel \
display; can be up to 32 characters.'
        ),
        ParameterInformation.create(
            'numberFormat',
            'One of:\n\
display.NFORMAT_INTEGER (default)\n\
display.NFORMAT_DECIMAL\n\
display.NFORMAT_EXPONENT\n\
display.NFORMAT_PREFIX'
        ),
        ParameterInformation.create(
            'defaultValue',
            'Value that is initially displayed in the displayed keypad.'
        ),
        ParameterInformation.create(
            'minimumValue',
            'The lowest value that can be entered.'
        ),
        ParameterInformation.create(
            'maximumValue',
            'The highest value that can be entered.'
        ),
    ),
    SignatureInformation.create(
        'display.input.option(dialogTitle, buttonTitle1, buttonTitle2[, buttonTitle3][, buttonTitle4][, \
buttonTitle5][, buttonTitle6][, buttonTitle7][, buttonTitle8][, buttonTitle9][, buttonTitle10])',
        undefined,
        ParameterInformation.create(
            'dialogTitle',
            'A string that contains the text to be displayed as the title of the dialog box on the front-panel \
display; can be up to 32 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle1',
            'A string that contains the name of the first button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle2',
            'A string that contains the name of the second button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle2',
            'A string that contains the name of the second button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle3',
            'A string that contains the name of the third button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle4',
            'A string that contains the name of the fourth button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle5',
            'A string that contains the name of the fifth button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle6',
            'A string that contains the name of the sixth button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle7',
            'A string that contains the name of the seventh button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle8',
            'A string that contains the name of the eighth button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle9',
            'A string that contains the name of the ninth button; up to 15 characters.'
        ),
        ParameterInformation.create(
            'buttonTitle10',
            'A string that contains the name of the tenth button; up to 15 characters.'
        ),
    ),
    SignatureInformation.create(
        'display.input.prompt(buttonSet[, dialogTitle])',
        undefined,
        ParameterInformation.create(
            'buttonSet',
            'One of:\n\
display.BUTTONS_OK\n\
display.BUTTONS_CANCEL\n\
display.BUTTONS_OKCANCEL\n\
display.BUTTONS_YESNO\n\
display.BUTTONS_YESNOCANCEL'
        ),
        ParameterInformation.create(
            'dialogTitle',
            'A string that contains the text to be displayed as the title of the dialog box on the front-panel \
display; can be up to 127 characters.'
        ),
    ),
    SignatureInformation.create(
        'display.input.string(dialogTitle[, textFormat])',
        undefined,
        ParameterInformation.create(
            'dialogTitle',
            'A string that contains the text to be displayed as the title of the dialog box on the front-panel \
display; can be up to 32 characters.'
        ),
        ParameterInformation.create(
            'textFormat',
            'One of:\n\
display.SFORMAT_ANY (default)\n\
display.SFORMAT_UPPER_LOWER\n\
display.SFORMAT_UPPER\n\
display.SFORMAT_BUFFER_NAME'
        ),
    ),
]

export async function getCommandSet(cmd: ApiSpec, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            const cmds: Array<ApiSpec> = new Array({ label: cmd.label })
            if (cmd.children !== undefined) {
                cmds.concat(cmd.children)
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                displayInputCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                displayInputSignatures.forEach((signature: SignatureInformation) => {
                    const signaNamespace = resolveSignatureNamespace(signature)

                    if (signaNamespace === undefined) {
                        throw new Error('Unable to resolve signature namespace for ' + signature.label)
                    }

                    if (cmdItem.label.localeCompare(signaNamespace) === 0) {
                        resultSignatures.push(signature)
                    }
                })
            })

            resolve({
                completions: resultCompletions,
                signatures: resultSignatures
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

// export async function getDisplayInputCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(displayInputCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getDisplayInputSignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(displayInputSignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }