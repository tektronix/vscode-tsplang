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

import { ApiSpec, CommandSetInterface, InstrumentSpec } from '..'

import { FormattableSignatureInformation, resolveCompletionNamespace, resolveSignatureNamespace } from '.'

export const completions: Array<CompletionItem> = [
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

export const signatures: Array<FormattableSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'display.input.number(dialogTitle[, numberFormat][, defaultValue][, minimumValue][, maximumValue])',
        parameters: [
            {
                documentation: 'A string that contains the text to be displayed as the title of the dialog box on the \
front-panel display; can be up to 32 characters.',
                label: 'dialogTitle',
            },
            {
                documentation: 'One of:\n\
display.NFORMAT_INTEGER (default)\n\
display.NFORMAT_DECIMAL\n\
display.NFORMAT_EXPONENT\n\
display.NFORMAT_PREFIX',
                label: 'numberFormat',
            },
            {
                documentation: 'Value that is initially displayed in the displayed keypad.',
                label: 'defaultValue',
            },
            {
                documentation: 'The lowest value that can be entered.',
                label: 'minimumValue',
            },
            {
                documentation: 'The highest value that can be entered.',
                label: 'maximumValue',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'display.input.option(dialogTitle, buttonTitle1, buttonTitle2[, buttonTitle3][, buttonTitle4][, \
buttonTitle5][, buttonTitle6][, buttonTitle7][, buttonTitle8][, buttonTitle9][, buttonTitle10])',
        parameters: [
            {
                documentation: 'A string that contains the text to be displayed as the title of the dialog box on the \
front-panel display; can be up to 32 characters.',
                label: 'dialogTitle',
            },
            {
                documentation: 'A string that contains the name of the first button; up to 15 characters.',
                label: 'buttonTitle1',
            },
            {
                documentation: 'A string that contains the name of the second button; up to 15 characters.',
                label: 'buttonTitle2',
            },
            {
                documentation: 'A string that contains the name of the second button; up to 15 characters.',
                label: 'buttonTitle2',
            },
            {
                documentation: 'A string that contains the name of the third button; up to 15 characters.',
                label: 'buttonTitle3',
            },
            {
                documentation: 'A string that contains the name of the fourth button; up to 15 characters.',
                label: 'buttonTitle4',
            },
            {
                documentation: 'A string that contains the name of the fifth button; up to 15 characters.',
                label: 'buttonTitle5',
            },
            {
                documentation: 'A string that contains the name of the sixth button; up to 15 characters.',
                label: 'buttonTitle6',
            },
            {
                documentation: 'A string that contains the name of the seventh button; up to 15 characters.',
                label: 'buttonTitle7',
            },
            {
                documentation: 'A string that contains the name of the eighth button; up to 15 characters.',
                label: 'buttonTitle8',
            },
            {
                documentation: 'A string that contains the name of the ninth button; up to 15 characters.',
                label: 'buttonTitle9',
            },
            {
                documentation: 'A string that contains the name of the tenth button; up to 15 characters.',
                label: 'buttonTitle10',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'display.input.prompt(buttonSet[, dialogTitle])',
        parameters: [
            {
                documentation: 'One of:\n\
display.BUTTONS_OK\n\
display.BUTTONS_CANCEL\n\
display.BUTTONS_OKCANCEL\n\
display.BUTTONS_YESNO\n\
display.BUTTONS_YESNOCANCEL',
                label: 'buttonSet',
            },
            {
                documentation: 'A string that contains the text to be displayed as the title of the dialog box on the \
front-panel display; can be up to 127 characters.',
                label: 'dialogTitle',
            },
        ],
    },
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<SignatureInformation> => new Array(),
        label: 'display.input.string(dialogTitle[, textFormat])',
        parameters: [
            {
                documentation: 'A string that contains the text to be displayed as the title of the dialog box on the \
front-panel display; can be up to 32 characters.',
                label: 'dialogTitle',
            },
            {
                documentation: 'One of:\n\
display.SFORMAT_ANY (default)\n\
display.SFORMAT_UPPER_LOWER\n\
display.SFORMAT_UPPER\n\
display.SFORMAT_BUFFER_NAME',
                label: 'textFormat',
            },
        ],
    },
]
