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

import { ParameterInformation, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, BaseApiSpec, ChildApiSpec, CommandSet, CommandSetInterface, ExclusiveCompletionApiSpec, InstrumentSpec, SignatureDataApiSpec } from '..'
import { CommandDocumentation, IndexedParameterInformation, InstrumentCompletionItem, InstrumentSignatureInformation } from '../../wrapper'

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

export function resolveSignatureNamespace(item: SignatureInformation): string {
    const openParamIndex: number = item.label.indexOf('(')

    if (openParamIndex === -1) {
        throw new Error('Signature label does not contain an open parenthesis.')
    }

    return item.label.slice(0, openParamIndex).replace(new RegExp(/\[\]/, 'g'), '')
}

/**
 * Returns all elements of the CommandSetInterface that can be found in the ApiSpec
 * (excluding Enumeration completions).
 */
function filter(
    namespace: ApiSpec,
    providerModule: CommandSetInterface,
    enumerations: Array<InstrumentCompletionItem>
): CommandSetInterface {
    // Create an object of Maps whose keys will match against ApiSpec labels.
    const providerMap = {
        completionDocs: new Map<string, CommandDocumentation>(),
        completions: CommandSetInterface.getCompletionMap(providerModule.completions),
        signatures: new Map<string, Array<InstrumentSignatureInformation>>()
    }

    // Re-instantiate the completionDoc property with content if this module has completionDocs.
    if (providerModule.completionDocs !== undefined) {
        providerMap.completionDocs = providerModule.completionDocs
    }

    // Re-instantiate the signatures property with content if this module has signatures.
    if (providerModule.signatures !== undefined) {
        providerMap.signatures = CommandSetInterface.getSignatureMap(providerModule.signatures)
    }

    const filteredModule: CommandSetInterface = {
        completions: new Array()
    }

    // The following labels are not to be treated as root namespaces.
    if (namespace.label.localeCompare('keywords') !== 0
        && namespace.label.localeCompare('functions') !== 0) {
        // If this module contains a completion with the namespace label.
        if (providerMap.completions.has(namespace.label)) {
            const completions = providerMap.completions.get(namespace.label)

            if (completions === undefined) {
                throw new Error(`Filter Error: no completions found with the label "${namespace.label}".`)
            }

            // Add root namespaces to the results.
            filteredModule.completions.push(...completions)
        }
    }

    if (namespace.children !== undefined) {
        namespace.children.forEach((child: ChildApiSpec) => {
            // Get any completionDocs for this child.
            if (providerMap.completionDocs.has(child.label)) {
                // Instantiate the property if we have yet to do so.
                if (filteredModule.completionDocs === undefined) {
                    filteredModule.completionDocs = new Map()
                }

                const completionDoc = providerMap.completionDocs.get(child.label)

                if (completionDoc === undefined) {
                    throw new Error(`Filter Error: no completion documentation with the label "${child.label}".`)
                }

                filteredModule.completionDocs.set(child.label, completionDoc)
            }

            // Get any completions for this child.
            if (providerMap.completions.has(child.label)) {
                let completions = providerMap.completions.get(child.label)

                if (completions === undefined) {
                    throw new Error(`Filter Error: no completions found with the label "${child.label}".`)
                }

                if (child.assignmentExclusives !== undefined) {
                    completions = addAssignmentExclusives(
                        child.assignmentExclusives,
                        completions,
                        enumerations
                    )
                }

                filteredModule.completions.push(...completions)
            }

            // Get any signatures for this child.
            if (providerMap.signatures.has(child.label)) {
                // Instantiate the property if we have yet to do so.
                if (filteredModule.signatures === undefined) {
                    filteredModule.signatures = new Array()
                }

                let signatures = providerMap.signatures.get(child.label)

                if (signatures === undefined) {
                    throw new Error(`Filter Error: no signatures found with the label "${child.label}".`)
                }

                // Add any parameter exclusive completions.
                if (child.signatureExclusives !== undefined) {
                    signatures = addSignatureExclusives(
                        child.signatureExclusives,
                        signatures,
                        enumerations
                    )
                }

                filteredModule.signatures.push(...signatures)
            }
        })
    }

    return filteredModule
}

