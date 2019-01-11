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
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver'

import { Model } from '../model'
import { Shebang } from '../shebang'

describe('Shebang', () => {
    describe('.PREFIX', () => {
        it('contained in Shebang', () => {
            expect(Shebang).to.have.ownProperty('PREFIX')
        })

        it('typeof string', () => {
            expect(typeof Shebang.PREFIX === 'string').to.equal(true)
        })
    })

    describe('.MAX_NODE_NUMBER', () => {
        it('contained in Shebang', () => {
            expect(Shebang).to.have.ownProperty('MAX_NODE_NUMBER')
        })

        it('typeof number', () => {
            expect(typeof Shebang.MAX_NODE_NUMBER === 'number').to.equal(true)
        })
    })

    describe('.SEPARATOR', () => {
        it('contained in Shebang', () => {
            expect(Shebang).to.have.ownProperty('SEPARATOR')
        })

        it('typeof string', () => {
            expect(typeof Shebang.SEPARATOR === 'string').to.equal(true)
        })
    })

    describe('.tokenize', () => {
        describe('Given a line without a starting Shebang.PREFIX', () => {
            describe('If that line is an empty string', () => {
                const line = ''
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is an empty string', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })

            describe('If that line is a valid Model', () => {
                const line = Model.KI2450
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })

            describe('If the Shebang.PREFIX does not start the line', () => {
                const line = Model.KI2460 + Shebang.PREFIX
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })
        })

        describe('Given a line with a Shebang.PREFIX', () => {
            describe('If that line does not contain a master model', () => {
                const line = Shebang.PREFIX
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })

            describe('If that line contains a valid master model', () => {
                const master = Model.KI2450
                const line = Shebang.PREFIX + master
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is the given master model', () => {
                    expect(shebang.master).to.equal(master)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })

            describe('If that line contains an invalid master model', () => {
                const master = 'UnSuppORTed'
                const line = Shebang.PREFIX + master
                const expectErrors: Array<Diagnostic> = [
                    {
                        code: 'shebang-model',
                        message: `Model "${master}" is an invalid or unsupported model.`,
                        range: {
                            end: {
                                character: Shebang.PREFIX.length + master.length,
                                line: 0
                            },
                            start: {
                                character: Shebang.PREFIX.length,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })

            describe('If that line has a single valid node assignment', () => {
                const master = Model.KI2460
                const nodeNumber = 1
                const nodeModel = Model.KI2461SYS
                const line = [
                    Shebang.PREFIX,
                    master,
                    Shebang.SEPARATOR,
                    `node[${(nodeNumber > 0) ? '+' : '-'}${nodeNumber}]=${nodeModel}`
                ].join('')
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is the given master model', () => {
                    expect(shebang.master).to.equal(master)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(new Map<number, Model>([
                        [ nodeNumber, nodeModel ]
                    ]))
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })

            describe('If that line has multiple valid node assignments', () => {
                const master = Model.KI2461SYS
                // tslint:disable:no-magic-numbers
                const nodeMap = new Map<number, Model>([
                    [ 1, Model.KI2461 ],
                    [ 2, Model.KI2450 ],
                    [ 5, Model.KI6500 ],
                    [ 63, Model.KI2460 ],
                ])
                // tslint:enable:no-magic-numbers
                const lineArray: Array<string> = [ Shebang.PREFIX, master ]
                let line: string
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    nodeMap.forEach((model: Model, nodeNumber: number) => {
                        lineArray.push(
                            Shebang.SEPARATOR,
                            `node[${(nodeNumber > 0) ? '+' : '-'}${nodeNumber}]=${model}`
                        )
                    })

                    // Add another entry so we have an ending separator
                    lineArray.push(' ')

                    line = lineArray.join(Shebang.SEPARATOR);
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is the given master model', () => {
                    expect(shebang.master).to.equal(master)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(nodeMap)
                })

                it('returns no errors', () => {
                    expect(errors).to.be.empty
                })
            })

            describe('If that line contains duplicate node assignments', () => {
                const master = Model.KI2461SYS
                // tslint:disable:no-magic-numbers
                const nodeMap = new Map<number, Model>([
                    [ 1, Model.KI2450 ],
                ])
                const expectErrors: Array<Diagnostic> = [
                    {
                        code: 'shebang-node-defined',
                        message: 'Node 1 has already been used.',
                        range: {
                            end: {
                                character: 34 + 18,
                                line: 0
                            },
                            start: {
                                character: 34,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                // tslint:enable:no-magic-numbers
                const line = [
                    `  ${Shebang.PREFIX}${master} `,
                    ` node [ 1 ] = ${Model.KI2450} `,
                    ` node [ 1] = ${Model.KI6500} `,
                ].join(Shebang.SEPARATOR)
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is the given master model', () => {
                    expect(shebang.master).to.equal(master)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(nodeMap)
                })

                it('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })

            describe('If that line contains invalid node numbers', () => {
                const master = Model.KI2450
                // tslint:disable:no-magic-numbers
                const expectErrors: Array<Diagnostic> = [
                    {
                        code: 'shebang-node-index',
                        message: `Node number -1 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`,
                        range: {
                            end: {
                                character: 10 + 15,
                                line: 0
                            },
                            start: {
                                character: 10,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    },
                    {
                        code: 'shebang-node-index',
                        message: `Node number 65 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`,
                        range: {
                            end: {
                                character: 26 + 17,
                                line: 0
                            },
                            start: {
                                character: 26,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                // tslint:enable:no-magic-numbers
                const line = [
                    `  ${Shebang.PREFIX}${master} `,
                    ` node[-1]=${Model.KI6500} `,
                    ` node[+65]=${Model.KI2461}  `
                ].join(Shebang.SEPARATOR)
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is the given master model', () => {
                    expect(shebang.master).to.equal(master)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })

                it('returns a shebang with an empty node map', () => {
                    expect(shebang.nodes).to.be.empty
                })

                it('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })

            describe('If that line contains invalid node syntax', () => {
                describe('throws an Error', () => {
                    it('test 1', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI6500} `,
                            ` node[1] = ${Model.KI2460} `,
                            ` node{1] = ${Model.KI2461SYS} `,
                            ` node(2) = ${Model.KI2461} `,
                            ` node[3] = ${Model.KI2450}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Invalid node expression " node{1] = ${Model.KI2461SYS} ".`
                        )
                    })

                    it('test 2', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI6500} `,
                            ` node[1] = ${Model.KI2460} `,
                            ` node[2] = ${Model.KI2461SYS} `,
                            `    node(3) = ${Model.KI2461} `,
                            ` node[4] = ${Model.KI2450}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Invalid node expression "    node(3) = ${Model.KI2461} ".`
                        )
                    })

                    it('test 3', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI6500} `,
                            ` node[1] = ${Model.KI2460} `,
                            ` node[2] = ${Model.KI2461SYS} `,
                            ` node[3] = ${Model.KI2461} `,
                            `  <64L4QxLQ|$\\1ng4W<\\d  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Invalid node expression "  <64L4QxLQ|$\\1ng4W<\\d".`
                        )
                    })
                })
            })

            describe('If that line contains an invalid node assignment', () => {
                describe('throws an Error', () => {
                    it('test 1', () => {
                        const line = '--#!2450;node[1]=VLXkyi(c&,^;node[2]=MeKrAY8I'

                        expect(() => Shebang.tokenize(line)).to.throw(
                            'Model "VLXkyi(c&,^" is an invalid or unsupported model.'
                        )
                    })

                    it('test 2', () => {
                        const line = '--#!2450;node[1]=6500;node[2]=MeKrAY8I'

                        expect(() => Shebang.tokenize(line)).to.throw(
                            'Model "MeKrAY8I" is an invalid or unsupported model.'
                        )
                    })
                })
            })
        })
    })
})
