import run from "aocrunner";

const sum = (arr) => (arr.length > 0 ? arr.reduce((a, b) => a + b) : 0);

function transpose(arr) {
  let result = new Array(arr[0].length).fill("");
  arr.forEach((line) => {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      result[charIndex] += line[charIndex];
    }
  });
  return result;
}

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function hashArray(arr) {
  return arr.map((str) => str.hashCode());
}

function arrayReflection(a, b) {
  return a.every((e, i) => e == b[b.length - 1 - i]);
}

function countReflections(list) {
  let reflections = [];
  let l = list.length;
  let sum = 0;
  for (let n = 1; n <= l - 1; n++) {
    let a = n <= l / 2 ? 0 : 2 * n - l;
    let z = n <= l / 2 ? 2 * n : l;
    let rows1 = list.slice(a, n);
    let rows2 = list.slice(n, z);
    if (arrayReflection(rows1, rows2)) {
      reflections.push(n);
    }
  }
  return reflections;
}

const parseInput = (rawInput) => rawInput.split(/\n\n/);

const part1 = (rawInputs) => {
  const inputs = parseInput(rawInputs);
  let total = 0;
  inputs.forEach((rawInput) => {
    let input = rawInput.split("\n");
    let hashedRows = input.map((x) => x.hashCode());
    let hashedColumns = transpose(input).map((x) => x.hashCode());
    const rowReflections = countReflections(hashedRows);
    const colReflections = countReflections(hashedColumns);
    total += sum(rowReflections) * 100 + sum(colReflections);
  });
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return;
};

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //{
      //  input: ``,
      //  expected: "",
      //},
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
