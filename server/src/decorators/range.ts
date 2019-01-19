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
'use strict'

import * as vsls from 'vscode-languageserver'

// tslint:disable-next-line:no-empty-interface
export interface Range extends vsls.Range {
}
export namespace Range {
    /**
     * Get the delta of Position to Range.
     * @param position The final Position of the delta calculation.
     * @param range The initial Positions of the delta calculation.
     * @return A Range whose Positions are relative distances from the given Position.
     */
    export function delta(position: vsls.Position, range: Range): Range {
        return {
            end: {
                character: range.end.character - position.character,
                line: range.end.character - position.line
            },
            start: {
                character: range.start.character - position.character,
                line: range.start.line - position.line
            }
        }
    }

    /**
     * Determine if Position lies within Range.
     * @param position The Position to check.
     * @param range The Range to check.
     * @returns True if Position lies within Range and false otherwise.
     */
    export function within(position: vsls.Position, range: Range): boolean {
        // Within lower bound.
        return ((position.character >= range.start.character && position.line >= range.start.line)
            // And within upper bound.
            && (position.character <= range.end.character && position.line <= range.end.line))
    }
}
