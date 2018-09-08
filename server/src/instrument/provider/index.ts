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

declare function require(moduleName: string): (cmd: ApiSpec, spec: InstrumentSpec) => Promise<CommandSet>

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

export interface CommandSet {
    completionDocs?: Map<string, CommandDocumentation>
    completions: Array<CompletionItem>
    signatures?: Array<SignatureInformation>
}
// export namespace CommandSet {
//     /**
//      * Concatenate setB onto setA.
//      */
//     export function concat(setA: CommandSet, setB: CommandSet): CommandSet {
//         let resultCompletionDocs: Map<string, CommandDocumentation> = new Map()
//         let resultSignatures: Array<SignatureInformation> = new Array()

//         let resultCompletions: Array<CompletionItem> = setA.completions

//         if (setA.completionDocs !== undefined) {
//             resultCompletionDocs = setA.completionDocs

//             if (setB.completionDocs !== undefined) {
//                 setB.completionDocs.forEach((value: CommandDocumentation, key: string) => {
//                     resultCompletionDocs.set(key, value)
//                 })
//             }
//         }
//         else if (setB.completionDocs !== undefined) {
//             resultCompletionDocs = setB.completionDocs
//         }

//         if (setA.signatures !== undefined) {
//             resultSignatures = resultSignatures.concat(setA.signatures)

//             if (setB.signatures !== undefined) {
//                 resultSignatures = resultSignatures.concat(setB.signatures)
//             }
//         }
//         else if (setB.signatures !== undefined) {
//             resultSignatures = resultSignatures.concat(setB.signatures)
//         }

//         resultCompletions = resultCompletions.concat(setB.completions)

//         return {
//             completionDocs: (resultCompletionDocs.size > 0) ? resultCompletionDocs : undefined,
//             completions: resultCompletions,
//             signatures: (resultSignatures.length > 0) ? resultSignatures : undefined
//         }
//     }
// }

export async function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const resultCompletionDocs: Map<string, CommandDocumentation> = new Map()
            const resultCompletions: Array<CompletionItem> = Array()
            const resultSignatures: Array<SignatureInformation> = new Array()

            apiSpecs.forEach((api: ApiSpec) => {
                // let cmdSet: CommandSet | undefined
                require(labelToModuleName(api.label))(api, spec)
                    .then((promiseValue: CommandSet): void => {
                        // extract completions documentation
                        if (promiseValue.completionDocs !== undefined) {
                            promiseValue.completionDocs.forEach((value: CommandDocumentation, key: string) => {
                                resultCompletionDocs.set(key, value)
                            })
                        }

                        // extract completion items
                        promiseValue.completions.forEach((value: CompletionItem) => {
                            resultCompletions.push(value)
                        })

                        // extract signatures
                        if (promiseValue.signatures !== undefined) {
                            promiseValue.signatures.forEach((value: SignatureInformation) => {
                                resultSignatures.push(value)
                            })
                        }
                    })

                // if (cmdSet === undefined) {
                //     throw new Error('Unable to resolve command-set for ' + api.label)
                // }

                // result = CommandSet.concat(result, cmdSet)

                // any enums must be loaded speparately due to the command storage scheme
                if (api.enums !== undefined) {
                    // let enumSet: CommandSet | undefined
                    require(labelToModuleName(api.label))(api, spec)
                        .then((promiseValue: CommandSet): void => {
                            // extract completions documentation
                            if (promiseValue.completionDocs !== undefined) {
                                promiseValue.completionDocs.forEach((value: CommandDocumentation, key: string) => {
                                    resultCompletionDocs.set(key, value)
                                })
                            }

                            // extract completion items
                            promiseValue.completions.forEach((value: CompletionItem) => {
                                resultCompletions.push(value)
                            })

                            // extract signatures
                            if (promiseValue.signatures !== undefined) {
                                promiseValue.signatures.forEach((value: SignatureInformation) => {
                                    resultSignatures.push(value)
                                })
                            }
                        })

                    // if (enumSet === undefined) {
                    //     throw new Error('Unable to resolve enumeration-set for ' + api.label)
                    // }

                    // result = CommandSet.concat(result, enumSet)
                }
            })

            resolve({
                completionDocs: (resultCompletionDocs.size > 0) ? resultCompletionDocs : undefined,
                completions: resultCompletions,
                signatures: (resultSignatures.length > 0) ? resultSignatures : undefined
            })
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
