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
import { Disposable } from "vscode"
import { LanguageClient } from "vscode-languageclient"

/**
 * A "normal" feature whose lifecycle is tied to the extension itself.
 */
export interface FeatureInterface {
    register: (client: LanguageClient) => Disposable
}

/**
 * Controls the lifecycle of "normal" features.
 */
export class BaseFeatureController implements Disposable {
    protected readonly _features: FeatureInterface[]
    protected readonly _disposables: Disposable[]

    constructor() {
        this._disposables = []
        this._features = []
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
