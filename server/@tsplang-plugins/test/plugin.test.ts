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
import * as path from "path"

import { expect } from "chai"
import { URI } from "vscode-uri"
import * as fsExtra from "fs-extra"
import * as klawSync from "klaw-sync"
import "mocha"

import { InternalPlugin, TsplangPlugin } from "../out/plugin"
import { PluginProvider } from "../out/pluginProvider"

import { getFakePluginDirectory } from "./index.fixture"

// Point the builtins directory toward a special unit-test plugin directory.
PluginProvider["builtinsDir"] = getFakePluginDirectory()

describe("tsplang-plugins", function() {
    describe("TsplangPlugin", function() {
        describe(".from", function() {
            let provider: PluginProvider

            let inputWithKeywords: InternalPlugin
            let inputWithLicense: InternalPlugin
            let inputWithLocalFiles: InternalPlugin

            let inputWithoutKeywords: InternalPlugin
            let inputWithoutLicense: InternalPlugin
            let inputWithoutLocalFiles: InternalPlugin

            this.beforeAll(function() {
                provider = new PluginProvider()
                provider["loadAllPluginConfigs"]()

                const pluginNameArray: string[] = Array.from(provider["plugins"].keys())
                for (let i = 0; i < pluginNameArray.length; i++) {
                    const candidate = provider["plugins"].get(pluginNameArray[i])

                    // Create input objects for license tests.
                    const licensePath = path.join(path.dirname(candidate.configUri.fsPath), "LICENSE")
                    if (fsExtra.pathExistsSync(licensePath)) {
                        inputWithLicense = candidate
                    } else {
                        inputWithoutLicense = candidate
                    }

                    // Create input objects for local file tests.
                    const localFiles = klawSync(path.dirname(candidate.configUri.fsPath), {
                        depthLimit: 10,
                        filter: PluginProvider["tspFileFilter"],
                    }).map((dir: klawSync.Item) => URI.file(dir.path))

                    if (localFiles.length > 0) {
                        inputWithLocalFiles = candidate
                        inputWithLocalFiles.localFiles = [...localFiles]
                    } else {
                        inputWithoutLocalFiles = candidate
                    }

                    // Create input objects for keyword tests.
                    if ((candidate.settings.keywords ?? []).length > 0) {
                        inputWithKeywords = candidate
                    } else {
                        inputWithoutKeywords = candidate
                    }
                }

                // "With" objects must exist.
                if (inputWithKeywords === undefined) {
                    expect.fail("Cannot find a sandbox plugin with keywords")
                }
                if (inputWithLicense === undefined) {
                    expect.fail("Cannot find a plugin sandbox directory with a LICENSE file")
                }
                if (inputWithLocalFiles === undefined) {
                    expect.fail("Cannot find a sandbox plugin with local files")
                }

                // Construct "without" objects from "with" objects as necessary.
                if (inputWithoutKeywords === undefined) {
                    inputWithoutKeywords = {
                        configUri: inputWithKeywords.configUri,
                        localFiles: [],
                        settings: {
                            name: inputWithKeywords.settings.name,
                            keywords: [],
                        },
                    }
                }
                if (inputWithoutLicense === undefined) {
                    inputWithoutLicense = {
                        configUri: inputWithLicense.configUri,
                        localFiles: [],
                        settings: {
                            name: inputWithLicense.settings.name,
                        },
                    }
                }
                if (inputWithoutLocalFiles === undefined) {
                    inputWithoutLocalFiles = {
                        configUri: inputWithLocalFiles.configUri,
                        localFiles: [],
                        settings: {
                            name: inputWithLocalFiles.settings.name,
                        },
                    }
                }
            })

            it("All InteralPlugin local files are converted to file URI strings", function() {
                const output = TsplangPlugin.from(inputWithLocalFiles)

                Array.from(output.files.values()).forEach(uriString => {
                    if (!uriString.startsWith("file:///")) {
                        expect.fail(`expected a valid file URI (${uriString})`)
                    }
                    if (!fsExtra.pathExistsSync(URI.parse(uriString).fsPath)) {
                        expect.fail(`file does not exist (${uriString})`)
                    }
                    if (!uriString.endsWith(PluginProvider["tspFileExtension"])) {
                        expect.fail(`expected URI to end in "${PluginProvider["tspFileExtension"]}" (${uriString})`)
                    }
                })
            })

            it("Creates an empty files set if InternalPlugin has no local files", function() {
                const output = TsplangPlugin.from(inputWithoutLocalFiles)

                expect(output.files).to.be.empty
            })

            it("Copies InternalPlugin keywords to result", function() {
                const output = TsplangPlugin.from(inputWithKeywords)

                expect(Array.from(output.keywords.values())).to.deep.equal(inputWithKeywords.settings.keywords)
            })

            it("Creates an empty keywords set if InternalPlugin has no keywords", function() {
                const output = TsplangPlugin.from(inputWithoutKeywords)

                expect(output.keywords).to.be.empty
            })

            it("Adds a valid URI string to the license lookup table for the plugin name", function() {
                const output = TsplangPlugin.from(inputWithLicense)

                expect(output.licenses).to.include.keys(inputWithLicense.settings.name)
                Array.from(output.licenses.values()).forEach(uriString => {
                    if (!uriString.startsWith("file:///")) {
                        expect.fail(`expected a valid file URI (${uriString})`)
                    }
                    if (!fsExtra.pathExistsSync(URI.parse(uriString).fsPath)) {
                        expect.fail(`file does not exist (${uriString})`)
                    }
                    if (!uriString.endsWith("LICENSE")) {
                        expect.fail(`expected URI to end in "LICENSE" (${uriString})`)
                    }
                })
            })

            it("Adds a valid URI string to the license lookup table for all aliases", function() {
                // Add aliases as necessary, such that the total number of aliases is >= 2.
                if (!inputWithLicense.settings.aliases || inputWithLicense.settings.aliases.length < 2) {
                    inputWithLicense.settings.aliases = ["uniqueAlias1", "uniqueAlias2"]
                }

                const output = TsplangPlugin.from(inputWithLicense)

                expect(output.licenses).to.have.keys(
                    inputWithLicense.settings.name,
                    ...inputWithLicense.settings.aliases
                )
                Array.from(output.licenses.values()).forEach(uriString => {
                    if (!uriString.startsWith("file:///")) {
                        expect.fail(`expected a valid file URI (${uriString})`)
                    }
                    if (!fsExtra.pathExistsSync(URI.parse(uriString).fsPath)) {
                        expect.fail(`file does not exist (${uriString})`)
                    }
                    if (!uriString.endsWith("LICENSE")) {
                        expect.fail(`expected URI to end in "LICENSE" (${uriString})`)
                    }
                })
            })

            it("Creates an empty license lookup table if no license file exists", function() {
                const output = TsplangPlugin.from(inputWithoutLicense)

                expect(output.licenses).to.be.empty
            })
        })

        describe(".merge", function() {
            it("Combines both file sets", function() {
                const left: TsplangPlugin = {
                    files: new Set(["a", "b", "c"]),
                    keywords: new Set(),
                    licenses: new Map(),
                }
                const right: TsplangPlugin = {
                    files: new Set(["c", "d", "e"]),
                    keywords: new Set(),
                    licenses: new Map(),
                }

                const actual = TsplangPlugin.merge(left, right)

                expect(actual.files).to.include.all.keys(...Array.from(left.files.keys()))
                expect(actual.files).to.include.all.keys(...Array.from(right.files.keys()))
            })

            it("Combines both keyword sets", function() {
                const left: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(["a", "b", "c"]),
                    licenses: new Map(),
                }
                const right: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(["c", "d", "e"]),
                    licenses: new Map(),
                }

                const actual = TsplangPlugin.merge(left, right)

                expect(actual.keywords).to.include.all.keys(...Array.from(left.keywords.keys()))
                expect(actual.keywords).to.include.all.keys(...Array.from(right.keywords.keys()))
            })

            it("Combines both license lookup tables", function() {
                const left: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(),
                    licenses: new Map([
                        ["a", "1"],
                        ["b", "2"],
                        ["c", "3"],
                    ]),
                }
                const right: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(),
                    licenses: new Map([
                        ["d", "4"],
                        ["e", "5"],
                        ["f", "6"],
                    ]),
                }

                const actual = TsplangPlugin.merge(left, right)

                // Check keys.
                expect(actual.licenses).to.include.all.keys(...Array.from(left.licenses.keys()))
                expect(actual.licenses).to.include.all.keys(...Array.from(right.licenses.keys()))
                // Check values.
                left.licenses.forEach((v, k) => {
                    expect(actual.licenses.get(k)).to.equal(v)
                })
                right.licenses.forEach((v, k) => {
                    expect(actual.licenses.get(k)).to.equal(v)
                })
            })

            it("Right param overwrites key-value license pairs from left param", function() {
                const left: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(),
                    licenses: new Map([
                        ["a", "1"],
                        ["b", "2"],
                        ["c", "3"],
                    ]),
                }
                const right: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(),
                    licenses: new Map([
                        ["c", "three"],
                        ["d", "four"],
                        ["e", "five"],
                    ]),
                }
                const commonKey = "c"

                const actual = TsplangPlugin.merge(left, right)

                // Check keys.
                expect(actual.licenses).to.include.all.keys(...Array.from(left.licenses.keys()))
                expect(actual.licenses).to.include.all.keys(...Array.from(right.licenses.keys()))
                // Check values.
                left.licenses.forEach((v, k) => {
                    if (k === commonKey) {
                        expect(actual.licenses.get(k)).to.not.equal(v)
                    } else {
                        expect(actual.licenses.get(k)).to.equal(v)
                    }
                })
                right.licenses.forEach((v, k) => {
                    expect(actual.licenses.get(k)).to.equal(v)
                })
            })
        })
    })
})
