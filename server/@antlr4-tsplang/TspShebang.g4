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
grammar TspShebang;

// Parser

shebang
    : OPEN PLUGIN (SEMICOLON node)*?
    ;

node
    : NODE BRACKET_OPEN nodeNumber BRACKET_CLOSE EQUALS nodePlugin
    ;

// These simple node sub-rules exist only for convenience.

nodeNumber
    : NODE_NUMBER {
// Node number must be in the interval [1, 64].
const num = Number(this.currentToken.text);
if (num < 1) this.notifyErrorListeners("Node number must be greater than 0");
if (num > 64) this.notifyErrorListeners("Node number must be less than 65");}
    ;

nodePlugin
    : PLUGIN
    ;

// Lexer

OPEN: '#!';

CLOSE: ('\r\n'|'\r'|'\n');

SEMICOLON: ';';

PLUGIN
    // Indentation is tabs to match generated code style.
    : {(
		// Previous two characters were "#!"...
		(this._input.LA(-2) === 35 && this._input.LA(-1) === 33)
		// ...OR previous character was "=".
		|| this._input.LA(-1) === 61
	)}? ~('['|']'|';')+;

NODE: 'node';
BRACKET_OPEN: '[';
BRACKET_CLOSE: ']';
NODE_NUMBER
    // Indentation is tabs to match generated code style.
    : {(
		// Previous character was "[".
		this._input.LA(-1) === 91
	)}? '+-'? [0-9]+;
EQUALS: '=';

/* Copied from CommonLexerRules::HORIZONTAL_WS */
HORIZONTAL_WS: [ \t\u000C]+ -> channel(HIDDEN);
