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

import { CompletionItemKind, MarkupKind, ParameterInformation } from 'vscode-languageserver'

import { InstrumentSpec } from '..'

import { InstrumentCompletionItem, InstrumentSignatureInformation } from '.'

export const completions: Array<InstrumentCompletionItem> = [
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.Module,
        label: 'input'
    },
    {
        data: { domains: ['input', 'display'] },
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
        data: { domains: ['input', 'display'] },
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
        data: { domains: ['input', 'display'] },
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
        data: { domains: ['input', 'display'] },
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

export const signatures: Array<InstrumentSignatureInformation> = [
    {
        data: {
            parameterTypes: new Map<number, Array<InstrumentCompletionItem>>([
                [
                    1,
                    [
                        {
                            kind: CompletionItemKind.Module,
                            label: 'display'
                        },
                        {
                            data: { domains: ['display'] },
                            documentation: {
                                kind: MarkupKind.PlainText,
                                value: 'Default input format.'
                            },
                            kind: CompletionItemKind.EnumMember,
                            label: 'NFORMAT_INTEGER',
                            preselect: true
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'NFORMAT_DECIMAL'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'NFORMAT_EXPONENT'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'NFORMAT_PREFIX'
                        },
                    ]
                ]
            ])
        },
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'display.input.number(dialogTitle[, numberFormat][, defaultValue][, minimumValue][, maximumValue])',
        parameters: [
            {
                documentation: 'A string that contains the text to be displayed as the title of the dialog box on the \
front-panel display; can be up to 32 characters.',
                label: 'dialogTitle',
            },
            {
                documentation: 'Some display.NFORMAT_*. Defaults to display.NFORMAT_INTEGER.',
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
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
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
        data: {
            parameterTypes: new Map<number, Array<InstrumentCompletionItem>>([
                [
                    0,
                    [
                        {
                            kind: CompletionItemKind.Module,
                            label: 'display'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'BUTTONS_OK'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'BUTTONS_CANCEL'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'BUTTONS_OKCANCEL'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'BUTTONS_YESNO'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'BUTTONS_YESNOCANCEL'
                        },
                    ]
                ]
            ])
        },
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'display.input.prompt(buttonSet[, dialogTitle])',
        parameters: [
            {
                documentation: 'Some display.BUTTONS_*.',
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
        data: {
            parameterTypes: new Map([
                [
                    1,
                    [
                        {
                            kind: CompletionItemKind.Module,
                            label: 'display'
                        },
                        {
                            data: { domains: ['display'] },
                            documentation: {
                                kind: MarkupKind.PlainText,
                                value: 'Default input format.'
                            },
                            kind: CompletionItemKind.EnumMember,
                            label: 'SFORMAT_ANY',
                            preselect: true
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'SFORMAT_UPPER_LOWER'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'SFORMAT_UPPER'
                        },
                        {
                            data: { domains: ['display'] },
                            kind: CompletionItemKind.EnumMember,
                            label: 'SFORMAT_BUFFER_NAME'
                        },
                    ]
                ]
            ])
        },
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'display.input.string(dialogTitle[, textFormat])',
        parameters: [
            {
                documentation: 'A string that contains the text to be displayed as the title of the dialog box on the \
front-panel display; can be up to 32 characters.',
                label: 'dialogTitle',
            },
            {
                documentation: 'Some display.SFORMAT_*. Defaults to display.SFORMAT_ANY.',
                label: 'textFormat',
            },
        ],
    },
]
