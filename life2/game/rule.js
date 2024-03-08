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
 * @fileoverview Rules are mathematical expressions that are used to determine
 * the next state of a cell based on its current state within a board.
 * Rules are functions that either return a new cell state, or nothing if they
 * don't apply to the cell.
 * The final choice for a cell state is made by the World, using all the results
 * from the multiple rules being applied to the cell.
 *
 * @package life2
 */

import {Cell} from './cell';

/**
 * The mathematical function bodies that is applied to a cell.
 * The function takes two arguments, the current cell the rule is being applied
 * on, and a list of its neighbors.  It returns either a new cell state, or
 * null if the rule should not be applied to the cell.
 * The neighbors list is provided by the board, and may not be ordered in any
 * meaningful way, care should be taken when relying on its order.  The same
 * applies for its contents, which may be only the eight adjacent cells in a
 * rectangular board, or a different set of cells for other board shapes.
 * @typedef {!function(!Cell, !Array<!Cell>): ?Cell}
 * @const
 */
export let RuleFunction;

/**
 * A rule is a function that can apply a transformation to a cell based on its
 * current state and the state of its neighbors.
 */
export class Rule {
  /**
   * Creates a new rule that can be consumed by a board.
   * @param {string} name The name of the rule, may be used for debugging in
   * visual interfaces.
   * @param {string} details A human-readable description of the rule, may be
   * used for debugging in visual interfaces.
   * @param {!RuleFunction} expression The function body of the rule, which will
   * be called by the game manager to apply the rule to a cell.
   */
  constructor(name, details, expression) {
    /**
     * The name of the rule, may be used for debugging in visual interfaces.
     * @type {string}
     * @const
     */
    this.name = name;
    /**
     * A human-readable description of the rule, may be used for debugging in
     * visual interfaces.
     * @type {string}
     * @const
     */
    this.details = details;
    /**
     * The function body of the rule, which will be called by the game manager
     * to apply the rule to a cell.
     * @type {!RuleFunction}
     * @const @private
     */
    this.expression_ = expression;
  }

  /**
   * Applies the rule to a cell and its neighbors, returning the new state of
   * the cell, or null if the rule does not apply to the cell.
   * @param {!Cell} cell The cell to apply the rule to.
   * @param {!Array<!Cell>} neighbors The list of neighbors of the cell.
   * @return {?Cell} The new state of the cell, or null if the rule does not
   * apply to the cell.
   */
  execute(cell, neighbors) {
    if (cell === Cell.BARRIER) return null;
    const state = this.expression_(cell, neighbors);

    // Check if the rule returned a valid state.
    if (state !== Cell.TEAM_A && state !== Cell.TEAM_B &&
        state !== Cell.EMPTY) {
      throw new Error(`Rule '${this.name}' returned an invalid state.`);
    }

    return state;
  }
}
