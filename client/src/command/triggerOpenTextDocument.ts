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
import { commands, Disposable, window, workspace } from "vscode"
import { NotificationType } from "vscode-jsonrpc"
import { LanguageClient } from "vscode-languageclient"

import { CommandFeatureInterface } from "."

const TriggerOpenTextDocumentRequest = new NotificationType<string, void>(
    "TriggerOpenTextDocumentRequest"
)

class TriggerOpenTextDocumentFeature implements CommandFeatureInterface {
    readonly ID = "tsplang.debug.triggerOpenTextDocumentRequest"

    register(client: LanguageClient): Disposable {
        return commands.registerCommand(this.ID, () => {
            window
                .showOpenDialog({
                    canSelectFiles: true,
                    canSelectFolders: false,
                    canSelectMany: false,
                    openLabel: "Request",
                    defaultUri: workspace.workspaceFolders?.[0].uri,
                })
                .then(files => {
                    if (files === undefined || files.length === 0) return
                    client.sendNotification(
                        TriggerOpenTextDocumentRequest,
                        files[0].toString()
                    )
                })
        })
    }
}

export const triggerOpenTextDocument = new TriggerOpenTextDocumentFeature()
