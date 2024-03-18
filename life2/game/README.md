# `@life2/game`

[`@life2/game`][pkg-npm] is a JavaScript implementation of the Life2
simulation game. It is supposed to work on any modern ECMAScript 5+ runtimes,
including V8-based machines (Node.js, Google Chrome, ...), and other engines.

The Life2 simulation game is a cellular automaton software where two societies
are created and populated by cells. The game is based on the same ideas
behind [Conway's Game of Life][gol], except it is flexible enough to allow
external rules, and it separates cells in two teams (so called "groups" or
"societies").

The principal objectives behind Life2 is to analyze the behavior of societies
given the rules we defined for them. For example, how does members of
different societies interact with each other?

[pkg-npm]: https://npmjs.com/package/@life2/game
[gol]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

## Installation

The `@life2/game` package is distributed via [NPM][npm]. It can be installed
using:

```shell
npm install @life2/game
```

[npm]: https://npmjs.com
