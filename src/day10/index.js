import run from "aocrunner";
import { start } from "repl";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const map = parseInput(rawInput);
  let position = getStartPosition(map);
  do {
    position = getNextPosition(position, map);
  } while (position.character != "S");

  return Math.floor(position.steps / 2);
};

function Position(character, direction, x, y, steps) {
  return {
    character: character,
    direction: direction,
    x: x,
    y: y,
    steps: steps,
  };
}

const startConnectors = {
  u: ["7", "|", "F"],
  d: ["J", "|", "L"],
  l: ["L", "-", "F"],
  r: ["J", "-", "7"],
};

function getStartPosition(map) {
  let x, y;
  map.every((line, xIndex) => {
    y = line.search("S");
    if (y == -1) {
      return true;
    }
    x = xIndex;
    return false;
  });

  if (x > 0) {
    const character = map[x - 1][y];
    if (startConnectors["u"].includes(character)) {
      return Position(character, "u", x - 1, y, 1);
    }
  }
  if (x < map.length - 1) {
    const character = map[x + 1][y];
    if (startConnectors["d"].includes(character)) {
      return Position(character, "d", x + 1, y, 1);
    }
  }
  if (y > 0) {
    const character = map[x][y - 1];
    if (startConnectors["l"].includes(character)) {
      return Position(character, "l", x, y - 1, 1);
    }
  }
  if (y < map[0].length - 1) {
    const character = map[x][y + 1];
    if (startConnectors["r"].includes(character)) {
      return Position(character, "r", x, y + 1, 1);
    }
  }
}

function getNextPosition(position, map) {
  const direction_ = turn(position.character, position.direction);
  const x_ = stepX(position.x, direction_);
  const y_ = stepY(position.y, direction_);
  const character_ = getNextCharacter(x_, y_, map);
  const steps_ = position.steps + 1;
  return Position(character_, direction_, x_, y_, steps_);
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

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
