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
// tslint:disable:no-implicit-dependencies no-unused-expression
import { expect } from 'chai'
// tslint:disable-next-line:no-import-side-effect
import 'mocha'
// tslint:enable:no-implicit-dependencies

import { Model } from '../src/model'
import { Shebang } from '../src/shebang'

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

                before(() => {
                    shebang = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is an empty string', () => {
                    expect(shebang.text).to.equal(line)
                })
            })

            describe('If that line is a valid Model', () => {
                const line = Model.KI2450
                let shebang: Shebang

                before(() => {
                    shebang = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })
            })

            describe('If the Shebang.PREFIX does not start the line', () => {
                const line = Model.KI2460 + Shebang.PREFIX
                let shebang: Shebang

                before(() => {
                    shebang = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is equal to Model.LUA', () => {
                    expect(shebang.master).to.equal(Model.LUA)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })
            })
        })

        describe('Given a line with a Shebang.PREFIX', () => {
            describe('If that line does not contain a master model', () => {
                const line = Shebang.PREFIX
                let shebang: Shebang

                before(() => {
                    shebang = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is undefined', () => {
                    expect(shebang.master).to.be.undefined
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })
            })

            describe('If that line contains a valid master model', () => {
                const master = Model.KI2450
                const line = Shebang.PREFIX + master
                let shebang: Shebang

                before(() => {
                    shebang = Shebang.tokenize(line)
                })

                it('returns a shebang whose master property is the given master model', () => {
                    expect(shebang.master).to.equal(master)
                })

                it('returns a shebang whose text property is the given line', () => {
                    expect(shebang.text).to.equal(line)
                })
            })

            describe('If that line contains an invalid master model', () => {
                const master = 'UnSuppORTed'
                const line = Shebang.PREFIX + master

                it('throws an Error when the given master model is unsupported', () => {
                    expect(() => Shebang.tokenize(line)).to.throw(
                        `Model "${master}" is an invalid or unsupported model.`
                    )
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

                before(() => {
                    shebang = Shebang.tokenize(line)
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

                before(() => {
                    nodeMap.forEach((model: Model, nodeNumber: number) => {
                        lineArray.push(
                            Shebang.SEPARATOR,
                            `node[${(nodeNumber > 0) ? '+' : '-'}${nodeNumber}]=${model}`
                        )
                    })

                    // Add another entry so we have an ending separator
                    lineArray.push(' ')

                    line = lineArray.join(Shebang.SEPARATOR)
                    shebang = Shebang.tokenize(line)
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
            })

            describe('If that line contains duplicate node assignments', () => {
                describe('throws an Error', () => {
                    it('test 1', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2461} `,
                            ` node [ 1 ] = ${Model.KI2450} `,
                            ` node [ 1] = ${Model.KI6500} `,
                            ` node [2 ] = ${Model.KI2460} `,
                            ` node[ 3] = ${Model.KI2461SYS}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw('Node 1 has already been used.')
                    })

                    it('test 2', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2461} `,
                            ` node[1 ] = ${Model.KI2450} `,
                            ` node[2] = ${Model.KI6500} `,
                            ` node [2] = ${Model.KI2460} `,
                            ` node[ 3 ] = ${Model.KI2461SYS}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw('Node 2 has already been used.')
                    })

                    it('test 3', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2461} `,
                            ` node[ 1  ] = ${Model.KI2450} `,
                            ` node  [ 2] = ${Model.KI6500} `,
                            ` node [  3] = ${Model.KI2460} `,
                            ` node[ 3  ] = ${Model.KI2461SYS}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw('Node 3 has already been used.')
                    })
                })
            })

            describe('If that line contains invalid node numbers', () => {
                describe('throws an Error', () => {
                    it('test 1', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2450} `,
                            ` node[-1]=${Model.KI6500} `,
                            ` node[-99]=${Model.KI2460} `,
                            ` node[65]=${Model.KI2461SYS} `,
                            ` node[+99]=${Model.KI2461}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Node number -1 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
                        )
                    })

                    it('test 2', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2450} `,
                            ` node[1]=${Model.KI6500} `,
                            ` node[-99]=${Model.KI2460} `,
                            ` node[65]=${Model.KI2461SYS} `,
                            ` node[+99]=${Model.KI2461}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Node number -99 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
                        )
                    })

                    it('test 3', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2450} `,
                            ` node[1]=${Model.KI6500} `,
                            ` node[2]=${Model.KI2460} `,
                            ` node[65]=${Model.KI2461SYS} `,
                            ` node[+99]=${Model.KI2461}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Node number 65 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
                        )
                    })

                    it('test 4', () => {
                        const line = [
                            `  ${Shebang.PREFIX}${Model.KI2450} `,
                            ` node[1]=${Model.KI6500} `,
                            ` node[2]=${Model.KI2460} `,
                            ` node[3]=${Model.KI2461SYS} `,
                            ` node[+99]=${Model.KI2461}  `
                        ].join(Shebang.SEPARATOR)

                        expect(() => Shebang.tokenize(line)).to.throw(
                            `Node number 99 is less than 1 or greater than ${Shebang.MAX_NODE_NUMBER}.`
                        )
                    })
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
