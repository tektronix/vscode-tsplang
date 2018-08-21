import { CompletionItem, SignatureInformation } from 'vscode-languageserver'

import { getBeeperCompletions, getBeeperSignatures } from './beeper'
import { getBufferCompletions, getBufferSignatures } from './buffer'
import { getBufferEnumCompletions } from './buffer-enums'
import { getBufferWriteCompletions, getBufferWriteSignatures } from './buffer-write'
import { getBufferVarCompletions } from './bufferVar'
import { getCreateconfigscriptCompletions, getCreateconfigscriptSignatures } from './createconfigscript'
import { getDataqueueCompletions, getDataqueueSignatures } from './dataqueue'
import { getDelayCompletions, getDelaySignatures } from './delay'
import { getDigioCompletions, getDigioSignatures } from './digio'
import { getDigioEnumCompletions } from './digio-enums'
import { getDigioLineCompletions } from './digio-line'
import { getDisplayCompletions, getDisplaySignatures } from './display'
import { getEventlogCompletions, getEventlogSignatures } from './eventlog'
import { getEventlogEnumCompletions } from './eventlog-enums'
import { getExitCompletions } from './exit'
import { getFileCompletions } from './file'
import { getFileEnumCompletions } from './file-enums'
import { getFormatCompletions } from './format'
import { getFormatEnumCompletions } from './format-enums'
import { getGpibCompletions } from './gpib'
import { getLanCompletions, getLanSignatures } from './lan'
import { getLanEnumCompletions } from './lan-enums'
import { getLocalnodeCompletions, getLocalnodeSignatures } from './localnode'
import { getLocalnodeEnumCompletions } from './localnode-enums'
import { getNodeCompletions, getNodeSignatures } from './node'
import { getOpcCompletions } from './opc'
import { getPrintCompletions, getPrintSignatures } from './print'
import { getPrintbufferCompletions, getPrintbufferSignatures } from './printbuffer'
import { getPrintnumberCompletions, getPrintnumberSignatures } from './printnumber'
import { getResetCompletions, getResetSignatures } from './reset'
import { getScriptCompletions, getScriptSignatures } from './script'
import { getScriptVarCompletions, getScriptVarSignatures } from './scriptVar'
import { getSmuCompletions } from './smu'
import { getSmuEnumCompletions } from './smu-enums'
import { getSmuInterlockCompletions } from './smu-interlock'
import { getSmuMeasureCompletions, getSmuMeasureSignatures } from './smu-measure'
import { getSmuMeasureAutozeroCompletions } from './smu-measure-autozero'
import { getSmuMeasureConfiglistCompletions, getSmuMeasureConfiglistSignatures } from './smu-measure-configlist'
import { getSmuMeasureFilterCompletions } from './smu-measure-filter'
import { getSmuMeasureLimitCompletions } from './smu-measure-limit'
import { getSmuMeasureLimitHighCompletions } from './smu-measure-limit-high'
import { getSmuMeasureLimitLowCompletions } from './smu-measure-limit-low'
import { getSmuMeasureMathCompletions } from './smu-measure-math'
import { getSmuMeasureMathMxbCompletions } from './smu-measure-math-mxb'
import { getSmuMeasureRelCompletions } from './smu-measure-rel'
import { getSmuSourceCompletions, getSmuSourceSignatures } from './smu-source'
import { getSmuSourceConfiglistCompletions, getSmuSourceConfiglistSignatures } from './smu-source-configlist'
import { getSmuSourceIlimitCompletions } from './smu-source-ilimit'
import { getSmuSourceProtectCompletions } from './smu-source-protect'
import { getSmuSourceVlimitCompletions } from './smu-source-vlimit'
import { getStatusCompletions } from './status'
import { getStatusEnumCompletions } from './status-enums'
import { getStatusOperationCompletions, getStatusOperationSignatures } from './status-operation'
import { getStatusQuestionableCompletions, getStatusQuestionableSignatures } from './status-questionable'
import { getStatusStandardCompletions } from './status-standard'
import { getStatusStandardEnumCompletions } from './status-standard-enums'
import { getTimerCompletions } from './timer'
import { getTriggerCompletions, getTriggerSignatures } from './trigger'
import { getTriggerBlenderCompletions, getTriggerBlenderSignatures } from './trigger-blender'
import { getTriggerDiginCompletions, getTriggerDiginSignatures } from './trigger-digin'
import { getTriggerDigoutCompletions } from './trigger-digout'
import { getTriggerEnumCompletions } from './trigger-enums'
import { getTriggerLaninCompletions, getTriggerLaninSignatures } from './trigger-lanin'
import { getTriggerLanoutCompletions } from './trigger-lanout'
import { getTriggerModelCompletions, getTriggerModelSignatures } from './trigger-model'
import { getTriggerTimerCompletions, getTriggerTimerSignatures } from './trigger-timer'
import { getTriggerTimerStartCompletions } from './trigger-timer-start'
import { getTriggerTsplinkinCompletions, getTriggerTsplinkinSignatures } from './trigger-tsplinkin'
import { getTriggerTsplinkoutCompletions } from './trigger-tsplinkout'
import { getTsplinkCompletions, getTsplinkSignatures } from './tsplink'
import { getTsplinkEnumCompletions } from './tsplink-enums'
import { getTsplinkLineCompletions } from './tsplink-line'
import { getTspnetCompletions, getTspnetSignatures } from './tspnet'
import { getTspnetEnumCompletions } from './tspnet-enums'
import { getTspnetTspCompletions, getTspnetTspSignatures } from './tspnet-tsp'
import { getUpgradeCompletions } from './upgrade'
import { getUserstringCompletions, getUserstringSignatures } from './userstring'
import { getWaitcompleteCompletions, getWaitcompleteSignatures } from './waitcomplete'

