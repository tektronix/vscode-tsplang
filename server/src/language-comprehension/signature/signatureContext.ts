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

import { Range } from 'vscode-languageserver'

import { InstrumentSignatureInformation } from '../../wrapper'

export interface SignatureContext {
    /**
     * The Range in which signature help and exclusive parameters should be provided.
     */
    range: Range
    /**
     * The signatures to provide within the associated Range.
     */
    signatures: Array<InstrumentSignatureInformation>
}
