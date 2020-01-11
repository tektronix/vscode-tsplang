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
import * as ajv from "ajv"
import "mocha"

import { InternalPlugin } from "../out/plugin"
import { PluginProvider } from "../out/pluginProvider"
import { TsplangPluginSettings } from "../out/tsplang.plugin.generated"

import { formatValidationErrors } from "./index.fixture"

// Record the default configuration file name.
const CONFIG_FILENAME = PluginProvider["configFilename"]

// Point the builtins directory toward a special unit-test plugin directory.
const fakePlugins = path.join(__dirname, "plugins")
PluginProvider["builtinsDir"] = fakePlugins

describe("tsplang-plugins", function() {
    describe("PluginProvider", function() {
        describe("construction", function() {
            let provider: PluginProvider

            this.beforeAll(function() {
                provider = new PluginProvider()
            })

            it("Creates a settings validator", function() {
                expect(provider["validateSettings"]).to.not.be.undefined
            })

            it("Populates all valid plugin directories", function() {
                const expectedDirs: string[] = [
                    URI.file(path.join(fakePlugins, "@lua")).fsPath,
                    URI.file(path.join(fakePlugins, "@smu2450")).fsPath,
                    URI.file(path.join(fakePlugins, "@smu2461")).fsPath,
                ]
                expect(provider["directories"].map(uri => uri.fsPath)).to.deep.equal(expectedDirs)
            })

            it("Does not populate the plugin lookup table", function() {
                expect(provider["plugins"]).to.be.undefined
            })
        })

        describe("loadAllPluginConfigs", function() {
            let provider: PluginProvider

            const setupProvider = function(): void {
                provider = new PluginProvider()

                expect(provider["directories"]).to.not.be.empty
            }

            this.beforeAll(setupProvider)
            this.afterEach(setupProvider)

            it("Instantiates the plugin lookup table", function() {
                // Run on an empty directory array.
                const cache = provider["directories"]
                provider["directories"] = []

                provider["loadAllPluginConfigs"]()

                // Restore the directory array.
                provider["directories"] = cache

                expect(provider["plugins"]).to.not.be.undefined
            })

            it("Loads all available plugin configuration files", function() {
                provider.onConfigReadError((reason: Error) => {
                    expect.fail(`(ConfigReadError) ${reason.message}`)
                })
                provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                    expect.fail(`(InvalidConfigError) ${formatValidationErrors(reasons)}`)
                })

                const expectedNames: string[] = ["lua", "2450", "2461"]

                provider["loadAllPluginConfigs"]()
                expect(Array.from(provider["plugins"].keys())).to.deep.equal(expectedNames)
            })

            it("Emits a ConfigReadError event on config read error", function(done: Mocha.Done) {
                provider.onConfigReadError((reason: Error) => {
                    expect(reason.message).to.have.string("badconfig")
                    done()
                })

                // Change the default configuration file name to generate a read error.
                PluginProvider["configFilename"] = "badconfig"

                try {
                    provider["loadAllPluginConfigs"]()
                } finally {
                    PluginProvider["configFilename"] = CONFIG_FILENAME
                }
            })

            describe("InvalidConfigError", function() {
                let provider: PluginProvider

                const configSwitcher = function(target: string): void {
                    // Change our read target.
                    PluginProvider["configFilename"] = target

                    try {
                        provider["loadAllPluginConfigs"]()
                    } finally {
                        // Restore our read target.
                        PluginProvider["configFilename"] = CONFIG_FILENAME
                    }
                }

                const setupProvider = function(): void {
                    provider = new PluginProvider()

                    // Replace valid plugin directories with one containing invalid
                    // configuration files.
                    provider["directories"] = [URI.file(path.join(fakePlugins, "badConfigs"))]
                }

                this.beforeAll(setupProvider)
                this.afterEach(setupProvider)

                it("Emits on config validation failure", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        expect(reasons).to.have.lengthOf(1)
                        expect(reasons[0].keyword).to.equal("required")
                        expect(reasons[0].message).to.have.string("name")
                        done()
                    })
                    configSwitcher("empty.json")
                })

                it("Emits if name missing", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        expect(reasons).to.have.lengthOf(1)
                        expect(reasons[0].keyword).to.equal("required")
                        expect(reasons[0].message).to.have.string("name")
                        done()
                    })
                    configSwitcher("nameMissing.json")
                })

                it("Emits if name contains an open bracket ( [ )", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        expect(reasons).to.have.lengthOf(1)
                        expect(reasons[0].keyword).to.have.string("pattern")
                        done()
                    })
                    configSwitcher("nameHasOpenBracket.json")
                })

                it("Emits if name contains a close bracket ( ] )", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        expect(reasons).to.have.lengthOf(1)
                        expect(reasons[0].keyword).to.have.string("pattern")
                        done()
                    })
                    configSwitcher("nameHasCloseBracket.json")
                })

                it("Emits if name contains a semicolon ( ; )", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        expect(reasons).to.have.lengthOf(1)
                        expect(reasons[0].keyword).to.have.string("pattern")
                        done()
                    })
                    configSwitcher("nameHasSemicolon.json")
                })

                it("TODO: add more JSON schema tests")
            })
        })

        describe("populatePluginMap", function() {
            let provider: PluginProvider

            const setupProvider = function(): void {
                provider = new PluginProvider()

                // Load all configurations as normal.
                provider["loadAllPluginConfigs"]()
            }

            this.beforeAll(setupProvider)
            this.afterEach(setupProvider)

            it("Loads the given settings into the plugin lookup table", function() {
                const expectedKey = "uniqueName"
                const expectedInternalPlugin: InternalPlugin = {
                    configUri: URI.file(path.join(fakePlugins, "fake", "config")),
                    localFiles: [],
                    settings: {
                        name: expectedKey,
                    },
                }

                provider["populatePluginMap"](expectedInternalPlugin.configUri, expectedInternalPlugin.settings)

                expect(provider["plugins"].get(expectedKey)).to.deep.equal(expectedInternalPlugin)
            })

            it("Loads aliases into the plugin lookup table", function() {
                const expectedInternalPlugin: InternalPlugin = {
                    configUri: URI.file(path.join(fakePlugins, "fake", "config")),
                    localFiles: [],
                    settings: {
                        name: "uniqueName",
                        aliases: ["uniqueAlias1", "uniqueAlias2"],
                    },
                }

                provider["populatePluginMap"](expectedInternalPlugin.configUri, expectedInternalPlugin.settings)

                expectedInternalPlugin.settings.aliases.forEach(alias => {
                    expect(provider["plugins"].get(alias)).to.deep.equal(expectedInternalPlugin)
                })
            })

            it("Only loads aliases without conflicts into the plugin lookup table", function() {
                const expectedConflict = "2450"
                const originalValue = provider["plugins"].get(expectedConflict)

                const expectedInternalPlugin: InternalPlugin = {
                    configUri: URI.file(path.join(fakePlugins, "fake", "config")),
                    localFiles: [],
                    settings: {
                        name: "uniqueName",
                        aliases: [expectedConflict, "uniqueAlias2", "uniqueAlias3"],
                    },
                }

                provider["populatePluginMap"](expectedInternalPlugin.configUri, expectedInternalPlugin.settings)

                expectedInternalPlugin.settings.aliases.forEach(alias => {
                    expect(provider["plugins"].get(alias)).to.deep.equal(
                        alias === expectedConflict ? originalValue : expectedInternalPlugin
                    )
                })
            })

            it("Emits a ConflictingNameError when a plugin name already exists", function(done: Mocha.Done) {
                const expectedUri = URI.file(path.join(fakePlugins, "fake", "config"))
                // Get the name of a loaded plugin.
                const expectedConflict = Array.from(provider["plugins"].values())[0].settings.name
                const originalValue = provider["plugins"].get(expectedConflict)

                provider.onConflictingNameError(
                    (existingPlugin: string, thisPlugin: string, conflictingName: string, alias: boolean) => {
                        // Validate error contents
                        expect(existingPlugin).to.have.string(expectedConflict)
                        expect(thisPlugin).to.equal(expectedUri.toString())
                        expect(conflictingName).to.equal(expectedConflict)
                        expect(alias).to.be.false

                        // Verify the existing settings were not overwritten
                        expect(provider["plugins"].get(expectedConflict)).to.deep.equal(originalValue)

                        done()
                    }
                )

                const settings: TsplangPluginSettings = {
                    name: expectedConflict,
                }
                provider["populatePluginMap"](expectedUri, settings)
            })

            it("Emits a ConflictingNameError when an alias already exists", function(done: Mocha.Done) {
                const expectedUri = URI.file(path.join(fakePlugins, "fake", "config"))
                const expectedConflict = "2450"
                const originalValue = provider["plugins"].get(expectedConflict)

                provider.onConflictingNameError(
                    (existingPlugin: string, thisPlugin: string, conflictingName: string, alias: boolean) => {
                        // Validate error contents
                        expect(existingPlugin).to.have.string(expectedConflict)
                        expect(thisPlugin).to.equal(expectedUri.toString())
                        expect(conflictingName).to.equal(expectedConflict)
                        expect(alias).to.be.true

                        // Verify the existing settings were not overwritten
                        expect(provider["plugins"].get(expectedConflict)).to.deep.equal(originalValue)

                        done()
                    }
                )

                const settings: TsplangPluginSettings = {
                    name: "uniqueName",
                    aliases: [expectedConflict],
                }
                provider["populatePluginMap"](expectedUri, settings)
            })
        })
    })
})
