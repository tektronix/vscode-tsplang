#!/usr/bin/env node
const fs = require("fs")
const compileFromFile = require("json-schema-to-typescript").compileFromFile

const style = JSON.parse(fs.readFileSync("../../../.prettierrc.json", "utf-8"))

console.log("server/@tsplang-plugins/")
try {
    compileFromFile("../tsplang.plugin.schema.json", { style })
        .then(content => {
            content = content
                .replace(/\/\* tslint:disable \*\/\n/, "")
                .replace(/\s*\[k: string]: any/g, "")

            fs.writeFileSync("../src/tsplang.plugin.generated.ts", content)
        })
    console.log("    tsplang.plugin.schema.json --> src/tsplang.plugin.generated.ts\n")
} catch (reason) {
    console.log("    tsplang.plugin.schema.json --x src/tsplang.plugin.generated.ts\n")
    console.error(reason)
    process.exit(1)
}
