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
// tslint:disable:variable-name max-line-length

import { NotificationType, RequestType } from 'vscode-jsonrpc'
import {
    CompletionList,
    Diagnostic,
    DocumentSymbol,
    PublishDiagnosticsParams,
    SignatureHelp,
    TextDocumentContentChangeEvent,
    TextDocumentItem,
    TextDocumentPositionParams
} from 'vscode-languageserver'

import { CompletionItem } from './decorators'
import { CommandSet } from './instrument'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'

export const ChangeNotification = new NotificationType<Array<TextDocumentContentChangeEvent>, void>('ChangeNotification')

export const ErrorNotification = new NotificationType<PublishDiagnosticsParams, void>('ErrorNotification')

export const SettingsNotification = new NotificationType<TsplangSettings, void>('SettingsNotification')

export const CompletionRequest = new RequestType<TextDocumentPositionParams, CompletionList | undefined, void, void>('CompletionRequest')

export const CompletionResolveRequest = new RequestType<CompletionItem, CompletionItem, void, void>('CompletionResolveRequest')

export const SignatureRequest = new RequestType<TextDocumentPositionParams, SignatureHelp, void, void>('SignatureRequest')

export interface ProcessContext {
    item: TextDocumentItem
    settings: TsplangSettings
}
export const SymbolRequest = new RequestType<ProcessContext | undefined, Array<DocumentSymbol>, void, void>('SymbolRequest')
