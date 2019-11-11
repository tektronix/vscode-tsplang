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
    : OPEN DEPRECATED_TAG? description param* returns_? errata* CLOSE                                       # Function
    | OPEN DEPRECATED_TAG? description (READONLY_TAG | WRITEONLY_TAG)? (TYPE_TAG typeDeclaration)? CLOSE    # Property
    | OPEN DEPRECATED_TAG? description typedef field* CLOSE                                                 # TypeDef
    ;

content
    : ( link content | ~( TAG_START | CLOSE ))*?;

link
    : LINK_TAG_START LINK_TAG_TARGET LINK_TAG_DISPLAY? LINK_TAG_END;

description
    : DESCRIPTION_TAG? content;

param
    : PARAM_TAG typeNameContent;

typeNameContent
    : typeDeclaration nameDeclaration content;

typeDeclaration
    : CURLY_OPEN (list | union | type) CURLY_CLOSE;

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
    | FUNCTION (PAREN_OPEN typeList* PAREN_CLOSE RETURN_ARROW type)?
    | USERDATA
    | THREAD
    | TABLE
    | ENUM
    | ANY
    | NAME
    ;

// end typeDeclaration

nameDeclaration
    : NAME                                          # NameRequired
    | SQUARE_OPEN NAME EQUALS value SQUARE_CLOSE    # NameOptional
    ;

// end param

returns_
    : RETURNS_TAG typeDeclaration content;

errata
    : SEE_TAG seeList   # See
    | TSPLINK_TAG       # Tsplink
    | CONSTANT_TAG      # Constant
    | fw                # Firmware
    | ver               # Version
    ;

seeList
    : seeItem (COMMA seeItem)* (COMMA)?;

seeItem
    : NAME (DOT NAME)*
    | link
    ;

fw
    : (LT | GTE) INT DOT INT DOT INT COMMA? fw?;

ver
    : TSPV1_TAG (V2_TAG NAME (DOT NAME)*)?  # Version1
    | TSPV2_TAG (V1_TAG NAME (DOT NAME)*)?  # Version2
    ;

// TODO
// constant
// type
// fw: ( LT | GTE )#.#.# COMMA? fw?
// version: (@tsp-v1 (@v2 NAME (DOT NAME)*)? | @tsp-v2 (@v1 NAME (DOT NAME)*)?)

// end errata

typedef
    : TYPEDEF_TAG typeDeclaration NAME;

field
    : FIELD_TAG typeNameContent;

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