/**
 * Returns all Enumeration elements of the CommandSetInterface that can be found in the ApiSpec.
 */
function filterEnums(
    namespace: ApiSpec,
    enumModule: CommandSetInterface
): Array<InstrumentCompletionItem> {
    // Create an object of Maps whose keys will match against ApiSpec labels.
    const completionMap = CommandSetInterface.getCompletionMap(enumModule.completions)

    const filteredEnumerations = new Array<InstrumentCompletionItem>()

    if (namespace.enums !== undefined) {
        namespace.enums.forEach((enumeration: BaseApiSpec) => {
            // Get any completions for this enumeration.
            if (completionMap.has(enumeration.label)) {
                const enumerations = completionMap.get(enumeration.label)

                if (enumerations === undefined) {
                    throw new Error(`Filter Error: no enumerations found with the label "${enumeration.label}".`)
                }

                filteredEnumerations.push(...enumerations)
            }
        })
    }

    return filteredEnumerations
}

/**
 * Make all root completion items for the given list of completion items.
 * @param completions An array of completion items.
 * @returns An array of root completions items or any empty array if no items could be generated.
 */
function generateRoots(completions: Array<InstrumentCompletionItem>): Array<InstrumentCompletionItem> {
    // An array containing one completion item per unique namespace.
    const uniqueNamespaces = new Array<InstrumentCompletionItem>()

    completions.forEach((enumerationItem: InstrumentCompletionItem) => {
        const predicate = (uniqueItem: InstrumentCompletionItem): boolean => {
            // Compare each unique namespace to the current enumeration completion
            // without including the label properties.
            return InstrumentCompletionItem.namespacesEqual(uniqueItem, enumerationItem, true)
        }

        // If the current namespace is not in our list of unique namespaces.
        if (! uniqueNamespaces.some(predicate)) {
            uniqueNamespaces.push(enumerationItem)
        }
    })

    const results = new Array<InstrumentCompletionItem>()

    // Generate root namespace completion items for each unique namespace.
    uniqueNamespaces.forEach((uniqueItem: InstrumentCompletionItem) => {
        const fullyQualifiedCompletion = resolveCompletionNamespace(uniqueItem)

        // Throw an error if this completion has no domain.
        if (uniqueItem.data === undefined || uniqueItem.data.domains.length === 0) {
            throw new Error(`Unable to generate root completion for '${fullyQualifiedCompletion}'.`)
        }

        // Create root completion items and add them to the results.
        results.push(...InstrumentCompletionItem.createRootItems(fullyQualifiedCompletion, true))
    })

    return results
}

function addAssignmentExclusives(
    exclusives: Array<ExclusiveCompletionApiSpec>,
    completions: Array<InstrumentCompletionItem>,
    enumerations: Array<InstrumentCompletionItem>
): Array<InstrumentCompletionItem> {
    // Modify each completion item.
    const modifiedCompletions = completions.map((completion: InstrumentCompletionItem) => {
        // Return an unmodified completion item if it is a root namespace.
        if (completion.data === undefined) {
            return completion
        }

        // Collect an array of enumerations as listed in the assignment completion spec.
        const enumApiSpec: ApiSpec = { enums: exclusives, label: '' }
        const enumModule: CommandSetInterface = { completions: enumerations }

        const filteredEnums = filterEnums(enumApiSpec, enumModule)

        // Something went wrong if we are here but have nothing to show for it.
        if (filteredEnums.length === 0) {
            throw new Error(`No assignment completions available for '${resolveCompletionNamespace(completion)}'.`)
        }

        // Add all root namespace completions to the array of enumeration completions.
        filteredEnums.push(...generateRoots(filteredEnums))

        completion.data.types = filteredEnums

        return completion
    })

    return modifiedCompletions
}

