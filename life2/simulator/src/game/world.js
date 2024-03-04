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
 * The possible states of a cell in the world.
 * @readonly
 * @enum {string}
 */
export const CELL_STATES = {
    /** The cell is empty, possible because it never was filled or it died. */
    EMPTY: ".",
    /** The cell is occupied by a member of team A. */
    TEAM_A: "a",
    /** The cell is occupied by a member of team B. */
    TEAM_B: "b",
    /** The cell is a barrier, and it cannot be occupied by any entity,
     * nor can it be modified by rules. */
    BARRIER: "#",
};

/**
 * A board is an array of strings, where each string represents a row of the
 * board, and each character in the string represents a cell in the row.
 * @typedef {Array<CELL_STATES>} Board
 */

/**
 * The representation of the world, where all the entities live, and where the
 * simulation takes place.
 */
export class World {
    /**
     * Create a new world with the given width and height.
     * @constructor
     * @param {number} width - The width of the world.
     * @param {number} height - The height of the world.
     */
    constructor(width, height) {
        // TODO(nc0) Support different types of boards, not just 2D

        /**
         * The width of the world board.
         * @type {number}
         * @readonly
         */
        this.width = width;
        /**
         * The height of the world board.
         * @type {number}
         * @readonly
         */
        this.height = height;
        /**
         * The board of the world, where all the entities live.
         * @type {Board}
         * @private
         */
        this.board = this.newBoard(width, height);
    }

    /**
     * Create a new board with the given width and height, initializing all
     * the cells to be empty.
     * @param {number} width - The width of the board.
     * @param {number} height - The height of the board.
     * @returns {Board} The new board.
     */
    newBoard(width, height) {
        return new Array(width).fill(CELL_STATES.EMPTY.repeat(height));
    }

    /**
     * Returns the cell at the given coordinates.
     * @param {number} x - The x coordinate of the cell.
     * @param {number} y - The y coordinate of the cell.
     * @returns {CELL_STATES | null} The cell at the given coordinates,
     * or null if the coordinates are out of bounds.
     */
    getCell(x, y) {
        if (x < 0 || x > this.width ||
            y < 0 || y > this.height) return null;

        return this.board[x][y];
    }

    /**
     * Returns the cells that are adjacent to the given coordinates.
     * @param {number} x - The x coordinate of the cell.
     * @param {number} y - The y coordinate of the cell.
     * @returns {Array<(number, number)>} The cells that are adjacent to the given
     * coordinates.
     */
    getNeighbors(x, y) {
        // TODO(nc0): Avoid hardcoding the 8 neighbors, check the bounds, ...
        return [(x - 1, y - 1), (x, y - 1), (x + 1, y - 1),
                (x - 1, y),   /* (x, y) */  (x + 1, y),
                (x - 1, y + 1), (x, y + 1), (x + 1, y + 1)]
               .filter((x, y) => this.getCell(x, y) !== null);
    }

    /**
     *
     */
    nextState() {
        // TODO(nc0): Implement various rules for the next state
        const newBoard = this.newBoard(this.width, this.height);

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cell = this.getCell(x, y);
                const neighbors = this.getNeighbors(x, y);
                neighbors;

                // Apply the rules to the cell and its neighbors
                // and update the new board
                newBoard[x][y] = cell;
            }
        }

        this.board = newBoard;
    }
}
