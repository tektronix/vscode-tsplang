// Generated from C:\Source\vscode-tsplang\server\antlr4-tsplang\scripts\..\Tsp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by TspParser.
function TspListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

TspListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
TspListener.prototype.constructor = TspListener;

// Enter a parse tree produced by TspParser#chunk.
TspListener.prototype.enterChunk = function(ctx) {
};

// Exit a parse tree produced by TspParser#chunk.
TspListener.prototype.exitChunk = function(ctx) {
};


// Enter a parse tree produced by TspParser#statement.
TspListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by TspParser#statement.
TspListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by TspParser#assignment.
TspListener.prototype.enterAssignment = function(ctx) {
};

// Exit a parse tree produced by TspParser#assignment.
TspListener.prototype.exitAssignment = function(ctx) {
};


// Enter a parse tree produced by TspParser#value.
TspListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by TspParser#value.
TspListener.prototype.exitValue = function(ctx) {
};


// Enter a parse tree produced by TspParser#expression.
TspListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by TspParser#expression.
TspListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by TspParser#prefix.
TspListener.prototype.enterPrefix = function(ctx) {
};

// Exit a parse tree produced by TspParser#prefix.
TspListener.prototype.exitPrefix = function(ctx) {
};


// Enter a parse tree produced by TspParser#suffix.
TspListener.prototype.enterSuffix = function(ctx) {
};

// Exit a parse tree produced by TspParser#suffix.
TspListener.prototype.exitSuffix = function(ctx) {
};


// Enter a parse tree produced by TspParser#index.
TspListener.prototype.enterIndex = function(ctx) {
};

// Exit a parse tree produced by TspParser#index.
TspListener.prototype.exitIndex = function(ctx) {
};


// Enter a parse tree produced by TspParser#variable.
TspListener.prototype.enterVariable = function(ctx) {
};

// Exit a parse tree produced by TspParser#variable.
TspListener.prototype.exitVariable = function(ctx) {
};


// Enter a parse tree produced by TspParser#functionCall.
TspListener.prototype.enterFunctionCall = function(ctx) {
};

// Exit a parse tree produced by TspParser#functionCall.
TspListener.prototype.exitFunctionCall = function(ctx) {
};


// Enter a parse tree produced by TspParser#args.
TspListener.prototype.enterArgs = function(ctx) {
};

// Exit a parse tree produced by TspParser#args.
TspListener.prototype.exitArgs = function(ctx) {
};


// Enter a parse tree produced by TspParser#tableConstructor.
TspListener.prototype.enterTableConstructor = function(ctx) {
};

// Exit a parse tree produced by TspParser#tableConstructor.
TspListener.prototype.exitTableConstructor = function(ctx) {
};


// Enter a parse tree produced by TspParser#fieldList.
TspListener.prototype.enterFieldList = function(ctx) {
};

// Exit a parse tree produced by TspParser#fieldList.
TspListener.prototype.exitFieldList = function(ctx) {
};


// Enter a parse tree produced by TspParser#field.
TspListener.prototype.enterField = function(ctx) {
};

// Exit a parse tree produced by TspParser#field.
TspListener.prototype.exitField = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorOr.
TspListener.prototype.enterOperatorOr = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorOr.
TspListener.prototype.exitOperatorOr = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorAnd.
TspListener.prototype.enterOperatorAnd = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorAnd.
TspListener.prototype.exitOperatorAnd = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorComparison.
TspListener.prototype.enterOperatorComparison = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorComparison.
TspListener.prototype.exitOperatorComparison = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorBitwiseOr.
TspListener.prototype.enterOperatorBitwiseOr = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorBitwiseOr.
TspListener.prototype.exitOperatorBitwiseOr = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorBitwiseXor.
TspListener.prototype.enterOperatorBitwiseXor = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorBitwiseXor.
TspListener.prototype.exitOperatorBitwiseXor = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorBitwiseAnd.
TspListener.prototype.enterOperatorBitwiseAnd = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorBitwiseAnd.
TspListener.prototype.exitOperatorBitwiseAnd = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorBitwiseShift.
TspListener.prototype.enterOperatorBitwiseShift = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorBitwiseShift.
TspListener.prototype.exitOperatorBitwiseShift = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorStrcat.
TspListener.prototype.enterOperatorStrcat = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorStrcat.
TspListener.prototype.exitOperatorStrcat = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorAddSub.
TspListener.prototype.enterOperatorAddSub = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorAddSub.
TspListener.prototype.exitOperatorAddSub = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorMulDiv.
TspListener.prototype.enterOperatorMulDiv = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorMulDiv.
TspListener.prototype.exitOperatorMulDiv = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorPower.
TspListener.prototype.enterOperatorPower = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorPower.
TspListener.prototype.exitOperatorPower = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorUnary.
TspListener.prototype.enterOperatorUnary = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorUnary.
TspListener.prototype.exitOperatorUnary = function(ctx) {
};


// Enter a parse tree produced by TspParser#number.
TspListener.prototype.enterNumber = function(ctx) {
};

// Exit a parse tree produced by TspParser#number.
TspListener.prototype.exitNumber = function(ctx) {
};


// Enter a parse tree produced by TspParser#string.
TspListener.prototype.enterString = function(ctx) {
};

// Exit a parse tree produced by TspParser#string.
TspListener.prototype.exitString = function(ctx) {
};



export { TspListener };