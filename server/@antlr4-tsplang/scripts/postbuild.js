#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const process = require("process")

new Map([
    [
        "../.antlr/TspLexer.ts",
        {
            dest: "../src/TspLexer.generated.ts",
            replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
        },
    ],
    [
        "../.antlr/TspParser.ts",
        {
            dest: "../src/TspParser.generated.ts",
            replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
        },
    ],
    [
        "../.antlr/TspListener.ts",
        {
            dest: "../src/TspListener.generated.ts",
            replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
        },
    ],
    [
        "../.antlr/TspVisitor.ts",
        {
            dest: "../src/TspVisitor.generated.ts",
            replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
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
