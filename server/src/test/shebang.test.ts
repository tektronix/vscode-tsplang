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
import { Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver'

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

                it('returns a shebang whose model property is equal to Model.LUA', () => {
                    expect(shebang.model).to.equal(Model.LUA)
                })

                it('returns a shebang whose range is (0,0) -> (0,0)', () => {
                    expect(shebang.range).to.deep.equal(Range.create(0, 0, 0, 0))
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

                it('returns a shebang whose model property is equal to Model.LUA', () => {
                    expect(shebang.model).to.equal(Model.LUA)
                })

                it('returns a shebang whose range is (0,0) -> (0,0)', () => {
                    expect(shebang.range).to.deep.equal(Range.create(0, 0, 0, 0))
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

                it('returns a shebang whose model property is equal to Model.LUA', () => {
                    expect(shebang.model).to.equal(Model.LUA)
                })

                it('returns a shebang whose range is (0,0) -> (0,0)', () => {
                    expect(shebang.range).to.deep.equal(Range.create(0, 0, 0, 0))
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

                it('returns a shebang whose model property is equal to Model.LUA', () => {
                    expect(shebang.model).to.equal(Model.LUA)
                })

                it('returns a shebang whose range is the whole line', () => {
                    expect(shebang.range).to.deep.equal(Range.create(0, 0, 0, Number.MAX_VALUE))
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

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
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
                        message: `Model "${master.trim()}" is invalid or unsupported.`,
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

                it('returns a shebang whose model property is equal to Model.LUA', () => {
                    expect(shebang.model).to.equal(Model.LUA)
                })

                it('returns a shebang whose range encompasses the master node', () => {
                    const end = line.length
                    const start = Shebang.PREFIX.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
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

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose root range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
                })

                it.skip('returns a shebang with an accurate nodes property', () => {
                    return
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

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose root range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length + 1
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
                })

                it.skip('returns a shebang with an accurate nodes property', () => {
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
                                character: 36 + 18,
                                line: 0
                            },
                            start: {
                                character: 36 + 2,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                // tslint:enable:no-magic-numbers
                // "  --#!2461-SYS ; node [ 1 ] = 2450 ; node [ 1] = 6500 "
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

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose root range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length + '  '.length
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
                })

                it.skip('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(nodeMap)
                })

                it('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })

            describe('If that line contains invalid node numbers', () => {
                const master = Model.KI2450
                // tslint:disable:no-magic-numbers
                const nodeMap = new Map<number, Model>([
                    [ 10, Model.KI2461SYS ],
                ])
                const expectErrors: Array<Diagnostic> = [
                    {
                        code: 'shebang-node-index',
                        message: `Node number -1 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`,
                        range: {
                            end: {
                                character: 12 + 15,
                                line: 0
                            },
                            start: {
                                character: 12,
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
                                character: 28 + 17,
                                line: 0
                            },
                            start: {
                                character: 28,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                // tslint:enable:no-magic-numbers
                // "  --#!2450 ; node[-1]=6500 ; node[+65]=2461  ; node[10] = 2461-SYS "
                const line = [
                    `  ${Shebang.PREFIX}${master} `,
                    ` node[-1]=${Model.KI6500} `,
                    ` node[+65]=${Model.KI2461}  `,
                    ` node[10] = ${Model.KI2461SYS} `
                ].join(Shebang.SEPARATOR)
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose root range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length + '  '.length
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
                })

                it.skip('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(nodeMap)
                })

                it.skip('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })

            describe('If that line contains invalid node syntax', () => {
                const master = Model.KI6500
                // tslint:disable:no-magic-numbers
                const nodeMap = new Map<number, Model>([
                    [ 1, Model.KI2460 ],
                    [ 3, Model.KI2450 ],
                ])
                const expectErrors: Array<Diagnostic> = [
                    {
                        code: 'shebang-node-expression',
                        message: `Invalid node expression " node{1] = ${Model.KI2461SYS} ".`,
                        range: {
                            end: {
                                character: 29 + 20,
                                line: 0
                            },
                            start: {
                                character: 29,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    },
                    {
                        code: 'shebang-node-expression',
                        message: `Invalid node expression "   node(2) = ${Model.KI2461} ".`,
                        range: {
                            end: {
                                character: 50 + 18,
                                line: 0
                            },
                            start: {
                                character: 50,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                // tslint:enable:no-magic-numbers
                // "  --#!6500 ; node[1] = 2460 ; node{1] = 2461-SYS ;   node(2) = 2461 ; node[3] = 2450  "
                const line = [
                    `  ${Shebang.PREFIX}${master} `,
                    ` node[1] = ${Model.KI2460} `,
                    ` node{1] = ${Model.KI2461SYS} `,
                    `   node(2) = ${Model.KI2461} `,
                    ` node[3] = ${Model.KI2450}  `
                ].join(Shebang.SEPARATOR)
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose root range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length + '  '.length
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
                })

                it.skip('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(nodeMap)
                })

                it.skip('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })

            describe('If that line contains an invalid node assignment', () => {
                const master = Model.KI2450
                // tslint:disable:no-magic-numbers
                const nodeMap = new Map<number, Model>([
                    [ 3, Model.KI6500 ],
                ])
                const expectErrors: Array<Diagnostic> = [
                    {
                        code: 'shebang-model',
                        message: 'Model "VLXkyi(c&,^" is an invalid or unsupported model.',
                        range: {
                            end: {
                                character: 10 + 19,
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
                        code: 'shebang-model',
                        message: 'Model "MeKrAY8I" is an invalid or unsupported model.',
                        range: {
                            end: {
                                character: 30 + 18,
                                line: 0
                            },
                            start: {
                                character: 30,
                                line: 0
                            }
                        },
                        severity: DiagnosticSeverity.Error,
                        source: 'tsplang'
                    }
                ]
                // tslint:enable:no-magic-numbers
                // "--#!2450 ;node[1]=VLXkyi(c&,^;node[2 ] =MeKrAY8I;node[64] = 6500  "
                const line = [
                    `${Shebang.PREFIX}${master} `,
                    'node[1]=VLXkyi(c&,^',
                    'node[2 ] =MeKrAY8I',
                    `node[3] = ${Model.KI6500}  `
                ].join(Shebang.SEPARATOR)
                let shebang: Shebang
                let errors: Array<Diagnostic>

                before(() => {
                    [shebang, errors] = Shebang.tokenize(line)
                })

                it('returns a shebang whose model property is the given master model', () => {
                    expect(shebang.model).to.equal(master)
                })

                it('returns a shebang whose root range encompasses the master node', () => {
                    const start = Shebang.PREFIX.length
                    const end = start + master.length
                    expect(shebang.range).to.deep.equal(Range.create(0, start, 0, end))
                })

                it.skip('returns a shebang with an accurate nodes property', () => {
                    expect(shebang.nodes).to.deep.equal(nodeMap)
                })

                it('returns expected errors', () => {
                    expect(errors).to.deep.equal(expectErrors)
                })
            })
        })
    })
})
