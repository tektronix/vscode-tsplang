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
import * as klawSync from "klaw-sync"
import "mocha"

import { InternalPlugin, TsplangPlugin } from "../out/plugin"
import { PluginProvider } from "../out/pluginProvider"
import { PluginExtensionObject, TsplangPluginSettings } from "../out/tsplang.plugin.generated"

import { formatValidationErrors, getFakePluginDirectory } from "./index.fixture"

// Record the default configuration file name.
const CONFIG_FILENAME = PluginProvider["configFilename"]

// Point the builtins directory toward a special unit-test plugin directory.
PluginProvider["builtinsDir"] = getFakePluginDirectory()

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
                    URI.file(path.join(getFakePluginDirectory(), "@lua")).fsPath,
                    URI.file(path.join(getFakePluginDirectory(), "@smu2450")).fsPath,
                    URI.file(path.join(getFakePluginDirectory(), "@smu2461")).fsPath,
                ]
                expect(provider["directories"].map(uri => uri.fsPath)).to.deep.equal(expectedDirs)
            })

            it("Does not populate the plugin lookup table", function() {
                expect(provider["plugins"]).to.be.undefined
            })
        })

        /* Tests sorted by dependence. */

        describe("#populatePluginMap", function() {
            let provider: PluginProvider

            function internalPluginsEquivalent(
                expected: InternalPlugin,
                actual: InternalPlugin | undefined
            ): void | never {
                expect(actual?.cache).to.deep.equal(expected.cache)
                expect(actual?.configUri.toString()).to.equal(expected.configUri.toString())
                expect(actual?.localFiles.map(uri => uri.toString())).to.deep.equal(
                    expected.localFiles.map(uri => uri.toString())
                )
                expect(actual?.settings).to.deep.equal(expected.settings)
            }

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
                    // URI#fsPath makes the drive letter lowercase in Windows.
                    // If we don't create a URI from the fsPath of another URI, then our expected
                    // configUri object will have an upper-case drive letter while the actual
                    // configUri will be lower-case.
                    configUri: URI.file(
                        URI.file(path.join(getFakePluginDirectory(), "@fake", PluginProvider["configFilename"])).fsPath
                    ),
                    localFiles: [],
                    settings: {
                        name: expectedKey,
                    },
                }

                provider["populatePluginMap"](
                    URI.file(path.dirname(expectedInternalPlugin.configUri.fsPath)),
                    expectedInternalPlugin.settings
                )

                internalPluginsEquivalent(expectedInternalPlugin, provider["plugins"].get(expectedKey))
            })

            it("Loads aliases into the plugin lookup table", function() {
                const expectedInternalPlugin: InternalPlugin = {
                    // URI#fsPath makes the drive letter lowercase in Windows.
                    // If we don't create a URI from the fsPath of another URI, then our expected
                    // configUri object will have an upper-case drive letter while the actual
                    // configUri will be lower-case.
                    configUri: URI.file(
                        URI.file(path.join(getFakePluginDirectory(), "@fake", PluginProvider["configFilename"])).fsPath
                    ),
                    localFiles: [],
                    settings: {
                        name: "uniqueName",
                        aliases: ["uniqueAlias1", "uniqueAlias2"],
                    },
                }

                provider["populatePluginMap"](
                    URI.file(path.dirname(expectedInternalPlugin.configUri.fsPath)),
                    expectedInternalPlugin.settings
                )

                expectedInternalPlugin.settings.aliases.forEach(alias => {
                    internalPluginsEquivalent(expectedInternalPlugin, provider["plugins"].get(alias))
                })
            })

            it("Only loads aliases without conflicts into the plugin lookup table", function() {
                const expectedConflict = "2450"
                const originalValue = provider["plugins"].get(expectedConflict)

                const expectedInternalPlugin: InternalPlugin = {
                    // URI#fsPath makes the drive letter lowercase in Windows.
                    // If we don't create a URI from the fsPath of another URI, then our expected
                    // configUri object will have an upper-case drive letter while the actual
                    // configUri will be lower-case.
                    configUri: URI.file(
                        URI.file(path.join(getFakePluginDirectory(), "@fake", PluginProvider["configFilename"])).fsPath
                    ),
                    localFiles: [],
                    settings: {
                        name: "uniqueName",
                        aliases: [expectedConflict, "uniqueAlias2", "uniqueAlias3"],
                    },
                }

                provider["populatePluginMap"](
                    URI.file(path.dirname(expectedInternalPlugin.configUri.fsPath)),
                    expectedInternalPlugin.settings
                )

                expectedInternalPlugin.settings.aliases.forEach(alias => {
                    internalPluginsEquivalent(
                        alias === expectedConflict ? originalValue : expectedInternalPlugin,
                        provider["plugins"].get(alias)
                    )
                })
            })

            it("Emits a ConflictingNameError when a plugin name already exists", function(done: Mocha.Done) {
                // URI#fsPath makes the drive letter lowercase in Windows.
                // If we don't create a URI from the fsPath of another URI, then our expectedUri
                // object will have an upper-case drive letter while the thisPlugin object will
                // be lower-case.
                const expectedUri = URI.file(URI.file(path.join(getFakePluginDirectory(), "@fake")).fsPath)
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
                        internalPluginsEquivalent(originalValue, provider["plugins"].get(expectedConflict))

                        done()
                    }
                )

                const settings: TsplangPluginSettings = {
                    name: expectedConflict,
                }
                provider["populatePluginMap"](expectedUri, settings)
            })

            it("Emits a ConflictingNameError when an alias already exists", function(done: Mocha.Done) {
                // URI#fsPath makes the drive letter lowercase in Windows.
                // If we don't create a URI from the fsPath of another URI, then our expectedUri
                // object will have an upper-case drive letter while the thisPlugin object will
                // be lower-case.
                const expectedPluginDirUri = URI.file(URI.file(path.join(getFakePluginDirectory(), "@fake")).fsPath)
                const expectedConflict = "2450"
                const originalValue = provider["plugins"].get(expectedConflict)

                provider.onConflictingNameError(
                    (existingPlugin: string, thisPlugin: string, conflictingName: string, alias: boolean) => {
                        // Validate error contents
                        expect(existingPlugin).to.have.string(expectedConflict)
                        expect(thisPlugin).to.equal(expectedPluginDirUri.toString())
                        expect(conflictingName).to.equal(expectedConflict)
                        expect(alias).to.be.true

                        // Verify the existing settings were not overwritten
                        internalPluginsEquivalent(originalValue, provider["plugins"].get(expectedConflict))

                        done()
                    }
                )

                const settings: TsplangPluginSettings = {
                    name: "uniqueName",
                    aliases: [expectedConflict],
                }
                provider["populatePluginMap"](expectedPluginDirUri, settings)
            })
        })

        describe("#loadAllPluginConfigs", function() {
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
                    provider["directories"] = [URI.file(path.join(getFakePluginDirectory(), "badConfigs"))]
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

                it("Emits if include filter is not a valid Lua Namespace", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        reasons.forEach(reason => {
                            if (reason.keyword === "pattern") {
                                done()
                            }
                        })
                    })
                    configSwitcher("maliciousIncludeFilter.json")
                })

                it("Emits if exclude filter is not a valid Lua Namespace", function(done: Mocha.Done) {
                    provider.onInvalidConfigError((reasons: ajv.ErrorObject[]) => {
                        reasons.forEach(reason => {
                            if (reason.keyword === "pattern") {
                                done()
                            }
                        })
                    })
                    configSwitcher("maliciousExcludeFilter.json")
                })

                it("TODO: add more JSON schema tests")
            })
        })

        describe(".filter", function() {
            const emptyPlugin: TsplangPlugin = {
                files: new Set(),
                keywords: new Set(),
                licenses: new Map(),
            }

            let provider: PluginProvider
            let luaFsPluginDir: string
            let luaPlugin: TsplangPlugin
            let smu2450FsPluginDir: string
            let smu2450Plugin: TsplangPlugin
            let smu2461FsPluginDir: string
            let smu2461Plugin: TsplangPlugin

            this.beforeAll(function() {
                provider = new PluginProvider()
                // Load valid plugins from our plugin sandbox.
                provider["loadAllPluginConfigs"]()

                const internalLuaPlugin = provider["plugins"].get("lua")
                luaFsPluginDir = path.dirname(internalLuaPlugin.configUri.fsPath)

                const internal2450Plugin = provider["plugins"].get("2450")
                smu2450FsPluginDir = path.dirname(internal2450Plugin.configUri.fsPath)

                const internal2461Plugin = provider["plugins"].get("2461")
                smu2461FsPluginDir = path.dirname(internal2461Plugin.configUri.fsPath)

                // Grab all available .tsp files.
                internalLuaPlugin.localFiles = klawSync(luaFsPluginDir, {
                    depthLimit: 10,
                })
                    .filter(PluginProvider["tspFileFilter"])
                    .map((tspFile: klawSync.Item) => URI.file(tspFile.path))

                internal2450Plugin.localFiles = klawSync(smu2450FsPluginDir, {
                    depthLimit: 10,
                })
                    .filter(PluginProvider["tspFileFilter"])
                    .map((tspFile: klawSync.Item) => URI.file(tspFile.path))

                internal2461Plugin.localFiles = klawSync(smu2461FsPluginDir, {
                    depthLimit: 10,
                })
                    .filter(PluginProvider["tspFileFilter"])
                    .map((tspFile: klawSync.Item) => URI.file(tspFile.path))

                // Create and verify an external plugin.
                luaPlugin = TsplangPlugin.from(internalLuaPlugin)
                expect(luaPlugin.files).to.not.be.empty
                expect(luaPlugin.keywords).to.not.be.empty
                expect(luaPlugin.licenses).to.not.be.empty

                smu2450Plugin = TsplangPlugin.from(internal2450Plugin)
                expect(smu2450Plugin.files).to.not.be.empty
                expect(smu2450Plugin.keywords).to.be.empty
                expect(smu2450Plugin.licenses).to.be.empty

                smu2461Plugin = TsplangPlugin.from(internal2461Plugin)
                expect(smu2461Plugin.files).to.not.be.empty
                expect(smu2461Plugin.keywords).to.be.empty
                expect(smu2461Plugin.licenses).to.be.empty
            })

            it("Returns an empty plugin if given an empty plugin", function() {
                const actual = PluginProvider["filter"](emptyPlugin, [], [])

                expect(actual).to.deep.equal(emptyPlugin)
            })

            it("Ignores all filters if given an empty plugin", function() {
                const actual = PluginProvider["filter"](emptyPlugin, ["random", "includes"], ["random", "excludes"])

                expect(actual).to.deep.equal(emptyPlugin)
            })

            it("Includes everything and excludes nothing if filters are empty", function() {
                const actual = PluginProvider["filter"](luaPlugin, [], [])

                expect(actual).to.deep.equal(luaPlugin)
            })

            it("Returned plugin does not share object pointers with the given plugin", function() {
                const actual = PluginProvider["filter"](luaPlugin, [], [])

                // Triple-equals on objects compares object reference.
                expect(actual).to.not.equal(luaPlugin)
                expect(actual.files).to.not.equal(luaPlugin.files)
                expect(actual.keywords).to.not.equal(luaPlugin.keywords)
                expect(actual.licenses).to.not.equal(luaPlugin.licenses)
            })

            it("Does not modify keywords", function() {
                const actual = PluginProvider["filter"](luaPlugin, ["math"], ["math.pi"])

                expect(actual.keywords).to.deep.equal(luaPlugin.keywords)
            })

            it("Does not modify the license lookup table", function() {
                const actual = PluginProvider["filter"](luaPlugin, ["os"], ["os.clock"])

                expect(actual.licenses).to.deep.equal(luaPlugin.licenses)
            })

            describe("Top-Level TSP Commands", function() {
                it("Includes any file that matches an include filter", function() {
                    const include = ["assert", "print", "require", "tostring"]
                    const expectedFiles = new Set<string>()
                    include.forEach(name => {
                        expectedFiles.add(
                            URI.file(path.join(luaFsPluginDir, name + PluginProvider["tspFileExtension"])).toString()
                        )
                    })

                    const actual = PluginProvider["filter"](luaPlugin, include, [])

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })

                it("Excludes any included file that matches an exclude filter", function() {
                    const include = []
                    const exclude = ["tostring"]
                    const expectedFiles = new Set<string>(luaPlugin.files.values())
                    expectedFiles.delete(
                        URI.file(path.join(luaFsPluginDir, "tostring" + PluginProvider["tspFileExtension"])).toString()
                    )

                    const actual = PluginProvider["filter"](luaPlugin, include, exclude)

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })

                it("Only includes the top-level command if a nested command has the same name", function() {
                    const include = ["read"]
                    const expectedFiles = new Set<string>()
                    include.forEach(name => {
                        expectedFiles.add(
                            URI.file(
                                path.join(smu2461FsPluginDir, name + PluginProvider["tspFileExtension"])
                            ).toString()
                        )
                    })

                    const actual = PluginProvider["filter"](smu2461Plugin, include, [])

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })
            })

            describe("TSP Command Tables", function() {
                it("Supports automatic inclusion of command table members", function() {
                    // Filter can be a root-level command table...
                    const luaInclude: string[] = ["math", "os"]
                    // ...or a subcommand table.
                    const smu2461Include: string[] = ["smu.digitize"]

                    // Collect expected files from the filesystem.
                    const expectedFiles = new Set<string>()
                    // Add automatically included dependencies.
                    expectedFiles.add(
                        URI.file(path.join(smu2461FsPluginDir, "smu" + PluginProvider["tspFileExtension"])).toString()
                    )
                    // Loop through include arrays.
                    luaInclude.forEach(name => {
                        // Add the command file.
                        expectedFiles.add(
                            URI.file(path.join(luaFsPluginDir, name + PluginProvider["tspFileExtension"])).toString()
                        )
                        // Add files the command directory.
                        klawSync(path.join(luaFsPluginDir, ...name.split(".")))
                            .filter(PluginProvider["tspFileFilter"])
                            .map(item => item.path)
                            .forEach(file => expectedFiles.add(URI.file(file).toString()))
                    })
                    smu2461Include.forEach(name => {
                        // Include the command file.
                        expectedFiles.add(
                            URI.file(
                                path.join(
                                    smu2461FsPluginDir,
                                    name.replace(/[.]/g, path.sep) + PluginProvider["tspFileExtension"]
                                )
                            ).toString()
                        )
                        // Include files from the command directory.
                        klawSync(path.join(smu2461FsPluginDir, ...name.split(".")))
                            .filter(PluginProvider["tspFileFilter"])
                            .map(item => item.path)
                            .forEach(file => expectedFiles.add(URI.file(file).toString()))
                    })

                    const actual = PluginProvider["filter"](
                        TsplangPlugin.merge(luaPlugin, smu2461Plugin),
                        [...luaInclude, ...smu2461Include],
                        []
                    )

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })

                it("Supports inclusion of individual command subtables", function() {
                    // Basic test.
                    const luaInclude: string[] = ["math.pi", "os.time"]
                    // Advanced test.
                    const smu2450Include: string[] = ["smu.measure.math.mxb"]

                    // Collect expected files from the filesystem.
                    const expectedFiles = new Set<string>()
                    // Add automatically included files.
                    expectedFiles.add(
                        URI.file(path.join(luaFsPluginDir, "math" + PluginProvider["tspFileExtension"])).toString()
                    )
                    expectedFiles.add(
                        URI.file(path.join(luaFsPluginDir, "os" + PluginProvider["tspFileExtension"])).toString()
                    )
                    expectedFiles.add(
                        URI.file(path.join(smu2450FsPluginDir, "smu" + PluginProvider["tspFileExtension"])).toString()
                    )
                    expectedFiles.add(
                        URI.file(
                            path.join(smu2450FsPluginDir, "smu", "measure" + PluginProvider["tspFileExtension"])
                        ).toString()
                    )
                    expectedFiles.add(
                        URI.file(
                            path.join(smu2450FsPluginDir, "smu", "measure", "math" + PluginProvider["tspFileExtension"])
                        ).toString()
                    )
                    // Loop through include arrays.
                    luaInclude.forEach(name => {
                        // Add the command file.
                        expectedFiles.add(
                            URI.file(
                                path.join(
                                    luaFsPluginDir,
                                    name.replace(/[.]/g, path.sep) + PluginProvider["tspFileExtension"]
                                )
                            ).toString()
                        )
                    })
                    smu2450Include.forEach(name => {
                        // Include the command file.
                        expectedFiles.add(
                            URI.file(
                                path.join(
                                    smu2450FsPluginDir,
                                    name.replace(/[.]/g, path.sep) + PluginProvider["tspFileExtension"]
                                )
                            ).toString()
                        )
                    })

                    const actual = PluginProvider["filter"](
                        TsplangPlugin.merge(luaPlugin, smu2450Plugin),
                        [...luaInclude, ...smu2450Include],
                        []
                    )

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })

                it("Supports automatic exclusion of command subtables", function() {
                    // Filter can be a root-level command table...
                    const luaExclude: string[] = ["os"]
                    // ...or a subcommand table.
                    const smu2461Exclude: string[] = ["smu.digitize"]

                    // Collect all files from both plugins.
                    const expectedFiles = new Set<string>([
                        ...Array.from(luaPlugin.files.keys()),
                        ...Array.from(smu2461Plugin.files.keys()),
                    ])

                    // Discover and exclude files from the filesystem.
                    luaExclude.forEach(name => {
                        // Exclude the command file.
                        expectedFiles.delete(
                            URI.file(path.join(luaFsPluginDir, name + PluginProvider["tspFileExtension"])).toString()
                        )
                        // Exclude files from the command directory.
                        klawSync(path.join(luaFsPluginDir, ...name.split(".")))
                            .filter(PluginProvider["tspFileFilter"])
                            .map(item => item.path)
                            .forEach(file => expectedFiles.delete(URI.file(file).toString()))
                    })
                    smu2461Exclude.forEach(name => {
                        // Exclude the command file.
                        expectedFiles.delete(
                            URI.file(
                                path.join(
                                    smu2461FsPluginDir,
                                    name.replace(/[.]/g, path.sep) + PluginProvider["tspFileExtension"]
                                )
                            ).toString()
                        )
                        // Exclude files from the command directory.
                        klawSync(path.join(smu2461FsPluginDir, ...name.split(".")))
                            .filter(PluginProvider["tspFileFilter"])
                            .map(item => item.path)
                            .forEach(file => expectedFiles.delete(URI.file(file).toString()))
                    })

                    const actual = PluginProvider["filter"](
                        TsplangPlugin.merge(luaPlugin, smu2461Plugin),
                        [],
                        [...luaExclude, ...smu2461Exclude]
                    )

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })

                it("Supports exclusion of individual command subtables", function() {
                    const smu2461Exclude: string[] = ["smu.digitize.range"]

                    // Collect all files from both plugins.
                    const expectedFiles = new Set<string>([...Array.from(smu2461Plugin.files.keys())])

                    // Exclude each file from the filesystem.
                    smu2461Exclude.forEach(name => {
                        // Exclude the command file.
                        expect(
                            expectedFiles.delete(
                                URI.file(
                                    path.join(
                                        smu2461FsPluginDir,
                                        name.replace(/[.]/g, path.sep) + PluginProvider["tspFileExtension"]
                                    )
                                ).toString()
                            )
                        ).to.be.true
                    })

                    const actual = PluginProvider["filter"](smu2461Plugin, [], smu2461Exclude)

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                })
            })
        })

        describe("#get", function() {
            it("Returns undefined if the given plugin does not exist", function() {
                const provider = new PluginProvider()
                const actual = provider.get("notAValidPlugin")

                expect(actual).to.be.undefined
            })

            it("Returns a cached plugin if available", function() {
                const preBakedKey = "PreCachedPlugin"
                const expected: TsplangPlugin = {
                    files: new Set(),
                    keywords: new Set(),
                    licenses: new Map(),
                }

                const provider = new PluginProvider()
                provider["plugins"] = new Map()
                // Create a fake plugin with a pre-cached result.
                provider["plugins"].set(preBakedKey, {
                    cache: expected,
                    configUri: URI.file(PluginProvider["builtinsDir"]),
                    localFiles: [],
                    settings: {
                        name: preBakedKey,
                    },
                })

                const actual = provider.get(preBakedKey)

                expect(actual).to.deep.equal(expected)
            })

            it("Saves the result in the requested plugin's cache", function() {
                const targetKey = "lua"

                const provider = new PluginProvider()
                // Populate the plugin Map.
                provider["loadAllPluginConfigs"]()
                // Delete our entry's cache.
                provider["plugins"].get(targetKey).cache = undefined
                // Request our entry.
                provider.get(targetKey)

                expect(provider["plugins"].get(targetKey).cache).to.not.be.undefined
            })

            it("Does not merge result with dependencies if there are none", function() {
                const targetKey = "lua"

                const provider = new PluginProvider()
                const actual = provider.get(targetKey)
                const expected = TsplangPlugin.from(provider["plugins"].get(targetKey))

                expect(actual).to.deep.equal(expected)
            })

            describe("Dependency Resolution", function() {
                const smu2450Settings: TsplangPluginSettings = {
                    name: "2450",
                    aliases: ["SMU2450", "SMU 2450", "Smu2450", "Smu 2450", "smu2450", "smu 2450"],
                    extends: ["lua"],
                    keywords: [
                        "abort",
                        "endflash",
                        "endscript",
                        "flash",
                        "loadscript",
                        "loadandrunscript",
                        "login",
                        "logout",
                        "prevflash",
                    ],
                    license: undefined,
                }
                const smu2461Settings: TsplangPluginSettings = {
                    name: "2461",
                    aliases: ["SMU2461", "SMU 2461", "Smu2461", "Smu 2461", "smu2461", "smu 2461"],
                    extends: ["2450", "lua"],
                    keywords: [
                        "abort",
                        "bit",
                        "createconfigscript",
                        "endflash",
                        "endscript",
                        "flash",
                        "fs",
                        "io",
                        "loadscript",
                        "loadandrunscript",
                        "login",
                        "logout",
                        "node",
                        "opc",
                        "prevflash",
                        "printbuffer",
                        "printnumber",
                        "scpi",
                        "table",
                        "waitcomplete",
                    ],
                    license: undefined,
                }

                it("Merges plugin dependencies into the result", function() {
                    const smu2450Extends = ["lua"]
                    const smu2461Extends = ["lua", "2450"]

                    // Create a local copy of the plugin settings declared in the
                    // test suite so we can apply our own extends array.
                    const localSmu2450Settings: TsplangPluginSettings = {
                        name: smu2450Settings.name,
                        aliases: [...smu2450Settings.aliases],
                        extends: smu2450Extends,
                        keywords: [...smu2450Settings.keywords],
                        license: smu2450Settings.license,
                    }
                    const localSmu2461Settings: TsplangPluginSettings = {
                        name: smu2461Settings.name,
                        aliases: [...smu2461Settings.aliases],
                        extends: smu2461Extends,
                        keywords: [...smu2461Settings.keywords],
                        license: smu2461Settings.license,
                    }

                    const provider = new PluginProvider()
                    // Listen for errors so we can fail is they occur.
                    provider.onConfigReadError(reason => {
                        expect.fail(reason)
                    })
                    provider.onConflictingNameError((existingPlugin, thisPlugin, conflictingName, alias) => {
                        expect.fail([existingPlugin, thisPlugin, conflictingName, alias])
                    })
                    provider.onExtendsUnknownPluginError((blameConfig, unknownPlugin) => {
                        expect.fail([blameConfig, unknownPlugin])
                    })
                    provider.onInvalidConfigError(reasons => {
                        expect.fail(formatValidationErrors(reasons))
                    })

                    provider["loadAllPluginConfigs"]()
                    // Add meaningful configuration content to the 2450.
                    const smu2450DirUri = URI.file(path.dirname(provider["plugins"].get("2450").configUri.fsPath))
                    provider["plugins"].delete("2450")
                    provider["populatePluginMap"](smu2450DirUri, localSmu2450Settings)
                    // Add meaningful configuration content to the 2461.
                    const smu2461DirUri = URI.file(path.dirname(provider["plugins"].get("2461").configUri.fsPath))
                    provider["plugins"].delete("2461")
                    provider["populatePluginMap"](smu2461DirUri, localSmu2461Settings)

                    // Collect files for all plugins.
                    const expectedFiles = new Set<string>([
                        // Lua
                        ...klawSync(path.dirname(provider["plugins"].get("lua").configUri.fsPath), {
                            depthLimit: 10,
                        })
                            .filter(PluginProvider["tspFileFilter"])
                            .map((tspFile: klawSync.Item) => URI.file(tspFile.path).toString()),

                        // 2450
                        ...klawSync(smu2450DirUri.fsPath, {
                            depthLimit: 10,
                        })
                            .filter(PluginProvider["tspFileFilter"])
                            .map((tspFile: klawSync.Item) => URI.file(tspFile.path).toString()),

                        // 2461
                        ...klawSync(smu2461DirUri.fsPath, {
                            depthLimit: 10,
                        })
                            .filter(PluginProvider["tspFileFilter"])
                            .map((tspFile: klawSync.Item) => URI.file(tspFile.path).toString()),
                    ])
                    // Collect keywords for all plugins.
                    const expectedKeywords = new Set<string>([
                        // Lua
                        ...provider["plugins"].get("lua").settings.keywords,

                        // 2450
                        ...provider["plugins"].get("2450").settings.keywords,

                        // 2461
                        ...provider["plugins"].get("2461").settings.keywords,
                    ])
                    // Collect licenses for all plugins.
                    const expectedLicenses = new Map<string, string>([
                        // Lua
                        ...Array.from(TsplangPlugin.from(provider["plugins"].get("lua")).licenses.entries()),

                        // 2450
                        ...Array.from(TsplangPlugin.from(provider["plugins"].get("2450")).licenses.entries()),

                        // 2461
                        ...Array.from(TsplangPlugin.from(provider["plugins"].get("2461")).licenses.entries()),
                    ])

                    const actual = provider.get("SMU 2461")

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                    expect(actual.keywords).to.have.all.keys(Array.from(expectedKeywords.keys()))
                    expect(actual.licenses).to.deep.equal(expectedLicenses)
                })

                it("Merges plugin dependencies according to filter rules", function() {
                    /* Sorry if this test broke because you added files! */

                    const smu2450Extends: PluginExtensionObject[] = [
                        {
                            plugin: "lua",
                            include: ["print", "math"],
                            exclude: ["math.tan"],
                        },
                    ]
                    const smu2461Extends: PluginExtensionObject[] = [
                        {
                            plugin: "lua",
                            include: ["os", "require", "math"],
                            exclude: ["require", "math.pi"],
                        },
                        {
                            plugin: "2450",
                            include: ["beeper", "smu.source", "smu.measure.math.mxb", "exit", "print", "math"],
                            exclude: ["beeper.beep", "os", "math.pi"],
                        },
                    ]

                    // Create a local copy of the plugin settings declared in the
                    // test suite so we can apply our own extends array.
                    const localSmu2450Settings: TsplangPluginSettings = {
                        name: smu2450Settings.name,
                        aliases: [...smu2450Settings.aliases],
                        extends: smu2450Extends,
                        keywords: [...smu2450Settings.keywords],
                        license: smu2450Settings.license,
                    }
                    const localSmu2461Settings: TsplangPluginSettings = {
                        name: smu2461Settings.name,
                        aliases: [...smu2461Settings.aliases],
                        extends: smu2461Extends,
                        keywords: [...smu2461Settings.keywords],
                        license: smu2461Settings.license,
                    }

                    const provider = new PluginProvider()
                    // Listen for errors so we can fail is they occur.
                    provider.onConfigReadError(reason => {
                        expect.fail(reason)
                    })
                    provider.onConflictingNameError((existingPlugin, thisPlugin, conflictingName, alias) => {
                        expect.fail([existingPlugin, thisPlugin, conflictingName, alias])
                    })
                    provider.onExtendsUnknownPluginError((blameConfig, unknownPlugin) => {
                        expect.fail([blameConfig, unknownPlugin])
                    })
                    provider.onInvalidConfigError(reasons => {
                        expect.fail(formatValidationErrors(reasons))
                    })

                    provider["loadAllPluginConfigs"]()
                    const luaDirUri = URI.file(path.dirname(provider["plugins"].get("lua").configUri.fsPath))
                    // Add meaningful configuration content to the 2450.
                    const smu2450DirUri = URI.file(path.dirname(provider["plugins"].get("2450").configUri.fsPath))
                    provider["plugins"].delete("2450")
                    provider["populatePluginMap"](smu2450DirUri, localSmu2450Settings)
                    // Add meaningful configuration content to the 2461.
                    const smu2461DirUri = URI.file(path.dirname(provider["plugins"].get("2461").configUri.fsPath))
                    provider["plugins"].delete("2461")
                    provider["populatePluginMap"](smu2461DirUri, localSmu2461Settings)

                    // Collect files for all plugins.
                    const expectedFiles = new Set<string>([
                        // Lua
                        URI.file(path.join(luaDirUri.fsPath, "math", "cos.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "math", "sin.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "math", "tan.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "math.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "os", "clock.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "os", "date.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "os", "time.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "os.tsp")).toString(),
                        URI.file(path.join(luaDirUri.fsPath, "print.tsp")).toString(),

                        // 2450
                        URI.file(path.join(smu2450DirUri.fsPath, "beeper.tsp")).toString(),
                        URI.file(path.join(smu2450DirUri.fsPath, "exit.tsp")).toString(),
                        URI.file(path.join(smu2450DirUri.fsPath, "smu", "measure", "math", "mxb.tsp")).toString(),
                        URI.file(path.join(smu2450DirUri.fsPath, "smu", "source.tsp")).toString(),
                        URI.file(path.join(smu2450DirUri.fsPath, "smu", "measure", "math.tsp")).toString(),
                        URI.file(path.join(smu2450DirUri.fsPath, "smu", "measure.tsp")).toString(),
                        URI.file(path.join(smu2450DirUri.fsPath, "smu.tsp")).toString(),

                        // 2461
                        URI.file(path.join(smu2461DirUri.fsPath, "delay.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "read.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "smu", "digitize", "range.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "smu", "digitize", "read.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "smu", "digitize.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "smu", "measure", "read.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "smu", "measure.tsp")).toString(),
                        URI.file(path.join(smu2461DirUri.fsPath, "smu.tsp")).toString(),
                    ])

                    // Collect keywords for all plugins.
                    const expectedKeywords = new Set<string>([
                        // Lua
                        ...provider["plugins"].get("lua").settings.keywords,

                        // 2450
                        ...provider["plugins"].get("2450").settings.keywords,

                        // 2461
                        ...provider["plugins"].get("2461").settings.keywords,
                    ])
                    // Collect licenses for all plugins.
                    const expectedLicenses = new Map<string, string>([
                        // Lua
                        ...Array.from(TsplangPlugin.from(provider["plugins"].get("lua")).licenses.entries()),

                        // 2450
                        ...Array.from(TsplangPlugin.from(provider["plugins"].get("2450")).licenses.entries()),

                        // 2461
                        ...Array.from(TsplangPlugin.from(provider["plugins"].get("2461")).licenses.entries()),
                    ])

                    const actual = provider.get("SMU 2461")

                    expect(actual.files).to.have.all.keys(Array.from(expectedFiles.keys()))
                    expect(actual.keywords).to.have.all.keys(Array.from(expectedKeywords.keys()))
                    expect(actual.licenses).to.deep.equal(expectedLicenses)
                })

                it("Emits an ExtendsUnknownPluginError when a dependency is unavailable", function(done: Mocha.Done) {
                    const targetKey = "2450"
                    const expectedUnknown = "unknown"

                    const provider = new PluginProvider()
                    provider["loadAllPluginConfigs"]()

                    // Get the expected plugin directory URI from the plugin itself.
                    const expectedConfigUri = provider["plugins"].get(targetKey).configUri
                    // Attach our listener/validator.
                    provider.onExtendsUnknownPluginError((actualConfig: string, actualUnknown: string) => {
                        expect(actualConfig).to.be.equal(expectedConfigUri.toString())
                        expect(actualUnknown).to.be.equal(expectedUnknown)
                        done()
                    })

                    // Add the bad dependency to the target plugin.
                    provider["plugins"].get(targetKey).settings.extends = [expectedUnknown]

                    // Trigger the error.
                    provider.get(targetKey)
                })

                it("Returns undefined when a dependency is unavailable", function() {
                    const targetKey = "2461"

                    const provider = new PluginProvider()
                    provider["loadAllPluginConfigs"]()

                    // Ensure we can get the plugin before our edit.
                    expect(provider.get(targetKey)).to.not.be.undefined

                    const target = provider["plugins"].get(targetKey)
                    // Delete the cached result.
                    target.cache = undefined
                    // Add some bad dependency to the target plugin.
                    target.settings.extends = ["A Very Invalid Plugin"]

                    expect(provider.get(targetKey)).to.be.undefined
                })
            })
        })
    })
})
