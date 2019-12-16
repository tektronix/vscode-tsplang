#!/usr/bin/env node
const child_process = require("child_process")
const fs = require("fs")
const yaml = require("js-yaml")

child_process.exec("npm run precompile", { cwd: "../server/@tsplang-plugins" }, (error, stdout, stderr) => {
    if (error) {
        throw error
    }

    if (stdout !== "") {
        console.log(stdout)
    }

    if (stderr !== "") {
        console.error(stderr)
    }
})

try {
    fs.writeFileSync(
        "../syntaxes/tsp.tmLanguage.json",
        (function() {
            const tmLanguageContent = JSON.stringify(
                yaml.safeLoad(
                    fs.readFileSync("../syntaxes/tsp.tmLanguage.yaml", "utf-8")
                ),
                undefined,
                4
            )
            if (process.platform === "win32") {
                return tmLanguageContent.replace(/\r\n/g, "\n")
            }
            return tmLanguageContent
        })()
    )
    console.log("syntaxes/tsp.tmLanguage.yaml --> syntaxes/tsp.tmLanguages.json\n")
} catch (reason) {
    console.log("syntaxes/tsp.tmLanguage.yaml --x syntaxes/tsp.tmLanguages.json\n")
    console.error(reason)
    process.exit(1)
}
