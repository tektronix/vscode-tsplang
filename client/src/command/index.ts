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

import { BaseFeatureController, FeatureInterface } from "../feature"

import { colorizeTokens } from "./colorizeTokens"

export interface CommandFeatureInterface extends FeatureInterface {
    readonly ID: string
}

class CommandFeatureController extends BaseFeatureController {
    constructor() {
        super()
        this._features.push(colorizeTokens)
    }

    register(client: LanguageClient): void {
        super.register(client)
    }

    dispose(): void {
        super.dispose()
    }
}

export const commandFeatureController = new CommandFeatureController()
