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
import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

import { ApiSpec, BaseApiSpec, ChildApiSpec, CommandSet, CommandSetInterface, ExclusiveCompletionApiSpec, InstrumentSpec, SignatureDataApiSpec } from '..'

export interface CommandDocumentation {
    kind: MarkupKind
    toString(spec: InstrumentSpec): string
}

export interface CompletionItemData {
    domains: Array<string>
    types?: Array<InstrumentCompletionItem>
}

export interface SignatureData {
    parameterTypes: Map<number, Array<InstrumentCompletionItem>>
    /**
     * Used to internally differentiate multiple signatures with the same label.
     */
    qualifier?: number
}

export interface InstrumentSignatureInformation extends SignatureInformation {
    data?: SignatureData
    getFormattedParameters(spec: InstrumentSpec): Array<ParameterInformation>
}

export interface InstrumentCompletionItem extends CompletionItem {
    allowBitwise?: boolean
    data?: CompletionItemData
    exclusive?: boolean
}
export namespace InstrumentCompletionItem {
    /**
     * Creates InstrumentCompletionItems of kind Module based on the given BaseApiSpec.
     * @param spec The BaseApiSpec whose label will generate the root items.
     * @param excludeLast Whether the last item of the namespace should be included in the results.
     * @returns An array of generated root namespaces or undefined if nothing could be generated.
     */
    export function createRootItems(
        spec: BaseApiSpec,
        excludeLast: boolean
    ): Array<InstrumentCompletionItem> | undefined {
        const namespaces = spec.label.split('.')

        if (excludeLast) {
            // Remove the last element of the namespace.
            namespaces.pop()

            if (namespaces.length === 0) {
                return
            }
        }

        const result = new Array<InstrumentCompletionItem>()

        for (const name of namespaces) {
            const last = result.pop()
            const current: InstrumentCompletionItem = {
                kind: CompletionItemKind.Module,
                label: name
            }

            if (last !== undefined) {
                const domains: Array<string> = [last.label]

                if (last.data !== undefined) {
                    domains.push(...last.data.domains)
                }

                current.data = { domains }

                result.push(last)
            }

            result.push(current)
        }

        return result
    }