const completions2450: Array<CompletionItem> = new Array()
const signatures2450: Array<SignatureInformation> = new Array()

export async function get2450Completions(): Promise<Array<CompletionItem>> {
    return completions2450
        .concat(await getBeeperCompletions())
        .concat(await getBufferCompletions())
        .concat(await getBufferEnumCompletions())
        .concat(await getBufferWriteCompletions())
        .concat(await getBufferVarCompletions())
        .concat(await getCreateconfigscriptCompletions())
        .concat(await getDataqueueCompletions())
        .concat(await getDelayCompletions())
        .concat(await getDigioCompletions())
        .concat(await getDigioEnumCompletions())
        .concat(await getDigioLineCompletions())
        .concat(await getDisplayCompletions())
        .concat(await getEventlogCompletions())
        .concat(await getEventlogEnumCompletions())
        .concat(await getExitCompletions())
        .concat(await getFileCompletions())
        .concat(await getFileEnumCompletions())
        .concat(await getFormatCompletions())
        .concat(await getFormatEnumCompletions())
        .concat(await getGpibCompletions())
        .concat(await getLanCompletions())
        .concat(await getLanEnumCompletions())
        .concat(await getLocalnodeCompletions())
        .concat(await getLocalnodeEnumCompletions())
        .concat(await getNodeCompletions())
        .concat(await getOpcCompletions())
        .concat(await getPrintCompletions())
        .concat(await getPrintbufferCompletions())
        .concat(await getPrintnumberCompletions())
        .concat(await getResetCompletions())
        .concat(await getScriptCompletions())
        .concat(await getScriptVarCompletions())
        .concat(await getSmuCompletions())
        .concat(await getSmuEnumCompletions())
        .concat(await getSmuInterlockCompletions())
        .concat(await getSmuMeasureAutozeroCompletions())
        .concat(await getSmuMeasureCompletions())
        .concat(await getSmuMeasureConfiglistCompletions())
        .concat(await getSmuMeasureFilterCompletions())
        .concat(await getSmuMeasureLimitCompletions())
        .concat(await getSmuMeasureLimitHighCompletions())
        .concat(await getSmuMeasureLimitLowCompletions())
        .concat(await getSmuMeasureMathCompletions())
        .concat(await getSmuMeasureMathMxbCompletions())
        .concat(await getSmuMeasureRelCompletions())
        .concat(await getSmuSourceCompletions())
        .concat(await getSmuSourceConfiglistCompletions())
        .concat(await getSmuSourceIlimitCompletions())
        .concat(await getSmuSourceProtectCompletions())
        .concat(await getSmuSourceVlimitCompletions())
        .concat(await getStatusCompletions())
        .concat(await getStatusEnumCompletions())
        .concat(await getStatusOperationCompletions())
        .concat(await getStatusQuestionableCompletions())
        .concat(await getStatusStandardCompletions())
        .concat(await getStatusStandardEnumCompletions())
        .concat(await getTimerCompletions())
        .concat(await getTriggerCompletions())
        .concat(await getTriggerBlenderCompletions())
        .concat(await getTriggerDiginCompletions())
        .concat(await getTriggerDigoutCompletions())
        .concat(await getTriggerEnumCompletions())
        .concat(await getTriggerLaninCompletions())
        .concat(await getTriggerLanoutCompletions())
        .concat(await getTriggerModelCompletions())
        .concat(await getTriggerTimerCompletions())
        .concat(await getTriggerTimerStartCompletions())
        .concat(await getTriggerTsplinkinCompletions())
        .concat(await getTriggerTsplinkoutCompletions())
        .concat(await getTsplinkCompletions())
        .concat(await getTsplinkEnumCompletions())
        .concat(await getTsplinkLineCompletions())
        .concat(await getTspnetCompletions())
        .concat(await getTspnetEnumCompletions())
        .concat(await getTspnetTspCompletions())
        .concat(await getUpgradeCompletions())
        .concat(await getUserstringCompletions())
        .concat(await getWaitcompleteCompletions())
}

