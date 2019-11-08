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
parser grammar TspDoc;

options { tokenVocab=TspDocLexer; }

docstring
    : OPEN DEPRECATED? description param* returns_? errata* CLOSE   # External
    | OPEN DEPRECATED? description typedef field CLOSE              # Internal
    ;

content
    : ( link content | ~( TAG_START | CLOSE ))*?;

link
    : LINK_TAG_START LINK_TAG_TARGET LINK_TAG_DISPLAY? LINK_TAG_END;

description
    : DESCRIPTION? content;

param
    : PARAM typeNameContent;

typeNameContent
    : typeDeclaration nameDeclaration content;

typeDeclaration
    : CURLY_OPEN (list | union) CURLY_CLOSE;

list
    : CURLY_OPEN typeList CURLY_CLOSE;

union
    : PAREN_OPEN typeList PAREN_CLOSE;

typeList
    : type ((COMMA | SEMICOLON) type)* (COMMA | SEMICOLON)?;

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

// end typeDeclaration

nameDeclaration
    : NAME                                          # NameRequired
    | SQUARE_OPEN NAME EQUALS value SQUARE_CLOSE    # NameOptional
    ;

// end param

returns_
    : RETURNS typeDeclaration content;

errata
    : SEE seeList   # See
    | TSPLINK       # Tsplink
    ;

seeList
    : seeItem (COMMA seeItem)* (COMMA)?;

seeItem
    : NAME (DOT NAME)*
    | link
    ;

// TODO
// constant
// type
// fw: ( LT | GTE )#.#.# COMMA? fw?
// version: (@tsp-v1 (@v2 NAME (DOT NAME)*)? | @tsp-v2 (@v1 NAME (DOT NAME)*)?)

// end errata

typedef
    : TYPEDEF typeDeclaration NAME;

field
    : FIELD typeNameContent;

value
    : NIL
    | TRUE | FALSE
    | number
    | string
    | NAME
    ;

number
    : INT | HEX | FLOAT;

string
    : NORMALSTRING | CHARSTRING;
