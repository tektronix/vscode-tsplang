const antlr4 = require('antlr4');
const TspLexer = require('./src/tsp/TspLexer').TspLexer;
const TspParser = require('./src/tsp/TspParser').TspParser;
const TspListener = require('./src/tsp/TspListener').TspListener;


// <NAME: str, CompletionItem>
const globalVariables = new Map();


class StatementPrinter {
    constructor() {
        // inherit default listener
        TspListener.call(this);
        return this;
    }
    // override default listener behavior
    exitVariable(ctx) {
        // reserve the variable
        var key = ctx.getText();
        globalVariables.set(key, { label: key });
    }
}
// inherit more of the default listener
StatementPrinter.prototype = Object.create(TspListener.prototype);
StatementPrinter.prototype.constructor = StatementPrinter;


var input = require('fs').readFileSync(`${__dirname}/../test/grammars/assignments.lua`, 'utf8');
console.log('file:\n' + input);

if (input !== undefined) {
    var chars = new antlr4.InputStream(input);
    var lexer = new TspLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new TspParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.chunk();

    var statPrinter = new StatementPrinter();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(statPrinter, tree);
}
