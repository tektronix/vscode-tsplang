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

import { TextDocument } from 'vscode-languageserver'

import { DocumentContext } from './documentContext'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'
import { TspPool } from './tspPool'

export interface TspItem {
    context: DocumentContext
    settings: TsplangSettings
    shebang: Shebang
}
export namespace TspItem {
    export async function create(
        registrant: TextDocument,
        shebang: Shebang,
        settings: TsplangSettings,
        pool: TspPool
    ): Promise<TspItem> {
        return new Promise<TspItem>(async (
            resolve: (value?: TspItem) => void,
            reject: (reason?: Error) => void
        ): Promise<void> => {
            try {
                const entry = await pool.register(shebang.master, settings)

                resolve({
                    settings,
                    shebang,
                    context: new DocumentContext(entry.commandSet, registrant)
                })
            }
            catch (e) {
                reject(e)
            }
        })
    }
}