export async function get2450Signatures(): Promise<Array<SignatureInformation>> {
    return signatures2450
        .concat(await getBeeperSignatures())
        .concat(await getBufferSignatures())
        .concat(await getBufferWriteSignatures())
        .concat(await getCreateconfigscriptSignatures())
        .concat(await getDataqueueSignatures())
        .concat(await getDelaySignatures())
        .concat(await getDigioSignatures())
        .concat(await getDisplaySignatures())
        .concat(await getEventlogSignatures())
        .concat(await getLanSignatures())
        .concat(await getLocalnodeSignatures())
        .concat(await getNodeSignatures())
        .concat(await getPrintSignatures())
        .concat(await getPrintbufferSignatures())
        .concat(await getPrintnumberSignatures())
        .concat(await getResetSignatures())
        .concat(await getScriptSignatures())
        .concat(await getScriptVarSignatures())
        .concat(await getSmuMeasureSignatures())
        .concat(await getSmuMeasureConfiglistSignatures())
        .concat(await getSmuSourceSignatures())
        .concat(await getSmuSourceConfiglistSignatures())
        .concat(await getStatusOperationSignatures())
        .concat(await getStatusQuestionableSignatures())
        .concat(await getTriggerSignatures())
        .concat(await getTriggerBlenderSignatures())
        .concat(await getTriggerDiginSignatures())
        .concat(await getTriggerLaninSignatures())
        .concat(await getTriggerModelSignatures())
        .concat(await getTriggerTimerSignatures())
        .concat(await getTriggerTsplinkinSignatures())
        .concat(await getTsplinkSignatures())
        .concat(await getTspnetSignatures())
        .concat(await getTspnetTspSignatures())
        .concat(await getUserstringSignatures())
        .concat(await getWaitcompleteSignatures())
}
