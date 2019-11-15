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
    : OPEN docblock CLOSE;

docblock
    : (docDeprecated
        | docDescription
        | docParameter
        | docReturns
        | docReadonly
        | docWriteonly
        | docType
        | docTypedef
        | docField
        | docSee
        | docTsplink
        | docFirmware
        | docVersion)*
    ;

docDeprecated
    : DEPRECATED_TAG docContent;

docDescription
    : DESCRIPTION_TAG docContent;

docContent
    : ( link docContent | ~( TAG_START | CLOSE ))*?;

link
    : LINK_TAG_START LINK_TAG_TARGET LINK_TAG_DISPLAY? LINK_TAG_END;

docParameter
    : PARAM_TAG typeDeclaration? nameDeclaration docContent;

typeDeclaration
    : CURLY_OPEN typeEntry CURLY_CLOSE;

typeEntry
    : type
    | typeUnion
    ;

typeUnion
    : type PIPE (typeUnion+ | type);

type
    : NIL                                                                   # Nil
    | BOOLEAN                                                               # Boolean
    | NUMBER                                                                # Number
    | STRING                                                                # String
    | FUNCTION (PAREN_OPEN typeList* PAREN_CLOSE RETURN_ARROW typeEntry)?   # Function
    | USERDATA                                                              # Userdata
    | THREAD                                                                # Thread
    | TABLE                                                                 # Table
    | ENUM                                                                  # Enum
    | ANY                                                                   # Any
    | NAME                                                                  # Name
    ;

typeList
    : type COMMA (typeList+ | type);

// end typeDeclaration

nameDeclaration
    : NAME                                          # NameRequired
    | SQUARE_OPEN NAME (EQUALS value)? SQUARE_CLOSE # NameOptional
    ;

// end docParameter

docReturns
    : RETURNS_TAG (CURLY_OPEN (typeEntry | typeList) CURLY_CLOSE)? docContent;

docReadonly
    : READONLY_TAG docContent;

docWriteonly
    : WRITEONLY_TAG docContent;

docType
    : TYPE_TAG typeDeclaration docContent;

docTypedef
    : TYPEDEF_TAG typeDeclaration? NAME docContent;

docField
    : FIELD_TAG typeDeclaration? nameDeclaration docContent;

docSee
    : SEE_TAG seeTarget docContent;

seeTarget
    : NAME (DOT NAME)*
    | link
    ;

// end docSee

docTsplink
    : TSPLINK_TAG docContent;

docFirmware
    : (LT | GTE | EQUALS EQUALS) INT DOT INT DOT INT COMMA? docFirmware?;

docVersion
    // Using non-nilable Enum equivalent after version reference tag.
    : TSPV1_TAG (V2_TAG NAME (DOT NAME)*)?  # Version1
    | TSPV2_TAG (V1_TAG NAME (DOT NAME)*)?  # Version2
    ;

value
    : NIL
    | TRUE | FALSE
    | num
    | str
    | NAME
    ;

num
    : INT | HEX | FLOAT;

str
    : NORMALSTRING | CHARSTRING;
