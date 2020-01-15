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
import * as fs from "fs"
import { expect } from "chai"
import "mocha"

import { formatValidationErrors, getPluginConfigPath, makeSchemaValidator } from "../index.fixture"

const validator = makeSchemaValidator()

describe("tsplang-plugins", function() {
    describe("lua", function() {
        describe("tsplang.plugin", function() {
            it("Adheres to the plugin configuration schema", function() {
                const schema = JSON.parse(fs.readFileSync(getPluginConfigPath("lua"), "utf-8"))
                expect(validator(schema), formatValidationErrors(validator.errors)).to.be.true
            })
        })
    })
})
