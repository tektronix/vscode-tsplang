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
lexer grammar CommonLexerRules;

NIL
    : 'nil';

NAME
    : [a-zA-Z_][a-zA-Z_0-9]*
    ;

NORMALSTRING
    : '"' ( EscapeSequence | ~('\\'|'"'|'\r'|'\n') )* '"'
    ;

CHARSTRING
    : '\'' ( EscapeSequence | ~('\\'|'\''|'\r'|'\n') )* '\''
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
    | '\\' '\r'? '\n'       // String continuation character.
    | '\\' Digit+           // Valid decimal escape values are 0-255, inclusive.
    | '\\' 'x' HexDigit+    // Valid hex escape values are 0-FF, inclusive.
    ;

fragment
Digit
    : [0-9]
    ;

fragment
HexDigit
    : [a-fA-F0-9]
    ;

/* NOTICE! any updates to this rule should also be made to the following:
 *      TspDocLexer::LINK_TAG_TARGET
 *      TspDocLexer::OTHER
 *      TspShebang::HorizontalWhitespace
 *      TspShebang::PLUGIN
 */
HORIZONTAL_WS
    : [ \t\u000C]+ -> channel(HIDDEN)
    ;

VERTICAL_WS
    : ('\r\n'|'\r'|'\n') -> channel(HIDDEN)
    ;
