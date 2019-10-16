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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const jsonrpc = require("vscode-jsonrpc");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const DocumentAreaNotification = new jsonrpc.NotificationType("DocAreaNotification");
const ParseDocumentNotification = new jsonrpc.NotificationType("ParseDocNotification");
const decorations = [
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
];
let decorationIndex = 0;
function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
    // The debug options for the server
    const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
    // If the extension is launched in debug mode then the debug server options are used;
    // otherwise the run options are used
    const serverOptions = {
        debug: {
            module: serverModule,
            options: debugOptions,
            transport: vscode_languageclient_1.TransportKind.ipc,
        },
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for TSP documents
        documentSelector: [{ scheme: "file", language: "tsp" }],
        initializationOptions: vscode_1.workspace.getConfiguration("tsplang"),
        synchronize: {
            configurationSection: "tsplang",
            fileEvents: vscode_1.workspace.createFileSystemWatcher("*.tsp", false, false, false),
        },
    };
    const diagnosticsCollection = vscode_1.languages.createDiagnosticCollection("TSP");
    const langclient = new vscode_languageclient_1.LanguageClient("tsplang", "TSPLang", serverOptions, clientOptions, true);
    langclient.onReady().then(() => {
        langclient.onNotification(DocumentAreaNotification, result => {
            result.arr.forEach(tokenSpans => {
                if (!tokenSpans) {
                    return;
                }
                if (!vscode_1.window.activeTextEditor) {
                    return;
                }
                vscode_1.window.activeTextEditor.setDecorations(vscode_1.window.createTextEditorDecorationType({
                    backgroundColor: decorations[decorationIndex].tint,
                    color: "#000000FF",
                }), [tokenSpans.fullSpan]);
                vscode_1.window.activeTextEditor.setDecorations(vscode_1.window.createTextEditorDecorationType({
                    backgroundColor: decorations[decorationIndex].color,
                    color: "#000000FF",
                }), [tokenSpans.span]);
                if (decorationIndex + 1 < decorations.length) {
                    decorationIndex++;
                }
                else {
                    decorationIndex = 0;
                }
            });
        });
    });
    // Push the disposable to the context's subscriptions so that the client can be
    // deactivated on extension deactivation
    context.subscriptions.push(diagnosticsCollection, vscode_1.commands.registerTextEditorCommand("tsplang.parse", (editor) => {
        langclient.sendNotification(ParseDocumentNotification, vscode_languageclient_1.TextDocumentItem.create(editor.document.uri.toString(), editor.document.languageId, editor.document.version, editor.document.getText()));
    }), langclient.start());
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map