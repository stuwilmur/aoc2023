import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

function getGalaxyPositions(lines) {
  let galaxies = [];
  lines.forEach((line, lineIndex) => {
    let match = null;
    let re = /#/gi;
    while ((match = re.exec(line))) {
      galaxies.push({
        x: lineIndex,
        y: match.index,
      });
    }
  });
  return galaxies;
}

function expand(galaxies, rows, columns, constant) {
  let galaxies_ = JSON.parse(JSON.stringify(galaxies));
  for (let row = rows - 1; row >= 0; row--) {
    if (isEmptyRow(galaxies, row)) {
      expandRow(galaxies_, row, constant);
    }
  }
  for (let column = columns - 1; column >= 0; column--) {
    if (isEmptyColumn(galaxies, column)) {
      expandColumn(galaxies_, column, constant);
    }
  }
  return galaxies_;
}

function isEmptyRow(galaxies, row) {
  return galaxies.find((galaxy) => galaxy.x == row) == undefined;
}

function isEmptyColumn(galaxies, column) {
  return galaxies.find((galaxy) => galaxy.y == column) == undefined;
}

function expandRow(galaxies, row, constant) {
  galaxies.forEach((galaxy) => {
    if (galaxy.x > row) {
      galaxy.x += constant;
    }
  });
}

function expandColumn(galaxies, column, constant) {
  galaxies.forEach((galaxy) => {
    if (galaxy.y > column) {
      galaxy.y += constant;
    }
  });
}

function iteratePairs(array, fn) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      result.push(fn(array[i], array[j]));
    }
  }
  return result;
}

function distance(galaxy1, galaxy2) {
  return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
}

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);
  let [rows, columns] = [lines.length, lines[0].length];
  return iteratePairs(
    expand(getGalaxyPositions(lines), rows, columns, 1),
    distance,
  ).reduce((a, b) => a + b);
};

const part2 = (rawInput) => {
  const lines = parseInput(rawInput);
  let [rows, columns] = [lines.length, lines[0].length];
  return iteratePairs(
    expand(getGalaxyPositions(lines), rows, columns, 1e6 - 1),
    distance,
  ).reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
        expected: 374,
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
