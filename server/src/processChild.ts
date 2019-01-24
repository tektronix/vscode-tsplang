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

import { DocumentContext } from './documentContext'
import { StartedMessage, StartMessage } from './ipcTypes'
import { Shebang } from './shebang'

ipc.config.id = 'vscode-tsplang-document'

// tslint:disable-next-line:no-magic-numbers
const uri = process.argv[2]
let context: DocumentContext
let shebang: Shebang

ipc.connectTo('TsplangServer')

ipc.of.TsplangServer.once('start', (message: StartMessage) => {
    shebang = message.bang
    context = new DocumentContext(message.item, message.set, message.config)

    ipc.of.TsplangServer.emit('started', { errors: context.outline.errors, uri: context.document.uri })
})

ipc.of.TsplangServer.emit('init', { uri })
