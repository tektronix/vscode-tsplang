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
import CommonLexerRules;

@lexer::members {public tsp1 = true;}
@parser::members {public get tsp1(): boolean { return !!this.inputStream.tokenSource["tsp1"]; }
}

chunk
    : (statement ';'?)* EOF
    ;

statement
    : assignment
    | functionCall
    | 'do' (statement ';'?)* 'end'
    | 'while' expression 'do' (statement ';'?)* 'end'
    | 'repeat' (statement ';'?)* 'until' expression
    | 'if' expression 'then' (statement ';'?)* ('elseif' expression 'then' (statement ';'?)*)* ('else' (statement ';'?)*)? 'end'
    | 'return' (expression (',' expression)*)?
    | 'break'
    | 'for' NAME '=' expression ',' expression (',' expression)? 'do' (statement ';'?)* 'end'
    | 'for' NAME (',' NAME)* 'in' expression (',' expression)* 'do' (statement ';'?)* 'end'
    | 'function' NAME ('.' NAME)* (':' NAME)? '(' (NAME (',' NAME)* (',' VARARG)? | VARARG)? ')' (statement ';'?)* 'end'
    | LOCAL 'function' NAME '(' (NAME (',' NAME)* (',' VARARG)? | VARARG)? ')' (statement ';'?)* 'end'
    | LOCAL NAME (',' NAME)* ('=' expression (',' expression)*)?
    ;

assignment
    : variable (',' variable)* '=' expression (',' expression)*
    ;

value
    : NIL
    | BOOLEAN
    | number
    | string
    | variable
    | functionCall
    | tableConstructor
    | '(' expression ')'
    ;

expression
    : value
    | 'function' '(' (NAME (',' NAME)* (',' VARARG)? | VARARG)? ')' (statement ';'?)* 'end'
    | <assoc=right> value operatorPower expression
    | operatorUnary expression
    | value (operatorMulDiv
        | operatorBitwiseShift
        | operatorAddSub
        | operatorBitwiseAnd
        | operatorBitwiseOr
        | operatorBitwiseXor) expression
    | <assoc=right> value operatorStrcat expression
    | value (operatorComparison
        | operatorAnd
        | operatorOr) expression
    ;

prefix
    : '(' expression ')'
    | NAME
    ;

suffix
    : (':' NAME)? args
    | index
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
    : prefix suffix* (':' NAME)? args
    ;

args
    : '(' (expression (',' expression)*)? ')'
    | tableConstructor
    | string
    ;

tableConstructor
    : '{' fieldList? '}'
    ;

fieldList
    : field ((',' | ';') field)* (',' | ';')?
    ;

field
    : '[' expression ']' '=' expression
    | NAME '=' expression
    | expression
    ;

operatorOr
    : OR
    ;
operatorAnd
    : AND
    ;
operatorComparison
    : '<' | '>' | '<=' | '>=' | NE | '=='
    ;
operatorBitwiseOr
    : BIT_OR
    ;
operatorBitwiseXor
    : BIT_XOR
    ;
operatorBitwiseAnd
    : BIT_AND
    ;
operatorBitwiseShift
    : BIT_LS | BIT_RS
    ;
operatorStrcat
    : '..'
    ;
operatorAddSub
    : '+' | '-'
    ;
operatorMulDiv
    : '*' | '/'
    ;
operatorPower
    : '^'
    ;
operatorUnary
    : 'not' | '-' | LOGICAL_NOT
    ;

number
    : INT | HEX | FLOAT
    ;

string
    : NORMALSTRING | CHARSTRING | LONGSTRING
    ;

// LEXER

OR
    : 'or';
AND
    : 'and';

NE
    : '~='
    | {!this.tsp1}? '!='
    ;

BIT_OR
    : {!this.tsp1}? '|';
BIT_XOR
    : {!this.tsp1}? '^^';
BIT_AND
    : {!this.tsp1}? '&';
BIT_LS
    : {!this.tsp1}? '<<';
BIT_RS
    : {!this.tsp1}? '>>';

LOGICAL_NOT
    : {!this.tsp1}? '!';

BOOLEAN
    : 'true'
    | 'false'
    ;

LOCAL
    : 'local';

VARARG
    : '...';

LONGSTRING
    : '[' NestedString ']'
    ;

fragment
NestedString
    : '[' ( LONGSTRING | . )*? ']'
    ;

LONGCOMMENT
    : '--[' NestedString ']' -> channel(HIDDEN)
    ;

DOC_COMMENT
    : '--[[' NestedString ']' -> channel(HIDDEN)
    ;

LINE_COMMENT
    : '--' .*? (VERTICAL_WS|EOF) -> channel(HIDDEN)
    ;

SHEBANG
    : '#' '!' ~('\n'|'\r')* -> channel(HIDDEN)
    ;
