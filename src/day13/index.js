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

function arrayReflection(a, b) {
  return a.every((e, i) => e == b[b.length - 1 - i]);
}

function countReflections(list) {
  let reflections = [];
  let l = list.length;
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

function allReflections(rawInput) {
  let [rowReflections, colReflections] = getReflections(rawInput);
  return sum(rowReflections) * 100 + sum(colReflections);
}

function getReflections(rawInput) {
  let input = rawInput.split("\n");
  let hashedRows = input.map((x) => x.hashCode());
  let hashedColumns = transpose(input).map((x) => x.hashCode());
  const rowReflections = countReflections(hashedRows);
  const colReflections = countReflections(hashedColumns);
  return [rowReflections, colReflections];
}

const part1 = (rawInputs) => {
  const inputs = parseInput(rawInputs);
  let total = 0;
  inputs.forEach((rawInput) => {
    total += allReflections(rawInput);
  });
  return total;
};

function replaceChar(str, charIndex, char) {
  let left = str.slice(0, charIndex);
  let right = str.slice(charIndex + 1);
  let result = left + char + right;
  return result;
}

function arrayCmp(arr1, arr2) {
  return arr1.every((e, i) => e == arr2[i]);
}

const part2 = (rawInput) => {
  const inputs = parseInput(rawInput);
  let total = 0;
  inputs.forEach((pattern) => {
    let smudgedReflections = getReflections(pattern);
    for (let charIndex = 0; charIndex < pattern.length; charIndex++) {
      if (pattern[charIndex] == "#" || pattern[charIndex] == ".") {
        let newChar = pattern[charIndex] == "#" ? "." : "#";
        let newPattern = replaceChar(pattern, charIndex, newChar);

        let reflections = getReflections(newPattern);
        if (
          (reflections[0].length > 0 || reflections[1].length > 0) &&
          (!arrayCmp(reflections[0], smudgedReflections[0]) ||
            !arrayCmp(reflections[1], smudgedReflections[1]))
        ) {
          if (!arrayCmp(reflections[0], smudgedReflections[0])) {
            let newr = reflections[0].filter(
              (e) => !smudgedReflections[0].includes(e),
            );
            total += 100 * newr[0];
          } else {
            let newr = reflections[1].filter(
              (e) => !smudgedReflections[1].includes(e),
            );
            total += newr[0];
          }
          break;
        }
      }
    }
  });
  return total;
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
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
