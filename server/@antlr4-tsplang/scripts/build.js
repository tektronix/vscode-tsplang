#!/usr/bin/env node
const child_process = require("child_process")
const path = require("path")
const process = require("process")

class SynchronousTaskRunner {
    constructor() {
        this.child = undefined
        this.taskIndex = 0
        this.tasks = [
            "antlr4ts -o ./.antlr -message-format gnu -listener ./Tsp.g4",
            "antlr4ts -o ./.antlr -message-format gnu -listener ./TspDocLexer.g4",
            "antlr4ts -o ./.antlr -message-format gnu -listener ./TspDoc.g4",
        ]
    }

    _done(error, stdout, stderr) {
        if (typeof stdout === "string" && stdout.length > 0) {
            console.log(stdout)
        }

        if (typeof stderr === "string" && stderr.length > 0) {
            console.error(stderr)
        }

        if (error) {
            throw error
        }

        this.taskIndex += 1
        if (this.taskIndex < this.tasks.length) {
            this.run()
        }
    }

    run() {
        this.child = child_process.exec(
            this.tasks[this.taskIndex],
            {
                cwd: path.resolve(process.cwd(), ".."),
            },
            this._done.bind(this)
        )
    }
}

new SynchronousTaskRunner().run()
