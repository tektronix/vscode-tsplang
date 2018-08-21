'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const displayEnumCompletions: Array<CompletionItem> = [
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_CANCEL'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_NO'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OK'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_YES'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION1'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION2'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION3'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION4'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION5'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION6'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION7'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION8'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION9'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTON_OPTION10'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_NONE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_OK'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_CANCEL'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_OKCANCEL'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_YESNO'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'BUTTONS_YESNOCANCEL'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'FORMAT_EXPONENT'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'FORMAT_PREFIX'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_DECIMAL'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_EXPONENT'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_INTEGER'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'NFORMAT_PREFIX'
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '*deprecated* — use display.SCREEN_READING_TABLE'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_DATASHEET'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_GRAPH'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_GRAPH_SWIPE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_HISTOGRAM'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_HOME'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_HOME_LARGE_READING'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_READING_TABLE'
    },
    {
        data: ['display'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '*deprecated* — use display.SCREEN_GRAPH_SWIPE'
        },
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_PLOT_SWIPE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_SETTINGS_SWIPE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_SOURCE_SWIPE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_STATS_SWIPE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SCREEN_USER_SWIPE'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_ANY'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_UPPER'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'SFORMAT_UPPER_LOWER'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_100'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_75'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_50'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_25'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_LCD_OFF'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'STATE_BLACKOUT'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'TEXT1'
    },
    {
        data: ['display'],
        kind: CompletionItemKind.EnumMember,
        label: 'TEXT2'
    },
]

export async function getDisplayCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(displayEnumCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
