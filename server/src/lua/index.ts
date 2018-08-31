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
import { CompletionItem, SignatureInformation } from 'vscode-languageserver'

import { getCoroutineCompletions, getCoroutineSignatures } from './coroutine'
import { getFunctionCompletions, getFunctionSignatures } from './functions'
import { getKeywordCompletions } from './keywords'

const completionsLua: Array<CompletionItem> = new Array()
const signaturesLua: Array<SignatureInformation> = new Array()

export async function getLuaCompletions(): Promise<Array<CompletionItem>> {
    return completionsLua
        .concat(await getCoroutineCompletions())
        .concat(await getFunctionCompletions())
        .concat(await getKeywordCompletions())
}

export async function getLuaSignatures(): Promise<Array<CompletionItem>> {
    return signaturesLua
        .concat(await getCoroutineSignatures())
        .concat(await getFunctionSignatures())
}
