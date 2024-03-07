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
 * @fileoverview A board is a grid of cells in a certain shape and size.
 * To make the game more interesting, the board can be configured to have
 * different 2D shapes (from the classic rectangle to more complex shapes like
 * hexagons).
 *
 * @package life2
 */

// Disables for false-positive errors with the JSDoc comments and the Closure
// Compiler types as ESLint is a dumb shit.
/* eslint-disable no-unused-vars */
/* eslint-disable closure/jsdoc */

import {Cell} from './cell';

/**
 * A grid is a unified, representation of the simulation board.
 * It serves the purpose of standardizing the structure used by the internal API
 * and downstream users.
 * Specific board shapes can be achieved in a grid by playing with the BARRIER
 * cells.
 *
 * A grid is coded as a one-dimensional array of cells, where each inner array
 * is a line on the board.
 * For illustration:
 *
 *       BOARD                                  CODE
 *
 *     ##########      const grid = [[3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
 *     ###a.b.###                    [3, 3, 3, 1, 0, 2, 0, 3, 3, 3],
 *     #.aab..ba#  ->                [3, 0, 1, 1, 2, 0, 0, 2, 1, 3],
 *     ###bb..###                    [3, 3, 3, 2, 2, 0, 0, 3, 3, 3],
 *     ##########                    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]];
 *
 *     Assuming:
 *
 *       * . = 0 = Cell.EMPTY
 *       * a = 1 = Cell.TEAM_A
 *       * b = 2 = Cell.TEAM_B
 *       * # = 3 = Cell.BARRIER
 *
 * @typedef {!Array<!Array<!Cell>>}
 * @const
 */
export let Grid;

/**
 * A board is a grid of cells shaped after any valid 2D shape.
 * The board is only responsible for storing the cells and their state in a
 * geometric shape.  It does not apply any rules or logic to the cells, that is
 * the responsibility of the World.
 * @interface
 */
export class Board {
  /**
   * Get the state of a cell at a given 2D position.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {!Cell} The cell at the given position.
   * @abstract
   */
  getCell(x, y) {}
  /**
   * Set the state of a cell at a given 2D position.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @param {!Cell} cell The new state of the cell.
   * @abstract
   */
  setCell(x, y, cell) {}
  /**
   * Get the neighbors of a cell at a given 2D position.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {!Array<!Cell>} The neighbors of the cell at the given position.
   * @abstract
   */
  getNeighbors(x, y) {}
  /**
   * Check if a position is out of bounds.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {boolean} True if the position is out of bounds, false otherwise.
   * @abstract
   */
  isOutOfBounds(x, y) {}
  /**
   * Get the grid representation of the board.
   * @return {!Grid} The grid representation of the board.
   * @abstract
   */
  getGrid() {}
  /**
   * Set the grid representation of the board.
   * Note that this method should be used with caution, as it can lead to
   * inconsistent states if not used properly.  In general, you should only use
   * the default state and setCell methods to modify the board programmatically.
   * @param {!Grid} grid The new grid representation of the board.
   * @abstract
   */
  setGrid(grid) {}
  /**
   * Returns the biggest width of the Grid representation of the board.
   * This can be useful for downstream interfaces to initialize some UI elements
   * without the need to get the whole grid, which can be expensive.
   * @return {number} The width of the grid.
   * @abstract
   */
  getWidth() {}
  /**
   * Returns the biggest height of the Grid representation of the board.
   * This can be useful for downstream interfaces to initialize some UI elements
   * without the need to get the whole grid, which can be expensive.
   * @return {number} The height of the grid.
   * @abstract
   */
  getHeight() {}
}
