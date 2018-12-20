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

import { CompletionItemKind, MarkupKind } from 'vscode-languageserver'

import { CompletionItem } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_CANCEL'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_NO'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OK'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_YES'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION1'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION2'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION3'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION4'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION5'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION6'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION7'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION8'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION9'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION10'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_NONE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_OK'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_CANCEL'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_OKCANCEL'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_YESNO'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_YESNOCANCEL'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'FORMAT_EXPONENT'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'FORMAT_PREFIX'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_DECIMAL'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_EXPONENT'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_INTEGER'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_PREFIX'
    },
    {
        data: { domains: ['display'] },
        deprecated: true,
        documentation: {
            kind: MarkupKind.Markdown,
            value: '*deprecated* — use display.SCREEN_READING_TABLE'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_DATASHEET'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_GRAPH'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_GRAPH_SWIPE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_HISTOGRAM'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_HOME'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_HOME_LARGE_READING'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_READING_TABLE'
    },
    {
        data: { domains: ['display'] },
        deprecated: true,
        documentation: {
            kind: MarkupKind.Markdown,
            value: '*deprecated* — use display.SCREEN_GRAPH_SWIPE'
        },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_PLOT_SWIPE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_SETTINGS_SWIPE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_SOURCE_SWIPE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_STATS_SWIPE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_USER_SWIPE'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_ANY'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_UPPER'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_UPPER_LOWER'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_BUFFER_NAME'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_100'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_75'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_50'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_25'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_OFF'
    },
    {
        data: { domains: ['display'] },
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_BLACKOUT'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'TEXT1'
    },
    {
        data: { domains: ['display'] },
        exclusive: true,
        kind: CompletionItemKind.EnumMember,
        label: 'TEXT2'
    },
]
