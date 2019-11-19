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
    : '--[[[';

/* New Types */

FIRMWARE
    // Indentation is tabs to match generated code style.
    : {(
		// Previous character was ">".
		this._input.LA(-1) === 62

		// Previous 2 characters were "<=".
		|| ( this._input.LA(-2) === 60 && this._input.LA(-1) === 61 )

		// Previous 2 characters were "==".
		|| ( this._input.LA(-2) === 61 && this._input.LA(-1) === 61 )
	)}? Digit+ '.' Digit+ '.' Digit+;

/* Tags */

TAG_START
    : '@';

DEPRECATED_TAG
    : TAG_START 'deprecated';

DESCRIPTION_TAG
    : TAG_START ('desc'|'description');

PARAM_TAG
    : TAG_START ('param'|'parameter');

RETURNS_TAG
    : TAG_START 'return' 's'?;

SEE_TAG
    : TAG_START 'see';

TSPLINK_TAG
    : TAG_START 'tsplink';

TYPEDEF_TAG
    : TAG_START 'typedef';

FIELD_TAG
    : TAG_START 'field';

READONLY_TAG
    : TAG_START ('const'|'constant'|'read'[oO]'nly');

WRITEONLY_TAG
    : TAG_START 'write'[oO]'nly';

TYPE_TAG
    : TAG_START 'type';

FIRMWARE_TAG
    : TAG_START ('fw'|'firmware');

TSPV1_TAG
    : TAG_START 'tsp-v1';

TSPV2_TAG
    : TAG_START 'tsp-v2';

V1_TAG
    : TAG_START 'v1';

V2_TAG
    : TAG_START 'v2';

/* Inline Tags */

LINK_TAG_START
    : '{' HORIZONTAL_WS? TAG_START 'link' -> pushMode(LINK_MODE)
    ;

/* Lua Type Strings */

// NIL is imported from CommonLexerRules.

BOOLEAN
    : 'boolean' Nilable;

NUMBER
    : 'number' Nilable;

STRING
    : 'string' Nilable;

FUNCTION
    : 'function' Nilable;

USERDATA
    : 'userdata' Nilable;

THREAD
    : 'thread' Nilable;

TABLE
    : 'table' Nilable;

/* Custom Type Strings */

ENUM
    : NAME '.' NAME ('.' NAME)* Nilable;

ANY
    : 'any';

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
DOT
    : '.';
EQUALS
    : '=';
FALSE
    : 'false';
PAREN_OPEN
    : '(';
PAREN_CLOSE
    : ')';
SQUARE_OPEN
    : '[';
SQUARE_CLOSE
    : ']';
TRUE
    : 'true';
GT
    : '>';
LTE
    : '<=';
RETURN_ARROW
    : '=>';
PIPE
    : '|';

/* Fragments */

fragment
Nilable
    : '?'?;

/* Everything Else */

OTHER
    /* Part of the character group is inlined from CommonLexerRules::HORIZONTAL_WS */
    : ~[a-zA-Z0-9_{}[\],.=<>|@ \t\u000C\r\n];

/* Inline Link Mode */
mode LINK_MODE;

LINK_TAG_END
    : '}' -> popMode
    ;

LINK_TAG_TARGET
    : NAME ('.' NAME)*
    /* Part of the character group is inlined from CommonLexerRules::HORIZONTAL_WS */
    | ~[}| \t\u000C]+
    ;

LINK_TAG_DISPLAY
    : '|' ( EndEscape | ~('}') )+;

LINK_TAG_WHITESPACE
    : ( HORIZONTAL_WS | VERTICAL_WS ) -> channel(HIDDEN)
    ;

fragment
EndEscape
    : '\\' '}';
