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

import { InstrumentSpec } from '..'
import { CompletionItem, ParameterInformation, SignatureInformation } from '../../decorators'

export const completions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'beeper'
    },
    {
        data: { domains: ['beeper'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction beep(duration, frequency)\n```\n\nbeeper.beep(duration, frequency)\n\
\n\
You can use the beeper of the instrument to provide an audible signal at a specific frequency and time duration.\n\
\n\
Using this function from a remote interface does not affect audible errors or key click settings that were made from \
the front panel.'
        },
        kind: CompletionItemKind.Function,
        label: 'beep'
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        getFormattedParameters: (spec: InstrumentSpec): Array<ParameterInformation> => {
            return [
                {
                    documentation: 'The amount of time to play the tone (%{0} to %{1} seconds).'
                        .replace('%{0}', spec.beeper.seconds.min.toString())
                        .replace('%{1}', spec.beeper.seconds.max.toString()),
                    index: 0,
                    label: 'duration'
                },
                {
                    documentation: 'The frequency of the beep (%{0} to %{1} Hz).'
                        .replace('%{0}', spec.beeper.hertz.min.toString())
                        .replace('%{1}', spec.beeper.hertz.max.toString()),
                    index: 1,
                    label: 'frequency'
                },
            ]
        },
        label: 'beeper.beep(duration, frequency)',
    },
]
