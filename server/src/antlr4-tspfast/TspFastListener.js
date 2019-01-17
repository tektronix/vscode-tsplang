// Generated from C:\Source\vscode-tsplang\server\grammar\TspFast.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by TspFastParser.
function TspFastListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

TspFastListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
TspFastListener.prototype.constructor = TspFastListener;

// Enter a parse tree produced by TspFastParser#chunk.
TspFastListener.prototype.enterChunk = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#chunk.
TspFastListener.prototype.exitChunk = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#statement.
TspFastListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#statement.
TspFastListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#value.
TspFastListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#value.
TspFastListener.prototype.exitValue = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#expression.
TspFastListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#expression.
TspFastListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#prefix.
TspFastListener.prototype.enterPrefix = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#prefix.
TspFastListener.prototype.exitPrefix = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#suffix.
TspFastListener.prototype.enterSuffix = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#suffix.
TspFastListener.prototype.exitSuffix = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#index.
TspFastListener.prototype.enterIndex = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#index.
TspFastListener.prototype.exitIndex = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#variable.
TspFastListener.prototype.enterVariable = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#variable.
TspFastListener.prototype.exitVariable = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#functionCall.
TspFastListener.prototype.enterFunctionCall = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#functionCall.
TspFastListener.prototype.exitFunctionCall = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#args.
TspFastListener.prototype.enterArgs = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#args.
TspFastListener.prototype.exitArgs = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#tableConstructor.
TspFastListener.prototype.enterTableConstructor = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#tableConstructor.
TspFastListener.prototype.exitTableConstructor = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#fieldList.
TspFastListener.prototype.enterFieldList = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#fieldList.
TspFastListener.prototype.exitFieldList = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#field.
TspFastListener.prototype.enterField = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#field.
TspFastListener.prototype.exitField = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorOr.
TspFastListener.prototype.enterOperatorOr = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorOr.
TspFastListener.prototype.exitOperatorOr = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorAnd.
TspFastListener.prototype.enterOperatorAnd = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorAnd.
TspFastListener.prototype.exitOperatorAnd = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorComparison.
TspFastListener.prototype.enterOperatorComparison = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorComparison.
TspFastListener.prototype.exitOperatorComparison = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorStrcat.
TspFastListener.prototype.enterOperatorStrcat = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorStrcat.
TspFastListener.prototype.exitOperatorStrcat = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorAddSub.
TspFastListener.prototype.enterOperatorAddSub = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorAddSub.
TspFastListener.prototype.exitOperatorAddSub = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorMulDiv.
TspFastListener.prototype.enterOperatorMulDiv = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorMulDiv.
TspFastListener.prototype.exitOperatorMulDiv = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorBitwiseAnd.
TspFastListener.prototype.enterOperatorBitwiseAnd = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorBitwiseAnd.
TspFastListener.prototype.exitOperatorBitwiseAnd = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorBitwiseOr.
TspFastListener.prototype.enterOperatorBitwiseOr = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorBitwiseOr.
TspFastListener.prototype.exitOperatorBitwiseOr = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorBitwiseXor.
TspFastListener.prototype.enterOperatorBitwiseXor = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorBitwiseXor.
TspFastListener.prototype.exitOperatorBitwiseXor = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorBitwiseShift.
TspFastListener.prototype.enterOperatorBitwiseShift = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorBitwiseShift.
TspFastListener.prototype.exitOperatorBitwiseShift = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorUnary.
TspFastListener.prototype.enterOperatorUnary = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorUnary.
TspFastListener.prototype.exitOperatorUnary = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#operatorPower.
TspFastListener.prototype.enterOperatorPower = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#operatorPower.
TspFastListener.prototype.exitOperatorPower = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#number.
TspFastListener.prototype.enterNumber = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#number.
TspFastListener.prototype.exitNumber = function(ctx) {
};


// Enter a parse tree produced by TspFastParser#string.
TspFastListener.prototype.enterString = function(ctx) {
};

// Exit a parse tree produced by TspFastParser#string.
TspFastListener.prototype.exitString = function(ctx) {
};



exports.TspFastListener = TspFastListener;