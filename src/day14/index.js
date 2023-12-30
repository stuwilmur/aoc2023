import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

function transpose(arr) {
  let result = new Array(arr[0].length).fill("");
  arr.forEach((line) => {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      result[charIndex] += line[charIndex];
    }
  });
  return result;
}

function sortRocks(subline, reverse = false) {
  if (reverse) {
    return subline.split("").slice().sort().slice().reverse().join("");
  }
  return subline.split("").sort().join("");
}

function rollRocks(line, reverse = false) {
  let x = line
    .split("#")
    .map((subline) => sortRocks(subline, reverse))
    .join("#");
  return x;
}

function tiltN(lines) {
  let x = transpose(lines).map((line) => rollRocks(line, true));
  let y = transpose(x);
  return y;
}

function tiltS(lines) {
  let x = transpose(lines).map((line) => rollRocks(line, false));
  let y = transpose(x);
  return y;
}

function tiltE(lines) {
  return lines.map((line) => rollRocks(line, false));
}

function tiltW(lines) {
  return lines.map((line) => rollRocks(line, true));
}

const cycle = (lines) => tiltE(tiltS(tiltW(tiltN(lines))));

function calculateLoad(line, lineNumber) {
  const matches = line.match(/O/gi);
  return matches == null ? 0 : [...matches].length * lineNumber;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const tilted = tiltN(input);
  return load(tilted);
};

function load(tilted) {
  let loads = tilted
    .slice()
    .reverse()
    .map((line, lineIndex) => calculateLoad(line, lineIndex + 1));
  return loads.reduce((a, b) => a + b);
}

const part2 = (rawInput) => {
  let n = parseInput(rawInput);
  let res = [];
  for (let i = 1; i < 1000; i++) {
    n = cycle(n);
    res.push(load(n));
  }
  let period;
  for (let i = 1; i < 99; i++) {
    if (
      res[900] == res[900 + i] &&
      res[901] == res[901 + i] &&
      res[902] == res[902 + i]
    ) {
      period = i;
      break;
    }
  }
  console.log(period);
  console.log(res.slice(900));
  console.log((1000000000 + 100) % period);
  return res[900 + ((1000000000 + 100) % period)];
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
