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
 * @fileoverview The world is the interface to interact with the simulation
 * game.  It is responsible for managing the game loop, emitting events, and
 * controlling the game state (rules and cells) in real-time, without coupling
 * downstream users to the game's internal state.
 *
 * @package life2
 */

import {Board} from './board';
import {Cell} from './cell';
import {Rule} from './rule';
import {RulesManager} from './rules_manager';

/**
 * Stats about a board in general, and a state in particular.
 * @typedef {Object} Stats
 * @property {number} birthACount The number of cells that became TEAM_A.
 * @property {number} deathACount The number of cells from TEAM_A that died.
 * @property {number} birthBCount The number of cells that became TEAM_B.
 * @property {number} deathBCount The number of cells from TEAM_B that died.
 * @const
 */
export let Stats;

/**
 * The World class is the main interface to interact with the game state in
 * real-time without coupling the game's internal state to external
 * applications.  The World is also the main manager of the game loop and
 * applies the rules to the cells.
 */
export class World {
  /**
   * Initializes the game world with a board and rules.
   * @param {!Board} board The game board.
   * @param {?Array<!Rule>} rules A list of rules to add and enable by default.
   */
  constructor(board, rules) {
    /**
     * The game board.
     * @type {!Board}
     */
    this.board = board;
    /**
     * The game rules.
     * @type {!RulesManager}
     */
    this.rules = new RulesManager(rules);

    // Stats
    /**
     * The amount of cells from TEAM_A that died in the last game iteration.
     * @type {number}
     */
    this.deathACount_ = 0;
    /**
     * The amount of cells from TEAM_B that died in the last game iteration.
     * @type {number}
     */
    this.deathBCount_ = 0;
    /**
     * The amount of cells that became from TEAM_A in the last game iteration.
     * @type {number}
     */
    this.birthACount_ = 0;
    /**
     * The amount of cells that became TEAM_A in the last game iteration.
     * @type {number}
     */
    this.birthBCount_ = 0;
  }

  /**
   * Given a list of cell states, reduces the list to the most occurring one.
   * @param {!Array<!Cell>} states The list of states.
   * @return {!Cell}
   * @private
   */
  reduceStates_(states) {
    let countA = 0;
    let countB = 0;
    let countEmpty = 0;

    // One loop is better than three ".filter"s btw.
    for (const state of states) {
      if (state === Cell.ALIVE) {
        countA++;
      } else if (state === Cell.DEAD) {
        countB++;
      } else {
        countEmpty++;
      }
    }

    return Math.max(countA, countB, countEmpty);
  }

  /**
   * Calculates the next state of the game and applies it to the board.
   */
  nextState() {
    const rules = this.rules.getAll();
    const width = this.board.getWidth();
    const height = this.board.getHeight();
    const newGrid = this.board.getGrid();

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (this.board.isOutOfBounds(x, y)) continue;

        const cell = this.board.getCell(x, y);
        if (cell === Cell.EMPTY) continue;

        const neighbors = this.board.getNeighbors(x, y);
        const states = rules.map((rule) => rule.execute(cell, neighbors))
                           .filter((state) => state != null);

        const newCell = this.reduceStates_(states);

        if (newCell === Cell.EMPTY && cell === Cell.TEAM_A) {
          this.deathACount_ += 1;
        } else if (newCell === Cell.EMPTY && cell === Cell.TEAM_B) {
          this.deathBCount_ += 1;
        } else if (newCell === Cell.TEAM_A && cell !== Cell.TEAM_A) {
          this.birthACount_ += 1;
        } else if (newCell === Cell.TEAM_B && cell !== Cell.TEAM_B) {
          this.birthBCount_ += 1;
        }

        newGrid[x][y] = newCell;
      }
    }

    this.board.setGrid(newGrid);
  }

  /**
   * Returns the stats of the world and of the last nextState().
   * @return {!Stats}
   */
  getStats() {
    return {
      birthACount: this.birthACount_,
      deathACount: this.deathACount_,
      birthBCount: this.birthBCount_,
      deathBCount: this.deathBCount_,
    };
  }
}
