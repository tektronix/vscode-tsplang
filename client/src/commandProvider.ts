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
import { LanguageClient } from "vscode-languageclient"
import { Disposable } from "vscode"

import { colorizeTokens } from "./commands/colorizeTokens"

export interface CommandFeature {
    readonly ID: string
    register: (client: LanguageClient, ...args) => Disposable
}

class CommandProvider implements Disposable {
    private readonly _features: Array<CommandFeature>
    private readonly _disposables: Disposable[]

    constructor() {
        this._features = [colorizeTokens]
        this._disposables = []
    }

    register(client: LanguageClient): void {
        client.onReady().then(() => {
            this._disposables.push(
                ...this._features.map(value => {
                    return value.register(client)
                })
            )
        })
    }

    dispose(): void {
        this._disposables.forEach(value => value.dispose())
    }
}

export const commandProvider = new CommandProvider()