    /**
     * Compare the labels and data.domain properties of two items to determine their equality.
     *
     * @param a The first item.
     * @param b The second item.
     * @returns True if the two items match and false otherwise.
     */
    export function namespacesEqual(a: InstrumentCompletionItem, b: InstrumentCompletionItem): boolean {
        // Compare labels.
        if (a.label.localeCompare(b.label) !== 0) {
            return false
        }

        if (a.data === undefined) {
            // If neither have a data property, then this these two root completions are equal.
            if (b.data === undefined) {
                return true
            }

            // Both data properties should be defined.
            return false
        }

        // TypeScript demands the following
        if (b.data === undefined) {
            return false
        }

        // Both domains should be of equal length.
        if (a.data.domains.length !== b.data.domains.length) {
            return false
        }

        // Both domains should have the same domain items.
        for (let i = 0; i < a.data.domains.length; i++) {
            const aDomain = a.data.domains[i]
            if (aDomain === undefined || aDomain.localeCompare(b.data.domains[i]) !== 0) {
                return false
            }
        }

        return true
    }
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

/**
 * Returns all elements of the CommandSetInterface that can be found in the ApiSpec
 * (excluding Enumeration completions).
 */
function filter(
    namespace: ApiSpec,
    providerModule: CommandSetInterface,
): CommandSetInterface {
    const results: CommandSetInterface = { completions: new Array() }

    // The following labels are not to be treated as root namespaces.
    if (namespace.label.localeCompare('keywords') !== 0
        && namespace.label.localeCompare('functions') !== 0) {
        // Add root namespaces to the results.
        results.completions.push(...providerModule.completions.filter(
            (value: InstrumentCompletionItem) => {
                return value.label.localeCompare(namespace.label) === 0
            }
        ))
    }

    // Add any child elements to the results.
    if (namespace.children !== undefined) {
        namespace.children.forEach((value: ChildApiSpec) => {
            // Get all completionDocs for this child.
            if (providerModule.completionDocs !== undefined) {
                const completionDocs = filterChildCompletionDoc(value, providerModule.completionDocs)

                if (completionDocs.size > 0) {
                    if (results.completionDocs === undefined) {
                        results.completionDocs = new Map()
                    }

                    results.completionDocs = new Map([
                        ...results.completionDocs.entries(),
                        ...completionDocs.entries()
                    ])
                }
            }

            // Get all completions for this child.
            results.completions.push(...filterChildCompletion(value, providerModule.completions))

            // Get all signatures for this child.
            if (providerModule.signatures !== undefined) {
                const signatures = filterChildSignature(value, providerModule.signatures)

                if (signatures.length > 0) {
                    if (results.signatures === undefined) {
                        results.signatures = new Array()
                    }

                    results.signatures.push(...signatures)
                }
            }
        })
    }

    return results
}

/**
 * Gets the completions from the given array that match the ChildApiSpec.
 */
function filterChildCompletion(
    child: ChildApiSpec,
    completions: Array<InstrumentCompletionItem>
): Array<InstrumentCompletionItem> {
    return completions.filter((value: InstrumentCompletionItem) => {
        return resolveCompletionNamespace(value).localeCompare(child.label) === 0
    })
}

/**
 * Gets all completionDocs from the given map whose keys match the given ChildApiSpec.
 */
function filterChildCompletionDoc(
    child: ChildApiSpec,
    completionDocs: Map<string, CommandDocumentation>
): Map<string, CommandDocumentation> {
    const resultMap = new Map<string, CommandDocumentation>()
    completionDocs.forEach((value: CommandDocumentation, key: string) => {
        if (key.localeCompare(child.label) === 0) {
            resultMap.set(key, value)
        }
    })

    return resultMap
}

/**
 * Gets the signatures from the given array that match the ChildApiSpec.
 */
function filterChildSignature(
    child: ChildApiSpec,
    signatures: Array<InstrumentSignatureInformation>
): Array<InstrumentSignatureInformation> {
    return signatures.filter((value: InstrumentSignatureInformation) => {
        const label = resolveSignatureNamespace(value)

        if (label === undefined) {
            throw new Error('Unable to resolve namespace for signature ' + child.label)
        }

        return label.localeCompare(child.label) === 0
    })
}

function resolveExclusiveCompletions(
    namespace: ApiSpec,
    filteredModule: CommandSetInterface,
    enumCompletions: Array<InstrumentCompletionItem>
): CommandSetInterface {
    if (namespace.children === undefined) {
        return filteredModule
    }

    const result: CommandSetInterface = {
        completionDocs: filteredModule.completionDocs,
        completions: filteredModule.completions,
        signatures: filteredModule.signatures
    }

    namespace.children.forEach((value: ChildApiSpec) => {
        if (value.assignmentExclusives !== undefined) {
            const assignmentTargets = new Map<number, InstrumentCompletionItem>()

            result.completions.forEach((completion: InstrumentCompletionItem, index: number) => {
                if (resolveCompletionNamespace(completion).localeCompare(value.label) === 0) {
                    // TODO: for each assignment target, get the matching enum from the list
                    // of available enums.
                    //  TODO: translate the fields of the matching enum object into the appropriate
                    //  thing. Add the thing to the InstrumentCompletionItem.data.types property.

                    assignmentTargets.set(index, completion)
                }
            })
        }

        const signatureTargets = new Map<number, InstrumentSignatureInformation>()

        if (value.signatureExclusives !== undefined) {
            if (result.signatures === undefined) {
                throw new Error('ApiSpec defines signature completions but no signatures exist.')
            }

            // Get the signatures that need exclusive completions
            result.signatures.forEach((signature: InstrumentSignatureInformation, index: number) => {
                const signatureNamespace = resolveSignatureNamespace(signature)

                if (signatureNamespace === undefined) {
                    return
                }

                if (signatureNamespace.localeCompare(value.label) === 0) {
                    // TODO: for each assignment target, get the matching enum from the list
                    // of available enums.
                    //  TODO: translate the fields of the matching enum object into the appropriate
                    //  thing. Add the thing to the
                    //  InstrumentSignatureInformation.data.parameterTypes property.

                    signatureTargets.set(index, signature)
                }
            })
        }
    })

    return result
}

function insertSignatureExclusiveCompletions(
    exclusives: Array<SignatureDataApiSpec>,
    signature: InstrumentSignatureInformation
): InstrumentSignatureInformation {
    throw new Error('TODO - Not implemented.')
}

function formatSignatures(
    spec: InstrumentSpec,
    signatures: Array<InstrumentSignatureInformation>
): Array<InstrumentSignatureInformation> {
    const result = new Array<InstrumentSignatureInformation>()

    signatures.forEach((value: InstrumentSignatureInformation) => {
        result.push({
            data: value.data,
            documentation: value.documentation,
            getFormattedParameters: (): Array<ParameterInformation> => new Array(),
            label: value.label,
            parameters: (value.parameters === undefined)
                ? value.getFormattedParameters(spec)
                : value.parameters.concat(value.getFormattedParameters(spec))
        })
    })

    return result
}

export async function generateCommandSet(apiSpecs: Array<ApiSpec>, spec: InstrumentSpec): Promise<CommandSet> {
    return new Promise<CommandSet>((
        resolve: (value?: CommandSet) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            const result: CommandSet = new CommandSet(spec)
            const enums = new Map<string, CommandSetInterface>()

            apiSpecs.forEach((api: ApiSpec) => {
                const cmdModule: CommandSetInterface = require(labelToModuleName(api.label))

                // any enums must be loaded speparately due to the command storage scheme
                if (api.enums !== undefined) {
                    const enumModule: CommandSetInterface = require(labelToModuleName(api.label, true))

                    const currentEnums: CommandSetInterface = {
                        completions: enumModule.completions
                    }
                }

                // TODO: filter

                // TODO: resolve exclusive completions

                // TODO: format signatures
            })

            resolve(result)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}
