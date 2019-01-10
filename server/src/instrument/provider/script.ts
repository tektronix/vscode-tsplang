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
        label: 'script'
    },
    {
        data: { domains: ['script'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction catalog()\n```\n\nscript.catalog() -> iterator function\n\
\n\
Returns a function that iterates over the name of each script stored in nonvolatile memory in no particular order.\n\
\n\
Example:\n\
```lua\nfor name in script.catalog() do\n\t// ...\nend\n```'
        },
        kind: CompletionItemKind.Function,
        label: 'catalog',
    },
    {
        data: { domains: ['script'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction delete(scriptName)\n```\n\nscript.delete(scriptName)\n\
\n\
Delete a script from run-time and nonvolatile memory.\n\
\n\
When a script is deleted, the global variable referring to it is also deleted. Script variables are readonly, so \
calling this function is necessary if you wish to reuse the variable name.'
        },
        kind: CompletionItemKind.Function,
        label: 'delete',
    },
    {
        data: { domains: ['script'] },
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction load(fileName)\n```\n\nscript.load(fileName) -> scriptVar\n\
\n\
Returns a reference to the specified script.\n\
\n\
For scripts residing on a USB flash drive, the given fileName should be absolute and begin with "/usb1/".'
        },
        kind: CompletionItemKind.Function,
        label: 'load',
    },
]

export const signatures: Array<SignatureInformation> = [
    {
        documentation: undefined,
        label: 'script.delete(scriptName)',
        parameters: [
            {
                documentation: 'A string that represents the name of the script.',
                label: 'scriptName',
            },
        ],
    },
    {
        documentation: undefined,
        label: 'script.load(fileName)',
        parameters: [
            {
                documentation: 'The filepath of the script file to load.\n\
Scripts residing on a USB flash drive should be absolute and begin with "/usb1/".',
                label: 'fileName',
            },
        ],
    },
]
