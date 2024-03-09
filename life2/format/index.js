/**
 * Copyright 2024 The Life2 Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @license
 */

/**
 * @fileoverview A JavaScript implementation of the Life2 Text Format, to be
 * used by applications with the @life2/game module to share and import game
 * data.
 *
 * The Life2 Text Format, often abbreviated as L2TF, us a simple ASCII-based
 * file format to represent a grid at a certain state/generation, allowing the
 * sharing of game data between different applications.
 * An illustration of a use-cse would be a user creating a game in a simulation,
 * discovering it leads to a certain pattern, and then sharing the game data
 * with other users, who can then import the game data into their own
 * simulations and see for themselves the pattern.
 *
 * @package format
 */

import {Cell, Grid} from '@life2/game';

/**
 * The characters used to represent cells in the Life2 Text Format.
 * @enum {string}
 * @const
 */
export const TextCell = {
  EMPTY: '.',
  TEAM_A: 'a',
  TEAM_B: 'b',
  BARRIER: '#',
};

/**
 * Parse a Life2 Text Format string into a grid.
 * @param {string} string The Life2 Text Format string to parse.
 * @return {!Grid} The grid represented by the input string.
 * @throws {Error} If the input string is not a valid Life2 Text Format string.
 */
export function parse(string) {
  const parseCell = (char) => {
    switch (char) {
      case TextCell.EMPTY:
        return Cell.EMPTY;
      case TextCell.TEAM_A:
        return Cell.TEAM_A;
      case TextCell.TEAM_B:
        return Cell.TEAM_B;
      case TextCell.BARRIER:
        return Cell.BARRIER;
      default:
        throw new Error('Invalid character');
    }
  };
  return string.split('\n').map((row) => row.split('').map(parseCell));
}

/**
 * Convert a grid into a Life2 Text Format string.
 * @param {!Grid} grid The grid to convert.
 * @return {string} The Life2 Text Format string representing the input grid.
 * @throws {Error} If the input grid is not a valid grid.
 */
export function stringify(grid) {
  const stringifyCell = (cell) => {
    switch (cell) {
      case Cell.EMPTY:
        return TextCell.EMPTY;
      case Cell.TEAM_A:
        return TextCell.TEAM_A;
      case Cell.TEAM_B:
        return TextCell.TEAM_B;
      case Cell.BARRIER:
        return TextCell.BARRIER;
      default:
        throw new Error('Invalid cell');
    }
  };
  return grid.map((row) => row.map(stringifyCell).join('')).join('\n');
}
