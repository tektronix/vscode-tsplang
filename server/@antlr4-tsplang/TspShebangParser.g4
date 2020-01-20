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
parser grammar TspShebangParser;

/*
 * The strictness of the TspShebangLexer prevents partial parsing. Therefore,
 * the only usable rule is the entry rule.
 */
options { tokenVocab=TspShebangLexer; }

// Entry rule
shebang
    : OPEN (plugin (DELIMITER node)*? DELIMITER?)? CLOSE?
    ;

plugin
    : PLUGIN (PLUGIN_FIRMWARE_START FIRMWARE)?
    ;

node
    : NODE NODE_INDEX_OPEN nodeNumber NODE_INDEX_CLOSE NODE_EQUALS plugin
    ;

nodeNumber
    : NODE_NUMBER {
// Node number must be in the interval [1, 64].
const num = Number(_localctx.text);
if (num < 1) this.notifyErrorListeners("Node number must be greater than 0");
if (num > 64) this.notifyErrorListeners("Node number must be less than 65");}
    ;
