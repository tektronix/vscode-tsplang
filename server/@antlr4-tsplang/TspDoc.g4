/*
 *  Copyright Tektronix Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
grammar TspDoc;
import CommonLexerRules;

/* PARSER */

docstring
    : OPEN description param* returns_ errata* CLOSE;

content
    : ~( TAG_START | CLOSE )*?;

description
    : DESCRIPTION? content;

param
    : PARAM typeDeclaration nameDeclaration content;

typeDeclaration
    : '{' (list | union) '}';

list
    : '{' typeList '}';

union
    : '(' typeList ')';

typeList
    : type ((',' | ';') type)* (',' | ';')?;

type
    : NIL
    | BOOLEAN
    | NUMBER
    | STRING
    | FUNCTION
    | USERDATA
    | THREAD
    | TABLE
    | ENUM
    | ANY
    ;

// typeDeclaration

nameDeclaration
    : NAME
    | '[' NAME '=' value ']'
    ;

// param

returns_
    : RETURNS typeDeclaration content;

errata
    : SEE content;

value
    : NIL
    | 'true' | 'false'
    | number
    | string
    | NAME
    ;

number
    : INT | HEX | FLOAT;

string
    : NORMALSTRING | CHARSTRING;

/* LEXER */

OPEN
    : '--[[';

/* Tags */

TAG_START
    : '@';

DESCRIPTION
    : TAG_START 'description';

PARAM
    : TAG_START 'param';

RETURNS
    : TAG_START 'returns';

SEE
    : TAG_START 'see';

TSPLINK
    : TAG_START 'tsplink';

/* Lua Types */

// Included in CommonLexerRules.
// NIL
//     : 'nil';

BOOLEAN
    : Nilable 'boolean';

NUMBER
    : Nilable 'number';

STRING
    : Nilable 'string';

FUNCTION
    : Nilable 'function';

USERDATA
    : Nilable 'userdata';

THREAD
    : Nilable 'thread';

TABLE
    : Nilable 'table';

/* Custom Types */

ENUM
    : Nilable NAME ('.' NAME)*;

ANY
    : '*';

/* End */

CLOSE
    : ']]';

/* Fragments */

fragment
Nilable
    : '?'?;








/* vvvv === DELETE EVERYTHING UNDER THIS === vvvv */
NIL
    : 'nil';

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

HORIZONTAL_WS
    : [ \t\u000C]+ -> channel(HIDDEN)
    ;

VERTICAL_WS
    : ('\r\n'|'\r'|'\n') -> channel(HIDDEN)
    ;
