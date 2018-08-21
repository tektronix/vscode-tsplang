/* tslint:disable:max-line-length */
'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const displayCompletions: Array<CompletionItem> = [
    {
        detail: 'This attribute determines which buffer is used for measurements that are displayed on the front panel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The buffer defined by this command is used to store measurements data and is shown in the reading buffer indicator on the home screen of the instrument.'
        },
        kind: CompletionItemKind.Property,
        label: 'display.activebuffer',
    },
    {
        detail: 'This function changes which front-panel screen is displayed.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'The scan and channel options are only available if you have a card installed and if the front-panel TERMINALS button is set to REAR.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.changescreen',
    },
    {
        detail: 'This function clears the text from the front-panel USER swipe screen.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: ''
        },
        kind: CompletionItemKind.Function,
        label: 'display.clear',
    },
    {
        detail: 'This function allows you to remove a prompt on the front-panel display that was created with display.prompt().',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'You can use this command to remove the presently displayed prompt.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.delete',
    },
    {
        detail: 'This function allows you to create a prompt that requests a number from the user on the front-panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command prompts the instrument operator to enter a value.\n\nThe prompt is displayed until it has been responded to.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.input.number',
    },
    {
        detail: 'This function allows you to create an option dialog box with customizable buttons on the front-panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'Buttons are created from top to bottom, left to right. If you have more than five buttons, they are placed into two columns.\n\nThe prompt is displayed until it has been responded to. You can only send one input prompt command at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.input.option',
    },
    {
        detail: 'This function allows you to create a prompt that accepts a user response from the front-panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command waits for a user response to the prompt. You can use the text to ask questions that can be used to configure your test.\n\nThe prompt is displayed until it has been responded to by the user. You can only send one input prompt command at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.input.prompt',
    },
    {
        detail: 'This function allows you to create a dialog box that requests text from the user through the front-panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command creates a prompt to the instrument operator to enter a string value.\n\nThe prompt is displayed until it has been responded to. You can only send one input prompt command at a time.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.input.string',
    },
    {
        detail: 'This attribute sets the light output level of the front-panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command changes the light output of the front panel when a test requires different instrument illumination levels.\n\nThe change in illumination is temporary. The normal backlight settings are restored after a power cycle. You can use this to reset a display that is already dimmed by the front-panel Backlight Dimmer.'
        },
        kind: CompletionItemKind.Property,
        label: 'display.lightstate',
    },
    {
        detail: 'This function allows you to create an interactive dialog prompt that displays a custom message on the front-panel display.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command displays buttons and text on the front panel. You can set up scripts that respond to the buttons when they are selected.\n\nIf you send display.BUTTONS_NONE, the operator needs to press the EXIT key to clear the message from the front-panel display. You can also use the display.delete() command to remove the prompt.\n\nOnly one prompt can be active at a time.\n\nWhen the user presses a button, the button presses are returned as one of the following options:\n\nTo capture return values, you need to use display.waitevent() to wait for the user button selection.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.prompt',
    },
    {
        detail: 'This attribute determines the format that is used to display measurement readings on the front-panel display of the instrument.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This setting persists through reset() and power cycles.\n\nWhen Prefix is selected, prefixes are added to the units symbol, such as k (kilo) or m (milli). When Exponent is selected, exponents are used instead of prefixes. When the prefix option is selected, very large or very small numbers may be displayed with exponents.'
        },
        kind: CompletionItemKind.Property,
        label: 'display.readingformat',
    },
    {
        detail: 'This function defines the text that is displayed on the front-panel USER swipe screen.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command defines text messages for the USER swipe screen.\n\nIf you enter too many characters, the instrument displays a warning event and shortens the message to fit.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.settext',
    },
    {
        detail: 'This function causes the instrument to wait for a user to respond to a prompt that was created with a prompt command.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'This command waits until a user responds to a front-panel prompt that was created with the display.prompt() command.'
        },
        kind: CompletionItemKind.Function,
        label: 'display.waitevent',
    },
    {
        detail: 'This attribute determines which channels are set to be watch channels on the front panel.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: 'In the Reading Table, you can select the watch channels to filter the buffer so that only data from the watch channels is shown. In the Graph screens, you can select the watch channels as the traces to display on the graph.\n\nYou can define up to 20 channels as watch channels.'
        },
        kind: CompletionItemKind.Property,
        label: 'display.watchchannels',
    },
]

const displaySignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'display.changescreen(screenName)',
        undefined,
        ParameterInformation.create(
            'screenName',
            'The screen to display:\nHome screen: display.SCREEN_HOME\nHome screen with large readings: display.SCREEN_HOME_LARGE_READING\nReading table screen: display.SCREEN_READING_TABLE\nGraph screen (opens last selected tab): display.SCREEN_GRAPH\nHistogram: display.SCREEN_HISTOGRAM\nFUNCTIONS swipe screen: display.SCREEN_FUNCTIONS_SWIPE\nGRAPH swipe screen: display.SCREEN_GRAPH_SWIPE\nSECONDARY swipe screen: display.SCREEN_SECONDARY_SWIPE\nSETTINGS swipe screen: display.SCREEN_SETTINGS_SWIPE\nSTATISTICS swipe screen: display.SCREEN_STATS_SWIPE\nUSER swipe screen: display.SCREEN_USER_SWIPE (only displays USER swipe screen if user text is sent)\nCHANNEL swipe screen: display.SCREEN_CHANNEL_SWIPE (only available when a card is installed and rear terminals are selected)\nNONSWITCH swipe screen: display.SCREEN_NONSWITCH_SWIPE (only available when a card with non-switching channels is installed and the rear terminals are selected)\nSCAN swipe screen: display.SCREEN_SCAN_SWIPE (only available when a card is installed and the rear terminals are selected)\nChannel control screen: display.SCREEN_CHANNEL_CONTROL\nChannel settings screen: display.SCREEN_CHANNEL_SETTINGS\nChannel scan screen: display.SCREEN_CHANNEL_SCAN\nGo to a screen that uses minimal CPU resources: display.SCREEN_PROCESSING.'
        ),
    ),
    SignatureInformation.create(
        'display.delete(promptID)',
        undefined,
        ParameterInformation.create(
            'promptID',
            'The identifier defined by display.prompt().'
        ),
    ),
    SignatureInformation.create(
        'display.input.option(N)',
        undefined,
        ParameterInformation.create(
            'N',
            'A string that contains the names of subsequent buttons, where N is a number from 3 to 10; you can define up to 10 buttons; each button can be up to 15 characters.'
        ),
    ),
    SignatureInformation.create(
        'display.prompt(promptID, buttonID, promptText)',
        undefined,
        ParameterInformation.create(
            'promptID',
            'A set of characters that identifies the prompt; up to 63 characters.'
        ),
        ParameterInformation.create(
            'buttonID',
            'The type of prompt to display; choose one of the following options:\ndisplay.BUTTONS_NONE\ndisplay.BUTTONS_OK\ndisplay.BUTTONS_CANCEL\ndisplay.BUTTONS_OKCANCEL\ndisplay.BUTTONS_YESNO\ndisplay.BUTTONS_YESNOCANCEL.'
        ),
        ParameterInformation.create(
            'promptText',
            'A string that contains the text that is displayed above the prompts.'
        ),
    ),
    SignatureInformation.create(
        'display.settext(userDisplayText1, userDisplayText2)',
        undefined,
        ParameterInformation.create(
            'userDisplayText1',
            'String that contains the message for the top line of the USER swipe screen (up to 20 characters).'
        ),
        ParameterInformation.create(
            'userDisplayText2',
            'String that contains the message for the bottom line of the USER swipe screen (up to 32 characters).'
        ),
    ),
    SignatureInformation.create(
        'display.waitevent(objectID, subID)',
        undefined,
        ParameterInformation.create(
            'objectID',
            'A number that identifies the object, such as a prompt message, that is displayed on the front panel.'
        ),
        ParameterInformation.create(
            'subID',
            'The returned value after a button is pressed on the front panel:\ndisplay.BUTTON_YES\ndisplay.BUTTON_NO\ndisplay.BUTTON_OK\ndisplay.BUTTON_CANCEL.'
        ),
    ),
]

export async function getDisplayCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(displayCompletions)
            }
            catch (e) {
                reject(new Error(e.toString()))
            }
    })
}

export async function getDisplaySignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(displaySignatures)
        }
        catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
