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
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction createconfigscript(scriptName)\n```\n\ncreateconfigscript(scriptName)\n\
\n\
Create a setup file that captures most of the present settings of the instrument.\n\
\n\
If scriptName is set to the name of an existing script, an eventlog message is returned.\n\
\n\
Once created, the script that contains the settings can be run and edited like any other script.'
        },
        kind: CompletionItemKind.Function,
        label: 'createconfigscript',
    },
]

export const signatures: Array<InstrumentSignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => new Array(),
        label: 'createconfigscript(scriptName)',
        parameters: [
            {
                documentation: 'A string that represents the name of the script that will be created.',
                label: 'scriptName',
            },
        ],
    },
]
