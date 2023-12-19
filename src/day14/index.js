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

function sortRocks(subline) {
  return subline.split("").sort().reverse().join("");
}

function rollRocks(line) {
  let x = line.split("#").map(sortRocks).join("#");
  return x;
}

function tilt(lines) {
  let x = transpose(lines).map(rollRocks);
  let y = transpose(x);
  return y;
}

function calculateLoad(line, lineNumber) {
  const matches = line.match(/O/gi);
  return matches == null ? 0 : [...matches].length * lineNumber;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const tilted = tilt(input);
  const loads = tilted
    .reverse()
    .map((line, lineIndex) => calculateLoad(line, lineIndex + 1));
  return loads.reduce((a, b) => a + b);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
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
