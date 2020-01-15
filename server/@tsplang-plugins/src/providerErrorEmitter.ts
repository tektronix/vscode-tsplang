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
import { EventEmitter } from "events"

import { ErrorObject } from "ajv"

import { Disposable } from "./disposable"

export namespace ErrorEvents {
    export const CONFIG_READ_ERROR = "ConfigReadError"
    export const CONFLICTING_NAME_ERROR = "ConflictingNameError"
    export const EXTENDS_UNKNOWN_PLUGIN_ERROR = "ExtendsUnknownPluginError"
    export const INVALID_CONFIG_ERROR = "InvalidConfigError"
}

const ConfigReadError = function(reason: Error): void {
    ;(this.emitter as EventEmitter).emit(ErrorEvents.CONFIG_READ_ERROR, reason)
}
const ConflictingNameError = function(
    existingPlugin: string,
    thisPlugin: string,
    conflictingName: string,
    alias: boolean
): void {
    ;(this.emitter as EventEmitter).emit(
        ErrorEvents.CONFLICTING_NAME_ERROR,
        existingPlugin,
        thisPlugin,
        conflictingName,
        alias
    )
}
const ExtendsUnknownPluginError = function(
    blameConfig: string,
    unknownPlugin: string
): void {
    ;(this.emitter as EventEmitter).emit(
        ErrorEvents.EXTENDS_UNKNOWN_PLUGIN_ERROR,
        blameConfig,
        unknownPlugin
    )
}
/**
 * If `null`, then validation of the plugin config failed but AJV provided
 * no errors.
 */
const InvalidConfigError = function(reasons: ErrorObject[] | null): void {
    ;(this.emitter as EventEmitter).emit(ErrorEvents.INVALID_CONFIG_ERROR, reasons)
}

export class ProviderErrorEmitter implements Disposable {
    protected emitter: EventEmitter
    protected readonly sendConfigReadError: typeof ConfigReadError
    protected readonly sendConflictingNameError: typeof ConflictingNameError
    protected readonly sendExtendsUnknownPluginError: typeof ExtendsUnknownPluginError
    protected readonly sendInvalidConfigError: typeof InvalidConfigError

    constructor() {
        this.emitter = new EventEmitter()
        this.sendConfigReadError = ConfigReadError.bind(this)
        this.sendConflictingNameError = ConflictingNameError.bind(this)
        this.sendExtendsUnknownPluginError = ExtendsUnknownPluginError.bind(this)
        this.sendInvalidConfigError = InvalidConfigError.bind(this)
    }

    dispose(): void {
        this.emitter.removeAllListeners()
    }

    onConfigReadError(listener: typeof ConfigReadError): void {
        this.emitter.on(ErrorEvents.CONFIG_READ_ERROR, listener)
    }

    onConflictingNameError(listener: typeof ConflictingNameError): void {
        this.emitter.on(ErrorEvents.CONFLICTING_NAME_ERROR, listener)
    }

    onExtendsUnknownPluginError(listener: typeof ExtendsUnknownPluginError): void {
        this.emitter.on(ErrorEvents.EXTENDS_UNKNOWN_PLUGIN_ERROR, listener)
    }

    onInvalidConfigError(listener: typeof InvalidConfigError): void {
        this.emitter.on(ErrorEvents.INVALID_CONFIG_ERROR, listener)
    }
}
