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

import { resolveSignatureNamespace } from '../../../../../server/src/instrument/provider'
import { CommandDocumentation, IndexedParameterInformation, InstrumentSignatureInformation } from '../../../../../server/src/wrapper'

import { emptySpec } from '../emptySpec'

// Cannot import 3rd-party modules, so create a stub of vscode-languageclient.MarkupKind
declare namespace MarkupKind {
    // tslint:disable-next-line:variable-name
    const Markdown: 'markdown'
}
declare type MarkupKind = 'markdown'

const replacementStringRegExp = new RegExp(/%\{[0-9]+\}/)

export function expectCompletionDocFormat(completionDoc: CommandDocumentation, label: string): void {
    const formattedDocumentation = completionDoc.toString(emptySpec)

    // completionDoc items should return meaningful documenation or be removed.
    expect(
        formattedDocumentation,
        `useless command documentation entry for ${label}`
    ).to.not.be.empty

    // All replacement strings should be filled-in
    expect(
        replacementStringRegExp.test(formattedDocumentation),
        `found a replacement string in the formatted command documentation for ${label}`
    ).to.be.false
}

export function expectSignatureFormat(signature: InstrumentSignatureInformation): void {
    const signatureLabel = resolveSignatureNamespace(signature)

    if (signature.getFormattedParameters === undefined) {
        return
    }

    const formattedParameters = signature.getFormattedParameters(emptySpec)

    // If the function returns nothing, then it should be left undefined.
    expect(
        formattedParameters,
        `useless formatter function in signature "${signatureLabel}"`
    ).to.not.be.empty

    formattedParameters.forEach((parameter: IndexedParameterInformation) => {
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
            replacementStringRegExp.test(documentation),
            [
                'found a replacement string in the formatted parameter',
                `"${parameter.label}" of signature "${signatureLabel}"`
            ].join(' ')
        ).to.be.false
    })
}
