// Generated from C:\Source\vscode-tsplang\server\grammar\Tsp.g4 by ANTLR 4.7.1
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


// Enter a parse tree produced by TspParser#block.
TspListener.prototype.enterBlock = function(ctx) {
};

// Exit a parse tree produced by TspParser#block.
TspListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by TspParser#stat.
TspListener.prototype.enterStat = function(ctx) {
};

// Exit a parse tree produced by TspParser#stat.
TspListener.prototype.exitStat = function(ctx) {
};


// Enter a parse tree produced by TspParser#assignment.
TspListener.prototype.enterAssignment = function(ctx) {
};

// Exit a parse tree produced by TspParser#assignment.
TspListener.prototype.exitAssignment = function(ctx) {
};


// Enter a parse tree produced by TspParser#retstat.
TspListener.prototype.enterRetstat = function(ctx) {
};

// Exit a parse tree produced by TspParser#retstat.
TspListener.prototype.exitRetstat = function(ctx) {
};


// Enter a parse tree produced by TspParser#funcname.
TspListener.prototype.enterFuncname = function(ctx) {
};

// Exit a parse tree produced by TspParser#funcname.
TspListener.prototype.exitFuncname = function(ctx) {
};


// Enter a parse tree produced by TspParser#varlist.
TspListener.prototype.enterVarlist = function(ctx) {
};

// Exit a parse tree produced by TspParser#varlist.
TspListener.prototype.exitVarlist = function(ctx) {
};


// Enter a parse tree produced by TspParser#namelist.
TspListener.prototype.enterNamelist = function(ctx) {
};

// Exit a parse tree produced by TspParser#namelist.
TspListener.prototype.exitNamelist = function(ctx) {
};


// Enter a parse tree produced by TspParser#explist.
TspListener.prototype.enterExplist = function(ctx) {
};

// Exit a parse tree produced by TspParser#explist.
TspListener.prototype.exitExplist = function(ctx) {
};


// Enter a parse tree produced by TspParser#exp.
TspListener.prototype.enterExp = function(ctx) {
};

// Exit a parse tree produced by TspParser#exp.
TspListener.prototype.exitExp = function(ctx) {
};


// Enter a parse tree produced by TspParser#prefixexp.
TspListener.prototype.enterPrefixexp = function(ctx) {
};

// Exit a parse tree produced by TspParser#prefixexp.
TspListener.prototype.exitPrefixexp = function(ctx) {
};


// Enter a parse tree produced by TspParser#functioncall.
TspListener.prototype.enterFunctioncall = function(ctx) {
};

// Exit a parse tree produced by TspParser#functioncall.
TspListener.prototype.exitFunctioncall = function(ctx) {
};


// Enter a parse tree produced by TspParser#varOrExp.
TspListener.prototype.enterVarOrExp = function(ctx) {
};

// Exit a parse tree produced by TspParser#varOrExp.
TspListener.prototype.exitVarOrExp = function(ctx) {
};


// Enter a parse tree produced by TspParser#variable.
TspListener.prototype.enterVariable = function(ctx) {
};

// Exit a parse tree produced by TspParser#variable.
TspListener.prototype.exitVariable = function(ctx) {
};


// Enter a parse tree produced by TspParser#varSuffix.
TspListener.prototype.enterVarSuffix = function(ctx) {
};

// Exit a parse tree produced by TspParser#varSuffix.
TspListener.prototype.exitVarSuffix = function(ctx) {
};


// Enter a parse tree produced by TspParser#nameAndArgs.
TspListener.prototype.enterNameAndArgs = function(ctx) {
};

// Exit a parse tree produced by TspParser#nameAndArgs.
TspListener.prototype.exitNameAndArgs = function(ctx) {
};


// Enter a parse tree produced by TspParser#args.
TspListener.prototype.enterArgs = function(ctx) {
};

// Exit a parse tree produced by TspParser#args.
TspListener.prototype.exitArgs = function(ctx) {
};


// Enter a parse tree produced by TspParser#functiondef.
TspListener.prototype.enterFunctiondef = function(ctx) {
};

// Exit a parse tree produced by TspParser#functiondef.
TspListener.prototype.exitFunctiondef = function(ctx) {
};


// Enter a parse tree produced by TspParser#funcbody.
TspListener.prototype.enterFuncbody = function(ctx) {
};

// Exit a parse tree produced by TspParser#funcbody.
TspListener.prototype.exitFuncbody = function(ctx) {
};


// Enter a parse tree produced by TspParser#parlist.
TspListener.prototype.enterParlist = function(ctx) {
};

// Exit a parse tree produced by TspParser#parlist.
TspListener.prototype.exitParlist = function(ctx) {
};


// Enter a parse tree produced by TspParser#tableconstructor.
TspListener.prototype.enterTableconstructor = function(ctx) {
};

// Exit a parse tree produced by TspParser#tableconstructor.
TspListener.prototype.exitTableconstructor = function(ctx) {
};


// Enter a parse tree produced by TspParser#fieldlist.
TspListener.prototype.enterFieldlist = function(ctx) {
};

// Exit a parse tree produced by TspParser#fieldlist.
TspListener.prototype.exitFieldlist = function(ctx) {
};


// Enter a parse tree produced by TspParser#field.
TspListener.prototype.enterField = function(ctx) {
};

// Exit a parse tree produced by TspParser#field.
TspListener.prototype.exitField = function(ctx) {
};


// Enter a parse tree produced by TspParser#fieldsep.
TspListener.prototype.enterFieldsep = function(ctx) {
};

// Exit a parse tree produced by TspParser#fieldsep.
TspListener.prototype.exitFieldsep = function(ctx) {
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


// Enter a parse tree produced by TspParser#operatorBitwise.
TspListener.prototype.enterOperatorBitwise = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorBitwise.
TspListener.prototype.exitOperatorBitwise = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorUnary.
TspListener.prototype.enterOperatorUnary = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorUnary.
TspListener.prototype.exitOperatorUnary = function(ctx) {
};


// Enter a parse tree produced by TspParser#operatorPower.
TspListener.prototype.enterOperatorPower = function(ctx) {
};

// Exit a parse tree produced by TspParser#operatorPower.
TspListener.prototype.exitOperatorPower = function(ctx) {
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



exports.TspListener = TspListener;