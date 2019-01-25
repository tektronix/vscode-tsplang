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
'use strict'

import * as ipc from 'node-ipc'
import { Diagnostic, DidChangeTextDocumentParams } from 'vscode-languageserver'

import { DocumentContext } from './documentContext'
import { RegistrationMessage, SettingsMessage } from './ipcTypes'
import { Shebang } from './shebang'

ipc.config.id = 'vscode-tsplang-document'

const firstlineRegExp = new RegExp(/^[^\n\r]*/)
// tslint:disable-next-line:no-magic-numbers
const uri = process.argv[2]
let context: DocumentContext
let shebang: Shebang

ipc.connectTo('TsplangServer')

ipc.of.TsplangServer.on('shebang', (firstLine: string) => {
    // Try to parse the first line.
    const tokenizeResult: [Shebang, Array<Diagnostic>] = Shebang.tokenize(firstLine)

    // Save our shebang.
    shebang = tokenizeResult[0]

    // Request a command set.
    ipc.of.TsplangServer.emit('register', { shebang, uri, errors: tokenizeResult[1] })
})

ipc.of.TsplangServer.on('registration', (message: RegistrationMessage) => {
    const poolEntry = message.register(shebang.master)

    context = new DocumentContext(message.item, poolEntry.commandSet, message.config)

    ipc.of.TsplangServer.emit('registered', { errors: context.outline.errors, uri: context.document.uri })
})

ipc.of.TsplangServer.on('change', (message: DidChangeTextDocumentParams) => {
    // TODO: update the DocumentContext
})

ipc.of.TsplangServer.on('settings', (message: SettingsMessage) => {
    context.settings = message.config
})

/**
 *  client              server
 *      |{created}------>|
 *      |                |
 *      |<--------{start}|
 *      |                |
 *      |{started}------>|
 */
ipc.of.TsplangServer.emit('created', { uri })
