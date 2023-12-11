import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) => line.match(/-?\d+/g).map((d) => parseInt(d)));

function extrap(seq) {
  const set = new Set(seq);
  if (set.size == 1) {
    return seq.concat(seq[0]);
  }
  return seq.concat(seq.slice(-1)[0] + extrap(diff(seq)).slice(-1)[0]);
}

function diff(seq) {
  let diffs = [];
  for (let i = 0; i < seq.length - 1; i++) {
    diffs.push(seq[i + 1] - seq[i]);
  }
  return diffs;
}

const solve = (input) => {
  const extrapolated = input.map((d) => extrap(d).slice(-1)[0]);
  return extrapolated.reduce((a, b) => a + b);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return solve(input);
};

const parseInput2 = (rawInput) =>
  rawInput.split("\n").map((line) =>
    line
      .match(/-?\d+/g)
      .reverse()
      .map((d) => parseInt(d)),
  );

const part2 = (rawInput) => {
  const input = parseInput2(rawInput);
  return solve(input);
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
