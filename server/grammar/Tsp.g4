/*
 * This grammar file is adapted by Tektronix from Lua.g4 at commit
 *      dbe02c840ffd07197e62e51926f49cb130819179
 * available at https://github.com/antlr/grammars-v4/tree/dbe02c840ffd07197e62e51926f49cb130819179/lua.
 *
 * Except as otherwise noted, the content of this file is licensed under the
 * BSD-3-Clause license. The text of the BSD-3-Clause license is reproduced
 * below.
 *
 * ----------------------------------------------------------------------------
 *
 * Copyright (c) 2013, Kazunori Sakamoto
 * Copyright (c) 2016, Alexander Alexeev
 * Copyright (c) 2018, Tektronix Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the NAME of Rainer Schuster nor the NAMEs of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/*
 * The left-recursion of prefixexp in the Lua 5.0 grammar was removed thanks
 * to the following post:
 *      http://lua-users.org/lists/lua-l/2010-12/msg00699.html
 */
grammar Tsp;

chunk
    : block EOF
    ;

block
    : (statement ';'?)*
    ;

statement
    : variableList '=' expressionList
    | functionCall
    | 'do' block 'end'
    | 'while' expression 'do' block 'end'
    | 'repeat' block 'until' expression
    | 'if' expression 'then' block ('elseif' expression 'then' block)* ('else' block)? 'end'
    | returnStatement
    | 'break'
    | 'for' NAME '=' expression ',' expression (',' expression)? 'do' block 'end'
    | 'for' nameList 'in' expressionList 'do' block 'end'
    | 'function' functionName functionBody
    | LOCAL 'function' NAME functionBody
    | LOCAL nameList ('=' expressionList)?
    ;

returnStatement
    : 'return' expressionList?
    ;

functionName
    : NAME ('.' NAME)* (':' NAME)?
    ;

variableList
    : variable (',' variable)*
    ;

nameList
    : NAME (',' NAME)*
    ;

expressionList
    : expression (',' expression)*
    ;

value
    : NIL
    | BOOLEAN
    | number
    | string
    | functionDefinition
    | variable
    | functionCall
    | tableConstructor
    | '(' expression ')'
    ;

expression
    : value
    | value operatorOr expression
    | value operatorAnd expression
    | value operatorComparison expression
    | value operatorBitwiseOr expression
    | value operatorBitwiseXor expression
    | value operatorBitwiseAnd expression
    | value operatorBitwiseShift expression
    | <assoc=right> value operatorStrcat expression
    | value operatorAddSub expression
    | value operatorMulDiv expression
    | operatorUnary expression
    | <assoc=right> value operatorPower expression
    ;

prefix
    : '(' expression ')'
    | NAME
    ;

suffix
    : objectCall
    | index
    ;

objectCall
    : (':' NAME)? args
    ;

index
    : '[' expression ']'
    | '.' NAME
    ;

variable
    : prefix suffix* index
    | NAME
    ;

functionCall
    : prefix suffix* objectCall
    ;

args
    : '(' expressionList? ')'
    | tableConstructor
    | string
    ;

functionDefinition
    : 'function' functionBody
    ;

functionBody
    : '(' parameterList? ')' block 'end'
    ;

parameterList
    : nameList (',' VARARG)?
    | VARARG
    ;

tableConstructor
    : '{' fieldList? '}'
    ;

fieldList
    : field (fieldSeparator field)* fieldSeparator?
    ;

field
    : '[' expression ']' '=' expression
    | NAME '=' expression| expression
    ;

fieldSeparator
    : ',' | ';'
    ;

operatorOr
    : 'or';

operatorAnd
    : 'and';

operatorComparison
    : '<' | '>' | '<=' | '>=' | '~=' | '!=' | '==';

operatorStrcat
    : '..';

operatorAddSub
    : '+' | '-';

operatorMulDiv
    : '*' | '/';

operatorBitwiseAnd
    : '&';

operatorBitwiseOr
    : '|';

operatorBitwiseXor
    : '^^';

operatorBitwiseShift
    : '<<' | '>>';

operatorUnary
    : 'not' | '-' | '!';

operatorPower
    : '^';

number
    : INT | HEX | FLOAT
    ;

string
    : NORMALSTRING | CHARSTRING | LONGSTRING
    ;

// LEXER

NIL
    : 'nil'
    ;

BOOLEAN
    : 'true'
    | 'false'
    ;

LOCAL
    : 'local'
    ;

VARARG
    : '...'
    ;

NAME
    : [a-zA-Z_][a-zA-Z_0-9]*
    ;

NORMALSTRING
    : '"' ( EscapeSequence | ~('\\'|'"') )* '"'
    ;

CHARSTRING
    : '\'' ( EscapeSequence | ~('\''|'\\') )* '\''
    ;

LONGSTRING
    : '[' NestedString ']'
    ;

fragment
NestedString
    : '[' ( LONGSTRING | . )*? ']'
    ;

INT
    : Digit+
    ;

HEX
    : '0' [xX] HexDigit+
    ;

FLOAT
    : Digit+ '.' Digit* ExponentPart?
    | '.' Digit+ ExponentPart?
    | Digit+ ExponentPart
    ;

fragment
ExponentPart
    : [eE] [+-]? Digit+
    ;

fragment
EscapeSequence
    : '\\' [abfnrtv"'\\]
    | '\\' '['
    | '\\' ']'
    | '\\' '\r'? '\n'
    | DecimalEscape
    | HexEscape
    ;

fragment
DecimalEscape
    : '\\' Digit
    | '\\' Digit Digit
    | '\\' [0-2] Digit Digit
    ;

fragment
HexEscape
    : '\\' 'x' HexDigit HexDigit
    ;

fragment
Digit
    : [0-9]
    ;

fragment
HexDigit
    : [0-9a-fA-F]
    ;

LONGCOMMENT
    : '--[' NestedString ']'
    -> channel(HIDDEN)
    ;

LINE_COMMENT
    : '--' .*? ('\r\n'|'\r'|'\n'|EOF)
    -> channel(HIDDEN)
    ;

WS
    : [ \t\u000C\r\n]+ -> skip
    ;

SHEBANG
    : '#' '!' ~('\n'|'\r')* -> channel(HIDDEN)
    ;
