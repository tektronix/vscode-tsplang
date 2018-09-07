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

import { ApiSpec, CommandDocumentation, InstrumentSpec } from '..'

import { getBeeperCommandSet } from './beeper'
import { getBufferCommandSet } from './buffer'
import { getBufferEnumCommandSet } from './buffer-enums'
import { getBufferWriteCommandSet } from './buffer-write'
import { getBufferVarCommandSet } from './bufferVar'
import { getCreateconfigscriptCommandSet } from './createconfigscript'
import { getDataqueueCommandSet } from './dataqueue'
import { getDelayCommandSet } from './delay'
import { getDigioCommandSet } from './digio'
import { getDigioEnumCommandSet } from './digio-enums'
import { getDigioLineCommandSet } from './digio-line'
import { getDisplayCommandSet } from './display'
import { getEventlogCommandSet } from './eventlog'
import { getEventlogEnumCommandSet } from './eventlog-enums'
import { getExitCommandSet } from './exit'
import { getFileCommandSet } from './file'
import { getFileEnumCommandSet } from './file-enums'
import { getFormatCommandSet } from './format'
import { getFormatEnumCommandSet } from './format-enums'
import { getGpibCommandSet } from './gpib'
// import { getLanCompletions, getLanSignatures } from './lan'
// import { getLanEnumCompletions } from './lan-enums'
// import { getLocalnodeCompletions, getLocalnodeSignatures } from './localnode'
// import { getLocalnodeEnumCompletions } from './localnode-enums'
// import { getNodeCompletions, getNodeSignatures } from './node'
// import { getOpcCompletions } from './opc'
// import { getPrintbufferCompletions, getPrintbufferSignatures } from './printbuffer'
// import { getPrintnumberCompletions, getPrintnumberSignatures } from './printnumber'
// import { getResetCompletions, getResetSignatures } from './reset'
// import { getScriptCompletions, getScriptSignatures } from './script'
// import { getScriptVarCompletions, getScriptVarSignatures } from './scriptVar'
// import { getSmuCompletions } from './smu'
// import { getSmuEnumCompletions } from './smu-enums'
// import { getSmuInterlockCompletions, getSmuInterlockDocs } from './smu-interlock'
// import { getSmuMeasureCompletions, getSmuMeasureDocs, getSmuMeasureSignatures } from './smu-measure'
// import { getSmuMeasureAutozeroCompletions } from './smu-measure-autozero'
// import { getSmuMeasureConfiglistCompletions, getSmuMeasureConfiglistSignatures } from './smu-measure-configlist'
// import { getSmuMeasureFilterCompletions } from './smu-measure-filter'
// import { getSmuMeasureLimitCompletions } from './smu-measure-limit'
// import { getSmuMeasureLimitHighCompletions } from './smu-measure-limit-high'
// import { getSmuMeasureLimitLowCompletions } from './smu-measure-limit-low'
// import { getSmuMeasureMathCompletions } from './smu-measure-math'
// import { getSmuMeasureMathMxbCompletions } from './smu-measure-math-mxb'
// import { getSmuMeasureRelCompletions, getSmuMeasureRelDocs } from './smu-measure-rel'
// import { getSmuSourceCompletions, getSmuSourceSignatures } from './smu-source'
// import { getSmuSourceConfiglistCompletions, getSmuSourceConfiglistSignatures } from './smu-source-configlist'
// import { getSmuSourceIlimitCompletions } from './smu-source-ilimit'
// import { getSmuSourceProtectCompletions } from './smu-source-protect'
// import { getSmuSourceVlimitCompletions } from './smu-source-vlimit'
// import { getStatusCompletions } from './status'
// import { getStatusEnumCompletions } from './status-enums'
// import { getStatusOperationCompletions, getStatusOperationSignatures } from './status-operation'
// import { getStatusQuestionableCompletions, getStatusQuestionableSignatures } from './status-questionable'
// import { getStatusStandardCompletions } from './status-standard'
// import { getStatusStandardEnumCompletions } from './status-standard-enums'
// import { getTimerCompletions } from './timer'
// import { getTriggerCompletions, getTriggerSignatures } from './trigger'
// import { getTriggerBlenderCompletions, getTriggerBlenderSignatures } from './trigger-blender'
// import { getTriggerDiginCompletions, getTriggerDiginSignatures } from './trigger-digin'
// import { getTriggerDigoutCompletions } from './trigger-digout'
// import { getTriggerEnumCompletions } from './trigger-enums'
// import { getTriggerLaninCompletions, getTriggerLaninSignatures } from './trigger-lanin'
// import { getTriggerLanoutCompletions } from './trigger-lanout'
// import { getTriggerModelCompletions, getTriggerModelSignatures } from './trigger-model'
// import { getTriggerTimerCompletions, getTriggerTimerSignatures } from './trigger-timer'
// import { getTriggerTimerStartCompletions } from './trigger-timer-start'
// import { getTriggerTsplinkinCompletions, getTriggerTsplinkinSignatures } from './trigger-tsplinkin'
// import { getTriggerTsplinkoutCompletions } from './trigger-tsplinkout'
// import { getTsplinkCompletions, getTsplinkSignatures } from './tsplink'
// import { getTsplinkEnumCompletions } from './tsplink-enums'
// import { getTsplinkLineCompletions } from './tsplink-line'
// import { getTspnetCompletions, getTspnetSignatures } from './tspnet'
// import { getTspnetEnumCompletions } from './tspnet-enums'
// import { getTspnetTspCompletions, getTspnetTspSignatures } from './tspnet-tsp'
// import { getUpgradeCompletions } from './upgrade'
// import { getUserstringCompletions, getUserstringSignatures } from './userstring'
// import { getWaitcompleteCompletions, getWaitcompleteSignatures } from './waitcomplete'

