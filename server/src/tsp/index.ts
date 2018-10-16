/*
 *  Copyright 2018 Tektronix Inc.
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
/* tslint:disable: no-var-requires no-require-imports */
'use strict'

import { CommonTokenStream, InputStream } from 'antlr4'

export class TspLexer extends require('./TspLexer').TspLexer {
    constructor(inputStream: InputStream) {
        super(inputStream)
    }
}

export class TspParser extends require('./TspParser').TspParser {
    constructor(tokens: CommonTokenStream) {
        super(tokens)
    }
}

export class TspListener extends require('./TspListener').TspListener {
    constructor() {
        super()
    }
}
