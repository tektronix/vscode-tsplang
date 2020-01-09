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
import { expect } from "chai"
import "mocha"

import { BaseFeatureController } from "../out/feature"

describe("Extension", function() {
    describe("Feature", function() {
        describe("BaseFeatureController", function() {
            it("Instantiates an empty disposables array", function() {
                const controller = new BaseFeatureController()
                expect(controller["_disposables"]).to.be.empty
            })

            it("Instantiates an empty features array", function() {
                const controller = new BaseFeatureController()
                expect(controller["_features"]).to.be.empty
            })
        })
    })
})
