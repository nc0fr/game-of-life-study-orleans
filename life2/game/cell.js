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
 * @fileoverview Implementation of a cell in the Life2 game.
 * Cells are the smallest unit of the game, they carry information about their
 * aliveness and their team, but everything else is computed by the game World
 * (interactions, changes, ...).
 *
 * @package life2
 */

/**
 * An enumeration of the possible states of a cell.
 * @enum {number}
 * @const
 */
export const Cell = {
  /** The cell is empty. */
  EMPTY: 0,
  /** The cell is filled with the color of the first team. */
  TEAM_A: 1,
  /** The cell is filled with the color of the second team. */
  TEAM_B: 2,
  /** The cell is a barrier, it is never affected by rules. */
  BARRIER: 3,
};
