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
import { commands, Range, window } from "vscode"
import { Disposable, RequestType } from "vscode-jsonrpc"
import { LanguageClient, TextDocumentItem } from "vscode-languageclient"

import { CommandFeature } from "../commandProvider"

interface TokenSpans {
    fullSpan: Range
    span: Range
}
const ColorizeTokensRequest = new RequestType<
    TextDocumentItem,
    Array<TokenSpans>,
    Error,
    void
>("ColorizeTokensRequest")

interface ColorPair {
    color: string
    tint: string
}

class ColorizeTokensFeature implements CommandFeature {
    readonly ID = "tsplang.debug.colorizeTokens"
    readonly ColorPairs: ColorPair[] = [
        {
            // red
            color: "#F44336FF",
            tint: "#EF9A9AFF",
        },
        {
            // violet
            color: "#BB69C9FF",
            tint: "#CE93D8FF",
        },
        {
            // orange
            color: "#FF9800FF",
            tint: "#FFCC80FF",
        },
        {
            // blue
            color: "#03A9F4FF",
            tint: "#81D4FAFF",
        },
        {
            // yellow
            color: "#FDD835FF",
            tint: "#FFF59DFF",
        },
        {
            // green
            color: "#4CAF50FF",
            tint: "#A5D6A7FF",
        },
    ]

    private decorationIndex: number

    constructor() {
        this.decorationIndex = 0
    }

    register(client: LanguageClient): Disposable {
        return commands.registerCommand(this.ID, () => {
            client
                .sendRequest(
                    ColorizeTokensRequest,
                    TextDocumentItem.create(
                        window.activeTextEditor.document.uri.toString(),
                        window.activeTextEditor.document.languageId,
                        window.activeTextEditor.document.version,
                        window.activeTextEditor.document.getText()
                    )
                )
                .then(this.onResponse.bind(this))
        })
    }

    protected onResponse(spans: TokenSpans[]): void {
        spans.forEach(tokenSpans => {
            if (!tokenSpans) {
                return
            }
            if (!window.activeTextEditor) {
                return
            }
            window.activeTextEditor.setDecorations(
                window.createTextEditorDecorationType({
                    backgroundColor: this.ColorPairs[this.decorationIndex].tint,
                    color: "#000000FF",
                }),
                [tokenSpans.fullSpan]
            )
            window.activeTextEditor.setDecorations(
                window.createTextEditorDecorationType({
                    backgroundColor: this.ColorPairs[this.decorationIndex].color,
                    color: "#000000FF",
                }),
                [tokenSpans.span]
            )
            if (this.decorationIndex + 1 < this.ColorPairs.length) {
                this.decorationIndex++
            } else {
                this.decorationIndex = 0
            }
        })
    }
}

export const colorizeTokens = new ColorizeTokensFeature()
