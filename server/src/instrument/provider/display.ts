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

const displayCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'display'
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction changescreen(screenName)\n```\n\ndisplay.changescreen(display.SCREEN_\\*)\n\
\n\
Change the currently displayed front-panel screen.'
        },
        kind: CompletionItemKind.Function,
        label: 'changescreen',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction clear()\n```\n\
\n\
Clear the text from the front-panel USER_SWIPE screen.'
        },
        kind: CompletionItemKind.Function,
        label: 'clear',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(promptID)\n```\n\ndisplay.delete(promptID)\n\
\n\
Remove the given prompt reference from the front-panel dispay.'
        },
        kind: CompletionItemKind.Function,
        label: 'delete',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndisplay.lightstate\n```\n\
\n\
Get or set the brightness of the front-panel display.\n\
\n\
Changing the front-panel brightness using this command is temporary. Previous backlight settings are restored after \
a power cycle.'
        },
        kind: CompletionItemKind.Property,
        label: 'lightstate',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction prompt(buttonSet, promptText)\n```\n\
\n\
display.prompt(display.BUTTONS_\\*, promptText) -> promptID\n\
\n\
Returns a reference to a prompt object.\n\
\n\
Prompts created with button set display.BUTTONS_NONE can be dismissed using the EXIT key or the display.delete() \
command.\n\
Only one prompt can be active at a time.\n\
\n\
To capture return values, use the display.waitevent() command.'
        },
        kind: CompletionItemKind.Function,
        label: 'prompt',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndisplay.readingformat\n```\n\
\n\
Get or set the measurement format used by the front-panel display.\n\
\n\
Can be set to prefix mode, where prefixes are added before the unit, or exponent mode, where exponents are used \
instead. While in prefix mode, very large and very small numbers may be displayed in exponent mode.\n\
\n\
This setting persists through reset() and power cycles.'
        },
        kind: CompletionItemKind.Property,
        label: 'readingformat',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction settext(position, userDisplayText)\n```\n\
\n\
display.settext(display.TEXT\\*, userDisplayText)\n\
\n\
Set USER_SWIPE screen messages.\n\
\n\
Entering too many characters will cause a warning to be logged and the given text to be shortened to fit the screen.'
        },
        kind: CompletionItemKind.Function,
        label: 'settext',
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction waitevent()\n```\n\
\n\
display.waitevent() -> number, display.BUTTON_YES | BUTTON_NO | BUTTON_OK | BUTTON_CANCEL\n\
\n\
Returns `promptID, buttonReturned` where \
*promptID* is a reference to the prompt object \
and *buttonReturned* is the button that was pressed.\n\
\n\
This command waits until a user responds to a front‑panel prompt that was created with the display.prompt() command.'
        },
        kind: CompletionItemKind.Function,
        label: 'waitevent',
    },
]

const displaySignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'display.changescreen(screenName)',
        undefined,
        ParameterInformation.create(
            'screenName',
            'One of:\n\
display.SCREEN_HOME\n\
display.SCREEN_HOME_LARGE_READING\n\
display.SCREEN_READING_TABLE\n\
display.SCREEN_GRAPH\n\
display.SCREEN_HISTOGRAM\n\
display.SCREEN_GRAPH_SWIPE\n\
display.SCREEN_SETTINGS_SWIPE\n\
display.SCREEN_SOURCE_SWIPE\n\
display.SCREEN_STATS_SWIPE\n\
display.SCREEN_USER_SWIPE'
        ),
    ),
    SignatureInformation.create(
        'display.delete(promptID)',
        undefined,
        ParameterInformation.create(
            'promptID',
            'An object reference returned by display.prompt().'
        ),
    ),
    SignatureInformation.create(
        'display.prompt(buttonSet, promptText)',
        undefined,
        ParameterInformation.create(
            'buttonSet',
            'One of:\n\
display.BUTTONS_NONE\n\
display.BUTTONS_OK\n\
display.BUTTONS_CANCEL\n\
display.BUTTONS_OKCANCEL\n\
display.BUTTONS_YESNO\n\
display.BUTTONS_YESNOCANCEL'
        ),
        ParameterInformation.create(
            'promptText',
            'A string that contains the text that is displayed above the prompts.'
        ),
    ),
    SignatureInformation.create(
        'display.settext(position, userDisplayText)',
        undefined,
        ParameterInformation.create(
            'position',
            'One of:\n\
display.TEXT1 (top line)\n\
display.TEXT2 (bottom line)'
        ),
        ParameterInformation.create(
            'userDisplayText',
            'String that contains the message for the USER swipe screen.\n\
If position is display.TEXT1, then up to 20 characters can be displayed. \
If position is display.TEXT2, then up to 32 characters are available.'
        ),
    ),
    SignatureInformation.create(
        'display.waitevent([timeout])',
        undefined,
        ParameterInformation.create(
            'timeout',
            'The amount of time to wait before timing out; time is 0 to 300 s, where 0 (default) waits indefinitely.'
        ),
        ParameterInformation.create(
            'subID',
            'The returned value after a button is pressed on the front panel. One of:\n\
display.BUTTON_YES\n\
display.BUTTON_NO\n\
display.BUTTON_OK\n\
display.BUTTON_CANCEL.'
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
                cmd.children.forEach((child: ApiSpec) => { cmds.push(child) })
            }

            cmds.forEach((cmdItem: ApiSpec) => {
                displayCompletions.forEach((completion: CompletionItem) => {
                    if (cmdItem.label.localeCompare(resolveCompletionNamespace(completion)) === 0) {
                        resultCompletions.push(completion)
                    }
                })

                displaySignatures.forEach((signature: SignatureInformation) => {
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

// export async function getDisplayCompletions(): Promise<Array<CompletionItem>> {
//     return new Promise<Array<CompletionItem>>((
//         resolve: (value?: Array<CompletionItem>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(displayCompletions)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }

// export async function getDisplaySignatures(): Promise<Array<SignatureInformation>> {
//     return new Promise<Array<SignatureInformation>>((
//         resolve: (value?: Array<SignatureInformation>) => void,
//         reject: (reason?: Error) => void
//     ): void => {
//         try {
//             resolve(displaySignatures)
//         } catch (e) {
//             reject(new Error(e.toString()))
//         }
//     })
// }
