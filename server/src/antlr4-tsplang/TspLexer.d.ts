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
import { Token, Lexer, InputStream } from 'antlr4'

export declare class TspLexer extends Lexer {
    static EOF: number
    static T__0: number
    static T__1: number
    static T__2: number
    static T__3: number
    static T__4: number
    static T__5: number
    static T__6: number
    static T__7: number
    static T__8: number
    static T__9: number
    static T__10: number
    static T__11: number
    static T__12: number
    static T__13: number
    static T__14: number
    static T__15: number
    static T__16: number
    static T__17: number
    static T__18: number
    static T__19: number
    static T__20: number
    static T__21: number
    static T__22: number
    static T__23: number
    static T__24: number
    static T__25: number
    static T__26: number
    static T__27: number
    static T__28: number
    static T__29: number
    static T__30: number
    static T__31: number
    static T__32: number
    static T__33: number
    static T__34: number
    static T__35: number
    static T__36: number
    static T__37: number
    static T__38: number
    static T__39: number
    static T__40: number
    static T__41: number
    static T__42: number
    static T__43: number
    static T__44: number
    static T__45: number
    static T__46: number
    static NIL: number
    static BOOLEAN: number
    static LOCAL: number
    static VARARG: number
    static NAME: number
    static NORMALSTRING: number
    static CHARSTRING: number
    static LONGSTRING: number
    static INT: number
    static HEX: number
    static FLOAT: number
    static LONGCOMMENT: number
    static LINE_COMMENT: number
    static HORIZONTAL_WS: number
    static VERTICAL_WS: number
    static SHEBANG: number

    readonly channelNames: Array<string>
    readonly grammarFileName: string
    readonly literalNames: Array<string | null>
    readonly modeNames: Array<string>
    readonly ruleNames: Array<string>
    readonly symbolicNames: Array<string | null>

    constructor(input: InputStream)
}
