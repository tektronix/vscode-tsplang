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
import * as path from "path"
import { ExtensionContext, workspace } from "vscode"
import { LanguageClient, TransportKind } from "vscode-languageclient"

import { commandFeatureController } from "./command"

export const language = "tsp"
export const id = "tsplang"
export const name = "TSPLang"

export function activate(context: ExtensionContext): void {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"))

    const langclient = new LanguageClient(
        id,
        name,
        // If the extension is launched in debug mode,
        // then the debug server options are used;
        // otherwise the run options are used.
        {
            debug: {
                module: serverModule,
                // The debug options for the server.
                options: { execArgv: ["--nolazy", "--inspect=6009"] },
                transport: TransportKind.ipc,
            },
            run: { module: serverModule, transport: TransportKind.ipc },
        },
        // Options to control the language client.
        {
            diagnosticCollectionName: name,
            documentSelector: [{ language, scheme: "file" }],
            initializationOptions: workspace.getConfiguration(language),
            outputChannelName: name,
            synchronize: {
                configurationSection: id,
                fileEvents: workspace.createFileSystemWatcher(
                    "*.tsp",
                    false,
                    false,
                    false
                ),
            },
        },
        true
    )

    commandFeatureController.register(langclient)

    // Push the disposable to the context's subscriptions so that the client can be
    // deactivated on extension deactivation
    context.subscriptions.push(commandFeatureController, langclient.start())
}
