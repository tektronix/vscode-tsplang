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
import {
    ANTLRInputStream,
    BufferedTokenStream,
    Lexer,
    Parser,
    ParserRuleContext,
} from "antlr4ts"
import { ParseTree } from "antlr4ts/tree"
import { ParseTreePattern } from "antlr4ts/tree/pattern"
import { expect } from "chai"
import "mocha"

import { ERROR_THROWER } from "./errorListener.fixture"

export interface TestContext<
    L extends Lexer,
    S extends BufferedTokenStream,
    P extends Parser,
    N extends ParserRuleContext
> {
    inputStream: ANTLRInputStream
    lexer: L
    tokenStream: S
    parser: P
    root?: N
    docstringPattern?: Promise<ParseTreePattern>
}
export function contextFactoryConstructor<
    L extends Lexer,
    S extends BufferedTokenStream,
    P extends Parser
>(
    lexerConstructor: (input: ANTLRInputStream) => L,
    commonTokenStreamConstructor: (lexer: L) => S,
    parserConstructor: (tokenStream: S) => P
): <N extends ParserRuleContext>(content: string) => TestContext<L, S, P, N> {
    return function<N extends ParserRuleContext>(
        content: string
    ): TestContext<L, S, P, N> {
        const inputStream = new ANTLRInputStream(content)
        const lexer = lexerConstructor(inputStream)
        lexer.removeErrorListeners()
        lexer.addErrorListener(ERROR_THROWER)
        const tokenStream = commonTokenStreamConstructor(lexer)
        const parser = parserConstructor(tokenStream)
        parser.removeErrorListeners()
        parser.addErrorListener(ERROR_THROWER)

        return {
            inputStream,
            lexer,
            tokenStream,
            parser,
        }
    }
}

/**
 * Run the given test callback once and only once.
 *
 * An Error is thrown if the given set does not contain exactly one item.
 */
export function singleItemXPathSetTestFixture(
    set: Set<ParseTree>,
    test: (item: ParseTree) => void | never,
    done: Mocha.Done
): void | never {
    set.forEach(function(item: ParseTree): void | never {
        test(item)
        // Mocha throws an error if done is called more than once.
        done()
    })
    // If done is called, then this error will be ignored.
    expect.fail()
}

/**
 * Run the given test callback for each Set item.
 */
export function multiItemXPathSetTextFixture(
    set: Set<ParseTree>,
    expectedSetSize: number,
    test: (item: ParseTree) => void | never
): void | never {
    let paranoidLoopCounter = 0
    set.forEach(item => {
        test(item)
        expect(paranoidLoopCounter).to.be.lessThan(expectedSetSize)
        paranoidLoopCounter++
    })
}