function addSignatureExclusives(
    exclusives: Array<SignatureDataApiSpec>,
    signatures: Array<InstrumentSignatureInformation>,
    enumerations: Array<InstrumentCompletionItem>
): Array<InstrumentSignatureInformation> {
    // Modify each signature.
    const modifiedSignatures = signatures.map((signature: InstrumentSignatureInformation) => {
        // Resulting exclusive parameter completion map.
        const parameterMap = new Map<number, Array<InstrumentCompletionItem>>()

        // Initialize signature data to something easier to work with if undefined.
        if (signature.data === undefined) {
            signature.data = { parameterTypes: new Map(), qualifier: 0 }
        }

        // For each exclusive signature spec.
        exclusives.forEach((spec: SignatureDataApiSpec) => {
            // Initialize the qualifier of the signature spec to something easier to work with if undefined.
            const specQualifier = spec.qualifier || 0

            if (signature.data && signature.data.qualifier !== specQualifier) {
                return
            }

            // Collect an array of enumerations as listed in each parameter completion spec of the
            // current signature spec.
            spec.parameters.forEach((paramCompletionSpec: Array<ExclusiveCompletionApiSpec>, key: number) => {
                const enumApiSpec: ApiSpec = { enums: paramCompletionSpec, label: '' }
                const enumModule: CommandSetInterface = { completions: enumerations }

                const filteredEnums = filterEnums(enumApiSpec, enumModule)

                if (filteredEnums.length === 0) {
                    return
                }

                // Add all root namespace completions to the array of enumeration completions.
                filteredEnums.push(...generateRoots(filteredEnums))

                parameterMap.set(key, filteredEnums)
            })
        })

        // Something went wrong if we are here but have nothing to show for it.
        if (parameterMap.size === 0) {
            throw new Error(`No parameter completions available for '${resolveSignatureNamespace(signature)}'.`)
        }

        signature.data.parameterTypes = parameterMap

        return signature
    })

    return modifiedSignatures
}

function dropExclusiveCompletions(
    completions: Array<InstrumentCompletionItem>
): Array<InstrumentCompletionItem> {
    return completions.filter((completion: InstrumentCompletionItem) => {
        return ! completion.exclusive
    })
}

function formatSignatures(
    spec: InstrumentSpec,
    signatures: Array<InstrumentSignatureInformation>
): Array<InstrumentSignatureInformation> {
    const result = signatures.map((value: InstrumentSignatureInformation) => {
        // Only format parameters if this signature has never been loaded.
        if (value._loaded !== true && value.getFormattedParameters !== undefined) {
            const formatted = value.getFormattedParameters(spec)

            formatted.forEach((param: IndexedParameterInformation) => {
                // Instantiate a new array if necessary.
                if (value.parameters === undefined) {
                    value.parameters = new Array()
                }

                // Insert this parameter at the associated index while removing 0 items.
                value.parameters.splice(param.index, 0, param as ParameterInformation)
            })

            // Set the load status of this signature.
            value._loaded = true
        }

        return value
    })

    return result
}

export async function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            // Load all enumeration completions first to allow cross-namespace enumeration
            // requests in the ApiSpec.
            const enumerations = new Array<InstrumentCompletionItem>()

            apiSpecs.forEach((api: ApiSpec) => {
                if (api.enums === undefined) {
                    return
                }

                const enumModule: CommandSetInterface = require(labelToModuleName(api.label, true))

                enumerations.push(...enumModule.completions)
            })

            const result: CommandSet = new CommandSet(spec)

            apiSpecs.forEach((api: ApiSpec) => {
                let cmdModule: CommandSetInterface = require(labelToModuleName(api.label))

                // Filter and resolve exclusive completions.
                cmdModule = filter(api, cmdModule, enumerations)

                // Format signatures.
                if (cmdModule.signatures !== undefined) {
                    cmdModule.signatures = formatSignatures(spec, cmdModule.signatures)
                }

                // Add this command set interface to the final command set.
                result.add(cmdModule)
            })

            // Add non-exclusive enumeration completions to the final command set.
            result.add({ completions: dropExclusiveCompletions(enumerations) })

            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}
