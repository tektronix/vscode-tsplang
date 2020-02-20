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
import { ErrorObject } from "ajv"
import { expect } from "chai"
import "mocha"

import { ErrorEvents, ProviderErrorEmitter } from "../out/providerErrorEmitter"

interface CircularDependencyErrorArgs {
    requestedPlugin: string
    dependencyChain: string[]
}

interface ConfigReadErrorArgs {
    reason: Error
}

interface ConflictingNameErrorArgs {
    existingPlugin: string
    thisPlugin: string
    conflictingName: string
    alias: boolean
}

interface ExtendsUnknownPluginErrorArgs {
    thisPlugin: string
    unknownPlugin: string
}

interface InvalidConfigErrorArgs {
    reasons: ErrorObject[] | null
}

describe("tsplang-plugins", function() {
    describe("ProviderErrorEmitter", function() {
        describe("CircularDependencyError", function() {
            it("Accepts callback subscriptions", function() {
                let listenerCount: number
                const Emitter = new ProviderErrorEmitter()

                Emitter.onCircularDependencyError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CIRCULAR_DEPENDENCY_ERROR)
                expect(listenerCount).to.equal(1)

                Emitter.onCircularDependencyError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CIRCULAR_DEPENDENCY_ERROR)
                expect(listenerCount).to.equal(2)

                Emitter.onCircularDependencyError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CIRCULAR_DEPENDENCY_ERROR)
                expect(listenerCount).to.equal(3)
            })

            it("Emits on the correct channel", function() {
                let expected: CircularDependencyErrorArgs
                let actual: CircularDependencyErrorArgs | undefined

                const Emitter = new ProviderErrorEmitter()
                Emitter.onCircularDependencyError((requestedPlugin, dependencyChain) => {
                    actual = { requestedPlugin, dependencyChain }
                })

                expected = {
                    requestedPlugin: "Test1_RequestedPlugin_Arg",
                    dependencyChain: ["Test1_Depend1", "Test1_Depend2"],
                }
                actual = undefined

                Emitter["sendCircularDependencyError"](expected.requestedPlugin, expected.dependencyChain)
                expect(actual).to.deep.equal(expected)

                expected = {
                    requestedPlugin: "Test2_RequestedPlugin_Arg",
                    dependencyChain: ["Test2_Depend1", "Test2_Depend2", "Test2_Depend3"],
                }
                actual = undefined

                Emitter["sendCircularDependencyError"](expected.requestedPlugin, expected.dependencyChain)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe("ConfigReadError", function() {
            it("Accepts callback subscriptions", function() {
                let listenerCount: number
                const Emitter = new ProviderErrorEmitter()

                Emitter.onConfigReadError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CONFIG_READ_ERROR)
                expect(listenerCount).to.equal(1)

                Emitter.onConfigReadError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CONFIG_READ_ERROR)
                expect(listenerCount).to.equal(2)

                Emitter.onConfigReadError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CONFIG_READ_ERROR)
                expect(listenerCount).to.equal(3)
            })

            it("Emits on the correct channel", function() {
                let expected: ConfigReadErrorArgs
                let actual: ConfigReadErrorArgs | undefined

                const Emitter = new ProviderErrorEmitter()
                Emitter.onConfigReadError(reason => (actual = { reason }))

                expected = {
                    reason: new Error("Test1_Reason_Arg"),
                }
                actual = undefined

                Emitter["sendConfigReadError"](expected.reason)
                expect(actual).to.deep.equal(expected)

                expected = {
                    reason: new Error("Test2_Reason_Arg"),
                }
                actual = undefined

                Emitter["sendConfigReadError"](expected.reason)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe("ConflictingNameError", function() {
            it("Accepts callback subscriptions", function() {
                let listenerCount: number
                const Emitter = new ProviderErrorEmitter()

                Emitter.onConflictingNameError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CONFLICTING_NAME_ERROR)
                expect(listenerCount).to.equal(1)

                Emitter.onConflictingNameError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CONFLICTING_NAME_ERROR)
                expect(listenerCount).to.equal(2)

                Emitter.onConflictingNameError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.CONFLICTING_NAME_ERROR)
                expect(listenerCount).to.equal(3)
            })

            it("Emits on the correct channel", function() {
                let expected: ConflictingNameErrorArgs
                let actual: ConflictingNameErrorArgs | undefined

                const Emitter = new ProviderErrorEmitter()
                Emitter.onConflictingNameError(
                    (existingPlugin, thisPlugin, conflictingName, alias) =>
                        (actual = {
                            existingPlugin,
                            thisPlugin,
                            conflictingName,
                            alias,
                        })
                )

                expected = {
                    existingPlugin: "Test1_ExistingPlugin_Arg",
                    thisPlugin: "Test1_ThisPlugin_Arg",
                    conflictingName: "Test1_ConflictingName_Arg",
                    alias: true,
                }
                actual = undefined
                Emitter["sendConflictingNameError"](
                    expected.existingPlugin,
                    expected.thisPlugin,
                    expected.conflictingName,
                    expected.alias
                )
                expect(actual).to.deep.equal(expected)

                expected = {
                    existingPlugin: "Test2_ExistingPlugin_Arg",
                    thisPlugin: "Test2_ThisPlugin_Arg",
                    conflictingName: "Test2_ConflictingName_Arg",
                    alias: false,
                }
                actual = undefined
                Emitter["sendConflictingNameError"](
                    expected.existingPlugin,
                    expected.thisPlugin,
                    expected.conflictingName,
                    expected.alias
                )
                expect(actual).to.deep.equal(expected)
            })
        })

        describe("ExtendsUnknownPluginError", function() {
            it("Accepts callback subscriptions", function() {
                let listenerCount: number
                const Emitter = new ProviderErrorEmitter()

                Emitter.onExtendsUnknownPluginError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.EXTENDS_UNKNOWN_PLUGIN_ERROR)
                expect(listenerCount).to.equal(1)

                Emitter.onExtendsUnknownPluginError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.EXTENDS_UNKNOWN_PLUGIN_ERROR)
                expect(listenerCount).to.equal(2)

                Emitter.onExtendsUnknownPluginError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.EXTENDS_UNKNOWN_PLUGIN_ERROR)
                expect(listenerCount).to.equal(3)
            })

            it("Emits on the correct channel", function() {
                let expected: ExtendsUnknownPluginErrorArgs
                let actual: ExtendsUnknownPluginErrorArgs | undefined

                const Emitter = new ProviderErrorEmitter()
                Emitter.onExtendsUnknownPluginError(
                    (thisPlugin, unknownPlugin) => (actual = { thisPlugin, unknownPlugin })
                )

                expected = {
                    thisPlugin: "Test1_ThisPlugin_Arg",
                    unknownPlugin: "Test1_UnknownPlugin_Arg",
                }
                actual = undefined

                Emitter["sendExtendsUnknownPluginError"](expected.thisPlugin, expected.unknownPlugin)
                expect(actual).to.deep.equal(expected)

                expected = {
                    thisPlugin: "Test2_ThisPlugin_Arg",
                    unknownPlugin: "Test2_UnknownPlugin_Arg",
                }
                actual = undefined

                Emitter["sendExtendsUnknownPluginError"](expected.thisPlugin, expected.unknownPlugin)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe("InvalidConfigError", function() {
            it("Accepts callback subscriptions", function() {
                let listenerCount: number
                const Emitter = new ProviderErrorEmitter()

                Emitter.onInvalidConfigError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.INVALID_CONFIG_ERROR)
                expect(listenerCount).to.equal(1)

                Emitter.onInvalidConfigError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.INVALID_CONFIG_ERROR)
                expect(listenerCount).to.equal(2)

                Emitter.onInvalidConfigError((...args: unknown[]) => expect(args))
                listenerCount = Emitter["emitter"].listenerCount(ErrorEvents.INVALID_CONFIG_ERROR)
                expect(listenerCount).to.equal(3)
            })

            it("Emits on the correct channel", function() {
                let expected: InvalidConfigErrorArgs
                let actual: InvalidConfigErrorArgs | undefined

                const Emitter = new ProviderErrorEmitter()
                Emitter.onInvalidConfigError(reasons => (actual = { reasons }))

                expected = {
                    reasons: [
                        {
                            keyword: "Test1",
                            dataPath: "#/reasons/0",
                            schemaPath: __dirname,
                            params: {},
                            message: "Test1_Reasons#0_Arg",
                        },
                        {
                            keyword: "Test1",
                            dataPath: "#/reasons/1",
                            schemaPath: __dirname,
                            params: {},
                            message: "Test1_Reasons#1_Arg",
                        },
                        {
                            keyword: "Test1",
                            dataPath: "#/reasons/2",
                            schemaPath: __dirname,
                            params: {},
                            message: "Test1_Reasons#2_Arg",
                        },
                    ],
                }
                actual = undefined

                Emitter["sendInvalidConfigError"](expected.reasons)
                expect(actual).to.deep.equal(expected)

                expected = {
                    reasons: [],
                }
                actual = undefined

                Emitter["sendInvalidConfigError"](expected.reasons)
                expect(actual).to.deep.equal(expected)

                expected = {
                    reasons: null,
                }
                actual = undefined

                Emitter["sendInvalidConfigError"](expected.reasons)
                expect(actual).to.deep.equal(expected)
            })
        })

        describe("dispose", function() {
            it("Removes all listeners", function() {
                const Emitter = new ProviderErrorEmitter()

                // Add some event listeners.
                Emitter.onCircularDependencyError((...args: unknown[]) => expect(args))
                Emitter.onConfigReadError((...args: unknown[]) => expect(args))
                Emitter.onConflictingNameError((...args: unknown[]) => expect(args))
                Emitter.onExtendsUnknownPluginError((...args: unknown[]) => expect(args))
                Emitter.onInvalidConfigError((...args: unknown[]) => expect(args))
                // Verify that we have more than 0 events with registered listeners.
                expect(Emitter["emitter"].eventNames()).to.not.be.empty

                Emitter.dispose()
                expect(Emitter["emitter"].eventNames()).to.be.empty
            })
        })
    })
})
