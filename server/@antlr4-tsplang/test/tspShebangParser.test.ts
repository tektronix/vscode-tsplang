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
import "mocha"

describe("antlr4-tsplang", function() {
    describe("TspShebangParser", function() {
        describe("shebang", function() {
            it('MUST start with "#!"')

            it("MUST NOT start with a node entry")

            it("MUST use semicolons to delimit plugin and node entries")

            it("MUST NOT allow multiple plugin entries")

            it("MAY have zero or more node entries")

            it("MAY be empty")

            it("MAY end in a vertial whitespace character")

            it("MAY end in a semicolon if preceeded by a valid plugin")
        })

        describe("plugin", function() {
            it("MUST start with a PLUGIN token")

            it("MAY specify a firmware version")
        })

        describe("node", function() {
            it('MUST assign the plugin to an index of the "node" array')
        })

        describe("nodeNumber", function() {
            it("MUST be a number greater than 0")

            it("MUST be a number less than 65")
        })
    })
})
