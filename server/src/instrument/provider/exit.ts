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

import { InstrumentCompletionItem } from '../../wrapper'

export const completions: Array<InstrumentCompletionItem> = [
    {
        detail: 'This function stops a script that is presently running.',
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction exit()\n```\n\
\n\
Terminate the currently running script.\n\
\n\
Does not wait for overlapped commands to complete before exiting. \
If overlapped commands are required to finish, call waitcomplete() before calling exit().'
        },
        kind: CompletionItemKind.Function,
        label: 'exit',
    },
]