// const completions: Array<CompletionItem> = new Array()
// const signatures: Array<SignatureInformation> = new Array()

// let docs: Map<string, CommandDocumentation>

function flattenMap<K, V>(mapArray: Array<Map<K, V>>): Map<K, V> {
    const superMap: Map<K, V> | undefined = mapArray.pop()

    if (superMap === undefined) {
        return new Map()
    }

    mapArray.forEach((subMap: Map<K, V>) => {
        subMap.forEach((value: V, key: K) => {
            superMap.set(key, value)
        })
    })

    return superMap
}

export function resolveCompletionNamespace(item: CompletionItem): string {
    if (item.data === undefined) {
        return item.label
    }

    return [item.label].concat(item.data).reverse().join('')
}

export function resolveSignatureNamespace(item: SignatureInformation): string | undefined {
    const openParamIndex: number = item.label.indexOf('(')

    if (openParamIndex === -1) {
        return
    }

    return item.label.slice(0, openParamIndex)
}

export interface CommandSet {
    completionDocs?: Map<string, CommandDocumentation>
    completions: Array<CompletionItem>
    signatures?: Array<SignatureInformation>
}

export async function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletionDocs: Array<Map<string, CommandDocumentation>> = new Array()
            const resultCompletions: Array<CompletionItem> = new Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            // TODO: build up our command set
            // apiSpecs.forEach((api: ApiSpec) => {

            // })

            resolve({
                completionDocs: flattenMap(resultCompletionDocs),
                completions: resultCompletions,
                signatures: resultSignatures
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

// export async function getCompletions(): Promise<Array<CompletionItem>> {
//     return completions
//         .concat(await getBeeperCompletions())
//         .concat(await getBufferCompletions())
//         .concat(await getBufferEnumCompletions())
//         .concat(await getBufferWriteCompletions())
//         .concat(await getBufferVarCompletions())
//         .concat(await getCreateconfigscriptCompletions())
//         .concat(await getDataqueueCompletions())
//         .concat(await getDelayCompletions())
//         .concat(await getDigioCompletions())
//         .concat(await getDigioEnumCompletions())
//         .concat(await getDigioLineCompletions())
//         .concat(await getDisplayCompletions())
//         .concat(await getEventlogCompletions())
//         .concat(await getEventlogEnumCompletions())
//         .concat(await getExitCompletions())
//         .concat(await getFileCompletions())
//         .concat(await getFileEnumCompletions())
//         .concat(await getFormatCompletions())
//         .concat(await getFormatEnumCompletions())
//         .concat(await getGpibCompletions())
//         .concat(await getLanCompletions())
//         .concat(await getLanEnumCompletions())
//         .concat(await getLocalnodeCompletions())
//         .concat(await getLocalnodeEnumCompletions())
//         .concat(await getNodeCompletions())
//         .concat(await getOpcCompletions())
//         .concat(await getPrintbufferCompletions())
//         .concat(await getPrintnumberCompletions())
//         .concat(await getResetCompletions())
//         .concat(await getScriptCompletions())
//         .concat(await getScriptVarCompletions())
//         .concat(await getSmuCompletions())
//         .concat(await getSmuEnumCompletions())
//         .concat(await getSmuInterlockCompletions())
//         .concat(await getSmuMeasureAutozeroCompletions())
//         .concat(await getSmuMeasureCompletions())
//         .concat(await getSmuMeasureConfiglistCompletions())
//         .concat(await getSmuMeasureFilterCompletions())
//         .concat(await getSmuMeasureLimitCompletions())
//         .concat(await getSmuMeasureLimitHighCompletions())
//         .concat(await getSmuMeasureLimitLowCompletions())
//         .concat(await getSmuMeasureMathCompletions())
//         .concat(await getSmuMeasureMathMxbCompletions())
//         .concat(await getSmuMeasureRelCompletions())
//         .concat(await getSmuSourceCompletions())
//         .concat(await getSmuSourceConfiglistCompletions())
//         .concat(await getSmuSourceIlimitCompletions())
//         .concat(await getSmuSourceProtectCompletions())
//         .concat(await getSmuSourceVlimitCompletions())
//         .concat(await getStatusCompletions())
//         .concat(await getStatusEnumCompletions())
//         .concat(await getStatusOperationCompletions())
//         .concat(await getStatusQuestionableCompletions())
//         .concat(await getStatusStandardCompletions())
//         .concat(await getStatusStandardEnumCompletions())
//         .concat(await getTimerCompletions())
//         .concat(await getTriggerCompletions())
//         .concat(await getTriggerBlenderCompletions())
//         .concat(await getTriggerDiginCompletions())
//         .concat(await getTriggerDigoutCompletions())
//         .concat(await getTriggerEnumCompletions())
//         .concat(await getTriggerLaninCompletions())
//         .concat(await getTriggerLanoutCompletions())
//         .concat(await getTriggerModelCompletions())
//         .concat(await getTriggerTimerCompletions())
//         .concat(await getTriggerTimerStartCompletions())
//         .concat(await getTriggerTsplinkinCompletions())
//         .concat(await getTriggerTsplinkoutCompletions())
//         .concat(await getTsplinkCompletions())
//         .concat(await getTsplinkEnumCompletions())
//         .concat(await getTsplinkLineCompletions())
//         .concat(await getTspnetCompletions())
//         .concat(await getTspnetEnumCompletions())
//         .concat(await getTspnetTspCompletions())
//         .concat(await getUpgradeCompletions())
//         .concat(await getUserstringCompletions())
//         .concat(await getWaitcompleteCompletions())
// }

// export async function getDocs(): Promise<Map<string, CommandDocumentation>> {
//     return docs = new Map([
//         ...await getSmuInterlockDocs(),
//         ...await getSmuMeasureDocs(),
//         ...await getSmuMeasureRelDocs()
//     ])
// }

// export async function getSignatures(): Promise<Array<SignatureInformation>> {
//     return signatures
//         .concat(await getBeeperSignatures())
//         .concat(await getBufferSignatures())
//         .concat(await getBufferWriteSignatures())
//         .concat(await getCreateconfigscriptSignatures())
//         .concat(await getDataqueueSignatures())
//         .concat(await getDelaySignatures())
//         .concat(await getDigioSignatures())
//         .concat(await getDisplaySignatures())
//         .concat(await getEventlogSignatures())
//         .concat(await getLanSignatures())
//         .concat(await getLocalnodeSignatures())
//         .concat(await getNodeSignatures())
//         .concat(await getPrintbufferSignatures())
//         .concat(await getPrintnumberSignatures())
//         .concat(await getResetSignatures())
//         .concat(await getScriptSignatures())
//         .concat(await getScriptVarSignatures())
//         .concat(await getSmuMeasureSignatures())
//         .concat(await getSmuMeasureConfiglistSignatures())
//         .concat(await getSmuSourceSignatures())
//         .concat(await getSmuSourceConfiglistSignatures())
//         .concat(await getStatusOperationSignatures())
//         .concat(await getStatusQuestionableSignatures())
//         .concat(await getTriggerSignatures())
//         .concat(await getTriggerBlenderSignatures())
//         .concat(await getTriggerDiginSignatures())
//         .concat(await getTriggerLaninSignatures())
//         .concat(await getTriggerModelSignatures())
//         .concat(await getTriggerTimerSignatures())
//         .concat(await getTriggerTsplinkinSignatures())
//         .concat(await getTsplinkSignatures())
//         .concat(await getTspnetSignatures())
//         .concat(await getTspnetTspSignatures())
//         .concat(await getUserstringSignatures())
//         .concat(await getWaitcompleteSignatures())
// }
