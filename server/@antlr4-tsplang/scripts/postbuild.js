#!/usr/bin/env node
// const fsExistsSync = require("fs").existsSync
// const fsStatSync = require("fs").statSync
const fs = require("fs").promises
const path = require("path")
const process = require("process")

// new Map([
//     [
//         "../.antlr/TspLexer.ts",
//         {
//             destdir: "../src",
//             replace: [[, 'from "$1.generated"']],
//         },
//     ],
//     [
//         "../.antlr/TspParser.ts",
//         {
//             dest: "../src/TspParser.generated.ts",
//             replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
//         },
//     ],
//     [
//         "../.antlr/TspListener.ts",
//         {
//             dest: "../src/TspListener.generated.ts",
//             replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
//         },
//     ],
//     [
//         "../.antlr/TspVisitor.ts",
//         {
//             dest: "../src/TspVisitor.generated.ts",
//             replace: [[/from ["'](\.\/.*)["']/g, 'from "$1.generated"']],
//         },
//     ],
// ]).forEach((obj, src) => {
//     name = path.basename(process.argv[1], ".ts")
//     fullsrc = path.resolve(src)
//     fulldest = path.resolve(fullsrc, obj.dest)

//     if (fsExistsSync(fullsrc)) {
//         console.log(`${name}: ${fullsrc}`)
//         fs.readFile(fullsrc, {
//             encoding: "utf8"
//         }).then((content) => {
//             if (!obj.replace) {
//                 obj.replace = []
//             }

//             let modifiedContent = content
//             obj.replace.forEach((replaceArgs) => {
//                 modifiedContent = modifiedContent.replace(...replaceArgs)
//             })

//             return fs.writeFile(obj.path, modifiedContent)
//         }).then(() => {
//             return fs.unlink(src)
//         }).catch((reason) => {
//             console.error(reason)
//             process.exit(1)
//         })
//     } else {
//         console.log(`${name}: skipping ${fullsrc}`)
//     }
// })

const scriptName = path.basename(process.argv[1], ".ts")

const recipe = {
    sourceDirectory: "../.antlr/",
    sourceExtension: ".ts",
    destinationDirectory: "../src/",
    edits: [
        {
            regexp: /from ["'](\.\/.*)["']/g,
            replacement: 'from "$1.generated"'
        }
    ]
}

fs.readdir(path.resolve(recipe.sourceDirectory))
.then(value => {
    // Get an array of files that end with the desired extension.
    // return value
    //     .filter(async (candidate) => (await fs.stat(candidate)).isFile())
    //     .filter(candidate => path.extname(candidate) === recipe.sourceExtension)
    return [path.resolve("../asdf")]
})
.then(tsFiles => {
    // Read each source file and package the content with its file path.
    return tsFiles.map(source => {
        const content = fs.readFile(source, { encoding: "utf-8" })
            .then(value => {
                console.log(`${scriptName} <-- ${source}`)
                return value
            })
            .catch(reason => {
                console.log(`${scriptName} x-- ${source}`)
                console.error(reason)
            })

        return {
            content,
            source,
            destination: "",
        }
    })
})
.then(sourceContents => {
    // Edit the content of each object.
    return sourceContents.map(sourceObj => {
        return recipe.edits.reduce((editedValue, edit) => {
            const content = editedValue.content
                .then(resolvedContent => {
                    const result = resolvedContent || ""
                    return result.replace(edit.regexp, edit.replacement)
                })

            return {
                content,
                destination: "",
                source: editedValue.source,
            }
        }, sourceObj)
    })
})
.then(sourceContents => {
    // Calculate the absolute path to the destination file and
    // package the result with the source-content object.
    return sourceContents.map(sourceObj => {
        const basename = path.basename(sourceObj.source, ".ts")
        sourceObj.destination = path.resolve(
            path.dirname(sourceObj.source),
            recipe.destinationDirectory,
            `${basename}.generated.ts`
        )
        return sourceObj
    })
})
.then(sourceContents => {
    // Write the contents of the file to the destination.
    // Return an array of source files to delete.
    return sourceContents.map(async sourceObj => {
        const result = await sourceObj.content
        return fs.writeFile(sourceObj.destination, result, {
            encoding: "utf-8"
        })
        .then(() => {
            console.log(`${scriptName} --> ${sourceObj.destination}`)
            return sourceObj.source
        })
        .catch(reason => {
            console.log(`${scriptName} --x ${sourceObj.destination}`)
            console.error(reason)
        })
        .then(value => value || "")
    })
})
.then(tsFiles => {
    // Delete the files.
    tsFiles.forEach(async value => {
        const target = await value

        if (target === "") {
            return
        }

        fs.unlink(value).catch(reason => { console.error(reason) })
    })
})
.catch(reason => {
    console.error(reason)
    process.exit(1)
})
