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

import { getAcalCompletions, getAcalSignatures } from './acal'
import { getBeeperCompletions, getBeeperSignatures } from './beeper'
import { getBufferCompletions, getBufferSignatures } from './buffer'
import { getBufferVarCompletions, getBufferVarSignatures } from './bufferVar'
import { getCreateconfigscriptCompletions, getCreateconfigscriptSignatures } from './createconfigscript'
import { getDataqueueCompletions, getDataqueueSignatures } from './dataqueue'
import { getDelayCompletions, getDelaySignatures } from './delay'
import { getDigioCompletions, getDigioSignatures } from './digio'
import { getDisplayCompletions, getDisplaySignatures } from './display'
import { getEventlogCompletions, getEventlogSignatures } from './eventlog'
import { getExitCompletions, getExitSignatures } from './exit'
import { getFileCompletions, getFileSignatures } from './file'
import { getFormatCompletions, getFormatSignatures } from './format'
import { getGpibCompletions, getGpibSignatures } from './gpib'
import { getLanCompletions, getLanSignatures } from './lan'
import { getLocalnodeCompletions, getLocalnodeSignatures } from './localnode'
import { getNodeCompletions, getNodeSignatures } from './node'
import { getOpcCompletions, getOpcSignatures } from './opc'
import { getPrintbufferCompletions, getPrintbufferSignatures } from './printbuffer'
import { getPrintnumberCompletions, getPrintnumberSignatures } from './printnumber'
import { getResetCompletions, getResetSignatures } from './reset'
import { getScriptCompletions, getScriptSignatures } from './script'
import { getScriptVarCompletions, getScriptVarSignatures } from './scriptVar'
import { getSmuCompletions, getSmuSignatures } from './smu'
import { getStatusCompletions, getStatusSignatures } from './status'
import { getTimerCompletions, getTimerSignatures } from './timer'
import { getTriggerCompletions, getTriggerSignatures } from './trigger'
import { getTsplinkCompletions, getTsplinkSignatures } from './tsplink'
import { getTspnetCompletions, getTspnetSignatures } from './tspnet'
import { getUpgradeCompletions, getUpgradeSignatures } from './upgrade'
import { getUserstringCompletions, getUserstringSignatures } from './userstring'
import { getWaitcompleteCompletions, getWaitcompleteSignatures } from './waitcomplete'

const completions2461: Array<CompletionItem> = new Array()
const signatures2461: Array<SignatureInformation> = new Array()

export async function get2461Completions(): Promise<Array<CompletionItem>> {
    return completions2461
        .concat(await getAcalCompletions())
        .concat(await getBeeperCompletions())
        .concat(await getBufferCompletions())
        .concat(await getBufferVarCompletions())
        .concat(await getCreateconfigscriptCompletions())
        .concat(await getDataqueueCompletions())
        .concat(await getDelayCompletions())
        .concat(await getDigioCompletions())
        .concat(await getDisplayCompletions())
        .concat(await getEventlogCompletions())
        .concat(await getExitCompletions())
        .concat(await getFileCompletions())
        .concat(await getFormatCompletions())
        .concat(await getGpibCompletions())
        .concat(await getLanCompletions())
        .concat(await getLocalnodeCompletions())
        // .concat(await getNodeCompletions())
        .concat(await getOpcCompletions())
        .concat(await getPrintbufferCompletions())
        .concat(await getPrintnumberCompletions())
        .concat(await getResetCompletions())
        .concat(await getScriptCompletions())
        .concat(await getScriptVarCompletions())
        .concat(await getSmuCompletions())
        .concat(await getStatusCompletions())
        .concat(await getTimerCompletions())
        .concat(await getTriggerCompletions())
        .concat(await getTsplinkCompletions())
        .concat(await getTspnetCompletions())
        .concat(await getUpgradeCompletions())
        .concat(await getUserstringCompletions())
        .concat(await getWaitcompleteCompletions())
}

export async function get2461Signatures(): Promise<Array<SignatureInformation>> {
    return signatures2461
        .concat(await getAcalSignatures())
        .concat(await getBeeperSignatures())
        .concat(await getBufferSignatures())
        .concat(await getBufferVarSignatures())
        .concat(await getCreateconfigscriptSignatures())
        .concat(await getDataqueueSignatures())
        .concat(await getDelaySignatures())
        .concat(await getDigioSignatures())
        .concat(await getDisplaySignatures())
        .concat(await getEventlogSignatures())
        .concat(await getExitSignatures())
        .concat(await getFileSignatures())
        .concat(await getFormatSignatures())
        .concat(await getGpibSignatures())
        .concat(await getLanSignatures())
        .concat(await getLocalnodeSignatures())
        // .concat(await getNodeSignatures())
        .concat(await getOpcSignatures())
        .concat(await getPrintbufferSignatures())
        .concat(await getPrintnumberSignatures())
        .concat(await getResetSignatures())
        .concat(await getScriptSignatures())
        .concat(await getScriptVarSignatures())
        .concat(await getSmuSignatures())
        .concat(await getStatusSignatures())
        .concat(await getTimerSignatures())
        .concat(await getTriggerSignatures())
        .concat(await getTsplinkSignatures())
        .concat(await getTspnetSignatures())
        .concat(await getUpgradeSignatures())
        .concat(await getUserstringSignatures())
        .concat(await getWaitcompleteSignatures())
}
