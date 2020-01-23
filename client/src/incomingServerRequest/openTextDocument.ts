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
import { Uri, workspace } from "vscode"
import { RequestType } from "vscode-jsonrpc"
import { LanguageClient } from "vscode-languageclient"

import { ServerRequestReceiver } from "."

const OpenTextDocumentRequest = new RequestType<string, void, Error, void>(
    "OpenTextDocumentRequest"
)

class OpenTextDocumentRequestReceiver
    implements ServerRequestReceiver<string, void, Error> {
    register(client: LanguageClient): void {
        client.onReady().then(() => {
            client.onRequest(OpenTextDocumentRequest, this.onRequest.bind(this))
        })
    }

    async onRequest(uri: string): Promise<void> {
        await workspace.openTextDocument(Uri.parse(uri, true))
    }
}

export const openTextDocumentRequestReceiver = new OpenTextDocumentRequestReceiver()
