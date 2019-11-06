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
lexer grammar TspDocLexer;
import CommonLexerRules;

OPEN
    : '--[[';

/* Tags */

TAG_START
    : '@';

DEPRECATED
    : TAG_START 'deprecated';

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

LINK_TAG_START
    : '{' HORIZONTAL_WS? TAG_START 'link' -> pushMode(LINK_MODE)
    ;

/* Lua Type Strings */

// NIL is imported from CommonLexerRules.

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

/* Custom Type Strings */

ENUM
    : Nilable NAME ('.' NAME)*;

ANY
    : '*';

/* End */

CLOSE
    : ']]';

/*
 * House Keeping
 *
 * ONLY FOR USE IN THE PARSER
 */

CURLY_OPEN
    : '{';
CURLY_CLOSE
    : '}';
COMMA
    : ',';
EQUALS
    : '=';
FALSE
    : 'false';
PAREN_OPEN
    : '(';
PAREN_CLOSE
    : ')';
SEMICOLON
    : ';';
SQUARE_OPEN
    : '[';
SQUARE_CLOSE
    : ']';
TRUE
    : 'true';

/* Fragments */

fragment
Nilable
    : '?'?;

/* Inline Link Mode */
mode LINK_MODE;

LINK_TAG_END
    : '}' -> popMode
    ;

LINK_TAG_TARGET
    : NAME ('.' NAME)*
    /* Character group is inlined from CommonLexerRules::HORIZONTAL_WS */
    | ( EndEscape | ~([ \t\u000C]|'|'|'}') )+
    ;

LINK_TAG_DISPLAY
    : '|'? ( EndEscape | ~('}') )+;

fragment
EndEscape
    : '\\' '}';
