/*
 *  Copyright Tektronix Inc.
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

import { Diagnostic, TextDocumentItem } from 'vscode-languageserver'

import { Model } from './model'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { PoolEntry } from './tspPool'

export interface BasicChildMessage {
    uri: string
}

export interface BasicChildErrorMessage extends BasicChildMessage {
    errors: Array<Diagnostic>
}

export interface RegisterChildMessage extends BasicChildErrorMessage {
    shebang: Shebang
}

export interface SettingsMessage {
    config: TsplangSettings
}

export interface ContextMessage extends SettingsMessage {
    item: TextDocumentItem
}

export declare type RegistrationMessage = ContextMessage & { register(model: Model): PoolEntry }
