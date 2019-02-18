/*
 *  Copyright Tektronix Inc.
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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'display'
    },
    {
        data: { domains: ['display'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nactivebuffer\n```\n\
\n\
Get to set the buffer used for measurements that are displayed on the front panel.'
        },
        kind: CompletionItemKind.Property,
        label: 'activebuffer',
    },
    {
        data: { domains: ['display'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction changescreen(screenName)\n```\n\
\n\
Change the currently displayed front-panel screen.'
        },
        kind: CompletionItemKind.Function,
        label: 'changescreen',
    },
    {
        data: { domains: ['display'] },
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
        data: { domains: ['display'] },
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
        data: { domains: ['display'] },
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
        data: { domains: ['display'] },
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
        data: { domains: ['display'] },
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
        data: { domains: ['display'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction settext(position, userDisplayText)\n```\n\
\n\
Set USER_SWIPE screen messages.\n\
\n\
Entering too many characters will cause a warning to be logged and the given text to be shortened to fit the screen.'
        },
        kind: CompletionItemKind.Function,
        label: 'settext',
    },
    {
        data: { domains: ['display'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction waitevent(timeout)\n```\n\
\n\
display.waitevent([timeout]) -> number, display.BUTTON_YES | BUTTON_NO | BUTTON_OK | BUTTON_CANCEL\n\
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
    {
        data: { domains: ['display'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndisplay.watchchannels\n```\n\
\n\
Get or set which channels are set to be watched from the front panel, you can define up to 20.\n\
\n\
Watch Channels affect what you see on the scan and statistics swipe screens. In the Reading Table, you can select \
the watch channels to filter the buffer so that only data from the watch channels is shown. In the Graph screen, \
you can select the watch channels as the traces to display on the graph.'
        },
        kind: CompletionItemKind.Property,
        label: 'watchchannels'
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'display.changescreen(screenName)',
        parameters: [
            {
                documentation: 'Some display.SCREEN_*.',
                label: 'screenName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'display.delete(promptID)',
        parameters: [
            {
                documentation: 'An object reference returned by display.prompt().',
                label: 'promptID',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'display.prompt(buttonSet, promptText)',
        parameters: [
            {
                documentation: 'Some display.BUTTONS_*.',
                label: 'buttonSet',
            },
            {
                documentation: 'A string that contains the text that is displayed above the prompts.',
                label: 'promptText',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'display.settext(position, userDisplayText)',
        parameters: [
            {
                documentation: 'Some display.TEXT*.\n\
TEXT1 places the text on the top line and TEXT2 on the bottom line.',
                label: 'position',
            },
            {
                documentation: 'String that contains the message for the USER swipe screen.\n\
If position is display.TEXT1, then up to 20 characters can be displayed. If position is display.TEXT2, then up to 32 \
characters are available.',
                label: 'userDisplayText',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'display.waitevent([timeout])',
        parameters: [
            {
                documentation: 'The amount of time to wait before timing out; time is 0 to 300 s, where 0 (default) \
waits indefinitely.',
                label: 'timeout',
            },
        ],
    },
]
