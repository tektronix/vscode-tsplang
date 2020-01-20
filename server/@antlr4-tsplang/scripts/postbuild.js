#!/usr/bin/env node
const fs = require("fs")
const path = require("path")
const process = require("process")

const scriptName = path.basename(process.argv[1], ".js")

/**
 * Contains special filename transformations.
 * @typedef BasenameTransform
 * @property {string} source The original filename.
 * @property {string} destination The name of the output file.
 */

/**
 * Contains the conditions and context for a `String.replace` call.
 * @typedef Edit
 * @property {() => boolean} [doEdit=]
 * An optional callback that determines whether to apply an edit.
 * The edit is always applied if left undefined.
 * @property {RegExp} regexp What should be edited.
 * @property {string} replacement A Regular Expression replacement string.
 */

/**
 * @typedef Recipe
 * @property {string} sourceDirectory Where to find the target files.
 * @property {string} sourceExtension The file extension of the source files.
 * @property {string} destinationDirectory Where to write the output files.
 * @property {Array<BasenameTransform>} basenameTransforms Files that do not
 *  follow the standard renaming convention.
 * @property {Array<Edit>} edits Changes to apply to a file before being
 *  output.
 */
const recipe = {
    sourceDirectory: "../.antlr/",
    sourceExtension: ".ts",
    destinationDirectory: "../src/",
    basenameTransforms: [
        {
            source: "TspDocParserListener",
            destination: "TspDocListener"
        },
        {
            source: "TspShebangParserListener",
            destination: "TspShebangListener"
        }
    ],
    edits: [
        {
            regexp: /from ["'](\.\/.*)["']/g,
            replacement: 'from "$1.generated"'
        },
        {
            doEdit: () => process.platform === "win32",
            regexp: /\r\n/g,
            replacement: "\n"
        },
        {
            regexp: /(export class .+?Context)/g,
            replacement: "/* istanbul ignore next */\n$1"
        }
    ]
}

// Get a list of absolute filepaths to TypeScript files.
const tsFiles = fs
    .readdirSync(path.resolve(recipe.sourceDirectory))
    .map(filename => path.resolve(recipe.sourceDirectory, filename))
    .filter(candidate => fs.statSync(candidate).isFile())
    .filter(candidate => path.extname(candidate) === recipe.sourceExtension)

let successful = true

tsFiles.forEach(source => {
    let content;

    const sourceBasename = path.basename(source, recipe.sourceExtension)
    // If this transform matches the source file's basename, then use the
    // transform's destination file basename.
    const destinationBasename = recipe.basenameTransforms.reduce(
        (resolvedBasename, transform) => {
            if (transform.source === sourceBasename) {
                return transform.destination
            } else {
                return resolvedBasename
            }
        },
        sourceBasename
    )

    // Read the contents of each TypeScript file found.
    try {
        content = fs.readFileSync(source, { encoding: "utf-8" })
        console.log(`${scriptName} <-- ${source}`)
    } catch (reason) {
        console.log(`${scriptName} x-- ${source}`)
        console.error(`${reason}\n`)
        successful = false
        return
    }

    // Change all instances of  source filename to the its associated
    // destination filename.
    recipe.basenameTransforms.forEach(transform => {
        content = content.replace(
            new RegExp(transform.source, "g"),
            transform.destination
        )
    })

    // Apply edits to the file content if the edit predicate either
    // does not exist or returns true.
    recipe.edits.forEach(edit => {
        if (edit.doEdit === undefined || edit.doEdit()) {
            content = content.replace(edit.regexp, edit.replacement)
        }
    })

    // Calculate the absolute path to the destination TypeScript file.
    const destination = path.resolve(
        path.dirname(source),
        recipe.destinationDirectory,
        `${destinationBasename}.generated${recipe.sourceExtension}`
    )

    // Write the modified file contents to the destination filepath.
    try {
        fs.writeFileSync(destination, content, { encoding: "utf-8" })
        console.log(`${scriptName} --> ${destination}\n`)
    } catch (reason) {
        console.log(`${scriptName} --x ${destination}`)
        console.error(`${reason}\n`)
        successful = false
        return
    }

    // Delete the source file.
    try {
        fs.unlinkSync(source)
    } catch (reason) {
        console.error(`${reason}\n`)
        successful = false
    }
})

if (!successful) {
    process.exit(1)
}
