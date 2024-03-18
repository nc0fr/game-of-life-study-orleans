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

// import * as L2TF from '@life2/format';
import * as Life2 from '@life2/game';

const WIDTH = 100;
const HEIGHT = 100;

class RectangularBoard extends Life2.Board {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.grid = new Array(this.width)
                    .fill(new Array(this.height).fill(Life2.Cell.TEAM_A));
  }

  getCell(x, y) {
    if (this.isOutOfBounds(x, y)) {
      return Life2.Cell.BARRIER;
    }

    return this.grid[x][y];
  }

  setCell(x, y, cell) {
    if (this.isOutOfBounds(x, y)) {
      return;
    }

    this.grid[x][y] = cell;
  }

  getNeighbors(x, y) {
    return [
      (x - 1, y - 1), (x, y - 1), (x + 1, y - 1), (x - 1, y), (x + 1, y),
      (x - 1, y + 1), (x, y + 1), (x + 1, y + 1)
    ].filter((c) => !this.isOutOfBounds(c[0], c[1]))
        .map((c) => this.getCell(c[0], c[1]));
  }

  isOutOfBounds(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height ||
        this.grid[x][y] == Life2.Cell.BARRIER;
  }

  getGrid() {
    return this.grid;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}

// A cell with less than two neighbors of the same team dies of loneliness.
const lonelinessRule = new Life2.Rule(
    'Loneliness',
    'A cell with less than two neighbors of the same team dies of loneliness.',
    (cell, neighbors) => {
      if (cell == Life2.Cell.EMPTY) {
        return;
      }

      const team = cell;
      const teamNeighbors = neighbors.filter((c) => c == team);
      if (teamNeighbors.length < 2) {
        return Life2.Cell.EMPTY;
      }
    });

// A cell with less neighbors of the same team than the other team becomes the
// other team, = changes teams.
const teamChangeRule = new Life2.Rule(
    'Team Change',
    'A cell with less neighbors of the same team than the other team becomes the other team.',
    (cell, neighbors) => {
      if (cell == Life2.Cell.EMPTY) {
        return;
      }

      const team = cell;
      const otherTeam =
          team == Life2.Cell.TEAM_A ? Life2.Cell.TEAM_B : Life2.Cell.TEAM_A;
      const teamNeighbors = neighbors.filter((c) => c == team);
      const otherTeamNeighbors = neighbors.filter((c) => c == otherTeam);
      if (teamNeighbors.length < otherTeamNeighbors.length) {
        return otherTeam;
      }
    });

// A cell with more than 3 neighbors of the same team dies of overpopulation.
const overpopulationRule = new Life2.Rule(
    'Overpopulation',
    'A cell with more than 3 neighbors of the same team dies of overpopulation.',
    (cell, neighbors) => {
      if (cell == Life2.Cell.EMPTY) {
        return;
      }

      const team = cell;
      const teamNeighbors = neighbors.filter((c) => c == team);
      if (teamNeighbors.length > 3) {
        return Life2.Cell.EMPTY;
      }
    });

// A dead cell with three or more neighbors of the same team becomes that team.
const birthRule = new Life2.Rule(
    'Birth',
    'A dead cell with three or more neighbors of the same team becomes that team.',
    (cell, neighbors) => {
      if (cell != Life2.Cell.EMPTY) {
        return;
      }

      const teamNeighbors = neighbors.filter((c) => c == Life2.Cell.TEAM_A);
      if (teamNeighbors.length >= 3) {
        return Life2.Cell.TEAM_A;
      }

      const otherTeamNeighbors =
          neighbors.filter((c) => c == Life2.Cell.TEAM_B);
      if (otherTeamNeighbors.length >= 3) {
        return Life2.Cell.TEAM_B;
      }
    });

const rules = [lonelinessRule, teamChangeRule, overpopulationRule, birthRule];

const board = new RectangularBoard(WIDTH, HEIGHT);
const game = new Life2.World(board, rules);

const generationElement = document.getElementById('generation-stats');
const populationAElement = document.getElementById('population-a-stats');
const populationBElement = document.getElementById('population-b-stats');
const deathsAElement = document.getElementById('deaths-a-stats');
const deathsBElement = document.getElementById('deaths-b-stats');
const birthsAElement = document.getElementById('births-a-stats');
const birthsBElement = document.getElementById('births-b-stats');

const speedElement = document.getElementById('speed');

let ITERATION_COUNT = 0;
let INTERVAL;
let SLEEP_TIME = speedElement.value;

function updateDisplay() {
  const grid = game.board.getGrid();
  const canvas = document.getElementById('board-canvas');
  const ctx = canvas.getContext('2d');
  const cellWidth = canvas.width / grid.length;
  const cellHeight = canvas.height / grid[0].length;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] == Life2.Cell.TEAM_A) {
        ctx.fillStyle = 'blue';
      } else if (grid[x][y] == Life2.Cell.TEAM_B) {
        ctx.fillStyle = 'red';
      } else if (grid[x][y] == Life2.Cell.BARRIER) {
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = 'white';
      }

      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
}

function updateStats() {
  grid = game.board.getGrid();
  generationElement.textContent = ITERATION_COUNT;
  populationAElement.textContent =
      grid.flatten().filter((c) => c == Life2.Cell.TEAM_A)
  populationBElement.textContent =
      grid.flatten().filter((c) => c == Life2.Cell.TEAM_B);
  deathsAElement.textContent = 0;
  deathsBElement.textContent = 0;
  birthsAElement.textContent = 0;
  birthsBElement.textContent = 0;
}

function step() {
  ITERATION_COUNT++;
  game.step();
  updateStats();
  updateDisplay();
}

export function Simulator_step() {
  if (INTERVAL) return;
  step();
}

export function Simulator_play() {
  if (INTERVAL) return;
  INTERVAL = setInterval(step, SLEEP_TIME);
}

export function Simulator_pause() {
  if (!INTERVAL) return;
  clearInterval(INTERVAL);
}

export function Simulator_save() {
  console.log('UNIMPLEMENTED');
  false;
}

export function Simulator_load() {
  console.log('UNIMPLEMENTED');
  false;
}
