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

import * as path from 'path'
// tslint:disable-next-line: no-implicit-dependencies
import { ExtensionContext, workspace } from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient'

export function activate(context: ExtensionContext): void {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
        path.join('out', 'server', 'server.js')
    )
    // The debug options for the server
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

    // If the extension is launched in debug mode then the debug server options are used;
    // otherwise the run options are used
    const serverOptions: ServerOptions = {
        debug: {
            module: serverModule,
            options: debugOptions,
            transport: TransportKind.ipc
        },
        run : { module: serverModule, transport: TransportKind.ipc }
    }

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for TSP documents
        documentSelector: [{scheme: 'file', language: 'tsp'}],
        synchronize : {
            fileEvents: workspace.createFileSystemWatcher(
                '*.tsp',
                false,
                false,
                false
            ),
        }
    }

    // Create the language client and start the client.
    const disposable = new LanguageClient(
        'tsplang',
        'TSP Command Autocomplete',
        serverOptions,
        clientOptions,
        true
    ).start()

    // Push the disposable to the context's subscriptions so that the client can be deactivated on
    // extension deactivation
    context.subscriptions.push(disposable)
}
