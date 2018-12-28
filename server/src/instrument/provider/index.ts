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

import { ApiSpec, BaseApiSpec, ChildApiSpec, CommandSet, CommandSetInterface, ExclusiveCompletionApiSpec, InstrumentSpec, SignatureDataApiSpec } from '..'
import { CompletionItem, MarkupContentCallback, ParameterInformation, SignatureInformation } from '../../decorators'

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

/**
 * Returns all elements of the CommandSetInterface that can be found in the ApiSpec
 * (excluding Enumeration completions).
 */
function filter(
    namespace: ApiSpec,
    providerModule: CommandSetInterface,
    enumerations: Array<CompletionItem>
): CommandSetInterface {
    // Create an object of Maps whose keys will match against ApiSpec labels.
    const providerMap = {
        completionDocs: new Map<string, MarkupContentCallback>(),
        completions: CommandSetInterface.getCompletionMap(providerModule.completions),
        signatures: new Map<string, Array<SignatureInformation>>()
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
        // If this module contains completion docs for the namespace label.
        if (providerMap.completionDocs.has(namespace.label)) {
            const completionDocs = providerMap.completionDocs.get(namespace.label)

            if (completionDocs === undefined) {
                throw new Error(`Filter Error: no completionDocs found with the label "${namespace.label}".`)
            }

            if (filteredModule.completionDocs === undefined) {
                filteredModule.completionDocs = new Map()
            }

            // Add root namespace documentation to the results.
            filteredModule.completionDocs.set(namespace.label, completionDocs)
        }

        // If this module contains a completion with the namespace label.
        if (providerMap.completions.has(namespace.label)) {
            const completions = providerMap.completions.get(namespace.label)

            if (completions === undefined) {
                throw new Error(`Filter Error: no completions found with the label "${namespace.label}".`)
            }

            // Add root namespaces to the results.
            filteredModule.completions.push(...completions)
        }

        // If this module contains a signature with the namespace label.
        if (providerMap.signatures.has(namespace.label)) {
            const signatures = providerMap.signatures.get(namespace.label)

            if (signatures === undefined) {
                throw new Error(`Filter Error: no signatures found with the label "${namespace.label}".`)
            }

            if (filteredModule.signatures === undefined) {
                filteredModule.signatures = new Array()
            }

            // Add root namespace signatures to the results.
            filteredModule.signatures.push(...signatures)
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
): Array<CompletionItem> {
    // Create an object of Maps whose keys will match against ApiSpec labels.
    const completionMap = CommandSetInterface.getCompletionMap(enumModule.completions)

    const filteredEnumerations = new Array<CompletionItem>()

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
function generateRoots(completions: Array<CompletionItem>): Array<CompletionItem> {
    // An array containing one completion item per unique namespace.
    const uniqueNamespaces = new Array<CompletionItem>()

    completions.forEach((enumerationItem: CompletionItem) => {
        const predicate = (uniqueItem: CompletionItem): boolean => {
            // Compare each unique namespace to the current enumeration completion
            // without including the label properties.
            return CompletionItem.namespacesEqual(uniqueItem, enumerationItem, true)
        }

        // If the current namespace is not in our list of unique namespaces.
        if (! uniqueNamespaces.some(predicate)) {
            uniqueNamespaces.push(enumerationItem)
        }
    })

    const results = new Array<CompletionItem>()

    // Generate root namespace completion items for each unique namespace.
    uniqueNamespaces.forEach((uniqueItem: CompletionItem) => {
        const fullyQualifiedCompletion = CompletionItem.resolveNamespace(uniqueItem)

        // Throw an error if this completion has no domain.
        if (uniqueItem.data === undefined || uniqueItem.data.domains.length === 0) {
            throw new Error(`Unable to generate root completion for '${fullyQualifiedCompletion}'.`)
        }

        // Create root completion items and add them to the results.
        results.push(...CompletionItem.createRootItems(fullyQualifiedCompletion, true))
    })

    return results
}

function addAssignmentExclusives(
    exclusives: Array<ExclusiveCompletionApiSpec>,
    completions: Array<CompletionItem>,
    enumerations: Array<CompletionItem>
): Array<CompletionItem> {
    // Modify each completion item.
    const modifiedCompletions = completions.map((completion: CompletionItem) => {
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
            throw new Error([
                'No assignment completions available for',
                `'${CompletionItem.resolveNamespace(completion)}'.`
            ].join(' '))
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
    signatures: Array<SignatureInformation>,
    enumerations: Array<CompletionItem>
): Array<SignatureInformation> {
    // Modify each signature.
    const modifiedSignatures = signatures.map((signature: SignatureInformation) => {
        // Resulting exclusive parameter completion map.
        const parameterMap = new Map<number, Array<CompletionItem>>()

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
            throw new Error([
                'No parameter completions available for',
                `'${SignatureInformation.resolveNamespace(signature)}'.`
            ].join(' '))
        }

        signature.data.parameterTypes = parameterMap

        return signature
    })

    return modifiedSignatures
}

function dropExclusiveCompletions(
    completions: Array<CompletionItem>
): Array<CompletionItem> {
    return completions.filter((completion: CompletionItem) => {
        return ! completion.exclusive
    })
}

function formatSignatures(
    spec: InstrumentSpec,
    signatures: Array<SignatureInformation>
): Array<SignatureInformation> {
    const result = signatures.map((value: SignatureInformation) => {
        // Only format parameters if this signature has never been loaded.
        if (value._loaded !== true && value.getFormattedParameters !== undefined) {
            const formatted = value.getFormattedParameters(spec)

            formatted.forEach((param: ParameterInformation) => {
                // Instantiate a new array if necessary.
                if (value.parameters === undefined) {
                    value.parameters = new Array()
                }

                // Insert this parameter at the associated index while removing 0 items.
                value.parameters.splice(param.index, 0, param)
            })

            // Set the load status of this signature.
            value._loaded = true
        }

        return value
    })

    return result
}

export function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): CommandSet {
    // Load all enumeration completions first to allow cross-namespace enumeration
    // requests in the ApiSpec.
    const enumerations = new Array<CompletionItem>()

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

    return result
}
