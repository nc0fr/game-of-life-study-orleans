// Copyright 2024 The Life2 Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {CellStates} from './life2.js';

/**
 * @fileoverview Life2 Simulator Format.
 * A board in the Life2 game can be represented in a specific file format to
 * share various states with a team easily.
 * @package l2sf
 */

/**
 * String representation of a cell.
 * @enum {string}
 * @const
 */
export const CellChar = {
  /** An empty cell. */
  EMPTY: '.',
  /** A cell belonging to team A. */
  TEAM_A: 'a',
  /** A cell belonging to team B. */
  TEAM_B: 'b',
  /** A barrier cell. */
  BARRIER: '#',
};

/**
 * Converts a cell state to a cell char.
 * @param {!CellStates} cell The cell state.
 * @return {!CellChar} The cell character.
 * @throws {TypeError} If the cell state is not recognized.
 * @final
 */
export function cellStateToCellChar(cell) {
  switch (cell) {
    case CellStates.EMPTY:
      return CellChar.EMPTY;
    case CellStates.TEAM_A:
      return CellChar.TEAM_A;
    case CellStates.TEAM_B:
      return CellChar.TEAM_B;
    case CellStates.BARRIER:
      return CellChar.BARRIER;
    default:
      throw new TypeError(`Unknown cell state: ${cell}`);
  }
}

/**
 * Converts a cell char to a cell state.
 * @param {!CellChar} cell The cell character.
 * @return {!CellStates} The cell state.
 * @throws {TypeError} If the cell character is not recognized.
 * @final
 */
export function cellCharToCellState(cell) {
  switch (cell) {
    case CellChar.EMPTY:
      return CellStates.EMPTY;
    case CellChar.TEAM_A:
      return CellStates.TEAM_A;
    case CellChar.TEAM_B:
      return CellStates.TEAM_B;
    case CellChar.BARRIER:
      return CellStates.BARRIER;
    default:
      throw new TypeError(`Unknown cell character: ${cell}`);
  }
}

/**
 * Converts a simulation board to an array of strings.
 * @param {!Board} board The simulation board.
 * @return {!Array<string>} The array of strings.
 * @final
 */
export function boardToFile(board) {
  return board.map(row => row.map(cellStateToCellChar).join('')).join('\n');
}

/**
 * Converts an array of strings to a simulation board.
 * @param {!Array<string>} file The array of strings.
 * @return {!Board} The simulation board.
 * @final
 */
export function fileToBoard(file) {
  return file.map(row => row.split('').map(cellCharToCellState));
}
