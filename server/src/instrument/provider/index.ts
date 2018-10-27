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
import { CompletionItem, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, BaseApiSpec, CommandSet, CommandSetInterface, InstrumentSpec } from '..'

export interface CommandDocumentation {
    kind: MarkupKind
    toString(spec: InstrumentSpec): string
}

export interface CompletionItemData {
    domains: Array<string>
    types?: Array<BaseApiSpec>
}

export interface InstrumentSignatureInformation extends SignatureInformation {
    getFormattedParameters(spec: InstrumentSpec): Array<ParameterInformation>
}

export interface InstrumentCompletionItem extends CompletionItem {
    data?: CompletionItemData
}

/**
 * Convert a root namespace label to the module name which stores it. For example, *buffer.write* becomes
 * *./buffer-write*
 *
 * @param label A root namespace.
 * @param getEnums true to load the enums file associated with the given label. Defaults to false.
 */
function labelToModuleName(label: string, getEnums: boolean = false): string {
    const result = './'.concat(label.replace(new RegExp(/\./, 'g'), '-'))

    return (getEnums) ? result.concat('-enums') : result
}

export function resolveCompletionNamespace(item: InstrumentCompletionItem): string {
    if (item.data === undefined) {
        return item.label
    }

    return [item.label].concat(item.data.domains).reverse().join('.')
}

export function resolveSignatureNamespace(item: SignatureInformation): string | undefined {
    const openParamIndex: number = item.label.indexOf('(')

    if (openParamIndex === -1) {
        return
    }

    return item.label.slice(0, openParamIndex).replace(new RegExp(/\[\]/, 'g'), '')
}

function filter(cmd: ApiSpec, spec: InstrumentSpec, isEnum: boolean, set: CommandSetInterface): CommandSetInterface {
    const cmds: Array<ApiSpec> = new Array()

    if (! isEnum
        && cmd.label.localeCompare('keywords') !== 0
        && cmd.label.localeCompare('functions') !== 0) {
        // add the root namespace to the list of cmds we want
        cmds.push({ label: cmd.label })
    }

    if (! isEnum) {
        if (cmd.children !== undefined) {
            cmd.children.forEach((child: BaseApiSpec) => { cmds.push(child) })
        }
    }
    else {
        if (cmd.enums !== undefined) {
            cmd.enums.forEach((enumItem: BaseApiSpec) => { cmds.push(enumItem) })
        }
    }

    const resultCompletionDocs: Map<string, CommandDocumentation> = new Map()
    let resultCompletions: Array<InstrumentCompletionItem> = new Array()
    let unformattedSignatures: Array<SignatureInformation> = new Array()

    cmds.forEach((cmdItem: ApiSpec) => {
        // filter completion documentation
        if (set.completionDocs !== undefined) {
            set.completionDocs.forEach((value: CommandDocumentation, key: string) => {
                // if this completion document is listed in the given API
                if (cmdItem.label.localeCompare(key) === 0) {
                    resultCompletionDocs.set(key, value)
                }
            })
        }

        // filter completion items
        resultCompletions = resultCompletions.concat(set.completions.filter(
            (value: InstrumentCompletionItem) => {
                return cmdItem.label.localeCompare(resolveCompletionNamespace(value)) === 0
            })
        )

        // filter signatures
        if (set.signatures !== undefined) {
            unformattedSignatures = unformattedSignatures.concat(set.signatures.filter(
                (value: InstrumentSignatureInformation) => {
                    const signaNamespace = resolveSignatureNamespace(value)

                    if (signaNamespace === undefined) {
                        throw new Error('Unable to resolve signature namespace for ' + cmd.label)
                    }

                    return cmdItem.label.localeCompare(signaNamespace) === 0
                })
            )
        }
    })

    // format signatures
    const resultSignatures: Array<InstrumentSignatureInformation> = new Array()
    unformattedSignatures.forEach((value: InstrumentSignatureInformation) => {
        resultSignatures.push({
            documentation: value.documentation,
            getFormattedParameters: (): Array<ParameterInformation> => new Array(),
            label: value.label,
            parameters: (value.parameters === undefined) ?
                value.getFormattedParameters(spec) :
                value.parameters.concat(value.getFormattedParameters(spec))
        })
    })

    return {
        completionDocs: (resultCompletionDocs.size === 0) ? undefined : resultCompletionDocs,
        completions: resultCompletions,
        signatures: (resultSignatures.length === 0) ? undefined : resultSignatures
    }
}

export async function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const result: CommandSet = new CommandSet(spec)

            apiSpecs.forEach((api: ApiSpec) => {
                const cmdModule: CommandSetInterface = require(labelToModuleName(api.label))

                result.add(filter(api, spec, false, {
                    completionDocs: cmdModule.completionDocs,
                    completions: cmdModule.completions,
                    signatures: cmdModule.signatures
                }))

                // any enums must be loaded speparately due to the command storage scheme
                if (api.enums !== undefined) {
                    const enumModule: CommandSetInterface = require(labelToModuleName(api.label, true))

                    result.add(filter(api, spec, true, {
                        completionDocs: enumModule.completionDocs,
                        completions: enumModule.completions,
                        signatures: enumModule.signatures
                    }))
                }
            })

            resolve(result)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
