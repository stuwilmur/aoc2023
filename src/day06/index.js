import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((l) => l.match(/\d+/g));

const parseInput2 = (rawInput) =>
  rawInput.split("\n").map((l) => l.match(/\d+/g).join(""));

function ways(time, distance) {
  let ways = 0;
  for (let hold = 0; hold <= time; hold++) {
    if ((time - hold) * hold > distance) {
      ways++;
    }
  }
  return ways;
}

const part1 = (rawInput) => {
  const [times, distances] = parseInput(rawInput);
  let multiple = 1;
  times.forEach((time, i) => {
    multiple *= ways(time, distances[i]);
  });
  return multiple;
};

const part2 = (rawInput) => {
  const [time, distance] = parseInput2(rawInput);
  s;
  return ways(time, distance);
};

run({
  part1: {
    tests: [
      {
        input: `
Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
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
