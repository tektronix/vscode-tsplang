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

import * as vscode_ls from 'vscode-languageserver'

import { InstrumentSpec } from '../instrument'

import { BaseItem } from './baseItem'
import { CompletionItem } from './completionItem'
import { ParameterInformation } from './parameterInformation'
import { ResolvedNamespace } from './resolvedNamespace'

export interface SignatureData {
    parameterTypes: Map<number, Array<CompletionItem>>
    /**
     * Used to internally differentiate multiple signatures with the same label.
     */
    qualifier?: number
}

export interface SignatureInformation extends vscode_ls.SignatureInformation, BaseItem {
    /**
     * **Never define this value in a provider file.**
     */
    _loaded?: boolean
    data?: SignatureData
    getFormattedParameters?(spec: InstrumentSpec): Array<ParameterInformation>
}
export namespace SignatureInformation {
    export function depth(signature: SignatureInformation): number {
        return ResolvedNamespace.depth(resolveNamespace(signature))
    }

    /**
     * Fully resolves the namespace of the given signature item using the label property.
     * All array indexers are removed during resolution.
     * @param signature The signature item to resolve.
     * @returns The fully resolved namespace of the given signature.
     */
    export function resolveNamespace(signature: SignatureInformation): ResolvedNamespace {
        let openParamIndex: number | undefined = signature.label.indexOf('(')

        if (openParamIndex === -1) {
            // Slice to the end of the string if an open parenthesis is not found.
            openParamIndex = undefined
        }

        return ResolvedNamespace.create(signature.label.slice(0, openParamIndex))
    }
}
