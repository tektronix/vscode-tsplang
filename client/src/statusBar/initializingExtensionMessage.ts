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
import { Disposable, window } from "vscode"
import { NotificationType } from "vscode-jsonrpc"
import { LanguageClient } from "vscode-languageclient"

import { TransientFeatureInterface } from "../feature"

const ServerReadyNotification = new NotificationType<undefined, void>(
    "ServerReadyNotification"
)

class InitializingExtensionMessage implements TransientFeatureInterface {
    private _disposable: Disposable

    register(client: LanguageClient): void {
        this._disposable = window.setStatusBarMessage(
            "$(sync~spin) Initializing TSP language features",
            client
                .onReady()
                .then(() =>
                    client.onNotification(
                        ServerReadyNotification,
                        this.dispose.bind(this)
                    )
                )
        )
    }

    dispose(): void {
        this._disposable.dispose()
    }
}

export const initializingExtensionMessage = new InitializingExtensionMessage()
