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
"use strict"

import * as path from "path"
import * as jsonrpc from "vscode-jsonrpc"
import { ExtensionContext, languages, Range, window, workspace } from "vscode"
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient"

interface TokenSpans {
    fullSpan: Range
    span: Range
}
const DocumentAreaNotification = new jsonrpc.NotificationType<TokenSpans, void>(
    "DocAreaNotification"
)

interface ColorPair {
    color: string
    tint: string
    blackText: boolean
}
const decorations: Array<ColorPair> = [
    {
        // red
        color: "#F44336F8",
        tint: "#EF9A9AF0",
        blackText: true,
    },
    {
        // violet
        color: "#9C27B0F8",
        tint: "#CE93D8F0",
        blackText: false,
    },
    {
        // orange
        color: "#FF9800F8",
        tint: "#FFCC80F0",
        blackText: true,
    },
    {
        // blue
        color: "#03A9F4F8",
        tint: "#81D4FAF0",
        blackText: true,
    },
    {
        // yellow
        color: "#FFEB3BF8",
        tint: "#FFF59DF0",
        blackText: true,
    },
    {
        // green
        color: "#4CAF50F8",
        tint: "#A5D6A7F0",
        blackText: true,
    },
]
let decorationIndex = 0

export function activate(context: ExtensionContext): void {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"))
    // The debug options for the server
    const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] }

    // If the extension is launched in debug mode then the debug server options are used;
    // otherwise the run options are used
    const serverOptions: ServerOptions = {
        debug: {
            module: serverModule,
            options: debugOptions,
            transport: TransportKind.ipc,
        },
        run: { module: serverModule, transport: TransportKind.ipc },
    }

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for TSP documents
        documentSelector: [{ scheme: "file", language: "tsp" }],
        initializationOptions: workspace.getConfiguration("tsplang"),
        synchronize: {
            configurationSection: "tsplang",
            fileEvents: workspace.createFileSystemWatcher("*.tsp", false, false, false),
        },
    }

    const diagnosticsCollection = languages.createDiagnosticCollection("TSP")

    const langclient = new LanguageClient(
        "tsplang",
        "TSPLang",
        serverOptions,
        clientOptions,
        true
    )
    langclient.onReady().then(() => {
        langclient.onNotification(DocumentAreaNotification, tokenSpans => {
            if (!tokenSpans) {
                return
            }
            if (!window.activeTextEditor) {
                return
            }
            const color = decorations[decorationIndex].blackText
                ? "#000000FF"
                : "#FFFFFFFF"
            window.activeTextEditor.setDecorations(
                window.createTextEditorDecorationType({
                    backgroundColor: decorations[decorationIndex].tint,
                    color,
                }),
                [tokenSpans.fullSpan]
            )
            window.activeTextEditor.setDecorations(
                window.createTextEditorDecorationType({
                    backgroundColor: decorations[decorationIndex].color,
                    color,
                }),
                [tokenSpans.span]
            )
            if (decorationIndex + 1 < decorations.length) {
                decorationIndex++
            } else {
                decorationIndex = 0
            }
        })
    })

    // Push the disposable to the context's subscriptions so that the client can be
    // deactivated on extension deactivation
    context.subscriptions.push(langclient.start(), diagnosticsCollection)
}
