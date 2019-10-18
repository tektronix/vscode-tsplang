#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const process = require("process")

new Map([
    [
        "../.antlr/TspLexer.js",
        {
            dest: "../src/TspLexer.generated.ts",
            replace: [[/exports.TspLexer = TspLexer;/g, "export { TspLexer };"]],
        },
    ],
    [
        "../.antlr/TspParser.js",
        {
            dest: "../src/TspParser.generated.ts",
            replace: [
                [/TspParser\.(.*Context) = \1;/g, ""],
                [/function (.*Context)(\(.*\))/g, "const $1 = function$2: void"],
                [/exports.TspParser = TspParser;/g, "export { TspParser };"],
            ],
        },
    ],
    [
        "../.antlr/TspListener.js",
        {
            dest: "../src/TspListener.generated.ts",
            replace: [
                [/exports.TspListener = TspListener;/g, "export { TspListener };"],
            ],
        },
    ],
    [
        "../.antlr/TspVisitor.js",
        {
            dest: "../src/TspVisitor.generated.ts",
            replace: [[/exports.TspVisitor = TspVisitor;/g, "export { TspVisitor };"]],
        },
    ],
]).forEach((obj, src) => {
    name = path.basename(process.argv[1], ".js")
    fullsrc = path.resolve(src)

    if (fs.existsSync(src)) {
        console.log(`${name}: ${fullsrc}`)
        try {
            fs.readFile(src, "utf8", function(e, content) {
                if (e) {
                    console.error(e)
                    return
                }

                if (!obj.replace) {
                    obj.replace = []
                }

                let modifiedContent = content
                obj.replace.forEach((replaceArgs) => {
                    modifiedContent = modifiedContent.replace(...replaceArgs)
                })

                fs.writeFile(obj.dest, modifiedContent, "utf8", function(e) {
                    if (e) {
                        console.log(e)
                    }
                })
            })
        } catch (e) {
            console.error(e)
        }
    } else {
        console.log(`${name}: skipping ${fullsrc}`)
    }
})
