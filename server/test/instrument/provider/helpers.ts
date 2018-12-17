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
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { MarkupKind } from 'vscode-languageserver'

import { MarkupContentCallback, ParameterInformation, SignatureInformation } from '../../../src/decorators'
import { DefaultFillValue } from '../../../src/instrument'

import { emptySpec, emptySpecUndefinedOptionals } from '../emptySpec'

// const replacementStringRegExp = new RegExp(/%\{[0-9]+\}/)
const undefinedSpecValueRegExp = new RegExp(DefaultFillValue)

export function expectCompletionDocFormat(completionDoc: MarkupContentCallback, label: string): void {
    const formattedDocumentation = completionDoc(emptySpec)

    // completionDoc items should return meaningful documenation or be removed.
    expect(
        formattedDocumentation,
        `useless command documentation entry for ${label}`
    ).to.not.be.empty

    // All replacement strings should be filled-in.
    expect(
        undefinedSpecValueRegExp.test(formattedDocumentation.value),
        `found a replacement string in the formatted command documentation for ${label}`
    ).to.be.false
}

export function expectCompletionDocUndefinedFormat(completionDoc: MarkupContentCallback, label: string): void {
    const formattedDocumentation = completionDoc(emptySpecUndefinedOptionals)

    // completionDoc items should return meaningful documenation or be removed.
    expect(
        formattedDocumentation,
        `useless command documentation entry for ${label}`
    ).to.not.be.empty

    // The string "UNDEFINED" should be filled-in for optional spec values.
    expect(
        undefinedSpecValueRegExp.test(formattedDocumentation.value),
        `could not find "UNDEFINED" in the formatted command documentation for ${label}`
    ).to.be.true
}

export function expectSignatureFormat(signature: SignatureInformation): void {
    const signatureLabel = SignatureInformation.resolveNamespace(signature)

    if (signature.getFormattedParameters === undefined) {
        return
    }

    const formattedParameters = signature.getFormattedParameters(emptySpec)

    // If the function returns nothing, then it should be left undefined.
    expect(
        formattedParameters,
        `useless formatter function in signature "${signatureLabel}"`
    ).to.not.be.empty

    formattedParameters.forEach((parameter: ParameterInformation) => {
        expect(
            parameter.documentation,
            `parameter "${parameter.label}" of signature "${signatureLabel}" has no documentation`
        ).to.not.be.undefined

        let documentation: string

        // If documentation is of type MarkupContent
        if (typeof parameter.documentation === 'object') {
            expect(
                parameter.documentation.kind,
                [
                    'documentation is MarkupContent but does not use MarkupKind.Markdown for',
                    `parameter "${parameter.label}" of signature "${signatureLabel}"`
                ].join(' ')
            ).to.equal(MarkupKind.Markdown)

            documentation = parameter.documentation.value
        }
        else {
            // Typecast because we asserted that the parameter documentation should not be undefined.
            documentation = parameter.documentation as string
        }

        // All replacement strings should be filled-in
        expect(
            undefinedSpecValueRegExp.test(documentation),
            [
                'found a replacement string in the formatted parameter',
                `"${parameter.label}" of signature "${signatureLabel}"`
            ].join(' ')
        ).to.be.false
    })
}
