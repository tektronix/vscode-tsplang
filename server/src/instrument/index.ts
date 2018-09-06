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

import { MarkupKind } from 'vscode-languageserver'

import { Model } from '../model'

export interface InstrumentSpec {
    currentLevel: RangeSpec
    currentRange: RangeSpec
    overflow: number
    resistanceLevel: RangeSpec
    resistanceRange: RangeSpec
    voltageLevel: RangeSpec
    voltageRange: RangeSpec
}

export interface RangeSpec {
    high: number
    low: number
}

export interface CommandDocumentation {
    kind: MarkupKind
    toString(spec: InstrumentSpec): string
}

export function getDocumentation(model: Model): Array<CommandDocumentation> {
    const results: Array<CommandDocumentation> = new Array()

    return results
}
