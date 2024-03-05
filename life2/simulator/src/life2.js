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

/**
 * @fileoverview Life2.
 * The Life2 cellular automaton game logic, ready to be used within Web
 * applications.
 * @package life2
 */

/**
 * A cell in the Life2 game.
 * @enum {number}
 * @const
 */
export const CellStates = {
  /** An empty cell. */
  EMPTY: 0,
  /** A cell belonging to team A. */
  TEAM_A: 1,
  /** A cell belonging to team B. */
  TEAM_B: 2,
  /** A barrier cell. */
  BARRIER: 3,
};

/**
 * A board in the Life2 game.
 * @typedef {!Array<!Array<!CellStates>>}
 */
export let Board;

/**
 * The entry point of any simulation of the Life2 game.
 * @final
 */
export class World {
  /**
   * Initializes a Life2 game.
   * @param {number} width The board width.
   * @param {number} height The board height.
   * @throws
   */
  constructor(width, height) {
    if (width <= 0) throw new RangeError('width must be a positive number');
    if (height <= 0) throw new RangeError('height must be a positive number');

    /**
     * The width of the board.
     * @type {number}
     * @final @const
     */
    this.width = width;
    /**
     * The height of the board.
     * @type {number}
     * @final @const
     */
    this.height = height;
    /**
     * The Life2 simulation board.
     * @type {!Board}
     * @private
     */
    this.board_ = this.initializeBoard_(width, height);
  }

  /**
   * Initializes an empty board filled with empty cells.
   * @param {number} width The width of the board.
   * @param {number} height The height of the board.
   * @return {!Array<!Board>} The empty board.
   * @throws {RangeError}
   * @final @private
   */
  initializeBoard_(width, height) {
    if (width <= 0) throw new RangeError('width must be a positive number');
    if (height <= 0) throw new RangeError('height must be a positive number');
    return Array(width).fill(Array(width).fill(CellStates.EMPTY));
  }

  /**
   * Get the cell at a specific position.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {!CellStates} The cell at the position.
   * @throws {RangeError}
   * @final
   */
  getCell(x, y) {
    if (this.isOutOfBounds_(x, y)) throw RangeError('position out of bounds');

    return this.board_[x][y];
  }

  /**
   * Set the cell at a specific position to the given cell.
   * This should usually not be used directly, as the state of the cell must be
   * determined by the rules.  However, it is useful for setting up the initial
   * state of the board, or changing the board during execution.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @param {!CellStates} cell The cell state to set.
   * @throws {RangeError | TypeError}
   * @final
   */
  setCell(x, y, cell) {
    if (this.isOutOfBounds_(x, y)) {
      throw new RangeError('position out of bounds');
    }

    if (cell < CellStates.EMPTY || cell > CellStates.BARRIER) {
      throw new TypeError('cell must be a valid Cell');
    }

    this.board_[x][y] = cell;
  }

  /**
   * Get the board.
   * @return {!Board} The board.
   * @final
   */
  getBoard() {
    return this.board_;
  }

  /**
   * Check if a position is out of bounds.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {boolean} True if the position is out of bounds, false otherwise.
   * @final @private
   */
  isOutOfBounds_(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
  }

  /**
   * Get the adjacent neighbors of a cell.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {!Array<!CellStates>} The neighbors of the cell.
   * @throws {RangeError}
   * @final @private
   */
  getNeighbors_(x, y) {
    if (this.isOutOfBounds_(x, y)) {
      throw new RangeError('position out of bounds');
    }

    return [
      (x - 1, y - 1),
      (x, y - 1),
      (x + 1, y - 1),
      (x - 1, y),
      (x + 1, y),
      (x - 1, y + 1),
      (x, y + 1),
      (x + 1, y + 1),
    ].filter((x, y) => !this.isOutOfBounds_(x, y))
        .map((x, y) => this.getCell(x, y));
  }

  /**
   * Execute the rules of the game to determine the next state of a cell.
   * @param {!CellStates} cell The current state of the cell.
   * @param {number} x The x position of the cell.
   * @param {number} y The y position of the cell.
   * @return {!CellStates} The next state of the cell.
   * @final @private
   */
  nextCellState_(cell, x, y) {
    // 1. Barrier cells don't change.
    // 2. Empty cells become the team with the most neighbors.
    // 3. Filled cells with less than 2 neighbors of the same team become empty.
    // 4. Filled cells with 2 or 3 neighbors of the same team stay the same.
    // 5. Filled cells with more than 3 neighbors of the same team become empty.

    // (1)
    if (cell === CellStates.BARRIER) return CellStates.BARRIER;

    const neighbors = this.getNeighbors_(x, y);
    const neighborsA = neighbors.filter((cell) => cell === CellStates.TEAM_A);
    const neighborsB = neighbors.filter((cell) => cell === CellStates.TEAM_B);

    // (2)
    if (cell === CellStates.EMPTY) {
      if (neighborsA.length > neighborsB.length) return CellStates.TEAM_A;
      return CellStates.TEAM_B;
    }

    // (3)
    if ((cell === CellStates.TEAM_A && neighborsA.length < 2) ||
        (cell === CellStates.TEAM_B && neighborsB.length < 2)) {
      return CellStates.EMPTY;
    }

    // (4)
    if ((cell === CellStates.TEAM_A && neighborsA.length <= 3) ||
        (cell === CellStates.TEAM_B && neighborsB.length <= 3)) {
      return cell;
    }

    // (5)
    return CellStates.EMPTY;
  }

  /**
   * Calculate the next state of the board and update it.
   * @final
   */
  nextState() {
    const nextBoard =
        this.initializeBoard_(this.width, this.height).forEach((row, x) => {
          row.map((cell, y) => {
            this.nextCellState_(cell, x, y);
          });
        });
    this.board_ = nextBoard;
  }
}
