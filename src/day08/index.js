import run from "aocrunner";

const parseInput = (rawInput) => {
  const lines = rawInput.split("\n");
  const directions = lines[0];
  let leftMap = new Map();
  let rightMap = new Map();
  lines.slice(2).forEach((line) => {
    const nodes = line.match(/[A-Z]{3}/g);
    leftMap.set(nodes[0], nodes[1]);
    rightMap.set(nodes[0], nodes[2]);
  });
  return { directions: directions, L: leftMap, R: rightMap };
};

function navigate(map) {
  let directionIndex = 0;
  let steps = 0;
  let node = "AAA";
  while (node != "ZZZ") {
    node = map[map.directions[directionIndex]].get(node);
    directionIndex += 1;
    steps += 1;
    directionIndex %= map.directions.length;
  }
  return steps;
}

const part1 = (rawInput) => {
  return navigate(parseInput(rawInput));
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
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
