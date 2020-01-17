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
lexer grammar TspShebangLexer;

/* Copied from CommonLexerRules::HORIZONTAL_WS */
fragment HorizontalWhitespace: [ \t\u000C];

OPEN: '#!' -> pushMode(PLUGIN_MODE);

CLOSE: ('\r\n'|'\r'|'\n');

SEMICOLON: ';';

HORIZONTAL_WS: HorizontalWhitespace+ -> channel(HIDDEN);

/* Plugin Mode */
mode PLUGIN_MODE;

PLUGIN_SEMICOLON: SEMICOLON -> type(SEMICOLON), pushMode(NODE_MODE);
PLUGIN_CLOSE: CLOSE -> type(CLOSE), popMode;

PLUGIN_FIRMWARE_START: '@' -> pushMode(FIRMWARE_MODE);

/* Part of the character group is inlined from CommonLexerRules::HORIZONTAL_WS */
PLUGIN: ~[@[\];\r\n \t\u000C]+;

PLUGIN_HORIZONTAL_WS: HorizontalWhitespace+ -> type(HORIZONTAL_WS), channel(HIDDEN);

/* Firmware Mode */
mode FIRMWARE_MODE;

FIRMWARE: [0-9]+ '.' [0-9]+ '.' [0-9]+ -> popMode;

// Only captures whitespace that occurs immediately after the "@".
FIRMWARE_HORIZONTAL_WS: HorizontalWhitespace+ -> type(HORIZONTAL_WS), channel(HIDDEN);

/* Node Mode */
mode NODE_MODE;

NODE_CLOSE: CLOSE -> type(CLOSE), popMode;

NODE_EQUALS: '=' -> popMode;

NODE: [nN][oO][dD][eE];

NODE_INDEX_OPEN: '[';

NODE_INDEX_CLOSE: ']';

NODE_NUMBER: [+\-]? [0-9]+;

NODE_HORIZONTAL_WS: HorizontalWhitespace+ -> type(HORIZONTAL_WS), channel(HIDDEN);
