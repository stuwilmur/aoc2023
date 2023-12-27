import run from "aocrunner";
import { start } from "repl";

const parseInput = (rawInput) => rawInput.split("\n");

function Position(character, direction, x, y, steps) {
  this.character = character;
  this.direction = direction;
  this.x = x;
  this.y = y;
  this.steps = steps;
  this.toStr = () => `${this.x},${this.y}`;
}

function getPipes(rawInput) {
  const map = parseInput(rawInput);
  let pipes = new Map();
  let position = getStartPosition(map);
  pipes.set(position.toStr(), true);
  do {
    position = getNextPosition(position, map);
    pipes.set(position.toStr(), true);
  } while (position.character != "S");
  return pipes;
}

const part1 = (rawInput) => {
  const map = parseInput(rawInput);
  let position = getStartPosition(map);
  do {
    position = getNextPosition(position, map);
  } while (position.character != "S");

  return Math.floor(position.steps / 2);
};

const startConnectors = {
  u: ["7", "|", "F"],
  d: ["J", "|", "L"],
  l: ["L", "-", "F"],
  r: ["J", "-", "7"],
};

function getStartPosition(map, replace = false) {
  let x, y;
  map.every((line, xIndex) => {
    y = line.search("S");
    if (y == -1) {
      return true;
    }
    x = xIndex;
    return false;
  });

  let position;
  let [up, down, left, right] = [false, false, false, false];

  if (x > 0) {
    const character = map[x - 1][y];
    if (startConnectors["u"].includes(character)) {
      position = new Position(character, "u", x - 1, y, 1);
      up = true;
    }
  }
  if (x < map.length - 1) {
    const character = map[x + 1][y];
    if (startConnectors["d"].includes(character)) {
      position = new Position(character, "d", x + 1, y, 1);
      down = true;
    }
  }
  if (y > 0) {
    const character = map[x][y - 1];
    if (startConnectors["l"].includes(character)) {
      position = new Position(character, "l", x, y - 1, 1);
      left = true;
    }
  }
  if (y < map[0].length - 1) {
    const character = map[x][y + 1];
    if (startConnectors["r"].includes(character)) {
      position = new Position(character, "r", x, y + 1, 1);
      right = true;
    }
  }
  if (replace) {
    if (up && down) {
      return new Position("|", "u", x, y, 0);
    }
    if (left && right) {
      return new Position("-", "r", x, y, 0);
    }
    if (up && left) {
      return new Position("J", "l", x, y, 0);
    }
    if (up && right) {
      return new Position("L", "r", x, y, 0);
    }
    if (down && left) {
      return new Position("7", "l", x, y, 0);
    }
    if (down && right) {
      return new Position("F", "r", x, y, 0);
    }
  }
  return position;
}

function getNextPosition(position, map) {
  const direction_ = turn(position.character, position.direction);
  const x_ = stepX(position.x, direction_);
  const y_ = stepY(position.y, direction_);
  const character_ = getNextCharacter(x_, y_, map);
  const steps_ = position.steps + 1;
  return new Position(character_, direction_, x_, y_, steps_);
}

function turn(character, direction) {
  const turnTable = {
    "|": { u: "u", d: "d" },
    "-": { l: "l", r: "r" },
    F: { u: "r", l: "d" },
    7: { r: "d", u: "l" },
    L: { d: "r", l: "u" },
    J: { r: "u", d: "l" },
  };
  return turnTable[character][direction];
}

function stepX(x, direction) {
  const delta = { u: -1, d: 1, l: 0, r: 0 };
  return x + delta[direction];
}

function stepY(y, direction) {
  const delta = { u: 0, d: 0, l: -1, r: 1 };
  return y + delta[direction];
}

function getNextCharacter(x, y, map) {
  return map[x][y];
}

function countTilesInRow(rowIndex, map, pipes) {
  let inside = false;
  let count = 0;
  let prev = null;
  for (let charIndex in map[rowIndex]) {
    let char = map[rowIndex][charIndex];
    if (pipes.has(`${rowIndex},${charIndex}`)) {
      if (char == "|") {
        inside = !inside;
      } else if ((char == "J" && prev == "F") || (char == "7" && prev == "L")) {
        inside = !inside;
      }
      if (char == "F" || char == "L") {
        prev = char;
      }
    } else {
      if (inside) {
        count++;
      }
    }
  }
  return count;
}

const part2 = (rawInput) => {
  const map = parseInput(rawInput);
  const pipes = getPipes(rawInput);
  const startPosition = getStartPosition(map, true);
  const oldLine = map[startPosition.x];
  const newLine =
    oldLine.slice(0, startPosition.y) +
    startPosition.character +
    oldLine.slice(startPosition.y + 1);
  map[startPosition.x] = newLine;
  const counts = map.map((row, rowIndex) =>
    countTilesInRow(rowIndex, map, pipes),
  );
  return counts.reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `.....
.S-7.
.|.|.
.L-J.
.....`,
        expected: 4,
      },
      {
        input: `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.....
.S-7.
.|.|.
.L-J.
.....`,
        expected: 1,
      },
      {
        input: `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
        expected: 4,
      },
      {
        input: `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
