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

import { ApiSpec, CommandSet, CommandSetInterface, InstrumentSpec } from '..'

/**
 * Convert a root namespace label to the module name which stores it. For example, *buffer.write* becomes
 * *./buffer-write*
 *
 * @param label A root namespace.
 * @param getEnums true to load the enums file associated with the given label. Defaults to false.
 */
function labelToModuleName(label: string, getEnums: boolean = false): string {
    const result = './'.concat(label.replace('.', '-'))

    return (getEnums) ? result.concat('-enums') : result
}

export function resolveCompletionNamespace(item: CompletionItem): string {
    if (item.data === undefined) {
        return item.label
    }

    return [item.label].concat(item.data).reverse().join('.')
}

export function resolveSignatureNamespace(item: SignatureInformation): string | undefined {
    const openParamIndex: number = item.label.indexOf('(')

    if (openParamIndex === -1) {
        return
    }

    return item.label.slice(0, openParamIndex).replace('[]', '')
}

export async function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const result: CommandSet = new CommandSet()

            apiSpecs.forEach((api: ApiSpec) => {
                const cmdModule: CommandSetInterface = require(labelToModuleName(api.label))

                result.add({
                    completionDocs: cmdModule.completionDocs,
                    completions: cmdModule.completions,
                    signatures: cmdModule.signatures
                })

                // any enums must be loaded speparately due to the command storage scheme
                if (api.enums !== undefined) {
                    const enumModule: CommandSetInterface = require(labelToModuleName(api.label, true))

                    result.add({
                        completionDocs: enumModule.completionDocs,
                        completions: enumModule.completions,
                        signatures: enumModule.signatures
                    })
                }
            })

            resolve(result)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
