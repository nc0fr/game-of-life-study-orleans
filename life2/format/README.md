# `@life2/format`

[`@life2/format`][pkg-npm] is a JavaScript package to parse and load artifacts
of [Life2 games][life2] stored in the Life2 Text Format (*L2TF*) dynamically.

The Life2 Text Format serves as a simple and readable way of storing and
sharing specific states of a board at any given time. We used it during the
study to share states we considered important with everyone member of the team.

The file format itself is really simple:

- Each line of a 2D board corresponds to a line in the file (with no regard to
  the line delimiter used, even tho we recommend using Linux `LF` only).
- Empty cells are represented by dots (`.`), barrier cells are hash symbols
  (`#`), and cells from a team are represented by the team name in lowercase
  (`a` or `b`).

For instance, the following board in JavaScript

```javascript
const board = [[3, 3, 3, 3, 3, 3, 3, 3, 3],
               [3, 0, 1, 0, 0, 0, 0, 2, 3],
               [3, 0, 1, 0, 1, 2, 2, 2, 3],
               [3, 0, 0, 1, 1, 2, 1, 1, 3],
               [3, 0, 0, 0, 2, 2, 2, 0, 3],
               [3, 3, 3, 3, 3, 3, 3, 3, 3]];  // 9x6
```

can be represented in L2TF as:

```text
#########
#.a....b#
#.a.abbb#
#..aabaa#
#...bbb.#
#########
```

[pkg-npm]: https://npmjs.com/package/@life2/format
[life2]: https://github.com/nc0fr/life2.git

## Installation

The `@life2/format` package is distributed via [NPM][npm]. It can be installed
using:

```shell
npm install @life2/format
```

[npm]: https://npmjs.com

## Legal

`@life2/format` is part of the Life2 project and is governed by the Apache
License, Version 2.0.
