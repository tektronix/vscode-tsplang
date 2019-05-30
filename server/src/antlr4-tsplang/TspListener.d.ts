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
import { ParserRuleContext } from 'antlr4'
import { ParseTreeListener, TerminalNode, ErrorNode } from 'antlr4/tree/Tree'

import { TspParser } from './TspParser'

export declare class TspListener implements ParseTreeListener {
    constructor()

    enterEveryRule(node: ParserRuleContext): void
    exitEveryRule(node: ParserRuleContext): void
    visitErrorNode(node: ErrorNode): void
    visitTerminal(node: TerminalNode): void

    enterChunk(context: TspParser.ChunkContext): void
    exitChunk(context: TspParser.ChunkContext): void

    enterStatement(context: TspParser.StatementContext): void
    exitStatement(context: TspParser.StatementContext): void
}
